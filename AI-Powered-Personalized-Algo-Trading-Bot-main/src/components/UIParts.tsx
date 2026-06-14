import { Bell, User, ChevronDown, CheckCircle, AlertCircle, Info } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useState } from 'react';

interface NavbarProps {
  userName: string;
  notifications: Array<{ id: string; title: string; time: string }>;
}

export function Navbar({ userName, notifications }: NavbarProps) {
  const [showNotifications, setShowNotifications] = useState(false);
  
  return (
    <header className="h-16 border-b border-brand-border bg-brand-bg/80 backdrop-blur-md flex items-center justify-between px-8 sticky top-0 z-20">
      <div className="flex-1"></div>
      <div className="flex items-center gap-6">
        <div className="relative">
          <button 
            onClick={() => setShowNotifications(!showNotifications)}
            className="p-2 hover:bg-brand-border rounded-full relative transition-colors"
          >
            <Bell size={20} className="text-brand-text-secondary" />
            {notifications.length > 0 && (
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-brand-danger rounded-full border-2 border-brand-bg"></span>
            )}
          </button>
          
          <AnimatePresence>
            {showNotifications && (
              <motion.div
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                className="absolute right-0 mt-2 w-80 bg-brand-card border border-brand-border rounded-xl shadow-2xl p-4 overflow-hidden"
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold">Notifications</h3>
                  <button className="text-xs text-brand-primary hover:underline">Mark all read</button>
                </div>
                <div className="space-y-3">
                  {notifications.map((n) => (
                    <div key={n.id} className="p-3 bg-brand-bg rounded-lg hover:bg-brand-border transition-colors cursor-pointer group">
                      <p className="text-sm font-medium mb-1 group-hover:text-brand-primary transition-colors">{n.title}</p>
                      <p className="text-xs text-brand-text-secondary">{n.time}</p>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="flex items-center gap-3 pl-6 border-l border-brand-border cursor-pointer group">
          <div className="w-8 h-8 rounded-full bg-brand-primary/20 flex items-center justify-center border border-brand-primary/30">
            <User size={18} className="text-brand-primary" />
          </div>
          <div className="hidden sm:block">
            <p className="text-sm font-medium leading-none">{userName}</p>
            <p className="text-[10px] text-brand-text-secondary mt-1">Pro Member</p>
          </div>
          <ChevronDown size={14} className="text-brand-text-secondary group-hover:text-brand-text-primary transition-colors" />
        </div>
      </div>
    </header>
  );
}

export function Toast({ title, type = 'success', onClose }: { title: string, type?: 'success' | 'error' | 'info', onClose: () => void }) {
  const icons = {
    success: <CheckCircle className="text-brand-success" size={18} />,
    error: <AlertCircle className="text-brand-danger" size={18} />,
    info: <Info className="text-brand-primary" size={18} />,
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 50 }}
      className="fixed bottom-6 right-6 z-50 bg-brand-card border border-brand-border rounded-lg shadow-2xl p-4 flex items-center gap-3 min-w-[280px]"
    >
      {icons[type]}
      <span className="flex-1 text-sm font-medium">{title}</span>
      <button onClick={onClose} className="text-brand-text-secondary hover:text-brand-text-primary transition-colors">
        <X size={16} />
      </button>
    </motion.div>
  );
}

import { X } from 'lucide-react';

export function Modal({ isOpen, onClose, title, children }: { isOpen: boolean, onClose: () => void, title: string, children: React.ReactNode }) {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        className="bg-brand-card border border-brand-border w-full max-w-md rounded-2xl shadow-2xl relative overflow-hidden"
      >
        <div className="p-6 border-b border-brand-border flex items-center justify-between">
          <h3 className="text-lg font-semibold">{title}</h3>
          <button onClick={onClose} className="p-1 hover:bg-brand-border rounded-md transition-colors">
            <X size={20} />
          </button>
        </div>
        <div className="p-6">
          {children}
        </div>
      </motion.div>
    </div>
  );
}
