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
  Settings2
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
        <section className="glass-card p-6 border-border bg-surface shadow-sm">
          <div className="flex items-center gap-3 mb-6">
            <Palette className="w-5 h-5 text-primary" />
            <h3 className="font-bold text-lg text-text-main tracking-tight">Appearance</h3>
          </div>
          
          <div className="space-y-6">
            <div>
              <label className="text-xs font-bold uppercase tracking-widest text-text-muted block mb-3">Theme Color</label>
              <div className="flex flex-wrap gap-3">
                {colors.map((c) => (
                  <button
                    key={c.value}
                    onClick={() => setThemeColor(c.value)}
                    className={cn(
                      "w-10 h-10 rounded-xl transition-all border-2",
                      themeColor === c.value ? "border-primary scale-110 shadow-lg shadow-primary/20" : "border-transparent opacity-60 hover:opacity-100"
                    )}
                    style={{ backgroundColor: c.value }}
                    title={c.name}
                  />
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest text-text-muted block">Custom Hex</label>
              <input 
                type="text" 
                value={themeColor}
                onChange={(e) => setThemeColor(e.target.value)}
                className="w-full bg-bg border border-border rounded-lg px-4 py-2 text-sm text-text-main font-medium focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
              />
            </div>
          </div>
        </section>

        <section className="glass-card p-6 border-border bg-surface shadow-sm">
          <div className="flex items-center gap-3 mb-6">
            <MessageSquare className="w-5 h-5 text-accent" />
            <h3 className="font-bold text-lg text-text-main tracking-tight">Messages</h3>
          </div>
          
          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest text-text-muted block">Welcome Message</label>
              <textarea 
                rows={3}
                value={welcomeMsg}
                onChange={(e) => setWelcomeMsg(e.target.value)}
                className="w-full bg-bg border border-border rounded-lg px-4 py-2 text-sm text-text-main font-medium focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all resize-none"
              />
            </div>
            <div className="flex items-center gap-3 p-4 bg-bg border border-border rounded-xl">
               <Sparkles className="w-5 h-5 text-warning" />
               <p className="text-xs text-text-muted leading-relaxed font-bold transition-all">
                 AI will automatically acknowledge the user and ask for verification if needed.
               </p>
            </div>
          </div>
        </section>

        <section className="glass-card p-6 border-border bg-surface shadow-sm">
          <div className="flex items-center gap-3 mb-6">
            <Layout className="w-5 h-5 text-accent" />
            <h3 className="font-bold text-lg text-text-main tracking-tight">Configuration</h3>
          </div>
          
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-bold text-text-main">Widget Position</p>
                <p className="text-[10px] text-text-muted font-bold uppercase tracking-widest">Where it appears on your site</p>
              </div>
              <div className="flex bg-bg p-1 rounded-xl border border-border">
                <button 
                  onClick={() => setPosition('left')}
                  className={cn("px-3 py-1.5 text-xs font-bold rounded-lg transition-all", position === 'left' ? "bg-white shadow-sm text-primary" : "text-text-muted")}
                >
                  Left
                </button>
                <button 
                  onClick={() => setPosition('right')}
                  className={cn("px-3 py-1.5 text-xs font-bold rounded-lg transition-all", position === 'right' ? "bg-white shadow-sm text-primary" : "text-text-muted")}
                >
                  Right
                </button>
              </div>
            </div>

            <Toggle label="Suggested Chips" desc="Show common question buttons" active={showSuggestions} onChange={setShowSuggestions} />
            <Toggle label="Human Handoff" desc="Allow escalation to agent" active={humanHandoff} onChange={setHumanHandoff} />
          </div>
        </section>

        <section className="glass-card p-6 border-border bg-surface shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <Code className="w-5 h-5 text-primary" />
              <h3 className="font-bold text-lg text-text-main tracking-tight">Embed Script</h3>
            </div>
            <button 
              onClick={copyToClipboard}
              className="btn-secondary py-1.5 px-3 text-xs flex items-center gap-2 font-bold hover:text-primary transition-all"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-success" /> : <Copy className="w-3.5 h-3.5" />}
              {copied ? 'Copied' : 'Copy Code'}
            </button>
          </div>
          
          <div className="relative group">
            <pre className="bg-slate-900 p-6 rounded-xl border border-slate-800 text-[11px] font-mono text-slate-300 overflow-x-auto selection:bg-primary/30">
              <code>{embedCode}</code>
            </pre>
            <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
               <span className="text-[10px] bg-primary text-white px-2 py-1 rounded font-bold uppercase tracking-widest shadow-lg shadow-primary/20">Production Script</span>
            </div>
          </div>
        </section>
      </div>

      <div className="space-y-6 lg:sticky lg:top-8 self-start">
        <h3 className="text-xs font-bold uppercase tracking-widest text-text-muted text-center">Live Preview</h3>
        <div className="glass-card border-border h-[650px] flex flex-col overflow-hidden shadow-2xl relative bg-white rounded-3xl">
           {/* Preview Header */}
           <div className="p-5 flex items-center justify-between transition-colors duration-500" style={{ backgroundColor: themeColor }}>
              <div className="flex items-center gap-3">
                <div className="bg-white/20 p-2 rounded-xl backdrop-blur-sm">
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
           <div className="flex-1 p-6 space-y-6 bg-neutral-50/50 overflow-y-auto">
              <div className="flex gap-3">
                 <div className="w-8 h-8 rounded-lg bg-white flex items-center justify-center border border-neutral-200 text-black shadow-sm">
                    <Bot className="w-4 h-4" />
                 </div>
                 <div className="bg-white border border-neutral-200 text-text-main shadow-sm p-4 rounded-2xl rounded-tl-none text-xs leading-relaxed max-w-[85%] font-medium">
                    {welcomeMsg}
                 </div>
              </div>

              <div className="flex gap-3 flex-row-reverse">
                 <div className="w-8 h-8 rounded-lg flex items-center justify-center text-white shadow-sm transition-colors duration-500" style={{ backgroundColor: themeColor }}>
                    <User className="w-4 h-4" />
                 </div>
                 <div className="text-white p-3 rounded-2xl rounded-tr-none text-xs leading-relaxed max-w-[80%] shadow-lg font-medium transition-colors duration-500" style={{ backgroundColor: themeColor }}>
                    What is the refund policy?
                 </div>
              </div>

              <div className="flex gap-3">
                 <div className="w-8 h-8 rounded-lg bg-white flex items-center justify-center border border-neutral-200 text-black shadow-sm">
                    <Bot className="w-4 h-4" />
                 </div>
                 <div className="bg-white border border-neutral-200 text-text-main shadow-sm p-4 rounded-2xl rounded-tl-none text-xs leading-relaxed max-w-[85%] font-medium space-y-3">
                    <p>According to our documentation, seasonal items can be returned within 14 days of purchase.</p>
                    <div className="pt-2 border-t border-neutral-50 flex items-center justify-between">
                       <div className="flex items-center gap-1 text-green-600">
                          <Check className="w-3 h-3" />
                          <span className="text-[10px] font-bold uppercase tracking-widest">Verified Output</span>
                       </div>
                    </div>
                 </div>
              </div>
           </div>

           {/* Preview Suggestions */}
           {showSuggestions && (
              <div className="px-6 py-2 flex flex-wrap gap-2 bg-white">
                 {['Returns?', 'Shipping?', 'Pricing?'].map(q => (
                    <div key={q} className="px-3 py-1.5 rounded-full border border-neutral-200 text-[9px] font-bold text-neutral-500">
                       {q}
                    </div>
                 ))}
              </div>
           )}

           {/* Preview Footer */}
           <div className="p-4 bg-white border-t border-neutral-100">
              <div className="h-10 bg-neutral-50 rounded-xl border border-neutral-200 px-4 flex items-center justify-between text-neutral-400 text-xs font-medium">
                Write a message...
                <Send className="w-4 h-4" />
              </div>
           </div>

           <div className={cn(
             "absolute -bottom-4 flex justify-center",
             position === 'right' ? "right-8" : "left-8"
           )}>
             <div className="w-14 h-14 rounded-full shadow-2xl flex items-center justify-center transition-all hover:scale-110 cursor-pointer shadow-primary/20" style={{ backgroundColor: themeColor }}>
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
        <p className="text-sm font-bold text-text-main">{label}</p>
        <p className="text-[10px] text-text-muted font-bold uppercase tracking-widest">{desc}</p>
      </div>
      <button 
        onClick={() => onChange(!active)}
        className={cn(
          "w-10 h-6 rounded-full transition-all relative",
          active ? "bg-primary" : "bg-neutral-200"
        )}
      >
        <div className={cn(
          "absolute top-1 w-4 h-4 bg-white rounded-full transition-all",
          active ? "right-1" : "left-1"
        )} />
      </button>
    </div>
  );
}
