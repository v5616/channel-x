from pydantic_settings import BaseSettings
from typing import Optional

class Settings(BaseSettings):
    MONGODB_URL: str = "mongodb+srv://rvishal5616_db_user:poLeiARCwt8ixBE0@cluster0.mongodb.net/channelx_db?retryWrites=true&w=majority"
    DATABASE_NAME: str = "channelx_db"
    SECRET_KEY: str = "your-secret-key-change-this-in-production"
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 30
    
    class Config:
        env_file = ".env"

settings = Settings()