import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Phone, Mail, Clock, Calendar, CheckCircle2, ChevronRight, Building2, Sparkles, Navigation, ChevronDown, UserCircle, Shield, Zap, Globe, Activity } from 'lucide-react';
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
    code: 'AGR-NOD-01'
  },
  'mathura': {
    city: 'Mathura',
    address: 'Near Holi Gate, Mathura, UP - 281001',
    phone: '+91 87009 65595',
    email: 'mathura@swayamfin.com',
    map: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3532.5!2d77.67!3d27.5!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjfCsDMwJzAwLjAiTiA3N8KwNDAnMTIuMCJF!5e0!3m2!1sen!2sin!4v1610000000000!5m2!1sen!2sin',
    manager: 'Sudhanshu Shekhar',
    code: 'MTH-NOD-02'
  },
  'hathras': {
    city: 'Hathras',
    address: 'Main Market, Hathras, UP - 204101',
    phone: '+91 87009 65592',
    email: 'hathras@swayamfin.com',
    map: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3525.0!2d78.0!3d27.6!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjfCsDM2JzAwLjAiTiA3OMKwMDAnMDAuMCJF!5e0!3m2!1sen!2sin!4v1610000000000!5m2!1sen!2sin',
    manager: 'Madhu Priya Prasad',
    code: 'HTH-NOD-03'
  },
  'kosi': {
    city: 'Kosi',
    address: 'G.T. Road, Kosi Kalan, UP - 281403',
    phone: '+91 87009 65592',
    email: 'kosi@swayamfin.com',
    map: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3515.0!2d77.4!3d27.8!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjfCsDQ4JzAwLjAiTiA3N8KwMjQnMDAuMCJF!5e0!3m2!1sen!2sin!4v1610000000000!5m2!1sen!2sin',
    manager: 'Vikkrant Prasad',
    code: 'KSI-NOD-04'
  }
};

const BranchDetails = () => {
  const { slug } = useParams();
  const { isDark } = useTheme();
  const { t } = useTranslation();
  const branch = branchData[slug] || branchData['agra'];
  const [success, setSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '', mobile: '', loanType: 'msme_structured', city: branch.city
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await axios.post(`${import.meta.env.VITE_API_URL || 'http://localhost:5001'}/api/leads`, formData);
      setSuccess(true);
    } catch (err) {
      console.error('Lead submission failed');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={`${isDark ? 'bg-[#020617]' : 'bg-[#F8FAFC]'} min-h-screen pt-24 pb-24 md:pt-32 md:pb-36 font-dmsans transition-colors duration-500 relative overflow-x-hidden`}>
      
      {/* Dynamic Background Accents */}
      <div className={`absolute top-0 right-0 w-[800px] h-[800px] ${isDark ? 'bg-blue-600/5' : 'bg-blue-500/5'} blur-[160px] rounded-full translate-x-1/2 -translate-y-1/2`} />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 relative z-10">
        
        {/* Breadcrumb Protocol */}
        <nav className="flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.4em] opacity-40 mb-12">
            <Link to="/" className="hover:text-blue-600 transition-colors">Foundation</Link>
            <ChevronRight className="w-3 h-3" />
            <Link to="/branches" className="hover:text-blue-600 transition-colors">Network</Link>
            <ChevronRight className="w-3 h-3" />
            <span className="text-blue-600">{branch.city} Hub</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
          
          {/* Narrative Pillar */}
          <div className="lg:col-span-7 space-y-8">
            <motion.div 
              initial={{ opacity: 0, x: -40 }} 
              animate={{ opacity: 1, x: 0 }} 
              className={`${isDark ? 'bg-white/5 border-white/10' : 'bg-white border-slate-100 shadow-lg'} p-6 md:p-10 rounded-3xl border relative overflow-hidden group`}
            >
              <div className={`absolute top-0 right-0 w-64 h-64 ${isDark ? 'bg-blue-600/5' : 'bg-blue-500/5'} blur-[100px] rounded-full -mr-32 -mt-32 transition-transform duration-1000 group-hover:scale-150`} />
              
              <div className="flex justify-start mb-6">
                <div className={`inline-flex items-center gap-3 ${isDark ? 'bg-white/5 border-white/10 shadow-inner' : 'bg-blue-600/10 border-blue-500/20'} text-primary-gold px-6 py-2.5 rounded-full text-[10px] font-black uppercase tracking-[0.4em] border shadow-sm`}>
                  <Globe className="w-4 h-4" /> Regional Governance Node
                </div>
              </div>
              
              <h1 className={`text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-playfair font-black ${isDark ? 'text-white' : 'text-slate-900'} leading-tight tracking-tight mb-4`}>
                Swayamfin <br className="hidden md:block" /> <span className="text-blue-600 italic">{branch.city} Hub</span>
              </h1>
              
              <p className={`text-base md:text-lg ${isDark ? 'text-slate-400' : 'text-slate-500'} font-medium italic leading-relaxed mb-8 max-w-2xl`}>
                "Orchestrating regional economic liquidity through hyper-localized credit deployment and strategic financial consultancy."
              </p>

              <div className={`grid grid-cols-1 sm:grid-cols-2 gap-6 pt-6 border-t ${isDark ? 'border-white/5' : 'border-slate-100'}`}>
                <div className="space-y-12">
                  <InfoItem icon={<MapPin />} label="Geospatial Hub" value={branch.address} isDark={isDark} />
                  <InfoItem icon={<Phone />} label="Direct Interface" value={branch.phone} isDark={isDark} isLarge color="blue" />
                </div>

                <div className="space-y-12">
                   <InfoItem icon={<Clock />} label="Deployment Hours" value="0930 - 1830 IST" subValue="Mon - Sat Operational Cycle" isDark={isDark} />
                   <InfoItem icon={<Activity />} label="Operational Score" value="A+ Grade" subValue={`Node Code: ${branch.code}`} isDark={isDark} />
                </div>
              </div>
            </motion.div>

            {/* Strategic Mapping System */}
            <motion.div 
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              className={`h-[400px] md:h-[600px] ${isDark ? 'bg-[#0B1221] border-white/5' : 'bg-slate-200 border-slate-300'} rounded-[64px] md:rounded-[100px] overflow-hidden shadow-22xl border relative group`}
            >
               <div className="absolute top-8 left-8 z-20 flex items-center gap-4 bg-[#020617]/40 backdrop-blur-3xl px-6 py-3 rounded-full border border-white/10 text-[10px] font-black uppercase tracking-[0.3em] text-white shadow-22xl">
                  <Navigation className="w-4 h-4 text-blue-500" /> Live Position Telemetry
               </div>
               <iframe 
                src={branch.map} 
                className={`w-full h-full border-0 transition-all duration-1000 ${isDark ? 'grayscale invert opacity-30 brightness-150 contrast-125' : 'grayscale hover:grayscale-0'}`}
                allowFullScreen="" 
                loading="lazy"
                title={`${branch.city} Map`}
              ></iframe>
            </motion.div>
          </div>

          {/* Regional Onboarding Cockpit */}
          <div className="lg:col-span-5 lg:sticky lg:top-32 mt-12 lg:mt-0">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className={`${isDark ? 'bg-[#0B1221]/90 border-white/5 shadow-black' : 'bg-white border-slate-100 shadow-22xl shadow-slate-200/50'} p-10 md:p-14 rounded-[50px] md:rounded-[80px] border backdrop-blur-3xl relative overflow-hidden group`}
            >
               <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/5 blur-[100px] rounded-full -mr-32 -mt-32 transition-transform duration-1000 group-hover:scale-150" />
               
               <div className="relative z-10 space-y-10">
                 <div className="flex items-center gap-5 border-b border-white/5 pb-8">
                    <div className="w-16 h-16 bg-blue-600/10 text-blue-600 rounded-2xl flex items-center justify-center border border-blue-600/20 group-hover:rotate-12 transition-transform">
                       <Zap className="w-8 h-8" />
                    </div>
                    <div>
                      <h3 className={`text-2xl md:text-3xl font-black ${isDark ? 'text-white' : 'text-slate-900'} uppercase tracking-tighter`}>Hub Access</h3>
                      <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest opacity-60">Regional Capture Protocol</p>
                    </div>
                 </div>

                 <AnimatePresence mode="wait">
                   {success ? (
                     <motion.div key="success" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="text-center py-16">
                       <div className="w-24 h-24 bg-emerald-500/10 text-emerald-500 rounded-full flex items-center justify-center mx-auto mb-10 border border-emerald-500/20 shadow-inner">
                         <CheckCircle2 className="w-12 h-12" />
                       </div>
                       <h4 className="text-2xl font-black mb-4 uppercase tracking-tighter italic">Entry Processed</h4>
                       <p className={`text-[11px] md:text-xs ${isDark ? 'text-slate-400' : 'text-slate-500'} font-bold leading-relaxed max-w-[220px] mx-auto uppercase tracking-[0.2em]`}>Governance team for {branch.city} node will intercept shortly.</p>
                       <button onClick={() => setSuccess(false)} className="mt-12 text-blue-600 font-black uppercase tracking-[0.3em] text-[10px] hover:underline">New Node Request</button>
                     </motion.div>
                   ) : (
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <InputField label="Applicant Identity" placeholder="Full Legal Name" value={formData.fullName} onChange={v => setFormData({...formData, fullName: v})} isDark={isDark} />
                      <InputField label="Communication Node" placeholder="+91 XXXX XXXX" value={formData.mobile} onChange={v => setFormData({...formData, mobile: v.replace(/\D/g, '').slice(0,10)})} type="tel" isDark={isDark} />
                      
                      <div className="space-y-2">
                        <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1 opacity-60">Strategic Asset Class</label>
                        <div className="relative group/sel">
                          <select 
                            className={`w-full px-7 py-5 ${isDark ? 'bg-white/2 border-white/5 text-white' : 'bg-slate-50 border-slate-100 text-slate-900'} rounded-3xl border-2 outline-none focus:border-blue-600 font-black text-xs appearance-none transition-all cursor-pointer shadow-inner`}
                            value={formData.loanType}
                            onChange={e => setFormData({...formData, loanType: e.target.value})}
                          >
                            <option value="msme_structured">MSME Structured Credit</option>
                            <option value="lap">Liquidity Against Property</option>
                            <option value="home_loan">Mortgage Optimization</option>
                            <option value="supply_chain">Chain Liquidity Control</option>
                          </select>
                          <div className="absolute right-6 top-1/2 -translate-y-1/2 pointer-events-none text-blue-500 opacity-40 group-hover/sel:opacity-100 transition-opacity">
                             <ChevronDown className="w-5 h-5" />
                          </div>
                        </div>
                      </div>

                      <div className="pt-6">
                        <button type="submit" disabled={isSubmitting} className="w-full bg-[#020617] text-white py-8 rounded-[36px] font-black uppercase tracking-[0.4em] text-[10px] shadow-22xl shadow-black/80 flex items-center justify-center gap-4 group/btn overflow-hidden relative active:scale-95 transition-all">
                          <div className="absolute inset-0 bg-blue-600 translate-y-full group-hover/btn:translate-y-0 transition-transform duration-500" />
                          <span className="relative z-10 flex items-center gap-3">
                             {isSubmitting ? 'Syncing...' : 'Initiate Session'} <Sparkles className="w-5 h-5 group-hover/btn:translate-x-2 transition-transform text-primary-gold" />
                          </span>
                        </button>
                      </div>
                      
                      <div className={`${isDark ? 'bg-white/2 border-white/5' : 'bg-blue-50/50 border-blue-100'} p-6 rounded-[32px] border flex gap-5 items-start ring-1 ring-blue-500/5`}>
                          <Shield className="w-5 h-5 text-blue-500 shrink-0 mt-0.5" />
                          <p className={`text-[10px] md:text-[11px] ${isDark ? 'text-slate-500' : 'text-slate-600'} font-black italic leading-relaxed uppercase tracking-wider`}>
                             Entry flags this lead as <span className="text-blue-600">Priority Delta</span> for the {branch.city} Regional Governance Center.
                          </p>
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

const InfoItem = ({ icon, label, value, subValue, isDark, isLarge, color }) => (
  <div className="flex gap-6 group">
    <div className={`w-14 h-14 md:w-20 md:h-20 ${isDark ? 'bg-white/2 border-white/5 text-blue-500 shadow-black' : 'bg-slate-50 border-slate-100 text-blue-600 shadow-xl shadow-slate-200/50'} rounded-[24px] md:rounded-[32px] flex items-center justify-center border shrink-0 transition-all group-hover:scale-110 group-hover:bg-blue-600 group-hover:text-white`}>
      {React.cloneElement(icon, { className: "w-6 h-6 md:w-10 md:h-10 transition-transform group-hover:rotate-12" })}
    </div>
    <div className="flex-1 space-y-1">
      <p className="text-[10px] text-slate-500 font-black uppercase tracking-[0.3em] mb-2">{label}</p>
      <p className={`${isLarge ? 'text-xl md:text-3xl font-black' : 'text-sm md:text-lg font-bold'} ${isDark ? 'text-white' : 'text-[#020617]'} leading-tight tracking-tight`}>{value}</p>
      {subValue && <p className="text-[10px] text-blue-600 font-black uppercase tracking-[0.2em] mt-2 opacity-60 italic">{subValue}</p>}
    </div>
  </div>
);

const InputField = ({ label, placeholder, value, onChange, type = 'text', isDark }) => (
  <div className="space-y-2">
    <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest block ml-1 opacity-60">{label}</label>
    <input 
      required
      type={type}
      placeholder={placeholder}
      className={`w-full px-7 py-5 ${isDark ? 'bg-white/2 border-white/5 text-white shadow-black' : 'bg-slate-50 border-slate-100 text-[#020617] shadow-inner'} rounded-[28px] border-2 outline-none focus:border-blue-600 font-black text-xs transition-all`}
      value={value}
      onChange={e => onChange(e.target.value)}
    />
  </div>
);

export default BranchDetails;
