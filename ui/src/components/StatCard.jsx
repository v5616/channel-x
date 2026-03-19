import Card from './Card'

const StatCard = ({ title, value, icon: Icon, trend, trendValue, className = '' }) => {
  const colors = {
    Package: 'from-blue-500 to-blue-600',
    Eye: 'from-purple-500 to-purple-600',
    MessageCircle: 'from-pink-500 to-pink-600',
    DollarSign: 'from-green-500 to-green-600',
    Users: 'from-indigo-500 to-indigo-600',
    ShoppingBag: 'from-orange-500 to-orange-600',
    Heart: 'from-red-500 to-red-600',
    Receipt: 'from-teal-500 to-teal-600',
    CheckCircle: 'from-emerald-500 to-emerald-600',
  }
  
  const iconName = Icon?.name || 'DollarSign'
  const gradientClass = colors[iconName] || 'from-primary-500 to-primary-600'
  
  return (
    <Card className={`p-6 transform transition-all duration-300 hover:scale-105 hover:shadow-xl border-2 border-orange-100 ${className}`}>
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium text-neutral-500">{title}</p>
          <p className="mt-2 text-3xl font-black text-neutral-900 transition-all duration-300">{value}</p>
          {trend && (
            <p className={`mt-2 text-sm font-semibold ${trend === 'up' ? 'text-emerald-600' : 'text-red-600'}`}>
              {trend === 'up' ? '↑' : '↓'} {trendValue}
            </p>
          )}
        </div>
        {Icon && (
          <div className={`p-3 bg-gradient-to-br ${gradientClass} rounded-2xl shadow-lg transform transition-transform duration-300 hover:rotate-6`}>
            <Icon className="w-6 h-6 text-white" />
          </div>
        )}
      </div>
    </Card>
  )
}

export default StatCard