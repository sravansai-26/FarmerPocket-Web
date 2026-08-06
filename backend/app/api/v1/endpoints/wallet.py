from typing import Any, Dict
from fastapi import APIRouter, Depends, BackgroundTasks
from sqlalchemy.ext.asyncio import AsyncSession
from app.db.session import get_db
from app.api.dependencies import get_current_user
from app.models.farmer import Farmer
from app.models.wallet import WalletTransaction
from app.schemas.wallet import WalletInDB
from app.repositories.wallet_repo import wallet_repo
from app.core.exceptions import CustomHTTPException
from app.core.config import settings
from pydantic import BaseModel
import razorpay
import uuid

router = APIRouter()

# Initialize Razorpay Client
rzp_client = None
if settings.RAZORPAY_KEY_ID and settings.RAZORPAY_SECRET:
    rzp_client = razorpay.Client(auth=(settings.RAZORPAY_KEY_ID, settings.RAZORPAY_SECRET))


class TopUpOrderRequest(BaseModel):
    amount: float

class VerifySignatureRequest(BaseModel):
    razorpay_order_id: str
    razorpay_payment_id: str
    razorpay_signature: str
    amount: float


@router.get("/", response_model=WalletInDB)
async def get_wallet(
    current_user: Farmer = Depends(get_current_user),
    db: AsyncSession = Depends(get_db)
) -> Any:
    """
    Get current user's wallet and transactions.
    """
    wallet = await wallet_repo.get_by_user_id(db, farmer_id=current_user.id)
    if not wallet:
        # Lazily create wallet if it doesn't exist (e.g. for users created before this feature)
        wallet = await wallet_repo.create_for_user(db, farmer_id=current_user.id)
    return wallet


@router.post("/create-order", response_model=Dict[str, Any])
async def create_top_up_order(
    request: TopUpOrderRequest,
    current_user: Farmer = Depends(get_current_user),
    db: AsyncSession = Depends(get_db)
) -> Any:
    """
    Create a Razorpay order for wallet top-up.
    """
    wallet = await wallet_repo.get_by_user_id(db, farmer_id=current_user.id)
    if not wallet:
        raise CustomHTTPException(404, "Wallet not found")

    if not rzp_client:
        # Mock mode if keys aren't loaded properly
        return {
            "order_id": f"mock_order_{uuid.uuid4().hex[:10]}",
            "amount": request.amount * 100,
            "currency": "INR"
        }

    # Razorpay uses paise (amount * 100)
    data = {
        "amount": int(request.amount * 100),
        "currency": "INR",
        "receipt": f"receipt_wallet_{wallet.id}_{uuid.uuid4().hex[:6]}",
        "notes": {
            "farmer_id": str(current_user.id),
            "wallet_id": str(wallet.id)
        }
    }
    
    try:
        order = rzp_client.order.create(data=data)
        return {
            "order_id": order["id"],
            "amount": order["amount"],
            "currency": order["currency"],
            "key_id": settings.RAZORPAY_KEY_ID
        }
    except Exception as e:
        raise CustomHTTPException(500, f"Error creating Razorpay order: {e}")


@router.post("/verify-signature", response_model=Dict[str, Any])
async def verify_signature(
    request: VerifySignatureRequest,
    current_user: Farmer = Depends(get_current_user),
    db: AsyncSession = Depends(get_db)
) -> Any:
    """
    Verify Razorpay payment signature and credit the wallet.
    """
    wallet = await wallet_repo.get_by_user_id(db, farmer_id=current_user.id)
    if not wallet:
        raise CustomHTTPException(404, "Wallet not found")

    if not rzp_client:
        # Mock Verification (always passes)
        pass
    else:
        try:
            rzp_client.utility.verify_payment_signature({
                'razorpay_order_id': request.razorpay_order_id,
                'razorpay_payment_id': request.razorpay_payment_id,
                'razorpay_signature': request.razorpay_signature
            })
        except razorpay.errors.SignatureVerificationError:
            raise CustomHTTPException(400, "Invalid payment signature")

    # If valid, update wallet balance
    wallet.balance = float(wallet.balance) + request.amount
    
    tx = WalletTransaction(
        wallet_id=wallet.id,
        amount=request.amount,
        type="credit",
        status="completed",
        description="Wallet Top-Up (Razorpay)",
        reference_id=request.razorpay_payment_id or f"mock_pay_{uuid.uuid4().hex[:10]}"
    )
    db.add(tx)
    await db.commit()

    return {
        "status": "success",
        "new_balance": float(wallet.balance),
        "transaction_id": tx.reference_id
    }
