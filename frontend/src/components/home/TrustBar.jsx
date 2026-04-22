import React from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../../context/ThemeContext';

const TrustBar = () => {
  const { isDark } = useTheme();

  return (
    <div className={`${isDark ? 'bg-[#020617] border-white/5' : 'bg-white border-slate-100'} py-12 border-y overflow-hidden transition-colors duration-300`}>
      <div className="max-w-7xl mx-auto px-4">
        <p className="text-center text-slate-500 text-[10px] font-black uppercase tracking-[0.3em] mb-10">Our Trusted Ecosystem</p>
        <div className="flex flex-wrap justify-center items-center gap-8 md:gap-20 opacity-40 grayscale hover:grayscale-0 transition-all duration-700">
           <div className={`${isDark ? 'text-white' : 'text-slate-900'} font-playfair text-2xl font-black italic tracking-tighter`}>DMI HOUSING</div>
           <div className={`${isDark ? 'text-white' : 'text-slate-900'} font-playfair text-2xl font-black italic tracking-tighter`}>TATA CAPITAL</div>
           <div className={`${isDark ? 'text-white' : 'text-slate-900'} font-playfair text-2xl font-black italic tracking-tighter`}>CHOLA MS</div>
           <div className={`${isDark ? 'text-white' : 'text-slate-900'} font-playfair text-2xl font-black italic tracking-tighter`}>KOTAK</div>
           <div className={`${isDark ? 'text-white' : 'text-slate-900'} font-playfair text-2xl font-black italic tracking-tighter`}>HDFC BANK</div>
        </div>
      </div>
    </div>
  );
};

export default TrustBar;
