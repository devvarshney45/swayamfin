import React from 'react';
import { useParams, Link } from 'react-router-dom';

const getAllPosts = () => {
  const defaultPosts = JSON.parse(require('./Blog').default.replace ? '[]' : '[]');
  // Instead of importing, read localStorage + known defaults via sibling Blog page
  try {
    const STORAGE_KEY = 'swayamfin_blogs';
    const old = localStorage.getItem('swayamfin_local_blogs');
    if (old && !localStorage.getItem(STORAGE_KEY)) localStorage.setItem(STORAGE_KEY, old);
    const local = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
    const defaults = window.__SWAYAMFIN_DEFAULT_BLOGS || [];
    return [...local, ...defaults];
  } catch (e) {
    return window.__SWAYAMFIN_DEFAULT_BLOGS || [];
  }
};

const BlogPost = () => {
  const { slug } = useParams();
  const all = getAllPosts();
  const post = all.find(p => p.slug === slug);

  if (!post) {
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
        <img src={post.thumbnail} alt={post.title} className="w-full h-64 object-cover rounded-lg mb-8" />
        <div className="text-slate-400 text-sm uppercase tracking-widest mb-2">{post.category} • {post.date}</div>
        <h1 className="text-4xl font-black text-[#1E293B] mb-6">{post.title}</h1>
        <div className="prose max-w-none text-slate-700">
          {post.content ? (
            <div dangerouslySetInnerHTML={{ __html: post.content }} />
          ) : (
            <p className="italic">Full article content is not available for this demo.</p>
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
