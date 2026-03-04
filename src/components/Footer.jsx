import React from 'react';
import { Link } from 'react-router-dom';
import { FaTrain } from 'react-icons/fa';

const quickLinks = [
    { to: '/', label: 'Home' },
    { to: '/trains', label: 'Trains' },
    { to: '/booking', label: 'Booking' },
    { to: '/tickets', label: 'My Tickets' },
    { to: '/profile', label: 'Profile' },
    { to: '/contact', label: 'Contact' },
];

const legal = [
    { to: '/privacy', label: 'Privacy Policy' },
    { to: '/terms', label: 'Terms of Service' },
    { to: '/faq', label: 'FAQs' },
    { to: '/help', label: 'Help Center' },
    { to: '/about', label: 'About Us' },
];

export default function Footer() {
    return (
        <footer className="relative mt-24 border-t border-white/[0.04]">
            <div className="bg-surface-950/90 backdrop-blur-xl">
                <div className="container-section py-16">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
                        {/* Brand */}
                        <div className="lg:col-span-1">
                            <Link to="/" className="flex items-center space-x-2.5 mb-4">
                                <div className="w-8 h-8 rounded-lg bg-primary-600 flex items-center justify-center">
                                    <FaTrain className="w-4 h-4 text-white" />
                                </div>
                                <span className="font-display font-bold text-lg text-white">TrainGo</span>
                            </Link>
                            <p className="text-sm text-gray-500 leading-relaxed mb-6 max-w-xs">
                                Your intelligent gateway to West Bengal's railway network. Explore,
                                compare, and book with confidence.
                            </p>
                            {/* Tricolor signature */}
                            <div className="flex items-center space-x-1">
                                <div className="w-8 h-0.5 rounded-full bg-saffron" />
                                <div className="w-8 h-0.5 rounded-full bg-white/80" />
                                <div className="w-8 h-0.5 rounded-full bg-indian-green" />
                            </div>
                        </div>

                        {/* Quick Links */}
                        <div>
                            <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">Navigation</h4>
                            <ul className="space-y-2.5">
                                {quickLinks.map((link) => (
                                    <li key={link.to}>
                                        <Link to={link.to} className="text-sm text-gray-500 hover:text-white transition-colors duration-200">
                                            {link.label}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Legal & Support */}
                        <div>
                            <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">Resources</h4>
                            <ul className="space-y-2.5">
                                {legal.map((link) => (
                                    <li key={link.to}>
                                        <Link to={link.to} className="text-sm text-gray-500 hover:text-white transition-colors duration-200">
                                            {link.label}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Contact / Newsletter */}
                        <div>
                            <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">Stay Updated</h4>
                            <p className="text-sm text-gray-500 mb-4">Get the latest updates on routes and features.</p>
                            <div className="flex space-x-2">
                                <input
                                    type="email"
                                    placeholder="your@email.com"
                                    className="flex-1 px-3 py-2 text-sm bg-surface-900/60 border border-white/[0.06] rounded-lg text-white placeholder-gray-600 focus:outline-none focus:border-primary-500/40"
                                />
                                <button className="px-4 py-2 text-sm font-medium bg-primary-600 hover:bg-primary-500 text-white rounded-lg transition-colors">
                                    Go
                                </button>
                            </div>
                            <div className="mt-6 flex items-center space-x-4">
                                <span className="text-xs text-gray-600">support@wbtraingo.in</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bottom bar */}
                <div className="border-t border-white/[0.04]">
                    <div className="container-section py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
                        <p className="text-xs text-gray-600">
                            &copy; {new Date().getFullYear()} TrainGo. Built for West Bengal railways.
                        </p>
                        <div className="flex items-center space-x-4 text-xs text-gray-600">
                            <Link to="/privacy" className="hover:text-gray-400 transition-colors">Privacy</Link>
                            <span>&middot;</span>
                            <Link to="/terms" className="hover:text-gray-400 transition-colors">Terms</Link>
                            <span>&middot;</span>
                            <Link to="/faq" className="hover:text-gray-400 transition-colors">FAQ</Link>
                        </div>
                    </div>
                </div>

                {/* Tricolor bottom edge */}
                <div className="tricolor-bar" />
            </div>
        </footer>
    );
}
