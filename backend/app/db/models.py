from beanie import Document, Indexed
from pydantic import BaseModel, Field
from typing import Optional, List
from datetime import datetime
from enum import Enum
from pymongo import IndexModel

class UserRole(str, Enum):
    BUYER = "buyer"
    SELLER = "seller"
    ADMIN = "admin"

class ListingStatus(str, Enum):
    PENDING = "pending"
    ACTIVE = "active"
    SOLD = "sold"
    REJECTED = "rejected"

class TransactionStatus(str, Enum):
    PENDING = "pending"
    IN_ESCROW = "in_escrow"
    COMPLETED = "completed"
    CANCELLED = "cancelled"



class User(Document):
    email: Indexed(str, unique=True)
    full_name: str
    hashed_password: str
    role: UserRole = UserRole.BUYER
    is_verified: bool = False
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: Optional[datetime] = None
    
    class Settings:
        name = "users"
        indexes = [
            IndexModel("email", unique=True),
        ]

class ChannelImage(BaseModel):
    image_url: str
    image_type: Optional[str] = None
    created_at: datetime = Field(default_factory=datetime.utcnow)

class ChannelLink(BaseModel):
    label: str
    url: str
    created_at: datetime = Field(default_factory=datetime.utcnow)

class ChannelListing(Document):
    seller_id: str  # User ID as string
    channel_name: str
    channel_url: str
    niche: str
    subscribers: str  # e.g., "250K"
    monthly_revenue: str  # e.g., "$8,500"
    asking_price: float
    description: Optional[str] = None
    is_monetized: bool = False
    is_verified: bool = False
    status: ListingStatus = ListingStatus.PENDING
    views: int = 0
    inquiries: int = 0
    country: Optional[str] = None
    avg_views: Optional[str] = None  # e.g., "45K"
    engagement_rate: Optional[str] = None  # e.g., "4.2%"
    banner_image: Optional[str] = None  # URL to banner image
    images: List[ChannelImage] = []
    links: List[ChannelLink] = []
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: Optional[datetime] = None
    
    class Settings:
        name = "channel_listings"
        indexes = [
            IndexModel("seller_id"),
            IndexModel("status"),
            IndexModel("niche"),
            IndexModel("asking_price"),
        ]

class Transaction(Document):
    listing_id: str  # ChannelListing ID
    buyer_id: str    # User ID
    seller_id: str   # User ID
    amount: float
    status: TransactionStatus = TransactionStatus.PENDING
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: Optional[datetime] = None
    
    class Settings:
        name = "transactions"
        indexes = [
            IndexModel("buyer_id"),
            IndexModel("seller_id"),
            IndexModel("listing_id"),
        ]

class Message(Document):
    sender_id: str    # User ID
    receiver_id: str  # User ID
    listing_id: Optional[str] = None  # ChannelListing ID
    content: str
    is_read: bool = False
    created_at: datetime = Field(default_factory=datetime.utcnow)
    
    class Settings:
        name = "messages"
        indexes = [
            IndexModel("sender_id"),
            IndexModel("receiver_id"),
            IndexModel("listing_id"),
        ]