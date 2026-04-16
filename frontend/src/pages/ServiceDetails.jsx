import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  CheckCircle2, 
  ArrowRight, 
  Clock, 
  ShieldCheck, 
  FileText, 
  HelpCircle,
  AlertCircle
} from 'lucide-react';
import axios from 'axios';

const serviceData = {
  'supply-chain': {
    title: 'Supply Chain Financing',
    tagline: 'Working Capital Against Invoices & POs',
    description: 'Specialized financing for manufacturers, distributors, and retailers to manage cash flow gaps between supply and payment.',
    features: [
      'Financing against purchase orders',
      'Invoice discounting for faster cash',
      'No collateral required for certain segments',
      'Direct payment to suppliers'
    ],
    eligibility: [
      'Business vintage: Min 2 years',
      'Annual Turnover: Min ₹50 Lakhs',
      'Stable payment history with anchors'
    ],
    rates: '11% - 16% p.a.',
    fees: '1% - 2% processing fee',
    faqs: [
      { q: 'Is collateral mandatory?', a: 'No, many supply chain products are based on underlying trade documents.' },
      { q: 'What is the disbursement time?', a: 'Once the anchor is onboarded, individual invoices can be funded in 24-48 hours.' }
    ]
  },
  'msme-loans': {
    title: 'MSME Structured Loans',
    tagline: 'Fueling India\'s Small & Medium Enterprises',
    description: 'Customized term loans and working capital solutions designed specifically for the unique needs of MSMEs.',
    features: [
      'Ticket size: ₹10L to ₹5Cr',
      'Flexible repayment: 12 to 60 months',
      'Balance transfer with top-up options',
      'Both Secured & Unsecured variants'
    ],
    eligibility: [
      'Valid Udyam Registration',
      'GST returns for last 12 months',
      'Positive Net Worth'
    ],
    rates: '12% - 18% p.a.',
    fees: '1.5% - 2.5% processing fee',
    faqs: [
      { q: 'Can I apply without GST?', a: 'For smaller tickets, we have alternate informal income assessment models.' }
    ]
  },
  'lap': {
    title: 'Loan Against Property (LAP)',
    tagline: 'Unlock the Hidden Value of Your Real Estate',
    description: 'Leverage your residential or commercial property to get long-term financing at lower interest rates.',
    features: [
      'Tenures up to 15 years',
      'Lower EMIs compared to personal loans',
      'Property remains in your use',
      'High Loan-to-Value (LTV) ratios'
    ],
    eligibility: [
      'Clear Property Title',
      'Property must be within branch limits',
      'Repayment capacity assessment'
    ],
    rates: '8.5% - 12% p.a.',
    fees: '0.5% - 1.5% processing fee',
    faqs: [
      { q: 'Which properties are accepted?', a: 'Self-occupied residential, commercial, and even industrial land in some cases.' }
    ]
  },
  'housing-loans': {
    title: 'Affordable Housing Loans',
    tagline: 'Step Into Your Dream Home Today',
    description: 'In partnership with DMI Housing Finance, we bring you subsidized rates for home purchase, construction, and renovation.',
    features: [
      'PMAY subsidy benefits (subject to govt guidelines)',
      'Minimal documentation for informal income',
      'Tenure up to 20 years',
      'Fast sanction within 3-5 working days'
    ],
    eligibility: [
      'Minimum age: 21 years',
      'Salaried or Self-employed profiles',
      'Co-applicant mandatory for certain schemes'
    ],
    rates: '8.5% - 14% p.a.',
    fees: '₹5000 + GST (Min) to 1%',
    faqs: [
      { q: 'Do you fund plot purchase?', a: 'Yes, we provide composite loans for plot purchase + construction.' }
    ]
  }
};

const ServiceDetails = () => {
  const { slug } = useParams();
  const data = serviceData[slug] || serviceData['msme-loans'];
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    mobile: '',
    city: '',
    amount: '5L-25L',
    loanType: data.title
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/api/leads`, {
        ...formData,
        loanType: data.title
      });
      setSuccess(true);
    } catch (err) {
      console.error('Submission error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white min-h-screen">
      {/* Hero Head */}
      <div className="bg-[#0369a1] pt-32 pb-20 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="inline-flex items-center gap-2 bg-white/10 text-blue-100 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest mb-6 border border-white/20">
            <ShieldCheck className="w-4 h-4" /> RBI Compliant
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 30 }} 
            animate={{ opacity: 1, y: 0 }} 
            className="text-4xl md:text-6xl font-black text-white mb-6"
          >
            {data.title}
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            className="text-xl text-blue-100/80 max-w-2xl mx-auto font-medium"
          >
            {data.tagline}
          </motion.p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 -mt-10 mb-20">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          
          <div className="lg:col-span-2 space-y-16">
            {/* Overview */}
            <section className="bg-white p-10 rounded-[40px] shadow-sm border border-slate-100">
              <h2 className="text-3xl font-extrabold text-slate-900 mb-6 flex items-center gap-3">
                <FileText className="text-primary-blue w-8 h-8" /> Overview
              </h2>
              <p className="text-lg text-slate-600 leading-relaxed font-medium mb-8">
                {data.description}
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {data.features.map((f, i) => (
                  <div key={i} className="flex items-center gap-3 p-4 bg-slate-50 rounded-2xl border border-slate-100/50">
                    <CheckCircle2 className="text-success-green w-5 h-5 flex-shrink-0" />
                    <span className="text-slate-700 font-bold">{f}</span>
                  </div>
                ))}
              </div>
            </section>

            {/* Eligibility & Rates */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-slate-50 p-8 rounded-[32px] border border-slate-100">
                <h3 className="text-xl font-black text-slate-900 mb-6">Eligibility Criteria</h3>
                <ul className="space-y-4">
                  {data.eligibility.map((e, i) => (
                    <li key={i} className="flex gap-3 text-slate-600 font-bold text-sm">
                      <div className="w-1.5 h-1.5 bg-primary-blue rounded-full mt-1.5 flex-shrink-0" />
                      {e}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="bg-blue-50 p-8 rounded-[32px] border border-blue-100">
                <h3 className="text-xl font-black text-primary-darkBlue mb-6">Transparency & Rates</h3>
                <div className="space-y-6">
                  <div>
                    <p className="text-xs text-blue-400 font-bold uppercase tracking-wider mb-1">Interest Rate</p>
                    <p className="text-2xl font-black text-primary-blue">{data.rates}</p>
                  </div>
                  <div>
                    <p className="text-xs text-blue-400 font-bold uppercase tracking-wider mb-1">Processing Fee</p>
                    <p className="text-xl font-extrabold text-slate-700">{data.fees}</p>
                  </div>
                  <div className="flex items-center gap-2 p-3 bg-white/50 rounded-xl">
                    <AlertCircle className="w-4 h-4 text-primary-blue" />
                    <p className="text-[10px] font-bold text-blue-500">Subject to terms of partner lender.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* FAQs */}
            <section>
              <h2 className="text-2xl font-black text-slate-900 mb-8 flex items-center gap-3">
                <HelpCircle className="text-primary-blue w-6 h-6" /> Common Questions
              </h2>
              <div className="space-y-4">
                {data.faqs.map((faq, i) => (
                  <div key={i} className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
                    <p className="font-extrabold text-slate-900 mb-2">{faq.q}</p>
                    <p className="text-slate-500 font-medium text-sm">{faq.a}</p>
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* Sidebar Form */}
          <div className="relative">
            <div className="sticky top-24 bg-white p-8 rounded-[40px] shadow-2xl border border-slate-50 ring-1 ring-slate-100">
              <h3 className="text-2xl font-black text-slate-900 mb-6 pb-4 border-b border-slate-50">Apply for {data.title}</h3>
              {success ? (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-10">
                  <div className="w-16 h-16 bg-green-50 text-success-green rounded-full flex items-center justify-center mx-auto mb-4">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h4 className="text-xl font-bold mb-2">Request Received!</h4>
                  <p className="text-sm text-slate-500 font-medium">An expert will call you shortly.</p>
                  <button onClick={() => setSuccess(false)} className="mt-6 text-primary-blue font-bold text-sm underline">Submit another request</button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <input 
                    required 
                    placeholder="Full Name" 
                    className="w-full px-5 py-3.5 bg-slate-50 border-2 border-transparent focus:border-primary-blue rounded-xl outline-none font-bold placeholder:text-slate-400"
                    value={formData.fullName}
                    onChange={e => setFormData({...formData, fullName: e.target.value})}
                  />
                  <input 
                    required 
                    type="tel" 
                    placeholder="Mobile Number" 
                    className="w-full px-5 py-3.5 bg-slate-50 border-2 border-transparent focus:border-primary-blue rounded-xl outline-none font-bold placeholder:text-slate-400"
                    value={formData.mobile}
                    onChange={e => setFormData({...formData, mobile: e.target.value})}
                  />
                  <input 
                    required 
                    placeholder="City" 
                    className="w-full px-5 py-3.5 bg-slate-50 border-2 border-transparent focus:border-primary-blue rounded-xl outline-none font-bold placeholder:text-slate-400"
                    value={formData.city}
                    onChange={e => setFormData({...formData, city: e.target.value})}
                  />
                  <select 
                    className="w-full px-5 py-3.5 bg-slate-50 border-2 border-transparent focus:border-primary-blue rounded-xl outline-none font-bold appearance-none text-slate-700"
                    value={formData.amount}
                    onChange={e => setFormData({...formData, amount: e.target.value})}
                  >
                    <option value="Under 5L">Under ₹5 Lakhs</option>
                    <option value="5L-25L">₹5L - ₹25L</option>
                    <option value="25L-1Cr">₹25L - ₹1Cr</option>
                    <option value="1Cr+">₹1Cr+</option>
                  </select>
                  <button 
                    disabled={isSubmitting}
                    className="w-full bg-primary-blue text-white py-4 rounded-xl font-black shadow-lg shadow-primary-blue/20 hover:bg-primary-darkBlue transition-all flex items-center justify-center gap-2"
                  >
                    {isSubmitting ? 'Sending...' : 'Check Eligibility'} <ArrowRight className="w-4 h-4" />
                  </button>
                  <p className="text-[10px] text-center text-slate-400 font-bold">BY SUBMITTING YOU AGREE TO OUR PRIVACY POLICY</p>
                </form>
              )}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default ServiceDetails;
