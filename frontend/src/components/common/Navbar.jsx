import React from 'react';
import { Link } from 'react-router-dom';
import { AreaChart } from 'lucide-react';

const Navbar = () => {
  return (
    <nav className="bg-white border-b border-gray-100 shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center">
          
          <div className="flex items-center">
            <Link to="/" className="flex items-center gap-2">
              <div className="bg-primary-blue p-2 rounded-lg">
                <AreaChart className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-extrabold text-primary-darkBlue tracking-tight">Swayamfin</span>
            </Link>
          </div>

          <div className="hidden md:flex items-center space-x-6 font-medium text-sm text-gray-600">
            <Link to="/" className="hover:text-primary-blue transition-colors duration-200">Home</Link>
            <Link to="/msme-loans" className="hover:text-primary-blue transition-colors duration-200">MSME</Link>
            <Link to="/lap" className="hover:text-primary-blue transition-colors duration-200">LAP</Link>
            <Link to="/housing" className="hover:text-primary-blue transition-colors duration-200">Housing</Link>
            <Link to="/supply-chain" className="hover:text-primary-blue transition-colors duration-200">Supply Chain</Link>
            <Link to="/agent/dashboard" className="px-5 py-2.5 rounded-full bg-primary-lightBlue text-primary-darkBlue font-semibold hover:bg-blue-100 transition duration-200">
              Agent Portal
            </Link>
          </div>
          
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
