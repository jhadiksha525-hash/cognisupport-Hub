import React from 'react';
import { Bot, Mail, Twitter, Github, Linkedin } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-neutral-50 border-t border-neutral-200 py-24 px-6 mt-auto">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-4 gap-12 mb-16">
          <div className="col-span-1 md:col-span-2">
            <Link to="/" className="flex items-center gap-2 mb-6 group">
              <Bot className="w-8 h-8 text-black transition-transform group-hover:scale-110" />
              <span className="font-display font-bold text-2xl tracking-tighter text-black">
                CogniSupport <span className="text-neutral-400 underline underline-offset-8 decoration-2 decoration-neutral-200">Hub</span>
              </span>
            </Link>
            <p className="text-neutral-500 max-w-sm leading-relaxed font-medium">
              Empowering companies to provide world-class support with custom-trained AI agents. 
              Knowledge base integration, citations, and human-in-the-loop support.
            </p>
          </div>
          
          <div>
            <h4 className="font-bold text-black mb-6 uppercase text-xs tracking-widest">Company</h4>
            <ul className="space-y-4">
              <li><Link to="/about" className="text-neutral-500 hover:text-black transition-colors font-bold">About Us</Link></li>
              <li><Link to="/founders" className="text-neutral-500 hover:text-black transition-colors font-bold">Founders</Link></li>
              <li><Link to="/contact" className="text-neutral-500 hover:text-black transition-colors font-bold">Contact</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-black mb-6 uppercase text-xs tracking-widest">Connect</h4>
            <div className="flex gap-4">
              <a href="#" className="p-2 bg-white border border-neutral-200 rounded-xl text-neutral-400 hover:text-black hover:border-black transition-all shadow-sm">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="p-2 bg-white border border-neutral-200 rounded-xl text-neutral-400 hover:text-black hover:border-black transition-all shadow-sm">
                <Linkedin className="w-5 h-5" />
              </a>
              <a href="#" className="p-2 bg-white border border-neutral-200 rounded-xl text-neutral-400 hover:text-black hover:border-black transition-all shadow-sm">
                <Github className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
        
        <div className="pt-8 border-t border-neutral-200 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-neutral-400 text-xs font-bold uppercase tracking-widest">
            © 2026 CogniSupport Hub. Built by Diksha.
          </p>
          <div className="flex gap-8 text-xs font-bold uppercase tracking-widest text-neutral-400">
            <a href="#" className="hover:text-black transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-black transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
