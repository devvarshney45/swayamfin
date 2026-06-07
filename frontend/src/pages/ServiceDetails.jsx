import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { getUTMParams } from '../utils/helpers';
import LeadCaptureModal from '../components/common/LeadCaptureModal';

const serviceData = {
  'housing-loans': {
    title: 'Housing Loan',
    tagline: 'Home & Construction Financing',
    description: 'We help you get the money you need to buy your dream home or build a new one. With our fast process, you can move into your house sooner.',
    features: [
      'Loans for buying or building a house',
      'Minimal paperwork required',
      'Pay back over many years (up to 20)',
      'Fast approval in 3-5 days',
      'Low interest rates starting from 8.5%'
    ],
    eligibility: [
      'Age over 21 years',
      'Consistent monthly income of ₹15,000+',
      'Available for salaried and business owners',
      'Simple ID and income proof required'
    ],
    rates: '8.5% - 14% p.a',
    fees: 'INR 3000 + GST',
    faqs: [
      { q: 'Can I buy a plot of land?', a: 'Yes, we provide loans to buy land and build your house on it.' },
      { q: 'Is it okay if I have informal income?', a: 'Yes, we have special ways to check your income even if it is not documented in standard ways.' }
    ]
  },
  'lap': {
    title: 'Loan Against Property',
    tagline: 'Unlock Cash from Your Building',
    description: 'If you already own a building, we will lend you cash—and you still get to keep the building! Use the money for your business or personal needs.',
    features: [
      'Use your home or shop to get a loan',
      'Keep using your property while you pay',
      'Get larger amounts than regular loans',
      'Long repayment time (up to 15 years)',
      'Cheaper interest rates than personal loans'
    ],
    eligibility: [
      'Must own a residential or commercial property',
      'Property should have clear legal titles',
      'Stable business or salary income',
      'Property age should be under 40 years',
      'Funds must be used for legitimate business expansion, education, medical, or personal needs'
    ],
    rates: '8.5% - 12% p.a.',
    fees: 'INR 3000 + GST',
    faqs: [
      { q: 'What kind of property do you accept?', a: 'We accept houses, offices, and even factory land in many locations.' },
      { q: 'Do I have to give my building to you?', a: 'No, you keep using the building. It just acts as security for the loan.' }
    ]
  },
  'unsecured-business-loan': {
    title: 'Unsecured Business Loan',
    tagline: 'Money to Grow Your Business',
    description: 'We give your business money to grow, and you don\'t have to promise to give us any of your stuff if things go wrong. No collateral needed.',
    features: [
      'No property or assets required as security',
      'Quick funds for daily business needs',
      'Flexible amounts from ₹5 Lakhs onwards',
      'Fast digital approval process',
      'Transparent rules and no hidden fees'
    ],
    eligibility: [
      'Business must be at least 2 years old',
      'Reasonable monthly sales/turnover',
      'Clear bank statements for last 12 months',
      'No collateral or security needed'
    ],
    rates: '14% - 19% p.a.',
    fees: 'INR 3000 + GST',
    faqs: [
      { q: 'How fast can I get the money?', a: 'Most unsecured loans are approved and deposited within 48 to 72 hours.' },
      { q: 'What can I use the money for?', a: 'You can use it for anything your business needs, like buying stock or paying bills.' }
    ]
  },
  'supply-chain': {
    title: 'Supply Chain Finance',
    tagline: 'Pay Your Suppliers Faster',
    description: 'We help pay the people who deliver your boxes, so your shop never runs out of things to sell. We bridge the gap between delivery and payment.',
    features: [
      'Get money against your purchase orders',
      'Pay your suppliers on time, every time',
      'Better relationships with your vendors',
      'Short-term funding for 30-90 days',
      'No need to wait for customers to pay you first'
    ],
    eligibility: [
      'Registered business with GST',
      'Regular orders from known suppliers',
      'At least 1 year of trading history',
      'Stable relationship with your buyers'
    ],
    rates: '11% - 16% p.a.',
    fees: 'INR 3000 + GST',
    faqs: [
      { q: 'Does my supplier need to do anything?', a: 'Yes, we coordinate with your supplier to ensure they get paid directly and quickly.' },
      { q: 'Is this a long-term loan?', a: 'No, this is a short-term cycle that repeats as you order new stock.' }
    ]
  },
  'unsecured-export-finance': {
    title: 'Unsecured Export Finance',
    tagline: 'Sell Your Stuff Globally',
    description: 'We give you money to help you pack up and sell your stuff to people far away in other countries. Grow your exports without any security.',
    features: [
      'Immediate working capital support',
      'Improved liquidity cycle',
      'Reduced dependency on traditional CC/OD limits'
    ],
    eligibility: [
      'Minimum 3 years vintage',
      'Minimum ₹2 Cr exports in last 12 months',
      'No prior NPA/default history with any financial institution'
    ],
    rates: '10% - 15% p.a.',
    fees: 'INR 3000 + GST',
    faqs: [
      { q: 'Can I get money before I ship?', a: 'Yes, we provide "pre-shipment" finance to help you manufacture and pack your goods.' },
      { q: 'Do you help with global buyers?', a: 'We check the reliability of your buyers to make the process safer for you.' }
    ]
  },
  'machinery-loan': {
    title: 'Machinery Finance',
    tagline: 'Buy Faster Machines Today',
    description: 'We give you the money to buy big, heavy machines so you can build things much faster. Modernize your factory with easy monthly payments.',
    features: [
      'Finance for new or used machines',
      'The machine itself acts as the security',
      'Easy monthly EMIs over 3-5 years',
      'Fast sanction based on machine invoice',
      'Available for all manufacturing sectors'
    ],
    eligibility: [
      'Business in manufacturing or related field',
      'Quotation/Invoice for the new machine',
      'Business existence for at least 2 years',
      'Clear factory or unit location'
    ],
    rates: '9% - 14% p.a.',
    fees: 'INR 3000 + GST',
    faqs: [
      { q: 'Can I buy second-hand machinery?', a: 'Yes, we provide funding for used machines if they are in good working condition.' },
      { q: 'Is the interest rate fixed?', a: 'Yes, usually the interest rate stays the same throughout your loan term.' }
    ]
  }
};

const ServiceDetails = () => {
  const { slug } = useParams();
  const data = serviceData[slug] || serviceData['housing-loans'];
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  const getCustomCtaText = (title) => {
    return `Finance Your ${title}`;
  };

  return (
    <div className="bg-[#F8FAFC] min-h-screen pt-32 pb-40 relative font-plus overflow-x-hidden">
      <div className="absolute top-0 right-0 w-[1200px] h-[1200px] bg-[#0EA5E9]/5 blur-[180px] rounded-full translate-x-1/2 -translate-y-1/2" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Breadcrumb */}
        <nav className="flex items-center flex-wrap gap-4 text-[9px] md:text-[10px] font-black uppercase tracking-[0.4em] text-slate-400 mb-16">
            <Link to="/" className="hover:text-[#0EA5E9]">Foundation</Link>
            <div className="w-1 h-1 rounded-full bg-slate-300" />
            <Link to="/" className="hover:text-[#0EA5E9]">Services</Link>
            <div className="w-1 h-1 rounded-full bg-[#0EA5E9]" />
            <span className="text-[#0EA5E9]">{data.title}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          
          {/* Main Info */}
          <div className="lg:col-span-7 space-y-10">
            <motion.div 
              initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }}
              className="bg-white border border-slate-100 p-6 md:p-16 rounded-[40px] md:rounded-[60px] shadow-sm relative overflow-hidden group"
            >
              <div className="absolute top-0 right-0 w-80 h-80 bg-[#0EA5E9]/5 blur-[100px] rounded-full -mr-40 -mt-40 group-hover:bg-[#0EA5E9]/10 transition-colors duration-700" />
              
              <h1 className="text-4xl md:text-6xl font-black text-[#1E293B] leading-none tracking-tighter mb-8 uppercase">
                 {data.title.split(' ').map((word, i) => (
                   <span key={i} className={i % 2 === 1 ? 'text-[#0EA5E9] italic' : ''}>{word} </span>
                 ))}
              </h1>
              
              <p className="text-lg md:text-xl text-slate-500 font-medium italic border-l-4 border-[#0EA5E9] pl-6 mb-12">
                {data.tagline}
              </p>
              <p className="text-slate-600 text-sm font-medium leading-relaxed mb-12 opacity-90">
                 {data.description}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 pt-10 border-t border-slate-100">
                <div className="space-y-1">
                   <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Base Rate</p>
                   <p className="text-xl md:text-2xl font-black text-[#1E293B] break-words">{data.rates}</p>
                </div>
                <div className="space-y-1">
                   <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Fee</p>
                   <p className="text-sm font-black text-[#1E293B] break-words leading-snug">{data.fees}</p>
                </div>
                <div className="space-y-1">
                   <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Processing Time</p>
                   <p className="text-xl md:text-2xl font-black text-[#0EA5E9]">48-72h</p>
                </div>
              </div>
            </motion.div>

            {/* Operational Scope */}
            <div className="bg-white p-6 md:p-14 border border-slate-100 rounded-[40px] md:rounded-[60px] shadow-sm relative overflow-hidden group">
               <div className="absolute top-0 right-0 w-32 h-32 bg-[#0EA5E9]/5 rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-all duration-700" />
               <div className="flex justify-between items-center mb-10 pb-6 border-b border-slate-50">
                 <div className="flex items-center gap-3">
                    <div className="w-1.5 h-8 bg-[#0EA5E9] rounded-full" />
                    <h2 className="text-2xl font-black text-[#1E293B] uppercase tracking-tight">Scope</h2>
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
          <div className="lg:col-span-5 lg:sticky top-32 space-y-10">
             <div className="bg-[#1E293B] p-6 md:p-12 rounded-[40px] md:rounded-[56px] shadow-2xl relative overflow-hidden group border border-slate-800">
                <div className="absolute top-0 right-0 w-64 h-64 bg-[#0EA5E9]/10 blur-[100px] rounded-full translate-x-1/2 -translate-y-1/2" />
                <div className="relative z-10 space-y-8 text-center md:text-left">
                   <div>
                      <h3 className="text-3xl font-black text-white uppercase tracking-tighter">{getCustomCtaText(data.title)}</h3>
                      <p className="text-[#0EA5E9] text-[10px] font-black uppercase tracking-[0.4em] mt-3 italic">{data.title} Services</p>
                   </div>
                   <p className="text-slate-400 text-sm italic font-medium leading-relaxed">
                      Find the best financing options for your business today.
                   </p>
                   <button 
                    onClick={() => setIsModalOpen(true)}
                    className="w-full btn-primary h-20 uppercase tracking-[0.4em] text-[10px] shadow-2xl hover:bg-white hover:text-[#1E293B] transition-all"
                   >
                     Get Started
                   </button>
                </div>
             </div>

             {/* Eligibility Details */}
             <div className="bg-white border border-slate-100 p-6 md:p-12 rounded-[40px] md:rounded-[56px] shadow-sm space-y-8 group">
                <div className="flex justify-between items-center mb-4">
                   <h3 className="text-xl font-black text-[#1E293B] uppercase tracking-tight flex items-center gap-3">
                      Criteria
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
              <h2 className="text-4xl md:text-5xl font-black text-[#1E293B] uppercase tracking-tighter leading-none">
                <span className="text-[#0EA5E9] italic">FAQ</span>
              </h2>
           </div>
           <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {data.faqs.map((faq, i) => (
                <div key={i} className="p-6 md:p-14 bg-white border border-slate-100 rounded-[40px] md:rounded-[48px] space-y-6 shadow-sm hover:shadow-xl transition-all">
                   <h4 className="text-xl font-black text-[#1E293B] uppercase tracking-tight leading-tight flex items-start gap-4">
                     <span className="text-[#0EA5E9]">Q.</span> {faq.q}
                   </h4>
                   <p className="text-slate-500 font-medium italic border-t border-slate-100 pt-6 leading-relaxed">{faq.a}</p>
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
