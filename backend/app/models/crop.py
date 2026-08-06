import uuid
from typing import Optional, List
from datetime import date
from sqlalchemy import String, Boolean, ForeignKey, Date, Float
from sqlalchemy.orm import Mapped, mapped_column, relationship
from app.db.base import Base, TimestampMixin

class CropSeason(TimestampMixin, Base):
    __tablename__ = "crop_seasons"

    plot_id: Mapped[uuid.UUID] = mapped_column(ForeignKey("plots.id", ondelete="CASCADE"))
    
    season_name: Mapped[str] = mapped_column(String) # e.g. Kharif 2026
    crop_name: Mapped[str] = mapped_column(String) # e.g. Cotton
    crop_variety: Mapped[Optional[str]] = mapped_column(String, nullable=True)
    
    start_date: Mapped[date] = mapped_column(Date)
    end_date: Mapped[Optional[date]] = mapped_column(Date, nullable=True)
    status: Mapped[str] = mapped_column(String, default="planned") # planned, active, harvested, failed
    
    # Relationships
    plot: Mapped["Plot"] = relationship(back_populates="crop_seasons")
    crop_stages: Mapped[List["CropStage"]] = relationship(back_populates="crop_season", cascade="all, delete-orphan")


class CropStage(TimestampMixin, Base):
    __tablename__ = "crop_stages"

    crop_season_id: Mapped[uuid.UUID] = mapped_column(ForeignKey("crop_seasons.id", ondelete="CASCADE"))
    
    name: Mapped[str] = mapped_column(String) # Nursery, Sowing, Transplantation, vegetative, etc.
    start_date: Mapped[date] = mapped_column(Date)
    end_date: Mapped[Optional[date]] = mapped_column(Date, nullable=True)
    status: Mapped[str] = mapped_column(String, default="upcoming") # upcoming, active, completed
    
    # Relationships
    crop_season: Mapped["CropSeason"] = relationship(back_populates="crop_stages")
    activities: Mapped[List["Activity"]] = relationship(back_populates="crop_stage", cascade="all, delete-orphan")


class Activity(TimestampMixin, Base):
    __tablename__ = "activities"

    crop_stage_id: Mapped[uuid.UUID] = mapped_column(ForeignKey("crop_stages.id", ondelete="CASCADE"))
    
    name: Mapped[str] = mapped_column(String) # Fertilizer Application, Spraying, Weeding
    activity_date: Mapped[date] = mapped_column(Date)
    cost_estimate: Mapped[float] = mapped_column(Float, default=0.0)
    status: Mapped[str] = mapped_column(String, default="planned") # planned, completed, skipped
    
    # Relationships
    crop_stage: Mapped["CropStage"] = relationship(back_populates="activities")
    protection_covers: Mapped[List["ProtectionCover"]] = relationship(back_populates="activity", cascade="all, delete-orphan")
