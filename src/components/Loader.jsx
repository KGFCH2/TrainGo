import React from 'react';
import { motion } from 'framer-motion';

export default function Loader() {
    return (
        <div className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-surface-950 overflow-hidden">
            {/* Background elements */}
            <div className="absolute inset-0 bg-gradient-to-b from-primary-950/20 to-surface-950/90 pointer-events-none" />

            <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="relative z-10 flex flex-col items-center"
            >
                <motion.div
                    animate={{ y: [0, -10, 0] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                    className="mb-8 relative"
                >
                    <img src="/logo.png" alt="TrainGo Logo" className="w-32 h-32 object-contain drop-shadow-[0_0_15px_rgba(59,130,246,0.5)]" />

                    {/* Glowing rings */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: [0, 1, 0], scale: [0.8, 1.2, 1.5] }}
                        transition={{ duration: 2, repeat: Infinity, ease: "easeOut" }}
                        className="absolute inset-0 rounded-full border border-primary-500/50"
                    />
                </motion.div>

                <motion.h1
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3, duration: 0.5 }}
                    className="text-4xl font-display font-black text-white tracking-wider mb-2"
                >
                    Train<span className="text-primary-500">Go</span>
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.6, duration: 0.5 }}
                    className="text-sm text-gray-400 tracking-widest uppercase font-medium"
                >
                    West Bengal Railway
                </motion.p>

                {/* Loading Bar */}
                <div className="w-48 h-1 bg-surface-800 rounded-full mt-8 overflow-hidden">
                    <motion.div
                        initial={{ x: "-100%" }}
                        animate={{ x: "100%" }}
                        transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                        className="w-1/2 h-full bg-primary-500 rounded-full"
                    />
                </div>
            </motion.div>
        </div>
    );
}
