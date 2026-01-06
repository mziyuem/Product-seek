
import React, { useState, useEffect } from 'react';
import { Product, ProductStatus } from '../types';
import { Icons } from '../constants';
import RadarChart from '../components/RadarChart';
import { getProductAnalysis } from '../services/gemini';

interface DetailViewProps {
  product: Product;
  onBack: () => void;
  onAddToCompare: () => void;
}

const DetailView: React.FC<DetailViewProps> = ({ product, onBack, onAddToCompare }) => {
  const [aiInsight, setAiInsight] = useState<string>('');
  const [loadingInsight, setLoadingInsight] = useState(false);

  const fetchInsight = async (context: string) => {
    setLoadingInsight(true);
    try {
      const res = await getProductAnalysis(product, context);
      setAiInsight(res);
    } catch (e) {
      console.error(e);
      setAiInsight("Failed to generate AI analysis. Please check your API key.");
    } finally {
      setLoadingInsight(false);
    }
  };

  useEffect(() => {
    fetchInsight("Comprehensive overview of strengths and weaknesses based on market metrics.");
  }, [product.id]);

  return (
    <div className="max-w-6xl mx-auto px-8 py-12">
      <button onClick={onBack} className="flex items-center gap-2 text-slate-500 hover:text-slate-800 transition-colors mb-8 group">
        <div className="rotate-180 group-hover:-translate-x-1 transition-transform"><Icons.ArrowRight /></div>
        <span className="text-sm font-medium">Back to Explorer</span>
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Product Info & Meta */}
        <div className="lg:col-span-1 space-y-6">
          <div className="glass-panel p-8 rounded-3xl">
            <div className={`inline-block px-3 py-1 rounded-full text-[10px] font-bold tracking-widest uppercase mb-4 ${
              product.status === ProductStatus.EXISTING ? 'bg-emerald-50 text-emerald-700' : 'bg-amber-50 text-amber-700'
            }`}>
              {product.status}
            </div>
            <h1 className="text-3xl font-bold text-slate-900 mb-4">{product.name}</h1>
            <p className="text-slate-500 leading-relaxed mb-6">{product.description}</p>
            
            <div className="space-y-4 pt-6 border-t border-slate-100">
              <div className="flex justify-between items-center text-sm">
                <span className="text-slate-400">Domain</span>
                <span className="text-slate-800 font-semibold">{product.domain}</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-slate-400">Analyzed On</span>
                <span className="text-slate-800 font-semibold">Oct 24, 2023</span>
              </div>
            </div>

            <button 
              onClick={onAddToCompare}
              className="w-full mt-8 bg-slate-900 text-white py-4 rounded-2xl flex items-center justify-center gap-3 font-semibold hover:bg-slate-800 transition-all shadow-lg"
            >
              <Icons.Plus />
              Add to Analysis Set
            </button>
          </div>

          <div className="glass-panel p-8 rounded-3xl">
            <h3 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
              <Icons.Chart /> Strategy Tags
            </h3>
            <div className="flex flex-wrap gap-2">
              {product.analysisTags.map(tag => (
                <span key={tag} className="px-3 py-1.5 bg-slate-100 text-slate-600 rounded-lg text-xs font-medium border border-slate-200">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Middle/Right Column: Analysis & Charts */}
        <div className="lg:col-span-2 space-y-8">
          {/* AI Intelligence Block */}
          <div className="relative group">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-3xl opacity-10 group-hover:opacity-20 transition-opacity" />
            <div className="relative bg-white p-8 rounded-3xl shadow-sm border border-slate-100">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-indigo-600 text-white rounded-xl"><Icons.AIIcon /></div>
                  <h2 className="text-xl font-bold text-slate-900">Neural Strategy Insight</h2>
                </div>
                <button 
                  onClick={() => fetchInsight("Regenerate insight focusing on growth levers.")}
                  className="text-xs font-bold text-indigo-600 hover:underline uppercase tracking-wider"
                >
                  Regenerate
                </button>
              </div>

              {loadingInsight ? (
                <div className="space-y-4 animate-pulse">
                  <div className="h-4 bg-slate-100 rounded w-full" />
                  <div className="h-4 bg-slate-100 rounded w-5/6" />
                  <div className="h-4 bg-slate-100 rounded w-4/6" />
                </div>
              ) : (
                <div className="prose prose-slate max-w-none">
                  <p className="text-slate-600 leading-relaxed whitespace-pre-wrap">{aiInsight}</p>
                </div>
              )}
            </div>
          </div>

          {/* Data Visuals Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="glass-panel p-8 rounded-3xl flex flex-col items-center">
              <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-8">Performance Radar</h3>
              <RadarChart metrics={product.metrics} size={280} />
            </div>

            <div className="glass-panel p-8 rounded-3xl">
              <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-8">Sentiment Pulse</h3>
              {/* Fake sentiment bar for design */}
              <div className="space-y-6">
                <div>
                  <div className="flex justify-between text-xs font-bold mb-2">
                    <span className="text-emerald-600">POSITIVE RESPONSE</span>
                    <span>72%</span>
                  </div>
                  <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                    <div className="h-full bg-emerald-500 rounded-full" style={{ width: '72%' }} />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-xs font-bold mb-2">
                    <span className="text-slate-400">NEUTRAL / CURIOUS</span>
                    <span>18%</span>
                  </div>
                  <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                    <div className="h-full bg-slate-400 rounded-full" style={{ width: '18%' }} />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-xs font-bold mb-2">
                    <span className="text-rose-500">CRITICAL / GAP FOUND</span>
                    <span>10%</span>
                  </div>
                  <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                    <div className="h-full bg-rose-500 rounded-full" style={{ width: '10%' }} />
                  </div>
                </div>
              </div>

              <div className="mt-12 p-4 bg-slate-50 rounded-xl border border-slate-100">
                <p className="text-xs text-slate-500 italic">
                  "Most users appreciate the core UI but suggest deeper integration with existing wellness ecosystems."
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailView;
