import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Play, 
  Pause, 
  Square, 
  Terminal, 
  Settings, 
  ChevronRight, 
  TrendingUp, 
  TrendingDown, 
  Activity, 
  Zap,
  X,
  Cpu
} from 'lucide-react';
import { Bot, BotStatus } from '../types';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface ActiveBotsProps {
  bots: Bot[];
  onUpdateStatus: (botId: string, status: BotStatus) => void;
}

export default function ActiveBots({ bots, onUpdateStatus }: ActiveBotsProps) {
  const [viewLogs, setViewLogs] = useState<string | null>(null);
  const [liveLogs, setLiveLogs] = useState<Record<string, string[]>>({});

  const selectedBot = bots.find(b => b.id === viewLogs);

  // Simulate new log lines
  useEffect(() => {
    const interval = setInterval(() => {
      const activeBots = bots.filter(b => b.status === 'active');
      if (activeBots.length === 0) return;

      const randomBot = activeBots[Math.floor(Math.random() * activeBots.length)];
      const symbols = ['RELIANCE', 'TCS', 'INFY', 'HDFCBANK', 'ICICIBANK'];
      const actions = ['Signal detected', 'Moving Average crossover', 'Price break detected', 'Volume spike', 'RSI oversold'];
      const symbol = symbols[Math.floor(Math.random() * symbols.length)];
      const action = actions[Math.floor(Math.random() * actions.length)];
      const price = (Math.random() * 2000 + 500).toFixed(2);
      
      const newLog = `[${new Date().toLocaleTimeString()}] ${symbol}: ${action} @ ₹${price}`;
      
      setLiveLogs(prev => ({
        ...prev,
        [randomBot.id]: [newLog, ...(prev[randomBot.id] || randomBot.logs).slice(0, 19)]
      }));
    }, 4000);

    return () => clearInterval(interval);
  }, [bots]);

  return (
    <div className="space-y-8">
      <header className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Active Bots</h1>
          <p className="text-brand-text-secondary mt-1">Manage and monitor your automated trading robots.</p>
        </div>
        <div className="flex items-center bg-brand-card border border-brand-border rounded-xl p-1">
          <button className="px-4 py-2 bg-brand-bg text-sm font-bold rounded-lg shadow-sm">Card View</button>
          <button className="px-4 py-2 text-sm font-bold text-brand-text-secondary hover:text-brand-text-primary transition-colors">List View</button>
        </div>
      </header>

      {bots.length === 0 ? (
        <div className="bg-brand-card border border-brand-border rounded-3xl p-12 text-center flex flex-col items-center">
            <div className="w-16 h-16 rounded-2xl bg-brand-bg flex items-center justify-center text-brand-text-secondary mb-6">
              <Cpu size={32} />
            </div>
            <h3 className="text-xl font-bold mb-2">No Bots Deployed Yet</h3>
            <p className="text-brand-text-secondary max-w-sm mb-8">You haven't created any trading bots yet. Start by defining your strategy in the Bot Builder.</p>
            <button className="bg-brand-primary hover:bg-brand-primary/90 text-white font-bold px-8 py-3 rounded-xl transition-all shadow-lg shadow-brand-primary/20">
              Create My First Bot
            </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {bots.map((bot) => (
            <motion.div 
              layout
              key={bot.id} 
              className="bot-glow-card border border-brand-primary/40 rounded-xl overflow-hidden group transition-all shadow-xl"
            >
              <div className="p-6 border-b border-brand-border">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 bg-brand-success/10 text-brand-success text-[10px] font-bold rounded uppercase tracking-wider">RUNNING</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <button className="p-1.5 hover:bg-brand-border rounded-lg transition-colors text-brand-text-secondary hover:text-brand-text-primary">
                      <Settings size={16} />
                    </button>
                  </div>
                </div>
                <h3 className="text-lg font-bold mb-1">{bot.name}</h3>
                <div className="flex items-center gap-2 mb-4">
                  <p className="text-[13px] text-brand-text-secondary">Current Session: +₹{bot.currentPnL} ({bot.tradesToday} trades)</p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                   <div className="p-3 bg-brand-bg rounded-xl border border-brand-border">
                     <p className="text-[10px] text-brand-text-secondary uppercase font-bold mb-1">Capital</p>
                     <p className="text-sm font-bold text-brand-text-primary">₹{(bot.capitalAllocated/1000).toFixed(1)}k</p>
                   </div>
                   <div className="p-3 bg-brand-bg rounded-xl border border-brand-border">
                     <p className="text-[10px] text-brand-text-secondary uppercase font-bold mb-1">P&L (Today)</p>
                     <p className={cn("text-sm font-bold", bot.currentPnL >= 0 ? 'text-brand-success' : 'text-brand-danger')}>
                       {bot.currentPnL >= 0 ? '+' : ''}₹{bot.currentPnL}
                     </p>
                   </div>
                </div>
              </div>

              <div className="p-4 bg-brand-bg/40 flex items-center justify-between gap-3">
                 <div className="flex items-center gap-2">
                    {bot.status === 'active' ? (
                      <button 
                        onClick={() => onUpdateStatus(bot.id, 'paused')}
                        className="w-10 h-10 flex items-center justify-center bg-amber-500/10 text-amber-500 hover:bg-amber-500 hover:text-white rounded-xl transition-all"
                      >
                        <Pause size={18} fill="currentColor" />
                      </button>
                    ) : (
                      <button 
                        onClick={() => onUpdateStatus(bot.id, 'active')}
                        className="w-10 h-10 flex items-center justify-center bg-brand-success/10 text-brand-success hover:bg-brand-success hover:text-white rounded-xl transition-all"
                      >
                        <Play size={18} fill="currentColor" />
                      </button>
                    )}
                    <button 
                      onClick={() => onUpdateStatus(bot.id, 'stopped')}
                      className="w-10 h-10 flex items-center justify-center bg-brand-danger/10 text-brand-danger hover:bg-brand-danger hover:text-white rounded-xl transition-all"
                    >
                      <Square size={18} fill="currentColor" />
                    </button>
                 </div>
                 <button 
                  onClick={() => setViewLogs(bot.id)}
                  className="px-4 py-2 text-xs font-bold bg-brand-card hover:bg-brand-border border border-brand-border rounded-xl transition-all flex items-center gap-2"
                 >
                   <Terminal size={14} />
                   Logs
                 </button>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {/* Logs Side Panel */}
      <AnimatePresence>
        {viewLogs && selectedBot && (
          <div className="fixed inset-0 z-[60] flex justify-end">
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              exit={{ opacity: 0 }}
              onClick={() => setViewLogs(null)}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            ></motion.div>
            <motion.div 
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              className="w-full max-w-lg bg-brand-card h-full border-l border-brand-border relative z-10 flex flex-col shadow-2xl"
            >
              <div className="p-6 border-b border-brand-border flex items-center justify-between">
                 <div className="flex items-center gap-3">
                   <div className="w-10 h-10 rounded-xl bg-brand-primary/10 flex items-center justify-center text-brand-primary">
                     <Terminal size={20} />
                   </div>
                   <div>
                     <h2 className="text-lg font-bold">Execution Logs</h2>
                     <p className="text-xs text-brand-text-secondary">{selectedBot.name}</p>
                   </div>
                 </div>
                 <button onClick={() => setViewLogs(null)} className="p-2 hover:bg-brand-border rounded-xl transition-colors"><X size={20} /></button>
              </div>
              <div className="flex-1 p-6 font-mono text-[11px] overflow-y-auto space-y-2 bg-[#050810]">
                 {(liveLogs[selectedBot.id] || selectedBot.logs).map((log, i) => (
                   <div key={i} className="flex gap-2">
                     <span className="text-brand-text-secondary opacity-50 shrink-0">{i+1}</span>
                     <span className={cn(
                       "leading-relaxed",
                       log.includes('BUY') ? 'text-brand-success' : log.includes('SELL') ? 'text-brand-danger' : 'text-brand-text-primary'
                     )}>
                       {log}
                     </span>
                   </div>
                 ))}
                 <div className="flex gap-2 animate-pulse">
                   <span className="text-brand-text-secondary opacity-50 shrink-0">{ (liveLogs[selectedBot.id] || selectedBot.logs).length + 1 }</span>
                   <span className="text-brand-primary opacity-50">_</span>
                 </div>
              </div>
              <div className="p-4 border-t border-brand-border flex items-center justify-between">
                 <p className="text-[10px] text-brand-text-secondary uppercase font-bold tracking-widest flex items-center gap-2">
                   <span className="w-1.5 h-1.5 bg-brand-success rounded-full"></span>
                   Streaming Real-time
                 </p>
                 <button className="text-[10px] bg-brand-bg px-3 py-1.5 rounded-lg border border-brand-border font-bold hover:bg-brand-border transition-all">Download Log</button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
