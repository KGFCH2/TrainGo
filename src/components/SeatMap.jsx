import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useBooking } from '../context/BookingContext';

const ROWS = 12;
const COLS = 6;
const COACH_TYPES = ['GEN', 'SL', '3A', '2A', '1A'];

export default function SeatMap({ train, selectedSeats, onSeatSelect, maxSeats = 6 }) {
    const { getBookedSeatsForTrain } = useBooking();
    const [activeCoach, setActiveCoach] = useState('GEN');

    const bookedSeats = useMemo(() => getBookedSeatsForTrain(train.trainNo), [train.trainNo]);

    const coachSeats = useMemo(() => {
        const seats = [];
        const config = {
            GEN: { rows: 12, cols: 6, total: 72 },
            SL: { rows: 12, cols: 6, total: 72 },
            '3A': { rows: 8, cols: 8, total: 64 },
            '2A': { rows: 8, cols: 6, total: 48 },
            '1A': { rows: 6, cols: 4, total: 24 },
        };
        const c = config[activeCoach];
        let num = 1;
        for (let r = 0; r < c.rows; r++) {
            const row = [];
            for (let col = 0; col < c.cols; col++) {
                const seatId = `${activeCoach}-${num}`;
                row.push({
                    id: seatId,
                    number: num,
                    isBooked: bookedSeats.includes(seatId),
                    isSelected: selectedSeats.includes(seatId),
                    position: col === 0 ? 'W' : col === c.cols - 1 ? 'W' : col === Math.floor(c.cols / 2) - 1 || col === Math.floor(c.cols / 2) ? 'M' : 'A',
                });
                num++;
            }
            seats.push(row);
        }
        return seats;
    }, [activeCoach, bookedSeats, selectedSeats]);

    const handleSeatClick = (seat) => {
        if (seat.isBooked) return;
        if (seat.isSelected) {
            onSeatSelect(selectedSeats.filter(s => s !== seat.id));
        } else if (selectedSeats.length < maxSeats) {
            onSeatSelect([...selectedSeats, seat.id]);
        }
    };

    const fareMap = {
        GEN: train.fare.general,
        SL: train.fare.sleeper,
        '3A': train.fare.ac3,
        '2A': train.fare.ac2,
        '1A': train.fare.ac1,
    };

    return (
        <div className="bg-gray-800/50 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
            <h3 className="text-lg font-bold text-white mb-4">Select Your Seats</h3>

            {/* Coach selector */}
            <div className="flex flex-wrap gap-2 mb-6">
                {COACH_TYPES.map((type) => (
                    <motion.button
                        key={type}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setActiveCoach(type)}
                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${activeCoach === type
                            ? 'bg-saffron text-white shadow-lg shadow-saffron/25'
                            : 'bg-white/5 text-gray-400 border border-white/10 hover:text-white hover:bg-white/10'
                            }`}
                    >
                        {type}
                        <span className="ml-2 text-xs opacity-70">₹{fareMap[type]}</span>
                    </motion.button>
                ))}
            </div>

            {/* Legend */}
            <div className="flex flex-wrap gap-4 mb-4 text-xs">
                <div className="flex items-center space-x-2">
                    <div className="w-5 h-5 rounded bg-gray-700 border border-gray-600" />
                    <span className="text-gray-400">Available</span>
                </div>
                <div className="flex items-center space-x-2">
                    <div className="w-5 h-5 rounded bg-saffron border border-saffron" />
                    <span className="text-gray-400">Selected</span>
                </div>
                <div className="flex items-center space-x-2">
                    <div className="w-5 h-5 rounded bg-red-900/50 border border-red-800" />
                    <span className="text-gray-400">Booked</span>
                </div>
                <div className="flex items-center space-x-2">
                    <span className="text-gray-500">W=Window M=Middle A=Aisle</span>
                </div>
            </div>

            {/* Seat grid */}
            <div className="overflow-x-auto">
                <div className="min-w-fit">
                    {/* Coach header */}
                    <div className="flex items-center justify-center mb-3">
                        <div className="h-px flex-1 bg-gradient-to-r from-transparent via-saffron/30 to-transparent" />
                        <span className="px-4 text-xs text-saffron font-semibold">COACH {activeCoach}</span>
                        <div className="h-px flex-1 bg-gradient-to-r from-transparent via-saffron/30 to-transparent" />
                    </div>

                    <div className="space-y-1.5 max-h-96 overflow-y-auto pr-2">
                        {coachSeats.map((row, rIdx) => (
                            <div key={rIdx} className="flex items-center justify-center gap-1.5">
                                <span className="text-xs text-gray-600 w-6 text-right">{rIdx + 1}</span>
                                {row.map((seat, cIdx) => {
                                    // Add aisle gap
                                    const isAisle = cIdx === Math.floor(row.length / 2);
                                    return (
                                        <React.Fragment key={seat.id}>
                                            {isAisle && <div className="w-4" />}
                                            <motion.button
                                                whileHover={!seat.isBooked ? { scale: 1.15 } : {}}
                                                whileTap={!seat.isBooked ? { scale: 0.9 } : {}}
                                                onClick={() => handleSeatClick(seat)}
                                                disabled={seat.isBooked}
                                                className={`w-9 h-9 rounded-lg text-xs font-medium transition-all relative group ${seat.isBooked
                                                    ? 'bg-red-900/30 border border-red-800/50 text-red-600 cursor-not-allowed'
                                                    : seat.isSelected
                                                        ? 'bg-saffron border border-saffron text-white shadow-lg shadow-saffron/30'
                                                        : 'bg-gray-700/50 border border-gray-600/50 text-gray-400 hover:bg-gray-600/50 hover:border-saffron/30 cursor-pointer'
                                                    }`}
                                            >
                                                {seat.number}
                                                {/* Tooltip */}
                                                <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-1 px-2 py-1 bg-gray-900 rounded text-xs text-white whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10">
                                                    Seat {seat.number} ({seat.position})
                                                </div>
                                            </motion.button>
                                        </React.Fragment>
                                    );
                                })}
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Selection summary */}
            <AnimatePresence>
                {selectedSeats.length > 0 && (
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        className="mt-4 p-4 bg-saffron/10 border border-saffron/20 rounded-xl"
                    >
                        <div className="flex items-center justify-between">
                            <div>
                                <div className="text-sm text-white font-medium">
                                    {selectedSeats.length} seat{selectedSeats.length > 1 ? 's' : ''} selected
                                </div>
                                <div className="text-xs text-gray-400 mt-1">
                                    {selectedSeats.join(', ')}
                                </div>
                            </div>
                            <div className="text-right">
                                <div className="text-xs text-gray-400">Total Fare</div>
                                <div className="text-xl font-bold text-saffron">
                                    ₹{selectedSeats.length * fareMap[activeCoach]}
                                </div>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
