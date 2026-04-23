import React from 'react';
import { motion } from 'framer-motion';
import { Cpu, ScanSearch, ShieldCheck, Wallet2, ChevronRight, Activity } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { useTranslation } from 'react-i18next';

const Timeline = () => {
  const { isDark } = useTheme();
  const { t } = useTranslation();

  const steps = [
    {
      title: 'Apply Online',
      desc: 'Submit your details securely via our Partner Uplink terminal.',
      icon: Cpu,
      time: '5 Min',
    },
    {
      title: 'AI Validation',
      desc: 'Multi-dimensional risk assessment and document verification.',
      icon: ScanSearch,
      time: '24 Hrs',
    },
    {
      title: 'Sanction',
      desc: 'Credit structure confirmation and regulatory approval issued.',
      icon: ShieldCheck,
      time: 'Instant',
    },
    {
      title: 'Disbursement',
      desc: 'High-speed capital transferred directly to your account.',
      icon: Wallet2,
      time: '48 Hrs',
    }
  ];

  return (
    <section className={`py-16 md:py-24 lg:py-32 ${isDark ? 'bg-[#020617]' : 'bg-[#F8FAFC]'} relative overflow-hidden transition-colors duration-700`}>
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <div className={`absolute top-0 right-0 w-[500px] h-[500px] ${isDark ? 'bg-blue-600/5' : 'bg-blue-500/3'} blur-[140px] rounded-full translate-x-1/2 -translate-y-1/3`} />
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
            <Activity className="w-3.5 h-3.5 animate-pulse" /> {t('timeline_tag')}
          </motion.div>
          <h2 className={`text-3xl sm:text-4xl md:text-5xl font-black ${isDark ? 'text-white' : 'text-[#020617]'} tracking-tight font-playfair`}>
            Execution <span className="text-blue-600 italic">Protocol</span>
          </h2>
          <p className={`text-sm md:text-base ${isDark ? 'text-slate-400' : 'text-slate-500'} max-w-xl mx-auto`}>
            Strategically engineered deployment cycles driving real-world capital velocity.
          </p>
        </div>

        {/* Steps */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 relative">
          {/* Desktop Connector */}
          <div className="hidden lg:block absolute top-[42px] left-[15%] right-[15%] h-[2px] bg-white/5">
            <motion.div
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              transition={{ duration: 2, ease: [0.16, 1, 0.3, 1] }}
              className="h-full bg-blue-600 origin-left shadow-[0_0_12px_rgba(37,99,235,0.6)]"
            />
          </div>

          {steps.map((step, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.15, duration: 0.7 }}
              className="relative z-10 group"
            >
              <div className="flex lg:flex-col items-start lg:items-center gap-5 lg:gap-0 lg:text-center">
                {/* Icon Node */}
                <div className="relative shrink-0 lg:mb-6">
                  <div className={`w-20 h-20 md:w-24 md:h-24 ${isDark ? 'bg-[#0F172A] border-white/10' : 'bg-white border-slate-200 shadow-md'} border rounded-2xl md:rounded-3xl flex items-center justify-center text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-all duration-500 group-hover:-translate-y-1`}>
                    <step.icon className="w-8 h-8 md:w-10 md:h-10" />
                  </div>
                  <div className="absolute -top-2 -right-2 bg-[#020617] text-primary-gold text-[9px] font-black px-3 py-1 rounded-full border border-primary-gold/30 whitespace-nowrap">
                    {step.time}
                  </div>
                </div>

                {/* Content */}
                <div className="lg:mt-0 space-y-2 lg:px-2">
                  <span className={`text-[9px] font-black uppercase tracking-widest ${isDark ? 'text-slate-600' : 'text-slate-400'}`}>Step {idx + 1}</span>
                  <h4 className={`${isDark ? 'text-white' : 'text-[#020617]'} font-black text-base md:text-lg tracking-tight uppercase group-hover:text-blue-600 transition-colors`}>
                    {step.title}
                  </h4>
                  <p className={`${isDark ? 'text-slate-500' : 'text-slate-500'} text-xs md:text-sm leading-relaxed`}>
                    {step.desc}
                  </p>
                </div>

                {/* Mobile connector */}
                {idx !== steps.length - 1 && (
                  <div className="lg:hidden flex justify-center py-4 opacity-30">
                    <ChevronRight className="w-5 h-5 rotate-90 text-blue-600" />
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Timeline;
