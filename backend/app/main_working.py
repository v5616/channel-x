from fastapi import FastAPI, HTTPException, Depends
from fastapi.middleware.cors import CORSMiddleware
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from typing import List, Optional
from datetime import datetime, timedelta
import jwt
from passlib.context import CryptContext

app = FastAPI(
    title="ChannelX API",
    description="YouTube Channel Marketplace API",
    version="1.0.0",
)

# Set up CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allow all origins for development
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Security
SECRET_KEY = "channelx-secret-key-2024-production-ready"
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 30

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="api/v1/auth/login")

# Mock data
mock_users = {
    "test@gmail.com": {
        "id": "1",
        "email": "test@gmail.com",
        "full_name": "John Smith",
        "hashed_password": "test@123",  # Simple mock password
        "role": "buyer",
        "is_verified": True,
        "created_at": datetime.utcnow()
    },
    "vishal@gmail.com": {
        "id": "2",
        "email": "vishal@gmail.com",
        "full_name": "Vishal Singh",
        "hashed_password": "Vishal@2000",  # Simple mock password
        "role": "buyer",
        "is_verified": True,
        "created_at": datetime.utcnow()
    }
}

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

# Helper functions
def create_access_token(data: dict, expires_delta: Optional[timedelta] = None):
    to_encode = data.copy()
    if expires_delta:
        expire = datetime.utcnow() + expires_delta
    else:
        expire = datetime.utcnow() + timedelta(minutes=15)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt

def verify_password(plain_password: str, hashed_password: str) -> bool:
    # Simple mock verification for demo
    return plain_password == hashed_password

def get_password_hash(password: str) -> str:
    # Simple mock hashing for demo
    return password

async def get_current_user(token: str = Depends(oauth2_scheme)):
    credentials_exception = HTTPException(
        status_code=401,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        email: str = payload.get("sub")
        if email is None:
            raise credentials_exception
    except jwt.PyJWTError:
        raise credentials_exception
    
    user = mock_users.get(email)
    if user is None:
        raise credentials_exception
    return user

# Routes
@app.get("/")
async def root():
    return {"message": "ChannelX API is running!", "status": "healthy", "database": "mock_data"}

@app.get("/health")
async def health_check():
    return {"status": "healthy", "database": "mock_data", "channels": len(mock_channels)}

# Auth endpoints
@app.post("/api/v1/auth/login")
async def login(form_data: OAuth2PasswordRequestForm = Depends()):
    user = mock_users.get(form_data.username)
    if not user or not verify_password(form_data.password, user["hashed_password"]):
        raise HTTPException(
            status_code=401,
            detail="Incorrect email or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    
    access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = create_access_token(
        data={"sub": user["email"]}, expires_delta=access_token_expires
    )
    return {"access_token": access_token, "token_type": "bearer"}

@app.post("/api/v1/auth/login-json")
async def login_json(user_data: dict):
    email = user_data.get("email")
    password = user_data.get("password")
    
    print(f"🔐 Login attempt - Email: {email}, Password: {password}")
    
    user = mock_users.get(email)
    if not user:
        print(f"❌ User not found: {email}")
        raise HTTPException(status_code=401, detail="Incorrect email or password")
    
    if not verify_password(password, user["hashed_password"]):
        print(f"❌ Password mismatch - Received: '{password}', Expected: '{user['hashed_password']}'")
        raise HTTPException(status_code=401, detail="Incorrect email or password")
    
    print(f"✅ Login successful for: {email}")
    access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = create_access_token(
        data={"sub": user["email"]}, expires_delta=access_token_expires
    )
    return {"access_token": access_token, "token_type": "bearer"}

@app.get("/api/v1/auth/me")
async def get_current_user_info(current_user: dict = Depends(get_current_user)):
    return {
        "id": current_user["id"],
        "email": current_user["email"],
        "full_name": current_user["full_name"],
        "role": current_user["role"],
        "is_verified": current_user["is_verified"],
        "created_at": current_user["created_at"]
    }

# Channel endpoints
@app.get("/api/v1/channels/")
async def get_channels(
    skip: int = 0,
    limit: int = 100,
    niche: Optional[str] = None,
    min_price: Optional[float] = None,
    max_price: Optional[float] = None,
    monetized: Optional[bool] = None,
):
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

@app.get("/api/v1/channels/{channel_id}")
async def get_channel(channel_id: str):
    for channel in mock_channels:
        if channel["id"] == channel_id:
            # Increment views (mock)
            channel["views"] += 1
            return channel
    
    raise HTTPException(status_code=404, detail="Channel not found")

@app.post("/api/v1/channels/")
async def create_channel(channel_data: dict, current_user: dict = Depends(get_current_user)):
    new_channel = {
        "id": str(len(mock_channels) + 1),
        "seller_id": current_user["id"],
        **channel_data,
        "status": "pending",
        "views": 0,
        "inquiries": 0,
        "created_at": datetime.utcnow(),
        "updated_at": None,
        "seller": {
            "id": current_user["id"],
            "name": current_user["full_name"],
            "email": current_user["email"],
            "rating": 4.8,
            "sales": 12
        }
    }
    mock_channels.append(new_channel)
    return new_channel

@app.get("/api/v1/channels/user/listings")
async def get_user_listings(current_user: dict = Depends(get_current_user)):
    return [c for c in mock_channels if c["seller_id"] == current_user["id"]]

# User endpoints
@app.get("/api/v1/users/profile")
async def get_profile(current_user: dict = Depends(get_current_user)):
    return current_user

@app.get("/api/v1/users/stats")
async def get_user_stats(current_user: dict = Depends(get_current_user)):
    user_channels = [c for c in mock_channels if c["seller_id"] == current_user["id"]]
    
    return {
        "active_listings": len([c for c in user_channels if c["status"] == "active"]),
        "total_views": sum(c["views"] for c in user_channels),
        "total_inquiries": sum(c["inquiries"] for c in user_channels),
        "total_earnings": 45000,  # Mock data
        "total_purchases": 2,     # Mock data
        "total_sales": 5,         # Mock data
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)