import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight, ShieldCheck, Zap, MessageSquare, FileText, Sparkles, Bot, Headset } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div className="pt-24">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 px-6 bg-white">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-full pointer-events-none opacity-5">
          <div className="absolute top-0 left-0 w-96 h-96 bg-primary rounded-full blur-[120px] -translate-x-1/2 -translate-y-1/2" />
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-accent rounded-full blur-[120px] translate-x-1/2 translate-y-1/2" />
        </div>

        <div className="max-w-7xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/5 border border-primary/10 text-primary text-xs font-bold mb-6 uppercase tracking-widest">
              <Sparkles className="w-3 h-3" /> Powered by <span className="text-white bg-primary px-1.5 rounded ml-1">AI Precision</span>
            </span>
            <h1 className="text-5xl md:text-8xl font-bold mb-6 leading-none tracking-tighter text-text-main">
              Instant Answers for <br />
              <span className="text-primary/40">Your Modern Business</span>
            </h1>
            <p className="text-text-muted text-lg md:text-xl max-w-2xl mx-auto mb-10 font-medium">
              Train your support AI on your documents and policies in minutes. 
              Reduce support tickets by up to 70% with citations and human handoff.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/sign-up" className="btn-primary text-lg px-8 py-3 flex items-center gap-2 shadow-xl shadow-primary/20">
                Start Your Free Trial <ArrowRight className="w-5 h-5" />
              </Link>
              <button 
                onClick={() => {
                  const widgetBtn = document.querySelector('button[class*="rounded-full"]');
                  if (widgetBtn instanceof HTMLButtonElement) widgetBtn.click();
                }}
                className="btn-secondary text-lg px-8 py-3 flex items-center gap-2 hover:border-primary hover:text-primary"
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
            <div className="absolute -inset-1 bg-primary rounded-2xl blur opacity-10 group-hover:opacity-20 transition duration-1000"></div>
            <div className="relative glass-card overflow-hidden border-border aspect-video md:aspect-[21/9] animate-float bg-surface shadow-2xl">
               <div className="absolute top-0 left-0 w-full h-12 bg-bg border-b border-border flex items-center px-4 gap-2">
                 <div className="flex gap-1.5">
                   <div className="w-3 h-3 rounded-full bg-red-400/20 border border-red-400/30" />
                   <div className="w-3 h-3 rounded-full bg-amber-400/20 border border-amber-400/30" />
                   <div className="w-3 h-3 rounded-full bg-green-400/20 border border-green-400/30" />
                 </div>
                 <div className="mx-auto bg-surface border border-border rounded-md px-3 py-1 text-[10px] text-text-muted flex items-center gap-2">
                   app.citesupport.com/dashboard
                 </div>
               </div>
               <div className="pt-16 px-8 grid grid-cols-12 gap-6 h-full">
                 <div className="col-span-3 space-y-4">
                   <div className="h-8 bg-bg rounded-lg w-full" />
                   {[1,2,3,4].map(i => (
                     <div key={i} className="h-4 bg-bg rounded-md w-3/4" />
                   ))}
                 </div>
                 <div className="col-span-9 grid grid-cols-3 gap-6">
                    {[1,2,3].map(i => (
                       <div key={i} className="bg-primary/5 rounded-xl p-4 border border-primary/10">
                         <div className="w-8 h-8 rounded bg-primary/20 mb-3" />
                         <div className="h-3 bg-primary/20 rounded w-1/2 mb-2" />
                         <div className="h-6 bg-primary/20 rounded w-3/4" />
                       </div>
                    ))}
                    <div className="col-span-3 h-40 bg-accent/5 rounded-xl border border-accent/10" />
                 </div>
               </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Trust Badges Features */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-6xl font-bold mb-4 tracking-tighter text-text-main">Built for Trust.</h2>
            <p className="text-text-muted text-lg font-medium">Core features that ensure reliability and transparency.</p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <TrustBadge 
              icon={<FileText className="w-6 h-6 text-primary" />}
              title="Citations Enabled"
              desc="Answers include sources from your uploaded documents."
              delay={0.1}
            />
            <TrustBadge 
              icon={<ShieldCheck className="w-6 h-6 text-accent" />}
              title="Multi-tenant Ready"
              desc="Each organization’s data stays isolated and secure."
              delay={0.2}
            />
            <TrustBadge 
              icon={<Headset className="w-6 h-6 text-primary" />}
              title="Human Handoff"
              desc="Low-confidence queries can be escalated to an agent."
              delay={0.3}
            />
            <TrustBadge 
              icon={<Sparkles className="w-6 h-6 text-accent" />}
              title="RAG Knowledge Base"
              desc="Upload PDFs and Manuals to build a vector search index."
              delay={0.4}
            />
            <TrustBadge 
              icon={<Zap className="w-6 h-6 text-warning" />}
              title="Fast Responses (Beta)"
              desc="Optimized for quick replies and smooth UX."
              delay={0.5}
            />
            <TrustBadge 
              icon={<Bot className="w-6 h-6 text-primary" />}
              title="Embed Anywhere"
              desc="One script tag to bring AI support to your website."
              delay={0.6}
            />
          </div>
        </div>
      </section>

      {/* Live Demo Section */}
      <section className="py-24 px-6 bg-bg overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl md:text-6xl font-bold mb-6 tracking-tighter text-text-main">
                Verification by Default.
              </h2>
              <p className="text-text-muted text-lg mb-8 font-medium leading-relaxed">
                Most AI bots hallucinate because they have no reference. CiteSupport scans your actual SOPs and Manuals, then generates answers that cite specific paragraphs.
              </p>
              
              <ul className="space-y-4 mb-10">
                {[
                  "Automatic Source Attributions",
                  "Deep-link to PDF pages & sections",
                  "One-click source verification for users",
                  "Eliminate AI 'hallucinations' entirely"
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-text-main font-bold">
                    <div className="w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center">
                      <div className="w-2 h-2 rounded-full bg-primary" />
                    </div>
                    {item}
                  </li>
                ))}
              </ul>

              <Link to="/sign-up" className="btn-primary inline-flex items-center gap-2">
                Get Started for Free <ArrowRight className="w-5 h-5" />
              </Link>
            </motion.div>

            <div className="relative">
              {/* Decorative elements */}
              <div className="absolute -top-10 -right-10 w-64 h-64 bg-primary/10 rounded-full blur-3xl" />
              
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="relative glass-card bg-surface border-border shadow-2xl overflow-hidden rounded-3xl"
              >
                {/* Chat UI Header */}
                <div className="p-6 bg-bg border-b border-border flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center shadow-lg shadow-primary/20">
                      <Bot className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-text-main">CiteSupport Assistant</h4>
                      <p className="text-[10px] text-primary font-bold uppercase tracking-widest">Always Verified</p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                    <span className="text-[10px] font-bold text-text-muted">LIVE AGENT READY</span>
                  </div>
                </div>

                {/* Chat Body */}
                <div className="p-8 space-y-6">
                  {/* User Question */}
                  <div className="flex justify-end">
                    <div className="max-w-[80%] bg-primary/5 border border-primary/10 rounded-2xl rounded-tr-none py-3 px-4 shadow-sm">
                      <p className="text-sm text-text-main font-medium">What is your refund policy for seasonal items?</p>
                    </div>
                  </div>

                  {/* AI Response with Citations */}
                  <div className="flex items-start gap-4">
                    <div className="w-8 h-8 rounded-lg bg-primary/10 flex-shrink-0 flex items-center justify-center">
                      <Bot className="w-5 h-5 text-primary" />
                    </div>
                    <div className="space-y-4">
                      <div className="bg-bg border border-border p-5 rounded-2xl rounded-tl-none shadow-sm relative overflow-hidden group">
                        <div className="absolute top-0 left-0 w-1 h-full bg-primary" />
                        <p className="text-sm text-text-main leading-relaxed mb-4">
                          According to our current retail guidelines, seasonal items (holiday decorations, lawn furniture, etc.) can be returned for a full refund within 14 days of purchase <Citation num={1} />. 
                          Items must be in original packaging and show no signs of use. After 14 days, only store credit is issued <Citation num={2} />.
                        </p>
                        
                        <div className="pt-4 mt-4 border-t border-border flex flex-col gap-2">
                          <p className="text-[10px] font-bold text-text-muted uppercase tracking-widest">Sources</p>
                          <div className="flex flex-wrap gap-2">
                            <SourceCard title="Refund_Policy_2024.pdf" page="Page 14" />
                            <SourceCard title="Seasonal_Retail_Manual.docx" page="Section 4.2" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Float Badge */}
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity }}
                className="absolute -bottom-6 -left-6 bg-white border border-border shadow-2xl p-4 rounded-2xl max-w-xs"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center">
                    <ShieldCheck className="w-4 h-4 text-green-600" />
                  </div>
                  <p className="text-xs font-bold text-text-main">Multi-tenant Isolation: Your data is 100% private.</p>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

function TrustBadge({ icon, title, desc, delay }: { icon: React.ReactNode, title: string, desc: string, delay: number }) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      whileHover={{ y: -5 }}
      className="p-8 rounded-3xl bg-surface border border-border hover:border-primary/50 transition-all duration-300 shadow-sm hover:shadow-xl hover:shadow-primary/5 group"
    >
      <div className="bg-bg w-14 h-14 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500 shadow-inner">
        {icon}
      </div>
      <h3 className="text-lg font-bold mb-3 text-text-main tracking-tight">{title}</h3>
      <p className="text-xs text-text-muted leading-relaxed font-bold uppercase tracking-wide">
        {desc}
      </p>
    </motion.div>
  );
}

function Citation({ num }: { num: number }) {
  return (
    <span className="inline-flex items-center justify-center w-5 h-5 rounded-md bg-primary/10 text-primary text-[10px] font-bold border border-primary/20 cursor-help hover:bg-primary hover:text-white transition-colors align-top ml-1">
      {num}
    </span>
  );
}

function SourceCard({ title, page }: { title: string, page: string }) {
  return (
    <div className="flex items-center gap-2 p-2 rounded-lg bg-bg border border-border hover:border-primary/30 transition-colors cursor-pointer group/source">
      <div className="w-8 h-8 rounded bg-primary/10 flex items-center justify-center group-hover/source:bg-primary/20 transition-colors">
        <FileText className="w-4 h-4 text-primary" />
      </div>
      <div className="pr-2">
        <p className="text-[10px] font-bold text-text-main leading-none mb-1">{title}</p>
        <p className="text-[8px] text-text-muted font-bold uppercase tracking-tighter">{page}</p>
      </div>
    </div>
  );
}
