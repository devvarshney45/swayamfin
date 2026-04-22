import React from 'react';
import { motion } from 'framer-motion';
import { 
  FileEdit, 
  ScanSearch, 
  Handshake, 
  Wallet2,
  ChevronRight
} from 'lucide-react';

const Timeline = () => {
  const steps = [
    {
      title: 'Digital Application',
      desc: 'Fill out our simple 5-minute form with basic details.',
      icon: FileEdit,
      time: '5 Mins'
    },
    {
      title: 'Expert Evaluation',
      desc: 'Our credit experts review your profile against 30+ lenders.',
      icon: ScanSearch,
      time: '24 Hours'
    },
    {
      title: 'NBFC Approval',
      desc: 'Get customized offers from our RBI-registered partners.',
      icon: Handshake,
      time: 'Instant'
    },
    {
      title: 'Disbursement',
      desc: 'Funds are credited directly to your business account.',
      icon: Wallet2,
      time: '48 Hours'
    }
  ];

  return (
    <section className="py-24 bg-[#0B0F19] relative overflow-hidden font-dmsans">
      <div className="max-w-7xl mx-auto px-4 relative z-10">
        <div className="text-center mb-20">
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 text-primary-gold text-[10px] font-black uppercase tracking-[0.3em] mb-4 border border-white/5 shadow-2xl"
          >
            Efficiency at Every Step
          </motion.div>
          <h2 className="text-4xl md:text-5xl font-playfair font-black text-white mb-6">
            The Journey to <span className="text-primary-gold italic">Financial Growth</span>
          </h2>
          <p className="text-slate-500 max-w-2xl mx-auto font-bold text-xs uppercase tracking-widest leading-relaxed">
            Fast, transparent, and completely digital. We've simplified lending 
            so you can focus on what matters - your business.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 relative">
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
              <div className="relative mb-10 inline-block">
                <div 
                  className="w-24 h-24 bg-white/5 backdrop-blur-sm border border-white/10 rounded-[36px] flex items-center justify-center text-primary-gold group-hover:bg-primary-gold group-hover:text-[#020617] transition-all duration-700 shadow-2xl group-hover:shadow-primary-gold/20"
                >
                  <step.icon className="w-12 h-12" />
                </div>
                <div className="absolute -bottom-2 -right-2 bg-primary-gold text-[#020617] text-[9px] font-black px-3 py-1.5 rounded-xl shadow-lg uppercase tracking-tighter italic">
                  {step.time}
                </div>
              </div>

              <h4 className="text-white font-playfair font-black text-xl mb-3 group-hover:text-primary-gold transition-colors">{step.title}</h4>
              <p className="text-slate-500 text-[10px] uppercase font-bold tracking-tight leading-relaxed px-6 group-hover:text-slate-300 transition-colors">
                {step.desc}
              </p>
              
              {idx !== steps.length - 1 && (
                <div className="md:hidden flex justify-center py-10 opacity-20">
                  <ChevronRight className="w-8 h-8 rotate-90 text-primary-gold" />
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
