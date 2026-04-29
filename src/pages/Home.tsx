import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight, ShieldCheck, Zap, MessageSquare, FileText, Sparkles, Bot, Headset, Cpu, Ghost, AlertCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div className="pt-24 min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 px-6">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-full pointer-events-none">
          <div className="absolute top-0 left-0 w-96 h-96 bg-primary rounded-full blur-[150px] -translate-x-1/2 -translate-y-1/2 opacity-30" />
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-accent rounded-full blur-[150px] translate-x-1/2 translate-y-1/2 opacity-20" />
        </div>

        <div className="max-w-7xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-primary text-xs font-bold mb-6 uppercase tracking-widest backdrop-blur-sm">
              <Sparkles className="w-3 h-3" /> Powered by <span className="text-white bg-primary px-1.5 rounded ml-1">AI Precision</span>
            </span>
            <h1 className="text-5xl md:text-8xl font-bold mb-6 leading-none tracking-tighter text-white">
              Instant Answers for <br />
              <span className="text-white/20">Your Modern Business</span>
            </h1>
            <p className="text-white/60 text-lg md:text-xl max-w-2xl mx-auto mb-10 font-medium">
              Train your support AI on your documents and policies in minutes. 
              Reduce support tickets by up to 70% with citations and human handoff.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/sign-up" className="btn-primary text-lg px-8 py-3 flex items-center gap-2">
                Start Your Free Trial <ArrowRight className="w-5 h-5" />
              </Link>
              <button 
                onClick={() => {
                  const widgetBtn = document.querySelector('button[class*="rounded-full"]');
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
            <div className="absolute -inset-1 bg-gradient-to-r from-primary to-accent rounded-3xl blur-2xl opacity-20 group-hover:opacity-30 transition duration-1000"></div>
            <div className="relative glass-card border-white/5 aspect-video md:aspect-[21/9] animate-float shadow-2xl overflow-hidden">
               {/* Hero Overlay Gradient */}
               <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#070A12]/20 to-[#070A12]/80 z-10 pointer-events-none" />
               
               <div className="absolute top-0 left-0 w-full h-12 bg-white/5 border-b border-white/10 flex items-center px-4 gap-2 z-20">
                 <div className="flex gap-1.5">
                   <div className="w-3 h-3 rounded-full bg-red-400/20 border border-red-400/30" />
                   <div className="w-3 h-3 rounded-full bg-amber-400/20 border border-amber-400/30" />
                   <div className="w-3 h-3 rounded-full bg-green-400/20 border border-green-400/30" />
                 </div>
                 <div className="mx-auto bg-white/5 border border-white/10 rounded-md px-3 py-1 text-[10px] text-white/40 flex items-center gap-2">
                   app.citesupport.com/dashboard
                 </div>
               </div>
               <div className="pt-16 px-8 grid grid-cols-12 gap-6 h-full relative z-0">
                 <div className="col-span-3 space-y-4">
                   <div className="h-8 bg-white/5 rounded-lg w-full" />
                   {[1,2,3,4].map(i => (
                     <div key={i} className="h-4 bg-white/5 rounded-md w-3/4" />
                   ))}
                 </div>
                 <div className="col-span-9 grid grid-cols-3 gap-6">
                    {[1,2,3].map(i => (
                       <div key={i} className="bg-primary/10 rounded-xl p-4 border border-white/5">
                         <div className="w-8 h-8 rounded bg-primary/20 mb-3" />
                         <div className="h-3 bg-primary/20 rounded w-1/2 mb-2" />
                         <div className="h-6 bg-primary/20 rounded w-3/4" />
                       </div>
                    ))}
                    <div className="col-span-3 h-40 bg-accent/10 rounded-xl border border-white/5" />
                 </div>
               </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Trust Badges Features */}
      <section className="py-24 px-6 relative">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-6xl font-bold mb-4 tracking-tighter text-white">Built for Trust.</h2>
            <p className="text-white/60 text-lg font-medium">Core features that ensure reliability and transparency.</p>
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
      <section className="py-24 px-6 relative overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl md:text-6xl font-bold mb-6 tracking-tighter text-white">
                Verification by Default.
              </h2>
              <p className="text-white/60 text-lg mb-8 font-medium leading-relaxed">
                Most AI bots hallucinate because they have no reference. CiteSupport scans your actual SOPs and Manuals, then generates answers that cite specific paragraphs.
              </p>
              
              <ul className="space-y-5 mb-10">
                {[
                  "Automatic Source Attributions",
                  "Deep-link to PDF pages & sections",
                  "One-click source verification for users",
                  "Eliminate AI 'hallucinations' entirely"
                ].map((item, i) => (
                  <React.Fragment key={item}>
                    <li className="flex items-center gap-3 text-white font-bold">
                      <div className="w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center">
                        <div className="w-2 h-2 rounded-full bg-primary shadow-lg shadow-primary/50" />
                      </div>
                      {item}
                    </li>
                    {i < 3 && <div className="my-5 border-t border-white/10" />}
                  </React.Fragment>
                ))}
              </ul>

              <Link to="/sign-up" className="btn-primary inline-flex items-center gap-2">
                Get Started for Free <ArrowRight className="w-5 h-5" />
              </Link>
            </motion.div>

            <div className="relative">
              {/* Decorative elements */}
              <div className="absolute -top-10 -right-10 w-64 h-64 bg-primary/10 rounded-full blur-3xl opacity-50" />
              
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="relative rounded-[2.5rem] bg-gradient-to-b from-[#0B1F3A] to-[#071225] border border-[#2B5FB8]/25 shadow-[0_20px_80px_rgba(0,0,0,0.5)] overflow-hidden"
              >
                {/* Chat UI Header */}
                <div className="p-6 bg-white/5 border-b border-white/10 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-lg shadow-primary/20">
                      <Bot className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-white">CiteSupport Assistant</h4>
                      <p className="text-[10px] text-primary font-bold uppercase tracking-widest">Always Verified</p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                    <span className="text-[10px] font-bold text-white/40 uppercase tracking-widest">LIVE AGENT READY</span>
                  </div>
                </div>

                {/* Chat Body */}
                <div className="p-8 space-y-6">
                  {/* User Question */}
                  <div className="flex justify-end">
                    <div className="max-w-[80%] bg-primary/20 border border-primary/20 rounded-2xl rounded-tr-none py-3 px-4 shadow-lg shadow-black/20">
                      <p className="text-sm text-white font-medium">What is your refund policy for seasonal items?</p>
                    </div>
                  </div>

                  {/* AI Response with Citations */}
                  <div className="flex items-start gap-4">
                    <div className="w-8 h-8 rounded-lg bg-white/5 flex-shrink-0 flex items-center justify-center border border-white/10">
                      <Bot className="w-5 h-5 text-white/60" />
                    </div>
                    <div className="space-y-4">
                      <div className="bg-white/5 border border-white/10 p-5 rounded-2xl rounded-tl-none shadow-xl relative overflow-hidden group backdrop-blur-md">
                        <div className="absolute top-0 left-0 w-1 h-full bg-primary" />
                        <p className="text-sm text-white/80 leading-relaxed mb-4">
                          According to our current retail guidelines, seasonal items (holiday decorations, lawn furniture, etc.) can be returned for a full refund within 14 days of purchase <Citation num={1} />. 
                          Items must be in original packaging and show no signs of use. After 14 days, only store credit is issued <Citation num={2} />.
                        </p>
                        
                        <div className="pt-4 mt-4 border-t border-white/5 flex flex-col gap-2">
                          <p className="text-[10px] font-bold text-white/40 uppercase tracking-widest">Sources</p>
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
                className="absolute -bottom-6 -left-6 bg-[#0B1020]/90 border border-white/10 shadow-2xl p-4 rounded-2xl max-w-xs backdrop-blur-xl"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-green-500/20 flex items-center justify-center border border-green-500/30">
                    <ShieldCheck className="w-4 h-4 text-green-500" />
                  </div>
                  <p className="text-xs font-bold text-white/90">Multi-tenant Isolation: Your data is 100% private.</p>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Transparency Section */}
      <section className="py-24 px-6 relative">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="rounded-2xl bg-gradient-to-b from-[#0B1F3A] to-[#071225] border border-[#2B5FB8]/25 shadow-[0_10px_40px_rgba(0,0,0,0.45)] text-white p-10"
            >
              <h3 className="text-2xl font-bold mb-4 tracking-tight">Standard AI Support</h3>
              <p className="text-white/60 mb-6 font-medium">What most tools offer today.</p>
              
              <div className="my-6 border-t border-white/10" />
              
              <div className="space-y-6">
                <div>
                  <p className="font-bold text-white/90 flex items-center gap-2">
                    <Cpu className="w-4 h-4 text-white/40" /> Generic Models
                  </p>
                  <p className="text-[10px] text-white/40 leading-relaxed uppercase tracking-widest font-bold">GPT-4 without specific grounding.</p>
                </div>
                
                <div className="my-6 border-t border-white/10" />
                
                <div>
                  <p className="font-bold text-white/90 flex items-center gap-2">
                    <Ghost className="w-4 h-4 text-white/40" /> High Hallucination Risk
                  </p>
                  <p className="text-[10px] text-white/40 leading-relaxed uppercase tracking-widest font-bold">Answers based on general training data.</p>
                </div>
                
                <div className="my-6 border-t border-white/10" />
                
                <div>
                  <p className="font-bold text-white/90 flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 text-white/40" /> No Citations
                  </p>
                  <p className="text-[10px] text-white/40 leading-relaxed uppercase tracking-widest font-bold">Users have to "just trust" the AI.</p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="rounded-2xl bg-gradient-to-b from-[#0B1F3A] to-[#071225] border border-[#2B5FB8]/25 shadow-[0_10px_40px_rgba(0,0,0,0.45)] text-white p-10 relative overflow-hidden"
            >
              <div className="absolute top-4 right-6 bg-primary text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest">Better Choice</div>
              <h3 className="text-2xl font-bold mb-4 tracking-tight">CiteSupport Edge</h3>
              <p className="text-white/60 mb-6 font-medium">Why 500+ teams switched.</p>
              
              <div className="my-6 border-t border-white/10" />
              
              <div className="space-y-6">
                <div>
                  <p className="font-bold text-white flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-primary" /> 100% Verified Answers
                  </p>
                  <p className="text-[10px] text-white/40 leading-relaxed uppercase tracking-widest font-bold">Always grounded in YOUR documents.</p>
                </div>
                
                <div className="my-6 border-t border-white/10" />
                
                <div>
                  <p className="font-bold text-white flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-primary" /> Zero-Trust Security
                  </p>
                  <p className="text-[10px] text-white/40 leading-relaxed uppercase tracking-widest font-bold">Data isolation at the vector layer.</p>
                </div>
                
                <div className="my-6 border-t border-white/10" />
                
                <div>
                  <p className="font-bold text-white flex items-center gap-2">
                    <Zap className="w-4 h-4 text-primary" /> Sub-second Citations
                  </p>
                  <p className="text-[10px] text-white/40 leading-relaxed uppercase tracking-widest font-bold">Deep links to your PDFs instantly.</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[400px] bg-primary/20 blur-[120px] rounded-full -z-10" />
        <div className="container mx-auto px-6">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="rounded-[3rem] bg-gradient-to-b from-[#0B1F3A] to-[#071225] border border-[#2B5FB8]/25 p-12 md:p-20 text-center shadow-[0_20px_80px_rgba(0,0,0,0.5)] relative overflow-hidden"
          >
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary to-transparent" />
            <Bot className="w-16 h-16 text-primary mx-auto mb-8 animate-float" />
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 tracking-tighter">Ready to secure your customer trust?</h2>
            <p className="text-xl text-white/60 mb-10 max-w-2xl mx-auto font-medium leading-relaxed">
              Join 500+ forward-thinking companies using CiteSupport to eliminate AI hallucinations and provide verified answers.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link to="/sign-up" className="btn-primary px-10 py-4 text-lg">
                Get Started for Free
              </Link>
              <button className="px-10 py-4 text-lg font-bold text-white hover:text-primary transition-colors">
                Book a Demo
              </button>
            </div>
            
            <div className="mt-12 flex items-center justify-center gap-8 grayscale opacity-20 hover:grayscale-0 hover:opacity-50 transition-all duration-700">
               <span className="font-display text-2xl font-black italic tracking-tighter">FORBES</span>
               <span className="font-display text-2xl font-black italic tracking-tighter">TECHCRUNCH</span>
               <span className="font-display text-2xl font-black italic tracking-tighter">WIRED</span>
            </div>
          </motion.div>
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
      className="p-8 rounded-2xl bg-gradient-to-b from-[#0B1F3A] to-[#071225] border border-[#2B5FB8]/25 shadow-[0_10px_40px_rgba(0,0,0,0.45)] group backdrop-blur-sm"
    >
      <div className="bg-white/5 w-14 h-14 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500 border border-white/5 shadow-inner">
        {icon}
      </div>
      <h3 className="text-xl font-semibold mb-3 text-white tracking-tight">{title}</h3>
      <p className="text-sm text-white/70 leading-relaxed group-hover:text-white transition-colors">
        {desc}
      </p>
    </motion.div>
  );
}

function Citation({ num }: { num: number }) {
  return (
    <span className="inline-flex items-center justify-center w-5 h-5 rounded-md bg-primary/20 text-primary text-[10px] font-bold border border-primary/30 cursor-help hover:bg-primary hover:text-white transition-colors align-top ml-1">
      {num}
    </span>
  );
}

function SourceCard({ title, page }: { title: string, page: string }) {
  return (
    <div className="flex items-center gap-2 p-2 rounded-lg bg-white/5 border border-white/10 hover:border-primary/30 transition-colors cursor-pointer group/source">
      <div className="w-8 h-8 rounded bg-primary/20 flex items-center justify-center group-hover/source:bg-primary/30 transition-colors">
        <FileText className="w-4 h-4 text-primary" />
      </div>
      <div className="pr-2">
        <p className="text-[10px] font-bold text-white leading-none mb-1">{title}</p>
        <p className="text-[8px] text-white/40 font-bold uppercase tracking-tighter">{page}</p>
      </div>
    </div>
  );
}
