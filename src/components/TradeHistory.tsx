import { useState } from 'react';
import { 
  Search, 
  Filter, 
  Download, 
  ChevronLeft, 
  ChevronRight, 
  ArrowUpRight, 
  Calendar,
  Layers,
  ArrowRight,
  TrendingUp,
  TrendingDown
} from 'lucide-react';
import { Trade } from '../types';
import { INDIAN_STOCKS } from '../constants';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface TradeHistoryProps {
  trades: Trade[];
}

export default function TradeHistory({ trades }: TradeHistoryProps) {
  const [filter, setFilter] = useState('');

  const stats = [
    { label: 'Total Trades', value: trades.length, icon: Layers },
    { label: 'Total P&L', value: '₹14,520', icon: ArrowUpRight, color: 'text-brand-success' },
    { label: 'Best Trade', value: '+₹2,840', icon: TrendingUp, color: 'text-brand-success' },
    { label: 'Worst Trade', value: '-₹1,120', icon: TrendingDown, color: 'text-brand-danger' },
  ];

  const handleDownloadCSV = () => {
    const headers = "Date,Bot Name,Instrument,Action,Qty,Entry,Exit,PnL,Status\n";
    const rows = trades.map(t => `${new Date(t.date).toLocaleDateString()},${t.botName},${t.instrument},${t.action},${t.qty},${t.entryPrice},${t.exitPrice || '-'},${t.pnl || '0'},${t.status}`).join("\n");
    const blob = new Blob([headers + rows], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `trades_history_${new Date().toLocaleDateString()}.csv`;
    a.click();
  };

  return (
    <div className="space-y-8">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Trade History</h1>
          <p className="text-brand-text-secondary mt-1">Audit every execution performed by your bots.</p>
        </div>
        <button 
          onClick={handleDownloadCSV}
          className="flex items-center gap-2 bg-brand-card hover:bg-brand-border border border-brand-border text-brand-text-primary px-5 py-2.5 rounded-xl font-semibold transition-all"
        >
          <Download size={18} />
          <span>Download CSV</span>
        </button>
      </header>

      {/* Stats row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <div key={stat.label} className="bg-brand-card border border-brand-border p-6 rounded-2xl">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] font-bold text-brand-text-secondary uppercase tracking-widest">{stat.label}</span>
              <stat.icon size={16} className={stat.color || 'text-brand-text-secondary'} />
            </div>
            <p className={cn("text-xl font-bold", stat.color || 'text-brand-text-primary')}>{stat.value}</p>
          </div>
        ))}
      </div>

      {/* Filter Bar */}
      <div className="bg-brand-card border border-brand-border rounded-2xl p-4 flex flex-col md:flex-row items-center gap-4">
        <div className="relative flex-1 w-full">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-brand-text-secondary" size={18} />
          <input 
            type="text" 
            placeholder="Search by instrument or bot name..." 
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="w-full bg-brand-bg border border-brand-border rounded-xl py-2.5 pl-10 pr-4 outline-none focus:ring-1 focus:ring-brand-primary text-sm"
          />
        </div>
        <div className="flex items-center gap-3 w-full md:w-auto">
          <button className="flex items-center gap-2 px-4 py-2.5 border border-brand-border rounded-xl text-sm font-medium hover:bg-brand-border transition-colors">
            <Calendar size={18} />
            Last 30 days
          </button>
          <button className="flex items-center gap-2 px-4 py-2.5 border border-brand-border rounded-xl text-sm font-medium hover:bg-brand-border transition-colors">
            <Filter size={18} />
            Filters
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="bg-brand-card border border-brand-border rounded-2xl overflow-hidden overflow-x-auto shadow-xl">
        <table className="w-full text-left border-collapse min-w-[800px]">
          <thead>
            <tr className="bg-brand-bg/50 border-b border-brand-border">
              <th className="px-6 py-4 text-xs font-bold text-brand-text-secondary uppercase tracking-widest">Date</th>
              <th className="px-6 py-4 text-xs font-bold text-brand-text-secondary uppercase tracking-widest">Bot & Strategy</th>
              <th className="px-6 py-4 text-xs font-bold text-brand-text-secondary uppercase tracking-widest">Instrument</th>
              <th className="px-6 py-4 text-xs font-bold text-brand-text-secondary uppercase tracking-widest">Action</th>
              <th className="px-6 py-4 text-xs font-bold text-brand-text-secondary uppercase tracking-widest">Entry / Exit</th>
              <th className="px-6 py-4 text-xs font-bold text-brand-text-secondary uppercase tracking-widest">P&L</th>
              <th className="px-6 py-4 text-xs font-bold text-brand-text-secondary uppercase tracking-widest text-right">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-brand-border/50">
            {trades.filter(t => t.instrument.toLowerCase().includes(filter.toLowerCase()) || t.botName.toLowerCase().includes(filter.toLowerCase())).map((trade) => (
              <tr key={trade.id} className="hover:bg-brand-bg/60 transition-colors group">
                <td className="px-6 py-4">
                  <p className="text-sm font-medium">{new Date(trade.date).toLocaleDateString()}</p>
                  <p className="text-[10px] text-brand-text-secondary">{new Date(trade.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
                </td>
                <td className="px-6 py-4">
                  <p className="text-sm font-bold">{trade.botName}</p>
                  <p className="text-[10px] text-brand-text-secondary">Momentum Scalper</p>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <span className="w-8 h-8 rounded-lg bg-brand-primary/10 flex items-center justify-center font-bold text-[10px] text-brand-primary">
                      {trade.instrument.charAt(0)}
                    </span>
                    <span className="text-sm font-semibold">{trade.instrument}</span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className={cn(
                    "px-2 py-1 rounded text-[10px] font-black uppercase tracking-wider",
                    trade.action === 'Buy' ? 'bg-brand-success/10 text-brand-success' : 'bg-brand-danger/10 text-brand-danger'
                  )}>
                    {trade.action}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2 text-xs">
                    <span className="font-bold">₹{trade.entryPrice}</span>
                    <ArrowRight size={10} className="text-brand-text-secondary" />
                    <span className="text-brand-text-secondary">₹{trade.exitPrice || '—'}</span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <p className={cn("text-sm font-bold", trade.status === 'Profit' ? 'text-brand-success' : trade.status === 'Loss' ? 'text-brand-danger' : 'text-brand-text-secondary')}>
                    {trade.pnl ? `${trade.pnl > 0 ? '+' : ''}₹${trade.pnl}` : '—'}
                  </p>
                </td>
                <td className="px-6 py-4 text-right">
                  <div className="flex justify-end">
                    <span className={cn(
                      "flex items-center gap-1 text-[10px] px-2 py-0.5 rounded-full font-bold",
                      trade.status === 'Profit' ? 'bg-brand-success/10 text-brand-success' : 
                      trade.status === 'Loss' ? 'bg-brand-danger/10 text-brand-danger' : 'bg-brand-border text-brand-text-secondary'
                    )}>
                      <div className="w-1.5 h-1.5 rounded-full bg-current"></div>
                      {trade.status}
                    </span>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex items-center justify-between border-t border-brand-border pt-6">
        <p className="text-sm text-brand-text-secondary font-medium">Showing 1 to {trades.length} of {trades.length} trades</p>
        <div className="flex items-center gap-2">
          <button disabled className="p-2 border border-brand-border rounded-lg disabled:opacity-30 disabled:cursor-not-allowed hover:bg-brand-border transition-colors"><ChevronLeft size={18} /></button>
          <button className="w-10 h-10 bg-brand-primary text-white rounded-lg font-bold text-sm">1</button>
          <button className="p-2 border border-brand-border rounded-lg hover:bg-brand-border transition-colors"><ChevronRight size={18} /></button>
        </div>
      </div>
    </div>
  );
}
