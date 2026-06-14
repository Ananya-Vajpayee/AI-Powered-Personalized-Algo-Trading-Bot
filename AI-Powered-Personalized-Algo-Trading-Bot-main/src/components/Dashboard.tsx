import { motion } from 'motion/react';
import { 
  TrendingUp, 
  TrendingDown, 
  Activity, 
  Target, 
  ArrowUpRight, 
  Plus, 
  Eye, 
  Wallet 
} from 'lucide-react';
import { User, Trade } from '../types';
import { 
  Chart as ChartJS, 
  CategoryScale, 
  LinearScale, 
  PointElement, 
  LineElement, 
  BarElement,
  ArcElement,
  Title as ChartTitle, 
  Tooltip, 
  Legend, 
  Filler 
} from 'chart.js';
import { Line, Doughnut, Bar } from 'react-chartjs-2';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  ChartTitle,
  Tooltip,
  Legend,
  Filler
);

interface DashboardProps {
  user: User;
  trades: Trade[];
  onAction: (action: 'create' | 'view-bots') => void;
}

export default function Dashboard({ user, trades, onAction }: DashboardProps) {
  const lineData = {
    labels: ['Apr 10', 'Apr 15', 'Apr 20', 'Apr 25', 'Apr 30', 'May 05', 'May 09'],
    datasets: [{
      label: 'Portfolio Value',
      data: [210000, 215000, 208000, 222000, 235000, 241000, 245670],
      borderColor: '#6366F1',
      backgroundColor: (context: any) => {
        const bg = context.chart.ctx.createLinearGradient(0, 0, 0, 400);
        bg.addColorStop(0, 'rgba(99, 102, 241, 0.4)');
        bg.addColorStop(1, 'rgba(99, 102, 241, 0)');
        return bg;
      },
      fill: true,
      tension: 0.4,
      pointRadius: 4,
      pointBackgroundColor: '#6366F1',
    }]
  };

  const donutData = {
    labels: ['Equity', 'F&O', 'Cash', 'Crypto'],
    datasets: [{
      data: [65, 20, 10, 5],
      backgroundColor: ['#6366F1', '#10B981', '#F59E0B', '#EF4444'],
      borderWidth: 0,
      hoverOffset: 10
    }]
  };

  const barData = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [{
      label: 'Daily P&L',
      data: [1200, -800, 2400, 500, 1800, 0, 3240],
      backgroundColor: (context: any) => {
        const value = context.dataset.data[context.dataIndex];
        return value >= 0 ? '#10B981' : '#EF4444';
      },
      borderRadius: 8
    }]
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: {
        enabled: true,
        mode: 'index',
        intersect: false,
        backgroundColor: '#111827',
        titleColor: '#F9FAFB',
        bodyColor: '#9CA3AF',
        borderColor: '#1F2937',
        borderWidth: 1,
        padding: 12,
        boxPadding: 6,
        usePointStyle: true,
        callbacks: {
          label: (context: any) => {
            let label = context.dataset.label || '';
            if (label) {
              label += ': ';
            }
            if (context.parsed.y !== null) {
              label += new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(context.parsed.y);
            }
            return label;
          }
        }
      }
    },
    hover: {
      mode: 'index',
      intersect: false
    },
    scales: {
      x: { grid: { display: false }, ticks: { color: '#9CA3AF', font: { size: 10 } } },
      y: { grid: { color: '#1F2937' }, ticks: { color: '#9CA3AF', font: { size: 10 } } }
    }
  };

  return (
    <div className="space-y-8 pb-12">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Good morning, {user.name.split(' ')[0]} 👋</h1>
          <p className="text-brand-text-secondary mt-1">Here's what's happening with your robots today.</p>
        </div>
        <div className="flex items-center gap-3">
          <button 
            onClick={() => onAction('create')}
            className="flex items-center gap-2 bg-brand-primary hover:bg-brand-primary/90 text-white px-4 py-2.5 rounded-xl font-semibold transition-all shadow-lg shadow-brand-primary/20"
          >
            <Plus size={18} />
            <span>Create New Bot</span>
          </button>
          <button 
            onClick={() => onAction('view-bots')}
            className="flex items-center gap-2 bg-brand-card border border-brand-border hover:bg-brand-border px-4 py-2.5 rounded-xl font-semibold transition-all"
          >
            <Eye size={18} />
            <span>View Bots</span>
          </button>
        </div>
      </header>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: 'Portfolio Value', value: '₹2,45,670', sub: '+2.4% today', icon: Wallet, color: 'text-brand-primary' },
          { label: 'Active Bots', value: '3', sub: 'Running smoothly', icon: Activity, color: 'text-brand-success' },
          { label: "Today's P&L", value: '+₹3,240', sub: 'Bullish session', icon: TrendingUp, color: 'text-brand-success' },
          { label: 'Win Rate', value: '67%', sub: 'Last 30 days', icon: Target, color: 'text-brand-primary' }
        ].map((stat, i) => (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            key={stat.label} 
            className="bg-brand-card border border-brand-border p-5 rounded-xl relative overflow-hidden group hover:border-brand-primary/30 transition-colors"
          >
            <p className="text-[10px] font-bold text-brand-text-secondary uppercase tracking-widest mb-2">{stat.label}</p>
            <div className="flex items-baseline gap-2">
              <h3 className="text-2xl font-bold">{stat.value}</h3>
              <span className={cn(
                "text-xs font-medium", 
                stat.sub.includes('+') || stat.sub.includes('smoothly') ? 'text-brand-success' : 'text-brand-danger'
              )}>
                {stat.sub.split(' ')[0]}
              </span>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-brand-card border border-brand-border p-6 rounded-xl">
          <div className="flex items-center justify-between mb-8">
            <h3 className="font-bold flex items-center gap-2">
              <TrendingUp size={20} className="text-brand-primary" />
              Portfolio Performance
            </h3>
            <select className="bg-brand-bg border border-brand-border rounded-lg text-xs px-3 py-1.5 outline-none font-medium">
              <option>Last 30 days</option>
              <option>Last 6 months</option>
              <option>Year to date</option>
            </select>
          </div>
          <div className="h-[300px] chart-container">
            <Line data={lineData} options={options as any} />
          </div>
        </div>

        <div className="bg-brand-card border border-brand-border p-6 rounded-xl">
          <h3 className="font-bold mb-8">Asset Allocation</h3>
          <div className="h-[220px] chart-container relative">
            <Doughnut data={donutData} options={{ ...options, cutout: '75%' } as any} />
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
              <span className="text-2xl font-bold">65%</span>
              <span className="text-[10px] text-brand-text-secondary uppercase tracking-widest">Equity</span>
            </div>
          </div>
          <div className="mt-8 space-y-3">
            {[
              { label: 'Equity', percent: 65, color: 'bg-brand-primary' },
              { label: 'F&O', percent: 20, color: 'bg-brand-success' },
              { label: 'Cash', percent: 10, color: 'bg-amber-500' },
              { label: 'Crypto', percent: 5, color: 'bg-brand-danger' },
            ].map(item => (
              <div key={item.label} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className={cn("w-2 h-2 rounded-full", item.color)}></div>
                  <span className="text-[13px] text-brand-text-secondary">{item.label}</span>
                </div>
                <span className="text-[13px] font-semibold">{item.percent}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-brand-card border border-brand-border p-6 rounded-xl">
          <h3 className="font-bold mb-8 italic">Daily P&L</h3>
          <div className="h-[250px] chart-container">
            <Bar data={barData} options={options as any} />
          </div>
        </div>

        <div className="bg-brand-card border border-brand-border p-6 rounded-xl">
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-bold">Recent Activity</h3>
            <button className="text-xs text-brand-primary hover:underline font-semibold tracking-tight">View All History</button>
          </div>
          <div className="space-y-1">
            <div className="grid grid-cols-5 py-2 text-[10px] font-bold text-brand-text-secondary uppercase tracking-widest border-b border-brand-border mb-2 px-1">
              <span>Time</span>
              <span>Symbol</span>
              <span>Action</span>
              <span className="text-right">Qty</span>
              <span className="text-right">P&L</span>
            </div>
            {trades.slice(0, 6).map((trade) => (
              <div key={trade.id} className="grid grid-cols-5 items-center py-3 text-[13px] hover:bg-white/5 px-1 rounded-md transition-colors border-b border-brand-border/30 last:border-0 font-medium">
                <span className="font-mono text-[11px] text-brand-text-secondary">{new Date(trade.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false })}</span>
                <span className="font-bold text-brand-text-primary">{trade.instrument}</span>
                <span className={cn(
                  "text-[10px] font-black uppercase tracking-tighter w-fit",
                  trade.action === 'Buy' ? 'text-brand-success' : 'text-brand-danger'
                )}>{trade.action}</span>
                <span className="text-right text-brand-text-secondary">{trade.qty}</span>
                <span className={cn(
                  "text-right font-mono text-[11px]",
                  trade.status === 'Profit' ? 'text-brand-success' : 'text-brand-danger'
                )}>
                  {trade.pnl ? `${trade.pnl > 0 ? '+' : ''}₹${trade.pnl}` : '--'}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
