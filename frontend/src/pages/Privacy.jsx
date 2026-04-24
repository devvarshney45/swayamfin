import React from 'react';
import { motion } from 'framer-motion';

const Privacy = () => {
  return (
    <div className="bg-[#F8FAFC] min-h-screen pt-32 pb-40 font-plus-jakarta-sans overflow-hidden">
      <div className="max-w-4xl mx-auto px-6 relative z-10">
        
        {/* Header */}
        <div className="text-center mb-24 space-y-6">
           <motion.div 
             initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
             className="inline-flex items-center gap-2 bg-[#0EA5E9]/10 text-[#0EA5E9] px-6 py-2 rounded-full text-[10px] font-black uppercase tracking-[0.4em] border border-[#0EA5E9]/10"
           >
             Data Protection Node
           </motion.div>
           <h1 className="text-4xl md:text-6xl font-black text-[#1E293B] mb-6 uppercase tracking-tighter leading-none">
              Privacy <span className="text-[#0EA5E9] italic">Protocol.</span>
           </h1>
           <p className="text-slate-500 font-medium italic text-lg md:text-xl max-w-2xl mx-auto leading-relaxed opacity-80">
              "Ensuring sovereign data rights and institutional security under the Digital Personal Data Protection (DPDP) Act 2023."
           </p>
        </div>

        <div className="space-y-12">
          
          {/* Section 1 */}
          <section className="bg-white p-12 md:p-16 rounded-[60px] shadow-sm border border-slate-100 relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#0EA5E9]/5 rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-all duration-700" />
            <h2 className="text-2xl font-black text-[#1E293B] mb-8 uppercase tracking-tight border-b border-slate-50 pb-6 flex justify-between items-center">
               <span>P01: Information Taxonomy</span>
               <span className="text-[10px] text-[#0EA5E9]">Collection Layer</span>
            </h2>
            <div className="space-y-6">
               <p className="text-slate-500 text-[11px] font-black uppercase tracking-widest leading-relaxed italic">
                  "At Swayamfin (Green Miles Mobility Pvt. Ltd.), we ingest information necessary to synchronize your loan application with our institutional partners."
               </p>
               <ul className="space-y-4">
                  {[
                    'Personal Identity: Full Name, Aadhaar/PAN descriptors (KYC Node).',
                    'Contact Parameters: Mobile link, email hub, and residential coordinates.',
                    'Operational Data: GST returns, fiscal statements, and enterprise documentation.',
                    'Digital Fingerprints: IP node, device profile, and UTM performance tracking.'
                  ].map((item, i) => (
                    <li key={i} className="flex items-center gap-4 text-[10px] font-black text-slate-500 uppercase tracking-widest italic opacity-80">
                      <div className="w-1.5 h-1.5 bg-[#0EA5E9] rounded-full" />
                      {item}
                    </li>
                  ))}
               </ul>
            </div>
          </section>

          {/* Section 2 */}
          <section className="bg-[#F8FAFC] p-12 md:p-16 rounded-[60px] border border-slate-200">
            <h2 className="text-2xl font-black text-[#1E293B] mb-8 uppercase tracking-tight border-b border-slate-200 pb-6 flex justify-between items-center">
               <span>P02: Utilization Matrix</span>
               <span className="text-[10px] text-[#0EA5E9]">Processing Grid</span>
            </h2>
            <p className="text-slate-500 text-[11px] font-black uppercase tracking-widest leading-relaxed mb-10 italic">
               "Your data is processed strictly for the following mission-critical objectives under explicit link-consent:"
            </p>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-6">
               {[
                 'Assessment of asset eligibility.',
                 'Synchronization with regulated NBFC/HFC hubs.',
                 'Cycle communication and follow-up logic.',
                 'Sovereign regulatory reporting (RBI/AML).'
               ].map((item, i) => (
                 <div key={i} className="bg-white p-6 rounded-3xl border border-slate-200 text-[10px] font-black text-[#1E293B] uppercase tracking-widest italic">
                    {item}
                 </div>
               ))}
            </ul>
          </section>

          {/* Section 3 */}
          <section className="bg-white p-12 md:p-16 rounded-[60px] shadow-sm border border-slate-100">
            <h2 className="text-2xl font-black text-[#1E293B] mb-8 uppercase tracking-tight border-b border-slate-50 pb-6 flex justify-between items-center">
               <span>P03: Retention Protocol</span>
               <span className="text-[10px] text-[#0EA5E9]">Data Life-Cycle</span>
            </h2>
            <p className="text-slate-500 text-[11px] font-black uppercase tracking-widest leading-relaxed italic">
               "External data monetization is prohibited. Information is exclusively shared with regulated lending nodes (e.g., DMI Housing Finance), bound by institutional privacy codes. Retention follows the duration of the asset contract or statutory mandate."
            </p>
          </section>

          {/* Contact Footer */}
          <div className="bg-[#1E293B] text-white p-16 rounded-[64px] shadow-2xl space-y-4 text-center relative overflow-hidden">
             <div className="absolute top-0 right-0 w-64 h-64 bg-[#0EA5E9]/10 blur-[100px] rounded-full translate-x-1/2 -translate-y-1/2" />
             <p className="text-[10px] font-black uppercase tracking-[0.4em] italic opacity-60">Security Personnel Liaison</p>
             <p className="text-sm md:text-lg font-medium">For data-related inquiries, establish link via: <span className="text-[#0EA5E9] font-black hover:underline cursor-pointer">privacy@swayamfin.com</span></p>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Privacy;
