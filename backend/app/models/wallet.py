import uuid
from typing import List, Optional
from datetime import datetime
from sqlalchemy import String, Numeric, ForeignKey, DateTime, Boolean
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import Mapped, mapped_column, relationship
from app.db.base import Base, TimestampMixin

class Wallet(TimestampMixin, Base):
    __tablename__ = "wallets"

    farmer_id: Mapped[uuid.UUID] = mapped_column(ForeignKey("farmers.id", ondelete="CASCADE"))
    
    # Financials
    balance: Mapped[float] = mapped_column(Numeric(12, 2), default=0.0)
    currency: Mapped[str] = mapped_column(String, default="INR")
    
    # Status
    is_active: Mapped[bool] = mapped_column(Boolean, default=True)

    farmer = relationship("Farmer", back_populates="wallet")
    transactions = relationship("WalletTransaction", back_populates="wallet", cascade="all, delete-orphan")


class WalletTransaction(TimestampMixin, Base):
    __tablename__ = "wallet_transactions"

    wallet_id: Mapped[uuid.UUID] = mapped_column(ForeignKey("wallets.id", ondelete="CASCADE"))
    amount: Mapped[float] = mapped_column(Numeric(12, 2))
    type: Mapped[str] = mapped_column(String) # credit, debit
    status: Mapped[str] = mapped_column(String, default="completed") # pending, completed, failed
    description: Mapped[Optional[str]] = mapped_column(String)
    reference_id: Mapped[Optional[str]] = mapped_column(String, index=True)

    wallet: Mapped["Wallet"] = relationship(back_populates="transactions")
