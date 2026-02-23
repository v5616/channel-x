from pydantic import BaseModel
from typing import Optional, List
from datetime import datetime
from app.db.models import ListingStatus

class ChannelImageBase(BaseModel):
    image_url: str
    image_type: Optional[str] = None

class ChannelImageCreate(ChannelImageBase):
    pass

class ChannelImage(ChannelImageBase):
    created_at: datetime
    
    class Config:
        from_attributes = True

class ChannelLinkBase(BaseModel):
    label: str
    url: str

class ChannelLinkCreate(ChannelLinkBase):
    pass

class ChannelLink(ChannelLinkBase):
    created_at: datetime
    
    class Config:
        from_attributes = True

class ChannelListingBase(BaseModel):
    channel_name: str
    channel_url: str
    niche: str
    subscribers: str
    monthly_revenue: str
    asking_price: float
    description: Optional[str] = None
    is_monetized: bool = False
    country: Optional[str] = None
    avg_views: Optional[str] = None
    engagement_rate: Optional[str] = None
    banner_image: Optional[str] = None

class ChannelListingCreate(ChannelListingBase):
    images: Optional[List[ChannelImageCreate]] = []
    links: Optional[List[ChannelLinkCreate]] = []

class ChannelListingUpdate(BaseModel):
    channel_name: Optional[str] = None
    channel_url: Optional[str] = None
    niche: Optional[str] = None
    subscribers: Optional[str] = None
    monthly_revenue: Optional[str] = None
    asking_price: Optional[float] = None
    description: Optional[str] = None
    is_monetized: Optional[bool] = None
    country: Optional[str] = None
    avg_views: Optional[str] = None
    engagement_rate: Optional[str] = None
    banner_image: Optional[str] = None

class ChannelListing(ChannelListingBase):
    id: str
    seller_id: str
    is_verified: bool
    status: ListingStatus
    views: int
    inquiries: int
    created_at: datetime
    updated_at: Optional[datetime]
    images: List[ChannelImage] = []
    links: List[ChannelLink] = []
    
    class Config:
        from_attributes = True

class ChannelListingWithSeller(ChannelListing):
    seller: dict  # Basic seller info
    
    class Config:
        from_attributes = True