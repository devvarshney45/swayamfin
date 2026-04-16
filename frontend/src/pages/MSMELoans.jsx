import React from 'react';
import { motion } from 'framer-motion';
import { Briefcase, Zap, ShieldCheck } from 'lucide-react';
import { Link } from 'react-router-dom';

const MSMELoans = () => {
  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Premium Header */}
      <div className="bg-primary-darkBlue text-white pt-20 pb-24 px-4 rounded-b-[40px] shadow-lg relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-primary-blue opacity-20 transform skew-x-12 translate-x-16 rounded-l-full"></div>
        <div className="max-w-7xl mx-auto relative z-10 text-center">
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-extrabold mb-6"
          >
            Empower Your Business with <span className="text-primary-lightBlue">MSME Loans</span>
          </motion.h1>
          <p className="text-lg md:text-xl text-blue-100 max-w-2xl mx-auto">
            Flexible, collateral-free funding designed exclusively for small and medium enterprises to scale instantly.
          </p>
        </div>
      </div>

      {/* Content Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-10 relative z-20 pb-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          <motion.div whileHover={{ y: -5 }} className="bg-white p-8 rounded-fintech shadow-fintech border border-gray-100 flex flex-col items-center text-center">
            <div className="w-14 h-14 bg-blue-50 text-primary-blue rounded-full flex items-center justify-center mb-6">
              <Zap className="w-7 h-7" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">Lightning Fast</h3>
            <p className="text-gray-600">Get approvals within 24 hours with our AI-driven assessment engine.</p>
          </motion.div>

          <motion.div whileHover={{ y: -5 }} className="bg-white p-8 rounded-fintech shadow-fintech border border-gray-100 flex flex-col items-center text-center">
            <div className="w-14 h-14 bg-green-50 text-success-green rounded-full flex items-center justify-center mb-6">
              <Briefcase className="w-7 h-7" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">Working Capital</h3>
            <p className="text-gray-600">Maintain smooth cash flow with high-limit overdrafts tailored to your cycle.</p>
          </motion.div>

          <motion.div whileHover={{ y: -5 }} className="bg-white p-8 rounded-fintech shadow-fintech border border-gray-100 flex flex-col items-center text-center">
            <div className="w-14 h-14 bg-blue-50 text-primary-darkBlue rounded-full flex items-center justify-center mb-6">
              <ShieldCheck className="w-7 h-7" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">Zero Collateral</h3>
            <p className="text-gray-600">Unsecured credit lines up to ₹50 Lakhs based purely on your business health.</p>
          </motion.div>

        </div>

        <div className="mt-16 text-center">
          <Link to="/">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 bg-primary-blue hover:bg-primary-darkBlue text-white font-bold rounded-xl shadow-lg transition duration-200 text-lg"
            >
              Apply for MSME Loan Now
            </motion.button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default MSMELoans;
