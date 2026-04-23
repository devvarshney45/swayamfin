import React from 'react';
import { motion } from 'framer-motion';
import { 
  History, 
  ShieldCheck, 
  Users2, 
  Clock, 
  CheckCircle2,
  Gem
} from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { useTranslation } from 'react-i18next';

const USPsSection = () => {
  const { isDark } = useTheme();
  const { t } = useTranslation();

  const highlights = [
    {
      title: t('usp_h1_t'),
      desc: t('usp_h1_d'),
      icon: History,
      color: 'bg-blue-500/10 text-blue-400'
    },
    {
      title: t('usp_h2_t'),
      desc: t('usp_h2_d'),
      icon: ShieldCheck,
      color: 'bg-emerald-500/10 text-emerald-400'
    },
    {
      title: t('usp_h3_t'),
      desc: t('usp_h3_d'),
      icon: Users2,
      color: 'bg-amber-500/10 text-amber-400'
    },
    {
      title: t('usp_h4_t'),
      desc: t('usp_h4_d'),
      icon: Clock,
      color: 'bg-purple-500/10 text-purple-400'
    }
  ];

  return (
    <section className={`py-16 md:py-24 ${isDark ? 'bg-[#020617]' : 'bg-[#F8FAFC]'} relative overflow-hidden font-dmsans transition-colors duration-300`}>
      <div className="max-w-7xl mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            className="space-y-6 md:space-y-8 text-center lg:text-left"
          >
            <div className="flex justify-center lg:justify-start">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary-gold/10 text-primary-gold text-[9px] md:text-[10px] font-black uppercase tracking-[0.2em] animate-pulse">
                {t('usp_tag')}
              </div>
            </div>
            
            <h2 className={`text-3xl md:text-5xl font-playfair font-black ${isDark ? 'text-white' : 'text-slate-900'} leading-tight`}>
              {t('usp_title_1')} <br className="hidden md:block" />
              <span className="text-primary-gold italic"> {t('usp_title_2')}</span>
            </h2>
            
            <p className="text-slate-500 font-bold text-xs md:text-sm tracking-widest uppercase italic max-w-lg mx-auto lg:mx-0">
              {t('usp_desc')}
            </p>

            <div className="space-y-3 pt-2">
               {[t('usp_check1'), t('usp_check2'), t('usp_check3')].map((item, i) => (
                 <div key={i} className="flex items-center justify-center lg:justify-start gap-3">
                   <div className="w-5 h-5 bg-primary-gold/20 rounded-full flex items-center justify-center shrink-0">
                     <CheckCircle2 className="w-3 h-3 text-primary-gold" />
                   </div>
                   <span className={`${isDark ? 'text-slate-300' : 'text-slate-800'} font-bold text-[10px] md:text-xs uppercase tracking-tight`}>{item}</span>
                 </div>
               ))}
            </div>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
            {highlights.map((usp, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                className={`group ${isDark ? 'bg-white/5 border-white/5' : 'bg-white border-slate-200'} backdrop-blur-md p-6 md:p-8 rounded-3xl md:rounded-[32px] border hover:border-primary-gold/30 transition-all duration-300 relative overflow-hidden shadow-sm`}
              >
                <div className={`w-14 h-14 md:w-16 md:h-16 ${usp.color} rounded-2xl md:rounded-[24px] flex items-center justify-center mb-6 focus-within: mb-8 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 shadow-sm group-hover:shadow-md`}>
                  <usp.icon className="w-7 h-7 md:w-8 md:h-8" />
                </div>
                
                <h4 className={`text-lg md:text-xl font-black ${isDark ? 'text-white' : 'text-slate-900'} mb-3 md:mb-4 transition-colors tracking-tight`}>{usp.title}</h4>
                <p className="text-[11px] md:text-sm text-slate-500 font-medium leading-relaxed transition-opacity">
                  {usp.desc}
                </p>
              </motion.div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
};

export default USPsSection;
