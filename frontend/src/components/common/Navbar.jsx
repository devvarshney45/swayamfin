import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { AreaChart, MessageCircle, PhoneCall, User, LogOut, LayoutDashboard } from 'lucide-react';

const Navbar = () => {
  const { user, logout } = useAuth();

  return (
    <>
      <nav className="bg-white/80 backdrop-blur-md border-b border-gray-100 shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-20 items-center">
            
            <div className="flex items-center">
              <Link to="/" className="flex items-center gap-2">
                <div className="bg-primary-blue p-2 rounded-lg">
                  <AreaChart className="w-6 h-6 text-white" />
                </div>
                <span className="text-2xl font-extrabold text-primary-darkBlue tracking-tighter uppercase italic">Swayamfin</span>
              </Link>
            </div>

            <div className="hidden md:flex items-center space-x-5 font-bold text-[13px] text-slate-500 uppercase tracking-tighter">
              <Link to="/" className="hover:text-primary-blue transition-colors">Home</Link>
              <Link to="/services/msme-loans" className="hover:text-primary-blue transition-colors">Services</Link>
              <Link to="/process" className="hover:text-primary-blue transition-colors">Process</Link>
              <Link to="/about" className="hover:text-primary-blue transition-colors">About</Link>
              <Link to="/contact" className="hover:text-primary-blue transition-colors">Contact</Link>
              
              <div className="w-px h-6 bg-slate-200" />
              
              <a href="https://wa.me/916397003690" className="flex items-center gap-2 text-success-green hover:opacity-80 transition">
                <MessageCircle className="w-4 h-4 fill-current" />
                <span>Support</span>
              </a>

              {user ? (
                <div className="flex items-center gap-3">
                  <Link 
                    to={user.role === 'Admin' ? '/admin/dashboard' : '/agent/dashboard'} 
                    className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-50 text-primary-darkBlue hover:bg-slate-100 transition border border-slate-200"
                  >
                    <LayoutDashboard className="w-4 h-4" /> DASHBOARD
                  </Link>
                  <button 
                    onClick={() => {
                      logout();
                      window.location.href = '/agent/login';
                    }}
                    className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-red-500 hover:bg-red-50 transition font-black"
                  >
                    <LogOut className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <Link to="/agent/login" className="px-5 py-2.5 rounded-full bg-primary-darkBlue text-white font-black hover:bg-primary-blue transition shadow-xl shadow-primary-blue/20">
                  PARTNER LOGIN
                </Link>
              )}
            </div>

            {/* Mobile Partner Icon */}
            <Link to={user ? (user.role === 'Admin' ? '/admin/dashboard' : '/agent/dashboard') : '/agent/login'} className="md:hidden p-2 bg-slate-50 rounded-xl text-primary-darkBlue">
               <User className="w-6 h-6 fill-current" />
            </Link>
            
          </div>
        </div>
      </nav>

      {/* Mobile Sticky Bar - PRD 18.3 */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-slate-100 p-3 z-[60] flex gap-3 shadow-[0_-10px_30px_rgba(0,0,0,0.05)]">
        <a href="https://wa.me/916397003690" className="flex-1 bg-success-green text-white flex items-center justify-center gap-2 py-3.5 rounded-2xl font-black text-sm">
          <MessageCircle className="w-5 h-5 fill-current" /> WHATSAPP
        </a>
        <Link to="/" className="flex-1 bg-primary-blue text-white flex items-center justify-center gap-2 py-3.5 rounded-2xl font-black text-sm">
          <PhoneCall className="w-5 h-5" /> APPLY NOW
        </Link>
      </div>
    </>
  );
};

export default Navbar;
