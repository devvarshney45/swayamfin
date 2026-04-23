import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { 
  AreaChart, 
  MessageCircle, 
  PhoneCall, 
  User, 
  LogOut, 
  LayoutDashboard, 
  ChevronDown,
  Building2,
  MapPin,
  Briefcase,
  Home,
  Truck,
  ShieldCheck,
  Globe,
  Sun,
  Moon,
  Menu,
  X,
  Sparkles,
  ArrowRight
} from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const { t, i18n } = useTranslation();
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { isDark, toggleTheme } = useTheme();

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  const toggleLanguage = () => {
    const newLang = i18n.language === 'en' ? 'hi' : 'en';
    i18n.changeLanguage(newLang);
    
    const attemptTranslate = (attempts = 0) => {
      const select = document.querySelector('.goog-te-combo');
      if (select) {
        select.value = newLang;
        select.dispatchEvent(new Event('change', { bubbles: true }));
        const options = select.querySelectorAll('option');
        const targetOption = Array.from(options).find(opt => opt.value === newLang);
        if (targetOption) {
          targetOption.selected = true;
          select.dispatchEvent(new Event('change', { bubbles: true }));
        }
      } else if (attempts < 15) {
        setTimeout(() => attemptTranslate(attempts + 1), 200 + (attempts * 100));
      }
    };
    attemptTranslate();
  };

  const services = [
    { name: t('home_loan'), slug: 'housing-loans', icon: Home, desc: 'Your dream home made easy' },
    { name: t('lap'), slug: 'lap', icon: Building2, desc: 'Unlock property value' },
    { name: t('msme_loan'), slug: 'msme-loans', icon: Briefcase, desc: 'Fueling business growth' },
    { name: t('micro_lap'), slug: 'micro-lap', icon: MapPin, desc: 'Small loans, big impact' },
    { name: t('hybrid_msme'), slug: 'hybrid-msme', icon: Globe, desc: 'Mixed lending solutions' },
    { name: t('supply_chain'), slug: 'supply-chain', icon: Truck, desc: 'Inventory & PO funding' },
    { name: t('unsecured_msme'), slug: 'unsecured-msme', icon: ShieldCheck, desc: 'No collateral needed' },
    { name: t('machinery_loan'), slug: 'machinery-loan', icon: AreaChart, desc: 'Equipment financing' },
  ];

  const branches = [
    { name: 'Agra', slug: 'agra' },
    { name: 'Mathura', slug: 'mathura' },
    { name: 'Hathras', slug: 'hathras' },
    { name: 'Kosi', slug: 'kosi' },
  ];

  return (
    <>
      <nav className={`${isDark ? 'bg-[#020617]/80 border-white/5 shadow-black/50' : 'bg-white/80 border-slate-200 shadow-slate-200/50'} border-b sticky top-0 z-[100] backdrop-blur-xl font-dmsans transition-all duration-300`}>
        {/* Top bar for Trust signal */}
        <div className={`${isDark ? 'bg-[#0B0F19] text-white border-white/5' : 'bg-slate-50 text-slate-600 border-slate-200'} text-[10px] py-1.5 text-center font-black uppercase tracking-[0.25em] hidden md:block border-b opacity-80`}>
           RBI REGISTERED NBFC PARTNER • <span className="text-primary-gold">ISO 9001:2015 CERTIFIED</span>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20 md:h-24">
            
            {/* Logo Section */}
            <div className="flex items-center">
              <Link to="/" className="flex items-center gap-3 group">
                <div className="bg-primary-gold p-2 md:p-2.5 rounded-xl group-hover:rotate-12 transition-transform duration-500 shadow-xl shadow-primary-gold/20">
                  <AreaChart className="w-6 h-6 md:w-7 md:h-7 text-[#020617]" />
                </div>
                <div className="flex flex-col">
                  <span className={`text-xl md:text-2xl font-playfair font-black ${isDark ? 'text-white' : 'text-slate-900'} tracking-tight leading-none lowercase`}>swayamfin.com</span>
                  <span className="text-[8px] md:text-[9px] font-black text-primary-gold tracking-[0.2em] leading-tight uppercase italic opacity-60 mt-1">Financial Excellence</span>
                </div>
              </Link>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-7">
              <NavLink to="/" label={t('nav_home')} isDark={isDark} />
              
              {/* Product Mega Menu */}
              <div 
                className="relative group"
                onMouseEnter={() => setActiveDropdown('services')}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <button className={`flex items-center gap-1.5 text-[11px] font-black ${isDark ? 'text-slate-300' : 'text-slate-700'} hover:text-primary-gold transition-all uppercase tracking-widest py-8`}>
                  {t('nav_services')} <ChevronDown className={`w-3.5 h-3.5 text-primary-gold transition-transform duration-300 ${activeDropdown === 'services' ? 'rotate-180' : ''}`} />
                </button>
                
                <AnimatePresence>
                  {activeDropdown === 'services' && (
                    <motion.div 
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      className={`absolute top-[90%] left-1/2 -translate-x-1/2 w-[650px] ${isDark ? 'bg-[#0B0F19] border-white/5 shadow-2xl shadow-black' : 'bg-white border-slate-200 shadow-2xl shadow-slate-200/50'} border rounded-[40px] p-6 grid grid-cols-2 gap-4`}
                    >
                      {services.map((item) => (
                        <Link 
                          key={item.slug}
                          to={`/services/${item.slug}`}
                          className={`flex items-center gap-4 p-4 rounded-3xl ${isDark ? 'hover:bg-white/5 border-transparent hover:border-white/10' : 'hover:bg-slate-50 border-transparent hover:border-slate-200'} transition-all border group`}
                        >
                          <div className={`w-12 h-12 ${isDark ? 'bg-white/5 text-slate-400' : 'bg-slate-100 text-slate-500'} rounded-2xl flex items-center justify-center group-hover:bg-primary-gold group-hover:text-[#020617] group-hover:rotate-12 transition-all`}>
                            <item.icon className="w-6 h-6" />
                          </div>
                          <div>
                            <p className={`font-black text-xs ${isDark ? 'text-white' : 'text-slate-900'} uppercase tracking-tight mb-1`}>{item.name}</p>
                            <p className="text-[10px] text-slate-500 font-bold opacity-60 uppercase">{item.desc}</p>
                          </div>
                        </Link>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Branches Menu */}
              <div 
                className="relative group"
                onMouseEnter={() => setActiveDropdown('branches')}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <button className={`flex items-center gap-1.5 text-[11px] font-black ${isDark ? 'text-slate-300' : 'text-slate-700'} hover:text-primary-gold transition-all uppercase tracking-widest py-8`}>
                  Branches <ChevronDown className={`w-3.5 h-3.5 text-primary-gold transition-transform duration-300 ${activeDropdown === 'branches' ? 'rotate-180' : ''}`} />
                </button>
                
                <AnimatePresence>
                  {activeDropdown === 'branches' && (
                    <motion.div 
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      className={`absolute top-[90%] left-0 w-56 ${isDark ? 'bg-[#0B0F19] border-white/5 shadow-2xl' : 'bg-white border-slate-200 shadow-2xl'} border rounded-3xl p-3`}
                    >
                      {branches.map((item) => (
                        <Link 
                          key={item.slug}
                          to={`/branches/${item.slug}`}
                          className={`flex items-center justify-between px-5 py-3.5 text-[10px] font-black uppercase tracking-widest ${isDark ? 'text-slate-300 hover:bg-white/5' : 'text-slate-700 hover:bg-slate-50'} hover:text-primary-gold rounded-xl transition-all group`}
                        >
                          {item.name} <ArrowRight className="w-3 h-3 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-primary-gold" />
                        </Link>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <NavLink to="/process" label={t('nav_partners')} isDark={isDark} />
              <NavLink to="/about" label={t('nav_about')} isDark={isDark} />
              
              <div className="w-px h-6 bg-white/10 hidden xl:block" />

              <div className="flex items-center gap-3">
                {/* Language Toggle */}
                <NavIconBtn onClick={toggleLanguage} icon={<Globe className="w-4 h-4" />} label={i18n.language === 'en' ? 'EN' : 'HI'} isDark={isDark} />
                {/* Theme Toggle */}
                <NavIconBtn onClick={toggleTheme} icon={isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />} isDark={isDark} />
                
                <a href="https://wa.me/916397003690" className="flex items-center gap-2 text-success-green hover:opacity-80 transition group xl:ml-2">
                  <div className="w-9 h-9 rounded-xl bg-green-500/10 flex items-center justify-center group-hover:scale-110 transition-transform shadow-inner">
                    <MessageCircle className="w-4 h-4 fill-current" />
                  </div>
                  <span className={`text-[11px] font-black tracking-widest ${isDark ? 'text-white/90' : 'text-slate-700'} group-hover:text-success-green transition-colors hidden xl:block`}>6397003690</span>
                </a>
              </div>

              {renderAuthSection(user, logout, navigate, isDark, false)}
            </div>

            {/* Mobile Actions Overlay */}
            <div className="lg:hidden flex items-center gap-2 md:gap-4">
              <button
                onClick={toggleTheme}
                className={`p-2.5 rounded-xl ${isDark ? 'bg-white/5 text-slate-300' : 'bg-slate-100 text-slate-600'} border border-transparent active:scale-95 transition-all`}
              >
                {isDark ? <Sun className="w-4.5 h-4.5" /> : <Moon className="w-4.5 h-4.5" />}
              </button>
              
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className={`p-2.5 rounded-xl ${isDark ? 'bg-primary-gold text-[#020617]' : 'bg-primary-gold text-white'} shadow-lg shadow-primary-gold/20 active:scale-95 transition-all`}
              >
                {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
            
          </div>
        </div>

        {/* Mobile Menu Overlay */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className={`lg:hidden overflow-hidden ${isDark ? 'bg-[#020617] border-white/5' : 'bg-white border-slate-200'} border-b`}
            >
              <div className="px-6 py-10 space-y-8 max-h-[80vh] overflow-y-auto">
                <div className="grid grid-cols-1 gap-6">
                  <MobileLink to="/" label={t('nav_home')} icon={<Home className="w-5 h-5" />} isDark={isDark} />
                  <MobileLink to="/about" label={t('nav_about')} icon={<ShieldCheck className="w-5 h-5" />} isDark={isDark} />
                  <MobileLink to="/process" label="Calculators" icon={<AreaChart className="w-5 h-5" />} isDark={isDark} />
                </div>

                <div className="space-y-4">
                  <p className="text-[10px] font-black text-slate-500 uppercase tracking-[0.3em] ml-2">Lending Suite</p>
                  <div className="grid grid-cols-2 gap-3">
                    {services.slice(0, 6).map(s => (
                      <Link key={s.slug} to={`/services/${s.slug}`} className={`p-4 rounded-3xl ${isDark ? 'bg-white/5' : 'bg-slate-50'} flex flex-col gap-3 group`}>
                        <s.icon className="w-5 h-5 text-primary-gold" />
                        <span className={`text-[10px] font-black uppercase tracking-tight ${isDark ? 'text-white' : 'text-slate-900'}`}>{s.name}</span>
                      </Link>
                    ))}
                  </div>
                </div>

                <div className="space-y-4">
                  <p className="text-[10px] font-black text-slate-500 uppercase tracking-[0.3em] ml-2">Regional Presence</p>
                  <div className="flex flex-wrap gap-2">
                    {branches.map(b => (
                      <Link key={b.slug} to={`/branches/${b.slug}`} className={`px-5 py-3 rounded-2xl ${isDark ? 'bg-white/5 text-white' : 'bg-slate-50 text-slate-900'} text-[10px] font-black uppercase tracking-widest border border-transparent active:border-primary-gold`}>
                        {b.name}
                      </Link>
                    ))}
                  </div>
                </div>

                <div className="pt-6 border-t border-white/5 flex flex-col gap-4">
                  <button 
                    onClick={toggleLanguage}
                    className={`w-full py-5 rounded-2xl ${isDark ? 'bg-white/5 text-white' : 'bg-slate-100 text-slate-900'} flex items-center justify-center gap-3 font-black uppercase tracking-[0.2em] text-xs`}
                  >
                    <Globe className="w-5 h-5 text-primary-gold" /> {i18n.language === 'en' ? 'Switch to Hindi (हिंदी)' : 'English में बदलें'}
                  </button>
                  
                  {renderAuthSection(user, logout, navigate, isDark, true)}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Mobile Sticky Bar - Brief 2.4 */}
      <div className={`lg:hidden fixed bottom-6 left-6 right-6 ${isDark ? 'bg-white/10' : 'bg-white/90'} backdrop-blur-2xl border ${isDark ? 'border-white/10' : 'border-slate-200'} p-2 z-[150] flex gap-2 rounded-3xl shadow-2xl transition-all duration-300`}>
        <a href="https://wa.me/916397003690" className="flex-1 bg-success-green text-white flex items-center justify-center gap-2 py-4 rounded-2xl font-black text-[10px] uppercase tracking-widest">
          <MessageCircle className="w-4.5 h-4.5 fill-current" /> WhatsApp
        </a>
        <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="flex-1 bg-primary-gold text-[#020617] flex items-center justify-center gap-2 py-4 rounded-2xl font-black text-[10px] uppercase tracking-widest shadow-xl shadow-primary-gold/20">
          <Sparkles className="w-4.5 h-4.5" /> Apply Now
        </button>
      </div>
    </>
  );
};

// Sub-components for cleaner code
const NavLink = ({ to, label, isDark }) => (
  <Link to={to} className={`text-[11px] font-black ${isDark ? 'text-slate-300' : 'text-slate-700'} hover:text-primary-gold transition-all uppercase tracking-widest py-2 relative group`}>
    {label}
    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary-gold transition-all group-hover:w-full" />
  </Link>
);

const NavIconBtn = ({ onClick, icon, label, isDark }) => (
  <button
    onClick={onClick}
    className={`px-3 h-10 rounded-xl ${isDark ? 'bg-white/5 border-white/10 text-slate-300 hover:bg-white/10 shadow-black shadow' : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100 shadow-sm'} border flex items-center justify-center gap-2 hover:text-primary-gold transition-all group`}
  >
    {icon}
    {label && <span className="text-[10px] font-black uppercase tracking-widest">{label}</span>}
  </button>
);

const MobileLink = ({ to, label, icon, isDark }) => (
  <Link to={to} className={`flex items-center justify-between p-5 rounded-3xl ${isDark ? 'bg-white/5 text-white' : 'bg-slate-50 text-slate-900'} group`}>
    <div className="flex items-center gap-4">
      <div className={`w-10 h-10 rounded-xl ${isDark ? 'bg-white/5' : 'bg-white'} flex items-center justify-center text-primary-gold`}>
        {icon}
      </div>
      <span className="text-xs font-black uppercase tracking-widest">{label}</span>
    </div>
    <ChevronDown className="w-5 h-5 -rotate-90 opacity-20" />
  </Link>
);

const renderAuthSection = (user, logout, navigate, isDark, isMobile) => {
  if (user) {
    return (
      <div className={`flex ${isMobile ? 'flex-col gap-3' : 'items-center gap-3'}`}>
        <Link 
          to={user.role === 'admin' ? '/admin/dashboard' : user.role === 'bsm' ? '/bsm/dashboard' : '/agent/dashboard'} 
          className={`${isMobile ? 'w-full py-5' : 'px-6 py-2.5'} rounded-2xl bg-primary-gold text-[#020617] text-xs font-black hover:scale-[1.02] active:scale-[0.98] transition shadow-xl shadow-primary-gold/10 uppercase tracking-widest text-center flex items-center justify-center gap-2`}
        >
          <LayoutDashboard className="w-4 h-4" /> {isMobile ? 'Access Dashboard' : 'Dashboard'}
        </Link>
        <button 
          onClick={() => { logout(); navigate('/agent/login'); }}
          className={`${isMobile ? 'w-full py-5 bg-rose-500/10 text-rose-500' : 'p-2.5 bg-white/5 text-slate-400 hover:bg-rose-500/20 hover:text-rose-400'} rounded-2xl transition-all group flex items-center justify-center gap-2 font-black uppercase tracking-widest text-[10px]`}
        >
          <LogOut className="w-4.5 h-4.5" /> {isMobile && 'Logout Account'}
        </button>
      </div>
    );
  }
  return (
    <Link to="/agent/login" className={`${isMobile ? 'w-full py-5 bg-blue-600 text-white' : 'px-7 py-2.5 border-2 border-primary-gold text-primary-gold'} rounded-2xl text-[11px] font-black hover:bg-primary-gold hover:text-[#020617] active:scale-95 transition-all shadow-xl shadow-primary-gold/10 uppercase tracking-widest text-center`}>
      Partner Network
    </Link>
  );
};

export default Navbar;
