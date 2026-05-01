import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { motion, AnimatePresence } from 'framer-motion';
import LeadCaptureModal from './LeadCaptureModal';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const { t, i18n } = useTranslation();
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

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
    
    if (newLang === 'hi') {
      document.body.classList.add('lang-hindi');
    } else {
      document.body.classList.remove('lang-hindi');
    }
    
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

  useEffect(() => {
    if (i18n.language === 'hi') {
      document.body.classList.add('lang-hindi');
    } else {
      document.body.classList.remove('lang-hindi');
    }
  }, [i18n.language]);

  const services = [
    { name: t('home_loan'), slug: 'housing-loans', desc: 'Home & Construction Financing' },
    { name: t('lap'), slug: 'lap', desc: 'Loan Against Property' },
    { name: t('msme_loan'), slug: 'msme-loans', desc: 'Business Growth Capital' },
    { name: t('supply_chain'), slug: 'supply-chain', desc: 'Invoice Discounting' },
  ];

  const branches = [
    { name: 'Agra', slug: 'agra' },
    { name: 'Mathura', slug: 'mathura' },
    { name: 'Hathras', slug: 'hathras' },
    { name: 'Kosi', slug: 'kosi' },
  ];

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-500 ${
        scrolled 
          ? 'bg-white shadow-lg py-3' 
          : 'bg-white/80 backdrop-blur-md py-5'
      }`}>
        <div className="max-w-7xl mx-auto px-4 md:px-8 flex justify-between items-center">
          
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-10 h-10 bg-[#0EA5E9] rounded-lg flex items-center justify-center group-hover:rotate-12 transition-all">
              <span className="text-white font-black text-xl">S</span>
            </div>
            <div className="flex flex-col leading-none">
              <span className="text-2xl font-black text-[#1E293B] tracking-tighter">swayamfin<span className="text-[#0EA5E9]">.</span></span>
              <span className="text-[8px] font-bold text-slate-400 uppercase tracking-widest">Premium Fintech</span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-8">
            <Link to="/" className={`text-xs font-bold uppercase tracking-widest hover:text-[#0EA5E9] ${location.pathname === '/' ? 'text-[#0EA5E9]' : 'text-slate-600'}`}>Home</Link>
            
            <div 
              className="relative py-2 group"
              onMouseEnter={() => setActiveDropdown('services')}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <button className="text-xs font-bold uppercase tracking-widest text-slate-600 hover:text-[#0EA5E9] flex items-center gap-1">
                Services <span className="text-[8px]">▼</span>
              </button>
              <AnimatePresence>
                {activeDropdown === 'services' && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 10 }}
                    className="absolute top-full left-0 w-64 bg-white shadow-2xl rounded-xl border border-slate-100 p-4"
                  >
                    {services.map(s => (
                      <Link key={s.slug} to={`/services/${s.slug}`} className="block p-3 hover:bg-slate-50 rounded-lg group text-left">
                        <p className="text-[10px] font-black uppercase text-slate-900 group-hover:text-[#0EA5E9]">{s.name}</p>
                        <p className="text-[9px] text-slate-400 font-medium">{s.desc}</p>
                      </Link>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <div 
              className="relative py-2 group"
              onMouseEnter={() => setActiveDropdown('branches')}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <button className="text-xs font-bold uppercase tracking-widest text-slate-600 hover:text-[#0EA5E9] flex items-center gap-1">
                Branches <span className="text-[8px]">▼</span>
              </button>
              <AnimatePresence>
                {activeDropdown === 'branches' && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 10 }}
                    className="absolute top-full left-0 w-48 bg-white shadow-2xl rounded-xl border border-slate-100 p-4"
                  >
                    {branches.map(b => (
                      <Link key={b.slug} to={`/branches/${b.slug}`} className="block p-3 hover:bg-slate-50 rounded-lg group text-left">
                        <p className="text-[10px] font-black uppercase text-slate-900 group-hover:text-[#0EA5E9]">{b.name} Hub</p>
                      </Link>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <Link to="/process" className={`text-xs font-bold uppercase tracking-widest hover:text-[#0EA5E9] ${location.pathname === '/process' ? 'text-[#0EA5E9]' : 'text-slate-600'}`}>Process</Link>
            <Link to="/about" className={`text-xs font-bold uppercase tracking-widest hover:text-[#0EA5E9] ${location.pathname === '/about' ? 'text-[#0EA5E9]' : 'text-slate-600'}`}>About</Link>
          </div>

          <div className="flex items-center gap-4">
            <button 
              onClick={toggleLanguage}
              className="hidden md:flex w-10 h-10 items-center justify-center border border-slate-200 rounded-lg text-[10px] font-black hover:bg-slate-50 transition-colors"
            >
              {i18n.language === 'en' ? 'EN' : 'HI'}
            </button>

            <a 
              href="https://wa.me/918700965592" 
              target="_blank" 
              rel="noreferrer"
              className="hidden md:flex w-10 h-10 items-center justify-center border border-slate-200 text-green-500 rounded-lg hover:bg-green-50 hover:border-green-200 transition-colors"
              title="Chat on WhatsApp"
            >
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 00-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
              </svg>
            </a>

            {user ? (
               <Link to={user.role === 'admin' ? '/admin/dashboard' : '/agent/dashboard'} className="btn-primary py-2 px-6 text-[10px]">Dashboard</Link>
            ) : (
              <Link to="/agent/login" className="text-xs font-bold text-slate-600 uppercase tracking-widest hover:text-[#0EA5E9]">Login</Link>
            )}

            <button 
              onClick={() => setIsModalOpen(true)}
              className="hidden lg:block btn-primary py-2 px-6 text-[10px]"
            >
              Start Application
            </button>

            {/* Mobile Toggle */}
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden w-10 h-10 border border-slate-200 rounded-lg flex flex-col items-center justify-center gap-1"
            >
              <div className={`w-5 h-0.5 bg-slate-900 transition-all ${isMobileMenuOpen ? 'rotate-45 translate-y-1.5' : ''}`} />
              <div className={`w-5 h-0.5 bg-slate-900 transition-all ${isMobileMenuOpen ? 'opacity-0' : ''}`} />
              <div className={`w-5 h-0.5 bg-slate-900 transition-all ${isMobileMenuOpen ? '-rotate-45 -translate-y-1.5' : ''}`} />
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div 
              initial={{ height: 0 }} animate={{ height: 'auto' }} exit={{ height: 0 }}
              className="lg:hidden bg-white border-t border-slate-100 overflow-hidden"
            >
              <div className="p-4 space-y-4">
                 <Link to="/" className="block text-xs font-bold uppercase tracking-widest text-slate-600 p-2">Home</Link>
                 <div className="p-2">
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 px-2">Services</p>
                    {services.map(s => (
                      <Link key={s.slug} to={`/services/${s.slug}`} className="block text-xs font-bold uppercase text-slate-600 p-2 ml-2">{s.name}</Link>
                    ))}
                 </div>
                 <div className="p-2">
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 px-2">Branches</p>
                    {branches.map(b => (
                      <Link key={b.slug} to={`/branches/${b.slug}`} className="block text-xs font-bold uppercase text-slate-600 p-2 ml-2">{b.name}</Link>
                    ))}
                 </div>
                 <Link to="/process" className="block text-xs font-bold uppercase tracking-widest text-slate-600 p-2">Process</Link>
                 <Link to="/about" className="block text-xs font-bold uppercase tracking-widest text-slate-600 p-2">About</Link>
                 <div className="p-2 border-t border-slate-50 mt-2 pt-4">
                   <a 
                     href="https://wa.me/918700965592" 
                     target="_blank" 
                     rel="noreferrer"
                     className="flex items-center gap-3 text-xs font-bold uppercase tracking-widest text-[#0EA5E9] p-2 hover:bg-slate-50 rounded-lg"
                   >
                     <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                       <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 00-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                     </svg>
                     WhatsApp Support
                   </a>
                 </div>
                 <button 
                  onClick={() => setIsModalOpen(true)}
                  className="w-full btn-primary text-[10px]"
                 >
                   Start Application
                 </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Global Command Bar (Desktop Sticky) */}
      <div className={`fixed bottom-8 left-1/2 -translate-x-1/2 z-[100] transition-all duration-500 ${scrolled ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'}`}>
         <div className="bg-[#1E293B] px-8 py-3 rounded-full flex items-center gap-6 shadow-2xl">
            <div className="flex items-center gap-2 pr-6 border-r border-slate-700">
               <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
               <span className="text-white text-[9px] font-black uppercase tracking-widest">Active Node</span>
            </div>
            <button 
              onClick={() => setIsModalOpen(true)}
              className="bg-[#0EA5E9] text-white px-6 py-2 rounded-full text-[10px] font-black uppercase tracking-widest hover:bg-[#0369A1] transition-all"
            >
              Apply Now
            </button>
         </div>
      </div>

      <LeadCaptureModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
};

export default Navbar;
