import React from 'react';
import { motion } from 'framer-motion';

const Timeline = () => {
  const steps = [
    {
      title: 'Step 1: Application Form Submission',
      desc: 'Complete our streamlined digital form in under 5 minutes with basic identity and financial parameters.'
    },
    {
      title: 'Step 2: Form Verification',
      desc: 'Our proprietary verification engine validates your submission against institutional credit standards instantly.'
    },
    {
      title: 'Step 3: Due Diligence',
      desc: 'Seasoned analysts conduct a comprehensive assessment of your profile to ensure optimal risk mitigation.'
    },
    {
      title: 'Step 4: Disbursement',
      desc: 'Upon final approval, funds are deployed directly to your designated account through secure channels.'
    }
  ];

  return (
    <section className="py-24 bg-[#F8FAFC] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-20 space-y-4">
          <div className="inline-flex items-center gap-3 px-5 py-2 bg-[#0EA5E9]/10 border border-[#0EA5E9]/20 rounded-full">
            <span className="text-[#0EA5E9] text-[10px] font-black uppercase tracking-[0.4em]">Execution Protocol</span>
          </div>
          <h2 className="text-4xl md:text-6xl font-black text-[#1E293B] uppercase tracking-tight">
            How It <span className="text-[#0EA5E9] italic">Works</span>
          </h2>
        </div>

        {/* Timeline Grid */}
        <div className="relative">
          {/* Vertical Connecting Line (Desktop) */}
          <div className="hidden lg:block absolute top-[60px] left-0 right-0 h-1 bg-slate-200 z-0" />
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 relative z-10">
            {steps.map((step, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group flex flex-col items-center lg:items-start text-center lg:text-left"
              >
                {/* Number Circle */}
                <div className="w-20 h-20 bg-white border-4 border-[#0EA5E9] rounded-full flex items-center justify-center mb-8 shadow-xl group-hover:scale-110 transition-transform bg-white relative z-20">
                  <span className="text-2xl font-black text-[#0EA5E9]">0{i + 1}</span>
                </div>
                
                <h3 className="text-lg font-black text-[#1E293B] uppercase tracking-tight mb-4 group-hover:text-[#0EA5E9] transition-colors">
                  {step.title.split(': ')[1]}
                </h3>
                <p className="text-sm text-slate-500 font-medium leading-relaxed italic">
                  {step.desc}
                </p>
                
                {/* Visual Step Label */}
                <div className="mt-6 inline-flex px-4 py-1.5 bg-slate-200 text-slate-500 rounded-full text-[9px] font-black uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">
                  Protocol 0{i + 1}
                </div>
              </motion.div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};

export default Timeline;
