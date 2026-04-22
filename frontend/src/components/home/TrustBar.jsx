import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Award, Zap, CheckCircle2 } from 'lucide-react';

const TrustBar = () => {
  const partners = [
    { name: 'CRIF High Mark', type: 'Credit Partner' },
    { name: 'CIBIL', type: 'Score Verification' },
    { name: 'ISO 9001:2015', type: 'Quality Certified' },
    { name: 'RBI Registered', type: 'NBFC Partner' }
  ];

  return (
    <div className="bg-[#020617] py-12 border-y border-white/5 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4">
        <p className="text-center text-slate-500 text-[10px] font-black uppercase tracking-[0.3em] mb-10">Our Trusted Ecosystem</p>
        <div className="flex flex-wrap justify-center items-center gap-8 md:gap-20 opacity-40 grayscale hover:grayscale-0 transition-all duration-700">
           {/* Logos would go here, using placeholders or real ones */}
           <div className="text-white font-playfair text-2xl font-black italic tracking-tighter">DMI HOUSING</div>
           <div className="text-white font-playfair text-2xl font-black italic tracking-tighter">TATA CAPITAL</div>
           <div className="text-white font-playfair text-2xl font-black italic tracking-tighter">CHOLA MS</div>
           <div className="text-white font-playfair text-2xl font-black italic tracking-tighter">KOTAK</div>
           <div className="text-white font-playfair text-2xl font-black italic tracking-tighter">HDFC BANK</div>
        </div>
      </div>
    </div>
  );
};

export default TrustBar;
