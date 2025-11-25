import React, { useState, useEffect, useRef } from 'react';
import { X, Send, Camera, Image, Phone, Video, Smile } from 'lucide-react';
import './ChatBox.css';

// Simulated database for storing messages across sessions
const MessageDatabase = {
  storage: JSON.parse(localStorage.getItem('chatMessages') || '{}'),
  
  saveMessage: function(professionalId, message) {
    if (!this.storage[professionalId]) {
      this.storage[professionalId] = [];
    }
    this.storage[professionalId].push({
      ...message,
      id: Date.now() + Math.random(),
      timestamp: new Date().toISOString()
    });
    localStorage.setItem('chatMessages', JSON.stringify(this.storage));
  },
  
  getMessages: function(professionalId) {
    return this.storage[professionalId] || [];
  },
  
  clearMessages: function(professionalId) {
    if (this.storage[professionalId]) {
      delete this.storage[professionalId];
      localStorage.setItem('chatMessages', JSON.stringify(this.storage));
    }
  }
};

function ChatBox({ isOpen, onClose, selectedProfessional }) {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [uploadedImages, setUploadedImages] = useState([]);
  const [showImagePreview, setShowImagePreview] = useState(false);
  const messagesEndRef = useRef(null);
  const fileInputRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    if (isOpen && selectedProfessional) {
      // Load messages from database
      const storedMessages = MessageDatabase.getMessages(selectedProfessional.id);
      
      if (storedMessages.length === 0) {
        // Add initial greeting if no previous messages
        const initialMessage = {
          message: `Hi! I'm ${selectedProfessional.name}. I received your booking request. How can I help you today?`,
          sender: 'professional',
          timestamp: new Date().toISOString()
        };
        MessageDatabase.saveMessage(selectedProfessional.id, initialMessage);
        setMessages([initialMessage]);
      } else {
        setMessages(storedMessages);
      }
    }
  }, [isOpen, selectedProfessional]);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const formatTime = (timestamp) => {
    return new Date(timestamp).toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: true 
    });
  };

  const handleImageUpload = (event) => {
    const files = Array.from(event.target.files);
    files.forEach(file => {
      if (file.type.startsWith('image/') && uploadedImages.length < 5) {
        const reader = new FileReader();
        reader.onload = (e) => {
          setUploadedImages(prev => [
            ...prev,
            {
              id: Date.now() + Math.random(),
              file,
              url: e.target.result,
              name: file.name
            }
          ]);
        };
        reader.readAsDataURL(file);
      }
    });
    // Reset file input
    event.target.value = '';
  };

  const removeImage = (imageId) => {
    setUploadedImages(prev => prev.filter(img => img.id !== imageId));
  };

  const sendImagesWithMessage = () => {
    if (uploadedImages.length > 0 || newMessage.trim()) {
      const userMessage = {
        message: newMessage || 'Shared photos',
        sender: 'customer',
        timestamp: new Date().toISOString(),
        images: uploadedImages.map(img => ({
          url: img.url,
          name: img.name
        }))
      };
      
      MessageDatabase.saveMessage(selectedProfessional.id, userMessage);
      setMessages(prev => [...prev, userMessage]);
      setNewMessage('');
      setUploadedImages([]);
      setShowImagePreview(false);
      
      // Simulate professional response to images
      setIsTyping(true);
      setTimeout(() => {
        const imageResponses = [
          "Thanks for the photos! I can see the issue clearly now.",
          "The images are very helpful. I know exactly what needs to be done.",
          "Good photos! This looks like something I can fix quickly.",
          "I can see the problem from your photos. I'll bring the right tools.",
          "Clear images! This will help me prepare for the job."
        ];
        
        const response = imageResponses[Math.floor(Math.random() * imageResponses.length)];
        
        const professionalMessage = {
          message: response,
          sender: 'professional',
          timestamp: new Date().toISOString()
        };
        
        MessageDatabase.saveMessage(selectedProfessional.id, professionalMessage);
        setMessages(prev => [...prev, professionalMessage]);
        setIsTyping(false);
      }, 2000);
    }
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (newMessage.trim() && selectedProfessional) {
      const userMessage = {
        message: newMessage,
        sender: 'customer',
        timestamp: new Date().toISOString()
      };
      
      MessageDatabase.saveMessage(selectedProfessional.id, userMessage);
      setMessages(prev => [...prev, userMessage]);
      setNewMessage('');
      
      // Simulate professional typing
      setIsTyping(true);
      
      // Simulate professional response after 2-3 seconds
      setTimeout(() => {
        const responses = [
          "I understand. I can help you with that.",
          "That sounds like a straightforward job. When would be convenient for you?",
          "I have experience with similar issues. Let me know your preferred time.",
          "I can definitely assist you. Would you like to schedule a visit?",
          "Thanks for the details. I'll be able to resolve this for you."
        ];
        
        const randomResponse = responses[Math.floor(Math.random() * responses.length)];
        
        const professionalMessage = {
          message: randomResponse,
          sender: 'professional',
          timestamp: new Date().toISOString()
        };
        
        MessageDatabase.saveMessage(selectedProfessional.id, professionalMessage);
        setMessages(prev => [...prev, professionalMessage]);
        setIsTyping(false);
      }, 2000 + Math.random() * 1000);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="chatbox-overlay">
      <div className="chatbox">
        <div className="chat-header">
          <div className="chat-professional-info">
            <div className="chat-avatar">
              {selectedProfessional?.avatar || '👨‍🔧'}
            </div>
            <div className="chat-details">
              <h4>{selectedProfessional?.name || 'Professional'}</h4>
              <span className="online-status">Online now</span>
            </div>
          </div>
          <div className="chat-actions">
            <button className="chat-action-btn" title="Voice call">
              <Phone size={18} />
            </button>
            <button className="chat-action-btn" title="Video call">
              <Video size={18} />
            </button>
            <button className="chat-close-btn" onClick={onClose}>
              <X size={20} />
            </button>
          </div>
        </div>

        <div className="chat-messages">
          {messages.map((msg, index) => (
            <div
              key={msg.id || index}
              className={`message ${msg.sender === 'customer' ? 'message-sent' : 'message-received'}`}
            >
              <div className="message-content">
                <p>{msg.message}</p>
                {msg.images && msg.images.length > 0 && (
                  <div className="message-images">
                    {msg.images.map((image, imgIndex) => (
                      <div key={imgIndex} className="message-image">
                        <img src={image.url} alt={image.name} onClick={() => window.open(image.url)} />
                        <span className="image-name">{image.name}</span>
                      </div>
                    ))}
                  </div>
                )}
                <span className="message-time">{formatTime(msg.timestamp)}</span>
              </div>
            </div>
          ))}
          
          {isTyping && (
            <div className="message message-received">
              <div className="message-content">
                <div className="typing-indicator">
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {showImagePreview && uploadedImages.length > 0 && (
          <div className="image-preview-container">
            <div className="preview-header">
              <span>Photos to send ({uploadedImages.length})</span>
              <button 
                type="button" 
                className="close-preview"
                onClick={() => setShowImagePreview(false)}
              >
                <X size={16} />
              </button>
            </div>
            <div className="preview-images">
              {uploadedImages.map(image => (
                <div key={image.id} className="preview-image">
                  <img src={image.url} alt={image.name} />
                  <button 
                    type="button"
                    className="remove-preview-image"
                    onClick={() => removeImage(image.id)}
                  >
                    <X size={14} />
                  </button>
                </div>
              ))}
            </div>
            <div className="preview-actions">
              <button 
                type="button" 
                className="btn btn-secondary"
                onClick={() => {
                  setUploadedImages([]);
                  setShowImagePreview(false);
                }}
              >
                Cancel
              </button>
              <button 
                type="button" 
                className="btn btn-primary"
                onClick={sendImagesWithMessage}
              >
                <Send size={16} />
                Send Photos
              </button>
            </div>
          </div>
        )}

        <form onSubmit={handleSendMessage} className="chat-input-form">
          <div className="chat-input-container">
            <div className="input-actions">
              <input
                type="file"
                accept="image/*"
                multiple
                onChange={handleImageUpload}
                className="file-input"
                ref={fileInputRef}
                style={{ display: 'none' }}
              />
              <button 
                type="button"
                className="attachment-btn"
                onClick={() => fileInputRef.current?.click()}
                title="Attach photos"
              >
                <Camera size={18} />
              </button>
              {uploadedImages.length > 0 && (
                <button 
                  type="button"
                  className="preview-btn"
                  onClick={() => setShowImagePreview(true)}
                  title="View uploaded photos"
                >
                  <Image size={18} />
                  <span className="photo-count">{uploadedImages.length}</span>
                </button>
              )}
            </div>
            <input
              ref={inputRef}
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Type your message..."
              className="chat-input"
            />
            <button type="button" className="emoji-btn" title="Add emoji">
              <Smile size={18} />
            </button>
            <button 
              type="submit" 
              className="send-btn"
              disabled={!newMessage.trim() && uploadedImages.length === 0}
            >
              <Send size={18} />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ChatBox;