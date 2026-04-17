import React from 'react';
import { Link } from 'react-router-dom';
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
  Building2
} from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-primary-navy text-white pt-20 pb-10 font-dmsans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          <div className="space-y-6">
            <Link to="/" className="flex items-center gap-3 group">
              <div className="bg-primary-gold p-2 rounded-xl transition-transform shadow-lg shadow-primary-gold/20">
                <AreaChart className="w-6 h-6 text-primary-navy" />
              </div>
              <span className="text-2xl font-playfair font-black tracking-tight lowercase">swayamfin.com</span>
            </Link>
            <p className="text-sm text-slate-400 font-medium leading-relaxed">
              Empowering India's growth through specialized MSME and Supply Chain financing.
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-primary-gold transition-colors"><Linkedin className="w-5 h-5" /></a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-primary-gold transition-colors"><Twitter className="w-5 h-5" /></a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-primary-gold transition-colors"><Instagram className="w-5 h-5" /></a>
            </div>
          </div>

          <div>
            <h4 className="text-lg font-playfair font-bold mb-8 text-primary-gold">Products</h4>
            <ul className="space-y-4">
              <li><Link to="/services/msme-loans" className="text-sm text-slate-400 hover:text-white transition font-black uppercase tracking-tight">MSME Loans</Link></li>
              <li><Link to="/services/supply-chain" className="text-sm text-slate-400 hover:text-white transition font-black uppercase tracking-tight">Supply Chain</Link></li>
              <li><Link to="/services/housing-loans" className="text-sm text-slate-400 hover:text-white transition font-black uppercase tracking-tight">Housing Loans</Link></li>
              <li><Link to="/services/lap" className="text-sm text-slate-400 hover:text-white transition font-black uppercase tracking-tight">LAP</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-playfair font-bold mb-8 text-primary-gold">Quick Links</h4>
            <ul className="space-y-4">
              <li><Link to="/about" className="text-sm text-slate-400 hover:text-white transition font-black uppercase tracking-tight">About Us</Link></li>
              <li><Link to="/process" className="text-sm text-slate-400 hover:text-white transition font-black uppercase tracking-tight">How It Works</Link></li>
              <li><Link to="/contact" className="text-sm text-slate-400 hover:text-white transition font-black uppercase tracking-tight">Contact</Link></li>
              <li><Link to="/privacy-policy" className="text-sm text-slate-400 hover:text-white transition font-black uppercase tracking-tight">Privacy Policy</Link></li>
            </ul>
          </div>

          <div className="space-y-6">
            <h4 className="text-lg font-playfair font-bold mb-8 text-primary-gold">Contact</h4>
            <div className="flex gap-4 items-start text-xs text-slate-400 font-bold leading-tight">
              <MapPin className="w-4 h-4 text-primary-gold flex-shrink-0" />
              <span>619, Somdutt Chambers II, Bhikaji Cama, New Delhi – 110066</span>
            </div>
            <div className="flex gap-4 items-center text-sm text-slate-200 font-black">
              <Phone className="w-4 h-4 text-primary-gold flex-shrink-0" />
              <span>+91 6397003690</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 py-8 border-y border-white/5 mb-8">
           {['Agra Branch', 'Delhi HQ', 'Noida Branch', 'Gurgaon Branch'].map((loc) => (
             <div key={loc} className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-slate-500 hover:text-primary-gold transition cursor-pointer">
                <Building2 className="w-3 h-3" /> {loc}
             </div>
           ))}
        </div>

        <div className="pt-8 border-t border-white/5 text-[10px] text-slate-500 font-bold text-center">
          <p>© {currentYear} Swayamfin Financial Services Pvt. Ltd. | RBI REGISTERED NBFC PARTNER</p>
          <p className="mt-2 italic opacity-50">Lending decisions are at the sole discretion of partner lenders.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
