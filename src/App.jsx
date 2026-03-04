import React, { useState, useEffect, lazy, Suspense } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Toaster } from 'react-hot-toast';

import { ThemeProvider } from './context/ThemeContext';
import { AuthProvider } from './context/AuthContext';
import { BookingProvider } from './context/BookingContext';

import { generateAllTrains } from './data/generateTrains';

import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Hero from './components/Hero';

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
            <section className="container-section py-24">
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-100px' }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <h2 className="heading-section text-3xl sm:text-4xl text-white mb-4">Why WB TrainGo?</h2>
                    <p className="text-gray-400 max-w-xl mx-auto">
                        Built for the modern traveler. Every feature designed to simplify your journey.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {[
                        {
                            icon: (
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                </svg>
                            ),
                            title: 'Intelligent Search',
                            desc: 'Find any train across West Bengal in milliseconds. Filter by type, district, station, or route.',
                        },
                        {
                            icon: (
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                                </svg>
                            ),
                            title: 'Seamless Booking',
                            desc: 'Five-step guided booking with interactive seat maps, passenger management, and instant confirmation.',
                        },
                        {
                            icon: (
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                </svg>
                            ),
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
                            className="card p-8 group"
                        >
                            <div className="w-12 h-12 rounded-xl bg-primary-500/10 border border-primary-500/20 flex items-center justify-center text-primary-400 mb-5 group-hover:bg-primary-500/20 transition-colors">
                                {feature.icon}
                            </div>
                            <h3 className="text-lg font-semibold text-white mb-2">{feature.title}</h3>
                            <p className="text-sm text-gray-400 leading-relaxed">{feature.desc}</p>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* How It Works */}
            <section className="container-section py-24 border-t border-white/[0.04]">
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-100px' }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <h2 className="heading-section text-3xl sm:text-4xl text-white mb-4">How It Works</h2>
                    <p className="text-gray-400 max-w-xl mx-auto">Three simple steps to your next journey.</p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
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
                            <div className="text-5xl font-display font-bold text-gradient mb-4">{item.step}</div>
                            <h3 className="text-lg font-semibold text-white mb-2">{item.title}</h3>
                            <p className="text-sm text-gray-400">{item.desc}</p>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* CTA */}
            <section className="container-section py-24">
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="card p-12 sm:p-16 text-center bg-gradient-to-br from-primary-950/50 via-surface-900 to-surface-900 border-primary-500/10"
                >
                    <h2 className="heading-section text-3xl sm:text-4xl text-white mb-4">Ready to Explore?</h2>
                    <p className="text-gray-400 max-w-md mx-auto mb-8">
                        Browse {trains.length.toLocaleString()}+ trains across West Bengal's entire railway network.
                    </p>
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <a href="/trains" className="btn-primary text-lg px-8 py-4">Browse Trains</a>
                        <a href="/booking" className="btn-secondary text-lg px-8 py-4">Book Now</a>
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

            <div className="relative z-10 container-section py-12">
                {title && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4 }}
                        className="text-center mb-8"
                    >
                        <h1 className="heading-section text-3xl sm:text-4xl text-white mb-3 tracking-wider">{title}</h1>
                        {subtitle && <p className="text-gray-400 max-w-xl mx-auto italic">{subtitle}</p>}
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

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-surface-950">
                <div className="flex flex-col items-center space-y-4">
                    <div className="w-10 h-10 border-2 border-primary-500/30 border-t-primary-500 rounded-full animate-spin" />
                    <span className="text-sm text-gray-500 font-display">Initializing WB TrainGo...</span>
                </div>
            </div>
        );
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
                                            <a href="/" className="btn-primary">Go Home</a>
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
