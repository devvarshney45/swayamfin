import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, Clock, Calendar, CheckCircle2, ChevronRight } from 'lucide-react';
import axios from 'axios';

const branchData = {
  'agra': {
    city: 'Agra',
    address: 'Sanjay Place, Civil Lines, Agra, Uttar Pradesh - 282002',
    phone: '+91 0562-400XXXX',
    email: 'agra@swayamfin.com',
    map: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3549.0!2d78.0!3d27.18!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjfCsDEwJzQ4LjAiTiA3OMKwMDAnMDAuMCJF!5e0!3m2!1sen!2sin!4v1610000000000!5m2!1sen!2sin',
    manager: 'Rahul Kumar'
  },
  'gurgaon': {
    city: 'Gurugram',
    address: 'Sector 44, Near Huda City Center, Gurugram, Haryana - 122003',
    phone: '+91 6397003690',
    email: 'gurgaon@swayamfin.com',
    map: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3506.27!2d77.07!3d28.45!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjjCsDI3JzAwLjAiTiA3N8KwMDQnMTIuMCJF!5e0!3m2!1sen!2sin!4v1610000000000!5m2!1sen!2sin',
    manager: 'Sandeep Singh'
  },
  'delhi': {
    city: 'New Delhi (HQ)',
    address: '619, Somdutt Chambers II, Bhikaji Cama, New Delhi – 110066',
    phone: '+91 6397003690',
    email: 'delhi@swayamfin.com',
    map: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3504.144406563!2d77.1852!3d28.5654!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjjCsDMzJzU1LjQiTiA3N8KwMTEnMDYuNyJF!5e0!3m2!1sen!2sin!4v1610000000000!5m2!1sen!2sin',
    manager: 'Vikkrant Prasad'
  }
};

const BranchDetails = () => {
  const { slug } = useParams();
  const branch = branchData[slug] || branchData['delhi'];
  const [success, setSuccess] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    mobile: '',
    loanType: 'MSME Loan',
    city: branch.city
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/api/leads`, formData);
      setSuccess(true);
    } catch (err) {
      console.error('Lead submission failed');
    }
  };

  return (
    <div className="bg-[#f8fafc] min-h-screen pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-4">
        
        <div className="flex flex-col lg:flex-row gap-12 items-start">
          
          <div className="lg:w-2/3 space-y-8">
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="bg-white p-10 rounded-[48px] shadow-sm border border-slate-100">
              <div className="inline-flex items-center gap-2 bg-blue-50 text-primary-blue px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-widest mb-6">
                <MapPin className="w-4 h-4" /> Local Branch Office
              </div>
              <h1 className="text-4xl md:text-5xl font-black text-slate-900 mb-6">Swayamfin {branch.city}</h1>
              <p className="text-lg text-slate-500 font-medium leading-relaxed mb-10">
                Serving the {branch.city} region with customized financial solutions for MSMEs and individuals. Visit our office for professional guidance on business loans and housing finance.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 py-8 border-t border-slate-50">
                <div className="space-y-6">
                  <div className="flex gap-4">
                    <div className="w-12 h-12 bg-slate-50 rounded-2xl flex items-center justify-center text-primary-blue shrink-0">
                      <MapPin className="w-6 h-6" />
                    </div>
                    <div>
                      <p className="text-xs text-slate-400 font-bold uppercase tracking-wider mb-1">Address</p>
                      <p className="text-slate-700 font-bold leading-relaxed">{branch.address}</p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="w-12 h-12 bg-slate-50 rounded-2xl flex items-center justify-center text-primary-blue shrink-0">
                      <Phone className="w-6 h-6" />
                    </div>
                    <div>
                      <p className="text-xs text-slate-400 font-bold uppercase tracking-wider mb-1">Contact</p>
                      <p className="text-slate-900 font-black text-lg">{branch.phone}</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-6">
                  <div className="flex gap-4">
                    <div className="w-12 h-12 bg-slate-50 rounded-2xl flex items-center justify-center text-primary-blue shrink-0">
                      <Clock className="w-6 h-6" />
                    </div>
                    <div>
                      <p className="text-xs text-slate-400 font-bold uppercase tracking-wider mb-1">Working Hours</p>
                      <p className="text-slate-700 font-bold">Mon - Sat: 9:30 AM - 6:30 PM</p>
                      <p className="text-slate-400 text-[10px] font-bold">Closed on Sundays & Bank Holidays</p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="w-12 h-12 bg-slate-50 rounded-2xl flex items-center justify-center text-primary-blue shrink-0">
                      <Calendar className="w-6 h-6" />
                    </div>
                    <div>
                      <p className="text-xs text-slate-400 font-bold uppercase tracking-wider mb-1">Branch Manager</p>
                      <p className="text-slate-900 font-black">{branch.manager}</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            <div className="h-[450px] bg-slate-200 rounded-[48px] overflow-hidden shadow-sm ring-1 ring-slate-200">
               <iframe 
                src={branch.map} 
                className="w-full h-full border-0 grayscale hover:grayscale-0 transition-all duration-700 opacity-90 contrast-110"
                allowFullScreen="" 
                loading="lazy"
                title={`${branch.city} Map`}
              ></iframe>
            </div>
          </div>

          <div className="lg:w-1/3">
            <div className="bg-white p-8 rounded-[40px] shadow-2xl border border-slate-50 relative overflow-hidden">
               <div className="absolute top-0 right-0 w-32 h-32 bg-primary-blue shadow-lg -translate-y-1/2 translate-x-1/2 rounded-full opacity-10" />
               <h3 className="text-2xl font-black text-slate-900 mb-6">Local Lead Desk</h3>
               {success ? (
                 <div className="text-center py-12">
                   <div className="w-20 h-20 bg-green-50 text-success-green rounded-full flex items-center justify-center mx-auto mb-6">
                     <CheckCircle2 className="w-10 h-10" />
                   </div>
                   <h4 className="text-xl font-bold mb-2">Request Shared!</h4>
                   <p className="text-sm text-slate-500 font-medium italic">"Our {branch.city} team will contact you within 30 minutes."</p>
                   <button onClick={() => setSuccess(false)} className="mt-8 text-primary-blue font-black underline">Apply Again</button>
                 </div>
               ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="space-y-1.5">
                    <label className="text-xs font-black text-slate-400 uppercase ml-1">Full Name</label>
                    <input 
                      required
                      placeholder="Enter legal name"
                      className="w-full px-5 py-3.5 bg-slate-50 rounded-2xl border-2 border-transparent focus:border-primary-blue outline-none font-bold"
                      value={formData.fullName}
                      onChange={e => setFormData({...formData, fullName: e.target.value})}
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-black text-slate-400 uppercase ml-1">Mobile Number</label>
                    <input 
                      required
                      type="tel"
                      placeholder="10-digit number"
                      className="w-full px-5 py-3.5 bg-slate-50 rounded-2xl border-2 border-transparent focus:border-primary-blue outline-none font-bold"
                      value={formData.mobile}
                      onChange={e => setFormData({...formData, mobile: e.target.value})}
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-black text-slate-400 uppercase ml-1">Interested In</label>
                    <select 
                      className="w-full px-5 py-3.5 bg-slate-50 rounded-2xl border-2 border-transparent focus:border-primary-blue outline-none font-bold appearance-none text-slate-700"
                      value={formData.loanType}
                      onChange={e => setFormData({...formData, loanType: e.target.value})}
                    >
                      <option value="MSME Loan">MSME Loan</option>
                      <option value="LAP">Loan Against Property</option>
                      <option value="Housing Loan">Housing Loan</option>
                      <option value="Supply Chain Finance">Supply Chain Finance</option>
                    </select>
                  </div>
                  <button type="submit" className="w-full bg-primary-blue text-white py-5 rounded-2xl font-black shadow-xl shadow-primary-blue/20 flex items-center justify-center gap-2 group transition-all">
                    GET CALLBACK <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </button>
                  <p className="text-[10px] text-center text-slate-400 font-bold italic leading-tight">
                    * This lead will be directly assigned to our {branch.city} branch Relationship Manager.
                  </p>
                </form>
               )}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default BranchDetails;
