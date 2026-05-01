import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const blogPosts = [
  {
    id: 1,
    title: "How to Improve Your CIBIL Score for Business Loans",
    category: "MSME Finance",
    date: "April 10, 2025",
    excerpt: "Learn the top 5 strategies to boost your creditworthiness and secure lower interest rates for your MSME.",
    slug: "improve-cibil-score"
  },
  {
    id: 2,
    title: "Understanding Micro LAP vs Regular LAP",
    category: "Loan Against Property",
    date: "April 5, 2025",
    excerpt: "Which one is right for your micro-business? We break down the eligibility and documentation differences.",
    slug: "micro-lap-vs-regular-lap"
  },
  {
    id: 3,
    title: "PMAY Benefits for Affordable Housing in 2025",
    category: "Housing Finance",
    date: "March 28, 2025",
    excerpt: "Everything you need to know about government subsidies for first-time home buyers in Tier 2 cities.",
    slug: "pmay-benefits-2025"
  }
];

const Blog = () => {
  return (
    <div className="bg-[#F8FAFC] min-h-screen pt-32 pb-40 font-plus-jakarta-sans overflow-hidden">
      
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-[#0EA5E9]/5 blur-[160px] rounded-full translate-x-1/2 -translate-y-1/2" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-24 gap-12">
          <div className="max-w-3xl space-y-6">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="inline-flex items-center gap-2 bg-[#0EA5E9]/10 text-[#0EA5E9] px-6 py-2 rounded-full text-[10px] font-black uppercase tracking-[0.4em]">
              Financial Intelligence Node
            </motion.div>
            <h1 className="text-5xl md:text-7xl font-black text-[#1E293B] uppercase tracking-tighter leading-none">
               Expert <span className="text-[#0EA5E9] italic">Insights.</span>
            </h1>
            <p className="text-lg md:text-xl text-slate-500 font-medium italic leading-relaxed opacity-80">
               "Empowering your financial trajectory with high-precision analytical resources and market intelligence."
            </p>
          </div>
          <div className="relative w-full md:w-80">
            <input 
              placeholder="Search Repository..." 
              className="input-standard w-full h-16 rounded-[28px] px-8 text-sm"
            />
            <span className="absolute right-8 top-1/2 -translate-y-1/2 text-slate-300 font-black text-xs">GO</span>
          </div>
        </div>

        {/* Blog Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {blogPosts.map((post, i) => (
            <motion.div 
              key={post.id}
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ delay: i * 0.1 }}
              className="group bg-white rounded-[56px] p-10 border border-slate-100 shadow-sm hover:shadow-2xl transition-all h-full flex flex-col"
            >
              <div className="space-y-6 flex-grow">
                 <div className="flex justify-between items-center">
                    <span className="bg-[#1E293B] text-white px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest leading-none">
                       {post.category}
                    </span>
                    <span className="text-[9px] text-slate-400 font-black uppercase tracking-widest opacity-60">{post.date}</span>
                 </div>
                 <h2 className="text-2xl font-black text-[#1E293B] group-hover:text-[#0EA5E9] transition-all uppercase tracking-tight leading-none h-16">
                    {post.title}
                 </h2>
                 <p className="text-slate-500 text-[11px] font-black uppercase tracking-widest leading-relaxed mt-4 italic">
                    "{post.excerpt}"
                 </p>
              </div>
              <div className="mt-12 pt-8 border-t border-slate-50">
                 <Link to={`/blog/${post.slug}`} className="text-[10px] font-black text-[#1E293B] hover:text-[#0EA5E9] uppercase tracking-[0.3em] transition-all flex items-center justify-between">
                    Retrieve Asset <span>→</span>
                 </Link>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Newsletter Capture */}
        <div className="mt-32 bg-[#1E293B] rounded-[64px] p-16 md:p-24 text-center text-white relative overflow-hidden ring-1 ring-white/10">
           <div className="absolute top-0 left-0 w-full h-full bg-[#0EA5E9]/5" />
           <div className="relative z-10 space-y-8">
              <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tighter leading-none">Stay Ahead of the <span className="text-[#0EA5E9] italic">Curve.</span></h2>
              <p className="text-blue-100/60 mb-8 max-w-xl mx-auto font-medium italic text-lg leading-relaxed">"Synchronize with our institutional newsletter for direct updates on MSME lending and asset growth credit."</p>
              <div className="max-w-lg mx-auto flex flex-col sm:flex-row gap-4">
                 <input placeholder="Officer Email" className="flex-1 bg-white/5 border border-white/10 rounded-[24px] px-8 py-5 outline-none focus:border-[#0EA5E9] font-black text-sm uppercase tracking-widest" />
                 <button className="bg-white text-[#1E293B] px-10 py-5 rounded-[24px] font-black uppercase tracking-[0.4em] text-[10px] hover:bg-[#0EA5E9] hover:text-white transition-all shadow-2xl">JOIN</button>
              </div>
           </div>
           {/* Abstract shape */}
           <div className="absolute -bottom-20 -right-20 w-80 h-80 bg-[#0EA5E9]/10 rounded-full blur-[120px]" />
        </div>

      </div>
    </div>
  );
};

export default Blog;
