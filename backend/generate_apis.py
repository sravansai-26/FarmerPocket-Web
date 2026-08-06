import os

base_dir = r"c:\Users\Sravan\Projects\PocketCover\backend\app"

schemas_dir = os.path.join(base_dir, "schemas")
endpoints_dir = os.path.join(base_dir, "api", "v1", "endpoints")

# Delete obsolete files
for f in ["claims.py", "covers.py", "products.py", "users.py"]:
    try:
        os.remove(os.path.join(endpoints_dir, f))
    except:
        pass

for f in ["user.py"]:
    try:
        os.remove(os.path.join(schemas_dir, f))
    except:
        pass

# 1. SCHEMAS
schema_farmer = """
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

class FarmerResponse(FarmerBase):
    id: uuid.UUID
    kyc_verified: bool
    is_active: bool
    created_at: datetime
    
    class Config:
        from_attributes = True
"""
with open(os.path.join(schemas_dir, "farmer.py"), "w") as f: f.write(schema_farmer)

schema_farm = """
import uuid
from typing import Optional, List
from pydantic import BaseModel

class FarmBase(BaseModel):
    name: str
    survey_number: Optional[str] = None
    village: str
    mandal: str
    district: str
    state: str = "Telangana"

class FarmCreate(FarmBase):
    pass

class FarmResponse(FarmBase):
    id: uuid.UUID
    farmer_id: uuid.UUID
    
    class Config:
        from_attributes = True
"""
with open(os.path.join(schemas_dir, "farm.py"), "w") as f: f.write(schema_farm)

schema_protection = """
import uuid
from pydantic import BaseModel
from typing import Optional, List
from datetime import datetime

class ProtectionCoverBase(BaseModel):
    cover_type: str
    coverage_amount: float
    premium_amount: float
    start_time: datetime
    end_time: datetime
    parameters: Optional[dict] = None

class ProtectionCoverResponse(ProtectionCoverBase):
    id: uuid.UUID
    status: str
    activity_id: uuid.UUID
    farmer_id: uuid.UUID
    
    class Config:
        from_attributes = True
"""
with open(os.path.join(schemas_dir, "protection.py"), "w") as f: f.write(schema_protection)

# 2. ENDPOINTS
ep_farmers = """
from fastapi import APIRouter, Depends
from typing import List
from app.schemas.farmer import FarmerResponse
# Dummy router for now
router = APIRouter()

@router.get("/me", response_model=FarmerResponse)
async def get_current_farmer():
    pass
"""
with open(os.path.join(endpoints_dir, "farmers.py"), "w") as f: f.write(ep_farmers)

ep_farms = """
from fastapi import APIRouter
from typing import List
from app.schemas.farm import FarmResponse, FarmCreate
router = APIRouter()

@router.get("/", response_model=List[FarmResponse])
async def list_farms():
    return []
    
@router.post("/", response_model=FarmResponse)
async def create_farm(farm: FarmCreate):
    pass
"""
with open(os.path.join(endpoints_dir, "farms.py"), "w") as f: f.write(ep_farms)

ep_protection = """
from fastapi import APIRouter
from typing import List
from app.schemas.protection import ProtectionCoverResponse
router = APIRouter()

@router.get("/", response_model=List[ProtectionCoverResponse])
async def list_covers():
    return []
"""
with open(os.path.join(endpoints_dir, "protection.py"), "w") as f: f.write(ep_protection)

# Update Router init
router_init = """
from fastapi import APIRouter
from app.api.v1.endpoints import auth, dashboard, farmers, farms, protection, wallet

api_router = APIRouter()
api_router.include_router(auth.router, prefix="/auth", tags=["auth"])
api_router.include_router(dashboard.router, prefix="/dashboard", tags=["dashboard"])
api_router.include_router(farmers.router, prefix="/farmers", tags=["farmers"])
api_router.include_router(farms.router, prefix="/farms", tags=["farms"])
api_router.include_router(protection.router, prefix="/protection", tags=["protection"])
api_router.include_router(wallet.router, prefix="/wallet", tags=["wallet"])
"""
with open(os.path.join(base_dir, "api", "v1", "router.py"), "w") as f: f.write(router_init)

print("Generated APIs and Schemas")
