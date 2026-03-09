import { Link } from 'react-router-dom'
import { Youtube, Twitter, Linkedin, Mail } from 'lucide-react'

const Footer = () => {
  return (
    <footer className="bg-neutral-900 text-neutral-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="p-2 bg-gradient-to-br from-primary-600 to-orange-600 rounded-xl shadow-lg">
                <Youtube className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-black text-white">ChannelX</span>
            </div>
            <p className="text-sm text-neutral-400">
              The trusted marketplace for buying and selling YouTube channels securely.
            </p>
          </div>
          
          <div>
            <h3 className="font-bold text-white mb-4">Product</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/marketplace" className="hover:text-primary-400 transition-colors">Marketplace</Link></li>
              <li><Link to="/how-it-works" className="hover:text-primary-400 transition-colors">How it Works</Link></li>
              <li><Link to="#" className="hover:text-primary-400 transition-colors">Pricing</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-bold text-white mb-4">Company</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="#" className="hover:text-primary-400 transition-colors">About</Link></li>
              <li><Link to="#" className="hover:text-primary-400 transition-colors">Blog</Link></li>
              <li><Link to="#" className="hover:text-primary-400 transition-colors">Careers</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-bold text-white mb-4">Connect</h3>
            <div className="flex gap-3">
              <a href="#" className="p-2 bg-neutral-800 rounded-lg hover:bg-primary-600 transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="p-2 bg-neutral-800 rounded-lg hover:bg-primary-600 transition-colors">
                <Linkedin className="w-5 h-5" />
              </a>
              <a href="#" className="p-2 bg-neutral-800 rounded-lg hover:bg-primary-600 transition-colors">
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
        
        <div className="border-t border-neutral-800 mt-8 pt-8 text-sm text-center text-neutral-400">
          © 2026 ChannelX. All rights reserved.
        </div>
      </div>
    </footer>
  )
}

export default Footer