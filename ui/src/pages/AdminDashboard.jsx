import { Link } from 'react-router-dom'
import { LayoutDashboard, Package, Users, DollarSign, Settings, CheckCircle, X } from 'lucide-react'
import Navbar from '../components/Navbar'
import StatCard from '../components/StatCard'
import Card from '../components/Card'
import Badge from '../components/Badge'
import Button from '../components/Button'
import { listings, users } from '../data/mockData'

const AdminDashboard = () => {
  const pendingListings = listings.filter(l => l.status === 'Pending Approval')
  
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="flex">
        {/* Sidebar */}
        <aside className="w-64 bg-white border-r border-gray-200 min-h-screen sticky top-16">
          <nav className="p-4 space-y-1">
            <Link to="/admin/dashboard" className="flex items-center gap-3 px-4 py-3 text-primary-600 bg-primary-50 rounded-xl font-medium">
              <LayoutDashboard className="w-5 h-5" />
              Dashboard
            </Link>
            <Link to="#" className="flex items-center gap-3 px-4 py-3 text-gray-600 hover:bg-gray-50 rounded-xl">
              <Package className="w-5 h-5" />
              Listings
            </Link>
            <Link to="#" className="flex items-center gap-3 px-4 py-3 text-gray-600 hover:bg-gray-50 rounded-xl">
              <Users className="w-5 h-5" />
              Users
            </Link>
            <Link to="#" className="flex items-center gap-3 px-4 py-3 text-gray-600 hover:bg-gray-50 rounded-xl">
              <DollarSign className="w-5 h-5" />
              Revenue
            </Link>
            <Link to="#" className="flex items-center gap-3 px-4 py-3 text-gray-600 hover:bg-gray-50 rounded-xl">
              <Settings className="w-5 h-5" />
              Settings
            </Link>
          </nav>
        </aside>
        
        {/* Main Content */}
        <main className="flex-1 p-8">
          <div className="max-w-7xl mx-auto">
            {/* Header */}
            <div className="mb-8 animate-slide-up opacity-0 [animation-delay:0ms] [animation-fill-mode:forwards]">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Admin Dashboard</h1>
              <p className="text-gray-600">Manage platform operations and monitor activity</p>
            </div>
            
            {/* Stats Cards */}
            <div className="grid md:grid-cols-4 gap-6 mb-8">
              <div className="animate-scale-in opacity-0 [animation-delay:100ms] [animation-fill-mode:forwards]">
                <StatCard
                  title="Total Listings"
                  value="247"
                  icon={Package}
                  trend="up"
                  trendValue="+12 this week"
                />
              </div>
              <div className="animate-scale-in opacity-0 [animation-delay:200ms] [animation-fill-mode:forwards]">
                <StatCard
                  title="Active Users"
                  value="15,234"
                  icon={Users}
                  trend="up"
                  trendValue="+8%"
                />
              </div>
              <div className="animate-scale-in opacity-0 [animation-delay:300ms] [animation-fill-mode:forwards]">
                <StatCard
                  title="Total Revenue"
                  value="$2.4M"
                  icon={DollarSign}
                  trend="up"
                  trendValue="+15%"
                />
              </div>
              <div className="animate-scale-in opacity-0 [animation-delay:400ms] [animation-fill-mode:forwards]">
                <StatCard
                  title="Pending Approvals"
                  value="8"
                  icon={CheckCircle}
                />
              </div>
            </div>
            
            {/* Revenue Chart */}
            <div className="animate-fade-in">
              <Card className="mb-8">
              <div className="p-6 border-b border-gray-200">
                <h2 className="text-xl font-semibold text-gray-900">Revenue Overview</h2>
              </div>
              <div className="p-6">
                <div className="h-80 bg-gradient-to-br from-primary-50 to-primary-100 rounded-xl flex items-center justify-center text-gray-600">
                  Revenue Chart Placeholder
                  <br />
                  (Line chart showing monthly revenue trends)
                </div>
              </div>
            </Card>
            </div>
            
            {/* Pending Listings Approval */}
            <div className="animate-slide-in-right">
              <Card className="mb-8">
              <div className="p-6 border-b border-gray-200">
                <h2 className="text-xl font-semibold text-gray-900">Pending Listings Approval</h2>
              </div>
              
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 border-b border-gray-200">
                    <tr>
                      <th className="px-6 py-4 text-left text-sm font-medium text-gray-600">Channel</th>
                      <th className="px-6 py-4 text-left text-sm font-medium text-gray-600">Seller</th>
                      <th className="px-6 py-4 text-left text-sm font-medium text-gray-600">Price</th>
                      <th className="px-6 py-4 text-left text-sm font-medium text-gray-600">Submitted</th>
                      <th className="px-6 py-4 text-left text-sm font-medium text-gray-600">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {pendingListings.map(listing => (
                      <tr key={listing.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4">
                          <div className="font-medium text-gray-900">{listing.channel}</div>
                        </td>
                        <td className="px-6 py-4 text-gray-900">John Smith</td>
                        <td className="px-6 py-4 text-gray-900">{listing.price}</td>
                        <td className="px-6 py-4 text-gray-600">{listing.listed}</td>
                        <td className="px-6 py-4">
                          <div className="flex gap-2">
                            <Button size="sm" variant="primary">
                              <CheckCircle className="w-4 h-4" />
                              Approve
                            </Button>
                            <Button size="sm" variant="danger">
                              <X className="w-4 h-4" />
                              Reject
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>
            </div>
            
            {/* User Management */}
            <div className="animate-slide-in-left">
              <Card>
              <div className="p-6 border-b border-gray-200">
                <h2 className="text-xl font-semibold text-gray-900">Recent Users</h2>
              </div>
              
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 border-b border-gray-200">
                    <tr>
                      <th className="px-6 py-4 text-left text-sm font-medium text-gray-600">Name</th>
                      <th className="px-6 py-4 text-left text-sm font-medium text-gray-600">Email</th>
                      <th className="px-6 py-4 text-left text-sm font-medium text-gray-600">Role</th>
                      <th className="px-6 py-4 text-left text-sm font-medium text-gray-600">Joined</th>
                      <th className="px-6 py-4 text-left text-sm font-medium text-gray-600">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {users.map(user => (
                      <tr key={user.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 text-gray-900">{user.name}</td>
                        <td className="px-6 py-4 text-gray-600">{user.email}</td>
                        <td className="px-6 py-4">
                          <Badge variant={user.role === 'Seller' ? 'primary' : 'default'}>
                            {user.role}
                          </Badge>
                        </td>
                        <td className="px-6 py-4 text-gray-600">{user.joined}</td>
                        <td className="px-6 py-4">
                          <Badge variant="success">{user.status}</Badge>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}

export default AdminDashboard
