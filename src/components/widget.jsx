import { useState, useEffect, useRef } from 'react';
import './scss/widget.scss';

const Widget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [hasNotification, setHasNotification] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Hi! I'm Adarsh's AI assistant. Ask me about his skills, projects, or experience! 👋",
      isBot: true,
      timestamp: new Date()
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isInitializing, setIsInitializing] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 736);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);
  const loadingTimeoutRef = useRef(null);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 736);
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
      if (loadingTimeoutRef.current) {
        clearTimeout(loadingTimeoutRef.current);
      }
    };
  }, []);

  // Auto-show notification after 3 seconds if user hasn't interacted
  useEffect(() => {
    const timer = setTimeout(() => {
      if (!isOpen && !hasNotification) {
        setHasNotification(true);
      }
    }, 3000);
    
    return () => clearTimeout(timer);
  }, [isOpen, hasNotification]);

  // Auto scroll to bottom when new messages arrive
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    setTimeout(() => {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  const toggleChat = () => {
    setIsOpen(!isOpen);
    if (hasNotification) {
      setHasNotification(false);
    }
    
    // Focus input when opening
    if (!isOpen) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
    }
  };

  const addMessage = (text, sender) => {
    const newMessage = {
      id: Date.now(),
      text,
      isBot: sender === 'bot',
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, newMessage]);
    
    // Show notification if chat is closed and it's a bot message
    if (!isOpen && sender === 'bot') {
      setHasNotification(true);
    }
  };

  const showTypingIndicator = () => {
    setIsLoading(true);
  };

  const hideTypingIndicator = () => {
    setIsLoading(false);
  };

  const showInitializingScreen = () => {
    setIsInitializing(true);
  };

  const hideInitializingScreen = () => {
    setIsInitializing(false);
  };

  const sendMessage = async () => {
    const question = inputText.trim();
    
    if (question === '' || isLoading || isInitializing) return;
    
    addMessage(question, 'user');
    setInputText('');
    
    showTypingIndicator();
    
    // Show initializing screen after 3 seconds if no response
    loadingTimeoutRef.current = setTimeout(() => {
      if (isLoading) {
        hideTypingIndicator();
        showInitializingScreen();
      }
    }, 3000);
    
    try {
      const response = await fetch('https://personal-chatbot-q2wp.onrender.com/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question })
      });
      
      const data = await response.json();
      
      // Clear the loading timeout
      if (loadingTimeoutRef.current) {
        clearTimeout(loadingTimeoutRef.current);
      }
      
      hideTypingIndicator();
      hideInitializingScreen();
      addMessage(data.response, 'bot');
      
    } catch (error) {
      console.error('Error:', error);
      
      // Clear the loading timeout
      if (loadingTimeoutRef.current) {
        clearTimeout(loadingTimeoutRef.current);
      }
      
      hideTypingIndicator();
      hideInitializingScreen();
      addMessage("Sorry, I'm having trouble connecting. Please try again!", 'bot');
    }
  };

  const sendQuickMessage = (message) => {
    if (isLoading || isInitializing) return;
    setInputText(message);
    setTimeout(() => {
      sendMessage();
    }, 100);
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter' && !isLoading && !isInitializing) {
      sendMessage();
    }
  };

  return (
    <div className="adarsh-chat-widget">
      {/* Toggle Button */}
      <button className="chat-toggle" onClick={toggleChat}>
        <span>{isOpen ? '×' : '💬'}</span>
        {hasNotification && !isOpen && (
          <div className="notification-badge">1</div>
        )}
      </button>
      
      {/* Chat Modal */}
      <div className={`chat-modal ${isOpen ? 'open' : ''}`}>
        <div className="chat-header">
          <div className="portfolio-badge">AI Assistant</div>
          <div className="chat-header-info">
            <div className="chat-avatar">A</div>
            <div className="chat-info">
              <h3>Adarsh AI</h3>
              <p>Resume Assistant</p>
            </div>
          </div>
          <button className="close-btn" onClick={toggleChat}>×</button>
        </div>
        
        <div className="chat-messages">
          {messages.map((message) => (
            <div key={message.id} className={`message ${message.isBot ? 'bot' : 'user'}`}>
              <div className="message-avatar">
                {message.isBot ? 'A' : 'Y'}
              </div>
              <div className="message-content">
                {message.text}
              </div>
            </div>
          ))}
          
          {/* Typing Indicator */}
          {isLoading && (
            <div className="message bot">
              <div className="message-avatar">A</div>
              <div className="typing-indicator">
                <div className="typing-dots">
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
              </div>
            </div>
          )}
          
          {/* Initializing Screen */}
          {isInitializing && (
            <div className="message bot">
              <div className="message-avatar">A</div>
              <div className="initializing-screen">
                <div className="initializing-content">
                  <div className="initializing-spinner"></div>
                  <div className="initializing-text">
                    <p><strong>Starting up the AI assistant...</strong></p>
                    <p>The chatbot is waking up from sleep mode. This may take up to 50 seconds.</p>
                    <p>Thanks for your patience! ⏳</p>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>
        
        <div className="quick-actions">
          <div className="quick-actions-title">Quick questions:</div>
          <div className="quick-buttons">
            <button 
              className="quick-btn" 
              onClick={() => sendQuickMessage('What are your skills?')}
              disabled={isLoading || isInitializing}
            >
              Skills
            </button>
            <button 
              className="quick-btn" 
              onClick={() => sendQuickMessage('Tell me about your projects')}
              disabled={isLoading || isInitializing}
            >
              Projects
            </button>
            <button 
              className="quick-btn" 
              onClick={() => sendQuickMessage('How can I contact you?')}
              disabled={isLoading || isInitializing}
            >
              Contact
            </button>
          </div>
        </div>
        
        <div className="chat-input">
          <input 
            ref={inputRef}
            type="text" 
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Ask me anything..." 
            disabled={isLoading || isInitializing}
          />
          <button 
            className="send-btn" 
            onClick={sendMessage}
            disabled={!inputText.trim() || isLoading || isInitializing}
          >
            {isInitializing ? 'Starting...' : 'Send'}
          </button>
        </div>
      </div>

      {/* Mobile Overlay */}
      {isOpen && isMobile && (
        <div className="chat-overlay" onClick={toggleChat}></div>
      )}
    </div>
  );
};

export default Widget; 