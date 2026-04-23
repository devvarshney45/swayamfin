import React from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../../context/ThemeContext';
import { useTranslation } from 'react-i18next';
import { Shield, Activity, Lock } from 'lucide-react';

const TrustBar = () => {
  const { isDark } = useTheme();
  const { t } = useTranslation();

  const brands = [
    'DMI HOUSING', 'TATA CAPITAL', 'CHOLA MS', 'KOTAK MAHINDRA', 'HDFC BANK', 
    'ADITYA BIRLA', 'BAJAJ FINSERV', 'L&T FINANCE', 'MAHINDRA FINANCE'
  ];

  return (
    <div className={`${isDark ? 'bg-[#020617] border-white/5' : 'bg-white border-slate-100'} py-20 border-y overflow-hidden transition-colors duration-700 relative`}>
      {/* Decorative Accents */}
      <div className="absolute top-0 left-0 w-1/4 h-full bg-gradient-to-r from-[#020617] to-transparent z-10 hidden dark:block" />
      <div className="absolute top-0 right-0 w-1/4 h-full bg-gradient-to-l from-[#020617] to-transparent z-10 hidden dark:block" />

      <div className="max-w-7xl mx-auto px-6 relative z-0">
        <div className="flex flex-col md:flex-row items-center justify-between gap-12 mb-16">
           <div className="flex items-center gap-5">
              <div className="w-1.5 h-1.5 rounded-full bg-blue-600 animate-pulse" />
              <p className="text-slate-500 text-[10px] font-black uppercase tracking-[0.5em]">{t('trust_ecosystem')}</p>
           </div>
           <div className="flex items-center gap-8 opacity-40">
              <div className="flex items-center gap-3">
                 <Lock className="w-4 h-4" />
                 <span className="text-[9px] font-black uppercase tracking-widest text-slate-500">ISO 27001 SECURE</span>
              </div>
              <div className="flex items-center gap-3">
                 <Activity className="w-4 h-4" />
                 <span className="text-[9px] font-black uppercase tracking-widest text-slate-500">REAL-TIME SYNC</span>
              </div>
           </div>
        </div>
        
        {/* Infinite Marquee Architecture */}
        <div className="relative flex overflow-x-hidden">
          <motion.div 
            animate={{ x: [0, -1000] }}
            transition={{ repeat: Infinity, duration: 30, ease: "linear" }}
            className="flex items-center gap-24 md:gap-40 whitespace-nowrap"
          >
            {[...brands, ...brands].map((brand, idx) => (
              <div 
                key={idx} 
                className={`${isDark ? 'text-white' : 'text-[#020617]'} font-playfair text-2xl md:text-4xl font-black italic tracking-tighter opacity-20 hover:opacity-100 hover:text-blue-600 transition-all duration-700 cursor-default select-none`}
              >
                {brand}
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default TrustBar;
