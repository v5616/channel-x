import { Link } from 'react-router-dom'
import { User, Mail, Package, DollarSign, Eye, MessageCircle, Settings, LogOut } from 'lucide-react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import Card from '../components/Card'
import StatCard from '../components/StatCard'
import Badge from '../components/Badge'
import Button from '../components/Button'
import { useAuth } from '../context/AuthContext'
import { listings } from '../data/mockData'

const ProfilePage = () => {
  const { user, logout } = useAuth()
  
  // Filter listings for current user (demo: show all for now)
  const myListings = listings
  const activeListings = myListings.filter(l => l.status === 'Active').length
  const soldListings = myListings.filter(l => l.status === 'Sold').length
  const totalViews = myListings.reduce((sum, l) => sum + l.views, 0)
  const totalInquiries = myListings.reduce((sum, l) => sum + l.inquiries, 0)
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Profile Sidebar */}
          <div className="lg:col-span-1">
            <Card className="p-6 mb-6 border-2 border-orange-100">
              <div className="text-center mb-6">
                <div className="w-24 h-24 bg-gradient-to-br from-primary-500 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-4 shadow-xl">
                  <span className="text-3xl font-black text-white">
                    {(user?.full_name?.[0] || user?.email?.[0] || 'U').toUpperCase()}
                  </span>
                </div>
                <h2 className="text-2xl font-black text-neutral-900 mb-1">{user?.full_name || user?.email}</h2>
                <p className="text-neutral-500">{user?.email}</p>
              </div>
              
              <div className="space-y-1">
                <Link to="/profile" className="flex items-center gap-3 px-4 py-3 text-white bg-gradient-to-r from-primary-600 to-orange-500 rounded-2xl font-semibold shadow-lg">
                  <User className="w-5 h-5" />
                  My Profile
                </Link>
                <Link to="/seller/dashboard" className="flex items-center gap-3 px-4 py-3 text-neutral-600 hover:bg-orange-50 hover:text-primary-600 rounded-2xl font-semibold transition-all">
                  <Package className="w-5 h-5" />
                  My Listings
                </Link>
                <Link to="/buyer/dashboard" className="flex items-center gap-3 px-4 py-3 text-neutral-600 hover:bg-orange-50 hover:text-primary-600 rounded-2xl font-semibold transition-all">
                  <DollarSign className="w-5 h-5" />
                  Purchases
                </Link>
                <Link to="/chat" className="flex items-center gap-3 px-4 py-3 text-neutral-600 hover:bg-orange-50 hover:text-primary-600 rounded-2xl font-semibold transition-all">
                  <MessageCircle className="w-5 h-5" />
                  Messages
                </Link>
                <Link to="#" className="flex items-center gap-3 px-4 py-3 text-neutral-600 hover:bg-orange-50 hover:text-primary-600 rounded-2xl font-semibold transition-all">
                  <Settings className="w-5 h-5" />
                  Settings
                </Link>
              </div>
              
              <div className="mt-6 pt-6 border-t-2 border-orange-100">
                <button onClick={logout}
                  className="flex items-center gap-3 px-4 py-3 text-red-600 hover:bg-red-50 rounded-2xl w-full font-semibold transition-all">
                  <LogOut className="w-5 h-5" />
                  Logout
                </button>
              </div>
            </Card>
          </div>
          
          {/* Main Content */}
          <div className="lg:col-span-2">
            <div className="mb-6">
              <h2 className="text-2xl font-black text-neutral-900 mb-4">Overview</h2>
              <div className="grid md:grid-cols-2 gap-4">
                <StatCard title="Active Listings" value={activeListings} icon={Package} />
                <StatCard title="Sold Channels" value={soldListings} icon={DollarSign} />
                <StatCard title="Total Views" value={totalViews} icon={Eye} />
                <StatCard title="Total Inquiries" value={totalInquiries} icon={MessageCircle} />
              </div>
            </div>
            
            <Card className="border-2 border-orange-100">
              <div className="p-6 border-b border-orange-100 flex justify-between items-center">
                <h2 className="text-xl font-black text-neutral-900">My Channels</h2>
                <Link to="/seller/dashboard">
                  <Button size="sm"><Package className="w-4 h-4" /> Add New Channel</Button>
                </Link>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-orange-50 border-b border-orange-100">
                    <tr>
                      <th className="px-6 py-4 text-left text-sm font-bold text-neutral-600 uppercase tracking-wide">Channel</th>
                      <th className="px-6 py-4 text-left text-sm font-bold text-neutral-600 uppercase tracking-wide">Price</th>
                      <th className="px-6 py-4 text-left text-sm font-bold text-neutral-600 uppercase tracking-wide">Status</th>
                      <th className="px-6 py-4 text-left text-sm font-bold text-neutral-600 uppercase tracking-wide">Views</th>
                      <th className="px-6 py-4 text-left text-sm font-bold text-neutral-600 uppercase tracking-wide">Inquiries</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-orange-50">
                    {myListings.map(listing => (
                      <tr key={listing.id} className="hover:bg-orange-50 transition-colors">
                        <td className="px-6 py-4">
                          <div className="font-bold text-neutral-900">{listing.channel}</div>
                          <a href={listing.channelUrl} target="_blank" rel="noopener noreferrer"
                            className="text-xs text-primary-600 hover:text-primary-700">View Channel →</a>
                        </td>
                        <td className="px-6 py-4 font-semibold text-neutral-900">{listing.price}</td>
                        <td className="px-6 py-4">
                          <Badge variant={listing.status === 'Active' ? 'success' : listing.status === 'Sold' ? 'default' : 'warning'}>
                            {listing.status}
                          </Badge>
                        </td>
                        <td className="px-6 py-4 text-neutral-700">{listing.views}</td>
                        <td className="px-6 py-4 text-neutral-700">{listing.inquiries}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>
            
            <Card className="mt-6 p-6 border-2 border-orange-100">
              <h2 className="text-xl font-black text-neutral-900 mb-6">Account Information</h2>
              <div className="space-y-4">
                <div className="flex items-center gap-4 p-4 bg-orange-50 rounded-2xl">
                  <div className="p-2 bg-gradient-to-br from-primary-500 to-orange-500 rounded-xl">
                    <User className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <div className="text-xs text-neutral-500 font-medium uppercase tracking-wide">Full Name</div>
                    <div className="font-bold text-neutral-900">{user?.full_name || '—'}</div>
                  </div>
                </div>
                <div className="flex items-center gap-4 p-4 bg-orange-50 rounded-2xl">
                  <div className="p-2 bg-gradient-to-br from-primary-500 to-orange-500 rounded-xl">
                    <Mail className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <div className="text-xs text-neutral-500 font-medium uppercase tracking-wide">Email Address</div>
                    <div className="font-bold text-neutral-900">{user?.email}</div>
                  </div>
                </div>
                <div className="flex items-center gap-4 p-4 bg-orange-50 rounded-2xl">
                  <div className="p-2 bg-gradient-to-br from-primary-500 to-orange-500 rounded-xl">
                    <Package className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <div className="text-xs text-neutral-500 font-medium uppercase tracking-wide">Member Since</div>
                    <div className="font-bold text-neutral-900">
                      {user?.created_at
                        ? new Date(user.created_at).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })
                        : '—'}
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  )
}

export default ProfilePage
