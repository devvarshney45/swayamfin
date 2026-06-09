import React, { useState } from 'react';
import { motion } from 'framer-motion';

const Partner = () => {
  // Form State
  const [formData, setFormData] = useState({
    fullName: '',
    mobile: '',
    location: '',
    segment: 'Financial Advisor',
    amount: ''
  });
  const [status, setStatus] = useState('idle');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.mobile.length !== 10) return;
    setStatus('submitting');
    
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/leads`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          applicant_name: formData.fullName,
          mobile: formData.mobile,
          location_city: formData.location,
          loan_type: 'lap', // Default for partner logic
          loan_amount_required: Number(formData.amount),
          source: 'partner_onboarding'
        })
      });

      if (response.ok) {
        setStatus('success');
        setFormData({ fullName: '', mobile: '', location: '', segment: 'Financial Advisor', amount: '' });
      } else {
        setStatus('error');
      }
    } catch (err) {
      setStatus('error');
    }
  };

  return (
    <div className="bg-[#F8FAFC] min-h-screen pt-32 pb-40 font-plus-jakarta-sans overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-[#0EA5E9]/5 blur-[160px] rounded-full translate-x-1/2 -translate-y-1/2" />

      {/* Hero Banner */}
      <div className="max-w-7xl mx-auto px-6 mb-24">
         <div className="bg-[#1E293B] p-16 md:p-24 rounded-[64px] border border-slate-800 shadow-2xl relative overflow-hidden text-center md:text-left">
            <div className="absolute top-0 right-0 w-full h-full bg-[#0EA5E9]/5" />
            <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
               <div className="space-y-8">
                  <motion.h1 
                    initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}
                    className="text-5xl md:text-7xl font-black text-white leading-none tracking-tighter uppercase"
                  >
                    Strategic <br /> <span className="text-[#0EA5E9] italic text-4xl md:text-6xl">LSP Alliance.</span>
                  </motion.h1>
                  <p className="text-blue-100/70 text-lg md:text-xl font-medium leading-relaxed italic max-w-xl">
                    "Expanding our institutional grid across India. Join our high-velocity lending network as a strategic partner node."
                  </p>
               </div>
               <div className="hidden md:flex justify-end">
                  <div className="w-32 h-32 bg-[#0EA5E9] rounded-[40px] flex items-center justify-center font-black text-white text-5xl italic rotate-12">P</div>
               </div>
            </div>
         </div>
      </div>

      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-start">
          
          <div className="space-y-16">
            <div>
              <h2 className="text-3xl font-black text-[#1E293B] uppercase tracking-tighter mb-12">Alliance <span className="text-[#0EA5E9] italic text-2xl">Value Matrix</span></h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                {[
                  { title: 'Yield Profile', desc: 'Industry-leading commission tiers for high-volume nodes.' },
                  { title: 'Node Analytics', desc: 'Real-time performance dashboard for lead flow monitoring.' },
                  { title: 'Advisory Sync', desc: 'Dedicated RM for complex corporate lending cases.' },
                  { title: 'Cycle Velocity', desc: 'Standardized monthly payouts with zero lag.' }
                ].map((benefit, i) => (
                  <div key={i} className="space-y-4">
                    <div className="w-10 h-10 bg-[#0EA5E9]/10 text-[#0EA5E9] rounded-xl flex items-center justify-center font-black">{i + 1}</div>
                    <h4 className="text-lg font-black text-[#1E293B] uppercase tracking-tight">{benefit.title}</h4>
                    <p className="text-slate-500 text-[11px] font-black uppercase tracking-widest leading-relaxed">{benefit.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white border border-slate-100 p-12 rounded-[48px] shadow-sm space-y-8">
               <h3 className="text-xl font-black text-[#1E293B] uppercase tracking-tight flex items-center gap-4">
                 Target Personnel Profiles
               </h3>
               <div className="space-y-4">
                  {['Individual DSAs', 'CA / Financial Consultants', 'Real Estate Nodes', 'Regional Partners'].map((item, i) => (
                    <div key={i} className="flex items-center gap-4 text-slate-500 text-[10px] font-black uppercase tracking-[0.2em] italic">
                       <div className="w-1.5 h-1.5 bg-[#0EA5E9] rounded-full" />
                       {item}
                    </div>
                  ))}
               </div>
            </div>
          </div>

          <motion.div 
            initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
            className="bg-white p-12 md:p-16 rounded-[60px] shadow-2xl relative overflow-hidden group"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#0EA5E9]/5 rounded-full -mr-16 -mt-16" />
            <h2 className="text-3xl font-black text-[#1E293B] mb-12 uppercase tracking-tighter leading-none">Alliance <span className="text-[#0EA5E9] italic">Onboarding.</span></h2>
            
            {status === 'success' ? (
              <div className="py-20 text-center space-y-4">
                <div className="w-20 h-20 bg-green-100 text-green-600 rounded-2xl flex items-center justify-center mx-auto text-3xl font-black">✓</div>
                <h3 className="text-2xl font-black text-[#1E293B]">Credentials Sent</h3>
                <p className="text-slate-500 font-bold uppercase tracking-widest text-[10px]">Strategic review in progress.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-8">
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Entity/Full Name</label>
                  <input required type="text" className="input-standard w-full h-16 rounded-[28px] px-8 text-sm" placeholder="Full Identity" value={formData.fullName} onChange={e => setFormData({...formData, fullName: e.target.value})} />
                </div>
                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Mobile Node</label>
                    <input required type="tel" maxLength="10" className="input-standard w-full h-16 rounded-[28px] px-8 text-sm" placeholder="+91..." value={formData.mobile} onChange={e => setFormData({...formData, mobile: e.target.value.replace(/\D/g, '')})} />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Branch Location</label>
                    <input required type="text" className="input-standard w-full h-16 rounded-[28px] px-8 text-sm" placeholder="City" value={formData.location} onChange={e => setFormData({...formData, location: e.target.value})} />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Personnel Segment</label>
                    <select className="input-standard w-full h-16 rounded-[28px] px-8 text-sm appearance-none cursor-pointer" value={formData.segment} onChange={e => setFormData({...formData, segment: e.target.value})}>
                      <option>Individual Link</option>
                      <option>Financial Advisor</option>
                      <option>Chartered Accountant</option>
                      <option>Regional Agent</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Portfolio (₹)</label>
                    <input required type="number" className="input-standard w-full h-16 rounded-[28px] px-8 text-sm" placeholder="e.g. 1000000" value={formData.amount} onChange={e => setFormData({...formData, amount: e.target.value})} />
                  </div>
                </div>
                <button type="submit" disabled={status === 'submitting'} className="w-full h-20 bg-[#1E293B] hover:bg-[#0EA5E9] text-white rounded-[32px] font-black uppercase tracking-[0.4em] shadow-2xl transition-all disabled:opacity-50"> 
                  {status === 'submitting' ? 'Transmitting...' : 'Transmit Credentials'}
                </button>
                {status === 'error' && <p className="text-center text-[10px] text-red-500 font-bold">Liaison Fault. Try Again.</p>}
              </form>
            )}
          </motion.div>

        </div>
      </div>
    </div>
  );
};

const InputGroup = ({ label, placeholder }) => (
  <div className="space-y-2">
    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">{label}</label>
    <input type="text" className="input-standard w-full h-16 rounded-[28px] px-8 text-sm" placeholder={placeholder} />
  </div>
);

export default Partner;
