import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FiChevronDown } from 'react-icons/fi';

const faqs = [
    {
        category: 'Booking',
        items: [
            { q: 'How do I book a ticket?', a: 'Navigate to the Booking page, search for your source and destination stations, select a train, choose your seats, fill in passenger details, and complete the simulated payment.' },
            { q: 'Can I book multiple seats?', a: 'Yes, you can select up to 6 seats per booking across different coach types (General, Sleeper, AC-3, AC-2, AC-1).' },
            { q: 'How do I cancel a booking?', a: 'Go to My Tickets, find the booking you want to cancel, and click the Cancel button. Note: This is a simulated platform, so no actual refunds apply.' },
            { q: 'Is payment real?', a: 'No. TrainGo is a demonstration project. All payment flows are simulated — no actual money is charged.' },
        ]
    },
    {
        category: 'Trains & Routes',
        items: [
            { q: 'How many trains are available?', a: 'TrainGo features over 1,000 AI-generated trains covering 200+ stations across 23 districts of West Bengal.' },
            { q: 'Are the train schedules real?', a: 'Train schedules are algorithmically generated based on real West Bengal railway routes and realistic timing patterns. They are not actual Indian Railways schedules.' },
            { q: 'What types of trains are available?', a: 'Six train types: Suburban, MEMU, Passenger, Express, Superfast, and Intercity — each with different speed profiles and fare structures.' },
            { q: 'Can I search by district?', a: 'Yes, the Trains page allows filtering by train type, district, source station, and destination station.' },
        ]
    },
    {
        category: 'Account & Data',
        items: [
            { q: 'Where is my data stored?', a: 'All data is stored locally in your browser\'s localStorage. Nothing is transmitted to external servers.' },
            { q: 'How do I delete my data?', a: 'Clear your browser\'s localStorage for this site. All account, booking, and preference data will be removed.' },
            { q: 'Is my account secure?', a: 'Since data is stored only locally, security depends on your browser and device. We recommend not storing sensitive information.' },
            { q: 'Can I use the same account across devices?', a: 'No, since data is stored per-browser using localStorage. Each browser/device maintains its own separate data.' },
        ]
    },
    {
        category: 'Technical',
        items: [
            { q: 'What technologies power TrainGo?', a: 'React 18, Vite, Tailwind CSS, Three.js (via React Three Fiber), Framer Motion, and jsPDF for ticket generation.' },
            { q: 'Can I download my tickets?', a: 'Yes, you can download PDF tickets from the My Tickets page. PDFs include booking details, passenger info, and a QR code placeholder.' },
            { q: 'Does it work offline?', a: 'After initial load, most features work without an internet connection since all data is generated and stored locally.' },
        ]
    },
];

function FAQItem({ item, isOpen, onToggle }) {
    return (
        <div className="border-b border-white/[0.04] last:border-0">
            <button onClick={onToggle} className="w-full flex items-center justify-between py-5 text-left group">
                <span className={`text-sm font-medium transition-colors pr-4 ${isOpen ? 'text-primary-400' : 'text-gray-200 group-hover:text-white'}`}>{item.q}</span>
                <FiChevronDown className={`w-4 h-4 text-gray-500 transition-transform flex-shrink-0 ${isOpen ? 'rotate-180 text-primary-400' : ''}`} />
            </button>
            <AnimatePresence>
                {isOpen && (
                    <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.25 }}>
                        <p className="text-sm text-gray-400 pb-5 leading-relaxed">{item.a}</p>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

export default function FAQPage() {
    const [activeId, setActiveId] = useState(null);

    const handleToggle = (id) => {
        setActiveId(activeId === id ? null : id);
    };

    return (
        <div className="container-section py-24 min-h-screen">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="max-w-3xl mx-auto">
                <Link to="/" className="text-sm text-primary-400 hover:text-primary-300 mb-8 inline-block">&larr; Back to Home</Link>

                <h1 className="heading-section text-4xl mb-4 text-white">Frequently Asked Questions</h1>
                <p className="text-gray-400 mb-12 text-sm sm:text-base italic">Understanding the TrainGo simulation platform.</p>

                <div className="space-y-8">
                    {faqs.map((section, sIdx) => (
                        <div key={section.category}>
                            <h2 className="text-lg font-display font-semibold text-primary-400 mb-4">{section.category}</h2>
                            <div className="card p-1 rounded-xl">
                                <div className="px-5">
                                    {section.items.map((item, iIdx) => {
                                        const id = `${sIdx}-${iIdx}`;
                                        return (
                                            <FAQItem
                                                key={item.q}
                                                item={item}
                                                isOpen={activeId === id}
                                                onToggle={() => handleToggle(id)}
                                            />
                                        );
                                    })}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="mt-12 text-center">
                    <p className="text-gray-500 text-sm mb-4">Still have questions?</p>
                    <Link to="/contact" className="btn-primary text-sm">Contact Support</Link>
                </div>
            </motion.div>
        </div>
    );
}
