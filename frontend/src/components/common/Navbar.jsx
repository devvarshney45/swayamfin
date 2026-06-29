import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { Phone, Mail, MapPin, MessageSquare, Menu, X, ArrowRight, ExternalLink } from 'lucide-react';
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

  const services = [
    { name: t('hl_title'), slug: 'housing-loans', desc: 'Home & Construction Financing' },
    { name: t('lap_title'), slug: 'lap', desc: 'Loan Against Property' },
    { name: t('ubl_title'), slug: 'unsecured-business-loan', desc: 'Working Capital' },
    { name: t('scf_title'), slug: 'supply-chain', desc: 'Vendor Payments' },
    { name: t('uef_title'), slug: 'unsecured-export-finance', desc: 'Global Trade' },
    { name: t('mf_title'), slug: 'machinery-loan', desc: 'Equipment Financing' },
  ];

  const branches = [
    { name: 'Agra', slug: 'agra' },
    { name: 'Mathura', slug: 'mathura' },
    { name: 'Hathras', slug: 'hathras' },
    { name: 'Kosi', slug: 'kosi' },
  ];
  const brandLogo = '/team/logo.jpeg';

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-500 ${
        scrolled 
          ? 'bg-white shadow-lg py-3' 
          : 'bg-white/80 backdrop-blur-md py-5'
      }`}>
        <div className="max-w-7xl mx-auto px-4 md:px-8 flex justify-between items-center">
          
          <Link to="/" className="flex items-center group shrink-0">
            <div className="h-12 sm:h-14 md:h-16 w-auto max-w-[180px] sm:max-w-[230px] md:max-w-[280px] lg:max-w-[320px] rounded-lg overflow-hidden border border-slate-100 shadow-sm bg-white px-2 sm:px-3 py-1.5 sm:py-2 transition-all group-hover:shadow-md">
              <img
                src={brandLogo}
                alt="Swayamfin official logo"
                className="w-full h-full object-contain"
              />
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
                        <p className="text-[10px] font-black uppercase text-slate-900 group-hover:text-[#0EA5E9]">{b.name} Branch</p>
                      </Link>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <Link to="/process" className={`text-xs font-bold uppercase tracking-widest hover:text-[#0EA5E9] ${location.pathname === '/process' ? 'text-[#0EA5E9]' : 'text-slate-600'}`}>Process</Link>
            <Link to="/blog" className={`text-xs font-bold uppercase tracking-widest hover:text-[#0EA5E9] ${location.pathname === '/blog' ? 'text-[#0EA5E9]' : 'text-slate-600'}`}>Blog</Link>
            <Link to="/about" className={`text-xs font-bold uppercase tracking-widest hover:text-[#0EA5E9] ${location.pathname === '/about' ? 'text-[#0EA5E9]' : 'text-slate-600'}`}>About</Link>
            <Link to="/contact" className={`text-xs font-bold uppercase tracking-widest hover:text-[#0EA5E9] ${location.pathname === '/contact' ? 'text-[#0EA5E9]' : 'text-slate-600'}`}>Contact</Link>
          </div>

          <div className="flex items-center gap-4">


            <a 
              href="https://wa.me/919560723332" 
              target="_blank" 
              rel="noreferrer"
              className="hidden md:flex w-10 h-10 items-center justify-center border border-slate-200 text-green-500 rounded-lg hover:bg-green-50 hover:border-green-200 transition-colors"
              title="Chat on WhatsApp"
            >
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 00-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
              </svg>
            </a>

            {location.pathname.startsWith('/blog') && (
              <Link to="/" className="bg-[#1E293B] text-white px-5 py-2 rounded-lg text-[10px] font-black uppercase tracking-widest hover:bg-[#0EA5E9] transition-all flex items-center gap-2 shadow-lg">
                <span>✕</span> Exit Blog
              </Link>
            )}
            
            {user ? (
               <Link to={user.role === 'admin' ? '/admin/dashboard' : '/agent/dashboard'} className="btn-primary py-2 px-6 text-[10px]">Dashboard</Link>
            ) : (
              <div 
                className="relative py-2 group"
                onMouseEnter={() => setActiveDropdown('login')}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <button className="text-xs font-bold uppercase tracking-widest text-slate-600 hover:text-[#0EA5E9] flex items-center gap-1">
                  Login <span className="text-[8px]">▼</span>
                </button>
                <AnimatePresence>
                  {activeDropdown === 'login' && (
                    <motion.div 
                      initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 10 }}
                      className="absolute top-full right-0 w-56 bg-white shadow-2xl rounded-xl border border-slate-100 p-4"
                    >
                      {[
                        { name: 'Admin Portal', path: '/agent/login', icon: '🛡️' },
                        { name: 'Agent Portal', path: '/agent/login', icon: '👤' },
                        { name: 'Sales Manager', path: '/agent/login', icon: '📊' },
                      ].map(portal => (
                        <Link key={portal.name} to={portal.path} className="block p-3 hover:bg-slate-50 rounded-lg group/item text-left">
                          <p className="text-[10px] font-black uppercase text-slate-900 group-hover/item:text-[#0EA5E9] flex items-center gap-2">
                            <span>{portal.icon}</span> {portal.name}
                          </p>
                        </Link>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
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
              className="lg:hidden relative z-[110] w-12 h-12 flex flex-col items-center justify-center bg-slate-50 border border-slate-200 rounded-2xl shadow-sm transition-all active:scale-90"
              aria-label="Toggle menu"
            >
              <AnimatePresence mode="wait">
                {isMobileMenuOpen ? (
                  <motion.div
                    key="close"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                  >
                    <X className="w-6 h-6 text-[#0EA5E9]" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="menu"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    className="space-y-1"
                  >
                    <div className="w-6 h-0.5 bg-slate-900 rounded-full" />
                    <div className="w-4 h-0.5 bg-[#0EA5E9] rounded-full ml-auto" />
                    <div className="w-6 h-0.5 bg-slate-900 rounded-full" />
                  </motion.div>
                )}
              </AnimatePresence>
            </button>
          </div>
        </div>

        {/* Premium Mobile Menu Overlay */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <>
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-white/60 backdrop-blur-2xl z-[100] lg:hidden"
                onClick={() => setIsMobileMenuOpen(false)}
              />
              <motion.div 
                initial={{ x: '100%' }}
                animate={{ x: 0 }}
                exit={{ x: '100%' }}
                transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                className="fixed inset-y-0 right-0 w-full md:w-[400px] bg-white shadow-2xl z-[105] lg:hidden flex flex-col"
              >
                <div className="flex-1 overflow-y-auto pt-24 pb-8 px-6">
                  {/* Menu Sections */}
                  <div className="space-y-8">
                    {/* Primary Links */}
                    <nav className="space-y-1">
                      {[
                        { name: 'Home', path: '/' },
                        { name: 'Services', path: '/services' },
                        { name: 'Branches', path: '/branches' },
                        { name: 'Process', path: '/process' },
                        { name: 'Blog', path: '/blog' },
                        { name: 'About Us', path: '/about' },
                        { name: 'Team', path: '/team' },
                        { name: 'Contact', path: '/contact' },
                      ].map((item, index) => (
                        <motion.div
                          key={item.name}
                          initial={{ x: 20, opacity: 0 }}
                          animate={{ x: 0, opacity: 1 }}
                          transition={{ delay: 0.1 + index * 0.05 }}
                        >
                          <Link 
                            to={item.path}
                            className={`flex items-center justify-between py-4 border-b border-slate-50 group hover:pl-2 transition-all ${
                              location.pathname === item.path ? 'text-[#0EA5E9]' : 'text-slate-600'
                            }`}
                          >
                            <span className="text-lg font-black uppercase tracking-tight">{item.name}</span>
                            <ArrowRight className={`w-4 h-4 transition-transform group-hover:translate-x-1 ${
                              location.pathname === item.path ? 'text-[#0EA5E9]' : 'text-slate-300'
                            }`} />
                          </Link>
                        </motion.div>
                      ))}
                    </nav>

                    {/* Support Channels */}
                    <div className="mt-12 space-y-4">
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] mb-4">Direct Support</p>
                      <motion.div 
                         initial={{ y: 20, opacity: 0 }}
                         animate={{ y: 0, opacity: 1 }}
                         transition={{ delay: 0.5 }}
                         className="grid grid-cols-2 gap-4"
                      >
                         <a href="tel:+919560723332" className="flex flex-col gap-2 p-4 bg-slate-50 rounded-2xl border border-slate-100 group hover:border-[#0EA5E9]/30 transition-all">
                            <Phone className="w-5 h-5 text-[#0EA5E9]" />
                            <span className="text-[10px] font-black uppercase tracking-wider text-slate-900 leading-none">Call Node</span>
                         </a>
                         <a href="https://wa.me/919560723332" target="_blank" rel="noreferrer" className="flex flex-col gap-2 p-4 bg-green-50 rounded-2xl border border-green-100 group hover:border-green-300 transition-all">
                            <MessageSquare className="w-5 h-5 text-green-600" />
                            <span className="text-[10px] font-black uppercase tracking-wider text-green-700 leading-none">WhatsApp</span>
                         </a>
                      </motion.div>
                    </div>

                    {/* Contact Info Footer */}
                    <motion.div 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.7 }}
                      className="mt-12 pt-8 border-t border-slate-100 space-y-4"
                    >
                      <div className="flex items-center gap-3 text-slate-500">
                        <Mail className="w-4 h-4" />
                        <span className="text-[11px] font-medium">contact@swayamfin.com</span>
                      </div>
                      <div className="flex items-start gap-3 text-slate-500">
                        <MapPin className="w-4 h-4 mt-0.5 shrink-0" />
                        <span className="text-[11px] font-medium leading-relaxed">Office No. 8, First Floor, Opp. District Court, Civil Lines, Agra - 282002</span>
                      </div>
                    </motion.div>
                  </div>
                </div>

                {/* Bottom Action CTA */}
                <div className="p-6 bg-slate-50 border-t border-slate-100">
                   <button 
                    onClick={() => {
                        setIsModalOpen(true);
                        setIsMobileMenuOpen(false);
                    }}
                    className="w-full flex items-center justify-between bg-[#1E293B] text-white p-5 rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-[#0EA5E9] transition-all shadow-xl"
                   >
                     <span>Start Application</span>
                     <ArrowRight className="w-5 h-5" />
                   </button>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </nav>



      <LeadCaptureModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
};

export default Navbar;
