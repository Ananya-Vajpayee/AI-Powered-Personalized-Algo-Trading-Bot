/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface Stock {
  symbol: string;
  name: string;
  price: number;
  change: number;
  changePercent: number;
}

export const INDIAN_STOCKS: Stock[] = [
  { symbol: "RELIANCE", name: "Reliance Industries Ltd.", price: 2845.50, change: 12.40, changePercent: 0.44 },
  { symbol: "TCS", name: "Tata Consultancy Services", price: 3912.00, change: -45.20, changePercent: -1.14 },
  { symbol: "INFY", name: "Infosys Ltd.", price: 1542.30, change: 8.75, changePercent: 0.57 },
  { symbol: "HDFCBANK", name: "HDFC Bank Ltd.", price: 1452.10, change: -2.30, changePercent: -0.16 },
  { symbol: "ICICIBANK", name: "ICICI Bank Ltd.", price: 1024.45, change: 15.60, changePercent: 1.54 },
  { symbol: "BHARTIARTL", name: "Bharti Airtel Ltd.", price: 1120.30, change: 5.40, changePercent: 0.48 },
  { symbol: "SBIN", name: "State Bank of India", price: 745.20, change: -3.10, changePercent: -0.41 },
  { symbol: "LTIM", name: "LTIMindtree Ltd.", price: 4890.00, change: 112.50, changePercent: 2.35 },
  { symbol: "WIPRO", name: "Wipro Ltd.", price: 456.70, change: 1.20, changePercent: 0.26 },
  { symbol: "HCLTECH", name: "HCL Technologies Ltd.", price: 1420.50, change: -12.40, changePercent: -0.86 },
  { symbol: "ADANIENT", name: "Adani Enterprises Ltd.", price: 3120.00, change: 45.30, changePercent: 1.47 },
  { symbol: "ITC", name: "ITC Ltd.", price: 432.10, change: -1.25, changePercent: -0.29 },
  { symbol: "ASIANPAINT", name: "Asian Paints Ltd.", price: 2890.30, change: 32.15, changePercent: 1.13 },
  { symbol: "KOTAKBANK", name: "Kotak Mahindra Bank", price: 1720.50, change: -5.40, changePercent: -0.31 },
  { symbol: "ULTRACEMCO", name: "UltraTech Cement Ltd.", price: 9840.00, change: 156.40, changePercent: 1.61 },
  // ... adding more to reach "at least 50"
  { symbol: "AXISBANK", name: "Axis Bank Ltd.", price: 1045.30, change: 12.10, changePercent: 1.17 },
  { symbol: "TITAN", name: "Titan Company Ltd.", price: 3450.00, change: -23.40, changePercent: -0.67 },
  { symbol: "MARUTI", name: "Maruti Suzuki India", price: 11230.00, change: 89.20, changePercent: 0.80 },
  { symbol: "M&M", name: "Mahindra & Mahindra", price: 1920.50, change: 45.10, changePercent: 2.40 },
  { symbol: "BAJFINANCE", name: "Bajaj Finance Ltd.", price: 6780.00, change: -120.30, changePercent: -1.74 },
  { symbol: "BAJAJ-AUTO", name: "Bajaj Auto Ltd.", price: 8920.00, change: 34.20, changePercent: 0.38 },
  { symbol: "SUNPHARMA", name: "Sun Pharmaceutical", price: 1540.20, change: 12.40, changePercent: 0.81 },
  { symbol: "L&T", name: "Larsen & Toubro Ltd.", price: 3456.70, change: -12.30, changePercent: -0.35 },
  { symbol: "JSWSTEEL", name: "JSW Steel Ltd.", price: 845.20, change: 14.50, changePercent: 1.74 },
  { symbol: "TATASTEEL", name: "Tata Steel Ltd.", price: 145.30, change: 2.10, changePercent: 1.47 },
  { symbol: "GRASIM", name: "Grasim Industries", price: 2230.40, change: -15.20, changePercent: -0.68 },
  { symbol: "POWERGRID", name: "Power Grid Corp.", price: 275.40, change: 4.20, changePercent: 1.55 },
  { symbol: "NTPC", name: "NTPC Ltd.", price: 345.10, change: 2.30, changePercent: 0.67 },
  { symbol: "INDUSINDBK", name: "IndusInd Bank", price: 1480.00, change: -12.40, changePercent: -0.83 },
  { symbol: "HINDALCO", name: "Hindalco Industries", price: 540.20, change: 8.70, changePercent: 1.64 },
  { symbol: "NESTLEIND", name: "Nestle India Ltd.", price: 2450.00, change: -12.50, changePercent: -0.51 },
  { symbol: "RECLTD", name: "REC Ltd.", price: 450.30, change: 12.40, changePercent: 2.83 },
  { symbol: "PFC", name: "Power Finance Corp.", price: 380.20, change: 8.90, changePercent: 2.40 },
  { symbol: "COALINDIA", name: "Coal India Ltd.", price: 445.60, change: -4.30, changePercent: -0.96 },
  { symbol: "TATAMOTORS", name: "Tata Motors Ltd.", price: 980.20, change: 15.40, changePercent: 1.60 },
  { symbol: "BRITANNIA", name: "Britannia Industries", price: 4890.30, change: -23.40, changePercent: -0.48 },
  { symbol: "DIVISLAB", name: "Divi's Laboratories", price: 3450.00, change: 45.20, changePercent: 1.33 },
  { symbol: "CIPLA", name: "Cipla Ltd.", price: 1390.20, change: 12.10, changePercent: 0.88 },
  { symbol: "DRREDDY", name: "Dr. Reddy's Labs", price: 6230.50, change: -56.40, changePercent: -0.90 },
  { symbol: "APOLLOHOSP", name: "Apollo Hospitals", price: 5980.00, change: 34.20, changePercent: 0.57 },
  { symbol: "TECHM", name: "Tech Mahindra Ltd.", price: 1245.30, change: -8.70, changePercent: -0.70 },
  { symbol: "EICHERMOT", name: "Eicher Motors Ltd.", price: 3980.00, change: 45.20, changePercent: 1.15 },
  { symbol: "BPCL", name: "Bharat Petroleum", price: 590.20, change: 12.30, changePercent: 2.13 },
  { symbol: "HEROMOTOCO", name: "Hero MotoCorp Ltd.", price: 4560.00, change: -34.50, changePercent: -0.75 },
  { symbol: "ONGC", name: "Oil & Natural Gas", price: 275.40, change: 5.60, changePercent: 2.08 },
  { symbol: "SBILIFE", name: "SBI Life Insurance", price: 1450.20, change: 8.90, changePercent: 0.62 },
  { symbol: "HDFCLIFE", name: "HDFC Life Insurance", price: 590.30, change: -4.50, changePercent: -0.76 },
  { symbol: "WIPRO", name: "Wipro Ltd.", price: 460.20, change: 1.50, changePercent: 0.33 },
  { symbol: "JIOFIN", name: "Jio Financial Services", price: 345.20, change: 12.40, changePercent: 3.73 },
  { symbol: "ZOMATO", name: "Zomato Ltd.", price: 185.30, change: 4.20, changePercent: 2.32 },
  { symbol: "NYKAA", name: "FSN E-Commerce (Nykaa)", price: 156.40, change: -2.10, changePercent: -1.33 },
  { symbol: "PAYTM", name: "One 97 Communications", price: 380.50, change: -15.40, changePercent: -3.89 },
];

export const EDUCATIONAL_ARTICLES = [
  {
    category: "Getting Started",
    title: "Introduction to Algorithmic Trading",
    readTime: "5 min",
    difficulty: "Beginner",
    content: "Algorithmic trading is a method of executing orders using automated pre-programmed trading instructions accounting for variables such as time, price, and volume. This type of trading attempts to leverage the speed and computational resources of computers relative to human traders. For retail traders in India, platforms like TradeBot AI bridge the gap between complex coding and simple logic. You can now define 'If RSI < 30 then Buy' and let the system handle the execution. This eliminates emotional bias and ensures disciplined trading sessions.",
    takeaways: ["Algo trading removes emotional bias", "Speed of execution is superior", "Consistency in strategy implementation"]
  },
  {
    category: "Trading Strategies",
    title: "Mean Reversion vs Momentum",
    readTime: "8 min",
    difficulty: "Intermediate",
    content: "Mean reversion is the theory that prices and returns eventually move back towards an average or mean. This mean can be the historical average of the price, or another relevant average like the return of the industry or the market. Momentum trading, on the other hand, involves going with the flow. If a stock is rising, you buy it; if it is falling, you sell it. In the Indian market, momentum plays out well in high-beta stocks during bull runs, while mean reversion works beautifully in range-bound indices like Nifty Bank occasionally.",
    takeaways: ["Mean reversion bets on the 'bounce back'", "Momentum bets on the trend continuing", "Choosing the right strategy depends on market phase"]
  },
  {
    category: "Risk Management",
    title: "The 2% Rule in Trading",
    readTime: "4 min",
    difficulty: "Beginner",
    content: "One of the most important concepts in risk management is never risking more than a small percentage of your total capital on a single trade. The common benchmark is 2%. This means if you have ₹1,00,000, you should not lose more than ₹2,000 on one trade. This isn't your position size; it's your maximum loss. If you buy at 100 with a stop loss at 98, that's a 2-point risk. To stick to the 2% rule, you can buy up to 1000 shares.",
    takeaways: ["Never risk more than 1-2% per trade", "Survival is the priority in trading", "Compounding works best when drawdowns are small"]
  }
];

export const GLOSSARY: Record<string, string> = {
  "RSI": "Relative Strength Index - A momentum oscillator that measures the speed and change of price movements.",
  "Moving Average": "A widely used indicator in technical analysis that helps smooth out price action by filtering out the “noise” from random short-term price fluctuations.",
  "Stop Loss": "An order placed with a broker to buy or sell a specific stock once the stock reaches a certain price, intended to limit an investor's loss on a security position.",
  "Target Profit": "The price level at which you want to exit a trade with a profit.",
  "Drawdown": "The peak-to-trough decline during a specific period for an investment, trading account, or fund.",
  "Sharpe Ratio": "A measure used to understand the return of an investment compared to its risk.",
  "P&L": "Profit and Loss - The net gain or loss over a specific period.",
  "Nifty 50": "The benchmark stock market index for the Indian equity market.",
  "F&O": "Futures and Options - Derivative instruments traded on the exchange.",
  "Scalping": "A trading style that specializes in profiting from small price changes and making a fast profit off reselling.",
};
