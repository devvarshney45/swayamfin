import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const ADMIN_PASSWORD = 'swayamfin@admin';
const CATEGORIES = ['Loan on Property','Personal Loan','Wealth Services','Mutual Funds','Insurance','General'];
const API_URL = import.meta.env.VITE_API_URL || (import.meta.env.PROD ? 'https://swayamfin.onrender.com' : 'http://localhost:5001');

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

const AdminBlogs = () => {
  const [authed, setAuthed] = useState(false);
  const [pass, setPass] = useState('');
  const [blogs, setBlogs] = useState([]);
  const [editing, setEditing] = useState(null);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ title: '', tagline: '', category: CATEGORIES[0], date: new Date().toISOString().slice(0,10), thumbnail: '', content: '' });
  const [saveError, setSaveError] = useState('');
  const [uploadError, setUploadError] = useState('');
  const navigate = useNavigate();

  const fetchBlogs = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('swayamfin_token');
      const response = await axios.get(`${API_URL}/api/blogs/admin/all`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setBlogs(response.data.data || []);
    } catch (err) {
      console.error('Failed to fetch blogs:', err);
      alert('Failed to load blogs from server');
    } finally {
      setLoading(false);
    }
  };

  const login = async (e) => {
    e.preventDefault();
    if (pass === ADMIN_PASSWORD) {
      setAuthed(true);
      await fetchBlogs();
    } else alert('Incorrect password');
  };

  const openAdd = () => {
    setEditing(null);
    setSaveError('');
    setUploadError('');
    setForm({ title: '', tagline: '', category: CATEGORIES[0], date: new Date().toISOString().slice(0,10), thumbnail: '', content: '' });
  };

  const handleFile = async (e) => {
    const f = e.target.files[0];
    if (!f) return;
    setUploadError('');

    if (f.size > 5242880) {
      setUploadError('Image is too large (>5MB). Please choose a smaller image.');
      e.target.value = '';
      return;
    }

    const reader = new FileReader();
    reader.onload = async () => {
      try {
        const compressed = await compressImage(reader.result, 800, 600, 0.75);
        setForm(prev => ({ ...prev, thumbnail: compressed }));
      } catch (err) {
        setUploadError('Failed to process image. Please try another file.');
      }
    };
    reader.onerror = () => setUploadError('Failed to read image file.');
    reader.readAsDataURL(f);
  };

  const save = async (e) => {
    e.preventDefault();
    setSaveError('');
    if (!form.title.trim() || !form.tagline.trim() || !form.content.trim()) {
      alert('Please fill required fields');
      return;
    }

    try {
      setLoading(true);
      const token = localStorage.getItem('swayamfin_token');
      const payload = { ...form };

      if (editing) {
        await axios.put(`${API_URL}/api/blogs/${editing}`, payload, {
          headers: { Authorization: `Bearer ${token}` }
        });
      } else {
        await axios.post(`${API_URL}/api/blogs`, payload, {
          headers: { Authorization: `Bearer ${token}` }
        });
      }

      setForm({ title: '', tagline: '', category: CATEGORIES[0], date: new Date().toISOString().slice(0,10), thumbnail: '', content: '' });
      setUploadError('');
      setEditing(null);
      await fetchBlogs();
    } catch (err) {
      console.error('Failed to save blog:', err);
      setSaveError(err?.response?.data?.message || 'Failed to save blog');
    } finally {
      setLoading(false);
    }
  };

  const startEdit = (b) => {
    setEditing(b._id);
    setForm({ title: b.title, tagline: b.tagline || '', category: b.category || CATEGORIES[0], date: b.date || new Date().toISOString().slice(0,10), thumbnail: b.thumbnail || '', content: b.content || '' });
    window.scrollTo(0,0);
  };

  const remove = async (b) => {
    if (!confirm('Are you sure you want to delete this blog? This action cannot be undone.')) return;
    try {
      const token = localStorage.getItem('swayamfin_token');
      await axios.delete(`${API_URL}/api/blogs/${b._id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      await fetchBlogs();
    } catch (err) {
      console.error('Failed to delete blog:', err);
      alert('Failed to delete blog');
    }
  };

  if (!authed) {
    return (
      <div className="min-h-screen pt-32 flex items-center justify-center">
        <form onSubmit={login} className="bg-white p-8 rounded-lg shadow max-w-sm w-full">
          <h2 className="text-xl font-black mb-4">Admin Login</h2>
          <input type="password" placeholder="Password" value={pass} onChange={e => setPass(e.target.value)} className="input-standard w-full mb-4" />
          <div className="flex gap-4">
            <button className="btn-primary">Enter</button>
            <button type="button" onClick={() => navigate('/')} className="bg-slate-200 px-4 py-2 rounded">Home</button>
          </div>
        </form>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-32 pb-20 bg-[#F8FAFC]">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-black">Blog Admin</h1>
          <div className="flex items-center gap-4">
            <button onClick={openAdd} className="btn-primary">Add New Blog</button>
            <button onClick={() => { setAuthed(false); setPass(''); }} className="bg-slate-200 px-3 py-2 rounded">Logout</button>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow mb-8">
          <form onSubmit={save} className="space-y-4">
            {saveError && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
                {saveError}
              </div>
            )}
            {uploadError && (
              <div className="bg-yellow-50 border border-yellow-200 text-yellow-700 px-4 py-3 rounded-lg text-sm">
                {uploadError}
              </div>
            )}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input placeholder="Blog Title" value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} className="input-standard w-full" required />
              <select value={form.category} onChange={e => setForm({ ...form, category: e.target.value })} className="input-standard w-full">
                {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
            <textarea placeholder="Tagline (max 150 chars)" maxLength={150} value={form.tagline} onChange={e => setForm({ ...form, tagline: e.target.value })} className="input-standard w-full" required />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <input type="date" value={form.date} onChange={e => setForm({ ...form, date: e.target.value })} className="input-standard" />
              <div className="col-span-2">
                <label className="block text-sm font-black mb-2">Thumbnail</label>
                <input type="file" accept="image/*" onChange={handleFile} />
                {form.thumbnail && <img src={form.thumbnail} alt="thumb" className="w-40 h-24 object-cover mt-2 rounded" />}
              </div>
            </div>
            <textarea placeholder="Blog content (HTML allowed)" value={form.content} onChange={e => setForm({ ...form, content: e.target.value })} rows={8} className="input-standard w-full" required />
            <div className="flex gap-4">
              <button type="submit" disabled={loading} className="btn-primary">{loading ? 'Saving...' : (editing ? 'Save Changes' : 'Publish Blog')}</button>
              <button type="button" onClick={() => { setForm({ title: '', tagline: '', category: CATEGORIES[0], date: new Date().toISOString().slice(0,10), thumbnail: '', content: '' }); setEditing(null); setSaveError(''); setUploadError(''); }} className="bg-slate-200 px-4 py-2 rounded">Cancel</button>
            </div>
          </form>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <table className="w-full table-auto">
            <thead>
              <tr className="text-left text-sm text-slate-500 uppercase tracking-widest">
                <th className="p-3">Thumbnail</th>
                <th className="p-3">Title</th>
                <th className="p-3">Tagline</th>
                <th className="p-3">Category</th>
                <th className="p-3">Date</th>
                <th className="p-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {blogs.length === 0 && (
                <tr><td colSpan={6} className="p-6 text-center">No blogs available</td></tr>
              )}
              {blogs.map(b => (
                <tr key={b._id} className="border-t">
                  <td className="p-3"><img src={b.thumbnail || 'https://source.unsplash.com/80x60/?news'} alt="t" className="w-20 h-12 object-cover rounded" onError={(e) => e.currentTarget.src = 'https://source.unsplash.com/80x60/?finance'} /></td>
                  <td className="p-3 font-black">{b.title}</td>
                  <td className="p-3 text-sm text-slate-500">{b.tagline}</td>
                  <td className="p-3">{b.category}</td>
                  <td className="p-3">{b.date}</td>
                  <td className="p-3">
                    <div className="flex gap-2">
                      <button onClick={() => startEdit(b)} className="bg-yellow-400 px-3 py-1 rounded text-black text-sm font-black">Edit</button>
                      <button onClick={() => remove(b)} className="bg-red-500 px-3 py-1 rounded text-white text-sm font-black">Delete</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminBlogs;
