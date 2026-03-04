import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiX, FiMapPin, FiClock, FiActivity } from 'react-icons/fi';
import { getTrainTypeBadgeColor, getStatusColor, getStatusBg } from '../utils/helpers';

export default function TrainDetailsModal({ train, isOpen, onClose }) {
    if (!train) return null;

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[100] flex justify-end">
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="absolute inset-0 bg-surface-950/60 backdrop-blur-sm"
                    />

                    {/* Drawer Content - Sliding from Right */}
                    <motion.div
                        initial={{ x: '100%' }}
                        animate={{ x: 0 }}
                        exit={{ x: '100%' }}
                        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                        className="relative w-full max-w-lg bg-surface-900 border-l border-white/[0.08] shadow-2xl overflow-hidden h-full flex flex-col"
                    >
                        {/* Header */}
                        <div className="p-6 border-b border-white/[0.04] flex items-start justify-between bg-surface-950/50">
                            <div>
                                <div className="flex items-center space-x-2 mb-2">
                                    <span className={`badge ${getTrainTypeBadgeColor(train.type)}`}>{train.type}</span>
                                    <span className={`badge ${getStatusBg(train.status)} ${getStatusColor(train.status)}`}>{train.status}</span>
                                    <span className="text-xs text-gray-500 font-mono">#{train.trainNo}</span>
                                </div>
                                <h2 className="text-2xl font-bold text-white font-display uppercase tracking-tight">{train.name}</h2>
                                <p className="text-gray-400 mt-1 flex items-center gap-2 text-sm">
                                    <FiActivity className="text-primary-400" />
                                    {train.routeName}
                                </p>
                            </div>
                            <button
                                onClick={onClose}
                                className="p-2 rounded-xl bg-white/[0.04] text-gray-400 hover:text-white hover:bg-white/[0.1] transition-all"
                            >
                                <FiX className="w-6 h-6" />
                            </button>
                        </div>

                        {/* Stoppages List */}
                        <div className="flex-1 overflow-y-auto p-6 scrollbar-hide space-y-6">
                            <h3 className="text-sm font-bold text-gray-400 uppercase tracking-widest flex items-center gap-2 mb-8">
                                <FiMapPin className="text-primary-400" />
                                Route Schedule
                            </h3>

                            <div className="space-y-0 relative ml-4">
                                {/* Vertical Line */}
                                <div className="absolute left-[7px] top-2 bottom-2 w-0.5 bg-gradient-to-b from-primary-500 via-primary-500/50 to-primary-500/10" />

                                {train.stations.map((station, index) => (
                                    <div key={station.code} className="relative pl-10 pb-8 last:pb-0 group">
                                        {/* Dot */}
                                        <div className={`absolute left-0 top-1.5 w-4 h-4 rounded-full border-2 bg-surface-900 z-10 
                                            transition-all duration-300 group-hover:scale-125
                                            ${index === 0 || index === train.stations.length - 1
                                                ? 'border-primary-400 shadow-[0_0_10px_rgba(59,130,246,0.5)]'
                                                : 'border-gray-700'}`}
                                        />

                                        <div className="bg-white/[0.01] hover:bg-white/[0.03] border border-white/[0.04] rounded-xl p-4 transition-all duration-300 group-hover:border-white/[0.1] group-hover:-translate-y-0.5">
                                            <div className="flex items-center justify-between">
                                                <div>
                                                    <h4 className={`font-semibold ${index === 0 || index === train.stations.length - 1 ? 'text-primary-400 font-display text-lg' : 'text-gray-200'}`}>
                                                        {station.name}
                                                    </h4>
                                                    <p className="text-[10px] text-gray-600 font-mono uppercase tracking-tighter">Code: {station.code}</p>
                                                </div>
                                                <div className="text-right">
                                                    <div className="flex items-center gap-2 justify-end">
                                                        <FiClock className="text-gray-600 text-xs" />
                                                        <span className="text-sm font-bold text-white font-mono">
                                                            {station.departure !== '--' ? station.departure : station.arrival}
                                                        </span>
                                                    </div>
                                                    <div className="text-[9px] text-gray-500 uppercase tracking-wider font-medium">
                                                        {station.departure !== '--' ? 'Departure' : 'Terminal Arrival'}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Footer Summary */}
                        <div className="p-8 border-t border-white/[0.04] bg-surface-950/80 grid grid-cols-2 gap-6">
                            <div className="space-y-4">
                                <div>
                                    <div className="text-[10px] text-gray-600 uppercase tracking-widest mb-1 font-bold">Total Distance</div>
                                    <div className="text-primary-400 font-display text-xl">{train.distance} <span className="text-xs uppercase font-sans text-gray-500">KM</span></div>
                                </div>
                                <div>
                                    <div className="text-[10px] text-gray-600 uppercase tracking-widest mb-1 font-bold">Stoppages</div>
                                    <div className="text-white font-medium text-lg">{train.stations.length} <span className="text-xs uppercase text-gray-500">Stops</span></div>
                                </div>
                            </div>
                            <div className="text-right flex flex-col justify-between">
                                <div>
                                    <div className="text-[10px] text-gray-600 uppercase tracking-widest mb-1 font-bold">Duration</div>
                                    <div className="text-white font-display text-xl">{train.duration}</div>
                                </div>
                                <div className="pt-4 mt-4 border-t border-white/[0.04]">
                                    <div className="text-[10px] text-gray-500 uppercase font-bold mb-1">Starting Fare</div>
                                    <div className="text-3xl font-display font-black text-white">₹{train.fare.general}</div>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}
