import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const Footer = () => {
  const { t } = useTranslation();
  const currentYear = new Date().getFullYear();
  const brandLogo = '/swayam_official_logo.jpeg';

  return (
    <footer className="bg-white border-t border-[#F1F5F9] pt-16 pb-24 md:pb-12 overflow-hidden relative">
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-[#0EA5E9]/5 blur-[120px] rounded-full -translate-y-1/2" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-20 mb-16">
          {/* Brand Identity */}
          <div className="lg:col-span-4 space-y-8">
            <Link to="/" className="flex items-center gap-3">
              <div className="bg-white w-12 h-12 rounded-xl flex items-center justify-center shadow-lg border border-slate-100 p-1.5">
                <img
                  src={brandLogo}
                  alt="Swayamfin logo"
                  className="w-full h-full object-contain"
                />
              </div>
              <div className="flex flex-col leading-none">
                <span className="text-3xl font-black text-[#1E293B] tracking-tighter">swayamfin<span className="text-[#0EA5E9]">.</span></span>
                <span className="text-[9px] font-bold text-slate-400 tracking-[0.5em] uppercase mt-1">Financial Excellence</span>
              </div>
            </Link>
            <p className="text-sm text-slate-500 font-medium leading-relaxed italic border-l-4 border-[#0EA5E9]/20 pl-6">
              "Strategically engineering digital liquidity through institutional-grade protocols and high-velocity credit deployment cycles."
            </p>
          </div>

          {/* Navigation */}
          <div className="lg:col-span-8 grid grid-cols-2 md:grid-cols-3 gap-8">
            <div>
              <h4 className="text-[10px] font-black mb-6 text-[#0EA5E9] uppercase tracking-[0.4em]">Credit Scope</h4>
              <ul className="space-y-4">
                <li><FooterLink to="/services/msme-loans" label="MSME Loans" /></li>
                <li><FooterLink to="/services/supply-chain" label="Supply Chain" /></li>
                <li><FooterLink to="/services/housing-loans" label="Home Loans" /></li>
                <li><FooterLink to="/services/lap" label="Loan Against Property" /></li>
              </ul>
            </div>

            <div>
              <h4 className="text-[10px] font-black mb-6 text-[#0EA5E9] uppercase tracking-[0.4em]">Company</h4>
              <ul className="space-y-4">
                <li><FooterLink to="/about" label="Our Mission" /></li>
                <li><FooterLink to="/process" label="How It Works" /></li>
                <li><FooterLink to="/branches" label="Regional Nodes" /></li>
                <li><FooterLink to="/contact" label="Contact Us" /></li>
              </ul>
            </div>

            <div className="col-span-2 md:col-span-1">
              <h4 className="text-[10px] font-black mb-6 text-[#0EA5E9] uppercase tracking-[0.4em]">Access Root</h4>
              <div className="p-6 bg-slate-50 rounded-[24px] border border-slate-100 space-y-6">
                 <div>
                    <p className="text-[10px] font-black uppercase tracking-widest text-[#1E293B]">Partner Portal</p>
                    <p className="text-[9px] text-slate-500 font-bold uppercase mt-1">Agent & Employee Login</p>
                 </div>
                 <Link to="/agent/login" className="btn-primary w-full text-[10px] flex items-center justify-center uppercase tracking-widest py-3">
                    Partner Access
                 </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Legal & Compliance */}
        <div className="pt-12 border-t border-slate-100 space-y-8">
           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 text-[10px] text-slate-500 font-bold uppercase tracking-widest">
              <div className="flex gap-4">
                 <span className="text-[#0EA5E9]">ADD:</span>
                 <span>619, Somdutt Chambers II, Bhikaji Cama, New Delhi – 110066</span>
              </div>
              <div className="flex gap-4">
                 <span className="text-[#0EA5E9]">TEL:</span>
                 <span>+91 95607 23332 / 011-44728117</span>
              </div>
              <div className="flex gap-4">
                 <span className="text-[#0EA5E9]">MAIL:</span>
                 <span>info@swayamfin.com</span>
              </div>
           </div>

           <div className="p-8 bg-slate-50 rounded-[24px] border border-slate-100 text-[10px] text-slate-500 font-bold text-center space-y-6 italic">
              <p className="max-w-4xl mx-auto leading-relaxed opacity-70">
                Swayamfin Financial Services is a digital platform designed to provide easy access to financial services on behalf of regulated NBFC and HFC partners. 
                We do not lend directly. All credit decisions are at the sole discretion of the respective partner lender.
              </p>
              <div className="flex flex-wrap justify-center gap-x-12 gap-y-4 not-italic uppercase tracking-[0.3em]">
                <span>© {currentYear} SWAYAMFIN FINANCIAL SERVICES PVT LTD</span>
                <span>CIN: U66190DL2019PTC359196</span>
                <Link to="/privacy-policy" className="hover:text-[#0EA5E9]">Privacy Policy</Link>
                <Link to="/terms" className="hover:text-[#0EA5E9]">Terms of Service</Link>
              </div>
           </div>
        </div>
      </div>
    </footer>
  );
};

const FooterLink = ({ to, label }) => (
  <Link to={to} className="text-[11px] text-slate-500 hover:text-[#0EA5E9] transition-all font-bold uppercase tracking-widest flex items-center gap-3 group">
    <span className="w-1.5 h-1.5 rounded-full bg-slate-200 group-hover:bg-[#0EA5E9] group-hover:scale-125 transition-all" />
    {label}
  </Link>
);

export default Footer;
