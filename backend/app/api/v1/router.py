
from fastapi import APIRouter
from app.api.v1.endpoints import auth, dashboard, farmers, farms, protection, wallet, engine, notifications

api_router = APIRouter()
api_router.include_router(auth.router, prefix="/auth", tags=["auth"])
api_router.include_router(dashboard.router, prefix="/dashboard", tags=["dashboard"])
api_router.include_router(farmers.router, prefix="/farmers", tags=["farmers"])
api_router.include_router(farms.router, prefix="/farms", tags=["farms"])
api_router.include_router(protection.router, prefix="/protection", tags=["protection"])
api_router.include_router(wallet.router, prefix="/wallet", tags=["wallet"])
api_router.include_router(engine.router, prefix="/engine", tags=["engine"])
api_router.include_router(notifications.router, prefix="/notifications", tags=["notifications"])
