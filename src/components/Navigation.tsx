import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Bot, ChevronRight, User as UserIcon, LogOut } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '../lib/utils';
import { useAuth } from '../lib/AuthContext';

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const { user, profile, signOut } = useAuth();

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Founders', href: '/founders' },
    { name: 'About', href: '/about' },
    { name: 'Contact', href: '/contact' },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-slate-950/80 backdrop-blur-lg border-b border-slate-800/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex items-center gap-2">
            <Link to="/" className="flex items-center gap-2 group">
              <div className="bg-brand-600 p-2 rounded-lg group-hover:rotate-12 transition-transform">
                <Bot className="w-6 h-6 text-white" />
              </div>
              <span className="font-display font-bold text-xl tracking-tight text-white">
                CogniSupport <span className="text-brand-500 underline underline-offset-4 decoration-2 decoration-brand-500/30">Hub</span>
              </span>
            </Link>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.href}
                className={cn(
                  "text-sm font-medium transition-colors hover:text-brand-400",
                  location.pathname === link.href ? "text-brand-500" : "text-slate-400"
                )}
              >
                {link.name}
              </Link>
            ))}
            <div className="h-4 w-px bg-slate-800" />
            <AnimatePresence mode="wait">
              {user ? (
                <div className="flex items-center gap-4">
                  <Link to="/dashboard" className="text-sm font-medium text-slate-400 hover:text-white transition-colors">
                    Dashboard
                  </Link>
                  <div className="group relative">
                    <button className="flex items-center gap-2 bg-slate-900 border border-slate-800 p-1.5 pr-3 rounded-full hover:border-brand-500/50 transition-all">
                      <div className="w-6 h-6 rounded-full bg-brand-600 flex items-center justify-center overflow-hidden">
                        {user.photoURL ? <img src={user.photoURL} alt="" /> : <UserIcon className="w-3 h-3 text-white" />}
                      </div>
                      <span className="text-xs font-bold text-white">{profile?.displayName || 'Account'}</span>
                    </button>
                    <div className="absolute top-full right-0 mt-2 w-48 glass-card invisible group-hover:visible opacity-0 group-hover:opacity-100 transition-all p-2">
                      <button 
                        onClick={() => signOut()}
                        className="flex items-center gap-2 w-full px-3 py-2 text-xs text-slate-400 hover:text-red-400 hover:bg-red-400/10 rounded-lg transition-all"
                      >
                        <LogOut className="w-4 h-4" /> Sign Out
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                <>
                  <Link to="/sign-in" className="text-sm font-medium text-slate-400 hover:text-white transition-colors">
                    Sign In
                  </Link>
                  <Link to="/sign-up" className="btn-primary flex items-center gap-2 text-sm">
                    Get Started <ChevronRight className="w-4 h-4" />
                  </Link>
                </>
              )}
            </AnimatePresence>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-slate-400 hover:text-white"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-slate-900 border-b border-slate-800 overflow-hidden"
          >
            <div className="px-4 pt-2 pb-6 space-y-2">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.href}
                  onClick={() => setIsOpen(false)}
                  className="block px-3 py-2 rounded-md text-base font-medium text-slate-400 hover:text-white hover:bg-slate-800"
                >
                  {link.name}
                </Link>
              ))}
              <div className="pt-4 space-y-2">
                <Link
                  to="/sign-in"
                  onClick={() => setIsOpen(false)}
                  className="block px-3 py-2 rounded-md text-base font-medium text-slate-400 hover:text-white"
                >
                  Sign In
                </Link>
                <Link
                  to="/sign-up"
                  onClick={() => setIsOpen(false)}
                  className="block px-3 py-2 rounded-md text-base font-medium bg-brand-600 text-white text-center"
                >
                  Get Started
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
