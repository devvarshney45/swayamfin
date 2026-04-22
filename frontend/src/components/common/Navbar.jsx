import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
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
  Globe
} from 'lucide-react';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [activeDropdown, setActiveDropdown] = useState(null);

  const services = [
    { name: 'Home Loan', slug: 'housing-loans', icon: Home, desc: 'Your dream home made easy' },
    { name: 'Loan Against Property', slug: 'lap', icon: Building2, desc: 'Unlock property value' },
    { name: 'MSME Structured Loans', slug: 'msme-loans', icon: Briefcase, desc: 'Fueling business growth' },
    { name: 'Micro LAP', slug: 'micro-lap', icon: MapPin, desc: 'Small loans, big impact' },
    { name: 'Hybrid MSME Products', slug: 'hybrid-msme', icon: Globe, desc: 'Mixed lending solutions' },
    { name: 'Supply Chain Financing', slug: 'supply-chain', icon: Truck, desc: 'Inventory & PO funding' },
    { name: 'Unsecured MSME Loans', slug: 'unsecured-msme', icon: ShieldCheck, desc: 'No collateral needed' },
    { name: 'Machinery Loans', slug: 'machinery-loan', icon: AreaChart, desc: 'Equipment financing' },
  ];

  const branches = [
    { name: 'Agra', slug: 'agra' },
    { name: 'Mathura', slug: 'mathura' },
    { name: 'Hathras', slug: 'hathras' },
    { name: 'Kosi', slug: 'kosi' },
  ];

  return (
    <>
      <nav className="bg-[#020617] border-b border-white/5 sticky top-0 z-[100] shadow-2xl font-dmsans">
        {/* Top bar for Trust signal */}
        <div className="bg-[#0B0F19] text-white text-[10px] py-1.5 text-center font-bold uppercase tracking-widest hidden md:block border-b border-white/5">
           <span className="opacity-60">RBI REGISTERED NBFC PARTNER</span> • <span className="text-primary-gold">ISO 9001:2015 CERTIFIED</span>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 focus-visible:outline-none">
          <div className="flex justify-between items-center h-20">
            
            {/* Logo Section */}
            <div className="flex items-center">
              <Link to="/" className="flex items-center gap-3 group focus-visible:outline-none">
                <div className="bg-primary-gold p-2 rounded-xl group-hover:scale-105 transition-transform duration-300 shadow-lg shadow-primary-gold/10">
                  <AreaChart className="w-6 h-6 text-[#020617]" />
                </div>
                <div className="flex flex-col">
                  <span className="text-2xl font-playfair font-black text-white tracking-tight leading-none lowercase">swayamfin.com</span>
                  <span className="text-[9px] font-black text-primary-gold tracking-[0.2em] leading-tight uppercase italic opacity-60">Financial Services</span>
                </div>
              </Link>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-7">
              <Link to="/" className="text-sm font-bold text-slate-300 hover:text-primary-gold transition-colors uppercase tracking-tight">Home</Link>
              
              {/* Product Mega Menu */}
              <div 
                className="relative group"
                onMouseEnter={() => setActiveDropdown('services')}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <button className="flex items-center gap-1.5 text-sm font-bold text-slate-300 hover:text-primary-gold transition-colors uppercase tracking-tight py-8">
                  Services <ChevronDown className="w-4 h-4 text-primary-gold" />
                </button>
                
                {activeDropdown === 'services' && (
                  <div className="absolute top-full left-1/2 -translate-x-1/2 w-[600px] bg-[#0B0F19] border border-white/5 shadow-2xl rounded-3xl p-6 grid grid-cols-2 gap-4 animate-in fade-in slide-in-from-top-2 duration-300">
                    {services.map((item) => (
                      <Link 
                        key={item.slug}
                        to={`/services/${item.slug}`}
                        className="flex items-center gap-4 p-4 rounded-2xl hover:bg-white/5 transition border border-transparent hover:border-white/10 group"
                      >
                        <div className="w-10 h-10 bg-white/5 rounded-xl flex items-center justify-center text-slate-400 group-hover:bg-primary-gold group-hover:text-[#020617] transition-colors">
                          <item.icon className="w-5 h-5" />
                        </div>
                        <div>
                          <p className="font-black text-sm text-white leading-none mb-1">{item.name}</p>
                          <p className="text-[11px] text-slate-500 font-bold">{item.desc}</p>
                        </div>
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              {/* Branches Menu */}
              <div 
                className="relative group"
                onMouseEnter={() => setActiveDropdown('branches')}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <button className="flex items-center gap-1.5 text-sm font-bold text-slate-300 hover:text-primary-gold transition-colors uppercase tracking-tight py-8">
                  Branches <ChevronDown className="w-4 h-4 text-primary-gold" />
                </button>
                
                {activeDropdown === 'branches' && (
                  <div className="absolute top-full left-0 w-48 bg-[#0B0F19] border border-white/5 shadow-2xl rounded-2xl p-2 animate-in fade-in slide-in-from-top-2">
                    {branches.map((item) => (
                      <Link 
                        key={item.slug}
                        to={`/branches/${item.slug}`}
                        className="block px-4 py-3 text-sm font-bold text-slate-300 hover:text-primary-gold hover:bg-white/5 rounded-xl transition-all"
                      >
                        {item.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              <Link to="/process" className="text-sm font-bold text-slate-300 hover:text-primary-gold transition-colors uppercase tracking-tight">Process</Link>
              <Link to="/about" className="text-sm font-bold text-slate-300 hover:text-primary-gold transition-colors uppercase tracking-tight">Company</Link>
              
              <div className="w-px h-6 bg-white/10" />
              
              <a href="https://wa.me/916397003690" className="flex items-center gap-2 text-success-green hover:opacity-80 transition group">
                <div className="w-8 h-8 rounded-full bg-green-500/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <MessageCircle className="w-4 h-4 fill-current" />
                </div>
                <span className="text-sm font-black tracking-tight text-white/90 group-hover:text-success-green transition-colors">6397003690</span>
              </a>

              {user ? (
                <div className="flex items-center gap-4">
                  {user.role === 'admin' && (
                    <div className="hidden xl:flex items-center gap-4 mr-2">
                       <Link to="/admin/leads" className="text-xs font-black uppercase tracking-widest text-slate-500 hover:text-primary-gold transition-colors">Repository</Link>
                       <Link to="/admin/agents" className="text-xs font-black uppercase tracking-widest text-slate-500 hover:text-primary-gold transition-colors">Team</Link>
                    </div>
                  )}
                  <Link 
                    to={user.role === 'admin' ? '/admin/dashboard' : user.role === 'bsm' ? '/bsm/dashboard' : '/agent/dashboard'} 
                    className="px-6 py-2.5 rounded-full bg-primary-gold text-[#020617] text-[13px] font-black hover:bg-yellow-500 transition shadow-lg shadow-primary-gold/10 uppercase tracking-widest"
                  >
                    Dashboard
                  </Link>
                  <button 
                    onClick={() => { logout(); navigate('/agent/login'); }}
                    className="p-2.5 rounded-full bg-white/5 text-slate-400 hover:bg-rose-500/20 hover:text-rose-400 transition-colors group"
                    title="Logout"
                  >
                    <LogOut className="w-5 h-5 transition-transform group-hover:scale-110" />
                  </button>
                </div>
              ) : (
                <Link to="/agent/login" className="px-6 py-2.5 rounded-full border-2 border-primary-gold text-primary-gold text-[13px] font-black hover:bg-primary-gold hover:text-[#020617] transition uppercase tracking-widest">
                  Partner Login
                </Link>
              )}
            </div>

            {/* Mobile Partner Icon */}
            <div className="lg:hidden flex items-center gap-3">
               <a href="tel:+916397003690" className="p-2.5 bg-green-500/10 rounded-xl text-success-green">
                  <PhoneCall className="w-5 h-5" />
               </a>
              <Link to={user ? (user.role === 'admin' ? '/admin/dashboard' : user.role === 'bsm' ? '/bsm/dashboard' : '/agent/dashboard') : '/agent/login'} className="p-2.5 bg-white/5 rounded-xl text-slate-300">
                 <User className="w-5 h-5" />
              </Link>
            </div>
            
          </div>
        </div>
      </nav>

      {/* Mobile Sticky Bar - Brief 2.4 */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-[#0B0F19] border-t border-white/5 p-3 z-[150] flex gap-3 shadow-[0_-10px_30px_rgba(0,0,0,0.5)]">
        <a href="https://wa.me/916397003690" className="flex-1 bg-success-green text-white flex items-center justify-center gap-2 py-4 rounded-2xl font-black text-xs uppercase tracking-widest">
          <MessageCircle className="w-5 h-5 fill-current" /> WhatsApp
        </a>
        <Link to="/" className="flex-1 bg-primary-gold text-white flex items-center justify-center gap-2 py-4 rounded-2xl font-black text-xs uppercase tracking-widest shadow-lg shadow-primary-gold/20">
          <PhoneCall className="w-5 h-5" /> Apply Now
        </Link>
      </div>
    </>
  );
};

export default Navbar;

