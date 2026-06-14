import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Zap, 
  ChevronRight, 
  CheckCircle2, 
  Settings2, 
  Activity, 
  Trash2, 
  PlayCircle, 
  Clock, 
  ShieldCheck, 
  Sparkles,
  RefreshCcw,
  Plus,
  TrendingUp,
  X
} from 'lucide-react';
import { Bot, BotStatus } from '../types';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface BotBuilderProps {
  onDeploy: (bot: Bot) => void;
}

export default function BotBuilder({ onDeploy }: BotBuilderProps) {
  const [step, setStep] = useState(1);
  const [description, setDescription] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [isBacktesting, setIsBacktesting] = useState(false);
  
  // Simulation of generated bot data
  const [config, setConfig] = useState({
    name: 'Momentum Scalper #01',
    strategyType: 'Momentum',
    assetClass: 'Equity',
    instruments: ['RELIANCE', 'TCS', 'INFY'],
    entry: 'RSI < 30 and Price > EMA(20)',
    exit: 'RSI > 70 or loss > 2%',
    risk: {
      maxLoss: 5000,
      stopLoss: 2,
      targetProfit: 5,
      positionSize: 10000,
      maxPositions: 5
    }
  });

  const handleGenerate = () => {
    if (!description.trim()) return;
    setIsGenerating(true);
    setTimeout(() => {
      setIsGenerating(false);
      setStep(2);
    }, 2000);
  };

  const handleBacktest = () => {
    setIsBacktesting(true);
    setTimeout(() => {
      setIsBacktesting(false);
      setStep(3);
    }, 2500);
  };

  const handleFinishDeploy = () => {
    onDeploy({
      id: Math.random().toString(36).substr(2, 9),
      name: config.name,
      strategyType: config.strategyType,
      status: 'active' as BotStatus,
      broker: 'Zerodha',
      capitalAllocated: config.risk.positionSize * 5,
      currentPnL: 0,
      tradesToday: 0,
      logs: [`[${new Date().toLocaleTimeString()}] Bot deployed successfully.`],
      createdAt: Date.now()
    });
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-12">
      {/* Stepper */}
      <div className="flex items-center justify-between px-4 sm:px-12 relative">
        <div className="absolute top-1/2 left-0 w-full h-0.5 bg-brand-border -translate-y-1/2 z-0"></div>
        {[1, 2, 3, 4].map((s) => (
          <div key={s} className="relative z-10 flex flex-col items-center gap-2">
            <div className={cn(
              "w-10 h-10 rounded-full flex items-center justify-center font-bold transition-all border-2",
              step === s ? "bg-brand-primary border-brand-primary text-white scale-110 shadow-lg shadow-brand-primary/20" : 
              step > s ? "bg-brand-success border-brand-success text-white" : "bg-brand-bg border-brand-border text-brand-text-secondary"
            )}>
              {step > s ? <CheckCircle2 size={20} /> : s}
            </div>
            <span className={cn(
              "text-[10px] sm:text-xs font-bold uppercase tracking-wider",
              step === s ? "text-brand-primary" : "text-brand-text-secondary"
            )}>
              {s === 1 ? 'Describe' : s === 2 ? 'Configure' : s === 3 ? 'Backtest' : 'Deploy'}
            </span>
          </div>
        ))}
      </div>

      <AnimatePresence mode="wait">
        {step === 1 && (
          <motion.div 
            key="step1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}
            className="bg-brand-card border border-brand-border rounded-3xl p-8 shadow-2xl"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-2xl bg-brand-primary/20 flex items-center justify-center text-brand-primary">
                <Sparkles size={28} />
              </div>
              <div>
                <h2 className="text-2xl font-bold">Describe Your Strategy</h2>
                <p className="text-brand-text-secondary text-sm">Tell us how you want to trade in plain English.</p>
              </div>
            </div>

            <div className="space-y-6">
              <div className="relative group">
                <textarea 
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="e.g., Buy Nifty 50 stocks when RSI drops below 30 and sell when it crosses 70. Max loss ₹5,000 per day."
                  className="w-full h-48 bg-brand-bg border border-brand-border rounded-2xl p-6 text-lg outline-none focus:ring-2 focus:ring-brand-primary/50 transition-all resize-none placeholder:text-brand-text-secondary/50"
                  disabled={isGenerating}
                ></textarea>
                <div className="absolute bottom-4 right-4 text-xs text-brand-text-secondary font-medium bg-brand-card/80 px-2 py-1 rounded backdrop-blur-sm">
                  AI processing powered by TradeBot LLM
                </div>
              </div>

              <div className="bg-brand-bg/50 border border-brand-border rounded-2xl p-6">
                <h4 className="text-xs font-bold text-brand-text-secondary uppercase tracking-widest mb-4">Try these examples:</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {[
                    "Invest ₹10,000 monthly in top 5 momentum stocks. Stop loss at 8%.",
                    "Sell RELIANCE if it breaks below yesterday's low on a 5min candle.",
                    "Buy whenever price is 5% away from its 200 DMA.",
                    "Scalp bank nifty options with a risk-reward of 1:2."
                  ].map((ex, i) => (
                    <button 
                      key={i} 
                      onClick={() => setDescription(ex)}
                      className="text-left p-3 text-sm bg-brand-card hover:bg-brand-border rounded-xl transition-colors border border-brand-border/50 text-brand-text-secondary hover:text-brand-text-primary"
                    >
                      "{ex}"
                    </button>
                  ))}
                </div>
              </div>

              <button 
                onClick={handleGenerate}
                disabled={isGenerating || !description.trim()}
                className="w-full bg-brand-primary hover:bg-brand-primary/90 text-white font-bold py-5 rounded-2xl transition-all flex items-center justify-center gap-3 shadow-xl shadow-brand-primary/20 disabled:opacity-50 disabled:cursor-not-allowed group"
              >
                {isGenerating ? <RefreshCcw className="animate-spin" /> : <Zap className="group-hover:scale-125 transition-transform" />}
                {isGenerating ? 'AI is analyzing your strategy...' : 'Generate AI Bot'}
              </button>
            </div>
          </motion.div>
        )}

        {step === 2 && (
          <motion.div 
            key="step2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            <div className="bg-brand-card border border-brand-border rounded-3xl p-8 shadow-xl">
              <div className="flex items-center justify-between mb-8 pb-6 border-b border-brand-border">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-brand-success/20 flex items-center justify-center text-brand-success">
                    <Settings2 size={24} />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold">Parameters Detected</h2>
                    <p className="text-xs text-brand-text-secondary">AI parsed your strategy into a functional config.</p>
                  </div>
                </div>
                <button onClick={() => setStep(1)} className="text-brand-text-secondary text-xs hover:text-brand-text-primary transition-colors hover:underline">Redefine Strategy</button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-6">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-brand-text-secondary uppercase tracking-widest">Bot Name</label>
                    <input 
                      type="text" 
                      value={config.name}
                      onChange={(e) => setConfig({...config, name: e.target.value})}
                      className="w-full bg-brand-bg border border-brand-border rounded-xl py-3 px-4 outline-none focus:ring-1 focus:ring-brand-primary"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-brand-text-secondary uppercase tracking-widest">Strategy Type</label>
                      <select className="w-full bg-brand-bg border border-brand-border rounded-xl py-3 px-4 outline-none">
                        <option>Momentum</option>
                        <option>Mean Reversion</option>
                        <option>Breakout</option>
                      </select>
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-brand-text-secondary uppercase tracking-widest">Asset Class</label>
                      <select className="w-full bg-brand-bg border border-brand-border rounded-xl py-3 px-4 outline-none">
                        <option>Equity</option>
                        <option>F&O</option>
                        <option>Crypto</option>
                      </select>
                    </div>
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-brand-text-secondary uppercase tracking-widest">Instruments</label>
                    <div className="flex flex-wrap gap-2 p-2 bg-brand-bg border border-brand-border rounded-xl min-h-[46px]">
                      {config.instruments.map(sym => (
                        <span key={sym} className="px-3 py-1 bg-brand-card border border-brand-border rounded-lg text-sm flex items-center gap-2 font-medium">
                          {sym}
                          <button onClick={() => setConfig({...config, instruments: config.instruments.filter(s => s !== sym)})} className="hover:text-brand-danger"><X size={14} /></button>
                        </span>
                      ))}
                      <button className="px-3 py-1 text-brand-primary hover:bg-brand-primary/10 rounded-lg text-sm font-bold flex items-center gap-1 transition-colors">
                        <Plus size={16} /> Add
                      </button>
                    </div>
                  </div>
                </div>

                <div className="space-y-6">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-brand-text-secondary uppercase tracking-widest">Risk Management</label>
                    <div className="bg-brand-bg p-6 rounded-2xl border border-brand-border space-y-6">
                       <div className="space-y-2">
                         <div className="flex justify-between text-sm font-medium">
                           <span>Max Loss / Day</span>
                           <span className="text-brand-danger">₹{config.risk.maxLoss}</span>
                         </div>
                         <input type="range" className="w-full accent-brand-primary" min="1000" max="50000" step="1000" defaultValue="5000" />
                       </div>
                       <div className="space-y-2">
                         <div className="flex justify-between text-sm font-medium">
                           <span>Stop Loss</span>
                           <span className="text-brand-danger">{config.risk.stopLoss}%</span>
                         </div>
                         <input type="range" className="w-full accent-brand-primary" min="0.5" max="10" step="0.5" defaultValue="2" />
                       </div>
                       <div className="space-y-2">
                         <div className="flex justify-between text-sm font-medium">
                           <span>Profit Target</span>
                           <span className="text-brand-success">{config.risk.targetProfit}%</span>
                         </div>
                         <input type="range" className="w-full accent-brand-primary" min="1" max="50" step="1" defaultValue="5" />
                       </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-12 flex gap-4">
                <button 
                  onClick={handleBacktest}
                  disabled={isBacktesting}
                  className="flex-1 bg-brand-primary hover:bg-brand-primary/90 text-white font-bold py-4 rounded-xl transition-all shadow-xl shadow-brand-primary/20 flex items-center justify-center gap-2 group"
                >
                  {isBacktesting ? <RefreshCcw className="animate-spin" size={20} /> : <PlayCircle className="group-hover:scale-110 transition-transform" size={20} />}
                  {isBacktesting ? 'Running Backtest...' : 'Run Backtest'}
                </button>
              </div>
            </div>
          </motion.div>
        )}

        {step === 3 && (
          <motion.div 
            key="step3" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}
            className="space-y-8"
          >
             <div className="bg-brand-card border border-brand-border rounded-3xl p-8 shadow-xl">
               <div className="flex items-center justify-between mb-8">
                 <h2 className="text-2xl font-bold flex items-center gap-3">
                   <Activity size={28} className="text-brand-primary" />
                   Backtest Report
                 </h2>
                 <div className="flex items-center gap-2 px-3 py-1 rounded-lg bg-brand-success/10 text-brand-success text-xs font-bold border border-brand-success/20">
                    <ShieldCheck size={14} /> AI Verified
                 </div>
               </div>

               <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4 mb-8">
                  {[
                    { label: 'Total Return', value: '+34.2%', plus: true },
                    { label: 'Max Drawdown', value: '-8.4%', plus: false },
                    { label: 'Sharpe Ratio', value: '1.87', plus: true },
                    { label: 'Win Rate', value: '63%', plus: true },
                    { label: 'Total Trades', value: '142', plus: null },
                    { label: 'Avg Trade', value: '₹420', plus: true },
                  ].map(stat => (
                    <div key={stat.label} className="p-4 bg-brand-bg rounded-2xl border border-brand-border text-center">
                      <p className="text-[10px] text-brand-text-secondary uppercase font-bold tracking-widest mb-1">{stat.label}</p>
                      <p className={cn("text-lg font-bold", stat.plus === true ? 'text-brand-success' : stat.plus === false ? 'text-brand-danger' : 'text-brand-text-primary')}>
                        {stat.value}
                      </p>
                    </div>
                  ))}
               </div>

               <div className="h-64 mb-8 bg-brand-bg rounded-2xl border border-brand-border flex items-center justify-center overflow-hidden relative">
                  <div className="absolute inset-0 opacity-10">
                    <svg viewBox="0 0 1000 200" className="w-full h-full preserve-aspect-ratio-none">
                      <path d="M0,150 Q100,20 200,80 T400,120 T600,40 T800,100 T1000,20" fill="none" stroke="#6366F1" strokeWidth="4" />
                    </svg>
                  </div>
                  <div className="flex flex-col items-center">
                    <Activity size={40} className="text-brand-primary/50 mb-2" />
                    <p className="text-brand-text-secondary text-sm font-medium">Equity Curve Projection (12 Months)</p>
                  </div>
               </div>

               <div className="flex gap-4">
                 <button onClick={() => setStep(2)} className="px-6 py-4 border border-brand-border hover:bg-brand-border rounded-xl font-bold transition-all">Edit Config</button>
                 <button onClick={() => setStep(4)} className="flex-1 bg-brand-primary hover:bg-brand-primary/90 text-white font-bold py-4 rounded-xl shadow-xl shadow-brand-primary/20">Proceed to Deployment</button>
               </div>
             </div>
          </motion.div>
        )}

        {step === 4 && (
          <motion.div 
            key="step4" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}
            className="max-w-2xl mx-auto py-8"
          >
            <div className="bg-brand-card border border-brand-border rounded-3xl p-8 shadow-2xl">
              <h2 className="text-2xl font-bold mb-8 text-center">Connect Your Broker</h2>
              
              <div className="space-y-8">
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { id: 'zerodha', name: 'Zerodha', icon: 'Z' },
                    { id: 'groww', name: 'Groww', icon: 'G' },
                    { id: 'upstox', name: 'Upstox', icon: 'U' },
                    { id: 'angel', name: 'AngelOne', icon: 'A' },
                  ].map(broker => (
                    <button key={broker.id} className="p-4 bg-brand-bg hover:bg-brand-border border border-brand-border hover:border-brand-primary rounded-2xl transition-all flex items-center gap-4 group">
                      <div className="w-10 h-10 rounded-lg bg-brand-primary/10 flex items-center justify-center font-black text-brand-primary group-hover:scale-110 transition-transform">{broker.icon}</div>
                      <span className="font-bold">{broker.name}</span>
                    </button>
                  ))}
                </div>

                <div className="space-y-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-brand-text-secondary uppercase tracking-widest flex justify-between">
                      API Key
                      <button className="text-brand-primary hover:underline">How to get this?</button>
                    </label>
                    <input type="password" placeholder="Enter your broker API key" className="w-full bg-brand-bg border border-brand-border rounded-xl py-3 px-4 outline-none focus:ring-1 focus:ring-brand-primary" />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-brand-text-secondary uppercase tracking-widest">Capital Allocation (₹)</label>
                    <input type="number" defaultValue="50000" className="w-full bg-brand-bg border border-brand-border rounded-xl py-3 px-4 outline-none focus:ring-1 focus:ring-brand-primary" />
                  </div>
                </div>

                <div className="flex items-center justify-between p-4 bg-brand-primary/10 rounded-2xl border border-brand-primary/20">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-brand-primary/20 flex items-center justify-center text-brand-primary">
                      <PlayCircle size={24} />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold">Paper Trading View</h4>
                      <p className="text-[10px] text-brand-text-secondary">Simulate with virtual money first.</p>
                    </div>
                  </div>
                  <div className="w-12 h-6 bg-brand-primary rounded-full p-1 relative cursor-pointer">
                    <div className="absolute right-1 w-4 h-4 bg-white rounded-full"></div>
                  </div>
                </div>

                <button 
                  onClick={handleFinishDeploy}
                  className="w-full bg-brand-success hover:bg-brand-success/90 text-white font-bold py-5 rounded-2xl transition-all shadow-xl shadow-brand-success/20 flex items-center justify-center gap-3"
                >
                  <TrendingUp size={24} />
                  Deploy Live Bot
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
