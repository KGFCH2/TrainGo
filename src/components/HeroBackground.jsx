import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const heroImages = [
    '/hero-1.png',
    '/hero-2.png',
    '/hero-3.png',
    '/hero-4.png',
    '/hero-5.png'
];

export default function HeroBackground() {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentImageIndex((prev) => (prev + 1) % heroImages.length);
        }, 5000);
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
                        exit={{ opacity: 0, scale: 1.05 }}
                        transition={{ duration: 1.5, ease: "easeInOut" }}
                        className="absolute inset-0"
                    >
                        <img
                            src={heroImages[currentImageIndex]}
                            alt="Train Background"
                            className="w-full h-full object-cover"
                        />
                    </motion.div>
                </AnimatePresence>
                {/* Visual Overlay */}
                <div className="absolute inset-0 bg-surface-950/40 mix-blend-multiply" />
            </div>

            {/* ── Base gradient ── */}
            <div className="absolute inset-0 z-10 bg-gradient-to-b from-surface-950/60 via-transparent to-surface-950" />

            {/* ── Radial vignette ── */}
            <div className="absolute inset-0 z-10" style={{
                background: 'radial-gradient(ellipse 80% 60% at 50% 45%, transparent 20%, rgba(2,6,23,0.8) 100%)',
            }} />

            {/* ── Bottom fade to content ── */}
            <div className="absolute bottom-0 left-0 right-0 h-40 z-20 bg-gradient-to-t from-surface-950 to-transparent" />
        </div>
    );
}
