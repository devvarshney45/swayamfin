import React from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../../context/ThemeContext';
import { ShieldCheck, Sparkles } from 'lucide-react';

const PartnerNBFCs = () => {
  const { isDark } = useTheme();
  return (
    <section className={`py-32 ${isDark ? 'bg-[#020617]' : 'bg-[#F8FAFC]'} relative overflow-hidden transition-colors duration-300`}>
      {/* Background Gradients */}
      <div className={`absolute top-0 right-0 w-[500px] h-[500px] ${isDark ? 'bg-blue-600/5' : 'bg-blue-500/5'} blur-[100px] rounded-full translate-x-1/2 -translate-y-1/2`} />
      
      <div className="max-w-7xl mx-auto px-4 relative z-10">
        <div className="text-center mb-24">
           <motion.div 
             initial={{ opacity: 0, y: 10 }}
             whileInView={{ opacity: 1, y: 0 }}
             viewport={{ once: true }}
             className={`inline-flex items-center gap-2 px-6 py-2 rounded-full ${isDark ? 'bg-white/5 border-white/10' : 'bg-slate-100 border-slate-200'} border text-primary-gold text-[10px] font-black uppercase tracking-[0.3em] mb-6 shadow-sm`}
           >
             <ShieldCheck className="w-3 h-3" /> Accredited Partnership Network
           </motion.div>
           <h2 className={`text-4xl md:text-6xl font-playfair font-black ${isDark ? 'text-white' : 'text-slate-900'} tracking-tighter mb-6`}>
             Strategic <span className="text-blue-600 italic">Financial</span> Allies
           </h2>
           <p className={`text-sm font-black uppercase tracking-[0.2em] ${isDark ? 'text-slate-500' : 'text-slate-500'} opacity-80`}>
             Empowered by India's preeminent financial institutions
           </p>
        </div>
          
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 md:gap-10 items-center">
           {[
             'DMI Housing Finance',
             'Aditya Birla Capital',
             'Tata Capital',
             'Bajaj Finserv',
             'L&T Finance',
             'Mahindra Finance'
           ].map((partner, idx) => (
             <motion.div
               key={idx}
               initial={{ opacity: 0, scale: 0.9 }}
               whileInView={{ opacity: 1, scale: 1 }}
               whileHover={{ y: -5, opacity: 1, scale: 1.05 }}
               transition={{ delay: idx * 0.05 }}
               className={`${isDark ? 'bg-white/5 border-white/5 hover:bg-white/10 hover:border-blue-500/30' : 'bg-white border-slate-200 shadow-xl shadow-slate-200/50 hover:border-blue-400'} p-8 rounded-[32px] border transition-all duration-500 group relative flex items-center justify-center h-48 cursor-pointer`}
             >
               <div className={`absolute inset-0 bg-blue-600/5 blur-2xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity`} />
               <p className={`${isDark ? 'text-white' : 'text-slate-900'} font-playfair font-black text-sm text-center leading-tight relative z-10 italic`}>
                 {partner}
               </p>
               <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Sparkles className="w-3 h-3 text-blue-500" />
               </div>
             </motion.div>
           ))}
        </div>
      </div>
    </section>
  );
};

export default PartnerNBFCs;
