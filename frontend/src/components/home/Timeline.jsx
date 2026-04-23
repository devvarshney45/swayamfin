import React from 'react';
import { motion } from 'framer-motion';
import { 
  FileEdit, 
  ScanSearch, 
  Handshake, 
  Wallet2,
  ChevronRight
} from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { useTranslation } from 'react-i18next';

const Timeline = () => {
  const { isDark } = useTheme();
  const { t } = useTranslation();
  const steps = [
    {
      title: t('tm_step1_t'),
      desc: t('tm_step1_d'),
      icon: FileEdit,
      time: t('time_5m')
    },
    {
      title: t('tm_step2_t'),
      desc: t('tm_step2_d'),
      icon: ScanSearch,
      time: t('time_24h')
    },
    {
      title: t('tm_step3_t'),
      desc: t('tm_step3_d'),
      icon: Handshake,
      time: t('time_instant')
    },
    {
      title: t('tm_step4_t'),
      desc: t('tm_step4_d'),
      icon: Wallet2,
      time: t('time_48h')
    }
  ];

  return (
    <section className={`py-16 md:py-24 ${isDark ? 'bg-[#0B0F19]' : 'bg-white'} relative overflow-hidden font-dmsans transition-colors duration-300`}>
      <div className="max-w-7xl mx-auto px-4 relative z-10">
        <div className="text-center mb-16 md:mb-20">
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full ${isDark ? 'bg-white/5 border-white/5' : 'bg-slate-100 border-slate-200'} text-primary-gold text-[9px] md:text-[10px] font-black uppercase tracking-[0.3em] mb-4 border shadow-sm`}
          >
            {t('timeline_tag')}
          </motion.div>
          <h2 className={`text-3xl md:text-5xl font-playfair font-black ${isDark ? 'text-white' : 'text-slate-900'} mb-4 md:mb-6 leading-tight`}>
            {t('timeline_title')} <span className="text-primary-gold italic">{t('timeline_subtitle')}</span>
          </h2>
          <p className="text-slate-500 max-w-2xl mx-auto font-bold text-[10px] md:text-xs uppercase tracking-widest leading-relaxed">
            {t('timeline_desc')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-12 relative">
          {/* Connector Line (Desktop) */}
          <div className="hidden md:block absolute top-[48px] left-[10%] right-[10%] h-px bg-gradient-to-r from-transparent via-primary-gold/20 to-transparent"></div>

          {steps.map((step, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.15 }}
              whileHover={{ y: -5 }}
              className="relative z-10 text-center group"
            >
              <div className="relative mb-6 md:mb-10 inline-block">
                <div 
                  className={`w-20 h-20 md:w-24 md:h-24 ${isDark ? 'bg-white/5 border-white/10' : 'bg-slate-50 border-slate-200'} backdrop-blur-sm border rounded-3xl md:rounded-[36px] flex items-center justify-center text-primary-gold group-hover:bg-primary-gold group-hover:text-[#020617] transition-all duration-700 shadow-xl group-hover:shadow-primary-gold/20`}
                >
                  <step.icon className="w-10 h-10 md:w-12 md:h-12" />
                </div>
                <div className="absolute -bottom-1 -right-1 bg-primary-gold text-[#020617] text-[8px] md:text-[9px] font-black px-2.5 py-1 rounded-lg md:rounded-xl shadow-lg uppercase tracking-tighter italic">
                  {step.time}
                </div>
              </div>

              <h4 className={`${isDark ? 'text-white' : 'text-slate-900'} font-playfair font-black text-lg md:text-xl mb-2 md:mb-3 group-hover:text-primary-gold transition-colors tracking-tight`}>{step.title}</h4>
              <p className={`text-slate-500 text-[10px] uppercase font-bold tracking-tight leading-relaxed px-4 md:px-6 ${isDark ? 'group-hover:text-slate-300' : 'group-hover:text-slate-700'} transition-colors`}>
                {step.desc}
              </p>
              
              {idx !== steps.length - 1 && (
                <div className="md:hidden flex justify-center py-6 opacity-20">
                  <ChevronRight className="w-6 h-6 rotate-90 text-primary-gold" />
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Timeline;
