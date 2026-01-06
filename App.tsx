
import React, { useState } from 'react';
import { ViewState, Product } from './types';
import { MOCK_PRODUCTS, Icons } from './constants';
import HomeView from './views/HomeView';
import ExploreView from './views/ExploreView';
import DetailView from './views/DetailView';
import ComparisonView from './views/ComparisonView';
import SubmitView from './views/SubmitView';
import ComparisonTray from './components/ComparisonTray';

const App: React.FC = () => {
  const [view, setView] = useState<ViewState>('HOME');
  const [products, setProducts] = useState<Product[]>(MOCK_PRODUCTS);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [comparisonSet, setComparisonSet] = useState<Product[]>([]);
  const [searchQuery, setSearchQuery] = useState('');

  const navigate = (v: ViewState, product?: Product) => {
    if (product) setSelectedProduct(product);
    setView(v);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const addToComparison = (p: Product) => {
    if (comparisonSet.find(item => item.id === p.id)) return;
    if (comparisonSet.length >= 4) return;
    setComparisonSet([...comparisonSet, p]);
  };

  const removeFromComparison = (id: string) => {
    setComparisonSet(comparisonSet.filter(p => p.id !== id));
  };

  const handleProductSubmit = (newProduct: Product) => {
    setProducts([newProduct, ...products]);
    navigate('EXPLORE');
  };

  return (
    <div className="min-h-screen relative flex flex-col selection:bg-indigo-500/30">
      {/* Dynamic Header */}
      <header className="sticky top-0 z-50 h-20 glass border-b border-white/5 flex items-center justify-between px-12">
        <div className="flex items-center gap-3 cursor-pointer group" onClick={() => navigate('HOME')}>
          <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center text-white font-black group-hover:scale-110 transition-transform duration-300">N</div>
          <span className="font-black text-xl tracking-tighter text-white">NEXUS<span className="text-indigo-500">INTEL</span></span>
        </div>

        <nav className="flex items-center gap-10">
          <button onClick={() => navigate('EXPLORE')} className={`text-[10px] font-black uppercase tracking-[0.2em] transition-all ${view === 'EXPLORE' ? 'text-indigo-400' : 'text-slate-400 hover:text-white'}`}>Intelligence Database</button>
          <button onClick={() => navigate('SUBMIT')} className={`text-[10px] font-black uppercase tracking-[0.2em] transition-all ${view === 'SUBMIT' ? 'text-indigo-400' : 'text-slate-400 hover:text-white'}`}>Submission Lab</button>
          <div className="h-6 w-px bg-white/10 mx-2"></div>
          <button className="text-slate-400 hover:text-indigo-400 transition-colors"><Icons.User /></button>
        </nav>
      </header>

      {/* Content Wrapper */}
      <main className="flex-1">
        {view === 'HOME' && <HomeView onExplore={(q) => { setSearchQuery(q); navigate('EXPLORE'); }} />}
        {view === 'EXPLORE' && (
          <ExploreView 
            products={products} 
            searchQuery={searchQuery}
            onSelect={(p) => navigate('DETAIL', p)} 
            onAddToCompare={addToComparison}
            comparisonSetIds={comparisonSet.map(p => p.id)}
          />
        )}
        {view === 'DETAIL' && selectedProduct && (
          <DetailView product={selectedProduct} onBack={() => navigate('EXPLORE')} onAddToCompare={() => addToComparison(selectedProduct)} />
        )}
        {view === 'COMPARISON' && (
          <ComparisonView products={comparisonSet} onBack={() => navigate('EXPLORE')} />
        )}
        {view === 'SUBMIT' && <SubmitView onSubmit={handleProductSubmit} />}
      </main>

      <ComparisonTray 
        selected={comparisonSet} 
        onRemove={removeFromComparison} 
        onCompare={() => navigate('COMPARISON')} 
      />
    </div>
  );
};

export default App;
