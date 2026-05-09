/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { Page, AppState, User, Bot, Trade, BotStatus } from './types';
import Sidebar from './components/Sidebar';
import { Navbar, Toast, Modal } from './components/UIParts';
import Dashboard from './components/Dashboard';
import AuthPages from './components/AuthPages';
import LandingPage from './components/LandingPage';
import BotBuilder from './components/BotBuilder';
import ActiveBots from './components/ActiveBots';
import TradeHistory from './components/TradeHistory';
import LearnHub from './components/LearnHub';
import Settings from './components/Settings';
import { INDIAN_STOCKS } from './constants';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const INITIAL_BOTS: Bot[] = [
  {
    id: 'b1',
    name: 'Nifty RSI Scalper',
    strategyType: 'Momentum',
    status: 'active',
    broker: 'Zerodha',
    capitalAllocated: 50000,
    currentPnL: 1240,
    tradesToday: 5,
    logs: ['[09:15:00] Bot started.', '[09:45:12] Entry signal: RSI < 30', '[10:15:33] Order filled: BUY 20x RELIANCE'],
    createdAt: Date.now() - 86400000 * 2
  },
  {
    id: 'b2',
    name: 'TCS Breakout Bot',
    strategyType: 'Breakout',
    status: 'paused',
    broker: 'Groww',
    capitalAllocated: 75000,
    currentPnL: -450,
    tradesToday: 2,
    logs: ['[09:15:00] Bot started.', '[11:20:05] Watching resistance at 3920'],
    createdAt: Date.now() - 86400000 * 5
  },
  {
    id: 'b3',
    name: 'BankNifty Mean Reverter',
    strategyType: 'Mean Reversion',
    status: 'active',
    broker: 'Upstox',
    capitalAllocated: 100000,
    currentPnL: 2450,
    tradesToday: 3,
    logs: ['[09:15:00] Bot started.', '[09:30:45] Signal: Price away from 200 EMA'],
    createdAt: Date.now() - 86400000 * 10
  }
];

const INITIAL_TRADES: Trade[] = [
  { id: 't1', date: Date.now() - 3600000, botName: 'Nifty RSI Scalper', instrument: 'RELIANCE', action: 'Buy', qty: 10, entryPrice: 2840, exitPrice: 2865, pnl: 250, status: 'Profit' },
  { id: 't2', date: Date.now() - 7200000, botName: 'TCS Breakout Bot', instrument: 'TCS', action: 'Sell', qty: 5, entryPrice: 3910, exitPrice: 3935, pnl: -125, status: 'Loss' },
  { id: 't3', date: Date.now() - 10800000, botName: 'Nifty RSI Scalper', instrument: 'INFY', action: 'Buy', qty: 20, entryPrice: 1540, exitPrice: 1555, pnl: 300, status: 'Profit' },
  { id: 't4', date: Date.now() - 14400000, botName: 'BankNifty Mean Reverter', instrument: 'HDFCBANK', action: 'Buy', qty: 15, entryPrice: 1450, exitPrice: 1472, pnl: 330, status: 'Profit' },
  { id: 't5', date: Date.now() - 18000000, botName: 'BankNifty Mean Reverter', instrument: 'ICICIBANK', action: 'Buy', qty: 25, entryPrice: 1020, exitPrice: 1045, pnl: 625, status: 'Profit' },
];

export default function App() {
  const [state, setState] = useState<AppState>(() => {
    const saved = localStorage.getItem('tradebot_state');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        return { ...parsed, isLoggingOut: false };
      } catch (e) { console.error('Failed to parse saved state', e); }
    }
    return {
      user: null,
      currentPage: 'landing',
      bots: INITIAL_BOTS,
      trades: INITIAL_TRADES,
      isLoggingOut: false,
      notifications: [
        { id: 'n1', title: 'Bot "Nifty Scalper" hit daily target.', time: '2 mins ago' },
        { id: 'n2', title: 'New article: "Mastering Risk Management".', time: '1 hour ago' },
        { id: 'n3', title: 'Broker connection for Upstox verified.', time: '3 hours ago' },
      ]
    };
  });

  const [toast, setToast] = useState<{ title: string, type: 'success' | 'error' | 'info' } | null>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      if (state.user) {
        setState(prev => {
          if (!prev.user) return prev;
          const delta = (Math.random() - 0.5) * 50;
          return {
            ...prev,
            user: {
              ...prev.user,
              portfolioValue: prev.user.portfolioValue + delta,
              todayPnL: prev.user.todayPnL + delta
            }
          };
        });
      }
    }, 5000);
    return () => clearInterval(interval);
  }, [state.user]);

  useEffect(() => {
    localStorage.setItem('tradebot_state', JSON.stringify({ ...state, isLoggingOut: false }));
  }, [state]);

  const showToast = (title: string, type: 'success' | 'error' | 'info' = 'success') => {
    setToast({ title, type });
    setTimeout(() => setToast(null), 4000);
  };

  const handleLogin = (user: User) => {
    setState(prev => ({ ...prev, user, currentPage: 'dashboard' }));
    showToast('Welcome back, ' + user.name + '!', 'success');
  };

  const handleLogout = () => {
    localStorage.removeItem('tradebot_state');
    setState(prev => ({ ...prev, user: null, currentPage: 'landing', isLoggingOut: false }));
    showToast('You have been logged out.', 'info');
  };

  const handleDeployBot = (bot: Bot) => {
    setState(prev => ({ 
      ...prev, 
      bots: [bot, ...prev.bots], 
      currentPage: 'active-bots' 
    }));
    showToast(`Bot "${bot.name}" deployed successfully!`, 'success');
  };

  const handleUpdateBotStatus = (botId: string, status: BotStatus) => {
    setState(prev => ({
      ...prev,
      bots: prev.bots.map(b => b.id === botId ? { ...b, status } : b)
    }));
    showToast(`Bot status updated to ${status}.`, 'info');
  };

  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  const renderPage = () => {
    switch (state.currentPage) {
      case 'dashboard':
        return <Dashboard user={state.user!} trades={state.trades} onAction={(a) => setState(prev => ({ ...prev, currentPage: a === 'create' ? 'bot-builder' : 'active-bots' }))} />;
      case 'bot-builder':
        return <BotBuilder onDeploy={handleDeployBot} />;
      case 'active-bots':
        return <ActiveBots bots={state.bots} onUpdateStatus={handleUpdateBotStatus} />;
      case 'trade-history':
        return <TradeHistory trades={state.trades} />;
      case 'learn':
        return <LearnHub />;
      case 'settings':
        return <Settings />;
      default:
        return <Dashboard user={state.user!} trades={state.trades} onAction={() => {}} />;
    }
  };

  if (!state.user) {
    if (state.currentPage === 'login' || state.currentPage === 'register') {
      return (
        <AuthPages 
          onLogin={handleLogin} 
          onNavigate={(p) => setState(prev => ({ ...prev, currentPage: p }))} 
          initialView={state.currentPage} 
        />
      );
    }
    return <LandingPage onStart={() => setState(prev => ({ ...prev, currentPage: 'register' }))} onLogin={() => setState(prev => ({ ...prev, currentPage: 'login' }))} />;
  }

  return (
    <div className="flex bg-brand-bg min-h-screen">
      <Sidebar 
        currentPage={state.currentPage} 
        setPage={(p) => setState(prev => ({ ...prev, currentPage: p }))} 
        onLogout={() => setState(prev => ({ ...prev, isLoggingOut: true }))} 
        isCollapsed={isSidebarCollapsed}
        setIsCollapsed={setIsSidebarCollapsed}
      />
      
      <main className={cn(
        "flex-1 transition-all duration-200",
        isSidebarCollapsed ? "ml-20" : "ml-60"
      )}>
        <Navbar userName={state.user.name} notifications={state.notifications} />
        <div className="p-8 max-w-7xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={state.currentPage}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              {renderPage()}
            </motion.div>
          </AnimatePresence>
        </div>
      </main>

      <AnimatePresence>
        {toast && <Toast title={toast.title} type={toast.type} onClose={() => setToast(null)} />}
      </AnimatePresence>

      <Modal 
        isOpen={state.isLoggingOut} 
        onClose={() => setState(prev => ({ ...prev, isLoggingOut: false }))} 
        title="Logout Confirmation"
      >
        <div className="space-y-6">
          <p className="text-brand-text-secondary">Are you sure you want to logout? Your active bots will continue to run on our servers.</p>
          <div className="flex gap-4">
            <button 
              onClick={() => setState(prev => ({ ...prev, isLoggingOut: false }))}
              className="flex-1 py-3 border border-brand-border rounded-xl font-semibold hover:bg-brand-border transition-colors"
            >
              Stay Logged In
            </button>
            <button 
              onClick={handleLogout}
              className="flex-1 py-3 bg-brand-danger text-white rounded-xl font-bold shadow-lg shadow-brand-danger/20"
            >
              Yes, Logout
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
