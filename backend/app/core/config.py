from pydantic_settings import BaseSettings
from typing import Optional

class Settings(BaseSettings):
    MONGODB_URL: str = "mongodb+srv://rvishal5616_db_user:vishal%402000@cluster0.bqprcig.mongodb.net/?appName=Cluster0&tlsAllowInvalidCertificates=true"
    DATABASE_NAME: str = "channelx_db"
    SECRET_KEY: str = "your-secret-key-change-this-in-production"
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 30
    
    class Config:
        env_file = ".env"

settings = Settings()