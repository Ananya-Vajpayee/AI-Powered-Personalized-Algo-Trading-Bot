import { useState } from 'react';
import { 
  User, 
  Shield, 
  Bell, 
  Link as LinkIcon, 
  CreditCard,
  Camera,
  CheckCircle2,
  Lock,
  Smartphone,
  ExternalLink,
  ChevronRight,
  TrendingUp,
  AlertTriangle,
  Plus
} from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export default function Settings() {
  const [activeTab, setActiveTab] = useState('Profile');

  const tabs = [
    { id: 'Profile', icon: User },
    { id: 'Broker Connections', icon: LinkIcon },
    { id: 'Notifications', icon: Bell },
    { id: 'Security', icon: Shield },
    { id: 'Subscription', icon: CreditCard },
  ];

  return (
    <div className="space-y-8 pb-12">
      <header>
        <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
        <p className="text-brand-text-secondary mt-1">Manage your account preferences and integrations.</p>
      </header>

      <div className="flex flex-col lg:flex-row gap-8">
        <aside className="w-full lg:w-64 space-y-1">
          {tabs.map(tab => (
            <button 
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                "w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all group",
                activeTab === tab.id ? "bg-brand-primary text-white shadow-lg shadow-brand-primary/20" : "text-brand-text-secondary hover:bg-brand-card"
              )}
            >
              <tab.icon size={18} className={activeTab === tab.id ? "text-white" : "group-hover:text-brand-text-primary"} />
              {tab.id}
            </button>
          ))}
        </aside>

        <main className="flex-1 bg-brand-card border border-brand-border rounded-3xl p-8 shadow-xl overflow-hidden">
          {activeTab === 'Profile' && (
            <div className="space-y-10 animate-in fade-in duration-300">
               <div className="flex flex-col sm:flex-row items-start sm:items-center gap-8">
                  <div className="relative group">
                    <div className="w-24 h-24 rounded-2xl bg-brand-bg border border-brand-border flex items-center justify-center text-brand-primary overflow-hidden">
                      <User size={40} className="opacity-30" />
                      <img src="https://ui-avatars.com/api/?name=Demo+User&background=6366F1&color=fff" className="absolute inset-0 w-full h-full object-cover" />
                    </div>
                    <button className="absolute -bottom-2 -right-2 p-2 bg-brand-primary text-white rounded-lg shadow-lg hover:bg-brand-primary/90 transition-all opacity-0 group-hover:opacity-100">
                      <Camera size={14} />
                    </button>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold">Personal Information</h3>
                    <p className="text-sm text-brand-text-secondary">Update your profile details and avatar.</p>
                  </div>
               </div>

               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                 <div className="space-y-1.5">
                   <label className="text-xs font-bold text-brand-text-secondary uppercase tracking-widest">Full Name</label>
                   <input type="text" defaultValue="Demo User" className="w-full bg-brand-bg border border-brand-border rounded-xl py-3 px-4 outline-none focus:ring-1 focus:ring-brand-primary" />
                 </div>
                 <div className="space-y-1.5">
                   <label className="text-xs font-bold text-brand-text-secondary uppercase tracking-widest">Email Address</label>
                   <input type="email" defaultValue="demo@tradebotai.com" className="w-full bg-brand-bg border border-brand-border rounded-xl py-3 px-4 outline-none focus:ring-1 focus:ring-brand-primary" />
                 </div>
                 <div className="space-y-1.5">
                   <label className="text-xs font-bold text-brand-text-secondary uppercase tracking-widest">Timezone</label>
                   <select defaultValue="(GMT+05:30) Mumbai, Kolkata" className="w-full bg-brand-bg border border-brand-border rounded-xl py-3 px-4 outline-none focus:ring-1 focus:ring-brand-primary">
                     <option>(GMT+05:30) Mumbai, Kolkata</option>
                     <option>(GMT+00:00) UTC</option>
                   </select>
                 </div>
                 <div className="space-y-1.5">
                   <label className="text-xs font-bold text-brand-text-secondary uppercase tracking-widest">Currency</label>
                   <select defaultValue="INR (₹)" className="w-full bg-brand-bg border border-brand-border rounded-xl py-3 px-4 outline-none focus:ring-1 focus:ring-brand-primary">
                     <option>INR (₹)</option>
                     <option>USD ($)</option>
                   </select>
                 </div>
               </div>

               <div className="flex justify-end gap-3 pt-6 border-t border-brand-border">
                  <button className="px-6 py-2.5 text-sm font-semibold hover:bg-brand-bg rounded-xl transition-colors">Cancel</button>
                  <button className="px-6 py-2.5 bg-brand-primary text-white text-sm font-bold rounded-xl shadow-lg shadow-brand-primary/20">Save Changes</button>
               </div>
            </div>
          )}

          {activeTab === 'Broker Connections' && (
            <div className="space-y-8 animate-in fade-in duration-300">
               <div className="flex items-center justify-between">
                 <div>
                   <h3 className="text-xl font-bold">Broker Connections</h3>
                   <p className="text-sm text-brand-text-secondary">Official API integrations for order execution.</p>
                 </div>
                 <button className="flex items-center gap-2 bg-brand-primary/10 text-brand-primary px-4 py-2 rounded-xl text-sm font-bold hover:bg-brand-primary hover:text-white transition-all">
                   <Plus size={16} /> Connect Broker
                 </button>
               </div>

               <div className="space-y-4">
                 {[
                   { name: 'Zerodha Kite', status: 'Connected', logo: 'https://logo.clearbit.com/zerodha.com', key: 'Verified' },
                   { name: 'Groww', status: 'Disconnected', logo: 'https://logo.clearbit.com/groww.in', key: 'Not Configured' },
                   { name: 'Upstox', status: 'Disconnected', logo: 'https://logo.clearbit.com/upstox.com', key: 'Not Configured' },
                 ].map(broker => (
                   <div key={broker.name} className="flex flex-col sm:flex-row sm:items-center justify-between p-6 bg-brand-bg/50 border border-brand-border rounded-2xl gap-4">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-xl bg-white border border-brand-border flex items-center justify-center p-2 shrink-0 overflow-hidden shadow-sm">
                          <img 
                            src={(broker as any).logo} 
                            alt={broker.name} 
                            className="w-full h-full object-contain"
                            onError={(e) => {
                              const target = e.target as HTMLImageElement;
                              target.src = `https://ui-avatars.com/api/?name=${broker.name}&background=6366F1&color=fff`;
                            }}
                          />
                        </div>
                        <div>
                          <h4 className="font-bold">{broker.name}</h4>
                          <p className="text-xs text-brand-text-secondary flex items-center gap-1">
                            API Status: 
                            <span className={broker.status === 'Connected' ? 'text-brand-success' : 'text-brand-danger'}>{broker.status}</span>
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                         <div className="hidden sm:block text-right mr-4">
                           <p className="text-xs font-bold text-brand-text-secondary uppercase tracking-widest">Key Status</p>
                           <p className={cn("text-xs font-semibold", broker.key === 'Verified' ? 'text-brand-success' : 'text-brand-text-secondary')}>{broker.key}</p>
                         </div>
                         <button className={cn(
                           "px-4 py-2 text-xs font-bold rounded-lg border transition-all",
                           broker.status === 'Connected' ? 'border-brand-danger/30 text-brand-danger hover:bg-brand-danger hover:text-white' : 'border-brand-primary/30 text-brand-primary hover:bg-brand-primary hover:text-white'
                         )}>
                           {broker.status === 'Connected' ? 'Disconnect' : 'Connect'}
                         </button>
                      </div>
                   </div>
                 ))}
               </div>
            </div>
          )}

          {activeTab === 'Notifications' && (
            <div className="space-y-8 animate-in fade-in duration-300">
               <div>
                  <h3 className="text-xl font-bold">Preferences</h3>
                  <p className="text-sm text-brand-text-secondary">Control how you want to be alerted for bot activities.</p>
               </div>
               <div className="space-y-4">
                  {[
                    { title: 'Trade Executed', desc: 'Get notified when a buy or sell order is filled.', channels: ['Push', 'Email'] },
                    { title: 'Bot Status Change', desc: 'Alerts when a bot is paused or stopped during trade.', channels: ['Push', 'Email', 'SMS'] },
                    { title: 'Daily Performance Summary', desc: 'Morning report of previous day’s trades.', channels: ['Email'] },
                    { title: 'Drawdown Alert', desc: 'Alert when a bot loses more than 5% in a day.', channels: ['Email', 'SMS', 'Push'] },
                  ].map(notify => (
                    <div key={notify.title} className="p-6 bg-brand-bg/50 border border-brand-border rounded-2xl flex flex-col md:flex-row md:items-center justify-between gap-6">
                      <div className="max-w-sm">
                        <h4 className="font-bold mb-1">{notify.title}</h4>
                        <p className="text-xs text-brand-text-secondary">{notify.desc}</p>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {['Push', 'Email', 'SMS'].map(channel => (
                          <label key={channel} className={cn(
                            "px-3 py-1.5 rounded-lg border text-[10px] font-bold cursor-pointer transition-all flex items-center gap-2",
                            notify.channels.includes(channel) ? "bg-brand-primary/10 border-brand-primary/40 text-brand-primary" : "bg-brand-card border-brand-border text-brand-text-secondary"
                          )}>
                             <input type="checkbox" className="hidden" defaultChecked={notify.channels.includes(channel)} />
                             {channel}
                             {notify.channels.includes(channel) ? <CheckCircle2 size={12} /> : null}
                          </label>
                        ))}
                      </div>
                    </div>
                  ))}
               </div>
            </div>
          )}

          {activeTab === 'Security' && (
            <div className="space-y-10 animate-in fade-in duration-300">
               <div className="space-y-6">
                 <h3 className="text-xl font-bold flex items-center gap-2">
                   <Lock size={20} className="text-brand-primary" />
                   Password & Security
                 </h3>
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                   <div className="space-y-1.5">
                     <label className="text-xs font-bold text-brand-text-secondary uppercase tracking-widest">Current Password</label>
                     <input type="password" placeholder="••••••••" className="w-full bg-brand-bg border border-brand-border rounded-xl py-3 px-4 outline-none focus:ring-1 focus:ring-brand-primary" />
                   </div>
                   <div className="space-y-1.5 md:col-start-1">
                     <label className="text-xs font-bold text-brand-text-secondary uppercase tracking-widest">New Password</label>
                     <input type="password" placeholder="••••••••" className="w-full bg-brand-bg border border-brand-border rounded-xl py-3 px-4 outline-none focus:ring-1 focus:ring-brand-primary" />
                   </div>
                   <div className="space-y-1.5">
                     <label className="text-xs font-bold text-brand-text-secondary uppercase tracking-widest">Confirm New Password</label>
                     <input type="password" placeholder="••••••••" className="w-full bg-brand-bg border border-brand-border rounded-xl py-3 px-4 outline-none focus:ring-1 focus:ring-brand-primary" />
                   </div>
                 </div>
                 <button className="bg-brand-primary text-white text-sm font-bold px-6 py-2.5 rounded-xl shadow-lg shadow-brand-primary/20">Update Password</button>
               </div>

               <div className="pt-10 border-t border-brand-border space-y-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-brand-success/10 flex items-center justify-center text-brand-success">
                        <Smartphone size={20} />
                      </div>
                      <div>
                        <h4 className="font-bold">Two-Factor Authentication</h4>
                        <p className="text-xs text-brand-text-secondary">Secure your account with an extra layer of 2FA.</p>
                      </div>
                    </div>
                    <div className="w-12 h-6 bg-brand-border rounded-full p-1 relative cursor-pointer">
                      <div className="absolute right-1 w-4 h-4 bg-brand-text-secondary rounded-full"></div>
                    </div>
                  </div>
               </div>

               <div className="p-4 bg-amber-500/10 border border-amber-500/20 rounded-2xl flex gap-4">
                  <AlertTriangle className="text-amber-500 shrink-0" size={24} />
                  <div className="space-y-1">
                    <p className="text-sm font-bold text-amber-500">Security Recommendation</p>
                    <p className="text-xs text-brand-text-secondary leading-relaxed">We recommend changing your password every 90 days if you're using high-volume trading bots to ensure maximum security.</p>
                  </div>
               </div>
            </div>
          )}

          {activeTab === 'Subscription' && (
            <div className="space-y-8 animate-in fade-in duration-300">
               <div className="flex flex-col md:flex-row md:items-center justify-between p-8 bg-brand-primary rounded-3xl text-white shadow-2xl shadow-brand-primary/30 relative overflow-hidden">
                  <div className="absolute top-0 right-0 p-8 opacity-20 rotate-12">
                    <TrendingUp size={140} />
                  </div>
                  <div className="relative z-10">
                    <span className="px-3 py-1 bg-white/20 text-[10px] font-black uppercase rounded-full tracking-widest inline-block mb-4">Current Plan</span>
                    <h3 className="text-4xl font-black mb-1">PRO PLAN</h3>
                    <p className="text-sm opacity-80">Next billing on June 15, 2026</p>
                  </div>
                  <div className="relative z-10 mt-8 md:mt-0 text-center md:text-right">
                    <p className="text-sm opacity-80 mb-1">Total Monthly Cost</p>
                    <p className="text-3xl font-black">₹999</p>
                    <button className="mt-4 px-6 py-2 bg-white text-brand-primary font-bold rounded-xl text-sm hover:scale-105 transition-transform">View Invoices</button>
                  </div>
               </div>

               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                 <div className="p-6 bg-brand-bg/50 border border-brand-border rounded-2xl flex items-center justify-between group cursor-pointer hover:border-brand-primary/40 transition-all">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-xl bg-brand-card flex items-center justify-center text-brand-text-secondary group-hover:text-brand-primary"><CreditCard size={20} /></div>
                      <div>
                        <p className="text-sm font-bold uppercase tracking-tight">Payment Method</p>
                        <p className="text-xs text-brand-text-secondary">Visa ending in •••• 4242</p>
                      </div>
                    </div>
                    <ChevronRight size={18} className="text-brand-text-secondary" />
                 </div>
                 <div className="p-6 bg-brand-bg/50 border border-brand-border rounded-2xl flex items-center justify-between group cursor-pointer hover:border-brand-primary/40 transition-all">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-xl bg-brand-card flex items-center justify-center text-brand-text-secondary group-hover:text-brand-primary"><TrendingUp size={20} /></div>
                      <div>
                        <p className="text-sm font-bold uppercase tracking-tight">Usage Statistics</p>
                        <p className="text-xs text-brand-text-secondary">10/10 Bots Active this month</p>
                      </div>
                    </div>
                    <ChevronRight size={18} className="text-brand-text-secondary" />
                 </div>
               </div>

               <div className="text-center p-8 bg-brand-card border-2 border-dashed border-brand-border rounded-3xl">
                  <h4 className="text-lg font-bold mb-2">Need more power?</h4>
                  <p className="text-sm text-brand-text-secondary mb-6 max-w-sm mx-auto">Upgrade to the Enterprise plan for unlimited bots, 1ms execution speed, and 24/7 dedicated RM support.</p>
                  <button className="px-8 py-3 bg-brand-success text-white font-black rounded-xl text-sm shadow-lg shadow-brand-success/20 hover:scale-105 transition-transform">Explore Enterprise</button>
               </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
