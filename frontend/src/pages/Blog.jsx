import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || (import.meta.env.PROD ? 'https://swayamfin.onrender.com' : 'http://localhost:5001');

const Blog = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await axios.get(`${API_URL}/api/blogs`);
        setPosts(response.data.data || []);
      } catch (err) {
        console.error('Failed to fetch blogs:', err);
        setError('Unable to load blogs. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen pt-32 pb-40 flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-[#0EA5E9]/20 border-t-[#0EA5E9] rounded-full animate-spin mx-auto mb-4" />
          <p className="text-slate-500 font-black text-sm uppercase tracking-widest">Loading blogs...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen pt-32 pb-40 flex items-center justify-center">
        <div className="text-center max-w-md">
          <h2 className="text-2xl font-black text-[#1E293B] mb-2">Unable to Load Blogs</h2>
          <p className="text-slate-500 text-sm">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#F8FAFC] min-h-screen pt-32 pb-40 font-plus-jakarta-sans overflow-hidden">
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-[#0EA5E9]/5 blur-[160px] rounded-full translate-x-1/2 -translate-y-1/2" />
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-end mb-24 gap-12">
          <div className="max-w-3xl space-y-6">

            <h1 className="text-5xl md:text-7xl font-black text-[#1E293B] uppercase tracking-tighter leading-none">
              Expert <span className="text-[#0EA5E9] italic">Insights.</span>
            </h1>
            <p className="text-lg md:text-xl text-slate-500 font-medium italic leading-relaxed opacity-80">
              "Stay informed with our latest market analysis, wealth management strategies, and industry perspectives."
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
              <Link key={post._id} to={`/blog/${post.slug}`} className="group block bg-white rounded-[24px] border border-slate-100 shadow-sm hover:shadow-2xl transition-all h-full">
                  <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="p-6 flex flex-col h-full"
                >
                  <div className="flex-shrink-0 mb-4 rounded-lg overflow-hidden w-full aspect-[4/3] bg-slate-100">
                    <img
                      src={post.thumbnail || 'https://source.unsplash.com/640x480/?finance'}
                      alt={post.title}
                      className="w-full h-full object-cover object-center"
                      style={{ display: 'block' }}
                    />
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
