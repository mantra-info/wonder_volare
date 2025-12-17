// components/booking/SuccessModal.tsx
import React from "react";
import { X, Check, Download } from "lucide-react";
import { BookingTicket } from "@/types/booking";
import QRCodeGenerator from "@/components/QrCodeGenerator"; // Ensure this component exists

interface SuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  bookingData: BookingTicket;
}

export const SuccessModal: React.FC<SuccessModalProps> = ({ isOpen, onClose, bookingData }) => {
  if (!isOpen) return null;

  const handleDownload = () => {
    const ticketInfo = `
Booking Confirmation
--------------------
Ticket #: ${bookingData.ticketNumber}
Plan: ${bookingData.planName}
Date: ${new Date(bookingData.date).toLocaleDateString()}
Time: ${bookingData.timeSlot}
People: ${bookingData.numberOfPeople}
Total: ₹${bookingData.totalPrice}
    `;
    const blob = new Blob([ticketInfo], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `ticket-${bookingData.ticketNumber}.txt`;
    a.click();
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[200] flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl animate-in zoom-in duration-300">
        {/* Header */}
        <div className="bg-gradient-to-br from-[#055A3A] to-[#044d32] p-8 relative">
          <button onClick={onClose} className="absolute top-4 right-4 text-white/80 hover:text-white transition-colors">
            <X size={24} />
          </button>
          <div className="text-center">
            <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-4">
              <Check size={40} className="text-[#055A3A]" />
            </div>
            <h2 className="text-3xl font-bold text-white mb-2">Booking Confirmed!</h2>
            <p className="text-white/90">Your ride has been successfully booked</p>
          </div>
        </div>

        {/* Content */}
        <div className="p-8">
          <div className="bg-gray-50 rounded-2xl p-6 mb-6">
            <div className="text-center mb-6">
              <p className="text-sm text-gray-600 mb-1">Ticket Number</p>
              <p className="text-2xl font-bold text-gray-900">{bookingData.ticketNumber}</p>
            </div>
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div><p className="text-sm text-gray-600 mb-1">Plan</p><p className="font-semibold text-gray-900">{bookingData.planName}</p></div>
              <div><p className="text-sm text-gray-600 mb-1">Date</p><p className="font-semibold text-gray-900">{new Date(bookingData.date).toLocaleDateString()}</p></div>
              <div><p className="text-sm text-gray-600 mb-1">Time</p><p className="font-semibold text-gray-900">{bookingData.timeSlot}</p></div>
              <div><p className="text-sm text-gray-600 mb-1">People</p><p className="font-semibold text-gray-900">{bookingData.numberOfPeople}</p></div>
            </div>
            <div className="pt-4 border-t-2 border-gray-200 flex justify-between items-center">
              <span className="text-gray-600">Total Amount</span>
              <span className="text-2xl font-bold text-[#055A3A]">₹{bookingData.totalPrice}</span>
            </div>
          </div>

          <div className="text-center mb-6">
            <p className="text-sm text-gray-600 mb-4">Scan this QR code at the venue</p>
            <div className="inline-block bg-white p-4 rounded-2xl shadow-lg">
              <QRCodeGenerator value={bookingData.qrCode} size={200} />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <button onClick={handleDownload} className="flex items-center justify-center gap-2 px-6 py-3 bg-gray-100 text-gray-700 font-semibold rounded-xl hover:bg-gray-200 transition-colors">
              <Download size={20} /> Download
            </button>
            <button onClick={onClose} className="px-6 py-3 bg-[#055A3A] text-white font-semibold rounded-xl hover:bg-[#044d32] transition-colors">
              Done
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};