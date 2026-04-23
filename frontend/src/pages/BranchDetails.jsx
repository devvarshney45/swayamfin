import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  MapPin, Phone, Mail, Clock, Calendar, CheckCircle2, 
  ChevronRight, Building2, Sparkles, Navigation, 
  ChevronDown, UserCircle, Shield, Zap, Globe, 
  Activity, TrendingUp, Target, Radio, Fingerprint, Mail as MailIcon
} from 'lucide-react';
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
    code: 'AGR-NOD-01',
    rating: 'A+ Grade',
    velocity: '48H'
  },
  'mathura': {
    city: 'Mathura',
    address: 'Near Holi Gate, Mathura, UP - 281001',
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
    address: 'Main Market, Hathras, UP - 204101',
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
    address: 'G.T. Road, Kosi Kalan, UP - 281403',
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
  const { isDark } = useTheme();
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
    <div className={`${isDark ? 'bg-[#020617] text-white' : 'bg-[#F8FAFC] text-slate-900'} min-h-screen pt-32 pb-40 font-inter transition-colors duration-500 relative overflow-x-hidden`}>
      
      {/* Immersive Background Architecture */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className={`absolute top-0 right-0 w-[1000px] h-[1000px] ${isDark ? 'bg-blue-600/5' : 'bg-blue-500/5'} blur-[160px] rounded-full translate-x-1/2 -translate-y-1/2`} />
        <div className={`absolute bottom-0 left-0 w-[800px] h-[800px] ${isDark ? 'bg-indigo-600/5' : 'bg-indigo-500/5'} blur-[160px] rounded-full -translate-x-1/2 translate-y-1/2`} />
        <div className="absolute inset-0 opacity-[0.02]" style={{ backgroundImage: `radial-gradient(${isDark ? '#fff' : '#000'} 1px, transparent 1px)`, backgroundSize: '60px 60px' }} />
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
        
        {/* Dynamic Breadcrumb Protocol */}
        <nav className="flex items-center gap-4 text-[10px] font-black uppercase tracking-[0.4em] opacity-40 mb-16">
            <Link to="/" className="hover:text-blue-600 transition-all border-b border-transparent hover:border-blue-600">Foundation</Link>
            <div className="w-1 h-1 rounded-full bg-slate-500" />
            <Link to="/branches" className="hover:text-blue-600 transition-all border-b border-transparent hover:border-blue-600">Network</Link>
            <div className="w-1 h-1 rounded-full bg-blue-500" />
            <span className="text-blue-600">{branch.city} Node</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-stretch h-fit">
          
          {/* Narrative Pillar */}
          <div className="lg:col-span-7 space-y-12">
            <motion.div 
              initial={{ opacity: 0, x: -40 }} 
              animate={{ opacity: 1, x: 0 }} 
              className={`${isDark ? 'bg-[#0B1221]/80 border-white/10 shadow-3xl shadow-black/80' : 'bg-white border-slate-200 shadow-2xl shadow-slate-200/50'} p-10 md:p-14 lg:p-20 rounded-[60px] border relative overflow-hidden group backdrop-blur-3xl`}
            >
              <div className={`absolute top-0 right-0 w-80 h-80 ${isDark ? 'bg-blue-600/10' : 'bg-blue-500/10'} blur-[100px] rounded-full -mr-40 -mt-40 transition-transform duration-1000 group-hover:scale-150`} />
              
              <div className="flex justify-start mb-10">
                <div className={`inline-flex items-center gap-4 ${isDark ? 'bg-blue-500/10 border-blue-500/20 shadow-inner' : 'bg-blue-600/10 border-blue-600/10'} text-blue-500 px-6 py-3 rounded-full text-[10px] font-black uppercase tracking-[0.4em] border shadow-sm`}>
                  <Radio className="w-4 h-4 animate-pulse" /> Live Infrastructure Node
                </div>
              </div>
              
              <h1 className={`text-4xl sm:text-5xl md:text-7xl lg:text-9xl font-playfair font-black ${isDark ? 'text-white' : 'text-slate-900'} leading-[0.85] tracking-tighter mb-8 transition-all`}>
                Swayamfin <br className="hidden md:block" /> <span className="text-blue-600 italic">{branch.city} Hub.</span>
              </h1>
              
              <p className={`text-lg md:text-2xl ${isDark ? 'text-slate-400' : 'text-slate-500'} font-medium italic leading-relaxed mb-12 max-w-3xl border-l-4 border-blue-600/20 pl-8 ml-2`}>
                "Orchestrating regional economic liquidity through hyper-localized credit deployment and strategic financial consultancy."
              </p>
              
              <div className={`grid grid-cols-1 sm:grid-cols-2 gap-10 pt-10 border-t ${isDark ? 'border-white/5' : 'border-slate-100'}`}>
                <div className="space-y-12">
                  <InfoItem icon={<MapPin />} label="Geospatial Node" value={branch.address} isDark={isDark} />
                  <InfoItem icon={<Phone />} label="Interface Link" value={branch.phone} isDark={isDark} isLarge color="blue" />
                </div>

                <div className="space-y-12">
                   <InfoItem icon={<Clock />} label="Deployment Matrix" value="0930 - 1830 IST" subValue="Standard Operational Cycle" isDark={isDark} />
                   <InfoItem icon={<Activity />} label="Node Reliability" value={branch.rating} subValue={`System Code: ${branch.code}`} isDark={isDark} />
                </div>
              </div>
            </motion.div>

            {/* Strategic Mapping System */}
            <motion.div 
              initial={{ opacity: 0, y: 100 }}
              animate={{ opacity: 1, y: 0 }}
              className={`h-[400px] md:h-[650px] ${isDark ? 'bg-[#0B1221] border-white/5 shadow-3xl shadow-black/80' : 'bg-slate-200 border-slate-300'} rounded-[80px] md:rounded-[120px] overflow-hidden border relative group`}
            >
               <div className="absolute top-10 left-10 z-20 flex items-center gap-5 bg-[#020617]/60 backdrop-blur-3xl px-8 py-4 rounded-full border border-white/10 text-[10px] font-black uppercase tracking-[0.4em] text-white shadow-3xl">
                  <Navigation className="w-5 h-5 text-blue-500" /> Precise Satellite Telemetry
               </div>
               <iframe 
                src={branch.map} 
                className={`w-full h-full border-0 transition-all duration-1000 ${isDark ? 'grayscale invert opacity-30 brightness-150 contrast-125' : 'grayscale hover:grayscale-0'}`}
                allowFullScreen="" 
                loading="lazy"
                title={`${branch.city} Map`}
              ></iframe>
            </motion.div>

            {/* High-Velocity Metrics Grid */}
            <div className="grid grid-cols-2 gap-6 md:gap-10 pt-10">
                 <MetricCard icon={<TrendingUp />} value="85%" label="Systematic Approval Rate" color="blue" isDark={isDark} />
                 <MetricCard icon={<Zap />} value={branch.velocity} label="Operational Velocity" color="gold" isDark={isDark} />
            </div>
          </div>

          {/* Regional Onboarding Cockpit */}
          <div className="lg:col-span-5 mt-16 lg:mt-0">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className={`${isDark ? 'bg-[#0B1221]/90 border-white/5 shadow-3xl shadow-black' : 'bg-white border-slate-200 shadow-22xl shadow-slate-200/50'} p-10 md:p-16 lg:p-20 rounded-[80px] md:rounded-[100px] border backdrop-blur-[100px] relative overflow-hidden group h-full h-fit sticky top-32`}
            >
               <div className="absolute top-0 right-0 w-80 h-80 bg-blue-600/5 blur-[120px] rounded-full -mr-40 -mt-40 transition-transform duration-1000 group-hover:scale-150" />
               
               <div className="relative z-10 space-y-12">
                 <div className="flex flex-col gap-6 items-center text-center border-b border-white/5 pb-10">
                    <div className="w-24 h-24 bg-blue-600/10 text-blue-600 rounded-[32px] flex items-center justify-center border border-blue-600/20 group-hover:rotate-[15deg] transition-all shadow-3xl shadow-blue-600/10">
                       <Fingerprint className="w-12 h-12" />
                    </div>
                    <div>
                      <h3 className={`text-4xl lg:text-5xl font-black ${isDark ? 'text-white' : 'text-slate-900'} uppercase tracking-tight`}>Hub Access</h3>
                      <p className="text-[10px] text-slate-500 font-bold uppercase tracking-[0.4em] mt-4 opacity-60 italic">Regional Onboarding Matrix</p>
                    </div>
                 </div>

                 <AnimatePresence mode="wait">
                   {success ? (
                     <motion.div key="success" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center py-24">
                       <div className="w-32 h-32 bg-emerald-500/10 text-emerald-500 rounded-full flex items-center justify-center mx-auto mb-12 border border-emerald-500/20 shadow-3xl shadow-emerald-500/10">
                         <CheckCircle2 className="w-16 h-16" />
                       </div>
                       <h4 className="text-4xl font-black mb-6 uppercase tracking-tighter italic">Entry Processed</h4>
                       <p className={`text-sm md:text-base ${isDark ? 'text-slate-400' : 'text-slate-600'} font-bold leading-relaxed max-w-[320px] mx-auto uppercase tracking-[0.2em] italic`}>The {branch.city} Regional Governance team will intercept your session shortly.</p>
                       <button onClick={() => setSuccess(false)} className="mt-16 text-blue-600 font-black uppercase tracking-[0.4em] text-[10px] hover:underline transition-all">New Node Request</button>
                     </motion.div>
                   ) : (
                    <form onSubmit={handleSubmit} className="space-y-8">
                      <InputField label="Applicant Identity" placeholder="Full Legal Name" value={formData.fullName} onChange={v => setFormData({...formData, fullName: v})} isDark={isDark} />
                      <InputField label="Communication Node" placeholder="+91 XXXX XXXX" value={formData.mobile} onChange={v => setFormData({...formData, mobile: v.replace(/\D/g, '').slice(0,10)})} type="tel" isDark={isDark} />
                      
                      <div className="space-y-4">
                        <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.4em] ml-2 opacity-60">Strategic Asset Class</label>
                        <div className="relative group/sel">
                          <select 
                            className={`w-full px-8 py-6 ${isDark ? 'bg-white/5 border-white/10 text-white shadow-3xl shadow-black/40' : 'bg-slate-100 border-slate-200 text-slate-900 shadow-inner'} rounded-[32px] border-2 outline-none focus:border-blue-600 font-black text-sm appearance-none transition-all cursor-pointer`}
                            value={formData.loanType}
                            onChange={e => setFormData({...formData, loanType: e.target.value})}
                          >
                            <option value="msme_structured">MSME Structured Credit</option>
                            <option value="lap">Liquidity Against Property</option>
                            <option value="home_loan">Mortgage Optimization</option>
                            <option value="supply_chain">Chain Liquidity Control</option>
                          </select>
                          <div className="absolute right-8 top-1/2 -translate-y-1/2 pointer-events-none text-blue-500 opacity-40 group-hover/sel:opacity-100 transition-opacity">
                             <ChevronDown className="w-6 h-6" />
                          </div>
                        </div>
                      </div>

                      <div className="pt-10">
                        <button type="submit" disabled={isSubmitting} className="w-full bg-[#020617] text-white py-10 rounded-[40px] font-black uppercase tracking-[0.5em] text-[10px] shadow-3xl shadow-black/80 flex items-center justify-center gap-6 group/btn overflow-hidden relative active:scale-95 transition-all">
                          <div className="absolute inset-0 bg-blue-600 translate-y-full group-hover/btn:translate-y-0 transition-transform duration-500" />
                          <span className="relative z-10 flex items-center gap-3">
                             {isSubmitting ? 'Syncing...' : 'Initiate Session'} <Sparkles className="w-6 h-6 group-hover/btn:rotate-12 transition-transform text-white opacity-60" />
                          </span>
                        </button>
                      </div>
                      
                      <div className={`${isDark ? 'bg-blue-500/5 border-blue-500/10' : 'bg-blue-50/50 border-blue-100'} p-8 rounded-[48px] border flex gap-6 items-start shadow-3xl shadow-blue-600/5`}>
                          <Shield className="w-6 h-6 text-blue-500 shrink-0 mt-0.5" />
                          <p className={`text-[10px] md:text-[11px] ${isDark ? 'text-slate-500' : 'text-slate-600'} font-black italic leading-relaxed uppercase tracking-[0.2em]`}>
                             Session is flagged as <span className="text-blue-600">Priority Delta</span> for the {branch.city} Command Center.
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
  <div className="flex gap-8 group">
    <div className={`w-16 h-16 md:w-20 md:h-20 ${isDark ? 'bg-white/5 border-white/10 text-blue-500 shadow-3xl shadow-black' : 'bg-slate-50 border-slate-100 text-blue-600 shadow-2xl shadow-slate-200/50'} rounded-[32px] flex items-center justify-center border shrink-0 transition-all duration-500 group-hover:scale-110 group-hover:bg-blue-600 group-hover:text-white group-hover:rotate-[15deg]`}>
      {React.cloneElement(icon, { className: "w-8 h-8 md:w-10 md:h-10 transition-transform" })}
    </div>
    <div className="flex-1 space-y-2 mt-2">
      <p className="text-[10px] text-slate-500 font-black uppercase tracking-[0.4em] leading-none mb-1">{label}</p>
      <p className={`${isLarge ? 'text-2xl md:text-3xl font-black' : 'text-base md:text-lg font-bold'} ${isDark ? 'text-white' : 'text-[#020617]'} leading-tight tracking-tighter`}>{value}</p>
      {subValue && <p className="text-[10px] text-blue-600 font-black uppercase tracking-[0.3em] mt-3 opacity-60 italic">{subValue}</p>}
    </div>
  </div>
);

const MetricCard = ({ icon, value, label, color, isDark }) => (
  <div className={`p-8 md:p-12 rounded-[50px] ${isDark ? 'bg-[#0B1221]/80 border-white/10 shadow-3xl shadow-black/80' : 'bg-white border-slate-200 shadow-2xl'} border relative overflow-hidden group/chart cursor-default transition-transform hover:-translate-y-2`}>
    <div className={`absolute -right-6 -bottom-6 w-40 h-40 ${color === 'blue' ? 'bg-blue-600/10' : 'bg-primary-gold/10'} rounded-full blur-[60px] group-hover/chart:scale-150 transition-all duration-1000`} />
    <div className={`${color === 'blue' ? 'text-blue-600' : 'text-primary-gold'} mb-10`}>
       {React.cloneElement(icon, { className: "w-10 h-10" })}
    </div>
    <h4 className={`text-4xl md:text-6xl font-black ${isDark ? 'text-white' : 'text-slate-900'} mb-3 tracking-tighter leading-none`}>{value}</h4>
    <p className="text-[10px] text-slate-500 font-black uppercase tracking-[0.3em] leading-relaxed">{label.split(' ').map((w, i) => <span key={i}>{w}<br /></span>)}</p>
  </div>
);

const InputField = ({ label, placeholder, value, onChange, type = 'text', isDark }) => (
  <div className="space-y-4">
    <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.4em] block ml-2 opacity-60">{label}</label>
    <input 
      required
      type={type}
      placeholder={placeholder}
      className={`w-full px-8 py-6 ${isDark ? 'bg-white/5 border-white/10 text-white shadow-3xl shadow-black/40' : 'bg-slate-100 border-slate-200 text-[#020617] shadow-inner'} rounded-[32px] border-2 outline-none focus:border-blue-600 font-black text-sm transition-all focus:bg-transparent`}
      value={value}
      onChange={e => onChange(e.target.value)}
    />
  </div>
);

export default BranchDetails;
