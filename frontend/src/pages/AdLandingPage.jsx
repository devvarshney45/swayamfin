import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useParams, Link } from 'react-router-dom';
import { ChevronRight, CheckCircle2, Shield, Clock, Activity, MessageSquare, Phone } from 'lucide-react';
import { getUTMParams } from '../utils/helpers';
import LeadCaptureModal from '../components/common/LeadCaptureModal';

const AdLandingPage = () => {
  const { slug } = useParams();
  const [submitStatus, setSubmitStatus] = useState('idle');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [touched, setTouched] = useState({ mobile: false });

  const loanTypeMap = {
    'lap': 'lap',
    'housing-loan': 'home_loan',
    'supply-chain': 'supply_chain',
    'unsecured-business-loan': 'unsecured_business',
    'unsecured-export-finance': 'unsecured_export',
    'machinery-loan': 'machinery'
  };

  const [formData, setFormData] = useState({
    fullName: '',
    mobile: '',
    email: '',
    loanType: loanTypeMap[slug] || 'home_loan',
    amount: 500000,
    city: ''
  });

  const productTitles = {
    'lap': 'Loan Against Property (LAP)',
    'housing-loan': 'Affordable Housing & Home Loans',
    'supply-chain': 'Supply Chain & Invoice Financing',
    'unsecured-business-loan': 'Unsecured Business Loans (UBL)',
    'unsecured-export-finance': 'Unsecured Export Finance (UEF)',
    'machinery-loan': 'Machinery & Equipment Finance (MF)'
  };

  const currentTitle = productTitles[slug] || 'Custom Financial Solutions';

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitStatus('submitting');
    try {
      const utms = getUTMParams();
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/leads`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          ...utms,
          source: 'ad_landing_page',
          url_slug: slug
        })
      });

      if (response.ok) {
        setSubmitStatus('success');
        setFormData({ fullName: '', mobile: '', email: '', loanType: loanTypeMap[slug] || 'home_loan', amount: 500000, city: '' });
      } else if (response.status === 409) {
        setSubmitStatus('duplicate');
      } else {
        setSubmitStatus('error');
      }
    } catch (err) {
      setSubmitStatus('error');
    }
  };

  const branches = ['Agra', 'Mathura', 'Hathras', 'Kosi'];

  return (
    <div className="bg-[#F8FAFC] min-h-screen pt-32 pb-40 font-plus-jakarta-sans overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-[#0EA5E9]/5 blur-[120px] rounded-full translate-x-1/3 -translate-y-1/3" />
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-[#1E293B]/5 blur-[100px] rounded-full -translate-x-1/2 translate-y-1/2" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          
          {/* Left Column: Value Prop */}
          <div className="space-y-12">
            <motion.div 
               initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }}
               className="space-y-6 text-center lg:text-left"
            >
              <div className="inline-flex items-center gap-3 px-6 py-2.5 bg-[#0EA5E9]/10 border border-[#0EA5E9]/20 rounded-full">
                 <Shield className="w-3 h-3 text-[#0EA5E9]" />
                 <span className="text-[#0EA5E9] text-[10px] font-black uppercase tracking-[0.4em]">Verified Banking Node</span>
              </div>
              <h1 className="text-5xl md:text-7xl font-black text-[#1E293B] leading-[0.9] tracking-tighter uppercase">
                 {currentTitle.split(' ').map((word, i) => (
                   <span key={i} className={i % 2 === 1 ? 'text-[#0EA5E9] italic' : ''}>{word} </span>
                 ))}
              </h1>
              <p className="text-xl text-slate-500 font-medium italic border-l-4 border-[#0EA5E9]/20 pl-6">
                Institutional credit protocols for fast, accurate, and scalable financial growth.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
               {[
                 { title: '24HR Approval', desc: 'Fast credit cycles', icon: Clock },
                 { title: 'Paperless', desc: 'Fully digital uplink', icon: Activity },
                 { title: 'RBI Standards', desc: 'Secure institutional node', icon: Shield },
                 { title: 'Support', desc: '24/7 strategic advisory', icon: MessageSquare }
               ].map((item, i) => (
                 <div key={i} className="p-6 bg-white border border-slate-100 rounded-3xl shadow-sm hover:shadow-xl transition-all group">
                    <item.icon className="w-6 h-6 text-[#0EA5E9] mb-4 group-hover:scale-110 transition-transform" />
                    <h3 className="font-black text-[#1E293B] uppercase tracking-tight text-sm">{item.title}</h3>
                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-1">{item.desc}</p>
                 </div>
               ))}
            </div>
          </div>

          {/* Right Column: Form */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
            className="bg-white p-8 md:p-14 rounded-[48px] shadow-22xl border border-slate-100 relative overflow-hidden"
          >
             <div className="absolute top-0 right-0 w-32 h-32 bg-[#0EA5E9]/5 rounded-full -mr-16 -mt-16" />
             <div className="relative z-10 space-y-8">
                <div className="space-y-1">
                   <h2 className="text-3xl font-black text-[#1E293B] tracking-tighter uppercase leading-none">Check <span className="text-blue-600 italic">Eligibility</span></h2>
                   <div className="flex items-center gap-2">
                       <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
                       <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] italic">Active Application Uplink</p>
                   </div>
                </div>

                {submitStatus === 'success' ? (
                  <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-10 space-y-6">
                    <div className="w-20 h-20 bg-green-50 text-green-500 rounded-full flex items-center justify-center mx-auto border border-green-100 shadow-xl">
                      <CheckCircle2 className="w-10 h-10" />
                    </div>
                    <div className="space-y-2">
                       <h3 className="text-2xl font-black text-[#1E293B] uppercase tracking-tighter">Transmission Successful</h3>
                       <p className="text-slate-500 text-sm italic">"A credit analyst will contact you at your provided mobile node within 30 minutes."</p>
                    </div>
                    <button onClick={() => setSubmitStatus('idle')} className="text-[#0EA5E9] text-[10px] font-black uppercase tracking-widest hover:underline">New Application</button>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Legal Name</label>
                        <input required type="text" className="input-standard w-full h-14 rounded-2xl px-6 bg-slate-50 border-slate-100 text-sm focus:bg-white transition-all shadow-inner" placeholder="Applicant Name" value={formData.fullName} onChange={e => setFormData({...formData, fullName: e.target.value})} />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Mobile Node</label>
                        <input 
                          required type="tel" maxLength="10" 
                          className={`input-standard w-full h-14 rounded-2xl px-6 bg-slate-50 border-slate-100 text-sm focus:bg-white transition-all shadow-inner ${touched.mobile && formData.mobile.length !== 10 ? 'border-red-500 ring-4 ring-red-500/10' : ''}`} 
                          placeholder="Phone Number" value={formData.mobile} 
                          onBlur={() => setTouched({ ...touched, mobile: true })}
                          onChange={e => setFormData({...formData, mobile: e.target.value.replace(/\D/g, '')})} 
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-1">
                      <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Email (Verification Required)</label>
                      <input required type="email" className="input-standard w-full h-14 rounded-2xl px-6 bg-slate-50 border-slate-100 text-sm focus:bg-white transition-all shadow-inner" placeholder="name@company.com" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                        <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Amount Required</label>
                        <input required type="number" className="input-standard w-full h-14 rounded-2xl px-6 bg-slate-50 border-slate-100 text-sm focus:bg-white transition-all shadow-inner" placeholder="₹ Value" value={formData.amount} onChange={e => setFormData({...formData, amount: e.target.value})} />
                      </div>
                    </div>

                    <div className="space-y-1 pb-4">
                      <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Branch Hub</label>
                      <select required className="input-standard w-full h-14 rounded-2xl px-6 bg-slate-50 border-slate-100 text-sm focus:bg-white transition-all appearance-none cursor-pointer" value={formData.city} onChange={e => setFormData({...formData, city: e.target.value})}>
                          <option value="">Select City</option>
                          {branches.map(b => <option key={b} value={b}>{b}</option>)}
                      </select>
                    </div>

                    <button 
                      type="submit" disabled={submitStatus === 'submitting'}
                      className="w-full h-20 bg-[#1E293B] hover:bg-blue-600 text-white rounded-2xl font-black uppercase tracking-[0.4em] text-[10px] shadow-2xl transition-all active:scale-95 disabled:opacity-50 flex items-center justify-center gap-3"
                    >
                      {submitStatus === 'submitting' ? 'Processing...' : 'Invert Protocol & Check Eligibility'} <ChevronRight className="w-4 h-4" />
                    </button>

                    {submitStatus === 'duplicate' && <p className="text-[9px] text-amber-600 text-center font-bold uppercase tracking-widest italic italic">Coordinate Conflict: Transmission Already Logged.</p>}
                    {submitStatus === 'error' && <p className="text-[10px] text-red-600 text-center font-bold uppercase tracking-widest italic italic">Node Failure: Connection Lost. Retry Required.</p>}
                  </form>
                )}
             </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default AdLandingPage;
