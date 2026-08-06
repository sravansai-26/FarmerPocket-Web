from typing import Optional
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession
from app.repositories.base import CRUDBase
from app.models.farmer import Farmer
from app.schemas.farmer import FarmerCreate, FarmerUpdate

class UserRepository(CRUDBase[Farmer, FarmerCreate, FarmerUpdate]):
    async def get_by_email(self, db: AsyncSession, *, email: str) -> Optional[Farmer]:
        result = await db.execute(select(Farmer).filter(Farmer.email == email))
        return result.scalars().first()

    async def get_by_firebase_uid(self, db: AsyncSession, *, firebase_uid: str) -> Optional[Farmer]:
        result = await db.execute(select(Farmer).filter(Farmer.firebase_uid == firebase_uid))
        return result.scalars().first()

farmer_repo = UserRepository(Farmer)
