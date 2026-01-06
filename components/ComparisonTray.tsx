
import React from 'react';
import { Product } from '../types';
import { Icons } from '../constants';

interface ComparisonTrayProps {
  selected: Product[];
  onRemove: (id: string) => void;
  onCompare: () => void;
}

const ComparisonTray: React.FC<ComparisonTrayProps> = ({ selected, onRemove, onCompare }) => {
  if (selected.length === 0) return null;

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 animate-in slide-in-from-bottom-10 duration-500">
      <div className="glass-panel px-6 py-4 rounded-2xl flex items-center gap-6 shadow-2xl border-indigo-100">
        <div className="flex -space-x-3">
          {selected.map((p) => (
            <div 
              key={p.id} 
              className="relative w-10 h-10 rounded-full bg-indigo-600 border-2 border-white flex items-center justify-center text-white font-bold text-xs cursor-pointer group hover:z-10 transition-all"
              onClick={() => onRemove(p.id)}
            >
              {p.name[0]}
              <div className="absolute -top-1 -right-1 bg-red-500 rounded-full w-4 h-4 hidden group-hover:flex items-center justify-center text-[10px]">×</div>
            </div>
          ))}
        </div>
        
        <div className="h-8 w-px bg-slate-200"></div>
        
        <div className="flex items-center gap-4">
          <span className="text-sm font-medium text-slate-600">{selected.length} Product{selected.length > 1 ? 's' : ''}</span>
          <button 
            onClick={onCompare}
            disabled={selected.length < 2}
            className={`px-6 py-2 rounded-xl flex items-center gap-2 font-medium transition-all ${
              selected.length >= 2 
                ? 'bg-indigo-600 text-white hover:bg-indigo-700 shadow-lg shadow-indigo-200' 
                : 'bg-slate-200 text-slate-400 cursor-not-allowed'
            }`}
          >
            <Icons.Compare />
            AI Comparison
          </button>
        </div>
      </div>
    </div>
  );
};

export default ComparisonTray;
