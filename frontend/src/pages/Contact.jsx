import React from 'react';
import { motion } from 'framer-motion';
import { Phone, Mail, MapPin, Clock, MessageSquare, Send, Globe, Shield, Zap, Sparkles, Activity, ChevronRight } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { useTranslation } from 'react-i18next';

const Contact = () => {
  const { isDark } = useTheme();
  const { t } = useTranslation();

  return (
    <div className={`${isDark ? 'bg-[#020617]' : 'bg-[#F8FAFC]'} min-h-screen pt-24 pb-24 md:pt-32 md:pb-36 font-dmsans transition-colors duration-500 overflow-x-hidden`}>
      
      {/* Background Accents */}
      <div className={`absolute top-0 right-0 w-[800px] h-[800px] ${isDark ? 'bg-blue-600/5' : 'bg-blue-500/5'} blur-[160px] rounded-full translate-x-1/2 -translate-y-1/2`} />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 relative z-10">
        
        {/* Strategic Header */}
        <div className="text-center mb-12 md:mb-20 space-y-4">
           <motion.div 
             initial={{ opacity: 0, y: 10 }}
             animate={{ opacity: 1, y: 0 }}
             className={`inline-flex items-center gap-3 px-6 py-2.5 rounded-full ${isDark ? 'bg-white/5 border-white/5 shadow-inner' : 'bg-blue-600/10 border-blue-500/20 shadow-sm'} text-primary-gold text-[10px] font-black uppercase tracking-[0.4em] border`}
           >
             <Globe className="w-4 h-4" /> Global Liaison Office
           </motion.div>

           <motion.h1 
             initial={{ opacity: 0, y: 30 }}
             animate={{ opacity: 1, y: 0 }}
             className={`text-3xl sm:text-4xl md:text-6xl lg:text-8xl font-playfair font-black ${isDark ? 'text-white' : 'text-slate-900'} leading-tight tracking-tight uppercase`}
           >
             Strategic <br /> <span className="text-blue-600 italic">Communications</span>
           </motion.h1>

           <motion.p 
             initial={{ opacity: 0 }}
             animate={{ opacity: 1 }}
             transition={{ delay: 0.2 }}
             className={`${isDark ? 'text-slate-400' : 'text-slate-500'} text-lg md:text-2xl max-w-4xl mx-auto font-medium italic leading-relaxed`}
           >
             "Intercepting market requirements through specialized financial intelligence and multi-channel advisory protocol."
           </motion.p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 md:gap-24 items-start">
          
          {/* Intelligence Terminals */}
          <div className="lg:col-span-12 xl:col-span-7 space-y-12">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10">
              {[
                { icon: Phone, title: 'Voice Interface', detail: '+91 87009 65592', detail2: '011-44728117', color: 'blue' },
                { icon: Mail, title: 'Digital Uplink', detail: 'info@swayamfin.com', detail2: 'support@swayamfin.com', color: 'indigo' },
                { icon: MessageSquare, title: 'Rapid Query', detail: 'WhatsApp Protocol Active', detail2: '+91 87009 65592', color: 'emerald' },
                { icon: Clock, title: 'Operational Sync', detail: '0930 - 1830 IST', detail2: 'Mon - Sat Ops Cycle', color: 'amber' }
              ].map((item, i) => (
                <motion.div 
                  key={i} 
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className={`${isDark ? 'bg-[#0B1221] border-white/5' : 'bg-white border-slate-100 shadow-22xl shadow-slate-200/50'} p-10 rounded-[50px] border flex flex-col items-center text-center group hover:bg-blue-600 transition-all duration-700`}
                >
                  <div className={`w-16 h-16 ${isDark ? 'bg-white/5 text-blue-500' : 'bg-blue-50 text-blue-600'} rounded-2xl flex items-center justify-center mb-8 border border-white/5 group-hover:bg-white group-hover:rotate-12 transition-all`}>
                    <item.icon className="w-8 h-8" />
                  </div>
                  <h3 className={`font-playfair font-black ${isDark ? 'text-white' : 'text-slate-900'} text-xl md:text-2xl mb-4 group-hover:text-white transition-colors uppercase tracking-tight`}>{item.title}</h3>
                  <div className="space-y-1">
                     <p className={`text-[11px] md:text-xs ${isDark ? 'text-slate-400' : 'text-slate-600'} font-black uppercase tracking-widest group-hover:text-white/80 transition-colors`}>{item.detail}</p>
                     <p className={`text-[10px] ${isDark ? 'text-slate-500' : 'text-slate-400'} font-bold italic group-hover:text-white/60 transition-colors uppercase tracking-wider`}>{item.detail2}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Regional Command Center Card */}
            <motion.div 
               initial={{ opacity: 0, y: 40 }}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: true }}
               className={`${isDark ? 'bg-primary-navy border-white/5 shadow-black' : 'bg-[#020617] border-white/5 shadow-22xl shadow-black/80'} p-12 md:p-20 rounded-[64px] md:rounded-[80px] border shadow-22xl relative overflow-hidden group`}
            >
              <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/10 blur-[120px] rounded-full translate-x-1/2 -translate-y-1/2" />
              
              <div className="relative z-10 grid grid-cols-1 md:grid-cols-12 gap-12 items-center">
                <div className="md:col-span-7 space-y-10">
                  <div className="flex items-center gap-5">
                    <div className="w-16 h-16 bg-white/10 p-4 rounded-3xl border border-white/5 flex items-center justify-center">
                      <MapPin className="w-8 h-8 text-primary-gold" />
                    </div>
                    <h3 className="text-2xl md:text-4xl font-playfair font-black text-white uppercase tracking-tighter">Regional <br /> <span className="text-blue-600">Command</span></h3>
                  </div>
                  <p className="text-blue-100 text-lg md:text-xl leading-relaxed italic max-w-sm">
                    "619, Somdutt Chambers II, Bhikaji Cama, New Delhi – 110066"
                  </p>
                  <div className="flex gap-2">
                     {[1,2,3,4,5].map(i => <div key={i} className="w-10 h-1 bg-blue-600 rounded-full" style={{ opacity: i * 0.15 }} />)}
                  </div>
                </div>

                <div className="md:col-span-5">
                   <div className={`aspect-square ${isDark ? 'bg-black/40' : 'bg-white/5'} rounded-[48px] border border-white/5 flex flex-col items-center justify-center text-center p-8 group-hover:border-blue-600/30 transition-all`}>
                      <Activity className="w-10 h-10 text-blue-600 mb-6 group-hover:scale-125 transition-transform" />
                      <p className="text-[10px] font-black uppercase tracking-[0.4em] text-white/40 mb-2">Node Status</p>
                      <p className="text-white font-black text-xl uppercase tracking-tighter">Fully Operational</p>
                   </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Deployment Uplink Portal */}
          <div className="lg:col-span-12 xl:col-span-5 xl:sticky xl:top-32">
            <motion.div 
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className={`${isDark ? 'bg-[#0B1221]/90 border-white/5 shadow-black' : 'bg-white border-slate-100 shadow-22xl shadow-slate-200/50'} p-10 md:p-14 rounded-[50px] md:rounded-[80px] border backdrop-blur-3xl relative overflow-hidden group`}
            >
               <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/5 blur-[100px] rounded-full -mr-32 -mt-32 transition-transform duration-1000 group-hover:scale-150" />
               
               <div className="relative z-10 space-y-10">
                 <div className="flex items-center gap-5 border-b border-white/5 pb-8">
                    <div className="w-16 h-16 bg-blue-600/10 text-blue-600 rounded-2xl flex items-center justify-center border border-blue-600/20 group-hover:rotate-12 transition-transform">
                       <Zap className="w-8 h-8" />
                    </div>
                    <div>
                      <h3 className={`text-2xl md:text-3xl font-black ${isDark ? 'text-white' : 'text-slate-900'} uppercase tracking-tighter`}>Direct Uplink</h3>
                      <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest opacity-60">System Ready for Entry</p>
                    </div>
                 </div>

                 <form className="space-y-6">
                    <InputField label="Identity Protocol" placeholder="Full Legal Name" isDark={isDark} />
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                       <InputField label="Comm Node" placeholder="+91 XXXX" isDark={isDark} type="tel" />
                       <InputField label="Regional Node" placeholder="City" isDark={isDark} />
                    </div>

                    <div className="space-y-2">
                       <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1 opacity-60">Requirements Scope</label>
                       <textarea 
                         rows="4" 
                         className={`w-full px-7 py-5 ${isDark ? 'bg-white/2 border-white/5 text-white shadow-black' : 'bg-slate-50 border-slate-100 text-[#020617] shadow-inner'} rounded-[32px] border-2 outline-none focus:border-blue-600 font-black text-xs transition-all resize-none`} 
                         placeholder="Synthesize your request..."
                       ></textarea>
                    </div>

                    <div className="pt-6">
                       <button className="w-full bg-[#020617] text-white py-8 rounded-[36px] font-black uppercase tracking-[0.4em] text-[10px] shadow-22xl shadow-black/80 flex items-center justify-center gap-4 group/btn overflow-hidden relative active:scale-95 transition-all">
                          <div className="absolute inset-0 bg-blue-600 translate-y-full group-hover/btn:translate-y-0 transition-transform duration-500" />
                          <span className="relative z-10 flex items-center gap-3">
                             Initialize Transmission <Sparkles className="w-5 h-5 group-hover/btn:translate-x-2 transition-transform text-primary-gold" />
                          </span>
                       </button>
                    </div>

                    <div className={`${isDark ? 'bg-white/2 border-white/5' : 'bg-blue-50/50 border-blue-100'} p-6 rounded-[32px] border flex gap-5 items-start ring-1 ring-blue-500/5`}>
                        <Shield className="w-5 h-5 text-blue-500 shrink-0 mt-0.5" />
                        <p className={`text-[10px] md:text-[11px] ${isDark ? 'text-slate-500' : 'text-slate-600'} font-black italic leading-relaxed uppercase tracking-wider`}>
                           Secure 256-bit Institutional Encryption Active. Data handled via <span className="text-blue-600">Swayamfin Governance Protocol.</span>
                        </p>
                    </div>
                 </form>
               </div>
            </motion.div>
          </div>

        </div>
      </div>
    </div>
  );
};

const InputField = ({ label, placeholder, type = 'text', isDark }) => (
  <div className="space-y-2">
    <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest block ml-1 opacity-60">{label}</label>
    <input 
      required
      type={type}
      placeholder={placeholder}
      className={`w-full px-7 py-5 ${isDark ? 'bg-white/2 border-white/5 text-white shadow-black' : 'bg-slate-50 border-slate-100 text-[#020617] shadow-inner'} rounded-[32px] border-2 outline-none focus:border-blue-600 font-black text-xs transition-all`}
    />
  </div>
);

export default Contact;
