// Helper utilities

export function formatDate(dateStr) {
    return new Date(dateStr).toLocaleDateString('en-IN', {
        day: '2-digit', month: 'short', year: 'numeric',
    });
}

export function formatTime(timeStr) {
    if (!timeStr || timeStr === '--') return '--';
    return timeStr;
}

export function getDayName(dayNum) {
    const days = ['', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    return days[dayNum] || '';
}

export function getTrainTypeColor(type) {
    const colors = {
        Suburban: 'from-blue-500 to-cyan-500',
        MEMU: 'from-green-500 to-emerald-500',
        Passenger: 'from-yellow-500 to-amber-500',
        Express: 'from-orange-500 to-red-500',
        Superfast: 'from-purple-500 to-pink-500',
        Intercity: 'from-indigo-500 to-blue-500',
    };
    return colors[type] || 'from-gray-500 to-gray-600';
}

export function getTrainTypeBadgeColor(type) {
    const colors = {
        Suburban: 'bg-cyan-500/20 text-cyan-400 border-cyan-500/30',
        MEMU: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30',
        Passenger: 'bg-amber-500/20 text-amber-400 border-amber-500/30',
        Express: 'bg-orange-500/20 text-orange-400 border-orange-500/30',
        Superfast: 'bg-purple-500/20 text-purple-400 border-purple-500/30',
        Intercity: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
    };
    return colors[type] || 'bg-gray-500/20 text-gray-400 border-gray-500/30';
}

export function getStatusColor(status) {
    if (status === 'On Time') return 'text-green-400';
    if (status === 'Cancelled') return 'text-red-400';
    if (status.startsWith('Delayed')) return 'text-yellow-400';
    return 'text-gray-400';
}

export function getStatusBg(status) {
    if (status === 'On Time') return 'bg-green-500/20 border-green-500/30';
    if (status === 'Cancelled') return 'bg-red-500/20 border-red-500/30';
    if (status.startsWith('Delayed')) return 'bg-yellow-500/20 border-yellow-500/30';
    return 'bg-gray-500/20 border-gray-500/30';
}

export function generateSeatLayout(coaches) {
    const seats = [];
    let seatNum = 1;

    const coachConfig = {
        general: { prefix: 'GEN', seatsPerCoach: 72, rows: 12, cols: 6 },
        sleeper: { prefix: 'SL', seatsPerCoach: 72, rows: 12, cols: 6 },
        ac3: { prefix: '3A', seatsPerCoach: 64, rows: 8, cols: 8 },
        ac2: { prefix: '2A', seatsPerCoach: 48, rows: 8, cols: 6 },
        ac1: { prefix: '1A', seatsPerCoach: 24, rows: 6, cols: 4 },
        secondSitting: { prefix: '2S', seatsPerCoach: 72, rows: 12, cols: 6 },
    };

    Object.entries(coaches).forEach(([type, count]) => {
        const config = coachConfig[type];
        if (!config) return;

        for (let c = 1; c <= count; c++) {
            const coachName = `${config.prefix}-${c}`;
            for (let r = 0; r < config.rows; r++) {
                for (let col = 0; col < config.cols; col++) {
                    seats.push({
                        id: `${coachName}-${seatNum}`,
                        seatNumber: seatNum,
                        coach: coachName,
                        coachType: type,
                        row: r,
                        col: col,
                        position: col < config.cols / 2 ? 'window' : col === config.cols / 2 ? 'middle' : 'aisle',
                    });
                    seatNum++;
                }
            }
        }
    });

    return seats;
}

export function debounce(fn, delay) {
    let timer;
    return function (...args) {
        clearTimeout(timer);
        timer = setTimeout(() => fn.apply(this, args), delay);
    };
}
