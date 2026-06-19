import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Phone, Mail, MapPin, MessageSquare as MessageSquareIcon, Send as SendIcon, Facebook, Instagram, Linkedin } from 'lucide-react';

const Footer = () => {
  const { t } = useTranslation();
  const currentYear = new Date().getFullYear();
  const brandLogo = '/swayam_logo_v2.jpeg';

  const services = [
    { name: 'Home Loan', slug: 'housing-loans' },
    { name: 'Loan Against Property', slug: 'lap' },
    { name: 'Unsecured Business Loan', slug: 'unsecured-business-loan' },
    { name: 'Supply Chain Finance', slug: 'supply-chain' },
    { name: 'Unsecured Export Finance', slug: 'unsecured-export-finance' },
    { name: 'Machinery Finance', slug: 'machinery-loan' },
  ];

  const branches = [
    { name: 'Agra Branch', addr: 'Block No. 20/4, Shop No. 11, Maruti Tower, Sanjay Place, Agra, UP - 282002' },
    { name: 'Mathura Branch', addr: 'No. 207, 2nd Floor, Shri Square, Radhapuram Chauraha, Mathura, UP - 281001' },
    { name: 'Hathras Branch', addr: 'VG Plaza, Glory Garden, Mathura Road, Hathras, UP - 204101' },
    { name: 'Kosi Branch', addr: 'Radharani Tower, New Agrawal Colony, Nandgaon Road, Kosi Kalan, UP - 281403' },
  ];

  return (
    <footer className="bg-[#1E293B] text-white pt-16 pb-12 w-full overflow-hidden">
      <div className="w-full px-6 md:px-12 lg:px-20">

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Column 1: Brand */}
          <div className="space-y-8">
            <Link to="/" className="flex items-center gap-3">
              <div className="bg-white w-12 h-12 rounded-lg flex items-center justify-center p-1">
                <img
                  src={brandLogo}
                  alt="Swayamfin logo"
                  className="w-full h-full object-contain"
                />
              </div>
              <div className="flex flex-col leading-none">
                <span className="text-2xl font-black text-white tracking-tighter">swayamfin<span className="text-[#0EA5E9]">.</span></span>
                <span className="text-[8px] font-bold text-slate-400 tracking-[0.4em] uppercase mt-1">Financial Excellence</span>
              </div>
            </Link>
            <p className="text-sm text-slate-300 font-medium leading-relaxed italic opacity-80">
              We keep digital money flowing smoothly by using professional-grade tech to move and lend it out really fast.
            </p>
            <div className="space-y-4 pt-2">
              <div className="flex items-center gap-3 text-slate-300 group">
                <Phone className="w-4 h-4 text-[#0EA5E9]" />
                <a href="tel:+919560723332" className="text-xs font-bold hover:text-white transition-colors tracking-widest">+91 95607 23332</a>
              </div>
              <div className="flex items-center gap-3 text-slate-300 group">
                <Mail className="w-4 h-4 text-[#0EA5E9]" />
                <a href="mailto:info@swayamfin.com" className="text-xs font-bold hover:text-white transition-colors tracking-widest">info@swayamfin.com</a>
              </div>
              <div className="flex items-start gap-3 text-slate-300">
                <MapPin className="w-4 h-4 text-[#0EA5E9] mt-1 shrink-0" />
                <p className="text-[11px] font-bold leading-relaxed tracking-wider">Head Office: 619, Somdutt Chambers II, Bhikaji Cama, New Delhi – 110066</p>
              </div>
            </div>

            {/* Questions Form */}
            <div className="pt-8 border-t border-white/5 space-y-4">
              <p className="text-[10px] font-black text-[#0EA5E9] uppercase tracking-[0.3em]">
                Please Submit your Questions through here.
              </p>
              <FooterQuestionForm />
            </div>
          </div>

          {/* Column 2: Services */}
          <div>
            <h4 className="text-[11px] font-black mb-8 text-[#0EA5E9] uppercase tracking-[0.4em] flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#0EA5E9]" /> OUR SERVICES
            </h4>
            <ul className="space-y-4">
              {services.map((s, i) => (
                <li key={i}>
                  <Link to={`/services/${s.slug}`} className="text-[11px] text-slate-400 hover:text-white transition-all font-bold uppercase tracking-widest flex items-center gap-3 group">
                    <span className="w-1 h-1 rounded-full bg-slate-600 group-hover:bg-[#0EA5E9] transition-all" />
                    {s.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Company */}
          <div>
            <h4 className="text-[11px] font-black mb-8 text-[#0EA5E9] uppercase tracking-[0.4em] flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#0EA5E9]" /> COMPANY
            </h4>
            <ul className="space-y-4">
              <li><FooterLink to="/about" label="Our Mission" /></li>
              <li><FooterLink to="/" label="How It Works" /></li>
              <li><FooterLink to="/contact" label="Contact Us" /></li>
              <li>
                <a 
                  href="/Privacy_Policy.pdf" 
                  target="_blank" 
                  rel="noreferrer"
                  className="text-[11px] text-slate-400 hover:text-white transition-all font-bold uppercase tracking-widest flex items-center gap-3 group"
                >
                  <span className="w-1 h-1 rounded-full bg-slate-600 group-hover:bg-[#0EA5E9] transition-all" />
                  Privacy Policy
                </a>
              </li>
              <li>
                <a 
                  href="/Grievance_Redressal_Mechanism.pdf" 
                  target="_blank" 
                  rel="noreferrer"
                  className="text-[11px] text-slate-400 hover:text-white transition-all font-bold uppercase tracking-widest flex items-center gap-3 group"
                >
                  <span className="w-1 h-1 rounded-full bg-slate-600 group-hover:bg-[#0EA5E9] transition-all" />
                  Grievance Redressal Mechanism
                </a>
              </li>
            </ul>
          </div>

          {/* Column 4: Locations */}
          <div>
            <h4 className="text-[11px] font-black mb-8 text-[#0EA5E9] uppercase tracking-[0.4em] flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#0EA5E9]" /> OUR BRANCH LOCATION
            </h4>
            <div className="space-y-4">
              {branches.map((branch, i) => (
                <div key={i} className="p-4 bg-white/5 border border-white/5 rounded-xl space-y-2 hover:bg-white/10 transition-colors">
                  <div className="flex items-center gap-2">
                    <div className="w-1 h-1 rounded-full bg-[#0EA5E9]" />
                    <p className="text-[10px] font-black text-white uppercase tracking-tighter">{branch.name}</p>
                  </div>
                  <p className="text-[10px] text-slate-400 font-medium italic leading-relaxed pl-3">{branch.addr}</p>
                </div>
              ))}
            </div>

            {/* Social Links Section - Task 19.3 */}
            <div className="mt-10 pt-8 border-t border-white/5">
               <h4 className="text-[10px] font-black mb-6 text-slate-500 uppercase tracking-[0.3em]">Social Networks</h4>
               <div className="flex flex-row items-center gap-3 w-full">
                  <a href="https://www.facebook.com/SwayamfinServices/" target="_blank" rel="noreferrer" className="flex items-center gap-1.5 text-slate-400 hover:text-white transition-all group whitespace-nowrap">
                    <Facebook className="w-3.5 h-3.5 text-slate-500 group-hover:text-[#0EA5E9] transition-colors" />
                    <span className="text-[9px] font-black uppercase tracking-widest leading-none">Facebook</span>
                  </a>
                  <a href="https://www.instagram.com/swayamfin/" target="_blank" rel="noreferrer" className="flex items-center gap-1.5 text-slate-400 hover:text-white transition-all group whitespace-nowrap">
                    <Instagram className="w-3.5 h-3.5 text-slate-500 group-hover:text-[#E4405F] transition-colors" />
                    <span className="text-[9px] font-black uppercase tracking-widest leading-none">Instagram</span>
                  </a>
                  <a href="https://www.linkedin.com/company/swayamfin-financial-services/" target="_blank" rel="noreferrer" className="flex items-center gap-1.5 text-slate-400 hover:text-white transition-all group whitespace-nowrap">
                    <Linkedin className="w-3.5 h-3.5 text-slate-500 group-hover:text-[#0A66C2] transition-colors" />
                    <span className="text-[9px] font-black uppercase tracking-widest leading-none">LinkedIn</span>
                  </a>
               </div>
            </div>
          </div>
        </div>

        {/* Collections & Support Policy Section */}
        <div className="mt-16 pt-12 border-t border-white/5">
           <div className="bg-white/5 rounded-[32px] p-8 md:p-12 border border-white/5 relative overflow-hidden group hover:border-[#0EA5E9]/30 transition-all duration-500 text-center">
              <div className="absolute inset-0 bg-[#0EA5E9]/5 rounded-full blur-3xl group-hover:bg-[#0EA5E9]/10 transition-colors opacity-30" />
              
              <div className="relative z-10 flex flex-col items-center">
                <h4 className="text-[11px] font-black mb-6 text-[#0EA5E9] uppercase tracking-[0.4em] flex items-center justify-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#0EA5E9]" /> COLLECTIONS & SUPPORT POLICY
                </h4>
                
                <p className="text-sm md:text-base text-slate-300 font-medium leading-relaxed max-w-4xl mx-auto">
                   We do not deploy recovery Agents and our Head of Collections is - <span className="text-white font-black">Mr. Manish Choudhary</span> who can be reached out at <a href="mailto:asm@swayamfin.com" className="text-[#0EA5E9] hover:underline underline-offset-4 transition-all">asm@swayamfin.com</a>. One can also contact us at our HO for any collections related query at <span className="text-white font-bold">Phone# 011-44728117</span> and <span className="text-white font-bold">Email: <a href="mailto:info@Swayamfin.com" className="hover:text-[#0EA5E9] transition-colors">info@Swayamfin.com</a></span>
                </p>
              </div>
           </div>
        </div>

        {/* Footer Bottom */}
        <div className="pt-8 border-t border-white/5 text-center">
          <p className="text-[10px] text-slate-500 font-bold uppercase tracking-[0.3em]">
            © {currentYear} Swayamfin. All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

const FooterLink = ({ to, label }) => (
  <Link to={to} className="text-[11px] text-slate-400 hover:text-white transition-all font-bold uppercase tracking-widest flex items-center gap-3 group">
    <span className="w-1 h-1 rounded-full bg-slate-600 group-hover:bg-[#0EA5E9] transition-all" />
    {label}
  </Link>
);

const FooterQuestionForm = () => {
  const [question, setQuestion] = useState('');
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('idle');
  const [focused, setFocused] = useState(null); // 'email' | 'question' | null

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!question.trim() || !email.trim()) return;
    setStatus('submitting');
    try {
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/questions/submit`, { question, email });
      if (response.data.success) {
        setStatus('success');
        setQuestion('');
        setEmail('');
        setTimeout(() => setStatus('idle'), 3500);
      } else {
        setStatus('error');
        setTimeout(() => setStatus('idle'), 3000);
      }
    } catch {
      setStatus('error');
      setTimeout(() => setStatus('idle'), 3000);
    }
  };

  const isDisabled = status === 'submitting' || status === 'success';

  return (
    <form onSubmit={handleSubmit}>
      {/* Unified joined input card */}
      <div className={`rounded-2xl overflow-hidden border transition-all duration-300 ${
        focused ? 'border-[#0EA5E9]/60 shadow-[0_0_0_3px_rgba(14,165,233,0.08)]' : 'border-white/10'
      } bg-white/5`}>

        {/* Email row */}
        <div className={`flex items-center gap-3 px-4 py-3 transition-colors ${focused === 'email' ? 'bg-white/8' : ''}`}>
          <Mail className="w-3.5 h-3.5 text-slate-500 shrink-0" />
          <input
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            onFocus={() => setFocused('email')}
            onBlur={() => setFocused(null)}
            placeholder="Your email address"
            required
            disabled={isDisabled}
            className="w-full bg-transparent text-[12px] font-medium text-white placeholder:text-slate-500 outline-none disabled:opacity-40"
          />
        </div>

        {/* Divider */}
        <div className="border-t border-white/8 mx-0" />

        {/* Question row */}
        <div className={`flex items-start gap-3 px-4 py-3 transition-colors ${focused === 'question' ? 'bg-white/8' : ''}`}>
          <MessageSquareIcon className="w-3.5 h-3.5 text-slate-500 shrink-0 mt-0.5" />
          <textarea
            value={question}
            onChange={e => setQuestion(e.target.value)}
            onFocus={() => setFocused('question')}
            onBlur={() => setFocused(null)}
            placeholder="Type your question here..."
            required
            rows={2}
            disabled={isDisabled}
            className="w-full bg-transparent text-[12px] font-medium text-white placeholder:text-slate-500 outline-none resize-none leading-relaxed disabled:opacity-40"
          />
        </div>

        {/* Divider */}
        <div className="border-t border-white/8" />

        {/* Submit row */}
        <button
          type="submit"
          disabled={isDisabled}
          className={`w-full flex items-center justify-center gap-2 py-3 text-[9px] font-black uppercase tracking-[0.3em] transition-all duration-300 ${
            status === 'success'
              ? 'bg-emerald-500/20 text-emerald-400'
              : status === 'error'
              ? 'bg-rose-500/10 text-rose-400'
              : 'bg-[#0EA5E9]/10 text-[#0EA5E9] hover:bg-[#0EA5E9]/20'
          } disabled:opacity-60`}
        >
          {status === 'submitting' && <><span className="w-3 h-3 border-2 border-current border-t-transparent rounded-full animate-spin" /> Sending...</>}
          {status === 'success'    && <><span>✓</span> Question Received</>}
          {status === 'error'      && <><span>✕</span> Try Again</>}
          {status === 'idle'       && <><SendIcon className="w-3 h-3" /> Submit Question</>}
        </button>
      </div>
    </form>
  );
};

export default Footer;

