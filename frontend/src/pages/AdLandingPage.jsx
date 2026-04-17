import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CheckCircle2, ShieldCheck, Zap, PhoneCall, Award, Star } from 'lucide-react';
import axios from 'axios';
import { getUTMParams } from '../utils/helpers';

const AdLandingPage = () => {
  const { slug } = useParams();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    mobile: '',
    email: '',
    loanType: slug || 'MSME Loan',
    amount: '5L-25L',
    city: ''
  });

  const productTitles = {
    'msme-loan': 'MSME Working Capital Business Loans',
    'lap': 'Loan Against Property (LAP)',
    'housing-loan': 'Affordable Housing & Home Loans',
    'supply-chain': 'Supply Chain & Invoice Financing'
  };

  const currentTitle = productTitles[slug] || 'Custom Financial Solutions';

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const utms = getUTMParams();
      await axios.post(`${import.meta.env.VITE_API_URL}/api/leads`, {
        ...formData,
        ...utms
      });
      setSuccess(true);
    } catch (err) {
      console.error('Lead submission failed');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (success) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white px-4">
        <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="text-center max-w-md">
          <div className="w-24 h-24 bg-green-50 text-success-green rounded-full flex items-center justify-center mx-auto mb-8 shadow-lg ring-8 ring-green-50/50">
            <CheckCircle2 className="w-12 h-12" />
          </div>
          <h2 className="text-4xl font-extrabold text-slate-900 mb-4 tracking-tight">Application Received!</h2>
          <p className="text-slate-500 font-medium mb-10 text-lg">Our Relationship Manager will call you within 30 minutes for a free consultation.</p>
          <button onClick={() => window.location.href = '/'} className="w-full bg-primary-blue text-white py-4 rounded-2xl font-bold shadow-xl">Back to Home</button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="bg-white min-h-screen font-inter">
      {/* Mini Header */}
      <nav className="py-6 border-b border-slate-50">
        <div className="max-w-7xl mx-auto px-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-primary-blue rounded-xl flex items-center justify-center">
              <Zap className="text-white w-6 h-6" />
            </div>
            <span className="text-2xl font-black text-primary-darkBlue tracking-tighter lowercase italic">swayamfin.com</span>
          </div>
          <div className="hidden md:flex items-center gap-3 bg-blue-50 px-5 py-2 rounded-full border border-blue-100">
             <PhoneCall className="w-4 h-4 text-primary-blue" />
             <span className="text-sm font-bold text-primary-darkBlue">+91 6397003690</span>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-16 lg:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          
          <div className="space-y-10">
            <div>
              <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="inline-flex items-center gap-2 bg-primary-lightBlue text-primary-darkBlue px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-widest mb-6">
                <ShieldCheck className="w-4 h-4" /> RBI Compliant Facilitator
              </motion.div>
              <h1 className="text-5xl md:text-6xl font-black text-slate-900 leading-[1.1] mb-6">
                Fast Approval <span className="text-primary-blue underline decoration-slate-100">{currentTitle}</span>
              </h1>
              <p className="text-xl text-slate-500 font-medium leading-relaxed">
                Trusted by 750+ businesses. Get your loan processed in as fast as 48 hours with transparent terms and minimal documentation.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                { title: '750+ Happy Clients', subtitle: 'Across Tier 2/3 Cities', icon: Star },
                { title: 'NBFC Partnership', subtitle: 'DMI Housing Finance', icon: Award }
              ].map((item, i) => (
                <div key={i} className="flex gap-4 items-center p-6 bg-slate-50 rounded-[32px] border border-slate-100">
                  <div className="w-12 h-12 bg-white rounded-2xl shadow-sm flex items-center justify-center text-primary-blue">
                    <item.icon className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-extrabold text-slate-900 text-sm">{item.title}</h4>
                    <p className="text-xs text-slate-400 font-bold uppercase tracking-tight">{item.subtitle}</p>
                  </div>
                </div>
              ))}
            </div>

            <p className="text-sm text-slate-400 italic">
               * Swayamfin is an LSP. Loans are sanctioned by partner lenders at their discretion.
            </p>
          </div>

          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="bg-white p-10 rounded-[48px] shadow-2xl border border-slate-50 relative ring-1 ring-slate-100">
            <h2 className="text-3xl font-black text-slate-900 mb-8 border-b-2 border-slate-50 pb-6 shrink-0">Get Free Consultation</h2>
            <form onSubmit={handleSubmit} className="space-y-5">
              <input 
                required
                className="w-full px-6 py-4.5 bg-slate-50 rounded-2xl border-2 border-transparent focus:border-primary-blue focus:bg-white transition-all outline-none font-bold placeholder:text-slate-300"
                placeholder="Your Full Name"
                value={formData.fullName}
                onChange={e => setFormData({...formData, fullName: e.target.value})}
              />
              <input 
                required
                type="tel"
                className="w-full px-6 py-4.5 bg-slate-50 rounded-2xl border-2 border-transparent focus:border-primary-blue focus:bg-white transition-all outline-none font-bold placeholder:text-slate-300"
                placeholder="10-Digit Mobile Number"
                value={formData.mobile}
                onChange={e => setFormData({...formData, mobile: e.target.value})}
              />
              <input 
                type="email"
                className="w-full px-6 py-4.5 bg-slate-50 rounded-2xl border-2 border-transparent focus:border-primary-blue focus:bg-white transition-all outline-none font-bold placeholder:text-slate-300"
                placeholder="Email Address (Optional)"
                value={formData.email}
                onChange={e => setFormData({...formData, email: e.target.value})}
              />
              <input 
                required
                className="w-full px-6 py-4.5 bg-slate-50 rounded-2xl border-2 border-transparent focus:border-primary-blue focus:bg-white transition-all outline-none font-bold placeholder:text-slate-300"
                placeholder="City (e.g. Agra, Delhi)"
                value={formData.city}
                onChange={e => setFormData({...formData, city: e.target.value})}
              />
              <select 
                className="w-full px-6 py-4.5 bg-slate-50 rounded-2xl border-2 border-transparent focus:border-primary-blue focus:bg-white transition-all outline-none font-bold appearance-none text-slate-700"
                value={formData.amount}
                onChange={e => setFormData({...formData, amount: e.target.value})}
              >
                <option value="Under 5L">Under ₹5 Lakhs</option>
                <option value="5L-25L">₹5 Lakhs - ₹25 Lakhs</option>
                <option value="25L-1Cr">₹25 Lakhs - ₹1 Crore</option>
                <option value="1Cr+">Over ₹1 Crore</option>
              </select>
              <button 
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-primary-blue hover:bg-primary-darkBlue text-white font-black py-5 rounded-2xl shadow-xl shadow-primary-blue/20 transition-all uppercase tracking-widest text-sm disabled:opacity-50"
              >
                {isSubmitting ? 'Processing...' : 'APPLY NOW →'}
              </button>
              <p className="text-[10px] text-center text-slate-400 font-medium">By submitting, you agree to our <a href="/privacy-policy" className="underline">Privacy Policy</a>.</p>
            </form>
          </motion.div>

        </div>
      </main>

      <footer className="py-12 bg-slate-50 border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-slate-400 text-xs font-bold leading-relaxed">
            &copy; 2025 Green Miles Mobility Pvt. Ltd. | CIN: U66190DL2019PTC359196 <br />
            Registered Office: 619, Somdutt Chambers II, Bhikaji Cama, New Delhi – 110066
          </p>
        </div>
      </footer>
    </div>
  );
};

export default AdLandingPage;
