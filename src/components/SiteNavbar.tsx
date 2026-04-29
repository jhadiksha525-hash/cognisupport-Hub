import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Bot, X, ChevronRight, User as UserIcon, LogOut } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '../lib/utils';
import { useAuth } from '../lib/AuthContext';

const navLinks = [
  { name: 'Product', href: '/' },
  { name: 'Pricing', href: '/pricing' },
  { name: 'Docs', href: '/docs' },
  { name: 'About', href: '/about' },
];

export default function SiteNavbar() {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const { user, profile, signOut } = useAuth();

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-[#0B1020]/70 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
        {/* Logo / Brand */}
        <Link to="/" className="flex items-center gap-2 group">
          <div className="bg-gradient-to-br from-[#6D28D9] to-[#4F46E5] p-1.5 rounded-lg group-hover:scale-110 transition-transform shadow-lg shadow-purple-500/20">
            <Bot className="w-5 h-5 text-white" />
          </div>
          <span className="text-lg font-semibold text-white tracking-tight">
            CiteSupport
          </span>
        </Link>

        {/* Desktop menu */}
        <nav className="hidden gap-8 md:flex items-center">
          {navLinks.map((l) => (
            <Link 
              key={l.href} 
              to={l.href} 
              className={cn(
                "text-sm font-medium transition-colors hover:text-white",
                location.pathname === l.href ? "text-white" : "text-white/80"
              )}
            >
              {l.name}
            </Link>
          ))}
          
          <AnimatePresence mode="wait">
            {user ? (
              <div className="flex items-center gap-4 pl-4 border-l border-white/10">
                <Link to="/dashboard" className="text-sm font-medium text-white/80 hover:text-white transition-colors">
                  Dashboard
                </Link>
                <div className="group relative">
                  <button className="flex items-center gap-2 bg-white/5 border border-white/10 p-1 pr-3 rounded-full hover:border-primary transition-all backdrop-blur-sm">
                    <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center overflow-hidden border border-white/20">
                      {user.photoURL ? <img src={user.photoURL} alt="" /> : <UserIcon className="w-3 h-3 text-white" />}
                    </div>
                    <span className="text-xs font-bold text-white">{profile?.displayName || 'Account'}</span>
                  </button>
                  <div className="absolute top-full right-0 mt-2 w-48 rounded-xl border border-white/10 invisible group-hover:visible opacity-0 group-hover:opacity-100 transition-all p-2 bg-[#0B1020] shadow-2xl">
                    <button 
                      onClick={() => signOut()}
                      className="flex items-center gap-2 w-full px-3 py-2 text-xs text-white/80 hover:text-white hover:bg-white/5 rounded-lg transition-all font-bold"
                    >
                      <LogOut className="w-4 h-4" /> Sign Out
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex items-center gap-4">
                <Link
                  to="/sign-in"
                  className="rounded-lg bg-white/10 px-4 py-1.5 text-sm font-medium text-white hover:bg-white/15 transition-colors"
                >
                  Sign In
                </Link>
                <Link
                  to="/sign-up"
                  className="rounded-lg bg-gradient-to-r from-[#6D28D9] to-[#4F46E5] px-4 py-1.5 text-sm font-semibold text-white shadow-lg shadow-purple-500/20 hover:scale-105 transition-all flex items-center gap-1"
                >
                  Get Started <ChevronRight className="w-4 h-4" />
                </Link>
              </div>
            )}
          </AnimatePresence>
        </nav>

        {/* Mobile hamburger */}
        <button
          onClick={() => setOpen(true)}
          className="md:hidden rounded-lg border border-white/15 bg-white/5 px-3 py-2 text-white hover:bg-white/10 active:scale-95 transition-all"
          aria-label="Open menu"
        >
          <div className="space-y-1.5">
            <span className="block h-0.5 w-6 bg-white"></span>
            <span className="block h-0.5 w-6 bg-white"></span>
            <span className="block h-0.5 w-6 bg-white"></span>
          </div>
        </button>
      </div>

      {/* Mobile drawer */}
      <AnimatePresence>
        {open && (
          <div className="fixed inset-0 z-50 md:hidden">
            {/* overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
              onClick={() => setOpen(false)}
            />

            {/* panel */}
            <motion.div 
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="absolute right-0 top-0 h-full w-72 bg-[#0B1020] p-6 shadow-2xl border-l border-white/10"
            >
              <div className="flex items-center justify-between mb-8">
                <p className="text-white font-bold text-lg">Menu</p>
                <button
                  onClick={() => setOpen(false)}
                  className="rounded-lg border border-white/15 p-2 text-white hover:bg-white/5 active:scale-90 transition-all font-bold"
                  aria-label="Close menu"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="flex flex-col gap-5">
                {navLinks.map((l) => (
                  <Link
                    key={l.href}
                    to={l.href}
                    onClick={() => setOpen(false)}
                    className={cn(
                      "text-lg font-medium transition-colors",
                      location.pathname === l.href ? "text-white" : "text-white/70 hover:text-white"
                    )}
                  >
                    {l.name}
                  </Link>
                ))}

                <div className="h-px bg-white/10 my-2" />

                {user ? (
                  <div className="space-y-4">
                    <Link
                      to="/dashboard"
                      onClick={() => setOpen(false)}
                      className="block px-4 py-3 rounded-xl bg-white/5 text-white font-medium hover:bg-white/10"
                    >
                      Dashboard
                    </Link>
                    <button
                      onClick={() => {
                        signOut();
                        setOpen(false);
                      }}
                      className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-red-500/10 text-red-400 font-bold hover:bg-red-500/20"
                    >
                      <LogOut className="w-4 h-4" /> Sign Out
                    </button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <Link
                      to="/sign-in"
                      onClick={() => setOpen(false)}
                      className="block rounded-xl bg-white/5 border border-white/10 px-4 py-3 text-center font-medium text-white hover:bg-white/10 transition-all"
                    >
                      Sign In
                    </Link>
                    <Link
                      to="/get-started"
                      onClick={() => setOpen(false)}
                      className="block rounded-xl bg-gradient-to-r from-[#6D28D9] to-[#4F46E5] px-4 py-3 text-center font-bold text-white shadow-xl shadow-purple-500/20 active:scale-95 transition-all"
                    >
                      Get Started
                    </Link>
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </header>
  );
}
