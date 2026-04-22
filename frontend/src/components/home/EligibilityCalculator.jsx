import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Calculator, ArrowRight, Zap } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';

const EligibilityCalculator = () => {
  const { isDark } = useTheme();
  const [income, setIncome] = useState(50000);
  const [tenure, setTenure] = useState(5);

  const estimatedLoan = (income * 0.5 * 12 * tenure * 0.8).toLocaleString('en-IN', {
    maximumFractionDigits: 0,
    style: 'currency',
    currency: 'INR',
  });

  return (
    <section className={`py-24 ${isDark ? 'bg-[#020617]' : 'bg-[#F8FAFC]'} relative overflow-hidden font-dmsans transition-colors duration-300`}>
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary-gold/5 blur-[120px] rounded-full" />
      <div className="max-w-7xl mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} className="space-y-8">
            <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full ${isDark ? 'bg-primary-gold/10' : 'bg-primary-gold/20'} text-primary-gold text-[10px] font-black uppercase tracking-widest border border-primary-gold/20`}>
               Financial Planning
            </div>
            <h2 className={`text-4xl md:text-5xl font-playfair font-black ${isDark ? 'text-white' : 'text-slate-900'} leading-tight`}>
              Instant <span className="text-primary-gold italic">Eligibility</span> <br />Calculator
            </h2>
            <p className="text-slate-500 font-bold text-xs uppercase tracking-widest leading-relaxed max-w-md">
              Estimate your loan eligibility and monthly repayments in seconds. 
              Our calculator provides real-time insights based on current market rates.
            </p>
          </motion.div>
            
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} className={`w-full ${isDark ? 'bg-white/5 border-white/10 ring-white/5' : 'bg-slate-50 border-slate-200 ring-slate-100'} backdrop-blur-xl rounded-[48px] p-10 md:p-14 border ring-1 relative z-10 shadow-inner`}>
             <div className="space-y-12">
                <div className="space-y-6">
                  <div className="flex justify-between items-end">
                    <label className={`text-[10px] font-black uppercase tracking-[0.2em] ${isDark ? 'text-white opacity-40' : 'text-slate-500'}`}>Monthly Income</label>
                    <span className="text-2xl font-black text-primary-gold font-playfair">₹{income.toLocaleString('en-IN')}</span>
                  </div>
                  <input 
                    type="range" 
                    min="15000" 
                    max="1000000" 
                    step="5000"
                    value={income}
                    onChange={(e) => setIncome(Number(e.target.value))}
                    className={`w-full h-1.5 ${isDark ? 'bg-white/10 hover:accent-white' : 'bg-slate-200 hover:accent-slate-900'} rounded-full appearance-none cursor-pointer accent-primary-gold transition-all`}
                  />
                  <div className={`flex justify-between text-[10px] ${isDark ? 'text-white/20' : 'text-slate-400'} font-black`}>
                     <span>15K</span>
                     <span>10L+</span>
                  </div>
                </div>

                <div className="space-y-6">
                  <div className="flex justify-between items-end">
                    <label className={`text-[10px] font-black uppercase tracking-[0.2em] ${isDark ? 'text-white opacity-40' : 'text-slate-500'}`}>Planned Tenure</label>
                    <span className="text-2xl font-black text-primary-gold font-playfair">{tenure} Years</span>
                  </div>
                  <input 
                    type="range" 
                    min="1" 
                    max="30" 
                    step="1"
                    value={tenure}
                    onChange={(e) => setTenure(Number(e.target.value))}
                    className={`w-full h-1.5 ${isDark ? 'bg-white/10 hover:accent-white' : 'bg-slate-200 hover:accent-slate-900'} rounded-full appearance-none cursor-pointer accent-primary-gold transition-all`}
                  />
                  <div className={`flex justify-between text-[10px] ${isDark ? 'text-white/20' : 'text-slate-400'} font-black`}>
                     <span>1 YEAR</span>
                     <span>30 YEARS</span>
                  </div>
                </div>

                <div className={`pt-10 border-t ${isDark ? 'border-white/10' : 'border-slate-200'} mt-6 text-center`}>
                   <p className={`text-[9px] font-black uppercase tracking-[0.3em] mb-4 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>Estimated Limit</p>
                   <div className={`text-5xl md:text-6xl font-playfair font-black ${isDark ? 'text-white' : 'text-slate-900'} tracking-tighter shadow-sm`}>
                     {estimatedLoan}*
                   </div>
                   <p className={`text-[9px] mt-8 font-medium ${isDark ? 'text-white/20' : 'text-slate-400'}`}>INDICATIVE VALUES BASED ON AGGREGATE LENDING MODELS</p>
                </div>
             </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default EligibilityCalculator;
