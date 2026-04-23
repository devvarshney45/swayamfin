import React from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../../context/ThemeContext';
import { useTranslation } from 'react-i18next';
import { Lock, Activity } from 'lucide-react';

const brands = [
  'DMI HOUSING', 'TATA CAPITAL', 'CHOLA MS', 'KOTAK MAHINDRA',
  'HDFC BANK', 'ADITYA BIRLA', 'BAJAJ FINSERV', 'L&T FINANCE', 'MAHINDRA FINANCE'
];

const TrustBar = () => {
  const { isDark } = useTheme();
  const { t } = useTranslation();

  return (
    <div className={`${isDark ? 'bg-[#020617] border-white/5' : 'bg-white border-slate-100'} py-10 border-y overflow-hidden transition-colors duration-700 relative`}>
      {/* Fade overlays */}
      <div className={`absolute top-0 left-0 w-24 h-full ${isDark ? 'bg-gradient-to-r from-[#020617]' : 'bg-gradient-to-r from-white'} to-transparent z-10 pointer-events-none`} />
      <div className={`absolute top-0 right-0 w-24 h-full ${isDark ? 'bg-gradient-to-l from-[#020617]' : 'bg-gradient-to-l from-white'} to-transparent z-10 pointer-events-none`} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-1.5 h-1.5 rounded-full bg-blue-600 animate-pulse" />
            <p className="text-slate-500 text-[10px] font-black uppercase tracking-[0.4em]">{t('trust_ecosystem')}</p>
          </div>
          <div className="hidden sm:flex items-center gap-5 opacity-40">
            <div className="flex items-center gap-2">
              <Lock className="w-3.5 h-3.5 text-slate-500" />
              <span className="text-[9px] font-black uppercase tracking-widest text-slate-500">ISO 27001</span>
            </div>
            <div className="flex items-center gap-2">
              <Activity className="w-3.5 h-3.5 text-slate-500" />
              <span className="text-[9px] font-black uppercase tracking-widest text-slate-500">Live Sync</span>
            </div>
          </div>
        </div>

        {/* Marquee */}
        <div className="relative flex overflow-x-hidden">
          <motion.div
            animate={{ x: [0, -1200] }}
            transition={{ repeat: Infinity, duration: 25, ease: 'linear' }}
            className="flex items-center gap-12 md:gap-20 whitespace-nowrap"
          >
            {[...brands, ...brands, ...brands].map((brand, idx) => (
              <span
                key={idx}
                className={`${isDark ? 'text-white' : 'text-[#020617]'} font-playfair text-lg sm:text-xl md:text-2xl font-black italic tracking-tight opacity-20 hover:opacity-100 hover:text-blue-600 transition-all duration-500 cursor-default select-none`}
              >
                {brand}
              </span>
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default TrustBar;
