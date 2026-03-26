import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import LandingPage from './pages/LandingPage'
import LoginPage from './pages/LoginPage'
import SignupPage from './pages/SignupPage'
import ProfilePage from './pages/ProfilePage'
import SellerProfilePage from './pages/SellerProfilePage'
import HowItWorksPage from './pages/HowItWorksPage'
import MarketplacePage from './pages/MarketplacePage'
import ChannelDetailsPage from './pages/ChannelDetailsPage'
import SellerDashboard from './pages/SellerDashboard'
import BuyerDashboard from './pages/BuyerDashboard'
import AdminDashboard from './pages/AdminDashboard'
import ChatPage from './pages/ChatPage'
import ApiTestPage from './pages/ApiTestPage'

const NotFoundPage = () => (
  <div className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50 flex items-center justify-center">
    <div className="text-center">
      <div className="text-8xl font-black text-primary-600 mb-4">404</div>
      <h1 className="text-3xl font-black text-neutral-900 mb-2">Page Not Found</h1>
      <p className="text-neutral-500 mb-8">The page you're looking for doesn't exist.</p>
      <a href="/" className="px-6 py-3 bg-gradient-to-r from-primary-600 to-orange-500 text-white rounded-2xl font-bold shadow-lg hover:opacity-90 transition-opacity">
        Go Home
      </a>
    </div>
  </div>
)

function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/seller/:id" element={<SellerProfilePage />} />
          <Route path="/how-it-works" element={<HowItWorksPage />} />
          <Route path="/marketplace" element={<MarketplacePage />} />
          <Route path="/channel/:id" element={<ChannelDetailsPage />} />
          <Route path="/seller/dashboard" element={<SellerDashboard />} />
          <Route path="/buyer/dashboard" element={<BuyerDashboard />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/chat" element={<ChatPage />} />
          <Route path="/api-test" element={<ApiTestPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </AuthProvider>
    </Router>
  )
}

export default App