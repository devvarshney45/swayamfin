import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { 
  Building2, 
  Home, 
  Briefcase, 
  MapPin, 
  Globe, 
  Truck, 
  ShieldCheck, 
  AreaChart, 
  ChevronRight,
  Sparkles,
  ArrowRight,
  Zap,
  Target,
  LayoutDashboard,
  Activity,
  Layers,
  ArrowUpRight
} from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';

const ServicesSection = () => {
  const { isDark } = useTheme();
  const { t } = useTranslation();

  const services = [
    { name: t('home_loan'), slug: 'housing-loans', icon: Home, color: 'blue', tag: 'Mortgage Protocol' },
    { name: t('lap'), slug: 'lap', icon: Building2, color: 'indigo', tag: 'Asset Liquidity' },
    { name: t('msme_loan'), slug: 'msme-loans', icon: Briefcase, color: 'emerald', tag: 'Enterprise Core' },
    { name: t('micro_lap'), slug: 'micro-lap', icon: MapPin, color: 'amber', tag: 'Regional Access' },
    { name: t('hybrid_msme'), slug: 'hybrid-msme', icon: Globe, color: 'purple', tag: 'Agile Credit' },
    { name: t('supply_chain'), slug: 'supply-chain', icon: Truck, color: 'rose', tag: 'Velocity Flow' },
    { name: t('unsecured_msme'), slug: 'unsecured-msme', icon: ShieldCheck, color: 'cyan', tag: 'Priority Node' },
    { name: t('machinery_loan'), slug: 'machinery-loan', icon: AreaChart, color: 'teal', tag: 'Industrial Opt' },
  ];

  return (
    <section className={`py-32 md:py-56 relative overflow-hidden ${isDark ? 'bg-[#020617]' : 'bg-[#F8FAFC]'}`}>
      
      {/* Institutional Background Architecture */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className={`absolute top-0 right-0 w-3/4 h-3/4 ${isDark ? 'bg-blue-600/5' : 'bg-blue-500/3'} blur-[160px] rounded-full translate-x-1/2 -translate-y-1/2`} />
        <div className={`absolute bottom-0 left-0 w-1/2 h-1/2 ${isDark ? 'bg-primary-gold/5' : 'bg-primary-gold/2'} blur-[140px] rounded-full -translate-x-1/2 translate-y-1/2`} />
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-[0.03] mix-blend-overlay" />
      </div>
      
      <div className="max-w-7xl mx-auto px-6 md:px-10 relative z-10">
        
        {/* Section Header - Advanced Institutional Alignment */}
        <div className="flex flex-col md:flex-row items-end justify-between gap-16 mb-24 md:mb-40">
          <div className="max-w-4xl space-y-10 text-center md:text-left mx-auto md:mx-0">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-4 px-6 py-3 rounded-full bg-blue-600/10 border border-blue-500/20 text-primary-gold text-[10px] font-black uppercase tracking-[0.5em] shadow-inner"
            >
              <Activity className="w-4 h-4" /> Credit Deployment Matrix
            </motion.div>
            <motion.h2 
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className={`text-6xl md:text-[10rem] font-playfair font-black ${isDark ? 'text-white' : 'text-[#020617]'} leading-[0.85] tracking-tighter`}
            >
              Strategic <br /> <span className="text-blue-600 italic">Portfolio</span>
            </motion.h2>
          </div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className={`hidden lg:flex flex-col items-end text-right space-y-6 pb-4`}
          >
             <p className={`text-xl ${isDark ? 'text-slate-400' : 'text-slate-500'} font-medium italic max-w-sm leading-relaxed`}>
                "Engineered for high-velocity liquidity across diversified financial verticals."
             </p>
             <div className="flex gap-1.5">
                {[1,2,3,4,5].map(i => <div key={i} className="w-12 h-2 bg-blue-600 rounded-full" style={{ opacity: i * 0.2 }} />)}
             </div>
          </motion.div>
        </div>

        {/* Services Grid - High-Precision Protocol Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ delay: index * 0.1, duration: 1, ease: [0.16, 1, 0.3, 1] }}
              className="group"
            >
              <Link to={`/service/${service.slug}`} className="block relative h-full">
                <div className={`${isDark ? 'bg-[#0B1221]/40 border-white/5 shadow-22xl shadow-black/60 hover:bg-[#0B1221]/80 hover:border-blue-600/30' : 'bg-white border-slate-100 shadow-22xl shadow-slate-200/30 hover:border-blue-400'} h-full rounded-[64px] md:rounded-[80px] p-12 md:p-16 border transition-all duration-700 relative overflow-hidden active:scale-[0.98]`}>
                  
                  {/* Dynamic Spectral Glow */}
                  <div className={`absolute top-0 right-0 w-56 h-56 ${isDark ? `bg-${service.color}-600/10` : `bg-${service.color}-500/5`} blur-[80px] rounded-full -mr-28 -mt-28 group-hover:scale-150 transition-transform duration-1000`} />
                  
                  <div className="relative z-10 flex flex-col h-full">
                    <div className="flex justify-between items-start mb-16">
                      <div className={`w-16 h-16 md:w-20 md:h-20 ${isDark ? `bg-white/5 border-white/5 text-slate-400` : `bg-slate-50 border-slate-100 text-slate-900 shadow-inner`} rounded-[32px] md:rounded-[40px] flex items-center justify-center border transition-all duration-700 transform group-hover:rotate-12 group-hover:scale-110`}>
                        <service.icon className="w-8 h-8 md:w-10 md:h-10 text-blue-600" />
                      </div>
                      <div className="flex flex-col items-end">
                         <span className={`text-[9px] font-black uppercase tracking-[0.4em] ${isDark ? 'text-slate-500' : 'text-slate-400'} opacity-60 mb-2`}>
                           {service.tag}
                         </span>
                         <div className="w-1.5 h-1.5 rounded-full bg-blue-600 animate-pulse opacity-0 group-hover:opacity-100 transition-opacity" />
                      </div>
                    </div>
                    
                    <h3 className={`text-2xl md:text-4xl font-black ${isDark ? 'text-white' : 'text-[#020617]'} mb-8 tracking-tighter leading-none uppercase group-hover:text-blue-600 transition-colors duration-500`}>
                      {service.name}
                    </h3>
                    
                    <div className="mt-auto flex items-center gap-4 text-blue-600">
                       <div className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-blue-600/10 flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-all duration-700 group-hover:scale-110 border border-blue-600/10">
                         <ChevronRight className="w-6 h-6" />
                       </div>
                       <span className="text-[10px] font-black uppercase tracking-[0.4em] opacity-0 group-hover:opacity-100 transform -translate-x-6 group-hover:translate-x-0 transition-all duration-700">Initialize Uplink</span>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Global Access Protocol - Institutional Terminal */}
        <div className="mt-32 md:mt-56">
          <motion.div 
            whileHover={{ scale: 1.01 }}
            transition={{ duration: 0.7 }}
            className={`relative p-16 md:p-32 rounded-[80px] md:rounded-[120px] border ${isDark ? 'bg-[#0B1221]/60 border-white/5 shadow-22xl shadow-black/80' : 'bg-[#020617] border-white/5 shadow-22xl shadow-black/40'} overflow-hidden group`}
          >
             <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-blue-600/20 blur-[150px] rounded-full translate-x-1/2 -translate-y-1/2" />
             <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-primary-gold/10 blur-[100px] rounded-full -translate-x-1/2 translate-y-1/2" />
             <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-[0.05] pointer-events-none" />
             
             <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-16">
                <div className="max-w-3xl text-center lg:text-left space-y-10">
                   <div className="flex items-center justify-center lg:justify-start gap-6">
                      <div className="flex items-center gap-3">
                         <Layers className="w-6 h-6 text-primary-gold" />
                         <span className="text-primary-gold text-[11px] font-black uppercase tracking-[0.5em]">System Protocols Active</span>
                      </div>
                      <div className="hidden md:flex gap-1.5">
                         {[1,2,3].map(i => <div key={i} className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" style={{ animationDelay: `${i * 0.2}s` }} />)}
                      </div>
                   </div>
                   <h2 className="text-4xl md:text-8xl font-playfair font-black text-white leading-[0.9] tracking-tighter">
                      Calculate Your Regional <br className="hidden md:block" /> <span className="text-blue-600 italic">Credit Velocity</span>
                   </h2>
                   <p className="text-slate-400 text-sm md:text-lg font-medium opacity-60 leading-relaxed max-w-xl mx-auto lg:mx-0">
                      Deploy our advanced computational engine to simulate asset scenarios and optimize your liquidity strategy in real-time.
                   </p>
                </div>
                
                <Link 
                  to="/process"
                  className="bg-white text-[#020617] px-16 py-10 rounded-[48px] font-black uppercase tracking-[0.5em] text-[11px] shadow-22xl hover:bg-blue-600 hover:text-white transition-all duration-700 group/btn border-4 border-transparent hover:border-white/20 relative overflow-hidden"
                >
                   <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-indigo-600 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-700" />
                   <span className="relative z-10 flex items-center justify-center gap-4">
                      Initialize High-Speed Access <ArrowUpRight className="w-6 h-6 group-hover/btn:rotate-45 transition-transform duration-700" />
                   </span>
                </Link>
             </div>
          </motion.div>
        </div>

      </div>
    </section>
  );
};

export default ServicesSection;
