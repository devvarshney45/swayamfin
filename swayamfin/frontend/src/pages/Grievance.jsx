import React from 'react';
import { motion } from 'framer-motion';

const Grievance = () => {
  return (
    <div className="bg-[#F8FAFC] min-h-screen pt-32 pb-40 font-plus-jakarta-sans overflow-hidden">
      <div className="max-w-4xl mx-auto px-6 relative z-10">
        
        {/* Header */}
        <div className="text-center mb-24 space-y-6">
           <motion.div 
             initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
             className="inline-flex items-center gap-2 bg-rose-50 text-rose-600 px-6 py-2 rounded-full text-[10px] font-black uppercase tracking-[0.4em] border border-rose-100"
           >
             Grievance Redressal Protocol
           </motion.div>
           <h1 className="text-4xl md:text-6xl font-black text-[#1E293B] mb-6 uppercase tracking-tighter leading-none">
              Client <span className="text-[#0EA5E9] italic">Ombudsman.</span>
           </h1>
           <p className="text-slate-500 font-medium italic text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
              "Ensuring institutional accountability through standardized dispute resolution and operational transparency."
           </p>
        </div>

        <div className="space-y-12">
          
          {/* Step 1 */}
          <section className="bg-white p-12 md:p-16 rounded-[60px] shadow-sm border border-slate-100 relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#0EA5E9]/5 rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-all duration-700" />
            <h2 className="text-2xl font-black text-[#1E293B] mb-8 uppercase tracking-tight border-b border-slate-50 pb-6 flex justify-between items-center">
               <span>P01: Relationship Interface</span>
               <span className="text-[10px] text-[#0EA5E9]">Primary Node</span>
            </h2>
            <p className="text-slate-500 text-[11px] font-black uppercase tracking-widest leading-relaxed mb-10 italic">
               "Operational discrepancies should initially be routed to your assigned Relationship Manager for tactical resolution within 48 hours."
            </p>
            <div className="bg-slate-50 p-6 rounded-3xl border border-slate-100 inline-block">
               <p className="text-[10px] font-black text-[#1E293B] uppercase tracking-widest leading-none">Branch Helplines Available in Hub Directory</p>
            </div>
          </section>

          {/* Step 2 */}
          <section className="bg-white p-12 md:p-16 rounded-[60px] shadow-sm border border-slate-100 relative overflow-hidden group">
            <h2 className="text-2xl font-black text-[#1E293B] mb-8 uppercase tracking-tight border-b border-slate-50 pb-6 flex justify-between items-center">
               <span>P02: Nodal Escalation</span>
               <span className="text-[10px] text-[#0EA5E9]">Level 2 Matrix</span>
            </h2>
            <p className="text-slate-500 text-[11px] font-black uppercase tracking-widest leading-relaxed mb-12 italic">
               "If initial resolution fails within 7 business cycles, escalate directly to the Nodal Grievance Officer via the following institutional credentials."
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
               <div className="p-8 bg-slate-50 rounded-[32px] border border-slate-100 space-y-2">
                  <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Designated Officer</p>
                  <p className="text-lg font-black text-[#1E293B] uppercase tracking-tighter">Vikkrant Prasad (CEO)</p>
               </div>
               <div className="p-8 bg-slate-50 rounded-[32px] border border-slate-100 space-y-2">
                  <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Direct Digital Link</p>
                  <p className="text-lg font-black text-[#0EA5E9] lowercase">grievance@swayamfin.com</p>
               </div>
               <div className="p-8 bg-slate-50 rounded-[32px] border border-slate-100 space-y-2">
                  <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Comm Terminal</p>
                  <p className="text-lg font-black text-[#1E293B] tracking-tighter">+91-11-44728117</p>
               </div>
               <div className="p-8 bg-[#1E293B] rounded-[32px] border border-slate-800 space-y-2">
                  <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">SLA Window</p>
                  <p className="text-lg font-black text-white uppercase tracking-tighter">48 Business Hours</p>
               </div>
            </div>
          </section>

          {/* Step 3 */}
          <section className="bg-white p-12 md:p-16 rounded-[60px] shadow-sm border border-slate-100 h-fit">
            <h2 className="text-2xl font-black text-[#1E293B] mb-8 uppercase tracking-tight border-b border-slate-50 pb-6 flex justify-between items-center">
               <span>P03: Partner Protocol</span>
               <span className="text-[10px] text-[#0EA5E9]">Lender Interface</span>
            </h2>
            <p className="text-slate-500 text-[11px] font-black uppercase tracking-widest leading-relaxed mb-6 italic">
               "Ultimate escalation available via the principal regulator of our institutional lending partners."
            </p>
            <div className="p-10 border-2 border-dashed border-slate-200 rounded-[40px] flex flex-col md:flex-row items-center justify-between gap-10 hover:border-[#0EA5E9] transition-all group">
               <div className="space-y-2">
                  <h4 className="text-xl font-black text-[#1E293B] uppercase tracking-tight">DMI Housing Finance Grievance Cell</h4>
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Principal Regulated Entity Portal</p>
               </div>
               <a href="https://dmihousingfinance.in/grievance-redressal" target="_blank" rel="noreferrer" className="px-10 py-4 bg-slate-100 text-[#1E293B] font-black rounded-2xl text-[10px] uppercase tracking-widest hover:bg-[#1E293B] hover:text-white transition-all">
                 Initialize Link
               </a>
            </div>
          </section>

          <div className="text-center mt-24 p-12 bg-white border border-slate-100 rounded-[48px] shadow-sm space-y-4">
            <p className="text-slate-400 text-[10px] font-black uppercase tracking-[0.2em] leading-relaxed max-w-2xl mx-auto italic">
              "We track every incident via a unique digital ticket ID. Regulatory compliance maintained as per RBI Master Direction on LSP Governance (April 2024)."
            </p>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Grievance;
