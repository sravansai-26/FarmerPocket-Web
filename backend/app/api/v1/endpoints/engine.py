from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from app.db.session import get_db
from app.api.dependencies import get_current_user
from app.models.farmer import Farmer
from app.services.smart_contract_engine import SmartContractEngine

router = APIRouter()

@router.post("/simulate-trigger")
async def simulate_trigger(
    current_user: Farmer = Depends(get_current_user),
    db: AsyncSession = Depends(get_db)
):
    """
    Trigger the smart contract Weather Oracle to evaluate active protection covers.
    """
    engine = SmartContractEngine(db)
    await engine.evaluate_active_covers()
        
    return {"status": "success", "message": "Smart Contract Engine executed. Active covers evaluated against live weather."}
