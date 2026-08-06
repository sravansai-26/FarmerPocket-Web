from typing import Any
from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from app.db.session import get_db
from app.core.security import get_current_user_token
from app.models.farmer import Farmer
from app.schemas.farmer import FarmerResponse, FarmerCreate
from app.repositories.farmer_repo import farmer_repo
from app.repositories.wallet_repo import wallet_repo

router = APIRouter()

@router.post("/login", response_model=FarmerResponse)
async def login(
    token_data: dict = Depends(get_current_user_token),
    db: AsyncSession = Depends(get_db)
) -> Any:
    """
    Login endpoint. Verifies the Firebase ID token and creates the user if they don't exist.
    """
    firebase_uid = token_data.get("uid")
    email = token_data.get("email")
    name = token_data.get("name")
    picture = token_data.get("picture")

    user = await farmer_repo.get_by_firebase_uid(db, firebase_uid=firebase_uid)
    if not user:
        # Create user
        farmer_in = FarmerCreate(
            firebase_uid=firebase_uid,
            email=email,
            full_name=name
        )
        user = await farmer_repo.create(db, obj_in=farmer_in)
        
        # Create an empty wallet for the new user
        await wallet_repo.create_for_user(db, farmer_id=user.id)
        
        # Create a welcome notification
        from app.models.notification import Notification
        welcome_notif = Notification(
            farmer_id=user.id,
            type="info",
            title="Welcome to FarmerPocket!",
            message="Your account has been successfully created. Add your first farm plot to get started.",
            action_url="/app/planner/"
        )
        db.add(welcome_notif)
        await db.commit()
    
    return user
