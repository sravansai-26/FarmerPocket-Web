from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from sqlalchemy import func
from app.api.dependencies import get_db, get_current_user
from app.models.farmer import Farmer
from app.models.farm import Farm, Plot
from app.models.crop import CropSeason
from app.models.protection import ProtectionCover, Payout
from app.models.wallet import Wallet, WalletTransaction
from app.services.weather_provider import get_weather_provider
from typing import Dict, Any
import random

router = APIRouter()

@router.get("/", response_model=Dict[str, Any])
async def get_dashboard_overview(
    db: AsyncSession = Depends(get_db),
    current_user: Farmer = Depends(get_current_user)
) -> Any:
    """
    Retrieve overview data for the user dashboard.
    """
    # 1. Wallet Balance
    wallet_result = await db.execute(select(Wallet).where(Wallet.farmer_id == current_user.id))
    wallet = wallet_result.scalar_one_or_none()
    balance = float(wallet.balance) if wallet else 0.0

    # 2. Farm Overview
    farm_result = await db.execute(select(Farm).where(Farm.farmer_id == current_user.id))
    farm = farm_result.scalar_one_or_none()

    plot_name = "No Active Plot"
    stage = "Planning"
    protected_activities = 0
    next_activity = "Register your farm"
    rain_prob = 0
    recommendation = "Add a plot to get started"

    if farm:
        # Get first plot
        plot_result = await db.execute(select(Plot).where(Plot.farm_id == farm.id))
        plot = plot_result.scalar_one_or_none()
        
        if plot:
            plot_name = plot.name
            
            # Fetch Weather for the plot (mocking lat/lon for now if not available)
            provider = get_weather_provider()
            weather = await provider.get_forecast(17.3850, 78.4867, days=1)
            rain_prob = weather["daily"][0]["precipitation_prob"]
            
            if rain_prob > 50:
                recommendation = "High rain probability. Protect upcoming activities."
            else:
                recommendation = "Weather is clear. Good time for application."
                
            # Count protected activities (ProtectionCovers)
            covers_result = await db.execute(
                select(func.count(ProtectionCover.id)).where(ProtectionCover.farmer_id == current_user.id, ProtectionCover.status == "active")
            )
            protected_activities = covers_result.scalar() or 0
            stage = "Vegetative" # In a real scenario, fetch from CropSeason
            next_activity = "Fertilizer Application"

    # 3. Recent Payouts
    payouts_result = await db.execute(
        select(Payout)
        .join(ProtectionCover)
        .where(ProtectionCover.farmer_id == current_user.id)
        .order_by(Payout.created_at.desc())
        .limit(3)
    )
    recent_payouts = payouts_result.scalars().all()

    # 4. Recent Transactions
    recent_txs = []
    if wallet:
        txs_result = await db.execute(
            select(WalletTransaction)
            .where(WalletTransaction.wallet_id == wallet.id)
            .order_by(WalletTransaction.created_at.desc())
            .limit(3)
        )
        recent_txs = txs_result.scalars().all()

    return {
        "wallet": {
            "balance": balance,
        },
        "farm": {
            "plot_name": plot_name,
            "stage": stage,
            "protected_activities": protected_activities,
            "next_activity": next_activity,
            "rain_prob": rain_prob,
            "recommendation": recommendation
        },
        "recent_payouts": [
            {
                "id": str(p.id)[:8],
                "status": p.status,
                "amount": float(p.amount),
                "date": p.created_at.strftime("%Y-%m-%d")
            } for p in recent_payouts
        ],
        "recent_transactions": [
            {
                "id": str(t.id)[:8],
                "type": t.type,
                "amount": float(t.amount),
                "date": t.created_at.strftime("%Y-%m-%d")
            } for t in recent_txs
        ]
    }
