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
        <section className="glass-card p-6 border-neutral-200 bg-white shadow-sm">
          <div className="flex items-center gap-3 mb-6">
            <Palette className="w-5 h-5 text-black" />
            <h3 className="font-bold text-lg text-black tracking-tight">Appearance</h3>
          </div>
          
          <div className="space-y-6">
            <div>
              <label className="text-xs font-bold uppercase tracking-widest text-neutral-400 block mb-3">Theme Color</label>
              <div className="flex flex-wrap gap-3">
                {colors.map((c) => (
                  <button
                    key={c.value}
                    onClick={() => setThemeColor(c.value)}
                    className={cn(
                      "w-10 h-10 rounded-xl transition-all border-2",
                      themeColor === c.value ? "border-black scale-110" : "border-neutral-100 opacity-60 hover:opacity-100"
                    )}
                    style={{ backgroundColor: c.value }}
                    title={c.name}
                  />
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest text-neutral-400 block">Custom Hex</label>
              <input 
                type="text" 
                value={themeColor}
                onChange={(e) => setThemeColor(e.target.value)}
                className="w-full bg-neutral-50 border border-neutral-200 rounded-lg px-4 py-2 text-sm text-black font-medium focus:outline-none focus:ring-2 focus:ring-black"
              />
            </div>
          </div>
        </section>

        <section className="glass-card p-6 border-neutral-200 bg-white shadow-sm">
          <div className="flex items-center gap-3 mb-6">
            <MessageSquare className="w-5 h-5 text-black" />
            <h3 className="font-bold text-lg text-black tracking-tight">Messages</h3>
          </div>
          
          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest text-neutral-400 block">Welcome Message</label>
              <textarea 
                rows={3}
                value={welcomeMsg}
                onChange={(e) => setWelcomeMsg(e.target.value)}
                className="w-full bg-neutral-50 border border-neutral-200 rounded-lg px-4 py-2 text-sm text-black font-medium focus:outline-none focus:ring-2 focus:ring-black"
              />
            </div>
            <div className="flex items-center gap-3 p-4 bg-neutral-50 border border-neutral-200 rounded-xl">
               <Sparkles className="w-5 h-5 text-black" />
               <p className="text-xs text-neutral-500 leading-relaxed font-bold transition-all">
                 AI will automatically acknowledge the user and ask for verification if needed.
               </p>
            </div>
          </div>
        </section>

        <section className="glass-card p-6 border-neutral-200 bg-white shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <Code className="w-5 h-5 text-black" />
              <h3 className="font-bold text-lg text-black tracking-tight">Embed Script</h3>
            </div>
            <button 
              onClick={copyToClipboard}
              className="btn-secondary py-1.5 px-3 text-xs flex items-center gap-2 font-bold"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-black" /> : <Copy className="w-3.5 h-3.5" />}
              {copied ? 'Copied' : 'Copy Code'}
            </button>
          </div>
          
          <div className="relative group">
            <pre className="bg-neutral-900 p-6 rounded-xl border border-black text-[11px] font-mono text-neutral-300 overflow-x-auto">
              <code>{embedCode}</code>
            </pre>
            <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
               <span className="text-[10px] bg-black text-white px-2 py-1 rounded font-bold uppercase tracking-widest">Production Script</span>
            </div>
          </div>
        </section>
      </div>

      <div className="space-y-6 lg:sticky lg:top-8 self-start">
        <h3 className="text-xs font-bold uppercase tracking-widest text-neutral-400 text-center">Live Preview</h3>
        <div className="glass-card border-neutral-200 h-[600px] flex flex-col overflow-hidden shadow-2xl relative bg-white rounded-3xl">
           {/* Preview Header */}
           <div className="p-4 flex items-center justify-between" style={{ backgroundColor: themeColor }}>
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
           <div className="flex-1 p-6 space-y-4 bg-neutral-50/30">
              <div className="flex gap-3">
                 <div className="w-8 h-8 rounded-lg bg-white flex items-center justify-center border border-neutral-200 text-black shadow-sm">
                    <Bot className="w-4 h-4" />
                 </div>
                 <div className="bg-white border border-neutral-200 text-black shadow-sm p-3 rounded-2xl rounded-tl-none text-xs leading-relaxed max-w-[80%] font-medium">
                    {welcomeMsg}
                 </div>
              </div>
              <div className="flex gap-3 flex-row-reverse">
                 <div className="w-8 h-8 rounded-lg flex items-center justify-center text-white shadow-sm" style={{ backgroundColor: themeColor }}>
                    <div className="text-[10px] font-bold">ME</div>
                 </div>
                 <div className="text-white p-3 rounded-2xl rounded-tr-none text-xs leading-relaxed max-w-[80%] shadow-sm font-medium" style={{ backgroundColor: themeColor }}>
                    How do I get started?
                 </div>
              </div>
           </div>

           {/* Preview Footer */}
           <div className="p-4 bg-white border-t border-neutral-200">
              <div className="h-10 bg-neutral-50 rounded-xl border border-neutral-200 px-4 flex items-center text-neutral-400 text-xs font-medium">
                Write a message...
              </div>
           </div>

           <div className="absolute inset-x-0 -bottom-10 flex justify-center">
             <div className="w-12 h-12 rounded-full shadow-lg flex items-center justify-center transition-transform hover:scale-110 cursor-pointer" style={{ backgroundColor: themeColor }}>
               <MessageSquare className="w-6 h-6 text-white" />
             </div>
           </div>
        </div>
      </div>
    </div>
  );
}
