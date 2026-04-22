import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './lib/AuthContext';
import Navigation from './components/Navigation';
import Footer from './components/Footer';
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
  const { signInWithGoogle, user } = useAuth();
  
  React.useEffect(() => {
    if (user) window.location.pathname = '/dashboard';
  }, [user]);

  return (
    <div className="pt-40 flex items-center justify-center px-6 pb-20">
      <div className="glass-card p-10 w-full max-w-md text-center">
        <h2 className="text-3xl font-bold mb-2">Welcome Back</h2>
        <p className="text-slate-400 mb-8">Sign in to manage your AI assistant.</p>
        <button 
          onClick={signInWithGoogle}
          className="btn-primary w-full py-3 mb-4 flex items-center justify-center gap-2"
        >
          <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" className="w-5 h-5 bg-white rounded-full" alt="Google" />
          Sign In with Google
        </button>
        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-slate-800"></div></div>
          <div className="relative flex justify-center text-xs uppercase"><span className="bg-slate-900 px-2 text-slate-500">Secure Authentication</span></div>
        </div>
        <p className="text-xs text-slate-500">
          Powered by Firebase Authentication
        </p>
      </div>
    </div>
  );
}

function SignUp() {
  const { signInWithGoogle, user } = useAuth();

  React.useEffect(() => {
    if (user) window.location.pathname = '/dashboard';
  }, [user]);

  return (
    <div className="pt-40 flex items-center justify-center px-6 pb-20">
      <div className="glass-card p-10 w-full max-w-md text-center">
        <h2 className="text-3xl font-bold mb-2">Create Account</h2>
        <p className="text-slate-400 mb-8">Start your free trial today with a single click.</p>
        <button 
          onClick={signInWithGoogle}
          className="btn-primary w-full py-3 flex items-center justify-center gap-2"
        >
          <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" className="w-5 h-5 bg-white rounded-full" alt="Google" />
          Sign Up with Google
        </button>
        <p className="text-xs text-slate-500 mt-6">
          By signing up, you agree to our Terms and Privacy Policy.
        </p>
      </div>
    </div>
  );
}


