from typing import List
from fastapi import APIRouter, Depends, HTTPException
from app.db.models import User, ChannelListing, Transaction
from app.db.database import db
from app.schemas.user import User as UserSchema
from app.api.v1.endpoints.auth import get_current_user
from beanie import PydanticObjectId

router = APIRouter()

@router.get("/profile", response_model=UserSchema)
async def get_profile(current_user: User = Depends(get_current_user)):
    return current_user

@router.get("/stats")
async def get_user_stats(
    current_user: User = Depends(get_current_user),
):
    # Check if database is connected
    if not db.client:
        # Return mock stats
        return {
            "active_listings": 3,
            "total_views": 144,
            "total_inquiries": 38,
            "total_earnings": 45000,
            "total_purchases": 2,
            "total_sales": 5,
        }
    
    # Get user ID
    user_id = str(current_user.get("id") if isinstance(current_user, dict) else current_user.id)
    
    # Get user's listings
    listings = await ChannelListing.find(ChannelListing.seller_id == user_id).to_list()
    
    # Get user's transactions
    purchases = await Transaction.find(Transaction.buyer_id == user_id).to_list()
    sales = await Transaction.find(Transaction.seller_id == user_id).to_list()
    
    # Calculate stats
    active_listings = len([l for l in listings if l.status == "active"])
    total_views = sum(l.views for l in listings)
    total_inquiries = sum(l.inquiries for l in listings)
    total_earnings = sum(t.amount for t in sales if t.status == "completed")
    
    return {
        "active_listings": active_listings,
        "total_views": total_views,
        "total_inquiries": total_inquiries,
        "total_earnings": total_earnings,
        "total_purchases": len(purchases),
        "total_sales": len(sales),
    }

@router.get("/{user_id}/public", response_model=dict)
async def get_public_profile(user_id: str):
    user = await User.get(PydanticObjectId(user_id))
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    
    # Get user's active listings
    listings = await ChannelListing.find(
        ChannelListing.seller_id == user_id,
        ChannelListing.status == "active"
    ).to_list()
    
    # Get completed sales
    completed_sales = await Transaction.find(
        Transaction.seller_id == user_id,
        Transaction.status == "completed"
    ).count()
    
    return {
        "id": str(user.id),
        "name": user.full_name,
        "is_verified": user.is_verified,
        "member_since": user.created_at,
        "active_listings": len(listings),
        "total_sales": completed_sales,
        "rating": 4.8,  # Mock rating
        "listings": [listing.dict() for listing in listings]
    }