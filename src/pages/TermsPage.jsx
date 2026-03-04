import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const fadeUp = { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 } };

export default function TermsPage() {
    return (
        <div className="container-section py-24 min-h-screen">
            <motion.div {...fadeUp} transition={{ duration: 0.5 }} className="max-w-3xl mx-auto">
                <Link to="/" className="text-sm text-primary-400 hover:text-primary-300 mb-8 inline-block">&larr; Back to Home</Link>

                <h1 className="heading-section text-4xl mb-4 text-white">Terms of Service</h1>
                <p className="text-gray-500 mb-12">Effective: February 2026</p>

                <div className="space-y-8 text-gray-300 leading-relaxed">
                    <section>
                        <h2 className="text-xl font-display font-semibold text-white mb-3">1. Acceptance of Terms</h2>
                        <p>By accessing and using WB TrainGo, you agree to be bound by these Terms of Service. If you do not agree, please do not use the platform.</p>
                    </section>

                    <section>
                        <h2 className="text-xl font-display font-semibold text-white mb-3">2. Platform Purpose</h2>
                        <p>WB TrainGo is a <strong className="text-white">demonstration and educational project</strong>. It does not facilitate actual railway bookings. All train data, schedules, and fares displayed are simulated and generated algorithmically.</p>
                    </section>

                    <section>
                        <h2 className="text-xl font-display font-semibold text-white mb-3">3. No Real Transactions</h2>
                        <p>No real monetary transactions occur on this platform. Payment simulations are for demonstration purposes only. No actual tickets are issued, and no real reservations are made with Indian Railways.</p>
                    </section>

                    <section>
                        <h2 className="text-xl font-display font-semibold text-white mb-3">4. User Responsibilities</h2>
                        <ul className="list-disc list-inside space-y-2 ml-4">
                            <li>Verify actual train schedules through official Indian Railways channels (IRCTC)</li>
                            <li>Do not rely on this platform for real travel planning</li>
                            <li>You are responsible for the accuracy of information you provide</li>
                            <li>Do not attempt to use generated tickets for actual travel</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-xl font-display font-semibold text-white mb-3">5. Intellectual Property</h2>
                        <p>The WB TrainGo platform, including its design, code architecture, and user interface, is an original creation. Station and route data is based on publicly available Indian Railways information.</p>
                    </section>

                    <section>
                        <h2 className="text-xl font-display font-semibold text-white mb-3">6. Limitation of Liability</h2>
                        <p>WB TrainGo is provided "as is" without warranties. We are not liable for any damages, losses, or inconvenience arising from the use of this platform. No refunds apply as no real transactions occur.</p>
                    </section>

                    <section>
                        <h2 className="text-xl font-display font-semibold text-white mb-3">7. Modifications</h2>
                        <p>We reserve the right to modify these terms at any time. Continued use after changes constitutes acceptance of the modified terms.</p>
                    </section>

                    <section>
                        <h2 className="text-xl font-display font-semibold text-white mb-3">8. Contact</h2>
                        <p>Questions about these terms? Visit our <Link to="/contact" className="text-primary-400 hover:underline">Contact page</Link>.</p>
                    </section>
                </div>
            </motion.div>
        </div>
    );
}
