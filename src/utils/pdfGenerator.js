import jsPDF from 'jspdf';

export function generateTicketPDF(booking) {
    const doc = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4',
    });

    const pageWidth = doc.internal.pageSize.getWidth();
    const margin = 15;
    let y = 0;

    // Colors - Unified Palette
    const primary = [15, 23, 42]; // Slate 900
    const accent = [59, 130, 246]; // Blue 500
    const textDark = [30, 41, 59]; // Slate 800
    const textGray = [100, 116, 139]; // Slate 500
    const white = [255, 255, 255];
    const border = [226, 232, 240]; // Slate 200

    // Top Stripe
    doc.setFillColor(...accent);
    doc.rect(0, 0, pageWidth, 2, 'F');
    y = 2;

    // Header Area
    doc.setFillColor(248, 250, 252);
    doc.rect(0, y, pageWidth, 35, 'F');

    doc.setTextColor(...primary);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(24);
    doc.text('TrainGo', margin, y + 15);

    doc.setFontSize(9);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(...textGray);
    doc.text('WEST BENGAL RAILWAY MANAGEMENT', margin, y + 22);

    doc.setTextColor(...primary);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(10);
    doc.text('ELECTRONIC TICKET', pageWidth - margin, y + 12, { align: 'right' });

    doc.setFontSize(8);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(...textGray);
    doc.text(`PNR: ${booking.pnr}`, pageWidth - margin, y + 18, { align: 'right' });
    doc.text(`TICKET ID: ${booking.ticketId}`, pageWidth - margin, y + 23, { align: 'right' });

    y += 45;

    // Main Content Container
    const contentWidth = pageWidth - 2 * margin;

    // Section 1: Journey Summary
    doc.setFillColor(255, 255, 255);
    doc.setDrawColor(...border);
    doc.setLineWidth(0.2);
    doc.roundedRect(margin, y, contentWidth, 30, 2, 2, 'FD');

    doc.setTextColor(...textGray);
    doc.setFontSize(7);
    doc.text('FROM', margin + 8, y + 8);
    doc.text('TO', margin + contentWidth / 2 + 15, y + 8);

    doc.setTextColor(...primary);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(13);
    doc.text(booking.source, margin + 8, y + 16);
    doc.text(booking.destination, margin + contentWidth / 2 + 15, y + 16);

    // Draw an arrow or line between stations
    doc.setDrawColor(...accent);
    doc.setLineWidth(0.5);
    doc.line(margin + contentWidth / 2 - 10, y + 15, margin + contentWidth / 2 + 10, y + 15);

    doc.setFontSize(8);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(...textGray);
    doc.text(booking.departure || '--', margin + 8, y + 23);
    doc.text(booking.arrival || '--', margin + contentWidth / 2 + 15, y + 23);

    y += 35;

    // Section 2: Train & Booking Details
    doc.setFillColor(248, 250, 252);
    doc.roundedRect(margin, y, contentWidth, 20, 2, 2, 'F');

    const colWidth = contentWidth / 4;
    doc.setFontSize(7);
    doc.setTextColor(...textGray);
    doc.text('TRAIN', margin + 8, y + 7);
    doc.text('CLASS / COACH', margin + colWidth + 8, y + 7);
    doc.text('SEAT NO.', margin + colWidth * 2 + 8, y + 7);
    doc.text('STATUS', margin + colWidth * 3 + 8, y + 7);

    doc.setTextColor(...primary);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9);
    doc.text(`${booking.trainNo} - ${booking.trainName}`, margin + 8, y + 13);
    doc.text(`${booking.coach || 'GEN'}`, margin + colWidth + 8, y + 13);
    doc.text(`${booking.seatNo || 'WL'}`, margin + colWidth * 2 + 8, y + 13);
    doc.text(`${booking.status}`, margin + colWidth * 3 + 8, y + 13);

    y += 25;

    // Section 3: Passenger Information
    doc.setTextColor(...primary);
    doc.setFontSize(10);
    doc.setFont('helvetica', 'bold');
    doc.text('PASSENGER DETAILS', margin, y + 5);
    y += 8;

    // Table Header
    doc.setFillColor(...primary);
    doc.rect(margin, y, contentWidth, 7, 'F');
    doc.setTextColor(...white);
    doc.setFontSize(8);
    doc.text('S.NO', margin + 5, y + 5);
    doc.text('NAME', margin + 20, y + 5);
    doc.text('AGE', margin + 110, y + 5);
    doc.text('GENDER', margin + 140, y + 5);
    y += 7;

    const passengers = booking.passengers || [{ name: booking.passengerName, age: booking.age, gender: booking.gender }];
    passengers.forEach((p, idx) => {
        if (idx % 2 === 0) doc.setFillColor(248, 250, 252);
        else doc.setFillColor(255, 255, 255);
        doc.rect(margin, y, contentWidth, 8, 'F');

        doc.setTextColor(...textDark);
        doc.setFont('helvetica', 'normal');
        doc.text(`${idx + 1}`, margin + 5, y + 5.5);
        doc.text(p.name, margin + 20, y + 5.5);
        doc.text(`${p.age}`, margin + 110, y + 5.5);
        doc.text(p.gender, margin + 140, y + 5.5);
        y += 8;
    });

    y += 10;

    // Section 4: Fare & QR
    const bottomY = y;

    // QR Box left
    doc.setDrawColor(...border);
    doc.roundedRect(margin, bottomY, 35, 35, 1, 1, 'S');

    // Simple QR Pattern
    doc.setFillColor(...textDark);
    for (let i = 0; i < 7; i++) {
        for (let j = 0; j < 7; j++) {
            if ((i * j + i + j) % 3 === 0) {
                doc.rect(margin + 4 + i * 4, bottomY + 4 + j * 4, 3, 3, 'F');
            }
        }
    }
    doc.setFontSize(6);
    doc.setTextColor(...textGray);
    doc.text('SECURE QR TICKET', margin + 17.5, bottomY + 33, { align: 'center' });

    // Fare summary right
    const fareX = margin + 80;
    doc.setTextColor(...primary);
    doc.setFontSize(9);
    doc.setFont('helvetica', 'bold');
    doc.text('FARE SUMMARY', fareX, bottomY + 5);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8);
    doc.setTextColor(...textGray);
    doc.text('Ticket Fare:', fareX, bottomY + 12);
    doc.text(`Rs. ${booking.fare || 0}.00`, pageWidth - margin, bottomY + 12, { align: 'right' });

    doc.text('GST (5%):', fareX, bottomY + 18);
    const gst = Math.round((booking.fare || 0) * 0.05);
    doc.text(`Rs. ${gst}.00`, pageWidth - margin, bottomY + 18, { align: 'right' });

    doc.setDrawColor(...border);
    doc.line(fareX, bottomY + 22, pageWidth - margin, bottomY + 22);

    doc.setTextColor(...accent);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(10);
    doc.text('TOTAL AMOUNT:', fareX, bottomY + 28);
    doc.text(`Rs. ${(booking.fare || 0) + gst}.00`, pageWidth - margin, bottomY + 28, { align: 'right' });

    y = bottomY + 45;

    // Important Info
    doc.setFillColor(254, 252, 232); // Light yellow
    doc.roundedRect(margin, y, contentWidth, 20, 1, 1, 'F');
    doc.setTextColor(133, 77, 14); // Darker brown
    doc.setFontSize(7);
    doc.setFont('helvetica', 'bold');
    doc.text('IMPORTANT INFORMATION', margin + 5, y + 6);
    doc.setFont('helvetica', 'normal');
    const info = [
        '1. Carry a valid original photo identity proof during the journey.',
        '2. This is a computer-generated simulated ticket. No physical signature is required.',
        '3. Please reach the station at least 30 minutes before the scheduled departure.'
    ];
    info.forEach((line, idx) => {
        doc.text(line, margin + 5, y + 11 + idx * 3.5);
    });

    // Simple Footer
    const footerY = doc.internal.pageSize.getHeight() - 15;
    doc.setDrawColor(...border);
    doc.line(margin, footerY - 5, pageWidth - margin, footerY - 5);

    doc.setTextColor(...textGray);
    doc.setFontSize(7);
    doc.text('This e-ticket is generated by TrainGo India - West Bengal Railway Division.', pageWidth / 2, footerY, { align: 'center' });
    doc.text(`Generated on: ${new Date().toLocaleString()}`, pageWidth / 2, footerY + 4, { align: 'center' });

    return doc;
}

export function downloadTicketPDF(booking) {
    const doc = generateTicketPDF(booking);
    doc.save(`TrainGo_Ticket_${booking.ticketId}.pdf`);
}

