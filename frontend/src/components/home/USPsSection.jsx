import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Award, Clock, Fingerprint, CheckCircle2, Cpu, Layers } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { useTranslation } from 'react-i18next';

const USPsSection = () => {
  const { isDark } = useTheme();
  const { t } = useTranslation();

  const highlights = [
    {
      title: 'Institutional Grade',
      desc: 'Orchestrating credit protocols for India\'s top-tier enterprise ecosystem.',
      icon: Award,
    },
    {
      title: 'Secure & Compliant',
      desc: 'RBI-compliant frameworks with 256-bit encrypted asset protection.',
      icon: ShieldCheck,
    },
    {
      title: 'Fast Verification',
      desc: 'Multi-layered digital verification for rapid onboarding.',
      icon: Fingerprint,
    },
    {
      title: '48Hr Deployment',
      desc: 'High-speed capital deployment within 48-hour operational cycles.',
      icon: Clock,
    }
  ];

  return (
    <section className={`py-16 md:py-24 lg:py-32 ${isDark ? 'bg-[#020617]' : 'bg-white'} relative overflow-hidden transition-colors duration-700`}>
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <div className={`absolute top-1/2 left-0 w-[600px] h-[600px] ${isDark ? 'bg-blue-600/5' : 'bg-blue-500/3'} blur-[160px] rounded-full -translate-x-1/2 -translate-y-1/2`} />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">

          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-6 text-center lg:text-left"
          >
            <div className="flex justify-center lg:justify-start">
              <div className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full bg-blue-600/10 border border-blue-500/20 text-primary-gold text-[10px] font-black uppercase tracking-[0.4em]">
                <Cpu className="w-3.5 h-3.5" /> {t('usp_tag')}
              </div>
            </div>

            <h2 className={`text-3xl sm:text-4xl md:text-5xl lg:text-5xl font-black ${isDark ? 'text-white' : 'text-[#020617]'} leading-tight tracking-tight font-playfair`}>
              Strategic <br className="hidden sm:block" />
              <span className="text-blue-600 italic"> Governance</span>
            </h2>

            <p className={`text-sm md:text-base ${isDark ? 'text-slate-400' : 'text-slate-500'} italic leading-relaxed max-w-lg mx-auto lg:mx-0 border-l-4 border-primary-gold/40 pl-5`}>
              "Orchestrating high-precision credit cycles for India's premier enterprise verticals."
            </p>

            <div className="space-y-3 pt-4">
              {[t('usp_check1'), t('usp_check2'), t('usp_check3')].map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -15 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 + (i * 0.1) }}
                  className={`flex items-center gap-4 ${isDark ? 'bg-white/5 border-white/10' : 'bg-slate-50 border-slate-100'} p-4 rounded-2xl border`}
                >
                  <div className="w-8 h-8 bg-blue-600/10 text-blue-600 rounded-xl flex items-center justify-center shrink-0">
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                  <span className={`${isDark ? 'text-slate-300' : 'text-[#020617]'} font-bold text-xs uppercase tracking-widest`}>{item}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-5">
            {highlights.map((usp, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group"
              >
                <div className={`${isDark ? 'bg-[#0B1221]/60 border-white/10 hover:border-blue-600/30' : 'bg-white border-slate-100 shadow-md hover:shadow-lg hover:border-blue-300'} h-full rounded-2xl md:rounded-3xl p-6 md:p-7 border transition-all duration-500 group-hover:-translate-y-1`}>

                  <div className={`w-12 h-12 ${isDark ? 'bg-blue-600/10 text-blue-500' : 'bg-blue-50 text-blue-600'} rounded-2xl flex items-center justify-center mb-5 group-hover:bg-blue-600 group-hover:text-white transition-all duration-500`}>
                    <usp.icon className="w-6 h-6" />
                  </div>

                  <h4 className={`text-sm md:text-base font-black ${isDark ? 'text-white' : 'text-[#020617]'} mb-2.5 uppercase tracking-tight group-hover:text-blue-600 transition-colors duration-300`}>
                    {usp.title}
                  </h4>
                  <p className={`text-xs md:text-sm ${isDark ? 'text-slate-400' : 'text-slate-500'} leading-relaxed`}>
                    {usp.desc}
                  </p>

                  <div className="mt-5 pt-4 border-t border-white/5 flex gap-1">
                    {[1,2,3].map(i => <div key={i} className="w-6 h-1 bg-blue-600 rounded-full" style={{ opacity: i * 0.2 }} />)}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default USPsSection;
