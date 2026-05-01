import React from 'react';
const partner = 'DMI Housing Finance';

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

        {/* Single trusted partner as requested */}
        <div className="relative flex justify-center">
          <span className="text-slate-300 text-2xl sm:text-3xl md:text-4xl font-black italic tracking-tighter select-none">
            {partner}
          </span>
        </div>
      </div>
    </div>
  );
};

export default TrustBar;
