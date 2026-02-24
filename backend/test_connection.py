import asyncio
from motor.motor_asyncio import AsyncIOMotorClient
from app.core.config import settings

async def test_connection():
    try:
        print(f"Connecting to: {settings.MONGODB_URL}")
        client = AsyncIOMotorClient(settings.MONGODB_URL)
        
        # Test the connection
        await client.admin.command('ping')
        print("✅ MongoDB connection successful!")
        
        # List databases
        db_list = await client.list_database_names()
        print(f"Available databases: {db_list}")
        
        # Test database access
        db = client[settings.DATABASE_NAME]
        collections = await db.list_collection_names()
        print(f"Collections in {settings.DATABASE_NAME}: {collections}")
        
        client.close()
        
    except Exception as e:
        print(f"❌ MongoDB connection failed: {e}")

if __name__ == "__main__":
    asyncio.run(test_connection())