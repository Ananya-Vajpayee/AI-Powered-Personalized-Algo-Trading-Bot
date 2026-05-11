# 🤖 TradeBotAI — AI-Powered Algorithmic Trading Platform

> Describe your trading strategy in plain English. We build the bot. You watch it trade.

![Platform Status](https://img.shields.io/badge/status-active-brightgreen)
![Version](https://img.shields.io/badge/version-1.0.0-blue)
![Made for India](https://img.shields.io/badge/made%20for-NSE%20%7C%20BSE-orange)

---

## 📌 Table of Contents

- [Overview](#overview)
- [Live Demo](#live-demo)
- [Features](#features)
- [Pages & Modules](#pages--modules)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
- [Demo Credentials](#demo-credentials)
- [Broker Integration](#broker-integration)
- [Bot Builder — How It Works](#bot-builder--how-it-works)
- [Project Structure](#project-structure)
- [Screenshots](#screenshots)
- [Disclaimer](#disclaimer)

---

## Overview

**TradeBotAI** is a fully client-side, single-file algorithmic trading bot platform built for Indian retail traders. It allows users to describe their trading goals in plain language — and the platform automatically generates a custom trading bot tailored to their risk tolerance, profit targets, and strategy preferences.

The bot then simulates connection to brokers like **Zerodha**, **Groww**, **Upstox**, **Angel One**, and **5paisa**, and executes paper trades autonomously while providing full transparency on every decision via real-time logs.

> ⚠️ This is a **simulation/educational platform**. No real money is involved. All trades, data, and broker connections are simulated.

---

## Live Demo
https://ai-powered-personalized-algo-tradin.vercel.app/

```

**Demo Login:**
```
Email:    demo@tradebotai.com
Password: Demo@1234
```

---
```
## Features

### 🧠 AI Bot Builder
- Describe strategy in plain English (e.g., *"Buy when RSI < 30, sell when RSI > 70, max loss ₹5,000/day"*)
- Auto-parsed into structured bot configuration
- Editable parameters: entry/exit rules, stop loss, target, position sizing
- One-click backtesting with realistic simulated results
- Deploy in Paper Trading or Live mode

### 📊 Real-Time Dashboard
- Live portfolio value with P&L tracking
- Animated ticker prices (updates every 5 seconds)
- Portfolio performance chart (30-day line chart)
- Asset allocation donut chart
- Daily P&L bar chart
- Recent trades activity feed

### 🤖 Active Bot Monitoring
- View all deployed bots with live status
- Real-time trade log simulation (new lines every 3 seconds)
- Pause / Stop / Edit bots on the fly
- Per-bot P&L and trade count

### 📈 Trade History
- Full trade log with filters (date, bot, instrument, action)
- Profit/loss color-coded rows
- Summary statistics (win rate, best/worst trade)
- CSV export

### 📚 Education Hub
- Categorized articles (Getting Started, Strategies, Risk Management, Indicators)
- Trading glossary (20+ terms, plain-English definitions)
- Tutorial video placeholders
- Difficulty badges (Beginner / Intermediate / Advanced)

### 🔐 Authentication
- Login with validation and loading state
- Register with password strength meter
- Logout with confirmation modal
- Session persistence via localStorage

### ⚙️ Settings
- Broker connection management
- Notification preferences
- Security (2FA toggle, password change)
- Subscription plan management

---

## Pages & Modules

| Page | Description |
|------|-------------|
| **Landing** | Marketing page with features, how it works, pricing, testimonials |
| **Login** | Email/password auth with demo credentials shown |
| **Register** | Account creation with password strength indicator |
| **Dashboard** | Portfolio overview, charts, live tickers, recent activity |
| **Bot Builder** | 4-step wizard: Describe → Configure → Backtest → Deploy |
| **Active Bots** | Monitor deployed bots, view real-time logs |
| **Trade History** | Filterable trade log with CSV export |
| **Education Hub** | Articles, glossary, video tutorials |
| **Settings** | Profile, brokers, notifications, security, subscription |

---
## Run Locally

**Prerequisites:**  Node.js


1. Install dependencies:
   `npm install`
2. Set the `GEMINI_API_KEY` in [.env.local](.env.local) to your Gemini API key
3. Run the app:
   `npm run dev`
---

## Demo Credentials

| Field | Value |
|-------|-------|
| Email | `demo@tradebotai.com` |
| Password | `Demo@1234` |

These are displayed on the login page for easy access. You can also register a new account — it's stored locally in your browser.

---

## Broker Integration

The platform supports simulated connection to the following brokers:

| Broker | Status | Notes |
|--------|--------|-------|
| **Zerodha (Kite)** | ✅ Simulated | Kite Connect API format |
| **Groww** | ✅ Simulated | Paper trading only |
| **Upstox** | ✅ Simulated | Upstox API v2 format |
| **Angel One** | ✅ Simulated | SmartAPI format |
| **5paisa** | ✅ Simulated | 5paisa API format |

> To connect a real broker in a production version, you would replace the simulation layer with the broker's actual REST/WebSocket API and implement proper OAuth or API key authentication.

**API Key fields** in the Settings page are masked inputs — nothing is transmitted anywhere. This is a frontend-only simulation.

---

## Bot Builder — How It Works

The Bot Builder is a 4-step wizard:

### Step 1: Describe in Plain Language
Type your strategy naturally:
```
"Buy Nifty 50 stocks when RSI drops below 30 and
 sell when RSI crosses 70. Max loss ₹5,000 per day."
```

### Step 2: Auto-Configuration
The platform parses your description and fills in:
- Strategy type (Momentum / Mean Reversion / Breakout / Swing / Scalping)
- Entry and exit conditions (displayed as readable rules)
- Risk settings (stop loss %, target %, position size)
- Trading instruments (auto-selected from NSE/BSE universe)
- Trading hours (default: 9:15 AM – 3:30 PM IST)

All fields are editable after auto-fill.

### Step 3: Backtest
Click **Run Backtest** to simulate historical performance:
- Total Return, Max Drawdown, Sharpe Ratio, Win Rate
- Equity curve chart
- Monthly returns heatmap

### Step 4: Deploy
- Select broker
- Set capital allocation
- Toggle Paper Trading (recommended for beginners)
- Click **Deploy Bot** → bot goes live in the Active Bots panel

---

## Project Structure

```
tradebotai/
│
├── index.html          ← Entire application (HTML + CSS + JS)
├── README.md           ← This file
```

Everything lives in `index.html`. The internal structure of the JS is:

```
State Management        → window.appState object + localStorage
Routing                 → showPage(pageName) function
Authentication          → login(), register(), logout()
Dashboard               → initDashboard(), startTickerUpdates()
Bot Builder             → generateBot(), runBacktest(), deployBot()
Charts                  → Chart.js instances per page
Bot Log Simulation      → setInterval appending log lines
Trade History           → renderTradeHistory() with filters
Education Hub           → renderArticle(id) with category sidebar
Settings                → tab-based settings panels
Notifications/Modals    → showToast(), showModal() utilities
```

---
```
## Screenshots

<img width="953" height="436" alt="Screenshot 2026-05-09 203821" src="https://github.com/user-attachments/assets/a3439ff0-66ce-4cf8-b192-e2f45ae1a83c" />


<img width="958" height="433" alt="image" src="https://github.com/user-attachments/assets/da6839c3-2287-4ece-b9c5-352b86358b7e" />



### Add More Stocks
Edit the `INSTRUMENTS` array in the JavaScript section:
```javascript
const INSTRUMENTS = [
  'RELIANCE', 'TCS', 'INFY', 'HDFC', 'WIPRO',
  // Add more NSE/BSE symbols here
];
```

### Change Simulated Returns
Edit the `BACKTEST_DEFAULTS` object to adjust simulated backtest results:
```javascript
const BACKTEST_DEFAULTS = {
  totalReturn: 34.2,
  maxDrawdown: -8.4,
  sharpeRatio: 1.87,
  winRate: 63,
  totalTrades: 142
};
```

---

## Roadmap

- [ ] Real broker API integration (Zerodha Kite Connect)
- [ ] WebSocket live market data feed
- [ ] Natural language processing via LLM API for bot configuration
- [ ] Mobile app (React Native)
- [ ] Multi-user backend (Node.js + PostgreSQL)
- [ ] Email/SMS alerts via Twilio / SendGrid
- [ ] Strategy marketplace (buy/sell community bots)
- [ ] Paper trading performance leaderboard

---

## Disclaimer

> **IMPORTANT:** TradeBotAI is an **educational and simulation platform only**.
>
> - No real trades are placed. All trading activity is simulated.
> - No real money is involved at any point.
> - API key fields do not transmit data anywhere.
> - Past simulated performance does not guarantee future real results.
> - Trading in financial markets involves significant risk of loss.
> - Please consult a **SEBI-registered investment advisor** before making any real investment decisions.
>
> This platform is built for learning and demonstration purposes.
