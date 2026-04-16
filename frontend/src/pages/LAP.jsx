import React from 'react';
import { motion } from 'framer-motion';
import { Building2, Percent, FileText } from 'lucide-react';
import { Link } from 'react-router-dom';

const LAP = () => {
  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="bg-primary-darkBlue text-white pt-20 pb-24 px-4 rounded-b-[40px] shadow-lg relative overflow-hidden">
        <div className="max-w-7xl mx-auto relative z-10 text-center">
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-extrabold mb-6"
          >
            Leverage Your Assets with <span className="text-primary-lightBlue">Loan Against Property</span>
          </motion.h1>
          <p className="text-lg md:text-xl text-blue-100 max-w-2xl mx-auto">
            Unlock the hidden value of your real estate to fund your next big milestone—at the lowest market rates.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-10 relative z-20 pb-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          <motion.div whileHover={{ y: -5 }} className="bg-white p-8 rounded-fintech shadow-fintech border border-gray-100 flex flex-col items-center text-center">
            <Building2 className="w-12 h-12 text-primary-darkBlue mb-4" />
            <h3 className="text-xl font-bold text-gray-900 mb-3">High LTV Ratios</h3>
            <p className="text-gray-600">Get up to 75% of your property's market value directly in your account.</p>
          </motion.div>

          <motion.div whileHover={{ y: -5 }} className="bg-white p-8 rounded-fintech shadow-fintech border border-gray-100 flex flex-col items-center text-center">
            <Percent className="w-12 h-12 text-success-green mb-4" />
            <h3 className="text-xl font-bold text-gray-900 mb-3">Low Interests</h3>
            <p className="text-gray-600">Enjoy highly competitive secured rates starting far below standard business loans.</p>
          </motion.div>

          <motion.div whileHover={{ y: -5 }} className="bg-white p-8 rounded-fintech shadow-fintech border border-gray-100 flex flex-col items-center text-center">
            <FileText className="w-12 h-12 text-primary-blue mb-4" />
            <h3 className="text-xl font-bold text-gray-900 mb-3">Easy Documentation</h3>
            <p className="text-gray-600">Simple valuation workflows taking maximum hassle out of your application.</p>
          </motion.div>

        </div>

        <div className="mt-16 text-center">
          <Link to="/">
            <button className="px-8 py-4 bg-primary-blue hover:bg-primary-darkBlue text-white font-bold rounded-xl shadow-lg transition duration-200 text-lg">
              Check Property Eligibility
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LAP;
