import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { ShieldCheck, ArrowRight, CheckCircle2, AlertCircle, TrendingUp, Sparkles, ChevronDown, Zap, Globe, Shield, Cpu, Activity, Layout } from 'lucide-react';
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
    <div className={`${isDark ? 'bg-[#020617]' : 'bg-[#F8FAFC]'} font-dmsans transition-colors duration-700 overflow-hidden`}>
      {/* --- ELITE HERO ARCHITECTURE --- */}
      <section className="relative min-h-[110vh] flex items-center pt-40 pb-24 lg:pt-56 lg:pb-40">
        
        {/* Multidimensional Background Core */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          <div className={`absolute top-[-20%] right-[-10%] w-[100%] h-[100%] ${isDark ? 'bg-blue-600/10' : 'bg-blue-500/5'} blur-[180px] rounded-full animate-pulse-slow`} />
          <div className={`absolute bottom-[-10%] left-[-10%] w-[70%] h-[70%] ${isDark ? 'bg-primary-gold/5' : 'bg-primary-gold/3'} blur-[140px] rounded-full`} />
          <div className={`absolute inset-0 ${isDark ? 'opacity-30' : 'opacity-[0.05]'} mix-blend-overlay`} 
               style={{ backgroundImage: 'radial-gradient(circle at 1.5px 1.5px, #475569 1px, transparent 0)', backgroundSize: '48px 48px' }} />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#020617]/50 to-[#020617] hidden dark:block" />
        </div>
        
        <div className="max-w-7xl mx-auto px-6 lg:px-10 relative z-10 w-full font-playfair">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-20 lg:gap-32 items-center">
            
            {/* Left Strategic Command Column */}
            <div className="lg:col-span-7 space-y-12 lg:space-y-16 text-center lg:text-left">
              <motion.div 
                initial={{ opacity: 0, x: -30 }} 
                animate={{ opacity: 1, x: 0 }}
                className="inline-flex items-center gap-4 px-8 py-3 rounded-full bg-blue-600/10 border border-blue-500/20 shadow-22xl shadow-blue-500/10 backdrop-blur-md"
              >
                <Activity className="w-4 h-4 text-primary-gold animate-pulse" />
                <span className="text-primary-gold text-[10px] font-black uppercase tracking-[0.5em]">{t('hero_badge')}</span>
              </motion.div>
              
              <div className="min-h-[350px] md:min-h-[450px] overflow-visible">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeSlide}
                    initial={{ opacity: 0, y: 50, filter: 'blur(20px)' }}
                    animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                    exit={{ opacity: 0, y: -50, filter: 'blur(20px)' }}
                    transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                    className="space-y-12"
                  >
                    <h1 className={`text-6xl md:text-[8rem] lg:text-[9.5rem] font-black ${isDark ? 'text-white' : 'text-[#020617]'} leading-[0.82] tracking-tighter`}>
                      {slides[activeSlide].title.split(' ').map((word, i) => (
                        <span key={i} className={i % 2 === 1 ? 'text-blue-600 italic' : ''}>{word} <br className={i === 1 ? "hidden lg:block" : ""} /></span>
                      ))}
                    </h1>
                    <p className={`text-2xl md:text-3xl ${isDark ? 'text-slate-400' : 'text-slate-500'} font-medium max-w-2xl mx-auto lg:mx-0 leading-relaxed italic border-l-[6px] border-primary-gold/40 pl-8 font-dmsans`}>
                      {slides[activeSlide].sub}
                    </p>
                  </motion.div>
                </AnimatePresence>
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-3 gap-12 lg:gap-20 items-center pt-12 border-t border-white/5 font-dmsans">
                {[
                  { val: '₹125Cr+', label: 'Asset Velocity', icon: <TrendingUp className="w-5 h-5 text-emerald-500" /> },
                  { val: '750+', label: 'Enterprise Nodes', icon: <Cpu className="w-5 h-5 text-primary-gold" /> },
                  { val: '4 Hubs', label: 'Operations Hub', icon: <Globe className="w-5 h-5 text-blue-500" /> },
                ].map((stat, i) => (
                  <motion.div 
                    key={i}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8 + (i * 0.1), duration: 0.8 }}
                    className="flex flex-col gap-3 group cursor-default"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center group-hover:scale-110 transition-transform">
                         {stat.icon}
                      </div>
                      <span className={`text-3xl md:text-4xl font-black ${isDark ? 'text-white' : 'text-[#020617]'} tracking-tighter`}>{stat.val}</span>
                    </div>
                    <span className="text-slate-500 text-[10px] font-black uppercase tracking-[0.4em] opacity-60 leading-tight border-b border-transparent group-hover:border-blue-600 transition-all inline-block w-fit">{stat.label}</span>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Right Institutional Portal Column */}
            <div className="lg:col-span-5 relative font-dmsans">
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5, duration: 1 }}
                className={`relative z-10 ${isDark ? 'bg-[#0B1221]/80 border-white/5 shadow-22xl shadow-black/80' : 'bg-white/95 border-slate-200 shadow-22xl shadow-slate-200/50'} p-10 md:p-16 rounded-[64px] md:rounded-[80px] border backdrop-blur-[40px] group`}
              >
                {/* Protocol Security Badge */}
                <div className={`absolute -top-8 -right-8 w-24 h-24 ${isDark ? 'bg-[#020617]' : 'bg-white shadow-22xl'} rounded-[32px] p-6 shadow-22xl rotate-12 group-hover:rotate-0 transition-all duration-1000 border-4 border-white/5 flex items-center justify-center`}>
                  <ShieldCheck className="w-10 h-10 text-primary-gold" />
                </div>

                <div className="space-y-4 mb-16 text-center lg:text-left">
                  <h3 className={`text-3xl md:text-5xl font-black ${isDark ? 'text-white' : 'text-[#020617]'} uppercase tracking-tighter leading-none`}>Partner <span className="text-blue-600 italic font-playfair">Uplink</span></h3>
                  <div className="flex items-center justify-center lg:justify-start gap-4">
                     <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                     <p className="text-[10px] text-slate-500 font-bold uppercase tracking-[0.4em] opacity-60 italic leading-none">Strategic Credit Terminal V4.0</p>
                  </div>
                </div>
                
                <form onSubmit={handleSubmit} className="space-y-8">
                  <InputField 
                    label="Identity Reference" 
                    placeholder="Full Legal Name" 
                    value={formData.fullName} 
                    onChange={v => setFormData({...formData, fullName: v})} 
                    isDark={isDark} 
                  />
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                    <InputField 
                      label="Comm Uplink" 
                      placeholder="+91 Mobile" 
                      type="tel"
                      value={formData.mobile} 
                      onChange={v => setFormData({...formData, mobile: v.replace(/\D/g, '').slice(0,10)})} 
                      error={touched.mobile && formData.mobile.length > 0 && formData.mobile.length !== 10}
                      isDark={isDark} 
                    />
                    <InputField 
                      label="Digital Node" 
                      placeholder="Email Address" 
                      value={formData.email} 
                      onChange={v => setFormData({...formData, email: v})} 
                      isDark={isDark} 
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                    <div className="space-y-4">
                       <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.4em] ml-1 opacity-60">Asset Vertical</label>
                       <div className="relative group/sel">
                         <select 
                           className={`w-full px-8 py-5 ${isDark ? 'bg-white/2 border-white/5 text-white' : 'bg-slate-50 border-slate-100 text-[#020617]'} rounded-[24px] border-2 outline-none focus:border-blue-600 font-black text-[11px] appearance-none transition-all cursor-pointer shadow-inner uppercase tracking-widest`}
                           value={formData.loanType}
                           onChange={e => setFormData({...formData, loanType: e.target.value})}
                         >
                           <option value="home_loan">{t('home_loan')}</option>
                           <option value="msme_structured">{t('msme_loan')}</option>
                           <option value="lap">{t('lap')}</option>
                           <option value="supply_chain">{t('supply_chain')}</option>
                         </select>
                         <ChevronDown className="absolute right-8 top-1/2 -translate-y-1/2 w-4 h-4 text-blue-600 opacity-40 group-hover/sel:opacity-100 transition-opacity" />
                       </div>
                    </div>
                    <InputField 
                      label="Liquidity Target" 
                      placeholder="₹ Lakhs" 
                      type="number"
                      value={formData.amount} 
                      onChange={v => setFormData({...formData, amount: v ? Number(v) : ''})} 
                      error={touched.amount && (formData.amount > 0 && formData.amount < 100000)}
                      isDark={isDark} 
                    />
                  </div>

                  <div className="space-y-4">
                     <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.4em] ml-1 opacity-60">Regional Command Hub</label>
                     <div className="relative group/sel">
                       <select 
                         required
                         className={`w-full px-8 py-5 ${isDark ? 'bg-white/2 border-white/5 text-white' : 'bg-slate-50 border-slate-100 text-[#020617]'} rounded-[24px] border-2 outline-none focus:border-blue-600 font-black text-[11px] appearance-none transition-all cursor-pointer shadow-inner uppercase tracking-widest`}
                         value={formData.city}
                         onChange={e => setFormData({...formData, city: e.target.value})}
                       >
                         <option value="" disabled>Select Operational Node</option>
                         {['Agra Hub', 'Mathura Hub', 'Hathras Hub', 'Kosi Hub'].map(city => (
                           <option key={city} value={city.split(' ')[0]}>{city}</option>
                         ))}
                       </select>
                       <ChevronDown className="absolute right-8 top-1/2 -translate-y-1/2 w-4 h-4 text-blue-600 opacity-40 group-hover/sel:opacity-100 transition-opacity" />
                     </div>
                  </div>

                  <button
                    type="submit"
                    disabled={submitStatus === 'submitting'}
                    className="w-full bg-[#020617] text-white py-8 rounded-[36px] font-black uppercase tracking-[0.4em] shadow-22xl shadow-black/40 overflow-hidden relative group/btn active:scale-95 transition-all text-[11px] mt-4 border border-white/5"
                  >
                    <div className="absolute inset-0 bg-blue-600 translate-y-full group-hover/btn:translate-y-0 transition-transform duration-700" />
                    <span className="relative z-10 flex items-center justify-center gap-4">
                      {submitStatus === 'submitting' ? 'Initializing Protocol...' : 'Launch Application Uplink'}
                      <ArrowRight className="w-6 h-6 text-primary-gold group-hover/btn:translate-x-3 transition-transform duration-700" />
                    </span>
                  </button>

                  <AnimatePresence mode="wait">
                    {submitStatus === 'success' && (
                      <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} className="p-7 bg-emerald-500/10 text-emerald-400 rounded-[32px] text-[10px] font-black text-center border border-emerald-500/20 uppercase tracking-[0.3em]">
                        <CheckCircle2 className="w-5 h-5 inline-block mr-3" /> Application Payload Securely Deployed
                      </motion.div>
                    )}
                    {submitStatus === 'duplicate' && (
                      <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} className="p-7 bg-amber-500/10 text-amber-400 rounded-[32px] text-[10px] font-black text-center border border-amber-500/20 uppercase tracking-[0.3em]">
                        <AlertCircle className="w-5 h-5 inline-block mr-3" /> Identity Reference Already in Progress
                      </motion.div>
                    )}
                  </AnimatePresence>
                </form>

                <div className="mt-12 flex items-center justify-center gap-4 opacity-40">
                   <Layout className="w-4 h-4" />
                   <p className="text-[10px] text-slate-500 font-bold uppercase tracking-[0.4em]">Institutional Data Integrity Standards</p>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* --- ELITE PAGE MODULES --- */}
      <TrustBar />
      <PartnerNBFCs />
      <ServicesSection />
      <USPsSection />
      <Timeline />
      <EligibilityCalculator />
      <CTASection />
      
      {/* Scroll Down Indicator */}
      <motion.div 
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 hidden lg:flex flex-col items-center gap-4 opacity-40 hover:opacity-100 transition-opacity cursor-pointer group"
        onClick={() => window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })}
      >
         <span className="text-[9px] font-black uppercase tracking-[0.6em] text-slate-500 group-hover:text-blue-600 transition-colors">Protocol Sequence</span>
         <ChevronDown className="w-6 h-6 text-blue-600" />
      </motion.div>
    </div>
  );
};

// Internal Refined Input Component for cleaner Hero code
const InputField = ({ label, placeholder, value, onChange, type = 'text', error, isDark }) => (
  <div className="space-y-4">
    <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.4em] ml-1 opacity-60">{label}</label>
    <input 
      required
      type={type}
      placeholder={placeholder}
      className={`w-full px-8 py-5 ${isDark ? 'bg-white/2 border-white/5 text-white' : 'bg-slate-50 border-slate-100 text-[#020617]'} rounded-[24px] border-2 outline-none focus:border-blue-600 font-black text-[11px] transition-all shadow-inner uppercase tracking-widest ${error ? 'border-red-500/50' : 'border-transparent'}`}
      value={value}
      onChange={e => onChange(e.target.value)}
    />
    {error && <span className="text-[8px] text-red-500 font-black ml-1 uppercase tracking-widest">Invalid Data Protocol</span>}
  </div>
);

export default Hero;
