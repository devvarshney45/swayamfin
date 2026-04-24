import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';
import { getUTMParams } from '../utils/helpers';

const AdLandingPage = () => {
  const { slug } = useParams();
  const [submitStatus, setSubmitStatus] = useState('idle'); // idle, submitting, success, duplicate, error
  const [errorMessage, setErrorMessage] = useState('');
  const [touched, setTouched] = useState({ mobile: false });

  const loanTypeMap = {
    'msme-loan': 'msme_structured',
    'lap': 'lap',
    'housing-loan': 'home_loan',
    'supply-chain': 'supply_chain'
  };

  const [formData, setFormData] = useState({
    fullName: '',
    mobile: '',
    email: '',
    loanType: loanTypeMap[slug] || 'msme_structured',
    amount: 500000,
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
    setSubmitStatus('submitting');
    try {
      const utms = getUTMParams();
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/leads`, {
        applicant_name: formData.fullName,
        mobile: formData.mobile,
        email: formData.email,
        loan_type: formData.loanType,
        loan_amount_required: Number(formData.amount),
        location_city: formData.city,
        ...utms
      });
      
      if (response.status === 201 || response.status === 200) {
        setSubmitStatus('success');
        setTouched({ mobile: false });
      }
    } catch (err) {
      if (err.response && err.response.status === 409) {
        setSubmitStatus('duplicate');
      } else {
        setSubmitStatus('error');
        setErrorMessage(err.response?.data?.message || 'Server Link Fault.');
      }
    }
  };

  if (submitStatus === 'success') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F8FAFC] px-6 font-plus">
        <motion.div initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="text-center max-w-xl bg-white p-12 md:p-20 rounded-[60px] shadow-2xl border border-slate-100 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-[#0EA5E9]/5 rounded-full -mr-16 -mt-16" />
          <div className="w-20 h-20 bg-[#0EA5E9] text-white rounded-3xl flex items-center justify-center mx-auto mb-10 font-black text-3xl italic">
             !
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-[#1E293B] mb-6 tracking-tighter uppercase leading-none">Application <span className="text-[#0EA5E9] italic">Logged.</span></h2>
          <p className="text-slate-500 font-black text-[10px] uppercase tracking-[0.4em] mb-12 italic opacity-60">"Your request has been successfully integrated into our institutional credit grid."</p>
          <button onClick={() => window.location.href = '/'} className="w-full h-16 bg-[#1E293B] text-white rounded-2xl font-black uppercase tracking-widest text-[10px] shadow-2xl hover:bg-[#0EA5E9] transition-all">Back to Command Hub</button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="bg-[#F8FAFC] min-h-screen font-plus overflow-x-hidden">
      {/* Background Accents */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-[#0EA5E9]/5 blur-[160px] rounded-full translate-x-1/2 -translate-y-1/2" />
      
      {/* Mini Brand Header */}
      <nav className="py-8 bg-white border-b border-slate-50 relative z-10">
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-[#1E293B] rounded-xl flex items-center justify-center font-black text-white italic">S</div>
            <span className="text-2xl font-black text-[#1E293B] tracking-tighter uppercase">Swayam<span className="text-[#0EA5E9] italic">fin.</span></span>
          </div>
          <div className="hidden md:block">
             <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest italic opacity-60">Institutional Liaison: +91 87009 65592</span>
          </div>
        </div>
      </nav>

      {/* Main Content Arena */}
      <main className="max-w-7xl mx-auto px-6 py-16 md:py-32 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
          
          <div className="space-y-12">
            <div className="space-y-6">
              <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="inline-flex items-center gap-3 px-6 py-2 bg-[#0EA5E9]/10 text-[#0EA5E9] border border-[#0EA5E9]/20 rounded-full text-[10px] font-black uppercase tracking-[0.4em]">
                Strategic Deployment Node
              </motion.div>
              <h1 className="text-5xl md:text-8xl font-black text-[#1E293B] leading-[0.95] mb-8 tracking-tighter uppercase">
                 Rapid <br /> <span className="text-[#0EA5E9] italic">{currentTitle.split(' ')[0]}</span> <br /> Approval.
              </h1>
              <p className="text-xl md:text-2xl text-slate-500 font-medium leading-tight italic max-w-xl opacity-80">
                 "Facilitating institutional credit cycles through high-velocity data processing and transparent advisory protocols."
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
               {[
                 { l: 'Asset Volume', v: '750+ Units' },
                 { l: 'Network Link', v: 'DMI Housing' }
               ].map((s, i) => (
                 <div key={i} className="p-8 bg-white border border-slate-100 rounded-[32px] shadow-sm">
                    <p className="text-3xl font-black text-[#1E293B] tracking-tighter uppercase leading-none mb-3">{s.v}</p>
                    <p className="text-[#0EA5E9] text-[9px] font-black uppercase tracking-[0.4em] opacity-60">{s.l}</p>
                 </div>
               ))}
            </div>

            <p className="text-[9px] font-black text-slate-400 uppercase tracking-[0.2em] italic max-w-md opacity-60">
               * Swayamfin is a Loan Service Provider. Capital deployment is centralized with partner lenders and subject to credit appraisal.
            </p>
          </div>

          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="bg-white p-12 md:p-16 rounded-[60px] shadow-2xl border border-slate-100 relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#0EA5E9]/5 rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-all duration-1000" />
            <h2 className="text-3xl font-black text-[#1E293B] mb-12 border-b border-slate-50 pb-8 uppercase tracking-tighter leading-none flex justify-between items-center">
               Initiate <span className="text-[#0EA5E9] italic">Sync.</span>
            </h2>
            
            <form onSubmit={handleSubmit} className="space-y-8">
              <InputSet label="Full Identity" placeholder="Legal Name" value={formData.fullName} onChange={v => setFormData({...formData, fullName: v})} />
              
              <div className="space-y-2">
                 <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] ml-1">Comm Node</label>
                 <input 
                   required type="tel"
                   className={`input-standard w-full h-16 rounded-[28px] px-8 text-sm focus:border-[#0EA5E9] ${touched.mobile && formData.mobile.length > 0 && formData.mobile.length !== 10 ? 'border-rose-400' : 'border-[#E2E8F0]'}`}
                   placeholder="10-Digit Mobile"
                   value={formData.mobile}
                   onChange={e => {
                     const val = e.target.value.replace(/\D/g, '');
                     if (val.length <= 10) setFormData({...formData, mobile: val});
                   }}
                   onBlur={() => setTouched({ ...touched, mobile: true })}
                 />
                 {touched.mobile && formData.mobile.length > 0 && formData.mobile.length !== 10 && (
                   <span className="text-[9px] text-rose-500 font-black uppercase tracking-widest ml-2 italic">Invalid Coordinate Match</span>
                 )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                 <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] ml-1">Hub Location</label>
                    <select required className="input-standard w-full h-16 rounded-[28px] px-8 text-sm appearance-none cursor-pointer" value={formData.city} onChange={e => setFormData({...formData, city: e.target.value})}>
                       <option value="" disabled>Select Hub</option>
                       <option value="Agra">Agra Node</option>
                       <option value="Mathura">Mathura Node</option>
                       <option value="Hathras">Hathras Node</option>
                       <option value="Kosi">Kosi Node</option>
                    </select>
                 </div>
                 <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] ml-1">Credit Weight</label>
                    <select className="input-standard w-full h-16 rounded-[28px] px-8 text-sm appearance-none cursor-pointer" value={formData.amount} onChange={e => setFormData({...formData, amount: Number(e.target.value)})}>
                       <option value={500000}>₹5L - ₹10L</option>
                       <option value={1500000}>₹10L - ₹50L</option>
                       <option value={5000000}>₹50L - ₹1Cr</option>
                       <option value={10000000}>Over ₹1Cr</option>
                    </select>
                 </div>
              </div>

              <button 
                type="submit" disabled={submitStatus === 'submitting'}
                className="w-full h-20 bg-[#1E293B] hover:bg-[#0EA5E9] text-white rounded-[32px] font-black uppercase tracking-[0.4em] text-[10px] shadow-2xl transition-all active:scale-95 disabled:opacity-50"
              >
                {submitStatus === 'submitting' ? 'Processing Link...' : 'INITIALIZE APPLICATION'}
              </button>
              
              <AnimatePresence>
                {submitStatus === 'duplicate' && (
                  <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center text-[9px] font-black text-amber-500 uppercase tracking-widest italic font-bold">Node Conflict: Transmission already logged within current cycle.</motion.p>
                )}
                {submitStatus === 'error' && (
                  <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center text-[9px] font-black text-rose-500 uppercase tracking-widest italic font-bold">{errorMessage}</motion.p>
                )}
              </AnimatePresence>

              <p className="text-[9px] text-center text-slate-400 font-bold uppercase tracking-widest italic opacity-40">By initializing, you agree to the institutional <a href="/privacy-policy" className="underline hover:text-[#0EA5E9]">Privacy Protocol</a>.</p>
            </form>
          </motion.div>

        </div>
      </main>

      <footer className="py-16 bg-white border-t border-slate-50 relative z-10">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <p className="text-slate-400 text-[10px] font-black uppercase tracking-[0.4em] leading-relaxed italic opacity-60">
             &copy; 2025 Green Miles Mobility Pvt. Ltd. | CIN: U66190DL2019PTC359196 <br />
             619, Somdutt Chambers II, Bhikaji Cama, New Delhi – 110066
          </p>
        </div>
      </footer>
    </div>
  );
};

const InputSet = ({ label, placeholder, value, onChange }) => (
  <div className="space-y-2">
    <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] ml-1">{label}</label>
    <input 
      required type="text"
      className="input-standard w-full h-16 rounded-[28px] px-8 text-sm focus:border-[#0EA5E9]"
      placeholder={placeholder}
      value={value}
      onChange={e => onChange(e.target.value)}
    />
  </div>
);

export default AdLandingPage;
