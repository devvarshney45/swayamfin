import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { BookOpen, Calendar, User, ArrowRight, Search } from 'lucide-react';

const blogPosts = [
  {
    id: 1,
    title: "How to Improve Your CIBIL Score for Business Loans",
    category: "MSME Finance",
    date: "April 10, 2025",
    excerpt: "Learn the top 5 strategies to boost your creditworthiness and secure lower interest rates for your MSME.",
    image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&q=80&w=800",
    slug: "improve-cibil-score"
  },
  {
    id: 2,
    title: "Understanding Micro LAP vs Regular LAP",
    category: "Loan Against Property",
    date: "April 5, 2025",
    excerpt: "Which one is right for your micro-business? We break down the eligibility and documentation differences.",
    image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&q=80&w=800",
    slug: "micro-lap-vs-regular-lap"
  },
  {
    id: 3,
    title: "PMAY Benefits for Affordable Housing in 2025",
    category: "Housing Finance",
    date: "March 28, 2025",
    excerpt: "Everything you need to know about government subsidies for first-time home buyers in Tier 2 cities.",
    image: "https://images.unsplash.com/photo-1460317442991-0ec239397148?auto=format&fit=crop&q=80&w=800",
    slug: "pmay-benefits-2025"
  }
];

const Blog = () => {
  return (
    <div className="bg-slate-50 min-h-screen pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-4">
        
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
          <div className="max-w-2xl">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="inline-flex items-center gap-2 bg-blue-50 text-primary-blue px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-widest mb-4">
              <BookOpen className="w-4 h-4" /> Financial Knowledge Hub
            </motion.div>
            <h1 className="text-4xl md:text-5xl font-black text-slate-900 mb-6">Expert Insights & <span className="text-primary-blue">Resources</span></h1>
            <p className="text-lg text-slate-500 font-medium">Empowering your financial journey with the latest tips on MSME lending, property finance, and market trends.</p>
          </div>
          <div className="relative w-full md:w-80">
            <input 
              placeholder="Search guides..." 
              className="w-full pl-12 pr-4 py-4 bg-white rounded-2xl border border-slate-200 outline-none focus:border-primary-blue font-bold shadow-sm"
            />
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 w-5 h-5" />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {blogPosts.map((post, i) => (
            <motion.div 
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="group bg-white rounded-[40px] overflow-hidden shadow-sm border border-slate-100 flex flex-col hover:shadow-2xl hover:shadow-primary-blue/5 transition-all duration-500"
            >
              <div className="h-64 overflow-hidden relative">
                <img src={post.image} alt={post.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                <div className="absolute top-6 left-6 bg-white/90 backdrop-blur-md px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest text-primary-darkBlue">
                  {post.category}
                </div>
              </div>
              <div className="p-8 flex flex-col flex-grow">
                <div className="flex items-center gap-4 text-[10px] font-bold text-slate-400 uppercase mb-4">
                  <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5" /> {post.date}</span>
                  <span className="flex items-center gap-1"><User className="w-3.5 h-3.5" /> Admin</span>
                </div>
                <h2 className="text-xl font-black text-slate-900 mb-4 group-hover:text-primary-blue transition-colors leading-tight">
                  {post.title}
                </h2>
                <p className="text-slate-500 text-sm font-medium leading-relaxed mb-6">
                  {post.excerpt}
                </p>
                <div className="mt-auto pt-6 border-t border-slate-50">
                  <Link to={`/blog/${post.slug}`} className="inline-flex items-center gap-2 text-primary-blue font-black text-sm group/btn">
                    READ FULL ARTICLE <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-20 bg-primary-darkBlue rounded-[40px] p-12 text-center text-white relative overflow-hidden ring-1 ring-white/10">
           <div className="relative z-10">
              <h2 className="text-3xl font-bold mb-4">Stay Ahead in Finance</h2>
              <p className="text-blue-100 opacity-80 mb-8 max-w-lg mx-auto font-medium">Subscribe to our newsletter and receive the latest MSME loan updates directly in your inbox.</p>
              <div className="max-w-md mx-auto flex gap-2">
                 <input placeholder="Enter email" className="flex-1 bg-white/10 border border-white/20 rounded-xl px-5 py-3.5 outline-none focus:bg-white/20 font-bold" />
                 <button className="bg-primary-blue px-8 py-3.5 rounded-xl font-bold hover:bg-blue-400 transition shadow-lg shadow-primary-blue/20">JOIN</button>
              </div>
           </div>
           {/* Abstract shape */}
           <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-primary-blue/20 rounded-full blur-3xl" />
        </div>

      </div>
    </div>
  );
};

export default Blog;
