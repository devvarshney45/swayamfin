import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const STORAGE_KEY = 'swayamfin_blogs';
const ADMIN_PASSWORD = 'swayamfin@admin';
const CATEGORIES = ['Loan on Property','Personal Loan','Wealth Services','Mutual Funds','Insurance','General'];

const uid = () => `blog_${Date.now()}`;

const readBlogs = () => {
  try { return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]'); } catch (e) { return []; }
};

const writeBlogs = (arr) => localStorage.setItem(STORAGE_KEY, JSON.stringify(arr));

const AdminBlogs = () => {
  const [authed, setAuthed] = useState(false);
  const [pass, setPass] = useState('');
  const [blogs, setBlogs] = useState([]);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({ title: '', tagline: '', category: CATEGORIES[0], date: new Date().toISOString().slice(0,10), thumbnail: '', content: '' });
  const navigate = useNavigate();

  useEffect(() => { if (authed) setBlogs(readBlogs()); }, [authed]);

  const login = (e) => {
    e.preventDefault();
    if (pass === ADMIN_PASSWORD) {
      setAuthed(true);
    } else alert('Incorrect password');
  };

  const openAdd = () => { setEditing(null); setForm({ title: '', tagline: '', category: CATEGORIES[0], date: new Date().toISOString().slice(0,10), thumbnail: '', content: '' }); };

  const handleFile = (e) => {
    const f = e.target.files[0];
    if (!f) return;
    const r = new FileReader();
    r.onload = () => setForm(prev => ({ ...prev, thumbnail: r.result }));
    r.readAsDataURL(f);
  };

  const save = (e) => {
    e.preventDefault();
    if (!form.title.trim() || !form.tagline.trim() || !form.content.trim()) { alert('Please fill required fields'); return; }
    const all = readBlogs();
    if (editing) {
      const updated = all.map(b => b.id === editing ? { ...b, ...form, updatedAt: Date.now() } : b);
      writeBlogs(updated); setBlogs(updated); setEditing(null);
    } else {
      const item = { id: uid(), createdAt: Date.now(), ...form };
      const updated = [item, ...all]; writeBlogs(updated); setBlogs(updated);
    }
    setForm({ title: '', tagline: '', category: CATEGORIES[0], date: new Date().toISOString().slice(0,10), thumbnail: '', content: '' });
  };

  const startEdit = (b) => { setEditing(b.id); setForm({ title: b.title, tagline: b.tagline || '', category: b.category || CATEGORIES[0], date: b.date || new Date().toISOString().slice(0,10), thumbnail: b.thumbnail || '', content: b.content || '' }); window.scrollTo(0,0); };

  const remove = (b) => {
    if (!confirm('Are you sure you want to delete this blog? This action cannot be undone.')) return;
    const updated = readBlogs().filter(x=>x.id!==b.id); writeBlogs(updated); setBlogs(updated);
  };

  if (!authed) {
    return (
      <div className="min-h-screen pt-32 flex items-center justify-center">
        <form onSubmit={login} className="bg-white p-8 rounded-lg shadow max-w-sm w-full">
          <h2 className="text-xl font-black mb-4">Admin Login</h2>
          <input type="password" placeholder="Password" value={pass} onChange={e=>setPass(e.target.value)} className="input-standard w-full mb-4" />
          <div className="flex gap-4">
            <button className="btn-primary">Enter</button>
            <button type="button" onClick={()=>navigate('/')} className="bg-slate-200 px-4 py-2 rounded">Home</button>
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
            <button onClick={()=>{setAuthed(false); setPass('');}} className="bg-slate-200 px-3 py-2 rounded">Logout</button>
          </div>
        </div>

        {/* form */}
        <div className="bg-white p-6 rounded-lg shadow mb-8">
          <form onSubmit={save} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input placeholder="Blog Title" value={form.title} onChange={e=>setForm({...form,title:e.target.value})} className="input-standard w-full" required />
              <select value={form.category} onChange={e=>setForm({...form,category:e.target.value})} className="input-standard w-full">
                {CATEGORIES.map(c=> <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
            <textarea placeholder="Tagline (max 150 chars)" maxLength={150} value={form.tagline} onChange={e=>setForm({...form,tagline:e.target.value})} className="input-standard w-full" required />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <input type="date" value={form.date} onChange={e=>setForm({...form,date:e.target.value})} className="input-standard" />
              <div className="col-span-2">
                <label className="block text-sm font-black mb-2">Thumbnail</label>
                <input type="file" accept="image/*" onChange={handleFile} />
                {form.thumbnail && <img src={form.thumbnail} alt="thumb" className="w-40 h-24 object-cover mt-2 rounded" />}
              </div>
            </div>
            <textarea placeholder="Blog content (HTML allowed)" value={form.content} onChange={e=>setForm({...form,content:e.target.value})} rows={8} className="input-standard w-full" required />
            <div className="flex gap-4">
              <button className="btn-primary">{editing ? 'Save Changes' : 'Publish Blog'}</button>
              <button type="button" onClick={()=>{setForm({ title: '', tagline: '', category: CATEGORIES[0], date: new Date().toISOString().slice(0,10), thumbnail: '', content: '' }); setEditing(null);}} className="bg-slate-200 px-4 py-2 rounded">Cancel</button>
            </div>
          </form>
        </div>

        {/* list */}
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
                <tr key={b.id} className="border-t">
                  <td className="p-3"><img src={b.thumbnail || 'https://source.unsplash.com/80x60/?news'} alt="t" className="w-20 h-12 object-cover rounded" /></td>
                  <td className="p-3 font-black">{b.title}</td>
                  <td className="p-3 text-sm text-slate-500">{b.tagline}</td>
                  <td className="p-3">{b.category}</td>
                  <td className="p-3">{b.date}</td>
                  <td className="p-3">
                    <div className="flex gap-2">
                      <button onClick={()=>startEdit(b)} className="bg-yellow-400 px-3 py-1 rounded text-black">Edit</button>
                      <button onClick={()=>remove(b)} className="bg-red-500 px-3 py-1 rounded text-white">Delete</button>
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
