from motor.motor_asyncio import AsyncIOMotorClient
from beanie import init_beanie
from app.core.config import settings
from app.db.models import User, ChannelListing, ChannelImage, ChannelLink, Transaction, Message

class Database:
    client: AsyncIOMotorClient = None

db = Database()

async def get_database() -> AsyncIOMotorClient:
    return db.client

async def connect_to_mongo():
    """Create database connection"""
    db.client = AsyncIOMotorClient(settings.MONGODB_URL)
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

async def close_mongo_connection():
    """Close database connection"""
    db.client.close()