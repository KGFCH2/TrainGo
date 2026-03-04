import React from 'react';
import { motion } from 'framer-motion';
import { getTrainTypeBadgeColor, getStatusColor, getStatusBg } from '../utils/helpers';
import { FiArrowRight } from 'react-icons/fi';

export default function TrainCard({ train, onBook, onClick }) {
    const handleCardClick = (e) => {
        // Prevent click if clicking on book button
        if (e.target.closest('button')) return;
        if (onClick) onClick(train);
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ y: -5, boxShadow: '0 10px 30px -15px rgba(59, 130, 246, 0.3)' }}
            className="rounded-2xl overflow-hidden cursor-pointer group border border-white/[0.04] bg-surface-900/50 hover:bg-surface-900 hover:border-white/[0.1] shadow-xl transition-all duration-300 relative"
            onClick={handleCardClick}
        >
            {/* Hover Glow Effect */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary-600/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

            <div className="p-5">
                <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                        <span className={`badge text-[9px] uppercase tracking-tighter sm:tracking-widest ${getTrainTypeBadgeColor(train.type)}`}>{train.type}</span>
                        <span className={`badge text-[9px] uppercase tracking-tighter sm:tracking-widest ${getStatusBg(train.status)} ${getStatusColor(train.status)}`}>{train.status}</span>
                    </div>
                    <span className="text-[10px] text-gray-600 font-mono">#{train.trainNo}</span>
                </div>

                <div className="mb-4">
                    <h3 className="text-lg font-display font-semibold text-white group-hover:text-primary-400 transition-colors mb-1 truncate">
                        {train.name}
                    </h3>
                    <p className="text-[9px] text-gray-500 uppercase tracking-widest truncate">
                        Click to view route & stops
                    </p>
                </div>

                <div className="flex items-center justify-between gap-4 py-3 border-y border-white/[0.04] my-4">
                    <div className="flex-1">
                        <div className="text-sm font-bold text-white mb-0.5">{train.source.name}</div>
                        <div className="text-[10px] text-gray-500 font-mono">{train.departure} <span className="text-[8px] text-primary-500/50 ml-1">DEP</span></div>
                    </div>
                    <div className="flex flex-col items-center shrink-0">
                        <div className="text-[9px] text-gray-500 font-bold mb-1 uppercase tracking-tighter">{train.duration}</div>
                        <div className="flex items-center gap-1 w-12 sm:w-16">
                            <div className="h-[2px] flex-1 bg-gradient-to-r from-transparent via-gray-700 to-gray-700" />
                            <FiArrowRight className="text-primary-500 text-[10px]" />
                            <div className="h-[2px] flex-1 bg-gradient-to-l from-transparent via-gray-700 to-gray-700" />
                        </div>
                        <div className="text-[8px] text-gray-600 mt-1 uppercase tracking-widest">{train.distance} km</div>
                    </div>
                    <div className="flex-1 text-right">
                        <div className="text-sm font-bold text-white mb-0.5">{train.destination.name}</div>
                        <div className="text-[10px] text-gray-500 font-mono"><span className="text-[8px] text-emerald-500/50 mr-1">ARR</span> {train.arrival}</div>
                    </div>
                </div>

                <div className="flex items-center justify-between">
                    <div className="flex flex-col">
                        <span className="text-[9px] text-gray-600 uppercase font-bold tracking-widest">Starting Fare</span>
                        <div className="flex items-baseline gap-2">
                            <span className="text-xl font-display font-bold text-white">₹{train.fare.general}</span>
                            <span className="text-[9px] text-gray-500 font-medium px-1.5 py-0.5 rounded-full bg-white/[0.03]">
                                {train.availableSeats} seats
                            </span>
                        </div>
                    </div>

                    {onBook && (
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={e => { e.stopPropagation(); onBook(train); }}
                            className="bg-primary-600 hover:bg-primary-500 text-white text-[10px] font-bold uppercase tracking-widest px-5 py-2.5 rounded-xl transition-colors shadow-lg shadow-primary-500/20"
                        >
                            Book Now
                        </motion.button>
                    )}
                </div>
            </div>
        </motion.div>
    );
}


