import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, MessageCircle, Sparkles } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { useTranslation } from 'react-i18next';

const CTASection = () => {
  const { isDark } = useTheme();
  const { t } = useTranslation();
  return (
    <section className={`py-12 md:py-24 ${isDark ? 'bg-[#020617]' : 'bg-[#F8FAFC]'} px-4 -mt-8 md:-mt-16 relative z-20 font-dmsans transition-colors duration-300`}>
      <div className="max-w-7xl mx-auto">
        <div className={`${isDark ? 'bg-[#0B0F19] border-white/5' : 'bg-white border-slate-200'} p-8 md:p-20 rounded-[32px] md:rounded-[60px] border shadow-2xl relative overflow-hidden group transition-colors duration-300`}>
          <div className="absolute top-0 right-0 w-64 md:w-80 h-64 md:h-80 bg-primary-gold/10 blur-[80px] md:blur-[100px] rounded-full translate-x-1/3 -translate-y-1/3 group-hover:bg-primary-gold/20 transition-all duration-700" />
          
          <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-12 md:gap-16">
            <div className="max-w-xl text-center lg:text-left space-y-6 md:space-y-8">
              <div className="flex justify-center lg:justify-start">
                <div className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full ${isDark ? 'bg-white/5 border-white/10 text-primary-gold' : 'bg-slate-50 border-slate-200 text-primary-gold'} text-[9px] md:text-[10px] font-black uppercase tracking-[0.2em] border italic shadow-sm`}>
                   <Sparkles className="w-3 h-3" /> {t('cta_tag')}
                </div>
              </div>
              <h2 className={`text-3xl md:text-6xl font-playfair font-black ${isDark ? 'text-white' : 'text-slate-900'} leading-tight tracking-tight`}>
                {t('cta_title').split(' ').map((word, i) => (
                  <span key={i} className={i % 3 === 2 ? 'text-primary-gold italic' : ''}>{word} </span>
                ))}
              </h2>
              <p className={`font-bold text-xs md:text-sm uppercase tracking-widest leading-relaxed ${isDark ? 'text-slate-400' : 'text-slate-500'} max-w-md mx-auto lg:mx-0`}>
                {t('cta_desc')}
              </p>
              
              <div className="flex flex-wrap justify-center lg:justify-start gap-2 md:gap-4">
                 {['Agra', 'Mathura', 'Hathras', 'Kosi'].map(city => (
                   <span key={city} className={`px-3 md:px-4 py-1.5 md:py-2 ${isDark ? 'bg-white/5 border-white/10 text-slate-400' : 'bg-slate-50 border-slate-200 text-slate-500'} rounded-lg md:rounded-xl border text-[8px] md:text-[10px] font-black uppercase tracking-widest`}>{city}</span>
                 ))}
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 md:gap-6 w-full lg:w-auto">
              <button 
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                className={`w-full sm:w-auto px-8 md:px-10 py-4 md:py-5 bg-primary-gold text-[#020617] font-black rounded-2xl md:rounded-3xl hover:bg-yellow-500 transition-all duration-300 shadow-xl ${isDark ? 'shadow-primary-gold/20' : 'shadow-primary-gold/40'} text-[10px] md:text-xs uppercase tracking-widest flex items-center justify-center gap-3`}
              >
                {t('cta_btn')} <ArrowRight className="w-4 h-4" />
              </button>
              <a 
                href="https://wa.me/916397003690"
                className={`w-full sm:w-auto px-8 md:px-10 py-4 md:py-5 ${isDark ? 'bg-white/5 text-white border-white/10 hover:bg-white/10' : 'bg-slate-50 text-slate-900 border-slate-200 hover:bg-slate-100'} font-black rounded-2xl md:rounded-3xl border-2 transition-all text-[10px] md:text-xs uppercase tracking-widest flex items-center justify-center gap-3`}
              >
                <MessageCircle className="w-5 h-5 text-success-green" /> {t('nav_contact')}
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
