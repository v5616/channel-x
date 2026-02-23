# ChannelX Frontend

Modern React frontend for the ChannelX YouTube channel marketplace.

## Features

- **Modern UI**: Built with React 18 and Tailwind CSS
- **Responsive Design**: Works on all devices
- **Animations**: Smooth transitions and micro-interactions
- **Authentication**: User login/signup with demo credentials
- **Dashboards**: Separate interfaces for buyers, sellers, and admins
- **Marketplace**: Browse and filter YouTube channels
- **Real-time Chat**: Messaging between buyers and sellers

## Tech Stack

- **React 18** - UI framework
- **React Router 6** - Client-side routing
- **Tailwind CSS 3** - Styling and responsive design
- **Lucide React** - Icon library
- **Vite** - Build tool and dev server

## Getting Started

### Prerequisites

- Node.js 16+ and npm

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

The application will be available at `http://localhost:5173`

### Build for Production

```bash
npm run build
```

## Demo Credentials

For testing the application:
- **Email**: `test@gmail.com`
- **Password**: `test@123`

## Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── Badge.jsx
│   ├── Button.jsx
│   ├── Card.jsx
│   ├── ChannelCard.jsx
│   ├── Footer.jsx
│   ├── Navbar.jsx
│   └── StatCard.jsx
├── context/            # React context providers
│   └── AuthContext.jsx
├── data/               # Mock data and constants
│   └── mockData.js
├── pages/              # Page components
│   ├── AdminDashboard.jsx
│   ├── BuyerDashboard.jsx
│   ├── ChannelDetailsPage.jsx
│   ├── ChatPage.jsx
│   ├── HowItWorksPage.jsx
│   ├── LandingPage.jsx
│   ├── LoginPage.jsx
│   ├── MarketplacePage.jsx
│   ├── ProfilePage.jsx
│   ├── SellerDashboard.jsx
│   ├── SellerProfilePage.jsx
│   └── SignupPage.jsx
├── App.jsx             # Main app component with routing
├── index.css           # Global styles and animations
└── main.jsx            # App entry point
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build

## Features Overview

### Authentication
- Login/signup with form validation
- Password strength requirements
- Demo credentials for testing
- Persistent login state

### Dashboards
- **Seller Dashboard**: Manage listings, view earnings, track performance
- **Buyer Dashboard**: View purchases, saved channels, transaction history
- **Admin Dashboard**: Platform overview, user management, revenue tracking

### Marketplace
- Browse YouTube channels with filters
- Search by niche, price, subscribers
- Detailed channel information
- Seller profiles and ratings

### Animations
- Fade-in effects on page load
- Hover animations on cards and buttons
- Staggered animations for lists
- Smooth transitions between states

## Customization

### Colors
Primary colors can be customized in `tailwind.config.js`:

```javascript
colors: {
  primary: {
    50: '#eff6ff',
    // ... other shades
    900: '#1e3a8a',
  },
}
```

### Animations
Custom animations are defined in `src/index.css` and can be extended in the Tailwind config.

## Contributing

1. Follow the existing code style
2. Use TypeScript for new components when possible
3. Ensure responsive design for all new features
4. Add proper error handling and loading states