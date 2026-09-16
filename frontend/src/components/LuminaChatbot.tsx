import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Send, Sparkles } from 'lucide-react';
import { apiClient } from '../api/client';
import { createWhatsAppUrl } from '../utils/whatsapp';

interface Message {
  role: 'user' | 'model';
  content: string;
}

export function LuminaChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showWhatsAppFallback, setShowWhatsAppFallback] = useState(false);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Load session and previous messages if any
    const savedMessages = sessionStorage.getItem('lumina_chat_messages');
    if (savedMessages) {
      setMessages(JSON.parse(savedMessages));
    } else {
      // Initial greeting
      setMessages([{
        role: 'model',
        content: "Hi! I'm Lumina. I can help you with questions about our catalog, pricing, and custom designs. What would you like to know?"
      }]);
    }
  }, []);

  useEffect(() => {
    // Scroll to bottom on new message
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    // Save messages to session storage
    if (messages.length > 0) {
      sessionStorage.setItem('lumina_chat_messages', JSON.stringify(messages));
    }
  }, [messages]);

  const handleSendMessage = async (text: string) => {
    if (!text.trim()) return;

    const newMessages = [...messages, { role: 'user' as const, content: text }];
    setMessages(newMessages);
    setInputText('');
    setIsLoading(true);
    setShowWhatsAppFallback(false);

    try {
      const sessionId = sessionStorage.getItem('lumina_chat_session') || undefined;
      const response = await apiClient.sendChatMessage(text, sessionId);
      
      if (response.sessionId) {
        sessionStorage.setItem('lumina_chat_session', response.sessionId);
      }

      setMessages(prev => [...prev, { role: 'model', content: response.reply }]);
      
      if (response.rateLimited) {
        setShowWhatsAppFallback(true);
      }
    } catch (error) {
      console.error('Chat error:', error);
      setMessages(prev => [...prev, { 
        role: 'model', 
        content: "I'm having a little trouble connecting right now. Tap the button below to chat with us directly on WhatsApp!" 
      }]);
      setShowWhatsAppFallback(true);
    } finally {
      setIsLoading(false);
    }
  };

  const handleWhatsAppFallback = () => {
    window.open(createWhatsAppUrl('Hi Lumina Art, I had a question:'), '_blank');
  };

  const quickReplies = [
    "What products do you have?",
    "How does ordering work?",
    "Tell me about custom design"
  ];

  return (
    <>
      <div className="fixed bottom-6 right-6 z-50">
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="absolute bottom-20 right-0 w-80 sm:w-96 max-h-[600px] flex flex-col bg-white/90 backdrop-blur-xl border border-white/20 shadow-2xl rounded-2xl overflow-hidden"
            >
              {/* Header */}
              <div className="bg-slate-900 text-white p-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-emerald-500/20 flex items-center justify-center border border-emerald-500/30">
                    <Sparkles className="w-4 h-4 text-emerald-400" />
                  </div>
                  <div>
                    <h3 className="font-bold text-sm">Lumina AI</h3>
                    <p className="text-xs text-slate-300">Ask about our designs</p>
                  </div>
                </div>
                <button 
                  onClick={() => setIsOpen(false)}
                  className="p-2 hover:bg-white/10 rounded-full transition-colors cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4 max-h-96 min-h-64 bg-slate-50/50">
                {messages.map((msg, idx) => (
                  <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-[85%] rounded-2xl px-4 py-2 text-sm ${
                      msg.role === 'user' 
                        ? 'bg-slate-900 text-white rounded-tr-sm' 
                        : 'bg-white border border-slate-200 text-slate-800 rounded-tl-sm shadow-sm'
                    }`}>
                      {msg.content}
                    </div>
                  </div>
                ))}
                
                {isLoading && (
                  <div className="flex justify-start">
                    <div className="bg-white border border-slate-200 rounded-2xl rounded-tl-sm px-4 py-3 shadow-sm">
                      <div className="flex gap-1">
                        <div className="w-2 h-2 bg-slate-300 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                        <div className="w-2 h-2 bg-slate-300 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                        <div className="w-2 h-2 bg-slate-300 rounded-full animate-bounce"></div>
                      </div>
                    </div>
                  </div>
                )}
                
                {showWhatsAppFallback && (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex justify-center mt-4"
                  >
                    <button
                      onClick={handleWhatsAppFallback}
                      className="bg-emerald-500 hover:bg-emerald-600 text-white text-sm font-bold py-2.5 px-6 rounded-full shadow-md transition-colors cursor-pointer"
                    >
                      Chat on WhatsApp Instead
                    </button>
                  </motion.div>
                )}
                <div ref={messagesEndRef} />
              </div>

              {/* Quick Replies (only show if few messages and not loading/fallback) */}
              {messages.length <= 2 && !isLoading && !showWhatsAppFallback && (
                <div className="px-4 pb-2 flex flex-wrap gap-2">
                  {quickReplies.map((reply, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleSendMessage(reply)}
                      className="text-xs bg-white border border-slate-200 text-slate-600 px-3 py-1.5 rounded-full hover:bg-slate-50 hover:border-slate-300 transition-colors cursor-pointer text-left"
                    >
                      {reply}
                    </button>
                  ))}
                </div>
              )}

              {/* Input */}
              <div className="p-3 bg-white border-t border-slate-100">
                <form 
                  onSubmit={(e) => { e.preventDefault(); handleSendMessage(inputText); }}
                  className="flex gap-2 items-center"
                >
                  <input
                    type="text"
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    placeholder="Ask Lumina..."
                    className="flex-1 bg-slate-100 border-none rounded-full px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-slate-900 transition-shadow"
                    disabled={isLoading}
                  />
                  <button
                    type="submit"
                    disabled={!inputText.trim() || isLoading}
                    className="p-2.5 bg-slate-900 text-white rounded-full hover:bg-slate-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors cursor-pointer flex-shrink-0"
                  >
                    <Send className="w-4 h-4" />
                  </button>
                </form>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Floating Button */}
        <motion.button
          onClick={() => setIsOpen(!isOpen)}
          className="w-14 h-14 bg-slate-900 text-white rounded-full flex items-center justify-center shadow-2xl hover:scale-105 transition-transform cursor-pointer relative group"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {/* Subtle pulse ring */}
          <div className="absolute inset-0 rounded-full border-2 border-slate-900 opacity-20 group-hover:animate-ping" />
          
          <Sparkles className={`w-6 h-6 transition-transform duration-300 ${isOpen ? 'rotate-180 scale-0' : 'rotate-0 scale-100'}`} />
          <X className={`w-6 h-6 absolute transition-transform duration-300 ${isOpen ? 'rotate-0 scale-100' : '-rotate-180 scale-0'}`} />
        </motion.button>
      </div>
    </>
  );
}
