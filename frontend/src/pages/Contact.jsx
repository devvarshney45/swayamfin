import React, { useState } from 'react';
import { motion } from 'framer-motion';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    mobile: '',
    city: '',
    amount: '',
    message: ''
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
          applicant_name: formData.name,
          mobile: formData.mobile,
          location_city: formData.city,
          loan_amount_required: Number(formData.amount),
          loan_type: 'other', // Default for contact form
          source: 'contact_page',
          message: formData.message
        })
      });

      if (response.ok) {
        setStatus('success');
        setFormData({ name: '', mobile: '', city: '', amount: '', message: '' });
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
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Header Section */}
        <div className="text-center mb-24 space-y-6">

           <motion.h1 
             initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
             className="text-5xl md:text-8xl font-black text-[#1E293B] leading-none tracking-tighter uppercase"
           >
              Contact <br /> <span className="text-[#0EA5E9] italic">Us.</span>
           </motion.h1>

           <motion.p 
             initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}
             className="text-slate-500 text-lg md:text-2xl max-w-4xl mx-auto font-medium italic leading-relaxed"
           >
              "Reach out to our financial experts through call or chat"
           </motion.p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          
          {/* Contact Methods */}
          <div className="lg:col-span-7 space-y-12">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {[
                { title: 'Call Us', detail: '+91 95607 23332', detail2: 'Speak with our team' },
                { title: 'Email Us', detail: 'info@swayamfin.com', detail2: 'Reach out anytime' },
                { title: 'Message Us Directly', detail: '+91 95607 23332', detail2: 'WhatsApp Support Line' },
                { title: 'Operating Hours', detail: '09:00 - 23:00 IST', detail2: 'Monday - Saturday' }
              ].map((item, i) => (
                <motion.div 
                  key={i} 
                  initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }}
                  className="bg-white border border-slate-100 p-12 rounded-[48px] shadow-sm hover:shadow-2xl transition-all group"
                >
                  <div className="w-12 h-12 bg-slate-50 border border-slate-100 rounded-2xl flex items-center justify-center mb-8 font-black text-[#0EA5E9] group-hover:bg-[#0EA5E9] group-hover:text-white transition-all">
                    {item.title.charAt(0)}
                  </div>
                  <h3 className="text-xl font-black text-[#1E293B] uppercase tracking-tight mb-4 group-hover:text-[#0EA5E9] transition-all">{item.title}</h3>
                  <div className="space-y-1">
                     <p className="text-[11px] text-[#1E293B] font-black uppercase tracking-widest">{item.detail}</p>
                     <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest italic">{item.detail2}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Address Card */}
            <motion.div 
               initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }}
               className="bg-[#1E293B] p-12 md:p-20 rounded-[64px] border border-slate-800 shadow-2xl relative overflow-hidden group"
            >
              <div className="absolute top-0 right-0 w-96 h-96 bg-[#0EA5E9]/10 blur-[120px] rounded-full translate-x-1/2 -translate-y-1/2" />
              <div className="relative z-10 space-y-10">
                 <div className="flex items-center gap-6">
                    <div className="w-16 h-16 bg-white/5 rounded-3xl border border-white/10 flex items-center justify-center font-black text-white text-2xl">M</div>
                    <h3 className="text-3xl font-black text-white uppercase tracking-tighter leading-none">Regional Branch <br /> <span className="text-[#0EA5E9]">Command.</span></h3>
                 </div>
                 <p className="text-blue-100 text-xl md:text-2xl font-medium leading-tight italic max-w-lg">
                    "619, Somdutt Chambers II, Bhikaji Cama, New Delhi – 110066"
                 </p>
                 <div className="flex gap-2">
                    {[1,2,3,4,5].map(i => <div key={i} className="w-12 h-1 bg-[#0EA5E9] rounded-full" style={{ opacity: i * 0.15 }} />)}
                 </div>
              </div>
            </motion.div>
          </div>

          {/* Form Section */}
          <div className="lg:col-span-5 sticky top-32">
            <motion.div 
              initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }}
              className="bg-white border border-slate-100 p-12 rounded-[56px] shadow-2xl relative overflow-hidden group"
            >
               <div className="absolute top-0 right-0 w-64 h-64 bg-[#0EA5E9]/5 blur-[100px] rounded-full -mr-32 -mt-32" />
               <div className="relative z-10 space-y-10">
                  <div className="space-y-2">
                     <h3 className="text-3xl font-black text-[#1E293B] uppercase tracking-tighter">Initiate Sync.</h3>
                     <p className="text-slate-400 text-[10px] font-black uppercase tracking-[0.4em] italic opacity-60">Strategic Transmission Protocol</p>
                  </div>

                  {status === 'success' ? (
                    <div className="py-20 text-center space-y-4">
                      <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto shadow-inner text-3xl">✓</div>
                      <h3 className="text-xl font-black">Transmission Success</h3>
                      <p className="text-slate-500 text-[10px] font-bold uppercase tracking-widest italic">Our unit will contact you shortly.</p>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div className="space-y-2">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Full Identity</label>
                        <input required type="text" className="input-standard w-full h-16 rounded-[28px] px-8 text-sm" placeholder="Your Full Name" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} />
                      </div>
                      <div className="grid grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Comm Node</label>
                          <input required type="tel" maxLength="10" className="input-standard w-full h-16 rounded-[28px] px-8 text-sm" placeholder="+91 XXXX" value={formData.mobile} onChange={e => setFormData({...formData, mobile: e.target.value.replace(/\D/g, '')})} />
                        </div>
                        <div className="space-y-2">
                          <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Branch Location</label>
                          <input required type="text" className="input-standard w-full h-16 rounded-[28px] px-8 text-sm" placeholder="City" value={formData.city} onChange={e => setFormData({...formData, city: e.target.value})} />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Capital Scope (₹)</label>
                        <input required type="number" className="input-standard w-full h-16 rounded-[28px] px-8 text-sm" placeholder="e.g. 5000000" value={formData.amount} onChange={e => setFormData({...formData, amount: e.target.value})} />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Requirements Matrix</label>
                        <textarea rows="5" className="input-standard w-full rounded-3xl p-6 text-sm resize-none" placeholder="Narrative of required financial scope..." value={formData.message} onChange={e => setFormData({...formData, message: e.target.value})}></textarea>
                      </div>
                      <button type="submit" disabled={status === 'submitting'} className="w-full h-20 bg-[#1E293B] hover:bg-[#0EA5E9] text-white rounded-[32px] font-black uppercase tracking-[0.4em] shadow-2xl transition-all active:scale-95 disabled:opacity-50"> 
                        {status === 'submitting' ? 'Transmitting...' : 'Initialize Transmission'} 
                      </button>
                      <div className="p-6 bg-slate-50 rounded-3xl border border-slate-100 text-center">
                        <p className="text-[9px] font-black text-slate-400 uppercase tracking-[0.2em] leading-relaxed">Secure 256-bit Institutional Encryption Active. <br /> Data routed via Swayamfin Node.</p>
                      </div>
                    </form>
                  )}
               </div>
            </motion.div>
          </div>

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

export default Contact;
