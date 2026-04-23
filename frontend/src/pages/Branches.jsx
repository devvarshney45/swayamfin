import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, Navigation2, Globe, Activity, Shield, Zap, ChevronRight, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import { useTranslation } from 'react-i18next';

const Branches = () => {
  const { isDark } = useTheme();
  const { t } = useTranslation();

  const branches = [
    {
      city: "Agra Hub",
      slug: "agra",
      address: "12/45, Sanjay Place, Agra, UP - 282002",
      phone: "+91 87009 65594",
      email: "agra@swayamfin.com",
      map: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3549.0!2d78.0!3d27.18!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjfCsDEwJzQ4LjAiTiA3OMKwMDAnMDAuMCJF!5e0!3m2!1sen!2sin!4v1610000000000!5m2!1sen!2sin",
      code: "AGR-NOD-01"
    },
    {
      city: "Mathura Hub",
      slug: "mathura",
      address: "Near Holi Gate, Mathura, UP - 281001",
      phone: "+91 87009 65595",
      email: "mathura@swayamfin.com",
      map: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3532.5!2d77.67!3d27.5!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjfCsDMwJzAwLjAiTiA3N8KwNDAnMTIuMCJF!5e0!3m2!1sen!2sin!4v1610000000000!5m2!1sen!2sin",
      code: "MTH-NOD-02"
    },
    {
      city: "Hathras Hub",
      slug: "hathras",
      address: "Main Market, Hathras, UP - 204101",
      phone: "+91 87009 65592",
      email: "hathras@swayamfin.com",
      map: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3525.0!2d78.0!3d27.6!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjfCsDM2JzAwLjAiTiA3OMKwMDAnMDAuMCJF!5e0!3m2!1sen!2sin!4v1610000000000!5m2!1sen!2sin",
      code: "HTH-NOD-03"
    },
    {
      city: "Kosi Hub",
      slug: "kosi",
      address: "G.T. Road, Kosi Kalan, UP - 281403",
      phone: "+91 87009 65592",
      email: "kosi@swayamfin.com",
      map: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3515.0!2d77.4!3d27.8!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjfCsDQ4JzAwLjAiTiA3N8KwMjQnMDAuMCJF!5e0!3m2!1sen!2sin!4v1610000000000!5m2!1sen!2sin",
      code: "KSI-NOD-04"
    }
  ];

  return (
    <div className={`${isDark ? 'bg-[#020617]' : 'bg-[#F8FAFC]'} min-h-screen pt-24 pb-24 md:pt-32 md:pb-40 font-dmsans transition-colors duration-500 overflow-x-hidden`}>
      
      {/* Background Accents */}
      <div className={`absolute top-0 right-0 w-[800px] h-[800px] ${isDark ? 'bg-blue-600/5' : 'bg-blue-500/5'} blur-[160px] rounded-full translate-x-1/2 -translate-y-1/2`} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 relative z-10">
        
        {/* Network Header */}
        <div className="text-center mb-12 md:mb-20 space-y-4">
           <motion.div 
             initial={{ opacity: 0, y: 10 }}
             animate={{ opacity: 1, y: 0 }}
             className={`inline-flex items-center gap-3 px-6 py-2.5 rounded-full ${isDark ? 'bg-white/5 border-white/5 shadow-inner' : 'bg-blue-600/10 border-blue-500/20 shadow-sm'} text-primary-gold text-[10px] font-black uppercase tracking-[0.4em] border`}
           >
             <Globe className="w-4 h-4" /> Regional Governance Network
           </motion.div>

           <motion.h1 
             initial={{ opacity: 0, y: 30 }}
             animate={{ opacity: 1, y: 0 }}
             className={`text-3xl sm:text-4xl md:text-6xl lg:text-8xl font-playfair font-black ${isDark ? 'text-white' : 'text-slate-900'} leading-tight tracking-tight uppercase`}
           >
             Strategic <br /> <span className="text-blue-600 italic">Presence</span>
           </motion.h1>

           <motion.p 
             initial={{ opacity: 0 }}
             animate={{ opacity: 1 }}
             transition={{ delay: 0.2 }}
             className={`${isDark ? 'text-slate-400' : 'text-slate-500'} text-lg md:text-2xl max-w-4xl mx-auto font-medium italic leading-relaxed`}
           >
             "Institutional-grade regional command centers designed for localized credit deployment and specialized financial orchestration."
           </motion.p>
        </div>

        <div className="space-y-16 md:space-y-24">
          {branches.map((branch, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className={`group ${isDark ? 'bg-[#0B1221] border-white/5 shadow-black' : 'bg-white border-slate-100 shadow-22xl shadow-slate-200/50'} rounded-[64px] md:rounded-[80px] border overflow-hidden flex flex-col lg:flex-row hover:border-blue-600/40 transition-all duration-700`}
            >
              <div className="lg:w-[45%] p-10 md:p-20 flex flex-col justify-center space-y-10">
                <div className="flex items-center justify-between">
                   <div className={`px-5 py-2 rounded-full ${isDark ? 'bg-white/5 text-blue-500' : 'bg-blue-600/10 text-blue-600'} text-[10px] font-black uppercase tracking-widest border border-current/10`}>
                      Node: {branch.code}
                   </div>
                   <Activity className="w-5 h-5 text-blue-600 opacity-40 group-hover:rotate-12 transition-transform" />
                </div>

                <h2 className={`text-3xl md:text-6xl font-playfair font-black ${isDark ? 'text-white' : 'text-[#020617]'} tracking-tighter uppercase leading-none`}>
                   {branch.city.split(' ')[0]} <br /> <span className="text-blue-600 italic">{branch.city.split(' ')[1]}</span>
                </h2>
                
                <div className="space-y-8">
                  <div className="flex gap-6 group/sub">
                    <div className={`w-12 h-12 ${isDark ? 'bg-white/2 text-blue-400' : 'bg-slate-50 text-blue-600'} rounded-2xl flex items-center justify-center shrink-0 border border-current/5 group-hover/sub:bg-blue-600 group-hover/sub:text-white transition-all`}>
                      <MapPin className="w-6 h-6" />
                    </div>
                    <p className={`text-sm md:text-lg ${isDark ? 'text-slate-400' : 'text-slate-500'} font-medium italic leading-relaxed`}>"{branch.address}"</p>
                  </div>
                  
                  <div className="flex gap-6 items-center group/sub">
                    <div className={`w-12 h-12 ${isDark ? 'bg-white/2 text-blue-400' : 'bg-slate-50 text-blue-600'} rounded-2xl flex items-center justify-center shrink-0 border border-current/5 group-hover/sub:bg-blue-600 group-hover/sub:text-white transition-all`}>
                      <Phone className="w-6 h-6" />
                    </div>
                    <p className={`text-lg md:text-2xl font-black ${isDark ? 'text-white' : 'text-[#020617]'} tracking-tight`}>{branch.phone}</p>
                  </div>
                </div>

                <div className="pt-8 flex flex-col sm:flex-row gap-6">
                   <Link to={`/branches/${branch.slug}`} className="bg-[#020617] text-white px-10 py-6 rounded-[28px] font-black uppercase tracking-[0.3em] text-[10px] shadow-22xl shadow-black/80 flex items-center justify-center gap-3 group/btn overflow-hidden relative">
                      <div className="absolute inset-0 bg-blue-600 translate-y-full group-hover/btn:translate-y-0 transition-transform duration-500" />
                      <span className="relative z-10 flex items-center gap-2">Hub Access <ChevronRight className="w-4 h-4 group-hover/btn:translate-x-1" /></span>
                   </Link>
                   <button className={`px-10 py-6 rounded-[28px] ${isDark ? 'bg-white/5 text-white' : 'bg-slate-100 text-slate-900'} font-black uppercase tracking-[0.3em] text-[10px] flex items-center justify-center gap-3 hover:bg-blue-600 hover:text-white transition-colors`}>
                      Directions <Navigation2 className="w-4 h-4" />
                   </button>
                </div>
              </div>

              <div className="lg:w-[55%] min-h-[400px] bg-[#020617]/5 relative">
                <iframe 
                  src={branch.map} 
                  className={`w-full h-full border-0 transition-all duration-1000 ${isDark ? 'grayscale invert opacity-30 contrast-125' : 'grayscale group-hover:grayscale-0'}`}
                  allowFullScreen="" 
                  loading="lazy"
                  title={`${branch.city} Map`}
                ></iframe>
                <div className="absolute inset-0 pointer-events-none shadow-inner" />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Global Digital CTA */}
        <motion.div 
           initial={{ opacity: 0, y: 60 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true }}
           className={`mt-40 ${isDark ? 'bg-primary-navy border-white/5' : 'bg-[#020617] border-white/5'} rounded-[64px] md:rounded-[100px] p-12 md:p-32 text-center text-white shadow-22xl relative overflow-hidden group`}
        >
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-600/10 blur-[140px] rounded-full translate-x-1/2 -translate-y-1/2 group-hover:scale-110 transition-transform duration-1000" />
          <div className="relative z-10 space-y-12">
             <div className="flex justify-center">
                <div className="w-20 h-20 bg-white/10 rounded-[32px] flex items-center justify-center border border-white/5 group-hover:rotate-12 transition-transform">
                   <Zap className="w-10 h-10 text-primary-gold" />
                </div>
             </div>
             <h2 className="text-4xl md:text-8xl font-playfair font-black tracking-tighter uppercase leading-none">Universal Digital <br /> <span className="text-blue-600 italic">Interface</span></h2>
             <p className="text-slate-400 text-lg md:text-2xl font-medium italic max-w-3xl mx-auto leading-relaxed">
                "Our virtual hub is synchronized 24/7. Execute your credit session globally with integrated digital document collection protocols."
             </p>
             <div className="pt-8 flex justify-center">
                <button className="bg-white text-[#020617] px-16 py-8 rounded-[36px] font-black uppercase tracking-[0.4em] text-[10px] shadow-22xl shadow-white/10 flex items-center gap-4 hover:scale-105 active:scale-95 transition-all">
                   Initialize Digital Onboarding <Sparkles className="w-5 h-5 text-blue-600" />
                </button>
             </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Branches;
