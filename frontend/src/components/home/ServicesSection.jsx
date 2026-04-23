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
  Sparkles
} from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';

const ServicesSection = () => {
  const { isDark } = useTheme();
  const { t } = useTranslation();

  const services = [
    { name: t('home_loan'), slug: 'housing-loans', icon: Home, color: 'blue', desc: 'Secure your future with our flexible housing finance.' },
    { name: t('lap'), slug: 'lap', icon: Building2, color: 'indigo', desc: 'Unlock value from your assets with competitive rates.' },
    { name: t('msme_loan'), slug: 'msme-loans', icon: Briefcase, color: 'emerald', desc: 'Powering small businesses with structured credit.' },
    { name: t('micro_lap'), slug: 'micro-lap', icon: MapPin, color: 'amber', desc: 'Micro-funding against property for small needs.' },
    { name: t('hybrid_msme'), slug: 'hybrid-msme', icon: Globe, color: 'purple', desc: 'Innovative mixed products for diverse growth.' },
    { name: t('supply_chain'), slug: 'supply-chain', icon: Truck, color: 'rose', desc: 'Inventory and PO-based liquidity solutions.' },
    { name: t('unsecured_msme'), slug: 'unsecured-msme', icon: ShieldCheck, color: 'cyan', desc: 'Business funding without collateral requirements.' },
    { name: t('machinery_loan'), slug: 'machinery-loan', icon: AreaChart, color: 'teal', desc: 'Modern equipment financing for efficient production.' },
  ];

  return (
    <section className={`py-32 relative overflow-hidden ${isDark ? 'bg-[#020617]' : 'bg-[#F8FAFC]'} transition-colors duration-300`}>
      {/* Background Accents */}
      <div className={`absolute top-0 right-0 w-[600px] h-[600px] ${isDark ? 'bg-blue-600/5' : 'bg-blue-500/5'} blur-[120px] rounded-full translate-x-1/2 -translate-y-1/2`} />
      <div className={`absolute bottom-0 left-0 w-[600px] h-[600px] ${isDark ? 'bg-indigo-600/5' : 'bg-indigo-500/5'} blur-[120px] rounded-full -translate-x-1/2 translate-y-1/2`} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center mb-24">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className={`inline-flex items-center gap-2 px-6 py-2 rounded-full ${isDark ? 'bg-white/5 border-white/10' : 'bg-slate-100 border-slate-200'} border text-primary-gold text-[10px] font-black uppercase tracking-[0.3em] mb-6 shadow-sm`}
          >
            <Sparkles className="w-3 h-3" /> Premier Financial Suite
          </motion.div>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className={`text-5xl md:text-7xl font-playfair font-black ${isDark ? 'text-white' : 'text-slate-900'} leading-tight tracking-tighter`}
          >
            Swayamfin <span className="text-blue-600 italic">Edge</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className={`mt-6 text-xl ${isDark ? 'text-slate-400' : 'text-slate-600'} max-w-3xl mx-auto font-medium leading-relaxed italic`}
          >
            Tailored lending solutions designed to bridge the gap between your ambitions and financial reality.
          </motion.p>
        </div>

        {/* Services Grid - Premium Card Design */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
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
                <div className={`${isDark ? 'bg-white/5 border-white/5 hover:bg-white/10 shadow-black shadow-2xl' : 'bg-white border-slate-200 shadow-xl shadow-slate-200/50 hover:border-blue-300'} h-full rounded-[48px] p-10 border transition-all duration-300 relative overflow-hidden group/card`}>
                  
                  {/* Glowing Background Effect */}
                  <div className={`absolute top-0 right-0 w-32 h-32 ${isDark ? `bg-${service.color}-500/10` : `bg-${service.color}-500/5`} blur-3xl rounded-full -mr-16 -mt-16 group-hover/card:scale-150 transition-transform duration-700`} />
                  
                  <div className={`w-16 h-16 ${isDark ? `bg-${service.color}-500/10 text-${service.color}-400 border-${service.color}-500/20` : `bg-${service.color}-50 text-${service.color}-600 border-${service.color}-100 shadow-inner`} rounded-[24px] flex items-center justify-center mb-8 border transition-all group-hover/card:scale-110 group-hover/card:rotate-3 shadow-lg`}>
                    <service.icon className="w-8 h-8" />
                  </div>
                  
                  <h3 className={`text-xl font-black ${isDark ? 'text-white' : 'text-slate-900'} mb-4 tracking-tight leading-tight uppercase`}>
                    {service.name}
                  </h3>
                  
                  <p className={`${isDark ? 'text-slate-400' : 'text-slate-500'} text-xs font-bold leading-relaxed mb-10 group-hover/card:text-slate-300 transition-colors`}>
                    {service.desc}
                  </p>

                  <div className="absolute bottom-10 right-10 flex items-center gap-2 text-blue-500 text-[10px] font-black uppercase tracking-widest opacity-0 group-hover/card:opacity-100 transition-all transform translate-x-4 group-hover/card:translate-x-0">
                    Explore <ChevronRight className="w-4 h-4" />
                  </div>

                  {/* Corner Accent */}
                  <div className={`absolute -bottom-1 -right-1 w-12 h-12 ${isDark ? `bg-${service.color}-500/5` : `bg-${service.color}-500/3`} rounded-tl-[40px] transition-all group-hover/card:w-20 group-hover/card:h-20`} />
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Global Hub CTA */}
        <div className="mt-32 text-center">
           <Link 
             to="/process"
             className={`inline-flex items-center gap-6 p-2 pr-10 ${isDark ? 'bg-white/5 border-white/10' : 'bg-white border-slate-200 shadow-xl shadow-slate-200/50'} rounded-full border group hover:border-blue-500 transition-all`}
           >
              <div className="bg-blue-600 p-4 rounded-full text-white shadow-lg">
                 <AreaChart className="w-6 h-6" />
              </div>
              <div>
                 <p className={`text-[11px] font-black uppercase tracking-[0.3em] ${isDark ? 'text-slate-500' : 'text-slate-500'} text-left leading-none mb-1`}>Ready to scale?</p>
                 <p className={`text-sm font-black ${isDark ? 'text-white' : 'text-slate-900'} uppercase tracking-widest`}>Calculate Maximum Credit Eligibility <ArrowRight className="w-4 h-4 inline-block ml-2 group-hover:translate-x-2 transition-transform" /></p>
              </div>
           </Link>
        </div>

      </div>
    </section>
  );
};

export default ServicesSection;
