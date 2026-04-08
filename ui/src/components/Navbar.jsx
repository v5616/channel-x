import { Link, useNavigate } from 'react-router-dom'
import { Youtube, User, ChevronDown, LogOut, Menu, X } from 'lucide-react'
import { useState } from 'react'
import Button from './Button'
import { useAuth } from '../context/AuthContext'


const Navbar = ({ transparent = false }) => {
  const navigate = useNavigate()
  const { user, logout } = useAuth()
  const [showDropdown, setShowDropdown] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  const handleLogout = () => {
    logout()
    setShowDropdown(false)
    setMobileOpen(false)
    navigate('/')
  }


  console.log(showDropdown,mobileOpen,"@@@")
  return (
    <nav className={`${transparent ? 'bg-transparent' : 'bg-white border-b border-orange-100'} sticky top-0 z-50 shadow-sm`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <div className="p-2 bg-gradient-to-br from-primary-600 to-orange-600 rounded-xl shadow-lg">
              <Youtube className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-black bg-gradient-to-r from-primary-600 to-orange-600 bg-clip-text text-transparent">ChannelX</span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            <Link to="/marketplace" className="text-neutral-600 hover:text-primary-600 transition-colors font-semibold">Marketplace</Link>
            <Link to={user ? "/seller/dashboard" : "/login"} className="text-neutral-600 hover:text-primary-600 transition-colors font-semibold">Sell</Link>
            <Link to="/how-it-works" className="text-neutral-600 hover:text-primary-600 transition-colors font-semibold">How it Works</Link>
          </div>

          {/* Desktop Right */}
          <div className="hidden md:flex items-center gap-3">
            {user ? (
              <div className="relative">
                <button onClick={() => setShowDropdown(!showDropdown)}
                  className="flex items-center gap-2 px-4 py-2 rounded-xl hover:bg-orange-50 transition-colors">
                  <div className="w-8 h-8 bg-gradient-to-br from-primary-500 to-orange-500 rounded-full flex items-center justify-center">
                    <span className="text-sm font-black text-white">
                      {(user?.full_name?.[0] || user?.email?.[0] || 'U').toUpperCase()}
                    </span>
                  </div>
                  <span className="text-sm font-semibold text-neutral-700 max-w-[120px] truncate">{user.full_name || user.email}</span>
                  <ChevronDown className="w-4 h-4 text-neutral-500" />
                </button>
                {showDropdown && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-2xl shadow-xl border-2 border-orange-100 py-2 z-50">
                    <Link to="/profile" onClick={() => setShowDropdown(false)}
                      className="flex items-center gap-2 px-4 py-2.5 text-neutral-700 hover:bg-orange-50 font-medium">
                      <User className="w-4 h-4" />My Profile
                    </Link>
                    <Link to="/seller/dashboard" onClick={() => setShowDropdown(false)}
                      className="flex items-center gap-2 px-4 py-2.5 text-neutral-700 hover:bg-orange-50 font-medium">
                      My Listings
                    </Link>
                    <Link to="/buyer/dashboard" onClick={() => setShowDropdown(false)}
                      className="flex items-center gap-2 px-4 py-2.5 text-neutral-700 hover:bg-orange-50 font-medium">
                      Purchases
                    </Link>
                    <div className="border-t-2 border-orange-100 my-1"></div>
                    <button onClick={handleLogout}
                      className="flex items-center gap-2 px-4 py-2.5 text-red-600 hover:bg-red-50 w-full text-left font-medium">
                      <LogOut className="w-4 h-4" />Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <>
                <Link to="/login"><Button variant="ghost" size="sm">Login</Button></Link>
                <Link to="/signup"><Button variant="primary" size="sm">Sign Up</Button></Link>
              </>
            )}
          </div>

          {/* Mobile hamburger */}
          <button onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden p-2 rounded-xl hover:bg-orange-50 transition-colors">
            {mobileOpen ? <X className="w-6 h-6 text-neutral-700" /> : <Menu className="w-6 h-6 text-neutral-700" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden bg-white border-t-2 border-orange-100 px-4 py-4 space-y-1 shadow-xl">
          <Link to="/marketplace" onClick={() => setMobileOpen(false)}
            className="flex items-center px-4 py-3 text-neutral-700 hover:bg-orange-50 rounded-2xl font-semibold">Marketplace</Link>
          <Link to={user ? "/seller/dashboard" : "/login"} onClick={() => setMobileOpen(false)}
            className="flex items-center px-4 py-3 text-neutral-700 hover:bg-orange-50 rounded-2xl font-semibold">Sell</Link>
          <Link to="/how-it-works" onClick={() => setMobileOpen(false)}
            className="flex items-center px-4 py-3 text-neutral-700 hover:bg-orange-50 rounded-2xl font-semibold">How it Works</Link>

          <div className="border-t-2 border-orange-100 pt-3 mt-3">
            {user ? (
              <>
                <div className="flex items-center gap-3 px-4 py-3 mb-2">
                  <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-orange-500 rounded-full flex items-center justify-center">
                    <span className="text-white font-black">{(user?.full_name?.[0] || user?.email?.[0] || 'U').toUpperCase()}</span>
                  </div>
                  <div>
                    <div className="font-bold text-neutral-900 text-sm">{user.full_name || user.email}</div>
                    <div className="text-xs text-neutral-500">{user.email}</div>
                  </div>
                </div>
                <Link to="/profile" onClick={() => setMobileOpen(false)}
                  className="flex items-center gap-2 px-4 py-3 text-neutral-700 hover:bg-orange-50 rounded-2xl font-medium">
                  <User className="w-4 h-4" />My Profile
                </Link>
                <Link to="/seller/dashboard" onClick={() => setMobileOpen(false)}
                  className="flex items-center gap-2 px-4 py-3 text-neutral-700 hover:bg-orange-50 rounded-2xl font-medium">My Listings</Link>
                <Link to="/buyer/dashboard" onClick={() => setMobileOpen(false)}
                  className="flex items-center gap-2 px-4 py-3 text-neutral-700 hover:bg-orange-50 rounded-2xl font-medium">Purchases</Link>
                <button onClick={handleLogout}
                  className="flex items-center gap-2 px-4 py-3 text-red-600 hover:bg-red-50 rounded-2xl w-full font-medium">
                  <LogOut className="w-4 h-4" />Logout
                </button>
              </>
            ) : (
              <div className="flex gap-3 px-4">
                <Link to="/login" onClick={() => setMobileOpen(false)} className="flex-1">
                  <Button variant="outline" className="w-full">Login</Button>
                </Link>
                <Link to="/signup" onClick={() => setMobileOpen(false)} className="flex-1">
                  <Button variant="primary" className="w-full">Sign Up</Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  )
}

export default Navbar
