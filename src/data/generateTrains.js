// Train Generator - Creates 1000+ realistic West Bengal trains
import { stations, routeTemplates, getStation } from './stations';

// Seeded random for consistent generation
function seededRandom(seed) {
    let s = seed;
    return function () {
        s = (s * 16807) % 2147483647;
        return (s - 1) / 2147483646;
    };
}

const rng = seededRandom(42);

// Train name prefixes/suffixes based on West Bengal culture
const trainNames = {
    Express: [
        'Darjeeling Mail', 'Padatik', 'Teesta Torsha', 'Uttar Banga',
        'Kanchanjunga', 'Saraighat', 'Ganadevta', 'Kaviguru',
        'Kanchankanya', 'Bhagirathi', 'Mayurakshi', 'Hooghly',
        'Ganges', 'Gour', 'Ganga Sagar', 'Haldia', 'Kalka Mail',
        'Gitanjali', 'Gnaneshwari Deluxe', 'Samarsata', 'Ajoy', 'Damodar',
    ],
    Superfast: [
        'Vande Bharat', 'Shatabdi', 'Jan Shatabdi', 'Duronto',
        'Rajdhani', 'Humsafar', 'Yuva', 'Kalka Mail',
        'Nandankanan', 'Amrit Bharat',
    ],
    Local: [
        'Barddhaman Local', 'Midnapore Local', 'Kharagpur Local',
        'Arta Local', 'Bandel Local', 'Tarakeswar Local',
        'Goghat Local', 'Gurap Local', 'Seoraphuli Local',
        'Katwa Local', 'Bangaon Local', 'Krishnanagar Local',
        'Naihati Local', 'Shantipur Local', 'Gede Local',
        'Barrackpore Local', 'Kalyani Simanta Local', 'Dankuni Local',
        'Diamond Harbour Local', 'Budge Budge Local', 'Canning Local',
        'Lakshmikantapur Local', 'Namkhana Local', 'Sonarpur Local',
    ],
    MEMU: [
        'MEMU', 'Asansol MEMU', 'Adra MEMU', 'Rampurhat MEMU',
    ],
    Passenger: [
        'Passenger', 'Lalgola Passenger', 'Azimganj Passenger',
    ],
    Intercity: [
        'Intercity', 'Rupashi Bangla', 'Aranyak', 'Subarnarekha',
    ],
};

// Train number ranges by type
const trainNumberRanges = {
    Suburban: { start: 30000, end: 39999 },
    MEMU: { start: 63000, end: 68999 },
    Passenger: { start: 55000, end: 55999 },
    Express: { start: 13000, end: 13999 },
    Superfast: { start: 12000, end: 12999 },
    Intercity: { start: 13000, end: 13999 },
};

// Generate departure time string
function generateTime(baseHour, baseMin, variance = 0) {
    let h = baseHour + Math.floor(rng() * variance);
    let m = baseMin + Math.floor(rng() * 59);
    h = ((h % 24) + 24) % 24;
    m = m % 60;
    return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}`;
}

// Calculate duration between two stations (minutes)
function calcDuration(fromIdx, toIdx, type) {
    const stops = Math.abs(toIdx - fromIdx);
    const basePerStop = type === 'Suburban' ? 4 : type === 'MEMU' ? 5 : type === 'Passenger' ? 6 : 3;
    const haltPerStop = type === 'Suburban' ? 1 : type === 'MEMU' ? 2 : type === 'Passenger' ? 3 : 2;
    return stops * (basePerStop + haltPerStop);
}

// Add minutes to time string
function addMinutes(timeStr, mins) {
    const [h, m] = timeStr.split(':').map(Number);
    const totalMins = h * 60 + m + mins;
    const newH = Math.floor(totalMins / 60) % 24;
    const newM = totalMins % 60;
    return `${String(newH).padStart(2, '0')}:${String(newM).padStart(2, '0')}`;
}

// Format duration
function formatDuration(mins) {
    const h = Math.floor(mins / 60);
    const m = mins % 60;
    if (h === 0) return `${m}m`;
    return `${h}h ${m}m`;
}

// Generate intermediate station timings
function generateStationTimings(stationCodes, departureTime, type) {
    const result = [];
    let currentTime = departureTime;

    for (let i = 0; i < stationCodes.length; i++) {
        const station = getStation(stationCodes[i]);
        if (!station) continue;

        const isFirst = i === 0;
        const isLast = i === stationCodes.length - 1;

        let arrival = currentTime;
        let departure = currentTime;

        if (!isFirst) {
            const travelMins = type === 'Suburban' ? 3 + Math.floor(rng() * 3) :
                type === 'MEMU' ? 4 + Math.floor(rng() * 5) :
                    type === 'Passenger' ? 5 + Math.floor(rng() * 6) :
                        6 + Math.floor(rng() * 10);
            arrival = addMinutes(currentTime, travelMins);
            const haltMins = isLast ? 0 : (type === 'Suburban' ? 1 : type === 'MEMU' ? 2 : 2 + Math.floor(rng() * 3));
            departure = addMinutes(arrival, haltMins);
        }

        result.push({
            code: station.code,
            name: station.name,
            district: station.district,
            arrival: isFirst ? '--' : arrival,
            departure: isLast ? '--' : departure,
            halt: isFirst || isLast ? '--' : `${Math.floor(rng() * 3) + 1}m`,
            day: 1,
        });

        currentTime = isLast ? arrival : departure;
    }

    return result;
}

// Generate a single train
function generateTrain(id, trainNo, route, type, direction, startHour) {
    const stationCodes = direction === 'up' ? [...route.stations] : [...route.stations].reverse();

    // For express/superfast, skip some intermediate stations
    let actualStations = stationCodes;
    if ((type === 'Express' || type === 'Superfast' || type === 'Intercity') && stationCodes.length > 6) {
        const skipRate = type === 'Superfast' ? 0.5 : type === 'Express' ? 0.3 : 0.2;
        actualStations = stationCodes.filter((_, idx) => {
            if (idx === 0 || idx === stationCodes.length - 1) return true;
            return rng() > skipRate;
        });
    }

    const sourceStation = getStation(actualStations[0]);
    const destStation = getStation(actualStations[actualStations.length - 1]);
    if (!sourceStation || !destStation) return null;

    const depTime = generateTime(startHour, Math.floor(rng() * 60));
    const stationTimings = generateStationTimings(actualStations, depTime, type);

    const lastTiming = stationTimings[stationTimings.length - 1];
    const arrivalTime = lastTiming ? lastTiming.arrival : depTime;

    // Calculate total duration
    const [dh, dm] = depTime.split(':').map(Number);
    const [ah, am] = (arrivalTime !== '--' ? arrivalTime : depTime).split(':').map(Number);
    let totalMins = (ah * 60 + am) - (dh * 60 + dm);
    if (totalMins < 0) totalMins += 24 * 60;

    // Generate train name
    const srcName = sourceStation.name.replace(/ Jn$/, '').replace(/ Junction$/, '');
    const dstName = destStation.name.replace(/ Jn$/, '').replace(/ Junction$/, '');

    let trainName;
    if (type === 'Suburban') {
        trainName = `${srcName}-${dstName} Local`;
    } else if (type === 'MEMU') {
        trainName = `${srcName}-${dstName} MEMU`;
    } else if (type === 'Passenger') {
        trainName = `${srcName}-${dstName} Passenger`;
    } else {
        const names = trainNames[type] || trainNames.Express;
        const nameIdx = Math.floor(rng() * names.length);
        trainName = `${names[nameIdx]} ${type === 'Superfast' ? 'SF ' : ''}Express`;
    }

    // Status
    const statusRoll = rng();
    let status = 'On Time';
    let delay = 0;
    if (statusRoll > 0.92) {
        status = 'Cancelled';
    } else if (statusRoll > 0.82) {
        delay = Math.floor(rng() * 45) + 10;
        status = `Delayed ${delay}m`;
    }

    // Days of run
    const daysRoll = rng();
    let runsOn;
    if (type === 'Suburban' || type === 'MEMU') {
        runsOn = [1, 2, 3, 4, 5, 6, 7]; // Daily
    } else if (daysRoll > 0.7) {
        runsOn = [1, 2, 3, 4, 5, 6, 7]; // Daily
    } else if (daysRoll > 0.4) {
        runsOn = [1, 3, 5, 7]; // Alternate
    } else {
        runsOn = [1, 2, 3, 4, 5]; // Weekdays
    }

    // Coach composition based on type
    let coaches;
    if (type === 'Suburban') {
        coaches = { general: 12 };
    } else if (type === 'MEMU') {
        coaches = { general: 8, secondSitting: 2 };
    } else if (type === 'Passenger') {
        coaches = { general: 6, secondSitting: 3, sleeper: 1 };
    } else if (type === 'Superfast') {
        coaches = { ac1: 1, ac2: 2, ac3: 4, sleeper: 8, general: 3 };
    } else {
        coaches = { ac2: 1, ac3: 3, sleeper: 6, general: 4 };
    }

    // Fare calculation
    const baseFare = type === 'Suburban' ? 10 : type === 'MEMU' ? 25 : type === 'Passenger' ? 40 : type === 'Intercity' ? 120 : type === 'Express' ? 200 : 350;
    const distanceFactor = actualStations.length * (type === 'Suburban' ? 2 : 5);

    return {
        id,
        trainNo: String(trainNo),
        name: trainName,
        type,
        source: { code: sourceStation.code, name: sourceStation.name, district: sourceStation.district },
        destination: { code: destStation.code, name: destStation.name, district: destStation.district },
        departure: depTime,
        arrival: arrivalTime,
        duration: formatDuration(totalMins),
        durationMins: totalMins,
        stations: stationTimings,
        routeName: route.name,
        status,
        delay,
        runsOn,
        coaches,
        fare: {
            general: baseFare + distanceFactor,
            sleeper: baseFare * 2 + distanceFactor * 2,
            ac3: baseFare * 4 + distanceFactor * 3,
            ac2: baseFare * 6 + distanceFactor * 4,
            ac1: baseFare * 8 + distanceFactor * 5,
        },
        totalSeats: Object.values(coaches).reduce((a, b) => a + b * 72, 0),
        availableSeats: Math.floor(rng() * 200) + 50,
        distance: actualStations.length * (type === 'Suburban' ? 3 : 12) + Math.floor(rng() * 20),
    };
}

// Generate all trains
export function generateAllTrains() {
    const cached = sessionStorage.getItem('wb_trains');
    if (cached) {
        try {
            return JSON.parse(cached);
        } catch (e) {
            // regenerate
        }
    }

    const trains = [];
    const usedNumbers = new Set();
    let trainId = 1;

    function getUniqueTrainNo(rangeKey) {
        const range = trainNumberRanges[rangeKey] || trainNumberRanges.Express;
        let num;
        let attempts = 0;
        do {
            num = range.start + Math.floor(rng() * (range.end - range.start));
            attempts++;
        } while (usedNumbers.has(num) && attempts < 1000);
        usedNumbers.add(num);
        return num;
    }

    // Generate suburban trains (high frequency)
    const suburbanRoutes = routeTemplates.filter(r => r.types.includes('Suburban'));
    suburbanRoutes.forEach(route => {
        // Generate multiple trains per route (every 20-40 min for peak)
        const trainsPerRoute = route.stations.length > 10 ? 20 : 12;

        for (let i = 0; i < trainsPerRoute; i++) {
            // Down direction
            const downNo = getUniqueTrainNo('Suburban');
            const downHour = 4 + Math.floor(i * (20 / trainsPerRoute));
            const downTrain = generateTrain(trainId++, downNo, route, 'Suburban', 'down', downHour);
            if (downTrain) trains.push(downTrain);

            // Up direction
            const upNo = downNo + 1;
            usedNumbers.add(upNo);
            const upHour = 4 + Math.floor(i * (20 / trainsPerRoute)) + 1;
            const upTrain = generateTrain(trainId++, upNo, route, 'Suburban', 'up', upHour);
            if (upTrain) trains.push(upTrain);
        }
    });

    // Generate MEMU trains
    const memuRoutes = routeTemplates.filter(r => r.types.includes('MEMU'));
    memuRoutes.forEach(route => {
        const count = route.stations.length > 8 ? 8 : 5;
        for (let i = 0; i < count; i++) {
            const downNo = getUniqueTrainNo('MEMU');
            const downTrain = generateTrain(trainId++, downNo, route, 'MEMU', 'down', 5 + i * 2);
            if (downTrain) trains.push(downTrain);

            const upNo = downNo + 1;
            usedNumbers.add(upNo);
            const upTrain = generateTrain(trainId++, upNo, route, 'MEMU', 'up', 6 + i * 2);
            if (upTrain) trains.push(upTrain);
        }
    });

    // Generate Passenger trains
    const passengerRoutes = routeTemplates.filter(r => r.types.includes('Passenger'));
    passengerRoutes.forEach(route => {
        for (let i = 0; i < 4; i++) {
            const downNo = getUniqueTrainNo('Passenger');
            const downTrain = generateTrain(trainId++, downNo, route, 'Passenger', 'down', 5 + i * 4);
            if (downTrain) trains.push(downTrain);

            const upNo = downNo + 1;
            usedNumbers.add(upNo);
            const upTrain = generateTrain(trainId++, upNo, route, 'Passenger', 'up', 7 + i * 4);
            if (upTrain) trains.push(upTrain);
        }
    });

    // Generate Express trains
    const expressRoutes = routeTemplates.filter(r => r.types.includes('Express'));
    expressRoutes.forEach(route => {
        const count = route.stations.length > 6 ? 6 : 3;
        for (let i = 0; i < count; i++) {
            const downNo = getUniqueTrainNo('Express');
            const downTrain = generateTrain(trainId++, downNo, route, 'Express', 'down', Math.floor(rng() * 24));
            if (downTrain) trains.push(downTrain);

            const upNo = downNo + 1;
            usedNumbers.add(upNo);
            const upTrain = generateTrain(trainId++, upNo, route, 'Express', 'up', Math.floor(rng() * 24));
            if (upTrain) trains.push(upTrain);
        }
    });

    // Generate Superfast trains
    const superfastRoutes = routeTemplates.filter(r => r.types.includes('Superfast'));
    superfastRoutes.forEach(route => {
        for (let i = 0; i < 4; i++) {
            const downNo = getUniqueTrainNo('Superfast');
            const downTrain = generateTrain(trainId++, downNo, route, 'Superfast', 'down', Math.floor(rng() * 24));
            if (downTrain) trains.push(downTrain);

            const upNo = downNo + 1;
            usedNumbers.add(upNo);
            const upTrain = generateTrain(trainId++, upNo, route, 'Superfast', 'up', Math.floor(rng() * 24));
            if (upTrain) trains.push(upTrain);
        }
    });

    // Generate Intercity trains
    const intercityRoutes = routeTemplates.filter(r => r.types.includes('Intercity'));
    intercityRoutes.forEach(route => {
        for (let i = 0; i < 3; i++) {
            const downNo = getUniqueTrainNo('Express');
            const downTrain = generateTrain(trainId++, downNo, route, 'Intercity', 'down', 6 + i * 4);
            if (downTrain) trains.push(downTrain);

            const upNo = downNo + 1;
            usedNumbers.add(upNo);
            const upTrain = generateTrain(trainId++, upNo, route, 'Intercity', 'up', 8 + i * 4);
            if (upTrain) trains.push(upTrain);
        }
    });

    // If we haven't hit 1000, generate more suburban/memu variants
    let extraSeed = 100;
    while (trains.length < 1050) {
        const routeIdx = Math.floor(rng() * routeTemplates.length);
        const route = routeTemplates[routeIdx];
        const typeIdx = Math.floor(rng() * route.types.length);
        const type = route.types[typeIdx];
        const typeKey = type === 'Suburban' ? 'Suburban' : type === 'MEMU' ? 'MEMU' : type === 'Passenger' ? 'Passenger' : type === 'Superfast' ? 'Superfast' : 'Express';

        const downNo = getUniqueTrainNo(typeKey);
        const train = generateTrain(trainId++, downNo, route, type, rng() > 0.5 ? 'down' : 'up', Math.floor(rng() * 24));
        if (train) trains.push(train);
        extraSeed++;
    }

    // Cache to sessionStorage
    try {
        sessionStorage.setItem('wb_trains', JSON.stringify(trains));
    } catch (e) {
        // Storage full, ok
    }

    return trains;
}

// Get train by number
export function getTrainByNumber(trains, trainNo) {
    return trains.find(t => t.trainNo === trainNo);
}

// Search trains
export function searchTrains(trains, { source, destination, type, district, query }) {
    let filtered = [...trains];

    if (source) {
        const srcLower = source.toLowerCase();
        filtered = filtered.filter(t =>
            t.source.name.toLowerCase().includes(srcLower) ||
            t.source.code.toLowerCase() === srcLower ||
            t.stations.some(s => s.name.toLowerCase().includes(srcLower))
        );
    }

    if (destination) {
        const dstLower = destination.toLowerCase();
        filtered = filtered.filter(t =>
            t.destination.name.toLowerCase().includes(dstLower) ||
            t.destination.code.toLowerCase() === dstLower ||
            t.stations.some(s => s.name.toLowerCase().includes(dstLower))
        );
    }

    if (type && type !== 'All') {
        filtered = filtered.filter(t => t.type === type);
    }

    if (district) {
        filtered = filtered.filter(t =>
            t.source.district === district ||
            t.destination.district === district ||
            t.stations.some(s => s.district === district)
        );
    }

    if (query) {
        const q = query.toLowerCase();
        filtered = filtered.filter(t =>
            t.name.toLowerCase().includes(q) ||
            t.trainNo.includes(q) ||
            t.source.name.toLowerCase().includes(q) ||
            t.destination.name.toLowerCase().includes(q) ||
            t.source.code.toLowerCase().includes(q) ||
            t.destination.code.toLowerCase().includes(q)
        );
    }

    return filtered;
}

// Find alternative trains for a cancelled train
export function findAlternatives(trains, cancelledTrain) {
    return trains.filter(t =>
        t.id !== cancelledTrain.id &&
        t.status !== 'Cancelled' &&
        (
            (t.source.code === cancelledTrain.source.code && t.destination.code === cancelledTrain.destination.code) ||
            t.routeName === cancelledTrain.routeName
        )
    ).slice(0, 5);
}
