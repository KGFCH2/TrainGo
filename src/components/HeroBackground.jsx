import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

/* ─────────────────────────────────────────────
   Animated Hero Background
   – Aurora gradient mesh
   – Floating luminous orbs
   – Animated SVG route lines
   – Dot grid pattern
   – Radial pulse ring
   ───────────────────────────────────────────── */

/* Floating Orb */
function Orb({ className, delay = 0, duration = 20, size = 400, color = '#3b82f6' }) {
    return (
        <motion.div
            className={`absolute rounded-full pointer-events-none ${className}`}
            style={{
                width: size,
                height: size,
                background: `radial-gradient(circle, ${color}22 0%, ${color}08 40%, transparent 70%)`,
                filter: `blur(${size * 0.15}px)`,
            }}
            animate={{
                x: [0, 30, -20, 15, 0],
                y: [0, -25, 15, -10, 0],
                scale: [1, 1.08, 0.95, 1.03, 1],
                opacity: [0.6, 0.8, 0.5, 0.7, 0.6],
            }}
            transition={{
                duration,
                repeat: Infinity,
                delay,
                ease: 'easeInOut',
            }}
        />
    );
}

/* Animated Route Line — SVG path with dash animation */
function RouteLine({ d, color = '#3b82f6', opacity = 0.08, delay = 0, duration = 8, strokeWidth = 1.5 }) {
    return (
        <motion.path
            d={d}
            stroke={color}
            strokeWidth={strokeWidth}
            fill="none"
            strokeLinecap="round"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity }}
            transition={{ duration, delay, ease: 'easeInOut' }}
        />
    );
}

/* Particle field — tiny subtle dots */
function ParticleField() {
    const particles = Array.from({ length: 60 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 2 + 0.5,
        delay: Math.random() * 8,
        duration: Math.random() * 4 + 3,
        opacity: Math.random() * 0.4 + 0.1,
    }));

    return (
        <div className="absolute inset-0 overflow-hidden">
            {particles.map(p => (
                <motion.div
                    key={p.id}
                    className="absolute rounded-full bg-primary-400"
                    style={{
                        left: `${p.x}%`,
                        top: `${p.y}%`,
                        width: p.size,
                        height: p.size,
                    }}
                    animate={{
                        opacity: [0, p.opacity, 0],
                        scale: [0.5, 1, 0.5],
                        y: [0, -15, 0],
                    }}
                    transition={{
                        duration: p.duration,
                        repeat: Infinity,
                        delay: p.delay,
                        ease: 'easeInOut',
                    }}
                />
            ))}
        </div>
    );
}

const heroImages = [
    '/hero-1.png',
    '/hero-2.png',
    '/hero-3.png'
];

export default function HeroBackground() {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentImageIndex((prev) => (prev + 1) % heroImages.length);
        }, 6000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="absolute inset-0 overflow-hidden bg-surface-950">
            {/* ── Background Slideshow ── */}
            <div className="absolute inset-0 z-0">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={currentImageIndex}
                        initial={{ opacity: 0, scale: 1.1 }}
                        animate={{ opacity: 0.6, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{ duration: 2, ease: "easeInOut" }}
                        className="absolute inset-0"
                    >
                        <img
                            src={heroImages[currentImageIndex]}
                            alt="Train Background"
                            className="w-full h-full object-cover"
                        />
                    </motion.div>
                </AnimatePresence>
                {/* Additional overlay for readability */}
                <div className="absolute inset-0 bg-surface-950/40 mix-blend-multiply" />
            </div>

            {/* ── Base gradient ── */}
            <div className="absolute inset-0 z-10 bg-gradient-to-b from-surface-950/70 via-primary-950/20 to-surface-950" />

            {/* ── Aurora mesh — slow moving gradients ── */}
            <div className="absolute inset-0 z-10 hero-aurora">
                <div className="hero-aurora-layer hero-aurora-1" />
                <div className="hero-aurora-layer hero-aurora-2" />
                <div className="hero-aurora-layer hero-aurora-3" />
            </div>

            {/* ── Luminous orbs ── */}
            <Orb className="top-[10%] left-[15%] z-10" color="#3b82f6" size={500} delay={0} duration={25} />
            <Orb className="top-[60%] right-[10%] z-10" color="#8b5cf6" size={400} delay={3} duration={22} />
            <Orb className="bottom-[5%] left-[40%] z-10" color="#06b6d4" size={350} delay={6} duration={28} />
            <Orb className="top-[30%] right-[30%] z-10" color="#f97316" size={250} delay={2} duration={20} />

            {/* ── Animated route lines (SVG) ── */}
            <svg className="absolute inset-0 w-full h-full z-10" viewBox="0 0 1440 900" preserveAspectRatio="xMidYMid slice">
                <defs>
                    <linearGradient id="routeGrad1" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#3b82f6" stopOpacity="0" />
                        <stop offset="50%" stopColor="#3b82f6" stopOpacity="0.15" />
                        <stop offset="100%" stopColor="#3b82f6" stopOpacity="0" />
                    </linearGradient>
                    <linearGradient id="routeGrad2" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#8b5cf6" stopOpacity="0" />
                        <stop offset="50%" stopColor="#8b5cf6" stopOpacity="0.12" />
                        <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0" />
                    </linearGradient>
                    <filter id="glow">
                        <feGaussianBlur stdDeviation="3" result="blur" />
                        <feComposite in="SourceGraphic" in2="blur" operator="over" />
                    </filter>
                </defs>

                {/* Route paths */}
                <g filter="url(#glow)">
                    <RouteLine
                        d="M -50 350 Q 200 280, 400 350 T 750 300 T 1100 380 T 1500 320"
                        color="#3b82f6" opacity={0.1} delay={0.5} duration={3}
                    />
                    <RouteLine
                        d="M -50 500 Q 300 450, 500 520 T 900 470 T 1200 530 T 1500 480"
                        color="#6366f1" opacity={0.07} delay={1.5} duration={3.5}
                    />
                    <RouteLine
                        d="M -50 650 Q 250 600, 450 680 T 800 620 T 1100 700 T 1500 640"
                        color="#8b5cf6" opacity={0.06} delay={2.5} duration={4}
                    />
                    <RouteLine
                        d="M 200 -50 Q 250 200, 300 400 T 350 650 T 400 950"
                        color="#3b82f6" opacity={0.05} delay={1} duration={3} strokeWidth={1}
                    />
                    <RouteLine
                        d="M 900 -50 Q 950 150, 880 350 T 920 600 T 950 950"
                        color="#6366f1" opacity={0.05} delay={2} duration={3.5} strokeWidth={1}
                    />
                </g>

                {/* Station dots along routes */}
                {[
                    { cx: 400, cy: 350, r: 2.5 }, { cx: 750, cy: 300, r: 3 }, { cx: 1100, cy: 380, r: 2 },
                    { cx: 500, cy: 520, r: 2 }, { cx: 900, cy: 470, r: 2.5 },
                    { cx: 300, cy: 400, r: 1.5 }, { cx: 950, cy: 350, r: 1.5 },
                ].map((dot, i) => (
                    <motion.circle
                        key={i}
                        cx={dot.cx}
                        cy={dot.cy}
                        r={dot.r}
                        fill="#60a5fa"
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: [0, 0.6, 0.3], scale: [0, 1, 1] }}
                        transition={{ duration: 2, delay: 2 + i * 0.4, repeat: Infinity, repeatDelay: 6 }}
                    />
                ))}

                {/* Pulse rings at key intersections */}
                {[
                    { cx: 400, cy: 350 }, { cx: 900, cy: 470 },
                ].map((ring, i) => (
                    <motion.circle
                        key={`ring-${i}`}
                        cx={ring.cx}
                        cy={ring.cy}
                        r={0}
                        stroke="#3b82f6"
                        strokeWidth={1}
                        fill="none"
                        initial={{ r: 0 }}
                        animate={{ r: [0, 30, 50], opacity: [0.3, 0.1, 0] }}
                        transition={{ duration: 4, delay: 3 + i * 2, repeat: Infinity, ease: 'easeOut' }}
                    />
                ))}
            </svg>

            {/* ── Dot grid pattern ── */}
            <div className="absolute inset-0 z-10 hero-dot-grid opacity-[0.03]" />

            {/* ── Particle field ── */}
            <ParticleField />

            {/* ── Radial vignette ── */}
            <div className="absolute inset-0 z-10" style={{
                background: 'radial-gradient(ellipse 80% 60% at 50% 45%, transparent 30%, rgba(2,6,23,0.7) 100%)',
            }} />

            {/* ── Bottom fade to content ── */}
            <div className="absolute bottom-0 left-0 right-0 h-40 z-20 bg-gradient-to-t from-surface-950 to-transparent" />
        </div>
    );
}
