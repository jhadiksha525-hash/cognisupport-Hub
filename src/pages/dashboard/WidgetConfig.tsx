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
  const [themeColor, setThemeColor] = useState('#6366f1');
  const [welcomeMsg, setWelcomeMsg] = useState('Hello! How can I help you today?');
  const [copied, setCopied] = useState(false);

  const colors = [
    { name: 'Indigo', value: '#6366f1' },
    { name: 'Cyan', value: '#06b6d4' },
    { name: 'Emerald', value: '#10b981' },
    { name: 'Rose', value: '#f43f5e' },
    { name: 'Amber', value: '#f59e0b' },
    { name: 'Slate', value: '#475569' },
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
        <section className="glass-card p-6 border-slate-800">
          <div className="flex items-center gap-3 mb-6">
            <Palette className="w-5 h-5 text-brand-400" />
            <h3 className="font-bold text-lg text-white">Appearance</h3>
          </div>
          
          <div className="space-y-6">
            <div>
              <label className="text-xs font-bold uppercase tracking-widest text-slate-500 block mb-3">Theme Color</label>
              <div className="flex flex-wrap gap-3">
                {colors.map((c) => (
                  <button
                    key={c.value}
                    onClick={() => setThemeColor(c.value)}
                    className={cn(
                      "w-10 h-10 rounded-xl transition-all border-2",
                      themeColor === c.value ? "border-white scale-110" : "border-transparent opacity-60 hover:opacity-100"
                    )}
                    style={{ backgroundColor: c.value }}
                    title={c.name}
                  />
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest text-slate-500 block">Custom Hex</label>
              <input 
                type="text" 
                value={themeColor}
                onChange={(e) => setThemeColor(e.target.value)}
                className="w-full bg-slate-900 border border-slate-800 rounded-lg px-4 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-brand-500"
              />
            </div>
          </div>
        </section>

        <section className="glass-card p-6 border-slate-800">
          <div className="flex items-center gap-3 mb-6">
            <MessageSquare className="w-5 h-5 text-cyan-400" />
            <h3 className="font-bold text-lg text-white">Messages</h3>
          </div>
          
          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest text-slate-500 block">Welcome Message</label>
              <textarea 
                rows={3}
                value={welcomeMsg}
                onChange={(e) => setWelcomeMsg(e.target.value)}
                className="w-full bg-slate-900 border border-slate-800 rounded-lg px-4 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-brand-500"
              />
            </div>
            <div className="flex items-center gap-3 p-4 bg-brand-600/5 border border-brand-500/20 rounded-xl">
               <Sparkles className="w-5 h-5 text-brand-400" />
               <p className="text-xs text-slate-400 leading-relaxed font-medium transition-all">
                 AI will automatically acknowledge the user and ask for verification if needed.
               </p>
            </div>
          </div>
        </section>

        <section className="glass-card p-6 border-slate-800">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <Code className="w-5 h-5 text-purple-400" />
              <h3 className="font-bold text-lg text-white">Embed Script</h3>
            </div>
            <button 
              onClick={copyToClipboard}
              className="btn-secondary py-1.5 px-3 text-xs flex items-center gap-2"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-green-400" /> : <Copy className="w-3.5 h-3.5" />}
              {copied ? 'Copied' : 'Copy Code'}
            </button>
          </div>
          
          <div className="relative group">
            <pre className="bg-slate-950 p-6 rounded-xl border border-slate-800 text-[11px] font-mono text-slate-400 overflow-x-auto">
              <code>{embedCode}</code>
            </pre>
            <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
               <span className="text-[10px] bg-slate-800 text-slate-400 px-2 py-1 rounded">Production Script</span>
            </div>
          </div>
        </section>
      </div>

      <div className="space-y-6 lg:sticky lg:top-8 self-start">
        <h3 className="text-sm font-bold uppercase tracking-widest text-slate-500 text-center">Live Preview</h3>
        <div className="glass-card border-slate-800 h-[600px] flex flex-col overflow-hidden shadow-2xl relative bg-slate-900/10">
           {/* Preview Header */}
           <div className="p-4 flex items-center justify-between" style={{ backgroundColor: themeColor }}>
              <div className="flex items-center gap-3">
                <div className="bg-white/20 p-2 rounded-lg">
                  <Bot className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h4 className="text-white font-bold text-sm">AI Support</h4>
                  <p className="text-white/60 text-[10px]">Online</p>
                </div>
              </div>
           </div>

           {/* Preview Body */}
           <div className="flex-1 p-6 space-y-4">
              <div className="flex gap-3">
                 <div className="w-8 h-8 rounded-lg bg-slate-800 flex items-center justify-center border border-slate-700 text-slate-400">
                    <Bot className="w-4 h-4" />
                 </div>
                 <div className="bg-slate-800 text-white p-3 rounded-2xl rounded-tl-none text-xs leading-relaxed max-w-[80%]">
                    {welcomeMsg}
                 </div>
              </div>
              <div className="flex gap-3 flex-row-reverse">
                 <div className="w-8 h-8 rounded-lg bg-slate-800 flex items-center justify-center border border-slate-700 text-slate-400" style={{ backgroundColor: themeColor, borderColor: 'transparent' }}>
                    <div className="text-white text-[10px] font-bold">ME</div>
                 </div>
                 <div className="bg-brand-600 text-white p-3 rounded-2xl rounded-tr-none text-xs leading-relaxed max-w-[80%]" style={{ backgroundColor: themeColor }}>
                    How do I get started?
                 </div>
              </div>
           </div>

           {/* Preview Footer */}
           <div className="p-4 bg-slate-900 border-t border-slate-800">
              <div className="h-10 bg-slate-800 rounded-xl border border-slate-700 px-4 flex items-center text-slate-500 text-xs">
                Write a message...
              </div>
           </div>

           <div className="absolute inset-x-0 -bottom-10 flex justify-center">
             <div className="w-12 h-12 rounded-full shadow-lg flex items-center justify-center" style={{ backgroundColor: themeColor }}>
               <MessageSquare className="w-6 h-6 text-white" />
             </div>
           </div>
        </div>
      </div>
    </div>
  );
}
