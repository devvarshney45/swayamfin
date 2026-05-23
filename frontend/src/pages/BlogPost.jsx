import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { Helmet } from 'react-helmet';

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

  // Generate SEO schema
  const seoSchema = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.title.substring(0, 150),
    image: post.thumbnail || 'https://source.unsplash.com/960x640/?finance',
    author: {
      '@type': 'Organization',
      name: 'SwayamFin'
    },
    datePublished: post.date,
    articleBody: post.content ? post.content.replace(/<[^>]*>/g, '') : ''
  };

  return (
    <>
      <Helmet>
        <script type="application/ld+json">{JSON.stringify(seoSchema)}</script>
        <meta name="description" content={post.title.substring(0, 150)} />
        <meta name="keywords" content={`${post.category}, finance, blog, ${post.title}`} />
        <meta property="og:title" content={post.title} />
        <meta property="og:description" content={post.title.substring(0, 150)} />
        <meta property="og:image" content={post.thumbnail || 'https://source.unsplash.com/960x640/?finance'} />
        <title>{post.title} | SwayamFin Blog</title>
      </Helmet>
      <div className="min-h-screen pt-32 pb-20 bg-[#F8FAFC]">
        <div className="max-w-4xl mx-auto px-6">
          <img src={post.thumbnail || 'https://source.unsplash.com/960x640/?finance'} alt={post.title} className="w-full h-64 object-cover rounded-lg mb-8" />
          <div className="text-slate-400 text-sm uppercase tracking-widest mb-2">{post.category} • {post.date}</div>
          <h1 className="text-4xl font-black text-[#1E293B] mb-6">{post.title}</h1>
          <style>{`
            .blog-content {
              font-size: 1.125rem;
              line-height: 1.75;
              color: #334155;
            }
            .blog-content h1 {
              font-size: 2.25rem;
              font-weight: 900;
              margin-top: 2rem;
              margin-bottom: 1rem;
              color: #1E293B;
            }
            .blog-content h2 {
              font-size: 1.875rem;
              font-weight: 800;
              margin-top: 1.5rem;
              margin-bottom: 0.75rem;
              color: #0EA5E9;
            }
            .blog-content h3 {
              font-size: 1.5rem;
              font-weight: 700;
              margin-top: 1.25rem;
              margin-bottom: 0.5rem;
              color: #1E293B;
            }
            .blog-content h4, .blog-content h5, .blog-content h6 {
              font-size: 1.25rem;
              font-weight: 600;
              margin-top: 1rem;
              margin-bottom: 0.5rem;
              color: #1E293B;
            }
            .blog-content p {
              margin-bottom: 1.5rem;
            }
            .blog-content ul, .blog-content ol {
              margin-left: 2rem;
              margin-bottom: 1.5rem;
            }
            .blog-content li {
              margin-bottom: 0.5rem;
            }
            .blog-content a {
              color: #0EA5E9;
              text-decoration: underline;
              font-weight: 600;
              transition: all 0.3s ease;
            }
            .blog-content a:hover {
              color: #0369A1;
              text-decoration: none;
            }
            .blog-content strong {
              font-weight: 700;
              color: #1E293B;
            }
            .blog-content em {
              font-style: italic;
              color: #475569;
            }
            .blog-content blockquote {
              border-left: 4px solid #0EA5E9;
              padding-left: 1.5rem;
              margin: 1.5rem 0;
              color: #475569;
              font-style: italic;
            }
            .blog-content code {
              background-color: #F1F5F9;
              color: #E11D48;
              padding: 0.25rem 0.5rem;
              border-radius: 0.25rem;
              font-family: 'Courier New', monospace;
            }
          `}</style>
          <div className="blog-content prose-lg max-w-none">
            {post.content ? (
              <div dangerouslySetInnerHTML={{ __html: post.content }} />
            ) : (
              <p className="italic">Full article content is not available for this blog post.</p>
            )}
          </div>
        <div className="mt-12 bg-white rounded-lg shadow p-8 max-w-xl mx-auto">
          <h2 className="text-2xl font-black mb-4">Submit a Review</h2>
          <ReviewForm blogId={post._id} />
        </div>
        <div className="mt-8">
          <Link to="/blog" className="btn-primary">Back to Blog</Link>
        </div>
      </div>
    </div>
    </>
  );
};



// ReviewForm component for submitting reviews
function ReviewForm({ blogId }) {
  const [name, setName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [message, setMessage] = React.useState('');
  const [loading, setLoading] = React.useState(false);
  const [success, setSuccess] = React.useState('');
  const [error, setError] = React.useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    if (!name.trim() || !email.trim() || !message.trim()) {
      setError('All fields are required.');
      return;
    }
    setLoading(true);
    try {
      await axios.post(`${API_URL}/api/reviews`, {
        name,
        email,
        message,
        blogId,
        type: 'blog-review'
      });
      setSuccess('Review submitted! Please check your email for OTP verification.');
      setName('');
      setEmail('');
      setMessage('');
    } catch (err) {
      setError('Failed to submit review. Please try again.');
    }
    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && <div className="text-red-600 text-sm font-bold">{error}</div>}
      {success && <div className="text-green-600 text-sm font-bold">{success}</div>}
      <input
        type="text"
        placeholder="Your Name"
        className="input-standard w-full"
        value={name}
        onChange={e => setName(e.target.value)}
      />
      <input
        type="email"
        placeholder="Your Email"
        className="input-standard w-full"
        value={email}
        onChange={e => setEmail(e.target.value)}
      />
      <textarea
        rows={4}
        placeholder="Your Review"
        className="input-standard w-full"
        value={message}
        onChange={e => setMessage(e.target.value)}
      />
      <button type="submit" className="btn-primary" disabled={loading}>
        {loading ? 'Submitting...' : 'Submit Review'}
      </button>
    </form>
  );
}

// Only one export default at the end
export default BlogPost;
