import React from 'react';
import './ChatBubble.css';

const ChatBubble = ({ message, isUser }) => {
  return (
    <div className={`chat-bubble-container ${isUser ? 'user' : 'ai'}`}>
      {!isUser && (
        <div className="chat-avatar ai-avatar">
          <span>🔮</span>
        </div>
      )}
      
      <div className="chat-bubble-content animate-fade-in">
        {message}
      </div>

      {isUser && (
        <div className="chat-avatar user-avatar">
          <span>👤</span>
        </div>
      )}
    </div>
  );
};

export default ChatBubble;
