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
  HeartHandshake,
  Activity,
  Cpu
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
    { name: t('home_loan'), slug: 'housing-loans', icon: Home, desc: 'Architectural Project Funding', color: 'blue' },
    { name: t('lap'), slug: 'lap', icon: Building2, desc: 'Asset Liquidity Protocol', color: 'indigo' },
    { name: t('msme_loan'), slug: 'msme-loans', icon: Briefcase, desc: 'Enterprise Scaling Capital', color: 'emerald' },
    { name: t('micro_lap'), slug: 'micro-lap', icon: MapPin, desc: 'Regional Micro-Asset Backing', color: 'amber' },
    { name: t('hybrid_msme'), slug: 'hybrid-msme', icon: Globe, desc: 'Universal Multi-Lending', color: 'violet' },
    { name: t('supply_chain'), slug: 'supply-chain', icon: Truck, desc: 'Velocity & Inventory Flow', color: 'sky' },
  ];

  const branches = [
    { name: 'Agra Hub', slug: 'agra', code: 'NOD-01' },
    { name: 'Mathura Hub', slug: 'mathura', code: 'NOD-02' },
    { name: 'Hathras Hub', slug: 'hathras', code: 'NOD-03' },
    { name: 'Kosi Hub', slug: 'kosi', code: 'NOD-04' },
  ];

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-700 font-dmsans ${
        scrolled 
          ? 'mt-3 mx-3 md:mx-8 rounded-2xl md:rounded-3xl border border-white/5 shadow-xl shadow-black/20 backdrop-blur-xl py-2.5' 
          : 'py-4 md:py-6'
      } ${
        isDark 
          ? (scrolled ? 'bg-[#020617]/90' : 'bg-transparent') 
          : (scrolled ? 'bg-white/90 border-slate-200' : 'bg-transparent')
      }`}>
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="flex justify-between items-center">
            
            {/* Playfair Brand Identity */}
            <div className="flex items-center">
              <Link to="/" className="flex items-center gap-4 group relative">
                <div className="absolute inset-0 bg-blue-600 blur-3xl opacity-10 group-hover:opacity-30 transition-opacity" />
                <div className={`w-12 h-12 md:w-14 md:h-14 ${isDark ? 'bg-white/5 border-white/10' : 'bg-[#020617]'} rounded-[18px] md:rounded-[22px] flex items-center justify-center group-hover:rotate-[15deg] transition-all duration-700 shadow-2xl relative border`}>
                  <Zap className="w-6 h-6 md:w-7 md:h-7 text-primary-gold" />
                </div>
                <div className="flex flex-col relative leading-none">
                  <span className={`text-xl md:text-3xl font-playfair font-black ${isDark ? 'text-white' : 'text-[#020617]'} tracking-tighter`}>swayamfin<span className="text-blue-600">.</span></span>
                  <span className="text-[7px] md:text-[8px] font-black text-slate-500 tracking-[0.5em] uppercase mt-1.5 opacity-60">Institutional Grade</span>
                </div>
              </Link>
            </div>

            {/* Desktop Navigation Protocol */}
            <div className="hidden lg:flex items-center gap-1 xl:gap-4">
              <DesktopNavLink to="/" label={t('nav_home')} isDark={isDark} active={location.pathname === '/'} />
              
              {/* Product Architecture Dropdown */}
              <div 
                className="relative group px-1 xl:px-4 py-3"
                onMouseEnter={() => setActiveDropdown('services')}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <button className={`flex items-center gap-2.5 text-[10px] font-black ${isDark ? 'text-slate-400' : 'text-slate-600'} hover:text-blue-600 transition-all uppercase tracking-[0.3em]`}>
                  {t('nav_services')} 
                  <ChevronDown className={`w-3.5 h-3.5 text-blue-600/40 group-hover:text-blue-600 transition-transform duration-700 ${activeDropdown === 'services' ? 'rotate-180' : ''}`} />
                </button>
                
                <AnimatePresence>
                  {activeDropdown === 'services' && (
                    <motion.div 
                      initial={{ opacity: 0, y: 15, scale: 0.98 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 15, scale: 0.98 }}
                      className={`absolute top-[120%] left-1/2 -translate-x-1/2 w-[340px] sm:w-[480px] lg:w-[560px] mt-2 ${isDark ? 'bg-[#0F172A]/95 border-white/5 shadow-22xl shadow-black/80' : 'bg-white/95 border-slate-200 shadow-22xl shadow-slate-200/50'} border rounded-3xl md:rounded-[40px] p-6 lg:p-8 grid grid-cols-1 md:grid-cols-2 gap-3 lg:gap-4 backdrop-blur-3xl z-[110]`}
                    >
                       <div className="col-span-1 md:col-span-2 flex items-center gap-4 mb-2 md:mb-4 border-b border-white/5 pb-4 md:pb-6">
                          <Cpu className="w-5 h-5 text-blue-600" />
                          <span className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-500">Asset Management Protocols</span>
                       </div>
                      {services.map((item) => (
                        <Link 
                          key={item.slug}
                          to={`/services/${item.slug}`}
                          className={`flex items-center gap-4 lg:gap-6 p-4 lg:p-5 rounded-2xl lg:rounded-[32px] transition-all duration-500 group/item ${
                            isDark ? 'hover:bg-white/5' : 'hover:bg-slate-50 shadow-sm'
                          }`}
                        >
                          <div className={`w-16 h-16 rounded-[22px] flex items-center justify-center transition-all duration-500 group-hover/item:scale-110 group-hover/item:rotate-12 ${
                            isDark ? 'bg-white/5 text-slate-400' : 'bg-slate-100 text-slate-500'
                          } border border-white/5`}>
                            <item.icon className={`w-7 h-7 group-hover/item:text-blue-600 transition-colors`} />
                          </div>
                          <div className="space-y-1">
                            <p className={`font-black text-[11px] ${isDark ? 'text-white' : 'text-[#020617]'} uppercase tracking-widest`}>{item.name}</p>
                            <p className="text-[9px] text-slate-500 font-bold opacity-60 uppercase tracking-wider italic leading-relaxed">{item.desc}</p>
                          </div>
                        </Link>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Regional Node Dropdown */}
              <div 
                className="relative group px-4 py-3"
                onMouseEnter={() => setActiveDropdown('branches')}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <button className={`flex items-center gap-2.5 text-[10px] font-black ${isDark ? 'text-slate-400' : 'text-slate-600'} hover:text-blue-600 transition-all uppercase tracking-[0.3em]`}>
                  Branches 
                  <ChevronDown className={`w-3.5 h-3.5 text-blue-600/40 group-hover:text-blue-600 transition-transform duration-700 ${activeDropdown === 'branches' ? 'rotate-180' : ''}`} />
                </button>
                
                <AnimatePresence>
                  {activeDropdown === 'branches' && (
                    <motion.div 
                      initial={{ opacity: 0, y: 15, scale: 0.98 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 15, scale: 0.98 }}
                      className={`absolute top-[120%] left-0 w-64 md:w-72 mt-2 ${isDark ? 'bg-[#0F172A]/95 border-white/5 shadow-22xl shadow-black/80' : 'bg-white/95 border-slate-200 shadow-22xl shadow-slate-200/50'} border rounded-3xl md:rounded-[32px] p-4 md:p-5 backdrop-blur-3xl z-[110]`}
                    >
                      <div className="mb-4 px-5 pt-2 flex items-center gap-3">
                         <MapPin className="w-4 h-4 text-blue-600" />
                         <span className="text-[9px] font-black uppercase tracking-widest text-slate-500">Distribution Hubs</span>
                      </div>
                      {branches.map((item) => (
                        <Link 
                          key={item.slug}
                          to={`/branches/${item.slug}`}
                          className={`flex items-center justify-between px-4 lg:px-5 py-3 lg:py-4 rounded-2xl lg:rounded-[24px] group/branch transition-all duration-500 ${isDark ? 'hover:bg-white/5' : 'hover:bg-slate-50 shadow-sm'}`}
                        >
                           <div className="flex flex-col">
                              <span className={`text-[10px] font-black uppercase tracking-widest ${isDark ? 'text-white' : 'text-[#020617]'} group-hover/branch:text-blue-600 transition-colors`}>{item.name.split(' ')[0]} Hub</span>
                              <span className="text-[8px] text-slate-500 font-bold opacity-60 uppercase tracking-tighter">{item.code}</span>
                           </div>
                          <ArrowRight className="w-4 h-4 opacity-0 -translate-x-3 group-hover/branch:opacity-100 group-hover/branch:translate-x-0 transition-all text-blue-600" />
                        </Link>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <DesktopNavLink to="/process" label="Process" isDark={isDark} active={location.pathname === '/process'} />
              <DesktopNavLink to="/about" label="About" isDark={isDark} active={location.pathname === '/about'} />
            </div>

            <div className="flex items-center gap-3 xl:gap-8">
              <div className="hidden lg:flex items-center gap-3 xl:gap-5">
                {/* Language Interface Toggle */}
                <button 
                  onClick={toggleLanguage}
                  className={`hidden md:flex w-12 h-12 rounded-2xl items-center justify-center transition-all duration-500 border ${
                    isDark ? 'bg-white/5 text-blue-400 border-white/10 hover:bg-white/10' : 'bg-slate-100 text-blue-600 border-slate-200 hover:bg-slate-200'
                  }`}
                  title={i18n.language === 'en' ? 'Switch to Hindi' : 'Switch to English'}
                >
                  <Globe className="w-5 h-5" />
                  <span className="sr-only">{i18n.language === 'en' ? 'Hindi' : 'English'}</span>
                </button>

                {/* Theme Interface */}
                <button 
                  onClick={toggleTheme}
                  className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all duration-500 border ${
                    isDark ? 'bg-white/5 text-yellow-400 border-white/10 hover:bg-white/10' : 'bg-slate-100 text-slate-600 border-slate-200 hover:bg-slate-200'
                  }`}
                >
                  {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
                </button>

                {/* Rapid Comms Sync (WhatsApp) */}
                <a 
                  href="https://wa.me/918700965592" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className={`hidden xl:flex px-6 py-3 rounded-2xl border text-[10px] font-black uppercase tracking-[0.3em] transition-all duration-500 items-center gap-2 ${
                    isDark ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400 hover:bg-emerald-500/20' : 'bg-emerald-50 border-emerald-200 text-emerald-600 hover:bg-emerald-100'
                  }`}
                >
                  <MessageCircle className="w-4 h-4" />
                  WhatsApp
                </a>
              </div>

              {renderAuthSection(user, logout, navigate, isDark, false)}

              {/* Mobile Uplink Command */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className={`lg:hidden w-12 h-12 rounded-[18px] transition-all flex items-center justify-center ${
                  isDark ? 'bg-white/5 text-white border border-white/10' : 'bg-[#020617] text-white shadow-xl shadow-black/20'
                } active:scale-90`}
              >
                {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
            
          </div>
        </div>

        {/* Mobile Terminal Drawer */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className={`fixed inset-0 z-[110] lg:hidden ${isDark ? 'bg-[#020617]' : 'bg-white'} p-6 sm:p-8 flex flex-col overflow-y-auto`}
            >
              <div className="flex justify-between items-center mb-8">
                <Link to="/" className="flex items-center gap-3">
                  <div className="bg-primary-gold p-2.5 rounded-xl">
                    <Zap className="w-6 h-6 text-[#020617]" />
                  </div>
                  <span className={`text-2xl font-playfair font-black ${isDark ? 'text-white' : 'text-[#020617]'} tracking-tighter`}>swayamfin<span className="text-blue-600">.</span></span>
                </Link>
                <button 
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`w-12 h-12 rounded-[18px] ${isDark ? 'bg-white/5' : 'bg-slate-100'} flex items-center justify-center active:scale-90`}
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="space-y-5 flex-1">
                <p className="text-[10px] font-black text-slate-500 uppercase tracking-[0.5em] ml-2 mb-6">Operations Hub</p>
                <div className="grid grid-cols-1 gap-4">
                  <MobileLink to="/" label={t('nav_home')} icon={<Home />} isDark={isDark} />
                  <MobileLink to="/about" label="About" icon={<Shield />} isDark={isDark} />
                  <MobileLink to="/process" label="Process" icon={<AreaChart />} isDark={isDark} />
                </div>

                <div className="pt-6">
                  <p className="text-[10px] font-black text-slate-500 uppercase tracking-[0.5em] ml-2 mb-6">Credit Solutions</p>
                  <div className="grid grid-cols-2 gap-4">
                    {services.map(s => (
                      <Link 
                        key={s.slug} 
                        to={`/services/${s.slug}`} 
                        className={`p-4 rounded-2xl ${isDark ? 'bg-white/5 border-white/10' : 'bg-slate-50 border-slate-100 shadow-sm'} border flex flex-col gap-3 active:scale-95 transition-all`}
                      >
                        <s.icon className="w-6 h-6 text-blue-600" />
                        <span className={`text-[10px] font-black uppercase tracking-widest ${isDark ? 'text-white' : 'text-[#020617]'} leading-tight`}>{s.name}</span>
                      </Link>
                    ))}
                  </div>
                </div>

                <div className="pt-6">
                  <p className="text-[10px] font-black text-slate-500 uppercase tracking-[0.5em] ml-2 mb-6">Regional Command</p>
                  <div className="flex flex-wrap gap-3">
                    {branches.map(b => (
                      <Link 
                        key={b.slug} 
                        to={`/branches/${b.slug}`} 
                        className={`px-6 py-4 rounded-[22px] ${isDark ? 'bg-white/5 text-white border-white/10' : 'bg-white text-[#020617] border-slate-200 shadow-sm'} border text-[10px] font-black uppercase tracking-widest active:scale-95 transition-all`}
                      >
                        {b.name}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>

              <div className="pt-6 mt-6 border-t border-white/5 flex flex-col gap-4">
                 <div className="flex gap-4">
                    <button 
                      onClick={toggleTheme}
                      className={`flex-1 py-3.5 rounded-2xl ${isDark ? 'bg-white/5 border-white/10' : 'bg-slate-100 border-slate-200'} border flex items-center justify-center gap-3 font-black text-[10px] uppercase tracking-widest`}
                    >
                      {isDark ? <Sun className="w-5 h-5 text-yellow-500" /> : <Moon className="w-5 h-5" />} 
                      Interface
                    </button>
                    <button 
                      onClick={toggleLanguage}
                      className={`flex-1 py-3.5 rounded-2xl ${isDark ? 'bg-white/5 border-white/10' : 'bg-slate-100 border-slate-200'} border flex items-center justify-center gap-3 font-black text-[10px] uppercase tracking-widest`}
                    >
                      <Globe className="w-5 h-5 text-blue-600" /> 
                      {i18n.language === 'en' ? 'HI' : 'EN'}
                    </button>
                 </div>
                 {renderAuthSection(user, logout, navigate, isDark, true)}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Global Session Bar (Sticky) */}
      <div className={`hidden lg:flex fixed bottom-10 left-1/2 -translate-x-1/2 z-[100] transition-all duration-700 ${scrolled ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'}`}>
         <div className={`${isDark ? 'bg-[#0B1221]/90' : 'bg-[#020617]/95'} px-10 py-5 rounded-[40px] border border-white/5 shadow-22xl shadow-black/80 flex items-center gap-12 backdrop-blur-3xl`}>
            <div className="flex items-center gap-5 border-r border-white/10 pr-12 group cursor-pointer">
               <div className="w-10 h-10 bg-success-green/20 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                  <div className="w-2.5 h-2.5 bg-success-green rounded-full animate-pulse" />
               </div>
               <span className="text-white text-[10px] font-black uppercase tracking-[0.4em]">Satellite Node Active</span>
            </div>
            <div className="flex items-center gap-12">
               <a href="https://wa.me/916397003690" className="flex items-center gap-4 text-white hover:text-primary-gold transition-colors group">
                  <MessageCircle className="w-6 h-6 text-success-green group-hover:rotate-12 transition-transform" />
                  <span className="text-[10px] font-black uppercase tracking-widest italic">Rapid Comms</span>
               </a>
               <Link to="/contact" className="bg-primary-gold text-[#020617] px-10 py-3.5 rounded-[22px] font-black uppercase tracking-[0.3em] text-[10px] shadow-22xl shadow-primary-gold/20 flex items-center gap-3 hover:scale-105 active:scale-95 transition-all">
                  Initialize Access <Sparkles className="w-4 h-4 text-blue-600" />
               </Link>
            </div>
         </div>
      </div>

      {/* Mobile Sticky Command Bar */}
      <div className={`lg:hidden fixed bottom-4 left-4 right-4 ${isDark ? 'bg-[#0B1221]/90' : 'bg-white/90'} backdrop-blur-2xl border ${isDark ? 'border-white/10 shadow-black' : 'border-slate-200 shadow-xl shadow-slate-200/50'} p-1.5 z-[150] flex gap-2 rounded-2xl transition-all duration-500`}>
        <a href="https://wa.me/916397003690" className="flex-1 bg-success-green text-white flex items-center justify-center gap-2 py-4 rounded-xl font-black text-[10px] uppercase tracking-wider shadow-lg shadow-green-500/20 active:scale-95 transition-all group">
          <MessageCircle className="w-5 h-5 fill-current" /> WhatsApp
        </a>
        <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="flex-1 bg-[#020617] text-white flex items-center justify-center gap-2 py-4 rounded-xl font-black text-[10px] uppercase tracking-wider shadow-lg shadow-black/20 active:scale-95 transition-all group">
          <Sparkles className="w-5 h-5 text-primary-gold" /> Apply Now
        </button>
      </div>
    </>
  );
};

const DesktopNavLink = ({ to, label, isDark, active }) => (
  <Link 
    to={to} 
    className={`px-3 xl:px-6 py-4 text-[10px] font-black uppercase tracking-[0.3em] transition-all relative group h-full flex items-center ${
      active 
        ? (isDark ? 'text-blue-500' : 'text-blue-600') 
        : (isDark ? 'text-slate-400 hover:text-white' : 'text-slate-600 hover:text-[#020617]')
    }`}
  >
    {label}
    <motion.div 
      initial={false}
      animate={{ width: active ? '40%' : '0%' }}
      className={`absolute bottom-2 left-1/2 -translate-x-1/2 h-1 ${isDark ? 'bg-blue-600' : 'bg-blue-600'} rounded-full transition-all duration-700`}
    />
    <div className="absolute inset-0 bg-blue-600/5 rounded-3xl scale-75 opacity-0 group-hover:scale-100 group-hover:opacity-100 transition-all duration-700" />
  </Link>
);

const MobileLink = ({ to, label, icon, isDark }) => (
  <Link to={to} className={`flex items-center justify-between p-7 rounded-[36px] ${isDark ? 'bg-white/2 text-white border-white/5' : 'bg-slate-50 text-[#020617] border-slate-100 shadow-sm'} border group active:scale-95 transition-all`}>
    <div className="flex items-center gap-5">
      <div className={`w-14 h-14 rounded-[22px] ${isDark ? 'bg-white/5' : 'bg-white shadow-inner'} flex items-center justify-center text-blue-600 group-hover:scale-110 transition-transform border border-current/5`}>
        {React.cloneElement(icon, { className: "w-7 h-7" })}
      </div>
      <span className="text-xs font-black uppercase tracking-widest leading-none">{label}</span>
    </div>
    <ArrowRight className="w-5 h-5 opacity-20 group-hover:opacity-100 transition-all group-hover:translate-x-1 text-blue-600" />
  </Link>
);

const renderAuthSection = (user, logout, navigate, isDark, isMobile) => {
  if (user) {
    return (
      <div className={`flex ${isMobile ? 'flex-col gap-4' : 'items-center gap-4'}`}>
        <Link 
          to={user.role === 'admin' ? '/admin/dashboard' : user.role === 'bsm' ? '/bsm/dashboard' : '/agent/dashboard'} 
          className={`${isMobile ? 'w-full py-6 rounded-[28px]' : 'px-10 py-3.5 rounded-[22px]'} bg-[#020617] text-white text-[10px] font-black hover:bg-blue-600 active:scale-95 transition-all shadow-22xl shadow-black/40 uppercase tracking-[0.3em] text-center flex items-center justify-center gap-4 border border-white/5`}
        >
          <Activity className="w-5 h-5 text-primary-gold" /> {isMobile ? 'ACCESS COMMAND CENTER' : 'DP-DASHBOARD'}
        </Link>
        <button 
          onClick={() => { logout(); navigate('/agent/login'); }}
          className={`${isMobile ? 'w-full py-6 rounded-[28px] bg-rose-500/10 text-rose-500' : 'w-12 h-12 bg-white/5 text-slate-500 hover:text-rose-500'} rounded-2xl flex items-center justify-center gap-3 font-black uppercase tracking-widest text-[9px] transition-all active:scale-90 border border-transparent hover:border-rose-500/20`}
        >
          <LogOut className="w-6 h-6" /> {isMobile && 'TERMINATE SESSION'}
        </button>
      </div>
    );
  }
  return (
    <Link to="/agent/login" className={`${isMobile ? 'w-full py-6 rounded-[28px] bg-[#020617] text-white' : 'px-10 py-3.5 bg-[#020617] text-white rounded-[22px] shadow-22xl shadow-black/20'} text-[10px] font-black hover:bg-blue-600 active:scale-95 transition-all uppercase tracking-[0.4em] text-center border border-white/5`}>
      LOGIN
    </Link>
  );
};

export default Navbar;
