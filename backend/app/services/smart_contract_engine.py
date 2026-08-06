import uuid
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from sqlalchemy.orm import selectinload
from app.models.protection import ProtectionCover, Payout, MonitoringSession
from app.models.crop import Activity, CropStage, CropSeason
from app.models.farm import Plot
from app.models.wallet import Wallet, WalletTransaction
from app.services.weather_provider import get_weather_provider
from app.services.email_service import send_payout_initiated_email
from datetime import datetime

class SmartContractEngine:
    def __init__(self, db: AsyncSession):
        self.db = db
        self.weather_provider = get_weather_provider()

    async def evaluate_active_covers(self):
        """
        Fetches all active ProtectionCovers and evaluates them against current weather conditions.
        """
        # Fetch covers with related data
        stmt = (
            select(ProtectionCover)
            .where(ProtectionCover.status == "active")
            .options(
                selectinload(ProtectionCover.activity)
                .selectinload(Activity.crop_stage)
                .selectinload(CropStage.crop_season)
                .selectinload(CropSeason.plot),
                selectinload(ProtectionCover.farmer)
            )
        )
        result = await self.db.execute(stmt)
        active_covers = result.scalars().all()
        
        for cover in active_covers:
            await self._evaluate_single_cover(cover)
            
    async def _evaluate_single_cover(self, cover: ProtectionCover):
        try:
            plot = cover.activity.crop_stage.crop_season.plot
            lat = plot.latitude
            lon = plot.longitude
            
            # 1. Fetch live weather
            weather_data = await self.weather_provider.get_current_weather(lat, lon)
            
            # 2. Check conditions
            is_triggered, reason = self._check_conditions(weather_data, cover.parameters)
            
            # 3. If triggered, process payout
            if is_triggered:
                await self._process_payout(cover, reason, weather_data)
                
        except Exception as e:
            print(f"Error evaluating cover {cover.id}: {e}")
            
    def _check_conditions(self, weather_data: dict, parameters: dict):
        if not parameters:
            return False, ""
            
        # Example logic: 
        # parameters: {"trigger_type": "excess_rainfall", "threshold_mm": 50.0}
        trigger_type = parameters.get("trigger_type")
        
        if trigger_type == "excess_rainfall":
            threshold = parameters.get("threshold_mm", 100.0)
            actual_rain = weather_data.get("precipitation", 0.0)
            if actual_rain >= threshold:
                return True, f"Excessive Rainfall Detected: {actual_rain}mm (Threshold: {threshold}mm)"
                
        elif trigger_type == "drought":
            threshold = parameters.get("threshold_mm", 5.0)
            actual_rain = weather_data.get("precipitation", 0.0)
            if actual_rain <= threshold:
                return True, f"Drought Condition Detected: Only {actual_rain}mm rain (Threshold: {threshold}mm)"
                
        elif trigger_type == "extreme_heat":
            threshold = parameters.get("threshold_temp", 40.0)
            actual_temp = weather_data.get("temperature", 25.0)
            if actual_temp >= threshold:
                return True, f"Extreme Heat Detected: {actual_temp}°C (Threshold: {threshold}°C)"
                
        return False, ""

    async def _process_payout(self, cover: ProtectionCover, reason: str, evidence: dict):
        # 1. Mark cover as claimed
        cover.status = "claimed"
        
        amount = float(cover.coverage_amount)
        
        # 2. Create Payout record
        payout = Payout(
            protection_cover_id=cover.id,
            farmer_id=cover.farmer_id,
            status="paid",
            amount=amount,
            trigger_reason=reason,
            oracle_evidence=evidence
        )
        self.db.add(payout)
        
        # 3. Credit Farmer's Wallet
        wallet_result = await self.db.execute(select(Wallet).where(Wallet.farmer_id == cover.farmer_id))
        wallet = wallet_result.scalars().first()
        
        if wallet:
            wallet.balance = float(wallet.balance) + amount
            tx = WalletTransaction(
                wallet_id=wallet.id,
                amount=amount,
                type="credit",
                status="completed",
                description=f"Automated Payout: {cover.cover_type}",
                reference_id=f"payout_auto_{uuid.uuid4().hex[:10]}"
            )
            self.db.add(tx)
        
        # 4. Create Notification
        from app.models.notification import Notification
        plot_name = cover.activity.crop_stage.crop_season.plot.name
        notif = Notification(
            farmer_id=cover.farmer_id,
            type="success",
            title="Payout Triggered!",
            message=f"A payout of ₹{amount} has been triggered for {plot_name} due to {reason}.",
            action_url="/app/payouts/"
        )
        self.db.add(notif)
        
        await self.db.commit()
        
        # 4. Dispatch Email
        if cover.farmer.email:
            plot_name = cover.activity.crop_stage.crop_season.plot.name
            await send_payout_initiated_email(
                to_email=cover.farmer.email,
                farmer_name=cover.farmer.full_name or "Farmer",
                plot_name=plot_name,
                amount=amount,
                reason=reason
            )
