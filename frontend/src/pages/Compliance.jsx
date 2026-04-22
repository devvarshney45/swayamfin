import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Info, Scale, Gavel } from 'lucide-react';

const Compliance = () => {
  return (
    <div className="bg-slate-50 min-h-screen pt-24 pb-20">
      <div className="max-w-4xl mx-auto px-4">
        
        <div className="text-center mb-16">
          <motion.div 
             initial={{ scale: 0.9, opacity: 0 }}
             animate={{ scale: 1, opacity: 1 }}
             className="inline-flex items-center gap-2 bg-success-green/10 text-success-green px-4 py-2 rounded-full text-sm font-bold mb-6"
          >
            <ShieldCheck className="w-4 h-4" />
            RBI Compliant LSP Platform
          </motion.div>
          <h1 className="text-4xl font-extrabold text-slate-900 mb-6">Fair Practice Code & Compliance</h1>
          <p className="text-slate-500 font-medium">Mandatory disclosures and ethical lending guidelines followed by Swayamfin.</p>
        </div>

        <div className="space-y-8">
          
          <section className="bg-white p-8 md:p-10 rounded-[32px] shadow-fintech border border-slate-100">
            <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-3">
              <Info className="text-primary-blue" />
              1. Our Status as LSP
            </h2>
            <p className="text-slate-600 leading-relaxed mb-4">
              Swayamfin (a brand of Green Miles Mobility Pvt. Ltd., CIN: U66190DL2019PTC359196) operates as a **Loan Service Provider (LSP)**. We facilitate the sourcing and processing of loan applications for our regulated NBFC and HFC partners.
            </p>
            <p className="text-slate-600 leading-relaxed font-bold italic">
              "We do not lend money directly. All lending decisions are at the sole discretion of our regulated partners."
            </p>
          </section>

          <section className="bg-white p-8 md:p-10 rounded-[32px] shadow-fintech border border-slate-100">
            <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-3">
              <Scale className="text-primary-blue" />
              2. Interest Rates & Fee Transparency
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b-2 border-slate-100">
                    <th className="py-4 font-bold text-slate-900">Loan Product</th>
                    <th className="py-4 font-bold text-slate-900">Interest Range (p.a.)</th>
                    <th className="py-4 font-bold text-slate-900">Max Tenure</th>
                  </tr>
                </thead>
                <tbody className="text-slate-600">
                  <tr className="border-b border-slate-50">
                    <td className="py-4 font-bold">Supply Chain Financing</td>
                    <td className="py-4">12% - 18%</td>
                    <td className="py-4">Up to 24 Months</td>
                  </tr>
                  <tr className="border-b border-slate-50">
                    <td className="py-4 font-bold">Hybrid MSME Products</td>
                    <td className="py-4">11% - 19%</td>
                    <td className="py-4">Up to 10 Years</td>
                  </tr>
                </tbody>
              </table>
            </div>
            
            <div className="mt-8 p-6 bg-slate-50 rounded-2xl border border-slate-100">
               <h4 className="text-sm font-bold text-slate-900 mb-3 uppercase tracking-wider">Other Disclosures</h4>
               <ul className="space-y-3 text-sm text-slate-600 font-medium">
                  <li className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 bg-primary-blue rounded-full mt-1.5" />
                    <span>**Processing Fees**: Range from 0.5% to 2% of the loan amount depending on the partner lender.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 bg-primary-blue rounded-full mt-1.5" />
                    <span>**Penal Charges**: Late payment penalties are charged as per the partner lender's policy (usually 2% per month on overdue amount).</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 bg-primary-blue rounded-full mt-1.5" />
                    <span>**Prepayment**: Foreclosure charges vary from 0% to 5% based on the loan type and tenure.</span>
                  </li>
               </ul>
            </div>
            <p className="mt-6 text-sm text-slate-400 italic">
              * Rates are indicative and subject to change based on internal credit assessments.
            </p>
          </section>

          <section className="bg-white p-8 md:p-10 rounded-[32px] shadow-fintech border border-slate-100">
            <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-3">
              <Gavel className="text-primary-blue" />
              3. Ethical Recovery Practices
            </h2>
            <p className="text-slate-600 leading-relaxed">
              Swayamfin follows a zero-tolerance policy towards coercive recovery practices. Our team and partners are trained to behave ethically and respectfully during all collection activities, strictly following RBI's guidelines on outsourcing and debt collection.
            </p>
          </section>

          <div className="bg-primary-darkBlue text-white p-10 rounded-[40px] shadow-2xl text-center">
             <h3 className="text-xl font-bold mb-4">Questions about our policies?</h3>
             <p className="text-blue-100 mb-6 italic pr-4">We are committed to 100% transparency in all our operations.</p>
             <div className="flex flex-col md:flex-row justify-center gap-4">
               <a href="/grievance" className="bg-white text-primary-darkBlue font-bold px-8 py-3 rounded-xl hover:bg-primary-lightBlue transition-all">Grievance Redressal</a>
               <a href="/contact" className="border-2 border-white/20 text-white font-bold px-8 py-3 rounded-xl hover:bg-white/10 transition-all">Contact Compliance Office</a>
             </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Compliance;
