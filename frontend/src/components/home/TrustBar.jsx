import React from 'react';
import { ExternalLink, FileText } from 'lucide-react';
import partnerLogo from '../../../partnerlogo.jpeg';

const TrustBar = () => {
  return (
    <div className="bg-gradient-to-b from-white to-[#F8FAFC] py-16 border-y border-slate-100 overflow-hidden relative">
      <div className="absolute top-0 left-0 w-32 h-full bg-gradient-to-r from-white to-transparent z-10" />
      <div className="absolute top-0 right-0 w-32 h-full bg-gradient-to-l from-white to-transparent z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20">
        {/* Section Header */}
        <div className="flex items-center gap-4 mb-12">
          <div className="w-1.5 h-1.5 rounded-full bg-[#0EA5E9]" />
          <p className="text-slate-400 text-[10px] font-black uppercase tracking-[0.4em]">Our Trusted Ecosystem</p>
        </div>

        {/* DMI Partner Card */}
        <div className="bg-white border border-slate-100 rounded-[32px] p-8 md:p-12 shadow-sm hover:shadow-2xl transition-all duration-500">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            
            {/* Left: Logo */}
            <div className="flex justify-center md:items-center">
              <div className="w-full h-48 sm:h-64 md:h-96 rounded-2xl flex items-center justify-center overflow-hidden">
                <img 
                  src={partnerLogo}
                  alt="DMI Housing Finance Logo"
                  className="w-full h-full object-contain object-center scale-110 md:scale-125"
                />
              </div>
            </div>

            {/* Right: Content & Buttons */}
            <div className="space-y-6">
              <div>
                <h3 className="text-2xl md:text-3xl font-black text-[#1E293B] mb-4 tracking-tight">
                  Trusted Financial Partner
                </h3>
                <p className="text-lg text-slate-600 leading-relaxed font-medium">
                  We are proud to partner with <span className="font-black text-[#0EA5E9]">DMI Housing Finance</span>, a trusted leader in their field. You can access their full range of services directly through their dedicated portals below.
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                {/* Button 1: Partner Access Portal */}
                <a
                  href="https://customerportal.dmihousingfinance.in/login"
                  target="_blank"
                  rel="noreferrer"
                  className="group flex items-center justify-center gap-2 bg-[#0EA5E9] hover:bg-[#0369A1] text-white px-8 py-4 rounded-2xl font-black uppercase tracking-widest text-[11px] transition-all duration-300 shadow-lg hover:shadow-2xl"
                >
                  <ExternalLink className="w-4 h-4" />
                  Partner Access Portal
                </a>

                {/* Button 2: Grievances & Policy */}
                <a
                  href="https://www.dmihousingfinance.in/wp-content/uploads/2025/04/Grievance-Redressal-Policy-New.pdf"
                  target="_blank"
                  rel="noreferrer"
                  className="group flex items-center justify-center gap-2 bg-slate-100 hover:bg-slate-200 text-[#1E293B] px-8 py-4 rounded-2xl font-black uppercase tracking-widest text-[11px] transition-all duration-300 border border-slate-200 hover:border-slate-300"
                >
                  <FileText className="w-4 h-4" />
                  Grievance Policy
                </a>
              </div>

              {/* Trust Badge */}
              <div className="flex items-center gap-2 pt-2 border-t border-slate-100">
                <div className="w-2 h-2 rounded-full bg-green-500" />
                <span className="text-[9px] text-slate-500 font-bold uppercase tracking-widest">Verified & Licensed Partner</span>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default TrustBar;
