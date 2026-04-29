import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  MessageCircle, X, Send, Bot, User, FileText, 
  ExternalLink, ChevronRight, ThumbsUp, ThumbsDown, 
  Copy, RotateCcw, Headset, CheckCircle2, AlertCircle
} from 'lucide-react';
import { cn } from '../lib/utils';

interface Citation {
  id: string;
  source: string;
  page: string;
  content: string;
}

type Confidence = 'high' | 'medium' | 'low';

interface Message {
  id: string;
  role: 'ai' | 'visitor' | 'system';
  text: string;
  time: Date;
  citations?: Citation[];
  confidence?: Confidence;
  isStreaming?: boolean;
}

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedCitation, setSelectedCitation] = useState<Citation | null>(null);
  const [isTyping, setIsTyping] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { 
      id: 'initial',
      role: 'ai', 
      text: 'Hello! I am your AI Support Assistant. I am powered by your company documentation to provide verified answers.', 
      time: new Date(),
      confidence: 'high'
    }
  ]);
  const [input, setInput] = useState('');
  const [isAgentMode, setIsAgentMode] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  const suggestedQuestions = [
    "Refund policy?",
    "Delivery time?",
    "Cancel order?"
  ];

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isOpen, isTyping]);

  const handleSend = (text: string = input) => {
    const messageText = text || input;
    if (!messageText.trim()) return;
    
    const visitorMsg: Message = { 
      id: Date.now().toString(),
      role: 'visitor', 
      text: messageText, 
      time: new Date() 
    };
    
    setMessages(prev => [...prev, visitorMsg]);
    setInput('');
    setIsTyping(true);
    
    // Simulate AI streaming response
    setTimeout(() => {
      setIsTyping(false);
      const aiMsgId = (Date.now() + 1).toString();
      const fullText = messageText.toLowerCase().includes('refund') 
        ? "According to our policy, seasonal items can be returned within 14 days of purchase. Proof of purchase is required for all cash refunds."
        : "I've searched our knowledge base and found information regarding your query. Our standard processing time is 2-4 business days.";

      const demoCitations: Citation[] = [
        {
          id: '1',
          source: 'Refund_Policy_2024.pdf',
          page: 'Page 14',
          content: 'Seasonal items including holiday decorations and lawn furniture are eligible for returns within 14 days of purchase.'
        }
      ];

      const newAiMsg: Message = {
        id: aiMsgId,
        role: 'ai',
        text: '',
        time: new Date(),
        citations: demoCitations,
        confidence: messageText.length < 10 ? 'medium' : 'high',
        isStreaming: true
      };

      setMessages(prev => [...prev, newAiMsg]);

      // Streaming effect
      let currentText = '';
      const words = fullText.split(' ');
      let i = 0;
      const interval = setInterval(() => {
        if (i < words.length) {
          currentText += (i === 0 ? '' : ' ') + words[i];
          setMessages(prev => prev.map(m => m.id === aiMsgId ? { ...m, text: currentText } : m));
          i++;
        } else {
          clearInterval(interval);
          setMessages(prev => prev.map(m => m.id === aiMsgId ? { ...m, isStreaming: false } : m));
        }
      }, 30);
    }, 1000);
  };

  const clearChat = () => {
    setMessages([{ 
      id: 'clear-' + Date.now(),
      role: 'ai', 
      text: 'Chat history cleared. How can I help you now?', 
      time: new Date(),
      confidence: 'high'
    }]);
    setIsAgentMode(false);
  };

  const connectToAgent = () => {
    setIsAgentMode(true);
    setMessages(prev => [...prev, {
      id: 'agent-' + Date.now(),
      role: 'system',
      text: 'Transferring to a human agent... Please stay on the line.',
      time: new Date()
    }]);
  };

  return (
    <div className="fixed bottom-6 right-6 z-[100] flex flex-col items-end">
      <AnimatePresence mode="wait">
        {isOpen && (
          <div className="flex gap-4 items-end mb-4 pr-1">
            {/* Citation Detail Panel */}
            <AnimatePresence>
              {selectedCitation && (
                <motion.div
                  initial={{ opacity: 0, x: 20, scale: 0.95 }}
                  animate={{ opacity: 1, x: 0, scale: 1 }}
                  exit={{ opacity: 0, x: 20, scale: 0.95 }}
                  className="hidden lg:flex flex-col w-[300px] h-[550px] bg-[#0B1020]/95 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/10 overflow-hidden"
                >
                  <div className="p-5 border-b border-white/5 bg-[#070A12]/50 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <FileText className="w-4 h-4 text-primary" />
                      <span className="text-xs font-bold text-white uppercase tracking-widest">Source Context</span>
                    </div>
                    <button 
                      onClick={() => setSelectedCitation(null)}
                      className="text-white/40 hover:text-white transition-colors"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                  <div className="p-6 flex-1 overflow-y-auto">
                    <h5 className="text-sm font-bold text-white mb-1 leading-tight">{selectedCitation.source}</h5>
                    <p className="text-[10px] text-primary font-bold uppercase tracking-widest mb-6">{selectedCitation.page}</p>
                    
                    <div className="bg-white/5 border-l-2 border-primary p-4 rounded-r-xl shadow-inner text-pretty">
                      <p className="text-sm text-white/80 leading-relaxed italic">
                        "{selectedCitation.content}"
                      </p>
                    </div>
                    
                    <button className="mt-8 flex items-center gap-2 text-xs font-bold text-primary hover:text-primary-hover transition-colors group">
                      View full document <ExternalLink className="w-3 h-3 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Chat Module */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.8, y: 20 }}
                className="w-[350px] md:w-[400px] h-[580px] flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-[#0B1020]/90 backdrop-blur text-white shadow-[0_20px_80px_rgba(0,0,0,0.6)]"
              >
              {/* Header */}
              <div className="bg-[#070A12]/80 p-5 flex items-center justify-between border-b border-white/5">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <div className="bg-gradient-to-br from-primary to-accent p-2 rounded-xl shadow-lg shadow-primary/20">
                      <Bot className="w-5 h-5 text-white" />
                    </div>
                    <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 border-2 border-[#0B1020] rounded-full" />
                  </div>
                  <div>
                    <h4 className="text-white font-bold text-sm tracking-tight flex items-center gap-2">
                       Support Assistant
                    </h4>
                    <p className="text-white/40 text-[10px] font-bold uppercase tracking-widest">Always Verified</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button 
                    onClick={clearChat}
                    title="Clear Chat"
                    className="text-white/40 hover:text-white transition-colors p-1"
                  >
                    <RotateCcw className="w-4 h-4" />
                  </button>
                  <button 
                    onClick={() => setIsOpen(false)}
                    className="text-white/40 hover:text-white transition-colors p-1"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Messages Area */}
              <div 
                ref={scrollRef}
                className="flex-1 overflow-y-auto p-6 space-y-6 scroll-smooth"
              >
                {messages.map((msg, i) => (
                  <div 
                    key={msg.id}
                    className={cn(
                      "flex gap-3",
                      msg.role === 'visitor' ? "ml-auto flex-row-reverse max-w-[85%]" : "max-w-[100%]",
                      msg.role === 'system' ? "mx-auto w-full justify-center" : ""
                    )}
                  >
                    {msg.role !== 'system' && (
                      <div className={cn(
                        "w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 border shadow-md",
                        msg.role === 'ai' ? "bg-white/5 border-white/10 text-white" : "bg-primary border-primary/20 text-white"
                      )}>
                        {msg.role === 'ai' ? <Bot className="w-4 h-4" /> : <User className="w-4 h-4" />}
                      </div>
                    )}

                    {msg.role === 'system' ? (
                      <div className="bg-white/5 text-[10px] font-bold text-white/40 uppercase tracking-widest px-4 py-2 rounded-full border border-white/10">
                        {msg.text}
                      </div>
                    ) : (
                      <div className="space-y-2 flex-1">
                        <div className={cn(
                          "p-4 rounded-2xl text-sm leading-relaxed shadow-xl font-medium relative group/msg",
                          msg.role === 'ai' 
                            ? "bg-white/5 text-white/90 border border-white/10 rounded-tl-sm w-full backdrop-blur-md" 
                            : "bg-primary text-white rounded-tr-sm shadow-primary/20"
                        )}>
                          {msg.role === 'ai' && msg.confidence && !msg.isStreaming && (
                            <div className="absolute top-2 right-2 flex gap-1 opacity-0 group-hover/msg:opacity-100 transition-opacity">
                              <button 
                                onClick={() => {
                                  navigator.clipboard.writeText(msg.text);
                                }}
                                title="Copy" 
                                className="p-1 hover:bg-white/10 rounded transition-colors"
                              >
                                <Copy className="w-3 h-3 text-white/40 hover:text-white" />
                              </button>
                            </div>
                          )}

                          {msg.text}
                          {msg.isStreaming && <span className="inline-block w-1.5 h-4 bg-primary ml-1 animate-pulse align-middle" />}
                          
                          {msg.role === 'ai' && msg.confidence && !msg.isStreaming && (
                            <div className="mt-3 pt-2 border-t border-white/5 flex items-center justify-between">
                              <ConfidenceLabel type={msg.confidence} />
                              {msg.confidence === 'low' && (
                                <button 
                                  onClick={connectToAgent}
                                  className="text-[10px] items-center gap-1 font-bold text-primary hover:text-primary-hover transition-colors flex"
                                >
                                  Talk to Human? <Headset className="w-3 h-3" />
                                </button>
                              )}
                            </div>
                          )}

                          {msg.citations && msg.citations.length > 0 && !msg.isStreaming && (
                            <div className="mt-4 pt-3 border-t border-white/10">
                              <p className="flex items-center justify-between w-full text-left mb-2 text-[10px] font-bold text-white/30 uppercase tracking-widest">
                                Sources
                              </p>
                              <div className="flex flex-col gap-2">
                                {msg.citations.map((cite) => (
                                  <button
                                    key={cite.id}
                                    onClick={() => setSelectedCitation(cite)}
                                    className={cn(
                                      "flex items-center justify-between gap-3 p-2 rounded-xl border transition-all text-left group/cite",
                                      selectedCitation?.id === cite.id 
                                        ? "bg-primary/20 border-primary/40 shadow-lg shadow-primary/10" 
                                        : "bg-white/5 border-white/5 hover:border-white/20"
                                    )}
                                  >
                                    <div className="flex items-center gap-2 overflow-hidden">
                                      <div className={cn(
                                        "p-1 rounded border",
                                        selectedCitation?.id === cite.id ? "bg-primary border-primary/20" : "bg-white/5 border-white/10"
                                      )}>
                                        <FileText className="w-3 h-3 text-white" />
                                      </div>
                                      <span className="text-[10px] font-bold truncate text-white/80">{cite.source}</span>
                                    </div>
                                    <div className="flex items-center gap-1 flex-shrink-0">
                                      <span className="text-[9px] font-bold text-white/40">{cite.page}</span>
                                      <ChevronRight className="w-3 h-3 text-white/20 group-hover/cite:text-primary transition-colors" />
                                    </div>
                                  </button>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                ))}

                {isTyping && (
                  <div className="flex gap-3 max-w-[90%]">
                    <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 border shadow-sm bg-white/5 border-white/10 text-white">
                      <Bot className="w-4 h-4" />
                    </div>
                    <div className="bg-white/5 border border-white/10 p-4 rounded-2xl rounded-tl-sm flex gap-1 items-center">
                      <motion.div animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }} transition={{ repeat: Infinity, duration: 0.6, delay: 0 }} className="w-1.5 h-1.5 bg-primary rounded-full shadow-lg shadow-primary/50" />
                      <motion.div animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }} transition={{ repeat: Infinity, duration: 0.6, delay: 0.2 }} className="w-1.5 h-1.5 bg-primary rounded-full shadow-lg shadow-primary/50" />
                      <motion.div animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }} transition={{ repeat: Infinity, duration: 0.6, delay: 0.4 }} className="w-1.5 h-1.5 bg-primary rounded-full shadow-lg shadow-primary/50" />
                    </div>
                  </div>
                )}
              </div>

              {/* Suggestions Panel */}
              {!isTyping && messages.length < 5 && !isAgentMode && (
                <div className="px-6 py-2 flex flex-wrap gap-2 overflow-x-auto no-scrollbar">
                  {suggestedQuestions.map(q => (
                    <button 
                      key={q}
                      onClick={() => handleSend(q)}
                      className="whitespace-nowrap px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-[10px] font-bold text-white/60 hover:border-primary hover:text-white hover:bg-white/10 transition-all active:scale-95 shadow-lg"
                    >
                      {q}
                    </button>
                  ))}
                </div>
              )}

              {/* Agent Mode Footer */}
              {isAgentMode && (
                <div className="mx-6 mb-2 p-3 rounded-xl bg-primary/10 border border-primary/20 flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center border border-primary/30 relative">
                     <Headset className="w-4 h-4 text-primary" />
                     <div className="absolute -top-1 -right-1 w-2 h-2 bg-primary rounded-full animate-ping" />
                  </div>
                  <div>
                    <p className="text-[10px] font-bold text-white uppercase tracking-widest leading-none mb-1">Agent Request Sent</p>
                    <p className="text-[9px] font-medium text-white/40 italic">A human agent will be with you shortly.</p>
                  </div>
                </div>
              )}

              {/* Input Area */}
              <div className="p-4 bg-[#070A12]/50 border-t border-white/5">
                <div className="flex gap-2 bg-white/5 p-2 rounded-2xl border border-white/10 focus-within:border-primary transition-all shadow-inner">
                  <input 
                    type="text" 
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                    placeholder={isAgentMode ? "Message the human agent..." : "Ask your knowledge base..."}
                    className="flex-1 bg-transparent border-none focus:ring-0 text-white text-sm px-3 placeholder:text-white/20 font-medium"
                  />
                  <button 
                    onClick={() => handleSend()}
                    disabled={!input.trim()}
                    className="bg-gradient-to-r from-primary to-accent p-2.5 rounded-xl text-white hover:shadow-lg hover:shadow-primary/20 transition-all active:scale-95 disabled:opacity-20 flex-shrink-0"
                  >
                    <Send className="w-4 h-4" />
                  </button>
                </div>
                <div className="mt-3 flex items-center justify-between px-2">
                   <div className="inline-flex items-center gap-2 rounded-full border border-emerald-400/20 bg-emerald-400/10 px-2 py-0.5 text-[8px] font-semibold text-emerald-200">
                    <CheckCircle2 className="w-2 h-2" />
                    VERIFIED OUTPUT
                  </div>
                   <p className="text-[8px] text-white/30 font-bold uppercase tracking-widest">
                    Support Efficiency: +84%
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Trigger Button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "h-14 w-14 rounded-full text-white bg-gradient-to-r from-[#6D28D9] to-[#4F46E5] shadow-[0_12px_40px_rgba(0,0,0,0.5)] hover:opacity-95 transition flex items-center justify-center z-[101]",
          isOpen ? "rotate-0" : ""
        )}
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }}>
              <X className="w-7 h-7" />
            </motion.div>
          ) : (
            <motion.div key="open" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }}>
              <MessageCircle className="w-7 h-7" />
            </motion.div>
          )}
        </AnimatePresence>
        {!isOpen && (
          <div className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
        )}
      </motion.button>
    </div>
  );
}

function ConfidenceLabel({ type }: { type: Confidence }) {
  if (type === 'high') {
    return (
      <span className="inline-flex items-center gap-2 rounded-full border border-emerald-400/20 bg-emerald-400/10 px-3 py-1 text-[9px] font-semibold text-emerald-200">
        <CheckCircle2 className="w-2.5 h-2.5" />
        VERIFIED OUTPUT
      </span>
    );
  }

  const styles = {
    medium: { icon: AlertCircle, text: 'Probable Match', color: 'text-orange-400', bg: 'bg-orange-500/10' },
    low: { icon: AlertCircle, text: 'Low Confidence', color: 'text-red-400', bg: 'bg-red-500/10' }
  };

  const { icon: Icon, text, color, bg } = styles[type as 'medium' | 'low'];

  return (
    <div className={cn("inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full border border-current backdrop-blur-sm", bg, color)}>
      <Icon className="w-2.5 h-2.5" />
      <span className="text-[9px] font-bold uppercase tracking-widest">{text}</span>
    </div>
  );
}
