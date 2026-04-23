import React from 'react';
import { motion } from 'framer-motion';
import { 
  FileEdit, 
  ScanSearch, 
  Handshake, 
  Wallet2,
  ChevronRight,
  Zap,
  Activity,
  ShieldCheck,
  Cpu,
  Globe,
  Settings,
  Share2
} from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { useTranslation } from 'react-i18next';

const Timeline = () => {
  const { isDark } = useTheme();
  const { t } = useTranslation();
  
  const steps = [
    {
      title: 'Initialization',
      desc: 'Deploy identity protocols and credit baseline metrics via our secure Partner Uplink.',
      icon: Cpu,
      time: '05 Min',
      code: 'NODE-SYNC-01'
    },
    {
      title: 'Validation',
      desc: 'Multidimensional risk assessment and institutional data verification through AI-sync.',
      icon: ScanSearch,
      time: '24 Hours',
      code: 'VAL-PROC-02'
    },
    {
      title: 'Approval',
      desc: 'Final credit structure confirmation and regulatory sanction issuance via digital node.',
      icon: ShieldCheck,
      time: 'Instant',
      code: 'SANC-GEN-03'
    },
    {
      title: 'Deployment',
      desc: 'High-velocity liquidity transfer and capital lifecycle initialization in your account.',
      icon: Wallet2,
      time: '48 Hours',
      code: 'CAP-FLOW-04'
    }
  ];

  return (
    <section className={`py-32 md:py-56 ${isDark ? 'bg-[#020617]' : 'bg-white'} relative overflow-hidden transition-colors duration-700`}>
      {/* Background Institutional Grid Architecture */}
      <div className={`absolute inset-0 z-0 opacity-30 pointer-events-none ${isDark ? 'invert' : ''}`} 
           style={{ backgroundImage: 'radial-gradient(circle at 1.5px 1.5px, #475569 1px, transparent 0)', backgroundSize: '64px 64px' }} />
      <div className={`absolute top-0 right-0 w-[800px] h-[800px] ${isDark ? 'bg-blue-600/5' : 'bg-blue-500/3'} blur-[180px] rounded-full translate-x-1/2 -translate-y-1/2`} />
      
      <div className="max-w-7xl mx-auto px-6 md:px-10 relative z-10">
        
        {/* Execution Header Protocol */}
        <div className="text-center mb-32 md:mb-56">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className={`inline-flex items-center gap-4 px-8 py-3 rounded-full ${isDark ? 'bg-white/5 border-white/5 shadow-22xl shadow-blue-500/10' : 'bg-blue-600/10 border-blue-500/20'} text-primary-gold text-[10px] font-black uppercase tracking-[0.5em] mb-12 border`}
          >
            <Activity className="w-5 h-5 animate-pulse" /> {t('timeline_tag')}
          </motion.div>
          
          <h2 className={`text-5xl md:text-[10rem] font-playfair font-black ${isDark ? 'text-white' : 'text-[#020617]'} mb-12 leading-[0.85] tracking-tighter`}>
            Execution <br /> <span className="text-blue-600 italic"> Protocol</span>
          </h2>
          
          <p className={`text-xl md:text-3xl ${isDark ? 'text-slate-500' : 'text-slate-400'} font-medium italic max-w-3xl mx-auto leading-relaxed border-l-4 border-primary-gold/30 pl-10 font-dmsans`}>
            "Strategically engineered deployment cycles driving real-world capital velocity."
          </p>
        </div>

        {/* Protocol Sequence Matrix */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-16 md:gap-20 relative font-dmsans">
          
          {/* High-Precision SVG Connector System (Desktop) */}
          <div className="hidden md:block absolute top-[80px] left-[15%] right-[15%] h-[4px] bg-white/5 overflow-hidden rounded-full">
             <motion.div 
               initial={{ scaleX: 0 }} 
               whileInView={{ scaleX: 1 }} 
               transition={{ duration: 2.5, ease: [0.16, 1, 0.3, 1] }}
               className="h-full bg-blue-600 origin-left shadow-[0_0_20px_rgba(37,99,235,0.8)]" 
             />
          </div>

          {steps.map((step, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.2, duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
              className="relative z-10 group"
            >
              <div className="flex flex-col items-center text-center">
                
                {/* Protocol Node Housing */}
                <div className="relative mb-16">
                   <div 
                     className={`w-32 h-32 md:w-40 md:h-40 ${isDark ? 'bg-[#0F172A] border-white/5 shadow-22xl shadow-black' : 'bg-white border-slate-100 shadow-22xl shadow-slate-200/50'} backdrop-blur-[40px] border rounded-[48px] md:rounded-[56px] flex items-center justify-center text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-all duration-700 shadow-22xl group-hover:-translate-y-6 relative overflow-hidden group/node`}
                   >
                     {/* Internal Tech Pattern */}
                     <div className="absolute inset-0 opacity-[0.03] group-hover:opacity-10 transition-opacity">
                        <Share2 className="w-full h-full scale-150 rotate-45" />
                     </div>
                     <step.icon className="w-12 h-12 md:w-16 md:h-16 relative z-10 group-hover:scale-110 transition-transform duration-700" />
                   </div>
                   
                   {/* Sync State Indicators */}
                   <div className="absolute -top-4 -right-4 bg-[#020617] text-primary-gold text-[10px] font-black px-6 py-2.5 rounded-full shadow-22xl uppercase tracking-widest italic border-2 border-primary-gold/20 backdrop-blur-xl group-hover:border-primary-gold group-hover:scale-110 transition-all duration-700">
                      {step.time}
                   </div>
                   <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 bg-blue-600 text-white text-[8px] font-black px-4 py-1.5 rounded-full shadow-22xl uppercase tracking-[0.4em] opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-700">
                      Sync Active
                   </div>
                </div>

                {/* Content Precision Profile */}
                <div className="space-y-6">
                   <div className="flex flex-col items-center gap-2">
                      <span className={`text-[10px] font-black uppercase tracking-[0.5em] ${isDark ? 'text-slate-600' : 'text-slate-400'}`}>Protocol Node // {idx + 1}</span>
                      <div className="w-12 h-1 bg-blue-600/20 rounded-full overflow-hidden">
                         <div className="w-1/3 h-full bg-blue-600 group-hover:w-full transition-all duration-1000" />
                      </div>
                   </div>
                   <h4 className={`${isDark ? 'text-white' : 'text-[#020617]'} font-playfair font-black text-2xl md:text-3xl tracking-tighter uppercase leading-none group-hover:text-blue-600 transition-colors duration-500`}>{step.title}</h4>
                   <p className={`${isDark ? 'text-slate-500' : 'text-slate-600'} text-[12px] md:text-[14px] font-bold leading-relaxed px-2 md:px-6 italic opacity-80 group-hover:opacity-100 transition-opacity duration-500`}>
                      "{step.desc}"
                   </p>
                   <div className="flex justify-center pt-4">
                      <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest border border-white/5 px-3 py-1 rounded-md opacity-30 group-hover:opacity-100 transition-opacity">{step.code}</span>
                   </div>
                </div>
                
                {idx !== steps.length - 1 && (
                  <div className="md:hidden flex justify-center py-16 opacity-20 animate-bounce">
                     <ChevronRight className="w-10 h-10 rotate-90 text-blue-600" />
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Global Sequence Summary */}
        <motion.div 
           initial={{ opacity: 0 }}
           whileInView={{ opacity: 1 }}
           className="mt-32 md:mt-56 text-center border-t border-white/5 pt-16"
        >
           <p className="text-slate-500 text-[10px] font-black uppercase tracking-[0.8em] opacity-40">End-to-End Operational Integrity Verified</p>
        </motion.div>
      </div>
    </section>
  );
};

export default Timeline;
