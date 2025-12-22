// lib/mail.ts
import nodemailer from "nodemailer";
import QRCode from "qrcode";

const transporter = nodemailer.createTransport({
  service: "gmail", // Or your SMTP provider
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS, // Use an "App Password" for Gmail
  },
});

export async function sendTicketEmail(ticket: any) {
  try {
    // 1. Generate QR Code as a Base64 image string for the email
    // ticket.qrCode contains the JSON string you generated
    const qrCodeDataUrl = await QRCode.toDataURL(ticket.qrCode);

    const mailOptions = {
      from: `"Wonder Volare" <${process.env.EMAIL_USER}>`,
      to: ticket.userEmail,
      subject: `Booking Confirmed: ${ticket.ticketNumber}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; border: 1px solid #eee; padding: 20px; border-radius: 15px;">
          <h2 style="color: #055A3A; text-align: center;">Booking Confirmed!</h2>
          <p>Hi there,</p>
          <p>Your ride at <strong>Wonder Volare Munnar</strong> is confirmed. Please show the ticket below at the counter.</p>
          
          <div style="background-color: #f9f9f9; padding: 15px; border-radius: 10px; margin: 20px 0;">
            <p><strong>Ticket Number:</strong> ${ticket.ticketNumber}</p>
            <p><strong>Plan:</strong> ${ticket.planName}</p>
            <p><strong>Date:</strong> ${new Date(ticket.date).toDateString()}</p>
            <p><strong>Time Slot:</strong> ${ticket.timeSlot}</p>
            <p><strong>Guests:</strong> ${ticket.numberOfPeople}</p>
          </div>

          <div style="text-align: center;">
            <p><strong>Scan this QR Code at Entry:</strong></p>
            <img src="${qrCodeDataUrl}" alt="Ticket QR Code" style="width: 200px; height: 200px;" />
          </div>

          <p style="font-size: 12px; color: #666; text-align: center; margin-top: 30px;">
            Location: Wonder Volare, Munnar, Kerala<br>
            Contact: +91 XXXXXXXXXX
          </p>
        </div>
      `,
    };

    await transporter.sendMail(mailOptions);
    console.log(`Email sent to ${ticket.userEmail}`);
  } catch (error) {
    console.error("Email sending failed:", error);
  }
}