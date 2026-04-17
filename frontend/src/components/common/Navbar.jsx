import React, { useState } from 'react';
import { Link } from 'react-router-dom';
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
    { name: 'Delhi', slug: 'delhi' },
    { name: 'Noida', slug: 'noida' },
    { name: 'Agra', slug: 'agra' },
    { name: 'Gurgaon', slug: 'gurgaon' },
  ];

  return (
    <>
      <nav className="bg-white sticky top-0 z-[100] border-b border-slate-100 shadow-sm font-dmsans">
        {/* Top bar for Trust signal */}
        <div className="bg-primary-navy text-white text-[10px] py-1.5 text-center font-bold uppercase tracking-widest hidden md:block">
           <span className="opacity-80">RBI REGISTERED NBFC PARTNER</span> • <span className="text-primary-gold">ISO 9001:2015 CERTIFIED</span>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 focus-visible:outline-none">
          <div className="flex justify-between items-center h-20">
            
            {/* Logo Section */}
            <div className="flex items-center">
              <Link to="/" className="flex items-center gap-3 group focus-visible:outline-none">
                <div className="bg-primary-navy p-2 rounded-xl group-hover:scale-105 transition-transform duration-300 shadow-lg shadow-primary-navy/20">
                  <AreaChart className="w-6 h-6 text-primary-gold" />
                </div>
                <div className="flex flex-col">
                  <span className="text-2xl font-playfair font-black text-primary-navy tracking-tight leading-none lowercase">swayamfin.com</span>
                  <span className="text-[9px] font-black text-primary-gold tracking-[0.2em] leading-tight uppercase italic opacity-0">Financial Services</span>
                </div>
              </Link>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-7">
              <Link to="/" className="text-sm font-bold text-slate-600 hover:text-primary-navy transition-colors uppercase tracking-tight">Home</Link>
              
              {/* Product Mega Menu */}
              <div 
                className="relative group"
                onMouseEnter={() => setActiveDropdown('services')}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <button className="flex items-center gap-1.5 text-sm font-bold text-slate-600 hover:text-primary-navy transition-colors uppercase tracking-tight py-8">
                  Services <ChevronDown className="w-4 h-4 text-primary-gold" />
                </button>
                
                {activeDropdown === 'services' && (
                  <div className="absolute top-full left-1/2 -translate-x-1/2 w-[600px] bg-white border border-slate-100 shadow-2xl rounded-3xl p-6 grid grid-cols-2 gap-4 animate-in fade-in slide-in-from-top-2 duration-300">
                    {services.map((item) => (
                      <Link 
                        key={item.slug}
                        to={`/services/${item.slug}`}
                        className="flex items-center gap-4 p-4 rounded-2xl hover:bg-slate-50 transition border border-transparent hover:border-slate-100 group"
                      >
                        <div className="w-10 h-10 bg-slate-50 rounded-xl flex items-center justify-center text-primary-navy group-hover:bg-primary-gold group-hover:text-white transition-colors">
                          <item.icon className="w-5 h-5" />
                        </div>
                        <div>
                          <p className="font-black text-sm text-primary-navy leading-none mb-1">{item.name}</p>
                          <p className="text-[11px] text-slate-400 font-bold">{item.desc}</p>
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
                <button className="flex items-center gap-1.5 text-sm font-bold text-slate-600 hover:text-primary-navy transition-colors uppercase tracking-tight py-8">
                  Branches <ChevronDown className="w-4 h-4 text-primary-gold" />
                </button>
                
                {activeDropdown === 'branches' && (
                  <div className="absolute top-full left-0 w-48 bg-white border border-slate-100 shadow-xl rounded-2xl p-2 animate-in fade-in slide-in-from-top-2">
                    {branches.map((item) => (
                      <Link 
                        key={item.slug}
                        to={`/branches/${item.slug}`}
                        className="block px-4 py-3 text-sm font-bold text-slate-600 hover:text-primary-navy hover:bg-slate-50 rounded-xl transition-all"
                      >
                        {item.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              <Link to="/process" className="text-sm font-bold text-slate-600 hover:text-primary-navy transition-colors uppercase tracking-tight">Process</Link>
              <Link to="/about" className="text-sm font-bold text-slate-600 hover:text-primary-navy transition-colors uppercase tracking-tight">Company</Link>
              
              <div className="w-px h-6 bg-slate-100" />
              
              <a href="https://wa.me/916397003690" className="flex items-center gap-2 text-success-green hover:opacity-80 transition group">
                <div className="w-8 h-8 rounded-full bg-green-50 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <MessageCircle className="w-4 h-4 fill-current" />
                </div>
                <span className="text-sm font-black tracking-tight">6397003690</span>
              </a>

              {user ? (
                <Link 
                  to={user.role === 'Admin' ? '/admin/dashboard' : '/agent/dashboard'} 
                  className="px-6 py-2.5 rounded-full bg-primary-navy text-white text-[13px] font-black hover:bg-primary-navy/90 transition shadow-lg shadow-primary-navy/20 uppercase tracking-widest"
                >
                  Dashboard
                </Link>
              ) : (
                <Link to="/agent/login" className="px-6 py-2.5 rounded-full border-2 border-primary-navy text-primary-navy text-[13px] font-black hover:bg-primary-navy hover:text-white transition uppercase tracking-widest">
                  Login
                </Link>
              )}
            </div>

            {/* Mobile Partner Icon */}
            <div className="lg:hidden flex items-center gap-3">
               <a href="tel:+916397003690" className="p-2.5 bg-green-50 rounded-xl text-success-green">
                  <PhoneCall className="w-5 h-5" />
               </a>
              <Link to={user ? (user.role === 'Admin' ? '/admin/dashboard' : '/agent/dashboard') : '/agent/login'} className="p-2.5 bg-slate-100 rounded-xl text-primary-navy">
                 <User className="w-5 h-5" />
              </Link>
            </div>
            
          </div>
        </div>
      </nav>

      {/* Mobile Sticky Bar - Brief 2.4 */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-slate-100 p-3 z-[150] flex gap-3 shadow-[0_-10px_30px_rgba(0,0,0,0.05)]">
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

