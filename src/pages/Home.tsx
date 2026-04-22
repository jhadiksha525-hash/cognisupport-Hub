import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Shield, Zap, Globe, MessageSquare, Database, Sparkles, Bot } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div className="pt-24">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 px-6">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-full pointer-events-none opacity-20">
          <div className="absolute top-0 left-0 w-96 h-96 bg-brand-500 rounded-full blur-[120px] -translate-x-1/2 -translate-y-1/2" />
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-cyan-500 rounded-full blur-[120px] translate-x-1/2 translate-y-1/2" />
        </div>

        <div className="max-w-7xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-500/10 border border-brand-500/20 text-brand-400 text-xs font-semibold mb-6">
              <Sparkles className="w-3 h-3" /> Powered by <span className="text-black bg-white px-1.5 rounded">AI Wisdom</span>
            </span>
            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
              Instant Answers for <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-400 to-cyan-400">Your Modern Business</span>
            </h1>
            <p className="text-slate-400 text-lg md:text-xl max-w-2xl mx-auto mb-10">
              Train your support AI on your documents and policies in minutes. 
              Reduce support tickets by up to 70% with citations and human handoff.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/sign-up" className="btn-primary text-lg px-8 py-3 flex items-center gap-2">
                Start Your Free Trial <ArrowRight className="w-5 h-5" />
              </Link>
              <button 
                onClick={() => {
                  // This is a simple bridge to the global widget. In a real app we'd use a state management or event.
                  const widgetBtn = document.querySelector('button[class*="rounded-full flex items-center justify-center shadow-xl"]');
                  if (widgetBtn instanceof HTMLButtonElement) widgetBtn.click();
                }}
                className="btn-secondary text-lg px-8 py-3 flex items-center gap-2"
              >
                <Bot className="w-5 h-5" /> Talk to AI Agent
              </button>
            </div>
          </motion.div>

          {/* Product Preview */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mt-20 relative group"
          >
            <div className="absolute -inset-1 bg-gradient-to-r from-brand-500 to-cyan-500 rounded-2xl blur opacity-25 group-hover:opacity-40 transition duration-1000"></div>
            <div className="relative glass-card overflow-hidden border-slate-700/50 aspect-video md:aspect-[21/9] animate-float">
               <div className="absolute top-0 left-0 w-full h-12 bg-slate-900 border-b border-slate-800 flex items-center px-4 gap-2">
                 <div className="flex gap-1.5">
                   <div className="w-3 h-3 rounded-full bg-red-500/20 border border-red-500/30" />
                   <div className="w-3 h-3 rounded-full bg-yellow-500/20 border border-yellow-500/30" />
                   <div className="w-3 h-3 rounded-full bg-green-500/20 border border-green-500/30" />
                 </div>
                 <div className="mx-auto bg-slate-800 rounded-md px-3 py-1 text-[10px] text-slate-500 flex items-center gap-2">
                   app.cognisupport.com/dashboard
                 </div>
               </div>
               <div className="pt-16 px-8 grid grid-cols-12 gap-6 h-full">
                 <div className="col-span-3 space-y-4">
                   <div className="h-8 bg-slate-800 rounded-lg w-full" />
                   {[1,2,3,4].map(i => (
                     <div key={i} className="h-4 bg-slate-800/50 rounded-md w-3/4" />
                   ))}
                 </div>
                 <div className="col-span-9 grid grid-cols-3 gap-6">
                    {[1,2,3].map(i => (
                      <div key={i} className="bg-slate-800/30 rounded-xl p-4 border border-slate-800/50">
                        <div className="w-8 h-8 rounded bg-slate-800 mb-3" />
                        <div className="h-3 bg-slate-800 rounded w-1/2 mb-2" />
                        <div className="h-6 bg-slate-800 rounded w-3/4" />
                      </div>
                    ))}
                    <div className="col-span-3 h-40 bg-slate-800/20 rounded-xl border border-slate-800/50" />
                 </div>
               </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features */}
      <section className="py-24 px-6 bg-slate-950">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-3xl md:text-5xl font-bold mb-4">Why choose CogniSupport?</h2>
            <p className="text-slate-400">Engineered for accuracy, privacy, and scale.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <FeatureCard 
              icon={<Shield className="w-6 h-6 text-brand-400" />}
              title="Data Isolation"
              desc="Multi-tenant architecture ensures your company data never leaks into other models."
            />
            <FeatureCard 
              icon={<Database className="w-6 h-6 text-cyan-400" />}
              title="Knowledge Graph"
              desc="Upload PDFs, SOPs, and Manuals. Our AI builds a complex vector index for RAG."
            />
            <FeatureCard 
              icon={<MessageSquare className="w-6 h-6 text-brand-400" />}
              title="Human Handoff"
              desc="Seamlessly transition from AI to a live agent when things get complex."
            />
            <FeatureCard 
              icon={<Zap className="w-6 h-6 text-cyan-400" />}
              title="Citations"
              desc="Every answer comes with sources. Build trust with transparent AI responses."
            />
            <FeatureCard 
              icon={<Globe className="w-6 h-6 text-brand-400" />}
              title="Embed Anywhere"
              desc="One script tag is all it takes to bring AI support to your entire website."
            />
            <FeatureCard 
              icon={<Bot className="w-6 h-6 text-cyan-400" />}
              title="Multi-Tenant"
              desc="Scale from one team to an entire conglomerate with org isolation."
            />
          </div>
        </div>
      </section>
    </div>
  );
}

function FeatureCard({ icon, title, desc }: { icon: React.ReactNode, title: string, desc: string }) {
  return (
    <motion.div 
      whileHover={{ y: -5 }}
      className="p-8 rounded-2xl bg-slate-900 border border-slate-800 hover:border-brand-500/30 transition-all duration-300"
    >
      <div className="bg-slate-800 w-12 h-12 rounded-xl flex items-center justify-center mb-6">
        {icon}
      </div>
      <h3 className="text-xl font-bold mb-3">{title}</h3>
      <p className="text-slate-400 leading-relaxed">
        {desc}
      </p>
    </motion.div>
  );
}
