import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiSearch, FiBook, FiCreditCard, FiDownload, FiUser, FiSettings, FiHelpCircle, FiMail } from 'react-icons/fi';

const topics = [
    { icon: <FiSearch />, title: 'Searching Trains', desc: 'Use the Trains page to search by name, number, station, route, type, or district. Apply filters to narrow down results from 1,000+ trains.', color: 'text-primary-400' },
    { icon: <FiBook />, title: 'Booking Process', desc: 'Go to Booking, enter source and destination, select a train, choose seats from the interactive seat map, add passenger details, and confirm your booking.', color: 'text-emerald-400' },
    { icon: <FiCreditCard />, title: 'Payment', desc: 'Choose from UPI, Net Banking, or Card (simulated). Payment processing is instant. All transactions are for demonstration only.', color: 'text-amber-400' },
    { icon: <FiDownload />, title: 'Downloading Tickets', desc: 'After booking, visit My Tickets to view, download as PDF, or cancel your tickets. PDF tickets include all booking details and a QR code placeholder.', color: 'text-violet-400' },
    { icon: <FiUser />, title: 'Account Management', desc: 'Create an account from the Profile page. Your credentials, profile info, and booking history are stored locally. Edit your profile anytime.', color: 'text-cyan-400' },
    { icon: <FiSettings />, title: 'Settings & Preferences', desc: 'Access your account settings and preferences through the profile page.', color: 'text-rose-400' },
];

export default function HelpPage() {
    return (
        <div className="container-section py-24 min-h-screen">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
                <Link to="/" className="text-sm text-primary-400 hover:text-primary-300 mb-8 inline-block">&larr; Back to Home</Link>

                <div className="max-w-3xl mx-auto mb-12">
                    <h1 className="heading-section text-4xl mb-4 text-white">Help Center</h1>
                    <p className="text-gray-500">Get the most out of WB TrainGo. Find guides and tips for every feature.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
                    {topics.map((topic, i) => (
                        <motion.div
                            key={topic.title}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.08 }}
                            className="card p-6 group hover:border-primary-500/20"
                        >
                            <div className={`text-2xl mb-4 ${topic.color}`}>{topic.icon}</div>
                            <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-primary-400 transition-colors">{topic.title}</h3>
                            <p className="text-sm text-gray-400 leading-relaxed">{topic.desc}</p>
                        </motion.div>
                    ))}
                </div>

                {/* Quick tips */}
                <div className="max-w-3xl mx-auto mt-16">
                    <h2 className="text-xl font-display font-semibold text-white mb-6">Quick Tips</h2>
                    <div className="card p-6 space-y-4">
                        {[
                            'Express and Superfast train cards have a flip animation — hover to see full route details.',
                            'Use the seat map to choose between General, Sleeper, and AC coaches with different fare tiers.',
                            'All train data regenerates from a seed, so results are consistent across sessions.',
                            'Download PDF tickets for a professional e-ticket with QR code placeholder.',
                            'Clear browser localStorage to reset all data and start fresh.',
                        ].map((tip, i) => (
                            <div key={i} className="flex items-start space-x-3">
                                <span className="text-primary-400 mt-0.5">&#x2713;</span>
                                <span className="text-sm text-gray-300">{tip}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Contact CTA */}
                <div className="max-w-3xl mx-auto mt-12 text-center card p-8">
                    <FiHelpCircle className="w-8 h-8 text-primary-400 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-white mb-2">Need More Help?</h3>
                    <p className="text-sm text-gray-400 mb-6">Our team is here to assist you with any questions.</p>
                    <div className="flex items-center justify-center space-x-4">
                        <Link to="/contact" className="btn-primary text-sm flex items-center space-x-2">
                            <FiMail className="w-4 h-4" />
                            <span>Contact Us</span>
                        </Link>
                        <Link to="/faq" className="btn-secondary text-sm">View FAQs</Link>
                    </div>
                </div>
            </motion.div>
        </div>
    );
}
