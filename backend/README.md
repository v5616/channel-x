# ChannelX Backend API

FastAPI backend for the ChannelX YouTube channel marketplace with MongoDB Atlas integration.

## Features

- **FastAPI Framework**: Modern, fast web framework for building APIs
- **MongoDB Atlas**: Cloud database with Beanie ODM
- **JWT Authentication**: Secure user authentication and authorization
- **User Roles**: Support for buyers, sellers, and admins
- **Channel Management**: CRUD operations for YouTube channel listings
- **File Uploads**: Support for channel images and attachments
- **API Documentation**: Automatic OpenAPI/Swagger documentation

## Tech Stack

- **FastAPI** - Web framework
- **MongoDB Atlas** - Cloud database
- **Beanie** - Async ODM for MongoDB
- **JWT** - Authentication tokens
- **Pydantic** - Data validation and serialization
- **Uvicorn** - ASGI server

## Getting Started

### Prerequisites

- Python 3.8+
- MongoDB Atlas account (credentials provided)

### Installation

```bash
# Install dependencies
pip3 install -r requirements.txt

# Copy environment variables
cp .env.example .env

# Start the server
python3 run.py
```

The API will be available at `http://localhost:8000`

### API Documentation

Once running, visit:
- **Swagger UI**: `http://localhost:8000/docs`
- **ReDoc**: `http://localhost:8000/redoc`

## Environment Variables

Create a `.env` file with:

```env
MONGODB_URL=mongodb+srv://rvishal5616_db_user:poLeiARCwt8ixBE0@cluster0.mongodb.net/channelx_db?retryWrites=true&w=majority
DATABASE_NAME=channelx_db
SECRET_KEY=your-secret-key-here
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=30
```

## Project Structure

```
app/
├── api/                # API routes
│   └── v1/
│       └── endpoints/
│           ├── auth.py
│           ├── channels.py
│           └── users.py
├── core/               # Core functionality
│   ├── config.py       # Configuration settings
│   └── security.py     # Authentication utilities
├── db/                 # Database models and connection
│   ├── database.py     # Database connection
│   └── models.py       # Beanie models
├── schemas/            # Pydantic schemas
│   ├── channel.py      # Channel-related schemas
│   └── user.py         # User-related schemas
└── main.py             # FastAPI application
```

## API Endpoints

### Authentication
- `POST /api/v1/auth/register` - User registration
- `POST /api/v1/auth/login` - User login
- `GET /api/v1/auth/me` - Get current user

### Users
- `GET /api/v1/users/` - List users (admin only)
- `GET /api/v1/users/{user_id}` - Get user by ID
- `PUT /api/v1/users/{user_id}` - Update user
- `DELETE /api/v1/users/{user_id}` - Delete user

### Channels
- `GET /api/v1/channels/` - List channel listings
- `POST /api/v1/channels/` - Create new listing
- `GET /api/v1/channels/{channel_id}` - Get channel details
- `PUT /api/v1/channels/{channel_id}` - Update listing
- `DELETE /api/v1/channels/{channel_id}` - Delete listing

## Database Models

### User Model
```python
class User(Document):
    email: EmailStr
    full_name: str
    hashed_password: str
    role: UserRole = UserRole.BUYER
    is_verified: bool = False
    created_at: datetime
```

### Channel Listing Model
```python
class ChannelListing(Document):
    channel_name: str
    channel_url: str
    niche: str
    subscribers: str
    monthly_revenue: str
    asking_price: float
    seller_id: PydanticObjectId
    status: ListingStatus = ListingStatus.PENDING
    # ... other fields
```

## Authentication

The API uses JWT tokens for authentication:

1. Register or login to get an access token
2. Include token in Authorization header: `Bearer <token>`
3. Tokens expire after 30 minutes (configurable)

## User Roles

- **BUYER**: Can browse and purchase channels
- **SELLER**: Can create and manage listings
- **ADMIN**: Full platform access and management

## Development

### Running Tests
```bash
# Install test dependencies
pip install pytest pytest-asyncio

# Run tests
pytest
```

### Database Migrations
The application uses Beanie ODM which handles schema changes automatically.

### Adding New Endpoints
1. Create route in `app/api/v1/endpoints/`
2. Add Pydantic schemas in `app/schemas/`
3. Update database models if needed in `app/db/models.py`

## Deployment

### Production Setup
1. Set strong SECRET_KEY in environment
2. Use production MongoDB cluster
3. Configure CORS for your frontend domain
4. Use HTTPS in production
5. Set up proper logging and monitoring

### Docker Deployment
```dockerfile
FROM python:3.9-slim
WORKDIR /app
COPY requirements.txt .
RUN pip install -r requirements.txt
COPY . .
CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000"]
```

## Security Features

- Password hashing with bcrypt
- JWT token authentication
- Input validation with Pydantic
- CORS configuration
- Rate limiting (can be added)
- SQL injection prevention (NoSQL)

## Contributing

1. Follow PEP 8 style guidelines
2. Add type hints to all functions
3. Write tests for new endpoints
4. Update API documentation
5. Ensure proper error handling