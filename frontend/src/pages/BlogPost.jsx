import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || (import.meta.env.PROD ? 'https://swayamfin.onrender.com' : 'http://localhost:5001');

const BlogPost = () => {
  const { slug } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const response = await axios.get(`${API_URL}/api/blogs/${slug}`);
        setPost(response.data.data);
      } catch (err) {
        console.error('Failed to fetch blog:', err);
        setError('Blog post not found or failed to load.');
      } finally {
        setLoading(false);
      }
    };

    fetchBlog();
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen pt-32 flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-[#0EA5E9]/20 border-t-[#0EA5E9] rounded-full animate-spin mx-auto mb-4" />
          <p className="text-slate-500 font-black text-sm uppercase tracking-widest">Loading article...</p>
        </div>
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="min-h-screen pt-32 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-black">Article not found</h2>
          <Link to="/blog" className="mt-4 inline-block btn-primary">Back to Blog</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-32 pb-20 bg-[#F8FAFC]">
      <div className="max-w-4xl mx-auto px-6">
        <img src={post.thumbnail || 'https://source.unsplash.com/960x640/?finance'} alt={post.title} className="w-full h-64 object-cover rounded-lg mb-8" />
        <div className="text-slate-400 text-sm uppercase tracking-widest mb-2">{post.category} • {post.date}</div>
        <h1 className="text-4xl font-black text-[#1E293B] mb-6">{post.title}</h1>
        <div className="prose max-w-none text-slate-700">
          {post.content ? (
            <div dangerouslySetInnerHTML={{ __html: post.content }} />
          ) : (
            <p className="italic">Full article content is not available for this blog post.</p>
          )}
        </div>
        <div className="mt-8">
          <Link to="/blog" className="btn-primary">Back to Blog</Link>
        </div>
      </div>
    </div>
  );
};

export default BlogPost;
