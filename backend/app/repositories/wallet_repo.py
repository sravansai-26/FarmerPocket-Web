from typing import Optional
from uuid import UUID
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.orm import selectinload
from app.repositories.base import CRUDBase
from app.models.wallet import Wallet, WalletTransaction
from app.schemas.wallet import WalletBase, WalletTransactionCreate

class WalletRepository(CRUDBase[Wallet, WalletBase, WalletBase]):
    async def get_by_user_id(self, db: AsyncSession, *, farmer_id: UUID) -> Optional[Wallet]:
        result = await db.execute(
            select(Wallet)
            .options(selectinload(Wallet.transactions))
            .filter(Wallet.farmer_id == farmer_id)
        )
        return result.scalars().first()

    async def create_for_user(self, db: AsyncSession, *, farmer_id: UUID) -> Wallet:
        db_obj = Wallet(farmer_id=farmer_id, balance=0.0, currency="INR", status="active")
        db.add(db_obj)
        await db.commit()
        await db.refresh(db_obj)
        return db_obj

wallet_repo = WalletRepository(Wallet)

class WalletTransactionRepository(CRUDBase[WalletTransaction, WalletTransactionCreate, WalletTransactionCreate]):
    async def create_transaction(
        self, db: AsyncSession, *, obj_in: WalletTransactionCreate
    ) -> WalletTransaction:
        db_obj = WalletTransaction(
            wallet_id=obj_in.wallet_id,
            amount=obj_in.amount,
            type=obj_in.type,
            status=obj_in.status,
            description=obj_in.description,
            reference_id=obj_in.reference_id
        )
        db.add(db_obj)
        
        # Update wallet balance
        wallet = await db.get(Wallet, obj_in.wallet_id)
        if wallet:
            if obj_in.type == "credit":
                wallet.balance += obj_in.amount
            elif obj_in.type == "debit":
                wallet.balance -= obj_in.amount
        
        await db.commit()
        await db.refresh(db_obj)
        return db_obj

transaction_repo = WalletTransactionRepository(WalletTransaction)
