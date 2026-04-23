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
  Briefcase,
  ChevronRight,
  Shield,
  Target
} from 'lucide-react';
import { getUTMParams } from '../utils/helpers';
import { useTheme } from '../context/ThemeContext';
import { useTranslation } from 'react-i18next';

const serviceData = {
  'housing-loans': {
    title: 'Home Loan',
    tagline: 'Strategic Mortgage Optimization',
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
    tagline: 'Velocity Control for Invoices & POs',
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
    tagline: 'Dynamic Credit for Growth Cycles',
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
    tagline: 'Asset Liquidity & Equity Extraction',
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
  }
};

const ServiceDetails = () => {
  const { slug } = useParams();
  const { isDark } = useTheme();
  const { t } = useTranslation();
  const data = serviceData[slug] || serviceData['msme-loans'];
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  const [formData, setFormData] = useState({
    fullName: '', mobile: '', email: '', city: 'Agra', amount: '5L-25L', loanType: data.title
  });

  useEffect(() => {
    setFormData(prev => ({ ...prev, loanType: data.title }));
  }, [data.title]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('submitting');
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:5001'}/api/leads`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, ...getUTMParams() })
      });
      if (response.ok) {
        setSubmitStatus('success');
        setFormData({ fullName: '', mobile: '', email: '', city: 'Agra', amount: '5L-25L', loanType: data.title });
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
    <div className={`${isDark ? 'bg-[#020617]' : 'bg-[#F8FAFC]'} min-h-screen font-dmsans transition-colors duration-500 overflow-x-hidden`}>
      
      {/* Institutional Hero */}
      <section className="relative pt-24 pb-12 md:pt-36 md:pb-20 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className={`absolute top-0 right-0 w-2/3 h-2/3 ${isDark ? 'bg-blue-600/5' : 'bg-blue-500/5'} blur-[140px] rounded-full translate-x-1/2 -translate-y-1/2`} />
          <div className={`absolute bottom-0 left-0 w-1/2 h-1/2 ${isDark ? 'bg-primary-gold/5' : 'bg-primary-gold/3'} blur-[120px] rounded-full -translate-x-1/2 translate-y-1/2`} />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 xl:gap-16 items-start">
            
            <div className="lg:col-span-12 xl:col-span-7 space-y-6">
              <nav className="flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.3em] opacity-40">
                 <Link to="/" className="hover:text-blue-600 transition-colors">Home</Link>
                 <ChevronRight className="w-3 h-3" />
                 <Link to="/services" className="hover:text-blue-600 transition-colors">Services</Link>
                 <ChevronRight className="w-3 h-3" />
                 <span className="text-blue-600">{data.title}</span>
              </nav>

              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="inline-flex items-center gap-3 px-6 py-2.5 rounded-full bg-blue-600/10 border border-blue-500/20 text-primary-gold text-[10px] font-black uppercase tracking-[0.4em] shadow-inner">
                <ShieldCheck className="w-4 h-4" /> Strategic Credit Line
              </motion.div>
              
              <h1 className={`text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-playfair font-black ${isDark ? 'text-white' : 'text-slate-900'} leading-tight tracking-tight`}>
                {data.title.split(' ').map((word, i) => (
                  <span key={i} className={i % 2 === 1 ? 'text-blue-600 italic' : ''}>{word} </span>
                ))}
              </h1>
              
              <p className={`text-base md:text-xl ${isDark ? 'text-slate-400' : 'text-slate-500'} font-medium italic max-w-2xl leading-relaxed`}>
                "{data.tagline}"
              </p>

              <div className="flex gap-1">
                 {[1,2,3,4,5].map(i => <div key={i} className="w-10 h-1 bg-blue-600 rounded-full" style={{ opacity: i * 0.15 }} />)}
              </div>
            </div>

            {/* Application Cockpit */}
            <div className="lg:col-span-12 xl:col-span-5 relative mt-12 xl:mt-0 xl:p-8">
               <motion.div 
                 initial={{ opacity: 0, scale: 0.95 }}
                 animate={{ opacity: 1, scale: 1 }}
                 className={`${isDark ? 'bg-[#0B1221]/90 border-white/5' : 'bg-white border-slate-200 shadow-xl'} p-6 md:p-10 rounded-3xl border relative overflow-hidden group`}
               >
                 <div className="absolute top-0 right-0 w-48 h-48 bg-blue-600/5 blur-3xl rounded-full -mr-24 -mt-24 group-hover:scale-150 transition-transform duration-1000" />
                 
                 <div className="space-y-10 relative z-10">
                   <div className="flex items-center gap-5 border-b border-white/5 pb-8">
                     <div className="w-16 h-16 bg-blue-600/10 text-blue-600 rounded-2xl flex items-center justify-center border border-blue-600/20 group-hover:rotate-12 transition-transform">
                        <Zap className="w-8 h-8" />
                     </div>
                     <div>
                        <h3 className={`text-2xl md:text-3xl font-black ${isDark ? 'text-white' : 'text-slate-900'} uppercase tracking-tighter`}>Initial Proposal</h3>
                        <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest opacity-60">System Ready for Entry</p>
                     </div>
                   </div>

                   <AnimatePresence mode="wait">
                     {submitStatus === 'success' ? (
                       <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="text-center py-10">
                         <div className="w-24 h-24 bg-emerald-500/10 text-emerald-500 rounded-full flex items-center justify-center mx-auto mb-8 border border-emerald-500/20 shadow-inner">
                           <CheckCircle2 className="w-12 h-12" />
                         </div>
                         <h4 className="text-2xl font-black mb-4 uppercase tracking-tighter italic">Application Deployed</h4>
                         <p className={`text-[11px] md:text-xs ${isDark ? 'text-slate-400' : 'text-slate-500'} font-bold leading-relaxed max-w-[200px] mx-auto uppercase tracking-widest`}>Advisor will intercept your request within 2 hours.</p>
                         <button onClick={() => setSubmitStatus(null)} className="mt-10 text-blue-600 font-black uppercase tracking-[0.3em] text-[10px] hover:underline">New Request Protocol</button>
                       </motion.div>
                     ) : (
                       <form onSubmit={handleSubmit} className="space-y-6">
                         <InputField label="Entity / Applicant Identity" placeholder="Full Legal Name" value={formData.fullName} onChange={v => setFormData({...formData, fullName: v})} isDark={isDark} />
                         
                         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                           <InputField label="Primary Contact" placeholder="Mobile Number" type="tel" value={formData.mobile} onChange={v => setFormData({...formData, mobile: v.replace(/\D/g, '').slice(0,10)})} isDark={isDark} />
                           <InputField label="Business Mail" placeholder="Work Email" type="email" value={formData.email} onChange={v => setFormData({...formData, email: v})} isDark={isDark} />
                         </div>

                         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                               <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1 opacity-60">Regional Node</label>
                               <div className="relative group/sel">
                                 <select 
                                   className={`w-full px-6 py-4.5 ${isDark ? 'bg-white/5 border-white/10 text-white' : 'bg-slate-50 border-slate-100 text-slate-900'} rounded-2xl border-2 outline-none focus:border-blue-600 font-black text-xs appearance-none transition-all cursor-pointer`}
                                   value={formData.city}
                                   onChange={e => setFormData({...formData, city: e.target.value})}
                                 >
                                   {['Agra', 'Mathura', 'Hathras', 'Kosi'].map(city => (
                                     <option key={city} value={city}>{city}</option>
                                   ))}
                                 </select>
                               </div>
                            </div>
                            <div className="space-y-2">
                               <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1 opacity-60">Requirement Scale</label>
                               <div className="relative group/sel">
                                 <select 
                                   className={`w-full px-6 py-4.5 ${isDark ? 'bg-white/5 border-white/10 text-white' : 'bg-slate-50 border-slate-100 text-slate-900'} rounded-2xl border-2 outline-none focus:border-blue-600 font-black text-xs appearance-none transition-all cursor-pointer`}
                                   value={formData.amount}
                                   onChange={e => setFormData({...formData, amount: e.target.value})}
                                 >
                                   <option value="5L-25L">₹5L - ₹25L</option>
                                   <option value="25L-1Cr">₹25L - ₹1Cr</option>
                                   <option value="1Cr-5Cr">₹1Cr - ₹5Cr</option>
                                   <option value="5Cr+">₹5Cr+</option>
                                 </select>
                               </div>
                            </div>
                         </div>

                         <button 
                           disabled={isSubmitting}
                           className="w-full bg-[#020617] text-white py-8 rounded-[32px] font-black uppercase tracking-[0.4em] text-[10px] shadow-22xl shadow-black/80 flex items-center justify-center gap-4 group/btn overflow-hidden relative mt-4 active:scale-95 transition-all"
                         >
                           <div className="absolute inset-0 bg-blue-600 translate-y-full group-hover/btn:translate-y-0 transition-transform duration-500" />
                           <span className="relative z-10 flex items-center gap-3">
                              {isSubmitting ? 'Syncing...' : 'Initialize Analysis'} <ArrowRight className="w-5 h-5 text-primary-gold group-hover/btn:translate-x-2 transition-transform" />
                           </span>
                         </button>
                         <div className="flex items-center justify-center gap-3 opacity-40">
                           <Shield className="w-4 h-4 text-blue-500" />
                           <span className="text-[9px] font-black uppercase tracking-widest text-slate-500 italic">Institutional Encryption Active</span>
                        </div>
                       </form>
                     )}
                   </AnimatePresence>
                 </div>
               </motion.div>
            </div>

          </div>
        </div>
      </section>

      {/* Strategic Content Layers */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 mt-16 md:mt-24 mb-32 relative z-20">
         <div className="space-y-16 md:space-y-32">
            
            {/* Core Value Layer */}
            <motion.section 
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className={`${isDark ? 'bg-[#0B1221] border-white/5' : 'bg-white border-slate-100'} p-8 md:p-16 lg:p-20 rounded-3xl md:rounded-[60px] border shadow-2xl relative overflow-hidden group`}
            >
               <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-600/5 blur-[120px] rounded-full translate-x-1/2 -translate-y-1/2" />
               
               <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 md:gap-24 relative z-10">
                  <div className="lg:col-span-5 space-y-10 text-center lg:text-left">
                     <div className="flex justify-center lg:justify-start">
                        <div className={`w-20 h-20 md:w-24 md:h-24 ${isDark ? 'bg-white/5 text-blue-500' : 'bg-blue-600 text-white shadow-22xl shadow-blue-600/30'} rounded-[36px] flex items-center justify-center group-hover:rotate-12 transition-transform`}>
                           {data.icon ? <data.icon className="w-10 h-10 md:w-12 md:h-12" /> : <FileText className="w-10 h-10 md:w-12 md:h-12" />}
                        </div>
                     </div>
                     <h2 className={`text-3xl md:text-6xl font-playfair font-black ${isDark ? 'text-white' : 'text-slate-900'} leading-tight tracking-tighter uppercase`}>Operational <br /> <span className="text-blue-600 italic">Scope</span></h2>
                     <p className={`text-lg md:text-xl ${isDark ? 'text-slate-400' : 'text-slate-500'} font-medium italic leading-relaxed`}>{data.description}</p>
                  </div>

                  <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-8">
                     {data.features.map((f, i) => (
                       <div key={i} className={`p-6 md:p-10 ${isDark ? 'bg-white/5 border-white/5' : 'bg-slate-50 border-slate-100'} rounded-[32px] md:rounded-[40px] border group/feat hover:bg-blue-600 transition-all duration-700`}>
                          <div className={`w-12 h-12 rounded-2xl ${isDark ? 'bg-white/5' : 'bg-white shadow-sm'} flex items-center justify-center mb-6 group-hover/feat:bg-white`}>
                             <CheckCircle2 className="w-6 h-6 text-blue-600" />
                          </div>
                          <span className={`text-[11px] md:text-sm font-black uppercase tracking-widest ${isDark ? 'text-slate-300' : 'text-slate-700'} group-hover/feat:text-white leading-relaxed`}>{f}</span>
                       </div>
                     ))}
                  </div>
               </div>
            </motion.section>

            {/* Strategic Details Layer */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-16">
               <motion.div 
                 initial={{ opacity: 0, x: -40 }}
                 whileInView={{ opacity: 1, x: 0 }}
                 viewport={{ once: true }}
                 className={`${isDark ? 'bg-[#0B1221] border-white/5' : 'bg-[#020617] border-white/5'} p-8 md:p-14 rounded-3xl md:rounded-[50px] border shadow-2xl relative group`}
               >
                  <div className="absolute top-0 left-0 w-64 h-64 bg-blue-600/5 blur-3xl rounded-full -ml-32 -mt-32" />
                  <div className="relative z-10 space-y-12">
                     <div className="flex items-center gap-4">
                        <Target className="w-6 h-6 text-blue-500" />
                        <h3 className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-500">Eligibility Protocol</h3>
                     </div>
                     <ul className="space-y-10">
                        {data.eligibility.map((e, i) => (
                           <li key={i} className="flex gap-6 items-start group/li">
                              <div className={`w-10 h-10 ${isDark ? 'bg-white/5 text-blue-500' : 'bg-white/10 text-blue-400'} rounded-xl flex items-center justify-center text-[11px] font-black shrink-0 border border-white/5 group-hover/li:bg-blue-600 group-hover/li:text-white transition-all`}>{i+1}</div>
                              <span className={`text-base md:text-lg font-medium italic ${isDark ? 'text-slate-400' : 'text-slate-300'}`}>{e}</span>
                           </li>
                        ))}
                     </ul>
                  </div>
               </motion.div>

               <motion.div 
                 initial={{ opacity: 0, x: 40 }}
                 whileInView={{ opacity: 1, x: 0 }}
                 viewport={{ once: true }}
                 className={`${isDark ? 'bg-primary-gold/10' : 'bg-primary-gold'} p-8 md:p-14 rounded-3xl md:rounded-[50px] border border-primary-gold/5 flex flex-col justify-between group shadow-2xl`}
               >
                  <div className="space-y-16">
                     <div className="flex items-center gap-4">
                        <TrendingUp className={`w-6 h-6 ${isDark ? 'text-primary-gold' : 'text-primary-navy'}`} />
                        <h3 className={`text-[10px] font-black uppercase tracking-[0.4em] ${isDark ? 'text-slate-500' : 'text-primary-navy/40'}`}>Market Index & Velocity</h3>
                     </div>
                     <div className="space-y-16 mt-4">
                        <div className="border-b border-primary-navy/5 pb-10">
                           <p className={`text-[10px] font-black uppercase tracking-widest ${isDark ? 'text-slate-500' : 'text-primary-navy/40'} mb-4`}>Benchmark Yield</p>
                           <p className={`text-4xl sm:text-5xl md:text-6xl lg:text-8xl font-playfair font-black ${isDark ? 'text-white' : 'text-[#020617]'} tracking-tighter leading-none`}>{data.rates}</p>
                        </div>
                        <div>
                           <p className={`text-[10px] font-black uppercase tracking-widest ${isDark ? 'text-slate-500' : 'text-primary-navy/40'} mb-4`}>Deployment Fee</p>
                           <p className={`text-2xl md:text-4xl font-black ${isDark ? 'text-white' : 'text-[#020617]'} tracking-tighter uppercase opacity-80`}>{data.fees}</p>
                        </div>
                     </div>
                  </div>
                  <div className={`${isDark ? 'bg-white/5 border-white/10' : 'bg-[#020617]/10 border-white/5'} p-6 rounded-3xl flex items-start sm:items-center gap-5 mt-16 border`}>
                      <AlertCircle className={`w-6 h-6 shrink-0 ${isDark ? 'text-primary-gold' : 'text-[#020617]'}`} />
                      <p className={`text-[9px] md:text-[10px] font-black uppercase tracking-[0.2em] ${isDark ? 'text-slate-500' : 'text-[#020617]/60'} leading-relaxed`}>*Final Deployment parameters subject to institutional credit appraisal.</p>
                  </div>
               </motion.div>
            </div>

            {/* Precision FAQ Layer */}
            <section className="space-y-16 pt-12">
               <div className="flex flex-col items-center text-center space-y-6">
                  <div className="w-16 h-16 bg-blue-600/10 text-blue-600 rounded-3xl flex items-center justify-center">
                     <HelpCircle className="w-8 h-8" />
                  </div>
                  <h2 className={`text-4xl md:text-7xl font-playfair font-black ${isDark ? 'text-white' : 'text-slate-900'} tracking-tighter uppercase`}>Knowledge <span className="text-blue-600 italic">Nexus</span></h2>
               </div>
               
               <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10">
                  {data.faqs.map((faq, i) => (
                    <div key={i} className={`p-8 md:p-12 ${isDark ? 'bg-white/5 border-white/10' : 'bg-white border-slate-100'} rounded-[32px] md:rounded-[48px] border group hover:border-blue-600 transition-all duration-700 shadow-xl`}>
                       <h4 className={`text-xl md:text-2xl font-black ${isDark ? 'text-white' : 'text-slate-900'} mb-6 font-playfair tracking-tight leading-tight uppercase`}>{faq.q}</h4>
                       <div className="w-12 h-1 bg-blue-600 mb-8 opacity-20 group-hover:w-full transition-all duration-1000" />
                       <p className={`text-base md:text-lg ${isDark ? 'text-slate-500' : 'text-slate-500'} font-medium italic leading-relaxed`}>{faq.a}</p>
                    </div>
                  ))}
               </div>
            </section>

         </div>
      </div>
    </div>
  );
};

// Internal Refined Input Component
const InputField = ({ label, placeholder, value, onChange, type = 'text', isDark }) => (
  <div className="space-y-2">
    <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1 opacity-60">{label}</label>
    <input 
      required
      type={type}
      placeholder={placeholder}
      className={`w-full px-6 py-4.5 ${isDark ? 'bg-white/5 border-white/10 text-white' : 'bg-slate-50 border-slate-100 text-slate-900'} rounded-2xl border-2 outline-none focus:border-blue-600 font-black text-xs transition-all shadow-inner`}
      value={value}
      onChange={e => onChange(e.target.value)}
    />
  </div>
);

export default ServiceDetails;
