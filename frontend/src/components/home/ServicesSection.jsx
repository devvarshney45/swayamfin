import React from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  Building2, 
  MapPin, 
  Briefcase, 
  Home, 
  Truck, 
  ShieldCheck, 
  Globe,
  AreaChart,
  ArrowRight
} from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';

const ServicesSection = () => {
  const { isDark } = useTheme();
  const { t } = useTranslation();
  const services = [
    { 
      name: 'Home Loan', 
      slug: 'housing-loans', 
      icon: Home, 
      desc: 'Affordable housing solutions for your dream home.',
      tags: ['Competitive Rates', 'Flexible Tenure']
    },
    { 
      name: 'Loan Against Property', 
      slug: 'lap', 
      icon: Building2, 
      desc: 'Leverage your residential or commercial property value.',
      tags: ['High LTV', 'Low Interest']
    },
    { 
      name: 'MSME Structured Loans', 
      slug: 'msme-loans', 
      icon: Briefcase, 
      desc: 'Customized credit facilities for small & medium enterprises.',
      tags: ['Zero Collateral', 'Fast Payout']
    },
    { 
      name: 'Micro LAP', 
      slug: 'micro-lap', 
      icon: MapPin, 
      desc: 'Small ticket property loans for micro-businesses.',
      tags: ['Quick Docs', 'Doorstep Service']
    },
    { 
      name: 'Hybrid MSME Products', 
      slug: 'hybrid-msme', 
      icon: Globe, 
      desc: 'Innovative lending combining secured & unsecured credit.',
      tags: ['Flexible Repayment', 'Growth Capital']
    },
    { 
      name: 'Supply Chain Financing', 
      slug: 'supply-chain', 
      icon: Truck, 
      desc: 'Funding for your inventory and purchase orders.',
      tags: ['Working Capital', 'Vendor Finance']
    },
    { 
      name: 'Unsecured MSME Loans', 
      slug: 'unsecured-msme', 
      icon: ShieldCheck, 
      desc: 'Business expansion loans without any collateral.',
      tags: ['Instant Approval', 'No Asset Lock']
    },
    { 
      name: 'Machinery Loans', 
      slug: 'machinery-loan', 
      icon: AreaChart, 
      desc: 'Upgrade your business with new equipment and machinery.',
      tags: ['Asset Backed', 'Simple Process']
    },
  ];

  return (
    <section id="services" className={`py-24 ${isDark ? 'bg-[#0B0F19]' : 'bg-white'} relative overflow-hidden transition-colors duration-300`}>
      {/* Decorative Blur */}
      <div className="absolute -top-24 -left-24 w-96 h-96 bg-primary-gold opacity-[0.03] blur-[100px] rounded-full" />
      <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-indigo-600 opacity-[0.03] blur-[100px] rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        <div className="mb-20 text-center">
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full ${isDark ? 'bg-white/5 border-white/5' : 'bg-slate-100 border-slate-200'} text-primary-gold text-[10px] font-black uppercase tracking-[0.3em] mb-6 border shadow-2xl`}
          >
            {t('services_subtitle')}
          </motion.div>
          
          <h2 className={`text-4xl md:text-5xl font-playfair font-black ${isDark ? 'text-white' : 'text-slate-900'} mb-6`}>
            {t('services_title').split(' ')[0]} <span className="text-primary-gold italic">{t('services_title').split(' ').slice(1).join(' ')}</span>
          </h2>
          <p className="text-slate-500 font-bold max-w-2xl mx-auto text-sm leading-relaxed uppercase tracking-widest italic">
            {t('services_desc')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, idx) => (
            <motion.div
                key={service.slug}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                whileHover={{ y: -8 }}
                className={`group ${isDark ? 'bg-white/5 border-white/5 hover:bg-white/10' : 'bg-white border-slate-200 hover:shadow-2xl shadow-sm'} backdrop-blur-sm p-10 rounded-[40px] border hover:border-primary-gold/30 transition-all duration-500 cursor-pointer shadow-lg hover:shadow-primary-gold/5 flex flex-col h-full`}
              >
                <div className={`w-16 h-16 ${isDark ? 'bg-white/5' : 'bg-slate-50'} rounded-2xl flex items-center justify-center mb-8 group-hover:bg-primary-gold transition-colors duration-500`}>
                  <service.icon className="w-8 h-8 text-primary-gold group-hover:text-[#020617] transition-colors" />
                </div>
                
                <h3 className={`text-2xl font-black ${isDark ? 'text-white' : 'text-slate-900'} mb-4 font-playfair`}>
                  {service.name}
                </h3>
                
                <p className={`${isDark ? 'text-slate-500 group-hover:text-slate-300' : 'text-slate-600 group-hover:text-slate-800'} font-bold text-xs leading-relaxed mb-8 transition-colors uppercase tracking-tight flex-grow`}>
                  {service.desc}
                </p>

                <div className="flex flex-wrap gap-2 mb-10">
                  {service.tags.map(tag => (
                    <span key={tag} className={`text-[9px] font-black tracking-widest uppercase px-3 py-1.5 ${isDark ? 'bg-white/5 text-slate-400' : 'bg-slate-100 text-slate-500'} rounded-xl group-hover:bg-primary-gold/10 group-hover:text-primary-gold transition-all`}>
                      {tag}
                    </span>
                  ))}
                </div>

                <Link 
                  to={`/services/${service.slug}`}
                  className={`flex items-center justify-between w-full py-4 px-6 ${isDark ? 'bg-white/5 text-slate-300' : 'bg-slate-50 text-slate-600'} rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] group-hover:bg-primary-gold group-hover:text-[#020617] transition-all duration-500`}
                >
                  {t('explore_details')}
                  <ArrowRight className="w-4 h-4 text-primary-gold group-hover:translate-x-1 transition-transform" />
                </Link>
              </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default ServicesSection;
