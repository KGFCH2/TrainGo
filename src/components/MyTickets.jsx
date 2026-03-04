import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { useBooking } from '../context/BookingContext';
import { downloadTicketPDF } from '../utils/pdfGenerator';
import { formatDate, getStatusColor, getStatusBg } from '../utils/helpers';
import { FiDownload, FiXCircle, FiSearch, FiFilter, FiChevronDown, FiChevronUp, FiClock, FiMapPin, FiArrowRight, FiLock, FiActivity } from 'react-icons/fi';

export default function MyTickets() {
    const { user, isAuthenticated } = useAuth();
    const { getUserBookings, cancelBooking } = useBooking();
    const [filter, setFilter] = useState('all');
    const [search, setSearch] = useState('');
    const [expandedId, setExpandedId] = useState(null);

    const bookings = useMemo(() => {
        if (!user) return [];
        let list = getUserBookings(user.id);
        if (filter === 'confirmed') list = list.filter(b => b.status === 'Confirmed');
        else if (filter === 'cancelled') list = list.filter(b => b.status === 'Cancelled');
        if (search.trim()) {
            const q = search.toLowerCase();
            list = list.filter(b =>
                b.ticketId.toLowerCase().includes(q) ||
                b.pnr.toLowerCase().includes(q) ||
                b.trainName.toLowerCase().includes(q) ||
                b.trainNo.toString().includes(q)
            );
        }
        return list;
    }, [user, filter, search]);

    if (!isAuthenticated) {
        return (
            <div className="flex items-center justify-center py-8">
                <div className="card p-8 text-center max-w-md">
                    <FiLock className="w-12 h-12 text-gray-400 opacity-50 mb-4 mx-auto" />
                    <h2 className="text-xl font-bold text-white mb-2">Sign in Required</h2>
                    <p className="text-sm text-gray-500">Please sign in to view your tickets.</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen pt-4">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
                <div>
                    <h2 className="text-xl font-bold text-white">My Tickets</h2>
                    <p className="text-sm text-gray-500 mt-1">{bookings.length} booking{bookings.length !== 1 ? 's' : ''}</p>
                </div>
                <div className="flex items-center space-x-3 w-full sm:w-auto">
                    <div className="relative flex-1 sm:flex-initial">
                        <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-600 w-4 h-4" />
                        <input type="text" value={search} onChange={e => setSearch(e.target.value)} placeholder="Search tickets..." className="input-field pl-10 pr-4 py-2 w-full sm:w-56" />
                    </div>
                    <select value={filter} onChange={e => setFilter(e.target.value)} className="input-field py-2 px-3 text-sm">
                        <option value="all">All</option>
                        <option value="confirmed">Confirmed</option>
                        <option value="cancelled">Cancelled</option>
                    </select>
                </div>
            </div>

            {bookings.length > 0 ? (
                <div className="space-y-3">
                    <AnimatePresence>
                        {bookings.map((booking, i) => (
                            <motion.div key={booking.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95 }} transition={{ delay: i * 0.05 }} className="card overflow-hidden">
                                <div className="p-5 cursor-pointer" onClick={() => setExpandedId(expandedId === booking.id ? null : booking.id)}>
                                    <div className="flex items-start justify-between">
                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-center space-x-2 mb-2">
                                                <span className={`badge ${getStatusBg(booking.status)} ${getStatusColor(booking.status)}`}>{booking.status}</span>
                                                <span className="text-xs text-gray-600 font-mono">{booking.ticketId}</span>
                                            </div>
                                            <h3 className="text-base font-semibold text-white truncate">{booking.trainName}</h3>
                                            <div className="flex items-center space-x-2 mt-1.5 text-sm text-gray-500">
                                                <span>{booking.source}</span>
                                                <FiArrowRight className="text-gray-700 w-3 h-3" />
                                                <span>{booking.destination}</span>
                                            </div>
                                        </div>
                                        <div className="flex items-center space-x-3 ml-4">
                                            <div className="text-right">
                                                <div className="text-lg font-bold text-primary-400">₹{booking.fare}</div>
                                                <div className="text-xs text-gray-600">{formatDate(booking.bookingDate)}</div>
                                            </div>
                                            <motion.div animate={{ rotate: expandedId === booking.id ? 180 : 0 }}>
                                                <FiChevronDown className="w-5 h-5 text-gray-600" />
                                            </motion.div>
                                        </div>
                                    </div>
                                </div>

                                <AnimatePresence>
                                    {expandedId === booking.id && (
                                        <motion.div initial={{ height: 0 }} animate={{ height: 'auto' }} exit={{ height: 0 }} className="overflow-hidden">
                                            <div className="px-5 pb-5 pt-2 border-t border-white/[0.04]">
                                                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-4">
                                                    <div><div className="text-[10px] uppercase tracking-wider text-gray-600 mb-1">PNR</div><div className="text-sm font-mono text-white">{booking.pnr}</div></div>
                                                    <div><div className="text-[10px] uppercase tracking-wider text-gray-600 mb-1">Train No</div><div className="text-sm text-white">#{booking.trainNo}</div></div>
                                                    <div><div className="text-[10px] uppercase tracking-wider text-gray-600 mb-1">Coach</div><div className="text-sm text-white">{booking.coach}</div></div>
                                                    <div><div className="text-[10px] uppercase tracking-wider text-gray-600 mb-1">Seats</div><div className="text-sm text-white">{booking.seatNo}</div></div>
                                                </div>
                                                <div className="flex items-center justify-between text-sm mb-4">
                                                    <div className="flex items-center space-x-2 text-gray-500"><FiClock className="w-3.5 h-3.5" /><span>{booking.departure} — {booking.arrival}</span></div>
                                                    <div className="flex items-center space-x-2 text-gray-500"><FiMapPin className="w-3.5 h-3.5" /><span>{booking.source} → {booking.destination}</span></div>
                                                </div>
                                                {booking.passengers && (
                                                    <div className="mb-4">
                                                        <div className="text-[10px] uppercase tracking-wider text-gray-600 mb-2">Passengers</div>
                                                        <div className="space-y-1">
                                                            {booking.passengers.map((p, idx) => (
                                                                <div key={idx} className="text-sm flex items-center justify-between text-gray-400">
                                                                    <span className="text-white">{p.name}</span>
                                                                    <span>{p.age} yr &middot; {p.gender}</span>
                                                                </div>
                                                            ))}
                                                        </div>
                                                    </div>
                                                )}
                                                <div className="flex space-x-2">
                                                    <motion.button whileTap={{ scale: 0.95 }} onClick={e => { e.stopPropagation(); downloadTicketPDF(booking); }} className="btn-primary flex items-center space-x-2 py-2 text-sm flex-1">
                                                        <FiDownload className="w-4 h-4" /><span>Download PDF</span>
                                                    </motion.button>
                                                    {booking.status === 'Confirmed' && (
                                                        <motion.button whileTap={{ scale: 0.95 }} onClick={e => { e.stopPropagation(); cancelBooking(booking.id); }} className="flex items-center space-x-2 py-2 px-4 text-sm rounded-lg bg-red-500/10 text-red-400 hover:bg-red-500/20 transition-colors">
                                                            <FiXCircle className="w-4 h-4" /><span>Cancel</span>
                                                        </motion.button>
                                                    )}
                                                </div>
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>
            ) : (
                <div className="card p-12 text-center flex flex-col items-center">
                    <FiActivity className="text-4xl text-gray-500 opacity-20 mb-3" />
                    <h3 className="text-lg font-semibold text-white mb-1">{search || filter !== 'all' ? 'No matching tickets' : 'No tickets yet'}</h3>
                    <p className="text-sm text-gray-500">{search || filter !== 'all' ? 'Try adjusting your search or filters.' : 'Book a train to see your tickets here.'}</p>
                </div>
            )}
        </div>
    );
}
