import { useState } from 'react';
import { motion } from 'motion/react';
import { TrendingUp, Mail, Lock, User, Github, Chrome, CheckCircle2 } from 'lucide-react';
import { User as UserType } from '../types';

interface AuthProps {
  onLogin: (user: UserType) => void;
  onNavigate: (page: 'login' | 'register' | 'landing') => void;
  initialView: 'login' | 'register';
}

export default function AuthPages({ onLogin, onNavigate, initialView }: AuthProps) {
  const [view, setView] = useState<'login' | 'register'>(initialView);
  const [loading, setLoading] = useState(false);
  const [showForgot, setShowForgot] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      onLogin({
        id: '1',
        name: 'Demo User',
        email: 'demo@tradebotai.com',
        portfolioValue: 245670,
        todayPnL: 3240,
        winRate: 67
      });
      setLoading(false);
    }, 1500);
  };

  const strength = 75; // Simulated password strength

  return (
    <div className="min-h-screen bg-brand-bg flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background blobs */}
      <div className="absolute top-0 -left-20 w-96 h-96 bg-brand-primary/10 rounded-full blur-[100px] animate-pulse"></div>
      <div className="absolute bottom-0 -right-20 w-96 h-96 bg-brand-success/5 rounded-full blur-[100px] animate-pulse"></div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md bg-brand-card border border-brand-border rounded-2xl shadow-2xl p-8 relative z-10"
      >
        <div className="flex flex-col items-center mb-8">
          <div className="w-12 h-12 rounded-xl bg-brand-primary flex items-center justify-center mb-4">
            <TrendingUp size={28} className="text-white" />
          </div>
          <h1 className="text-2xl font-bold">{view === 'login' ? 'Welcome Back' : 'Create Account'}</h1>
          <p className="text-brand-text-secondary text-sm mt-2">
            {view === 'login' ? 'Enter your credentials to continue' : 'Start your algo trading journey today'}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          {view === 'register' && (
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-brand-text-secondary">Full Name</label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 text-brand-text-secondary" size={18} />
                <input 
                  type="text" required
                  placeholder="Enter your name"
                  className="w-full bg-brand-bg border border-brand-border rounded-xl py-3 pl-10 pr-4 focus:ring-2 focus:ring-brand-primary/50 transition-all outline-none"
                />
              </div>
            </div>
          )}

          <div className="space-y-1.5">
            <label className="text-sm font-medium text-brand-text-secondary">Email Address</label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-brand-text-secondary" size={18} />
              <input 
                type="email" required
                defaultValue="demo@tradebotai.com"
                placeholder="you@example.com"
                className="w-full bg-brand-bg border border-brand-border rounded-xl py-3 pl-10 pr-4 focus:ring-2 focus:ring-brand-primary/50 transition-all outline-none"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <div className="flex justify-between items-center">
              <label className="text-sm font-medium text-brand-text-secondary">Password</label>
              {view === 'login' && (
                <button type="button" onClick={() => setShowForgot(true)} className="text-xs text-brand-primary hover:underline">Forgot password?</button>
              )}
            </div>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-brand-text-secondary" size={18} />
              <input 
                type="password" required
                defaultValue="Demo@1234"
                placeholder="••••••••"
                className="w-full bg-brand-bg border border-brand-border rounded-xl py-3 pl-10 pr-4 focus:ring-2 focus:ring-brand-primary/50 transition-all outline-none"
              />
            </div>
            {view === 'register' && (
              <div className="pt-2">
                <div className="flex justify-between text-[10px] text-brand-text-secondary mb-1">
                  <span>Password Strength</span>
                  <span className="text-brand-success font-medium">Strong</span>
                </div>
                <div className="h-1 w-full bg-brand-border rounded-full overflow-hidden">
                  <div className="h-full bg-brand-success" style={{ width: `${strength}%` }}></div>
                </div>
              </div>
            )}
          </div>

          {view === 'login' && (
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" className="w-4 h-4 rounded border-brand-border bg-brand-bg text-brand-primary focus:ring-brand-primary" />
              <span className="text-sm text-brand-text-secondary">Remember me for 30 days</span>
            </label>
          )}

          {view === 'register' && (
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" required className="w-4 h-4 rounded border-brand-border bg-brand-bg text-brand-primary focus:ring-brand-primary" />
              <span className="text-sm text-brand-text-secondary">I agree to the <span className="text-brand-primary underline">Terms & Conditions</span></span>
            </label>
          )}

          <button 
            type="submit" disabled={loading}
            className="w-full bg-brand-primary hover:bg-brand-primary/90 text-white font-semibold py-3 rounded-xl transition-all flex items-center justify-center gap-2"
          >
            {loading ? (
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
            ) : (
              view === 'login' ? 'Sign In' : 'Create Account'
            )}
          </button>
        </form>

        <div className="mt-8">
          <div className="relative mb-6">
            <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-brand-border"></div></div>
            <div className="relative flex justify-center text-xs uppercase"><span className="bg-brand-card px-2 text-brand-text-secondary">Or continue with</span></div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <button className="flex items-center justify-center gap-2 px-4 py-2 border border-brand-border rounded-xl hover:bg-brand-border transition-colors">
              <Chrome size={18} />
              <span className="text-sm">Google</span>
            </button>
            <button className="flex items-center justify-center gap-2 px-4 py-2 border border-brand-border rounded-xl hover:bg-brand-border transition-colors">
              <Github size={18} />
              <span className="text-sm">GitHub</span>
            </button>
          </div>
        </div>

        <p className="text-center mt-8 text-sm text-brand-text-secondary">
          {view === 'login' ? "Don't have an account?" : "Already have an account?"} {' '}
          <button 
            onClick={() => setView(view === 'login' ? 'register' : 'login')}
            className="text-brand-primary font-semibold hover:underline"
          >
            {view === 'login' ? 'Register here' : 'Sign In'}
          </button>
        </p>

        {view === 'login' && (
          <div className="mt-6 p-4 bg-brand-primary/10 border border-brand-primary/20 rounded-xl">
             <p className="text-xs text-brand-primary font-bold uppercase tracking-wider mb-1">Demo Credentials</p>
             <p className="text-sm text-brand-text-primary">Email: demo@tradebotai.com</p>
             <p className="text-sm text-brand-text-primary">Password: Demo@1234</p>
          </div>
        )}
      </motion.div>

      {/* Forgot Password Modal */}
      {showForgot && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="bg-brand-card border border-brand-border p-8 rounded-2xl max-w-sm w-full">
            <div className="w-12 h-12 rounded-full bg-brand-primary/20 flex items-center justify-center mb-4 mx-auto">
              <Mail className="text-brand-primary" size={24} />
            </div>
            <h2 className="text-xl font-bold text-center mb-2">Reset Password</h2>
            <p className="text-brand-text-secondary text-sm text-center mb-6">Enter your email and we'll send you a link to reset your password.</p>
            <input type="email" placeholder="Email address" className="w-full bg-brand-bg border border-brand-border rounded-xl py-3 px-4 outline-none focus:ring-2 focus:ring-brand-primary mb-4" />
            <div className="flex gap-3">
              <button onClick={() => setShowForgot(false)} className="flex-1 py-3 border border-brand-border rounded-xl hover:bg-brand-border transition-colors">Cancel</button>
              <button disabled className="flex-1 py-3 bg-brand-primary rounded-xl font-semibold opacity-50 cursor-not-allowed">Reset</button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}
