import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  CheckCircle2, 
  ArrowRight, 
  Clock, 
  ShieldCheck, 
  FileText, 
  HelpCircle,
  AlertCircle,
  TrendingUp,
  Zap,
  Building2,
  Home,
  Truck,
  Briefcase
} from 'lucide-react';
import { getUTMParams } from '../utils/helpers';

const serviceData = {
  'housing-loans': {
    title: 'Home Loan',
    tagline: 'Step Into Your Dream Home Today',
    icon: Home,
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
    title: 'Supply Chain Financing',
    tagline: 'Working Capital Against Invoices & POs',
    icon: Truck,
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
    title: 'Structured MSME Products',
    tagline: 'Customized Debt Solutions for Growth',
    icon: Briefcase,
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
    title: 'Loan Against Property (LAP)',
    tagline: 'Unlock the Hidden Value of Your Real Estate',
    icon: Building2,
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
  },
  'micro-lap': {
    title: 'Micro LAP',
    tagline: 'Big Funding for Small Properties',
    icon: Building2,
    description: 'Specialized property-backed loans for small ticket sizes, specifically designed for small shop owners and micro-enterprises.',
    features: [
      'Ticket size: ₹2L to ₹15L',
      'Quick processing for small properties',
      'Minimal documentation for Lal-Dora properties',
      'Flexible income assessment',
      'Doorstep service for documentation'
    ],
    eligibility: [
      'Small business owner/Self-employed',
      'Property ownership proof (Registry/GPA)',
      'Stable residing address for 3+ years',
      'Basic bank statements'
    ],
    rates: '14% - 18% p.a.',
    fees: '2% processing fee',
    faqs: [
      { q: 'Is GST required?', a: 'No, for Micro LAP we can assess income based on register/kacha books.' }
    ]
  },
  'hybrid-msme': {
    title: 'Hybrid MSME Products',
    tagline: 'Best of Secured & Unsecured Credit',
    icon: Zap,
    description: 'A unique lending model that provides a combination of secured and unsecured credit to maximize your borrowing capacity.',
    features: [
      'Partial collateral based limits',
      'Higher ticket size than pure unsecured loans',
      'Blended interest rates',
      'Fast-track approval process',
      'Ideal for expanding retail chains'
    ],
    eligibility: [
      'Min Annual Turnover: ₹1 Cr',
      'GST & IT returns for 2 years',
      'Some form of collateral (Residential/Gold/FD)',
      'Clear repayment track record'
    ],
    rates: '11% - 15% p.a.',
    fees: '1% - 1.5% processing fee',
    faqs: [
      { q: 'What is the benefit of Hybrid?', a: 'You get more money than just an unsecured loan, at a lower cost than a pure business loan.' }
    ]
  },
  'unsecured-msme': {
    title: 'Unsecured MSME Loans',
    tagline: 'Growth Capital Without Collateral',
    icon: ShieldCheck,
    description: 'Quick business loans based on your digital footprint, GST filings, and banking performance. No property or asset pledge required.',
    features: [
      'Zero collateral required',
      'Disbursement in 3-5 working days',
      'Tenure: 12 to 36 months',
      'Minimal physical documentation',
      'End-to-end digital journey possible'
    ],
    eligibility: [
      'Vibrant GST history of 12+ months',
      'Stable Banking with avg balance',
      'Business vintage: 3 years',
      'No major defaults in last 12 months'
    ],
    rates: '15% - 20% p.a.',
    fees: '2% - 3% processing fee',
    faqs: [
      { q: 'What is the max loan amount?', a: 'Usually up to ₹50 Lakhs depending on GST turnovers.' }
    ]
  },
  'machinery-loan': {
    title: 'Machinery Loans',
    tagline: 'Scale Your Production Capacity',
    icon: TrendingUp,
    description: 'Dedicated funding for purchase of new or used machinery and industrial equipment to modernize your manufacturing facility.',
    features: [
      'Lending up to 80% of invoice value',
      'Customized EMI to match production cycles',
      'Faster approvals than standard term loans',
      'Machinery itself acts as collateral',
      'Direct payment to OEM/Suppliers'
    ],
    eligibility: [
      'Established manufacturing unit',
      'Purchase quotation from approved vendors',
      'ITR for last 2-3 years',
      'Stable electricity/utility bill proofs'
    ],
    rates: '11% - 14% p.a.',
    fees: '1% processing fee',
    faqs: [
      { q: 'Can I buy used machinery?', a: 'Yes, we fund used machinery up to 5-7 years old after valuation.' }
    ]
  }
};

const ServiceDetails = () => {
  const { slug } = useParams();
  const data = serviceData[slug] || serviceData['msme-loans'];
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  const [formData, setFormData] = useState({
    fullName: '', mobile: '', email: '', city: '', amount: '5L-25L', loanType: data.title
  });

  // Sync loanType if data changes
  useEffect(() => {
    setFormData(prev => ({ ...prev, loanType: data.title }));
  }, [data.title]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('submitting');
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api/leads`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, ...getUTMParams() })
      });
      if (response.ok) {
        setSubmitStatus('success');
        setFormData({ fullName: '', mobile: '', email: '', city: '', amount: '5L-25L', loanType: data.title });
      } else if (response.status === 409) {
         setSubmitStatus('duplicate');
      } else {
        setSubmitStatus('error');
      }
    } catch {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white min-h-screen font-dmsans">
      {/* Dynamic Hero Head */}
      <div className="bg-primary-navy pt-32 pb-48 px-4 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-primary-gold opacity-[0.07] blur-[120px] -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-primary-gold opacity-[0.03] blur-[100px] translate-y-1/2 -translate-x-1/2" />
        
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            
            <div className="space-y-10">
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="inline-flex items-center gap-2 bg-white/5 text-primary-gold px-5 py-2 rounded-full text-[10px] font-black uppercase tracking-[0.2em] border border-white/10 backdrop-blur-md">
                <ShieldCheck className="w-4 h-4" /> Global Financial Standards
              </motion.div>
              <motion.h1 
                initial={{ opacity: 0, y: 30 }} 
                animate={{ opacity: 1, y: 0 }} 
                className="text-4xl md:text-7xl font-playfair font-black text-white leading-[1.1]"
              >
                {data.title}
              </motion.h1>
              <motion.p 
                initial={{ opacity: 0 }} 
                animate={{ opacity: 1 }} 
                className="text-xl text-slate-400 max-w-xl font-medium leading-relaxed"
              >
                {data.tagline}
              </motion.p>
            </div>

            {/* Instant Proposal Form - Now in Hero */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white p-8 md:p-12 rounded-[48px] shadow-2xl border border-white/10 relative z-10"
            >
              <div className="mb-10 flex items-center gap-4 border-b border-slate-50 pb-8">
                <div className="w-16 h-16 bg-slate-50 rounded-2xl flex items-center justify-center border border-slate-100 shrink-0">
                  <Zap className="w-8 h-8 text-primary-gold fill-current" />
                </div>
                <div>
                  <h3 className="text-3xl font-black text-primary-navy font-playfair leading-tight">Instant Proposal</h3>
                  <p className="text-slate-400 text-[10px] font-black uppercase tracking-widest mt-1">Quick 2-minute decision</p>
                </div>
              </div>

              <AnimatePresence mode="wait">
                {submitStatus === 'success' ? (
                  <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-8">
                    <div className="w-20 h-20 bg-green-50 text-success-green rounded-full flex items-center justify-center mx-auto mb-6">
                      <CheckCircle2 className="w-10 h-10" />
                    </div>
                    <h4 className="text-2xl font-black text-primary-navy mb-2">Request Lodged!</h4>
                    <p className="text-sm text-slate-500 font-medium mb-8">Priority advisor will call in <span className="text-primary-navy font-black">24 hours</span>.</p>
                    <button onClick={() => setSubmitStatus(null)} className="text-primary-gold font-black text-xs uppercase tracking-[0.2em]">New Application</button>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <input 
                      required 
                      placeholder="Full Name" 
                      className="w-full px-7 py-4.5 bg-slate-50 border-2 border-transparent focus:border-primary-gold rounded-2xl outline-none font-bold text-sm text-primary-navy transition-all"
                      value={formData.fullName}
                      onChange={e => setFormData({...formData, fullName: e.target.value})}
                    />
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <input 
                        required 
                        type="tel" 
                        placeholder="Mobile" 
                        className="w-full px-7 py-4.5 bg-slate-50 border-2 border-transparent focus:border-primary-gold rounded-2xl outline-none font-bold text-sm text-primary-navy transition-all"
                        value={formData.mobile}
                        onChange={e => setFormData({...formData, mobile: e.target.value})}
                      />
                      <select
                        required 
                        className="w-full px-7 py-4.5 bg-slate-50 border-2 border-transparent focus:border-primary-gold rounded-2xl outline-none font-bold text-sm text-primary-navy transition-all appearance-none cursor-pointer"
                        value={formData.city}
                        onChange={e => setFormData({...formData, city: e.target.value})}
                      >
                        <option value="" disabled>Select City</option>
                        <option value="Delhi">Delhi</option>
                        <option value="Noida">Noida</option>
                        <option value="Agra">Agra</option>
                        <option value="Gurgaon">Gurgaon</option>
                      </select>
                    </div>
                    <select 
                      className="w-full px-7 py-4.5 bg-slate-50 border-2 border-transparent focus:border-primary-gold rounded-2xl outline-none font-bold appearance-none text-primary-navy text-sm cursor-pointer transition-all"
                      value={formData.amount}
                      onChange={e => setFormData({...formData, amount: e.target.value})}
                    >
                      <option value="Under 5L">Desired: Under ₹5L</option>
                      <option value="5L-25L">Desired: ₹5L - ₹25L</option>
                      <option value="25L-1Cr">Desired: ₹25L - ₹1Cr</option>
                      <option value="1Cr+">Desired: ₹1Cr+</option>
                    </select>

                    <button 
                      disabled={isSubmitting}
                      className="group relative w-full bg-primary-navy text-white py-5 rounded-2xl font-black shadow-2xl shadow-primary-navy/40 overflow-hidden hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 mt-4"
                    >
                      <div className="absolute inset-0 bg-primary-gold translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                      <span className="relative z-10 flex items-center justify-center gap-3 uppercase tracking-widest text-[10px] group-hover:text-primary-navy">
                        {isSubmitting ? 'Encrypting...' : 'Secure Application'} <ArrowRight className="w-4 h-4" />
                      </span>
                    </button>
                    <p className="text-[9px] text-center text-slate-400 font-bold uppercase tracking-widest mt-6 italic">Secure 256-bit SSL encrypted journey</p>
                  </form>
                )}
              </AnimatePresence>
            </motion.div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 -mt-24 mb-32 relative z-20">
        <div className="space-y-24">
          
          {/* Main Value Proposition - Now Full Width */}
          <section className="bg-white p-10 md:p-16 rounded-[64px] shadow-[0_40px_100px_-20px_rgba(2,17,46,0.12)] border border-slate-100">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
              <div className="lg:col-span-1 space-y-6">
                <div className="flex items-center gap-4">
                   <div className="w-16 h-16 bg-slate-50 rounded-2xl flex items-center justify-center text-primary-navy shadow-inner">
                      {data.icon ? <data.icon className="w-8 h-8" /> : <FileText className="w-8 h-8" />}
                   </div>
                   <h2 className="text-4xl font-black text-primary-navy font-playfair">Product <br />Overview</h2>
                </div>
                <p className="text-lg text-slate-500 leading-relaxed font-medium">
                  {data.description}
                </p>
              </div>

              <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">
                {data.features.map((f, i) => (
                  <motion.div 
                    key={i} 
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="flex items-center gap-4 p-6 bg-slate-50 rounded-3xl border border-slate-100/50 group hover:bg-primary-navy transition-all duration-500"
                  >
                    <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-sm group-hover:bg-primary-gold transition-colors">
                      <CheckCircle2 className="text-primary-gold w-5 h-5 group-hover:text-primary-navy transition-colors" />
                    </div>
                    <span className="text-primary-navy font-bold text-sm group-hover:text-white transition-colors">{f}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* Strategic Details */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="bg-slate-900 p-12 md:p-16 rounded-[48px] border border-white/5 shadow-2xl">
              <h3 className="text-xl font-black text-white mb-10 uppercase tracking-widest text-[10px] opacity-60 flex items-center gap-3">
                <div className="w-2 h-2 bg-primary-gold rounded-full" /> Eligibility Roadmap
              </h3>
              <ul className="space-y-8">
                {data.eligibility.map((e, i) => (
                  <li key={i} className="flex gap-5 text-slate-300 font-bold text-base items-start">
                    <div className="w-5 h-5 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-[10px] text-primary-gold flex-shrink-0 mt-0.5">{i+1}</div>
                    {e}
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-primary-gold p-12 md:p-16 rounded-[48px] shadow-2xl shadow-primary-gold/10 flex flex-col justify-between">
              <div>
                <h3 className="text-xl font-black text-primary-navy mb-10 uppercase tracking-widest text-[10px] opacity-60">Rates & Terms</h3>
                <div className="space-y-12">
                  <div>
                    <p className="text-[10px] text-primary-navy/40 font-black uppercase tracking-widest mb-3">Interest Structure</p>
                    <p className="text-5xl md:text-6xl font-black text-primary-navy font-playfair">{data.rates}</p>
                  </div>
                  <div>
                    <p className="text-[10px] text-primary-navy/40 font-black uppercase tracking-widest mb-3">Service Fee</p>
                    <p className="text-3xl font-black text-primary-navy/80 font-playfair">{data.fees}</p>
                  </div>
                </div>
              </div>
              <div className="bg-white/20 p-5 rounded-3xl flex items-center gap-4 backdrop-blur-sm mt-12 border border-white/10">
                <AlertCircle className="w-6 h-6 text-primary-navy flex-shrink-0" />
                <p className="text-[10px] font-black text-primary-navy uppercase tracking-widest leading-relaxed">*Final terms subject to credit appraisal.</p>
              </div>
            </div>
          </div>

          {/* Intelligent FAQ */}
          <section className="space-y-12">
            <h2 className="text-4xl font-black text-primary-navy flex items-center gap-4 font-playfair">
              <HelpCircle className="text-primary-gold w-10 h-10" /> Frequently Asked
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {data.faqs.map((faq, i) => (
                <div key={i} className="group bg-white p-10 rounded-[40px] border border-slate-100 hover:border-primary-gold transition-all duration-500 shadow-sm hover:shadow-xl">
                  <p className="font-black text-primary-navy mb-4 text-xl font-playfair">{faq.q}</p>
                  <p className="text-slate-500 font-medium text-base leading-relaxed opacity-80 group-hover:opacity-100">{faq.a}</p>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>

    </div>
  );
};

export default ServiceDetails;
