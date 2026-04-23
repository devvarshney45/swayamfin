import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { Building2, Home, Briefcase, MapPin, Globe, Truck, ShieldCheck, AreaChart, ChevronRight, ArrowRight, Zap, Activity, ArrowUpRight } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';

const ServicesSection = () => {
  const { isDark } = useTheme();
  const { t } = useTranslation();

  const services = [
    { name: t('home_loan'), slug: 'housing-loans', icon: Home, tag: 'Mortgage' },
    { name: t('lap'), slug: 'lap', icon: Building2, tag: 'Asset' },
    { name: t('msme_loan'), slug: 'msme-loans', icon: Briefcase, tag: 'Enterprise' },
    { name: t('micro_lap'), slug: 'micro-lap', icon: MapPin, tag: 'Regional' },
    { name: t('hybrid_msme'), slug: 'hybrid-msme', icon: Globe, tag: 'Hybrid' },
    { name: t('supply_chain'), slug: 'supply-chain', icon: Truck, tag: 'Supply' },
    { name: t('unsecured_msme'), slug: 'unsecured-msme', icon: ShieldCheck, tag: 'Unsecured' },
    { name: t('machinery_loan'), slug: 'machinery-loan', icon: AreaChart, tag: 'Machinery' },
  ];

  return (
    <section className={`py-16 md:py-24 lg:py-32 relative overflow-hidden ${isDark ? 'bg-[#020617]' : 'bg-[#F8FAFC]'}`}>
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <div className={`absolute top-0 right-0 w-[500px] h-[500px] ${isDark ? 'bg-blue-600/5' : 'bg-blue-500/3'} blur-[140px] rounded-full translate-x-1/2 -translate-y-1/2`} />
        <div className={`absolute bottom-0 left-0 w-[400px] h-[400px] ${isDark ? 'bg-primary-gold/5' : 'bg-primary-gold/2'} blur-[120px] rounded-full -translate-x-1/2 translate-y-1/2`} />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 relative z-10">
        {/* Header */}
        <div className="text-center mb-12 md:mb-16 space-y-4">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full bg-blue-600/10 border border-blue-500/20 text-primary-gold text-[10px] font-black uppercase tracking-[0.4em]"
          >
            <Activity className="w-3.5 h-3.5" /> Credit Portfolio
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className={`text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black ${isDark ? 'text-white' : 'text-[#020617]'} tracking-tight font-playfair leading-tight`}
          >
            Strategic <span className="text-blue-600 italic">Portfolio</span>
          </motion.h2>
          <p className={`text-sm md:text-base ${isDark ? 'text-slate-400' : 'text-slate-500'} max-w-xl mx-auto`}>
            Engineered for high-velocity liquidity across diversified financial verticals.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: index * 0.07, duration: 0.6 }}
              className="group"
            >
              <Link to={`/services/${service.slug}`} className="block">
                <div className={`${isDark ? 'bg-[#0B1221]/60 border-white/10 hover:border-blue-600/40' : 'bg-white border-slate-100 shadow-md hover:border-blue-400 hover:shadow-lg'} rounded-2xl md:rounded-3xl p-5 md:p-7 border transition-all duration-500 relative overflow-hidden`}>
                  
                  {/* Icon */}
                  <div className={`w-10 h-10 md:w-12 md:h-12 ${isDark ? 'bg-blue-600/10 text-blue-500' : 'bg-blue-50 text-blue-600'} rounded-xl md:rounded-2xl flex items-center justify-center mb-4 group-hover:bg-blue-600 group-hover:text-white transition-all duration-500`}>
                    <service.icon className="w-5 h-5 md:w-6 md:h-6" />
                  </div>

                  {/* Tag */}
                  <span className="text-[9px] font-black uppercase tracking-widest text-slate-500 opacity-60">{service.tag}</span>

                  {/* Name */}
                  <h3 className={`text-sm md:text-base font-black ${isDark ? 'text-white' : 'text-[#020617]'} mt-1.5 mb-4 leading-tight uppercase tracking-tight group-hover:text-blue-600 transition-colors duration-300`}>
                    {service.name}
                  </h3>

                  {/* Arrow */}
                  <div className="flex items-center gap-2 text-blue-600">
                    <div className="w-7 h-7 rounded-full bg-blue-600/10 flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-all duration-500">
                      <ChevronRight className="w-4 h-4" />
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* CTA Banner */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className={`mt-12 md:mt-16 p-8 md:p-14 rounded-3xl border ${isDark ? 'bg-[#0B1221]/80 border-white/10' : 'bg-[#020617] border-white/5'} relative overflow-hidden`}
        >
          <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-blue-600/20 blur-[120px] rounded-full translate-x-1/2 -translate-y-1/2" />
          <div className="relative z-10 flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-left">
            <div className="space-y-2">
              <p className="text-primary-gold text-[10px] font-black uppercase tracking-[0.4em]">Calculate Your Eligibility</p>
              <h3 className="text-white text-2xl md:text-3xl font-black font-playfair tracking-tight">
                Find Your <span className="text-blue-500 italic">Credit Velocity</span>
              </h3>
              <p className="text-slate-400 text-sm max-w-md">Use our smart calculator to estimate your loan eligibility in minutes.</p>
            </div>
            <Link
              to="/process"
              className="shrink-0 bg-white text-[#020617] px-8 py-4 rounded-2xl font-black uppercase tracking-wider text-xs shadow-xl hover:bg-blue-600 hover:text-white transition-all duration-500 flex items-center gap-3"
            >
              Get Started <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ServicesSection;
