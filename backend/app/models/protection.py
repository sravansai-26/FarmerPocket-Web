import uuid
from typing import Optional, List
from datetime import datetime
from sqlalchemy import String, Numeric, ForeignKey, DateTime, JSON
from sqlalchemy.orm import Mapped, mapped_column, relationship
from app.db.base import Base, TimestampMixin

class ProtectionCover(TimestampMixin, Base):
    __tablename__ = "protection_covers"

    activity_id: Mapped[uuid.UUID] = mapped_column(ForeignKey("activities.id", ondelete="CASCADE"))
    farmer_id: Mapped[uuid.UUID] = mapped_column(ForeignKey("farmers.id", ondelete="CASCADE"))
    
    cover_type: Mapped[str] = mapped_column(String) # e.g. "Rain Protection", "Pest Risk"
    status: Mapped[str] = mapped_column(String, default="pending", index=True) # pending, active, expired, claimed, cancelled
    
    # Financials (INR)
    coverage_amount: Mapped[float] = mapped_column(Numeric(12, 2))
    premium_amount: Mapped[float] = mapped_column(Numeric(12, 2))
    
    # Timeline
    start_time: Mapped[datetime] = mapped_column(DateTime(timezone=True))
    end_time: Mapped[datetime] = mapped_column(DateTime(timezone=True))
    
    parameters: Mapped[Optional[dict]] = mapped_column(JSON, nullable=True) # trigger conditions e.g. {"rainfall_mm_min": 10}
    
    # Relationships
    activity: Mapped["Activity"] = relationship(back_populates="protection_covers")
    farmer: Mapped["Farmer"] = relationship()
    monitoring_sessions: Mapped[List["MonitoringSession"]] = relationship(back_populates="protection_cover", cascade="all, delete-orphan")
    payouts: Mapped[List["Payout"]] = relationship(back_populates="protection_cover", cascade="all, delete-orphan")


class MonitoringSession(TimestampMixin, Base):
    __tablename__ = "monitoring_sessions"

    protection_cover_id: Mapped[uuid.UUID] = mapped_column(ForeignKey("protection_covers.id", ondelete="CASCADE"))
    
    provider: Mapped[str] = mapped_column(String) # Tomorrow.io, IMD
    session_status: Mapped[str] = mapped_column(String, default="active") # active, completed, error
    
    # Relationships
    protection_cover: Mapped["ProtectionCover"] = relationship(back_populates="monitoring_sessions")
    observations: Mapped[List["WeatherObservation"]] = relationship(back_populates="monitoring_session", cascade="all, delete-orphan")


class Payout(TimestampMixin, Base):
    __tablename__ = "payouts"

    protection_cover_id: Mapped[uuid.UUID] = mapped_column(ForeignKey("protection_covers.id", ondelete="CASCADE"))
    farmer_id: Mapped[uuid.UUID] = mapped_column(ForeignKey("farmers.id", ondelete="CASCADE"))
    
    status: Mapped[str] = mapped_column(String, default="pending", index=True) # pending, approved, rejected, paid
    amount: Mapped[float] = mapped_column(Numeric(12, 2))
    trigger_reason: Mapped[str] = mapped_column(String)
    oracle_evidence: Mapped[Optional[dict]] = mapped_column(JSON, nullable=True)

    # Relationships
    protection_cover: Mapped["ProtectionCover"] = relationship(back_populates="payouts")
    farmer: Mapped["Farmer"] = relationship()
