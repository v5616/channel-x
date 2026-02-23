# ChannelX - YouTube Channel Marketplace

A complete full-stack marketplace for buying and selling YouTube channels with escrow protection and secure transactions.

## Project Structure

```
youtube/
├── ui/                 # React frontend
│   ├── src/
│   ├── package.json
│   └── README.md
├── backend/            # FastAPI backend
│   ├── app/
│   ├── requirements.txt
│   └── README.md
└── README.md          # This file
```

## Quick Start

### Frontend (UI)
```bash
cd youtube/ui
npm install
npm run dev
```
Frontend will be available at `http://localhost:5173`

### Backend (API)
```bash
cd youtube/backend
pip3 install -r requirements.txt
python3 run.py
```
Backend will be available at `http://localhost:8000`

## Development Workflow

1. **Start Backend**: Navigate to `youtube/backend` and run `python3 run.py`
2. **Start Frontend**: Navigate to `youtube/ui` and run `npm run dev`
3. **Access Application**: Open `http://localhost:5173` in your browser
4. **API Documentation**: Visit `http://localhost:8000/docs` for API docs

## Features

### Frontend
- Modern React UI with Tailwind CSS
- Responsive design with animations
- User authentication and dashboards
- Channel marketplace with filters
- Real-time messaging interface
- Admin panel for platform management

### Backend
- FastAPI with MongoDB Atlas
- JWT authentication
- RESTful API endpoints
- Automatic API documentation
- User roles and permissions
- Secure password hashing

## Tech Stack

**Frontend:**
- React 18
- React Router 6
- Tailwind CSS 3
- Lucide React (icons)
- Vite

**Backend:**
- FastAPI
- MongoDB Atlas
- Beanie ODM
- JWT Authentication
- Pydantic validation

## Demo Credentials

For testing the application:
- Email: `test@gmail.com`
- Password: `test@123`

## API Documentation

Once the backend is running, visit:
- Swagger UI: `http://localhost:8000/docs`
- ReDoc: `http://localhost:8000/redoc`

## Database

The application uses MongoDB Atlas with the following collections:
- `users` - User accounts and authentication
- `channel_listings` - YouTube channel listings
- `transactions` - Purchase transactions
- `messages` - User messaging system

## Development

Both frontend and backend support hot-reload for development. Make changes to the code and see them reflected immediately.

## License

MIT