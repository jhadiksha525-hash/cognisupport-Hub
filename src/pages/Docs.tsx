import React from 'react';
import { motion } from 'motion/react';
import { Book, Code, Terminal, Zap, FileText, Database } from 'lucide-react';
import { Link } from 'react-router-dom';

const sections = [
  {
    title: 'Getting Started',
    desc: 'Learn how to integrate CiteSupport in 5 minutes.',
    icon: Zap,
    links: ['Quickstart Guide', 'Widget Installation', 'Architecture Overview']
  },
  {
    title: 'Knowledge Base',
    desc: 'How to upload and index your documentation.',
    icon: Database,
    links: ['Supported Formats', 'RAG Best Practices', 'Vector Indexing']
  },
  {
    title: 'API Reference',
    desc: 'Integrate CiteSupport into your backend systems.',
    icon: Code,
    links: ['Auth & Tokens', 'Query Endpoints', 'Webhooks']
  },
  {
    title: 'Widget Customization',
    desc: 'Tailor the AI assistant to match your brand.',
    icon: FileText,
    links: ['CSS Themes', 'Custom Icons', 'Welcome Messages']
  }
];

export default function Docs() {
  return (
    <div className="pt-32 pb-24 px-6 bg-bg min-h-screen">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row gap-12">
          {/* Sidebar */}
          <aside className="w-full md:w-64 space-y-8">
            <div>
              <h4 className="text-xs font-bold text-text-muted uppercase tracking-widest mb-4">Documentation</h4>
              <nav className="space-y-1">
                {['Overview', 'Installation', 'Management', 'Security', 'FAQ'].map(item => (
                  <button key={item} className="block w-full text-left px-4 py-2 text-sm font-bold text-text-main hover:bg-white rounded-xl transition-colors">
                    {item}
                  </button>
                ))}
              </nav>
            </div>
            <div>
              <h4 className="text-xs font-bold text-text-muted uppercase tracking-widest mb-4">Resources</h4>
              <nav className="space-y-1">
                {['Community', 'Discord', 'Updates', 'Blog'].map(item => (
                  <button key={item} className="block w-full text-left px-4 py-2 text-sm font-bold text-text-muted hover:text-primary transition-colors">
                    {item}
                  </button>
                ))}
              </nav>
            </div>
          </aside>

          {/* Main Content */}
          <main className="flex-1">
            <div className="mb-12">
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/5 border border-primary/10 text-primary text-[10px] font-bold mb-4 uppercase tracking-widest leading-none">
                <Book className="w-3 h-3" /> Technical Documentation
              </span>
              <h1 className="text-4xl md:text-6xl font-bold mb-6 tracking-tighter text-text-main">
                Building with CiteSupport.
              </h1>
              <p className="text-text-muted text-lg font-medium leading-relaxed max-w-2xl">
                Explore guides, samples, and API references to help you integrate AI support seamlessly into your platform.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 gap-6">
              {sections.map((section, i) => (
                <motion.div
                  key={section.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="p-8 rounded-3xl bg-surface border border-border hover:border-primary/30 transition-all hover:shadow-xl hover:shadow-primary/5"
                >
                  <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center mb-6">
                    <section.icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-text-main tracking-tight">{section.title}</h3>
                  <p className="text-sm text-text-muted mb-6 font-medium leading-relaxed">{section.desc}</p>
                  
                  <ul className="space-y-2">
                    {section.links.map(link => (
                      <li key={link}>
                        <button className="text-sm font-bold text-primary hover:underline flex items-center gap-2">
                          <Terminal className="w-3 h-3" /> {link}
                        </button>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>

            <div className="mt-20 p-10 rounded-3xl bg-primary text-white relative overflow-hidden shadow-2xl shadow-primary/20">
              <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
                <div>
                  <h2 className="text-3xl font-bold mb-2 tracking-tight">Need custom help?</h2>
                  <p className="text-primary-foreground/80 font-medium">Talk to our engineering team directly about your integration needs.</p>
                </div>
                <Link to="/contact" className="px-8 py-3 bg-white text-primary font-bold rounded-2xl whitespace-nowrap hover:scale-105 transition-transform">
                  Contact Support
                </Link>
              </div>
              <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
