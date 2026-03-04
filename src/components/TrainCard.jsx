import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { getTrainTypeBadgeColor, getStatusColor, getStatusBg } from '../utils/helpers';
import { FiArrowRight } from 'react-icons/fi';
import TrainDetailsModal from './TrainDetailsModal';

export default function TrainCard({ train, onBook }) {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleCardClick = (e) => {
        // Prevent click if clicking on book button
        if (e.target.closest('button')) return;
        setIsModalOpen(true);
    };

    return (
        <>
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                whileHover={{ y: -5, boxShadow: '0 10px 30px -15px rgba(59, 130, 246, 0.3)' }}
                className="rounded-xl overflow-hidden cursor-pointer group"
                onClick={handleCardClick}
            >
                <div className="h-full card p-5 flex flex-col justify-between relative overflow-hidden">
                    {/* Hover Glow Effect */}
                    <div className="absolute inset-0 bg-gradient-to-br from-primary-600/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

                    <div>
                        <div className="flex items-center justify-between mb-3">
                            <div className="flex items-center space-x-2">
                                <span className={`badge ${getTrainTypeBadgeColor(train.type)}`}>{train.type}</span>
                                <span className={`badge ${getStatusBg(train.status)} ${getStatusColor(train.status)}`}>{train.status}</span>
                            </div>
                            <span className="text-xs text-gray-600 font-mono">#{train.trainNo}</span>
                        </div>

                        <h3 className="text-base font-semibold text-white group-hover:text-primary-400 transition-colors truncate mb-1">
                            {train.name}
                        </h3>
                        <p className="text-[10px] text-gray-500 uppercase tracking-wider mb-3">
                            Click to view full route schedule
                        </p>

                        <div className="flex items-center space-x-3">
                            <div className="flex-1">
                                <div className="text-sm font-medium text-white">{train.source.name}</div>
                                <div className="text-xs text-gray-500">{train.departure}</div>
                            </div>
                            <div className="flex flex-col items-center px-1">
                                <div className="text-[9px] text-gray-500 mb-0.5">{train.duration}</div>
                                <div className="flex items-center">
                                    <div className="w-6 h-px bg-gray-700" />
                                    <FiArrowRight className="text-primary-400 text-xs mx-1" />
                                    <div className="w-6 h-px bg-gray-700" />
                                </div>
                                <div className="text-[9px] text-gray-500 mt-0.5">{train.distance} km</div>
                            </div>
                            <div className="flex-1 text-right">
                                <div className="text-sm font-medium text-white">{train.destination.name}</div>
                                <div className="text-xs text-gray-500">{train.arrival}</div>
                            </div>
                        </div>
                    </div>

                    <div className="flex items-center justify-between mt-5 pt-3 border-t border-white/[0.04]">
                        <div className="flex items-center space-x-3">
                            <span className="text-sm">
                                <span className="text-gray-500 text-xs">From </span>
                                <span className="font-bold text-primary-400">₹{train.fare.general}</span>
                            </span>
                            <span className="text-[10px] text-gray-600 font-medium px-2 py-0.5 rounded-full bg-white/[0.03]">
                                {train.availableSeats} seats
                            </span>
                        </div>

                        {onBook && (
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={e => { e.stopPropagation(); onBook(train); }}
                                className="btn-primary text-xs py-1.5 px-5"
                            >
                                Book Now
                            </motion.button>
                        )}
                    </div>
                </div>
            </motion.div>

            <TrainDetailsModal
                train={train}
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
            />
        </>
    );
}

