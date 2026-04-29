import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../lib/AuthContext';

export default function SignIn() {
  const { signInWithGoogle, signInWithEmail, user } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  useEffect(() => {
    if (user) {
      navigate('/dashboard', { replace: true });
    }
  }, [user, navigate]);

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
