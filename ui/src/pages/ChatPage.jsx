import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowLeft, Send, Paperclip, MoreVertical } from 'lucide-react'
import Navbar from '../components/Navbar'
import Card from '../components/Card'
import Button from '../components/Button'
import { conversations, messages as initialMessages } from '../data/mockData'

const ChatPage = () => {
  const [activeConversation, setActiveConversation] = useState(conversations[0])
  const [messageText, setMessageText] = useState('')
  const [msgs, setMsgs] = useState(initialMessages)

  const handleSend = () => {
    if (!messageText.trim()) return
    setMsgs([...msgs, {
      id: msgs.length + 1,
      sender: 'buyer',
      text: messageText.trim(),
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    }])
    setMessageText('')
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleSend() }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Link to="/marketplace" className="inline-flex items-center gap-2 text-neutral-500 hover:text-primary-600 mb-6 font-semibold transition-colors">
          <ArrowLeft className="w-4 h-4" />
          Back
        </Link>

        <Card className="overflow-hidden h-[calc(100vh-200px)] border-2 border-orange-100 shadow-2xl">
          <div className="flex h-full">
            {/* Conversations List */}
            <div className="w-80 border-r-2 border-orange-100 flex flex-col">
              <div className="p-6 border-b-2 border-orange-100 bg-orange-50">
                <h2 className="text-xl font-black text-neutral-900">Messages</h2>
              </div>

              <div className="flex-1 overflow-y-auto">
                {conversations.map(conversation => (
                  <button key={conversation.id} onClick={() => setActiveConversation(conversation)}
                    className={`w-full p-4 border-b border-orange-50 hover:bg-orange-50 transition-colors text-left ${
                      activeConversation.id === conversation.id ? 'bg-primary-50 border-l-4 border-l-primary-500' : ''
                    }`}>
                    <div className="flex items-start gap-3">
                      <div className="w-12 h-12 bg-gradient-to-br from-primary-500 to-orange-500 rounded-full flex items-center justify-center flex-shrink-0 shadow-md">
                        <span className="text-white font-black text-sm">{conversation.avatar}</span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between items-start mb-1">
                          <h3 className="font-bold text-neutral-900 truncate">{conversation.user}</h3>
                          <span className="text-xs text-neutral-400">{conversation.time}</span>
                        </div>
                        <p className="text-sm text-neutral-500 truncate">{conversation.lastMessage}</p>
                      </div>
                      {conversation.unread > 0 && (
                        <div className="w-5 h-5 bg-gradient-to-br from-primary-600 to-orange-500 rounded-full flex items-center justify-center shadow-md">
                          <span className="text-xs text-white font-black">{conversation.unread}</span>
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
              <div className="p-6 border-b-2 border-orange-100 bg-orange-50 flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-orange-500 rounded-full flex items-center justify-center shadow-md">
                    <span className="text-white font-black text-sm">{activeConversation.avatar}</span>
                  </div>
                  <div>
                    <h3 className="font-black text-neutral-900">{activeConversation.user}</h3>
                    <p className="text-sm text-emerald-600 font-semibold">● Active now</p>
                  </div>
                </div>
                <button className="p-2 hover:bg-orange-100 rounded-xl transition-colors">
                  <MoreVertical className="w-5 h-5 text-neutral-500" />
                </button>
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-6 space-y-4">
                {msgs.map(message => (
                  <div key={message.id} className={`flex ${message.sender === 'buyer' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-md px-4 py-3 rounded-2xl shadow-sm ${
                      message.sender === 'buyer'
                        ? 'bg-gradient-to-r from-primary-600 to-orange-500 text-white'
                        : 'bg-white text-neutral-900 border-2 border-orange-100'
                    }`}>
                      <p className="text-sm">{message.text}</p>
                      <p className={`text-xs mt-1 ${message.sender === 'buyer' ? 'text-orange-100' : 'text-neutral-400'}`}>
                        {message.time}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Message Input */}
              <div className="p-6 border-t-2 border-orange-100 bg-orange-50">
                <div className="flex gap-3">
                  <button className="p-3 hover:bg-orange-100 rounded-2xl transition-colors">
                    <Paperclip className="w-5 h-5 text-neutral-500" />
                  </button>
                  <input type="text" value={messageText} onChange={(e) => setMessageText(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="Type your message..."
                    className="flex-1 px-4 py-3 border-2 border-orange-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white" />
                  <Button onClick={handleSend} disabled={!messageText.trim()}>
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
