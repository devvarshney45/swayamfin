import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, MessageCircle, Shield, Zap, ArrowUpRight } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { useTranslation } from 'react-i18next';

const CTASection = () => {
  const { isDark } = useTheme();
  const { t } = useTranslation();

  return (
    <section className={`py-16 md:py-24 lg:py-32 ${isDark ? 'bg-[#020617]' : 'bg-[#F8FAFC]'} px-4 sm:px-6 relative overflow-hidden transition-colors duration-700`}>
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="bg-[#020617] rounded-3xl md:rounded-[40px] p-8 sm:p-12 md:p-16 border border-white/5 relative overflow-hidden"
        >
          {/* Background glows */}
          <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-blue-600/20 blur-[120px] rounded-full translate-x-1/2 -translate-y-1/2 pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-primary-gold/10 blur-[100px] rounded-full -translate-x-1/2 translate-y-1/2 pointer-events-none" />

          <div className="relative z-10 flex flex-col xl:flex-row items-center justify-between gap-10">
            {/* Left Text */}
            <div className="max-w-2xl text-center xl:text-left space-y-5">
              <div className="flex justify-center xl:justify-start">
                <div className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full bg-blue-600/10 border border-blue-500/20 text-primary-gold text-[10px] font-black uppercase tracking-[0.4em]">
                  <Zap className="w-3.5 h-3.5 animate-pulse" /> {t('cta_tag')}
                </div>
              </div>

              <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white leading-tight tracking-tight font-playfair">
                Institutional <span className="text-blue-600 italic">Access Ready.</span>
              </h2>

              <p className="text-slate-400 text-sm md:text-base leading-relaxed max-w-xl mx-auto xl:mx-0">
                {t('cta_desc')}
              </p>

              {/* Branch chips */}
              <div className="flex flex-wrap justify-center xl:justify-start gap-2 pt-2">
                {['Agra', 'Mathura', 'Hathras', 'Kosi'].map((city) => (
                  <div
                    key={city}
                    className="px-4 py-2 bg-white/5 border border-white/10 rounded-full text-[10px] font-black uppercase tracking-widest text-slate-400 flex items-center gap-2"
                  >
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    {city}
                  </div>
                ))}
              </div>
            </div>

            {/* Right CTA Buttons */}
            <div className="flex flex-col gap-4 w-full xl:w-auto min-w-0 xl:min-w-[300px]">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                className="w-full bg-white text-[#020617] px-8 py-4 rounded-2xl font-black uppercase tracking-wider text-xs shadow-xl hover:bg-blue-600 hover:text-white transition-all duration-500 flex items-center justify-center gap-3"
              >
                Start Application <ArrowRight className="w-4 h-4" />
              </motion.button>

              <motion.a
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                href="https://wa.me/916397003690"
                className="w-full px-8 py-4 bg-white/5 text-white border border-white/10 font-black rounded-2xl transition-all duration-500 text-xs uppercase tracking-wider flex items-center justify-center gap-3 hover:bg-white/10"
              >
                <MessageCircle className="w-4 h-4 text-emerald-400" />
                WhatsApp Us <ArrowUpRight className="w-3.5 h-3.5 opacity-50" />
              </motion.a>

              <div className="flex items-center justify-center gap-3 pt-2 opacity-40">
                <Shield className="w-4 h-4 text-blue-500" />
                <span className="text-[10px] font-black uppercase tracking-widest text-slate-500">256-bit Encrypted</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CTASection;
