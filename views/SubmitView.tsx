
import React, { useState } from 'react';
import { Product, ProductStatus } from '../types';
import { Icons } from '../constants';

interface SubmitViewProps {
  onSubmit: (p: Product) => void;
}

const SubmitView: React.FC<SubmitViewProps> = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    domain: '',
    status: ProductStatus.IDEATION
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.description) return;

    // Generate random realistic metrics for the new product
    const newProduct: Product = {
      id: Date.now().toString(),
      name: formData.name,
      description: formData.description,
      status: formData.status,
      domain: formData.domain || 'Uncategorized',
      metrics: {
        demand: Math.floor(Math.random() * 60) + 40,
        differentiation: Math.floor(Math.random() * 60) + 40,
        feasibility: Math.floor(Math.random() * 60) + 40,
        monetization: Math.floor(Math.random() * 60) + 40,
        stickiness: Math.floor(Math.random() * 60) + 40,
        competition: Math.floor(Math.random() * 60) + 40,
      },
      comments: [],
      analysisTags: ['AI-Generated Analysis', 'New Submission']
    };

    onSubmit(newProduct);
  };

  return (
    <div className="max-w-4xl mx-auto px-8 py-20">
      <div className="text-center mb-16">
        <div className="w-16 h-16 bg-slate-900 text-white rounded-2xl mx-auto flex items-center justify-center mb-6 shadow-xl">
          <Icons.Plus />
        </div>
        <h2 className="text-4xl font-bold text-slate-900 tracking-tight mb-4">Submit to the Intelligence Lab</h2>
        <p className="text-slate-500 max-w-lg mx-auto leading-relaxed">
          Provide your product details. Our system will automatically generate a strategic DNA profile and competitive analysis.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="glass-panel p-10 rounded-3xl space-y-8 shadow-xl border border-slate-100">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Product Name</label>
            <input 
              required
              type="text" 
              className="w-full px-4 py-4 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-100 outline-none"
              placeholder="Enter name..."
              value={formData.name}
              onChange={e => setFormData({...formData, name: e.target.value})}
            />
          </div>
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Domain / Category</label>
            <input 
              required
              type="text" 
              className="w-full px-4 py-4 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-100 outline-none"
              placeholder="e.g. Fintech, Edtech..."
              value={formData.domain}
              onChange={e => setFormData({...formData, domain: e.target.value})}
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Description</label>
          <textarea 
            required
            rows={4}
            className="w-full px-4 py-4 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-100 outline-none resize-none"
            placeholder="Describe the core value proposition and target audience..."
            value={formData.description}
            onChange={e => setFormData({...formData, description: e.target.value})}
          />
        </div>

        <div className="space-y-2">
          <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Current Stage</label>
          <div className="flex gap-4">
            {[ProductStatus.IDEATION, ProductStatus.IN_PROGRESS, ProductStatus.EXISTING].map(status => (
              <button
                key={status}
                type="button"
                onClick={() => setFormData({...formData, status})}
                className={`flex-1 py-4 rounded-xl border text-sm font-bold transition-all ${
                  formData.status === status 
                    ? 'bg-slate-900 text-white border-slate-900 shadow-lg' 
                    : 'bg-white text-slate-400 border-slate-200 hover:border-slate-400'
                }`}
              >
                {status}
              </button>
            ))}
          </div>
        </div>

        <button 
          type="submit"
          className="w-full bg-indigo-600 text-white py-5 rounded-2xl font-bold text-lg hover:bg-indigo-700 transition-all shadow-xl shadow-indigo-100 flex items-center justify-center gap-3"
        >
          <Icons.AIIcon />
          Generate Product Analysis
        </button>
      </form>

      <div className="mt-12 flex items-center gap-4 p-6 bg-slate-50 rounded-2xl border border-dashed border-slate-200">
        <div className="text-indigo-600"><Icons.Globe /></div>
        <p className="text-xs text-slate-400 font-medium">
          Note: Submitted data is processed by our Neural Analysis Engine. Initial DNA mapping takes approx. 120ms.
        </p>
      </div>
    </div>
  );
};

export default SubmitView;
