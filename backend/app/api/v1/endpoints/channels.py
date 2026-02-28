from typing import List, Optional
from fastapi import APIRouter, Depends, HTTPException, Query
from app.db.models import ChannelListing, User, ListingStatus
from app.schemas.channel import ChannelListingCreate, ChannelListing as ChannelListingSchema, ChannelListingWithSeller
from app.api.v1.endpoints.auth import get_current_user
from app.db.database import db
from beanie import PydanticObjectId
from datetime import datetime

router = APIRouter()

# Mock data fallback
mock_channels = [
    {
        "id": "1",
        "seller_id": "1",
        "channel_name": "Tech Reviews Pro",
        "channel_url": "https://youtube.com/@techreviewspro",
        "niche": "Technology",
        "subscribers": "250K",
        "monthly_revenue": "$8,500",
        "asking_price": 125000,
        "description": "Established tech review channel with consistent growth and high engagement rates.",
        "is_monetized": True,
        "is_verified": True,
        "status": "active",
        "views": 45,
        "inquiries": 12,
        "country": "United States",
        "avg_views": "45K",
        "engagement_rate": "4.2%",
        "banner_image": "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=800",
        "images": [],
        "links": [],
        "created_at": datetime.utcnow(),
        "updated_at": None,
        "seller": {
            "id": "1",
            "name": "John Smith",
            "email": "test@gmail.com",
            "rating": 4.8,
            "sales": 12
        }
    },
    {
        "id": "2",
        "seller_id": "1",
        "channel_name": "Cooking Masters",
        "channel_url": "https://youtube.com/@cookingmasters",
        "niche": "Food & Cooking",
        "subscribers": "180K",
        "monthly_revenue": "$6,200",
        "asking_price": 95000,
        "description": "Popular cooking channel featuring easy recipes and cooking tips.",
        "is_monetized": True,
        "is_verified": True,
        "status": "active",
        "views": 32,
        "inquiries": 8,
        "country": "Canada",
        "avg_views": "35K",
        "engagement_rate": "3.8%",
        "banner_image": "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800",
        "images": [],
        "links": [],
        "created_at": datetime.utcnow(),
        "updated_at": None,
        "seller": {
            "id": "1",
            "name": "John Smith",
            "email": "test@gmail.com",
            "rating": 4.8,
            "sales": 12
        }
    },
    {
        "id": "3",
        "seller_id": "1",
        "channel_name": "Fitness Journey",
        "channel_url": "https://youtube.com/@fitnessjourney",
        "niche": "Health & Fitness",
        "subscribers": "320K",
        "monthly_revenue": "$12,800",
        "asking_price": 185000,
        "description": "Motivational fitness channel with workout routines and nutrition advice.",
        "is_monetized": True,
        "is_verified": True,
        "status": "active",
        "views": 67,
        "inquiries": 18,
        "country": "United Kingdom",
        "avg_views": "58K",
        "engagement_rate": "5.1%",
        "banner_image": "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800",
        "images": [],
        "links": [],
        "created_at": datetime.utcnow(),
        "updated_at": None,
        "seller": {
            "id": "1",
            "name": "John Smith",
            "email": "test@gmail.com",
            "rating": 4.8,
            "sales": 12
        }
    }
]

@router.get("/", response_model=List[ChannelListingWithSeller])
async def get_channels(
    skip: int = 0,
    limit: int = 100,
    niche: Optional[str] = None,
    min_price: Optional[float] = None,
    max_price: Optional[float] = None,
    monetized: Optional[bool] = None,
):
    # Check if database is connected
    if not db.client:
        # Use mock data
        filtered_channels = mock_channels.copy()
        
        # Apply filters
        if niche:
            filtered_channels = [c for c in filtered_channels if niche.lower() in c["niche"].lower()]
        if min_price:
            filtered_channels = [c for c in filtered_channels if c["asking_price"] >= min_price]
        if max_price:
            filtered_channels = [c for c in filtered_channels if c["asking_price"] <= max_price]
        if monetized is not None:
            filtered_channels = [c for c in filtered_channels if c["is_monetized"] == monetized]
        
        # Apply pagination
        return filtered_channels[skip:skip + limit]
    
    # Build query filters for MongoDB
    filters = {"status": ListingStatus.ACTIVE}
    
    if niche:
        filters["niche"] = {"$regex": niche, "$options": "i"}
    if min_price:
        filters["asking_price"] = {"$gte": min_price}
    if max_price:
        if "asking_price" in filters:
            filters["asking_price"]["$lte"] = max_price
        else:
            filters["asking_price"] = {"$lte": max_price}
    if monetized is not None:
        filters["is_monetized"] = monetized
    
    channels = await ChannelListing.find(filters).skip(skip).limit(limit).to_list()
    
    # Add seller info to each channel
    result = []
    for channel in channels:
        seller = await User.get(PydanticObjectId(channel.seller_id))
        channel_dict = channel.dict()
        channel_dict['seller'] = {
            'id': str(seller.id),
            'name': seller.full_name,
            'email': seller.email,
            'rating': 4.8,  # Mock rating
            'sales': 12,    # Mock sales count
        }
        result.append(channel_dict)
    
    return result

@router.get("/{channel_id}", response_model=ChannelListingWithSeller)
async def get_channel(channel_id: str):
    # Check if database is connected
    if not db.client:
        # Use mock data
        for channel in mock_channels:
            if channel["id"] == channel_id:
                # Increment views (mock)
                channel["views"] += 1
                return channel
        raise HTTPException(status_code=404, detail="Channel not found")
    
    channel = await ChannelListing.get(PydanticObjectId(channel_id))
    if not channel:
        raise HTTPException(status_code=404, detail="Channel not found")
    
    # Increment views
    channel.views += 1
    await channel.save()
    
    # Add seller info
    seller = await User.get(PydanticObjectId(channel.seller_id))
    channel_dict = channel.dict()
    channel_dict['seller'] = {
        'id': str(seller.id),
        'name': seller.full_name,
        'email': seller.email,
        'rating': 4.8,  # Mock rating
        'sales': 12,    # Mock sales count
    }
    
    return channel_dict

@router.post("/", response_model=ChannelListingSchema)
async def create_channel(
    channel: ChannelListingCreate,
    current_user: User = Depends(get_current_user),
):
    # Create the main listing
    channel_data = channel.dict()
    channel_data['seller_id'] = str(current_user.id)
    
    db_channel = ChannelListing(**channel_data)
    await db_channel.insert()
    
    return db_channel

@router.get("/user/listings", response_model=List[ChannelListingSchema])
async def get_user_listings(
    current_user: User = Depends(get_current_user),
):
    return await ChannelListing.find(ChannelListing.seller_id == str(current_user.id)).to_list()

@router.put("/{channel_id}/status")
async def update_channel_status(
    channel_id: str,
    status: ListingStatus,
    current_user: User = Depends(get_current_user),
):
    channel = await ChannelListing.get(PydanticObjectId(channel_id))
    if not channel:
        raise HTTPException(status_code=404, detail="Channel not found")
    
    # Only admin or channel owner can update status
    if current_user.role != "admin" and channel.seller_id != str(current_user.id):
        raise HTTPException(status_code=403, detail="Not authorized")
    
    channel.status = status
    channel.updated_at = datetime.utcnow()
    await channel.save()
    return {"message": "Status updated successfully"}