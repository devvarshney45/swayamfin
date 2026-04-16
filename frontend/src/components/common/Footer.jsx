import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Linkedin, Instagram, Phone, Mail, MapPin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-[#0f172a] text-slate-300 pt-16 pb-8 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          
          {/* Column 1: Brand */}
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-white tracking-tight">Swayamfin</h2>
            <p className="text-sm text-slate-400 leading-relaxed font-medium italic">
              Empowering you for financial success with transparent lending solutions for MSMEs and individuals across India.
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 bg-white/5 rounded-xl flex items-center justify-center hover:bg-primary-blue hover:text-white transition-all duration-300">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 bg-white/5 rounded-xl flex items-center justify-center hover:bg-primary-blue hover:text-white transition-all duration-300">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 bg-white/5 rounded-xl flex items-center justify-center hover:bg-primary-blue hover:text-white transition-all duration-300">
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h3 className="text-white font-bold mb-6 uppercase tracking-wider text-sm">Quick Links</h3>
            <ul className="space-y-4 text-sm font-medium">
              <li><Link to="/" className="hover:text-primary-blue transition">Home</Link></li>
              <li><Link to="/about" className="hover:text-primary-blue transition">About Us</Link></li>
              <li><Link to="/team" className="hover:text-primary-blue transition">Our Team</Link></li>
              <li><Link to="/process" className="hover:text-primary-blue transition">How It Works</Link></li>
              <li><Link to="/become-a-partner" className="hover:text-primary-blue transition">Become a Partner</Link></li>
              <li><Link to="/contact" className="hover:text-primary-blue transition">Connect With Us</Link></li>
            </ul>
          </div>

          {/* Column 3: Services */}
          <div>
            <h3 className="text-white font-bold mb-6 uppercase tracking-wider text-sm">Services</h3>
            <ul className="space-y-4 text-sm font-medium">
              <li><Link to="/supply-chain" className="hover:text-primary-blue transition">Supply Chain Finance</Link></li>
              <li><Link to="/msme-loans" className="hover:text-primary-blue transition">MSME Structured Loans</Link></li>
              <li><Link to="/lap" className="hover:text-primary-blue transition">Loan Against Property</Link></li>
              <li><Link to="/housing" className="hover:text-primary-blue transition">Housing Finance</Link></li>
              <li><Link to="/msme-loans" className="hover:text-primary-blue transition">Micro LAP</Link></li>
              <li><Link to="/msme-loans" className="hover:text-primary-blue transition">Hybrid MSME Products</Link></li>
            </ul>
          </div>

          {/* Column 4: Contact */}
          <div>
            <h3 className="text-white font-bold mb-6 uppercase tracking-wider text-sm">Contact Us</h3>
            <ul className="space-y-4 text-sm font-medium text-slate-400">
              <li className="flex gap-3">
                <MapPin className="w-5 h-5 text-primary-blue flex-shrink-0" />
                <span>619, Somdutt Chambers II, Bhikaji Cama, New Delhi – 110066</span>
              </li>
              <li className="flex gap-3">
                <Phone className="w-5 h-5 text-primary-blue flex-shrink-0" />
                <span>+91 87009 65592</span>
              </li>
              <li className="flex gap-3">
                <Mail className="w-5 h-5 text-primary-blue flex-shrink-0" />
                <span>info@swayamfin.com</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Compliance Bar */}
        <div className="border-t border-white/5 pt-10 pb-6 mb-8">
          <div className="bg-slate-800/50 p-6 rounded-3xl border border-white/5">
            <p className="text-xs text-slate-500 leading-relaxed text-center italic">
              <strong className="text-slate-300">RBI / LSP Disclosure:</strong> Swayamfin is a brand of Green Miles Mobility Pvt. Ltd. (CIN: {import.meta.env.VITE_CIN || 'U66190DL2019PTC359196'}), operating as a Loan Service Provider (LSP). 
              Loans are sourced, processed, and facilitated on behalf of regulated NBFC and HFC partners. Swayamfin does not lend directly. All lending decisions are at the sole discretion of the partner lender. 
              Principal Partner: DMI Housing Finance Pvt. Ltd.
            </p>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row justify-between items-center text-[11px] text-slate-500 gap-4">
          <p>&copy; {new Date().getFullYear()} Green Miles Mobility Pvt. Ltd. All rights reserved.</p>
          <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 uppercase tracking-widest font-bold">
            <Link to="/compliance" className="hover:text-white transition">Fair Practice Code</Link>
            <Link to="/privacy-policy" className="hover:text-white transition">Privacy Policy</Link>
            <Link to="/terms" className="hover:text-white transition">Terms & Conditions</Link>
            <Link to="/grievance" className="hover:text-white transition">Grievance Policy</Link>
            <Link to="/compliance" className="hover:text-white transition">IT & Data Protection</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
