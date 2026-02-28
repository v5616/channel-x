from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(
    title="ChannelX API",
    description="YouTube Channel Marketplace API",
    version="1.0.0",
)

# Set up CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://localhost:5173"],  # React dev servers
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
    expose_headers=["*"],
)

@app.get("/")
async def root():
    return {"message": "ChannelX API is running!", "status": "healthy"}

@app.get("/health")
async def health_check():
    return {"status": "healthy", "database": "not connected"}

# Mock data for testing
mock_channels = [
    {
        "id": "1",
        "channel_name": "Tech Reviews Pro",
        "niche": "Technology",
        "subscribers": "250K",
        "monthly_revenue": "$8,500",
        "asking_price": 125000,
        "is_monetized": True,
        "is_verified": True,
        "views": 45,
        "inquiries": 12
    },
    {
        "id": "2", 
        "channel_name": "Cooking Masters",
        "niche": "Food & Cooking",
        "subscribers": "180K",
        "monthly_revenue": "$6,200",
        "asking_price": 95000,
        "is_monetized": True,
        "is_verified": True,
        "views": 32,
        "inquiries": 8
    }
]

@app.get("/api/v1/channels/")
async def get_channels():
    return mock_channels

@app.get("/api/v1/channels/{channel_id}")
async def get_channel(channel_id: str):
    for channel in mock_channels:
        if channel["id"] == channel_id:
            return channel
    return {"error": "Channel not found"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)