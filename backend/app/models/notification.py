import uuid
from typing import Optional
from sqlalchemy import String, Boolean, ForeignKey
from sqlalchemy.orm import Mapped, mapped_column, relationship
from app.db.base import Base, TimestampMixin

class Notification(TimestampMixin, Base):
    __tablename__ = "notifications"

    farmer_id: Mapped[uuid.UUID] = mapped_column(ForeignKey("farmers.id", ondelete="CASCADE"))
    
    type: Mapped[str] = mapped_column(String) # SYSTEM, POLICY, CLAIM, WALLET
    title: Mapped[str] = mapped_column(String)
    message: Mapped[str] = mapped_column(String)
    
    is_read: Mapped[bool] = mapped_column(Boolean, default=False)
    action_url: Mapped[Optional[str]] = mapped_column(String, nullable=True)

    farmer = relationship("Farmer", back_populates="notifications")
