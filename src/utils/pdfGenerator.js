import jsPDF from 'jspdf';

export function generateTicketPDF(booking) {
    const doc = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4',
    });

    const pageWidth = doc.internal.pageSize.getWidth();
    const margin = 15;
    let y = 15;

    // Colors
    const saffron = [255, 153, 51];
    const green = [19, 136, 8];
    const ashoka = [0, 0, 128];
    const white = [255, 255, 255];
    const dark = [30, 30, 30];

    // Header background
    doc.setFillColor(...ashoka);
    doc.rect(0, 0, pageWidth, 45, 'F');

    // Tricolor stripe
    doc.setFillColor(...saffron);
    doc.rect(0, 0, pageWidth, 3, 'F');
    doc.setFillColor(...white);
    doc.rect(0, 3, pageWidth, 3, 'F');
    doc.setFillColor(...green);
    doc.rect(0, 6, pageWidth, 3, 'F');

    // Header text
    doc.setTextColor(...white);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(22);
    doc.text('WB_TrainGo', pageWidth / 2, 22, { align: 'center' });
    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    doc.text('West Bengal Railway Management System', pageWidth / 2, 30, { align: 'center' });

    // Train icon (simple SVG-like drawing)
    doc.setFontSize(24);
    doc.text('WB TrainGo', margin, 40);
    doc.setFontSize(8);
    doc.setTextColor(200, 200, 200);
    doc.text('E-Ticket / Boarding Pass', pageWidth - margin, 38, { align: 'right' });

    y = 55;

    // Ticket ID and PNR section
    doc.setFillColor(245, 245, 250);
    doc.roundedRect(margin, y, pageWidth - 2 * margin, 20, 3, 3, 'F');
    doc.setDrawColor(...ashoka);
    doc.setLineWidth(0.5);
    doc.roundedRect(margin, y, pageWidth - 2 * margin, 20, 3, 3, 'S');

    doc.setTextColor(...ashoka);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(11);
    doc.text(`Ticket ID: ${booking.ticketId}`, margin + 5, y + 8);
    doc.text(`PNR: ${booking.pnr}`, pageWidth - margin - 5, y + 8, { align: 'right' });
    doc.setFontSize(9);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(80, 80, 80);
    doc.text(`Booking Date: ${new Date(booking.bookingDate).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })}`, margin + 5, y + 15);
    doc.text(`Status: ${booking.status}`, pageWidth - margin - 5, y + 15, { align: 'right' });

    y += 28;

    // Train details box
    doc.setFillColor(240, 248, 255);
    doc.roundedRect(margin, y, pageWidth - 2 * margin, 30, 3, 3, 'F');
    doc.setDrawColor(...saffron);
    doc.setLineWidth(0.8);
    doc.roundedRect(margin, y, pageWidth - 2 * margin, 30, 3, 3, 'S');

    doc.setTextColor(...dark);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(14);
    doc.text(`${booking.trainNo} - ${booking.trainName}`, pageWidth / 2, y + 10, { align: 'center' });

    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(60, 60, 60);
    const trainType = booking.trainType || 'Express';
    doc.text(`Type: ${trainType}`, pageWidth / 2, y + 17, { align: 'center' });

    // Source → Destination
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(12);
    doc.setTextColor(...ashoka);
    doc.text(booking.source, margin + 10, y + 26);
    doc.text('→', pageWidth / 2, y + 26, { align: 'center' });
    doc.text(booking.destination, pageWidth - margin - 10, y + 26, { align: 'right' });

    y += 38;

    // Journey details
    doc.setFillColor(255, 255, 255);
    doc.roundedRect(margin, y, pageWidth - 2 * margin, 25, 3, 3, 'FD');

    const colWidth = (pageWidth - 2 * margin) / 4;
    const detailsY = y + 8;

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8);
    doc.setTextColor(100, 100, 100);
    doc.text('DEPARTURE', margin + 5, detailsY);
    doc.text('ARRIVAL', margin + colWidth + 5, detailsY);
    doc.text('COACH', margin + colWidth * 2 + 5, detailsY);
    doc.text('SEAT NO.', margin + colWidth * 3 + 5, detailsY);

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(11);
    doc.setTextColor(...dark);
    doc.text(booking.departure || '--', margin + 5, detailsY + 8);
    doc.text(booking.arrival || '--', margin + colWidth + 5, detailsY + 8);
    doc.text(booking.coach || 'GEN', margin + colWidth * 2 + 5, detailsY + 8);
    doc.text(booking.seatNo || 'WL', margin + colWidth * 3 + 5, detailsY + 8);

    y += 33;

    // Passenger details
    doc.setFillColor(...ashoka);
    doc.rect(margin, y, pageWidth - 2 * margin, 8, 'F');
    doc.setTextColor(...white);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(10);
    doc.text('PASSENGER DETAILS', margin + 5, y + 6);
    y += 12;

    const passengers = booking.passengers || [{ name: booking.passengerName, age: booking.age, gender: booking.gender }];
    passengers.forEach((p, idx) => {
        doc.setFillColor(idx % 2 === 0 ? 250 : 240, idx % 2 === 0 ? 250 : 240, idx % 2 === 0 ? 255 : 245);
        doc.rect(margin, y, pageWidth - 2 * margin, 8, 'F');
        doc.setTextColor(40, 40, 40);
        doc.setFont('helvetica', 'normal');
        doc.setFontSize(9);
        doc.text(`${idx + 1}. ${p.name}`, margin + 5, y + 6);
        doc.text(`Age: ${p.age}`, margin + 80, y + 6);
        doc.text(`Gender: ${p.gender}`, margin + 110, y + 6);
        y += 8;
    });

    y += 8;

    // Fare details
    doc.setDrawColor(200, 200, 200);
    doc.setLineWidth(0.3);
    doc.line(margin, y, pageWidth - margin, y);
    y += 5;

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(10);
    doc.setTextColor(...ashoka);
    doc.text('FARE SUMMARY', margin + 5, y + 3);
    y += 8;

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(9);
    doc.setTextColor(60, 60, 60);
    doc.text(`Base Fare:`, margin + 5, y + 3);
    doc.text(`₹${booking.fare || 0}`, pageWidth - margin - 5, y + 3, { align: 'right' });
    y += 6;
    doc.text(`GST (5%):`, margin + 5, y + 3);
    const gst = Math.round((booking.fare || 0) * 0.05);
    doc.text(`₹${gst}`, pageWidth - margin - 5, y + 3, { align: 'right' });
    y += 6;
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(11);
    doc.text(`Total:`, margin + 5, y + 3);
    doc.text(`₹${(booking.fare || 0) + gst}`, pageWidth - margin - 5, y + 3, { align: 'right' });

    y += 15;

    // QR Code placeholder
    doc.setFillColor(240, 240, 240);
    doc.roundedRect(pageWidth / 2 - 20, y, 40, 40, 2, 2, 'F');
    doc.setTextColor(150, 150, 150);
    doc.setFontSize(7);
    doc.text('QR CODE', pageWidth / 2, y + 22, { align: 'center' });

    // Draw a simple pattern as QR placeholder
    for (let i = 0; i < 8; i++) {
        for (let j = 0; j < 8; j++) {
            if ((i + j) % 2 === 0) {
                doc.setFillColor(40, 40, 40);
                doc.rect(pageWidth / 2 - 16 + i * 4, y + 4 + j * 4, 3, 3, 'F');
            }
        }
    }

    y += 48;

    // Disclaimer
    doc.setDrawColor(200, 200, 200);
    doc.line(margin, y, pageWidth - margin, y);
    y += 5;
    doc.setFont('helvetica', 'italic');
    doc.setFontSize(7);
    doc.setTextColor(120, 120, 120);
    doc.text('Disclaimer: No refund for mistakenly booked tickets. Please verify all details before boarding.', margin, y + 3);
    doc.text('This is a computer-generated ticket and does not require a signature.', margin, y + 8);
    doc.text('Carry a valid photo ID during travel.', margin, y + 13);

    // Footer
    const footerY = doc.internal.pageSize.getHeight() - 15;
    doc.setFillColor(...green);
    doc.rect(0, footerY, pageWidth, 15, 'F');
    doc.setFillColor(...saffron);
    doc.rect(0, footerY, pageWidth, 2, 'F');

    doc.setTextColor(...white);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8);
    doc.text('Powered by TrainGo', pageWidth / 2, footerY + 8, { align: 'center' });
    doc.setFontSize(6);
    doc.setFont('helvetica', 'normal');
    doc.text('© 2025 WB_TrainGo | West Bengal Railway Management System', pageWidth / 2, footerY + 12, { align: 'center' });

    return doc;
}

export function downloadTicketPDF(booking) {
    const doc = generateTicketPDF(booking);
    doc.save(`WB_TrainGo_Ticket_${booking.ticketId}.pdf`);
}
