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
        </Routes>
      </AuthProvider>
    </Router>
  )
}


export default App