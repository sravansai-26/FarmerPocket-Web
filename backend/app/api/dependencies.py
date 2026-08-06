from fastapi import Depends
from fastapi.security import HTTPAuthorizationCredentials
from sqlalchemy.ext.asyncio import AsyncSession

from app.core.security import get_current_user_token, security
from app.db.session import get_db
from app.models.farmer import Farmer
from app.repositories.farmer_repo import farmer_repo
from app.core.exceptions import CustomHTTPException

async def get_current_user(
    token_data: dict = Depends(get_current_user_token),
    db: AsyncSession = Depends(get_db)
) -> Farmer:
    firebase_uid = token_data.get("uid")
    if not firebase_uid:
        raise CustomHTTPException(
            status_code=401,
            detail="Invalid token: missing uid",
            type="urn:problem-type:unauthorized"
        )
    
    user = await farmer_repo.get_by_firebase_uid(db, firebase_uid=firebase_uid)
    if not user:
        raise CustomHTTPException(
            status_code=404,
            detail="Farmer not found",
            type="urn:problem-type:user-not-found"
        )
    
    if not user.is_active:
        raise CustomHTTPException(
            status_code=403,
            detail="Inactive user",
            type="urn:problem-type:forbidden"
        )
        
    return user
