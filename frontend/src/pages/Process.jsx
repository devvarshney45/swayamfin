import React from 'react';
import { motion } from 'framer-motion';
import { 
  ClipboardCheck, 
  FileSearch, 
  ShieldCheck, 
  HandCoins, 
  ArrowRight,
  Sparkles,
  Zap,
  Target
} from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { useTranslation } from 'react-i18next';

const Process = () => {
  const { isDark } = useTheme();
  const { t } = useTranslation();

  const steps = [
    {
      title: "Step 1: Consultation",
      desc: "Connect with our experts to discuss your financial needs and eligibility.",
      icon: <ClipboardCheck className="w-8 h-8" />,
      color: "blue"
    },
    {
      title: "Step 2: Analysis",
      desc: "Our AI-powered system analyzes your profile to find the best lending partners.",
      icon: <FileSearch className="w-8 h-8" />,
      color: "indigo"
    },
    {
      title: "Step 3: Verification",
      desc: "Submit minimal documentation digitally for a lightning-fast verification process.",
      icon: <ShieldCheck className="w-8 h-8" />,
      color: "emerald"
    },
    {
      title: "Step 4: Disbursal",
      desc: "Upon approval, the loan amount is disbursed directly to your account.",
      icon: <HandCoins className="w-8 h-8" />,
      color: "amber"
    }
  ];

  return (
    <div className={`${isDark ? 'bg-[#020617] text-white' : 'bg-[#F8FAFC] text-slate-900'} min-h-screen pt-24 pb-20 font-inter transition-colors duration-300`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* Hero Section */}
        <div className="text-center mb-24 relative">
          <div className={`absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 ${isDark ? 'bg-blue-600/10' : 'bg-blue-600/5'} blur-[100px] rounded-full -z-10`} />
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 text-blue-500 text-xs font-black uppercase tracking-widest border border-blue-500/20 mb-6">
            <Sparkles className="w-3 h-3" /> The Swayamfin Way
          </motion.div>
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="text-5xl md:text-7xl font-black mb-8 leading-tight tracking-tighter">
            Seamless Process <span className="text-blue-600 italic">For Faster Growth</span>
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className={`${isDark ? 'text-slate-400' : 'text-slate-500'} text-lg max-w-2xl mx-auto font-medium`}>
            We've revolutionized the borrowing experience. No more mountain of paperwork or endless waiting. Just speed and transparency.
          </motion.p>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
           {/* Connecting Line (Desktop) */}
           <div className={`hidden lg:block absolute top-[100px] left-0 right-0 h-0.5 ${isDark ? 'bg-white/5' : 'bg-slate-200'} -z-10`} />
           
           {steps.map((step, idx) => (
             <motion.div 
               key={idx}
               initial={{ opacity: 0, y: 20 }}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: true }}
               transition={{ delay: idx * 0.1 }}
               className="relative group"
             >
                <div className={`${isDark ? 'bg-[#0B0F19] border-white/5' : 'bg-white border-slate-200 shadow-xl'} border p-8 rounded-[40px] h-full transition-all group-hover:scale-[1.02] group-hover:border-blue-500/30`}>
                   <div className={`w-20 h-20 ${isDark ? `bg-${step.color}-500/10` : `bg-${step.color}-50`} rounded-3xl flex items-center justify-center mb-8 border ${isDark ? `border-${step.color}-500/20` : `border-${step.color}-100`} shadow-inner`}>
                      <div className={`text-${step.color}-500`}>{step.icon}</div>
                   </div>
                   <h3 className={`text-xl font-black ${isDark ? 'text-white' : 'text-slate-900'} mb-4 uppercase tracking-tight`}>{step.title}</h3>
                   <p className={`${isDark ? 'text-slate-400' : 'text-slate-500'} text-sm leading-relaxed font-medium`}>
                      {step.desc}
                   </p>
                   <div className="mt-8 flex items-center gap-2 text-blue-500 font-black text-xs uppercase tracking-[0.2em] opacity-0 group-hover:opacity-100 transition-opacity">
                      Learn More <ArrowRight className="w-4 h-4" />
                   </div>
                </div>
                {/* Step Number Overlay */}
                <div className="absolute top-10 right-10 text-6xl font-black text-blue-600/5 select-none pointer-events-none uppercase">
                   0{idx+1}
                </div>
             </motion.div>
           ))}
        </div>

        {/* Bottom CTA */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="mt-32 text-center bg-blue-600 rounded-[48px] p-12 md:p-20 relative overflow-hidden group shadow-2xl shadow-blue-500/30"
        >
          <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 blur-[100px] rounded-full -translate-y-1/2 translate-x-1/2 group-hover:scale-110 transition-transform duration-700" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-black/10 blur-[100px] rounded-full translate-y-1/2 -translate-x-1/2 group-hover:scale-110 transition-transform duration-700" />
          
          <div className="relative z-10">
            <h2 className="text-4xl md:text-5xl font-black text-white mb-6 uppercase tracking-tight">Ready to start your journey?</h2>
            <p className="text-blue-100 text-lg mb-12 max-w-xl mx-auto font-medium">
              Join over 10,000+ businesses who have accelerated their growth with Swayamfin's seamless borrowing process.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-white text-blue-600 px-10 py-5 rounded-full font-black uppercase tracking-[0.2em] text-xs hover:bg-blue-50 transition-all flex items-center justify-center gap-2">
                Get Started <Zap className="w-4 h-4" />
              </button>
              <button className="bg-white/10 text-white px-10 py-5 rounded-full font-black uppercase tracking-[0.2em] text-xs hover:bg-white/20 transition-all border border-white/20 backdrop-blur-md">
                Talk To Expert
              </button>
            </div>
          </div>
        </motion.div>

      </div>
    </div>
  );
};

export default Process;
