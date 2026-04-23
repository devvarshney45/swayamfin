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
  ChevronRight
} from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';

const Footer = () => {
  const { isDark } = useTheme();
  const { t } = useTranslation();
  const currentYear = new Date().getFullYear();

  return (
    <footer className={`${isDark ? 'bg-[#020617]' : 'bg-white border-t border-slate-200'} pt-16 md:pt-24 pb-8 md:pb-12 font-dmsans transition-colors duration-300`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 md:gap-16 mb-12 md:mb-20">
          {/* Brand Identity */}
          <div className="space-y-6 text-center sm:text-left">
            <Link to="/" className="flex items-center justify-center sm:justify-start gap-3 group">
              <div className="bg-primary-gold p-2 md:p-2.5 rounded-xl transition-transform shadow-lg shadow-primary-gold/20 group-hover:rotate-6">
                <Building2 className="w-6 h-6 text-[#020617]" />
              </div>
              <span className={`text-2xl font-playfair font-black tracking-tight lowercase ${isDark ? 'text-white' : 'text-slate-900'}`}>swayamfin.com</span>
            </Link>
            <p className={`text-sm ${isDark ? 'text-slate-400' : 'text-slate-600'} font-medium leading-relaxed max-w-xs mx-auto sm:mx-0 italic`}>
              {t('footer_desc')}
            </p>
            <div className="flex justify-center sm:justify-start gap-4">
              {[Linkedin, Twitter, Instagram].map((Icon, idx) => (
                <a key={idx} href="#" className={`w-10 h-10 rounded-xl ${isDark ? 'bg-white/5 border-white/10' : 'bg-slate-50 border-slate-200'} border flex items-center justify-center hover:bg-primary-gold hover:text-[#020617] transition-all duration-300 ${isDark ? 'text-white' : 'text-slate-600'}`}>
                  <Icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Solutions Hub */}
          <div className="text-center sm:text-left">
            <h4 className="text-[10px] font-black mb-6 md:mb-8 text-primary-gold uppercase tracking-[0.3em]">{t('footer_products')}</h4>
            <ul className="space-y-3 md:space-y-4">
              <li><FooterLink to="/services/msme-loans" label={t('msme_loan')} isDark={isDark} /></li>
              <li><FooterLink to="/services/supply-chain" label={t('supply_chain')} isDark={isDark} /></li>
              <li><FooterLink to="/services/housing-loans" label={t('home_loan')} isDark={isDark} /></li>
              <li><FooterLink to="/services/lap" label={t('lap')} isDark={isDark} /></li>
            </ul>
          </div>

          {/* Ecosystem Links */}
          <div className="text-center sm:text-left">
            <h4 className="text-[10px] font-black mb-6 md:mb-8 text-primary-gold uppercase tracking-[0.3em]">{t('footer_links')}</h4>
            <ul className="space-y-3 md:space-y-4">
              <li><FooterLink to="/about" label={t('nav_about')} isDark={isDark} /></li>
              <li><FooterLink to="/process" label="Calculators" isDark={isDark} /></li>
              <li><FooterLink to="/contact" label={t('nav_contact')} isDark={isDark} /></li>
              <li><FooterLink to="/privacy-policy" label="Privacy Protocol" isDark={isDark} /></li>
            </ul>
          </div>

          {/* Contact Interface */}
          <div className="space-y-6 md:space-y-8 text-center sm:text-left">
            <h4 className="text-[10px] font-black mb-6 md:mb-8 text-primary-gold uppercase tracking-[0.3em]">{t('footer_contact')}</h4>
            <div className={`flex flex-col sm:flex-row gap-3 items-start text-xs ${isDark ? 'text-slate-400' : 'text-slate-600'} font-bold`}>
              <MapPin className="w-4 h-4 text-primary-gold shrink-0 sm:mt-1 mx-auto sm:mx-0" />
              <span className="leading-relaxed">619, Somdutt Chambers II, Bhikaji Cama, New Delhi – 110066</span>
            </div>
            <div className={`flex flex-col sm:flex-row gap-3 items-start text-sm ${isDark ? 'text-slate-200' : 'text-slate-900'} font-black`}>
              <Phone className="w-4 h-4 text-primary-gold shrink-0 sm:mt-1 mx-auto sm:mx-0" />
              <span>+91 87009 65592 / 011-44728117</span>
            </div>
          </div>
        </div>

        {/* Global Network Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-4 py-8 md:py-10 border-y border-white/5 mb-8 md:mb-12">
           {['Agra Hub', 'Mathura Hub', 'Hathras Hub', 'Kosi Hub'].map((loc) => (
             <Link 
               key={loc} 
               to={`/branches/${loc.toLowerCase().split(' ')[0]}`}
               className="flex items-center justify-center sm:justify-start gap-2.5 text-[9px] md:text-[10px] font-black uppercase tracking-widest text-slate-500 hover:text-primary-gold transition-colors group cursor-pointer"
             >
                <div className={`w-1.5 h-1.5 rounded-full ${isDark ? 'bg-white/10' : 'bg-slate-200'} group-hover:bg-primary-gold transition-colors`} />
                {loc}
             </Link>
           ))}
        </div>

        {/* Legal & Regulatory Compliance */}
        <div className="pt-8 border-t border-white/5 text-[9px] md:text-[10px] text-slate-500 font-bold text-center space-y-6 md:space-y-8">
          <p className="max-w-4xl mx-auto leading-relaxed opacity-60 px-4">
            "Swayamfin is a premium digital brand of Green Miles Mobility Pvt. Ltd., operating as a certified Loan Service Provider (LSP). 
            Facilitating financial inclusion on behalf of regulated NBFC and HFC partners. 
            Swayamfin does not lend directly. All lending decisions are at the sole discretion of the partner lender."
          </p>
          <div className="flex flex-col md:flex-row flex-wrap justify-center gap-x-10 gap-y-3 opacity-80 uppercase tracking-widest">
            <span>© {currentYear} Green Miles Mobility Pvt. Ltd.</span>
            <span>CIN: U66190DL2019PTC359196</span>
            <span>Strategic Partner: DMI Housing Finance Pvt. Ltd.</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

const FooterLink = ({ to, label, isDark }) => (
  <Link to={to} className={`text-[10px] md:text-xs ${isDark ? 'text-slate-400 hover:text-white' : 'text-slate-600 hover:text-slate-900'} transition-all font-black uppercase tracking-[0.1em] flex items-center justify-center sm:justify-start gap-2 group`}>
    <ChevronRight className="w-3 h-3 opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all text-primary-gold" />
    {label}
  </Link>
);

export default Footer;
