import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, ShieldCheck, Zap, Target, Activity } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { useTranslation } from 'react-i18next';

const EligibilityCalculator = () => {
  const { isDark } = useTheme();
  const { t } = useTranslation();
  const [calcType, setCalcType] = useState('eligibility'); // 'eligibility' or 'emi'
  const [monthlyIncome, setMonthlyIncome] = useState(150000);
  const [existingEMIs, setExistingEMIs] = useState(25000);
  const [loanAmount, setLoanAmount] = useState(5000000);
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

  const calculateEMI = () => {
    const monthlyRate = interestRate / (12 * 100);
    const months = loanTenure * 12;
    const emi = (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, months)) / (Math.pow(1 + monthlyRate, months) - 1);
    return Math.floor(emi);
  };

  const eligibleAmount = calculateEligibility();
  const emiAmount = calculateEMI();

  const getAssetTier = (amount) => {
    if (amount >= 10000000) return { name: 'Institutional Hub', color: 'blue' };
    if (amount >= 5000000) return { name: 'Gold Priority', color: 'primary-gold' };
    return { name: 'Silver Asset', color: 'slate-500' };
  };

  const tier = getAssetTier(calcType === 'eligibility' ? eligibleAmount : loanAmount);

  return (
    <section className={`py-16 md:py-24 lg:py-32 relative overflow-hidden ${isDark ? 'bg-[#020617]' : 'bg-white'}`}>
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <div className={`absolute top-0 right-0 w-[500px] h-[500px] ${isDark ? 'bg-blue-600/5' : 'bg-blue-500/3'} blur-[140px] rounded-full translate-x-1/2 -translate-y-1/2`} />
        <div className={`absolute bottom-0 left-0 w-[400px] h-[400px] ${isDark ? 'bg-primary-gold/5' : 'bg-primary-gold/2'} blur-[120px] rounded-full -translate-x-1/3`} />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">

          {/* Left Info Panel */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-8 text-center lg:text-left"
          >
            <div className="flex justify-center lg:justify-start">
              <div className={`inline-flex items-center gap-3 px-5 py-2.5 rounded-full ${isDark ? 'bg-white/5 border-white/10' : 'bg-blue-600/10 border-blue-500/20'} border text-primary-gold text-[10px] font-black uppercase tracking-[0.4em]`}>
                <Activity className="w-3.5 h-3.5 animate-pulse" /> Asset Modeling Engine
              </div>
            </div>

            <div className="space-y-4">
               <h2 className={`text-4xl md:text-6xl font-black ${isDark ? 'text-white' : 'text-[#020617]'} leading-none tracking-tighter font-playfair uppercase`}>
                 Credit <br /> <span className="text-blue-600 italic">Financial</span> Node.
               </h2>
               <p className={`text-sm md:text-lg ${isDark ? 'text-slate-400' : 'text-slate-500'} font-medium italic max-w-lg mx-auto lg:mx-0 leading-relaxed border-l-4 border-blue-600/20 pl-6`}>
                 "Deploying sophisticated algorithms to simulate high-precision credit scenarios for institutional and enterprise scaling."
               </p>
            </div>

            <div className="grid grid-cols-2 gap-4 md:gap-6">
              <div className={`${isDark ? 'bg-white/2 border-white/5' : 'bg-white border-slate-100 shadow-xl'} p-6 rounded-[32px] border group`}>
                <div className="flex items-center gap-3 mb-4">
                  <Zap className="w-5 h-5 text-primary-gold group-hover:rotate-12 transition-transform" />
                  <span className="text-slate-500 text-[10px] font-black uppercase tracking-widest">{t('calc_rate')}</span>
                </div>
                <p className={`text-3xl md:text-4xl font-playfair font-black ${isDark ? 'text-white' : 'text-[#020617]'} tracking-tight`}>9.5%</p>
              </div>
              <div className={`${isDark ? 'bg-white/2 border-white/5' : 'bg-white border-slate-100 shadow-xl'} p-6 rounded-[32px] border group`}>
                <div className="flex items-center gap-3 mb-4">
                  <ShieldCheck className="w-5 h-5 text-blue-500" />
                  <span className="text-slate-500 text-[10px] font-black uppercase tracking-widest">Security</span>
                </div>
                <p className={`text-3xl md:text-4xl font-playfair font-black ${isDark ? 'text-white' : 'text-[#020617]'} tracking-tight`}>FIPS</p>
              </div>
            </div>

            <div className={`p-6 rounded-[32px] ${isDark ? 'bg-blue-600/5 border-blue-600/10' : 'bg-blue-50 border-blue-100'} border flex items-center gap-6`}>
               <div className={`px-4 py-2 rounded-full bg-${tier.color} text-white text-[10px] font-black uppercase tracking-widest shadow-lg`}>
                  {tier.name}
               </div>
               <p className={`text-[11px] font-bold ${isDark ? 'text-slate-500' : 'text-slate-600'} uppercase tracking-widest`}>Verification Tier Status</p>
            </div>
          </motion.div>

          {/* Right Calculator Panel */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className={`absolute -inset-4 bg-blue-600/10 blur-[100px] rounded-full opacity-50 z-0`} />
            
            <div className={`${isDark ? 'bg-[#0B1221] border-white/5 shadow-3xl shadow-black/80' : 'bg-white border-slate-200 shadow-2xl'} rounded-[48px] p-8 md:p-12 border relative z-10 backdrop-blur-3xl`}>
              
              {/* Type Switcher */}
              <div className="flex p-1.5 bg-slate-500/10 rounded-[28px] mb-12 border border-white/5">
                 <button 
                  onClick={() => setCalcType('eligibility')}
                  className={`flex-1 py-4 rounded-[22px] text-[10px] font-black uppercase tracking-[0.2em] transition-all duration-500 ${calcType === 'eligibility' ? 'bg-blue-600 text-white shadow-xl' : 'text-slate-500 hover:text-blue-500'}`}
                 >
                   Eligibility
                 </button>
                 <button 
                  onClick={() => setCalcType('emi')}
                  className={`flex-1 py-4 rounded-[22px] text-[10px] font-black uppercase tracking-[0.2em] transition-all duration-500 ${calcType === 'emi' ? 'bg-blue-600 text-white shadow-xl' : 'text-slate-500 hover:text-blue-500'}`}
                 >
                   EMI Simulation
                 </button>
              </div>

              <AnimatePresence mode="wait">
                {calcType === 'eligibility' ? (
                  <motion.div key="eligibility" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-10">
                    <SliderBlock label="Monthly Yield" value={monthlyIncome} min={15000} max={1000000} step={5000} icon={<Activity />} color="blue" isDark={isDark} onChange={setMonthlyIncome} prefix="₹" />
                    <SliderBlock label="Existing Liabilities" value={existingEMIs} min={0} max={500000} step={2000} icon={<Activity />} color="rose" isDark={isDark} onChange={setExistingEMIs} prefix="₹" />
                    <SliderBlock label="Repayment Cycle" value={loanTenure} min={1} max={30} step={1} icon={<Target />} color="emerald" isDark={isDark} onChange={setLoanTenure} suffix=" Yrs" />
                  </motion.div>
                ) : (
                  <motion.div key="emi" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-10">
                    <SliderBlock label="Requested Capital" value={loanAmount} min={100000} max={50000000} step={100000} icon={<Zap />} color="blue" isDark={isDark} onChange={setLoanAmount} prefix="₹" />
                    <SliderBlock label="Repayment Cycle" value={loanTenure} min={1} max={30} step={1} icon={<Target />} color="emerald" isDark={isDark} onChange={setLoanTenure} suffix=" Yrs" />
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Result Interface */}
              <div className={`mt-12 bg-[#020617] p-8 md:p-10 rounded-[32px] border border-white/5 text-center relative overflow-hidden group`}>
                <div className="absolute top-0 right-0 w-32 h-32 bg-blue-600/20 blur-[60px] rounded-full translate-x-1/2 -translate-y-1/2" />
                
                <p className="text-slate-500 text-[10px] font-black uppercase tracking-[0.4em] mb-4 relative z-10">
                  {calcType === 'eligibility' ? 'Estimated Credit Limit' : 'Projected Monthly Service'}
                </p>
                
                <h3 className="text-white text-5xl md:text-7xl font-black tracking-tighter font-playfair relative z-10 leading-none">
                  {calcType === 'eligibility' ? (
                    <>₹{(eligibleAmount / 100000).toFixed(1)}<span className="text-2xl md:text-3xl text-blue-500 ml-2">L</span></>
                  ) : (
                    <>₹{emiAmount.toLocaleString()}<span className="text-xl md:text-2xl text-blue-500 ml-2">/MO</span></>
                  )}
                </h3>

                <p className="text-blue-600/50 text-[9px] font-black uppercase tracking-widest mt-6 mb-8 italic">
                   @ {interestRate}% Benchmark Yield Rate
                </p>

                <button
                  onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                  className="w-full py-5 bg-white text-[#020617] rounded-[22px] font-black uppercase tracking-[0.4em] text-[10px] hover:bg-blue-600 hover:text-white transition-all duration-700 flex items-center justify-center gap-4 group/btn"
                >
                  Initiate Application <ArrowRight className="w-5 h-5 group-hover/btn:translate-x-2 transition-transform" />
                </button>
              </div>

            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const SliderBlock = ({ label, value, min, max, step, color, isDark, onChange, prefix = '', suffix = '' }) => (
  <div className="space-y-6">
    <div className="flex justify-between items-center">
      <h4 className={`text-[11px] font-black uppercase tracking-widest ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>{label}</h4>
      <span className={`text-lg md:text-2xl font-playfair font-black ${color === 'rose' ? 'text-rose-500' : color === 'emerald' ? 'text-emerald-500' : 'text-blue-600'} italic`}>
        {prefix}{value > 99999 ? (value / 100000).toFixed(value % 100000 === 0 ? 0 : 1) + 'L' : value}{suffix}
      </span>
    </div>
    <div className="relative pt-2">
      <input
        type="range" min={min} max={max} step={step}
        value={value} onChange={e => onChange(Number(e.target.value))}
        className={`w-full h-1.5 rounded-full appearance-none cursor-pointer bg-${color}-500/20 active:scale-[1.02] transition-transform`}
        style={{
           accentColor: color === 'rose' ? '#f43f5e' : color === 'emerald' ? '#10b981' : '#2563eb'
        }}
      />
    </div>
  </div>
);

export default EligibilityCalculator;
