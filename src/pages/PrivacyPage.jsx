import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const fadeUp = { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 } };

export default function PrivacyPage() {
    return (
        <div className="container-section py-24 min-h-screen">
            <motion.div {...fadeUp} transition={{ duration: 0.5 }} className="max-w-3xl mx-auto">
                <Link to="/" className="text-sm text-primary-400 hover:text-primary-300 mb-8 inline-block">&larr; Back to Home</Link>

                <h1 className="heading-section text-4xl mb-4 text-white">Privacy Policy</h1>
                <p className="text-gray-500 mb-12">Last updated: February 2026</p>

                <div className="space-y-8 text-gray-300 leading-relaxed">
                    <section>
                        <h2 className="text-xl font-display font-semibold text-white mb-3">1. Introduction</h2>
                        <p>WB TrainGo ("we", "our", "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, and safeguard your information when you use our platform.</p>
                    </section>

                    <section>
                        <h2 className="text-xl font-display font-semibold text-white mb-3">2. Data Storage</h2>
                        <p>All user data — including profile information, booking history, and preferences — is stored <strong className="text-white">locally on your device</strong> using browser localStorage. We do not operate backend servers that collect or store your personal data.</p>
                    </section>

                    <section>
                        <h2 className="text-xl font-display font-semibold text-white mb-3">3. Information We Collect</h2>
                        <ul className="list-disc list-inside space-y-2 ml-4">
                            <li>Account information (username, email) — stored locally only</li>
                            <li>Booking details (train, seat, passenger info) — stored locally only</li>
                            <li>Theme and UI preferences — stored locally only</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-xl font-display font-semibold text-white mb-3">4. Third-Party Services</h2>
                        <p>We use Google Fonts for typography. No analytics, tracking pixels, or advertising services are used. No personal data is transmitted to any third party.</p>
                    </section>

                    <section>
                        <h2 className="text-xl font-display font-semibold text-white mb-3">5. Cookies & Tracking</h2>
                        <p>WB TrainGo does not use cookies, tracking technologies, or any form of cross-site tracking. Your browsing activity on this platform remains entirely private.</p>
                    </section>

                    <section>
                        <h2 className="text-xl font-display font-semibold text-white mb-3">6. Data Security</h2>
                        <p>Since all data resides in your browser's localStorage, data security is managed at the browser level. Clearing your browser data will remove all WB TrainGo information. We recommend not storing sensitive financial information.</p>
                    </section>

                    <section>
                        <h2 className="text-xl font-display font-semibold text-white mb-3">7. Your Rights</h2>
                        <p>You can delete all your data at any time by clearing your browser's localStorage. No request to us is needed since no server-side data exists.</p>
                    </section>

                    <section>
                        <h2 className="text-xl font-display font-semibold text-white mb-3">8. Changes to This Policy</h2>
                        <p>We may update this Privacy Policy from time to time. Any changes will be reflected on this page with an updated date.</p>
                    </section>

                    <section>
                        <h2 className="text-xl font-display font-semibold text-white mb-3">9. Contact</h2>
                        <p>For questions about this Privacy Policy, please visit our <Link to="/contact" className="text-primary-400 hover:underline">Contact page</Link>.</p>
                    </section>
                </div>
            </motion.div>
        </div>
    );
}
