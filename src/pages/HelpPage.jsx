import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiSearch, FiBook, FiCreditCard, FiDownload, FiUser, FiSettings, FiHelpCircle, FiMail, FiCheckCircle, FiInfo } from 'react-icons/fi';

const topics = [
    { icon: <FiSearch />, title: 'Searching Trains', desc: 'Use the Trains page to search by name, number, station, route, type, or district. Apply filters to narrow down results from 1,000+ trains.', color: 'text-primary-400', bg: 'bg-primary-500/10' },
    { icon: <FiBook />, title: 'Booking Process', desc: 'Go to Booking, enter source and destination, select a train, choose seats from the interactive seat map, add passenger details, and confirm your booking.', color: 'text-emerald-400', bg: 'bg-emerald-500/10' },
    { icon: <FiCreditCard />, title: 'Payment', desc: 'Choose from UPI, Net Banking, or Card (simulated). Payment processing is instant. All transactions are for demonstration only.', color: 'text-amber-400', bg: 'bg-amber-500/10' },
    { icon: <FiDownload />, title: 'Downloading Tickets', desc: 'After booking, visit My Tickets to view, download as PDF, or cancel your tickets. PDF tickets include all booking details and a QR code placeholder.', color: 'text-violet-400', bg: 'bg-violet-500/10' },
    { icon: <FiUser />, title: 'Account Management', desc: 'Create an account from the Profile page. Your credentials, profile info, and booking history are stored locally. Edit your profile anytime.', color: 'text-cyan-400', bg: 'bg-cyan-500/10' },
    { icon: <FiSettings />, title: 'Settings & Preferences', desc: 'Access your account settings and preferences through the profile page.', color: 'text-rose-400', bg: 'bg-rose-500/10' },
];

export default function HelpPage() {
    return (
        <div className="container-section py-24 min-h-screen">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
                <Link to="/" className="text-sm text-primary-400 hover:text-primary-300 mb-8 inline-block transition-transform hover:-translate-x-1">&larr; Back to Home</Link>

                <div className="max-w-3xl mx-auto mb-16">
                    <h1 className="heading-section text-4xl mb-4 text-white">Help Center</h1>
                    <p className="text-gray-400 text-lg">Everything you need to know about the TrainGo platform.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
                    {topics.map((topic, i) => (
                        <motion.div
                            key={topic.title}
                            whileHover={{ y: -4, scale: 1.02 }}
                            className="card p-8 group border border-white/[0.04] hover:border-primary-500/20 transition-all"
                        >
                            <div className={`w-12 h-12 rounded-xl ${topic.bg} flex items-center justify-center ${topic.color} mb-6 group-hover:scale-110 transition-transform text-2xl`}>
                                {topic.icon}
                            </div>
                            <h3 className="text-xl font-display font-semibold text-white mb-3 group-hover:text-primary-400 transition-colors">{topic.title}</h3>
                            <p className="text-sm text-gray-400 leading-relaxed group-hover:text-gray-300 transition-colors">{topic.desc}</p>
                        </motion.div>
                    ))}
                </div>

                {/* Quick tips */}
                <div className="max-w-3xl mx-auto mt-20">
                    <h2 className="text-2xl font-display font-semibold text-white mb-8 flex items-center gap-3">
                        <FiInfo className="text-primary-400" />
                        Quick Tips
                    </h2>
                    <div className="card p-2 rounded-2xl overflow-hidden">
                        <div className="divide-y divide-white/[0.04]">
                            {[
                                'Click on train cards to see full route and stoppage details in a compact modal.',
                                'Use the seat map to choose between General, Sleeper, and AC coaches with different fares.',
                                'All train data generates from a seed, keeping results consistent across your sessions.',
                                'Download PDF tickets for a professional e-ticket format with QR code.',
                                'Clear browser localStorage to reset all data and start completely fresh.',
                            ].map((tip, i) => (
                                <div key={i} className="flex items-start gap-4 p-5 hover:bg-white/[0.02] transition-colors group">
                                    <FiCheckCircle className="text-primary-500 mt-1 shrink-0 group-hover:scale-125 transition-transform" />
                                    <span className="text-sm text-gray-300 group-hover:text-white transition-colors">{tip}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Contact CTA */}
                <motion.div
                    whileHover={{ scale: 1.01 }}
                    className="max-w-3xl mx-auto mt-16 text-center card p-10 bg-gradient-to-b from-white/[0.02] to-transparent border-white/[0.04]"
                >
                    <div className="w-16 h-16 rounded-full bg-primary-500/10 flex items-center justify-center text-primary-400 mx-auto mb-6">
                        <FiHelpCircle className="w-8 h-8" />
                    </div>
                    <h3 className="text-2xl font-display font-semibold text-white mb-3">Still have questions?</h3>
                    <p className="text-gray-400 mb-8 max-w-sm mx-auto">Our support simulations are standing by to assist you with any inquiries.</p>
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <Link to="/contact" className="btn-primary w-full sm:w-auto flex items-center justify-center gap-2 group px-8">
                            <FiMail className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                            <span>Contact Support</span>
                        </Link>
                        <Link to="/faq" className="btn-secondary w-full sm:w-auto px-8">
                            View FAQs
                        </Link>
                    </div>
                </motion.div>
            </motion.div >
        </div >
    );
}

