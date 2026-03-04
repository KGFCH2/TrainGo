import React, { useState, useEffect, lazy, Suspense } from 'react';
import { Routes, Route, useLocation, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Toaster } from 'react-hot-toast';

import { ThemeProvider } from './context/ThemeContext';
import { AuthProvider } from './context/AuthContext';
import { BookingProvider } from './context/BookingContext';

import { generateAllTrains } from './data/generateTrains';

import { FiSearch, FiCheckCircle, FiDownload } from 'react-icons/fi';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Hero from './components/Hero';
import Loader from './components/Loader';

/* Lazy-loaded pages */
const TrainList = lazy(() => import('./components/TrainList'));
const BookingSection = lazy(() => import('./components/BookingSection'));
const MyTickets = lazy(() => import('./components/MyTickets'));
const Profile = lazy(() => import('./components/Profile'));
const Contact = lazy(() => import('./components/Contact'));
const PrivacyPage = lazy(() => import('./pages/PrivacyPage'));
const TermsPage = lazy(() => import('./pages/TermsPage'));
const FAQPage = lazy(() => import('./pages/FAQPage'));
const HelpPage = lazy(() => import('./pages/HelpPage'));
const AboutPage = lazy(() => import('./pages/AboutPage'));

/* ================================================
   Cinematic page transition variants
   ================================================ */
const pageTransition = {
    initial: { opacity: 0, y: 40, scale: 0.98, filter: 'blur(6px)' },
    animate: {
        opacity: 1, y: 0, scale: 1, filter: 'blur(0px)',
        transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
    },
    exit: {
        opacity: 0, y: -30, scale: 0.98, filter: 'blur(4px)',
        transition: { duration: 0.3, ease: [0.22, 1, 0.36, 1] },
    },
};

/* Loading fallback */
function PageLoader() {
    return (
        <div className="min-h-[60vh] flex items-center justify-center">
            <div className="flex flex-col items-center space-y-4">
                <div className="w-8 h-8 border-2 border-primary-500/30 border-t-primary-500 rounded-full animate-spin" />
                <span className="text-sm text-gray-500">Loading...</span>
            </div>
        </div>
    );
}

/* ================================================
   Home page with parallax sections
   ================================================ */
function HomePage({ trains }) {
    return (
        <>
            <Hero />

            {/* Features Section */}
            <section className="container-section py-12">
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-100px' }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-8"
                >
                    <h2 className="heading-section text-2xl sm:text-3xl text-white mb-2">Why TrainGo?</h2>
                    <p className="text-gray-400 text-sm max-w-xl mx-auto">
                        Built for the modern traveler. Every feature designed to simplify your journey.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {[
                        {
                            icon: <FiSearch className="w-8 h-8" />,
                            title: 'Intelligent Search',
                            desc: 'Find any train across West Bengal in milliseconds. Filter by type, district, station, or route.',
                        },
                        {
                            icon: <FiCheckCircle className="w-8 h-8" />,
                            title: 'Seamless Booking',
                            desc: 'Five-step guided booking with interactive seat maps, passenger management, and instant confirmation.',
                        },
                        {
                            icon: <FiDownload className="w-8 h-8" />,
                            title: 'PDF Tickets',
                            desc: 'Download professional e-tickets as PDF with complete booking details and QR code.',
                        },
                    ].map((feature, i) => (
                        <motion.div
                            key={feature.title}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: '-50px' }}
                            transition={{ delay: i * 0.15, duration: 0.5 }}
                            className="card p-6 group"
                        >
                            <div className="w-10 h-10 rounded-xl bg-primary-500/10 border border-primary-500/20 flex items-center justify-center text-primary-400 mb-4 group-hover:bg-primary-500/20 transition-colors">
                                {feature.icon}
                            </div>
                            <h3 className="text-base font-semibold text-white mb-1.5">{feature.title}</h3>
                            <p className="text-xs text-gray-400 leading-relaxed">{feature.desc}</p>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* How It Works */}
            <section className="container-section py-12 border-t border-white/[0.04]">
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-100px' }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-8"
                >
                    <h2 className="heading-section text-2xl sm:text-3xl text-white mb-2">How It Works</h2>
                    <p className="text-gray-400 text-sm max-w-xl mx-auto">Three simple steps to your next journey.</p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
                    {[
                        { step: '01', title: 'Search', desc: 'Enter your source and destination to discover available trains on the route.' },
                        { step: '02', title: 'Select & Book', desc: 'Choose your train, pick seats from the interactive map, and add passenger details.' },
                        { step: '03', title: 'Travel', desc: 'Download your e-ticket as PDF and you\'re all set for the journey.' },
                    ].map((item, i) => (
                        <motion.div
                            key={item.step}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.2, duration: 0.5 }}
                            className="text-center"
                        >
                            <div className="text-4xl font-display font-bold text-gradient mb-3">{item.step}</div>
                            <h3 className="text-base font-semibold text-white mb-1.5">{item.title}</h3>
                            <p className="text-xs text-gray-400">{item.desc}</p>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* CTA */}
            <section className="container-section py-12">
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="card p-8 sm:p-12 text-center bg-gradient-to-br from-primary-950/50 via-surface-900 to-surface-900 border-primary-500/10"
                >
                    <h2 className="heading-section text-2xl sm:text-3xl text-white mb-2">Ready to Explore?</h2>
                    <p className="text-gray-400 text-sm max-w-md mx-auto mb-6">
                        Browse {trains.length.toLocaleString()}+ trains across West Bengal's entire railway network.
                    </p>
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                        <Link to="/trains" className="btn-primary text-base px-6 py-3">Browse Trains</Link>
                        <Link to="/booking" className="btn-secondary text-base px-6 py-3">Book Now</Link>
                    </div>
                </motion.div>
            </section>
        </>
    );
}

/* ================================================
   Section wrapper for inner pages
   ================================================ */
function PageSection({ title, subtitle, children }) {
    return (
        <div className="relative min-h-[60vh]">
            {/* Section Background Image */}
            <div className="fixed inset-0 z-0 pointer-events-none opacity-10">
                <img
                    src="/hero-4.png"
                    alt="Section Background"
                    className="w-full h-full object-cover"
                />
            </div>

            <div className="relative z-10 container-section py-4 sm:py-8">
                {title && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4 }}
                        className="text-center mb-4"
                    >
                        <h1 className="heading-section text-xl sm:text-3xl text-white mb-1 tracking-wider">{title}</h1>
                        {subtitle && <p className="text-gray-400 max-w-xl mx-auto italic text-xs sm:text-sm">{subtitle}</p>}
                    </motion.div>
                )}
                {children}
            </div>
        </div>
    );
}

/* ================================================
   Scroll-to-top on route change
   ================================================ */
function ScrollToTop() {
    const location = useLocation();
    useEffect(() => { window.scrollTo({ top: 0, behavior: 'instant' }); }, [location.pathname]);
    return null;
}

/* ================================================
   App Content
   ================================================ */
function AppContent() {
    const [trains, setTrains] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showSplash, setShowSplash] = useState(true);
    const location = useLocation();

    useEffect(() => {
        try {
            setTrains(generateAllTrains());
        } catch (e) {
            console.error('Train generation failed:', e);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        const timer = setTimeout(() => setShowSplash(false), 2500);
        return () => clearTimeout(timer);
    }, []);

    if (loading || showSplash) {
        return <Loader />;
    }

    return (
        <div className="min-h-screen flex flex-col">
            <Navbar />
            <ScrollToTop />

            <main className="flex-1 pt-[calc(3px+4rem)]">
                <AnimatePresence mode="wait">
                    <motion.div key={location.pathname} {...pageTransition}>
                        <Suspense fallback={<PageLoader />}>
                            <Routes location={location}>
                                <Route path="/" element={<HomePage trains={trains} />} />
                                <Route path="/trains" element={
                                    <PageSection title="Explore Trains" subtitle={`Browse ${trains.length.toLocaleString()}+ trains across West Bengal`}>
                                        <TrainList trains={trains} />
                                    </PageSection>
                                } />
                                <Route path="/booking" element={
                                    <PageSection title="Book Your Journey" subtitle="Search, select, and book your train tickets">
                                        <BookingSection trains={trains} />
                                    </PageSection>
                                } />
                                <Route path="/tickets" element={
                                    <PageSection title="My Tickets" subtitle="View, download, or manage your bookings">
                                        <MyTickets />
                                    </PageSection>
                                } />
                                <Route path="/profile" element={
                                    <PageSection title="Your Account" subtitle="Sign in or manage your profile">
                                        <Profile />
                                    </PageSection>
                                } />
                                <Route path="/contact" element={
                                    <PageSection title="Contact Us" subtitle="We'd love to hear from you">
                                        <Contact />
                                    </PageSection>
                                } />
                                <Route path="/privacy" element={<PrivacyPage />} />
                                <Route path="/terms" element={<TermsPage />} />
                                <Route path="/faq" element={<FAQPage />} />
                                <Route path="/help" element={<HelpPage />} />
                                <Route path="/about" element={<AboutPage />} />
                                <Route path="*" element={
                                    <PageSection title="404" subtitle="Page not found">
                                        <div className="text-center py-20">
                                            <p className="text-gray-400 mb-6">The page you're looking for doesn't exist.</p>
                                            <Link to="/" className="btn-primary">Go Home</Link>
                                        </div>
                                    </PageSection>
                                } />
                            </Routes>
                        </Suspense>
                    </motion.div>
                </AnimatePresence>
            </main>

            <Footer />

            <Toaster
                position="top-right"
                toastOptions={{
                    duration: 3000,
                    style: {
                        background: 'rgba(15, 23, 42, 0.95)',
                        color: '#fff',
                        border: '1px solid rgba(59, 130, 246, 0.15)',
                        backdropFilter: 'blur(12px)',
                        padding: '12px 16px',
                        borderRadius: '12px',
                        fontSize: '14px',
                    },
                    success: { iconTheme: { primary: '#10b981', secondary: '#fff' } },
                    error: { iconTheme: { primary: '#ef4444', secondary: '#fff' } },
                }}
            />
        </div>
    );
}

/* ================================================
   Root App — wraps providers
   ================================================ */
export default function App() {
    return (
        <ThemeProvider>
            <AuthProvider>
                <BookingProvider>
                    <AppContent />
                </BookingProvider>
            </AuthProvider>
        </ThemeProvider>
    );
}
