from motor.motor_asyncio import AsyncIOMotorClient
from beanie import init_beanie
from app.core.config import settings
from app.db.models import User, ChannelListing, ChannelImage, ChannelLink, Transaction, Message
import ssl

class Database:
    client: AsyncIOMotorClient = None

db = Database()

async def get_database() -> AsyncIOMotorClient:
    return db.client

async def connect_to_mongo():
    """Create database connection"""
    try:
        print(f"🔗 Attempting MongoDB connection...")
        print(f"   URL: {settings.MONGODB_URL}")
        
        # Try different connection approaches
        connection_attempts = [
            # Attempt 1: Standard connection
            {"url": settings.MONGODB_URL},
            # Attempt 2: With SSL disabled
            {"url": settings.MONGODB_URL + "&ssl=false"},
            # Attempt 3: With TLS options
            {"url": settings.MONGODB_URL + "&tls=true&tlsAllowInvalidCertificates=true"},
        ]
        
        for i, attempt in enumerate(connection_attempts, 1):
            try:
                print(f"   Attempt {i}: {attempt['url'][:80]}...")
                
                db.client = AsyncIOMotorClient(
                    attempt['url'],
                    serverSelectionTimeoutMS=5000
                )
                
                # Test the connection
                await db.client.admin.command('ping')
                print("✅ MongoDB connection successful!")
                
                await init_beanie(
                    database=db.client[settings.DATABASE_NAME],
                    document_models=[
                        User,
                        ChannelListing,
                        ChannelImage,
                        ChannelLink,
                        Transaction,
                        Message
                    ]
                )
                print("✅ Beanie initialization successful!")
                return  # Success, exit function
                
            except Exception as attempt_error:
                print(f"   ❌ Attempt {i} failed: {str(attempt_error)[:100]}...")
                if db.client:
                    db.client.close()
                    db.client = None
                continue
        
        # If all attempts failed
        print("❌ All MongoDB connection attempts failed")
        print("⚠️  Running without database connection (using mock data)")
        db.client = None
        
    except Exception as e:
        print(f"❌ MongoDB connection setup failed: {e}")
        print("⚠️  Running without database connection (using mock data)")
        db.client = None

async def close_mongo_connection():
    """Close database connection"""
    if db.client:
        db.client.close()