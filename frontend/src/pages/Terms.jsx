import React from 'react';
import { motion } from 'framer-motion';

const Terms = () => {
  return (
    <div className="bg-[#F8FAFC] min-h-screen pt-32 pb-40 font-plus-jakarta-sans overflow-hidden">
      <div className="max-w-4xl mx-auto px-6 relative z-10">
        
        {/* Header */}
        <div className="text-center mb-24 space-y-6">
           <motion.div 
             initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
             className="inline-flex items-center gap-2 bg-slate-100 text-slate-500 px-6 py-2 rounded-full text-[10px] font-black uppercase tracking-[0.4em] border border-slate-200"
           >
             Institutional Terms Node
           </motion.div>
           <h1 className="text-4xl md:text-6xl font-black text-[#1E293B] mb-6 uppercase tracking-tighter leading-none">
              Service <span className="text-[#0EA5E9] italic">Charter.</span>
           </h1>
           <p className="text-slate-500 font-medium italic text-lg md:text-xl max-w-2xl mx-auto leading-relaxed opacity-80">
              "Establishing legal parameters and operational boundaries for institutional engagement via the Swayamfin platform."
           </p>
        </div>

        <div className="bg-white p-12 md:p-16 rounded-[60px] shadow-sm border border-slate-100 space-y-16 relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-32 h-32 bg-[#0EA5E9]/5 rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-all duration-700" />
          
          <section className="relative z-10">
            <h2 className="text-2xl font-black text-[#1E293B] mb-6 uppercase tracking-tight flex items-center gap-4">
               Segment 01: Protocol Acceptance
            </h2>
            <p className="text-slate-500 text-[11px] font-black uppercase tracking-widest leading-relaxed italic">
               "By accessing the Swayamfin node (swayamfin.com), you initialize a binding agreement with these institutional conditions. Non-agreement requires immediate session termination. Terms are periodically re-synchronized with evolving RBI and digital legislative cycles."
            </p>
          </section>

          <section className="relative z-10">
            <h2 className="text-2xl font-black text-[#1E293B] mb-6 uppercase tracking-tight flex items-center gap-4">
               Segment 02: Operational Scope
            </h2>
            <p className="text-slate-500 text-[11px] font-black uppercase tracking-widest leading-relaxed italic">
               "Swayamfin is a digital infrastructure owned by Green Miles Mobility Pvt. Ltd. We operate as a Loan Service Provider (LSP). We do not initialize banking or lending transactions directly. All credit appraisals and deployments are centralized at regulated partner nodes."
            </p>
          </section>

          <section className="relative z-10">
            <h2 className="text-2xl font-black text-[#1E293B] mb-6 uppercase tracking-tight flex items-center gap-4">
               Segment 03: Personnel Eligibility
            </h2>
            <p className="text-slate-500 text-[11px] font-black uppercase tracking-widest leading-relaxed italic">
               "Eligibility requires a minimum age of 18 and sovereign residency in India with valid KYC parameters. Enterprise applications must represent a legal entity (Proprietorship, LLP, Pvt. Ltd.) registered within the Indian jurisdiction."
            </p>
          </section>

          <section className="relative z-10">
            <h2 className="text-2xl font-black text-[#1E293B] mb-6 uppercase tracking-tight flex items-center gap-4">
               Segment 04: Intellectual Assets
            </h2>
            <p className="text-slate-500 text-[11px] font-black uppercase tracking-widest leading-relaxed italic">
               "The 'Swayamfin' identity, including visual nodes, logic, and content, is the proprietary intellectual asset of Green Miles Mobility Pvt. Ltd. Unauthorized node reproduction is strictly prohibited."
            </p>
          </section>

          <div className="pt-10 border-t border-slate-50 flex justify-between items-center opacity-50 italic">
             <span className="text-[10px] font-black uppercase tracking-widest">Charter Revision v4.2</span>
             <span className="text-[10px] font-black uppercase tracking-widest">April 2025</span>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Terms;
