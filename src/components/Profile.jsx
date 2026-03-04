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
            <div className="flex min-h-[70vh] rounded-3xl overflow-hidden glass border border-white/[0.05] shadow-2xl">
                {/* Left Side: Video */}
                <div className="hidden lg:block w-1/2 relative overflow-hidden group">
                    <video
                        autoPlay
                        loop
                        muted
                        playsInline
                        className="absolute inset-0 w-full h-full object-cover grayscale-[0.2] contrast-[1.1]"
                    >
                        <source src="https://assets.mixkit.co/videos/preview/mixkit-train-passing-by-under-a-bridge-4447-large.mp4" type="video/mp4" />
                    </video>
                    <div className="absolute inset-0 bg-gradient-to-r from-surface-950/40 to-surface-950" />
                    <div className="absolute bottom-12 left-12 right-12">
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.5 }}
                        >
                            <h3 className="text-3xl font-display font-bold text-white mb-2">Track Your Journey</h3>
                            <p className="text-gray-300">Join thousands of travelers navigating West Bengal's railway network with precision and ease.</p>
                        </motion.div>
                    </div>
                </div>

                {/* Right Side: Form */}
                <div className="w-full lg:w-1/2 p-12 bg-surface-950/50 flex flex-col justify-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="w-full max-w-sm mx-auto"
                    >
                        <div className="text-center mb-8">
                            <div className="w-16 h-16 mx-auto rounded-2xl bg-primary-500/10 flex items-center justify-center mb-4 border border-primary-500/20 shadow-[0_0_20px_rgba(59,130,246,0.1)]">
                                <FiUser className="w-8 h-8 text-primary-400" />
                            </div>
                            <h2 className="text-3xl font-display font-bold text-white">{mode === 'login' ? 'Welcome Back' : 'Create Account'}</h2>
                            <p className="text-gray-500 mt-2">{mode === 'login' ? 'Sign in to access your bookings' : 'Start your seamless travel today'}</p>
                        </div>

                        <AnimatePresence mode="wait">
                            {error && (
                                <motion.div initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="mb-6 p-4 rounded-xl bg-red-500/10 text-red-400 text-sm border border-red-500/20 flex items-center gap-3">
                                    <FiX className="shrink-0" />
                                    {error}
                                </motion.div>
                            )}
                        </AnimatePresence>

                        <div className="space-y-4">
                            <div>
                                <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Username</label>
                                <input type="text" value={form.username} onChange={e => setForm(f => ({ ...f, username: e.target.value }))} className="input-field w-full py-3" placeholder="Enter username" />
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Password</label>
                                <input type="password" value={form.password} onChange={e => setForm(f => ({ ...f, password: e.target.value }))} className="input-field w-full py-3" placeholder="Enter password" onKeyDown={e => e.key === 'Enter' && (mode === 'login' ? handleLogin() : handleSignup())} />
                            </div>

                            <AnimatePresence>
                                {mode === 'signup' && (
                                    <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="space-y-4 overflow-hidden pt-2">
                                        <div>
                                            <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Full Name *</label>
                                            <input type="text" value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} className="input-field w-full py-3" placeholder="Your full name" />
                                        </div>
                                        <div className="grid grid-cols-2 gap-4">
                                            <div>
                                                <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Email</label>
                                                <input type="email" value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} className="input-field w-full py-3" placeholder="Email" />
                                            </div>
                                            <div>
                                                <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Phone</label>
                                                <input type="tel" value={form.phone} onChange={e => setForm(f => ({ ...f, phone: e.target.value }))} className="input-field w-full py-3" placeholder="Phone" />
                                            </div>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>

                        <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={mode === 'login' ? handleLogin : handleSignup}
                            className="btn-primary w-full mt-8 py-4 flex items-center justify-center space-x-3 text-lg font-bold"
                        >
                            {mode === 'login' ? <><FiLogIn className="w-5 h-5" /><span>Sign In</span></> : <><FiUserPlus className="w-5 h-5" /><span>Create Account</span></>}
                        </motion.button>

                        <p className="text-center text-gray-500 mt-6 pt-6 border-t border-white/[0.05]">
                            {mode === 'login' ? "Don't have an account?" : 'Already have an account?'}{' '}
                            <button onClick={() => { setMode(mode === 'login' ? 'signup' : 'login'); setError(''); }} className="text-primary-400 hover:text-primary-300 font-bold ml-1 transition-colors">
                                {mode === 'login' ? 'Join Now' : 'Sign In instead'}
                            </button>
                        </p>
                    </motion.div>
                </div>
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
