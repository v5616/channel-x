from fastapi import FastAPI, HTTPException, Depends
from fastapi.middleware.cors import CORSMiddleware
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from typing import List, Optional
from datetime import datetime, timedelta
import jwt
from passlib.context import CryptContext
from motor.motor_asyncio import AsyncIOMotorClient
import asyncio

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

# MongoDB connection
MONGODB_URL = "mongodb+srv://rvishal5616_db_user:vishal%402000@cluster0.bqprcig.mongodb.net/?appName=Cluster0&tlsAllowInvalidCertificates=true"
DATABASE_NAME = "channelx_db"

# Global variables
mongo_client = None
mongo_db = None
use_mongodb = False

# Mock data (fallback)
mock_users = {
    "test@gmail.com": {
        "id": "1",
        "email": "test@gmail.com",
        "full_name": "John Smith",
        "hashed_password": "test@123",  # Simple mock password
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

@app.on_event("startup")
async def startup_event():
    global mongo_client, mongo_db, use_mongodb
    
    try:
        print("🔗 Attempting MongoDB connection...")
        mongo_client = AsyncIOMotorClient(MONGODB_URL)
        await mongo_client.admin.command('ping')
        mongo_db = mongo_client[DATABASE_NAME]
        use_mongodb = True
        print("✅ MongoDB connected successfully!")
        
        # Initialize with sample data if collections are empty
        channels_collection = mongo_db.channel_listings
        if await channels_collection.count_documents({}) == 0:
            print("📊 Initializing MongoDB with sample data...")
            await channels_collection.insert_many(mock_channels)
            print("✅ Sample data inserted!")
            
    except Exception as e:
        print(f"❌ MongoDB connection failed: {e}")
        print("⚠️  Using mock data fallback")
        use_mongodb = False

@app.on_event("shutdown")
async def shutdown_event():
    if mongo_client:
        mongo_client.close()

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
    
    # Try MongoDB first
    if use_mongodb:
        try:
            user = await mongo_db.users.find_one({"email": email})
            if user:
                user["id"] = str(user.pop("_id"))
                return user
        except Exception as e:
            print(f"MongoDB user lookup failed: {e}")
    
    # Fall back to mock users
    user = mock_users.get(email)
    if user is None:
        raise credentials_exception
    return user

# Routes
@app.get("/")
async def root():
    db_status = "MongoDB" if use_mongodb else "Mock Data"
    return {"message": f"ChannelX API is running with {db_status}"}

@app.get("/health")
async def health_check():
    if use_mongodb:
        try:
            count = await mongo_db.channel_listings.count_documents({})
            return {"status": "healthy", "database": "mongodb", "channels": count}
        except:
            return {"status": "healthy", "database": "mongodb_error", "channels": 0}
    else:
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
    
    user = None
    
    # Try MongoDB first
    if use_mongodb:
        try:
            user = await mongo_db.users.find_one({"email": email})
            if user:
                user["id"] = str(user.pop("_id"))
        except Exception as e:
            print(f"MongoDB user lookup failed: {e}")
    
    # Fall back to mock users
    if not user:
        user = mock_users.get(email)
    
    if not user or not verify_password(password, user["hashed_password"]):
        raise HTTPException(status_code=401, detail="Incorrect email or password")
    
    access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = create_access_token(
        data={"sub": user["email"]}, expires_delta=access_token_expires
    )
    return {"access_token": access_token, "token_type": "bearer"}

@app.post("/api/v1/auth/register")
async def register(user_data: dict):
    email = user_data.get("email")
    password = user_data.get("password")
    full_name = user_data.get("full_name") or user_data.get("name")
    
    if not email or not password or not full_name:
        raise HTTPException(status_code=400, detail="Email, password, and full name are required")
    
    # Check if user already exists
    if use_mongodb:
        try:
            existing_user = await mongo_db.users.find_one({"email": email})
            if existing_user:
                raise HTTPException(status_code=400, detail="Email already registered")
        except Exception as e:
            print(f"MongoDB user check failed: {e}")
    else:
        if email in mock_users:
            raise HTTPException(status_code=400, detail="Email already registered")
    
    # Create new user
    new_user = {
        "email": email,
        "full_name": full_name,
        "hashed_password": get_password_hash(password),
        "role": "buyer",  # Default role
        "is_verified": False,
        "created_at": datetime.utcnow()
    }
    
    if use_mongodb:
        try:
            result = await mongo_db.users.insert_one(new_user)
            new_user["id"] = str(result.inserted_id)
            new_user.pop("_id", None)
        except Exception as e:
            print(f"MongoDB user insert failed: {e}")
            raise HTTPException(status_code=500, detail="Failed to create user")
    else:
        # Use mock data
        new_user["id"] = str(len(mock_users) + 1)
        mock_users[email] = new_user
    
    # Generate access token for immediate login
    access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = create_access_token(
        data={"sub": email}, expires_delta=access_token_expires
    )
    
    return {
        "access_token": access_token,
        "token_type": "bearer",
        "user": {
            "id": new_user["id"],
            "email": new_user["email"],
            "full_name": new_user["full_name"],
            "role": new_user["role"],
            "is_verified": new_user["is_verified"]
        }
    }

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
    if use_mongodb:
        try:
            # Build MongoDB query
            query = {}
            if niche:
                query["niche"] = {"$regex": niche, "$options": "i"}
            if min_price:
                query["asking_price"] = {"$gte": min_price}
            if max_price:
                if "asking_price" in query:
                    query["asking_price"]["$lte"] = max_price
                else:
                    query["asking_price"] = {"$lte": max_price}
            if monetized is not None:
                query["is_monetized"] = monetized
            
            cursor = mongo_db.channel_listings.find(query).skip(skip).limit(limit)
            channels = await cursor.to_list(length=limit)
            
            # Convert ObjectId to string
            for channel in channels:
                channel["id"] = str(channel.pop("_id"))
            
            return channels
        except Exception as e:
            print(f"MongoDB query failed: {e}")
            # Fall back to mock data
            pass
    
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

@app.get("/api/v1/channels/{channel_id}")
async def get_channel(channel_id: str):
    if use_mongodb:
        try:
            from bson import ObjectId
            if ObjectId.is_valid(channel_id):
                channel = await mongo_db.channel_listings.find_one({"_id": ObjectId(channel_id)})
                if channel:
                    channel["id"] = str(channel.pop("_id"))
                    return channel
        except Exception as e:
            print(f"MongoDB query failed: {e}")
    
    # Use mock data
    for channel in mock_channels:
        if channel["id"] == channel_id:
            # Increment views (mock)
            channel["views"] += 1
            return channel
    
    raise HTTPException(status_code=404, detail="Channel not found")

@app.post("/api/v1/channels/")
async def create_channel(channel_data: dict, current_user: dict = Depends(get_current_user)):
    new_channel = {
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
    
    if use_mongodb:
        try:
            result = await mongo_db.channel_listings.insert_one(new_channel)
            new_channel["id"] = str(result.inserted_id)
            new_channel.pop("_id", None)
            return new_channel
        except Exception as e:
            print(f"MongoDB insert failed: {e}")
    
    # Use mock data
    new_channel["id"] = str(len(mock_channels) + 1)
    mock_channels.append(new_channel)
    return new_channel

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)