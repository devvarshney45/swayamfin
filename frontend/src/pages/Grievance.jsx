import React from 'react';
import { motion } from 'framer-motion';
import { HelpCircle, Mail, Phone, AlertTriangle, ShieldCheck } from 'lucide-react';

const Grievance = () => {
  return (
    <div className="bg-slate-50 min-h-screen pt-24 pb-20">
      <div className="max-w-4xl mx-auto px-4">
        
        <div className="text-center mb-16">
          <motion.div 
             initial={{ scale: 0.9, opacity: 0 }}
             animate={{ scale: 1, opacity: 1 }}
             className="inline-flex items-center gap-2 bg-red-50 text-red-600 px-4 py-2 rounded-full text-sm font-bold mb-6"
          >
            <AlertTriangle className="w-4 h-4" />
            Grievance Redressal Policy
          </motion.div>
          <h1 className="text-4xl font-extrabold text-slate-900 mb-6">We Are <span className="text-primary-blue">Here to Listen</span></h1>
          <p className="text-slate-500 font-medium">Your satisfaction is our priority. If you have an issue, we are committed to resolving it within 30 days.</p>
        </div>

        <div className="space-y-8">
          
          <section className="bg-white p-8 md:p-10 rounded-[32px] shadow-fintech border border-slate-100">
            <h2 className="text-2xl font-bold text-slate-900 mb-8 border-b border-slate-50 pb-4">
              Step 1: Contact Your Relationship Manager
            </h2>
            <p className="text-slate-600 leading-relaxed mb-6">
              Most issues can be resolved quickly by speaking with your assigned Relationship Manager (RM). Please reach out to them first for a speedy resolution.
            </p>
            <div className="flex items-center gap-4 text-primary-blue font-bold">
               <Phone className="w-5 h-5" />
               <span>Branch Helplines Available in 'Branches' Section</span>
            </div>
          </section>

          <section className="bg-white p-8 md:p-10 rounded-[32px] shadow-fintech border border-slate-100 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-6 opacity-10">
              <Mail className="w-24 h-24" />
            </div>
            <h2 className="text-2xl font-bold text-slate-900 mb-8 border-b border-slate-50 pb-4">
              Step 2: Escalate to Grievance Redressal Officer
            </h2>
            <p className="text-slate-600 leading-relaxed mb-8">
              If your query is not resolved at the branch level within 7 working days, you can directly contact our Nodal Grievance Redressal Officer.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100">
                <div className="text-xs font-bold text-slate-400 uppercase mb-2 tracking-widest">Officer Name</div>
                <div className="text-lg font-bold text-slate-900">Vikrant Prasad (CEO)</div>
              </div>
              <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100">
                <div className="text-xs font-bold text-slate-400 uppercase mb-2 tracking-widest">Email Address</div>
                <div className="text-lg font-bold text-primary-blue">grievance@swayamfin.com</div>
              </div>
              <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100">
                <div className="text-xs font-bold text-slate-400 uppercase mb-2 tracking-widest">Phone Number</div>
                <div className="text-lg font-bold text-slate-900">+91-11-44728117</div>
              </div>
              <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100">
                <div className="text-xs font-bold text-slate-400 uppercase mb-2 tracking-widest">Response Time</div>
                <div className="text-lg font-bold text-success-green">Within 48 Business Hours</div>
              </div>
            </div>
          </section>

          <section className="bg-white p-8 md:p-10 rounded-[32px] shadow-fintech border border-slate-100">
            <h2 className="text-2xl font-bold text-slate-900 mb-6 border-b border-slate-50 pb-4">
              Step 3: Partner Escalation
            </h2>
            <p className="text-slate-600 leading-relaxed italic mb-6">
              If you are not satisfied with our resolution, you can contact the Grievance Cell of our regulated lending partner.
            </p>
            <div className="p-6 border-2 border-dashed border-slate-200 rounded-3xl flex flex-col md:flex-row items-center justify-between gap-6 hover:border-primary-blue transition-colors group cursor-pointer">
              <div className="flex items-center gap-4">
                 <div className="w-12 h-12 bg-primary-blue/5 rounded-2xl flex items-center justify-center text-primary-blue group-hover:scale-110 transition-transform">
                   <ShieldCheck className="w-6 h-6" />
                 </div>
                 <div>
                   <h4 className="font-bold text-slate-900">DMI Housing Finance Grievance Cell</h4>
                   <p className="text-sm text-slate-400">Escalate directly to our principal partner</p>
                 </div>
              </div>
              <a href="https://dmihousingfinance.in/grievance-redressal" target="_blank" rel="noreferrer" className="px-6 py-2 bg-slate-100 text-slate-600 font-bold rounded-xl hover:bg-primary-blue hover:text-white transition-all">
                Visit Portal
              </a>
            </div>
          </section>

          <div className="text-center mt-12 bg-blue-50/50 p-8 rounded-3xl border border-blue-100">
            <p className="text-slate-600 font-medium">
              We track every complaint via a unique ticket ID. <br />
              Requirement of RBI Master Direction on LSP Compliance (April 2024).
            </p>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Grievance;
