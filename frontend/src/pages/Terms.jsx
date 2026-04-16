import React from 'react';
import { motion } from 'framer-motion';
import { ScrollText, ShieldAlert, BadgeCheck } from 'lucide-react';

const Terms = () => {
  return (
    <div className="bg-[#f8fafc] min-h-screen pt-24 pb-20">
      <div className="max-w-4xl mx-auto px-4">
        
        <div className="text-center mb-16">
          <motion.div 
             initial={{ scale: 0.9, opacity: 0 }}
             animate={{ scale: 1, opacity: 1 }}
             className="inline-flex items-center gap-2 bg-slate-200 text-slate-700 px-4 py-2 rounded-full text-sm font-bold mb-6"
          >
            <ScrollText className="w-4 h-4" />
            Terms of Service
          </motion.div>
          <h1 className="text-4xl font-extrabold text-slate-900 mb-6">Terms & <span className="text-primary-blue">Conditions</span></h1>
          <p className="text-slate-500 font-medium">Please read these terms carefully before using the Swayamfin platform.</p>
        </div>

        <div className="bg-white p-8 md:p-12 rounded-[40px] shadow-fintech border border-slate-100 space-y-10 text-slate-600 leading-relaxed">
          
          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4 flex items-center gap-3">
               <BadgeCheck className="w-6 h-6 text-primary-blue" />
               1. Acceptance of Terms
            </h2>
            <p>By accessing or using swayamfin.com, you agree to be bound by these Terms and Conditions. If you do not agree, please do not use our services. We may update these terms periodically to remain compliant with changing RBI or digital laws.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4 flex items-center gap-3">
               <ShieldAlert className="w-6 h-6 text-primary-blue" />
               2. Nature of Services
            </h2>
            <p>Swayamfin is a digital platform owned by Green Miles Mobility Pvt. Ltd. We act as a **Loan Service Provider (LSP)**. We do not provide banking or lending services directly. We facilitate your application to regulated lenders. The ultimate approval and disbursement depend entirely on the lender's appraisal.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">3. Eligibility</h2>
            <p>You must be at least 18 years of age and a resident of India with valid KYC documents to apply for a loan through our platform. For business loans, you must represent a valid legal entity (Proprietorship, LLP, Pvt. Ltd., etc.) registered in India.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">4. Intellectual Property</h2>
            <p>The name "Swayamfin", logo, designs, and content are the intellectual property of Green Miles Mobility Pvt. Ltd. Unauthorized use or reproduction is strictly prohibited.</p>
          </section>

          <div className="bg-slate-50 p-6 rounded-2xl text-sm italic border border-slate-100">
             Note: These terms were last updated on April 16, 2025.
          </div>
        </div>

      </div>
    </div>
  );
};

export default Terms;
