import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Lock, Eye, FileLock2 } from 'lucide-react';

const Privacy = () => {
  return (
    <div className="bg-white min-h-screen pt-24 pb-20">
      <div className="max-w-4xl mx-auto px-4">
        
        <div className="text-center mb-16">
          <motion.div 
             initial={{ scale: 0.9, opacity: 0 }}
             animate={{ scale: 1, opacity: 1 }}
             className="inline-flex items-center gap-2 bg-blue-50 text-primary-blue px-4 py-2 rounded-full text-sm font-bold mb-6"
          >
            <Shield className="w-4 h-4" />
            Last Updated: April 2025
          </motion.div>
          <h1 className="text-4xl font-extrabold text-slate-900 mb-6">Privacy Policy</h1>
          <p className="text-slate-500 font-medium">Your data security and privacy rights under the Digital Personal Data Protection (DPDP) Act 2023.</p>
        </div>

        <div className="prose prose-slate max-w-none space-y-10 text-slate-600 leading-relaxed">
          
          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4 flex items-center gap-3 underline decoration-primary-blue/30 decoration-4">
               <Lock className="w-6 h-6 text-primary-blue" />
               1. Information We Collect
            </h2>
            <p>At Swayamfin (Green Miles Mobility Pvt. Ltd.), we collect information necessary to process your loan application facilitated by our partners. This includes:</p>
            <ul className="list-disc pl-6 space-y-2 mt-4">
              <li><strong>Personal Identity:</strong> Full Name, Aadhaar/PAN details (for KYC).</li>
              <li><strong>Contact Information:</strong> Mobile number, email, and current address.</li>
              <li><strong>Business Data:</strong> GST returns, bank statements, and business incorporation documents.</li>
              <li><strong>Digital Identifiers:</strong> IP address, device type, and UTM parameters to track ad performance.</li>
            </ul>
          </section>

          <section className="bg-slate-50 p-8 rounded-[32px] border border-slate-100">
            <h2 className="text-2xl font-bold text-slate-900 mb-4 flex items-center gap-3">
               <Eye className="w-6 h-6 text-primary-blue" />
               2. How We Use Your Data
            </h2>
            <p>Your data is used strictly for the following purpose under your explicit consent:</p>
            <ul className="list-disc pl-6 space-y-2 mt-4">
              <li>Assessment of loan eligibility.</li>
              <li>Sharing with our regulated NBFC/HFC partners for sanction.</li>
              <li>Communicating loan status, follow-ups, and repayments.</li>
              <li>Compliance with RBI reporting and anti-money laundering laws.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4 flex items-center gap-3 underline decoration-primary-blue/30 decoration-4">
               <FileLock2 className="w-6 h-6 text-primary-blue" />
               3. Data Sharing & Retention
            </h2>
            <p>We do not sell your personal data to third-party marketers. Your information is only shared with our regulated lending partners (e.g., DMI Housing Finance) who are also bound by RBI's data privacy codes. We retain your data for as long as necessary to fulfill the loan contract or as mandated by statutory laws.</p>
          </section>

          <section className="border-t-2 border-slate-100 pt-10">
            <h2 className="text-xl font-bold text-slate-900 mb-4">4. Your Rights (DPDP Act 2023)</h2>
            <p>Under the DPDP Act, you have the right to:</p>
            <ul className="list-disc pl-6 space-y-2 mt-4">
              <li>Request a summary of personal data being processed.</li>
              <li>Request correction or erasure of your data.</li>
              <li>Withdraw your consent at any time (though this may terminate active loan applications).</li>
              <li>Grievance redressal regarding data handling.</li>
            </ul>
          </section>

          <div className="bg-primary-darkBlue text-white p-8 rounded-3xl mt-12 shadow-xl">
             <p className="font-bold mb-2 italic">Contact Data Officer</p>
             <p className="text-blue-100 text-sm">For any data-related queries, email us at: <span className="font-bold underline">privacy@swayamfin.com</span></p>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Privacy;
