import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { getTrainTypeBadgeColor, getStatusColor, getStatusBg } from '../utils/helpers';
import { FiArrowRight, FiChevronDown, FiChevronUp } from 'react-icons/fi';

export default function TrainCard({ train, onBook, isFlippable = false }) {
    const [showRoute, setShowRoute] = useState(false);
    const [isFlipped, setIsFlipped] = useState(false);
    const shouldFlip = isFlippable && ['Express', 'Superfast', 'Intercity'].includes(train.type);

    const handleCardClick = (e) => {
        // Prevent flip if clicking on book button or expand button
        if (e.target.closest('button')) return;
        if (shouldFlip) {
            setIsFlipped(!isFlipped);
        }
    };

    if (shouldFlip) {
        return (
            <div className="perspective-1000 h-[280px] cursor-pointer" onClick={handleCardClick}>
                <motion.div
                    className="relative w-full h-full"
                    style={{ transformStyle: 'preserve-3d' }}
                    animate={{ rotateY: isFlipped ? 180 : 0 }}
                    transition={{ duration: 0.6, type: 'spring', stiffness: 200 }}
                >
                    <div className="absolute inset-0 rounded-xl overflow-hidden" style={{ backfaceVisibility: 'hidden' }}>
                        <CardFront train={train} onBook={onBook} />
                    </div>
                    <div className="absolute inset-0 rounded-xl overflow-hidden overflow-y-auto" style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}>
                        <CardBack train={train} />
                    </div>
                </motion.div>
            </div>
        );
    }

    return (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} whileHover={{ y: -3 }} className="rounded-xl overflow-hidden">
            <CardFront train={train} onBook={onBook} showRoute={showRoute} setShowRoute={setShowRoute} expandable />
        </motion.div>
    );
}

function CardFront({ train, onBook, showRoute, setShowRoute, expandable }) {
    return (
        <div className="h-full card p-5 flex flex-col justify-between group">
            <div>
                <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-2">
                        <span className={`badge ${getTrainTypeBadgeColor(train.type)}`}>{train.type}</span>
                        <span className={`badge ${getStatusBg(train.status)} ${getStatusColor(train.status)}`}>{train.status}</span>
                    </div>
                    <span className="text-xs text-gray-600 font-mono">#{train.trainNo}</span>
                </div>
                <h3 className="text-base font-semibold text-white group-hover:text-primary-400 transition-colors truncate">{train.name}</h3>
                <div className="flex items-center mt-3 space-x-3">
                    <div className="flex-1">
                        <div className="text-sm font-medium text-white">{train.source.name}</div>
                        <div className="text-xs text-gray-500">{train.departure}</div>
                    </div>
                    <div className="flex flex-col items-center px-2">
                        <div className="text-[10px] text-gray-500">{train.duration}</div>
                        <div className="flex items-center"><div className="w-8 h-px bg-gray-700" /><FiArrowRight className="text-primary-400 text-xs mx-1" /><div className="w-8 h-px bg-gray-700" /></div>
                        <div className="text-[10px] text-gray-500">{train.distance} km</div>
                    </div>
                    <div className="flex-1 text-right">
                        <div className="text-sm font-medium text-white">{train.destination.name}</div>
                        <div className="text-xs text-gray-500">{train.arrival}</div>
                    </div>
                </div>
            </div>
            <div className="flex items-center justify-between mt-4 pt-3 border-t border-white/[0.04]">
                <div className="flex items-center space-x-3">
                    <span className="text-sm"><span className="text-gray-500">From </span><span className="font-semibold text-primary-400">₹{train.fare.general}</span></span>
                    <span className="text-xs text-gray-600">{train.availableSeats} seats</span>
                </div>
                <div className="flex items-center space-x-2">
                    {expandable && setShowRoute && (
                        <button onClick={e => { e.stopPropagation(); setShowRoute(!showRoute); }} className="p-1.5 rounded-lg text-gray-500 hover:text-white hover:bg-white/[0.04] transition-colors">
                            {showRoute ? <FiChevronUp className="w-4 h-4" /> : <FiChevronDown className="w-4 h-4" />}
                        </button>
                    )}
                    {onBook && (
                        <motion.button whileTap={{ scale: 0.95 }} onClick={e => { e.stopPropagation(); onBook(train); }} className="btn-primary text-xs py-1.5 px-4">
                            Book
                        </motion.button>
                    )}
                </div>
            </div>
            {expandable && showRoute && (
                <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} className="mt-3 pt-3 border-t border-white/[0.04]">
                    <div className="text-xs text-gray-600 mb-2">Route: {train.routeName}</div>
                    <div className="flex flex-wrap gap-1">
                        {train.stations.map((s, i) => (
                            <React.Fragment key={s.code}>
                                <span className="text-xs text-gray-400 bg-white/[0.04] px-2 py-0.5 rounded">
                                    {s.name} <span className="text-gray-600">{s.departure !== '--' ? s.departure : s.arrival}</span>
                                </span>
                                {i < train.stations.length - 1 && <span className="text-gray-700 text-xs">→</span>}
                            </React.Fragment>
                        ))}
                    </div>
                </motion.div>
            )}
        </div>
    );
}

function CardBack({ train }) {
    return (
        <div className="h-full card p-5 border-primary-500/20 overflow-y-auto">
            <div className="text-xs text-primary-400 mb-2 font-semibold uppercase tracking-wider">Full Route</div>
            <h3 className="text-sm font-bold text-white mb-1">{train.name}</h3>
            <p className="text-xs text-gray-500 mb-3">#{train.trainNo} &middot; {train.routeName}</p>
            <div className="space-y-1">
                {train.stations.map((s, i) => (
                    <div key={s.code} className="flex items-center space-x-2 text-xs">
                        <div className="relative flex flex-col items-center">
                            <div className={`w-2 h-2 rounded-full ${i === 0 || i === train.stations.length - 1 ? 'bg-primary-400' : 'bg-gray-700 border border-gray-600'}`} />
                            {i < train.stations.length - 1 && <div className="w-px h-3 bg-gray-800" />}
                        </div>
                        <div className="flex-1 flex justify-between">
                            <span className={i === 0 || i === train.stations.length - 1 ? 'text-white font-medium' : 'text-gray-500'}>{s.name}</span>
                            <span className="text-gray-600 font-mono">{s.departure !== '--' ? s.departure : s.arrival}</span>
                        </div>
                    </div>
                ))}
            </div>
            <div className="mt-3 pt-2 border-t border-white/[0.04] text-xs text-gray-600">
                Fare from ₹{train.fare.general} &middot; {train.stations.length} stops
            </div>
        </div>
    );
}
