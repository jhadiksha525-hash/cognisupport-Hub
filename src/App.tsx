import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './lib/AuthContext';
import { auth } from './lib/firebase';
import Navigation from './components/Navigation';
import Footer from './components/Footer';
import { Mail } from 'lucide-react';
import Home from './pages/Home';
import About from './pages/About';
import Founders from './pages/Founders';
import Contact from './pages/Contact';
import ChatWidget from './components/ChatWidget';
import DashboardLayout from './components/DashboardLayout';
import Overview from './pages/dashboard/Overview';
import Documents from './pages/dashboard/Documents';
import Conversations from './pages/dashboard/Conversations';
import WidgetConfig from './pages/dashboard/WidgetConfig';
import Analytics from './pages/dashboard/Analytics';
import { Link } from 'react-router-dom';

export default function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen flex flex-col">
          <ConditionalNavigation />
          <main className="flex-1">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/founders" element={<Founders />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/sign-in" element={<SignIn />} />
              <Route path="/sign-up" element={<SignUp />} />

              {/* Dashboard Routes */}
              <Route path="/dashboard" element={<DashboardLayout children={<Overview />} />} />
              <Route path="/dashboard/documents" element={<DashboardLayout children={<Documents />} />} />
              <Route path="/dashboard/conversations" element={<DashboardLayout children={<Conversations />} />} />
              <Route path="/dashboard/widget" element={<DashboardLayout children={<WidgetConfig />} />} />
              <Route path="/dashboard/analytics" element={<DashboardLayout children={<Analytics />} />} />

              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </main>
          <ConditionalFooter />
          <ChatWidget />
        </div>
      </Router>
    </AuthProvider>
  );
}

function ConditionalNavigation() {
  const isDashboard = window.location.pathname.startsWith('/dashboard');
  if (isDashboard) return null;
  return <Navigation />;
}

function ConditionalFooter() {
  const isDashboard = window.location.pathname.startsWith('/dashboard');
  if (isDashboard) return null;
  return <Footer />;
}

function SignIn() {
  const { signInWithGoogle, signInWithEmail, user } = useAuth();
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  useEffect(() => {
    if (user && user.emailVerified) window.location.pathname = '/dashboard';
    else if (user && !user.emailVerified) window.location.pathname = '/dashboard'; // Gate handles it
  }, [user]);

  const handleEmailSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await signInWithEmail(email, pass);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="pt-40 flex items-center justify-center px-6 pb-20 bg-bg min-h-screen">
      <div className="glass-card p-10 w-full max-w-md bg-surface border border-border shadow-2xl rounded-3xl">
        <h2 className="text-3xl font-bold mb-2 text-center text-text-main tracking-tighter">Welcome Back</h2>
        <p className="text-text-muted mb-8 text-center text-sm font-medium">Sign in to manage your AI assistant.</p>
        
        {error && (
          <div className="mb-6 p-4 bg-error/5 border border-error/10 text-error text-xs rounded-xl font-bold">
            {error}
          </div>
        )}

        <form onSubmit={handleEmailSignIn} className="space-y-4 mb-6">
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-widest text-text-muted ml-1">Email Address</label>
            <input 
              type="email" 
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-bg border border-border rounded-xl px-4 py-3 text-text-main focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all placeholder:text-text-muted/50" 
              placeholder="name@company.com"
            />
          </div>
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-widest text-text-muted ml-1">Password</label>
            <input 
              type="password" 
              required
              value={pass}
              onChange={(e) => setPass(e.target.value)}
              className="w-full bg-bg border border-border rounded-xl px-4 py-3 text-text-main focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all placeholder:text-text-muted/50" 
              placeholder="••••••••"
            />
          </div>
          <button 
            type="submit" 
            disabled={loading}
            className="btn-primary w-full py-4 disabled:opacity-50 font-bold shadow-xl shadow-primary/20"
          >
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>

        <div className="relative my-8">
          <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-border"></div></div>
          <div className="relative flex justify-center text-[10px] tracking-widest uppercase font-bold"><span className="bg-surface px-4 text-text-muted">Or continue with</span></div>
        </div>

        <button 
          onClick={signInWithGoogle}
          className="btn-secondary w-full py-3.5 flex items-center justify-center gap-3 mb-8 bg-surface border-border text-text-muted hover:text-primary hover:border-primary font-bold shadow-sm"
        >
          <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" className="w-5 h-5" alt="Google" />
          Google Account
        </button>

        <p className="text-center text-sm text-text-muted font-medium">
          Don't have an account? <Link to="/sign-up" className="text-primary hover:underline font-bold">Create Account</Link>
        </p>
      </div>
    </div>
  );
}

function SignUp() {
  const { signInWithGoogle, signUpWithEmail, user } = useAuth();
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  const [confirmPass, setConfirmPass] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  useEffect(() => {
    if (user && user.emailVerified) window.location.pathname = '/dashboard';
  }, [user]);

  const handleEmailSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (pass !== confirmPass) {
      setError('Passwords do not match');
      return;
    }

    setLoading(true);
    try {
      await signUpWithEmail(email, pass, name);
      setSent(true);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (sent) {
    return (
      <div className="pt-40 flex items-center justify-center px-6 pb-20 bg-bg min-h-screen">
        <div className="glass-card p-10 w-full max-w-md text-center bg-surface border border-border shadow-2xl rounded-3xl">
          <div className="w-20 h-20 bg-bg border border-border rounded-full flex items-center justify-center mx-auto mb-6 shadow-inner">
            <Mail className="w-10 h-10 text-primary" />
          </div>
          <h2 className="text-3xl font-bold mb-4 text-text-main tracking-tighter">Verify your email</h2>
          <p className="text-text-muted mb-8 font-medium">
            We've sent a verification link to <strong className="text-text-main">{email}</strong>. 
            Please check your inbox and verify your account to continue.
          </p>
          <div className="space-y-4">
            <button 
              onClick={async () => {
                await auth.currentUser?.reload();
                window.location.reload();
              }}
              className="btn-primary w-full py-4 font-bold shadow-xl shadow-primary/20"
            >
              I've verified my email
            </button>
            <Link to="/sign-in" className="btn-secondary block w-full py-3.5 bg-bg border-border text-text-muted hover:text-primary font-bold">
              Back to Sign In
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-40 flex items-center justify-center px-6 pb-20 bg-bg min-h-screen">
      <div className="glass-card p-10 w-full max-w-md bg-surface border border-border shadow-2xl rounded-3xl">
        <h2 className="text-3xl font-bold mb-2 text-center text-text-main tracking-tighter">Create Account</h2>
        <p className="text-text-muted mb-8 text-center text-sm font-medium">Join CogniSupport Hub today.</p>

        {error && (
          <div className="mb-6 p-4 bg-error/5 border border-error/10 text-error text-xs rounded-xl font-bold">
            {error}
          </div>
        )}

        <form onSubmit={handleEmailSignUp} className="space-y-4 mb-6">
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-widest text-text-muted ml-1">Full Name</label>
            <input 
              type="text" 
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full bg-bg border border-border rounded-xl px-4 py-3 text-text-main focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all placeholder:text-text-muted/50" 
              placeholder="John Doe"
            />
          </div>
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-widest text-text-muted ml-1">Email Address</label>
            <input 
              type="email" 
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-bg border border-border rounded-xl px-4 py-3 text-text-main focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all placeholder:text-text-muted/50" 
              placeholder="name@company.com"
            />
          </div>
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-widest text-text-muted ml-1">Password</label>
            <input 
              type="password" 
              required
              minLength={6}
              value={pass}
              onChange={(e) => setPass(e.target.value)}
              className="w-full bg-bg border border-border rounded-xl px-4 py-3 text-text-main focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all placeholder:text-text-muted/50" 
              placeholder="Min 6 characters"
            />
          </div>
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-widest text-text-muted ml-1">Confirm Password</label>
            <input 
              type="password" 
              required
              value={confirmPass}
              onChange={(e) => setConfirmPass(e.target.value)}
              className="w-full bg-bg border border-border rounded-xl px-4 py-3 text-text-main focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all placeholder:text-text-muted/50" 
              placeholder="Repeat password"
            />
          </div>
          <button 
            type="submit" 
            disabled={loading}
            className="btn-primary w-full py-4 disabled:opacity-50 font-bold shadow-xl shadow-primary/20"
          >
            {loading ? 'Creating account...' : 'Create Account'}
          </button>
        </form>

        <div className="relative my-8">
          <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-border"></div></div>
          <div className="relative flex justify-center text-[10px] tracking-widest uppercase font-bold"><span className="bg-surface px-4 text-text-muted">Or continue with</span></div>
        </div>

        <button 
          onClick={signInWithGoogle}
          className="btn-secondary w-full py-3.5 flex items-center justify-center gap-3 mb-8 bg-surface border-border text-text-muted hover:text-primary hover:border-primary font-bold shadow-sm"
        >
          <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" className="w-5 h-5" alt="Google" />
          Google Account
        </button>

        <p className="text-center text-sm text-text-muted font-medium">
          Already have an account? <Link to="/sign-in" className="text-primary hover:underline font-bold">Sign in</Link>
        </p>
      </div>
    </div>
  );
}



