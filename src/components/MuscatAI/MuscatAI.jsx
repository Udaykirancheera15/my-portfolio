import React, { useState, useEffect, useContext, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AIContext } from '../../contexts/AIContext';
import './MuscatAI.css';

const MuscatAI = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [muscatState, setMuscatState] = useState('idle'); // idle, speaking, thinking
  const [currentMessage, setCurrentMessage] = useState('');
  const messagesEndRef = useRef(null);
  
  const { 
    isProcessing, 
    aiResponse, 
    conversation, 
    isSpeaking,
    transcription, 
    handleConversation,
    processQuery,
    speakResponse,
    clearConversation
  } = useContext(AIContext);

  useEffect(() => {
    // Update Muscat's state based on AI context
    if (isProcessing) {
      setMuscatState('thinking');
    } else if (isSpeaking) {
      setMuscatState('speaking');
    } else {
      setMuscatState('idle');
    }
  }, [isProcessing, isSpeaking]);

  useEffect(() => {
    // Scroll to bottom of chat when new messages arrive
    if (messagesEndRef.current && isOpen) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [conversation, isOpen]);

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (currentMessage.trim()) {
      processQuery(currentMessage).then((response) => {
        if (response) {
          speakResponse(response);
        }
      });
      setCurrentMessage('');
    }
  };

  const getMuscatImage = () => {
    switch(muscatState) {
      case 'speaking':
        return '/assets/images/muscat/speaking.svg';
      case 'thinking':
        return '/assets/images/muscat/thinking.svg';
      default:
        return '/assets/images/muscat/idle.svg';
    }
  };

  return (
    <>
      <div className={`muscat-widget ${isOpen ? 'open' : ''}`}>
        <AnimatePresence>
          {isOpen && (
            <motion.div 
              className="muscat-chat"
              initial={{ opacity: 0, y: 20, scale: 0.8 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.8 }}
              transition={{ duration: 0.3 }}
            >
              <div className="chat-header">
                <div className="chat-title">
                  <div className="muscat-avatar small">
                    <img src={getMuscatImage()} alt="Muscat AI" />
                  </div>
                  <h3>Muscat AI</h3>
                </div>
                <button 
                  className="close-btn"
                  onClick={toggleChat}
                  aria-label="Close chat"
                >
                  ×
                </button>
              </div>
              
              <div className="chat-messages">
                {conversation.length === 0 ? (
                  <div className="welcome-message">
                    <p>Hi there! I'm Muscat, your AI assistant. I can help with blockchain, web3, AI, and cybersecurity topics. How can I assist you today?</p>
                  </div>
                ) : (
                  conversation.map((msg, index) => (
                    <div 
                      key={index} 
                      className={`message ${msg.role === 'user' ? 'user-message' : 'ai-message'}`}
                    >
                      {msg.role === 'assistant' && (
                        <div className="message-avatar">
                          <img src="/assets/images/muscat/idle.svg" alt="Muscat AI" />
                        </div>
                      )}
                      <div className="message-content">
                        <p>{msg.content}</p>
                      </div>
                    </div>
                  ))
                )}
                {transcription && (
                  <div className="transcription-preview">
                    <p>"{transcription}"</p>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>
              
              <div className="chat-input">
                <form onSubmit={handleSubmit}>
                  <input
                    type="text"
                    placeholder="Type your message..."
                    value={currentMessage}
                    onChange={(e) => setCurrentMessage(e.target.value)}
                    disabled={isProcessing}
                  />
                  <button 
                    type="submit" 
                    className="send-btn"
                    disabled={isProcessing || !currentMessage.trim()}
                  >
                    <span className="send-icon">➤</span>
                  </button>
                  <button 
                    type="button" 
                    className={`mic-btn ${isProcessing ? 'processing' : ''}`}
                    onClick={handleConversation}
                    disabled={isProcessing}
                  >
                    <span className="mic-icon">🎤</span>
                  </button>
                </form>
              </div>
              
              <div className="chat-footer">
                <button 
                  className="clear-btn"
                  onClick={clearConversation}
                >
                  Clear Conversation
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        
        <motion.button 
          className="muscat-toggle"
          onClick={toggleChat}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <div className="muscat-avatar">
            <img src={getMuscatImage()} alt="Muscat AI" />
          </div>
          {!isOpen && (
            <div className="toggle-label">
              <span>Chat with Muscat AI</span>
            </div>
          )}
        </motion.button>
      </div>
    </>
  );
};

export default MuscatAI;
