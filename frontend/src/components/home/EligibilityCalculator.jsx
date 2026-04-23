import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, ShieldCheck, Zap, Target, Activity } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { useTranslation } from 'react-i18next';

const EligibilityCalculator = () => {
  const { isDark } = useTheme();
  const { t } = useTranslation();
  const [monthlyIncome, setMonthlyIncome] = useState(150000);
  const [existingEMIs, setExistingEMIs] = useState(25000);
  const [loanTenure, setLoanTenure] = useState(20);
  const [interestRate] = useState(9.5);

  const calculateEligibility = () => {
    const foir = 0.55;
    const availableEMI = (monthlyIncome * foir) - existingEMIs;
    if (availableEMI <= 0) return 0;
    const monthlyRate = interestRate / (12 * 100);
    const months = loanTenure * 12;
    return Math.floor(availableEMI * (Math.pow(1 + monthlyRate, months) - 1) / (monthlyRate * Math.pow(1 + monthlyRate, months)));
  };

  const eligibleAmount = calculateEligibility();

  return (
    <section className={`py-16 md:py-24 lg:py-32 relative overflow-hidden ${isDark ? 'bg-[#020617]' : 'bg-white'}`}>
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <div className={`absolute top-0 right-0 w-[500px] h-[500px] ${isDark ? 'bg-blue-600/5' : 'bg-blue-500/3'} blur-[140px] rounded-full translate-x-1/2 -translate-y-1/2`} />
        <div className={`absolute bottom-0 left-0 w-[400px] h-[400px] ${isDark ? 'bg-primary-gold/5' : 'bg-primary-gold/2'} blur-[120px] rounded-full -translate-x-1/3`} />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-start">

          {/* Left Info Panel */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-6 text-center lg:text-left"
          >
            <div className="flex justify-center lg:justify-start">
              <div className={`inline-flex items-center gap-3 px-5 py-2.5 rounded-full ${isDark ? 'bg-white/5 border-white/10' : 'bg-blue-600/10 border-blue-500/20'} border text-primary-gold text-[10px] font-black uppercase tracking-[0.4em]`}>
                <Activity className="w-3.5 h-3.5 animate-pulse" /> {t('calc_tag')}
              </div>
            </div>

            <h2 className={`text-3xl sm:text-4xl md:text-5xl font-black ${isDark ? 'text-white' : 'text-[#020617]'} leading-tight tracking-tight font-playfair`}>
              Credit <span className="text-blue-600 italic">Eligibility</span> Probe
            </h2>

            <p className={`text-sm md:text-base ${isDark ? 'text-slate-400' : 'text-slate-500'} leading-relaxed max-w-lg mx-auto lg:mx-0 italic border-l-4 border-primary-gold/40 pl-5`}>
              "Advanced computational engine for high-precision institutional credit scenario modeling."
            </p>

            <div className="grid grid-cols-2 gap-6">
              <div className={`${isDark ? 'bg-white/5 border-white/10' : 'bg-slate-50 border-slate-100'} p-5 rounded-2xl border`}>
                <div className="flex items-center gap-2 mb-2">
                  <Zap className="w-4 h-4 text-primary-gold" />
                  <span className="text-slate-500 text-[10px] font-black uppercase tracking-widest">{t('calc_rate')}</span>
                </div>
                <p className={`text-2xl md:text-3xl font-black ${isDark ? 'text-white' : 'text-[#020617]'} tracking-tight`}>9.5%</p>
              </div>
              <div className={`${isDark ? 'bg-white/5 border-white/10' : 'bg-slate-50 border-slate-100'} p-5 rounded-2xl border`}>
                <div className="flex items-center gap-2 mb-2">
                  <Target className="w-4 h-4 text-blue-600" />
                  <span className="text-slate-500 text-[10px] font-black uppercase tracking-widest">{t('calc_tenure')}</span>
                </div>
                <p className={`text-2xl md:text-3xl font-black ${isDark ? 'text-white' : 'text-[#020617]'} tracking-tight`}>25 Yrs</p>
              </div>
            </div>

            <div className={`${isDark ? 'bg-white/5 border-white/10' : 'bg-slate-50 border-slate-100'} p-5 rounded-2xl border flex gap-4 items-start`}>
              <div className="w-10 h-10 bg-emerald-500/10 text-emerald-500 rounded-xl flex items-center justify-center shrink-0">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <h4 className={`text-xs font-black uppercase tracking-wide ${isDark ? 'text-white' : 'text-[#020617]'} mb-1`}>Data Security</h4>
                <p className={`${isDark ? 'text-slate-400' : 'text-slate-500'} text-xs leading-relaxed`}>Your financial data is never stored or shared without consent.</p>
              </div>
            </div>
          </motion.div>

          {/* Right Calculator Panel */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className={`${isDark ? 'bg-[#0B1221]/80 border-white/10' : 'bg-white border-slate-200 shadow-xl'} rounded-3xl p-6 md:p-8 border`}>

              {/* Income Slider */}
              <div className="space-y-4 mb-8">
                <div className="flex justify-between items-end">
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-widest text-slate-500 mb-1">{t('calc_income')}</p>
                    <h4 className={`text-sm font-black ${isDark ? 'text-white' : 'text-[#020617]'} uppercase`}>Monthly Income</h4>
                  </div>
                  <span className="text-xl md:text-2xl font-black text-blue-600 font-playfair italic">₹{monthlyIncome.toLocaleString()}</span>
                </div>
                <input
                  type="range" min="15000" max="1000000" step="5000"
                  value={monthlyIncome} onChange={e => setMonthlyIncome(Number(e.target.value))}
                  className="w-full h-2 bg-blue-600/20 rounded-full appearance-none cursor-pointer accent-blue-600"
                />
                <div className="flex justify-between text-[10px] text-slate-500 font-black uppercase tracking-widest opacity-50">
                  <span>₹15K</span><span>₹10L</span>
                </div>
              </div>

              {/* EMI Slider */}
              <div className="space-y-4 mb-8">
                <div className="flex justify-between items-end">
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-widest text-slate-500 mb-1">{t('calc_emis')}</p>
                    <h4 className={`text-sm font-black ${isDark ? 'text-white' : 'text-[#020617]'} uppercase`}>Existing EMIs</h4>
                  </div>
                  <span className="text-xl md:text-2xl font-black text-rose-500 font-playfair italic">₹{existingEMIs.toLocaleString()}</span>
                </div>
                <input
                  type="range" min="0" max="500000" step="2000"
                  value={existingEMIs} onChange={e => setExistingEMIs(Number(e.target.value))}
                  className="w-full h-2 bg-rose-500/20 rounded-full appearance-none cursor-pointer accent-rose-500"
                />
                <div className="flex justify-between text-[10px] text-slate-500 font-black uppercase tracking-widest opacity-50">
                  <span>₹0</span><span>₹5L</span>
                </div>
              </div>

              {/* Tenure Slider */}
              <div className="space-y-4 mb-8">
                <div className="flex justify-between items-end">
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-widest text-slate-500 mb-1">Loan Tenure</p>
                    <h4 className={`text-sm font-black ${isDark ? 'text-white' : 'text-[#020617]'} uppercase`}>Repayment Period</h4>
                  </div>
                  <span className="text-xl md:text-2xl font-black text-emerald-500 font-playfair italic">{loanTenure} Yrs</span>
                </div>
                <input
                  type="range" min="1" max="30" step="1"
                  value={loanTenure} onChange={e => setLoanTenure(Number(e.target.value))}
                  className="w-full h-2 bg-emerald-500/20 rounded-full appearance-none cursor-pointer accent-emerald-500"
                />
                <div className="flex justify-between text-[10px] text-slate-500 font-black uppercase tracking-widest opacity-50">
                  <span>1 Yr</span><span>30 Yrs</span>
                </div>
              </div>

              {/* Result */}
              <div className={`bg-[#020617] p-6 md:p-8 rounded-2xl border border-white/5 text-center`}>
                <p className="text-slate-400 text-[10px] font-black uppercase tracking-widest mb-3">Estimated Loan Eligibility</p>
                <h3 className="text-white text-4xl md:text-5xl lg:text-6xl font-black tracking-tight font-playfair">
                  ₹{(eligibleAmount / 100000).toFixed(1)}
                  <span className="text-2xl md:text-3xl text-blue-500 ml-1.5">L</span>
                </h3>
                <p className="text-slate-500 text-[10px] font-black uppercase tracking-widest mt-2 mb-6">
                  @ {interestRate}% for {loanTenure} years
                </p>
                <button
                  onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                  className="w-full py-4 bg-white text-[#020617] rounded-2xl font-black uppercase tracking-wider text-xs hover:bg-blue-600 hover:text-white transition-all duration-500 flex items-center justify-center gap-3"
                >
                  Apply Now <ArrowRight className="w-4 h-4" />
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
