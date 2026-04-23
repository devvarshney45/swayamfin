import React from 'react';
import { motion } from 'framer-motion';
import { Briefcase, TrendingUp, HandCoins, ArrowRight, CheckCircle2, ShieldCheck } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';

const MSMELoans = () => {
  const { isDark } = useTheme();

  return (
    <div className={`${isDark ? 'bg-[#020617] text-white' : 'bg-[#F8FAFC] text-slate-800'} min-h-screen pt-24 pb-20 font-inter transition-colors duration-300`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* Banner */}
        <div className="relative rounded-[60px] overflow-hidden mb-24 min-h-[500px] flex items-center px-12 group shadow-2xl">
          <div className="absolute inset-0 bg-blue-600 transition-all duration-700" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/40 to-transparent z-10" />
          <motion.div initial={{ opacity: 0, scale: 1.1 }} animate={{ opacity: 1, scale: 1 }} className="absolute inset-0 z-0">
             <div className="w-full h-full bg-[url('https://images.unsplash.com/photo-1542744173-8e7e53715e3c?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center mix-blend-overlay opacity-30" />
          </motion.div>

          <div className="relative z-20 max-w-2xl">
             <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 text-white text-[10px] font-black uppercase tracking-[0.2em] border border-white/20 mb-8 backdrop-blur-md">
                Empowering Entrepreneurs
             </motion.div>
             <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="text-5xl md:text-7xl font-black text-white mb-6 uppercase tracking-tighter leading-tight">
                MSME Structured <span className="text-blue-100">Loans</span>
             </h1 >
             <p className="text-blue-50 text-lg mb-10 font-medium">
                Customized financial structures for micro, small, and medium enterprises. Quick sanctions for inventory, working capital, and expansion.
             </p>
             <Link to="/">
               <button className="bg-white text-blue-600 px-10 py-5 rounded-2xl font-black uppercase tracking-[0.2em] text-xs shadow-xl hover:bg-blue-50 transition-all flex items-center gap-2">
                 Get Funded Now <ArrowRight className="w-5 h-5" />
               </button>
             </Link>
          </div>
        </div>

        {/* Features */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
           {[
             { title: "Collateral Optional", desc: "Get funding based on your business cashflow and GST returns.", icon: <TrendingUp /> },
             { title: "Quick Sanction", desc: "Pre-approval within 48 hours for early-stage applications.", icon: <HandCoins /> },
             { title: "Direct Transfers", desc: "Funds moved directly to your business OD or Current account.", icon: <CheckCircle2 /> },
           ].map((f, i) => (
             <div key={i} className="flex gap-6">
                <div className={`w-14 h-14 ${isDark ? 'bg-blue-500/20 text-blue-400 border-blue-500/30' : 'bg-blue-600 text-white border-blue-700'} rounded-[20px] flex items-center justify-center shrink-0 border shadow-lg`}>
                   {f.icon}
                </div>
                <div>
                   <h3 className={`text-xl font-black ${isDark ? 'text-white' : 'text-slate-900'} mb-2 uppercase tracking-tight`}>{f.title}</h3>
                   <p className={`${isDark ? 'text-slate-400' : 'text-slate-500'} text-sm leading-relaxed font-medium`}>{f.desc}</p>
                </div>
             </div>
           ))}
        </div>

      </div>
    </div>
  );
};

export default MSMELoans;
