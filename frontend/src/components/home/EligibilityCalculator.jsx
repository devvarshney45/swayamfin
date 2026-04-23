import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Calculator, ArrowRight, ShieldCheck, TrendingUp, Sparkles, PieChart } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { useTranslation } from 'react-i18next';

const EligibilityCalculator = () => {
  const { isDark } = useTheme();
  const { t } = useTranslation();
  const [monthlyIncome, setMonthlyIncome] = useState(50000);
  const [existingEMIs, setExistingEMIs] = useState(0);
  const [loanTenure, setLoanTenure] = useState(15);
  const [interestRate, setInterestRate] = useState(9.5);

  const calculateEligibility = () => {
    const foir = 0.5; // 50% FOIR
    const availableEMI = (monthlyIncome * foir) - existingEMIs;
    
    if (availableEMI <= 0) return 0;
    
    // Simple PV formula: P = EMI * [1 - (1+r)^-n] / r
    const monthlyRate = interestRate / (12 * 100);
    const months = loanTenure * 12;
    
    const eligibility = availableEMI * (Math.pow(1 + monthlyRate, months) - 1) / (monthlyRate * Math.pow(1 + monthlyRate, months));
    return Math.floor(eligibility);
  };

  const eligibleAmount = calculateEligibility();

  return (
    <section className={`py-32 relative overflow-hidden ${isDark ? 'bg-[#020617]' : 'bg-[#F8FAFC]'}`}>
      <div className={`absolute top-0 left-0 w-[500px] h-[500px] ${isDark ? 'bg-blue-600/5' : 'bg-blue-300/10'} blur-[100px] rounded-full -translate-x-1/2 -translate-y-1/2`} />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          
          <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
            <div className={`inline-flex items-center gap-2 px-6 py-2 rounded-full ${isDark ? 'bg-white/5 border-white/10' : 'bg-slate-100 border-slate-200'} border text-primary-gold text-[10px] font-black uppercase tracking-[0.3em] mb-8 shadow-sm`}>
               <Calculator className="w-3 h-3" /> {t('calc_tag')}
            </div>
            <h2 className={`text-5xl md:text-7xl font-playfair font-black ${isDark ? 'text-white' : 'text-slate-900'} leading-tight tracking-tighter mb-8`}>
               {t('calc_title').split(' ').slice(0, 2).join(' ')} <span className="text-blue-600 italic">Eligibility</span> Calculator
            </h2>
            <p className={`text-xl ${isDark ? 'text-slate-400' : 'text-slate-600'} font-medium leading-relaxed mb-12 italic`}>
              {t('calc_desc')}
            </p>
            
            <div className="grid grid-cols-2 gap-8">
               <div className="space-y-2">
                  <p className={`text-3xl font-black ${isDark ? 'text-white' : 'text-slate-900'}`}>9.5%<span className="text-blue-600 italic text-sm ml-1 select-none">*</span></p>
                  <p className="text-slate-500 text-[10px] font-black uppercase tracking-widest">{t('calc_rate')}</p>
               </div>
               <div className="space-y-2">
                  <p className={`text-3xl font-black ${isDark ? 'text-white' : 'text-slate-900'}`}>Up to 25Y</p>
                  <p className="text-slate-500 text-[10px] font-black uppercase tracking-widest">{t('calc_tenure')}</p>
               </div>
            </div>

            <div className={`mt-12 p-8 ${isDark ? 'bg-white/5 border-white/5' : 'bg-white border-slate-200 shadow-xl shadow-slate-200/50'} rounded-[40px] border flex items-center gap-6 group`}>
               <div className="p-4 bg-emerald-500 text-white rounded-2xl shadow-lg group-hover:rotate-12 transition-transform">
                  <ShieldCheck className="w-6 h-6" />
               </div>
               <p className={`${isDark ? 'text-slate-300' : 'text-slate-700'} text-xs font-bold leading-relaxed`}>{t('calc_data_sec')}</p>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 30 }} 
            whileInView={{ opacity: 1, y: 0 }} 
            viewport={{ once: true }}
            className={`${isDark ? 'bg-white/2 border-white/5 shadow-22xl shadow-black/50' : 'bg-white border-slate-200 shadow-2xl shadow-slate-200/50'} rounded-[60px] p-10 md:p-14 border relative overflow-hidden`}
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/5 blur-3xl rounded-full -mr-32 -mt-32" />
            
            <div className="space-y-12 relative z-10">
               {/* Income Slider */}
               <div className="space-y-6">
                  <div className="flex justify-between items-center">
                    <label className={`text-sm font-black uppercase tracking-widest ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>{t('calc_income')}</label>
                    <span className="text-2xl font-black text-blue-600 italic">₹{(monthlyIncome).toLocaleString()}</span>
                  </div>
                  <input 
                    type="range" min="15000" max="500000" step="5000" 
                    value={monthlyIncome} onChange={e => setMonthlyIncome(Number(e.target.value))}
                    className="w-full h-2 bg-blue-600/10 rounded-full appearance-none cursor-pointer accent-blue-600"
                  />
               </div>

               {/* Existing EMIs Slider */}
               <div className="space-y-6">
                  <div className="flex justify-between items-center">
                    <label className={`text-sm font-black uppercase tracking-widest ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>{t('calc_emis')}</label>
                    <span className="text-2xl font-black text-rose-500 italic">₹{(existingEMIs).toLocaleString()}</span>
                  </div>
                  <input 
                    type="range" min="0" max="200000" step="1000" 
                    value={existingEMIs} onChange={e => setExistingEMIs(Number(e.target.value))}
                    className="w-full h-2 bg-rose-500/10 rounded-full appearance-none cursor-pointer accent-rose-500"
                  />
               </div>

               {/* Result Card */}
               <div className={`${isDark ? 'bg-blue-600/10 border-blue-500/20' : 'bg-blue-600 border-blue-700 shadow-2xl shadow-blue-600/30'} p-10 rounded-[48px] border text-center transition-all group hover:scale-[1.02]`}>
                  <p className="text-white text-[11px] font-black uppercase tracking-[0.4em] mb-4 opacity-70">{t('calc_result')}</p>
                  <h3 className="text-white text-5xl md:text-6xl font-black tracking-tighter font-playfair mb-2">
                    ₹{(eligibleAmount / 100000).toFixed(1)}L
                  </h3>
                  <p className="text-blue-100 text-[10px] font-bold opacity-60">{t('calc_est')} {interestRate}% for {loanTenure} {t('calc_yrs')}</p>

                  <button className="mt-10 w-full py-5 bg-white text-blue-600 rounded-[24px] font-black uppercase tracking-[0.2em] text-[10px] shadow-xl hover:bg-blue-50 transition-all flex items-center justify-center gap-3">
                     {t('cta_btn')} <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform" />
                  </button>
               </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default EligibilityCalculator;
