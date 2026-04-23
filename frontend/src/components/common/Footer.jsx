import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { 
  Facebook, 
  Twitter, 
  Linkedin, 
  Instagram, 
  Mail, 
  Phone, 
  MapPin, 
  AreaChart,
  ShieldCheck,
  Building2,
  ChevronRight,
  Shield,
  Activity,
  Globe,
  Zap,
  ArrowUpRight
} from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';

const Footer = () => {
  const { isDark } = useTheme();
  const { t } = useTranslation();
  const currentYear = new Date().getFullYear();

  return (
    <footer className={`${isDark ? 'bg-[#020617]' : 'bg-white border-t border-slate-200'} pt-14 md:pt-20 pb-24 md:pb-12 font-dmsans transition-colors duration-500 overflow-hidden relative`}>
      {/* Decorative Background Elements */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-blue-600/5 blur-[120px] rounded-full -translate-y-1/2" />
      <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-primary-gold/5 blur-[100px] rounded-full translate-y-1/2" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 relative z-10">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-20 mb-14 md:mb-20">
          {/* Brand Identity Protocol */}
          <div className="lg:col-span-4 space-y-10 group">
            <Link to="/" className="flex items-center gap-4 group/logo">
              <div className="bg-primary-gold p-3 rounded-2xl shadow-2xl shadow-primary-gold/20 group-hover/logo:rotate-12 transition-transform duration-700">
                <Zap className="w-8 h-8 text-[#020617]" />
              </div>
              <div className="flex flex-col">
                <span className={`text-3xl font-playfair font-black tracking-tighter ${isDark ? 'text-white' : 'text-[#020617]'}`}>swayamfin<span className="text-blue-600">.</span></span>
                <span className="text-[9px] font-black text-slate-500 tracking-[0.6em] uppercase mt-1 opacity-60">Global Credit Infrastructure</span>
              </div>
            </Link>
            <p className={`text-sm ${isDark ? 'text-slate-400' : 'text-slate-500'} font-medium leading-loose italic pr-4`}>
              "Strategically engineering digital liquidity through institutional-grade protocols and high-velocity credit deployment cycles."
            </p>
            <div className="flex gap-4">
              {[Linkedin, Twitter, Instagram].map((Icon, idx) => (
                <a key={idx} href="#" className={`w-12 h-12 rounded-2xl ${isDark ? 'bg-white/5 border-white/5' : 'bg-slate-50 border-slate-200'} border flex items-center justify-center hover:bg-[#020617] hover:text-white hover:border-blue-600 transition-all duration-500 ${isDark ? 'text-slate-400' : 'text-slate-600 shadow-sm'}`}>
                  <Icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Institutional Navigation Protocols */}
          <div className="lg:col-span-8 grid grid-cols-2 md:grid-cols-3 gap-8">
            {/* Credit Scope */}
            <div>
              <h4 className="text-[10px] font-black mb-5 text-blue-600 uppercase tracking-[0.4em]">Credit Scope</h4>
              <ul className="space-y-3">
                <li><FooterLink to="/services/msme-loans" label="MSME Enterprise" isDark={isDark} /></li>
                <li><FooterLink to="/services/supply-chain" label="Supply Chain V1" isDark={isDark} /></li>
                <li><FooterLink to="/services/housing-loans" label="Housing Project" isDark={isDark} /></li>
                <li><FooterLink to="/services/lap" label="Asset Liquidity" isDark={isDark} /></li>
              </ul>
            </div>

            {/* Platform Ecosystem */}
            <div>
              <h4 className="text-[10px] font-black mb-5 text-blue-600 uppercase tracking-[0.4em]">Ecosystem</h4>
              <ul className="space-y-3">
                <li><FooterLink to="/about" label="Mission Profile" isDark={isDark} /></li>
                <li><FooterLink to="/process" label="Intel Hub" isDark={isDark} /></li>
                <li><FooterLink to="/branches" label="Regional Nodes" isDark={isDark} /></li>
                <li><FooterLink to="/contact" label="Uplink Port" isDark={isDark} /></li>
              </ul>
            </div>

            {/* Strategic Access */}
            <div className="col-span-2 md:col-span-1 space-y-8">
              <h4 className="text-[10px] font-black mb-5 text-blue-600 uppercase tracking-[0.4em]">Command Port</h4>
              <div className={`p-6 rounded-[32px] ${isDark ? 'bg-white/5 border-white/5' : 'bg-slate-50 border-slate-200'} border space-y-6 relative overflow-hidden group/card`}>
                 <div className="absolute top-0 right-0 w-24 h-24 bg-blue-600/10 blur-2xl rounded-full translate-x-1/2 -translate-y-1/2" />
                 <div className="flex gap-4 items-start">
                    <Activity className="w-5 h-5 text-primary-gold shrink-0 mt-1" />
                    <div>
                       <p className={`text-[10px] font-black uppercase tracking-widest ${isDark ? 'text-white' : 'text-[#020617]'}`}>Real-time Telemetry</p>
                       <p className="text-[9px] text-slate-500 font-bold uppercase mt-1">24/7 Monitoring</p>
                    </div>
                 </div>
                 <Link to="/agent/login" className="w-full py-4 bg-[#020617] text-white rounded-[18px] text-[10px] font-black uppercase tracking-[0.3em] flex items-center justify-center gap-3 hover:bg-blue-600 transition-all border border-white/5 shadow-xl shadow-black/20">
                    Partner Access <ArrowUpRight className="w-4 h-4" />
                 </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Regional Hub Network */}
        <div className={`p-6 md:p-8 rounded-2xl md:rounded-3xl ${isDark ? 'bg-white/5 border-white/10' : 'bg-slate-50 border-slate-200 shadow-sm'} border mb-10 md:mb-16`}>
           <div className="flex flex-col md:flex-row items-center justify-between gap-12 relative z-10">
              <div className="space-y-2 text-center md:text-left">
                 <h5 className={`text-sm font-black uppercase tracking-[0.4em] ${isDark ? 'text-white' : 'text-[#020617]'}`}>Distribution Network</h5>
                 <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest italic leading-relaxed">Strategic Presence Across North Indian Credit Corridors</p>
              </div>
              <div className="flex flex-wrap justify-center md:justify-end gap-3">
                 {['Agra Hub', 'Mathura Hub', 'Hathras Hub', 'Kosi Hub'].map((loc) => (
                   <Link 
                     key={loc} 
                     to={`/branches/${loc.toLowerCase().split(' ')[0]}`}
                     className={`px-8 py-4 rounded-[22px] ${isDark ? 'bg-white/5 border-white/5 text-slate-400' : 'bg-white shadow-sm border-slate-100 text-slate-600'} border text-[9px] md:text-[10px] font-black uppercase tracking-[0.3em] hover:text-blue-600 hover:border-blue-600/30 transition-all active:scale-95`}
                   >
                      {loc}
                   </Link>
                 ))}
              </div>
           </div>
        </div>

        {/* Institutional Disclosure & Compliance */}
        <div className="pt-8 md:pt-12 border-t border-white/5 space-y-6 md:space-y-8">
           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 text-[10px] text-slate-500 font-bold uppercase tracking-widest leading-relaxed">
              <div className="flex gap-5 items-start">
                 <MapPin className="w-5 h-5 text-primary-gold shrink-0" />
                 <span>619, Somdutt Chambers II, <br /> Bhikaji Cama, New Delhi – 110066</span>
              </div>
              <div className="flex gap-5 items-start">
                 <Phone className="w-5 h-5 text-primary-gold shrink-0" />
                 <span>+91 87009 65592 <br /> / 011-44728117</span>
              </div>
              <div className="flex gap-5 items-start">
                 <Mail className="w-5 h-5 text-primary-gold shrink-0" />
                 <span>Strategic-Inquiry@swayamfin.com <br /> Operations-Node@greenmiles.in</span>
              </div>
           </div>

           <div className={`p-6 md:p-8 rounded-2xl md:rounded-3xl ${isDark ? 'bg-[#020617] border-white/5' : 'bg-slate-100 border-slate-200'} border text-[9px] md:text-[10px] text-slate-500 font-bold text-center space-y-5 italic`}>
             <p className="max-w-4xl mx-auto leading-[2] opacity-60 px-4">
               "Swayamfin is a premium digital trademark platform of Green Miles Mobility Pvt. Ltd., operating as a certified Loan Service Provider (LSP). 
               We facilitate high-velocity financial inclusion on behalf of regulated NBFC and HFC partners. 
               Swayamfin does not lend directly. All lending protocols and final credit decisions are at the sole discretion of the respective partner lender."
             </p>
             <div className="flex flex-col md:flex-row flex-wrap justify-center gap-x-12 gap-y-4 opacity-80 uppercase tracking-[0.4em] not-italic">
               <span className="flex items-center gap-3"><Shield className="w-4 h-4 text-blue-600" /> © {currentYear} Green Miles Mobility</span>
               <span className="flex items-center gap-3"><Globe className="w-4 h-4 text-blue-600" /> CIN: U66190DL2019PTC359196</span>
               <span className="flex items-center gap-3"><Activity className="w-4 h-4 text-blue-600" /> Strategic Protocol V4.0.1</span>
             </div>
           </div>
        </div>
      </div>
    </footer>
  );
};

const FooterLink = ({ to, label, isDark }) => (
  <Link to={to} className={`text-[10px] md:text-[11px] ${isDark ? 'text-slate-500 hover:text-white' : 'text-slate-500 hover:text-[#020617]'} transition-all font-black uppercase tracking-[0.2em] flex items-center justify-start gap-3 group`}>
    <div className={`w-1.5 h-1.5 rounded-full ${isDark ? 'bg-white/10' : 'bg-slate-200'} group-hover:bg-blue-600 group-hover:scale-150 transition-all duration-500`} />
    {label}
  </Link>
);

export default Footer;
