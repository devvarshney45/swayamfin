import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, MessageCircle, Sparkles, Zap, Shield, Globe, Activity, Layout, ArrowUpRight } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { useTranslation } from 'react-i18next';

const CTASection = () => {
  const { isDark } = useTheme();
  const { t } = useTranslation();
  
  return (
    <section className={`py-32 md:py-64 ${isDark ? 'bg-[#020617]' : 'bg-[#F8FAFC]'} px-6 relative z-20 transition-colors duration-700 overflow-hidden`}>
      <div className="max-w-7xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className={`${isDark ? 'bg-[#0B1221]/60 border-white/5 shadow-22xl shadow-black' : 'bg-[#020617] border-white/5 shadow-22xl shadow-black/80'} p-16 md:p-40 rounded-[80px] md:rounded-[140px] border relative overflow-hidden group`}
        >
          {/* Advanced Institutional Lighting Architecture */}
          <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-blue-600/20 blur-[180px] rounded-full translate-x-1/2 -translate-y-1/2 transition-all duration-1000 group-hover:bg-blue-600/30" />
          <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-primary-gold/10 blur-[150px] rounded-full -translate-x-1/2 translate-y-1/2" />
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-[0.05] pointer-events-none" />
          
          <div className="relative z-10 flex flex-col xl:flex-row items-center justify-between gap-24 md:gap-32">
            <div className="max-w-4xl text-center xl:text-left space-y-12 md:space-y-16">
              <div className="flex justify-center xl:justify-start">
                <motion.div 
                  whileHover={{ scale: 1.05 }}
                  className={`inline-flex items-center gap-4 px-8 py-3 rounded-full ${isDark ? 'bg-white/5 border-white/10' : 'bg-blue-600/10 border-blue-500/20'} text-primary-gold text-[10px] font-black uppercase tracking-[0.5em] shadow-inner border`}
                >
                   <Zap className="w-5 h-5 animate-pulse" /> {t('cta_tag')}
                </motion.div>
              </div>
              
              <h2 className={`text-6xl md:text-[10rem] font-playfair font-black text-white leading-[0.85] tracking-tighter`}>
                 Institutional <br /> <span className="text-blue-600 italic">Access Ready.</span>
              </h2>
              
              <p className={`font-bold text-xl md:text-3xl uppercase tracking-[0.3em] leading-relaxed text-slate-400 italic max-w-2xl mx-auto xl:mx-0 opacity-60`}>
                 "{t('cta_desc')}"
              </p>
              
              <div className="flex flex-wrap justify-center xl:justify-start gap-4 md:gap-6">
                 {['Agra Hub', 'Mathura Node', 'Hathras Region', 'Kosi Sector'].map((city, idx) => (
                   <motion.div 
                     key={city} 
                     initial={{ opacity: 0, y: 10 }}
                     whileInView={{ opacity: 1, y: 0 }}
                     transition={{ delay: idx * 0.1 }}
                     className={`px-8 py-4 ${isDark ? 'bg-white/2 border-white/5 text-slate-400' : 'bg-white/5 border-white/10 text-slate-400'} rounded-[24px] border text-[10px] md:text-[12px] font-black uppercase tracking-[0.4em] flex items-center gap-3`}
                   >
                     <div className="w-1.5 h-1.5 rounded-full bg-blue-600 animate-pulse" />
                     {city}
                   </motion.div>
                 ))}
              </div>
            </div>

            <div className="flex flex-col gap-8 w-full xl:w-auto min-w-[380px] font-dmsans">
              <motion.button 
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                className="w-full bg-white text-[#020617] px-16 py-12 rounded-[50px] font-black uppercase tracking-[0.5em] text-[12px] shadow-22xl shadow-black/80 flex items-center justify-center gap-6 group/btn overflow-hidden relative border-4 border-transparent hover:border-white/20 transition-all duration-700"
              >
                <div className="absolute inset-0 bg-blue-600 translate-y-full group-hover/btn:translate-y-0 transition-transform duration-700" />
                <span className="relative z-10 flex items-center gap-4">
                   Initialize Deployment <ArrowRight className="w-7 h-7 text-[#020617] group-hover:text-white group-hover/btn:translate-x-3 transition-all duration-700" />
                </span>
              </motion.button>
              
              <motion.a 
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                href="https://wa.me/916397003690"
                className={`w-full px-16 py-10 bg-white/5 text-white border-white/10 font-black rounded-[48px] border backdrop-blur-[40px] transition-all duration-700 text-[12px] uppercase tracking-[0.4em] flex items-center justify-center gap-6 group/btn2 hover:bg-white/10`}
              >
                <div className="w-12 h-12 bg-emerald-500/10 rounded-full flex items-center justify-center group-hover/btn2:bg-emerald-500 group-hover/btn2:text-white transition-all duration-700">
                   <MessageCircle className="w-6 h-6 text-emerald-500 group-hover/btn2:text-white transition-colors" />
                </div>
                <span className="flex items-center gap-3">Direct Protocol <ArrowUpRight className="w-5 h-5 opacity-40 group-hover/btn2:opacity-100 group-hover/btn2:rotate-45 transition-all" /></span>
              </motion.a>

              <div className="flex flex-col items-center gap-6 pt-10 border-t border-white/5">
                 <div className="flex items-center gap-4 opacity-40">
                    <Shield className="w-5 h-5 text-blue-600" />
                    <span className="text-[10px] font-black uppercase tracking-[0.5em] text-slate-500 italic">Institutional Encryption Protocol Ready</span>
                 </div>
                 <div className="flex gap-2">
                    {[1,2,3,4,5,6].map(i => <div key={i} className="w-8 h-1 bg-blue-600/20 rounded-full" />)}
                 </div>
              </div>
            </div>
          </div>
        </motion.div>
        
        {/* Secondary Trust Signifier */}
        <div className="mt-20 text-center flex flex-col items-center gap-6 opacity-30">
           <p className="text-[10px] font-black uppercase tracking-[0.8em] text-slate-500">System Ready for Deployment Hub Sequencing</p>
           <Globe className="w-6 h-6 text-slate-500 animate-spin-slow" />
        </div>
      </div>
    </section>
  );
};

export default CTASection;
