
from fastapi import APIRouter
from typing import List
from app.schemas.protection import ProtectionCoverResponse
router = APIRouter()

@router.get("/", response_model=List[ProtectionCoverResponse])
async def list_covers():
    return []
