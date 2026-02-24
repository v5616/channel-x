import { Link } from 'react-router-dom'
import { Users, DollarSign, TrendingUp } from 'lucide-react'
import Card from './Card'
import Badge from './Badge'

const ChannelCard = ({ channel }) => {
  // Adapter to handle both API format and mock data format
  const adaptedChannel = {
    id: channel.id,
    name: channel.channel_name || channel.name,
    niche: channel.niche,
    subscribers: channel.subscribers,
    monthlyRevenue: channel.monthly_revenue || channel.monthlyRevenue,
    price: channel.asking_price ? `$${channel.asking_price.toLocaleString()}` : channel.price,
    banner: channel.banner_image || channel.banner || 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=800',
    verified: channel.is_verified !== undefined ? channel.is_verified : channel.verified,
    monetized: channel.is_monetized !== undefined ? channel.is_monetized : channel.monetized,
  }

  return (
    <Link to={`/channel/${adaptedChannel.id}`}>
      <Card hover className="overflow-hidden">
        <div className="aspect-video bg-gradient-to-br from-primary-100 to-primary-200 relative">
          <img 
            src={adaptedChannel.banner} 
            alt={adaptedChannel.name}
            className="w-full h-full object-cover"
            onError={(e) => {
              e.target.src = 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=800'
            }}
          />
          {adaptedChannel.verified && (
            <Badge variant="success" className="absolute top-3 right-3">
              Verified
            </Badge>
          )}
        </div>
        
        <div className="p-5">
          <h3 className="font-semibold text-lg text-gray-900 mb-2">{adaptedChannel.name}</h3>
          <p className="text-sm text-gray-600 mb-4">{adaptedChannel.niche}</p>
          
          <div className="grid grid-cols-2 gap-3 mb-4">
            <div className="flex items-center gap-2 text-sm">
              <Users className="w-4 h-4 text-gray-400" />
              <span className="text-gray-700">{adaptedChannel.subscribers}</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <TrendingUp className="w-4 h-4 text-gray-400" />
              <span className="text-gray-700">{adaptedChannel.monthlyRevenue}/mo</span>
            </div>
          </div>
          
          <div className="flex items-center justify-between pt-4 border-t border-gray-100">
            <div className="flex items-center gap-1">
              <DollarSign className="w-5 h-5 text-primary-600" />
              <span className="text-2xl font-bold text-gray-900">{adaptedChannel.price}</span>
            </div>
            {adaptedChannel.monetized && (
              <Badge variant="primary">Monetized</Badge>
            )}
          </div>
        </div>
      </Card>
    </Link>
  )
}

export default ChannelCard