import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { ShieldCheck, ChevronRight, Activity } from 'lucide-react';
import LeadCaptureModal from './common/LeadCaptureModal';

// Modular Imports
import TrustBar from './home/TrustBar';
import ServicesSection from './home/ServicesSection';
import USPsSection from './home/USPsSection';
import Timeline from './home/Timeline';
import EligibilityCalculator from './home/EligibilityCalculator';
import CTASection from './home/CTASection';

const Hero = () => {
  const { t, i18n } = useTranslation();
  const [activeSlide, setActiveSlide] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  // Form State
  const [formData, setFormData] = useState({
    fullName: '',
    mobile: '',
    email: '',
    loanType: 'msme_structured',
    amount: '',
    city: ''
  });
  const [submitStatus, setSubmitStatus] = useState('idle'); // idle, submitting, success, duplicate, error
  const [formError, setFormError] = useState('');
  const [step, setStep] = useState('form'); // form, otp
  const [otp, setOtp] = useState('');
  const [otpError, setOtpError] = useState('');
  const [otpCountdown, setOtpCountdown] = useState(0);


  const slides = [
    { title: t('hero_title_2'), sub: t('hero_sub_2') },
    { title: t('hero_title_1'), sub: t('hero_sub_1') },
    { title: t('hero_title_3'), sub: t('hero_sub_3') }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveSlide(prev => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [slides.length]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError('');
    setOtpError('');

    if (step === 'form') {
      if (!formData.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
        setFormError('Please enter a valid email address.');
        return;
      }
      if (formData.mobile.length !== 10) {
        setFormError('Please enter a valid 10-digit mobile number.');
        return;
      }

      setSubmitStatus('submitting');
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/api/leads/send-otp`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email: formData.email })
        });

        if (response.ok) {
          setStep('otp');
          setSubmitStatus('idle');
          setOtpCountdown(120);
        } else {
          const error = await response.json();
          setSubmitStatus('error');
          setFormError(error.message || 'Failed to send OTP');
        }
      } catch (err) {
        setSubmitStatus('error');
        setFormError('Failed to send OTP');
      }
    } else if (step === 'otp') {
      if (otp.length !== 6) {
        setOtpError('Please enter the 6-digit OTP.');
        return;
      }

      setSubmitStatus('submitting');
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/api/leads/verify-otp`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            email: formData.email,
            otp,
            leadData: {
              applicant_name: formData.fullName,
              mobile: formData.mobile,
              email: formData.email,
              loan_type: formData.loanType,
              loan_amount_required: Number(formData.amount),
              location_city: formData.city,
              source: 'website'
            }
          })
        });

        if (response.ok) {
          setSubmitStatus('success');
          setTimeout(() => {
            setSubmitStatus('idle');
            setFormData({ fullName: '', mobile: '', email: '', loanType: 'msme_structured', amount: '', city: '' });
            setOtp('');
            setStep('form');
            setOtpCountdown(0);
          }, 3000);
        } else if (response.status === 409) {
          setSubmitStatus('duplicate');
        } else {
          const error = await response.json();
          setSubmitStatus('error');
          setOtpError(error.message || 'Invalid OTP');
        }
      } catch (err) {
        setSubmitStatus('error');
        setOtpError('Failed to verify OTP');
      }
    }
  };

  useEffect(() => {
    if (!otpCountdown) return;
    const timer = setInterval(() => {
      setOtpCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [otpCountdown]);

  const handleResendOtp = async () => {
    setFormError('');
    setSubmitStatus('submitting');
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/leads/send-otp`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: formData.email })
      });

      if (response.ok) {
        setSubmitStatus('idle');
        setOtpCountdown(120);
      } else {
        const error = await response.json();
        setSubmitStatus('error');
        setFormError(error.message || 'Failed to resend OTP');
      }
    } catch (err) {
      setSubmitStatus('error');
      setFormError('Failed to resend OTP');
    }
  };



  return (
    <div className="bg-white transition-colors duration-500 overflow-x-hidden">
      <section className="relative min-h-screen flex items-center pt-32 pb-20 md:pt-40 md:pb-24">
        
        {/* Abstract Background */}
        <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#0EA5E9]/5 blur-[140px] rounded-full translate-x-1/3 -translate-y-1/3" />
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#0EA5E9]/3 blur-[120px] rounded-full -translate-x-1/4" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-10 relative z-10 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
            
            {/* Content Column - Second on Mobile */}
            <div className="lg:col-span-7 space-y-10 text-center lg:text-left order-2 lg:order-1">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="inline-flex items-center gap-3 px-4 py-2 bg-white/40 backdrop-blur-md border border-white/20 rounded-full shadow-sm hover:shadow-md transition-all group cursor-default"
              >
                <div className="relative">
                  <Activity className="w-3 h-3 text-[#0EA5E9] animate-pulse" />
                  <div className="absolute inset-0 bg-[#0EA5E9] blur-sm opacity-20 group-hover:opacity-40 transition-opacity" />
                </div>
                <span className="text-[#0EA5E9] text-[9px] md:text-[10px] font-black uppercase tracking-[0.3em]">RBI Compliant Fintech Partner</span>
              </motion.div>

              <div className="min-h-[260px] sm:min-h-[300px] md:min-h-[340px]">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeSlide}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -30 }}
                    transition={{ duration: 0.7 }}
                    className="space-y-8"
                   >
                    <h1 className="text-[2.5rem] leading-[0.95] sm:text-5xl md:text-6xl lg:text-7xl font-black text-[#1E293B] uppercase tracking-tighter">
                      {slides[activeSlide].title.split(' ').map((word, i) => (
                        <span key={i} className={i % 2 === 1 ? 'text-[#0EA5E9] italic' : ''}>{word} </span>
                      ))}
                    </h1>
                    <p className="text-base sm:text-xl md:text-2xl text-slate-500 font-medium max-w-xl mx-auto lg:mx-0 border-l-4 border-[#0EA5E9]/20 pl-4 sm:pl-6 italic opacity-80 leading-snug">
                      {slides[activeSlide].sub}
                    </p>
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-3 sm:flex sm:flex-wrap gap-x-4 sm:gap-x-12 gap-y-8 pt-8 border-t border-slate-100 max-w-3xl mx-auto lg:mx-0">
                {[
                  { val: '125Cr+', label: 'DISBURSED', detail: 'Primary Asset' },
                  { val: '100+', label: 'CLIENTS', detail: 'Partnerships' },
                  { val: '5+', label: 'OPERATIONS', detail: 'Nodes' },
                ].map((stat, i) => (
                  <motion.div 
                    key={i} 
                    whileHover={{ y: -5 }}
                    className="flex flex-col items-center lg:items-start text-center lg:text-left group cursor-default"
                  >
                    <div className="relative">
                      <p className="text-2xl sm:text-4xl md:text-6xl font-black text-[#1E293B] tracking-tighter leading-none group-hover:text-[#0EA5E9] transition-colors duration-500">
                        {stat.val}
                      </p>
                    </div>
                    <p className="text-[9px] sm:text-xl md:text-2xl font-black text-[#1E293B] tracking-tight uppercase mt-2 transition-all duration-500 group-hover:tracking-widest">
                      {stat.label}
                    </p>
                    <div className="overflow-hidden h-0 sm:group-hover:h-5 transition-all duration-500">
                      <p className="hidden sm:block text-[9px] font-black text-[#0EA5E9] uppercase tracking-[0.3em] opacity-0 group-hover:opacity-100 transition-opacity duration-700 mt-1">
                        {stat.detail}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Form Column - First on Mobile */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="lg:col-span-5 relative order-1 lg:order-2"
            >
              <div className="bg-white/90 backdrop-blur-2xl p-6 sm:p-8 md:p-12 rounded-[40px] sm:rounded-[50px] shadow-22xl border border-white/50 relative overflow-hidden backdrop-saturate-150">
                <div className="absolute top-6 right-6 w-10 h-10 sm:w-12 sm:h-12 bg-white border border-slate-100 rounded-2xl shadow-lg flex items-center justify-center z-20">
                   <ShieldCheck className="w-5 h-5 sm:w-6 sm:h-6 text-[#0EA5E9]" />
                </div>

                <div className="relative z-10 space-y-8">
                  <div className="space-y-1">
                    <h2 className="text-2xl font-black text-[#1E293B] tracking-tighter uppercase leading-none">Submit <span className="text-blue-600 italic">Your Information</span></h2>
                  </div>

                  {submitStatus === 'success' ? (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="py-20 text-center space-y-6">
                       <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto shadow-inner font-black text-4xl">✓</div>
                       <h3 className="text-2xl font-black text-[#1E293B] uppercase tracking-tighter">Transmission Logged</h3>
                       <p className="text-slate-500 text-xs font-bold uppercase tracking-widest italic leading-relaxed">Our institutional node will initiate contact <br /> within 30 minutes.</p>
                    </motion.div>
                  ) : step === 'form' ? (
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div className="space-y-1">
                        <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Full Name</label>
                        <input required className="input-standard w-full h-14 rounded-2xl px-6 bg-slate-50 border-slate-100 text-sm focus:bg-white transition-all" placeholder="Legal Name" value={formData.fullName} onChange={e => setFormData({...formData, fullName: e.target.value})}    />
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-1">
                          <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Mobile</label>
                          <input required type="tel" maxLength="10" className="input-standard w-full h-14 rounded-2xl px-6 bg-slate-50 border-slate-100 text-sm focus:bg-white transition-all" placeholder="+91 XXXXXXXXXX" value={formData.mobile} onChange={e => setFormData({...formData, mobile: e.target.value.replace(/\D/g, '')})} />
                        </div>
                        <div className="space-y-1">
                          <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Email</label>
                          <input type="email" className="input-standard w-full h-14 rounded-2xl px-6 bg-slate-50 border-slate-100 text-sm focus:bg-white transition-all" placeholder="Email Address" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} />
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-1">
                          <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Loan Type</label>
                           <select className="input-standard w-full h-14 rounded-2xl px-6 bg-slate-50 border-slate-100 text-sm focus:bg-white transition-all appearance-none cursor-pointer" value={formData.loanType} onChange={e => setFormData({...formData, loanType: e.target.value})}>
                            <option value="home_loan">Home Loan</option>
                            <option value="lap">Loan Against Property</option>
                            <option value="unsecured_business">Unsecured Business Loan</option>
                            <option value="supply_chain">Supply Chain Finance</option>
                            <option value="unsecured_export">Unsecured Export Finance</option>
                            <option value="machinery">Machinery Finance</option>
                          </select>
                        </div>
                        <div className="space-y-1">
                          <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Amount (₹)</label>
                          <input required type="number" className="input-standard w-full h-14 rounded-2xl px-6 bg-slate-50 border-slate-100 text-sm focus:bg-white transition-all" placeholder="e.g. 500000" value={formData.amount} onChange={e => setFormData({...formData, amount: e.target.value})} />
                        </div>
                      </div>

                      <div className="space-y-1">
                        <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Branch Hub</label>
                        <select required className="input-standard w-full h-14 rounded-2xl px-6 bg-slate-50 border-slate-100 text-sm focus:bg-white transition-all appearance-none cursor-pointer" value={formData.city} onChange={e => setFormData({...formData, city: e.target.value})}>
                          <option value="">Select Your City</option>
                          <option value="Agra">Agra</option>
                          <option value="Mathura">Mathura</option>
                          <option value="Hathras">Hathras</option>
                          <option value="Kosi">Kosi</option>
                        </select>
                      </div>

                      <button 
                        type="submit" disabled={submitStatus === 'submitting'}
                        className="w-full h-16 bg-[#1E293B] hover:bg-blue-600 text-white rounded-2xl font-black uppercase tracking-[0.3em] text-[10px] shadow-2xl transition-all active:scale-95 disabled:opacity-50 flex items-center justify-center gap-3"
                      >
                        {submitStatus === 'submitting' ? 'Submitting...' : 'Submit'} <ChevronRight className="w-4 h-4" />
                      </button>

                      {submitStatus === 'duplicate' && <p className="text-[9px] text-amber-600 text-center font-bold uppercase tracking-widest italic italic">Coordinate Conflict: Transmission Already Logged.</p>}
                      {formError && <p className="text-[9px] text-red-600 text-center font-bold uppercase tracking-widest italic">{formError}</p>}

                      <div className="text-center">
                         <p className="text-[8px] text-slate-400 font-bold uppercase tracking-widest italic">🛡️ RBI Compliant • Data Protected</p>
                      </div>
                    </form>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div className="text-center space-y-4">
                        <h3 className="text-xl font-black text-[#1E293B] uppercase tracking-tighter">Verify Your Email</h3>
                        <p className="text-slate-500 text-sm">Enter the 6-digit OTP sent to {formData.email}</p>
                      </div>

                      <div className="space-y-1">
                        <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">OTP</label>
                        <input required type="text" maxLength="6" className="input-standard w-full h-14 rounded-2xl px-6 bg-slate-50 border-slate-100 text-sm focus:bg-white transition-all text-center text-2xl font-mono" placeholder="000000" value={otp} onChange={e => setOtp(e.target.value.replace(/\D/g, ''))} />
                      </div>

                      <div className="flex items-center justify-between gap-4">
                        <button 
                          type="submit" disabled={submitStatus === 'submitting'}
                          className="flex-1 h-16 bg-[#1E293B] hover:bg-blue-600 text-white rounded-2xl font-black uppercase tracking-[0.3em] text-[10px] shadow-2xl transition-all active:scale-95 disabled:opacity-50 flex items-center justify-center gap-3"
                        >
                          {submitStatus === 'submitting' ? 'Verifying...' : 'Verify & Submit'} <ChevronRight className="w-4 h-4" />
                        </button>
                        <button
                          type="button"
                          disabled={otpCountdown > 0 || submitStatus === 'submitting'}
                          onClick={handleResendOtp}
                          className="flex-1 h-16 bg-slate-200 hover:bg-slate-300 text-slate-700 rounded-2xl font-bold uppercase tracking-[0.2em] text-[10px] transition-all disabled:opacity-50"
                        >
                          {otpCountdown > 0 ? `Resend in ${otpCountdown}s` : 'Resend OTP'}
                        </button>
                      </div>

                      <button 
                        type="button" onClick={() => { setStep('form'); setOtp(''); setOtpError(''); setSubmitStatus('idle'); }}
                        className="w-full h-12 bg-slate-200 hover:bg-slate-300 text-slate-700 rounded-2xl font-bold uppercase tracking-[0.2em] text-[10px] transition-all"
                      >
                        Back to Form
                      </button>

                      {submitStatus === 'duplicate' && <p className="text-[9px] text-amber-600 text-center font-bold uppercase tracking-widest italic italic">Coordinate Conflict: Transmission Already Logged.</p>}
                      {submitStatus === 'error' && <p className="text-[9px] text-red-600 text-center font-bold uppercase tracking-widest italic">{otpError}</p>}
                      {otpError && <p className="text-[9px] text-red-600 text-center font-bold uppercase tracking-widest italic">{otpError}</p>}

                      <div className="text-center">
                         <p className="text-[8px] text-slate-400 font-bold uppercase tracking-widest italic">🛡️ RBI Compliant • Data Protected</p>
                      </div>
                    </form>
                  )}
                </div>
              </div>
              {/* Accents around form */}
              <div className="absolute -top-10 -right-10 w-40 h-40 bg-[#0EA5E9]/10 rounded-full blur-3xl animate-pulse -z-10" />
              <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-slate-200/50 rounded-full blur-2xl -z-10" />
            </motion.div>

          </div>
        </div>
      </section>

      <TrustBar />
      <ServicesSection />
      <USPsSection />
      <Timeline />
      <EligibilityCalculator />
      <CTASection />

      <LeadCaptureModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
};

export default Hero;
