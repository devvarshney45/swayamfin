import React from 'react';
import { motion } from 'framer-motion';

const brands = [
  'DMI HOUSING', 'TATA CAPITAL', 'CHOLA MS', 'KOTAK MAHINDRA',
  'HDFC BANK', 'ADITYA BIRLA', 'BAJAJ FINSERV', 'L&T FINANCE', 'MAHINDRA FINANCE',
  'PIRAMAL FINANCE', 'VIVRITI CAPITAL', 'NORTHERN ARC'
];

const TrustBar = () => {
  return (
    <div className="bg-white py-12 border-y border-[#F1F5F9] overflow-hidden relative">
      <div className="absolute top-0 left-0 w-32 h-full bg-gradient-to-r from-white to-transparent z-10" />
      <div className="absolute top-0 right-0 w-32 h-full bg-gradient-to-l from-white to-transparent z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center gap-4 mb-8">
          <div className="w-1.5 h-1.5 rounded-full bg-[#0EA5E9]" />
          <p className="text-slate-400 text-[10px] font-black uppercase tracking-[0.4em]">Our Trusted Ecosystem</p>
        </div>

        {/* Marquee Navigation */}
        <div className="relative flex overflow-x-hidden">
          <motion.div
            animate={{ x: [0, -1200] }}
            transition={{ repeat: Infinity, duration: 40, ease: 'linear' }}
            className="flex items-center gap-16 md:gap-24 whitespace-nowrap"
          >
            {[...brands, ...brands].map((brand, idx) => (
              <span
                key={idx}
                className="text-slate-200 text-xl sm:text-2xl md:text-3xl font-black italic tracking-tighter hover:text-[#0EA5E9] hover:opacity-100 transition-all duration-500 cursor-default select-none"
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
