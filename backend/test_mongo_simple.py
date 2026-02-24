import asyncio
import ssl
from motor.motor_asyncio import AsyncIOMotorClient

async def test_connection_with_ssl_bypass():
    try:
        # Create SSL context that doesn't verify certificates (for development only)
        ssl_context = ssl.create_default_context()
        ssl_context.check_hostname = False
        ssl_context.verify_mode = ssl.CERT_NONE
        
        # Connection string
        connection_string = "mongodb+srv://rvishal5616_db_user:poLeiARCwt8ixBE0@youtube.mw9bzsp.mongodb.net/?appName=youtube"
        
        print(f"🔗 Connecting to MongoDB Atlas...")
        print(f"   URL: {connection_string}")
        
        # Create client with SSL bypass
        client = AsyncIOMotorClient(
            connection_string,
            ssl_context=ssl_context,
            serverSelectionTimeoutMS=10000
        )
        
        # Test the connection
        await client.admin.command('ping')
        print("✅ MongoDB connection successful!")
        
        # List databases
        db_list = await client.list_database_names()
        print(f"📁 Available databases: {db_list}")
        
        # Test our specific database
        db = client.channelx_db
        collections = await db.list_collection_names()
        print(f"📊 Collections in channelx_db: {collections}")
        
        # Test creating a simple document
        test_collection = db.test_collection
        result = await test_collection.insert_one({"test": "data", "timestamp": "2024-02-23"})
        print(f"✅ Test document inserted with ID: {result.inserted_id}")
        
        # Clean up test document
        await test_collection.delete_one({"_id": result.inserted_id})
        print("🧹 Test document cleaned up")
        
        client.close()
        return True
        
    except Exception as e:
        print(f"❌ MongoDB connection failed: {e}")
        return False

if __name__ == "__main__":
    success = asyncio.run(test_connection_with_ssl_bypass())
    if success:
        print("\n🎉 MongoDB Atlas connection is working!")
        print("💡 You can now use the full backend with database support")
    else:
        print("\n⚠️  MongoDB connection still has issues")
        print("💡 Continue using the mock data backend for now")