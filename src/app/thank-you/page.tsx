"use client";

import { Suspense, useEffect, useRef, useState } from "react";
import { Download, ArrowUpRight } from "lucide-react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import html2canvas from "html2canvas-pro";
import jsPDF from "jspdf";
import QRCodeGenerator from "@/components/QrCodeGenerator";
import Header from "@/components/Layout/Header";
import Footer from "@/components/Footer";
import { useAuth } from "@/context/AuthContext";

function ThankYouContent() {
  const searchParams = useSearchParams();
  const ticketRef = useRef<HTMLDivElement>(null);
  const {user}=useAuth()
  // Prevent double sending in React Strict Mode
  const hasSentRef = useRef(false);
  const [status, setStatus] = useState("Generating ticket...");

  const bookingId = searchParams.get("id") || "#--";
  const name = searchParams.get("name") || "Guest";
  const phone = searchParams.get("phone") || "--";
  const email = user?.email; // Make sure to pass email in URL
  const dateStr = searchParams.get("date");
  const time = searchParams.get("time") || "--";
  const guests = searchParams.get("guests") || "0";

  const formattedDate = dateStr
    ? new Date(dateStr).toLocaleDateString("en-GB", {
        day: "numeric", month: "short", year: "numeric",
      })
    : "--";

  // --- 1. SEPARATE GENERATION LOGIC ---
  const generatePDFBlob = async (): Promise<Blob | null> => {
    if (!ticketRef.current) return null;

    const originalScrollY = window.scrollY;
    window.scrollTo(0, 0);

    try {
      const canvas = await html2canvas(ticketRef.current, {
        scale: 2,
        backgroundColor: "#ffffff",
        useCORS: true,
        foreignObjectRendering: false,
        logging: false,
        x: 0, y: 0, scrollX: 0, scrollY: 0,
      });

      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");
      
      const pdfWidth = pdf.internal.pageSize.getWidth() - 20;
      const pdfHeight = pdf.internal.pageSize.getHeight() - 20;
      const imgProps = canvas.width / canvas.height;
      let imgWidth = pdfWidth;
      let imgHeight = imgWidth / imgProps;

      if (imgHeight > pdfHeight) {
        imgHeight = pdfHeight;
        imgWidth = imgHeight * imgProps;
      }

      const x = (pdf.internal.pageSize.getWidth() - imgWidth) / 2;
      const y = 10;

      pdf.addImage(imgData, "PNG", x, y, imgWidth, imgHeight);
      
      // Return Blob instead of saving
      return pdf.output("blob");
    } catch (err) {
      console.error(err);
      return null;
    } finally {
      window.scrollTo(0, originalScrollY);
    }
  };

  // --- 2. MANUAL DOWNLOAD HANDLER ---
  const handleManualDownload = async () => {
    const blob = await generatePDFBlob();
    if (blob) {
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `ticket-${bookingId}.pdf`;
      a.click();
    }
  };

  // --- 3. AUTO SEND ON MOUNT ---
  useEffect(() => {
    const sendTicket = async () => {
      // Prevent running if no ref, or already sent, or missing contact info
      if (!ticketRef.current || hasSentRef.current) return;
      if (!email && !phone) return; 

      // Wait a moment for images/fonts to render
      await new Promise(resolve => setTimeout(resolve, 1000));

      hasSentRef.current = true; // Mark as sent
      setStatus("Sending ticket to email/whatsapp...");

      const pdfBlob = await generatePDFBlob();
      if (!pdfBlob) return;

      // Create Form Data to send to API
      const formData = new FormData();
      formData.append("file", pdfBlob, `ticket-${bookingId}.pdf`);
      formData.append("email", email || "");
      formData.append("phone", phone || "");
      formData.append("name", name);
      formData.append("bookingId", bookingId);

      try {
        const res = await fetch("/api/send-ticket", {
          method: "POST",
          body: formData,
        });
        
        if (res.ok) setStatus("Ticket sent successfully!");
        else setStatus("Failed to send automatic ticket.");
      } catch (error) {
        console.error("API Error", error);
        setStatus("Error sending ticket.");
      }
    };

    sendTicket();
  }, [bookingId, email, phone, name]);
  return (
    <div className="flex flex-col items-center gap-6">
      {/* TICKET ONLY */}
      <div
        ref={ticketRef}
        className="bg-white rounded-2xl w-full max-w-[800px] flex flex-col md:flex-row overflow-hidden border border-gray-200"
      >
        {/* LEFT */}
        <div className="w-full md:w-1/2 p-8 flex flex-col items-center justify-center border-b md:border-b-0 md:border-r border-gray-100">
          <img
            src="/thankyou/image.png"
            alt="Thank you"
            className="h-44 mb-4"
          />

          <p className="text-gray-600 font-medium mb-6">
            Your ride booking is confirmed
          </p>

          {/* QR CODE */}
        </div>

        {/* RIGHT */}
        <div className="w-full md:w-1/2 p-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            Booking Details
          </h2>

          <div className="inline-block bg-amber-300 px-4 py-1 rounded-full text-xs font-bold text-gray-800 mb-6">
            Booking ID : {bookingId}
          </div>

          <div className="space-y-4">
            <DetailRow label="Name" value={name} />
            <DetailRow label="Phone" value={phone} />
            <DetailRow label="Date" value={formattedDate} />
            <DetailRow label="Time" value={time} />
            <DetailRow label="Guests" value={guests} />
          </div>
          <div className="flex flex-col items-center justify-center p-3">
            <QRCodeGenerator
              value={`${
                typeof window !== "undefined" ? window.location.origin : ""
              }/booking?id=${bookingId}`}
              size={120}
            />

            <p className="text-xs text-gray-400 mt-3">Scan to verify booking</p>
          </div>
        </div>
      </div>

      {/* ACTION BUTTONS (NOT IN PDF) */}
      <div className="flex gap-4">
        <button
          onClick={handleManualDownload}
          className="flex items-center gap-2 bg-slate-500 hover:bg-slate-600 text-white py-3 px-3 lg:px-6 rounded-full transition-colors font-medium"
        >
          Download Ticket
          <Download size={18} />
        </button>

        <Link href="/">
          <button className="flex items-center gap-2 bg-[#055A3A] hover:bg-[#044d32] text-white py-3 px-6 rounded-full transition-colors font-medium">
            Back to Home
            <ArrowUpRight size={18} />
          </button>
        </Link>
      </div>
    </div>
  );
}

export default function ThankYouPage() {
  return (
    <main className="min-h-screen">
      <Header />
      <div className="bg-gray-50 flex items-center justify-center p-4 font-sans">
        <Suspense
          fallback={<div className="text-gray-500">Loading details...</div>}
        >
          <ThankYouContent />
        </Suspense>
      </div>
      <Footer />
    </main>
  );
}

/* Helper Row */
const DetailRow = ({ label, value }: { label: string; value: string }) => (
  <div className="flex justify-between text-sm">
    <span className="text-gray-400 font-medium">{label}</span>
    <span className="text-gray-800 font-medium">{value}</span>
  </div>
);
