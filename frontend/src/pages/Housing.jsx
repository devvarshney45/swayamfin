import React from 'react';
import { motion } from 'framer-motion';
import { Home, Key, ShieldCheck } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';

const Housing = () => {
  const { isDark } = useTheme();

  return (
    <div className={`${isDark ? 'bg-[#020617] text-white' : 'bg-gray-50 text-slate-900'} min-h-screen transition-colors duration-300`}>
      <div className={`${isDark ? 'bg-white/5 border-white/5' : 'bg-blue-600 text-white'} pt-20 pb-24 px-4 rounded-b-[40px] shadow-lg relative overflow-hidden transition-all`}>
        <div className="max-w-7xl mx-auto relative z-10 text-center">
          <motion.h1 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className={`text-4xl md:text-5xl font-extrabold mb-6 ${isDark ? 'text-white' : 'text-white'}`}
          >
            Your Dream Home with <span className={`${isDark ? 'text-blue-400' : 'text-blue-100'}`}>Housing Loans</span>
          </motion.h1>
          <p className={`text-lg md:text-xl ${isDark ? 'text-slate-400' : 'text-blue-100'} max-w-2xl mx-auto font-medium`}>
            Flexible tenures, minimum processing fees, and immediate sanctions to make housing accessible for you.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 pb-20 text-center">
        <div className={`flex flex-col md:flex-row justify-center items-center gap-8 border-b ${isDark ? 'border-white/5' : 'border-gray-200'} pb-12 mb-12`}>
            
          <div className="flex flex-col items-center">
            <div className={`p-4 ${isDark ? 'bg-blue-500/10 text-blue-400' : 'bg-blue-50 text-blue-600'} rounded-full mb-4`}><Home className="w-8 h-8"/></div>
            <h4 className="font-bold text-lg">New Purchase</h4>
            <p className={`max-w-xs text-sm mt-2 ${isDark ? 'text-slate-500' : 'text-gray-500'} font-medium`}>Fund your flat or villa directly mapped to your Swayamfin limits.</p>
          </div>
          
          <div className="flex flex-col items-center">
            <div className={`p-4 ${isDark ? 'bg-emerald-500/10 text-emerald-400' : 'bg-green-50 text-emerald-600'} rounded-full mb-4`}><ShieldCheck className="w-8 h-8"/></div>
            <h4 className="font-bold text-lg">Home Extension</h4>
            <p className={`max-w-xs text-sm mt-2 ${isDark ? 'text-slate-500' : 'text-gray-500'} font-medium`}>Renovate and rebuild your existing property easily.</p>
          </div>

          <div className="flex flex-col items-center">
            <div className={`p-4 ${isDark ? 'bg-blue-500/10 text-blue-400' : 'bg-blue-50 text-blue-700'} rounded-full mb-4`}><Key className="w-8 h-8"/></div>
            <h4 className="font-bold text-lg">Balance Transfer</h4>
            <p className={`max-w-xs text-sm mt-2 ${isDark ? 'text-slate-500' : 'text-gray-500'} font-medium`}>Shift your existing loans to us for heavily reduced EMIs.</p>
          </div>
        </div>

        <Link to="/">
          <button className="px-10 py-4 bg-blue-600 hover:bg-blue-700 text-white font-black rounded-2xl shadow-xl shadow-blue-500/20 transition-all text-sm uppercase tracking-widest">
            Apply For Housing Finance
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Housing;
