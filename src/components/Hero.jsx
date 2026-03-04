import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FiSearch, FiArrowRight, FiActivity, FiMapPin, FiClock, FiDatabase } from 'react-icons/fi';
import HeroBackground from './HeroBackground';

const typewriterLines = [
    'West Bengal Railway Platform',
    'Smart Booking. Seamless Travel.',
    'Your Journey Starts Here.',
];

export default function Hero() {
    const [lineIndex, setLineIndex] = useState(0);
    const [charIndex, setCharIndex] = useState(0);
    const [isDeleting, setIsDeleting] = useState(false);
    const [displayText, setDisplayText] = useState('');
    const heroRef = useRef(null);

    const { scrollYProgress } = useScroll({
        target: heroRef,
        offset: ['start start', 'end start'],
    });

    const textY = useTransform(scrollYProgress, [0, 1], ['0%', '50%']);
    const textOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

    useEffect(() => {
        const line = typewriterLines[lineIndex];
        let timeout;
        if (!isDeleting && charIndex <= line.length) {
            timeout = setTimeout(() => {
                setDisplayText(line.substring(0, charIndex));
                setCharIndex(c => c + 1);
            }, 50);
        } else if (!isDeleting && charIndex > line.length) {
            timeout = setTimeout(() => setIsDeleting(true), 2200);
        } else if (isDeleting && charIndex > 0) {
            timeout = setTimeout(() => {
                setDisplayText(line.substring(0, charIndex - 1));
                setCharIndex(c => c - 1);
            }, 25);
        } else {
            setIsDeleting(false);
            setLineIndex(i => (i + 1) % typewriterLines.length);
        }
        return () => clearTimeout(timeout);
    }, [charIndex, isDeleting, lineIndex]);

    return (
        <section ref={heroRef} className="relative min-h-screen flex items-center justify-center overflow-hidden">
            {/* Animated Background */}
            <HeroBackground />

            {/* Content */}
            <motion.div
                className="relative z-10 text-center px-4 max-w-5xl mx-auto"
                style={{ y: textY, opacity: textOpacity }}
            >
                {/* Overline */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="mb-6"
                >
                    <span className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-white/[0.06] border border-white/[0.08] text-sm text-gray-400">
                        <span className="flex space-x-0.5">
                            <span className="w-1.5 h-1.5 rounded-full bg-saffron" />
                            <span className="w-1.5 h-1.5 rounded-full bg-white" />
                            <span className="w-1.5 h-1.5 rounded-full bg-indian-green" />
                        </span>
                        <span>Indian Railways &middot; West Bengal</span>
                    </span>
                </motion.div>

                {/* Main title */}
                <motion.h1
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                    className="heading-section text-4xl sm:text-6xl md:text-7xl mb-4"
                >
                    <span className="text-white">Train</span>
                    <span className="text-blue-400">Go</span>
                </motion.h1>

                {/* Typewriter */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.8 }}
                    className="mb-8 h-8 sm:h-10"
                >
                    <span className="text-lg sm:text-2xl md:text-3xl font-display font-medium text-gray-300">
                        {displayText}
                    </span>
                    <span className="inline-block w-0.5 h-6 sm:h-7 bg-primary-400 ml-1 animate-blink" />
                </motion.div>

                {/* Subtitle */}
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1, duration: 0.8 }}
                    className="text-base sm:text-lg text-gray-400 mb-8 sm:mb-12 max-w-2xl mx-auto leading-relaxed"
                >
                    Navigate West Bengal's extensive railway network with precision.
                    Search 1,000+ trains, compare routes, and book your journey — all in one platform.
                </motion.p>

                {/* CTA */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.3, duration: 0.8 }}
                    className="flex flex-col sm:flex-row items-center justify-center gap-4 px-4"
                >
                    <Link to="/trains" className="btn-primary text-lg sm:text-xl px-8 py-4 sm:px-10 sm:py-5 flex items-center space-x-3 w-full sm:w-auto justify-center shadow-2xl shadow-primary-500/20">
                        <FiSearch className="w-5 h-5 sm:w-6 sm:h-6" />
                        <span>Search Trains</span>
                    </Link>
                    <Link to="/booking" className="btn-secondary text-lg sm:text-xl px-8 py-4 sm:px-10 sm:py-5 flex items-center space-x-3 w-full sm:w-auto justify-center">
                        <FiArrowRight className="w-5 h-5 sm:w-6 sm:h-6" />
                        <span>Book Tickets</span>
                    </Link>
                </motion.div>

                {/* Stats */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.8, duration: 1 }}
                    className="mt-12 sm:mt-20 grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 max-w-4xl mx-auto px-4"
                >
                    {[
                        { value: '1,000+', label: 'Active Trains', icon: <FiActivity className="text-primary-400" /> },
                        { value: '200+', label: 'Stations', icon: <FiMapPin className="text-primary-400" /> },
                        { value: '23', label: 'Districts', icon: <FiClock className="text-primary-400" /> },
                        { value: '30+', label: 'Routes', icon: <FiDatabase className="text-primary-400" /> },
                    ].map((stat, i) => (
                        <motion.div
                            key={stat.label}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 1.8 + i * 0.15 }}
                            className="text-center p-4 sm:p-6 rounded-2xl glass hover:bg-white/[0.08] transition-all group"
                        >
                            <div className="flex justify-center mb-2 sm:mb-3 text-lg sm:text-xl group-hover:scale-110 transition-transform">
                                {stat.icon}
                            </div>
                            <div className="text-xl sm:text-3xl font-display font-bold text-white mb-0.5 sm:mb-1">{stat.value}</div>
                            <div className="text-[8px] sm:text-[10px] text-gray-400 uppercase tracking-[0.2em] font-bold">{stat.label}</div>
                        </motion.div>
                    ))}
                </motion.div>

                {/* Scroll indicator */}
                <motion.div
                    animate={{ y: [0, 8, 0] }}
                    transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                    className="mt-16"
                >
                    <div className="w-5 h-8 rounded-full border-2 border-gray-600 mx-auto flex justify-center pt-1.5">
                        <motion.div
                            animate={{ y: [0, 8, 0], opacity: [1, 0.3, 1] }}
                            transition={{ duration: 2, repeat: Infinity }}
                            className="w-1 h-2 rounded-full bg-gray-400"
                        />
                    </div>
                </motion.div>
            </motion.div>
        </section>
    );
}
