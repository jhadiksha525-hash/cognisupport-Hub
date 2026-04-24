import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MessageCircle, X, Send, Bot, User } from 'lucide-react';
import { cn } from '../lib/utils';

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: 'ai', text: 'Hello! I am your AI Support Assistant. How can I help you today?', time: new Date() }
  ]);
  const [input, setInput] = useState('');
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isOpen]);

  const handleSend = () => {
    if (!input.trim()) return;
    
    setMessages(prev => [...prev, { role: 'visitor', text: input, time: new Date() }]);
    setInput('');
    
    // Simulate AI response
    setTimeout(() => {
      setMessages(prev => [...prev, { 
        role: 'ai', 
        text: "I'm currently in demo mode. In a live environment, I would search through the uploaded company documents to provide an accurate answer with citations.",
        time: new Date() 
      }]);
    }, 1000);
  };

  return (
    <div className="fixed bottom-6 right-6 z-[100]">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            className="mb-4 w-[350px] md:w-[400px] h-[550px] glass-card flex flex-col overflow-hidden shadow-2xl border-neutral-200 bg-white rounded-3xl"
          >
            {/* Header */}
            <div className="bg-black p-5 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="bg-white/10 p-2 rounded-xl backdrop-blur-sm">
                  <Bot className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h4 className="text-white font-bold text-sm tracking-tight">Support Assistant</h4>
                  <p className="text-neutral-400 text-[10px] font-bold uppercase tracking-widest">Active Wisdom</p>
                </div>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="text-white/60 hover:text-white transition-colors p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Messages */}
            <div 
              ref={scrollRef}
              className="flex-1 overflow-y-auto p-6 space-y-6 bg-neutral-50/30"
            >
              {messages.map((msg, i) => (
                <div 
                  key={i}
                  className={cn(
                    "flex gap-3 max-w-[90%]",
                    msg.role === 'visitor' ? "ml-auto flex-row-reverse" : ""
                  )}
                >
                  <div className={cn(
                    "w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 border shadow-sm",
                    msg.role === 'ai' ? "bg-white border-neutral-200 text-black" : "bg-black border-black text-white"
                  )}>
                    {msg.role === 'ai' ? <Bot className="w-4 h-4" /> : <User className="w-4 h-4" />}
                  </div>
                  <div className={cn(
                    "p-3 rounded-2xl text-sm leading-relaxed shadow-sm font-medium",
                    msg.role === 'ai' 
                      ? "bg-white text-black border border-neutral-200 rounded-tl-sm" 
                      : "bg-black text-white rounded-tr-sm"
                  )}>
                    {msg.text}
                  </div>
                </div>
              ))}
            </div>

            {/* Input */}
            <div className="p-4 bg-white border-t border-neutral-100">
              <div className="flex gap-2 bg-neutral-50 p-2 rounded-2xl border border-neutral-200 focus-within:border-black transition-all">
                <input 
                  type="text" 
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                  placeholder="Ask a question..."
                  className="flex-1 bg-transparent border-none focus:ring-0 text-black text-sm px-3 placeholder:text-neutral-400 font-medium"
                />
                <button 
                  onClick={handleSend}
                  className="bg-black p-2.5 rounded-xl text-white hover:bg-neutral-800 transition-all shadow-md active:scale-95"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
              <p className="text-[9px] text-neutral-400 mt-3 text-center font-bold uppercase tracking-widest">
                Powered by CogniSupport
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "w-14 h-14 rounded-full flex items-center justify-center shadow-2xl transition-all duration-300 border border-neutral-200",
          isOpen ? "bg-neutral-100 text-black" : "bg-black text-white"
        )}
      >
        {isOpen ? <X className="w-6 h-6" /> : <MessageCircle className="w-6 h-6" />}
      </motion.button>
    </div>
  );
}
