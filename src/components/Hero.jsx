import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
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
                    className="heading-section text-4xl sm:text-5xl md:text-7xl mb-4"
                >
                    <span className="text-white">WB </span>
                    <span className="text-blue-400">TrainGo</span>
                </motion.h1>

                {/* Typewriter */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.8 }}
                    className="mb-8 h-10"
                >
                    <span className="text-xl sm:text-2xl md:text-3xl font-display font-medium text-gray-300">
                        {displayText}
                    </span>
                    <span className="inline-block w-0.5 h-7 bg-primary-400 ml-1 animate-blink" />
                </motion.div>

                {/* Subtitle */}
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1, duration: 0.8 }}
                    className="text-lg text-gray-400 mb-12 max-w-2xl mx-auto leading-relaxed"
                >
                    Navigate West Bengal's extensive railway network with precision.
                    Search 1,000+ trains, compare routes, and book your journey — all in one platform.
                </motion.p>

                {/* CTA */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.3, duration: 0.8 }}
                    className="flex flex-col sm:flex-row items-center justify-center gap-4"
                >
                    <a href="/trains" className="btn-primary text-lg px-8 py-4 flex items-center space-x-2">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                        <span>Search Trains</span>
                    </a>
                    <a href="/booking" className="btn-secondary text-lg px-8 py-4">
                        Book Tickets
                    </a>
                </motion.div>

                {/* Stats */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.8, duration: 1 }}
                    className="mt-20 grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-3xl mx-auto"
                >
                    {[
                        { value: '1,000+', label: 'Active Trains' },
                        { value: '200+', label: 'Stations' },
                        { value: '23', label: 'Districts' },
                        { value: '30+', label: 'Routes' },
                    ].map((stat, i) => (
                        <motion.div
                            key={stat.label}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 1.8 + i * 0.15 }}
                            className="text-center p-4 rounded-xl glass"
                        >
                            <div className="text-2xl font-display font-bold text-white">{stat.value}</div>
                            <div className="text-xs text-gray-500 mt-1 uppercase tracking-wider">{stat.label}</div>
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
