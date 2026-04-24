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
  const [themeColor, setThemeColor] = useState('#2563EB');
  const [welcomeMsg, setWelcomeMsg] = useState('Hello! How can I help you today?');
  const [copied, setCopied] = useState(false);

  const colors = [
    { name: 'Blue', value: '#2563EB' },
    { name: 'Teal', value: '#14B8A6' },
    { name: 'Indigo', value: '#6366F1' },
    { name: 'Amber', value: '#F59E0B' },
    { name: 'Rose', value: '#F43F5E' },
    { name: 'State', value: '#64748B' },
  ];

  const embedCode = `<script src="https://cdn.cognisupport.com/widget.js" async></script>
<script>
  window.CogniSupport = {
    orgId: "org_29k184j01",
    theme: "${themeColor}",
    welcomeMessage: "${welcomeMsg}"
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
        <div className="glass-card border-border h-[600px] flex flex-col overflow-hidden shadow-2xl relative bg-surface rounded-3xl">
           {/* Preview Header */}
           <div className="p-4 flex items-center justify-between transition-colors duration-500" style={{ backgroundColor: themeColor }}>
              <div className="flex items-center gap-3">
                <div className="bg-white/20 p-2 rounded-lg backdrop-blur-sm">
                  <Bot className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h4 className="text-white font-bold text-sm">AI Support</h4>
                  <p className="text-white/60 text-[10px] font-bold uppercase tracking-wider">Online</p>
                </div>
              </div>
           </div>

           {/* Preview Body */}
           <div className="flex-1 p-6 space-y-4 bg-bg/50">
              <div className="flex gap-3">
                 <div className="w-8 h-8 rounded-lg bg-surface flex items-center justify-center border border-border text-text-main shadow-sm">
                    <Bot className="w-4 h-4" />
                 </div>
                 <div className="bg-surface border border-border text-text-main shadow-sm p-3 rounded-2xl rounded-tl-none text-xs leading-relaxed max-w-[80%] font-medium">
                    {welcomeMsg}
                 </div>
              </div>
              <div className="flex gap-3 flex-row-reverse">
                 <div className="w-8 h-8 rounded-lg flex items-center justify-center text-white shadow-sm transition-colors duration-500" style={{ backgroundColor: themeColor }}>
                    <div className="text-[10px] font-bold">ME</div>
                 </div>
                 <div className="text-white p-3 rounded-2xl rounded-tr-none text-xs leading-relaxed max-w-[80%] shadow-sm font-medium transition-colors duration-500" style={{ backgroundColor: themeColor }}>
                    How do I get started?
                 </div>
              </div>
           </div>

           {/* Preview Footer */}
           <div className="p-4 bg-surface border-t border-border">
              <div className="h-10 bg-bg rounded-xl border border-border px-4 flex items-center text-text-muted text-xs font-medium">
                Write a message...
              </div>
           </div>

           <div className="absolute inset-x-0 -bottom-10 flex justify-center">
             <div className="w-12 h-12 rounded-full shadow-lg flex items-center justify-center transition-all hover:scale-110 cursor-pointer shadow-primary/20" style={{ backgroundColor: themeColor }}>
               <MessageSquare className="w-6 h-6 text-white" />
             </div>
           </div>
        </div>
      </div>
    </div>
  );
}
