import React from 'react';
import { motion } from 'framer-motion';
import { Truck, Package, Clock, ArrowRight, Zap, Layers } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';

const SupplyChain = () => {
  const { isDark } = useTheme();

  return (
    <div className={`${isDark ? 'bg-[#020617] text-white' : 'bg-[#F8FAFC] text-slate-800'} min-h-screen pt-24 pb-20 font-inter transition-colors duration-300`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* Hero */}
        <div className="flex flex-col lg:flex-row items-center gap-16 mb-24">
           <div className="flex-1">
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 text-blue-500 text-[10px] font-black uppercase tracking-[0.2em] border border-blue-500/20 mb-8">
                 Liquidity Management
              </motion.div>
              <h1 className="text-5xl lg:text-7xl font-black mb-8 leading-tight tracking-tighter uppercase">
                 Supply Chain <span className="text-blue-600 italic">Financing</span>
              </h1>
              <p className={`${isDark ? 'text-slate-400' : 'text-slate-500'} text-lg mb-10 max-w-xl font-medium`}>
                 Optimize your working capital with our vendor financing and PO-based lending solutions. Get paid early for your invoices.
              </p>
              <Link to="/">
                <button className="bg-blue-600 text-white px-10 py-5 rounded-2xl font-black uppercase tracking-widest text-xs shadow-2xl hover:bg-blue-500 transition-all flex items-center gap-3">
                   Apply for Credit Line <ArrowRight className="w-5 h-5" />
                </button>
              </Link>
           </div>
           <div className="flex-1 grid grid-cols-2 gap-4">
              <div className={`${isDark ? 'bg-white/5 border-white/5 shadow-2xl' : 'bg-white border-slate-200 shadow-xl'} p-8 rounded-[40px] border flex flex-col items-center text-center scale-90`}>
                 <Package className="w-12 h-12 text-blue-500 mb-4" />
                 <h4 className="font-black uppercase tracking-tighter text-sm">Vendor Finance</h4>
              </div>
              <div className={`${isDark ? 'bg-white/5 border-white/5 shadow-2xl' : 'bg-white border-slate-200 shadow-xl'} p-8 rounded-[40px] border flex flex-col items-center text-center mt-12`}>
                 <Truck className="w-12 h-12 text-indigo-500 mb-4" />
                 <h4 className="font-black uppercase tracking-tighter text-sm">PO Financing</h4>
              </div>
              <div className={`${isDark ? 'bg-white/5 border-white/5 shadow-2xl' : 'bg-white border-slate-200 shadow-xl'} p-8 rounded-[40px] border flex flex-col items-center text-center -mt-12`}>
                 <Zap className="w-12 h-12 text-emerald-500 mb-4" />
                 <h4 className="font-black uppercase tracking-tighter text-sm">Flash Credit</h4>
              </div>
              <div className={`${isDark ? 'bg-white/5 border-white/5 shadow-2xl' : 'bg-white border-slate-200 shadow-xl'} p-8 rounded-[40px] border flex flex-col items-center text-center scale-90 mt-0`}>
                 <Layers className="w-12 h-12 text-amber-500 mb-4" />
                 <h4 className="font-black uppercase tracking-tighter text-sm">Invoice Discount</h4>
              </div>
           </div>
        </div>

      </div>
    </div>
  );
};

export default SupplyChain;
