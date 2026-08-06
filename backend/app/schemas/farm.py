
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
