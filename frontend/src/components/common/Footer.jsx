import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 py-12 border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          <div className="col-span-1 md:col-span-1">
            <h2 className="text-2xl font-bold text-white tracking-tight mb-4">Swayamfin</h2>
            <p className="text-sm text-gray-400">
              A high-conversion financial platform empowering your financial journey digitally.
            </p>
          </div>

          <div className="col-span-1 md:col-span-2 text-sm text-gray-400 space-y-4">
            <h3 className="text-lg font-semibold text-gray-200 mb-2">Compliance & Grievance</h3>
            
            <p className="p-3 bg-gray-800 border-l-4 border-primary-blue rounded">
              <strong className="text-white">RBI / LSP Disclosure:</strong> Swayamfin is a registered Loan Service Provider (LSP) operating on behalf of Green Miles Mobility Pvt. Ltd. under RBI guidelines. All loan products are subject to approval by our regulated lending partners.
            </p>

            <div className="mt-4">
              <strong className="text-white block mb-1">Grievance Redressal Officer:</strong>
              <div>Name: Vikrant Prasad</div>
              <div>Email: <a href="mailto:grievance@swayamfin.com" className="hover:text-primary-blue transition">grievance@swayamfin.com</a></div>
              <div>Ph: +91 000-000-0000</div>
              <div className="mt-2 text-xs">For any complaints or queries regarding our services, please contact our grievance redressal officer within working hours.</div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-10 pt-6 flex flex-col md:flex-row justify-between text-xs text-gray-500">
          <p>&copy; {new Date().getFullYear()} Swayamfin (Green Miles Mobility Pvt. Ltd.). All rights reserved.</p>
          <div className="flex space-x-4 mt-4 md:mt-0">
            <a href="#" className="hover:text-white transition">Terms of Service</a>
            <a href="#" className="hover:text-white transition">Privacy Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
