import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

const branchData = {
  'agra': {
    city: 'Agra',
    address: 'Block No. 20/4, Shop No. 11, Maruti Tower, First Floor, Sanjay Place, Agra, UP - 282002',
    phone: '+91 87009 65594',
    email: 'agra@swayamfin.com',
    map: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3549.0!2d78.0!3d27.18!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjfCsDEwJzQ4LjAiTiA3OMKwMDAnMDAuMCJF!5e0!3m2!1sen!2sin!4v1610000000000!5m2!1sen!2sin',
    manager: 'Nupur Prasad',
    code: 'AGR-NOD-01',
    rating: 'A+ Grade',
    velocity: '48H'
  },
  'mathura': {
    city: 'Mathura',
    address: 'Reg. Office No. 207, 2nd Floor, Shri Square Building, Radhapuram Chauraha, Shri Radha Puram, Vishwakarma Nagar, Mathura, UP - 281001',
    phone: '+91 87009 65595',
    email: 'mathura@swayamfin.com',
    map: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3532.5!2d77.67!3d27.5!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjfCsDMwJzAwLjAiTiA3N8KwNDAnMTIuMCJF!5e0!3m2!1sen!2sin!4v1610000000000!5m2!1sen!2sin',
    manager: 'Sudhanshu Shekhar',
    code: 'MTH-NOD-02',
    rating: 'A Grade',
    velocity: '52H'
  },
  'hathras': {
    city: 'Hathras',
    address: 'VG Plaza, Glory Garden, Mathura Road, Hathras, UP - 204101',
    phone: '+91 87009 65592',
    email: 'hathras@swayamfin.com',
    map: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3525.0!2d78.0!3d27.6!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjfCsDM2JzAwLjAiTiA3OMKwMDAnMDAuMCJF!5e0!3m2!1sen!2sin!4v1610000000000!5m2!1sen!2sin',
    manager: 'Madhu Priya Prasad',
    code: 'HTH-NOD-03',
    rating: 'A+ Grade',
    velocity: '45H'
  },
  'kosi': {
    city: 'Kosi',
    address: 'Radharani Tower, New Agrawal Colony, Nandgaon Road, Kosi Kalan, Mathura, UP - 281403',
    phone: '+91 87009 65592',
    email: 'kosi@swayamfin.com',
    map: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3515.0!2d77.4!3d27.8!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjfCsDQ4JzAwLjAiTiA3N8KwMjQnMDAuMCJF!5e0!3m2!1sen!2sin!4v1610000000000!5m2!1sen!2sin',
    manager: 'Vikkrant Prasad',
    code: 'KSI-NOD-04',
    rating: 'B+ Grade',
    velocity: '60H'
  }
};

const BranchDetails = () => {
  const { slug } = useParams();
  const branch = branchData[slug] || branchData['agra'];
  const [success, setSuccess] = useState(false);
  const [submitStatus, setSubmitStatus] = useState('idle'); // idle, submitting, duplicate, error
  const [mobileError, setMobileError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '', 
    mobile: '', 
    loanType: 'msme_structured', 
    amount: '',
    city: branch.city
  });

  useEffect(() => {
    window.scrollTo(0, 0);
    setFormData(prev => ({ ...prev, city: branch.city }));
  }, [slug]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMobileError('');
    setSubmitStatus('idle');
    if (formData.mobile.length !== 10) {
      setMobileError('Please enter a valid 10-digit mobile number.');
      return;
    }
    setIsSubmitting(true);
    
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/leads`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          applicant_name: formData.fullName,
          mobile: formData.mobile,
          loan_type: formData.loanType,
          loan_amount_required: Number(formData.amount),
          location_city: formData.city,
          source: 'branch_page'
        })
      });

      if (response.ok) {
        setSuccess(true);
        setFormData({ fullName: '', mobile: '', loanType: 'msme_structured', amount: '', city: branch.city });
      } else if (response.status === 409) {
        setSubmitStatus('duplicate');
      } else {
        setSubmitStatus('error');
      }
    } catch (err) {
      console.error(err);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white min-h-screen pt-32 pb-40 relative">
      <div className="absolute top-0 right-0 w-[1000px] h-[1000px] bg-[#0EA5E9]/5 blur-[160px] rounded-full translate-x-1/2 -translate-y-1/2 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Breadcrumb */}
        <nav className="flex items-center gap-4 text-[10px] font-black uppercase tracking-[0.4em] text-slate-400 mb-16">
            <Link to="/" className="hover:text-[#0EA5E9]">Foundation</Link>
            <div className="w-1 h-1 rounded-full bg-slate-300" />
            <Link to="/branches" className="hover:text-[#0EA5E9]">Network</Link>
            <div className="w-1 h-1 rounded-full bg-[#0EA5E9]" />
            <span className="text-[#0EA5E9]">{branch.city} Node</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-start">
          
          {/* Main Info */}
          <div className="lg:col-span-7 space-y-12">
            <motion.div 
              initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }}
              className="bg-white border border-slate-100 p-6 md:p-14 lg:p-20 rounded-[40px] md:rounded-[48px] shadow-2xl relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-80 h-80 bg-[#0EA5E9]/5 blur-[100px] rounded-full -mr-40 -mt-40" />
              
              <div className="inline-flex items-center gap-3 px-5 py-2 bg-[#0EA5E9]/10 border border-[#0EA5E9]/20 rounded-full mb-10">
                <span className="text-[#0EA5E9] text-[10px] font-black uppercase tracking-[0.4em]">Live Distribution Hub</span>
              </div>
              
              <h1 className="text-4xl md:text-6xl font-black text-[#1E293B] leading-[1.1] tracking-tight mb-8">
                Swayamfin <br /> <span className="text-[#0EA5E9] italic uppercase">{branch.city} Hub.</span>
              </h1>
              
              <p className="text-xl text-slate-500 font-medium italic border-l-4 border-[#0EA5E9]/20 pl-6 mb-12">
                "Bringing smart financial solutions to local businesses across the region."
              </p>
 
               <div className="grid grid-cols-1 sm:grid-cols-2 gap-12 pt-10 border-t border-slate-100">
                <InfoItem label="Geospatial Node" value={branch.address} />
                <InfoItem label="Interface Link" value={branch.phone} isLarge color="blue" />
                <InfoItem label="Node Manager" value={branch.manager} />
                <InfoItem label="System Reliability" value={branch.rating} subValue={`Code: ${branch.code}`} />
              </div>
            </motion.div>
 
             {/* Map Integration */}
            <div className="h-[400px] bg-slate-50 border border-slate-200 rounded-[48px] overflow-hidden shadow-inner relative group">
               <iframe 
                src={branch.map} 
                className="w-full h-full border-0 grayscale hover:grayscale-0 transition-all duration-700"
                allowFullScreen="" 
                loading="lazy"
                title={`${branch.city} Map`}
              ></iframe>
            </div>
          </div>

          {/* Inline Form */}
          <div className="lg:col-span-5 lg:sticky top-32">
            <motion.div 
               initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
               className="bg-[#1E293B] p-6 md:p-12 lg:p-16 rounded-[40px] md:rounded-[48px] shadow-2xl relative overflow-hidden text-center md:text-left"
            >
               <div className="absolute top-0 right-0 w-64 h-64 bg-[#0EA5E9]/10 blur-3xl rounded-full translate-x-1/2 -translate-y-1/2" />
               
               <div className="relative z-10 space-y-8">
                  <div>
                    <h3 className="text-2xl font-black text-white uppercase tracking-tight">Hub Onboarding</h3>
                    <p className="text-[#0EA5E9] text-[9px] font-bold uppercase tracking-[0.4em] mt-2 italic">Regional Enrollment Portal</p>
                  </div>

                  <AnimatePresence mode="wait">
                    {success ? (
                      <motion.div key="success" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="py-20 text-center space-y-6">
                        <div className="w-16 h-16 bg-[#0EA5E9]/10 text-[#0EA5E9] rounded-full flex items-center justify-center mx-auto border border-[#0EA5E9]/20 shadow-lg">
                           <span className="text-2xl font-black">✓</span>
                        </div>
                        <h4 className="text-2xl font-black text-white uppercase tracking-tight">Submission Finalized</h4>
                        <p className="text-slate-400 text-sm font-medium italic">The {branch.city} Hub team will intercept your session shortly.</p>
                        <button onClick={() => setSuccess(false)} className="text-[#0EA5E9] text-[10px] font-black uppercase tracking-widest hover:underline">New Request</button>
                      </motion.div>
                    ) : (
                      <form onSubmit={handleSubmit} className="space-y-6">
                         <div className="space-y-2">
                           <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest pl-2">Applicant Name</label>
                           <input 
                            required type="text"
                            className="w-full bg-white/5 border border-white/10 rounded-[16px] px-6 py-4 text-white text-sm font-bold outline-none focus:border-[#0EA5E9] focus:bg-transparent transition-all"
                            placeholder="Full Legal Name"
                            value={formData.fullName}
                            onChange={e => setFormData({...formData, fullName: e.target.value})}
                           />
                         </div>
                         <div className="grid grid-cols-2 gap-4">
                           <div className="space-y-2">
                             <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest pl-2">Comm Link</label>
                             <input 
                              required type="tel" maxLength="10"
                              className="w-full bg-white/5 border border-white/10 rounded-[16px] px-6 py-4 text-white text-sm font-bold outline-none focus:border-[#0EA5E9] focus:bg-transparent transition-all"
                              placeholder="10 Digit Mobile"
                              value={formData.mobile}
                              onChange={e => setFormData({...formData, mobile: e.target.value.replace(/\D/g, '')})}
                             />
                           </div>
                           <div className="space-y-2">
                             <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest pl-2">Amount (₹)</label>
                             <input 
                              required type="number"
                              className="w-full bg-white/5 border border-white/10 rounded-[16px] px-6 py-4 text-white text-sm font-bold outline-none focus:border-[#0EA5E9] focus:bg-transparent transition-all"
                              placeholder="e.g. 500000"
                              value={formData.amount}
                              onChange={e => setFormData({...formData, amount: e.target.value})}
                             />
                           </div>
                         </div>
                         <div className="space-y-2">
                           <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest pl-2">Requirement Type</label>
                           <select 
                            className="w-full bg-white/5 border border-white/10 rounded-[16px] px-6 py-4 text-white text-sm font-bold outline-none focus:border-[#0EA5E9] focus:bg-transparent transition-all appearance-none cursor-pointer"
                            value={formData.loanType}
                            onChange={e => setFormData({...formData, loanType: e.target.value})}
                           >
                            <option value="msme_structured" className="bg-[#1E293B]">MSME Loans</option>
                            <option value="lap" className="bg-[#1E293B]">LAP Assets</option>
                            <option value="home_loan" className="bg-[#1E293B]">Home Loans</option>
                           </select>
                         </div>

                         <button 
                          type="submit"
                          disabled={isSubmitting}
                          className="w-full btn-primary py-6 uppercase tracking-[0.3em] text-[10px] shadow-2xl"
                         >
                            {isSubmitting ? 'Syncing...' : 'Initiate Session'}
                         </button>
                         {submitStatus === 'duplicate' && <p className="text-[10px] text-amber-500 font-black uppercase tracking-widest text-center">Duplicate lead already submitted within 24 hours.</p>}
                         {submitStatus === 'error' && <p className="text-[10px] text-red-500 font-black uppercase tracking-widest text-center">Submission failed. Please try again.</p>}
                         {mobileError && <p className="text-[10px] text-red-500 font-black uppercase tracking-widest text-center">{mobileError}</p>}

                         <div className="p-6 bg-white/5 rounded-[24px] border border-white/5 flex gap-4 items-start">
                            <span className="text-[#0EA5E9] font-black text-lg">!</span>
                            <p className="text-[9px] text-slate-400 font-bold uppercase tracking-widest leading-relaxed">Session is flagged as <span className="text-[#0EA5E9]">Priority Hub</span> for regional deployment.</p>
                         </div>
                      </form>
                    )}
                  </AnimatePresence>
               </div>
            </motion.div>
          </div>

        </div>
      </div>
    </div>
  );
};

const InfoItem = ({ label, value, subValue, isLarge, color }) => (
  <div className="space-y-2">
    <p className="text-[10px] text-slate-400 font-black uppercase tracking-[0.4em] mb-1">{label}</p>
    <p className={`${isLarge ? 'text-2xl md:text-3xl font-black' : 'text-base font-bold'} ${color === 'blue' ? 'text-[#0EA5E9]' : 'text-[#1E293B]'} leading-tight tracking-tight`}>{value}</p>
    {subValue && <p className="text-[10px] text-[#0EA5E9] font-black uppercase tracking-[0.3em] mt-2 italic">{subValue}</p>}
  </div>
);

export default BranchDetails;
