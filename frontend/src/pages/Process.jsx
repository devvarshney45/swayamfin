import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Activity, ShieldCheck, Zap, Target, Cpu, ArrowRight, ChevronDown } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

const Process = () => {
  const { isDark } = useTheme();
  const [activeFaq, setActiveFaq] = useState(null);

  const steps = [
    { title: 'Digital Submission', time: '5 Mins', icon: Zap, desc: 'Secure digital transmission of your financial profile and growth requirements.' },
    { title: 'Credit Sync', time: '24 Hours', icon: Cpu, desc: 'Automated credit engine and expert review for institutional eligibility matching.' },
    { title: 'Due Diligence', time: '48 Hours', icon: Target, desc: 'In-depth assessment of operational and financial sanity of the proposal.' },
    { title: 'Disbursement', time: 'Direct', icon: ShieldCheck, desc: 'Secure deployment of funds directly through regulated banking channels.' }
  ];

  const faqs = [
    { q: 'Is there any upfront consulting fee?', a: 'Swayamfin does not charge any upfront consulting or advisory fee. All processing fees are shared handled by our NBFC partners during disbursement.' },
    { q: 'What is the standard document list?', a: 'Standard requirements include Identity proof, Address proof, GST filings (for MSMEs), Bank Statement (last 12 months), and ITR data.' },
    { q: 'Do you provide loans for new businesses?', a: 'We focus on businesses with a minimum vintage of 2 years. However, certain supply chain products are available for growth-stage entities.' },
    { q: 'How secure is my data?', a: 'We use institutional-grade AES-256 encryption. Your data is only shared with our regulated partner lenders for the purpose of credit assessment.' }
  ];

  return (
    <div className={`${isDark ? 'bg-[#020617]' : 'bg-[#F8FAFC]'} min-h-screen font-plus transition-colors duration-500 overflow-x-hidden`}>
      
      {/* Institutional Hero */}
      <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className={`absolute top-0 right-0 w-2/3 h-2/3 ${isDark ? 'bg-primary/5' : 'bg-primary/5'} blur-[140px] rounded-full translate-x-1/2 -translate-y-1/2`} />
          <div className={`absolute bottom-0 left-0 w-1/2 h-1/2 ${isDark ? 'bg-primary/5' : 'bg-primary/3'} blur-[120px] rounded-full -translate-x-1/2 translate-y-1/2`} />
        </div>

        <div className="max-w-7xl mx-auto px-6 md:px-10 relative z-10 text-center space-y-8">
          <motion.div 
            initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
            className={`inline-flex items-center gap-3 px-6 py-2.5 rounded-full ${isDark ? 'bg-white/5 border-white/10' : 'bg-primary/10 border-primary/20'} text-primary text-[10px] font-black uppercase tracking-[0.4em] border`}
          >
            <Activity className="w-4 h-4" /> Operational Matrix
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
            className={`text-5xl md:text-8xl font-black ${isDark ? 'text-white' : 'text-slate-900'} leading-[0.9] tracking-tighter uppercase`}
          >
            Lending <br /> <span className="text-primary italic">Process.</span>
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}
            className={`${isDark ? 'text-slate-400' : 'text-slate-500'} text-lg md:text-2xl max-w-4xl mx-auto font-medium italic leading-relaxed`}
          >
            Accelerating regional credit cycles through institutional-grade governance and a transparent operational pipeline.
          </motion.p>
        </div>
      </section>

      {/* Step Timeline */}
      <section className="max-w-7xl mx-auto px-6 md:px-10 pb-24 relative z-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, i) => (
            <motion.div 
              key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ delay: i * 0.1 }}
              className={`group ${isDark ? 'bg-[#0B1221] border-white/5' : 'bg-white border-slate-100 shadow- premium'} p-10 rounded-[48px] border transition-all duration-500 hover:border-primary/30 hover:shadow-22xl`}
            >
              <div className="flex justify-between items-start mb-10">
                 <div className={`w-14 h-14 rounded-2xl flex items-center justify-center ${isDark ? 'bg-white/5' : 'bg-primary/10'} text-primary group-hover:bg-primary group-hover:text-white transition-all`}>
                    <step.icon className="w-7 h-7" />
                 </div>
                 <span className="text-sm font-black text-primary opacity-40 italic">0{i+1}</span>
              </div>
              
              <div className="space-y-4">
                 <div className="flex items-center gap-3">
                    <span className={`px-3 py-1 ${isDark ? 'bg-white/5 text-slate-400' : 'bg-slate-100 text-slate-500'} text-[9px] font-black rounded-full uppercase tracking-widest`}>{step.time}</span>
                 </div>
                 <h3 className={`text-2xl font-black ${isDark ? 'text-white' : 'text-slate-900'} uppercase tracking-tight leading-tight group-hover:text-primary transition-colors`}>{step.title}</h3>
                 <p className={`${isDark ? 'text-slate-500' : 'text-slate-400'} text-[11px] font-bold leading-relaxed italic`}>{step.desc}</p>
              </div>

               <div className="pt-8 mt-8 border-t border-slate-500/10 flex items-center justify-between">
                  <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest opacity-40">Phase {i+1} Link</span>
                  <ArrowRight className="w-4 h-4 text-primary opacity-0 group-hover:opacity-100 transition-all translate-x--4 group-hover:translate-x-0" />
               </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* FAQ Interface */}
      <section className={`py-24 ${isDark ? 'bg-white/2 border-white/5' : 'bg-slate-900/5 border-slate-100'} border-y`}>
        <div className="max-w-4xl mx-auto px-6 space-y-16">
          <div className="text-center space-y-4">
            <h2 className={`text-4xl md:text-5xl font-black ${isDark ? 'text-white' : 'text-slate-900'} uppercase tracking-tighter leading-none`}>Standard <span className="text-primary italic">Protocols.</span></h2>
            <p className="text-slate-500 font-black uppercase tracking-[0.5em] text-[10px] italic">Strategic FAQ Interface</p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <div key={i} className={`${isDark ? 'bg-[#0B1221] border-white/5' : 'bg-white border-slate-100 shadow- premium'} rounded-[32px] border overflow-hidden`}>
                <button 
                  onClick={() => setActiveFaq(activeFaq === i ? null : i)}
                  className="w-full px-8 py-8 text-left flex justify-between items-center group"
                >
                  <span className={`text-lg font-black uppercase tracking-tight transition-all ${activeFaq === i ? 'text-primary' : isDark ? 'text-white' : 'text-slate-900'}`}>{faq.q}</span>
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${activeFaq === i ? 'bg-primary text-white' : 'bg-slate-500/10 text-slate-400'}`}>
                    <ChevronDown className={`w-5 h-5 transition-transform duration-500 ${activeFaq === i ? 'rotate-180' : ''}`} />
                  </div>
                </button>
                <AnimatePresence>
                  {activeFaq === i && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden"
                    >
                      <div className={`px-10 pb-10 ${isDark ? 'text-slate-400' : 'text-slate-500'} font-bold italic border-t ${isDark ? 'border-white/5' : 'border-slate-50'} pt-8 leading-relaxed`}>
                        {faq.a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
};

export default Process;
