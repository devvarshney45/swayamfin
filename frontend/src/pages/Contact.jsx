import React from 'react';
import { motion } from 'framer-motion';
import { Phone, Mail, MapPin, Clock, MessageSquare, Send } from 'lucide-react';

const Contact = () => {
  return (
    <div className="bg-[#f8fafc] min-h-screen pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-4">
        
        <div className="text-center mb-16">
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-6"
          >
            Let's Talk About Your <span className="text-primary-blue">Financial Goals</span>
          </motion.h1>
          <p className="text-lg text-slate-500 max-w-2xl mx-auto font-medium leading-relaxed">
            Have questions about MSME loans or eligibility? Our team is ready to provide personalized guidance for your business growth.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          
          {/* Contact Details Cards */}
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                { icon: Phone, title: 'Call Us', detail: '+91 87009 65592', detail2: '011-44728117', color: 'bg-blue-50 text-primary-blue' },
                { icon: Mail, title: 'Email Us', detail: 'info@swayamfin.com', detail2: 'support@swayamfin.com', color: 'bg-indigo-50 text-indigo-600' },
                { icon: MessageSquare, title: 'WhatsApp', detail: 'Chat with an Expert', detail2: '+91 87009 65592', color: 'bg-green-50 text-green-600' },
                { icon: Clock, title: 'Office Hours', detail: 'Mon - Sat', detail2: '09:00 AM - 07:00 PM', color: 'bg-orange-50 text-orange-600' }
              ].map((item, i) => (
                <motion.div 
                  key={i} 
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="bg-white p-6 rounded-3xl shadow-fintech border border-slate-100 flex flex-col items-center text-center"
                >
                  <div className={`w-12 h-12 ${item.color} rounded-2xl flex items-center justify-center mb-4`}>
                    <item.icon className="w-6 h-6" />
                  </div>
                  <h3 className="font-bold text-slate-900 mb-2">{item.title}</h3>
                  <p className="text-slate-600 text-sm font-medium">{item.detail}</p>
                  <p className="text-slate-400 text-sm italic">{item.detail2}</p>
                </motion.div>
              ))}
            </div>

            <div className="bg-primary-darkBlue text-white p-10 rounded-[40px] shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary-blue opacity-20 rounded-full translate-x-1/2 -translate-y-1/2" />
              <div className="relative z-10">
                <div className="flex items-center gap-4 mb-6">
                  <div className="bg-white/10 p-3 rounded-2xl">
                    <MapPin className="w-6 h-6" />
                  </div>
                  <h3 className="text-2xl font-bold">Registered Office</h3>
                </div>
                <p className="text-blue-100 text-lg leading-relaxed italic mb-4 pr-10">
                  619, Somdutt Chambers II, Bhikaji Cama, New Delhi – 110066
                </p>
                <div className="w-full h-40 bg-slate-200/20 rounded-2xl mt-8 overflow-hidden">
                  {/* Placeholder for real map embed */}
                  <div className="w-full h-full flex items-center justify-center text-blue-200 font-medium">
                    Google Maps Interface Initialized
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-white p-8 md:p-12 rounded-[40px] shadow-fintech border border-slate-100"
          >
            <h2 className="text-2xl font-bold text-slate-900 mb-8 flex items-center gap-3">
               <Send className="w-6 h-6 text-primary-blue" />
               Send a Direct Message
            </h2>
            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700 ml-1">Full Name</label>
                  <input type="text" className="w-full px-5 py-4 bg-slate-50 border-2 border-transparent focus:border-primary-blue focus:bg-white rounded-2xl transition-all outline-none font-medium" placeholder="E.g. Rahul Sharma" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700 ml-1">Phone Number</label>
                  <input type="tel" className="w-full px-5 py-4 bg-slate-50 border-2 border-transparent focus:border-primary-blue focus:bg-white rounded-2xl transition-all outline-none font-medium" placeholder="+91 00000 00000" />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700 ml-1">City</label>
                <input type="text" className="w-full px-5 py-4 bg-slate-50 border-2 border-transparent focus:border-primary-blue focus:bg-white rounded-2xl transition-all outline-none font-medium" placeholder="Enter your city" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700 ml-1">Message / Requirements</label>
                <textarea rows="4" className="w-full px-5 py-4 bg-slate-50 border-2 border-transparent focus:border-primary-blue focus:bg-white rounded-2xl transition-all outline-none font-medium resize-none" placeholder="Tell us about your loan requirement..."></textarea>
              </div>
              <button className="w-full bg-primary-blue hover:bg-primary-darkBlue text-white font-extrabold py-5 rounded-2xl shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                Send Query Now
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
