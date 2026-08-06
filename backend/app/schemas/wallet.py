from typing import Optional, List
from uuid import UUID
from pydantic import BaseModel, ConfigDict
from datetime import datetime

class WalletTransactionBase(BaseModel):
    amount: float
    type: str
    description: Optional[str] = None
    reference_id: Optional[str] = None

class WalletTransactionCreate(WalletTransactionBase):
    wallet_id: UUID
    status: str = "completed"

class WalletTransactionInDB(WalletTransactionBase):
    id: UUID
    wallet_id: UUID
    status: str
    created_at: datetime
    updated_at: datetime
    
    model_config = ConfigDict(from_attributes=True)

class WalletBase(BaseModel):
    balance: float
    currency: str
    status: str

class WalletInDB(WalletBase):
    id: UUID
    farmer_id: UUID
    created_at: datetime
    updated_at: datetime
    transactions: List[WalletTransactionInDB] = []
    
    model_config = ConfigDict(from_attributes=True)
