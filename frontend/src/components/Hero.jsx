import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShieldCheck, ArrowRight, CheckCircle2, AlertCircle, TrendingUp } from 'lucide-react';
import { getUTMParams } from '../utils/helpers';

// Modular Imports
import TrustBar from './home/TrustBar';
import ServicesSection from './home/ServicesSection';
import USPsSection from './home/USPsSection';
import Timeline from './home/Timeline';
import PartnerNBFCs from './home/PartnerNBFCs';
import EligibilityCalculator from './home/EligibilityCalculator';
import CTASection from './home/CTASection';

const Hero = () => {
  const [formData, setFormData] = useState({
    fullName: '', mobile: '', email: '', loanType: 'MSME', amount: '', city: ''
  });
  const [submitStatus, setSubmitStatus] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitStatus('submitting');
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api/leads`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, ...getUTMParams() })
      });
      if (response.ok) {
        setSubmitStatus('success');
        setFormData({ fullName: '', mobile: '', email: '', loanType: 'MSME', amount: '', city: '' });
      } else if (response.status === 409) {
        setSubmitStatus('duplicate');
      } else {
        setSubmitStatus('error');
      }
    } catch {
      setSubmitStatus('error');
    }
  };

  return (
    <div className="bg-white font-dmsans">
      {/* --- HERO SECTION --- */}
      <section className="relative min-h-[90vh] flex items-center pt-24 pb-16 overflow-hidden bg-slate-50">
        <div className="absolute top-0 right-0 w-1/2 h-full opacity-5 bg-primary-navy rounded-l-[200px] transform skew-x-12 translate-x-32" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            
            <motion.div 
              initial={{ opacity: 0, x: -30 }} 
              animate={{ opacity: 1, x: 0 }} 
              className="space-y-8 order-2 lg:order-1"
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white text-primary-navy text-[10px] font-black uppercase tracking-widest shadow-sm ring-1 ring-slate-200">
                <ShieldCheck className="w-4 h-4 text-primary-gold" />
                RBI Compliant Fintech Partner
              </div>
              
              <h1 className="text-5xl md:text-7xl font-playfair font-black text-primary-navy leading-[1.1]">
                Empowering India's <br />
                <span className="text-primary-gold">MSME Growth</span>.
              </h1>
              
              <p className="text-xl text-slate-500 font-medium max-w-lg leading-relaxed">
                Unlock specialized credit solutions tailored for your business. Fast, transparent, and built for results.
              </p>

              <div className="flex flex-wrap gap-8 items-center pt-4">
                <div className="flex flex-col">
                  <span className="text-3xl font-black text-primary-navy">₹125Cr+</span>
                  <span className="text-slate-400 text-[10px] font-black uppercase tracking-tighter">Disbursed</span>
                </div>
                <div className="w-px h-10 bg-slate-200 hidden sm:block"></div>
                <div className="flex flex-col">
                  <span className="text-3xl font-black text-primary-navy">750+</span>
                  <span className="text-slate-400 text-[10px] font-black uppercase tracking-tighter">Enterprises</span>
                </div>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white p-8 md:p-10 rounded-[48px] shadow-2xl shadow-primary-navy/5 border border-slate-100 max-w-lg lg:ml-auto relative order-1 lg:order-2"
            >
              <div className="absolute -top-4 -right-4 bg-primary-gold p-4 rounded-2xl shadow-lg rotate-12 hidden md:block">
                <TrendingUp className="w-6 h-6 text-primary-navy" />
              </div>

              <div className="flex items-center gap-3 mb-8">
                <div className="w-2 h-8 bg-primary-gold rounded-full" />
                <h3 className="text-2xl font-black text-primary-navy font-playfair">Check Eligibility</h3>
              </div>
              
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-4">
                  <input 
                    type="text" 
                    placeholder="Full Name"
                    className="w-full px-6 py-4 bg-slate-50 rounded-2xl border-2 border-transparent focus:border-primary-gold transition-all font-bold text-sm outline-none"
                    value={formData.fullName}
                    onChange={e => setFormData({...formData, fullName: e.target.value})}
                    required
                  />
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <input 
                      type="tel" 
                      placeholder="Mobile Number"
                      className="w-full px-6 py-4 bg-slate-50 rounded-2xl border-2 border-transparent focus:border-primary-gold transition-all font-bold text-sm outline-none"
                      value={formData.mobile}
                      onChange={e => setFormData({...formData, mobile: e.target.value})}
                      required
                    />
                    <input 
                      type="email" 
                      placeholder="Email (Optional)"
                      className="w-full px-6 py-4 bg-slate-50 rounded-2xl border-2 border-transparent focus:border-primary-gold transition-all font-bold text-sm outline-none"
                      value={formData.email}
                      onChange={e => setFormData({...formData, email: e.target.value})}
                    />
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="relative">
                      <select 
                        className="w-full px-6 py-4 bg-slate-50 rounded-2xl border-2 border-transparent focus:border-primary-gold transition-all font-bold text-sm outline-none appearance-none cursor-pointer"
                        value={formData.loanType}
                        onChange={e => setFormData({...formData, loanType: e.target.value})}
                      >
                        <option value="MSME">MSME Loan</option>
                        <option value="LAP">LAP</option>
                        <option value="Housing">Housing</option>
                        <option value="Supply Chain">Supply Chain</option>
                      </select>
                      <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none opacity-40">
                         <ArrowRight className="w-4 h-4 rotate-90" />
                      </div>
                    </div>
                    <input 
                      type="number" 
                      placeholder="Amount (₹)"
                      className="w-full px-6 py-4 bg-slate-50 rounded-2xl border-2 border-transparent focus:border-primary-gold transition-all font-bold text-sm outline-none"
                      value={formData.amount}
                      onChange={e => setFormData({...formData, amount: e.target.value})}
                      required
                    />
                  </div>
                  <div className="relative">
                    <select
                      className="w-full px-6 py-4 bg-slate-50 rounded-2xl border-2 border-transparent focus:border-primary-gold transition-all font-bold text-sm outline-none appearance-none cursor-pointer"
                      value={formData.city}
                      onChange={e => setFormData({...formData, city: e.target.value})}
                      required
                    >
                      <option value="" disabled>Select City</option>
                      <option value="Delhi">Delhi</option>
                      <option value="Noida">Noida</option>
                      <option value="Agra">Agra</option>
                      <option value="Gurgaon">Gurgaon</option>
                    </select>
                    <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none opacity-40">
                       <ArrowRight className="w-4 h-4 rotate-90" />
                    </div>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={submitStatus === 'submitting'}
                  className="group relative w-full py-5 bg-primary-navy text-white font-black rounded-2xl overflow-hidden shadow-xl shadow-primary-navy/20 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300"
                >
                  <div className="absolute inset-0 bg-primary-gold translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                  <span className="relative z-10 uppercase tracking-widest text-xs group-hover:text-primary-navy">
                    {submitStatus === 'submitting' ? 'Processing...' : 'Get Funding Proposal'}
                  </span>
                </button>

                <AnimatePresence>
                  {submitStatus === 'success' && (
                    <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="mt-4 p-4 bg-green-50 text-success-green rounded-2xl text-xs font-black text-center border border-green-100 uppercase tracking-widest">
                      Application Submitted!
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
