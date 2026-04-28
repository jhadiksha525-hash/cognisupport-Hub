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
    { name: 'Product', href: '/' },
    { name: 'Pricing', href: '/pricing' },
    { name: 'Docs', href: '/docs' },
    { name: 'Founders', href: '/founders' },
    { name: 'About', href: '/about' },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-lg border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex items-center gap-2">
            <Link to="/" className="flex items-center gap-2 group">
              <div className="bg-primary p-2 rounded-lg group-hover:scale-110 transition-transform">
                <Bot className="w-6 h-6 text-white" />
              </div>
              <span className="font-display font-bold text-xl tracking-tight text-text-main">
                CiteSupport</span>
            </Link>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.href}
                className={cn(
                  "text-sm font-medium transition-colors hover:text-primary",
                  location.pathname === link.href ? "text-primary font-bold" : "text-text-muted"
                )}
              >
                {link.name}
              </Link>
            ))}
            <div className="h-4 w-px bg-border" />
            <AnimatePresence mode="wait">
              {user ? (
                <div className="flex items-center gap-4">
                  <Link to="/dashboard" className="text-sm font-medium text-text-muted hover:text-primary transition-colors">
                    Dashboard
                  </Link>
                  <div className="group relative">
                    <button className="flex items-center gap-2 bg-bg border border-border p-1.5 pr-3 rounded-full hover:border-primary transition-all">
                      <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center overflow-hidden">
                        {user.photoURL ? <img src={user.photoURL} alt="" /> : <UserIcon className="w-3 h-3 text-white" />}
                      </div>
                      <span className="text-xs font-bold text-text-main">{profile?.displayName || 'Account'}</span>
                    </button>
                    <div className="absolute top-full right-0 mt-2 w-48 glass-card border border-border invisible group-hover:visible opacity-0 group-hover:opacity-100 transition-all p-2 bg-surface">
                      <button 
                        onClick={() => signOut()}
                        className="flex items-center gap-2 w-full px-3 py-2 text-xs text-text-muted hover:text-error hover:bg-error/5 rounded-lg transition-all"
                      >
                        <LogOut className="w-4 h-4" /> Sign Out
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                <>
                  <Link to="/sign-in" className="text-sm font-medium text-text-muted hover:text-primary transition-colors">
                    Sign In
                  </Link>
                  <Link to="/sign-up" className="btn-primary flex items-center gap-2 text-sm shadow-xl shadow-primary/20">
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
              className="text-neutral-500 hover:text-black"
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
            className="md:hidden bg-white border-b border-border overflow-hidden"
          >
            <div className="px-4 pt-2 pb-6 space-y-2">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.href}
                  onClick={() => setIsOpen(false)}
                  className="block px-3 py-2 rounded-md text-base font-medium text-text-muted hover:text-primary hover:bg-slate-50"
                >
                  {link.name}
                </Link>
              ))}
              <div className="pt-4 space-y-2">
                <Link
                  to="/sign-in"
                  onClick={() => setIsOpen(false)}
                  className="block px-3 py-2 rounded-md text-base font-medium text-text-muted hover:text-primary"
                >
                  Sign In
                </Link>
                <Link
                  to="/sign-up"
                  onClick={() => setIsOpen(false)}
                  className="block px-3 py-2 rounded-md text-base font-medium bg-primary text-white text-center shadow-lg shadow-primary/20"
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
