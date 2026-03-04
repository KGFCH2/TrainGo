import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { FiUser, FiMail, FiPhone, FiCalendar, FiEdit3, FiLogOut, FiLogIn, FiUserPlus, FiCheck, FiX } from 'react-icons/fi';

export default function Profile() {
    const { user, isAuthenticated, login, signup, logout, updateProfile, getAvatar } = useAuth();
    const [mode, setMode] = useState('login');
    const [editing, setEditing] = useState(false);
    const [form, setForm] = useState({ username: '', password: '', name: '', email: '', phone: '', age: '', gender: 'male' });
    const [editForm, setEditForm] = useState({});
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleLogin = () => {
        setError('');
        if (!form.username.trim() || !form.password.trim()) { setError('Enter username and password'); return; }
        const res = login(form.username, form.password);
        if (!res.success) setError(res.message);
    };

    const handleSignup = () => {
        setError('');
        if (!form.username.trim() || !form.password.trim() || !form.name.trim()) { setError('Fill in all required fields'); return; }
        const res = signup(form);
        if (!res.success) setError(res.message);
        else setSuccess('Account created successfully!');
    };

    const handleUpdate = () => {
        updateProfile(editForm);
        setEditing(false);
        setSuccess('Profile updated');
        setTimeout(() => setSuccess(''), 3000);
    };

    const startEditing = () => {
        setEditForm({ name: user.name, email: user.email || '', phone: user.phone || '', age: user.age || '', gender: user.gender || 'male' });
        setEditing(true);
    };

    if (!isAuthenticated) {
        return (
            <div className="flex items-center justify-center py-8">
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="card p-8 w-full max-w-md">
                    <div className="text-center mb-6">
                        <div className="w-16 h-16 mx-auto rounded-full bg-primary-500/10 flex items-center justify-center mb-3">
                            <FiUser className="w-7 h-7 text-primary-400" />
                        </div>
                        <h2 className="text-xl font-bold text-white">{mode === 'login' ? 'Welcome Back' : 'Create Account'}</h2>
                        <p className="text-sm text-gray-500 mt-1">{mode === 'login' ? 'Sign in to your account' : 'Join WB TrainGo today'}</p>
                    </div>

                    <AnimatePresence mode="wait">
                        {error && (
                            <motion.div initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="mb-4 p-3 rounded-lg bg-red-500/10 text-red-400 text-sm border border-red-500/20">
                                {error}
                            </motion.div>
                        )}
                    </AnimatePresence>

                    <div className="space-y-3">
                        <div>
                            <label className="block text-xs text-gray-500 mb-1">Username</label>
                            <input type="text" value={form.username} onChange={e => setForm(f => ({ ...f, username: e.target.value }))} className="input-field w-full" placeholder="Enter username" />
                        </div>
                        <div>
                            <label className="block text-xs text-gray-500 mb-1">Password</label>
                            <input type="password" value={form.password} onChange={e => setForm(f => ({ ...f, password: e.target.value }))} className="input-field w-full" placeholder="Enter password" onKeyDown={e => e.key === 'Enter' && (mode === 'login' ? handleLogin() : handleSignup())} />
                        </div>

                        <AnimatePresence>
                            {mode === 'signup' && (
                                <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="space-y-3 overflow-hidden">
                                    <div>
                                        <label className="block text-xs text-gray-500 mb-1">Full Name *</label>
                                        <input type="text" value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} className="input-field w-full" placeholder="Your full name" />
                                    </div>
                                    <div className="grid grid-cols-2 gap-3">
                                        <div>
                                            <label className="block text-xs text-gray-500 mb-1">Email</label>
                                            <input type="email" value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} className="input-field w-full" placeholder="Email" />
                                        </div>
                                        <div>
                                            <label className="block text-xs text-gray-500 mb-1">Phone</label>
                                            <input type="tel" value={form.phone} onChange={e => setForm(f => ({ ...f, phone: e.target.value }))} className="input-field w-full" placeholder="Phone" />
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-2 gap-3">
                                        <div>
                                            <label className="block text-xs text-gray-500 mb-1">Age</label>
                                            <input type="number" value={form.age} onChange={e => setForm(f => ({ ...f, age: e.target.value }))} className="input-field w-full" placeholder="Age" />
                                        </div>
                                        <div>
                                            <label className="block text-xs text-gray-500 mb-1">Gender</label>
                                            <select value={form.gender} onChange={e => setForm(f => ({ ...f, gender: e.target.value }))} className="input-field w-full">
                                                <option value="male">Male</option>
                                                <option value="female">Female</option>
                                                <option value="other">Other</option>
                                            </select>
                                        </div>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>

                    <motion.button whileTap={{ scale: 0.95 }} onClick={mode === 'login' ? handleLogin : handleSignup} className="btn-primary w-full mt-5 py-3 flex items-center justify-center space-x-2">
                        {mode === 'login' ? <><FiLogIn className="w-4 h-4" /><span>Sign In</span></> : <><FiUserPlus className="w-4 h-4" /><span>Create Account</span></>}
                    </motion.button>

                    <p className="text-center text-sm text-gray-600 mt-4">
                        {mode === 'login' ? "Don't have an account?" : 'Already have an account?'}{' '}
                        <button onClick={() => { setMode(mode === 'login' ? 'signup' : 'login'); setError(''); }} className="text-primary-400 hover:text-primary-300 font-medium">
                            {mode === 'login' ? 'Sign up' : 'Sign in'}
                        </button>
                    </p>
                </motion.div>
            </div>
        );
    }

    return (
        <div className="min-h-screen pt-4 max-w-2xl mx-auto">
            <AnimatePresence>
                {success && (
                    <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="mb-4 p-3 rounded-lg bg-green-500/10 border border-green-500/20 text-green-400 text-sm">
                        {success}
                    </motion.div>
                )}
            </AnimatePresence>

            <div className="card p-6 mb-6">
                <div className="flex items-center space-x-4">
                    <div className="w-16 h-16 rounded-full bg-primary-500/10 flex items-center justify-center">
                        <FiUser className="w-8 h-8 text-primary-400" />
                    </div>
                    <div className="flex-1">
                        <h2 className="text-xl font-bold text-white">{user.name || user.username}</h2>
                        <p className="text-sm text-gray-500">@{user.username}</p>
                    </div>
                    <div className="flex space-x-2">
                        <motion.button whileTap={{ scale: 0.95 }} onClick={editing ? () => setEditing(false) : startEditing} className="btn-ghost p-2">
                            {editing ? <FiX className="w-5 h-5" /> : <FiEdit3 className="w-5 h-5" />}
                        </motion.button>
                        <motion.button whileTap={{ scale: 0.95 }} onClick={logout} className="btn-ghost p-2 text-red-400 hover:text-red-300 hover:bg-red-500/10">
                            <FiLogOut className="w-5 h-5" />
                        </motion.button>
                    </div>
                </div>
            </div>

            <AnimatePresence mode="wait">
                {editing ? (
                    <motion.div key="edit" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="card p-6">
                        <h3 className="text-sm font-semibold text-white mb-4">Edit Profile</h3>
                        <div className="space-y-3">
                            <div className="grid sm:grid-cols-2 gap-3">
                                <div>
                                    <label className="block text-xs text-gray-500 mb-1">Name</label>
                                    <input type="text" value={editForm.name} onChange={e => setEditForm(f => ({ ...f, name: e.target.value }))} className="input-field w-full" />
                                </div>
                                <div>
                                    <label className="block text-xs text-gray-500 mb-1">Email</label>
                                    <input type="email" value={editForm.email} onChange={e => setEditForm(f => ({ ...f, email: e.target.value }))} className="input-field w-full" />
                                </div>
                            </div>
                            <div className="grid grid-cols-3 gap-3">
                                <div>
                                    <label className="block text-xs text-gray-500 mb-1">Phone</label>
                                    <input type="tel" value={editForm.phone} onChange={e => setEditForm(f => ({ ...f, phone: e.target.value }))} className="input-field w-full" />
                                </div>
                                <div>
                                    <label className="block text-xs text-gray-500 mb-1">Age</label>
                                    <input type="number" value={editForm.age} onChange={e => setEditForm(f => ({ ...f, age: e.target.value }))} className="input-field w-full" />
                                </div>
                                <div>
                                    <label className="block text-xs text-gray-500 mb-1">Gender</label>
                                    <select value={editForm.gender} onChange={e => setEditForm(f => ({ ...f, gender: e.target.value }))} className="input-field w-full">
                                        <option value="male">Male</option>
                                        <option value="female">Female</option>
                                        <option value="other">Other</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                        <motion.button whileTap={{ scale: 0.95 }} onClick={handleUpdate} className="btn-primary mt-4 flex items-center space-x-2">
                            <FiCheck className="w-4 h-4" /><span>Save Changes</span>
                        </motion.button>
                    </motion.div>
                ) : (
                    <motion.div key="view" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="card p-6">
                        <h3 className="text-sm font-semibold text-white mb-4">Profile Details</h3>
                        <div className="grid sm:grid-cols-2 gap-y-4 gap-x-8">
                            <div className="flex items-center space-x-3"><FiUser className="w-4 h-4 text-gray-600" /><div><div className="text-[10px] uppercase tracking-wider text-gray-600">Name</div><div className="text-sm text-white">{user.name || '—'}</div></div></div>
                            <div className="flex items-center space-x-3"><FiMail className="w-4 h-4 text-gray-600" /><div><div className="text-[10px] uppercase tracking-wider text-gray-600">Email</div><div className="text-sm text-white">{user.email || '—'}</div></div></div>
                            <div className="flex items-center space-x-3"><FiPhone className="w-4 h-4 text-gray-600" /><div><div className="text-[10px] uppercase tracking-wider text-gray-600">Phone</div><div className="text-sm text-white">{user.phone || '—'}</div></div></div>
                            <div className="flex items-center space-x-3"><FiCalendar className="w-4 h-4 text-gray-600" /><div><div className="text-[10px] uppercase tracking-wider text-gray-600">Member Since</div><div className="text-sm text-white">{user.createdAt ? new Date(user.createdAt).toLocaleDateString('en-IN', { month: 'short', year: 'numeric' }) : '—'}</div></div></div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
