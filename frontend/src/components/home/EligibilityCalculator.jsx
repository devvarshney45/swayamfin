import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Calculator, ArrowRight, Zap } from 'lucide-react';

const EligibilityCalculator = () => {
  const [income, setIncome] = useState(50000);
  const [tenure, setTenure] = useState(5);

  const estimatedLoan = (income * 0.5 * 12 * tenure * 0.8).toLocaleString('en-IN', {
    maximumFractionDigits: 0,
    style: 'currency',
    currency: 'INR',
  });

  return (
    <section className="py-24 bg-white font-dmsans">
      <div className="max-w-7xl mx-auto px-4">
        <div className="bg-primary-navy rounded-[64px] p-10 md:p-20 flex flex-col lg:flex-row gap-20 items-center shadow-[0_40px_100px_-15px_rgba(2,17,46,0.3)] relative overflow-hidden group">
          
          {/* Decorative Sparkle */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-primary-gold opacity-[0.07] blur-[120px] -translate-y-1/2 translate-x-1/2 group-hover:opacity-10 transition-opacity duration-700"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-primary-gold opacity-[0.03] blur-[100px] translate-y-1/2 -translate-x-1/2"></div>
          
          <div className="flex-1 space-y-10 relative z-10 text-center lg:text-left">
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-white/5 border border-white/10 text-primary-gold text-[10px] font-black uppercase tracking-[0.2em]"
            >
              <Calculator className="w-4 h-4" /> Strategic Assessment
            </motion.div>
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-4xl md:text-6xl font-playfair font-black text-white leading-[1.1]"
            >
              Estimate Your <br />
              <span className="text-primary-gold">Financial Power</span>
            </motion.h2>
            <p className="text-slate-400 font-medium text-lg leading-relaxed max-w-xl mx-auto lg:mx-0">
              Our algorithmic engine provides an instant projection of your borrowing capacity. High-speed, high-accuracy, zero credit impact.
            </p>
            
            <div className="flex justify-center lg:justify-start gap-4 pt-4">
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-10 py-5 bg-primary-gold text-primary-navy font-black rounded-[24px] hover:bg-white transition-all duration-500 uppercase tracking-widest text-[10px] flex items-center gap-3 shadow-xl shadow-primary-gold/10"
              >
                Detailed Analysis <ArrowRight className="w-4 h-4" />
              </motion.button>
            </div>
          </div>

          <div className="w-full lg:w-[45%] bg-white/5 backdrop-blur-xl rounded-[48px] p-10 md:p-14 border border-white/10 ring-1 ring-white/5 relative z-10 shadow-inner">
             <div className="space-y-12">
                <div className="space-y-6">
                  <div className="flex justify-between items-end">
                    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-white opacity-40">Monthly Income</label>
                    <span className="text-2xl font-black text-primary-gold font-playfair">₹{income.toLocaleString('en-IN')}</span>
                  </div>
                  <input 
                    type="range" 
                    min="15000" 
                    max="1000000" 
                    step="5000"
                    value={income}
                    onChange={(e) => setIncome(Number(e.target.value))}
                    className="w-full h-1.5 bg-white/10 rounded-full appearance-none cursor-pointer accent-primary-gold hover:accent-white transition-all"
                  />
                  <div className="flex justify-between text-[10px] text-white/20 font-black">
                     <span>15K</span>
                     <span>10L+</span>
                  </div>
                </div>

                <div className="space-y-6">
                  <div className="flex justify-between items-end">
                    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-white opacity-40">Planned Tenure</label>
                    <span className="text-2xl font-black text-primary-gold font-playfair">{tenure} Years</span>
                  </div>
                  <input 
                    type="range" 
                    min="1" 
                    max="30" 
                    step="1"
                    value={tenure}
                    onChange={(e) => setTenure(Number(e.target.value))}
                    className="w-full h-1.5 bg-white/10 rounded-full appearance-none cursor-pointer accent-primary-gold hover:accent-white transition-all"
                  />
                  <div className="flex justify-between text-[10px] text-white/20 font-black">
                     <span>1 YEAR</span>
                     <span>30 YEARS</span>
                  </div>
                </div>

                <div className="pt-10 border-t border-white/10 mt-6 text-center">
                   <p className="text-slate-400 text-[9px] font-black uppercase tracking-[0.3em] mb-4">Estimated Limit</p>
                   <div className="text-5xl md:text-6xl font-playfair font-black text-white tracking-tighter shadow-sm">
                     {estimatedLoan}*
                   </div>
                   <p className="text-[9px] text-white/20 mt-8 font-medium">INDICATIVE VALUES BASED ON AGGREGATE LENDING MODELS</p>
                </div>
             </div>
          </div>

        </div>
      </div>
    </section>

  );
};

export default EligibilityCalculator;
