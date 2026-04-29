import React, { useState } from 'react';
import { 
  Palette, 
  MessageSquare, 
  Layout, 
  Code, 
  Check, 
  Copy,
  Sparkles,
  Bot,
  Settings2,
  X,
  User,
  Send
} from 'lucide-react';
import { cn } from '../../lib/utils';
import { motion } from 'motion/react';

export default function WidgetConfig() {
  const [themeColor, setThemeColor] = useState('#000000');
  const [welcomeMsg, setWelcomeMsg] = useState('Hello! I am your AI Support Assistant powered by verified documents.');
  const [position, setPosition] = useState<'right' | 'left'>('right');
  const [showSuggestions, setShowSuggestions] = useState(true);
  const [humanHandoff, setHumanHandoff] = useState(true);
  const [copied, setCopied] = useState(false);

  const colors = [
    { name: 'Black', value: '#000000' },
    { name: 'Blue', value: '#2563EB' },
    { name: 'Teal', value: '#14B8A6' },
    { name: 'Indigo', value: '#6366F1' },
    { name: 'Amber', value: '#F59E0B' },
    { name: 'Rose', value: '#F43F5E' },
  ];

  const embedCode = `<script src="https://cdn.citesupport.com/widget.js" async></script>
<script>
  window.CiteSupport = {
    orgId: "org_29k184j01",
    theme: "${themeColor}",
    welcomeMessage: "${welcomeMsg}",
    position: "${position}",
    suggestions: ${showSuggestions},
    handoff: ${humanHandoff}
  };
</script>`;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(embedCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
      <div className="space-y-8">
        <section className="glass-card p-8 border-white/10 bg-white/5 shadow-2xl backdrop-blur-xl rounded-3xl">
          <div className="flex items-center gap-3 mb-6">
            <Palette className="w-5 h-5 text-primary" />
            <h3 className="font-bold text-lg text-white tracking-tight">Appearance</h3>
          </div>
          
          <div className="space-y-6">
            <div>
              <label className="text-xs font-bold uppercase tracking-widest text-white/40 block mb-4">Theme Color</label>
              <div className="flex flex-wrap gap-4">
                {colors.map((c) => (
                  <button
                    key={c.value}
                    onClick={() => setThemeColor(c.value)}
                    className={cn(
                      "w-12 h-12 rounded-2xl transition-all border-2",
                      themeColor === c.value ? "border-primary scale-110 shadow-2xl" : "border-transparent opacity-60 hover:opacity-100"
                    )}
                    style={{ backgroundColor: c.value }}
                    title={c.name}
                  />
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest text-white/40 block">Custom Hex</label>
              <input 
                type="text" 
                value={themeColor}
                onChange={(e) => setThemeColor(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white font-medium focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
              />
            </div>
          </div>
        </section>

        <section className="glass-card p-8 border-white/10 bg-white/5 shadow-2xl backdrop-blur-xl rounded-3xl">
          <div className="flex items-center gap-3 mb-6">
            <MessageSquare className="w-5 h-5 text-accent" />
            <h3 className="font-bold text-lg text-white tracking-tight">Messages</h3>
          </div>
          
          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest text-white/40 block">Welcome Message</label>
              <textarea 
                rows={3}
                value={welcomeMsg}
                onChange={(e) => setWelcomeMsg(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white font-medium focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all resize-none"
              />
            </div>
            <div className="flex items-center gap-3 p-5 bg-white/5 border border-white/10 rounded-2xl">
               <Sparkles className="w-5 h-5 text-[#F59E0B]" />
               <p className="text-xs text-white/40 leading-relaxed font-bold transition-all">
                 AI will automatically acknowledge the user and ask for verification if needed.
               </p>
            </div>
          </div>
        </section>

        <section className="glass-card p-8 border-white/10 bg-white/5 shadow-2xl backdrop-blur-xl rounded-3xl">
          <div className="flex items-center gap-3 mb-6">
            <Layout className="w-5 h-5 text-indigo-400" />
            <h3 className="font-bold text-lg text-white tracking-tight">Configuration</h3>
          </div>
          
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-bold text-white">Widget Position</p>
                <p className="text-[10px] text-white/40 font-bold uppercase tracking-widest">Where it appears on your site</p>
              </div>
              <div className="flex bg-white/5 p-1 rounded-xl border border-white/5">
                <button 
                  onClick={() => setPosition('left')}
                  className={cn("px-4 py-1.5 text-xs font-bold rounded-lg transition-all", position === 'left' ? "bg-primary text-white shadow-xl shadow-primary/20" : "text-white/40 hover:text-white")}
                >
                  Left
                </button>
                <button 
                  onClick={() => setPosition('right')}
                  className={cn("px-4 py-1.5 text-xs font-bold rounded-lg transition-all", position === 'right' ? "bg-primary text-white shadow-xl shadow-primary/20" : "text-white/40 hover:text-white")}
                >
                  Right
                </button>
              </div>
            </div>

            <Toggle label="Suggested Chips" desc="Show common question buttons" active={showSuggestions} onChange={setShowSuggestions} />
            <Toggle label="Human Handoff" desc="Allow escalation to agent" active={humanHandoff} onChange={setHumanHandoff} />
          </div>
        </section>

        <section className="glass-card p-8 border-white/10 bg-white/5 shadow-2xl backdrop-blur-xl rounded-3xl">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <Code className="w-5 h-5 text-primary" />
              <h3 className="font-bold text-lg text-white tracking-tight">Embed Script</h3>
            </div>
            <button 
              onClick={copyToClipboard}
              className="bg-white/5 border border-white/10 hover:bg-white/10 text-white/60 hover:text-white py-2 px-4 rounded-xl text-xs flex items-center gap-2 font-bold transition-all"
            >
              {copied ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4" />}
              {copied ? 'Copied' : 'Copy Code'}
            </button>
          </div>
          
          <div className="relative group">
            <pre className="bg-slate-900 p-8 rounded-2xl border border-slate-800 text-[11px] font-mono text-slate-300 overflow-x-auto selection:bg-primary/30">
              <code>{embedCode}</code>
            </pre>
            <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-all">
               <span className="text-[10px] bg-primary text-white px-3 py-1.5 rounded-lg font-bold uppercase tracking-widest shadow-xl shadow-primary/20">Production Script</span>
            </div>
          </div>
        </section>
      </div>

      <div className="space-y-6 lg:sticky lg:top-8 self-start">
        <h3 className="text-xs font-bold uppercase tracking-widest text-white/40 text-center">Live Preview</h3>
        <div className="glass-card border-white/10 h-[650px] flex flex-col overflow-hidden shadow-2xl relative bg-[#0B1020]/90 backdrop-blur-2xl rounded-[2.5rem]">
           {/* Preview Header */}
           <div className="p-6 flex items-center justify-between transition-colors duration-500" style={{ backgroundColor: themeColor }}>
              <div className="flex items-center gap-3">
                <div className="bg-white/20 p-2.5 rounded-xl backdrop-blur-md">
                   <Bot className="w-5 h-5 text-white" />
                </div>
                <div>
                   <h4 className="text-white font-bold text-sm tracking-tight">Support Assistant</h4>
                   <p className="text-white/60 text-[10px] font-bold uppercase tracking-widest">Always Verified</p>
                </div>
              </div>
              <X className="w-5 h-5 text-white/60" />
           </div>

           {/* Preview Body */}
           <div className="flex-1 p-6 space-y-6 overflow-y-auto no-scrollbar">
              <div className="flex gap-3">
                 <div className="w-9 h-9 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white/40 shadow-xl">
                    <Bot className="w-5 h-5" />
                 </div>
                 <div className="bg-white/5 border border-white/10 text-white/90 shadow-2xl p-5 rounded-[1.5rem] rounded-tl-none text-xs leading-relaxed max-w-[85%] font-medium backdrop-blur-md">
                    {welcomeMsg}
                 </div>
              </div>

              <div className="flex gap-3 flex-row-reverse">
                 <div className="w-9 h-9 rounded-xl flex items-center justify-center text-white shadow-xl transition-colors duration-500" style={{ backgroundColor: themeColor }}>
                    <User className="w-5 h-5" />
                 </div>
                 <div className="text-white p-4 rounded-[1.5rem] rounded-tr-none text-xs leading-relaxed max-w-[80%] shadow-2xl font-medium transition-colors duration-500" style={{ backgroundColor: themeColor }}>
                    What is the refund policy?
                 </div>
              </div>

              <div className="flex gap-3">
                 <div className="w-9 h-9 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white/40 shadow-xl">
                    <Bot className="w-5 h-5" />
                 </div>
                 <div className="bg-white/5 border border-white/10 text-white/90 shadow-2xl p-5 rounded-[1.5rem] rounded-tl-none text-xs leading-relaxed max-w-[85%] font-medium space-y-3 backdrop-blur-md">
                    <p>According to our documentation, seasonal items can be returned within 14 days of purchase.</p>
                    <div className="pt-3 border-t border-white/5 flex items-center justify-between">
                       <div className="inline-flex items-center gap-2 rounded-full border border-emerald-400/20 bg-emerald-400/10 px-2 py-0.5 text-[8px] font-semibold text-emerald-200">
                          <Check className="w-3 h-3" />
                          <span className="uppercase tracking-widest">Verified Output</span>
                       </div>
                    </div>
                 </div>
              </div>
           </div>

           {/* Preview Suggestions */}
           {showSuggestions && (
              <div className="px-6 py-3 flex flex-wrap gap-2">
                 {['Returns?', 'Shipping?', 'Pricing?'].map(q => (
                    <div key={q} className="px-3 py-1.5 rounded-full border border-white/10 bg-white/5 text-[9px] font-bold text-white/40">
                       {q}
                    </div>
                 ))}
              </div>
           )}

           {/* Preview Footer */}
           <div className="p-5 border-t border-white/5 bg-[#070A12]/50">
              <div className="h-12 bg-white/5 rounded-[1rem] border border-white/10 px-5 flex items-center justify-between text-white/20 text-xs font-medium">
                Write a message...
                <Send className="w-4 h-4" />
              </div>
           </div>

           <div className={cn(
             "absolute -bottom-5 flex justify-center",
             position === 'right' ? "right-10" : "left-10"
           )}>
             <div className="w-14 h-14 rounded-full shadow-[0_12px_40px_rgba(0,0,0,0.5)] flex items-center justify-center transition-all hover:scale-110 cursor-pointer shadow-primary/20" style={{ backgroundColor: themeColor }}>
               <MessageSquare className="w-7 h-7 text-white" />
             </div>
           </div>
        </div>
      </div>
    </div>
  );
}

function Toggle({ label, desc, active, onChange }: { label: string, desc: string, active: boolean, onChange: (v: boolean) => void }) {
  return (
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm font-bold text-white">{label}</p>
        <p className="text-[10px] text-white/40 font-bold uppercase tracking-widest">{desc}</p>
      </div>
      <button 
        onClick={() => onChange(!active)}
        className={cn(
          "w-12 h-7 rounded-full transition-all relative overflow-hidden",
          active ? "bg-primary" : "bg-white/10"
        )}
      >
        <div className={cn(
          "absolute top-1 w-5 h-5 bg-white rounded-full transition-all shadow-xl",
          active ? "right-1" : "left-1"
        )} />
      </button>
    </div>
  );
}
