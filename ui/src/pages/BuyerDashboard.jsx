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
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50">
      <Navbar />
      
      <div className="flex">
        {/* Sidebar */}
        <aside className="w-64 bg-white border-r border-orange-100 min-h-screen sticky top-16 shadow-sm">
          <nav className="p-4 space-y-1">
            <Link to="/buyer/dashboard" className="flex items-center gap-3 px-4 py-3 text-white bg-gradient-to-r from-primary-600 to-orange-500 rounded-2xl font-semibold shadow-lg">
              <LayoutDashboard className="w-5 h-5" />
              Dashboard
            </Link>
            <Link to="#" className="flex items-center gap-3 px-4 py-3 text-neutral-600 hover:bg-orange-50 hover:text-primary-600 rounded-2xl font-semibold transition-all">
              <ShoppingBag className="w-5 h-5" />
              Purchased
            </Link>
            <Link to="#" className="flex items-center gap-3 px-4 py-3 text-neutral-600 hover:bg-orange-50 hover:text-primary-600 rounded-2xl font-semibold transition-all">
              <Heart className="w-5 h-5" />
              Saved
            </Link>
            <Link to="#" className="flex items-center gap-3 px-4 py-3 text-neutral-600 hover:bg-orange-50 hover:text-primary-600 rounded-2xl font-semibold transition-all">
              <Receipt className="w-5 h-5" />
              Transactions
            </Link>
            <Link to="/chat" className="flex items-center gap-3 px-4 py-3 text-neutral-600 hover:bg-orange-50 hover:text-primary-600 rounded-2xl font-semibold transition-all">
              <MessageCircle className="w-5 h-5" />
              Messages
            </Link>
            <Link to="#" className="flex items-center gap-3 px-4 py-3 text-neutral-600 hover:bg-orange-50 hover:text-primary-600 rounded-2xl font-semibold transition-all">
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
              <h1 className="text-3xl font-black text-neutral-900 mb-2">Buyer Dashboard</h1>
              <p className="text-neutral-500">Track your purchases and saved channels</p>
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
            <div className="animate-fade-in">
              <Card className="mb-8">
              <div className="p-6 border-b border-orange-100">
                <h2 className="text-xl font-black text-neutral-900">Purchased Channels</h2>
              </div>
              
              <div className="p-6">
                <div className="grid md:grid-cols-2 gap-6">
                  {purchasedChannels.map(channel => (
                    <Card key={channel.id} hover className="overflow-hidden border-2 border-orange-100">
                      <div className="aspect-video bg-gradient-to-br from-primary-100 to-orange-100">
                        <img src={channel.banner} alt={channel.name} className="w-full h-full object-cover"
                          onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=800&q=80' }} />
                      </div>
                      <div className="p-5">
                        <h3 className="font-black text-lg text-neutral-900 mb-1">{channel.name}</h3>
                        <p className="text-sm text-neutral-500 mb-4">{channel.niche}</p>
                        <div className="flex items-center justify-between">
                          <Badge variant="success">Transfer Complete</Badge>
                          <Link to={`/channel/${channel.id}`} className="text-primary-600 hover:text-primary-700 text-sm font-bold">
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
              <div className="p-6 border-b border-orange-100">
                <h2 className="text-xl font-black text-neutral-900">Saved Channels</h2>
              </div>
              
              <div className="p-6">
                <div className="grid md:grid-cols-2 gap-6">
                  {savedChannels.map(channel => (
                    <Card key={channel.id} hover className="overflow-hidden border-2 border-orange-100">
                      <div className="aspect-video bg-gradient-to-br from-primary-100 to-orange-100">
                        <img src={channel.banner} alt={channel.name} className="w-full h-full object-cover"
                          onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=800&q=80' }} />
                      </div>
                      <div className="p-5">
                        <h3 className="font-black text-lg text-neutral-900 mb-1">{channel.name}</h3>
                        <p className="text-sm text-neutral-500 mb-4">{channel.niche}</p>
                        <div className="flex items-center justify-between">
                          <span className="text-2xl font-black text-neutral-900">${channel.price}</span>
                          <Link to={`/channel/${channel.id}`} className="text-primary-600 hover:text-primary-700 text-sm font-bold">
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
              <div className="p-6 border-b border-orange-100">
                <h2 className="text-xl font-black text-neutral-900">Transaction History</h2>
              </div>
              
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-orange-50 border-b border-orange-100">
                    <tr>
                      <th className="px-6 py-4 text-left text-sm font-bold text-neutral-600 uppercase tracking-wide">Transaction ID</th>
                      <th className="px-6 py-4 text-left text-sm font-bold text-neutral-600 uppercase tracking-wide">Channel</th>
                      <th className="px-6 py-4 text-left text-sm font-bold text-neutral-600 uppercase tracking-wide">Amount</th>
                      <th className="px-6 py-4 text-left text-sm font-bold text-neutral-600 uppercase tracking-wide">Date</th>
                      <th className="px-6 py-4 text-left text-sm font-bold text-neutral-600 uppercase tracking-wide">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-orange-50">
                    {transactions.map(transaction => (
                      <tr key={transaction.id} className="hover:bg-orange-50 transition-colors">
                        <td className="px-6 py-4 text-neutral-900 font-mono text-sm">{transaction.id}</td>
                        <td className="px-6 py-4 text-neutral-900 font-semibold">{transaction.channel}</td>
                        <td className="px-6 py-4 text-neutral-900 font-black">{transaction.amount}</td>
                        <td className="px-6 py-4 text-neutral-500">{transaction.date}</td>
                        <td className="px-6 py-4">
                          <Badge variant={
                            transaction.status === 'Completed' ? 'success' :
                            transaction.status === 'In Escrow' ? 'warning' : 'default'
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
