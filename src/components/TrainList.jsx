import { useState, useMemo, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { generateAllTrains, searchTrains } from '../data/generateTrains';
import { getAllDistricts } from '../data/stations';
import TrainCard from './TrainCard';
import { FiSearch, FiFilter, FiX, FiRefreshCw, FiMapPin, FiArrowRight } from 'react-icons/fi';

const TRAIN_TYPES = ['All', 'Express', 'Superfast', 'Local', 'Intercity', 'Passenger', 'Mail'];
const STATUS_OPTS = ['All', 'On Time', 'Delayed', 'Cancelled'];

export default function TrainList() {
    const navigate = useNavigate();
    const districts = useMemo(() => getAllDistricts(), []);
    const allTrains = useMemo(() => generateAllTrains(), []);
    const [from, setFrom] = useState('');
    const [to, setTo] = useState('');
    const [trainType, setTrainType] = useState('All');
    const [status, setStatus] = useState('All');
    const [sortBy, setSortBy] = useState('departure');
    const [showFilters, setShowFilters] = useState(false);
    const [searched, setSearched] = useState(false);

    const trains = useMemo(() => {
        const results = searchTrains(allTrains, { source: from || undefined, destination: to || undefined, type: trainType !== 'All' ? trainType : undefined });
        let filtered = results;
        if (status !== 'All') filtered = filtered.filter(t => t.status === status);
        if (sortBy === 'departure') filtered.sort((a, b) => a.departure.localeCompare(b.departure));
        else if (sortBy === 'fare') filtered.sort((a, b) => a.fare.general - b.fare.general);
        else if (sortBy === 'duration') filtered.sort((a, b) => a.duration.localeCompare(b.duration));
        return filtered;
    }, [allTrains, from, to, trainType, status, sortBy]);

    const handleSearch = useCallback(() => setSearched(true), []);
    const handleBook = useCallback((train) => {
        navigate('/booking', { state: { selectedTrain: train } });
    }, [navigate]);
    const resetFilters = () => { setTrainType('All'); setStatus('All'); setSortBy('departure'); };

    return (
        <div className="min-h-screen pt-4">
            {/* Search bar */}
            <div className="card p-6 mb-6">
                <div className="flex flex-col lg:flex-row items-stretch lg:items-end gap-4">
                    <div className="flex-1">
                        <label className="block text-xs text-gray-500 mb-1.5 font-medium">From Station</label>
                        <div className="relative">
                            <FiMapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-600 w-4 h-4" />
                            <select value={from} onChange={e => setFrom(e.target.value)} className="input-field pl-10 pr-4 py-2.5 w-full">
                                <option value="">All Stations</option>
                                {districts.map(d => <option key={d} value={d}>{d}</option>)}
                            </select>
                        </div>
                    </div>
                    <div className="flex items-center justify-center lg:pb-2">
                        <motion.button whileTap={{ scale: 0.9, rotate: 180 }} onClick={() => { const t = from; setFrom(to); setTo(t); }} className="p-2 rounded-full bg-white/[0.04] text-gray-500 hover:text-primary-400 hover:bg-primary-500/10 transition-colors">
                            <FiArrowRight className="w-4 h-4 rotate-90 lg:rotate-0" />
                        </motion.button>
                    </div>
                    <div className="flex-1">
                        <label className="block text-xs text-gray-500 mb-1.5 font-medium">To Station</label>
                        <div className="relative">
                            <FiMapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-600 w-4 h-4" />
                            <select value={to} onChange={e => setTo(e.target.value)} className="input-field pl-10 pr-4 py-2.5 w-full">
                                <option value="">All Stations</option>
                                {districts.map(d => <option key={d} value={d}>{d}</option>)}
                            </select>
                        </div>
                    </div>
                    <div className="flex space-x-2">
                        <motion.button whileTap={{ scale: 0.95 }} onClick={handleSearch} className="btn-primary flex items-center space-x-2 py-2.5 px-6">
                            <FiSearch className="w-4 h-4" /><span>Search</span>
                        </motion.button>
                        <motion.button whileTap={{ scale: 0.95 }} onClick={() => setShowFilters(!showFilters)} className={`btn-ghost py-2.5 px-3 ${showFilters ? 'text-primary-400 bg-primary-500/10' : ''}`}>
                            <FiFilter className="w-4 h-4" />
                        </motion.button>
                    </div>
                </div>

                {/* Filters */}
                <AnimatePresence>
                    {showFilters && (
                        <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
                            <div className="pt-4 mt-4 border-t border-white/[0.04] flex flex-wrap items-center gap-4">
                                <div>
                                    <label className="block text-[10px] uppercase tracking-wider text-gray-600 mb-1.5">Type</label>
                                    <div className="flex flex-wrap gap-1.5">
                                        {TRAIN_TYPES.map(t => (
                                            <button key={t} onClick={() => setTrainType(t)} className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${trainType === t ? 'bg-primary-500 text-white' : 'bg-white/[0.04] text-gray-500 hover:text-white'}`}>{t}</button>
                                        ))}
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-[10px] uppercase tracking-wider text-gray-600 mb-1.5">Status</label>
                                    <div className="flex flex-wrap gap-1.5">
                                        {STATUS_OPTS.map(s => (
                                            <button key={s} onClick={() => setStatus(s)} className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${status === s ? 'bg-primary-500 text-white' : 'bg-white/[0.04] text-gray-500 hover:text-white'}`}>{s}</button>
                                        ))}
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-[10px] uppercase tracking-wider text-gray-600 mb-1.5">Sort by</label>
                                    <select value={sortBy} onChange={e => setSortBy(e.target.value)} className="input-field text-xs py-1.5 px-3">
                                        <option value="departure">Departure</option>
                                        <option value="fare">Fare</option>
                                        <option value="duration">Duration</option>
                                    </select>
                                </div>
                                <button onClick={resetFilters} className="flex items-center space-x-1 text-xs text-gray-600 hover:text-primary-400 transition-colors mt-4">
                                    <FiRefreshCw className="w-3 h-3" /><span>Reset</span>
                                </button>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            {/* Results count */}
            <div className="flex items-center justify-between mb-4">
                <p className="text-sm text-gray-500">
                    {trains.length > 0 ? <><span className="font-semibold text-white">{trains.length}</span> trains found</> : 'No trains match your criteria'}
                    {from && <span className="text-gray-600 ml-1">from {from}</span>}
                    {to && <span className="text-gray-600 ml-1">to {to}</span>}
                </p>
            </div>

            {/* Trains grid */}
            {trains.length > 0 ? (
                <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                    <AnimatePresence mode="popLayout">
                        {trains.slice(0, searched ? trains.length : 30).map((train, i) => (
                            <motion.div key={train.trainNo} layout initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95 }} transition={{ delay: i * 0.03 }}>
                                <TrainCard train={train} onBook={handleBook} />
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>
            ) : (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="card p-12 text-center">
                    <div className="text-4xl mb-3 opacity-50">🔍</div>
                    <h3 className="text-lg font-semibold text-white mb-1">No trains found</h3>
                    <p className="text-sm text-gray-500">Try adjusting your search or filter criteria.</p>
                </motion.div>
            )}
        </div>
    );
}
