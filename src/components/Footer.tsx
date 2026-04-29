import React from 'react';
import { Bot, Mail, Twitter, Github, Linkedin } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-[#070A12] text-white py-24 px-6 mt-auto">
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid md:grid-cols-4 gap-12 mb-16">
          <div className="col-span-1 md:col-span-2">
            <Link to="/" className="flex items-center gap-2 mb-6 group">
              <div className="bg-gradient-to-br from-[#6D28D9] to-[#4F46E5] p-1.5 rounded-lg">
                <Bot className="w-6 h-6 text-white transition-transform group-hover:scale-110" />
              </div>
              <span className="font-display font-bold text-2xl tracking-tighter text-white">
                CiteSupport
              </span>
            </Link>
            <p className="mt-4 max-w-md text-white/70 leading-relaxed">
              Empowering companies to provide world-class support with custom-trained AI agents. 
              Knowledge base integration, citations, and human-in-the-loop support.
            </p>
          </div>
          
          <div>
            <h4 className="text-xs font-semibold tracking-widest text-white/60 mb-6 uppercase">Company</h4>
            <ul className="space-y-4">
              <li><Link to="/about" className="text-white/70 hover:text-white transition font-bold">About Us</Link></li>
              <li><Link to="/contact" className="text-white/70 hover:text-white transition font-bold">Contact</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-semibold tracking-widest text-white/60 mb-6 uppercase">Connect</h4>
            <div className="flex gap-4">
              <a href="#" className="h-11 w-11 rounded-full border border-white/10 bg-white/5 text-white/70 hover:text-white hover:bg-white/10 transition flex items-center justify-center">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="h-11 w-11 rounded-full border border-white/10 bg-white/5 text-white/70 hover:text-white hover:bg-white/10 transition flex items-center justify-center">
                <Linkedin className="w-5 h-5" />
              </a>
              <a href="#" className="h-11 w-11 rounded-full border border-white/10 bg-white/5 text-white/70 hover:text-white hover:bg-white/10 transition flex items-center justify-center">
                <Github className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
        
        <div className="mt-10 flex flex-col gap-3 border-t border-white/10 pt-6 text-sm text-white/50 md:flex-row md:items-center md:justify-between">
          <p className="uppercase tracking-widest text-[10px] font-bold">
            © 2026 CiteSupport. Built by Diksha & Dhruv.
          </p>
          <div className="flex gap-8 text-[10px] font-bold uppercase tracking-widest">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
