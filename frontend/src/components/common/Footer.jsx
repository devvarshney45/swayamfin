import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

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

  return (
    <footer className="bg-white border-t border-[#F1F5F9] pt-16 pb-24 md:pb-12 overflow-hidden relative">
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-[#0EA5E9] bg-opacity-5 blur-[120px] rounded-full -translate-y-1/2" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-20 mb-16">
          {/* Brand Identity */}
          <div className="lg:col-span-4 space-y-8 text-center lg:text-left">
            <Link to="/" className="flex flex-col items-center lg:items-start gap-4">
              <div className="bg-white w-14 h-14 rounded-2xl flex items-center justify-center shadow-lg border border-slate-100 p-2">
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
            <p className="text-sm text-slate-500 font-medium leading-relaxed italic border-l-0 lg:border-l-4 border-none lg:border-[#0EA5E9] lg:border-opacity-20 lg:pl-6 max-w-sm mx-auto lg:mx-0">
              "We keep digital money flowing smoothly by using professional-grade tech to move and lend it out really fast."
            </p>
          </div>

          {/* Navigation */}
          <div className="lg:col-span-8 grid grid-cols-2 gap-8 text-center lg:text-left">
            <div>
              <h4 className="text-[10px] font-black mb-8 text-[#0EA5E9] uppercase tracking-[0.4em]">Our Services</h4>
              <ul className="space-y-4">
                {services.map((service, i) => (
                  <li key={i}><FooterLink to={`/services/${service.slug}`} label={service.name} /></li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-[10px] font-black mb-8 text-[#0EA5E9] uppercase tracking-[0.4em]">Company</h4>
              <ul className="space-y-4">
                <li><FooterLink to="/about" label="Our Mission" /></li>
                <li><FooterLink to="/" label="How It Works" /></li>
                <li><FooterLink to="/branches" label="About our branches" /></li>
                <li><FooterLink to="/contact" label="Contact Us" /></li>
              </ul>
            </div>
          </div>
        </div>

        {/* Regional Hubs Section */}
        <div className="mb-16 p-8 md:p-12 bg-slate-50 rounded-[40px] border border-slate-100">
          <div className="flex items-center justify-center lg:justify-start gap-3 mb-10">
            <div className="w-2 h-2 rounded-full bg-[#0EA5E9]" />
            <h4 className="text-[10px] font-black text-[#1E293B] uppercase tracking-[0.4em]">Regional Distribution Hubs</h4>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
            {[
              { name: 'Agra Hub', addr: 'Block No. 20/4, Shop No. 11, Maruti Tower, Sanjay Place, Agra, UP - 282002' },
              { name: 'Mathura Hub', addr: 'No. 207, 2nd Floor, Shri Square, Radhapuram Chauraha, Mathura, UP - 281001' },
              { name: 'Hathras Hub', addr: 'VG Plaza, Glory Garden, Mathura Road, Hathras, UP - 204101' },
              { name: 'Kosi Hub', addr: 'Radharani Tower, New Agrawal Colony, Nandgaon Road, Kosi Kalan, UP - 281403' },
            ].map((branch, i) => (
              <div key={i} className="space-y-3 p-6 bg-white rounded-2xl border border-slate-100 shadow-sm">
                <p className="text-[12px] font-black text-[#1E293B] uppercase tracking-tight">{branch.name}</p>
                <p className="text-[10px] text-slate-500 font-medium italic leading-relaxed">{branch.addr}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Legal & Compliance */}
        <div className="pt-12 border-t border-slate-100 space-y-8">
           <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-[10px] text-slate-500 font-bold uppercase tracking-widest text-center lg:text-left">
              <div className="flex flex-col lg:flex-row gap-2 lg:gap-4 items-center lg:items-start">
                 <span className="text-[#0EA5E9]">ADD:</span>
                 <span>619, Somdutt Chambers II, Bhikaji Cama, New Delhi – 110066</span>
              </div>
              <div className="flex flex-col lg:flex-row gap-2 lg:gap-4 items-center lg:items-start">
                 <span className="text-[#0EA5E9]">TEL:</span>
                 <span>+91 95607 23332 / 011-44728117</span>
              </div>
              <div className="flex flex-col lg:flex-row gap-2 lg:gap-4 items-center lg:items-start">
                 <span className="text-[#0EA5E9]">MAIL:</span>
                 <span>info@swayamfin.com</span>
              </div>
           </div>

           <div className="p-8 bg-slate-50 rounded-[32px] border border-slate-100 text-[10px] text-slate-500 font-bold text-center space-y-8 italic">
              <p className="max-w-4xl mx-auto leading-relaxed opacity-70">
                Swayamfin Financial Services is a digital platform designed to provide easy access to financial services on behalf of regulated NBFC and HFC partners. 
                We do not lend directly. All credit decisions are at the sole discretion of the respective partner lender.
              </p>
              <div className="flex flex-wrap justify-center gap-x-12 gap-y-6 not-italic uppercase tracking-[0.3em] font-black">
                <span>© {currentYear} SWAYAMFIN</span>
                <span>CIN: U66190DL2019PTC359196</span>
                <Link to="/privacy-policy" className="hover:text-[#0EA5E9] transition-colors">Privacy Policy</Link>
                <Link to="/terms" className="hover:text-[#0EA5E9] transition-colors">Terms of Service</Link>
              </div>
           </div>
        </div>
      </div>
    </footer>
  );
};

const FooterLink = ({ to, label }) => (
  <Link to={to} className="text-[11px] text-slate-500 hover:text-[#0EA5E9] transition-all font-bold uppercase tracking-widest flex items-center justify-center lg:justify-start gap-3 group">
    <span className="w-1.5 h-1.5 rounded-full bg-slate-200 group-hover:bg-[#0EA5E9] group-hover:scale-125 transition-all hidden lg:block" />
    {label}
  </Link>
);

export default Footer;
