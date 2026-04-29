import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  MessageSquare, User, Clock, AlertCircle, 
  Send, Bot, MoreVertical, Search, Filter, 
  ChevronRight, CheckCircle2, UserPlus, Plus
} from 'lucide-react';
import { cn } from '../../lib/utils';

interface Conversation {
  id: string;
  visitorName: string;
  lastMessage: string;
  time: string;
  status: 'open' | 'pending' | 'closed';
  urgency: 'high' | 'medium' | 'low';
  unreadCount: number;
}

const mockConversations: Conversation[] = [
  { id: '1', visitorName: 'Visitor #2901', lastMessage: 'Not sure - Talk to human?', time: '2m ago', status: 'open', urgency: 'high', unreadCount: 1 },
  { id: '2', visitorName: 'John Smith', lastMessage: 'How do I cancel my subscription?', time: '15m ago', status: 'pending', urgency: 'medium', unreadCount: 0 },
  { id: '3', visitorName: 'Visitor #4412', lastMessage: 'Thank you for the help!', time: '1h ago', status: 'closed', urgency: 'low', unreadCount: 0 },
];

export default function Inbox() {
  const [selectedId, setSelectedId] = useState<string | null>(mockConversations[0].id);
  const [replyText, setReplyText] = useState('');

  const selectedConv = mockConversations.find(c => c.id === selectedId);

  return (
    <div className="h-[calc(100vh-140px)] flex gap-6">
      {/* Conversation List */}
      <div className="w-[380px] flex flex-col glass-card border-white/10 bg-white/5 overflow-hidden shadow-2xl backdrop-blur-xl rounded-3xl">
        <div className="p-6 border-b border-white/10 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-white tracking-tight">Inbox</h2>
            <div className="flex bg-white/5 p-1 rounded-xl border border-white/5">
              {['All', 'Mentions'].map(t => (
                <button key={t} className={cn("px-4 py-1.5 text-[10px] font-bold rounded-lg transition-all", t === 'All' ? "bg-primary text-white shadow-lg shadow-primary/20" : "text-white/40 hover:text-white")}>
                  {t}
                </button>
              ))}
            </div>
          </div>
          <div className="relative group">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20 group-focus-within:text-primary transition-colors" />
            <input 
              type="text" 
              placeholder="Search chats..."
              className="w-full bg-white/5 border border-white/5 rounded-xl pl-10 pr-4 py-3 text-xs font-medium focus:ring-2 ring-primary/20 outline-none transition-all text-white placeholder:text-white/20"
            />
          </div>
        </div>

        <div className="flex-1 overflow-y-auto no-scrollbar">
          {mockConversations.map((conv) => (
            <button
              key={conv.id}
              onClick={() => setSelectedId(conv.id)}
              className={cn(
                "w-full p-6 flex gap-4 border-b border-white/5 transition-all text-left group relative",
                selectedId === conv.id ? "bg-white/10" : "hover:bg-white/5"
              )}
            >
              {selectedId === conv.id && (
                <div className="absolute left-0 top-0 w-1 h-full bg-primary" />
              )}
              <div className="relative flex-shrink-0">
                <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:scale-105 transition-transform text-white/40 shadow-xl overflow-hidden">
                  <User className="w-7 h-7" />
                </div>
                {conv.unreadCount > 0 && (
                  <div className="absolute -top-1 -right-1 w-6 h-6 bg-primary text-white text-[10px] font-bold rounded-full flex items-center justify-center border-2 border-[#0B1020] shadow-lg">
                    {conv.unreadCount}
                  </div>
                )}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-start mb-1">
                  <h4 className="text-sm font-bold text-white truncate">{conv.visitorName}</h4>
                  <span className="text-[10px] font-bold text-white/20 uppercase tracking-tighter">{conv.time}</span>
                </div>
                <p className="text-xs text-white/40 truncate mb-3 leading-relaxed">{conv.lastMessage}</p>
                <div className="flex gap-2">
                   <UrgencyBadge type={conv.urgency} />
                   <StatusMiniBadge status={conv.status} />
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Chat Space */}
      <div className="flex-1 flex flex-col glass-card border-white/10 bg-white/5 overflow-hidden shadow-2xl backdrop-blur-xl rounded-3xl">
        {selectedConv ? (
          <>
            <div className="p-6 border-b border-white/10 bg-white/5 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-white/40">
                  <User className="w-8 h-8" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white tracking-tight">{selectedConv.visitorName}</h3>
                  <div className="flex items-center gap-2">
                    <span className="flex items-center gap-1.5 text-[10px] font-bold text-green-400 uppercase tracking-widest">
                       <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse shadow-glow shadow-green-500" /> Live Now
                    </span>
                    <span className="text-white/10 px-2">•</span>
                    <span className="text-[10px] font-bold text-white/20 uppercase tracking-widest">ID: {selectedConv.id}</span>
                  </div>
                </div>
              </div>
              <div className="flex gap-2">
                <button className="bg-white/5 hover:bg-white/10 border border-white/10 text-white/60 hover:text-white px-5 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4" /> Close Ticket
                </button>
                <button className="btn-primary py-2.5 px-6 flex items-center gap-2">
                  <UserPlus className="w-4 h-4" /> Take Over
                </button>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto p-8 space-y-8 no-scrollbar">
               <ChatBubble 
                role="ai" 
                text="Hello! I see you want to speak with a human. An agent will be with you shortly." 
                time="10:04 AM" 
                confidence="low"
               />
               <ChatBubble 
                role="visitor" 
                text="Yes, I have an issue with my refund that the bot couldn't solve. It says my item isn't eligible but it was a regular purchase." 
                time="10:05 AM" 
               />
               <div className="flex justify-center py-6">
                  <div className="px-6 py-2 bg-white/5 border border-white/10 rounded-full shadow-2xl backdrop-blur-md">
                    <span className="text-[10px] font-bold text-white/40 uppercase tracking-[0.2em]">AI Mode Paused • Waiting for Agent</span>
                  </div>
               </div>
            </div>

            <div className="p-6 bg-white/5 border-t border-white/10">
              <div className="flex gap-4 items-end max-w-4xl mx-auto">
                 <div className="flex-1 min-h-[120px] bg-white/5 border border-white/10 rounded-3xl p-5 focus-within:border-primary transition-all shadow-2xl backdrop-blur-xl group">
                    <textarea 
                      value={replyText}
                      onChange={(e) => setReplyText(e.target.value)}
                      placeholder="Type your response as an agent..."
                      className="w-full h-20 bg-transparent border-none focus:ring-0 text-sm font-medium resize-none placeholder:text-white/10 text-white"
                    />
                    <div className="flex items-center justify-between mt-3 pt-3 border-t border-white/5">
                       <div className="flex gap-2">
                          <button className="p-1.5 hover:bg-white/10 rounded-lg transition-colors text-white/20 hover:text-white/60">
                            <Plus className="w-4 h-4" />
                          </button>
                       </div>
                       <button 
                        onClick={() => setReplyText('')}
                        disabled={!replyText.trim()}
                        className="btn-primary px-8 py-2.5 flex items-center gap-2 group-focus-within:shadow-primary/30"
                       >
                          <Send className="w-4 h-4" /> Send Response
                       </button>
                    </div>
                 </div>
              </div>
            </div>
          </>
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center p-12 text-center">
            <div className="w-24 h-24 rounded-[2.5rem] bg-white/5 border border-white/10 flex items-center justify-center text-white/20 mb-8 shadow-2xl rotate-3">
              <MessageSquare className="w-12 h-12" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-3 tracking-tight">Select a conversation</h3>
            <p className="text-white/40 max-w-xs font-medium leading-relaxed">Choose a chat from the sidebar to view details and assist your customers.</p>
          </div>
        )}
      </div>
    </div>
  );
}

function ChatBubble({ role, text, time, confidence }: { role: 'ai' | 'visitor' | 'agent', text: string, time: string, confidence?: string }) {
  return (
    <div className={cn(
      "flex gap-4 max-w-[85%]",
      role === 'visitor' ? "ml-auto flex-row-reverse" : "mr-auto"
    )}>
      <div className={cn(
        "w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0 border shadow-2xl",
        role === 'ai' ? "bg-white/5 border-white/10 text-white" : "bg-primary border-primary/20 text-white shadow-primary/10"
      )}>
        {role === 'ai' ? <Bot className="w-6 h-6" /> : <User className="w-6 h-6" />}
      </div>
      <div className="space-y-2">
        <div className={cn(
          "p-6 rounded-[2.5rem] text-sm leading-relaxed shadow-2xl font-medium relative backdrop-blur-xl",
          role === 'ai' 
            ? "bg-white/5 text-white/90 border border-white/10 rounded-tl-sm" 
            : "bg-primary text-white rounded-tr-sm"
        )}>
          {text}
          {confidence && (
            <div className="mt-4 pt-3 border-t border-white/10 flex items-center gap-2.5">
              <AlertCircle className="w-4 h-4 text-primary" />
              <span className="text-[10px] font-bold text-primary uppercase tracking-[0.15em]">Low Confidence Escalation</span>
            </div>
          )}
        </div>
        <p className={cn("text-[10px] font-bold text-white/20 uppercase tracking-widest px-2", role === 'visitor' ? "text-right" : "")}>{time}</p>
      </div>
    </div>
  );
}

function UrgencyBadge({ type }: { type: Conversation['urgency'] }) {
  const styles = {
    high: "bg-red-500/10 text-red-500 border-red-500/20",
    medium: "bg-orange-500/10 text-orange-500 border-orange-500/20",
    low: "bg-blue-500/10 text-blue-500 border-blue-500/20"
  };
  return (
    <span className={cn("px-2.5 py-1 rounded-lg border text-[9px] font-bold uppercase tracking-widest shadow-lg backdrop-blur-sm", styles[type])}>
      {type} Priority
    </span>
  );
}

function StatusMiniBadge({ status }: { status: Conversation['status'] }) {
   const styles = {
    open: "bg-green-500/10 text-green-400 border-green-500/20",
    pending: "bg-yellow-500/10 text-yellow-400 border-yellow-500/20",
    closed: "bg-white/5 text-white/30 border-white/10"
  };
  return (
    <span className={cn("px-2.5 py-1 rounded-lg border text-[9px] font-bold uppercase tracking-widest shadow-lg backdrop-blur-sm", styles[status])}>
      {status}
    </span>
  );
}
