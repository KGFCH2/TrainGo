import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiX, FiMapPin, FiClock, FiActivity } from 'react-icons/fi';
import { getTrainTypeBadgeColor, getStatusColor, getStatusBg } from '../utils/helpers';

export default function TrainDetailsModal({ train, isOpen, onClose }) {
    if (!train) return null;

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="absolute inset-0 bg-surface-950/80 backdrop-blur-sm"
                    />

                    {/* Modal Content */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 20 }}
                        className="relative w-full max-w-2xl bg-surface-900 border border-white/[0.08] rounded-2xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col"
                    >
                        {/* Header */}
                        <div className="p-6 border-b border-white/[0.04] flex items-start justify-between">
                            <div>
                                <div className="flex items-center space-x-2 mb-2">
                                    <span className={`badge ${getTrainTypeBadgeColor(train.type)}`}>{train.type}</span>
                                    <span className={`badge ${getStatusBg(train.status)} ${getStatusColor(train.status)}`}>{train.status}</span>
                                    <span className="text-xs text-gray-500 font-mono">#{train.trainNo}</span>
                                </div>
                                <h2 className="text-2xl font-bold text-white">{train.name}</h2>
                                <p className="text-gray-400 mt-1 flex items-center gap-2">
                                    <FiActivity className="text-primary-400" />
                                    {train.routeName}
                                </p>
                            </div>
                            <button
                                onClick={onClose}
                                className="p-2 rounded-xl bg-white/[0.04] text-gray-500 hover:text-white hover:bg-white/[0.08] transition-colors"
                            >
                                <FiX className="w-6 h-6" />
                            </button>
                        </div>

                        {/* Stoppages List */}
                        <div className="flex-1 overflow-y-auto p-6 scrollbar-hide">
                            <h3 className="text-lg font-semibold text-white mb-6 flex items-center gap-2">
                                <FiMapPin className="text-primary-400" />
                                Train Stoppages & Route Schedule
                            </h3>

                            <div className="space-y-0 relative ml-4">
                                {/* Vertical Line */}
                                <div className="absolute left-[7px] top-2 bottom-2 w-0.5 bg-gradient-to-b from-primary-500 via-primary-500/50 to-primary-500/10" />

                                {train.stations.map((station, index) => (
                                    <div key={station.code} className="relative pl-10 pb-8 last:pb-0">
                                        {/* Dot */}
                                        <div className={`absolute left-0 top-1.5 w-4 h-4 rounded-full border-2 bg-surface-900 z-10 
                                            ${index === 0 || index === train.stations.length - 1
                                                ? 'border-primary-400 w-5 h-5 -left-[2px] shadow-[0_0_10px_rgba(59,130,246,0.5)]'
                                                : 'border-gray-700'}`}
                                        />

                                        <div className="bg-white/[0.02] border border-white/[0.04] rounded-xl p-4 hover:bg-white/[0.04] transition-colors">
                                            <div className="flex items-center justify-between">
                                                <div>
                                                    <h4 className={`font-semibold ${index === 0 || index === train.stations.length - 1 ? 'text-primary-400' : 'text-gray-200'}`}>
                                                        {station.name}
                                                    </h4>
                                                    <p className="text-xs text-gray-500">Station Code: {station.code}</p>
                                                </div>
                                                <div className="text-right flex items-center gap-2">
                                                    <FiClock className="text-gray-600 text-sm" />
                                                    <div>
                                                        <div className="text-sm font-medium text-white">
                                                            {station.departure !== '--' ? station.departure : station.arrival}
                                                        </div>
                                                        <div className="text-[10px] text-gray-500 uppercase">
                                                            {station.departure !== '--' ? 'Departure' : 'Terminal Arrival'}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Footer Summary */}
                        <div className="p-6 border-t border-white/[0.04] bg-white/[0.01] flex items-center justify-between">
                            <div className="flex gap-6">
                                <div>
                                    <div className="text-[10px] text-gray-600 uppercase tracking-widest mb-1">Total Distance</div>
                                    <div className="text-primary-400 font-bold">{train.distance} KM</div>
                                </div>
                                <div>
                                    <div className="text-[10px] text-gray-600 uppercase tracking-widest mb-1">Total Duration</div>
                                    <div className="text-white font-medium">{train.duration}</div>
                                </div>
                                <div>
                                    <div className="text-[10px] text-gray-600 uppercase tracking-widest mb-1">Stoppages</div>
                                    <div className="text-white font-medium">{train.stations.length} Stops</div>
                                </div>
                            </div>
                            <div className="text-right">
                                <div className="text-[10px] text-gray-600 uppercase tracking-widest mb-1">Starting Fare</div>
                                <div className="text-2xl font-bold text-white">₹{train.fare.general}</div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}
