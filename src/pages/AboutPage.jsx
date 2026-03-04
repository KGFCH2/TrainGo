import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiTarget, FiBox, FiCpu, FiShield, FiCheckCircle, FiChevronRight } from 'react-icons/fi';

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
                <Link to="/" className="text-sm text-primary-400 hover:text-primary-300 mb-8 inline-block transition-transform hover:-translate-x-1">&larr; Back to Home</Link>

                <div className="max-w-3xl mx-auto">
                    <h1 className="heading-section text-4xl mb-4 text-white">About TrainGo</h1>
                    <p className="text-gray-400 mb-12 text-lg">A next-generation railway information and booking simulation platform.</p>

                    {/* Mission */}
                    <motion.div
                        whileHover={{ y: -4 }}
                        className="card p-8 mb-12 border border-white/[0.04] hover:border-primary-500/20 group transition-all"
                    >
                        <div className="flex items-center gap-4 mb-6">
                            <div className="w-12 h-12 rounded-2xl bg-primary-500/10 flex items-center justify-center text-primary-400 group-hover:scale-110 transition-transform">
                                <FiTarget className="w-6 h-6" />
                            </div>
                            <h2 className="text-2xl font-display font-semibold text-white group-hover:text-primary-400 transition-colors">Our Purpose</h2>
                        </div>
                        <p className="text-gray-300 leading-relaxed mb-4 group-hover:text-white transition-colors">
                            TrainGo demonstrates what a modern, intelligent railway platform could look like.
                            Built as a frontend-only application, it showcases advanced web technologies including
                            3D graphics, real-time search across 1,000+ trains, interactive seat mapping,
                            PDF ticket generation, and cinematic user experiences.
                        </p>
                        <p className="text-gray-400 leading-relaxed">
                            Using real West Bengal station data across all 23 districts, the platform generates
                            realistic train routes, schedules, and fares — providing an authentic railway
                            information experience without requiring any backend infrastructure.
                        </p>
                    </motion.div>

                    {/* Stats */}
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-16">
                        {stats.map((stat, i) => (
                            <motion.div
                                key={stat.label}
                                whileHover={{ y: -2 }}
                                className="card p-5 text-center bg-white/[0.01] border border-white/[0.04] hover:border-primary-500/20 transition-all"
                            >
                                <div className="text-2xl font-display font-bold text-white mb-1">{stat.value}</div>
                                <div className="text-[10px] text-gray-500 uppercase tracking-widest font-bold">{stat.label}</div>
                            </motion.div>
                        ))}
                    </div>

                    {/* Tech Stack */}
                    <div className="flex items-center gap-3 mb-8">
                        <FiCpu className="text-primary-400 w-5 h-5" />
                        <h2 className="text-xl font-display font-semibold text-white">Technology Stack</h2>
                    </div>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-16">
                        {techStack.map((tech, i) => (
                            <motion.div
                                key={tech.name}
                                whileHover={{ scale: 1.02 }}
                                className="card p-4 group border border-white/[0.04] hover:border-primary-500/30 transition-all"
                            >
                                <div className="text-sm font-semibold text-white group-hover:text-primary-400 transition-colors mb-1">{tech.name}</div>
                                <div className="text-[10px] text-gray-500 group-hover:text-gray-400 transition-colors uppercase tracking-wider">{tech.desc}</div>
                            </motion.div>
                        ))}
                    </div>

                    {/* Features */}
                    <div className="flex items-center gap-3 mb-8">
                        <FiBox className="text-primary-400 w-5 h-5" />
                        <h2 className="text-xl font-display font-semibold text-white">Key Features</h2>
                    </div>
                    <div className="card p-6 divide-y divide-white/[0.04] mb-16">
                        {[
                            'AI-generated 1,050+ trains with realistic routes',
                            '3D cinematic hero with Three.js graphics',
                            'Interactive seat map with 5 coach class options',
                            'Full end-to-end booking flow simulation',
                            'Client-side PDF ticket generation with QR code',
                            'Professional dark theme optimized for usability',
                            'Cinematic transitions and motion effects',
                            'Fully responsive across all device sizes',
                        ].map((feature, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0 }}
                                whileInView={{ opacity: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                                className="flex items-center py-4 first:pt-0 last:pb-0 group"
                            >
                                <FiCheckCircle className="text-primary-500 w-4 h-4 mr-4 shrink-0 group-hover:scale-125 transition-transform" />
                                <span className="text-sm text-gray-300 group-hover:text-white transition-colors">{feature}</span>
                                <FiChevronRight className="ml-auto text-gray-700 w-4 h-4 opacity-0 group-hover:opacity-100 transition-all transform translate-x-1" />
                            </motion.div>
                        ))}
                    </div>

                    {/* Disclaimer */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        className="rounded-2xl bg-amber-500/[0.03] border border-amber-500/20 p-8 flex items-start gap-4"
                    >
                        <FiShield className="text-amber-500 w-6 h-6 shrink-0 mt-1" />
                        <div>
                            <h3 className="text-base font-semibold text-amber-500 mb-2">Simulation Disclaimer</h3>
                            <p className="text-sm text-gray-400 leading-relaxed">
                                TrainGo is a demonstration and educational project. It does not facilitate
                                real railway bookings or transactions. All train data is simulated. For actual
                                travel planning, please use official Indian Railways services (IRCTC).
                            </p>
                        </div>
                    </motion.div>
                </div>
            </motion.div>
        </div>
    );
}

