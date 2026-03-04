import { useState } from 'react';
import { motion } from 'framer-motion';
import { FiMail, FiPhone, FiMapPin, FiClock, FiSend, FiMessageSquare, FiHelpCircle, FiAlertCircle } from 'react-icons/fi';

const contactInfo = [
    { icon: FiPhone, label: 'Phone', value: '+91 33 2200 0000', sub: 'Mon–Sat, 8am–8pm IST' },
    { icon: FiMail, label: 'Email', value: 'support@traingo.in', sub: 'We reply within 24 hours' },
    { icon: FiMapPin, label: 'Office', value: 'Fairlie Place, Kolkata 700001', sub: 'West Bengal, India' },
    { icon: FiClock, label: 'Hours', value: '8:00 AM – 8:00 PM', sub: 'Monday to Saturday' },
];

const categories = ['General Inquiry', 'Booking Issue', 'Refund Request', 'Technical Support', 'Feedback', 'Other'];

export default function Contact() {
    const [form, setForm] = useState({ name: '', email: '', category: 'General Inquiry', message: '' });
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!form.name.trim() || !form.email.trim() || !form.message.trim()) return;
        setSubmitted(true);
    };

    if (submitted) {
        return (
            <div className="min-h-screen flex items-center justify-center py-12">
                <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="card p-8 text-center max-w-md">
                    <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', stiffness: 200, delay: 0.1 }} className="w-16 h-16 mx-auto mb-4 rounded-full bg-green-500/20 flex items-center justify-center">
                        <FiSend className="w-7 h-7 text-green-400" />
                    </motion.div>
                    <h2 className="text-xl font-bold text-white mb-2">Message Sent!</h2>
                    <p className="text-sm text-gray-500 mb-6">Thank you for reaching out. We'll get back to you within 24 hours.</p>
                    <button onClick={() => { setSubmitted(false); setForm({ name: '', email: '', category: 'General Inquiry', message: '' }); }} className="btn-ghost text-sm">
                        Send Another Message
                    </button>
                </motion.div>
            </div>
        );
    }

    return (
        <div className="min-h-screen pt-4">
            <div className="grid lg:grid-cols-3 gap-6">
                {/* Contact Info */}
                <div className="lg:col-span-1 space-y-4">
                    <div className="card p-5">
                        <h3 className="text-sm font-semibold text-white mb-4">Contact Information</h3>
                        <div className="space-y-4">
                            {contactInfo.map(({ icon: Icon, label, value, sub }) => (
                                <div key={label} className="flex items-start space-x-3">
                                    <div className="w-9 h-9 rounded-lg bg-primary-500/10 flex items-center justify-center flex-shrink-0">
                                        <Icon className="w-4 h-4 text-primary-400" />
                                    </div>
                                    <div>
                                        <div className="text-sm font-medium text-white">{value}</div>
                                        <div className="text-xs text-gray-600">{sub}</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="card p-5">
                        <h3 className="text-sm font-semibold text-white mb-3">Quick Links</h3>
                        <div className="space-y-2">
                            {[
                                { icon: FiHelpCircle, label: 'FAQs', href: '/faq' },
                                { icon: FiMessageSquare, label: 'Help Center', href: '/help' },
                                { icon: FiAlertCircle, label: 'Report an Issue', href: '#' },
                            ].map(({ icon: Icon, label, href }) => (
                                <a key={label} href={href} className="flex items-center space-x-3 p-2 rounded-lg hover:bg-white/[0.04] transition-colors group">
                                    <Icon className="w-4 h-4 text-gray-600 group-hover:text-primary-400" />
                                    <span className="text-sm text-gray-400 group-hover:text-white">{label}</span>
                                </a>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Contact Form */}
                <div className="lg:col-span-2">
                    <form onSubmit={handleSubmit} className="card p-6">
                        <h3 className="text-lg font-semibold text-white mb-1">Send a Message</h3>
                        <p className="text-sm text-gray-500 mb-6">We'll get back to you as soon as possible.</p>

                        <div className="space-y-4">
                            <div className="grid sm:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-xs text-gray-500 mb-1.5">Full Name *</label>
                                    <input type="text" value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} className="input-field w-full" placeholder="Your name" required />
                                </div>
                                <div>
                                    <label className="block text-xs text-gray-500 mb-1.5">Email *</label>
                                    <input type="email" value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} className="input-field w-full" placeholder="your@email.com" required />
                                </div>
                            </div>

                            <div>
                                <label className="block text-xs text-gray-500 mb-1.5">Category</label>
                                <select value={form.category} onChange={e => setForm(f => ({ ...f, category: e.target.value }))} className="input-field w-full">
                                    {categories.map(c => <option key={c} value={c}>{c}</option>)}
                                </select>
                            </div>

                            <div>
                                <label className="block text-xs text-gray-500 mb-1.5">Message *</label>
                                <textarea value={form.message} onChange={e => setForm(f => ({ ...f, message: e.target.value }))} rows={5} className="input-field w-full resize-none" placeholder="Describe your inquiry..." required />
                            </div>
                        </div>

                        <motion.button whileTap={{ scale: 0.95 }} type="submit" className="btn-primary w-full mt-5 py-3 flex items-center justify-center space-x-2">
                            <FiSend className="w-4 h-4" /><span>Send Message</span>
                        </motion.button>
                    </form>
                </div>
            </div>
        </div>
    );
}
