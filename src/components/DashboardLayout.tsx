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
  Plus,
  Mail,
  CheckCircle2
} from 'lucide-react';
import { cn } from '../lib/utils';
import { motion, AnimatePresence } from 'motion/react';
import { useAuth } from '../lib/AuthContext';
import { auth } from '../lib/firebase';
import LoadingScreen from './LoadingScreen';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, profile, signOut } = useAuth();

  // Redirect if not logged in
  useEffect(() => {
    if (!user) {
       navigate('/sign-in');
    }
  }, [user, navigate]);

  if (!user) return <LoadingScreen />;

  // Enforce email verification
  if (!user.emailVerified) {
    return (
      <div className="min-h-screen flex items-center justify-center p-6 text-center font-sans">
        <div className="glass-card shadow-xl p-10 max-w-md border-white/5 bg-white/5 backdrop-blur-xl">
          <Mail className="w-12 h-12 text-primary mx-auto mb-6" />
          <h2 className="text-2xl font-bold mb-4 text-white tracking-tight">Please verify your email</h2>
          <p className="text-white/60 mb-8 text-sm leading-relaxed">
            You need to verify your email address <strong>({user.email})</strong> before you can access the dashboard.
            If you just verified it, please refresh this page.
          </p>
          <div className="space-y-4">
            <button 
              onClick={async () => {
                await auth.currentUser?.reload();
                window.location.reload();
              }}
              className="btn-primary w-full py-3"
            >
              I've verified my email
            </button>
            <button 
              onClick={() => signOut()}
              className="w-full text-white/40 hover:text-white text-sm font-bold transition-colors"
            >
              Sign out and use another account
            </button>
          </div>
        </div>
      </div>
    );
  }

  const navItems = [
    { name: 'Overview', icon: LayoutDashboard, href: '/dashboard' },
    { name: 'Knowledge Base', icon: FileText, href: '/dashboard/documents' },
    { name: 'Agent Inbox', icon: MessageSquare, href: '/dashboard/inbox' },
    { name: 'Widget Settings', icon: Settings, href: '/dashboard/widget' },
    { name: 'Analytics', icon: BarChart3, href: '/dashboard/analytics' },
  ];

  return (
    <div className="flex h-screen overflow-hidden text-text-main font-sans">
      {/* Sidebar */}
      <AnimatePresence mode="wait">
        {isSidebarOpen && (
          <motion.aside
            initial={{ x: -280, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -280, opacity: 0 }}
            transition={{ type: 'spring', damping: 25, stiffness: 120 }}
            className="w-72 bg-[#0B1020]/95 backdrop-blur-xl border-r border-white/10 flex flex-col z-40 fixed md:relative h-full"
          >
            <div className="p-6">
              <Link to="/" className="flex items-center gap-2 mb-8 group">
                <div className="bg-gradient-to-br from-primary to-accent p-1.5 rounded-lg shadow-lg shadow-primary/20">
                   <Bot className="w-6 h-6 text-white" />
                </div>
                <span className="font-display font-bold text-xl text-white tracking-tight">CiteSupport</span>
              </Link>

              <div className="space-y-1">
                {navItems.map((item) => (
                  <Link
                    key={item.href}
                    to={item.href}
                    className={cn(
                      "flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-bold transition-all group",
                      location.pathname === item.href 
                        ? "bg-white/10 text-white shadow-xl shadow-black/20 border border-white/10" 
                        : "text-white/40 hover:text-primary hover:bg-white/5"
                    )}
                  >
                    <item.icon className={cn("w-5 h-5", location.pathname === item.href ? "text-primary" : "text-white/40 group-hover:text-primary")} />
                    {item.name}
                  </Link>
                ))}
              </div>
            </div>

            <div className="mt-auto p-4 border-t border-white/10">
              <div className="relative group/org">
                <div className="bg-white/5 border border-white/10 rounded-xl p-4 mb-4 shadow-sm hover:border-primary transition-colors cursor-pointer">
                  <p className="text-[10px] uppercase tracking-widest text-white/40 font-bold mb-2">Current Organization</p>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center font-bold text-white shadow-inner">
                      {profile?.organization?.charAt(0) || 'T'}
                    </div>
                    <div className="flex-1 overflow-hidden">
                      <p className="text-sm font-bold text-white truncate">{profile?.organization || 'The Tech Corp'}</p>
                      <p className="text-[10px] text-white/40">Owner / Admin</p>
                    </div>
                    <ChevronRight className="w-4 h-4 text-white/20 group-hover/org:translate-x-1 transition-transform" />
                  </div>
                </div>
                
                {/* Simulated Org Switcher Popover */}
                <div className="absolute bottom-full left-0 w-full bg-[#0B1020] border border-white/10 rounded-xl shadow-2xl p-2 mb-2 opacity-0 pointer-events-none group-hover/org:opacity-100 group-hover/org:pointer-events-auto transition-all transform translate-y-2 group-hover/org:translate-y-0 z-50 backdrop-blur-xl">
                   <div className="p-2 border-b border-white/5 mb-1">
                      <p className="text-[10px] font-bold text-white/40 uppercase tracking-widest">Switch Organization</p>
                   </div>
                   <button className="w-full flex items-center gap-3 p-2 hover:bg-white/5 rounded-lg text-left transition-colors">
                      <div className="w-8 h-8 rounded bg-white/5 border border-white/10 flex items-center justify-center font-bold text-xs text-white/60">M</div>
                      <span className="text-xs font-bold text-white/80">Marketing Agency</span>
                   </button>
                   <button className="w-full flex items-center gap-3 p-2 hover:bg-white/5 rounded-lg text-left transition-colors">
                      <div className="w-8 h-8 rounded bg-primary text-white flex items-center justify-center font-bold text-xs">T</div>
                      <span className="text-xs font-bold text-white">The Tech Corp</span>
                      <CheckCircle2 className="w-3 h-3 text-primary ml-auto" />
                   </button>
                   <div className="p-2 border-t border-white/5 mt-1">
                      <button className="text-[10px] font-bold text-primary hover:underline flex items-center gap-1">
                         <Plus className="w-3 h-3" /> Create New Org
                      </button>
                   </div>
                </div>
              </div>
              
              <button 
                onClick={() => signOut()}
                className="flex items-center gap-3 px-4 py-3 w-full rounded-lg text-sm font-bold text-white/40 hover:text-error hover:bg-white/5 transition-all"
              >
                <LogOut className="w-5 h-5" />
                Sign Out
              </button>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <div className="flex-1 flex flex-col h-full overflow-hidden">
        <header className="h-16 border-b border-white/10 flex items-center justify-between px-6 bg-[#0B1020]/70 backdrop-blur-md relative z-30">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="p-2 hover:bg-white/5 rounded-lg text-white/40 transition-colors"
            >
              {isSidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
            <h2 className="font-bold text-white tracking-tight text-lg">
              {navItems.find(i => i.href === location.pathname)?.name || 'Dashboard'}
            </h2>
          </div>
          
          <div className="flex items-center gap-4">
            <button className="btn-primary flex items-center gap-2 text-sm px-4 h-10 shadow-lg shadow-primary/10">
              <Plus className="w-4 h-4" /> New Training
            </button>
            <div className="h-6 w-px bg-white/10" />
            <div className="flex items-center gap-3 font-medium">
              <div className="w-8 h-8 rounded-full bg-white/5 border border-white/10 overflow-hidden flex items-center justify-center">
                {user.photoURL ? (
                  <img src={user.photoURL} alt={user.displayName || ''} />
                ) : (
                  <Bot className="w-4 h-4 text-primary" />
                )}
              </div>
              <span className="text-xs font-bold text-white hidden md:block">{profile?.displayName || 'Admin'}</span>
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto p-6 md:p-8 relative">
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
