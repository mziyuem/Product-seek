
import React, { useState } from 'react';
import { Icons, MOCK_PRODUCTS } from '../constants';

interface HomeViewProps {
  onExplore: (query: string) => void;
}

const HomeView: React.FC<HomeViewProps> = ({ onExplore }) => {
  const [query, setQuery] = useState('');

  return (
    <div className="relative pt-32 pb-24 px-8 overflow-hidden">
      <div className="max-w-5xl mx-auto text-center relative z-10">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-indigo-500/30 bg-indigo-500/10 text-indigo-300 text-[10px] font-bold tracking-[0.2em] uppercase mb-12 animate-pulse">
          <Icons.AIIcon />
          Neural Engine Active | v3.5 Stable
        </div>
        
        <h1 className="text-7xl md:text-8xl font-black mb-8 tracking-tighter leading-none">
          <span className="text-gradient">DESIGN THE</span><br/>
          <span className="text-indigo-500">NEXT ENTITY.</span>
        </h1>
        
        <p className="text-xl text-slate-400 mb-16 max-w-2xl mx-auto font-light leading-relaxed">
          Nexus Intelligence is a strategic sandbox for product architects. 
          Bridge the gap between raw data and market dominance.
        </p>

        {/* Cognitive Input Gateway */}
        <div className="relative max-w-3xl mx-auto group mb-32">
          <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl blur-lg opacity-20 group-focus-within:opacity-40 transition-opacity duration-500"></div>
          <div className="relative glass rounded-2xl p-1.5 flex items-center overflow-hidden">
            <input 
              type="text" 
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && onExplore(query)}
              placeholder="Query the lab: 'Disrupt the local logistics market'..."
              className="flex-1 bg-transparent border-none focus:ring-0 text-xl px-8 py-6 placeholder:text-slate-500 font-light"
            />
            <button 
              onClick={() => onExplore(query)}
              className="bg-indigo-600 hover:bg-indigo-500 text-white w-20 h-20 rounded-xl flex items-center justify-center transition-all duration-300 shadow-[0_0_30px_rgba(79,70,229,0.3)]"
            >
              <Icons.ArrowRight />
            </button>
          </div>
        </div>

        {/* Featured Entities */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
          {MOCK_PRODUCTS.map(p => (
            <div 
              key={p.id} 
              className="glass glass-hover p-8 rounded-3xl transition-all duration-500 group cursor-pointer"
              onClick={() => onExplore(p.name)}
            >
              <div className="flex justify-between items-start mb-6">
                <div className="text-[10px] font-black text-indigo-400 uppercase tracking-widest">{p.domain}</div>
                <div className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.5)]"></div>
              </div>
              <h3 className="text-2xl font-bold mb-4 group-hover:text-indigo-400 transition-colors">{p.name}</h3>
              <p className="text-slate-400 text-sm leading-relaxed font-light line-clamp-2 mb-6">{p.description}</p>
              <div className="flex items-center gap-2 text-indigo-400 font-bold text-[10px] uppercase tracking-tighter opacity-0 group-hover:opacity-100 transition-opacity">
                Analyze Entity <Icons.ArrowRight />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomeView;
