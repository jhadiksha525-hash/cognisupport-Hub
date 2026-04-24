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
  Mail
} from 'lucide-react';
import { cn } from '../lib/utils';
import { motion, AnimatePresence } from 'motion/react';
import { useAuth } from '../lib/AuthContext';
import { auth } from '../lib/firebase';

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

  // Enforce email verification
  if (!user.emailVerified) {
    return (
      <div className="min-h-screen bg-bg flex items-center justify-center p-6 text-center font-sans">
        <div className="glass-card shadow-xl p-10 max-w-md border-border bg-surface">
          <Mail className="w-12 h-12 text-primary mx-auto mb-6" />
          <h2 className="text-2xl font-bold mb-4 text-text-main tracking-tight">Please verify your email</h2>
          <p className="text-text-muted mb-8 text-sm leading-relaxed">
            You need to verify your email address <strong>({user.email})</strong> before you can access the dashboard.
            If you just verified it, please refresh this page.
          </p>
          <div className="space-y-4">
            <button 
              onClick={async () => {
                await auth.currentUser?.reload();
                window.location.reload();
              }}
              className="btn-primary w-full py-3 shadow-lg shadow-primary/20"
            >
              I've verified my email
            </button>
            <button 
              onClick={() => signOut()}
              className="w-full text-text-muted hover:text-primary text-sm font-bold transition-colors"
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
    { name: 'Conversations', icon: MessageSquare, href: '/dashboard/conversations' },
    { name: 'Widget Config', icon: Settings, href: '/dashboard/widget' },
    { name: 'Analytics', icon: BarChart3, href: '/dashboard/analytics' },
  ];

  return (
    <div className="flex h-screen bg-surface overflow-hidden text-text-main font-sans">
      {/* Sidebar */}
      <AnimatePresence mode="wait">
        {isSidebarOpen && (
          <motion.aside
            initial={{ x: -280, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -280, opacity: 0 }}
            transition={{ type: 'spring', damping: 25, stiffness: 120 }}
            className="w-72 bg-bg border-r border-border flex flex-col z-40 fixed md:relative h-full"
          >
            <div className="p-6">
              <Link to="/" className="flex items-center gap-2 mb-8 group">
                <div className="bg-primary p-1.5 rounded-lg shadow-lg shadow-primary/20">
                   <Bot className="w-6 h-6 text-white" />
                </div>
                <span className="font-display font-bold text-xl text-text-main tracking-tight">CogniSupport</span>
              </Link>

              <div className="space-y-1">
                {navItems.map((item) => (
                  <Link
                    key={item.href}
                    to={item.href}
                    className={cn(
                      "flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-bold transition-all group",
                      location.pathname === item.href 
                        ? "bg-primary text-white shadow-lg shadow-primary/20" 
                        : "text-text-muted hover:text-primary hover:bg-primary/5"
                    )}
                  >
                    <item.icon className={cn("w-5 h-5", location.pathname === item.href ? "text-white" : "text-text-muted group-hover:text-primary")} />
                    {item.name}
                  </Link>
                ))}
              </div>
            </div>

            <div className="mt-auto p-4 border-t border-border">
              <div className="bg-surface border border-border rounded-xl p-4 mb-4 shadow-sm">
                <p className="text-[10px] uppercase tracking-widest text-text-muted font-bold mb-2">Current Organization</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center font-bold text-white shadow-inner">
                    T
                  </div>
                  <div className="flex-1 overflow-hidden">
                    <p className="text-sm font-bold text-text-main truncate">The Tech Corp</p>
                    <p className="text-[10px] text-text-muted">Owner</p>
                  </div>
                  <ChevronRight className="w-4 h-4 text-border" />
                </div>
              </div>
              
              <button 
                onClick={() => signOut()}
                className="flex items-center gap-3 px-4 py-3 w-full rounded-lg text-sm font-bold text-text-muted hover:text-error hover:bg-error/5 transition-all"
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
        <header className="h-16 border-b border-border flex items-center justify-between px-6 bg-surface/80 backdrop-blur-md relative z-30">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="p-2 hover:bg-bg rounded-lg text-text-muted transition-colors"
            >
              {isSidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
            <h2 className="font-bold text-text-main tracking-tight text-lg">
              {navItems.find(i => i.href === location.pathname)?.name || 'Dashboard'}
            </h2>
          </div>
          
          <div className="flex items-center gap-4">
            <button className="bg-primary hover:bg-primary-hover text-white p-2 rounded-lg flex items-center gap-2 text-sm font-bold transition-all px-4 h-10 shadow-lg shadow-primary/10">
              <Plus className="w-4 h-4" /> New Training
            </button>
            <div className="h-6 w-px bg-border" />
            <div className="flex items-center gap-3 font-medium">
              <div className="w-8 h-8 rounded-full bg-bg border border-border overflow-hidden flex items-center justify-center">
                {user.photoURL ? (
                  <img src={user.photoURL} alt={user.displayName || ''} />
                ) : (
                  <Bot className="w-4 h-4 text-primary" />
                )}
              </div>
              <span className="text-xs font-bold text-text-main hidden md:block">{profile?.displayName || 'Admin'}</span>
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto p-6 md:p-8 bg-bg relative">
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
