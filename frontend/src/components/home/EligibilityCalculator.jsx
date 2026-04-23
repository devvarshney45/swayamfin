import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Calculator, ArrowRight, ShieldCheck, TrendingUp, Sparkles, PieChart, Target, Zap, Activity, Cpu, Layers, ChevronRight, Shield } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { useTranslation } from 'react-i18next';

const EligibilityCalculator = () => {
  const { isDark } = useTheme();
  const { t } = useTranslation();
  const [monthlyIncome, setMonthlyIncome] = useState(150000);
  const [existingEMIs, setExistingEMIs] = useState(25000);
  const [loanTenure, setLoanTenure] = useState(20);
  const [interestRate, setInterestRate] = useState(9.5);

  const calculateEligibility = () => {
    const foir = 0.55; // Institutional FOIR estimation protocol
    const availableEMI = (monthlyIncome * foir) - existingEMIs;
    if (availableEMI <= 0) return 0;
    
    const monthlyRate = interestRate / (12 * 100);
    const months = loanTenure * 12;
    const eligibility = availableEMI * (Math.pow(1 + monthlyRate, months) - 1) / (monthlyRate * Math.pow(1 + monthlyRate, months));
    return Math.floor(eligibility);
  };

  const eligibleAmount = calculateEligibility();

  return (
    <section className={`py-32 md:py-56 relative overflow-hidden ${isDark ? 'bg-[#020617]' : 'bg-[#F8FAFC]'}`}>
      {/* High-Precision Background Core */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className={`absolute top-0 right-0 w-[1000px] h-[1000px] ${isDark ? 'bg-blue-600/5' : 'bg-blue-500/3'} blur-[200px] rounded-full translate-x-1/2 -translate-y-1/2`} />
        <div className={`absolute bottom-0 left-0 w-[600px] h-[600px] ${isDark ? 'bg-primary-gold/5' : 'bg-primary-gold/2'} blur-[150px] rounded-full -translate-x-1/3 translate-y-1/2`} />
      </div>
      
      <div className="max-w-7xl mx-auto px-6 md:px-10 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-24 lg:gap-32 items-center">
          
          {/* Senior Narrative Column */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }} 
            whileInView={{ opacity: 1, x: 0 }} 
            viewport={{ once: true }}
            className="lg:col-span-12 xl:col-span-5 space-y-12"
          >
            <div className={`inline-flex items-center gap-4 px-8 py-3 rounded-full ${isDark ? 'bg-white/5 border-white/5 shadow-22xl shadow-blue-500/10' : 'bg-blue-600/10 border-blue-500/20'} border text-primary-gold text-[10px] font-black uppercase tracking-[0.5em] shadow-inner`}>
               <Activity className="w-5 h-5 animate-pulse" /> {t('calc_tag')}
            </div>
            
            <h2 className={`text-5xl md:text-[8rem] font-playfair font-black ${isDark ? 'text-white' : 'text-[#020617]'} leading-[0.85] tracking-tighter`}>
               Credit <br /> <span className="text-blue-600 italic">Velocity</span> Probe
            </h2>
            
            <p className={`text-xl md:text-3xl ${isDark ? 'text-slate-400' : 'text-slate-500'} font-medium italic leading-relaxed max-w-xl border-l-[6px] border-primary-gold/30 pl-10 font-dmsans`}>
              "Advanced computational engine for high-precision institutional credit scenario modeling."
            </p>
            
            <div className="grid grid-cols-2 gap-16 pt-10 font-dmsans">
               <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <Zap className="w-5 h-5 text-primary-gold" />
                    <span className="text-slate-500 text-[10px] font-black uppercase tracking-[0.4em]">{t('calc_rate')}</span>
                  </div>
                  <p className={`text-4xl md:text-5xl font-black ${isDark ? 'text-white' : 'text-[#020617]'} tracking-tighter`}>9.5%<span className="text-blue-600 text-base italic ml-1">*</span></p>
               </div>
               <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <Target className="w-5 h-5 text-blue-600" />
                    <span className="text-slate-500 text-[10px] font-black uppercase tracking-[0.4em]">{t('calc_tenure')}</span>
                  </div>
                  <p className={`text-4xl md:text-5xl font-black ${isDark ? 'text-white' : 'text-[#020617]'} tracking-tighter`}>25Y Full</p>
               </div>
            </div>

            <div className={`mt-16 p-12 ${isDark ? 'bg-white/5 border-white/5 shadow-22xl shadow-black' : 'bg-white border-slate-100 shadow-22xl shadow-slate-200/50'} rounded-[56px] border flex gap-8 items-start group transition-all duration-700 hover:-translate-y-2`}>
               <div className={`w-16 h-16 bg-emerald-500/10 text-emerald-500 rounded-2xl flex items-center justify-center shrink-0 border border-emerald-500/20 group-hover:rotate-12 transition-transform duration-700`}>
                  <ShieldCheck className="w-8 h-8" />
               </div>
               <div className="space-y-2">
                  <h4 className={`text-sm font-black uppercase tracking-[0.3em] ${isDark ? 'text-white' : 'text-[#020617]'}`}>Data Governance Protocol</h4>
                  <p className={`${isDark ? 'text-slate-400' : 'text-slate-500'} text-[13px] font-bold leading-relaxed italic opacity-80`}>"Institutional-grade encryption ensures that your fiscal telemetry remains strictly confidential and non-persistent."</p>
               </div>
            </div>
          </motion.div>

          {/* Precision Controls Matrix */}
          <motion.div 
            initial={{ opacity: 0, y: 60 }} 
            whileInView={{ opacity: 1, y: 0 }} 
            viewport={{ once: true }}
            className="lg:col-span-12 xl:col-span-7 font-dmsans"
          >
            <div className={`${isDark ? 'bg-[#0B1221]/40 border-white/5 shadow-22xl shadow-black/80' : 'bg-white border-slate-200 shadow-22xl shadow-slate-200/60'} rounded-[80px] md:rounded-[120px] p-12 md:p-24 border relative overflow-hidden group`}>
              <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-600/5 blur-[150px] rounded-full -mr-64 -mt-64 transition-transform duration-1000 group-hover:scale-125" />
              <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-[0.03] pointer-events-none" />
              
              <div className="space-y-24 relative z-10">
                {/* Income Governance Hub */}
                <div className="space-y-12">
                   <div className="flex justify-between items-end border-b border-white/5 pb-8">
                     <div className="space-y-3">
                        <div className="flex items-center gap-3">
                           <Layers className="w-4 h-4 text-blue-600" />
                           <label className={`text-[10px] font-black uppercase tracking-[0.5em] ${isDark ? 'text-slate-500' : 'text-slate-400'}`}>{t('calc_income')}</label>
                        </div>
                        <h4 className={`text-base md:text-2xl font-black ${isDark ? 'text-white' : 'text-[#020617]'} uppercase tracking-tight`}>Institutional Liquidity</h4>
                     </div>
                     <span className="text-4xl md:text-7xl font-playfair font-black text-blue-600 italic tracking-tighter">₹{(monthlyIncome).toLocaleString()}</span>
                   </div>
                   <div className="relative pt-4">
                      <input 
                        type="range" min="15000" max="1000000" step="5000" 
                        value={monthlyIncome} onChange={e => setMonthlyIncome(Number(e.target.value))}
                        className="w-full h-3 bg-blue-600/10 rounded-full appearance-none cursor-pointer accent-blue-600 shadow-inner group/range"
                      />
                      <div className="absolute -bottom-8 left-0 text-[10px] font-black text-slate-500 opacity-40 uppercase tracking-widest">15K Node</div>
                      <div className="absolute -bottom-8 right-0 text-[10px] font-black text-slate-500 opacity-40 uppercase tracking-widest">1M Limit</div>
                   </div>
                </div>

                {/* Liability Compliance Check */}
                <div className="space-y-12">
                   <div className="flex justify-between items-end border-b border-white/5 pb-8">
                     <div className="space-y-3">
                        <div className="flex items-center gap-3">
                           <Shield className="w-4 h-4 text-rose-500" />
                           <label className={`text-[10px] font-black uppercase tracking-[0.5em] ${isDark ? 'text-slate-500' : 'text-slate-400'}`}>{t('calc_emis')}</label>
                        </div>
                        <h4 className={`text-base md:text-2xl font-black ${isDark ? 'text-white' : 'text-[#020617]'} uppercase tracking-tight`}>Existing Obligations</h4>
                     </div>
                     <span className="text-4xl md:text-7xl font-playfair font-black text-rose-500 italic tracking-tighter">₹{(existingEMIs).toLocaleString()}</span>
                   </div>
                   <div className="relative pt-4">
                      <input 
                        type="range" min="0" max="500000" step="2000" 
                        value={existingEMIs} onChange={e => setExistingEMIs(Number(e.target.value))}
                        className="w-full h-3 bg-rose-500/10 rounded-full appearance-none cursor-pointer accent-rose-500 shadow-inner"
                      />
                      <div className="absolute -bottom-8 left-0 text-[10px] font-black text-slate-500 opacity-40 uppercase tracking-widest">Zero Base</div>
                      <div className="absolute -bottom-8 right-0 text-[10px] font-black text-slate-500 opacity-40 uppercase tracking-widest">500K Peak</div>
                   </div>
                </div>

                {/* High-Velocity Result Terminal */}
                <div className={`${isDark ? 'bg-[#020617] border-white/5' : 'bg-[#020617] border-white/5 shadow-22xl shadow-black/80'} p-12 md:p-20 rounded-[64px] md:rounded-[90px] border text-center transition-all duration-700 group/res hover:scale-[1.02] relative overflow-hidden active:scale-95`}>
                   <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 via-transparent to-primary-gold/5 pointer-events-none" />
                   <div className="absolute top-0 right-0 p-8">
                      <Cpu className="w-8 h-8 text-blue-600 opacity-20 animate-spin-slow" />
                   </div>
                   
                   <p className="text-white text-[11px] font-black uppercase tracking-[0.6em] mb-10 opacity-40 italic">Estimated Deployment Magnitude</p>
                   <div className="relative flex justify-center items-baseline gap-4 mb-2">
                      <span className="text-blue-500 font-black text-4xl md:text-6xl italic font-playfair">₹</span>
                      <h3 className="text-white text-7xl md:text-[11rem] font-black tracking-tighter font-playfair transition-all duration-1000 group-hover/res:scale-[1.05] group-hover/res:text-blue-500">
                        {(eligibleAmount / 100000).toFixed(1)}<span className="text-4xl md:text-[6rem] ml-2 opacity-60">L</span>
                      </h3>
                   </div>
                   <p className="text-slate-400 text-[11px] font-black uppercase tracking-[0.5em] mb-12 opacity-60">@ {interestRate}% Protocol Floor for {loanTenure}Y Pipeline</p>

                   <button className="w-full py-10 bg-white text-[#020617] rounded-[48px] font-black uppercase tracking-[0.5em] text-[11px] shadow-22xl shadow-blue-600/30 hover:bg-blue-600 hover:text-white transition-all duration-700 flex items-center justify-center gap-6 relative overflow-hidden group/btn2 group-active/res:scale-95">
                      <div className="absolute inset-0 bg-blue-600 translate-y-full group-hover/btn2:translate-y-0 transition-transform duration-700" />
                      <span className="relative z-10 flex items-center gap-4">
                         Initialize Full Access <ArrowRight className="w-6 h-6 group-hover/btn2:translate-x-3 transition-transform duration-700" />
                      </span>
                   </button>
                </div>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default EligibilityCalculator;
