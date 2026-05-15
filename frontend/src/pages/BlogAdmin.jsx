import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const STORAGE_KEY = 'swayamfin_blogs';
const CATEGORIES = ['Loan on Property', 'Personal Loan', 'Wealth Services'];
const ADMIN_PASSWORD = 'swayamfinadmin';

const slugify = (s) => s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

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

  const handleFile = (e) => {
    const f = e.target.files[0];
    setError('');
    if (!f) return;
    if (f.size > 120000) {
      setError('Thumbnail is too large. Please upload an image smaller than 120KB.');
      e.target.value = null;
      return;
    }
    const reader = new FileReader();
    reader.onload = () => setForm(prev => ({ ...prev, thumbnail: reader.result }));
    reader.readAsDataURL(f);
  };

  const publish = (e) => {
    e.preventDefault();
    setError('');

    if (!form.title.trim() || !form.content.trim()) {
      setError('Title and content are required. Please fill in both fields before publishing.');
      return;
    }

    setLoading(true);
    const slug = slugify(form.title || Date.now().toString());
    const item = {
      id: `local-${Date.now()}`,
      title: form.title,
      category: form.category,
      date: form.date,
      thumbnail: form.thumbnail || '',
      content: form.content ? form.content.replace(/\n/g, '<br/>') : '',
      slug,
    };
    try {
      const existing = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
      existing.unshift(item);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(existing));
      setLoading(false);
      navigate('/blog');
    } catch (error) {
      console.error('Local storage write failed:', error);
      setError('Unable to save the blog post locally. The content may be too large for browser storage. Please reduce the image size or shorten your content.');
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
              <button type="button" onClick={()=>{localStorage.removeItem(STORAGE_KEY); alert('Cleared local blogs');}} className="bg-red-500 text-white px-4 py-2 rounded">Clear Local Blogs</button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default BlogAdmin;
