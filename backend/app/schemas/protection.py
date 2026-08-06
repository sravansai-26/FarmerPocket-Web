
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
