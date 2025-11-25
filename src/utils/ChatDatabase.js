// Chat Database Utility for ServiceMatch Customer App
// This utility provides a simple local storage-based database for chat messages

class ChatDatabase {
  constructor() {
    this.storageKey = 'sServiceMatch_chatMessages';
    this.init();
  }

  init() {
    // Initialize storage if it doesn't exist
    if (!localStorage.getItem(this.storageKey)) {
      localStorage.setItem(this.storageKey, JSON.stringify({}));
    }
  }

  // Get all stored messages
  getAllMessages() {
    try {
      return JSON.parse(localStorage.getItem(this.storageKey) || '{}');
    } catch (error) {
      console.error('Error reading chat messages:', error);
      return {};
    }
  }

  // Get messages for a specific professional
  getMessages(professionalId) {
    const allMessages = this.getAllMessages();
    return allMessages[professionalId] || [];
  }

  // Save a new message
  saveMessage(professionalId, message) {
    try {
      const allMessages = this.getAllMessages();
      
      if (!allMessages[professionalId]) {
        allMessages[professionalId] = [];
      }

      const newMessage = {
        ...message,
        id: this.generateId(),
        timestamp: message.timestamp || new Date().toISOString(),
        read: false
      };

      allMessages[professionalId].push(newMessage);
      localStorage.setItem(this.storageKey, JSON.stringify(allMessages));
      
      return newMessage;
    } catch (error) {
      console.error('Error saving message:', error);
      return null;
    }
  }

  // Update a message
  updateMessage(professionalId, messageId, updates) {
    try {
      const allMessages = this.getAllMessages();
      
      if (allMessages[professionalId]) {
        const messageIndex = allMessages[professionalId].findIndex(msg => msg.id === messageId);
        if (messageIndex !== -1) {
          allMessages[professionalId][messageIndex] = {
            ...allMessages[professionalId][messageIndex],
            ...updates
          };
          localStorage.setItem(this.storageKey, JSON.stringify(allMessages));
          return true;
        }
      }
      
      return false;
    } catch (error) {
      console.error('Error updating message:', error);
      return false;
    }
  }

  // Delete a message
  deleteMessage(professionalId, messageId) {
    try {
      const allMessages = this.getAllMessages();
      
      if (allMessages[professionalId]) {
        allMessages[professionalId] = allMessages[professionalId].filter(msg => msg.id !== messageId);
        localStorage.setItem(this.storageKey, JSON.stringify(allMessages));
        return true;
      }
      
      return false;
    } catch (error) {
      console.error('Error deleting message:', error);
      return false;
    }
  }

  // Clear all messages for a professional
  clearMessages(professionalId) {
    try {
      const allMessages = this.getAllMessages();
      
      if (allMessages[professionalId]) {
        delete allMessages[professionalId];
        localStorage.setItem(this.storageKey, JSON.stringify(allMessages));
        return true;
      }
      
      return false;
    } catch (error) {
      console.error('Error clearing messages:', error);
      return false;
    }
  }

  // Clear all chat data
  clearAllMessages() {
    try {
      localStorage.setItem(this.storageKey, JSON.stringify({}));
      return true;
    } catch (error) {
      console.error('Error clearing all messages:', error);
      return false;
    }
  }

  // Get unread message count for a professional
  getUnreadCount(professionalId) {
    const messages = this.getMessages(professionalId);
    return messages.filter(msg => !msg.read && msg.sender === 'professional').length;
  }

  // Mark messages as read
  markAsRead(professionalId, messageIds = null) {
    try {
      const allMessages = this.getAllMessages();
      
      if (allMessages[professionalId]) {
        allMessages[professionalId].forEach(msg => {
          if (!messageIds || messageIds.includes(msg.id)) {
            msg.read = true;
          }
        });
        localStorage.setItem(this.storageKey, JSON.stringify(allMessages));
        return true;
      }
      
      return false;
    } catch (error) {
      console.error('Error marking messages as read:', error);
      return false;
    }
  }

  // Search messages
  searchMessages(professionalId, query) {
    const messages = this.getMessages(professionalId);
    return messages.filter(msg => 
      msg.message && msg.message.toLowerCase().includes(query.toLowerCase())
    );
  }

  // Get chat statistics
  getStatistics(professionalId) {
    const messages = this.getMessages(professionalId);
    
    return {
      totalMessages: messages.length,
      userMessages: messages.filter(msg => msg.sender === 'customer').length,
      professionalMessages: messages.filter(msg => msg.sender === 'professional').length,
      imagesShared: messages.filter(msg => msg.images && msg.images.length > 0).length,
      unreadCount: this.getUnreadCount(professionalId),
      firstMessage: messages.length > 0 ? messages[0].timestamp : null,
      lastMessage: messages.length > 0 ? messages[messages.length - 1].timestamp : null
    };
  }

  // Generate unique ID
  generateId() {
    return Date.now() + '_' + Math.random().toString(36).substr(2, 9);
  }

  // Export chat data for backup
  exportChatData(professionalId = null) {
    if (professionalId) {
      return {
        professionalId,
        messages: this.getMessages(professionalId),
        exportDate: new Date().toISOString()
      };
    } else {
      return {
        allChats: this.getAllMessages(),
        exportDate: new Date().toISOString()
      };
    }
  }

  // Import chat data from backup
  importChatData(data) {
    try {
      if (data.allChats) {
        localStorage.setItem(this.storageKey, JSON.stringify(data.allChats));
      } else if (data.professionalId && data.messages) {
        const allMessages = this.getAllMessages();
        allMessages[data.professionalId] = data.messages;
        localStorage.setItem(this.storageKey, JSON.stringify(allMessages));
      }
      return true;
    } catch (error) {
      console.error('Error importing chat data:', error);
      return false;
    }
  }
}

// Create and export singleton instance
const chatDatabase = new ChatDatabase();

export default chatDatabase;