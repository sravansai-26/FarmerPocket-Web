from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from sqlalchemy import update
from typing import List
from app.db.session import get_db
from app.api.dependencies import get_current_user
from app.models.farmer import Farmer
from app.models.notification import Notification

router = APIRouter()

@router.get("/")
async def get_notifications(
    current_user: Farmer = Depends(get_current_user),
    db: AsyncSession = Depends(get_db)
):
    stmt = (
        select(Notification)
        .where(Notification.farmer_id == current_user.id)
        .order_by(Notification.created_at.desc())
    )
    result = await db.execute(stmt)
    notifications = result.scalars().all()
    
    return [
        {
            "id": n.id,
            "type": n.type,
            "title": n.title,
            "message": n.message,
            "is_read": n.is_read,
            "action_url": n.action_url,
            "created_at": n.created_at
        }
        for n in notifications
    ]

@router.patch("/{notification_id}/read")
async def mark_as_read(
    notification_id: str,
    current_user: Farmer = Depends(get_current_user),
    db: AsyncSession = Depends(get_db)
):
    stmt = (
        update(Notification)
        .where(Notification.id == notification_id, Notification.farmer_id == current_user.id)
        .values(is_read=True)
    )
    await db.execute(stmt)
    await db.commit()
    return {"status": "success"}

@router.patch("/read-all")
async def mark_all_as_read(
    current_user: Farmer = Depends(get_current_user),
    db: AsyncSession = Depends(get_db)
):
    stmt = (
        update(Notification)
        .where(Notification.farmer_id == current_user.id)
        .values(is_read=True)
    )
    await db.execute(stmt)
    await db.commit()
    return {"status": "success"}
