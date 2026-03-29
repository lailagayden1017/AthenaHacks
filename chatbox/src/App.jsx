import { useState, useRef, useEffect } from 'react'
import './App.css'

function App() {
  const [chatOpen, setChatOpen] = useState(false)
  const [messages, setMessages] = useState([
    { id: 1, text: 'Hello! My name is Ramen and I am here to answer questions relating to budget!', sender: 'bot' }
  ])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [sessionId] = useState('default-session')
  const messagesEndRef = useRef(null)

  // Auto-scroll to bottom of messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const sendMessage = async () => {
    if (!input.trim()) return

    // Add user message to display
    const userMessage = {
      id: messages.length + 1,
      text: input,
      sender: 'user'
    }
    setMessages([...messages, userMessage])
    setInput('')
    setLoading(true)

    try {
      // Call backend API
      const response = await fetch('http://localhost:5000/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: input,
          session_id: sessionId
        })
      })

      if (!response.ok) {
        throw new Error(`API error: ${response.status}`)
      }

      const data = await response.json()

      // Add bot response to display
      const botMessage = {
        id: messages.length + 2,
        text: data.response,
        sender: 'bot'
      }
      setMessages(prev => [...prev, botMessage])
    } catch (error) {
      console.error('Error sending message:', error)
      const errorMessage = {
        id: messages.length + 2,
        text: 'Sorry, there was an error connecting to the chatbot. Please make sure the backend server is running.',
        sender: 'bot'
      }
      setMessages(prev => [...prev, errorMessage])
    } finally {
      setLoading(false)
    }
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      sendMessage()
    }
  }

  const clearChat = async () => {
    try {
      await fetch('http://localhost:5000/api/clear', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          session_id: sessionId
        })
      })
      setMessages([
        { id: 1, text: 'Hello! My name is Ramen and I am here to answer questions relating to budget!', sender: 'bot' }
      ])
    } catch (error) {
      console.error('Error clearing chat:', error)
    }
  }

  return (
    <>
      {/* Floating Chat Icon */}
      <button
        className="chat-icon-button"
        onClick={() => setChatOpen(!chatOpen)}
        aria-label="Open chat"
      >
        🍜
      </button>

      {/* Chat Popup */}
      {chatOpen && (
        <div className="chat-popup">
          <div className="chat-header">
            <h3>Chat with Ramen</h3>
            <div className="chat-header-buttons">
              <button
                className="chat-clear"
                onClick={clearChat}
                aria-label="Clear chat"
                title="Clear chat history"
              >
                🗑️
              </button>
              <button
                className="chat-close"
                onClick={() => setChatOpen(false)}
                aria-label="Close chat"
              >
                ×
              </button>
            </div>
          </div>
          <div className="chat-messages">
            {messages.map((msg) => (
              <div key={msg.id} className={`message ${msg.sender}-message`}>
                <p>{msg.text}</p>
              </div>
            ))}
            {loading && (
              <div className="message bot-message">
                <p className="loading-text">Susan is typing...</p>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
          <div className="chat-input-area">
            <input
              type="text"
              placeholder="Type a message..."
              className="chat-input"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
              disabled={loading}
            />
            <button
              className="chat-send"
              onClick={sendMessage}
              disabled={loading || !input.trim()}
            >
              {loading ? '...' : 'Send'}
            </button>
          </div>
        </div>
      )}
    </>
  )
}

export default App
