import { Link } from 'react-router-dom'
import { LayoutDashboard, ShoppingBag, Heart, Receipt, MessageCircle, Settings } from 'lucide-react'
import Navbar from '../components/Navbar'
import StatCard from '../components/StatCard'
import Card from '../components/Card'
import Badge from '../components/Badge'
import { channels, transactions } from '../data/mockData'

const BuyerDashboard = () => {
  const purchasedChannels = channels.slice(0, 2)
  const savedChannels = channels.slice(2, 4)
  
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="flex">
        {/* Sidebar */}
        <aside className="w-64 bg-white border-r border-gray-200 min-h-screen sticky top-16">
          <nav className="p-4 space-y-1">
            <Link to="/buyer/dashboard" className="flex items-center gap-3 px-4 py-3 text-primary-600 bg-primary-50 rounded-xl font-medium">
              <LayoutDashboard className="w-5 h-5" />
              Dashboard
            </Link>
            <Link to="#" className="flex items-center gap-3 px-4 py-3 text-gray-600 hover:bg-gray-50 rounded-xl">
              <ShoppingBag className="w-5 h-5" />
              Purchased
            </Link>
            <Link to="#" className="flex items-center gap-3 px-4 py-3 text-gray-600 hover:bg-gray-50 rounded-xl">
              <Heart className="w-5 h-5" />
              Saved
            </Link>
            <Link to="#" className="flex items-center gap-3 px-4 py-3 text-gray-600 hover:bg-gray-50 rounded-xl">
              <Receipt className="w-5 h-5" />
              Transactions
            </Link>
            <Link to="/chat" className="flex items-center gap-3 px-4 py-3 text-gray-600 hover:bg-gray-50 rounded-xl">
              <MessageCircle className="w-5 h-5" />
              Messages
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
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Buyer Dashboard</h1>
              <p className="text-gray-600">Track your purchases and saved channels</p>
            </div>
            
            {/* Stats Cards */}
            <div className="grid md:grid-cols-4 gap-6 mb-8">
              <div className="animate-scale-in opacity-0 [animation-delay:100ms] [animation-fill-mode:forwards]">
                <StatCard
                  title="Purchased"
                  value="2"
                  icon={ShoppingBag}
                />
              </div>
              <div className="animate-scale-in opacity-0 [animation-delay:200ms] [animation-fill-mode:forwards]">
                <StatCard
                  title="Saved Channels"
                  value="8"
                  icon={Heart}
                />
              </div>
              <div className="animate-scale-in opacity-0 [animation-delay:300ms] [animation-fill-mode:forwards]">
                <StatCard
                  title="Total Spent"
                  value="$203K"
                  icon={Receipt}
                />
              </div>
              <div className="animate-scale-in opacity-0 [animation-delay:400ms] [animation-fill-mode:forwards]">
                <StatCard
                  title="Active Deals"
                  value="1"
                  icon={MessageCircle}
                />
              </div>
            </div>
            
            {/* Purchased Channels */}
            <div className="animate-fade-in">
              <Card className="mb-8">
              <div className="p-6 border-b border-gray-200">
                <h2 className="text-xl font-semibold text-gray-900">Purchased Channels</h2>
              </div>
              
              <div className="p-6">
                <div className="grid md:grid-cols-2 gap-6">
                  {purchasedChannels.map(channel => (
                    <Card key={channel.id} hover className="overflow-hidden">
                      <div className="aspect-video bg-gradient-to-br from-primary-100 to-primary-200">
                        <img 
                          src={channel.banner} 
                          alt={channel.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="p-5">
                        <h3 className="font-semibold text-lg text-gray-900 mb-2">{channel.name}</h3>
                        <p className="text-sm text-gray-600 mb-4">{channel.niche}</p>
                        <div className="flex items-center justify-between">
                          <Badge variant="success">Transfer Complete</Badge>
                          <Link to={`/channel/${channel.id}`} className="text-primary-600 hover:text-primary-700 text-sm font-medium">
                            View Details →
                          </Link>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>
            </Card>
            </div>
            
            {/* Saved Channels */}
            <div className="animate-slide-in-right">
              <Card className="mb-8">
              <div className="p-6 border-b border-gray-200">
                <h2 className="text-xl font-semibold text-gray-900">Saved Channels</h2>
              </div>
              
              <div className="p-6">
                <div className="grid md:grid-cols-2 gap-6">
                  {savedChannels.map(channel => (
                    <Card key={channel.id} hover className="overflow-hidden">
                      <div className="aspect-video bg-gradient-to-br from-primary-100 to-primary-200">
                        <img 
                          src={channel.banner} 
                          alt={channel.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="p-5">
                        <h3 className="font-semibold text-lg text-gray-900 mb-2">{channel.name}</h3>
                        <p className="text-sm text-gray-600 mb-4">{channel.niche}</p>
                        <div className="flex items-center justify-between">
                          <span className="text-2xl font-bold text-gray-900">${channel.price}</span>
                          <Link to={`/channel/${channel.id}`} className="text-primary-600 hover:text-primary-700 text-sm font-medium">
                            View Details →
                          </Link>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>
            </Card>
            </div>
            
            {/* Transaction History */}
            <div className="animate-slide-in-left">
              <Card>
              <div className="p-6 border-b border-gray-200">
                <h2 className="text-xl font-semibold text-gray-900">Transaction History</h2>
              </div>
              
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 border-b border-gray-200">
                    <tr>
                      <th className="px-6 py-4 text-left text-sm font-medium text-gray-600">Transaction ID</th>
                      <th className="px-6 py-4 text-left text-sm font-medium text-gray-600">Channel</th>
                      <th className="px-6 py-4 text-left text-sm font-medium text-gray-600">Amount</th>
                      <th className="px-6 py-4 text-left text-sm font-medium text-gray-600">Date</th>
                      <th className="px-6 py-4 text-left text-sm font-medium text-gray-600">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {transactions.map(transaction => (
                      <tr key={transaction.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 text-gray-900 font-mono text-sm">{transaction.id}</td>
                        <td className="px-6 py-4 text-gray-900">{transaction.channel}</td>
                        <td className="px-6 py-4 text-gray-900 font-semibold">{transaction.amount}</td>
                        <td className="px-6 py-4 text-gray-600">{transaction.date}</td>
                        <td className="px-6 py-4">
                          <Badge variant={
                            transaction.status === 'Completed' ? 'success' :
                            transaction.status === 'In Escrow' ? 'warning' :
                            'default'
                          }>
                            {transaction.status}
                          </Badge>
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

export default BuyerDashboard
