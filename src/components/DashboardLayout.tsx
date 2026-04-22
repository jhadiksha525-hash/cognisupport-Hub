import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, 
  FileText, 
  MessageSquare, 
  BarChart3, 
  Settings, 
  LogOut, 
  Menu, 
  X, 
  Bot,
  ChevronRight,
  Plus
} from 'lucide-react';
import { cn } from '../lib/utils';
import { motion, AnimatePresence } from 'motion/react';
import { useAuth } from '../lib/AuthContext';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, profile, signOut } = useAuth();

  // Redirect if not logged in
  useEffect(() => {
    if (!user) {
       window.location.pathname = '/sign-in';
    }
  }, [user]);

  if (!user) return null;

  const navItems = [
    { name: 'Overview', icon: LayoutDashboard, href: '/dashboard' },
    { name: 'Knowledge Base', icon: FileText, href: '/dashboard/documents' },
    { name: 'Conversations', icon: MessageSquare, href: '/dashboard/conversations' },
    { name: 'Widget Config', icon: Settings, href: '/dashboard/widget' },
    { name: 'Analytics', icon: BarChart3, href: '/dashboard/analytics' },
  ];

  return (
    <div className="flex h-screen bg-slate-950 overflow-hidden">
      {/* Sidebar */}
      <AnimatePresence mode="wait">
        {isSidebarOpen && (
          <motion.aside
            initial={{ x: -280, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -280, opacity: 0 }}
            transition={{ type: 'spring', damping: 20, stiffness: 100 }}
            className="w-72 bg-slate-900 border-r border-slate-800 flex flex-col z-40 fixed md:relative h-full"
          >
            <div className="p-6">
              <Link to="/" className="flex items-center gap-2 mb-8">
                <Bot className="w-8 h-8 text-brand-500" />
                <span className="font-display font-bold text-xl text-white">CogniSupport</span>
              </Link>

              <div className="space-y-1">
                {navItems.map((item) => (
                  <Link
                    key={item.href}
                    to={item.href}
                    className={cn(
                      "flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all group",
                      location.pathname === item.href 
                        ? "bg-brand-600 text-white shadow-lg shadow-brand-900/20" 
                        : "text-slate-400 hover:text-white hover:bg-slate-800"
                    )}
                  >
                    <item.icon className={cn("w-5 h-5", location.pathname === item.href ? "text-white" : "text-slate-400 group-hover:text-brand-400")} />
                    {item.name}
                  </Link>
                ))}
              </div>
            </div>

            <div className="mt-auto p-4 border-t border-slate-800">
              <div className="bg-slate-800/50 rounded-2xl p-4 mb-4">
                <p className="text-[10px] uppercase tracking-widest text-slate-500 font-bold mb-2">Current Organization</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-brand-600 flex items-center justify-center font-bold text-white">
                    T
                  </div>
                  <div className="flex-1 overflow-hidden">
                    <p className="text-sm font-bold text-white truncate">The Tech Corp</p>
                    <p className="text-[10px] text-slate-400">Owner</p>
                  </div>
                  <ChevronRight className="w-4 h-4 text-slate-600" />
                </div>
              </div>
              
              <button 
                onClick={() => signOut()}
                className="flex items-center gap-3 px-4 py-3 w-full rounded-xl text-sm font-medium text-slate-400 hover:text-red-400 hover:bg-red-400/10 transition-all font-bold"
              >
                <LogOut className="w-5 h-5 font-bold" />
                Sign Out
              </button>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <div className="flex-1 flex flex-col h-full overflow-hidden">
        <header className="h-16 border-b border-slate-800 flex items-center justify-between px-6 bg-slate-950/50 backdrop-blur-sm relative z-30">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="p-2 hover:bg-slate-800 rounded-lg text-slate-400 transition-colors"
            >
              {isSidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
            <h2 className="font-bold text-white tracking-tight">
              {navItems.find(i => i.href === location.pathname)?.name || 'Dashboard'}
            </h2>
          </div>
          
          <div className="flex items-center gap-4">
            <button className="bg-brand-600 hover:bg-brand-500 text-white p-2 rounded-lg flex items-center gap-2 text-sm font-medium transition-all px-4">
              <Plus className="w-4 h-4" /> New Training
            </button>
            <div className="h-8 w-px bg-slate-800" />
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-slate-800 border border-slate-700 overflow-hidden flex items-center justify-center">
                {user.photoURL ? (
                  <img src={user.photoURL} alt={user.displayName || ''} />
                ) : (
                  <Bot className="w-4 h-4 text-brand-400" />
                )}
              </div>
              <span className="text-xs font-bold text-white hidden md:block">{profile?.displayName || 'Admin'}</span>
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto p-6 md:p-8 bg-slate-950 relative">
           <AnimatePresence mode="wait">
             <motion.div
               key={location.pathname}
               initial={{ opacity: 0, y: 10 }}
               animate={{ opacity: 1, y: 0 }}
               exit={{ opacity: 0, y: -10 }}
               transition={{ duration: 0.2 }}
               className="h-full"
             >
               {children}
             </motion.div>
           </AnimatePresence>
        </main>
      </div>
    </div>
  );
}
