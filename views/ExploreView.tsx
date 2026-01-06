
import React, { useState } from 'react';
import { Product, ProductStatus } from '../types';
import { Icons } from '../constants';
import RadarChart from '../components/RadarChart';

interface ExploreViewProps {
  products: Product[];
  searchQuery?: string;
  onSelect: (p: Product) => void;
  onAddToCompare: (p: Product) => void;
  comparisonSetIds: string[];
}

const ExploreView: React.FC<ExploreViewProps> = ({ products, searchQuery = '', onSelect, onAddToCompare, comparisonSetIds }) => {
  const [localSearch, setLocalSearch] = useState(searchQuery);

  const filtered = products.filter(p => 
    p.name.toLowerCase().includes(localSearch.toLowerCase()) || 
    p.description.toLowerCase().includes(localSearch.toLowerCase()) ||
    p.domain.toLowerCase().includes(localSearch.toLowerCase())
  );

  return (
    <div className="max-w-6xl mx-auto px-8 py-24">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-20">
        <div className="max-w-xl">
          <h2 className="text-5xl font-black tracking-tight text-white mb-4">Entity Explorer</h2>
          <p className="text-slate-400 font-light text-lg">Cross-referencing global product patterns and strategic gaps.</p>
        </div>
        
        <div className="relative w-full md:w-96">
          <div className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-500">
            <Icons.Search />
          </div>
          <input 
            type="text" 
            placeholder="Search Intelligence Database..."
            className="w-full pl-16 pr-6 py-5 bg-slate-900/50 border border-slate-800 rounded-2xl focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all text-white placeholder:text-slate-600 font-light"
            value={localSearch}
            onChange={(e) => setLocalSearch(e.target.value)}
          />
        </div>
      </div>

      <div className="space-y-6">
        {filtered.length > 0 ? filtered.map((p) => (
          <div 
            key={p.id}
            className="group glass glass-hover rounded-[32px] flex items-center p-8 gap-12 transition-all duration-500 cursor-pointer"
            onClick={() => onSelect(p)}
          >
            {/* Left Column: Visual Signature */}
            <div className="hidden lg:block relative">
              <div className="absolute inset-0 bg-indigo-500/20 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <RadarChart metrics={p.metrics} size={140} mini={true} />
            </div>

            {/* Main Content */}
            <div className="flex-1">
              <div className="flex items-center gap-4 mb-3">
                <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-[0.1em] border ${
                  p.status === ProductStatus.EXISTING 
                    ? 'text-emerald-400 border-emerald-500/20 bg-emerald-500/5' 
                    : 'text-amber-400 border-amber-500/20 bg-amber-500/5'
                }`}>
                  {p.status}
                </span>
                <span className="text-[10px] text-slate-500 font-black uppercase tracking-widest">{p.domain}</span>
              </div>
              <h3 className="text-3xl font-bold text-white mb-3 group-hover:text-indigo-400 transition-colors">{p.name}</h3>
              <p className="text-slate-400 font-light leading-relaxed max-w-2xl line-clamp-1">{p.description}</p>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-3" onClick={e => e.stopPropagation()}>
              <button 
                onClick={() => onAddToCompare(p)}
                disabled={comparisonSetIds.includes(p.id)}
                className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-all border ${
                  comparisonSetIds.includes(p.id) 
                    ? 'bg-indigo-600 border-indigo-500 text-white' 
                    : 'bg-slate-900 border-slate-800 text-slate-500 hover:border-indigo-500 hover:text-indigo-400'
                }`}
              >
                {comparisonSetIds.includes(p.id) ? (
                   <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5"/></svg>
                ) : <Icons.Plus />}
              </button>
              <button 
                onClick={() => onSelect(p)}
                className="w-14 h-14 bg-white text-black rounded-2xl flex items-center justify-center hover:bg-indigo-400 transition-all"
              >
                <Icons.ArrowRight />
              </button>
            </div>
          </div>
        )) : (
          <div className="text-center py-40 glass rounded-[40px]">
            <div className="text-slate-700 mb-6 flex justify-center opacity-50 scale-150"><Icons.Search /></div>
            <p className="text-slate-500 font-light text-xl">No entities match your search parameters.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ExploreView;
