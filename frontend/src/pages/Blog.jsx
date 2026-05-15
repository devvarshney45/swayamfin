import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const STORAGE_KEY = 'swayamfin_blogs';

const loadStoredPosts = () => {
  try {
    const current = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
    const old = JSON.parse(localStorage.getItem('swayamfin_local_blogs') || '[]');
    const merged = [...old, ...current].filter((item, index, array) => array.findIndex(a => a.id === item.id) === index);
    if (old.length > 0 && current.length === 0) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(merged));
    }
    return merged;
  } catch (e) {
    return [];
  }
};

const Blog = () => {
  const posts = loadStoredPosts();

  return (
    <div className="bg-[#F8FAFC] min-h-screen pt-32 pb-40 font-plus-jakarta-sans overflow-hidden">
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-[#0EA5E9]/5 blur-[160px] rounded-full translate-x-1/2 -translate-y-1/2" />
      <div className="max-w-7xl mx-auto px-6 relative z-10">
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
            <input placeholder="Search Repository..." className="input-standard w-full h-16 rounded-[28px] px-8 text-sm" />
            <span className="absolute right-8 top-1/2 -translate-y-1/2 text-slate-300 font-black text-xs">GO</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {posts.length > 0 ? (
            posts.map((post, i) => (
              <Link key={post.id} to={`/blog/${post.slug}`} className="group block bg-white rounded-[24px] border border-slate-100 shadow-sm hover:shadow-2xl transition-all h-full">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="p-6 flex flex-col h-full"
                >
                  <div className="flex-shrink-0 mb-4">
                    <img src={post.thumbnail} alt={post.title} className="w-full h-40 object-cover rounded-lg" />
                  </div>
                  <div className="space-y-3 flex-grow">
                    <div className="flex justify-between items-center">
                      <span className="bg-[#1E293B] text-white px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest leading-none">
                        {post.category}
                      </span>
                      <span className="text-[9px] text-slate-400 font-medium uppercase tracking-widest opacity-60">{post.date}</span>
                    </div>
                    <h2 className="text-lg md:text-2xl font-black text-[#1E293B] group-hover:text-[#0EA5E9] transition-all tracking-tight leading-snug h-16 overflow-hidden">
                      {post.title}
                    </h2>
                    {post.excerpt && <p className="text-slate-500 text-sm leading-relaxed mt-2">{post.excerpt}</p>}
                  </div>
                  <div className="mt-6 pt-4 border-t border-slate-50">
                    <div className="text-[11px] font-black text-[#1E293B] group-hover:text-[#0EA5E9] uppercase tracking-[0.3em] transition-all flex items-center justify-between">
                      Read Article <span>→</span>
                    </div>
                  </div>
                </motion.div>
              </Link>
            ))
          ) : (
            <div className="col-span-full rounded-[24px] border border-slate-100 bg-white p-16 text-center text-slate-600 shadow-sm">
              <h2 className="text-2xl font-black mb-4">No blog posts available yet.</h2>
              <p className="text-sm leading-relaxed">Create blog entries from the admin portal to publish them here.</p>
            </div>
          )}
        </div>

        <div className="mt-32 bg-[#1E293B] rounded-[64px] p-16 md:p-24 text-center text-white relative overflow-hidden ring-1 ring-white/10">
          <div className="absolute top-0 left-0 w-full h-full bg-[#0EA5E9]/5" />
          <div className="relative z-10 space-y-8">
            <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tighter leading-none">
              Stay Ahead of the <span className="text-[#0EA5E9] italic">Curve.</span>
            </h2>
            <p className="text-blue-100/60 mb-8 max-w-xl mx-auto font-medium italic text-lg leading-relaxed">
              "Synchronize with our institutional newsletter for direct updates on MSME lending and asset growth credit."
            </p>
            <div className="max-w-lg mx-auto flex flex-col sm:flex-row gap-4">
              <input placeholder="Officer Email" className="flex-1 bg-white/5 border border-white/10 rounded-[24px] px-8 py-5 outline-none focus:border-[#0EA5E9] font-black text-sm uppercase tracking-widest" />
              <button className="bg-white text-[#1E293B] px-10 py-5 rounded-[24px] font-black uppercase tracking-[0.4em] text-[10px] hover:bg-[#0EA5E9] hover:text-white transition-all shadow-2xl">
                JOIN
              </button>
            </div>
          </div>
          <div className="absolute -bottom-20 -right-20 w-80 h-80 bg-[#0EA5E9]/10 rounded-full blur-[120px]" />
        </div>
      </div>
    </div>
  );
};

export default Blog;
