
import React, { useState, useEffect } from 'react';
import { Product } from '../types';
import { Icons } from '../constants';
import RadarChart from '../components/RadarChart';
import { compareProducts } from '../services/gemini';

interface ComparisonViewProps {
  products: Product[];
  onBack: () => void;
}

const ComparisonView: React.FC<ComparisonViewProps> = ({ products, onBack }) => {
  const [comparisonInsight, setComparisonInsight] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchComparison = async () => {
      setLoading(true);
      try {
        const res = await compareProducts(products);
        setComparisonInsight(res);
      } catch (e) {
        setComparisonInsight("Comparison generation failed. Please check your AI settings.");
      } finally {
        setLoading(false);
      }
    };
    if (products.length > 0) fetchComparison();
  }, [products]);

  return (
    <div className="max-w-7xl mx-auto px-8 py-12">
      <div className="flex items-center justify-between mb-12">
        <div>
          <h2 className="text-3xl font-bold text-slate-900 tracking-tight">Competitive Matrix</h2>
          <p className="text-slate-500 mt-1">Cross-referencing multi-dimensional product data points.</p>
        </div>
        <button onClick={onBack} className="text-slate-500 hover:text-slate-800 transition-colors flex items-center gap-2">
          <Icons.ArrowRight />
          <span className="rotate-180">Back</span>
        </button>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-4 gap-8 mb-12">
        {/* Comparison Table/Grid */}
        <div className="xl:col-span-3">
          <div className="glass-panel rounded-3xl overflow-hidden border border-slate-100 shadow-sm">
            <div className="grid" style={{ gridTemplateColumns: `repeat(${products.length + 1}, 1fr)` }}>
              {/* Header Row */}
              <div className="p-6 bg-slate-50 border-r border-b border-slate-200 flex items-center justify-center font-bold text-xs text-slate-400 tracking-widest">DIMENSION</div>
              {products.map(p => (
                <div key={p.id} className="p-6 bg-white border-r border-b border-slate-100 last:border-r-0 text-center">
                  <div className="w-10 h-10 bg-indigo-600 text-white rounded-full mx-auto mb-3 flex items-center justify-center font-bold">{p.name[0]}</div>
                  <div className="font-bold text-slate-900">{p.name}</div>
                </div>
              ))}

              {/* Radar Chart Row */}
              <div className="p-6 bg-slate-50/50 border-r border-b border-slate-100 flex items-center justify-center font-bold text-xs text-slate-400 tracking-widest">DNA MAPPING</div>
              {products.map(p => (
                <div key={p.id} className="p-6 border-r border-b border-slate-100 last:border-r-0 flex justify-center">
                  <RadarChart metrics={p.metrics} size={160} mini={true} />
                </div>
              ))}

              {/* Status Row */}
              <div className="p-6 bg-slate-50/50 border-r border-b border-slate-100 flex items-center justify-center font-bold text-xs text-slate-400 tracking-widest">STATUS</div>
              {products.map(p => (
                <div key={p.id} className="p-6 border-r border-b border-slate-100 last:border-r-0 text-center">
                  <span className={`px-3 py-1 rounded-full text-[10px] font-bold tracking-widest border ${
                    p.status === 'Existing' ? 'bg-emerald-50 text-emerald-700 border-emerald-100' : 'bg-amber-50 text-amber-700 border-amber-100'
                  }`}>
                    {p.status.toUpperCase()}
                  </span>
                </div>
              ))}

              {/* Primary Market Row */}
              <div className="p-6 bg-slate-50/50 border-r border-slate-100 flex items-center justify-center font-bold text-xs text-slate-400 tracking-widest">MARKET</div>
              {products.map(p => (
                <div key={p.id} className="p-6 border-r border-slate-100 last:border-r-0 text-center text-sm text-slate-600 italic">
                  {p.domain}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* AI Insight Sidebar */}
        <div className="xl:col-span-1 space-y-6">
          <div className="glass-panel p-8 rounded-3xl bg-indigo-900 text-white border-indigo-800 shadow-xl">
            <div className="flex items-center gap-3 mb-6 text-indigo-200">
              <Icons.AIIcon />
              <h3 className="font-bold tracking-tight">Cross-Product Verdict</h3>
            </div>
            
            {loading ? (
              <div className="space-y-3 animate-pulse">
                <div className="h-3 bg-indigo-800 rounded w-full" />
                <div className="h-3 bg-indigo-800 rounded w-5/6" />
                <div className="h-3 bg-indigo-800 rounded w-4/6" />
              </div>
            ) : (
              <p className="text-sm text-indigo-50 leading-relaxed font-light">
                {comparisonInsight || "The AI is calculating differentiation paths based on shared market data..."}
              </p>
            )}
          </div>

          <div className="glass-panel p-8 rounded-3xl border-slate-100">
            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">Strategic Recommendation</h4>
            <div className="text-sm text-slate-600 font-medium">
              Based on the overlap in differentiation and competition, we suggest focusing on 
              <span className="text-indigo-600"> hyper-specialized niching</span> for the most saturated sectors.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ComparisonView;
