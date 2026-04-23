import React from 'react';
import { motion } from 'framer-motion';
import { 
  Building2, 
  ShieldCheck, 
  Users2, 
  Clock, 
  CheckCircle2,
  Gem,
  Award,
  Zap,
  Fingerprint,
  Cpu,
  Activity,
  Shield,
  Layers
} from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { useTranslation } from 'react-i18next';

const USPsSection = () => {
  const { isDark } = useTheme();
  const { t } = useTranslation();

  const highlights = [
    {
      title: 'Institutional Grade',
      desc: 'Orchestrating high-velocity credit protocols for India\'s tier-1 enterprise ecosystem.',
      icon: Award,
      color: 'blue'
    },
    {
      title: 'Strategic Security',
      desc: 'Validated RBI-compliant frameworks ensuring 256-bit encrypted asset protection.',
      icon: ShieldCheck,
      color: 'emerald'
    },
    {
      title: 'Identity Protocol',
      desc: 'Multi-layered biometric and digital node verification for rapid onboarding.',
      icon: Fingerprint,
      color: 'amber'
    },
    {
      title: 'Velocity Core',
      desc: 'High-precision capital deployment within 48-hour operational cycles.',
      icon: Clock,
      color: 'indigo'
    }
  ];

  return (
    <section className={`py-32 md:py-56 ${isDark ? 'bg-[#020617]' : 'bg-[#F8FAFC]'} relative overflow-hidden transition-colors duration-700`}>
      {/* Structural Background Architecture */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className={`absolute top-1/2 left-0 w-[800px] h-[800px] ${isDark ? 'bg-blue-600/5' : 'bg-blue-500/3'} blur-[180px] rounded-full -translate-x-1/2 -translate-y-1/2`} />
        <div className={`absolute bottom-0 right-0 w-[500px] h-[500px] ${isDark ? 'bg-primary-gold/5' : 'bg-primary-gold/2'} blur-[140px] rounded-full translate-x-1/4`} />
      </div>
      
      <div className="max-w-7xl mx-auto px-6 md:px-10 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-20 md:gap-32 items-center">
          
          {/* Brand Philosophy column - Senior Elevation */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-5 space-y-12 text-center lg:text-left"
          >
            <div className="flex justify-center lg:justify-start">
              <motion.div 
                whileHover={{ scale: 1.05 }}
                className="inline-flex items-center gap-4 px-8 py-3 rounded-full bg-blue-600/10 border border-blue-500/20 text-primary-gold text-[10px] font-black uppercase tracking-[0.5em] shadow-inner"
              >
                <Cpu className="w-5 h-5 animate-pulse" /> {t('usp_tag')}
              </motion.div>
            </div>
            
            <h2 className={`text-5xl md:text-9xl font-playfair font-black ${isDark ? 'text-white' : 'text-[#020617]'} leading-[0.85] tracking-tighter`}>
              Strategic <br />
              <span className="text-blue-600 italic"> Governance</span>
            </h2>
            
            <p className={`text-xl md:text-2xl ${isDark ? 'text-slate-400' : 'text-slate-500'} font-medium italic leading-relaxed max-w-xl mx-auto lg:mx-0 border-l-[6px] border-primary-gold/30 pl-8`}>
              "Orchestrating high-precision credit cycles for India's premier enterprise verticals."
            </p>

            <div className="grid grid-cols-1 gap-6 pt-8 font-dmsans">
               {[t('usp_check1'), t('usp_check2'), t('usp_check3')].map((item, i) => (
                 <motion.div 
                   key={i} 
                   initial={{ opacity: 0, x: -20 }}
                   whileInView={{ opacity: 1, x: 0 }}
                   transition={{ delay: 0.3 + (i * 0.1), duration: 0.8 }}
                   className={`flex items-center gap-6 ${isDark ? 'bg-white/2' : 'bg-white shadow-sm'} p-6 rounded-[32px] border border-white/5 hover:border-blue-600/30 transition-all duration-500 group cursor-default`}
                 >
                   <div className="w-12 h-12 bg-blue-600/10 text-blue-600 rounded-2xl flex items-center justify-center shrink-0 group-hover:bg-blue-600 group-hover:text-white transition-all duration-500">
                     <CheckCircle2 className="w-6 h-6" />
                   </div>
                   <span className={`${isDark ? 'text-slate-300' : 'text-[#020617]'} font-black text-[10px] md:text-sm uppercase tracking-[0.3em]`}>{item}</span>
                 </motion.div>
               ))}
            </div>
          </motion.div>

          {/* Pillars grid column - Protocol Matrix */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-8 md:gap-12">
            {highlights.map((usp, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9, y: 40 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 1, ease: [0.16, 1, 0.3, 1] }}
                className="group h-full"
              >
                <div className={`${isDark ? 'bg-[#0B1221]/40 border-white/5 shadow-22xl shadow-black/80' : 'bg-white border-slate-100 shadow-22xl shadow-slate-200/50'} h-full rounded-[64px] md:rounded-[80px] p-12 md:p-16 border transition-all duration-700 relative overflow-hidden group-hover:-translate-y-6`}>
                  
                  {/* High-Precision Light Dynamics */}
                  <div className={`absolute top-0 right-0 w-48 h-48 ${isDark ? `bg-${usp.color}-600/10` : `bg-${usp.color}-500/5`} blur-[70px] rounded-full -mr-24 -mt-24 group-hover:scale-175 transition-transform duration-1000`} />
                  <div className="absolute bottom-0 left-0 w-full h-1 bg-blue-600 scale-x-0 group-hover:scale-x-100 transition-transform duration-700 origin-left" />
                  
                  <div className={`w-16 h-16 md:w-20 md:h-20 ${isDark ? `bg-white/5 border-white/5 text-blue-600 shadow-22xl` : `bg-slate-50 border-slate-100 text-blue-600 shadow-inner`} rounded-[32px] md:rounded-[40px] flex items-center justify-center mb-12 border transition-all duration-700 transform group-hover:scale-110 group-hover:rotate-12`}>
                    <usp.icon className="w-8 h-8 md:w-10 md:h-10" />
                  </div>
                  
                  <h4 className={`text-2xl md:text-3xl font-black ${isDark ? 'text-white' : 'text-[#020617]'} mb-6 tracking-tighter uppercase leading-tight group-hover:text-blue-600 transition-colors duration-500 shrink-0`}>{usp.title}</h4>
                  <p className={`text-[12px] md:text-base ${isDark ? 'text-slate-400' : 'text-slate-600'} font-bold leading-relaxed opacity-80 italic`}>
                    {usp.desc}
                  </p>

                  <div className="mt-10 pt-10 border-t border-white/5 flex items-center justify-between">
                     <div className="flex gap-1.5">
                        {[1,2,3,4].map(i => <div key={i} className="w-10 h-2 bg-blue-600 rounded-full" style={{ opacity: i * 0.15 }} />)}
                     </div>
                     <Layers className="w-5 h-5 text-slate-500 opacity-20" />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
};

export default USPsSection;
