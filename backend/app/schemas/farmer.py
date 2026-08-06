
import uuid
from typing import Optional
from pydantic import BaseModel, EmailStr
from datetime import datetime

class FarmerBase(BaseModel):
    email: EmailStr
    full_name: Optional[str] = None
    phone: Optional[str] = None
    farmer_category: Optional[str] = None
    preferred_language: str = "te"

class FarmerCreate(FarmerBase):
    firebase_uid: str

class FarmerUpdate(BaseModel):
    full_name: Optional[str] = None
    phone: Optional[str] = None
    farmer_category: Optional[str] = None
    preferred_language: Optional[str] = None

class FarmerResponse(FarmerBase):
    id: uuid.UUID
    kyc_verified: bool
    is_active: bool
    created_at: datetime
    
    class Config:
        from_attributes = True
