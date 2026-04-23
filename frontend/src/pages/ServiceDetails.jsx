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
  ChevronDown,
  Shield,
  Target,
  BarChart3,
  Search,
  Layout,
  Cpu
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
  const data = serviceData[slug] || serviceData['msme-loans'];
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  const [formData, setFormData] = useState({
    fullName: '', mobile: '', email: '', city: 'Agra', amount: '5L-25L', loanType: data.title
  });

  useEffect(() => {
    setFormData(prev => ({ ...prev, loanType: data.title }));
    window.scrollTo(0, 0);
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
    <div className={`${isDark ? 'bg-[#020617] text-white' : 'bg-[#F8FAFC] text-slate-900'} min-h-screen pt-32 pb-40 font-inter transition-colors duration-500 overflow-x-hidden relative`}>
      
      {/* Kinetic Component Architecture */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className={`absolute top-0 right-0 w-[1200px] h-[1200px] ${isDark ? 'bg-blue-600/5' : 'bg-blue-500/5'} blur-[180px] rounded-full translate-x-1/2 -translate-y-1/2`} />
        <div className={`absolute bottom-0 left-0 w-[800px] h-[800px] ${isDark ? 'bg-primary-gold/5' : 'bg-primary-gold/3'} blur-[140px] rounded-full -translate-x-1/2 translate-y-1/2`} />
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: `radial-gradient(${isDark ? '#fff' : '#000'} 1px, transparent 1px)`, backgroundSize: '50px 50px' }} />
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
        
        {/* Dynamic Navigation Protocol */}
        <nav className="flex items-center gap-4 text-[10px] font-black uppercase tracking-[0.4em] opacity-40 mb-16">
            <Link to="/" className="hover:text-blue-600 transition-all">Foundation</Link>
            <div className="w-1 h-1 rounded-full bg-slate-500" />
            <Link to="/services" className="hover:text-blue-600 transition-all">Credit Ecosystem</Link>
            <div className="w-1 h-1 rounded-full bg-blue-500" />
            <span className="text-blue-600">{data.title} Asset</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-start">
          
          {/* Strategic Narrative Pillar */}
          <div className="lg:col-span-7 space-y-12">
            <motion.div 
              initial={{ opacity: 0, x: -50 }} 
              animate={{ opacity: 1, x: 0 }} 
              className={`${isDark ? 'bg-[#0B1221]/80 border-white/10 shadow-3xl shadow-black/80' : 'bg-white border-slate-200 shadow-2xl'} p-10 md:p-14 lg:p-20 rounded-[60px] border backdrop-blur-3xl relative overflow-hidden group`}
            >
              <div className="absolute top-0 right-0 w-80 h-80 bg-blue-600/5 blur-[100px] rounded-full -mr-40 -mt-40 group-hover:scale-150 transition-all duration-1000" />
              
              <div className="flex justify-start mb-10">
                <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} className={`inline-flex items-center gap-4 px-6 py-3 rounded-full ${isDark ? 'bg-blue-500/10 border-blue-500/20' : 'bg-blue-600/10 border-blue-600/10'} text-blue-500 text-[10px] font-black uppercase tracking-[0.4em] border shadow-sm`}>
                   <ShieldCheck className="w-4 h-4" /> Priority Verification Active
                </motion.div>
              </div>
              
              <h1 className={`text-4xl md:text-6xl font-playfair font-black ${isDark ? 'text-white' : 'text-slate-900'} leading-tight tracking-tight mb-8`}>
                {data.title.split(' ').map((word, i) => (
                  <span key={i} className={i % 2 === 1 ? 'text-blue-600 italic' : ''}>{word} <br className={i === 0 ? 'hidden' : 'block'}/></span>
                ))}
              </h1>
              
              <p className={`text-base md:text-xl ${isDark ? 'text-slate-400' : 'text-slate-500'} font-medium italic max-w-xl leading-relaxed border-l-4 border-blue-600/20 pl-6`}>
                "{data.tagline}"
              </p>

              <div className="pt-16 grid grid-cols-2 gap-8 sm:gap-10">
                 <MetricNode label="Benchmark Yield" value={data.rates} color="blue" isDark={isDark} />
                 <MetricNode label="Deployment Velocity" value="48H" color="gold" isDark={isDark} />
              </div>
            </motion.div>
          </div>

          {/* Institutional Onboarding Cockpit */}
          <div className="lg:col-span-5 relative mt-16 lg:mt-0">
             <motion.div 
               initial={{ opacity: 0, scale: 0.95 }}
               animate={{ opacity: 1, scale: 1 }}
               className={`${isDark ? 'bg-[#0B1221]/90 border-white/5 shadow-3xl shadow-black/80' : 'bg-white border-slate-200 shadow-3xl'} p-10 md:p-16 rounded-[80px] border backdrop-blur-[100px] sticky top-32 group overflow-hidden`}
             >
               <div className="absolute top-0 right-0 w-80 h-80 bg-blue-600/5 blur-[120px] rounded-full -mr-40 -mt-40 transition-transform duration-1000 group-hover:scale-150" />
               
               <div className="space-y-12 relative z-10">
                 <div className="flex flex-col items-center text-center gap-6 border-b border-white/5 pb-10">
                   <div className="w-24 h-24 bg-blue-600/10 text-blue-600 rounded-[36px] flex items-center justify-center border border-blue-600/20 group-hover:rotate-12 transition-transform shadow-3xl shadow-blue-600/10">
                      <Cpu className="w-12 h-12" />
                   </div>
                   <div>
                      <h3 className={`text-2xl md:text-3xl font-black ${isDark ? 'text-white' : 'text-slate-900'} uppercase tracking-tight`}>Initial Entry</h3>
                      <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest mt-2 opacity-60 italic leading-none">Security Protocol: AES-256 Enabled</p>
                   </div>
                 </div>

                 <AnimatePresence mode="wait">
                   {submitStatus === 'success' ? (
                     <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center py-24">
                       <div className="w-32 h-32 bg-emerald-500/10 text-emerald-500 rounded-full flex items-center justify-center mx-auto mb-12 border border-emerald-500/20 shadow-3xl shadow-emerald-500/10">
                         <CheckCircle2 className="w-16 h-16" />
                       </div>
                       <h4 className="text-4xl font-black mb-6 uppercase tracking-tighter italic">Asset Deployed</h4>
                       <p className={`text-sm md:text-base ${isDark ? 'text-slate-400' : 'text-slate-600'} font-bold leading-relaxed max-w-[320px] mx-auto uppercase tracking-[0.2em] italic`}>Institutional advisor will intercept your request within 45 minutes.</p>
                       <button onClick={() => setSubmitStatus(null)} className="mt-16 text-blue-600 font-black uppercase tracking-[0.4em] text-[10px] hover:underline transition-all">New Entry Protocol</button>
                     </motion.div>
                   ) : (
                     <form onSubmit={handleSubmit} className="space-y-8">
                       <InputGroup label="Entity Applicant Identity" placeholder="Full Legal Name" value={formData.fullName} onChange={v => setFormData({...formData, fullName: v})} isDark={isDark} />
                       
                       <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                         <InputGroup label="Interface Link" placeholder="+91 XXXX XXXX" type="tel" value={formData.mobile} onChange={v => setFormData({...formData, mobile: v.replace(/\D/g, '').slice(0,10)})} isDark={isDark} />
                         <InputGroup label="Validation Mail" placeholder="Work Email" type="email" value={formData.email} onChange={v => setFormData({...formData, email: v})} isDark={isDark} />
                       </div>

                       <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                          <SelectGroup label="Regional Node" options={['Agra', 'Mathura', 'Hathras', 'Kosi']} value={formData.city} onChange={v => setFormData({...formData, city: v})} isDark={isDark} />
                          <SelectGroup label="Requirement Scale" options={['5L-25L', '25L-1Cr', '1Cr-5Cr', '5Cr+']} labels={['₹5L - ₹25L', '₹25L - ₹1Cr', '₹1Cr - ₹5Cr', '₹5Cr+']} value={formData.amount} onChange={v => setFormData({...formData, amount: v})} isDark={isDark} />
                       </div>

                       <button 
                         disabled={isSubmitting}
                         className="w-full bg-[#020617] text-white py-10 rounded-[40px] font-black uppercase tracking-[0.5em] text-[10px] shadow-3xl shadow-black/80 flex items-center justify-center gap-6 group-btn overflow-hidden relative active:scale-95 transition-all"
                       >
                         <div className="absolute inset-0 bg-blue-600 translate-y-full group-hover-btn:translate-y-0 transition-transform duration-500" />
                         <span className="relative z-10 flex items-center gap-3">
                            {isSubmitting ? 'Syncing...' : 'Initiate Session'} <Zap className="w-6 h-6 text-primary-gold group-hover-btn:rotate-12 transition-transform" />
                         </span>
                       </button>

                       <div className={`${isDark ? 'bg-blue-500/5 border-blue-500/10' : 'bg-blue-50/50 border-blue-100'} p-8 rounded-[48px] border flex gap-6 items-start shadow-3xl shadow-blue-600/5`}>
                           <Shield className="w-6 h-6 text-blue-500 shrink-0 mt-0.5" />
                           <p className={`text-[10px] md:text-[11px] ${isDark ? 'text-slate-500' : 'text-slate-600'} font-black italic leading-relaxed uppercase tracking-[0.2em]`}>
                               Institutional encryption active. All data packets are <span className="text-blue-600">FIPS 140-2</span> compliant.
                           </p>
                       </div>
                     </form>
                   )}
                 </AnimatePresence>
               </div>
             </motion.div>
          </div>
        </div>

        {/* Operational Scope - Full Width High-End Matrix */}
        <motion.section 
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className={`${isDark ? 'bg-[#0B1221] border-white/5' : 'bg-white border-slate-100'} p-10 md:p-20 rounded-[80px] border shadow-3xl relative overflow-hidden group mt-24 md:mt-32`}
        >
           <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 relative z-10">
              <div className="lg:col-span-4 space-y-10 text-center lg:text-left">
                 <div className="flex justify-center lg:justify-start">
                    <div className={`w-24 h-24 ${isDark ? 'bg-white/5 text-blue-500 shadow-3xl shadow-black/80' : 'bg-blue-600 text-white shadow-3xl shadow-blue-600/30'} rounded-[36px] flex items-center justify-center group-hover:rotate-[15deg] transition-all duration-700`}>
                       {data.icon ? <data.icon className="w-12 h-12" /> : <FileText className="w-12 h-12" />}
                    </div>
                 </div>
                 <h2 className={`text-4xl md:text-6xl font-playfair font-black ${isDark ? 'text-white' : 'text-slate-900'} leading-none tracking-tighter uppercase mb-6`}>Operational <br /> <span className="text-blue-600 italic">Scope.</span></h2>
                 <p className={`text-lg md:text-xl ${isDark ? 'text-slate-400' : 'text-slate-500'} font-medium italic leading-relaxed`}>{data.description}</p>
              </div>

              <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                 {data.features.map((f, i) => (
                   <FeatureCard key={i} text={f} index={i} isDark={isDark} />
                 ))}
              </div>
           </div>
        </motion.section>

        {/* Tactical Information Layers */}
        <div className="mt-32 md:mt-48 space-y-32">
           
           {/* Detailed Eligibility & Rates Matrix */}
           <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
              <motion.div initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="space-y-12">
                 <div className="flex items-center gap-6">
                    <Target className="w-10 h-10 text-blue-600" />
                    <h2 className="text-3xl md:text-5xl font-playfair font-black tracking-tighter uppercase leading-none text-blue-600 italic">Criteria Matrix.</h2>
                 </div>
                 <div className="space-y-6">
                    {data.eligibility.map((e, i) => (
                      <div key={i} className={`p-8 rounded-[36px] ${isDark ? 'bg-white/2 border-white/5' : 'bg-white border-slate-200 shadow-xl'} border flex gap-8 items-center group transition-all duration-500 hover:bg-blue-600`}>
                         <div className={`w-12 h-12 rounded-2xl ${isDark ? 'bg-white/5 border-white/10' : 'bg-slate-50 border-slate-100'} flex items-center justify-center text-blue-600 font-black text-sm border group-hover:bg-white`}>{i+1}</div>
                         <p className={`text-lg md:text-xl font-medium italic ${isDark ? 'text-slate-400' : 'text-slate-500'} group-hover:text-white`}>{e}</p>
                      </div>
                    ))}
                 </div>
              </motion.div>

              <motion.div initial={{ opacity: 0, x: 50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="space-y-12">
                 <div className="flex items-center gap-6">
                    <BarChart3 className="w-10 h-10 text-primary-gold" />
                    <h2 className="text-3xl md:text-5xl font-playfair font-black tracking-tighter uppercase leading-none">Yield & Logic.</h2>
                 </div>
                 <div className={`p-10 md:p-20 rounded-[60px] ${isDark ? 'bg-primary-gold/10 border-primary-gold/20 shadow-3xl shadow-primary-gold/5' : 'bg-primary-gold border-transparent shadow-3xl shadow-primary-gold/40'} border relative group overflow-hidden h-fit`}>
                    <div className="absolute top-0 right-0 w-80 h-80 bg-white/10 blur-[100px] rounded-full -mr-40 -mt-40" />
                    <div className="mt-4 space-y-16">
                       <div className="border-b border-primary-navy/5 pb-10">
                          <p className={`text-[10px] font-black uppercase tracking-[0.4em] ${isDark ? 'text-slate-500' : 'text-primary-navy/40'} mb-6 leading-none`}>Institutional BenchMark</p>
                          <p className={`text-5xl sm:text-7xl lg:text-9xl font-playfair font-black ${isDark ? 'text-white' : 'text-primary-navy'} tracking-tighter leading-none`}>{data.rates}</p>
                       </div>
                       <div>
                          <p className={`text-[10px] font-black uppercase tracking-[0.4em] ${isDark ? 'text-slate-500' : 'text-primary-navy/40'} mb-6`}>deployment Fee Matrix</p>
                          <p className={`text-3xl md:text-5xl font-black ${isDark ? 'text-white' : 'text-primary-navy'} tracking-tighter uppercase opacity-80 leading-none`}>{data.fees}</p>
                       </div>
                    </div>
                 </div>
              </motion.div>
           </div>

           {/* Knowledge Hub Protocol */}
           <section className="space-y-24 pt-20">
              <div className="flex flex-col items-center text-center space-y-8">
                 <motion.div initial={{ scale: 0 }} whileInView={{ scale: 1 }} className="w-24 h-24 bg-blue-600/10 text-blue-600 rounded-[36px] flex items-center justify-center shadow-3xl shadow-blue-600/10">
                    <HelpCircle className="w-12 h-12" />
                 </motion.div>
                 <h2 className={`text-4xl md:text-6xl font-playfair font-black ${isDark ? 'text-white' : 'text-slate-900'} tracking-tight uppercase leading-none`}>Deep <span className="text-blue-600 italic">Interface.</span></h2>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16">
                 {data.faqs.map((faq, i) => (
                   <motion.div key={i} whileHover={{ y: -10 }} className={`p-12 md:p-20 ${isDark ? 'bg-[#0B1221] border-white/10 shadow-3xl shadow-black/80' : 'bg-white border-slate-100 shadow-2xl'} rounded-[60px] md:rounded-[80px] border group transition-all duration-700`}>
                      <h4 className={`text-2xl md:text-4xl font-black ${isDark ? 'text-white' : 'text-slate-900'} mb-10 font-playfair tracking-tighter leading-none uppercase`}>{faq.q}</h4>
                      <div className="w-16 h-1.5 bg-blue-600 mb-10 opacity-20 group-hover:w-full transition-all duration-1000" />
                      <p className={`text-lg md:text-2xl ${isDark ? 'text-slate-400' : 'text-slate-500'} font-medium italic leading-[1.6]`}>{faq.a}</p>
                   </motion.div>
                 ))}
              </div>
           </section>

        </div>
      </div>
    </div>
  );
};

// 🛡️ High-Fidelity Logic Components
const MetricNode = ({ label, value, color, isDark }) => (
  <div className="space-y-4">
     <p className={`text-[10px] font-black uppercase tracking-[0.4em] ${isDark ? 'text-slate-500' : 'text-slate-500'} leading-none uppercase`}>{label}</p>
     <p className={`text-4xl md:text-5xl font-playfair font-black tracking-tight leading-none ${color === 'blue' ? 'text-blue-600' : 'text-primary-gold'}`}>{value}</p>
  </div>
);

const FeatureCard = ({ text, index, isDark }) => (
  <motion.div 
    whileHover={{ y: -5 }}
    className={`p-6 md:p-8 ${isDark ? 'bg-white/2 border-white/5' : 'bg-slate-50 border-slate-100 shadow-xl'} rounded-[32px] md:rounded-[40px] border group transition-all duration-500 hover:bg-blue-600 h-full flex flex-col items-start`}
  >
     <div className={`w-10 h-10 md:w-12 md:h-12 rounded-[14px] md:rounded-[18px] ${isDark ? 'bg-white/5' : 'bg-white shadow-sm'} flex items-center justify-center mb-4 md:mb-6 border border-white/5 group-hover:bg-white`}>
        <CheckCircle2 className="w-5 h-5 md:w-6 md:h-6 text-blue-600" />
     </div>
     <span className={`text-[11px] md:text-sm font-black uppercase tracking-widest ${isDark ? 'text-slate-300' : 'text-slate-700'} group-hover:text-white leading-tight md:leading-relaxed`}>{text}</span>
  </motion.div>
);

const InputGroup = ({ label, placeholder, value, onChange, type = 'text', isDark }) => (
  <div className="space-y-4">
    <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.4em] ml-2 opacity-60 block leading-none">{label}</label>
    <input 
      required
      type={type}
      placeholder={placeholder}
      className={`w-full px-8 py-6 ${isDark ? 'bg-white/5 border-white/10 text-white shadow-3xl shadow-black/40' : 'bg-slate-100 border-slate-200 text-slate-900 shadow-inner'} rounded-[32px] border-2 outline-none focus:border-blue-600 font-black text-xs transition-all focus:bg-transparent placeholder:opacity-30`}
      value={value}
      onChange={e => onChange(e.target.value)}
    />
  </div>
);

const SelectGroup = ({ label, options, labels, value, onChange, isDark }) => (
  <div className="space-y-4">
    <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.4em] ml-2 opacity-60 block leading-none">{label}</label>
    <div className="relative group-sel">
       <select 
         className={`w-full px-8 py-6 ${isDark ? 'bg-white/5 border-white/10 text-white shadow-3xl shadow-black/40' : 'bg-slate-100 border-slate-200 text-slate-900 shadow-inner'} rounded-[32px] border-2 outline-none focus:border-blue-600 font-black text-xs appearance-none transition-all cursor-pointer`}
         value={value}
         onChange={e => onChange(e.target.value)}
       >
         {options.map((opt, i) => (
           <option key={opt} value={opt}>{labels ? labels[i] : opt}</option>
         ))}
       </select>
       <ChevronDown className="absolute right-8 top-1/2 -translate-y-1/2 w-5 h-5 text-blue-500 opacity-40 pointer-events-none group-hover-sel:opacity-100 transition-opacity" />
    </div>
  </div>
);

export default ServiceDetails;
