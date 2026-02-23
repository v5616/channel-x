from typing import List, Optional
from fastapi import APIRouter, Depends, HTTPException, Query
from app.db.models import ChannelListing, User, ListingStatus
from app.schemas.channel import ChannelListingCreate, ChannelListing as ChannelListingSchema, ChannelListingWithSeller
from app.api.v1.endpoints.auth import get_current_user
from beanie import PydanticObjectId
from datetime import datetime

router = APIRouter()

@router.get("/", response_model=List[ChannelListingWithSeller])
async def get_channels(
    skip: int = 0,
    limit: int = 100,
    niche: Optional[str] = None,
    min_price: Optional[float] = None,
    max_price: Optional[float] = None,
    monetized: Optional[bool] = None,
):
    # Build query filters
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