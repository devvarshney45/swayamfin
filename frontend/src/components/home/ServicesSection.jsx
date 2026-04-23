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
  ArrowRight
} from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';

const ServicesSection = () => {
  const { isDark } = useTheme();
  const { t } = useTranslation();

  const services = [
    { name: t('home_loan'), slug: 'housing-loans', icon: Home, color: 'blue', desc: t('service_desc_home') },
    { name: t('lap'), slug: 'lap', icon: Building2, color: 'indigo', desc: t('service_desc_lap') },
    { name: t('msme_loan'), slug: 'msme-loans', icon: Briefcase, color: 'emerald', desc: t('service_desc_msme') },
    { name: t('micro_lap'), slug: 'micro-lap', icon: MapPin, color: 'amber', desc: t('service_desc_mlap') },
    { name: t('hybrid_msme'), slug: 'hybrid-msme', icon: Globe, color: 'purple', desc: t('service_desc_hybrid') },
    { name: t('supply_chain'), slug: 'supply-chain', icon: Truck, color: 'rose', desc: t('service_desc_sc') },
    { name: t('unsecured_msme'), slug: 'unsecured-msme', icon: ShieldCheck, color: 'cyan', desc: t('service_desc_umsme') },
    { name: t('machinery_loan'), slug: 'machinery-loan', icon: AreaChart, color: 'teal', desc: t('service_desc_mach') },
  ];

  return (
    <section className={`py-20 md:py-32 relative overflow-hidden ${isDark ? 'bg-[#020617]' : 'bg-[#F8FAFC]'} transition-colors duration-300`}>
      {/* Background Accents - Optimized for Mobile */}
      <div className={`absolute top-0 right-0 w-[300px] md:w-[600px] h-[300px] md:h-[600px] ${isDark ? 'bg-blue-600/5' : 'bg-blue-500/5'} blur-[60px] md:blur-[120px] rounded-full translate-x-1/2 -translate-y-1/2`} />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center mb-16 md:mb-24">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className={`inline-flex items-center gap-2 px-6 py-2 rounded-full ${isDark ? 'bg-white/5 border-white/10' : 'bg-slate-100 border-slate-200'} border text-primary-gold text-[9px] md:text-[10px] font-black uppercase tracking-[0.3em] mb-6 shadow-sm`}
          >
            <Sparkles className="w-3 h-3" /> {t('services_tag')}
          </motion.div>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className={`text-4xl md:text-7xl font-playfair font-black ${isDark ? 'text-white' : 'text-slate-900'} leading-tight tracking-tighter`}
          >
            Swayamfin <span className="text-blue-600 italic">Edge</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className={`mt-6 text-lg md:text-xl ${isDark ? 'text-slate-400' : 'text-slate-600'} max-w-3xl mx-auto font-medium leading-relaxed italic`}
          >
            {t('services_main_desc')}
          </motion.p>
        </div>

        {/* Services Grid - Premium Card Design */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
              whileHover={{ y: -10 }}
              className="relative group"
            >
              <Link to={`/services/${service.slug}`} className="block h-full">
                <div className={`${isDark ? 'bg-white/5 border-white/5 hover:bg-white/10 shadow-black shadow-2xl' : 'bg-white border-slate-200 shadow-xl shadow-slate-200/50 hover:border-blue-300'} h-full rounded-[32px] md:rounded-[48px] p-8 md:p-10 border transition-all duration-300 relative overflow-hidden group/card`}>
                  
                  {/* Glowing Background Effect */}
                  <div className={`absolute top-0 right-0 w-32 h-32 ${isDark ? `bg-${service.color}-500/10` : `bg-${service.color}-500/5`} blur-3xl rounded-full -mr-16 -mt-16 group-hover/card:scale-150 transition-transform duration-700`} />
                  
                  <div className={`w-12 h-12 md:w-16 md:h-16 ${isDark ? `bg-${service.color}-500/10 text-${service.color}-400 border-${service.color}-500/20` : `bg-${service.color}-50 text-${service.color}-600 border-${service.color}-100 shadow-inner`} rounded-2xl md:rounded-[24px] flex items-center justify-center mb-6 md:mb-8 border transition-all group-hover/card:scale-110 group-hover/card:rotate-3 shadow-lg`}>
                    <service.icon className="w-6 h-6 md:w-8 md:h-8" />
                  </div>
                  
                  <h3 className={`text-lg md:text-xl font-black ${isDark ? 'text-white' : 'text-slate-900'} mb-3 md:mb-4 tracking-tight leading-tight uppercase`}>
                    {service.name}
                  </h3>
                  
                  <p className={`${isDark ? 'text-slate-400' : 'text-slate-500'} text-[10px] md:text-xs font-bold leading-relaxed mb-8 md:mb-10 group-hover/card:text-slate-300 transition-colors`}>
                    {service.desc}
                  </p>

                  <div className="absolute bottom-8 md:bottom-10 right-8 md:right-10 flex items-center gap-2 text-blue-500 text-[9px] md:text-[10px] font-black uppercase tracking-widest opacity-0 group-hover/card:opacity-100 transition-all transform translate-x-4 group-hover/card:translate-x-0">
                    {t('explore')} <ChevronRight className="w-4 h-4" />
                  </div>

                  {/* Corner Accent */}
                  <div className={`absolute -bottom-1 -right-1 w-12 h-12 ${isDark ? `bg-${service.color}-500/5` : `bg-${service.color}-500/3`} rounded-tl-[32px] md:rounded-tl-[40px] transition-all group-hover/card:w-20 group-hover/card:h-20`} />
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Global Hub CTA */}
        <div className="mt-16 md:mt-32 text-center">
           <Link 
             to="/process"
             className={`inline-flex items-center gap-4 md:gap-6 p-2 md:pr-10 ${isDark ? 'bg-white/5 border-white/10' : 'bg-white border-slate-200 shadow-xl shadow-slate-200/50'} rounded-3xl md:rounded-full border group hover:border-blue-500 transition-all`}
           >
              <div className="bg-blue-600 p-3 md:p-4 rounded-2xl md:rounded-full text-white shadow-lg">
                 <AreaChart className="w-5 h-5 md:w-6 md:h-6" />
              </div>
              <div className="text-left py-2 pr-4 md:pr-0">
                 <p className={`text-[9px] md:text-[11px] font-black uppercase tracking-[0.2em] md:tracking-[0.3em] ${isDark ? 'text-slate-500' : 'text-slate-500'} leading-none mb-1`}>{t('cta_ready')}</p>
                 <p className={`text-[10px] md:text-sm font-black ${isDark ? 'text-white' : 'text-slate-900'} uppercase tracking-widest leading-tight`}>{t('cta_calc')} <ArrowRight className="w-3 md:w-4 h-3 md:h-4 inline-block ml-1 md:ml-2 group-hover:translate-x-2 transition-transform" /></p>
              </div>
           </Link>
        </div>

      </div>
    </section>
  );
};

export default ServicesSection;
