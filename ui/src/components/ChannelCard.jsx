import { Link } from 'react-router-dom'
import { Users, DollarSign, TrendingUp } from 'lucide-react'
import Card from './Card'
import Badge from './Badge'

const ChannelCard = ({ channel }) => {
  return (
    <Link to={`/channel/${channel.id}`}>
      <Card hover className="overflow-hidden">
        <div className="aspect-video bg-gradient-to-br from-primary-100 to-primary-200 relative">
          <img 
            src={channel.banner} 
            alt={channel.name}
            className="w-full h-full object-cover"
          />
          {channel.verified && (
            <Badge variant="success" className="absolute top-3 right-3">
              Verified
            </Badge>
          )}
        </div>
        
        <div className="p-5">
          <h3 className="font-semibold text-lg text-gray-900 mb-2">{channel.name}</h3>
          <p className="text-sm text-gray-600 mb-4">{channel.niche}</p>
          
          <div className="grid grid-cols-2 gap-3 mb-4">
            <div className="flex items-center gap-2 text-sm">
              <Users className="w-4 h-4 text-gray-400" />
              <span className="text-gray-700">{channel.subscribers}</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <TrendingUp className="w-4 h-4 text-gray-400" />
              <span className="text-gray-700">{channel.monthlyRevenue}/mo</span>
            </div>
          </div>
          
          <div className="flex items-center justify-between pt-4 border-t border-gray-100">
            <div className="flex items-center gap-1">
              <DollarSign className="w-5 h-5 text-primary-600" />
              <span className="text-2xl font-bold text-gray-900">{channel.price}</span>
            </div>
            {channel.monetized && (
              <Badge variant="primary">Monetized</Badge>
            )}
          </div>
        </div>
      </Card>
    </Link>
  )
}

export default ChannelCard