import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Phone, Mail, Clock, Calendar, CheckCircle2, ChevronRight, Building2, Sparkles, Navigation } from 'lucide-react';
import axios from 'axios';
import { useTheme } from '../context/ThemeContext';
import { useTranslation } from 'react-i18next';

const branchData = {
  'agra': {
    city: 'Agra',
    address: '12/45, Sanjay Place, Agra, UP - 282002',
    phone: '+91 87009 65594',
    email: 'agra@swayamfin.com',
    map: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3549.0!2d78.0!3d27.18!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjfCsDEwJzQ4LjAiTiA3OMKwMDAnMDAuMCJF!5e0!3m2!1sen!2sin!4v1610000000000!5m2!1sen!2sin',
    manager: 'Nupur Prasad',
    color: 'blue'
  },
  'mathura': {
    city: 'Mathura',
    address: 'Near Holi Gate, Mathura, UP - 281001',
    phone: '+91 87009 65595',
    email: 'mathura@swayamfin.com',
    map: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3532.5!2d77.67!3d27.5!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjfCsDMwJzAwLjAiTiA3N8KwNDAnMTIuMCJF!5e0!3m2!1sen!2sin!4v1610000000000!5m2!1sen!2sin',
    manager: 'Sudhanshu Shekhar',
    color: 'indigo'
  },
  'hathras': {
    city: 'Hathras',
    address: 'Main Market, Hathras, UP - 204101',
    phone: '+91 87009 65592',
    email: 'hathras@swayamfin.com',
    map: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3525.0!2d78.0!3d27.6!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjfCsDM2JzAwLjAiTiA3OMKwMDAnMDAuMCJF!5e0!3m2!1sen!2sin!4v1610000000000!5m2!1sen!2sin',
    manager: 'Madhu Priya Prasad',
    color: 'emerald'
  },
  'kosi': {
    city: 'Kosi',
    address: 'G.T. Road, Kosi Kalan, UP - 281403',
    phone: '+91 87009 65592',
    email: 'kosi@swayamfin.com',
    map: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3515.0!2d77.4!3d27.8!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjfCsDQ4JzAwLjAiTiA3N8KwMjQnMDAuMCJF!5e0!3m2!1sen!2sin!4v1610000000000!5m2!1sen!2sin',
    manager: 'Vikkrant Prasad',
    color: 'amber'
  }
};

const BranchDetails = () => {
  const { slug } = useParams();
  const { isDark } = useTheme();
  const { t } = useTranslation();
  const branch = branchData[slug] || branchData['agra'];
  const [success, setSuccess] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '', mobile: '', loanType: 'msme_structured', city: branch.city
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${import.meta.env.VITE_API_URL || 'http://localhost:5001'}/api/leads`, formData);
      setSuccess(true);
    } catch (err) {
      console.error('Lead submission failed');
    }
  };

  return (
    <div className={`${isDark ? 'bg-[#020617] text-white' : 'bg-[#F8FAFC] text-slate-900'} min-h-screen pt-24 pb-32 font-dmsans transition-colors duration-300 relative overflow-hidden`}>
      
      {/* Background Accents */}
      <div className={`absolute top-0 right-0 w-[300px] md:w-[600px] h-[300px] md:h-[600px] ${isDark ? 'bg-blue-600/5' : 'bg-blue-500/5'} blur-[60px] md:blur-[120px] rounded-full translate-x-1/2 -translate-y-1/2`} />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-16 items-start">
          
          {/* Main Info Column */}
          <div className="w-full lg:w-2/3 space-y-8 md:space-y-12">
            <motion.div 
              initial={{ opacity: 0, x: -30 }} 
              animate={{ opacity: 1, x: 0 }} 
              className={`${isDark ? 'bg-white/5 border-white/5 shadow-22xl shadow-black/50' : 'bg-white border-slate-200 shadow-xl shadow-slate-200/50'} p-6 md:p-14 rounded-[32px] md:rounded-[60px] border relative overflow-hidden group`}
            >
              <div className={`absolute top-0 right-0 w-48 h-48 ${isDark ? 'bg-blue-600/5' : 'bg-blue-500/5'} blur-3xl rounded-full -mr-24 -mt-24 group-hover:scale-150 transition-transform duration-1000`} />
              
              <div className="flex justify-center md:justify-start">
                <div className={`inline-flex items-center gap-2 md:gap-3 ${isDark ? 'bg-white/5 border-white/10' : 'bg-blue-50 border-blue-100'} text-primary-gold px-4 md:px-6 py-2 rounded-full text-[9px] md:text-[10px] font-black uppercase tracking-[0.3em] mb-8 md:mb-10 shadow-inner border shadow-sm`}>
                  <MapPin className="w-4 h-4" /> Strategic Branch Network
                </div>
              </div>
              
              <h1 className={`text-3xl sm:text-5xl md:text-7xl font-black ${isDark ? 'text-white' : 'text-slate-900'} mb-6 md:mb-8 tracking-tighter leading-tight text-center md:text-left`}>
                Swayamfin <span className="text-blue-600 italic">{branch.city}</span>
              </h1>
              
              <p className={`text-base md:text-xl ${isDark ? 'text-slate-400' : 'text-slate-500'} font-medium leading-relaxed mb-8 md:mb-12 italic text-center md:text-left`}>
                Empowering the economic landscape of {branch.city} with hyper-localized credit solutions and expert financial consultancy.
              </p>

              <div className={`grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-10 py-8 md:py-12 border-t ${isDark ? 'border-white/5' : 'border-slate-100'}`}>
                <div className="space-y-6 md:space-y-10">
                  <InfoItem icon={<MapPin />} label="Geospatial Identity" value={branch.address} isDark={isDark} />
                  <InfoItem icon={<Phone />} label="Direct Liaison" value={branch.phone} isDark={isDark} isLarge />
                </div>

                <div className="space-y-6 md:space-y-10">
                   <InfoItem icon={<Clock />} label="Operational Window" value="Mon - Sat: 9:30 AM - 6:30 PM" subValue="Closed on Sundays & Bank Holidays" isDark={isDark} />
                   <InfoItem icon={<UserCircle />} label="Branch Governance" value={branch.manager} isDark={isDark} />
                </div>
              </div>
            </motion.div>

            {/* Interactive Map */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              className={`h-[350px] md:h-[500px] ${isDark ? 'bg-white/5 border-white/5' : 'bg-slate-200 border-slate-300'} rounded-[32px] md:rounded-[60px] overflow-hidden shadow-2xl border relative group`}
            >
               <div className="absolute top-4 md:top-6 left-4 md:left-6 z-20 flex items-center gap-2 md:gap-3 bg-white/10 backdrop-blur-md px-4 md:px-5 py-2 rounded-full border border-white/20 text-[9px] md:text-[10px] font-black uppercase tracking-widest text-white shadow-lg">
                  <Navigation className="w-3.5 h-3.5" /> Live Path Mapping
               </div>
               <iframe 
                src={branch.map} 
                className={`w-full h-full border-0 transition-all duration-1000 ${isDark ? 'grayscale invert opacity-30 contrast-125' : 'grayscale hover:grayscale-0'}`}
                allowFullScreen="" 
                loading="lazy"
                title={`${branch.city} Map`}
              ></iframe>
            </motion.div>
          </div>

          {/* Sidebar Form */}
          <div className="w-full lg:w-1/3 lg:sticky lg:top-32">
            <motion.div 
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              className={`${isDark ? 'bg-white/5 border-white/5 shadow-22xl shadow-black/50' : 'bg-white border-slate-200 shadow-2xl shadow-slate-200/50'} p-6 sm:p-10 rounded-[32px] md:rounded-[50px] border relative overflow-hidden group`}
            >
               <div className={`absolute top-0 right-0 w-32 h-32 ${isDark ? 'bg-blue-600/10' : 'bg-blue-600/5'} blur-3xl rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-all`} />
               
               <div className="flex items-center gap-4 mb-8 md:mb-10">
                  <div className="w-1.5 h-8 md:h-10 bg-blue-600 rounded-full" />
                  <h3 className={`text-xl md:text-2xl font-black ${isDark ? 'text-white' : 'text-slate-900'} uppercase tracking-tighter`}>Lead Deployment</h3>
               </div>

               <AnimatePresence mode="wait">
                 {success ? (
                   <motion.div key="success" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-8 md:py-12">
                     <div className="w-20 h-20 md:w-24 md:h-24 bg-emerald-500/10 text-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6 md:mb-8 shadow-inner border border-emerald-500/20">
                       <CheckCircle2 className="w-10 h-10 md:w-12 md:h-12" />
                     </div>
                     <h4 className="text-xl md:text-2xl font-black mb-3 md:mb-4 uppercase tracking-tight">Deployment Active</h4>
                     <p className={`text-xs md:text-sm ${isDark ? 'text-slate-400' : 'text-slate-500'} font-bold italic leading-relaxed`}>"Our {branch.city} rapid-response team will contact you within the next 30 minutes."</p>
                     <button onClick={() => setSuccess(false)} className="mt-8 md:mt-10 text-blue-600 font-black uppercase tracking-widest text-[9px] md:text-[10px] underline decoration-blue-500/30 underline-offset-8 hover:decoration-blue-500 transition-all">Submit Fresh Acquisition</button>
                   </motion.div>
                 ) : (
                  <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
                    <InputField label="Candidate Name" value={formData.fullName} onChange={v => setFormData({...formData, fullName: v})} isDark={isDark} />
                    <InputField label="Mobile Protocol" value={formData.mobile} onChange={v => setFormData({...formData, mobile: v.replace(/\D/g, '').slice(0,10)})} type="tel" isDark={isDark} />
                    
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Asset Preference</label>
                      <div className="relative">
                        <select 
                          className={`w-full px-5 md:px-6 py-3.5 md:py-4 ${isDark ? 'bg-[#111827] border-white/5 text-white' : 'bg-slate-50 border-slate-100 text-slate-700'} rounded-2xl md:rounded-[24px] border-2 outline-none focus:border-blue-600 font-black text-xs md:text-sm appearance-none transition-all cursor-pointer shadow-inner`}
                          value={formData.loanType}
                          onChange={e => setFormData({...formData, loanType: e.target.value})}
                        >
                          <option value="msme_structured">MSME Structured Product</option>
                          <option value="lap">Loan Against Property (LAP)</option>
                          <option value="home_loan">Housing Loan</option>
                          <option value="supply_chain">Supply Chain Finance</option>
                        </select>
                        <div className="absolute right-5 md:right-6 top-1/2 -translate-y-1/2 pointer-events-none opacity-40">
                           <ChevronDown className="w-5 h-5 text-blue-500" />
                        </div>
                      </div>
                    </div>

                    <button type="submit" className="w-full bg-blue-600 text-white py-5 md:py-6 rounded-2xl md:rounded-[28px] font-black uppercase tracking-[0.2em] shadow-2xl shadow-blue-600/30 flex items-center justify-center gap-3 group transition-all active:scale-95 text-[10px] md:text-xs">
                      Initialize Onboarding <ChevronRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
                    </button>
                    
                    <div className={`${isDark ? 'bg-white/5 border-white/5' : 'bg-blue-50 border-blue-100'} p-4 md:p-5 rounded-2xl md:rounded-[24px] border flex gap-3 md:gap-4 items-start`}>
                        <Sparkles className="w-4 h-4 md:w-5 md:h-5 text-blue-500 shrink-0" />
                        <p className={`text-[9px] md:text-[10px] ${isDark ? 'text-slate-400' : 'text-slate-600'} font-bold italic leading-relaxed`}>
                           This lead is high-priority and will be directly assigned to our {branch.city} branch Relationship Governance officer.
                        </p>
                    </div>
                  </form>
                 )}
               </AnimatePresence>
            </motion.div>
          </div>

        </div>
      </div>
    </div>
  );
};

const InfoItem = ({ icon, label, value, subValue, isDark, isLarge }) => (
  <div className="flex gap-4 md:gap-6 group">
    <div className={`w-12 h-12 md:w-16 md:h-16 ${isDark ? 'bg-white/5 border-white/10 text-blue-400' : 'bg-blue-50 border-blue-100 text-blue-600'} rounded-2xl md:rounded-[24px] flex items-center justify-center border shrink-0 transition-transform group-hover:scale-110 group-hover:rotate-6 shadow-lg shadow-black/5`}>
      {React.cloneElement(icon, { className: "w-5 h-5 md:w-7 md:h-7" })}
    </div>
    <div className="flex-1">
      <p className="text-[9px] md:text-[10px] text-slate-500 font-black uppercase tracking-[0.2em] md:tracking-[0.25em] mb-1 md:mb-2">{label}</p>
      <p className={`${isLarge ? 'text-xl md:text-2xl font-black' : 'text-sm md:text-lg font-bold'} ${isDark ? 'text-white' : 'text-slate-800'} leading-tight md:leading-snug tracking-tight`}>{value}</p>
      {subValue && <p className="text-[9px] md:text-[10px] text-slate-500 font-black uppercase tracking-widest mt-1 opacity-60 leading-tight">{subValue}</p>}
    </div>
  </div>
);

const InputField = ({ label, value, onChange, type = 'text', isDark }) => (
  <div className="space-y-2">
    <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">{label}</label>
    <input 
      required
      type={type}
      placeholder="Capture entry..."
      className={`w-full px-5 md:px-6 py-3.5 md:py-4 ${isDark ? 'bg-white/5 border-white/5 text-white' : 'bg-slate-50 border-slate-100 text-slate-900'} rounded-2xl md:rounded-[24px] border-2 outline-none focus:border-blue-600 font-black text-xs md:text-sm transition-all shadow-inner`}
      value={value}
      onChange={e => onChange(e.target.value)}
    />
  </div>
);

function UserCircle(props) {
  return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <circle cx="12" cy="10" r="3" />
      <path d="M7 20.662V19a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v1.662" />
    </svg>
  );
}

function ChevronDown(props) {
  return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="m6 9 6 6 6-6" />
    </svg>
  );
}

export default BranchDetails;
