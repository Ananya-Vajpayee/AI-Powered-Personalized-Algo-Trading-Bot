import { motion } from 'motion/react';
import { 
  LayoutDashboard, 
  Bot, 
  History, 
  BookOpen, 
  Settings, 
  LogOut, 
  TrendingUp,
  X,
  Menu
} from 'lucide-react';
import { Page } from '../types';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface SidebarProps {
  currentPage: Page;
  setPage: (page: Page) => void;
  onLogout: () => void;
  isCollapsed: boolean;
  setIsCollapsed: (c: boolean) => void;
}

export default function Sidebar({ currentPage, setPage, onLogout, isCollapsed, setIsCollapsed }: SidebarProps) {
  const menuItems = [
    { id: 'dashboard' as Page, label: 'Dashboard', icon: LayoutDashboard },
    { id: 'bot-builder' as Page, label: 'Bot Builder', icon: TrendingUp },
    { id: 'active-bots' as Page, label: 'Active Bots', icon: Bot },
    { id: 'trade-history' as Page, label: 'Trade History', icon: History },
    { id: 'learn' as Page, label: 'Learn Hub', icon: BookOpen },
    { id: 'settings' as Page, label: 'Settings', icon: Settings },
  ];

  return (
    <motion.aside
      initial={false}
      animate={{ width: isCollapsed ? 80 : 240 }}
      className="fixed left-0 top-0 h-screen bg-brand-card border-r border-brand-border z-30 flex flex-col"
    >
      <div className="p-6 flex items-center justify-between mb-8">
        {!isCollapsed && (
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-brand-primary flex items-center justify-center font-black text-white text-lg">
              T
            </div>
            <span className="font-bold text-xl tracking-tight">TradeBot AI</span>
          </div>
        )}
        <button 
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="p-1 hover:bg-brand-border rounded-md transition-colors"
        >
          {isCollapsed ? <Menu size={20} /> : <X size={20} />}
        </button>
      </div>

      <nav className="flex-1 px-4 py-4 space-y-1">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setPage(item.id)}
            className={cn(
              "w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 group text-sm",
              currentPage === item.id 
                ? "bg-brand-primary/10 text-brand-primary font-medium" 
                : "text-brand-text-secondary hover:bg-brand-border hover:text-brand-text-primary"
            )}
          >
            <item.icon size={18} className={cn(
              "shrink-0",
              currentPage === item.id ? "text-brand-primary" : "group-hover:text-brand-text-primary"
            )} />
            {!isCollapsed && <span>{item.label}</span>}
          </button>
        ))}
      </nav>

      <div className="p-4 border-t border-brand-border">
        <button 
          onClick={onLogout}
          className={cn(
            "w-full flex items-center gap-3 px-3 py-3 rounded-lg text-brand-danger hover:bg-brand-danger/10 transition-colors",
            isCollapsed && "justify-center"
          )}
        >
          <LogOut size={22} className="shrink-0" />
          {!isCollapsed && <span className="font-medium">Logout</span>}
        </button>
      </div>
    </motion.aside>
  );
}
