import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowLeft, Send, Paperclip, MoreVertical } from 'lucide-react'
import Navbar from '../components/Navbar'
import Card from '../components/Card'
import Button from '../components/Button'
import { conversations, messages } from '../data/mockData'

const ChatPage = () => {
  const [activeConversation, setActiveConversation] = useState(conversations[0])
  const [messageText, setMessageText] = useState('')
  
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Button */}
        <Link to="/marketplace" className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6">
          <ArrowLeft className="w-4 h-4" />
          Back
        </Link>
        
        <Card className="overflow-hidden h-[calc(100vh-200px)]">
          <div className="flex h-full">
            {/* Conversations List */}
            <div className="w-80 border-r border-gray-200 flex flex-col">
              <div className="p-6 border-b border-gray-200">
                <h2 className="text-xl font-semibold text-gray-900">Messages</h2>
              </div>
              
              <div className="flex-1 overflow-y-auto">
                {conversations.map(conversation => (
                  <button
                    key={conversation.id}
                    onClick={() => setActiveConversation(conversation)}
                    className={`w-full p-4 border-b border-gray-100 hover:bg-gray-50 transition-colors text-left ${
                      activeConversation.id === conversation.id ? 'bg-primary-50' : ''
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center flex-shrink-0">
                        <span className="text-primary-600 font-semibold">{conversation.avatar}</span>
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between items-start mb-1">
                          <h3 className="font-medium text-gray-900 truncate">{conversation.user}</h3>
                          <span className="text-xs text-gray-500">{conversation.time}</span>
                        </div>
                        <p className="text-sm text-gray-600 truncate">{conversation.lastMessage}</p>
                      </div>
                      
                      {conversation.unread > 0 && (
                        <div className="w-5 h-5 bg-primary-600 rounded-full flex items-center justify-center">
                          <span className="text-xs text-white font-medium">{conversation.unread}</span>
                        </div>
                      )}
                    </div>
                  </button>
                ))}
              </div>
            </div>
            
            {/* Chat Window */}
            <div className="flex-1 flex flex-col">
              {/* Chat Header */}
              <div className="p-6 border-b border-gray-200 flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center">
                    <span className="text-primary-600 font-semibold">{activeConversation.avatar}</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">{activeConversation.user}</h3>
                    <p className="text-sm text-gray-600">Active now</p>
                  </div>
                </div>
                
                <button className="p-2 hover:bg-gray-100 rounded-lg">
                  <MoreVertical className="w-5 h-5 text-gray-600" />
                </button>
              </div>
              
              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-6 space-y-4">
                {messages.map(message => (
                  <div
                    key={message.id}
                    className={`flex ${message.sender === 'buyer' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-md px-4 py-3 rounded-2xl ${
                        message.sender === 'buyer'
                          ? 'bg-primary-600 text-white'
                          : 'bg-gray-100 text-gray-900'
                      }`}
                    >
                      <p className="text-sm">{message.text}</p>
                      <p
                        className={`text-xs mt-1 ${
                          message.sender === 'buyer' ? 'text-primary-100' : 'text-gray-500'
                        }`}
                      >
                        {message.time}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
              
              {/* Message Input */}
              <div className="p-6 border-t border-gray-200">
                <div className="flex gap-3">
                  <button className="p-3 hover:bg-gray-100 rounded-xl transition-colors">
                    <Paperclip className="w-5 h-5 text-gray-600" />
                  </button>
                  
                  <input
                    type="text"
                    value={messageText}
                    onChange={(e) => setMessageText(e.target.value)}
                    placeholder="Type your message..."
                    className="flex-1 px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500"
                  />
                  
                  <Button>
                    <Send className="w-5 h-5" />
                    Send
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
}

export default ChatPage
