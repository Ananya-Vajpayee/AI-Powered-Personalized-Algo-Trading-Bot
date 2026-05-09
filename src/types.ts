/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type Page = 
  | 'landing' 
  | 'login' 
  | 'register' 
  | 'dashboard' 
  | 'bot-builder' 
  | 'active-bots' 
  | 'trade-history' 
  | 'learn' 
  | 'settings';

export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  portfolioValue: number;
  todayPnL: number;
  winRate: number;
}

export type BotStatus = 'active' | 'paused' | 'stopped';

export interface Bot {
  id: string;
  name: string;
  strategyType: string;
  status: BotStatus;
  broker: string;
  capitalAllocated: number;
  currentPnL: number;
  tradesToday: number;
  logs: string[];
  createdAt: number;
}

export interface Trade {
  id: string;
  date: number;
  botName: string;
  instrument: string;
  action: 'Buy' | 'Sell';
  qty: number;
  entryPrice: number;
  exitPrice?: number;
  pnl?: number;
  status: 'Profit' | 'Loss' | 'Open';
}

export interface AppState {
  user: User | null;
  currentPage: Page;
  bots: Bot[];
  trades: Trade[];
  isLoggingOut: boolean;
  notifications: Array<{ id: string; title: string; time: string }>;
}
