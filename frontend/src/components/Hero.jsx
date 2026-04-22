import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { ShieldCheck, ArrowRight, CheckCircle2, AlertCircle, TrendingUp } from 'lucide-react';
import { getUTMParams } from '../utils/helpers';
import { useTheme } from '../context/ThemeContext';

// Modular Imports
import TrustBar from './home/TrustBar';
import ServicesSection from './home/ServicesSection';
import USPsSection from './home/USPsSection';
import Timeline from './home/Timeline';
import PartnerNBFCs from './home/PartnerNBFCs';
import EligibilityCalculator from './home/EligibilityCalculator';
import CTASection from './home/CTASection';

const Hero = () => {
  const { isDark } = useTheme();
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    fullName: '', mobile: '', email: '', loanType: 'msme_structured', amount: '', city: ''
  });
  const [submitStatus, setSubmitStatus] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [touched, setTouched] = useState({ mobile: false, amount: false });
  const [activeSlide, setActiveSlide] = useState(0);

  const slides = [
    {
      title: <>{t('hero_title_1')}</>,
      sub: t('hero_sub_1')
    },
    {
      title: <>{t('hero_title_2')}</>,
      sub: t('hero_sub_2')
    },
    {
      title: <>{t('hero_title_3')}</>,
      sub: t('hero_sub_3')
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveSlide(prev => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitStatus('submitting');
    try {
      const payload = {
        applicant_name: formData.fullName,
        mobile: formData.mobile,
        email: formData.email,
        loan_type: formData.loanType,
        loan_amount_required: Number(formData.amount),
        location_city: formData.city,
        ...getUTMParams()
      };

      const response = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:5001'}/api/leads`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      const data = await response.json();
      if (response.ok) {
        setSubmitStatus('success');
        setFormData({ fullName: '', mobile: '', email: '', loanType: 'msme_structured', amount: '', city: '' });
        setTouched({ mobile: false, amount: false });
      } else if (response.status === 409) {
        setSubmitStatus('duplicate');
      } else {
        setSubmitStatus('error');
        setErrorMessage(data.message || 'Server Error. Try again.');
      }
    } catch (error) {
      setSubmitStatus('error');
      setErrorMessage('Network error. Check your connection.');
    }
  };

  return (
    <div className={`${isDark ? 'bg-[#020617]' : 'bg-[#F8FAFC]'} font-dmsans transition-colors duration-300`}>
      {/* --- HERO SECTION --- */}
      <section className={`relative min-h-[90vh] flex items-center pt-24 pb-16 overflow-hidden ${isDark ? 'bg-[#020617]' : 'bg-[#F8FAFC]'}`}>
        <div className="absolute top-0 right-0 w-1/2 h-full opacity-10 bg-primary-gold rounded-l-[200px] transform skew-x-12 translate-x-32 blur-[120px]" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            
            <motion.div 
              initial={{ opacity: 0, x: -30 }} 
              animate={{ opacity: 1, x: 0 }} 
              className="space-y-8 order-2 lg:order-1"
            >
              <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full ${isDark ? 'bg-white/5 ring-white/10' : 'bg-slate-100 ring-slate-200'} text-primary-gold text-[10px] font-black uppercase tracking-widest shadow-sm ring-1`}>
                <ShieldCheck className="w-4 h-4" />
                {t('hero_badge')}
              </div>
              
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeSlide}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5 }}
                >
                  <h1 className={`text-5xl md:text-7xl font-playfair font-black ${isDark ? 'text-white' : 'text-slate-900'} leading-[1.1]`}>
                    {slides[activeSlide].title}
                  </h1>
                  <p className={`text-xl ${isDark ? 'text-slate-400' : 'text-slate-600'} font-medium max-w-lg leading-relaxed mt-4 italic`}>
                    {slides[activeSlide].sub}
                  </p>
                </motion.div>
              </AnimatePresence>
              
              <p className={`text-sm ${isDark ? 'text-slate-500' : 'text-slate-600'} font-bold max-w-lg leading-relaxed pt-2`}>
                Trusted by 750+ businesses across India. MSME Loans, LAP, Housing Finance & Supply Chain Solutions — Customized for You.
              </p>

              <div className="flex flex-wrap gap-8 items-center pt-4">
                <div className="flex flex-col">
                  <span className={`text-3xl font-black ${isDark ? 'text-white' : 'text-slate-900'}`}>₹125Cr+</span>
                  <span className="text-slate-500 text-[10px] font-black uppercase tracking-tighter">{t('hero_stats_disbursed')}</span>
                </div>
                <div className={`w-px h-10 ${isDark ? 'bg-white/10' : 'bg-slate-200'} hidden sm:block`}></div>
                <div className="flex flex-col">
                  <span className={`text-3xl font-black ${isDark ? 'text-white' : 'text-slate-900'}`}>750+</span>
                  <span className="text-slate-500 text-[10px] font-black uppercase tracking-tighter">{t('hero_stats_enterprises')}</span>
                </div>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              className={`${isDark ? 'bg-white/5 backdrop-blur-xl border-white/10 shadow-black shadow-2xl' : 'bg-white border-slate-200 shadow-xl shadow-slate-200/50'} p-8 md:p-10 rounded-[48px] border max-w-lg lg:ml-auto relative order-1 lg:order-2 transition-all duration-300`}
            >
              <div className="absolute -top-4 -right-4 bg-primary-gold p-4 rounded-2xl shadow-lg rotate-12 hidden md:block">
                <TrendingUp className="w-6 h-6 text-[#020617]" />
              </div>

              <div className="flex items-center gap-3 mb-8">
                <div className="w-2 h-8 bg-primary-gold rounded-full" />
                <h3 className={`text-2xl font-black ${isDark ? 'text-white' : 'text-slate-900'} font-playfair`}>{t('form_title')}</h3>
              </div>
              
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-4">
                  <input 
                    type="text" 
                    placeholder={t('form_name')}
                    className={`w-full px-6 py-4 ${isDark ? 'bg-white/5 border-white/5 text-white' : 'bg-slate-50 border-slate-100 text-slate-900'} rounded-2xl border-2 focus:border-primary-gold transition-all font-bold text-sm outline-none placeholder-slate-500`}
                    value={formData.fullName}
                    onChange={e => setFormData({...formData, fullName: e.target.value})}
                    required
                  />
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="flex flex-col gap-1">
                      <input 
                        type="tel" 
                        placeholder={t('form_mobile')}
                        className={`w-full px-6 py-4 ${isDark ? 'bg-white/5 text-white' : 'bg-slate-50 text-slate-900'} rounded-2xl border-2 transition-all font-bold text-sm outline-none placeholder-slate-500 ${
                          touched.mobile && formData.mobile.length > 0 && formData.mobile.length !== 10 
                            ? 'border-red-400 focus:border-red-500' 
                            : isDark ? 'border-white/5 focus:border-primary-gold' : 'border-slate-100 focus:border-primary-gold'
                        }`}
                        value={formData.mobile}
                        onChange={e => {
                          const val = e.target.value.replace(/\D/g, '');
                          if (val.length <= 10) setFormData({...formData, mobile: val});
                        }}
                        onBlur={() => setTouched({ ...touched, mobile: true })}
                        required
                        pattern="\d{10}"
                      />
                      {touched.mobile && formData.mobile.length > 0 && formData.mobile.length !== 10 && (
                        <span className="text-[10px] text-red-400 font-bold ml-2">Must be 10 digits</span>
                      )}
                    </div>
                    <input 
                      type="email" 
                      placeholder={t('form_email')}
                      className={`w-full px-6 py-4 ${isDark ? 'bg-white/5 border-white/5 text-white' : 'bg-slate-50 border-slate-100 text-slate-900'} rounded-2xl border-2 focus:border-primary-gold transition-all font-bold text-sm outline-none placeholder-slate-500`}
                      value={formData.email}
                      onChange={e => setFormData({...formData, email: e.target.value})}
                    />
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="relative">
                      <select 
                        className={`w-full px-6 py-4 ${isDark ? 'bg-white/5 border-white/5 text-white' : 'bg-slate-50 border-slate-100 text-slate-900'} rounded-2xl border-2 focus:border-primary-gold transition-all font-bold text-sm outline-none appearance-none cursor-pointer`}
                        value={formData.loanType}
                        onChange={e => setFormData({...formData, loanType: e.target.value})}
                      >
                        <option value="home_loan" className={isDark ? "bg-[#111827]" : "bg-white"}>Housing Loan</option>
                        <option value="micro_lap" className={isDark ? "bg-[#111827]" : "bg-white"}>Micro LAP</option>
                        <option value="supply_chain" className={isDark ? "bg-[#111827]" : "bg-white"}>Supply Chain Financing</option>
                        <option value="msme_structured" className={isDark ? "bg-[#111827]" : "bg-white"}>MSME Structured Product</option>
                        <option value="lap" className={isDark ? "bg-[#111827]" : "bg-white"}>Loan Against Property (LAP)</option>
                        <option value="hybrid" className={isDark ? "bg-[#111827]" : "bg-white"}>Hybrid MSME Product</option>
                      </select>
                      <div className={`absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none opacity-40 ${isDark ? 'text-white' : 'text-slate-900'}`}>
                         <ArrowRight className="w-4 h-4 rotate-90" />
                      </div>
                    </div>
                    <div className="flex flex-col gap-1">
                      <input 
                        type="number" 
                        placeholder="Amount (₹)"
                        className={`w-full px-6 py-4 ${isDark ? 'bg-white/5 text-white' : 'bg-slate-50 text-slate-900'} rounded-2xl border-2 transition-all font-bold text-sm outline-none placeholder-slate-500 ${
                          touched.amount && (formData.amount < 10000)
                            ? 'border-red-400 focus:border-red-500' 
                            : isDark ? 'border-white/5 focus:border-primary-gold' : 'border-slate-100 focus:border-primary-gold'
                        }`}
                        value={formData.amount}
                        onChange={e => setFormData({...formData, amount: e.target.value ? Number(e.target.value) : ''})}
                        onBlur={() => setTouched({ ...touched, amount: true })}
                        required
                        min="10000"
                      />
                      {touched.amount && formData.amount < 10000 && formData.amount !== '' && (
                        <span className="text-[10px] text-red-400 font-bold ml-2">Min ₹10,000</span>
                      )}
                    </div>
                  </div>
                  <div className="relative">
                    <select
                      className={`w-full px-6 py-4 ${isDark ? 'bg-white/5 border-white/5 text-white' : 'bg-slate-50 border-slate-100 text-slate-900'} rounded-2xl border-2 focus:border-primary-gold transition-all font-bold text-sm outline-none appearance-none cursor-pointer`}
                      value={formData.city}
                      onChange={e => setFormData({...formData, city: e.target.value})}
                      required
                    >
                      <option value="" disabled className={isDark ? "bg-[#111827]" : "bg-white"}>Select Branch City</option>
                      <option value="Agra" className={isDark ? "bg-[#111827]" : "bg-white"}>Agra</option>
                      <option value="Mathura" className={isDark ? "bg-[#111827]" : "bg-white"}>Mathura</option>
                      <option value="Hathras" className={isDark ? "bg-[#111827]" : "bg-white"}>Hathras</option>
                      <option value="Kosi" className={isDark ? "bg-[#111827]" : "bg-white"}>Kosi</option>
                    </select>
                    <div className={`absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none opacity-40 ${isDark ? 'text-white' : 'text-slate-900'}`}>
                       <ArrowRight className="w-4 h-4 rotate-90" />
                    </div>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={submitStatus === 'submitting'}
                  className="group relative w-full py-5 bg-primary-gold text-[#020617] font-black rounded-2xl overflow-hidden shadow-xl shadow-primary-gold/10 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300"
                >
                  <div className="absolute inset-0 bg-white translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                  <span className={`relative z-10 uppercase tracking-widest text-xs ${isDark ? '' : 'text-[#020617] group-hover:text-white'} px-4 py-1 rounded-lg transition-colors`}>
                    {submitStatus === 'submitting' ? t('form_submitting') : t('form_submit')}
                  </span>
                </button>

                <AnimatePresence mode="wait">
                  {submitStatus === 'success' && (
                    <motion.div key="success" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="mt-4 p-4 bg-green-500/10 text-emerald-400 rounded-2xl text-xs font-black text-center border border-emerald-500/20 uppercase tracking-widest">
                      <CheckCircle2 className="w-4 h-4 inline-block mr-2 mb-0.5" />
                      Application Submitted Successfully!
                    </motion.div>
                  )}
                  {submitStatus === 'duplicate' && (
                    <motion.div key="duplicate" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="mt-4 p-4 bg-amber-500/10 text-amber-400 rounded-2xl text-xs font-black text-center border border-amber-500/20 uppercase tracking-widest leading-relaxed">
                      <AlertCircle className="w-4 h-4 inline-block mr-2 mb-0.5" />
                      Duplicate Entry: This number was used in the last 24 hours.
                    </motion.div>
                  )}
                  {submitStatus === 'error' && (
                    <motion.div key="error" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="mt-4 p-4 bg-rose-500/10 text-rose-400 rounded-2xl text-[10px] font-black text-center border border-rose-500/20 uppercase tracking-widest leading-relaxed">
                      <AlertCircle className="w-4 h-4 inline-block mr-2 mb-0.5" />
                      {errorMessage}
                    </motion.div>
                  )}
                </AnimatePresence>
              </form>
            </motion.div>
          </div>
        </div>
      </section>

      {/* --- PAGE SECTIONS --- */}
      <TrustBar />
      <PartnerNBFCs />
      <ServicesSection />
      <USPsSection />
      <Timeline />
      <EligibilityCalculator />
      <CTASection />
    </div>

  );
};

export default Hero;
