import React from 'react';
import { motion } from 'framer-motion';
import { Phone, ArrowRight, Sparkles } from 'lucide-react';

const CTASection = () => {
  return (
    <section className="py-24 bg-white font-dmsans">
      <div className="max-w-7xl mx-auto px-4">
        <div className="relative rounded-[60px] overflow-hidden bg-primary-navy p-12 md:p-24 text-center">
          {/* Animated Background Gradient */}
          <div className="absolute inset-0 bg-gradient-to-br from-primary-navy via-indigo-950 to-primary-navy opacity-50"></div>
          
          <div className="relative z-10 max-w-3xl mx-auto space-y-10">
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              className="inline-flex items-center gap-3 px-6 py-2 rounded-full border border-primary-gold/30 bg-primary-gold/10 text-primary-gold text-xs font-black uppercase tracking-widest"
            >
              <Sparkles className="w-4 h-4" /> Ready to Scale your business?
            </motion.div>

            <h2 className="text-4xl md:text-6xl font-playfair font-black text-white leading-tight">
              Let’s Build Your <span className="text-primary-gold text-italic">Financial Future</span> Together
            </h2>

            <p className="text-xl text-slate-400 font-medium">
              Join 750+ businesses that have chosen Swayamfin for their capital needs. Get approved in as little as 48 hours.
            </p>

            <div className="flex flex-col sm:flex-row gap-6 justify-center pt-6">
              <button className="px-10 py-5 bg-primary-gold text-primary-navy font-black rounded-2xl hover:bg-white transition-all uppercase tracking-widest text-sm shadow-2xl shadow-primary-gold/20 flex items-center justify-center gap-3">
                Apply Now <ArrowRight className="w-5 h-5" />
              </button>
              <a 
                href="tel:+916397003690"
                className="px-10 py-5 bg-white/5 border border-white/10 text-white font-black rounded-2xl hover:bg-white/10 transition-all uppercase tracking-widest text-sm flex items-center justify-center gap-3"
              >
                <Phone className="w-5 h-5 text-primary-gold" /> Speak to Expert
              </a>
            </div>
          </div>

          {/* Abstract Shapes */}
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-primary-gold/10 rounded-full blur-[100px] -translate-x-1/2 translate-y-1/2"></div>
          <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-[120px] translate-x-1/2 -translate-y-1/2"></div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
