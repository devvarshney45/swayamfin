import React from 'react';
import { motion } from 'framer-motion';
import { Home, Key, ShieldCheck } from 'lucide-react';
import { Link } from 'react-router-dom';

const Housing = () => {
  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="bg-primary-darkBlue text-white pt-20 pb-24 px-4 rounded-b-[40px] shadow-lg relative overflow-hidden">
        <div className="max-w-7xl mx-auto relative z-10 text-center">
          <motion.h1 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-4xl md:text-5xl font-extrabold mb-6"
          >
            Your Dream Home with <span className="text-success-green">Housing Loans</span>
          </motion.h1>
          <p className="text-lg md:text-xl text-blue-100 max-w-2xl mx-auto">
            Flexible tenures, minimum processing fees, and immediate sanctions to make housing accessible for you.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 pb-20 text-center">
        <div className="flex flex-col md:flex-row justify-center items-center gap-8 border-b border-gray-200 pb-12 mb-12">
            
          <div className="flex flex-col items-center">
            <div className="p-4 bg-blue-50 text-primary-blue rounded-full mb-4"><Home className="w-8 h-8"/></div>
            <h4 className="font-bold text-lg">New Purchase</h4>
            <p className="max-w-xs text-sm mt-2 text-gray-500">Fund your flat or villa directly mapped to your Swayamfin limits.</p>
          </div>
          
          <div className="flex flex-col items-center">
            <div className="p-4 bg-green-50 text-success-green rounded-full mb-4"><ShieldCheck className="w-8 h-8"/></div>
            <h4 className="font-bold text-lg">Home Extension</h4>
            <p className="max-w-xs text-sm mt-2 text-gray-500">Renovate and rebuild your existing property easily.</p>
          </div>

          <div className="flex flex-col items-center">
            <div className="p-4 bg-blue-50 text-primary-darkBlue rounded-full mb-4"><Key className="w-8 h-8"/></div>
            <h4 className="font-bold text-lg">Balance Transfer</h4>
            <p className="max-w-xs text-sm mt-2 text-gray-500">Shift your existing loans to us for heavily reduced EMIs.</p>
          </div>
        </div>

        <Link to="/">
          <button className="px-8 py-4 bg-success-green hover:bg-green-700 text-white font-bold rounded-xl shadow-lg transition duration-200 text-lg">
            Apply For Housing Finance
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Housing;
