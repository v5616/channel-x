from datetime import timedelta, datetime
from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from app.core.config import settings
from app.core.security import create_access_token, verify_password, get_password_hash, verify_token
from app.db.models import User, UserRole
from app.db.database import db
from app.schemas.user import UserCreate, UserLogin, User as UserSchema, Token

router = APIRouter()
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="api/v1/auth/login")

# Mock user data for fallback
mock_users = {
    "test@gmail.com": {
        "id": "1",
        "email": "test@gmail.com",
        "full_name": "John Smith",
        "hashed_password": get_password_hash("test@123"),
        "role": UserRole.BUYER,
        "is_verified": True,
        "created_at": datetime.utcnow()
    }
}

async def get_user_by_email(email: str):
    # Check if database is connected
    if not db.client:
        # Use mock data
        return mock_users.get(email)
    return await User.find_one(User.email == email)

async def create_user(user: UserCreate):
    # Check if database is connected
    if not db.client:
        # Use mock data
        new_user = {
            "id": str(len(mock_users) + 1),
            "email": user.email,
            "full_name": user.full_name,
            "hashed_password": get_password_hash(user.password),
            "role": UserRole.BUYER,
            "is_verified": False,
            "created_at": datetime.utcnow()
        }
        mock_users[user.email] = new_user
        return new_user
    
    hashed_password = get_password_hash(user.password)
    db_user = User(
        email=user.email,
        full_name=user.full_name,
        hashed_password=hashed_password
    )
    await db_user.insert()
    return db_user

async def authenticate_user(email: str, password: str):
    user = await get_user_by_email(email)
    if not user:
        return False
    
    # Handle both dict (mock) and User object (database)
    if isinstance(user, dict):
        hashed_password = user.get("hashed_password")
    else:
        hashed_password = user.hashed_password
    
    if not verify_password(password, hashed_password):
        return False
    return user

async def get_current_user(token: str = Depends(oauth2_scheme)):
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    
    email = verify_token(token)
    if email is None:
        raise credentials_exception
    
    user = await get_user_by_email(email=email)
    if user is None:
        raise credentials_exception
    return user

@router.post("/register", response_model=UserSchema)
async def register(user: UserCreate):
    db_user = await get_user_by_email(email=user.email)
    if db_user:
        raise HTTPException(
            status_code=400,
            detail="Email already registered"
        )
    return await create_user(user=user)

@router.post("/login", response_model=Token)
async def login(form_data: OAuth2PasswordRequestForm = Depends()):
    user = await authenticate_user(form_data.username, form_data.password)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect email or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    
    # Handle both dict (mock) and User object (database)
    email = user.get("email") if isinstance(user, dict) else user.email
    
    access_token_expires = timedelta(minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = create_access_token(
        data={"sub": email}, expires_delta=access_token_expires
    )
    return {"access_token": access_token, "token_type": "bearer"}

@router.post("/login-json", response_model=Token)
async def login_json(user_login: UserLogin):
    user = await authenticate_user(user_login.email, user_login.password)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect email or password",
        )
    
    # Handle both dict (mock) and User object (database)
    email = user.get("email") if isinstance(user, dict) else user.email
    
    access_token_expires = timedelta(minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = create_access_token(
        data={"sub": email}, expires_delta=access_token_expires
    )
    return {"access_token": access_token, "token_type": "bearer"}

@router.get("/me", response_model=UserSchema)
async def read_users_me(current_user: User = Depends(get_current_user)):
    return current_user