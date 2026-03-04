import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiLock, FiDatabase, FiEye, FiGlobe, FiShield, FiUserCheck, FiRefreshCw, FiMail, FiSearch } from 'react-icons/fi';

const fadeUp = { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 } };

const sections = [
    {
        icon: <FiLock />,
        title: "1. Introduction",
        content: "TrainGo (\"we\", \"our\", \"us\") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, and safeguard your information when you use our platform."
    },
    {
        icon: <FiDatabase />,
        title: "2. Data Storage",
        content: "All user data — including profile information, booking history, and preferences — is stored locally on your device using browser localStorage. We do not operate backend servers that collect or store your personal data."
    },
    {
        icon: <FiSearch />,
        title: "3. Information We Collect",
        list: [
            "Account information (username, email) — stored locally only",
            "Booking details (train, seat, passenger info) — stored locally only",
            "Theme and UI preferences — stored locally only"
        ]
    },
    {
        icon: <FiGlobe />,
        title: "4. Third-Party Services",
        content: "We use Google Fonts for typography. No analytics, tracking pixels, or advertising services are used. No personal data is transmitted to any third party."
    },
    {
        icon: <FiEye />,
        title: "5. Cookies & Tracking",
        content: "TrainGo does not use cookies, tracking technologies, or any form of cross-site tracking. Your browsing activity on this platform remains entirely private."
    },
    {
        icon: <FiShield />,
        title: "6. Data Security",
        content: "Since all data resides in your browser's localStorage, data security is managed at the browser level. Clearing your browser data will remove all TrainGo information. We recommend not storing sensitive financial information."
    },
    {
        icon: <FiUserCheck />,
        title: "7. Your Rights",
        content: "You can delete all your data at any time by clearing your browser's localStorage. No request to us is needed since no server-side data exists."
    },
    {
        icon: <FiRefreshCw />,
        title: "8. Changes to This Policy",
        content: "We may update this Privacy Policy from time to time. Any changes will be reflected on this page with an updated date."
    },
    {
        icon: <FiMail />,
        title: "9. Contact",
        content: "For questions about this Privacy Policy, please visit our Contact page.",
        link: "/contact"
    }
];

export default function PrivacyPage() {
    return (
        <div className="container-section py-24 min-h-screen">
            <motion.div {...fadeUp} transition={{ duration: 0.5 }} className="max-w-3xl mx-auto">
                <Link to="/" className="text-sm text-primary-400 hover:text-primary-300 mb-8 inline-block transition-transform hover:-translate-x-1">&larr; Back to Home</Link>

                <h1 className="heading-section text-4xl mb-4 text-white">Privacy Policy</h1>
                <p className="text-gray-400 mb-12 italic">Last updated: {new Date().toLocaleDateString()}</p>

                <div className="space-y-6">
                    {sections.map((section, idx) => (
                        <motion.section
                            key={idx}
                            whileHover={{ y: -4 }}
                            className="card p-6 border border-white/[0.04] hover:border-primary-500/30 transition-all group lg:p-8"
                        >
                            <div className="flex items-start gap-4">
                                <div className="w-10 h-10 rounded-xl bg-primary-500/10 flex items-center justify-center text-primary-400 shrink-0 group-hover:scale-110 transition-transform">
                                    {section.icon}
                                </div>
                                <div className="flex-1">
                                    <h2 className="text-xl font-display font-semibold text-white mb-3 group-hover:text-primary-400 transition-colors">
                                        {section.title}
                                    </h2>
                                    {section.content && (
                                        <p className="text-gray-400 leading-relaxed group-hover:text-gray-300 transition-colors">
                                            {section.content}
                                            {section.link && (
                                                <Link to={section.link} className="text-primary-400 hover:underline ml-1">page</Link>
                                            )}
                                        </p>
                                    )}
                                    {section.list && (
                                        <ul className="space-y-2 mt-3">
                                            {section.list.map((item, i) => (
                                                <li key={i} className="flex items-center gap-2 text-sm text-gray-400 group-hover:text-gray-300">
                                                    <div className="w-1 h-1 rounded-full bg-primary-500" />
                                                    {item}
                                                </li>
                                            ))}
                                        </ul>
                                    )}
                                </div>
                            </div>
                        </motion.section>
                    ))}
                </div>
            </motion.div>
        </div>
    );
}

