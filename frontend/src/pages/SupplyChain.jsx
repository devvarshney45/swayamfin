import React from 'react';
import { motion } from 'framer-motion';
import { Truck, RefreshCcw, Network } from 'lucide-react';
import { Link } from 'react-router-dom';

const SupplyChain = () => {
  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Premium Header */}
      <div className="bg-primary-darkBlue text-white pt-20 pb-24 px-4 rounded-b-[40px] shadow-lg relative overflow-hidden">
        <div className="absolute bottom-0 left-0 w-1/3 h-full bg-primary-blue opacity-20 transform -skew-x-12 -translate-x-16 rounded-r-full"></div>
        <div className="max-w-7xl mx-auto relative z-10 text-center">
          <motion.h1 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="text-4xl md:text-5xl font-extrabold mb-6"
          >
            Seamless <span className="text-success-green">Supply Chain</span> Finance
          </motion.h1>
          <p className="text-lg md:text-xl text-blue-100 max-w-2xl mx-auto">
            Unlock trapped liquidity. Get raw materials faster, pay suppliers instantly, and grow your distribution network risk-free.
          </p>
        </div>
      </div>

      {/* Content Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 pb-20">
        
        <div className="bg-white rounded-fintech shadow-fintech border border-gray-100 p-8 md:p-12 mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">The Swayamfin Ecosystem Advantage</h2>
          
          <div className="flex flex-col md:flex-row justify-center items-center gap-6 md:gap-12">
            
            <motion.div initial={{ x: -20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.1 }} className="flex flex-col items-center text-center max-w-xs">
              <div className="p-4 bg-blue-50 rounded-2xl mb-4 text-primary-blue"><Truck className="w-8 h-8"/></div>
              <h4 className="font-bold text-lg mb-2">Vendors</h4>
              <p className="text-sm text-gray-500">Early payments on invoices without waiting for 90-day cycles.</p>
            </motion.div>

            <RefreshCcw className="w-8 h-8 text-primary-lightBlue hidden md:block animate-spin-slow" />

            <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.2 }} className="flex flex-col items-center text-center max-w-xs">
              <div className="p-4 bg-primary-blue rounded-2xl mb-4 text-white"><Network className="w-8 h-8"/></div>
              <h4 className="font-bold text-lg mb-2">Anchors</h4>
              <p className="text-sm text-gray-500">Strengthen supply ties without deploying your own working capital.</p>
            </motion.div>

            <RefreshCcw className="w-8 h-8 text-primary-lightBlue hidden md:block animate-spin-slow" />

            <motion.div initial={{ x: 20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.3 }} className="flex flex-col items-center text-center max-w-xs">
              <div className="p-4 bg-green-50 rounded-2xl mb-4 text-success-green"><Truck className="w-8 h-8" style={{transform: "scaleX(-1)"}}/></div>
              <h4 className="font-bold text-lg mb-2">Dealers</h4>
              <p className="text-sm text-gray-500">Credit lines to purchase more inventory during peak seasons.</p>
            </motion.div>

          </div>
        </div>

        <div className="text-center">
          <Link to="/">
            <button className="px-8 py-4 bg-success-green hover:bg-green-700 text-white font-bold rounded-xl shadow-lg transition duration-200 text-lg">
              Unlock Liquidity Today
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SupplyChain;
