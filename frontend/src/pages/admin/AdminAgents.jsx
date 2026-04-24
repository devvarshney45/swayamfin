import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import AdminTabs from '../../components/admin/AdminTabs';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5001';

const AdminAgents = () => {
  const [users, setUsers] = useState([]);
  const [branches, setBranches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [formData, setFormData] = useState({ 
    full_name: '', 
    email: '', 
    password_hash: '', 
    phone: '',
    employee_code: '',
    branch_id: '', 
    role: 'sales_person' 
  });
  const [notification, setNotification] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);
      const token = localStorage.getItem('swayamfin_token');
      const headers = { Authorization: `Bearer ${token}` };
      const [usersRes, branchesRes] = await Promise.all([
        axios.get(`${API_URL}/api/users`, { headers }),
        axios.get(`${API_URL}/api/branches`, { headers })
      ]);
      setUsers(usersRes.data.data || []);
      setBranches(branchesRes.data.data || []);
    } catch (err) {
      console.error('Failed to fetch data');
      setError('Connection to security node failed.');
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (user) => {
    setEditMode(true);
    setEditingId(user._id);
    setFormData({
      full_name: user.full_name || '',
      email: user.email || '',
      password_hash: '',
      phone: user.phone || '',
      employee_code: user.employee_code || '',
      branch_id: user.branch_id?._id || '',
      role: user.role || 'sales_person'
    });
    setShowModal(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('swayamfin_token');
      const headers = { Authorization: `Bearer ${token}` };
      
      const payload = { ...formData };
      if (editMode && !payload.password_hash) {
        delete payload.password_hash;
      }

      if (editMode) {
        await axios.put(`${API_URL}/api/users/${editingId}`, payload, { headers });
        setNotification({ type: 'success', message: 'Clearance level updated.' });
      } else {
        await axios.post(`${API_URL}/api/users`, payload, { headers });
        setNotification({ type: 'success', message: 'New node onboarded.' });
      }
      
      setShowModal(false);
      setEditMode(false);
      setEditingId(null);
      setFormData({ 
        full_name: '', email: '', password_hash: '', phone: '', employee_code: '', branch_id: '', role: 'sales_person' 
      });
      fetchData();
      setTimeout(() => setNotification(null), 3000);
    } catch (err) {
      setNotification({ type: 'error', message: err.response?.data?.message || 'Access violation' });
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to revoke access for this node?')) return;
    try {
      const token = localStorage.getItem('swayamfin_token');
      await axios.delete(`${API_URL}/api/users/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setNotification({ type: 'success', message: 'Access revoked.' });
      fetchData();
      setTimeout(() => setNotification(null), 3000);
    } catch (err) {
      setNotification({ type: 'error', message: 'Termination failed.' });
    }
  };

  const filteredUsers = users.filter(u => 
    u.full_name?.toLowerCase().includes(searchTerm.toLowerCase()) || 
    u.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    u.role?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col items-center justify-center space-y-4">
       <div className="w-12 h-12 border-4 border-[#0EA5E9]/20 border-t-[#0EA5E9] rounded-full animate-spin" />
       <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.4em]">Checking Personnel Security...</p>
    </div>
  );

  if (error) return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center p-8 text-center space-y-6">
       <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center text-red-600 font-bold text-2xl">!</div>
       <div className="space-y-2">
         <h2 className="text-2xl font-black text-[#1E293B] uppercase tracking-tight">Access Restricted</h2>
         <p className="text-slate-500 text-sm font-medium italic max-w-md">{error}</p>
       </div>
       <button onClick={fetchData} className="btn-primary py-3 px-8 text-xs">Reconnect Security Hub</button>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-800 px-4 md:px-12 pt-24 md:pt-32 pb-32">
      <div className="max-w-7xl mx-auto">
        <AdminTabs />
        
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8 mb-16 px-2">
           <div>
              <div className="flex items-center gap-3 mb-4">
                 <div className="w-2 h-2 rounded-full bg-[#0EA5E9]" />
                 <span className="text-slate-400 text-[10px] font-black uppercase tracking-[0.4em]">Personnel Management Node</span>
              </div>
              <h1 className="text-4xl md:text-5xl font-black text-[#1E293B] uppercase tracking-tighter leading-none">
                 Team <span className="text-[#0EA5E9] italic">Directory.</span>
              </h1>
           </div>
           
           <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
              <div className="relative w-full sm:w-64">
                 <input 
                   type="text" 
                   placeholder="Filter Personnel..."
                   className="input-standard w-full h-14 rounded-2xl px-12"
                   value={searchTerm}
                   onChange={e => setSearchTerm(e.target.value)}
                 />
                 <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 text-xs font-black">S</span>
              </div>
              <button 
                onClick={() => {
                  setEditMode(false);
                  setFormData({ 
                    full_name: '', email: '', password_hash: '', phone: '', employee_code: '', branch_id: '', role: 'sales_person' 
                  });
                  setShowModal(true);
                }}
                className="btn-primary px-8 py-4 rounded-2xl text-[10px] uppercase tracking-widest shadow-2xl"
              >
                Onboard New Node
              </button>
           </div>
        </div>

        {/* Notifications */}
        <AnimatePresence>
          {notification && (
            <motion.div 
              initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
              className={`mb-8 p-6 rounded-[24px] text-[10px] font-black uppercase tracking-widest border shadow-xl ${notification.type === 'success' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' : 'bg-rose-50 text-rose-600 border-rose-100'}`}
            >
              {notification.message}
            </motion.div>
          )}
        </AnimatePresence>

        {/* User Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredUsers.map((u, i) => (
            <motion.div
              key={u._id}
              initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
              className="bg-white border border-slate-100 p-10 rounded-[48px] shadow-sm hover:shadow-2xl hover:border-[#0EA5E9]/30 transition-all flex flex-col justify-between group h-[400px]"
            >
              <div className="space-y-6">
                <div className="flex justify-between items-start">
                   <div className="w-14 h-14 bg-slate-50 border border-slate-100 rounded-2xl flex items-center justify-center font-black text-[#0EA5E9] group-hover:bg-[#0EA5E9] group-hover:text-white transition-all">
                      {u.full_name?.charAt(0)}
                   </div>
                   <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-all">
                      <button onClick={() => handleEdit(u)} className="p-2 transition-all hover:text-[#0EA5E9]">E</button>
                      <button onClick={() => handleDelete(u._id)} className="p-2 transition-all hover:text-rose-500">×</button>
                   </div>
                </div>
                <div>
                   <Link to={`/admin/agents/${u._id}`} className="group/link">
                      <h3 className="text-2xl font-black text-[#1E293B] uppercase tracking-tight truncate group-hover/link:text-[#0EA5E9] transition-all">{u.full_name}</h3>
                   </Link>
                   <p className="text-[10px] font-black text-[#0EA5E9] uppercase tracking-widest mt-2">{u.branch_id?.name || 'Central Hub'}</p>
                </div>
              </div>

              <div className="pt-8 border-t border-slate-100 space-y-4">
                 <div className="flex justify-between items-center text-[10px] font-bold text-slate-400 italic">
                    <span className="uppercase tracking-widest">Email Node</span>
                    <span className="text-[#1E293B] font-black not-italic">{u.email}</span>
                 </div>
                 <div className="flex justify-between items-center text-[10px] font-bold text-slate-400 italic">
                    <span className="uppercase tracking-widest">Access Level</span>
                    <span className="bg-slate-100 text-[#1E293B] px-3 py-1 rounded-full text-[9px] font-black uppercase shadow-inner">{u.role}</span>
                 </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Modal */}
        <AnimatePresence>
          {showModal && (
            <div className="fixed inset-0 flex items-center justify-center z-[100] px-6">
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 bg-[#1E293B]/90 backdrop-blur-3xl" onClick={() => setShowModal(false)} />
              <motion.div initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.95, opacity: 0 }} className="bg-white rounded-[60px] p-12 md:p-16 max-w-4xl w-full relative z-10 shadow-3xl overflow-hidden">
                 <div className="absolute top-0 right-0 w-64 h-64 bg-[#0EA5E9]/5 blur-[100px] rounded-full translate-x-1/2 -translate-y-1/2" />
                 
                 <div className="relative z-10 space-y-12">
                    <div className="text-center md:text-left">
                       <h2 className="text-4xl font-black text-[#1E293B] uppercase tracking-tighter leading-none">{editMode ? 'Modify Clearance' : 'Onboard Node'}</h2>
                       <p className="text-[#0EA5E9] text-[10px] font-black uppercase tracking-[0.4em] mt-2 italic">Infrastructure Credentials</p>
                    </div>

                    <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-8">
                       <InputGroup label="Full Legal Name" value={formData.full_name} onChange={v => setFormData({...formData, full_name: v})} />
                       <InputGroup label="Officer Email" value={formData.email} onChange={v => setFormData({...formData, email: v})} type="email" />
                       <InputGroup label="Communication Link" value={formData.phone} onChange={v => setFormData({...formData, phone: v})} />
                       <InputGroup label="Employee ID / Code" value={formData.employee_code} onChange={v => setFormData({...formData, employee_code: v})} />
                       
                       <SelectGroup label="Strategic Role" value={formData.role} onChange={v => setFormData({...formData, role: v})} options={[
                         {v: 'sales_person', l: 'Strategic Partner'},
                         {v: 'bsm', l: 'Hub Manager'},
                         {v: 'admin', l: 'Global Admin'}
                       ]} />
                       
                       <SelectGroup label="Deployment Hub" value={formData.branch_id} onChange={v => setFormData({...formData, branch_id: v})} options={[
                         {v: '', l: 'Select Hub Node'},
                         ...branches.map(b => ({v: b._id, l: b.name}))
                       ]} />

                       <div className="md:col-span-2">
                          <InputGroup label={editMode ? 'Security Overwrite (Blank to retain)' : 'Master Security Key'} value={formData.password_hash} onChange={v => setFormData({...formData, password_hash: v})} type="password" />
                       </div>

                       <div className="md:col-span-2 pt-6 flex gap-4">
                          <button type="button" onClick={() => setShowModal(false)} className="flex-1 py-5 bg-slate-50 text-slate-400 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-slate-100 transition-all">Abort</button>
                          <button type="submit" className="flex-[2] py-5 btn-primary rounded-2xl text-[10px] font-black uppercase tracking-[0.3em] shadow-2xl">Confirm Transmission</button>
                       </div>
                    </form>
                 </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

      </div>
    </div>
  );
};

const InputGroup = ({ label, value, onChange, type = 'text' }) => (
  <div className="space-y-2">
    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">{label}</label>
    <input type={type} className="input-standard w-full h-14 rounded-2xl px-6 text-sm" value={value} onChange={e => onChange(e.target.value)} required={type !== 'password'} />
  </div>
);

const SelectGroup = ({ label, value, onChange, options }) => (
  <div className="space-y-2">
    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">{label}</label>
    <select className="input-standard w-full h-14 rounded-2xl px-6 text-sm appearance-none cursor-pointer" value={value} onChange={e => onChange(e.target.value)}>
      {options.map(o => <option key={o.v} value={o.v}>{o.l}</option>)}
    </select>
  </div>
);

export default AdminAgents;
