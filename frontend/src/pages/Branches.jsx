import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  MapPin, Phone, Mail, Navigation2, Globe, Activity, 
  Shield, Zap, ChevronRight, Sparkles, Building2, 
  Target, BarChart3, Radio, Server, Fingerprint 
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import { useTranslation } from 'react-i18next';

const branches = [
  {
    city: "Agra Hub",
    slug: "agra",
    address: "12/45, Sanjay Place, Agra, UP - 282002",
    phone: "+91 87009 65594",
    email: "agra@swayamfin.com",
    map: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3549.0!2d78.0!3d27.18!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjfCsDEwJzQ4LjAiTiA3OMKwMDAnMDAuMCJF!5e0!3m2!1sen!2sin!4v1610000000000!5m2!1sen!2sin",
    code: "AGR-NOD-01",
    status: "Priority",
    coverage: "98%",
    latency: "12ms"
  },
  {
    city: "Mathura Hub",
    slug: "mathura",
    address: "Near Holi Gate, Mathura, UP - 281001",
    phone: "+91 87009 65595",
    email: "mathura@swayamfin.com",
    map: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3532.5!2d77.67!3d27.5!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjfCsDMwJzAwLjAiTiA3N8KwNDAnMTIuMCJF!5e0!3m2!1sen!2sin!4v1610000000000!5m2!1sen!2sin",
    code: "MTH-NOD-02",
    status: "Active",
    coverage: "95%",
    latency: "15ms"
  },
  {
    city: "Hathras Hub",
    slug: "hathras",
    address: "Main Market, Hathras, UP - 204101",
    phone: "+91 87009 65592",
    email: "hathras@swayamfin.com",
    map: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3525.0!2d78.0!3d27.6!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjfCsDM2JzAwLjAiTiA3OMKwMDAnMDAuMCJF!5e0!3m2!1sen!2sin!4v1610000000000!5m2!1sen!2sin",
    code: "HTH-NOD-03",
    status: "Strategic",
    coverage: "92%",
    latency: "18ms"
  },
  {
    city: "Kosi Hub",
    slug: "kosi",
    address: "G.T. Road, Kosi Kalan, UP - 281403",
    phone: "+91 87009 65592",
    email: "kosi@swayamfin.com",
    map: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3515.0!2d77.4!3d27.8!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjfCsDQ4JzAwLjAiTiA3N8KwMjQnMDAuMCJF!5e0!3m2!1sen!2sin!4v1610000000000!5m2!1sen!2sin",
    code: "KSI-NOD-04",
    status: "Operational",
    coverage: "90%",
    latency: "20ms"
  }
];

const Branches = () => {
  const { isDark } = useTheme();
  const [activeNode, setActiveNode] = useState(null);

  return (
    <div className={`${isDark ? 'bg-[#020617] text-white' : 'bg-[#F8FAFC] text-slate-900'} min-h-screen pt-32 pb-40 font-inter transition-colors duration-500 overflow-x-hidden relative`}>
      
      {/* Immersive Background Architecture */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className={`absolute top-0 left-1/4 w-[1000px] h-[1000px] ${isDark ? 'bg-blue-600/5' : 'bg-blue-500/5'} blur-[160px] rounded-full translate-y-[-50%]`} />
        <div className={`absolute bottom-0 right-1/4 w-[800px] h-[800px] ${isDark ? 'bg-indigo-600/5' : 'bg-indigo-500/5'} blur-[160px] rounded-full translate-y-[50%]`} />
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: `radial-gradient(${isDark ? '#fff' : '#000'} 1px, transparent 1px)`, backgroundSize: '40px 40px' }} />
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
        
        {/* Futuristic Network Header */}
        <div className="mb-24 md:mb-32 space-y-8">
           <motion.div 
             initial={{ opacity: 0, scale: 0.9 }}
             animate={{ opacity: 1, scale: 1 }}
             className={`inline-flex items-center gap-3 px-6 py-2.5 rounded-full ${isDark ? 'bg-blue-500/10 border-blue-500/20' : 'bg-blue-600/10 border-blue-600/10'} border backdrop-blur-md shadow-2xl shadow-blue-600/10`}
           >
             <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
             <span className="text-[10px] font-black uppercase tracking-[0.3em] text-blue-500">Live Infrastructure Matrix v2.0</span>
           </motion.div>

           <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-12">
              <div className="max-w-4xl space-y-4">
                 <motion.h1 
                   initial={{ opacity: 0, y: 30 }}
                   animate={{ opacity: 1, y: 0 }}
                   className={`text-4xl md:text-6xl font-playfair font-black leading-tight tracking-tight uppercase transition-all`}
                 >
                   Regional <br /> <span className="text-blue-600 italic">Network.</span>
                 </motion.h1>
                 <motion.p 
                   initial={{ opacity: 0 }}
                   animate={{ opacity: 1 }}
                   transition={{ delay: 0.2 }}
                   className={`${isDark ? 'text-slate-400' : 'text-slate-500'} text-base md:text-xl font-medium italic max-w-xl leading-relaxed border-l-4 border-blue-600/20 pl-6`}
                 >
                   "Integrating physical high-trust nodes with hyper-automated credit distribution for seamless regional financial governance."
                 </motion.p>
              </div>

              <div className="flex gap-4">
                 {[
                   { label: 'Active Nodes', val: '04' },
                   { label: 'Trust Grade', val: 'AAA' }
                 ].map((stat, i) => (
                   <div key={i} className={`p-6 rounded-[32px] ${isDark ? 'bg-white/2 border-white/5' : 'bg-white border-slate-100 shadow-xl'} border min-w-[140px] text-center`}>
                     <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest mb-2">{stat.label}</p>
                     <p className="text-3xl font-black tracking-tighter text-blue-600">{stat.val}</p>
                   </div>
                 ))}
              </div>
           </div>
        </div>

        {/* Global Infrastructure Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 md:gap-12">
          {branches.map((branch, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              onMouseEnter={() => setActiveNode(index)}
              onMouseLeave={() => setActiveNode(null)}
              className={`group relative perspective-1000`}
            >
              <div className={`relative h-full ${isDark ? 'bg-[#0B1120]/80 border-white/10 shadow-3xl shadow-black/80' : 'bg-white border-slate-200 shadow-2xl shadow-slate-200/50'} border rounded-[50px] p-10 md:p-14 transition-all duration-700 backdrop-blur-2xl group-hover:-translate-y-4 overflow-hidden`}>
                
                {/* Background Kinetic Elements */}
                <div className={`absolute top-0 right-0 w-64 h-64 ${isDark ? 'bg-blue-600/10' : 'bg-blue-50'} blur-[80px] rounded-full translate-x-1/2 -translate-y-1/2 transition-all duration-700 group-hover:scale-150`} />
                <div className="absolute top-10 right-10 flex items-center gap-3">
                   <div className="flex flex-col items-end">
                      <p className="text-[8px] font-black text-slate-500 uppercase tracking-widest leading-none mb-1">Status</p>
                      <p className="text-[10px] font-black text-blue-500 uppercase tracking-widest">{branch.status}</p>
                   </div>
                   <Radio className={`w-5 h-5 ${branch.status === 'Priority' ? 'text-blue-500' : 'text-slate-400'} animate-pulse`} />
                </div>

                <div className="relative z-10 space-y-10">
                  <div className="flex items-center gap-6">
                     <div className={`w-20 h-20 bg-blue-600/10 border-blue-600/20 text-blue-600 rounded-[28px] flex items-center justify-center border transition-all duration-500 group-hover:bg-blue-600 group-hover:text-white group-hover:rotate-[15deg] group-hover:scale-110 shadow-2xl shadow-blue-600/20`}>
                        <Server className="w-10 h-10" />
                     </div>
                     <div>
                        <p className="text-[10px] font-black text-slate-500 uppercase tracking-[0.3em] mb-1 leading-none">Regional Node</p>
                        <h2 className={`text-2xl md:text-3xl font-playfair font-black ${isDark ? 'text-white' : 'text-slate-900'} leading-none tracking-tight uppercase`}>
                           {branch.city.split(' ')[0]} <br /> <span className="text-blue-600 italic">{branch.city.split(' ')[1]}</span>
                        </h2>
                     </div>
                  </div>

                  <div className="grid grid-cols-2 gap-6 pt-6 border-t border-blue-600/5">
                     <div className="space-y-1">
                        <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest leading-none">Coverage Index</p>
                        <p className="text-xl font-black text-blue-600 tracking-tighter">{branch.coverage}</p>
                     </div>
                     <div className="space-y-1">
                        <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest leading-none">Node Latency</p>
                        <p className="text-xl font-black text-blue-600 tracking-tighter">{branch.latency}</p>
                     </div>
                  </div>

                  <div className="space-y-6">
                    <div className="flex gap-6 group/item">
                       <MapPin className="w-6 h-6 text-blue-600 shrink-0 group-hover/item:scale-125 transition-transform" />
                       <p className={`text-sm md:text-base ${isDark ? 'text-slate-400' : 'text-slate-500'} font-medium italic leading-relaxed`}>{branch.address}</p>
                    </div>
                    <div className="flex gap-6 items-center group/item">
                       <Phone className="w-6 h-6 text-blue-600 shrink-0 group-hover/item:scale-125 transition-transform" />
                       <p className={`text-2xl font-black ${isDark ? 'text-white' : 'text-slate-900'} tracking-tighter`}>{branch.phone}</p>
                    </div>
                  </div>

                  <div className="pt-6 flex flex-col sm:flex-row gap-4">
                     <Link to={`/branches/${branch.slug}`} className="flex-1 bg-[#020617] text-white px-8 py-5 rounded-3xl font-black uppercase tracking-[0.3em] text-[9px] shadow-3xl shadow-black/80 flex items-center justify-center gap-3 group/btn overflow-hidden relative active:scale-95 transition-all">
                        <div className="absolute inset-0 bg-blue-600 translate-y-full group-hover/btn:translate-y-0 transition-transform duration-500" />
                        <span className="relative z-10 flex items-center gap-2">Initiate Access <ChevronRight className="w-4 h-4 group-hover/btn:translate-x-2 transition-transform" /></span>
                     </Link>
                     <button className={`flex-1 px-8 py-5 rounded-3xl ${isDark ? 'bg-white/5 border-white/5 text-slate-400' : 'bg-slate-100 border-slate-200 text-slate-600'} border font-black uppercase tracking-[0.3em] text-[9px] flex items-center justify-center gap-3 hover:bg-blue-600 hover:text-white hover:border-blue-600 transition-all active:scale-95`}>
                        Telemetry <Navigation2 className="w-4 h-4" />
                     </button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Immersive Global Telemetry Section */}
        <motion.div 
           initial={{ opacity: 0, y: 100 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true }}
           className={`mt-40 ${isDark ? 'bg-blue-600/10 border-blue-500/10' : 'bg-[#0F172A] border-white/5'} rounded-[60px] md:rounded-[100px] border p-12 md:p-32 text-center relative overflow-hidden backdrop-blur-3xl group`}
        >
          <div className="absolute -top-40 -left-40 w-[600px] h-[600px] bg-blue-600/20 blur-[140px] rounded-full opacity-60 group-hover:scale-150 transition-transform duration-1000" />
          <div className="absolute -bottom-40 -right-40 w-[600px] h-[600px] bg-indigo-600/20 blur-[140px] rounded-full opacity-60 group-hover:scale-150 transition-transform duration-1000" />
          
          <div className="relative z-10 space-y-12">
             <div className="flex justify-center">
                <div className="w-24 h-24 bg-blue-600/20 border border-blue-500/30 rounded-[36px] flex items-center justify-center animate-bounce-slow shadow-3xl shadow-blue-600/20">
                   <Target className="w-12 h-12 text-blue-500" />
                </div>
             </div>
             
             <h2 className={`text-3xl md:text-6xl font-playfair font-black tracking-tighter uppercase leading-tight ${isDark ? 'text-white' : 'text-white'}`}>Omni-Channel <br /> <span className="text-blue-600 italic">Connectivity.</span></h2>
             
             <p className={`text-slate-400 text-base md:text-xl font-medium italic max-w-3xl mx-auto leading-relaxed`}>
                "Our regional nodes are synchronized with the central governance cloud. Access specialized credit sessions globally with zero protocol latency."
             </p>

             <div className="pt-12 flex flex-col sm:flex-row justify-center gap-6">
                <button className="bg-white text-[#020617] px-12 py-8 rounded-[40px] font-black uppercase tracking-[0.4em] text-[10px] shadow-3xl shadow-white/10 flex items-center justify-center gap-4 hover:scale-105 active:scale-95 transition-all">
                   Initialize Digital Protocol <Zap className="w-5 h-5 text-blue-600" />
                </button>
                <button className={`px-12 py-8 rounded-[40px] ${isDark ? 'bg-white/5 text-white border-white/10 shadow-3xl shadow-black/40' : 'bg-transparent text-white border-white/20'} border font-black uppercase tracking-[0.4em] text-[10px] flex items-center justify-center gap-4 hover:bg-white hover:text-[#020617] transition-all`}>
                   Audit Network Health <Globe className="w-5 h-5 text-blue-500" />
                </button>
             </div>

             <div className="pt-12 grid grid-cols-2 md:grid-cols-4 gap-8 border-t border-white/5 pt-16">
                {[
                  { icon: Activity, l: 'System Health', v: 'OPTIMAL' },
                  { icon: Building2, l: 'Nodes Active', v: '04' },
                  { icon: Fingerprint, l: 'Encryption', v: 'P-98' },
                  { icon: BarChart3, l: 'Flow Index', v: '99.9%' }
                ].map((m, i) => (
                  <div key={i} className="space-y-3">
                     <m.icon className="w-6 h-6 text-blue-500 mx-auto" />
                     <p className="text-[8px] font-black text-slate-500 uppercase tracking-widest">{m.l}</p>
                     <p className="text-sm font-black text-white tracking-widest">{m.v}</p>
                  </div>
                ))}
             </div>
          </div>
        </motion.div>

        {/* Satellite Map Visualization - Footer Anchor */}
        <div className="mt-32 text-center space-y-6">
           <div className="flex items-center justify-center gap-6 mb-12">
              <div className="h-px w-24 bg-gradient-to-r from-transparent to-blue-600/40" />
              <Globe className="w-8 h-8 text-blue-600 animate-spin-slow" />
              <div className="h-px w-24 bg-gradient-to-l from-transparent to-blue-600/40" />
           </div>
           <p className="text-[10px] font-black text-slate-500 uppercase tracking-[0.4em]">Integrated Governance Infrastructure</p>
           <h3 className={`text-2xl font-black uppercase tracking-tighter ${isDark ? 'text-white' : 'text-slate-900'}`}>© 2024 Swayamfin Global Operations</h3>
        </div>

      </div>
    </div>
  );
};

export default Branches;
