import { useState } from 'react';
import { 
  BookOpen, 
  Search, 
  Clock, 
  ChevronRight, 
  ExternalLink,
  PlayCircle,
  HelpCircle,
  FileText,
  Star
} from 'lucide-react';
import { EDUCATIONAL_ARTICLES, GLOSSARY } from '../constants';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export default function LearnHub() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [search, setSearch] = useState('');
  const [selectedArticle, setSelectedArticle] = useState<typeof EDUCATIONAL_ARTICLES[0] | null>(null);

  const categories = ['All', 'Getting Started', 'Trading Strategies', 'Risk Management', 'Technical Indicators', 'Market Psychology'];
  const filteredArticles = EDUCATIONAL_ARTICLES.filter(a => 
    (activeCategory === 'All' || a.category === activeCategory) &&
    (a.title.toLowerCase().includes(search.toLowerCase()) || a.content.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div className="space-y-8">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Learn Hub</h1>
          <p className="text-brand-text-secondary mt-1">Master algorithmic trading with our expert-curated guides.</p>
        </div>
        <div className="relative w-full md:w-80">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-brand-text-secondary" size={18} />
          <input 
            type="text" 
            placeholder="Search keywords..." 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-brand-card border border-brand-border rounded-xl py-2.5 pl-10 pr-4 outline-none focus:ring-1 focus:ring-brand-primary text-sm"
          />
        </div>
      </header>

      {selectedArticle ? (
        <div className="bg-brand-card border border-brand-border rounded-3xl overflow-hidden shadow-2xl">
           <div className="p-8 border-b border-brand-border bg-brand-bg/30">
              <button 
                onClick={() => setSelectedArticle(null)}
                className="text-brand-primary text-sm font-bold flex items-center gap-1 mb-6 hover:translate-x-[-4px] transition-transform"
              >
                ← Back to hub
              </button>
              <div className="flex flex-wrap items-center gap-3 mb-4">
                <span className="px-3 py-1 bg-brand-primary/10 text-brand-primary text-[10px] font-bold uppercase rounded-full border border-brand-primary/20">{selectedArticle.category}</span>
                <span className="flex items-center gap-1 text-[10px] text-brand-text-secondary font-bold uppercase tracking-widest bg-brand-bg px-2 py-1 rounded">
                  <Clock size={12} /> {selectedArticle.readTime}
                </span>
                <span className="flex items-center gap-1 text-[10px] text-brand-success font-bold uppercase tracking-widest bg-brand-success/10 px-2 py-1 rounded border border-brand-success/20">
                   {selectedArticle.difficulty}
                </span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight max-w-3xl leading-tight">{selectedArticle.title}</h2>
           </div>
           <div className="p-8 md:p-12">
              <div className="max-w-3xl prose prose-invert">
                <p className="text-lg text-brand-text-primary leading-relaxed mb-12">
                  {selectedArticle.content}
                </p>
                
                <div className="bg-brand-bg/50 border border-brand-border p-8 rounded-2xl mb-12 relative overflow-hidden">
                   <div className="absolute top-0 right-0 p-4 opacity-10">
                     <Star size={80} />
                   </div>
                   <h4 className="text-lg font-bold mb-6 flex items-center gap-2">
                     <CheckCircle2 size={24} className="text-brand-primary" />
                     Key Takeaways
                   </h4>
                   <ul className="space-y-4">
                     {selectedArticle.takeaways.map((tip, i) => (
                       <li key={i} className="flex gap-3 text-brand-text-primary font-medium">
                         <span className="w-6 h-6 rounded-full bg-brand-primary flex items-center justify-center text-[10px] shrink-0">{i+1}</span>
                         {tip}
                       </li>
                     ))}
                   </ul>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12 py-12 border-t border-brand-border">
                  <div className="flex gap-4">
                    <div className="w-12 h-12 rounded-xl bg-brand-primary/10 flex items-center justify-center text-brand-primary shrink-0">
                      <HelpCircle size={24} />
                    </div>
                    <div>
                      <h5 className="font-bold mb-1">Related Glossary</h5>
                      <p className="text-xs text-brand-text-secondary">Explore terms mentioned in this article.</p>
                      <button className="text-brand-primary text-xs font-bold mt-2 hover:underline">View Glossary →</button>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="w-12 h-12 rounded-xl bg-brand-success/10 flex items-center justify-center text-brand-success shrink-0">
                      <FileText size={24} />
                    </div>
                    <div>
                      <h5 className="font-bold mb-1">External Resources</h5>
                      <p className="text-xs text-brand-text-secondary">Official SEBI educational portal link.</p>
                      <button className="text-brand-primary text-xs font-bold mt-2 hover:underline flex items-center gap-1">Visit Portal <ExternalLink size={12} /></button>
                    </div>
                  </div>
                </div>
              </div>
           </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <aside className="lg:col-span-1 space-y-2">
            {categories.map(cat => (
              <button 
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={cn(
                  "w-full text-left px-4 py-3 rounded-xl text-sm font-semibold transition-all",
                  activeCategory === cat ? "bg-brand-primary text-white shadow-lg shadow-brand-primary/20" : "text-brand-text-secondary hover:bg-brand-card"
                )}
              >
                {cat}
              </button>
            ))}
          </aside>

          <main className="lg:col-span-3 space-y-12">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredArticles.map((article, i) => (
                <div 
                  key={i} 
                  onClick={() => setSelectedArticle(article)}
                  className="bg-brand-card border border-brand-border p-6 rounded-3xl hover:border-brand-primary/40 transition-all cursor-pointer group flex flex-col h-full"
                >
                  <div className="flex items-center justify-between mb-4">
                    <span className="px-2.5 py-1 bg-brand-primary/10 text-brand-primary text-[10px] font-bold rounded uppercase border border-brand-primary/20 group-hover:bg-brand-primary group-hover:text-white transition-colors">
                      {article.category}
                    </span>
                    <span className="flex items-center gap-1 text-[10px] text-brand-text-secondary font-bold uppercase tracking-widest">
                      <Clock size={12} /> {article.readTime}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold mb-3 leading-tight group-hover:text-brand-primary transition-colors">{article.title}</h3>
                  <p className="text-brand-text-secondary text-sm line-clamp-3 mb-6 flex-1 leading-relaxed">{article.content}</p>
                  <div className="flex items-center justify-between mt-auto pt-4 border-t border-brand-border group-hover:border-brand-primary/20">
                    <span className="text-xs font-bold text-brand-success">{article.difficulty}</span>
                    <div className="flex items-center gap-1 text-brand-primary text-sm font-bold opacity-0 group-hover:opacity-100 transition-opacity">
                      Read Now <ChevronRight size={16} />
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Glossary Section */}
            <section className="bg-brand-card border border-brand-border rounded-3xl p-8">
               <h3 className="text-2xl font-bold mb-8 flex items-center gap-3">
                 <BookOpen size={28} className="text-brand-primary" />
                 Trading Glossary
               </h3>
               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-8 gap-x-12">
                  {Object.entries(GLOSSARY).map(([term, definition]) => (
                    <div key={term} className="space-y-1">
                      <p className="text-sm font-black text-brand-text-primary tracking-tight">{term}</p>
                      <p className="text-xs text-brand-text-secondary leading-relaxed">{definition}</p>
                    </div>
                  ))}
               </div>
            </section>

            {/* Video Tutorials placeholders */}
            <section>
              <h3 className="text-2xl font-bold mb-8 flex items-center gap-3">
                <PlayCircle size={28} className="text-brand-primary" />
                Video Tutorials
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                 {[
                   'Setting up your API keys',
                   'First Bot Strategy Guide',
                   'Managing Risk in Volatile Markets',
                   'Backtesting Best Practices',
                   'Scaling your Trading Size',
                   'Connecting Multiple Brokers'
                 ].map((title, i) => (
                   <div key={i} className="group relative bg-brand-card border border-brand-border rounded-2xl overflow-hidden cursor-pointer hover:border-brand-primary/40 transition-all">
                      <div className="aspect-video bg-brand-bg flex items-center justify-center relative overflow-hidden">
                         <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-0"></div>
                         <PlayCircle size={48} className="text-white/80 group-hover:scale-125 group-hover:text-brand-primary transition-all z-10" />
                         <img src={`https://images.unsplash.com/photo-1611974717525-587da5a78cc8?q=80&w=400&auto=format&fit=crop`} className="absolute inset-0 w-full h-full object-cover opacity-30 group-hover:scale-105 transition-transform" />
                      </div>
                      <div className="p-4">
                        <p className="text-sm font-bold group-hover:text-brand-primary transition-colors leading-snug">{title}</p>
                        <p className="text-[10px] text-brand-text-secondary mt-2 uppercase font-bold tracking-widest">Tutorial • 12 mins</p>
                      </div>
                   </div>
                 ))}
              </div>
            </section>
          </main>
        </div>
      )}
    </div>
  );
}

import { CheckCircle2 } from 'lucide-react';
