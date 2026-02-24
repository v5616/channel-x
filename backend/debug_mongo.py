import asyncio
import dns.resolver
from motor.motor_asyncio import AsyncIOMotorClient

async def test_mongodb_connection():
    # Test different connection string formats
    connection_strings = [
        "mongodb+srv://rvishal5616_db_user:poLeiARCwt8ixBE0@cluster0.mongodb.net/channelx_db?retryWrites=true&w=majority",
        "mongodb+srv://rvishal5616_db_user:poLeiARCwt8ixBE0@cluster0.mongodb.net/?retryWrites=true&w=majority",
        "mongodb+srv://rvishal5616_db_user:poLeiARCwt8ixBE0@cluster0.mongodb.net/test?retryWrites=true&w=majority",
    ]
    
    # First, test DNS resolution
    print("🔍 Testing DNS resolution...")
    try:
        answers = dns.resolver.resolve('_mongodb._tcp.cluster0.mongodb.net', 'SRV')
        print(f"✅ DNS resolution successful: {len(answers)} records found")
        for answer in answers:
            print(f"   - {answer}")
    except Exception as e:
        print(f"❌ DNS resolution failed: {e}")
        print("💡 This suggests the cluster name 'cluster0' might be incorrect")
        return
    
    # Test each connection string
    for i, conn_str in enumerate(connection_strings, 1):
        print(f"\n🧪 Testing connection string {i}:")
        print(f"   {conn_str[:50]}...")
        
        try:
            client = AsyncIOMotorClient(conn_str, serverSelectionTimeoutMS=5000)
            await client.admin.command('ping')
            print("✅ Connection successful!")
            
            # List databases
            db_list = await client.list_database_names()
            print(f"📁 Available databases: {db_list}")
            
            client.close()
            return  # Success, no need to test others
            
        except Exception as e:
            print(f"❌ Connection failed: {e}")
    
    print("\n💡 Suggestions:")
    print("1. Verify the cluster name in MongoDB Atlas dashboard")
    print("2. Check if the cluster is in the correct region")
    print("3. Verify username and password are correct")
    print("4. Ensure IP address is whitelisted (0.0.0.0/0 for all)")
    print("5. Check if the cluster is paused or deleted")

if __name__ == "__main__":
    asyncio.run(test_mongodb_connection())