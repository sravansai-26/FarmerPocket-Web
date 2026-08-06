from fastapi import APIRouter, Depends
from typing import List
from app.schemas.farm import FarmResponse, FarmCreate
from app.db.session import get_db
from app.models.farmer import Farmer
from app.api.dependencies import get_current_user
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from app.models.farm import Farm, Plot

router = APIRouter()

@router.get("/", response_model=List[FarmResponse])
async def list_farms(
    db: AsyncSession = Depends(get_db),
    current_user: Farmer = Depends(get_current_user)
):
    result = await db.execute(select(Farm).where(Farm.farmer_id == current_user.id))
    return result.scalars().all()
    
@router.post("/", response_model=FarmResponse)
async def create_farm(
    farm: FarmCreate,
    db: AsyncSession = Depends(get_db),
    current_user: Farmer = Depends(get_current_user)
):
    db_farm = Farm(
        farmer_id=current_user.id,
        name=farm.name,
        survey_number=farm.survey_number,
        village=farm.village,
        mandal=farm.mandal,
        district=farm.district,
        state=farm.state
    )
    db.add(db_farm)
    await db.commit()
    await db.refresh(db_farm)
    
    # Create a default plot for the farm
    default_plot = Plot(
        farm_id=db_farm.id,
        name=f"{farm.name} Main Plot",
        area_acres=2.5,
        is_irrigated=False
    )
    db.add(default_plot)
    await db.commit()
    
    return db_farm
