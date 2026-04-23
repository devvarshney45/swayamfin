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
  ArrowRight,
  Zap,
  Shield,
  HeartHandshake
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
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
    setActiveDropdown(null);
  }, [location]);

  const toggleLanguage = () => {
    const newLang = i18n.language === 'en' ? 'hi' : 'en';
    i18n.changeLanguage(newLang);
    
    const attemptTranslate = (attempts = 0) => {
      const select = document.querySelector('.goog-te-combo');
      if (select) {
        select.value = newLang;
        select.dispatchEvent(new Event('change', { bubbles: true }));
      } else if (attempts < 15) {
        setTimeout(() => attemptTranslate(attempts + 1), 200 + (attempts * 100));
      }
    };
    attemptTranslate();
  };

  const services = [
    { name: t('home_loan'), slug: 'housing-loans', icon: Home, desc: 'Your dream home made easy', color: 'blue' },
    { name: t('lap'), slug: 'lap', icon: Building2, desc: 'Unlock property value', color: 'indigo' },
    { name: t('msme_loan'), slug: 'msme-loans', icon: Briefcase, desc: 'Fueling business growth', color: 'emerald' },
    { name: t('micro_lap'), slug: 'micro-lap', icon: MapPin, desc: 'Small loans, big impact', color: 'amber' },
    { name: t('hybrid_msme'), slug: 'hybrid-msme', icon: Globe, desc: 'Mixed lending solutions', color: 'violet' },
    { name: t('supply_chain'), slug: 'supply-chain', icon: Truck, desc: 'Inventory & PO funding', color: 'sky' },
  ];

  const branches = [
    { name: 'Agra', slug: 'agra' },
    { name: 'Mathura', slug: 'mathura' },
    { name: 'Hathras', slug: 'hathras' },
    { name: 'Kosi', slug: 'kosi' },
  ];

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-500 font-dmsans ${
        scrolled 
          ? 'mt-4 mx-4 md:mx-10 rounded-[32px] border border-white/10 shadow-2xl backdrop-blur-2xl py-3' 
          : 'py-5'
      } ${
        isDark 
          ? (scrolled ? 'bg-[#020617]/80' : 'bg-transparent') 
          : (scrolled ? 'bg-white/80 border-slate-200' : 'bg-transparent')
      }`}>
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <div className="flex justify-between items-center">
            
            {/* Logo Section */}
            <div className="flex items-center">
              <Link to="/" className="flex items-center gap-3 group relative">
                <div className="absolute inset-0 bg-primary-gold blur-2xl opacity-20 group-hover:opacity-40 transition-opacity" />
                <div className="bg-primary-gold p-2 md:p-2.5 rounded-xl group-hover:rotate-12 transition-all duration-500 shadow-xl shadow-primary-gold/20 relative">
                  <Zap className="w-6 h-6 md:w-7 md:h-7 text-[#020617]" />
                </div>
                <div className="flex flex-col relative">
                  <span className={`text-xl md:text-2xl font-playfair font-black ${isDark ? 'text-white' : 'text-slate-900'} tracking-tighter leading-none`}>swayamfin<span className="text-primary-gold">.</span></span>
                  <span className="text-[8px] md:text-[9px] font-black text-slate-500 tracking-[0.3em] leading-tight uppercase mt-1 opacity-60">Premier Fintech</span>
                </div>
              </Link>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-1">
              <DesktopNavLink to="/" label={t('nav_home')} isDark={isDark} active={location.pathname === '/'} />
              
              {/* Product Mega Menu */}
              <div 
                className="relative group px-4 py-3"
                onMouseEnter={() => setActiveDropdown('services')}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <button className={`flex items-center gap-2 text-[11px] font-black ${isDark ? 'text-slate-300' : 'text-slate-700'} hover:text-primary-gold transition-all uppercase tracking-widest`}>
                  {t('nav_services')} 
                  <ChevronDown className={`w-3.5 h-3.5 text-primary-gold/50 group-hover:text-primary-gold transition-transform duration-500 ${activeDropdown === 'services' ? 'rotate-180' : ''}`} />
                </button>
                
                <AnimatePresence>
                  {activeDropdown === 'services' && (
                    <motion.div 
                      initial={{ opacity: 0, y: 15, scale: 0.98 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 15, scale: 0.98 }}
                      className={`absolute top-full left-1/2 -translate-x-1/2 w-[700px] mt-2 ${isDark ? 'bg-[#0B0F19]/95 border-white/5 shadow-22xl' : 'bg-white/95 border-slate-200 shadow-2xl'} border rounded-[40px] p-8 grid grid-cols-2 gap-4 backdrop-blur-3xl`}
                    >
                      {services.map((item) => (
                        <Link 
                          key={item.slug}
                          to={`/services/${item.slug}`}
                          className={`flex items-center gap-5 p-4 rounded-3xl transition-all duration-300 group/item ${
                            isDark ? 'hover:bg-white/5' : 'hover:bg-slate-50'
                          }`}
                        >
                          <div className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-all duration-500 group-hover/item:scale-110 group-hover/item:rotate-6 ${
                            isDark ? 'bg-white/5 text-slate-400' : 'bg-slate-100 text-slate-500'
                          }`}>
                            <item.icon className={`w-6 h-6 group-hover/item:text-primary-gold transition-colors`} />
                          </div>
                          <div>
                            <p className={`font-black text-xs ${isDark ? 'text-white' : 'text-slate-900'} uppercase tracking-tight mb-1`}>{item.name}</p>
                            <p className="text-[10px] text-slate-500 font-bold opacity-60 uppercase leading-relaxed">{item.desc}</p>
                          </div>
                        </Link>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Branches Menu */}
              <div 
                className="relative group px-4 py-3"
                onMouseEnter={() => setActiveDropdown('branches')}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <button className={`flex items-center gap-2 text-[11px] font-black ${isDark ? 'text-slate-300' : 'text-slate-700'} hover:text-primary-gold transition-all uppercase tracking-widest`}>
                  Branches 
                  <ChevronDown className={`w-3.5 h-3.5 text-primary-gold/50 group-hover:text-primary-gold transition-transform duration-500 ${activeDropdown === 'branches' ? 'rotate-180' : ''}`} />
                </button>
                
                <AnimatePresence>
                  {activeDropdown === 'branches' && (
                    <motion.div 
                      initial={{ opacity: 0, y: 15, scale: 0.98 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 15, scale: 0.98 }}
                      className={`absolute top-full left-0 w-60 mt-2 ${isDark ? 'bg-[#0B0F19]/95 border-white/5 shadow-22xl' : 'bg-white/95 border-slate-200 shadow-2xl'} border rounded-3xl p-3 backdrop-blur-3xl`}
                    >
                      {branches.map((item) => (
                        <Link 
                          key={item.slug}
                          to={`/branches/${item.slug}`}
                          className={`flex items-center justify-between px-5 py-3.5 text-[10px] font-black uppercase tracking-widest ${isDark ? 'text-slate-300 hover:bg-white/5' : 'text-slate-700 hover:bg-slate-50'} hover:text-primary-gold rounded-xl transition-all group/branch`}
                        >
                          {item.name} 
                          <ArrowRight className="w-3 h-3 opacity-0 -translate-x-2 group-hover/branch:opacity-100 group-hover/branch:translate-x-0 transition-all text-primary-gold" />
                        </Link>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <DesktopNavLink to="/process" label="Process" isDark={isDark} active={location.pathname === '/process'} />
              <DesktopNavLink to="/about" label={t('nav_about')} isDark={isDark} active={location.pathname === '/about'} />
            </div>

            <div className="flex items-center gap-6">
              <div className="hidden xl:flex items-center gap-4">
                {/* Theme Toggle */}
                <button 
                  onClick={toggleTheme}
                  className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${
                    isDark ? 'bg-white/5 text-yellow-400 hover:bg-white/10' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
                </button>

                {/* Language Toggle */}
                <button 
                  onClick={toggleLanguage}
                  className={`px-4 py-2 rounded-full border text-[10px] font-black uppercase tracking-widest transition-all ${
                    isDark ? 'bg-white/5 border-white/10 text-white hover:bg-white/10' : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50 shadow-sm'
                  }`}
                >
                  {i18n.language === 'en' ? 'Hindi' : 'English'}
                </button>
              </div>

              {renderAuthSection(user, logout, navigate, isDark, false)}

              {/* Mobile Menu Trigger */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className={`lg:hidden p-3 rounded-2xl transition-all ${
                  isDark ? 'bg-white/5 text-white' : 'bg-slate-100 text-slate-900 shadow-sm'
                } active:scale-90`}
              >
                {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
            
          </div>
        </div>

        {/* Mobile Menu Drawer */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className={`fixed inset-0 z-[110] lg:hidden ${isDark ? 'bg-[#020617]' : 'bg-white'} p-8 flex flex-col`}
            >
              <div className="flex justify-between items-center mb-12">
                <Link to="/" className="flex items-center gap-2">
                  <div className="bg-primary-gold p-2 rounded-lg">
                    <Zap className="w-5 h-5 text-[#020617]" />
                  </div>
                  <span className={`text-xl font-black ${isDark ? 'text-white' : 'text-slate-900'} tracking-tighter`}>swayamfin<span className="text-primary-gold">.</span></span>
                </Link>
                <button 
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`p-3 rounded-2xl ${isDark ? 'bg-white/5' : 'bg-slate-100'} active:scale-90`}
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-4 flex-1 overflow-y-auto pr-2 custom-scrollbar">
                <p className="text-[10px] font-black text-slate-500 uppercase tracking-[0.3em] ml-2 mb-4">Explore Platform</p>
                <div className="grid grid-cols-1 gap-3">
                  <MobileLink to="/" label={t('nav_home')} icon={<Home />} isDark={isDark} />
                  <MobileLink to="/about" label="Mission" icon={<Shield />} isDark={isDark} />
                  <MobileLink to="/process" label="Calculators" icon={<AreaChart />} isDark={isDark} />
                </div>

                <div className="pt-8">
                  <p className="text-[10px] font-black text-slate-500 uppercase tracking-[0.3em] ml-2 mb-4">Lending Solutions</p>
                  <div className="grid grid-cols-2 gap-3">
                    {services.map(s => (
                      <Link 
                        key={s.slug} 
                        to={`/services/${s.slug}`} 
                        className={`p-5 rounded-[28px] ${isDark ? 'bg-white/5 border-white/5' : 'bg-slate-50 border-slate-100'} border flex flex-col gap-3 active:scale-95 transition-all`}
                      >
                        <s.icon className="w-5 h-5 text-primary-gold" />
                        <span className={`text-[10px] font-black uppercase tracking-tight ${isDark ? 'text-white' : 'text-slate-900'}`}>{s.name}</span>
                      </Link>
                    ))}
                  </div>
                </div>

                <div className="pt-8">
                  <p className="text-[10px] font-black text-slate-500 uppercase tracking-[0.3em] ml-2 mb-4">Regional Hubs</p>
                  <div className="flex flex-wrap gap-2">
                    {branches.map(b => (
                      <Link 
                        key={b.slug} 
                        to={`/branches/${b.slug}`} 
                        className={`px-5 py-3 rounded-2xl ${isDark ? 'bg-white/5 text-white border-white/10' : 'bg-slate-50 text-slate-900 border-slate-200 shadow-sm'} border text-[10px] font-black uppercase tracking-widest active:scale-95 transition-all`}
                      >
                        {b.name}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>

              <div className="pt-8 mt-auto border-t border-white/5 flex flex-col gap-4">
                 <div className="flex gap-3">
                   <button 
                     onClick={toggleTheme}
                     className={`flex-1 py-4 rounded-2xl ${isDark ? 'bg-white/5' : 'bg-slate-100'} flex items-center justify-center gap-3 font-black text-[10px] uppercase tracking-widest`}
                   >
                     {isDark ? <Sun className="w-4 h-4 text-yellow-400" /> : <Moon className="w-4 h-4" />} 
                     Theme
                   </button>
                   <button 
                     onClick={toggleLanguage}
                     className={`flex-1 py-4 rounded-2xl ${isDark ? 'bg-white/5' : 'bg-slate-100'} flex items-center justify-center gap-3 font-black text-[10px] uppercase tracking-widest`}
                   >
                     <Globe className="w-4 h-4 text-primary-gold" /> 
                     {i18n.language === 'en' ? 'Hindi' : 'English'}
                   </button>
                 </div>
                 {renderAuthSection(user, logout, navigate, isDark, true)}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Mobile Sticky Action Bar */}
      <div className={`lg:hidden fixed bottom-6 left-6 right-6 ${isDark ? 'bg-[#0B0F19]/90' : 'bg-white/90'} backdrop-blur-2xl border ${isDark ? 'border-white/10 shadow-black' : 'border-slate-200 shadow-xl shadow-slate-200/50'} p-2 z-[150] flex gap-2 rounded-[32px] transition-all duration-300`}>
        <a href="https://wa.me/916397003690" className="flex-1 bg-success-green text-white flex items-center justify-center gap-2 py-4 rounded-[24px] font-black text-[10px] uppercase tracking-[0.2em] shadow-lg shadow-green-500/10 active:scale-95 transition-all">
          <MessageCircle className="w-5 h-5 fill-current" /> WhatsApp
        </a>
        <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="flex-1 bg-primary-gold text-[#020617] flex items-center justify-center gap-2 py-4 rounded-[24px] font-black text-[10px] uppercase tracking-[0.2em] shadow-lg shadow-primary-gold/20 active:scale-95 transition-all">
          <Sparkles className="w-5 h-5" /> Apply Now
        </button>
      </div>
    </>
  );
};

const DesktopNavLink = ({ to, label, isDark, active }) => (
  <Link 
    to={to} 
    className={`px-5 py-3 text-[11px] font-black uppercase tracking-[0.2em] transition-all relative group h-full flex items-center ${
      active 
        ? (isDark ? 'text-primary-gold' : 'text-blue-600') 
        : (isDark ? 'text-slate-300 hover:text-white' : 'text-slate-700 hover:text-slate-900')
    }`}
  >
    {label}
    <motion.div 
      initial={false}
      animate={{ width: active ? '100%' : '0%' }}
      className="absolute bottom-0 left-1/2 -translate-x-1/2 h-0.5 bg-primary-gold transition-all duration-500"
    />
    <div className="absolute inset-0 bg-primary-gold/5 rounded-2xl scale-75 opacity-0 group-hover:scale-100 group-hover:opacity-100 transition-all duration-500" />
  </Link>
);

const MobileLink = ({ to, label, icon, isDark }) => (
  <Link to={to} className={`flex items-center justify-between p-5 rounded-[28px] ${isDark ? 'bg-white/5 text-white border-white/5' : 'bg-slate-50 text-slate-900 border-slate-100'} border group active:scale-95 transition-all`}>
    <div className="flex items-center gap-4">
      <div className={`w-12 h-12 rounded-2xl ${isDark ? 'bg-white/5' : 'bg-white shadow-sm'} flex items-center justify-center text-primary-gold group-hover:scale-110 transition-transform`}>
        {React.cloneElement(icon, { className: "w-6 h-6" })}
      </div>
      <span className="text-xs font-black uppercase tracking-widest leading-none">{label}</span>
    </div>
    <ArrowRight className="w-4 h-4 opacity-20 group-hover:opacity-100 transition-all group-hover:translate-x-1" />
  </Link>
);

const renderAuthSection = (user, logout, navigate, isDark, isMobile) => {
  if (user) {
    return (
      <div className={`flex ${isMobile ? 'flex-col gap-3' : 'items-center gap-3'}`}>
        <Link 
          to={user.role === 'admin' ? '/admin/dashboard' : user.role === 'bsm' ? '/bsm/dashboard' : '/agent/dashboard'} 
          className={`${isMobile ? 'w-full py-5' : 'px-8 py-3'} rounded-2xl md:rounded-[24px] bg-[#020617] text-white text-[10px] font-black hover:bg-[#1e293b] active:scale-95 transition-all shadow-xl uppercase tracking-[0.2em] text-center flex items-center justify-center gap-3 border border-white/10`}
        >
          <LayoutDashboard className="w-4 h-4 text-primary-gold" /> {isMobile ? 'ACCESS DASHBOARD' : 'DASHBOARD'}
        </Link>
        <button 
          onClick={() => { logout(); navigate('/agent/login'); }}
          className={`${isMobile ? 'w-full py-5 bg-rose-500/10 text-rose-500' : 'w-10 h-10 bg-white/5 text-slate-400 hover:text-rose-400'} rounded-2xl flex items-center justify-center gap-2 font-black uppercase tracking-widest text-[10px] transition-all active:scale-90 border border-transparent hover:border-rose-500/20`}
        >
          <LogOut className="w-5 h-5" /> {isMobile && 'SIGN OUT'}
        </button>
      </div>
    );
  }
  return (
    <Link to="/agent/login" className={`${isMobile ? 'w-full py-5 bg-[#020617] text-white' : 'px-8 py-3 bg-[#020617] text-white'} rounded-2xl md:rounded-[24px] text-[10px] font-black hover:bg-slate-800 active:scale-95 transition-all shadow-xl uppercase tracking-[0.2em] text-center border border-white/10`}>
      PARTNER PORTAL
    </Link>
  );
};

export default Navbar;
