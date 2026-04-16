import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, Navigation2 } from 'lucide-react';
import { Link } from 'react-router-dom';

const Branches = () => {
  const branches = [
    {
      city: "New Delhi (Head Office)",
      slug: "delhi",
      address: "619, Somdutt Chambers II, Bhikaji Cama, New Delhi – 110066",
      phone: "+91 87009 65592",
      email: "delhi@swayamfin.com",
      map: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3504.144406563!2d77.1852!3d28.5654!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjjCsDMzJzU1LjQiTiA3N8KwMTEnMDYuNyJF!5e0!3m2!1sen!2sin!4v1610000000000!5m2!1sen!2sin"
    },
    {
      city: "Gurugram",
      slug: "gurgaon",
      address: "Sector 44, Near Huda City Center, Gurugram, Haryana - 122003",
      phone: "+91 87009 65592",
      email: "gurgaon@swayamfin.com",
      map: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3506.27!2d77.07!3d28.45!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjjCsDI3JzAwLjAiTiA3N8KwMDQnMTIuMCJF!5e0!3m2!1sen!2sin!4v1610000000000!5m2!1sen!2sin"
    },
    {
      city: "Agra",
      slug: "agra",
      address: "Sanjay Place, Civil Lines, Agra, Uttar Pradesh - 282002",
      phone: "+91 0562-400XXXX",
      email: "agra@swayamfin.com",
      map: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3549.0!2d78.0!3d27.18!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjfCsDEwJzQ4LjAiTiA3OMKwMDAnMDAuMCJF!5e0!3m2!1sen!2sin!4v1610000000000!5m2!1sen!2sin"
    }
  ];

  return (
    <div className="bg-slate-50 min-h-screen pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-4">
        
        <div className="text-center mb-16">
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-6"
          >
            Our Presence <span className="text-primary-blue">Across India</span>
          </motion.h1>
          <p className="text-lg text-slate-500 max-w-2xl mx-auto font-medium">
            Strategic branch locations to serve our MSME and individual clients with personalized financial guidance.
          </p>
        </div>

        <div className="space-y-12">
          {branches.map((branch, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="group bg-white rounded-[40px] shadow-fintech border border-slate-100 overflow-hidden flex flex-col lg:flex-row hover:shadow-2xl hover:shadow-primary-blue/5 transition-all duration-500"
            >
              <div className="lg:w-1/2 p-8 md:p-12 flex flex-col justify-center">
                <div className="inline-flex items-center gap-2 bg-blue-50 text-primary-blue px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-wider mb-6">
                  <MapPin className="w-4 h-4" /> 
                  Physical Branch
                </div>
                <h2 className="text-3xl font-extrabold text-slate-900 mb-6">{branch.city}</h2>
                
                <div className="space-y-6">
                  <div className="flex gap-4">
                    <div className="w-10 h-10 bg-slate-50 rounded-xl flex items-center justify-center text-primary-blue flex-shrink-0">
                      <Navigation2 className="w-5 h-5" />
                    </div>
                    <p className="text-slate-600 font-medium leading-relaxed italic">"{branch.address}"</p>
                  </div>
                  
                  <div className="flex gap-4">
                    <div className="w-10 h-10 bg-slate-50 rounded-xl flex items-center justify-center text-primary-blue flex-shrink-0">
                      <Phone className="w-5 h-5" />
                    </div>
                    <p className="text-slate-900 font-bold">{branch.phone}</p>
                  </div>

                  <div className="flex gap-4">
                    <div className="w-10 h-10 bg-slate-50 rounded-xl flex items-center justify-center text-primary-blue flex-shrink-0">
                      <Mail className="w-5 h-5" />
                    </div>
                    <p className="text-slate-600 font-medium">{branch.email}</p>
                  </div>
                </div>

                <div className="mt-10">
                   <button className="bg-primary-darkBlue text-white px-8 py-3.5 rounded-2xl font-bold flex items-center gap-2 hover:bg-primary-blue transition-all">
                      Get Directions
                   </button>
                </div>
              </div>

              <div className="lg:w-1/2 h-64 lg:h-auto min-h-[300px] bg-slate-200">
                {/* Real iframe placeholder */}
                <iframe 
                  src={branch.map} 
                  className="w-full h-full border-0 grayscale opacity-80 contrast-125"
                  allowFullScreen="" 
                  loading="lazy"
                  title={`${branch.city} Map`}
                ></iframe>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-24 bg-primary-blue rounded-[48px] p-12 text-center text-white shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full translate-x-1/2 -translate-y-1/2" />
          <h2 className="text-3xl font-bold mb-6">Can't visit us in person?</h2>
          <p className="text-blue-50 mb-10 text-lg opacity-90 max-w-xl mx-auto">
            Our digital branch is open 24/7. Apply for your loan online and get doorstep document collection service.
          </p>
          <a href="/" className="inline-block bg-white text-primary-blue font-extrabold px-12 py-4 rounded-2xl shadow-xl hover:scale-105 transition-all">
            Apply Online Now
          </a>
        </div>
      </div>
    </div>
  );
};

export default Branches;
