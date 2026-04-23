import React from 'react';
import { motion } from 'framer-motion';
import { Building2, Landmark, ShieldCheck, ArrowRight, Wallet, CheckCircle2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';

const LAP = () => {
  const { isDark } = useTheme();

  const benefits = [
    { title: "High LTV", desc: "Get up to 75% of your property market value.", icon: <Landmark /> },
    { title: "Longer Tenure", desc: "Flexible repayment options up to 15 years.", icon: <CheckCircle2 /> },
    { title: "Lowest Rates", desc: "Interest rates starting at competitive slabs.", icon: <Wallet /> },
  ];

  return (
    <div className={`${isDark ? 'bg-[#020617] text-white' : 'bg-[#F8FAFC] text-slate-800'} min-h-screen pt-24 pb-20 font-inter transition-colors duration-300`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* Hero Section */}
        <div className="flex flex-col lg:flex-row items-center gap-16 mb-24">
          <div className="flex-1 text-center lg:text-left">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 text-blue-500 text-[10px] font-black uppercase tracking-[0.2em] border border-blue-500/20 mb-6">
              Asset Monetization
            </motion.div>
            <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="text-5xl lg:text-7xl font-black mb-8 leading-[1.1] tracking-tighter uppercase">
              Loan Against <span className="text-blue-600 italic">Property</span>
            </motion.h1>
            <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className={`${isDark ? 'text-slate-400' : 'text-slate-500'} text-lg mb-10 max-w-xl mx-auto lg:mx-0 font-medium`}>
              Unlock the hidden value of your residential or commercial property with Swayamfin's flexible LAP solutions.
            </motion.p>
            <Link to="/">
              <button className="bg-blue-600 text-white px-10 py-5 rounded-[24px] font-black uppercase tracking-[0.2em] text-xs shadow-2xl shadow-blue-500/30 hover:bg-blue-500 transition-all flex items-center gap-3 mx-auto lg:mx-0">
                Check Eligibility <ArrowRight className="w-5 h-5" />
              </button>
            </Link>
          </div>
          <div className="flex-1 relative">
            <div className={`absolute inset-0 ${isDark ? 'bg-blue-600/10' : 'bg-blue-600/5'} blur-[100px] rounded-full`} />
            <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className={`${isDark ? 'bg-white/5 border-white/5 shadow-2xl' : 'bg-white border-slate-200 shadow-xl'} p-12 rounded-[48px] border relative z-10 backdrop-blur-xl`}>
               <Building2 className="w-20 h-20 text-blue-600 mb-8" />
               <div className="space-y-6">
                  <div className="flex items-center gap-4">
                     <div className="w-2 h-2 rounded-full bg-emerald-500" />
                     <p className="font-bold text-sm uppercase tracking-widest opacity-80">Residential Properties</p>
                  </div>
                  <div className="flex items-center gap-4">
                     <div className="w-2 h-2 rounded-full bg-indigo-500" />
                     <p className="font-bold text-sm uppercase tracking-widest opacity-80">Commercial Outlets</p>
                  </div>
                  <div className="flex items-center gap-4">
                     <div className="w-2 h-2 rounded-full bg-amber-500" />
                     <p className="font-bold text-sm uppercase tracking-widest opacity-80">Industrial Plots</p>
                  </div>
               </div>
            </motion.div>
          </div>
        </div>

        {/* Benefits Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
           {benefits.map((b, i) => (
             <motion.div 
               key={i} 
               initial={{ opacity: 0, y: 20 }}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: true }}
               className={`${isDark ? 'bg-white/5 border-white/5' : 'bg-white border-slate-100 shadow-lg'} p-8 rounded-[40px] border hover:border-blue-500/30 transition-all`}
             >
                <div className={`w-14 h-14 ${isDark ? 'bg-blue-500/10' : 'bg-blue-50'} text-blue-600 rounded-2xl flex items-center justify-center mb-6 border ${isDark ? 'border-blue-500/20' : 'border-blue-100'}`}>
                   {b.icon}
                </div>
                <h3 className={`text-xl font-black ${isDark ? 'text-white' : 'text-slate-900'} mb-4 uppercase tracking-tighter`}>{b.title}</h3>
                <p className={`${isDark ? 'text-slate-400' : 'text-slate-500'} text-sm font-medium`}>{b.desc}</p>
             </motion.div>
           ))}
        </div>

      </div>
    </div>
  );
};

export default LAP;
