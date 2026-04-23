import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { ShieldCheck, ArrowRight, CheckCircle2, AlertCircle, TrendingUp, ChevronDown, Zap, Globe, Shield, Cpu, Activity, Layout } from 'lucide-react';
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
  const { t, i18n } = useTranslation();
  const [formData, setFormData] = useState({
    fullName: '', mobile: '', email: '', loanType: 'msme_structured', amount: '', city: ''
  });
  const [submitStatus, setSubmitStatus] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [touched, setTouched] = useState({ mobile: false, amount: false });
  const [activeSlide, setActiveSlide] = useState(0);

  const slides = [
    { title: t('hero_title_1'), sub: t('hero_sub_1'), icon: <Zap /> },
    { title: t('hero_title_2'), sub: t('hero_sub_2'), icon: <Globe /> },
    { title: t('hero_title_3'), sub: t('hero_sub_3'), icon: <Shield /> }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveSlide(prev => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [slides.length]);

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
    <div className={`${isDark ? 'bg-[#020617]' : 'bg-[#F8FAFC]'} font-dmsans transition-colors duration-700 overflow-x-hidden`}>
      {/* --- HERO SECTION --- */}
      <section className="relative min-h-screen flex items-center pt-40 pb-16 md:pt-48 md:pb-24">

        {/* Background */}
        <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
          <div className={`absolute top-0 right-0 w-[600px] h-[600px] ${isDark ? 'bg-blue-600/10' : 'bg-blue-500/5'} blur-[140px] rounded-full translate-x-1/3 -translate-y-1/3`} />
          <div className={`absolute bottom-0 left-0 w-[400px] h-[400px] ${isDark ? 'bg-primary-gold/5' : 'bg-primary-gold/3'} blur-[120px] rounded-full -translate-x-1/4`} />
          <div className={`absolute inset-0 ${isDark ? 'opacity-20' : 'opacity-5'}`}
            style={{ backgroundImage: 'radial-gradient(circle at 1.5px 1.5px, #475569 1px, transparent 0)', backgroundSize: '40px 40px' }} />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 relative z-10 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-start">

            {/* Left Content Column */}
            <div className="space-y-6 lg:space-y-8 text-center lg:text-left">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full bg-blue-600/10 border border-blue-500/20 backdrop-blur-md"
              >
                <Activity className="w-3.5 h-3.5 text-primary-gold animate-pulse" />
                <span className="text-primary-gold text-[10px] font-black uppercase tracking-[0.4em]">{t('hero_badge')}</span>
              </motion.div>

              {/* Animated Title */}
              <div className="min-h-[200px] sm:min-h-[220px] md:min-h-[260px] overflow-hidden">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeSlide}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -30 }}
                    transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                    className="space-y-5"
                  >
                    <h1 className={`text-4xl sm:text-5xl md:text-6xl lg:text-6xl xl:text-7xl font-black ${isDark ? 'text-white' : 'text-[#020617]'} leading-[1.0] tracking-tight font-playfair`}>
                      {slides[activeSlide].title.split(' ').map((word, i) => (
                        <span key={i} className={i % 2 === 1 ? 'text-blue-600 italic' : ''}>{word} </span>
                      ))}
                    </h1>
                    <p className={`text-base sm:text-lg md:text-xl ${isDark ? 'text-slate-400' : 'text-slate-500'} font-medium max-w-xl mx-auto lg:mx-0 leading-relaxed italic border-l-4 border-primary-gold/40 pl-5`}>
                      {slides[activeSlide].sub}
                    </p>
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Slide Indicators */}
              <div className="flex gap-2 justify-center lg:justify-start">
                {slides.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveSlide(i)}
                    className={`h-1.5 rounded-full transition-all duration-500 ${i === activeSlide ? 'w-8 bg-blue-600' : 'w-3 bg-white/20'}`}
                  />
                ))}
              </div>

              {/* Stats Row */}
              <div className="grid grid-cols-3 gap-4 sm:gap-8 pt-4 border-t border-white/10">
                {[
                  { val: '₹125Cr+', label: 'Disbursed', icon: <TrendingUp className="w-4 h-4 text-emerald-500" /> },
                  { val: '750+', label: 'Clients', icon: <Cpu className="w-4 h-4 text-primary-gold" /> },
                  { val: '4 Hubs', label: 'Operations', icon: <Globe className="w-4 h-4 text-blue-500" /> },
                ].map((stat, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 + (i * 0.1) }}
                    className="flex flex-col gap-1"
                  >
                    <div className="flex items-center gap-2">
                      {stat.icon}
                      <span className={`text-xl sm:text-2xl md:text-3xl font-black ${isDark ? 'text-white' : 'text-[#020617]'} tracking-tight`}>{stat.val}</span>
                    </div>
                    <span className="text-slate-500 text-[10px] font-black uppercase tracking-widest opacity-60">{stat.label}</span>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Right Form Column */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="relative w-full"
            >
              <div className={`relative ${isDark ? 'bg-[#0B1221]/80 border-white/10' : 'bg-white border-slate-200'} shadow-2xl p-6 sm:p-8 rounded-3xl border backdrop-blur-xl`}>
                {/* Security Badge */}
                <div className={`absolute -top-5 -right-3 ${isDark ? 'bg-[#0F172A] border-white/10' : 'bg-white border-slate-100'} border rounded-2xl p-3 shadow-xl`}>
                  <ShieldCheck className="w-6 h-6 text-primary-gold" />
                </div>

                <div className="mb-6">
                  <h3 className={`text-xl sm:text-2xl font-black ${isDark ? 'text-white' : 'text-[#020617]'} uppercase tracking-tight`}>
                    Partner <span className="text-blue-600 italic font-playfair">Uplink</span>
                  </h3>
                  <div className="flex items-center gap-3 mt-1.5">
                    <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    <p className="text-[10px] text-slate-500 font-bold uppercase tracking-[0.4em]">Secure Application Terminal</p>
                  </div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <InputField
                    label="Full Name"
                    placeholder="Legal Name"
                    value={formData.fullName}
                    onChange={v => setFormData({...formData, fullName: v})}
                    isDark={isDark}
                  />

                  <div className="grid grid-cols-2 gap-4">
                    <InputField
                      label="Mobile"
                      placeholder="+91 XXXXXXXXXX"
                      type="tel"
                      value={formData.mobile}
                      onChange={v => setFormData({...formData, mobile: v.replace(/\D/g, '').slice(0,10)})}
                      error={touched.mobile && formData.mobile.length > 0 && formData.mobile.length !== 10}
                      isDark={isDark}
                    />
                    <InputField
                      label="Email"
                      placeholder="Email Address"
                      value={formData.email}
                      onChange={v => setFormData({...formData, email: v})}
                      isDark={isDark}
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Loan Type</label>
                      <select
                        className={`w-full px-4 py-3 ${isDark ? 'bg-white/5 border-white/10 text-white' : 'bg-slate-50 border-slate-200 text-[#020617]'} rounded-xl border outline-none focus:border-blue-600 font-bold text-sm transition-all`}
                        value={formData.loanType}
                        onChange={e => setFormData({...formData, loanType: e.target.value})}
                      >
                        <option value="home_loan">{t('home_loan')}</option>
                        <option value="msme_structured">{t('msme_loan')}</option>
                        <option value="lap">{t('lap')}</option>
                        <option value="supply_chain">{t('supply_chain')}</option>
                      </select>
                    </div>
                    <InputField
                      label="Amount (₹)"
                      placeholder="e.g. 500000"
                      type="number"
                      value={formData.amount}
                      onChange={v => setFormData({...formData, amount: v ? Number(v) : ''})}
                      error={touched.amount && (formData.amount > 0 && formData.amount < 100000)}
                      isDark={isDark}
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Branch Hub</label>
                    <select
                      required
                      className={`w-full px-4 py-3 ${isDark ? 'bg-white/5 border-white/10 text-white' : 'bg-slate-50 border-slate-200 text-[#020617]'} rounded-xl border outline-none focus:border-blue-600 font-bold text-sm transition-all`}
                      value={formData.city}
                      onChange={e => setFormData({...formData, city: e.target.value})}
                    >
                      <option value="" disabled>Select Your City</option>
                      {['Agra', 'Mathura', 'Hathras', 'Kosi'].map(city => (
                        <option key={city} value={city}>{city}</option>
                      ))}
                    </select>
                  </div>

                  <button
                    type="submit"
                    disabled={submitStatus === 'submitting'}
                    className="w-full bg-[#020617] text-white py-4 rounded-2xl font-black uppercase tracking-wider text-sm shadow-xl overflow-hidden relative group/btn border border-white/5 hover:bg-blue-600 transition-all duration-500 flex items-center justify-center gap-3"
                  >
                    {submitStatus === 'submitting' ? 'Processing...' : 'Apply Now'}
                    <ArrowRight className="w-5 h-5 group-hover/btn:translate-x-1 transition-transform" />
                  </button>

                  <AnimatePresence mode="wait">
                    {submitStatus === 'success' && (
                      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-4 bg-emerald-500/10 text-emerald-400 rounded-2xl text-xs font-bold text-center border border-emerald-500/20 flex items-center justify-center gap-2">
                        <CheckCircle2 className="w-4 h-4" /> Application Submitted Successfully!
                      </motion.div>
                    )}
                    {submitStatus === 'duplicate' && (
                      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-4 bg-amber-500/10 text-amber-400 rounded-2xl text-xs font-bold text-center border border-amber-500/20 flex items-center justify-center gap-2">
                        <AlertCircle className="w-4 h-4" /> This mobile number is already registered.
                      </motion.div>
                    )}
                    {submitStatus === 'error' && (
                      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-4 bg-red-500/10 text-red-400 rounded-2xl text-xs font-bold text-center border border-red-500/20 flex items-center justify-center gap-2">
                        <AlertCircle className="w-4 h-4" /> {errorMessage}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </form>

                <div className="mt-5 flex items-center justify-center gap-2 opacity-40">
                  <Layout className="w-3 h-3" />
                  <p className="text-[9px] text-slate-500 font-bold uppercase tracking-widest">RBI Compliant • Data Protected</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* --- PAGE MODULES --- */}
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

// Reusable Input Field
const InputField = ({ label, placeholder, value, onChange, type = 'text', error, isDark }) => (
  <div className="space-y-1.5">
    <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">{label}</label>
    <input
      required
      type={type}
      placeholder={placeholder}
      className={`w-full px-4 py-3 ${isDark ? 'bg-white/5 border-white/10 text-white placeholder:text-slate-600' : 'bg-slate-50 border-slate-200 text-[#020617]'} rounded-xl border outline-none focus:border-blue-600 font-bold text-sm transition-all ${error ? 'border-red-500/60' : ''}`}
      value={value}
      onChange={e => onChange(e.target.value)}
    />
    {error && <span className="text-[9px] text-red-500 font-bold ml-1">Invalid format</span>}
  </div>
);

export default Hero;
