import { useState, useMemo, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useBooking } from '../context/BookingContext';
import { generateAllTrains, searchTrains } from '../data/generateTrains';
import { getAllDistricts } from '../data/stations';
import SeatMap from './SeatMap';
import { FiSearch, FiArrowRight, FiUser, FiMapPin, FiCheck, FiChevronRight, FiChevronLeft, FiAlertCircle } from 'react-icons/fi';

const STEPS = ['Search', 'Select Train', 'Seats', 'Passengers', 'Payment', 'Confirm'];

export default function BookingSection() {
    const navigate = useNavigate();
    const location = useLocation();
    const { user, isAuthenticated } = useAuth();
    const { createBooking } = useBooking();
    const allTrains = useMemo(() => generateAllTrains(), []);
    const districts = useMemo(() => getAllDistricts(), []);

    const [step, setStep] = useState(location.state?.selectedTrain ? 2 : 0);
    const [from, setFrom] = useState('');
    const [to, setTo] = useState('');
    const [results, setResults] = useState([]);
    const [selectedTrain, setSelectedTrain] = useState(location.state?.selectedTrain || null);
    const [selectedSeats, setSelectedSeats] = useState([]);
    const [passengers, setPassengers] = useState([{ name: '', age: '', gender: 'male' }]);
    const [paymentMethod, setPaymentMethod] = useState('upi');
    const [bookingResult, setBookingResult] = useState(null);
    const [error, setError] = useState('');

    const handleSearch = () => {
        if (!from && !to) { setError('Select at least one station'); return; }
        setError('');
        const found = searchTrains(allTrains, { source: from || undefined, destination: to || undefined });
        setResults(found.filter(t => t.status !== 'Cancelled'));
        setStep(1);
    };

    const handleSelectTrain = (train) => { setSelectedTrain(train); setStep(2); };

    const handleSeatNext = () => {
        if (selectedSeats.length === 0) { setError('Select at least one seat'); return; }
        setError('');
        setPassengers(selectedSeats.map(() => ({ name: '', age: '', gender: 'male' })));
        setStep(3);
    };

    const updatePassenger = (idx, field, value) => {
        setPassengers(prev => prev.map((p, i) => i === idx ? { ...p, [field]: value } : p));
    };

    const handlePassengerNext = () => {
        if (passengers.some(p => !p.name.trim() || !p.age)) { setError('Fill in all passenger details'); return; }
        setError('');
        setStep(4);
    };

    const handlePaymentNext = () => {
        if (!paymentMethod) { setError('Select a payment method'); return; }
        setError('');
        setStep(5);
    };

    const handleConfirm = () => {
        if (!isAuthenticated) { navigate('/profile'); return; }
        const coach = selectedSeats[0]?.split('-')[0] || 'GEN';
        const fareMap = { GEN: selectedTrain.fare.general, SL: selectedTrain.fare.sleeper, '3A': selectedTrain.fare.ac3, '2A': selectedTrain.fare.ac2, '1A': selectedTrain.fare.ac1 };
        const fare = (fareMap[coach] || selectedTrain.fare.general) * selectedSeats.length;
        const booking = createBooking({
            userId: user.id,
            trainNo: selectedTrain.trainNo,
            trainName: selectedTrain.name,
            trainType: selectedTrain.type,
            source: selectedTrain.source.name,
            destination: selectedTrain.destination.name,
            departure: selectedTrain.departure,
            arrival: selectedTrain.arrival,
            coach,
            seatNo: selectedSeats.join(', '),
            selectedSeats,
            passengers,
            passengerName: passengers[0].name,
            age: passengers[0].age,
            gender: passengers[0].gender,
            fare,
            paymentMethod,
        });
        setBookingResult(booking);
        setStep(6);
    };

    const goBack = () => { setError(''); setStep(s => Math.max(0, s - 1)); };

    return (
        <div className="min-h-screen pt-4">
            {/* Stepper */}
            {step < 6 && (
                <div className="card p-4 mb-6">
                    <div className="flex items-center justify-between max-w-2xl mx-auto">
                        {STEPS.map((label, i) => (
                            <div key={label} className="flex items-center">
                                <div className={`flex items-center justify-center w-8 h-8 rounded-full text-xs font-semibold transition-colors ${i < step ? 'bg-primary-500 text-white' : i === step ? 'bg-primary-500/20 text-primary-400 ring-2 ring-primary-500' : 'bg-white/[0.04] text-gray-600'}`}>
                                    {i < step ? <FiCheck className="w-4 h-4" /> : i + 1}
                                </div>
                                <span className={`hidden sm:block ml-2 text-[10px] uppercase font-bold tracking-widest ${i <= step ? 'text-white' : 'text-gray-600'}`}>{label}</span>
                                {i < STEPS.length - 1 && <FiChevronRight className="mx-1 sm:mx-2 text-gray-700 w-3 h-3 sm:w-4 sm:h-4" />}
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Error */}
            <AnimatePresence>
                {error && (
                    <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="mb-4 p-3 rounded-lg bg-red-500/10 border border-red-500/20 flex items-center space-x-2 text-sm text-red-400">
                        <FiAlertCircle className="w-4 h-4 flex-shrink-0" /><span>{error}</span>
                    </motion.div>
                )}
            </AnimatePresence>

            <AnimatePresence mode="wait">
                {/* Step 0: Search */}
                {step === 0 && (
                    <motion.div key="search" initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }} className="card p-6">
                        <h2 className="text-xl font-bold text-white mb-6">Search Trains</h2>
                        <div className="grid md:grid-cols-2 gap-4 mb-6">
                            <div>
                                <label className="block text-xs text-gray-500 mb-1.5 font-medium">From</label>
                                <div className="relative">
                                    <FiMapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-600 w-4 h-4" />
                                    <select value={from} onChange={e => setFrom(e.target.value)} className="input-field pl-10 w-full">
                                        <option value="">Select origin</option>
                                        {districts.map(d => <option key={d} value={d}>{d}</option>)}
                                    </select>
                                </div>
                            </div>
                            <div>
                                <label className="block text-xs text-gray-500 mb-1.5 font-medium">To</label>
                                <div className="relative">
                                    <FiMapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-600 w-4 h-4" />
                                    <select value={to} onChange={e => setTo(e.target.value)} className="input-field pl-10 w-full">
                                        <option value="">Select destination</option>
                                        {districts.map(d => <option key={d} value={d}>{d}</option>)}
                                    </select>
                                </div>
                            </div>
                        </div>
                        <motion.button whileTap={{ scale: 0.95 }} onClick={handleSearch} className="btn-primary flex items-center space-x-2 w-full justify-center py-3">
                            <FiSearch className="w-4 h-4" /><span>Search Trains</span>
                        </motion.button>
                    </motion.div>
                )}

                {/* Step 1: Select Train */}
                {step === 1 && (
                    <motion.div key="select" initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }}>
                        <div className="flex items-center justify-between mb-4">
                            <button onClick={goBack} className="btn-ghost flex items-center space-x-1 text-sm"><FiChevronLeft className="w-4 h-4" /><span>Back</span></button>
                            <p className="text-sm text-gray-500"><span className="font-semibold text-white">{results.length}</span> trains available</p>
                        </div>
                        {results.length > 0 ? (
                            <div className="grid gap-3 sm:grid-cols-2">
                                {results.slice(0, 20).map(train => (
                                    <motion.div key={train.trainNo} whileHover={{ y: -2 }} className="card p-4 cursor-pointer hover:border-primary-500/30 transition-colors" onClick={() => handleSelectTrain(train)}>
                                        <div className="flex items-center justify-between mb-2">
                                            <span className="text-xs text-primary-400 font-mono">#{train.trainNo}</span>
                                            <span className={`badge ${train.type === 'Express' ? 'bg-orange-500/20 text-orange-400' : train.type === 'Superfast' ? 'bg-purple-500/20 text-purple-400' : 'bg-cyan-500/20 text-cyan-400'}`}>{train.type}</span>
                                        </div>
                                        <h4 className="text-sm font-semibold text-white truncate">{train.name}</h4>
                                        <div className="flex items-center justify-between mt-2 text-xs text-gray-500">
                                            <span>{train.source.name}</span>
                                            <FiArrowRight className="text-gray-700" />
                                            <span>{train.destination.name}</span>
                                        </div>
                                        <div className="flex items-center justify-between mt-2">
                                            <span className="text-xs text-gray-600">{train.departure} — {train.arrival}</span>
                                            <span className="text-sm font-semibold text-primary-400">₹{train.fare.general}</span>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        ) : (
                            <div className="card p-12 text-center">
                                <p className="text-gray-500">No trains found for this route.</p>
                            </div>
                        )}
                    </motion.div>
                )}

                {/* Step 2: Seat Selection */}
                {step === 2 && selectedTrain && (
                    <motion.div key="seats" initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }}>
                        <div className="flex items-center justify-between mb-4">
                            <button onClick={goBack} className="btn-ghost flex items-center space-x-1 text-sm"><FiChevronLeft className="w-4 h-4" /><span>Back</span></button>
                            <h3 className="text-sm font-semibold text-white">{selectedTrain.name}</h3>
                        </div>
                        <SeatMap train={selectedTrain} selectedSeats={selectedSeats} onSeatSelect={setSelectedSeats} maxSeats={6} />
                        <motion.button whileTap={{ scale: 0.95 }} onClick={handleSeatNext} disabled={selectedSeats.length === 0} className="btn-primary w-full mt-4 py-3 disabled:opacity-30 disabled:cursor-not-allowed">
                            Continue — {selectedSeats.length} seat{selectedSeats.length !== 1 ? 's' : ''} selected
                        </motion.button>
                    </motion.div>
                )}

                {/* Step 3: Passenger Details */}
                {step === 3 && (
                    <motion.div key="passengers" initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }}>
                        <div className="flex items-center justify-between mb-4">
                            <button onClick={goBack} className="btn-ghost flex items-center space-x-1 text-sm"><FiChevronLeft className="w-4 h-4" /><span>Back</span></button>
                            <h3 className="text-sm text-gray-500">{passengers.length} passenger{passengers.length > 1 ? 's' : ''}</h3>
                        </div>
                        <div className="space-y-4">
                            {passengers.map((p, idx) => (
                                <div key={idx} className="card p-5">
                                    <div className="flex items-center space-x-2 mb-4">
                                        <div className="w-8 h-8 rounded-full bg-primary-500/10 flex items-center justify-center"><FiUser className="w-4 h-4 text-primary-400" /></div>
                                        <div>
                                            <h4 className="text-sm font-semibold text-white">Passenger {idx + 1}</h4>
                                            <p className="text-xs text-gray-600">Seat: {selectedSeats[idx]}</p>
                                        </div>
                                    </div>
                                    <div className="grid sm:grid-cols-3 gap-3">
                                        <div>
                                            <label className="block text-xs text-gray-500 mb-1">Full Name</label>
                                            <input type="text" value={p.name} onChange={e => updatePassenger(idx, 'name', e.target.value)} placeholder="Enter name" className="input-field w-full" />
                                        </div>
                                        <div>
                                            <label className="block text-xs text-gray-500 mb-1">Age</label>
                                            <input type="number" min="1" max="120" value={p.age} onChange={e => updatePassenger(idx, 'age', e.target.value)} placeholder="Age" className="input-field w-full" />
                                        </div>
                                        <div>
                                            <label className="block text-xs text-gray-500 mb-1">Gender</label>
                                            <select value={p.gender} onChange={e => updatePassenger(idx, 'gender', e.target.value)} className="input-field w-full">
                                                <option value="male">Male</option>
                                                <option value="female">Female</option>
                                                <option value="other">Other</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <motion.button whileTap={{ scale: 0.95 }} onClick={handlePassengerNext} className="btn-primary w-full mt-4 py-3">
                            Proceed to Payment
                        </motion.button>
                    </motion.div>
                )}

                {/* Step 4: Payment */}
                {step === 4 && (
                    <motion.div key="payment" initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }}>
                        <div className="flex items-center justify-between mb-4">
                            <button onClick={goBack} className="btn-ghost flex items-center space-x-1 text-sm"><FiChevronLeft className="w-4 h-4" /><span>Back</span></button>
                            <h3 className="text-sm font-semibold text-white">Payment Method</h3>
                        </div>
                        <div className="card p-6 space-y-4">
                            <div className="space-y-3">
                                {['upi', 'card', 'netbanking'].map(method => (
                                    <label key={method} className={`flex items-center p-4 border rounded-xl cursor-pointer transition-colors ${paymentMethod === method ? 'border-primary-500 bg-primary-500/10' : 'border-white/[0.04] hover:bg-white/[0.02]'}`}>
                                        <input type="radio" name="paymentMethod" value={method} checked={paymentMethod === method} onChange={(e) => setPaymentMethod(e.target.value)} className="hidden" />
                                        <div className={`w-4 h-4 rounded-full border flex items-center justify-center mr-3 ${paymentMethod === method ? 'border-primary-500' : 'border-gray-500'}`}>
                                            {paymentMethod === method && <div className="w-2 h-2 rounded-full bg-primary-500" />}
                                        </div>
                                        <div className="flex flex-col">
                                            <span className="text-sm font-bold text-white uppercase tracking-wider">{method === 'upi' ? 'UPI / QR Code' : method === 'card' ? 'Credit / Debit Card' : 'Net Banking'}</span>
                                            <span className="text-[10px] text-gray-500 uppercase">{method === 'upi' ? 'Google Pay, PhonePe, Paytm' : method === 'card' ? 'Visa, Mastercard, RuPay' : 'All major banks supported'}</span>
                                        </div>
                                    </label>
                                ))}
                            </div>
                        </div>
                        <motion.button whileTap={{ scale: 0.95 }} onClick={handlePaymentNext} className="btn-primary w-full mt-4 py-3 text-base">
                            Review Booking
                        </motion.button>
                    </motion.div>
                )}

                {/* Step 5: Confirm */}
                {step === 5 && selectedTrain && (
                    <motion.div key="confirm" initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }}>
                        <div className="flex items-center justify-between mb-4">
                            <button onClick={goBack} className="btn-ghost flex items-center space-x-1 text-sm"><FiChevronLeft className="w-4 h-4" /><span>Back</span></button>
                            <h3 className="text-sm font-semibold text-white">Review & Confirm</h3>
                        </div>
                        <div className="card p-6 space-y-5">
                            <div>
                                <h4 className="text-xs uppercase tracking-wider text-gray-600 mb-2">Train</h4>
                                <p className="text-lg font-bold text-white">{selectedTrain.name}</p>
                                <p className="text-sm text-gray-500">#{selectedTrain.trainNo} &middot; {selectedTrain.type}</p>
                            </div>
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm font-medium text-white">{selectedTrain.source.name}</p>
                                    <p className="text-xs text-gray-600">{selectedTrain.departure}</p>
                                </div>
                                <FiArrowRight className="text-primary-400" />
                                <div className="text-right">
                                    <p className="text-sm font-medium text-white">{selectedTrain.destination.name}</p>
                                    <p className="text-xs text-gray-600">{selectedTrain.arrival}</p>
                                </div>
                            </div>
                            <div className="h-px bg-white/[0.04]" />
                            <div>
                                <h4 className="text-xs uppercase tracking-wider text-gray-600 mb-2">Seats</h4>
                                <div className="flex flex-wrap gap-2">{selectedSeats.map(s => <span key={s} className="badge bg-primary-500/20 text-primary-400">{s}</span>)}</div>
                            </div>
                            <div>
                                <h4 className="text-xs uppercase tracking-wider text-gray-600 mb-2">Passengers</h4>
                                <div className="space-y-2">
                                    {passengers.map((p, i) => (
                                        <div key={i} className="flex items-center justify-between text-sm">
                                            <span className="text-white">{p.name}</span>
                                            <span className="text-gray-600">{p.age} yr &middot; {p.gender} &middot; {selectedSeats[i]}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className="h-px bg-white/[0.04]" />
                            <div>
                                <h4 className="text-xs uppercase tracking-wider text-gray-600 mb-2">Payment Option</h4>
                                <div className="flex items-center gap-2">
                                    <span className="badge bg-green-500/20 text-green-400 capitalize">{paymentMethod === 'upi' ? 'UPI / QR' : paymentMethod === 'card' ? 'Credit/Debit Card' : 'Net Banking'}</span>
                                </div>
                            </div>
                            <div className="h-px bg-white/[0.04]" />
                            <div className="flex items-center justify-between">
                                <span className="text-gray-500">Total Fare</span>
                                <span className="text-2xl font-bold text-primary-400">₹{(() => {
                                    const coach = selectedSeats[0]?.split('-')[0] || 'GEN';
                                    const fareMap = { GEN: selectedTrain.fare.general, SL: selectedTrain.fare.sleeper, '3A': selectedTrain.fare.ac3, '2A': selectedTrain.fare.ac2, '1A': selectedTrain.fare.ac1 };
                                    return (fareMap[coach] || selectedTrain.fare.general) * selectedSeats.length;
                                })()}</span>
                            </div>
                            {!isAuthenticated && (
                                <div className="p-3 rounded-lg bg-amber-500/10 border border-amber-500/20 text-sm text-amber-400">
                                    You need to sign in to complete this booking.
                                </div>
                            )}
                            <motion.button whileTap={{ scale: 0.95 }} onClick={handleConfirm} className="btn-primary w-full py-3 text-base">
                                {isAuthenticated ? 'Confirm & Book' : 'Sign In to Book'}
                            </motion.button>
                        </div>
                    </motion.div>
                )}

                {/* Step 6: Success */}
                {step === 6 && bookingResult && (
                    <motion.div key="success" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="card p-8 text-center max-w-lg mx-auto">
                        <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', stiffness: 200 }} className="w-16 h-16 mx-auto mb-4 rounded-full bg-green-500/20 flex items-center justify-center">
                            <FiCheck className="w-8 h-8 text-green-400" />
                        </motion.div>
                        <h2 className="text-2xl font-bold text-white mb-2">Booking Confirmed!</h2>
                        <p className="text-gray-500 mb-6">Your ticket has been booked successfully.</p>
                        <div className="space-y-3 text-sm text-left mb-6">
                            <div className="flex justify-between"><span className="text-gray-500">Ticket ID</span><span className="font-mono text-primary-400">{bookingResult.ticketId}</span></div>
                            <div className="flex justify-between"><span className="text-gray-500">PNR</span><span className="font-mono text-white">{bookingResult.pnr}</span></div>
                            <div className="flex justify-between"><span className="text-gray-500">Train</span><span className="text-white">{bookingResult.trainName}</span></div>
                            <div className="flex justify-between"><span className="text-gray-500">Status</span><span className="badge badge-success">{bookingResult.status}</span></div>
                        </div>
                        <div className="flex space-x-3">
                            <motion.button whileTap={{ scale: 0.95 }} onClick={() => navigate('/tickets')} className="btn-primary flex-1">View Tickets</motion.button>
                            <motion.button whileTap={{ scale: 0.95 }} onClick={() => { setStep(0); setSelectedTrain(null); setSelectedSeats([]); setPassengers([{ name: '', age: '', gender: 'male' }]); setBookingResult(null); }} className="btn-ghost flex-1">New Booking</motion.button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
