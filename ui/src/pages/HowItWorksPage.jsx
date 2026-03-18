import { Link } from 'react-router-dom'
import { Search, FileCheck, MessageCircle, Shield, DollarSign, CheckCircle, ArrowRight, Users, Package, Sparkles } from 'lucide-react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import Card from '../components/Card'
import Button from '../components/Button'

const HowItWorksPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50">
      <Navbar />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-600 via-orange-500 to-amber-500 py-24 relative overflow-hidden">
        {/* Decorative circles */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-20 -right-20 w-64 h-64 bg-white/20 rounded-full blur-3xl"></div>
          <div className="absolute top-1/2 -left-20 w-48 h-48 bg-accent-400/20 rounded-full blur-3xl"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-md rounded-full text-white text-sm font-medium mb-6">
            <Sparkles className="w-4 h-4" />
            <span>Simple & Secure Process</span>
          </div>
          <h1 className="text-5xl lg:text-6xl font-black text-white mb-6 tracking-tight">How ChannelX Works</h1>
          <p className="text-xl lg:text-2xl text-orange-50 max-w-3xl mx-auto font-light">
            A simple, secure, and transparent process for buying and selling YouTube channels
          </p>
        </div>
        
        {/* Curved bottom */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 60" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
            <path d="M0 60L60 52.5C120 45 240 30 360 22.5C480 15 600 15 720 18.75C840 22.5 960 30 1080 33.75C1200 37.5 1320 37.5 1380 37.5L1440 37.5V60H1380C1320 60 1200 60 1080 60C960 60 840 60 720 60C600 60 480 60 360 60C240 60 120 60 60 60H0Z" fill="#fffbeb"/>
          </svg>
        </div>
      </section>
      
      {/* For Buyers Section */}
      <section className="py-24 bg-gradient-to-b from-amber-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary-100 border-2 border-primary-200 text-primary-700 rounded-full text-sm font-bold mb-4 uppercase tracking-wide">
              <Users className="w-4 h-4" />
              For Buyers
            </div>
            <h2 className="text-4xl lg:text-5xl font-black text-neutral-900 mb-4 tracking-tight">How to Buy a Channel</h2>
            <p className="text-xl text-neutral-600 font-light">Follow these simple steps to purchase your next YouTube channel</p>
          </div>
          
          <div className="grid md:grid-cols-4 gap-8">
            {/* Step 1 */}
            <div className="relative group">
              <div className="bg-white rounded-3xl p-8 h-full shadow-xl border-2 border-orange-100 hover:border-primary-300 hover:shadow-2xl transition-all">
                <div className="w-14 h-14 bg-gradient-to-br from-primary-500 to-orange-500 rounded-2xl flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform">
                  <Search className="w-7 h-7 text-white" />
                </div>
                <div className="absolute -top-4 -right-4 w-10 h-10 bg-gradient-to-br from-primary-600 to-orange-600 text-white rounded-full flex items-center justify-center font-black text-lg shadow-lg">
                  1
                </div>
                <h3 className="text-xl font-black text-neutral-900 mb-3">Browse Channels</h3>
                <p className="text-neutral-600 leading-relaxed">
                  Explore our marketplace of verified YouTube channels. Use filters to find channels that match your niche and budget.
                </p>
              </div>
            </div>
            
            {/* Step 2 */}
            <div className="relative group">
              <div className="bg-white rounded-3xl p-8 h-full shadow-xl border-2 border-orange-100 hover:border-orange-300 hover:shadow-2xl transition-all">
                <div className="w-14 h-14 bg-gradient-to-br from-orange-400 to-amber-600 rounded-2xl flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform">
                  <FileCheck className="w-7 h-7 text-white" />
                </div>
                <div className="absolute -top-4 -right-4 w-10 h-10 bg-gradient-to-br from-orange-500 to-amber-600 text-white rounded-full flex items-center justify-center font-black text-lg shadow-lg">
                  2
                </div>
                <h3 className="text-xl font-black text-neutral-900 mb-3">Review Details</h3>
                <p className="text-neutral-600 leading-relaxed">
                  Check channel analytics, revenue history, subscriber demographics, and seller ratings before making a decision.
                </p>
              </div>
            </div>
            
            {/* Step 3 */}
            <div className="relative group">
              <div className="bg-white rounded-3xl p-8 h-full shadow-xl border-2 border-orange-100 hover:border-primary-300 hover:shadow-2xl transition-all">
                <div className="w-14 h-14 bg-gradient-to-br from-orange-500 to-primary-500 rounded-2xl flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform">
                  <MessageCircle className="w-7 h-7 text-white" />
                </div>
                <div className="absolute -top-4 -right-4 w-10 h-10 bg-gradient-to-br from-orange-600 to-primary-600 text-white rounded-full flex items-center justify-center font-black text-lg shadow-lg">
                  3
                </div>
                <h3 className="text-xl font-black text-neutral-900 mb-3">Contact Seller</h3>
                <p className="text-neutral-600 leading-relaxed">
                  Message the seller to ask questions, request additional information, or negotiate terms directly through our platform.
                </p>
              </div>
            </div>
            
            {/* Step 4 */}
            <div className="relative group">
              <div className="bg-white rounded-3xl p-8 h-full shadow-xl border-2 border-orange-100 hover:border-primary-300 hover:shadow-2xl transition-all">
                <div className="w-14 h-14 bg-gradient-to-br from-primary-600 to-orange-600 rounded-2xl flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform">
                  <Shield className="w-7 h-7 text-white" />
                </div>
                <div className="absolute -top-4 -right-4 w-10 h-10 bg-gradient-to-br from-primary-600 to-orange-600 text-white rounded-full flex items-center justify-center font-black text-lg shadow-lg">
                  4
                </div>
                <h3 className="text-xl font-black text-neutral-900 mb-3">Secure Purchase</h3>
                <p className="text-neutral-600 leading-relaxed">
                  Complete the purchase with escrow protection. Your funds are held securely until the channel transfer is verified.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* For Sellers Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-accent-100 border-2 border-accent-200 text-accent-700 rounded-full text-sm font-bold mb-4 uppercase tracking-wide">
              <Package className="w-4 h-4" />
              For Sellers
            </div>
            <h2 className="text-4xl lg:text-5xl font-black text-neutral-900 mb-4 tracking-tight">How to Sell a Channel</h2>
            <p className="text-xl text-neutral-600 font-light">List your YouTube channel and reach thousands of potential buyers</p>
          </div>
          
          <div className="grid md:grid-cols-4 gap-8">
            {/* Step 1 */}
            <div className="relative group">
              <div className="bg-white rounded-3xl p-8 h-full shadow-xl border-2 border-orange-100 hover:border-primary-300 hover:shadow-2xl transition-all">
                <div className="w-14 h-14 bg-gradient-to-br from-primary-500 to-orange-500 rounded-2xl flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform">
                  <Users className="w-7 h-7 text-white" />
                </div>
                <div className="absolute -top-4 -right-4 w-10 h-10 bg-gradient-to-br from-primary-600 to-orange-600 text-white rounded-full flex items-center justify-center font-black text-lg shadow-lg">
                  1
                </div>
                <h3 className="text-xl font-black text-neutral-900 mb-3">Create Account</h3>
                <p className="text-neutral-600 leading-relaxed">
                  Sign up for free and complete your seller profile. Verify your identity to build trust with buyers.
                </p>
              </div>
            </div>
            
            {/* Step 2 */}
            <div className="relative group">
              <div className="bg-white rounded-3xl p-8 h-full shadow-xl border-2 border-orange-100 hover:border-orange-300 hover:shadow-2xl transition-all">
                <div className="w-14 h-14 bg-gradient-to-br from-orange-400 to-amber-600 rounded-2xl flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform">
                  <Package className="w-7 h-7 text-white" />
                </div>
                <div className="absolute -top-4 -right-4 w-10 h-10 bg-gradient-to-br from-orange-500 to-amber-600 text-white rounded-full flex items-center justify-center font-black text-lg shadow-lg">
                  2
                </div>
                <h3 className="text-xl font-black text-neutral-900 mb-3">List Your Channel</h3>
                <p className="text-neutral-600 leading-relaxed">
                  Add your channel details, analytics screenshots, revenue proof, and set your asking price. Our team will verify your listing.
                </p>
              </div>
            </div>
            
            {/* Step 3 */}
            <div className="relative group">
              <div className="bg-white rounded-3xl p-8 h-full shadow-xl border-2 border-orange-100 hover:border-primary-300 hover:shadow-2xl transition-all">
                <div className="w-14 h-14 bg-gradient-to-br from-orange-500 to-primary-500 rounded-2xl flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform">
                  <MessageCircle className="w-7 h-7 text-white" />
                </div>
                <div className="absolute -top-4 -right-4 w-10 h-10 bg-gradient-to-br from-orange-600 to-primary-600 text-white rounded-full flex items-center justify-center font-black text-lg shadow-lg">
                  3
                </div>
                <h3 className="text-xl font-black text-neutral-900 mb-3">Connect with Buyers</h3>
                <p className="text-neutral-600 leading-relaxed">
                  Respond to inquiries, answer questions, and negotiate with interested buyers through our secure messaging system.
                </p>
              </div>
            </div>
            
            {/* Step 4 */}
            <div className="relative group">
              <div className="bg-white rounded-3xl p-8 h-full shadow-xl border-2 border-orange-100 hover:border-primary-300 hover:shadow-2xl transition-all">
                <div className="w-14 h-14 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-2xl flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform">
                  <DollarSign className="w-7 h-7 text-white" />
                </div>
                <div className="absolute -top-4 -right-4 w-10 h-10 bg-gradient-to-br from-emerald-600 to-teal-600 text-white rounded-full flex items-center justify-center font-black text-lg shadow-lg">
                  4
                </div>
                <h3 className="text-xl font-black text-neutral-900 mb-3">Get Paid</h3>
                <p className="text-neutral-600 leading-relaxed">
                  Once the buyer confirms the transfer, funds are released from escrow to your account. Fast and secure payouts.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Security Features */}
      <section className="py-24 bg-gradient-to-b from-amber-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary-100 border-2 border-primary-200 text-primary-700 rounded-full text-sm font-bold mb-4 uppercase tracking-wide">
              <Shield className="w-4 h-4" />
              Security First
            </div>
            <h2 className="text-4xl lg:text-5xl font-black text-neutral-900 mb-4 tracking-tight">Built-in Security</h2>
            <p className="text-xl text-neutral-600 font-light">Your safety is our top priority</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white rounded-3xl p-10 text-center shadow-xl border-2 border-orange-100 hover:border-primary-300 hover:shadow-2xl transition-all group">
              <div className="w-20 h-20 bg-gradient-to-br from-primary-500 to-orange-500 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-xl group-hover:scale-110 transition-transform">
                <Shield className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-2xl font-black text-neutral-900 mb-4">Escrow Protection</h3>
              <p className="text-neutral-600 leading-relaxed">
                Funds are held securely until both parties confirm the successful transfer of the channel.
              </p>
            </div>
            
            <div className="bg-white rounded-3xl p-10 text-center shadow-xl border-2 border-orange-100 hover:border-emerald-300 hover:shadow-2xl transition-all group">
              <div className="w-20 h-20 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-xl group-hover:scale-110 transition-transform">
                <CheckCircle className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-2xl font-black text-neutral-900 mb-4">Verified Listings</h3>
              <p className="text-neutral-600 leading-relaxed">
                Every channel is manually reviewed and verified by our team before going live on the marketplace.
              </p>
            </div>
            
            <div className="bg-white rounded-3xl p-10 text-center shadow-xl border-2 border-orange-100 hover:border-primary-300 hover:shadow-2xl transition-all group">
              <div className="w-20 h-20 bg-gradient-to-br from-orange-500 to-primary-500 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-xl group-hover:scale-110 transition-transform">
                <Users className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-2xl font-black text-neutral-900 mb-4">Identity Verification</h3>
              <p className="text-neutral-600 leading-relaxed">
                All sellers undergo identity verification to ensure legitimacy and build trust in the community.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-br from-primary-600 via-orange-500 to-amber-500 relative overflow-hidden">
        {/* Decorative circles */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-white/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-accent-400/20 rounded-full blur-3xl"></div>
        </div>
        
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative">
          <h2 className="text-4xl lg:text-5xl font-black text-white mb-6 tracking-tight">Ready to Get Started?</h2>
          <p className="text-xl lg:text-2xl text-orange-50 mb-10 font-light">
            Join thousands of creators buying and selling YouTube channels on ChannelX
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/marketplace">
              <Button size="lg" className="bg-white text-primary-600 hover:bg-orange-50 shadow-2xl font-bold">
                Browse Channels
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
            <Link to="/signup">
              <Button variant="outline" size="lg" className="border-2 border-white text-white hover:bg-white/10 backdrop-blur-sm font-bold">
                Sign Up Free
              </Button>
            </Link>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  )
}

export default HowItWorksPage
