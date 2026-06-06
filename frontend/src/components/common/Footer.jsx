import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Phone, Mail, MapPin } from 'lucide-react';

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

  const hubs = [
    { name: 'Agra Hub', addr: 'Block No. 20/4, Shop No. 11, Maruti Tower, Sanjay Place, Agra, UP - 282002' },
    { name: 'Mathura Hub', addr: 'No. 207, 2nd Floor, Shri Square, Radhapuram Chauraha, Mathura, UP - 281001' },
    { name: 'Hathras Hub', addr: 'VG Plaza, Glory Garden, Mathura Road, Hathras, UP - 204101' },
    { name: 'Kosi Hub', addr: 'Radharani Tower, New Agrawal Colony, Nandgaon Road, Kosi Kalan, UP - 281403' },
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
              <li><FooterLink to="/branches" label="About our branches" /></li>
              <li><FooterLink to="/contact" label="Contact Us" /></li>
            </ul>
          </div>

          {/* Column 4: Locations */}
          <div>
            <h4 className="text-[11px] font-black mb-8 text-[#0EA5E9] uppercase tracking-[0.4em] flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#0EA5E9]" /> OUR BRANCH LOCATION
            </h4>
            <div className="space-y-4">
              {hubs.map((hub, i) => (
                <div key={i} className="p-4 bg-white/5 border border-white/5 rounded-xl space-y-2 hover:bg-white/10 transition-colors">
                  <div className="flex items-center gap-2">
                    <div className="w-1 h-1 rounded-full bg-[#0EA5E9]" />
                    <p className="text-[10px] font-black text-white uppercase tracking-tighter">{hub.name}</p>
                  </div>
                  <p className="text-[10px] text-slate-400 font-medium italic leading-relaxed pl-3">{hub.addr}</p>
                </div>
              ))}
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

export default Footer;
