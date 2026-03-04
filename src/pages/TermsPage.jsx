import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiCheckSquare, FiInfo, FiDollarSign, FiUser, FiCode, FiAlertTriangle, FiEdit, FiMail } from 'react-icons/fi';

const fadeUp = { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 } };

const terms = [
    {
        icon: <FiCheckSquare />,
        title: "1. Acceptance of Terms",
        content: "By accessing and using TrainGo, you agree to be bound by these Terms of Service. If you do not agree, please do not use the platform."
    },
    {
        icon: <FiInfo />,
        title: "2. Platform Purpose",
        content: "TrainGo is a demonstration and educational project. It does not facilitate actual railway bookings. All train data, schedules, and fares displayed are simulated and generated algorithmically."
    },
    {
        icon: <FiDollarSign />,
        title: "3. No Real Transactions",
        content: "No real monetary transactions occur on this platform. Payment simulations are for demonstration purposes only. No actual tickets are issued, and no real reservations are made with Indian Railways."
    },
    {
        icon: <FiUser />,
        title: "4. User Responsibilities",
        list: [
            "Verify actual train schedules through official channels (IRCTC)",
            "Do not rely on this platform for real travel planning",
            "You are responsible for the accuracy of information you provide",
            "Do not attempt to use generated tickets for actual travel"
        ]
    },
    {
        icon: <FiCode />,
        title: "5. Intellectual Property",
        content: "The TrainGo platform, including its design, code architecture, and user interface, is an original creation. Station and route data is based on publicly available Indian Railways information."
    },
    {
        icon: <FiAlertTriangle />,
        title: "6. Limitation of Liability",
        content: "TrainGo is provided \"as is\" without warranties. We are not liable for any damages, losses, or inconvenience arising from the use of this platform."
    },
    {
        icon: <FiEdit />,
        title: "7. Modifications",
        content: "We reserve the right to modify these terms at any time. Continued use after changes constitutes acceptance of the modified terms."
    },
    {
        icon: <FiMail />,
        title: "8. Contact",
        content: "Questions about these terms? Visit our Contact page.",
        link: "/contact"
    }
];

export default function TermsPage() {
    return (
        <div className="container-section py-24 min-h-screen">
            <motion.div {...fadeUp} transition={{ duration: 0.5 }} className="max-w-3xl mx-auto">
                <Link to="/" className="text-sm text-primary-400 hover:text-primary-300 mb-8 inline-block transition-transform hover:-translate-x-1">&larr; Back to Home</Link>

                <h1 className="heading-section text-4xl mb-4 text-white">Terms of Service</h1>
                <p className="text-gray-400 mb-12 italic">Effective: {new Date().toLocaleDateString()}</p>

                <div className="space-y-6">
                    {terms.map((term, idx) => (
                        <motion.section
                            key={idx}
                            whileHover={{ y: -4 }}
                            className="card p-6 border border-white/[0.04] hover:border-primary-500/30 transition-all group lg:p-8"
                        >
                            <div className="flex items-start gap-4">
                                <div className="w-10 h-10 rounded-xl bg-primary-500/10 flex items-center justify-center text-primary-400 shrink-0 group-hover:scale-110 transition-transform">
                                    {term.icon}
                                </div>
                                <div className="flex-1">
                                    <h2 className="text-xl font-display font-semibold text-white mb-3 group-hover:text-primary-400 transition-colors">
                                        {term.title}
                                    </h2>
                                    {term.content && (
                                        <p className="text-gray-400 leading-relaxed group-hover:text-gray-300 transition-colors">
                                            {term.content}
                                            {term.link && (
                                                <Link to={term.link} className="text-primary-400 hover:underline ml-1">page</Link>
                                            )}
                                        </p>
                                    )}
                                    {term.list && (
                                        <ul className="space-y-2 mt-3">
                                            {term.list.map((item, i) => (
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

