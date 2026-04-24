import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { getUTMParams } from '../utils/helpers';
import LeadCaptureModal from '../components/common/LeadCaptureModal';

const serviceData = {
  'housing-loans': {
    title: 'Housing Loan',
    tagline: 'Strategic Mortgage Optimization',
    description: 'In partnership with leading HFCs like DMI Housing Finance, we offer specialized home loans for purchase, construction, and renovation with minimal documentation.',
    features: [
      'PMAY subsidy benefits enabled',
      'Minimal documentation for informal income',
      'Tenure up to 20 years',
      'Fast sanction within 3-5 working days',
      'Balance transfer with top-up options'
    ],
    eligibility: [
      'Minimum age: 21 years',
      'Salaried or Self-employed profiles',
      'Min monthly income: ₹15,000',
      'Co-applicant mandatory for certain schemes'
    ],
    rates: '8.5% - 14% p.a.',
    fees: '₹5000 + GST (Min) to 1%',
    faqs: [
      { q: 'Do you fund plot purchase?', a: 'Yes, we provide composite loans for plot purchase + construction.' },
      { q: 'Can I apply if my income is cash-based?', a: 'Yes, we have specialized assessment models for informal income segments.' }
    ]
  },
  'supply-chain': {
    title: 'Supply Chain Finance',
    tagline: 'Velocity Control for Invoices & POs',
    description: 'Specialized financing for manufacturers, distributors, and retailers to manage cash flow gaps between supply and payment. Unlock the value in your supply chain.',
    features: [
      'Financing against purchase orders',
      'Invoice discounting for faster cash',
      'No collateral required for certain segments',
      'Direct payment to suppliers',
      'Short-term credit (30-90 days)'
    ],
    eligibility: [
      'Business vintage: Min 2 years',
      'Annual Turnover: Min ₹50 Lakhs',
      'Stable payment history with anchors',
      'GST registered entity'
    ],
    rates: '11% - 16% p.a.',
    fees: '1% - 2% processing fee',
    faqs: [
      { q: 'Is collateral mandatory?', a: 'No, many supply chain products are based on underlying trade documents like Invoices.' },
      { q: 'What is the disbursement time?', a: 'Once the anchor is onboarded, individual invoices can be funded in 24-48 hours.' }
    ]
  },
  'msme-loans': {
    title: 'MSME Structured Loan',
    tagline: 'Dynamic Credit for Growth Cycles',
    description: 'Tailored credit structures combining term loans and working capital to suit specific business cycles of MSMEs across various industries.',
    features: [
      'Ticket size: ₹10L to ₹5Cr',
      'Flexible repayment: 12 to 60 months',
      'Debt consolidation options',
      'Asset-backed and Cash-flow based variants',
      'Subsidized schemes for manufacturing units'
    ],
    eligibility: [
      'Valid Udyam Registration',
      'GST returns for last 12 months',
      'Positive Net Worth',
      'Business vintage: Min 3 years'
    ],
    rates: '12% - 18% p.a.',
    fees: '1.5% - 2.5% processing fee',
    faqs: [
      { q: 'Can I use this for machinery?', a: 'Yes, we have specific sub-products for machinery and equipment purchase.' },
      { q: 'Do I need a high CIBIL?', a: 'We look at business cash flows. While CIBIL is important, it is not the only criteria.' }
    ]
  },
  'lap': {
    title: 'Loan Against Property',
    tagline: 'Asset Liquidity & Equity Extraction',
    description: 'Maximize the value of your residential, commercial, or industrial property to get long-term financing at lower interest rates for business expansion.',
    features: [
      'Tenures up to 15 years',
      'Lower EMIs compared to personal loans',
      'Property remains in your use',
      'High Loan-to-Value (LTV) up to 70%',
      'Multi-property collateral accepted'
    ],
    eligibility: [
      'Clear Property Title and search report',
      'Property within defined municipal limits',
      'Stable business or salary income',
      'Property age not exceeding 40 years'
    ],
    rates: '8.5% - 12% p.a.',
    fees: '0.5% - 1.5% processing fee',
    faqs: [
      { q: 'Which properties are accepted?', a: 'Self-occupied residential, commercial, and even industrial land in some cases.' },
      { q: 'Can I take a loan for an under-construction property?', a: 'No, the property must be complete and have an OC/registry.' }
    ]
  }
};

const ServiceDetails = () => {
  const { slug } = useParams();
  const data = serviceData[slug] || serviceData['msme-loans'];
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  return (
    <div className="bg-[#F8FAFC] min-h-screen pt-32 pb-40 relative font-plus overflow-x-hidden">
      <div className="absolute top-0 right-0 w-[1200px] h-[1200px] bg-[#0EA5E9]/5 blur-[180px] rounded-full translate-x-1/2 -translate-y-1/2" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Breadcrumb */}
        <nav className="flex items-center flex-wrap gap-4 text-[9px] md:text-[10px] font-black uppercase tracking-[0.4em] text-slate-400 mb-16">
            <Link to="/" className="hover:text-[#0EA5E9]">Foundation</Link>
            <div className="w-1 h-1 rounded-full bg-slate-300" />
            <Link to="/services" className="hover:text-[#0EA5E9]">Ecosystem</Link>
            <div className="w-1 h-1 rounded-full bg-[#0EA5E9]" />
            <span className="text-[#0EA5E9]">{data.title} Asset</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          
          {/* Main Info */}
          <div className="lg:col-span-7 space-y-10">
            <motion.div 
              initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }}
              className="bg-white border border-slate-100 p-10 md:p-16 rounded-[60px] shadow-sm relative overflow-hidden group"
            >
              <div className="absolute top-0 right-0 w-80 h-80 bg-[#0EA5E9]/5 blur-[100px] rounded-full -mr-40 -mt-40 group-hover:bg-[#0EA5E9]/10 transition-colors duration-700" />
              
              <div className="inline-flex items-center gap-3 px-6 py-2.5 bg-[#0EA5E9]/10 border border-[#0EA5E9]/20 rounded-full mb-10">
                <span className="text-[#0EA5E9] text-[10px] font-black uppercase tracking-[0.4em]">Strategic Asset Class</span>
              </div>
              
              <h1 className="text-4xl md:text-6xl font-black text-[#1E293B] leading-none tracking-tighter mb-8 uppercase">
                 {data.title.split(' ').map((word, i) => (
                   <span key={i} className={i % 2 === 1 ? 'text-[#0EA5E9] italic' : ''}>{word} </span>
                 ))}
              </h1>
              
              <p className="text-lg md:text-xl text-slate-500 font-medium italic border-l-4 border-[#0EA5E9] pl-6 mb-12">
                "{data.tagline}"
              </p>
              <p className="text-slate-600 text-sm font-medium leading-relaxed mb-12 opacity-90">
                 {data.description}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 pt-10 border-t border-slate-100">
                <div className="space-y-1">
                   <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Base Rate</p>
                   <p className="text-xl md:text-2xl font-black text-[#1E293B] truncate">{data.rates}</p>
                </div>
                <div className="space-y-1">
                   <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Processing Fee</p>
                   <p className="text-base md:text-lg font-black text-[#1E293B] truncate">{data.fees}</p>
                </div>
                <div className="space-y-1">
                   <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Cycle Velocity</p>
                   <p className="text-xl md:text-2xl font-black text-[#0EA5E9]">48-72h</p>
                </div>
              </div>
            </motion.div>

            {/* Operational Scope */}
            <div className="bg-white p-10 md:p-14 border border-slate-100 rounded-[60px] shadow-sm relative overflow-hidden group">
               <div className="absolute top-0 right-0 w-32 h-32 bg-[#0EA5E9]/5 rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-all duration-700" />
               <div className="flex justify-between items-center mb-10 pb-6 border-b border-slate-50">
                 <div className="flex items-center gap-3">
                    <div className="w-1.5 h-8 bg-[#0EA5E9] rounded-full" />
                    <h2 className="text-2xl font-black text-[#1E293B] uppercase tracking-tight">Scope Matrix</h2>
                 </div>
                 <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest hidden sm:block">Primary Features</span>
               </div>
               
               <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {data.features.map((f, i) => (
                    <div key={i} className="p-6 bg-slate-50 rounded-[24px] border border-slate-100 flex items-start gap-4 hover:border-[#0EA5E9]/30 transition-all">
                       <div className="min-w-[32px] h-8 rounded-lg bg-[#0EA5E9] flex items-center justify-center text-white text-xs font-bold shadow-md">✓</div>
                       <p className="text-xs font-bold text-slate-600 uppercase tracking-widest leading-relaxed mt-1">{f}</p>
                    </div>
                  ))}
               </div>
            </div>
          </div>

          {/* Action Column */}
          <div className="lg:col-span-5 sticky top-32 space-y-10">
             <div className="bg-[#1E293B] p-12 rounded-[56px] shadow-2xl relative overflow-hidden group border border-slate-800">
                <div className="absolute top-0 right-0 w-64 h-64 bg-[#0EA5E9]/10 blur-[100px] rounded-full translate-x-1/2 -translate-y-1/2" />
                <div className="relative z-10 space-y-8 text-center md:text-left">
                   <div>
                      <h3 className="text-3xl font-black text-white uppercase tracking-tighter">Access Capital</h3>
                      <p className="text-[#0EA5E9] text-[10px] font-black uppercase tracking-[0.4em] mt-3 italic">Institutional Onboarding</p>
                   </div>
                   <p className="text-slate-400 text-sm italic font-medium leading-relaxed">
                      "Leverage our strategic network to secure the best rates for your {data.title} requirements."
                   </p>
                   <button 
                    onClick={() => setIsModalOpen(true)}
                    className="w-full btn-primary h-20 uppercase tracking-[0.4em] text-[10px] shadow-2xl hover:bg-white hover:text-[#1E293B] transition-all"
                   >
                     Initiate Application
                   </button>
                </div>
             </div>

             {/* Eligibility Details */}
             <div className="bg-white border border-slate-100 p-12 rounded-[56px] shadow-sm space-y-8 group">
                <div className="flex justify-between items-center mb-4">
                   <h3 className="text-xl font-black text-[#1E293B] uppercase tracking-tight flex items-center gap-3">
                      Criteria Matrix
                   </h3>
                   <div className="w-8 h-8 rounded-xl bg-slate-50 flex items-center justify-center text-[#0EA5E9] font-black">E</div>
                </div>
                <div className="space-y-4">
                   {data.eligibility.map((e, i) => (
                     <div key={i} className="p-4 bg-slate-50 rounded-2xl flex gap-4 items-center">
                        <span className="text-[#0EA5E9] font-black text-xs">0{i+1}.</span>
                        <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">{e}</p>
                     </div>
                   ))}
                </div>
             </div>
          </div>

        </div>

        {/* FAQs */}
        <div className="mt-40 space-y-16">
           <div className="text-center space-y-6">
              <motion.div 
                initial={{ scale: 0.9, opacity: 0 }} whileInView={{ scale: 1, opacity: 1 }}
                className="inline-flex items-center gap-2 bg-[#0EA5E9]/10 text-[#0EA5E9] px-6 py-2 rounded-full text-[10px] font-black uppercase tracking-[0.4em]"
              >
                Information Node
              </motion.div>
              <h2 className="text-4xl md:text-5xl font-black text-[#1E293B] uppercase tracking-tighter leading-none">Deep <span className="text-[#0EA5E9] italic">Interface.</span></h2>
           </div>
           <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {data.faqs.map((faq, i) => (
                <div key={i} className="p-10 md:p-14 bg-white border border-slate-100 rounded-[48px] space-y-6 shadow-sm hover:shadow-xl transition-all">
                   <h4 className="text-xl font-black text-[#1E293B] uppercase tracking-tight leading-tight flex items-start gap-4">
                     <span className="text-[#0EA5E9]">Q.</span> {faq.q}
                   </h4>
                   <p className="text-slate-500 font-medium italic border-t border-slate-100 pt-6 leading-relaxed">"{faq.a}"</p>
                </div>
              ))}
           </div>
        </div>

      </div>
      
      <LeadCaptureModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
};

export default ServiceDetails;
