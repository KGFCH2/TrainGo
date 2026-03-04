import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiX, FiMapPin, FiClock, FiActivity } from 'react-icons/fi';
import { getTrainTypeBadgeColor, getStatusColor, getStatusBg } from '../utils/helpers';
import { useEffect } from 'react';

export default function TrainDetailsModal({ train, isOpen, onClose }) {
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isOpen]);

    if (!train) return null;

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[9999] flex items-center justify-center p-2 sm:p-4">
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="absolute inset-0 bg-surface-950/80 backdrop-blur-sm"
                    />

                    {/* Modal Content - Centered */}
                    <motion.div
                        layoutId={`train-card-${train.trainNo}`}
                        transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                        className="relative w-full max-w-2xl bg-surface-900 border border-white/[0.08] rounded-2xl shadow-2xl overflow-hidden max-h-[95vh] flex flex-col mx-2 sm:mx-0 z-10"
                    >
                        {/* Header */}
                        <div className="p-4 sm:p-6 border-b border-white/[0.04] flex items-start justify-between bg-surface-950/50">
                            <div>
                                <div className="flex items-center space-x-2 mb-1.5 sm:mb-2 flex-wrap gap-y-1">
                                    <span className={`badge text-[8px] sm:text-xs ${getTrainTypeBadgeColor(train.type)}`}>{train.type}</span>
                                    <span className={`badge text-[8px] sm:text-xs ${getStatusBg(train.status)} ${getStatusColor(train.status)}`}>{train.status}</span>
                                    <span className="text-[9px] sm:text-xs text-gray-500 font-mono">#{train.trainNo}</span>
                                </div>
                                <h2 className="text-lg sm:text-2xl font-bold text-white font-display uppercase tracking-tight">{train.name}</h2>
                                <p className="text-gray-400 mt-0.5 sm:mt-1 flex items-center gap-1.5 text-[10px] sm:text-sm">
                                    <FiActivity className="text-primary-400 shrink-0" />
                                    <span className="truncate">{train.routeName}</span>
                                </p>
                            </div>
                            <button
                                onClick={onClose}
                                className="p-1.5 sm:p-2 rounded-xl bg-white/[0.04] text-gray-400 hover:text-white hover:bg-white/[0.1] transition-all ml-4"
                            >
                                <FiX className="w-5 h-5 sm:w-6 sm:h-6" />
                            </button>
                        </div>

                        {/* Stoppages List */}
                        <div className="flex-1 overflow-y-auto p-4 sm:p-6 scrollbar-hide space-y-4 sm:space-y-6">
                            <h3 className="text-[9px] sm:text-sm font-bold text-gray-400 uppercase tracking-widest flex items-center gap-2 mb-4 sm:mb-8">
                                <FiMapPin className="text-primary-400" />
                                Route Schedule
                            </h3>

                            <div className="space-y-0 relative ml-2 sm:ml-4">
                                {/* Vertical Line */}
                                <div className="absolute left-[7px] top-2 bottom-2 w-0.5 bg-gradient-to-b from-primary-500 via-primary-500/50 to-primary-500/10" />

                                {train.stations.map((station, index) => (
                                    <div key={station.code} className="relative pl-7 sm:pl-10 pb-5 sm:pb-8 last:pb-0 group">
                                        {/* Dot */}
                                        <div className={`absolute left-0 top-1.5 w-3.5 h-3.5 sm:w-4 sm:h-4 rounded-full border-2 bg-surface-900 z-10 
                                            transition-all duration-300 group-hover:scale-125
                                            ${index === 0 || index === train.stations.length - 1
                                                ? 'border-primary-400 shadow-[0_0_10px_rgba(59,130,246,0.5)]'
                                                : 'border-gray-700'}`}
                                        />

                                        <div className="bg-white/[0.01] hover:bg-white/[0.03] border border-white/[0.04] rounded-xl p-3 sm:p-4 transition-all duration-300 group-hover:border-white/[0.1] group-hover:-translate-y-0.5">
                                            <div className="flex items-center justify-between">
                                                <div>
                                                    <h4 className={`text-sm sm:text-base font-semibold ${index === 0 || index === train.stations.length - 1 ? 'text-primary-400 font-display sm:text-lg' : 'text-gray-200'}`}>
                                                        {station.name}
                                                    </h4>
                                                    <p className="text-[8px] sm:text-[10px] text-gray-600 font-mono uppercase tracking-tighter">Code: {station.code}</p>
                                                </div>
                                                <div className="text-right">
                                                    <div className="flex items-center gap-1.5 sm:gap-2 justify-end">
                                                        <FiClock className="text-gray-600 text-[10px] sm:text-xs" />
                                                        <span className="text-xs sm:text-sm font-bold text-white font-mono">
                                                            {station.departure !== '--' ? station.departure : station.arrival}
                                                        </span>
                                                    </div>
                                                    <div className="text-[8px] sm:text-[9px] text-gray-500 uppercase tracking-wider font-medium">
                                                        {station.departure !== '--' ? 'Departure' : 'Arrival'}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Footer Summary */}
                        <div className="p-4 sm:p-8 border-t border-white/[0.04] bg-surface-950/80 grid grid-cols-2 gap-4 sm:gap-6">
                            <div className="flex flex-col justify-center space-y-2 sm:space-y-4">
                                <div>
                                    <div className="text-[8px] sm:text-[10px] text-gray-600 uppercase tracking-widest mb-0.5 sm:mb-1 font-bold">Total Distance</div>
                                    <div className="text-primary-400 font-display text-base sm:text-xl">{train.distance} <span className="text-[9px] uppercase font-sans text-gray-500">KM</span></div>
                                </div>
                                <div className="hidden sm:block">
                                    <div className="text-[10px] text-gray-600 uppercase tracking-widest mb-1 font-bold">Stoppages</div>
                                    <div className="text-white font-medium text-lg">{train.stations.length} <span className="text-xs uppercase text-gray-500">Stops</span></div>
                                </div>
                            </div>
                            <div className="text-right flex flex-col justify-center">
                                <div className="mb-2 sm:mb-0">
                                    <div className="text-[8px] sm:text-[10px] text-gray-600 uppercase tracking-widest mb-0.5 sm:mb-1 font-bold">Duration</div>
                                    <div className="text-white font-display text-base sm:text-xl">{train.duration}</div>
                                </div>
                                <div className="pt-2 sm:pt-4 sm:mt-4 border-t border-white/[0.04]">
                                    <div className="text-[8px] sm:text-[10px] text-gray-500 uppercase font-bold mb-0.5">Starting Fare</div>
                                    <div className="text-xl sm:text-3xl font-display font-black text-white">₹{train.fare.general}</div>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}
