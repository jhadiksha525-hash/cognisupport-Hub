import React, { useState } from 'react';
import { 
  MessageSquare, 
  Search, 
  Filter, 
  User, 
  Bot, 
  Send, 
  MoreVertical,
  CheckCircle2,
  Clock,
  ExternalLink,
  FileText
} from 'lucide-react';
import { cn } from '../../lib/utils';
import { motion } from 'motion/react';

interface Chat {
  id: string;
  visitor: string;
  lastMessage: string;
  time: string;
  status: 'open' | 'closed' | 'pending_agent';
  unreadCount: number;
}

const mockChats: Chat[] = [
  { id: '1', visitor: 'Visitor #4829', lastMessage: 'How do I upgrade my subscription?', time: '2m ago', status: 'open', unreadCount: 2 },
  { id: '2', visitor: 'John Doe', lastMessage: 'Thank you for the help!', time: '1h ago', status: 'closed', unreadCount: 0 },
  { id: '3', visitor: 'Anna Smith', lastMessage: 'AI handoff requested: refund issue', time: '5m ago', status: 'pending_agent', unreadCount: 1 },
  { id: '4', visitor: 'Visitor #1203', lastMessage: 'Is there a free trial?', time: '3h ago', status: 'closed', unreadCount: 0 },
];

export default function Conversations() {
  const [selectedChat, setSelectedChat] = useState<Chat | null>(mockChats[0]);
  const [message, setMessage] = useState('');

  return (
    <div className="h-[calc(100vh-180px)] flex gap-6">
      {/* List */}
      <div className="w-80 flex flex-col glass-card border-neutral-200 bg-white overflow-hidden shadow-sm">
        <div className="p-4 border-b border-neutral-200 space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
            <input 
              type="text" 
              placeholder="Search chats..."
              className="w-full bg-neutral-50 border border-neutral-200 rounded-lg pl-9 pr-3 py-2 text-xs text-black placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-black transition-all"
            />
          </div>
          <div className="flex gap-2">
            <button className="flex-1 text-[10px] font-bold uppercase tracking-wider py-1.5 rounded bg-black text-white border border-black shadow-sm">All</button>
            <button className="flex-1 text-[10px] font-bold uppercase tracking-wider py-1.5 rounded bg-neutral-50 text-neutral-500 border border-neutral-200 hover:text-black">Open</button>
            <button className="flex-1 text-[10px] font-bold uppercase tracking-wider py-1.5 rounded bg-neutral-50 text-neutral-500 border border-neutral-200 hover:text-black">Agent</button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto">
          {mockChats.map((chat) => (
            <button 
              key={chat.id}
              onClick={() => setSelectedChat(chat)}
              className={cn(
                "w-full p-4 flex items-start gap-3 border-b border-neutral-100 text-left transition-all",
                selectedChat?.id === chat.id 
                  ? "bg-neutral-50 border-l-4 border-l-black" 
                  : "hover:bg-neutral-50/50"
              )}
            >
              <div className="w-10 h-10 rounded-full bg-neutral-50 flex items-center justify-center border border-neutral-200 flex-shrink-0 shadow-sm">
                <User className="w-5 h-5 text-neutral-400" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-start mb-1">
                  <h4 className="text-sm font-bold text-black truncate">{chat.visitor}</h4>
                  <span className="text-[10px] text-neutral-400 font-bold whitespace-nowrap ml-2">{chat.time}</span>
                </div>
                <p className="text-xs text-neutral-500 font-medium truncate leading-relaxed">{chat.lastMessage}</p>
                <div className="mt-2 flex items-center gap-2">
                   <StatusBadge status={chat.status} />
                   {chat.unreadCount > 0 && (
                     <span className="bg-black text-white text-[10px] font-bold px-1.5 rounded-full">
                       {chat.unreadCount}
                     </span>
                   )}
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex-1 flex flex-col glass-card border-neutral-200 bg-white shadow-sm overflow-hidden">
        {selectedChat ? (
          <>
            <div className="p-4 border-b border-neutral-200 flex justify-between items-center bg-neutral-50/50">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center border border-neutral-200 shadow-sm">
                   <User className="w-5 h-5 text-black" />
                </div>
                <div>
                   <div className="flex items-center gap-2">
                     <h3 className="font-bold text-black tracking-tight">{selectedChat.visitor}</h3>
                     <StatusBadge status={selectedChat.status} />
                   </div>
                   <p className="text-[10px] text-neutral-400 font-bold tracking-wide uppercase">Browser • Chrome on MacOS</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button className="btn-secondary px-3 py-1.5 text-xs flex items-center gap-2 bg-neutral-100 border-neutral-200 text-neutral-600 hover:text-black shadow-sm">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Close Chat
                </button>
                <button className="p-2 hover:bg-neutral-100 rounded-lg text-neutral-400 transition-colors">
                  <MoreVertical className="w-5 h-5" />
                </button>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-neutral-50/30">
               <div className="flex justify-center">
                 <span className="bg-white text-neutral-400 text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest border border-neutral-200 shadow-sm">Today, October 14</span>
               </div>
               
               <Message 
                 sender="visitor" 
                 text="Hello, I have some questions about the pricing plans." 
                 time="2:05 PM" 
               />
               
               <Message 
                 sender="ai" 
                 text="Hello! I can help you with that. Based on our pricing documentation, we offer three main plans: Starter ($29/mo), Pro ($79/mo), and Enterprise (Custom). Would you like me to highlight the differences?" 
                 time="2:05 PM" 
                 citations={['Pricing_2026.pdf']}
               />

               <Message 
                 sender="visitor" 
                 text="How do I upgrade my subscription?" 
                 time="2:07 PM" 
               />

               <div className="flex justify-center flex-col items-center gap-2">
                 <div className="h-px w-full bg-neutral-200 max-w-sm" />
                 <p className="text-[10px] text-neutral-400 font-bold uppercase tracking-widest">AI handoff requested</p>
               </div>
            </div>

            <div className="p-4 border-t border-neutral-200">
              <div className="bg-neutral-50 rounded-xl border border-neutral-200 focus-within:border-black p-2 transition-all">
                <textarea 
                  rows={3}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Type a message as Human Agent..."
                  className="w-full bg-transparent border-none focus:ring-0 text-sm text-black p-2 resize-none placeholder:text-neutral-400"
                />
                <div className="flex justify-between items-center px-2 pb-1">
                  <div className="flex gap-2">
                     <button className="p-1.5 hover:bg-neutral-200 rounded text-neutral-400 transition-colors">
                       <Bot className="w-4 h-4" />
                     </button>
                     <button className="p-1.5 hover:bg-neutral-200 rounded text-neutral-400 transition-colors">
                       <ExternalLink className="w-4 h-4" />
                     </button>
                  </div>
                  <button className="btn-primary py-1.5 px-4 flex items-center gap-2 text-xs font-bold shadow-sm">
                    Send Response <Send className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          </>
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center p-8 text-center bg-neutral-50/20">
            <div className="w-20 h-20 rounded-3xl bg-neutral-50 flex items-center justify-center border border-neutral-200 mb-6 shadow-sm">
               <MessageSquare className="w-10 h-10 text-neutral-300" />
            </div>
            <h3 className="text-xl font-bold text-black mb-2 tracking-tight">No conversation selected</h3>
            <p className="text-neutral-500 text-sm font-medium max-w-sm">Select a chat from the left sidebar to view message history and respond.</p>
          </div>
        )}
      </div>
    </div>
  );
}

function StatusBadge({ status }: { status: Chat['status'] }) {
  const configs = {
    open: { color: 'bg-black text-white', label: 'Active', icon: Clock },
    closed: { color: 'bg-neutral-100 text-neutral-500 border border-neutral-200', label: 'Resolved', icon: CheckCircle2 },
    pending_agent: { color: 'bg-red-50 text-red-600 border border-red-100', label: 'Handoff', icon: User },
  };

  const config = configs[status];
  const Icon = config.icon;

  return (
    <span className={cn("inline-flex items-center gap-1 px-2 py-0.5 rounded text-[9px] font-bold uppercase tracking-wider", config.color)}>
      <Icon className="w-2.5 h-2.5" /> {config.label}
    </span>
  );
}

function Message({ sender, text, time, citations }: { sender: 'visitor' | 'ai' | 'agent', text: string, time: string, citations?: string[] }) {
  return (
    <div className={cn(
      "flex gap-4 max-w-2xl",
      sender === 'visitor' ? "ml-auto flex-row-reverse" : ""
    )}>
      <div className={cn(
        "w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 border shadow-sm",
        sender === 'visitor' ? "bg-black border-black text-white" : "bg-white border-neutral-200 text-black"
      )}>
        {sender === 'visitor' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
      </div>
      <div className={cn(
        "space-y-1",
        sender === 'visitor' ? "text-right" : ""
      )}>
        <div className={cn(
          "p-4 rounded-2xl text-sm leading-relaxed shadow-sm font-medium",
          sender === 'visitor' 
            ? "bg-black text-white rounded-tr-sm" 
            : "bg-white text-black rounded-tl-sm border border-neutral-200"
        )}>
          {text}
          {citations && citations.length > 0 && (
            <div className="mt-4 pt-3 border-t border-neutral-100 flex flex-wrap gap-2">
               {citations.map(c => (
                 <span key={c} className="bg-neutral-50 text-[10px] text-neutral-500 px-2 py-0.5 rounded flex items-center gap-1 border border-neutral-200 font-bold uppercase transition-colors hover:border-black">
                    <FileText className="w-3 h-3" /> {c}
                 </span>
               ))}
            </div>
          )}
        </div>
        <span className="text-[10px] text-neutral-400 font-bold uppercase tracking-widest">{time}</span>
      </div>
    </div>
  );
}
