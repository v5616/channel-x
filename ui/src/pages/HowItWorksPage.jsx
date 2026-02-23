import { Link } from 'react-router-dom'
import { Search, FileCheck, MessageCircle, Shield, DollarSign, CheckCircle, ArrowRight, Users, Package } from 'lucide-react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import Card from '../components/Card'
import Button from '../components/Button'

const HowItWorksPage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-600 via-primary-600 to-purple-600 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl font-bold text-white mb-6">How ChannelX Works</h1>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto">
            A simple, secure, and transparent process for buying and selling YouTube channels
          </p>
        </div>
      </section>
      
      {/* For Buyers Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-medium mb-4">
              <Users className="w-4 h-4" />
              For Buyers
            </div>
            <h2 className="text-4xl font-bold text-gray-900 mb-4">How to Buy a Channel</h2>
            <p className="text-lg text-gray-600">Follow these simple steps to purchase your next YouTube channel</p>
          </div>
          
          <div className="grid md:grid-cols-4 gap-8">
            {/* Step 1 */}
            <div className="relative">
              <Card className="p-6 h-full hover:shadow-lg transition-shadow">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center mb-4 shadow-lg">
                  <Search className="w-6 h-6 text-white" />
                </div>
                <div className="absolute -top-3 -right-3 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">
                  1
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Browse Channels</h3>
                <p className="text-gray-600">
                  Explore our marketplace of verified YouTube channels. Use filters to find channels that match your niche and budget.
                </p>
              </Card>
            </div>
            
            {/* Step 2 */}
            <div className="relative">
              <Card className="p-6 h-full hover:shadow-lg transition-shadow">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center mb-4 shadow-lg">
                  <FileCheck className="w-6 h-6 text-white" />
                </div>
                <div className="absolute -top-3 -right-3 w-8 h-8 bg-purple-600 text-white rounded-full flex items-center justify-center font-bold">
                  2
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Review Details</h3>
                <p className="text-gray-600">
                  Check channel analytics, revenue history, subscriber demographics, and seller ratings before making a decision.
                </p>
              </Card>
            </div>
            
            {/* Step 3 */}
            <div className="relative">
              <Card className="p-6 h-full hover:shadow-lg transition-shadow">
                <div className="w-12 h-12 bg-gradient-to-br from-pink-500 to-pink-600 rounded-xl flex items-center justify-center mb-4 shadow-lg">
                  <MessageCircle className="w-6 h-6 text-white" />
                </div>
                <div className="absolute -top-3 -right-3 w-8 h-8 bg-pink-600 text-white rounded-full flex items-center justify-center font-bold">
                  3
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Contact Seller</h3>
                <p className="text-gray-600">
                  Message the seller to ask questions, request additional information, or negotiate terms directly through our platform.
                </p>
              </Card>
            </div>
            
            {/* Step 4 */}
            <div className="relative">
              <Card className="p-6 h-full hover:shadow-lg transition-shadow">
                <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center mb-4 shadow-lg">
                  <Shield className="w-6 h-6 text-white" />
                </div>
                <div className="absolute -top-3 -right-3 w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center font-bold">
                  4
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Secure Purchase</h3>
                <p className="text-gray-600">
                  Complete the purchase with escrow protection. Your funds are held securely until the channel transfer is verified.
                </p>
              </Card>
            </div>
          </div>
        </div>
      </section>
      
      {/* For Sellers Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-100 text-green-700 rounded-full text-sm font-medium mb-4">
              <Package className="w-4 h-4" />
              For Sellers
            </div>
            <h2 className="text-4xl font-bold text-gray-900 mb-4">How to Sell a Channel</h2>
            <p className="text-lg text-gray-600">List your YouTube channel and reach thousands of potential buyers</p>
          </div>
          
          <div className="grid md:grid-cols-4 gap-8">
            {/* Step 1 */}
            <div className="relative">
              <Card className="p-6 h-full hover:shadow-lg transition-shadow">
                <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-xl flex items-center justify-center mb-4 shadow-lg">
                  <Users className="w-6 h-6 text-white" />
                </div>
                <div className="absolute -top-3 -right-3 w-8 h-8 bg-indigo-600 text-white rounded-full flex items-center justify-center font-bold">
                  1
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Create Account</h3>
                <p className="text-gray-600">
                  Sign up for free and complete your seller profile. Verify your identity to build trust with buyers.
                </p>
              </Card>
            </div>
            
            {/* Step 2 */}
            <div className="relative">
              <Card className="p-6 h-full hover:shadow-lg transition-shadow">
                <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl flex items-center justify-center mb-4 shadow-lg">
                  <Package className="w-6 h-6 text-white" />
                </div>
                <div className="absolute -top-3 -right-3 w-8 h-8 bg-orange-600 text-white rounded-full flex items-center justify-center font-bold">
                  2
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">List Your Channel</h3>
                <p className="text-gray-600">
                  Add your channel details, analytics screenshots, revenue proof, and set your asking price. Our team will verify your listing.
                </p>
              </Card>
            </div>
            
            {/* Step 3 */}
            <div className="relative">
              <Card className="p-6 h-full hover:shadow-lg transition-shadow">
                <div className="w-12 h-12 bg-gradient-to-br from-teal-500 to-teal-600 rounded-xl flex items-center justify-center mb-4 shadow-lg">
                  <MessageCircle className="w-6 h-6 text-white" />
                </div>
                <div className="absolute -top-3 -right-3 w-8 h-8 bg-teal-600 text-white rounded-full flex items-center justify-center font-bold">
                  3
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Connect with Buyers</h3>
                <p className="text-gray-600">
                  Respond to inquiries, answer questions, and negotiate with interested buyers through our secure messaging system.
                </p>
              </Card>
            </div>
            
            {/* Step 4 */}
            <div className="relative">
              <Card className="p-6 h-full hover:shadow-lg transition-shadow">
                <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-xl flex items-center justify-center mb-4 shadow-lg">
                  <DollarSign className="w-6 h-6 text-white" />
                </div>
                <div className="absolute -top-3 -right-3 w-8 h-8 bg-emerald-600 text-white rounded-full flex items-center justify-center font-bold">
                  4
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Get Paid</h3>
                <p className="text-gray-600">
                  Once the buyer confirms the transfer, funds are released from escrow to your account. Fast and secure payouts.
                </p>
              </Card>
            </div>
          </div>
        </div>
      </section>
      
      {/* Security Features */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Built-in Security</h2>
            <p className="text-lg text-gray-600">Your safety is our top priority</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="p-8 text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                <Shield className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Escrow Protection</h3>
              <p className="text-gray-600">
                Funds are held securely until both parties confirm the successful transfer of the channel.
              </p>
            </Card>
            
            <Card className="p-8 text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                <CheckCircle className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Verified Listings</h3>
              <p className="text-gray-600">
                Every channel is manually reviewed and verified by our team before going live on the marketplace.
              </p>
            </Card>
            
            <Card className="p-8 text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                <Users className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Identity Verification</h3>
              <p className="text-gray-600">
                All sellers undergo identity verification to ensure legitimacy and build trust in the community.
              </p>
            </Card>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">Ready to Get Started?</h2>
          <p className="text-xl text-blue-100 mb-8">
            Join thousands of creators buying and selling YouTube channels on ChannelX
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/marketplace">
              <Button size="lg" className="bg-white text-primary-600 hover:bg-gray-100">
                Browse Channels
                <ArrowRight className="w-5 h-5" />
              </Button>
            </Link>
            <Link to="/signup">
              <Button variant="outline" size="lg" className="border-2 border-white text-white hover:bg-white/10">
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
