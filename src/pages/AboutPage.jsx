import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const techStack = [
    { name: 'React 18', desc: 'Component-based UI framework' },
    { name: 'Vite 5', desc: 'Next-gen build tool' },
    { name: 'Three.js', desc: '3D graphics & cinematic visuals' },
    { name: 'Tailwind CSS', desc: 'Utility-first styling' },
    { name: 'Framer Motion', desc: 'Production-ready animations' },
    { name: 'jsPDF', desc: 'Client-side PDF generation' },
];

const stats = [
    { value: '1,050+', label: 'Generated Trains' },
    { value: '200+', label: 'Railway Stations' },
    { value: '23', label: 'Districts Covered' },
    { value: '33+', label: 'Route Templates' },
    { value: '6', label: 'Train Types' },
    { value: '5', label: 'Coach Classes' },
];

export default function AboutPage() {
    return (
        <div className="container-section py-24 min-h-screen">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
                <Link to="/" className="text-sm text-primary-400 hover:text-primary-300 mb-8 inline-block">&larr; Back to Home</Link>

                <div className="max-w-3xl mx-auto">
                    <h1 className="heading-section text-4xl mb-4 text-white">About WB TrainGo</h1>
                    <p className="text-gray-400 text-lg leading-relaxed mb-12">
                        A next-generation railway information and booking platform built specifically for
                        West Bengal's extensive rail network.
                    </p>

                    {/* Mission */}
                    <div className="card p-8 mb-8">
                        <h2 className="text-xl font-display font-semibold text-white mb-4">Our Purpose</h2>
                        <p className="text-gray-300 leading-relaxed mb-4">
                            WB TrainGo demonstrates what a modern, intelligent railway platform could look like.
                            Built as a frontend-only application, it showcases advanced web technologies including
                            3D graphics, real-time search across 1,000+ trains, interactive seat mapping,
                            PDF ticket generation, and cinematic user experiences.
                        </p>
                        <p className="text-gray-400 leading-relaxed">
                            Using real West Bengal station data across all 23 districts, the platform generates
                            realistic train routes, schedules, and fares — providing an authentic railway
                            information experience without requiring any backend infrastructure.
                        </p>
                    </div>

                    {/* Stats */}
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-12">
                        {stats.map((stat, i) => (
                            <motion.div
                                key={stat.label}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.1 + i * 0.08 }}
                                className="card p-5 text-center"
                            >
                                <div className="text-2xl font-display font-bold text-white">{stat.value}</div>
                                <div className="text-xs text-gray-500 mt-1 uppercase tracking-wider">{stat.label}</div>
                            </motion.div>
                        ))}
                    </div>

                    {/* Tech Stack */}
                    <h2 className="text-xl font-display font-semibold text-white mb-6">Technology Stack</h2>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-12">
                        {techStack.map((tech, i) => (
                            <motion.div
                                key={tech.name}
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: 0.2 + i * 0.06 }}
                                className="card p-4 group hover:border-primary-500/30"
                            >
                                <div className="text-sm font-semibold text-white group-hover:text-primary-400 transition-colors">{tech.name}</div>
                                <div className="text-xs text-gray-500 mt-1">{tech.desc}</div>
                            </motion.div>
                        ))}
                    </div>

                    {/* Features */}
                    <h2 className="text-xl font-display font-semibold text-white mb-6">Key Features</h2>
                    <div className="card p-6 space-y-3 mb-12">
                        {[
                            'AI-generated 1,050+ trains with realistic routes, timings, and fares',
                            '3D cinematic hero with Three.js and React Three Fiber',
                            'Interactive seat map with 5 coach class options',
                            'Full booking flow: search, select, seat pick, passenger info, payment',
                            'PDF ticket generation with QR code placeholder',
                            'Professional dark theme optimized for railway booking',
                            'Parallax scrolling and cinematic page transitions',
                            'Responsive design for all screen sizes',
                            'Zero backend — everything runs in the browser',
                        ].map((feature, i) => (
                            <div key={i} className="flex items-start space-x-3">
                                <span className="text-primary-400 mt-0.5 flex-shrink-0">&#x25CF;</span>
                                <span className="text-sm text-gray-300">{feature}</span>
                            </div>
                        ))}
                    </div>

                    {/* Disclaimer */}
                    <div className="rounded-xl bg-amber-500/5 border border-amber-500/20 p-6">
                        <h3 className="text-sm font-semibold text-amber-400 mb-2">Disclaimer</h3>
                        <p className="text-sm text-gray-400 leading-relaxed">
                            WB TrainGo is a demonstration and educational project. It does not facilitate
                            real railway bookings or transactions. All train data is simulated. For actual
                            travel planning, please use official Indian Railways services (IRCTC).
                        </p>
                    </div>
                </div>
            </motion.div>
        </div>
    );
}
