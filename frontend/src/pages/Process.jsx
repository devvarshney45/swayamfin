import React from 'react';
import { motion } from 'framer-motion';
import { FileText, Search, ShieldCheck, CreditCard, CheckCircle2, Headphones } from 'lucide-react';

const Process = () => {
  const steps = [
    {
      title: "Enquiry & Callback",
      desc: "Fill the online form or call us. Our expert relationship manager calls you back within 30 minutes.",
      time: "Same Day",
      icon: Search,
      color: "blue"
    },
    {
      title: "Profile Assessment",
      desc: "We assess your requirement, business longevity, and cash flow to find the best lending match.",
      time: "24 Hours",
      icon: ShieldCheck,
      color: "green"
    },
    {
      title: "Document Collection",
      desc: "Minimal KYC and financial documents collected digitally or at your doorstep for convenience.",
      time: "Next Day",
      icon: FileText,
      color: "gold"
    },
    {
      title: "Sanction & Terms",
      desc: "Our partner NBFC/HFC sanctions the loan. All terms, rates, and fees are discussed transparently.",
      time: "2-3 Days",
      icon: CreditCard,
      color: "blue"
    },
    {
      title: "Disbursement",
      desc: "Funds are directly disbursed into your bank account. Growth starts immediately.",
      time: "Instant",
      icon: CheckCircle2,
      color: "green"
    },
    {
      title: "Active Support",
      desc: "Dedicated RM assigned for all post-loan queries, statements, and future top-ups.",
      time: "Forever",
      icon: Headphones,
      color: "purple"
    }
  ];

  return (
    <div className="bg-[#020617] min-h-screen pt-24 pb-20 font-dmsans">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-20">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-playfair font-black text-white mb-6"
          >
            Our Simple <span className="text-primary-gold italic">6-Step Workflow</span>
          </motion.h1>
          <p className="text-sm font-bold uppercase tracking-widest text-slate-400 max-w-2xl mx-auto italic">
            We've eliminated the red tape. Experience a lending process designed for speed and clarity.
          </p>
        </div>

        <div className="relative">
          {/* Vertical line for desktop */}
          <div className="absolute left-1/2 top-0 bottom-0 w-px bg-white/10 hidden md:block" />

          <div className="space-y-20">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className={`flex flex-col md:flex-row items-center gap-8 ${index % 2 !== 0 ? 'md:flex-row-reverse' : ''}`}
              >
                {/* Content */}
                <div className="flex-1 text-center md:text-left">
                  <div className={`inline-block px-4 py-1.5 rounded-full text-[10px] font-black mb-4 uppercase tracking-[0.2em] border shadow-sm
                    ${step.color === 'blue' ? 'bg-blue-500/10 text-blue-400 border-blue-500/20' : 
                      step.color === 'green' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' : 
                      step.color === 'purple' ? 'bg-purple-500/10 text-purple-400 border-purple-500/20' : 
                      'bg-primary-gold/10 text-primary-gold border-primary-gold/20'}`}
                  >
                    Step {index + 1} • {step.time}
                  </div>
                  <h3 className="text-2xl font-playfair font-black text-white mb-4">{step.title}</h3>
                  <p className="text-slate-400 leading-relaxed text-sm font-bold uppercase tracking-widest pr-4">"{step.desc}"</p>
                </div>

                {/* Icon Hub */}
                <div className="relative z-10">
                  <div className={`w-20 h-20 rounded-[28px] flex items-center justify-center shadow-2xl ring-4 ring-[#020617] border border-white/10 backdrop-blur-md
                    ${step.color === 'blue' ? 'bg-blue-500/20 text-blue-400' : 
                      step.color === 'green' ? 'bg-emerald-500/20 text-emerald-400' : 
                      step.color === 'purple' ? 'bg-purple-500/20 text-purple-400' : 'bg-primary-gold/20 text-primary-gold'}`}
                  >
                    <step.icon className="w-10 h-10" />
                  </div>
                </div>

                {/* Spacer for alignment */}
                <div className="flex-1 hidden md:block" />
              </motion.div>
            ))}
          </div>
        </div>

        <div className="mt-32 text-center bg-[#0B0F19] rounded-[48px] p-12 md:p-20 border border-white/5 relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary-gold/10 blur-[80px] rounded-full -translate-y-1/2 translate-x-1/2 group-hover:bg-primary-gold/20 transition-all duration-700" />
          <h2 className="text-3xl font-playfair font-black text-white mb-6 relative z-10">Ready to experience the Swayamfin speed?</h2>
          <p className="text-slate-400 mb-10 text-sm font-bold uppercase tracking-widest relative z-10">Your application takes less than 5 minutes to complete.</p>
          <a href="/" className="inline-block bg-primary-gold text-[#020617] font-black px-12 py-5 rounded-full shadow-xl hover:bg-white hover:scale-105 transition-all duration-300 text-xs uppercase tracking-widest relative z-10">
            Start Your Journey Now
          </a>
        </div>
      </div>
    </div>
  );
};

export default Process;
