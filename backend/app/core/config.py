from pydantic_settings import BaseSettings, SettingsConfigDict
from pydantic import AnyHttpUrl, computed_field
from typing import List, Optional
import os


class Settings(BaseSettings):
    # App Config
    APP_NAME: str = "FarmerPocket API"
    VERSION: str = "1.0.0"
    API_V1_STR: str = "/api/v1"
    ENVIRONMENT: str = "development"

    # Security
    JWT_SECRET: str
    CORS_ORIGINS: List[str] = [
        "http://localhost",
        "http://localhost:8080",
        "http://localhost:5173",
        "http://localhost:3000"
    ] # In production, restrict this

    # Database
    DATABASE_URL: str

    @computed_field
    def async_database_url(self) -> str:
        # Supabase provides postgresql:// which we need to convert to postgresql+asyncpg://
        if self.DATABASE_URL.startswith("postgresql://"):
            return self.DATABASE_URL.replace("postgresql://", "postgresql+asyncpg://", 1)
        return self.DATABASE_URL

    # Firebase Auth
    FIREBASE_PROJECT_ID: str
    FIREBASE_CLIENT_EMAIL: Optional[str] = None
    FIREBASE_PRIVATE_KEY: Optional[str] = None
    
    # Provider APIs
    OPENWEATHER_API_KEY: Optional[str] = None
    TOMORROW_API_KEY: Optional[str] = None
    RAZORPAY_KEY_ID: Optional[str] = None
    RAZORPAY_SECRET: Optional[str] = None
    RESEND_API_KEY: Optional[str] = None

    model_config = SettingsConfigDict(
        env_file=".env",
        env_file_encoding="utf-8",
        case_sensitive=True,
        extra="ignore"
    )

settings = Settings()
