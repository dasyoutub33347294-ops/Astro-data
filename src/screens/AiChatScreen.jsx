import React, { useState, useRef, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useUser } from '../context/UserContext';
import { getAiGuidance } from '../services/aiService';
import Header from '../components/common/Header';
import ChatBubble from '../components/chat/ChatBubble';
import ChatInput from '../components/chat/ChatInput';
import LoadingSpinner from '../components/common/LoadingSpinner';
import ScreenTransition from '../components/common/ScreenTransition';
import './AiChatScreen.css';

const AiChatScreen = () => {
  const { t, language } = useLanguage();
  const { user } = useUser();
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const chatEndRef = useRef(null);

  // Welcome message on mount
  useEffect(() => {
    const welcomeMsg = {
      id: Date.now(),
      text: t.chat.welcome,
      isUser: false
    };
    setMessages([welcomeMsg]);
  }, []);

  // Auto-scroll to bottom
  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isLoading]);

  const handleSend = async (userText) => {
    if (!userText.trim()) return;

    // Add user message
    const userMsg = {
      id: Date.now(),
      text: userText,
      isUser: true
    };

    setMessages((prev) => [...prev, userMsg]);
    setIsLoading(true);

    try {
      const userContext = {
        name: user.name || 'Seeker',
        zodiacSign: user.zodiacSign || 'Unknown'
      };

      const aiResponse = await getAiGuidance(userText, language, userContext);

      const aiMsg = {
        id: Date.now() + 1,
        text: aiResponse,
        isUser: false
      };

      setMessages((prev) => [...prev, aiMsg]);
    } catch (error) {
      console.error('Chat error:', error);
      const errorMsg = {
        id: Date.now() + 1,
        text: 'The cosmic energy is disturbed. Please try again in a moment.',
        isUser: false
      };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ScreenTransition animation="slide-left">
      <div className="chat-screen">
        <Header title={t.chat.title} />

        {/* Chat Messages Area */}
        <div className="chat-messages-area">
          {messages.map((msg) => (
            <ChatBubble
              key={msg.id}
              message={msg.text}
              isUser={msg.isUser}
            />
          ))}

          {/* Typing Indicator */}
          {isLoading && (
            <div className="typing-indicator">
              <div className="typing-avatar">🔮</div>
              <div className="typing-dots">
                <span className="typing-dot"></span>
                <span className="typing-dot"></span>
                <span className="typing-dot"></span>
              </div>
            </div>
          )}

          <div ref={chatEndRef} />
        </div>

        {/* Chat Input */}
        <ChatInput onSend={handleSend} disabled={isLoading} />
      </div>
    </ScreenTransition>
  );
};

export default AiChatScreen;
