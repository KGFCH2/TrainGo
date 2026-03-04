import React, { createContext, useContext, useState, useEffect } from 'react';

const BookingContext = createContext();

export function BookingProvider({ children }) {
    const [bookings, setBookings] = useState(() => {
        const saved = localStorage.getItem('wb_bookings');
        return saved ? JSON.parse(saved) : [];
    });

    const [bookedSeats, setBookedSeats] = useState(() => {
        const saved = localStorage.getItem('wb_booked_seats');
        return saved ? JSON.parse(saved) : {};
    });

    useEffect(() => {
        localStorage.setItem('wb_bookings', JSON.stringify(bookings));
    }, [bookings]);

    useEffect(() => {
        localStorage.setItem('wb_booked_seats', JSON.stringify(bookedSeats));
    }, [bookedSeats]);

    const generateTicketId = () => {
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
        let result = 'WBT-';
        for (let i = 0; i < 8; i++) {
            result += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return result;
    };

    const generatePNR = () => {
        let pnr = '';
        for (let i = 0; i < 10; i++) {
            pnr += Math.floor(Math.random() * 10);
        }
        return pnr;
    };

    const createBooking = (bookingData) => {
        const booking = {
            ...bookingData,
            id: Date.now().toString(),
            ticketId: generateTicketId(),
            pnr: generatePNR(),
            bookingDate: new Date().toISOString(),
            status: 'Confirmed',
        };

        // Mark seats as booked
        const trainKey = booking.trainNo;
        const currentBooked = bookedSeats[trainKey] || [];
        const newBooked = [...currentBooked, ...booking.selectedSeats];
        setBookedSeats(prev => ({ ...prev, [trainKey]: newBooked }));

        setBookings(prev => [booking, ...prev]);
        return booking;
    };

    const cancelBooking = (bookingId) => {
        setBookings(prev => prev.map(b =>
            b.id === bookingId ? { ...b, status: 'Cancelled' } : b
        ));
    };

    const getUserBookings = (userId) => {
        return bookings.filter(b => b.userId === userId);
    };

    const getBookedSeatsForTrain = (trainNo) => {
        return bookedSeats[trainNo] || [];
    };

    return (
        <BookingContext.Provider value={{
            bookings, createBooking, cancelBooking, getUserBookings, getBookedSeatsForTrain, generateTicketId,
        }}>
            {children}
        </BookingContext.Provider>
    );
}

export function useBooking() {
    const ctx = useContext(BookingContext);
    if (!ctx) throw new Error('useBooking must be used within BookingProvider');
    return ctx;
}
