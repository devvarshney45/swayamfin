import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, MessageCircle } from 'lucide-react';

const CTASection = () => {
  return (
    <section className="py-24 bg-[#020617] px-4 -mt-16 relative z-20 font-dmsans">
      <div className="max-w-7xl mx-auto">
        <div className="bg-[#0B0F19] p-12 md:p-20 rounded-[60px] border border-white/5 shadow-2xl relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-80 h-80 bg-primary-gold/10 blur-[100px] rounded-full translate-x-1/3 -translate-y-1/3 group-hover:bg-primary-gold/20 transition-all duration-700" />
          
          <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-16">
            <div className="max-w-xl text-center lg:text-left space-y-8">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 text-primary-gold text-[10px] font-black uppercase tracking-[0.3em] border border-white/10 italic">
                 Get Started Today
              </div>
              <h2 className="text-4xl md:text-6xl font-playfair font-black text-white leading-tight">
                Empower Your <span className="text-primary-gold italic">Finances</span> Today
              </h2>
              <p className="text-slate-400 font-bold text-sm uppercase tracking-widest leading-relaxed">
                Join 750+ businesses thriving with Swayamfin's agile capital solutions. No collateral, no hidden fees, just growth.
              </p>
              
              <div className="flex flex-wrap justify-center lg:justify-start gap-4">
                 {['Agra', 'Mathura', 'Hathras', 'Kosi'].map(city => (
                   <span key={city} className="px-4 py-2 bg-white/5 rounded-xl border border-white/10 text-slate-400 text-[10px] font-black uppercase tracking-widest">{city}</span>
                 ))}
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-6 w-full lg:w-auto">
              <button 
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                className="px-10 py-5 bg-primary-gold text-[#020617] font-black rounded-3xl hover:bg-white transition-all duration-300 shadow-xl shadow-primary-gold/20 text-xs uppercase tracking-widest flex items-center justify-center gap-3"
              >
                Apply Now <ArrowRight className="w-4 h-4" />
              </button>
              <a 
                href="https://wa.me/916397003690"
                className="px-10 py-5 bg-white/5 text-white font-black rounded-3xl border-2 border-white/10 hover:bg-white/10 transition-all text-xs uppercase tracking-widest flex items-center justify-center gap-3"
              >
                <MessageCircle className="w-5 h-5 text-success-green" /> Talk to Us
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
