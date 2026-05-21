import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const CATEGORIES = ['Loan on Property', 'Personal Loan', 'Wealth Services'];
const ADMIN_PASSWORD = 'swayamfinadmin';
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5001';

const slugify = (s) => s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

const compressImage = (dataUrl, maxWidth = 800, maxHeight = 600, quality = 0.7) => {
  return new Promise((resolve) => {
    const img = new Image();
    img.src = dataUrl;
    img.onload = () => {
      const canvas = document.createElement('canvas');
      let { width, height } = img;
      if (width > maxWidth || height > maxHeight) {
        const ratio = Math.min(maxWidth / width, maxHeight / height);
        width *= ratio;
        height *= ratio;
      }
      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext('2d');
      ctx.drawImage(img, 0, 0, width, height);
      resolve(canvas.toDataURL('image/jpeg', quality));
    };
    img.onerror = () => resolve(dataUrl);
  });
};

const BlogAdmin = () => {
  const [authed, setAuthed] = useState(false);
  const [pass, setPass] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [form, setForm] = useState({ title: '', category: CATEGORIES[0], date: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }), thumbnail: '', content: '' });
  const navigate = useNavigate();

  const tryAuth = (e) => {
    e.preventDefault();
    setError('');
    if (pass === ADMIN_PASSWORD) setAuthed(true);
    else setError('Incorrect password');
  };

  const handleFile = async (e) => {
    const f = e.target.files[0];
    setError('');
    if (!f) return;
    
    if (f.size > 5242880) { // 5MB limit before compression
      setError('Image is too large (>5MB). Please choose a smaller image.');
      e.target.value = '';
      return;
    }

    const reader = new FileReader();
    reader.onload = async () => {
      try {
        const compressed = await compressImage(reader.result, 800, 600, 0.75);
        setForm(prev => ({ ...prev, thumbnail: compressed }));
      } catch (err) {
        setError('Failed to process image. Please try another file.');
      }
    };
    reader.onerror = () => setError('Failed to read image file.');
    reader.readAsDataURL(f);
  };

  const publish = async (e) => {
    e.preventDefault();
    setError('');

    if (!form.title.trim() || !form.content.trim()) {
      setError('Title and content are required. Please fill in both fields before publishing.');
      return;
    }

    setLoading(true);
    try {
      const token = localStorage.getItem('swayamfin_token');
      const payload = {
        title: form.title,
        tagline: form.title.substring(0, 150),
        category: form.category,
        date: form.date,
        thumbnail: form.thumbnail || '',
        content: form.content
      };

      await axios.post(`${API_URL}/api/blogs`, payload, {
        headers: { Authorization: `Bearer ${token}` }
      });

      setForm({ title: '', category: CATEGORIES[0], date: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }), thumbnail: '', content: '' });
      setLoading(false);
      navigate('/blog');
    } catch (error) {
      console.error('Blog upload failed:', error);
      setError(error?.response?.data?.message || 'Failed to publish blog. Please try again.');
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen pt-32 pb-20 bg-[#F8FAFC]">
      <div className="max-w-3xl mx-auto px-6">
        {!authed ? (
          <form onSubmit={tryAuth} className="bg-white p-8 rounded-lg shadow">
            <h2 className="text-xl font-black mb-4">Blog Uploader (Admin)</h2>
            <p className="text-sm text-slate-500 mb-4">Enter admin password to continue.</p>
            <input value={pass} onChange={e=>setPass(e.target.value)} placeholder="Password" type="password" className="input-standard w-full mb-4" />
            <div className="flex gap-4">
              <button className="btn-primary">Unlock</button>
            </div>
          </form>
        ) : (
          <form onSubmit={publish} className="bg-white p-8 rounded-lg shadow space-y-4">
            <h2 className="text-2xl font-black">Publish Blog</h2>
            {error && (
              <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                {error}
              </div>
            )}
            <input placeholder="Title" value={form.title} onChange={e => { setForm({...form, title: e.target.value}); setError(''); }} className="input-standard w-full" />
            <select value={form.category} onChange={e => { setForm({...form, category: e.target.value}); setError(''); }} className="input-standard w-full">
              {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
            <input value={form.date} onChange={e => { setForm({...form, date: e.target.value}); setError(''); }} className="input-standard w-full" />
            <div>
              <label className="block text-sm font-black mb-2">Thumbnail (optional)</label>
              <input type="file" accept="image/*" onChange={handleFile} />
              {form.thumbnail && <img src={form.thumbnail} alt="thumb" className="w-40 h-24 object-cover mt-2 rounded" />}
            </div>
            <textarea rows={8} value={form.content} onChange={e => { setForm({...form, content: e.target.value}); setError(''); }} placeholder="Blog content (HTML or plain text)" className="input-standard w-full" />
            <div className="flex items-center gap-4">
              <button type="submit" disabled={loading} className="btn-primary">{loading ? 'Publishing...' : 'Publish'}</button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default BlogAdmin;
