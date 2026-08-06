import uuid
from typing import Optional
from datetime import datetime
from sqlalchemy import String, Float, ForeignKey, DateTime, JSON
from sqlalchemy.orm import Mapped, mapped_column, relationship
from app.db.base import Base, TimestampMixin

class WeatherObservation(TimestampMixin, Base):
    __tablename__ = "weather_observations"

    monitoring_session_id: Mapped[uuid.UUID] = mapped_column(ForeignKey("monitoring_sessions.id", ondelete="CASCADE"))
    
    observation_time: Mapped[datetime] = mapped_column(DateTime(timezone=True))
    
    # Weather metrics
    rainfall_mm: Mapped[Optional[float]] = mapped_column(Float, nullable=True)
    temperature_c: Mapped[Optional[float]] = mapped_column(Float, nullable=True)
    humidity_percent: Mapped[Optional[float]] = mapped_column(Float, nullable=True)
    wind_speed_kmh: Mapped[Optional[float]] = mapped_column(Float, nullable=True)
    
    raw_data: Mapped[Optional[dict]] = mapped_column(JSON, nullable=True)
    
    # Relationships
    monitoring_session: Mapped["MonitoringSession"] = relationship(back_populates="observations")
