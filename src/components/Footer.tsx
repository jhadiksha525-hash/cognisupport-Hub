import React from 'react';
import { Bot, Mail, Twitter, Github, Linkedin } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-slate-950 border-t border-slate-900 py-20 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-4 gap-12 mb-16">
          <div className="col-span-1 md:col-span-2">
            <Link to="/" className="flex items-center gap-2 mb-6">
              <Bot className="w-8 h-8 text-brand-500" />
              <span className="font-display font-bold text-2xl tracking-tight text-white">
                CogniSupport <span className="text-brand-500 underline underline-offset-4 decoration-2 decoration-brand-500/30">Hub</span>
              </span>
            </Link>
            <p className="text-slate-400 max-w-sm leading-relaxed">
              Empowering companies to provide world-class support with custom-trained AI agents. 
              Knowledge base integration, citations, and human-in-the-loop support.
            </p>
          </div>
          
          <div>
            <h4 className="font-bold text-white mb-6 uppercase text-xs tracking-widest">Company</h4>
            <ul className="space-y-4">
              <li><Link to="/about" className="text-slate-400 hover:text-white transition-colors">About Us</Link></li>
              <li><Link to="/founders" className="text-slate-400 hover:text-white transition-colors">Founders</Link></li>
              <li><Link to="/contact" className="text-slate-400 hover:text-white transition-colors">Contact</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-white mb-6 uppercase text-xs tracking-widest">Social</h4>
            <div className="flex gap-4">
              <a href="#" className="text-slate-400 hover:text-brand-500"><Twitter className="w-5 h-5" /></a>
              <a href="#" className="text-slate-400 hover:text-brand-500"><Linkedin className="w-5 h-5" /></a>
              <a href="#" className="text-slate-400 hover:text-brand-500"><Github className="w-5 h-5" /></a>
            </div>
          </div>
        </div>
        
        <div className="pt-8 border-t border-slate-900 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-slate-500 text-sm">
            © 2026 CogniSupport Hub. All rights reserved. Built by Diksha.
          </p>
          <div className="flex gap-8 text-sm text-slate-500">
            <a href="#" className="hover:text-white">Privacy Policy</a>
            <a href="#" className="hover:text-white">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
