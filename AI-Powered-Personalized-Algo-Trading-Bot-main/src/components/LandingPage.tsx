import { motion } from 'motion/react';
import { 
  TrendingUp, 
  Zap, 
  Shield, 
  Eye, 
  ChevronRight, 
  Star, 
  CheckCircle2, 
  Play
} from 'lucide-react';

interface LandingProps {
  onStart: () => void;
  onLogin: () => void;
}

export default function LandingPage({ onStart, onLogin }: LandingProps) {
  return (
    <div className="bg-brand-bg text-brand-text-primary selection:bg-brand-primary/30">
      {/* Navbar */}
      <nav className="h-20 flex items-center justify-between px-6 md:px-12 fixed w-full top-0 z-50 bg-brand-bg/80 backdrop-blur-md border-b border-brand-border">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-xl bg-brand-primary flex items-center justify-center">
            <TrendingUp size={24} className="text-white" />
          </div>
          <span className="font-bold text-2xl tracking-tighter">TradeBot AI</span>
        </div>
        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-brand-text-secondary">
          <a href="#features" className="hover:text-brand-text-primary transition-colors">Features</a>
          <a href="#how-it-works" className="hover:text-brand-text-primary transition-colors">How it Works</a>
          <a href="#pricing" className="hover:text-brand-text-primary transition-colors">Pricing</a>
        </div>
        <div className="flex items-center gap-4">
          <button onClick={onLogin} className="px-5 py-2 text-sm font-semibold hover:text-brand-primary transition-colors">Sign In</button>
          <button onClick={onStart} className="px-6 py-2.5 bg-brand-primary hover:bg-brand-primary/90 text-white rounded-xl font-bold transition-all shadow-lg shadow-brand-primary/20 text-sm">
            Get Started
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-40 pb-20 px-6 overflow-hidden">
        {/* Background Blobs */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-brand-primary/10 rounded-full blur-[120px] -z-10"></div>
        
        <div className="max-w-5xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-primary/10 border border-brand-primary/20 text-brand-primary text-xs font-bold uppercase tracking-wider mb-8"
          >
            <Zap size={14} />
            <span>AI-Powered Strategy Builder</span>
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-7xl font-black tracking-tight leading-[1.1] mb-6"
          >
           Your AI Trading Bot, <br />
           <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-primary to-brand-success">
             Built in Plain English
           </span>
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-lg md:text-xl text-brand-text-secondary max-w-2xl mx-auto mb-10 leading-relaxed"
          >
            Describe your trading strategy like you're talking to a friend. <br className="hidden md:block" /> 
            Our AI converts it into production-ready code for 50+ Indian brokers.
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <button onClick={onStart} className="w-full sm:w-auto px-8 py-4 bg-brand-primary hover:bg-brand-primary/90 text-white rounded-2xl font-bold text-lg transition-all flex items-center justify-center gap-2 shadow-2xl shadow-brand-primary/30 group">
              Get Started Free
              <ChevronRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </button>
            <button className="w-full sm:w-auto px-8 py-4 bg-brand-card hover:bg-brand-border border border-brand-border text-brand-text-primary rounded-2xl font-bold text-lg transition-all flex items-center justify-center gap-2">
              <Play size={20} fill="currentColor" />
              Watch Demo
            </button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="mt-16 flex items-center justify-center gap-8 grayscale opacity-50"
          >
            <span className="text-xl font-bold tracking-widest text-brand-text-secondary">ZERODHA</span>
            <span className="text-xl font-bold tracking-widest text-brand-text-secondary">GROWW</span>
            <span className="text-xl font-bold tracking-widest text-brand-text-secondary">UPSTOX</span>
            <span className="text-xl font-bold tracking-widest text-brand-text-secondary">ANGELONE</span>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24 px-6 bg-brand-card/30 border-y border-brand-border">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Everything you need to automate.</h2>
            <p className="text-brand-text-secondary">Enterprise-grade tools, now accessible to every retail trader.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { title: 'NLP Bot Builder', desc: 'No coding required. Write your logic in simple English and see it live in seconds.', icon: Zap, color: 'bg-brand-primary' },
              { title: 'Broker Integration', desc: 'Securely connect with top Indian brokers through official APIs with zero latency.', icon: Shield, color: 'bg-brand-success' },
              { title: 'Full Transparency', desc: 'Real-time logs, backtest audits, and granular risk controls for every execution.', icon: Eye, color: 'bg-amber-500' }
            ].map((feature, i) => (
              <div key={i} className="p-8 bg-brand-card border border-brand-border rounded-3xl hover:border-brand-primary/50 transition-all group">
                <div className={`w-14 h-14 ${feature.color} rounded-2xl flex items-center justify-center mb-6 shadow-xl group-hover:scale-110 transition-transform`}>
                  <feature.icon className="text-white" size={28} />
                </div>
                <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                <p className="text-brand-text-secondary leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-24 px-6 overflow-hidden relative">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Simple, Transparent Pricing</h2>
            <p className="text-brand-text-secondary">Choose the plan that fits your trading size.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              { name: 'Free', price: '₹0', desc: 'For beginners', features: ['1 Active Bot', '5 Daily Trades', 'Email Support', 'Basic Backtesting'], cta: 'Start Free', popular: false },
              { name: 'Pro', price: '₹999', desc: 'For active traders', features: ['10 Active Bots', 'Unlimited Trades', 'WhatsApp Alerts', 'Advanced Backtesting', 'Priority Execution'], cta: 'Upgrade to Pro', popular: true },
              { name: 'Enterprise', price: '₹4999', desc: 'For power users', features: ['Unlimited Bots', 'Dedicated RM', 'Custom API Access', 'Portfolio Hedging', 'VIP Support'], cta: 'Contact Sales', popular: false }
            ].map((plan, i) => (
              <div key={i} className={`p-8 rounded-3xl border flex flex-col ${plan.popular ? 'bg-brand-card border-brand-primary scale-105 z-10 shadow-2xl shadow-brand-primary/10' : 'bg-brand-card border-brand-border mt-4 mb-4'}`}>
                {plan.popular && <span className="self-start px-3 py-1 bg-brand-primary text-[10px] font-bold uppercase rounded-full mb-4">Most Popular</span>}
                <h3 className="text-xl font-bold mb-1">{plan.name}</h3>
                <p className="text-xs text-brand-text-secondary mb-6">{plan.desc}</p>
                <div className="flex items-baseline gap-1 mb-8">
                  <span className="text-4xl font-bold">{plan.price}</span>
                  <span className="text-brand-text-secondary">/mo</span>
                </div>
                <div className="space-y-4 mb-10 flex-1">
                  {plan.features.map(f => (
                    <div key={f} className="flex items-center gap-3 text-sm">
                      <CheckCircle2 size={18} className="text-brand-success shrink-0" />
                      <span>{f}</span>
                    </div>
                  ))}
                </div>
                <button 
                  onClick={onStart}
                  className={`w-full py-4 rounded-xl font-bold transition-all ${plan.popular ? 'bg-brand-primary text-white hover:bg-brand-primary/90 shadow-lg shadow-brand-primary/20' : 'bg-brand-bg border border-brand-border hover:bg-brand-border'}`}
                >
                  {plan.cta}
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-20 px-6 bg-brand-card/50 border-t border-brand-border">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center gap-2 mb-6">
                <div className="w-8 h-8 rounded-lg bg-brand-primary flex items-center justify-center">
                  <TrendingUp size={20} className="text-white" />
                </div>
                <span className="font-bold text-xl">TradeBot AI</span>
              </div>
              <p className="text-brand-text-secondary max-w-sm mb-6 leading-relaxed">
                Empowering Indian retail traders with institutional-grade automation tools and deep market insights.
              </p>
              <div className="flex gap-4">
                {[1,2,3,4].map(i => <div key={i} className="w-10 h-10 rounded-full bg-brand-bg border border-brand-border hover:border-brand-primary transition-colors cursor-pointer"></div>)}
              </div>
            </div>
            <div>
              <h4 className="font-bold mb-6">Platform</h4>
              <ul className="space-y-4 text-sm text-brand-text-secondary">
                <li className="hover:text-brand-text-primary cursor-pointer transition-colors">Bot Builder</li>
                <li className="hover:text-brand-text-primary cursor-pointer transition-colors">Integrations</li>
                <li className="hover:text-brand-text-primary cursor-pointer transition-colors">Backtesting</li>
                <li className="hover:text-brand-text-primary cursor-pointer transition-colors">Pricing</li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-6">Company</h4>
              <ul className="space-y-4 text-sm text-brand-text-secondary">
                <li className="hover:text-brand-text-primary cursor-pointer transition-colors">About Us</li>
                <li className="hover:text-brand-text-primary cursor-pointer transition-colors">Blog</li>
                <li className="hover:text-brand-text-primary cursor-pointer transition-colors">Careers</li>
                <li className="hover:text-brand-text-primary cursor-pointer transition-colors">Contact</li>
              </ul>
            </div>
          </div>
          <div className="pt-8 border-t border-brand-border flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-brand-text-secondary opacity-60">
            <p>© 2026 TradeBot AI. All rights reserved.</p>
            <div className="flex gap-6">
              <span>Privacy Policy</span>
              <span>Terms of Service</span>
              <span>Cookie Policy</span>
            </div>
          </div>
          <div className="mt-8 p-6 bg-brand-bg border border-brand-border rounded-2xl text-[10px] text-brand-text-secondary leading-relaxed uppercase tracking-wider text-center font-medium">
             Trading in financial markets involves risk. This platform is for educational and simulation purposes only. Past performance does not guarantee future results. Please consult a SEBI-registered advisor before investing.
          </div>
        </div>
      </footer>
    </div>
  );
}
