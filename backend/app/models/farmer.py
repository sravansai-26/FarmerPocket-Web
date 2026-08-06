import uuid
from typing import Optional, List
from sqlalchemy import String, Boolean, ForeignKey
from sqlalchemy.orm import Mapped, mapped_column, relationship
from app.db.base import Base, TimestampMixin

class Farmer(TimestampMixin, Base):
    __tablename__ = "farmers"

    email: Mapped[str] = mapped_column(String, unique=True, index=True)
    firebase_uid: Mapped[str] = mapped_column(String, unique=True, index=True)
    full_name: Mapped[Optional[str]] = mapped_column(String, nullable=True)
    avatar_url: Mapped[Optional[str]] = mapped_column(String, nullable=True)
    phone: Mapped[Optional[str]] = mapped_column(String, nullable=True)
    kyc_verified: Mapped[bool] = mapped_column(Boolean, default=False)
    
    # Farmer specific
    farmer_category: Mapped[Optional[str]] = mapped_column(String, nullable=True) # e.g. Small, Marginal, Large
    preferred_language: Mapped[str] = mapped_column(String, default="te") # Telugu default
    
    # Preferences
    locale: Mapped[str] = mapped_column(String, default="te-IN")
    timezone: Mapped[str] = mapped_column(String, default="Asia/Kolkata")
    
    # Account status
    is_active: Mapped[bool] = mapped_column(Boolean, default=True)
    
    # Relationships
    sessions: Mapped[List["Session"]] = relationship(back_populates="farmer", cascade="all, delete-orphan")
    wallet: Mapped["Wallet"] = relationship(back_populates="farmer", cascade="all, delete-orphan", uselist=False)
    notifications: Mapped[List["Notification"]] = relationship(back_populates="farmer", cascade="all, delete-orphan")
    farms: Mapped[List["Farm"]] = relationship(back_populates="farmer", cascade="all, delete-orphan")


class Session(TimestampMixin, Base):
    __tablename__ = "sessions"

    farmer_id: Mapped[uuid.UUID] = mapped_column(ForeignKey("farmers.id", ondelete="CASCADE"))
    device_info: Mapped[Optional[str]] = mapped_column(String, nullable=True)
    ip_address: Mapped[Optional[str]] = mapped_column(String, nullable=True)
    is_active: Mapped[bool] = mapped_column(Boolean, default=True)

    farmer: Mapped["Farmer"] = relationship(back_populates="sessions")
