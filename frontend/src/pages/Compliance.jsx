import React from 'react';
import { motion } from 'framer-motion';

const Compliance = () => {
  return (
    <div className="bg-[#F8FAFC] min-h-screen pt-32 pb-40 font-plus-jakarta-sans overflow-hidden">
      <div className="max-w-4xl mx-auto px-6 relative z-10">
        
        {/* Header */}
        <div className="text-center mb-24 space-y-6">
           <motion.div 
             initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
             className="inline-flex items-center gap-2 bg-emerald-50 text-emerald-600 px-6 py-2 rounded-full text-[10px] font-black uppercase tracking-[0.4em] border border-emerald-100"
           >
             Institutional Integrity Node
           </motion.div>
           <h1 className="text-4xl md:text-6xl font-black text-[#1E293B] mb-6 uppercase tracking-tighter leading-none">
              Governance <span className="text-[#0EA5E9] italic">Framework.</span>
           </h1>
           <p className="text-slate-500 font-medium italic text-lg md:text-xl max-w-2xl mx-auto leading-relaxed opacity-80">
              "Ensuring fair practice cycles and ethical lending protocols in accordance with RBI institutional directives."
           </p>
        </div>

        <div className="space-y-12">
          
          {/* Section 1 */}
          <section className="bg-white p-12 md:p-16 rounded-[60px] shadow-sm border border-slate-100 relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#0EA5E9]/5 rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-all duration-700" />
            <h2 className="text-2xl font-black text-[#1E293B] mb-8 uppercase tracking-tight border-b border-slate-50 pb-6 flex justify-between items-center">
               <span>Compliance 01: LSP Designation</span>
               <span className="text-[10px] text-[#0EA5E9]">Legal Node</span>
            </h2>
            <div className="space-y-6">
               <p className="text-slate-500 text-[11px] font-black uppercase tracking-widest leading-relaxed italic">
                  "Swayamfin (a brand of Green Miles Mobility Pvt. Ltd., CIN: U66190DL2019PTC359196) operates as a Loan Service Provider (LSP). We facilitate sourcing and hub-processing of asset applications for our regulated NBFC and HFC partners."
               </p>
               <p className="text-[#1E293B] font-black text-sm uppercase tracking-tight border-l-4 border-[#0EA5E9] pl-6 italic">
                  "We do not engage in balance-sheet lending directly. All capital deployment decisions are centralized at our regulated partner nodes."
               </p>
            </div>
          </section>

          {/* Section 2 */}
          <section className="bg-white p-12 md:p-16 rounded-[60px] shadow-sm border border-slate-100">
            <h2 className="text-2xl font-black text-[#1E293B] mb-8 uppercase tracking-tight border-b border-slate-50 pb-6 flex justify-between items-center">
               <span>Compliance 02: Fiscal Transparency</span>
               <span className="text-[10px] text-[#0EA5E9]">Yield Matrix</span>
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-slate-50/50">
                    <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Asset Segment</th>
                    <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Pricing (p.a.)</th>
                    <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Cycle Depth</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  <tr className="hover:bg-slate-50/50 transition-colors">
                    <td className="px-6 py-6 font-black text-[#1E293B] uppercase tracking-tight text-sm">Supply Chain Finance</td>
                    <td className="px-6 py-6 font-black text-[#0EA5E9] text-sm italic">12% - 18%</td>
                    <td className="px-6 py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">Up to 24 Mos</td>
                  </tr>
                  <tr className="hover:bg-slate-50/50 transition-colors">
                    <td className="px-6 py-6 font-black text-[#1E293B] uppercase tracking-tight text-sm">Hybrid MSME Credit</td>
                    <td className="px-6 py-6 font-black text-[#0EA5E9] text-sm italic">11% - 19%</td>
                    <td className="px-6 py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">Up to 10 Yrs</td>
                  </tr>
                </tbody>
              </table>
            </div>
            
            <div className="mt-12 bg-slate-50 p-10 rounded-[40px] border border-slate-100">
               <h4 className="text-[10px] font-black text-[#1E293B] mb-6 uppercase tracking-[0.2em] italic">Supplemental Disclosures</h4>
               <ul className="space-y-4">
                  {[
                    'Processing Fees: 0.5% - 2.0% calculated on total loan deployment.',
                    'Delayed Settlement: Penal charges applied as per partner node policy (2% monthly approx).',
                    'Strategic Prepayment: Exit charges range from 0% - 5% based on asset tenure.'
                  ].map((item, i) => (
                    <li key={i} className="flex items-center gap-4 text-[10px] font-black text-slate-500 uppercase tracking-widest italic opacity-80">
                      <div className="w-1.5 h-1.5 bg-[#0EA5E9] rounded-full" />
                      {item}
                    </li>
                  ))}
               </ul>
            </div>
          </section>

          {/* Section 3 */}
          <section className="bg-white p-12 md:p-16 rounded-[60px] shadow-sm border border-slate-100">
            <h2 className="text-2xl font-black text-[#1E293B] mb-8 uppercase tracking-tight border-b border-slate-50 pb-6 flex justify-between items-center">
               <span>Compliance 03: Recovery Ethics</span>
               <span className="text-[10px] text-[#0EA5E9]">Zero-Coercion Zone</span>
            </h2>
            <p className="text-slate-500 text-[11px] font-black uppercase tracking-widest leading-relaxed italic">
               "Swayamfin enforces a zero-tolerance protocol regarding coercive recovery tactics. Institutional personnel are trained for ethical engagement, strictly adhering to RBI directives on outsourcing and debt management."
            </p>
          </section>

          {/* CTA Footer */}
          <div className="bg-[#1E293B] text-white p-16 rounded-[64px] shadow-2xl text-center space-y-10 relative overflow-hidden">
             <div className="absolute top-0 right-0 w-64 h-64 bg-[#0EA5E9]/10 blur-[100px] rounded-full translate-x-1/2 -translate-y-1/2" />
             <div className="relative z-10 space-y-4">
                <h3 className="text-2xl md:text-3xl font-black uppercase tracking-tighter">Policy Clarification.</h3>
                <p className="text-blue-100/60 italic text-sm md:text-lg">"Committed to 100% operational transparency across the institutional grid."</p>
             </div>
             <div className="flex flex-col md:flex-row justify-center gap-6 relative z-10">
                <a href="/grievance" className="bg-white text-[#1E293B] font-black px-10 py-5 rounded-2xl text-[10px] uppercase tracking-widest hover:bg-[#0EA5E9] hover:text-white transition-all shadow-2xl">Ombudsman Node</a>
                <a href="/contact" className="border-2 border-white/20 text-white font-black px-10 py-5 rounded-2xl text-[10px] uppercase tracking-widest hover:bg-white hover:text-[#1E293B] transition-all">Hub Liaison</a>
             </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Compliance;
