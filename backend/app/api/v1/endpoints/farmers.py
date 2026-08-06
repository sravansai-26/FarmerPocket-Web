from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from app.db.session import get_db
from app.api.dependencies import get_current_user
from app.models.farmer import Farmer
from app.schemas.farmer import FarmerUpdate

router = APIRouter()

@router.get("/me")
async def get_current_farmer(current_user: Farmer = Depends(get_current_user)):
    return {
        "id": current_user.id,
        "email": current_user.email,
        "full_name": current_user.full_name,
        "phone": current_user.phone,
        "kyc_verified": current_user.kyc_verified,
        "is_active": current_user.is_active
    }

@router.patch("/me")
async def update_current_farmer(
    update_data: FarmerUpdate,
    current_user: Farmer = Depends(get_current_user),
    db: AsyncSession = Depends(get_db)
):
    if update_data.full_name is not None:
        current_user.full_name = update_data.full_name
    if update_data.phone is not None:
        current_user.phone = update_data.phone
        
    db.add(current_user)
    await db.commit()
    await db.refresh(current_user)
    
    return {
        "id": current_user.id,
        "email": current_user.email,
        "full_name": current_user.full_name,
        "phone": current_user.phone
    }

@router.delete("/me")
async def delete_current_farmer(
    current_user: Farmer = Depends(get_current_user),
    db: AsyncSession = Depends(get_db)
):
    import firebase_admin.auth
    
    # 1. Delete from Firebase Auth
    try:
        firebase_admin.auth.delete_user(current_user.firebase_uid)
    except Exception as e:
        # If user is already deleted in Firebase or another issue, we can continue or log it
        print(f"Error deleting user from Firebase: {e}")
        
    # 2. Delete from DB
    await db.delete(current_user)
    await db.commit()
    
    return {"status": "success", "message": "User account deleted."}

from fastapi import UploadFile, File
import os
import uuid

@router.post("/me/photo")
async def upload_profile_photo(
    file: UploadFile = File(...),
    current_user: Farmer = Depends(get_current_user)
):
    """
    Upload a profile photo. Saves locally to static/uploads.
    """
    ext = file.filename.split('.')[-1] if '.' in file.filename else 'jpg'
    filename = f"{current_user.firebase_uid}_{uuid.uuid4().hex[:8]}.{ext}"
    filepath = os.path.join("uploads", filename)
    
    content = await file.read()
    with open(filepath, "wb") as f:
        f.write(content)
        
    url = f"http://localhost:8000/static/{filename}"
    
    return {"status": "success", "url": url}
