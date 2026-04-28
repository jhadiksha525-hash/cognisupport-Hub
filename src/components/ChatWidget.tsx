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
                  className="hidden lg:flex flex-col w-[300px] h-[550px] bg-white rounded-3xl shadow-2xl border border-neutral-200 overflow-hidden"
                >
                  <div className="p-5 border-b border-neutral-100 bg-neutral-50 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <FileText className="w-4 h-4 text-primary" />
                      <span className="text-xs font-bold text-text-main uppercase tracking-widest">Source Context</span>
                    </div>
                    <button 
                      onClick={() => setSelectedCitation(null)}
                      className="text-neutral-400 hover:text-black transition-colors"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                  <div className="p-6 flex-1 overflow-y-auto">
                    <h5 className="text-sm font-bold text-text-main mb-1">{selectedCitation.source}</h5>
                    <p className="text-[10px] text-primary font-bold uppercase tracking-widest mb-6">{selectedCitation.page}</p>
                    
                    <div className="bg-primary/5 border-l-2 border-primary p-4 rounded-r-xl shadow-inner text-pretty">
                      <p className="text-sm text-text-main leading-relaxed italic">
                        "{selectedCitation.content}"
                      </p>
                    </div>
                    
                    <button className="mt-8 flex items-center gap-2 text-xs font-bold text-primary hover:underline group">
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
              className="w-[350px] md:w-[400px] h-[580px] glass-card flex flex-col overflow-hidden shadow-2xl border-neutral-200 bg-white rounded-3xl"
            >
              {/* Header */}
              <div className="bg-black p-5 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <div className="bg-white/10 p-2 rounded-xl backdrop-blur-sm">
                      <Bot className="w-5 h-5 text-white" />
                    </div>
                    <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 border-2 border-black rounded-full" />
                  </div>
                  <div>
                    <h4 className="text-white font-bold text-sm tracking-tight flex items-center gap-2">
                       Support Assistant
                    </h4>
                    <p className="text-neutral-400 text-[10px] font-bold uppercase tracking-widest">Always Verified</p>
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
                    className="text-white/60 hover:text-white transition-colors p-1"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Messages Area */}
              <div 
                ref={scrollRef}
                className="flex-1 overflow-y-auto p-6 space-y-6 bg-neutral-50/30 scroll-smooth"
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
                        "w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 border shadow-sm",
                        msg.role === 'ai' ? "bg-white border-neutral-200 text-black" : "bg-black border-black text-white"
                      )}>
                        {msg.role === 'ai' ? <Bot className="w-4 h-4" /> : <User className="w-4 h-4" />}
                      </div>
                    )}

                    {msg.role === 'system' ? (
                      <div className="bg-neutral-100/50 text-[10px] font-bold text-neutral-500 uppercase tracking-widest px-4 py-2 rounded-full border border-neutral-200">
                        {msg.text}
                      </div>
                    ) : (
                      <div className="space-y-2 flex-1">
                        <div className={cn(
                          "p-4 rounded-2xl text-sm leading-relaxed shadow-sm font-medium relative group/msg",
                          msg.role === 'ai' 
                            ? "bg-white text-black border border-neutral-200 rounded-tl-sm w-full" 
                            : "bg-black text-white rounded-tr-sm"
                        )}>
                          {msg.role === 'ai' && msg.confidence && !msg.isStreaming && (
                            <div className="absolute top-2 right-2 flex gap-1 opacity-0 group-hover/msg:opacity-100 transition-opacity">
                              <button title="Copy" className="p-1 hover:bg-neutral-100 rounded transition-colors"><Copy className="w-3 h-3 text-neutral-400" /></button>
                              <button title="Helpful" className="p-1 hover:bg-neutral-100 rounded transition-colors"><ThumbsUp className="w-3 h-3 text-neutral-400" /></button>
                              <button title="Not Helpful" className="p-1 hover:bg-neutral-100 rounded transition-colors"><ThumbsDown className="w-3 h-3 text-neutral-400" /></button>
                            </div>
                          )}

                          {msg.text}
                          {msg.isStreaming && <span className="inline-block w-1.5 h-4 bg-primary ml-1 animate-pulse align-middle" />}
                          
                          {msg.role === 'ai' && msg.confidence && !msg.isStreaming && (
                            <div className="mt-3 pt-2 border-t border-neutral-50 flex items-center justify-between">
                              <ConfidenceLabel type={msg.confidence} />
                              {msg.confidence === 'low' && (
                                <button 
                                  onClick={connectToAgent}
                                  className="text-[10px] items-center gap-1 font-bold text-primary hover:underline flex"
                                >
                                  Talk to Human? <Headset className="w-3 h-3" />
                                </button>
                              )}
                            </div>
                          )}

                          {msg.citations && msg.citations.length > 0 && !msg.isStreaming && (
                            <div className="mt-4 pt-3 border-t border-neutral-100">
                              <p className="flex items-center justify-between w-full text-left mb-2 text-[10px] font-bold text-neutral-400 uppercase tracking-widest">
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
                                        ? "bg-primary/5 border-primary/20" 
                                        : "bg-neutral-50 border-neutral-200 hover:border-primary/20"
                                    )}
                                  >
                                    <div className="flex items-center gap-2">
                                      <div className="bg-white p-1 rounded border border-neutral-100">
                                        <FileText className="w-3 h-3 text-primary" />
                                      </div>
                                      <span className="text-[10px] font-bold truncate max-w-[120px]">{cite.source}</span>
                                    </div>
                                    <div className="flex items-center gap-1">
                                      <span className="text-[9px] font-bold text-neutral-400">{cite.page}</span>
                                      <ChevronRight className="w-3 h-3 text-neutral-300 group-hover/cite:text-primary transition-colors" />
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
                    <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 border shadow-sm bg-white border-neutral-200">
                      <Bot className="w-4 h-4" />
                    </div>
                    <div className="bg-white border border-neutral-200 p-4 rounded-2xl rounded-tl-sm flex gap-1 items-center">
                      <motion.div animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }} transition={{ repeat: Infinity, duration: 0.6, delay: 0 }} className="w-1.5 h-1.5 bg-primary rounded-full" />
                      <motion.div animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }} transition={{ repeat: Infinity, duration: 0.6, delay: 0.2 }} className="w-1.5 h-1.5 bg-primary rounded-full" />
                      <motion.div animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }} transition={{ repeat: Infinity, duration: 0.6, delay: 0.4 }} className="w-1.5 h-1.5 bg-primary rounded-full" />
                    </div>
                  </div>
                )}
              </div>

              {/* Suggestions Panel */}
              {!isTyping && messages.length < 5 && !isAgentMode && (
                <div className="px-6 py-2 flex flex-wrap gap-2 overflow-x-auto no-scrollbar bg-white/50">
                  {suggestedQuestions.map(q => (
                    <button 
                      key={q}
                      onClick={() => handleSend(q)}
                      className="whitespace-nowrap px-3 py-1.5 rounded-full bg-white border border-neutral-200 text-[10px] font-bold text-neutral-600 hover:border-primary hover:text-primary transition-all active:scale-95 shadow-sm"
                    >
                      {q}
                    </button>
                  ))}
                </div>
              )}

              {/* Agent Mode Footer */}
              {isAgentMode && (
                <div className="mx-6 mb-2 p-3 rounded-xl bg-orange-50 border border-orange-100 flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-orange-100 flex items-center justify-center border border-orange-200 relative">
                     <Headset className="w-4 h-4 text-orange-600" />
                     <div className="absolute -top-1 -right-1 w-2 h-2 bg-orange-500 rounded-full animate-ping" />
                  </div>
                  <div>
                    <p className="text-[10px] font-bold text-orange-800 uppercase tracking-widest">Agent Request Sent</p>
                    <p className="text-[9px] font-medium text-orange-600">A human agent will be with you shortly.</p>
                  </div>
                </div>
              )}

              {/* Input Area */}
              <div className="p-4 bg-white border-t border-neutral-100">
                <div className="flex gap-2 bg-neutral-50 p-2 rounded-2xl border border-neutral-200 focus-within:border-black transition-all shadow-inner">
                  <input 
                    type="text" 
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                    placeholder={isAgentMode ? "Message the human agent..." : "Ask your knowledge base..."}
                    className="flex-1 bg-transparent border-none focus:ring-0 text-black text-sm px-3 placeholder:text-neutral-400 font-medium"
                  />
                  <button 
                    onClick={() => handleSend()}
                    disabled={!input.trim()}
                    className="bg-black p-2.5 rounded-xl text-white hover:bg-neutral-800 transition-all shadow-md active:scale-95 disabled:opacity-20 flex-shrink-0"
                  >
                    <Send className="w-4 h-4" />
                  </button>
                </div>
                <div className="mt-3 flex items-center justify-between px-2">
                   <p className="text-[8px] text-neutral-400 font-bold uppercase tracking-widest flex items-center gap-1">
                    <span className="w-1.5 h-1.5 bg-green-500 rounded-full" />
                    Verified Output
                  </p>
                   <p className="text-[8px] text-neutral-400 font-bold uppercase tracking-widest">
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
          "w-16 h-16 rounded-full flex items-center justify-center shadow-2xl transition-all duration-300 border border-neutral-200 group overflow-hidden relative",
          isOpen ? "bg-white text-black" : "bg-black text-white"
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
  const styles = {
    high: { icon: CheckCircle2, text: 'Verified Output', color: 'text-green-600', bg: 'bg-green-50' },
    medium: { icon: AlertCircle, text: 'Probable Match', color: 'text-orange-600', bg: 'bg-orange-50' },
    low: { icon: AlertCircle, text: 'Low Confidence', color: 'text-red-600', bg: 'bg-red-50' }
  };

  const { icon: Icon, text, color, bg } = styles[type];

  return (
    <div className={cn("inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full border border-current", bg, color)}>
      <Icon className="w-2.5 h-2.5" />
      <span className="text-[9px] font-bold uppercase tracking-widest">{text}</span>
    </div>
  );
}
