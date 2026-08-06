import uuid
from typing import Optional, List
from sqlalchemy import String, Boolean, ForeignKey, Float, JSON
from sqlalchemy.orm import Mapped, mapped_column, relationship
from app.db.base import Base, TimestampMixin

class Farm(TimestampMixin, Base):
    __tablename__ = "farms"

    farmer_id: Mapped[uuid.UUID] = mapped_column(ForeignKey("farmers.id", ondelete="CASCADE"))
    
    name: Mapped[str] = mapped_column(String)
    survey_number: Mapped[Optional[str]] = mapped_column(String, nullable=True)
    village: Mapped[str] = mapped_column(String)
    mandal: Mapped[str] = mapped_column(String)
    district: Mapped[str] = mapped_column(String)
    state: Mapped[str] = mapped_column(String, default="Telangana")
    
    # Relationships
    farmer: Mapped["Farmer"] = relationship(back_populates="farms")
    plots: Mapped[List["Plot"]] = relationship(back_populates="farm", cascade="all, delete-orphan")


class Plot(TimestampMixin, Base):
    __tablename__ = "plots"

    farm_id: Mapped[uuid.UUID] = mapped_column(ForeignKey("farms.id", ondelete="CASCADE"))
    
    name: Mapped[str] = mapped_column(String)
    area_acres: Mapped[float] = mapped_column(Float)
    soil_type: Mapped[Optional[str]] = mapped_column(String, nullable=True)
    is_irrigated: Mapped[bool] = mapped_column(Boolean, default=False)
    
    latitude: Mapped[float] = mapped_column(Float, default=17.3850) # Default to Hyderabad
    longitude: Mapped[float] = mapped_column(Float, default=78.4867)
    
    # GIS data (e.g., GeoJSON polygon)
    boundary_coordinates: Mapped[Optional[dict]] = mapped_column(JSON, nullable=True)
    
    # Relationships
    farm: Mapped["Farm"] = relationship(back_populates="plots")
    crop_seasons: Mapped[List["CropSeason"]] = relationship(back_populates="plot", cascade="all, delete-orphan")
