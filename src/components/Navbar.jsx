import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { FiMenu, FiX, FiUser } from 'react-icons/fi';

const navLinks = [
    { to: '/', label: 'Home' },
    { to: '/trains', label: 'Trains' },
    { to: '/booking', label: 'Booking' },
    { to: '/tickets', label: 'My Tickets' },
    { to: '/profile', label: 'Profile' },
    { to: '/contact', label: 'Contact' },
];

export default function Navbar() {
    const { isAuthenticated, user, getAvatar, logout } = useAuth();
    const [mobileOpen, setMobileOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const location = useLocation();

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener('scroll', onScroll, { passive: true });
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    useEffect(() => { setMobileOpen(false); }, [location]);

    const isActive = (to) => location.pathname === to;

    return (
        <nav
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled
                ? 'bg-surface-950/80 backdrop-blur-2xl border-b border-white/[0.06] shadow-lg shadow-black/10'
                : 'bg-transparent'
                }`}
        >
            {/* Tricolor signature — subtle thin bar */}
            <div className="tricolor-bar" />

            <div className="container-section">
                <div className="flex items-center justify-between h-16">
                    {/* Logo */}
                    <Link to="/" className="flex items-center space-x-2.5 group">
                        <div className="w-8 h-8 rounded-lg bg-primary-600 flex items-center justify-center">
                            <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
                            </svg>
                        </div>
                        <span className="font-display font-bold text-lg text-white group-hover:text-primary-400 transition-colors">
                            WB TrainGo
                        </span>
                    </Link>

                    {/* Desktop navigation */}
                    <div className="hidden md:flex items-center space-x-1">
                        {navLinks.map((link) => (
                            <Link
                                key={link.to}
                                to={link.to}
                                className={`relative px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${isActive(link.to) ? 'text-white' : 'text-gray-400 hover:text-white'
                                    }`}
                            >
                                {link.label}
                                {isActive(link.to) && (
                                    <motion.div
                                        layoutId="nav-active"
                                        className="absolute inset-0 bg-primary-500/10 border border-primary-500/20 rounded-lg"
                                        transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                                    />
                                )}
                            </Link>
                        ))}
                    </div>

                    {/* Right side */}
                    <div className="flex items-center space-x-3">
                        {/* User */}
                        {isAuthenticated ? (
                            <div className="hidden md:flex items-center space-x-2">
                                <Link
                                    to="/profile"
                                    className="flex items-center space-x-2 px-3 py-1.5 rounded-lg bg-white/[0.04] border border-white/[0.06] hover:border-primary-500/30 transition-all text-sm text-gray-300"
                                >
                                    <FiUser className="w-4 h-4" />
                                    <span>{user?.username}</span>
                                </Link>
                                <button
                                    onClick={logout}
                                    className="text-xs text-gray-500 hover:text-red-400 transition-colors px-2 py-1"
                                >
                                    Logout
                                </button>
                            </div>
                        ) : (
                            <Link to="/profile" className="hidden md:block btn-primary text-sm py-2 px-4">
                                Sign In
                            </Link>
                        )}

                        {/* Mobile toggle */}
                        <button
                            onClick={() => setMobileOpen(!mobileOpen)}
                            className="md:hidden p-2 rounded-lg text-gray-400 hover:text-white hover:bg-white/[0.06] transition-all"
                        >
                            {mobileOpen ? <FiX className="w-5 h-5" /> : <FiMenu className="w-5 h-5" />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile menu */}
            <AnimatePresence>
                {mobileOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="md:hidden bg-surface-950/95 backdrop-blur-2xl border-t border-white/[0.06]"
                    >
                        <div className="container-section py-4 space-y-1">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.to}
                                    to={link.to}
                                    className={`block px-4 py-3 rounded-lg text-sm font-medium transition-all ${isActive(link.to)
                                        ? 'bg-primary-500/10 text-white border border-primary-500/20'
                                        : 'text-gray-400 hover:text-white hover:bg-white/[0.04]'
                                        }`}
                                >
                                    {link.label}
                                </Link>
                            ))}
                            {isAuthenticated ? (
                                <div className="flex items-center justify-between px-4 py-3 mt-2 pt-3 border-t border-white/[0.06]">
                                    <span className="text-sm text-gray-400 flex items-center"><FiUser className="w-4 h-4 mr-1" /> {user?.username}</span>
                                    <button onClick={logout} className="text-xs text-red-400 px-3 py-1.5 rounded-lg border border-red-500/20">
                                        Logout
                                    </button>
                                </div>
                            ) : (
                                <Link to="/profile" className="block mt-2 text-center btn-primary text-sm py-3">
                                    Sign In
                                </Link>
                            )}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
}
