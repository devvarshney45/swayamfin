import React, { useState } from 'react';
import { motion } from 'framer-motion';
import LeadCaptureModal from '../common/LeadCaptureModal';

const CTASection = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <section className="py-24 bg-white relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-[#0EA5E9]/5 to-transparent" />
      
      <div className="max-w-4xl mx-auto px-4 text-center relative z-10 space-y-10">
        <motion.div
           initial={{ opacity: 0, scale: 0.9 }}
           whileInView={{ opacity: 1, scale: 1 }}
           className="space-y-6"
        >
          <h2 className="text-4xl md:text-6xl font-black text-[#1E293B] uppercase tracking-tight leading-tight">
            See How It <span className="text-[#0EA5E9] italic">Works</span>
          </h2>
          <p className="text-xl text-slate-500 font-medium max-w-2xl mx-auto italic">
            "Simple steps to get your loan approved and disbursed"
          </p>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-6"
        >
          <button 
            onClick={() => setIsModalOpen(true)}
            className="btn-primary py-6 px-12 text-xs uppercase tracking-[0.3em] shadow-2xl"
          >
            Start Application
          </button>
          <div className="flex items-center gap-4 text-slate-400">
            <span className="w-8 h-0.5 bg-slate-200" />
            <p className="text-[10px] font-black uppercase tracking-widest">Secure • 5 Min</p>
            <span className="w-8 h-0.5 bg-slate-200" />
          </div>
        </motion.div>

        <div className="pt-10 grid grid-cols-1 md:grid-cols-3 gap-8">
           {[
             { title: 'Digital First', desc: '100% online process from start to finish' },
             { title: 'Transparent', desc: 'No hidden fees or complex conditions' },
             { title: 'Institutional', desc: 'Bank-grade security for your data' }
           ].map((item, i) => (
             <div key={i} className="space-y-2">
                <p className="text-[10px] font-black text-[#0EA5E9] uppercase tracking-widest">{item.title}</p>
                <p className="text-xs text-slate-500 font-medium">{item.desc}</p>
             </div>
           ))}
        </div>
      </div>

      <LeadCaptureModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </section>
  );
};

export default CTASection;
