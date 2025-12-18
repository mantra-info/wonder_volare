"use client";
import React, { useState, useEffect, useCallback } from "react";
import {
  Calendar,
  Clock,
  Users,
  ArrowRight,
  Check,
  XCircle,
} from "lucide-react"; // Added XCircle
import Header from "@/components/Layout/Header";
import Footer from "@/components/Footer";

import { Plan, BookingTicket, BookingFormData } from "@/types/booking";
import { CustomDatePicker } from "@/components/Booking/CustomDatePicker";
import { CustomTimePicker } from "@/components/Booking/CustomTimePicker";
import { CustomPeoplePicker } from "@/components/Booking/CustomPeoplePicker";
import { SuccessModal } from "@/components/Booking/SuccessModal";
import PageBreadcrumb from "@/components/BreadCrumb";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import Modal from "@/components/ui/Modal";
import AuthForm from "@/components/auth/AuthForm";

// Define the TimeSlot interface (used for fetching availability)
interface TimeSlot {
  time: string;
  status: "available" | "unavailable";
}

// Mock initial/default time slots (all unavailable before a date is selected)
const DEFAULT_TIME_SLOTS: TimeSlot[] = [
  { time: "06.00am - 07.00am", status: "unavailable" },
  { time: "07.30am - 08.30am", status: "unavailable" },
  { time: "09.00am - 10.00am", status: "unavailable" },
  { time: "10.30am - 11.30am", status: "unavailable" },
  { time: "05.00pm - 06.00pm", status: "unavailable" },
];

const plans: Plan[] = [
  // ... (plans array remains the same)
  {
    id: 1,
    name: "Classic Sunrise Ride",
    duration: "45 - 60 Minutes",
    maxPeople: "Max 4 peoples allowed",
    amenity: "Complementary Tea/Coffee",
    price: 1500,
    popular: true,
  },
  {
    id: 2,
    name: "Premium Couple Ride",
    duration: "45 - 60 Minutes",
    maxPeople: "Max 4 peoples allowed",
    amenity: "Complementary Tea/Coffee",
    price: 3999,
    popular: false,
  },
];

// Simple Toast component (replace with a real library like react-hot-toast in a real app)
const ToastNotification: React.FC<{ message: string; onClose: () => void }> = ({
  message,
  onClose,
}) => {
  if (!message) return null;
  // Auto-hide after 5 seconds
  useEffect(() => {
    const timer = setTimeout(onClose, 5000);
    return () => clearTimeout(timer);
  }, [message, onClose]);

  return (
    <div className="fixed top-5 right-5 z-[1000] p-4 bg-red-600 text-white rounded-xl shadow-xl flex items-center gap-3 animate-in fade-in slide-in-from-right-10 duration-300">
      <XCircle size={20} />
      <span>{message}</span>
      <button onClick={onClose} className="ml-4 font-bold">
        X
      </button>
    </div>
  );
};

const BookingPage: React.FC = () => {
  const [selectedPlanId, setSelectedPlanId] = useState<number | null>(null);
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const router = useRouter();
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const { user, setUser } = useAuth();
  // Picker visibility state
  const [activePicker, setActivePicker] = useState<
    "date" | "time" | "people" | null
  >(null);

  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [bookingData, setBookingData] = useState<BookingTicket | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // State for Time Slot Availability
  const [timeSlots, setTimeSlots] = useState<TimeSlot[]>(DEFAULT_TIME_SLOTS);
  const [isLoadingSlots, setIsLoadingSlots] = useState(false);

  // State for error/validation message (simulates toast)
  const [errorMessage, setErrorMessage] = useState("");

  const [formData, setFormData] = useState<BookingFormData>({
    name: "",
    mobile: "",
    date: null,
    timeSlot: "",
    people: null,
  });

  const formatDate = (date: Date | null) => {
    if (!date) return "Choose Date";
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };
  const getLocalFormattedDate = (date: Date): string => {
    const year = date.getFullYear();
    // getMonth() is 0-indexed, so we add 1.
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  // Function to fetch time slots based on selected date
  const fetchTimeSlots = useCallback(async (date: Date) => {
    setIsLoadingSlots(true);
    setTimeSlots(
      DEFAULT_TIME_SLOTS.map((s) => ({ ...s, status: "unavailable" }))
    ); // Clear/disable slots while loading

    try {
      // Use YYYY-MM-DD format for API query
      const formattedDate = getLocalFormattedDate(date);
      // New API call to check availability
      const response = await fetch(`/api/bookings?date=${formattedDate}`);

      if (!response.ok) {
        throw new Error("Failed to fetch availability.");
      }

      const data = await response.json();
      setTimeSlots(data.slots || []);
    } catch (error) {
      console.error("Fetch time slots error:", error);
      setErrorMessage("Could not load time slots. Please try another date.");
      setTimeSlots(
        DEFAULT_TIME_SLOTS.map((s) => ({ ...s, status: "unavailable" }))
      );
    } finally {
      setIsLoadingSlots(false);
    }
  }, []);

  // Effect to fetch slots when date changes
  useEffect(() => {
    if (formData.date) {
      fetchTimeSlots(formData.date);
      // Reset timeSlot when date changes
      setFormData((prev) => ({ ...prev, timeSlot: "" }));
    } else {
      // If no date, set all slots as unavailable
      setTimeSlots(
        DEFAULT_TIME_SLOTS.map((s) => ({ ...s, status: "unavailable" }))
      );
    }
  }, [formData.date, fetchTimeSlots]);

  const clearErrorMessage = () => setErrorMessage("");

  // Custom Date selection handler to also clear time slot
  const handleDateSelect = (date: Date) => {
    // This will trigger the useEffect to fetch new slots and clear timeSlot
    setFormData({ ...formData, date, timeSlot: "" });
    setActivePicker(null);
  };

  const handleBooking = async () => {
    // 1. Client-Side Validation (using toast)
    if (!formData.name.trim()) {
      setErrorMessage("Please enter your name.");
      return;
    }
    // Simple 10-digit mobile number validation
    if (!/^\d{10}$/.test(formData.mobile || "")) {
      setErrorMessage("Please enter a valid 10-digit Whatsapp Number.");
      return;
    }
    if (!formData.date) {
      setErrorMessage("Please select a date.");
      return;
    }
    if (!formData.timeSlot) {
      setErrorMessage("Please select a time slot.");
      return;
    }
    if (!formData.people || formData.people < 1) {
      setErrorMessage("Please select the number of people.");
      return;
    }
    if (!selectedPlanId) {
      setErrorMessage("Please select a ride plan.");
      return;
    }
    if (!acceptedTerms) {
      setErrorMessage(
        "You must agree to the Terms & Conditions and Privacy Policy."
      );
      return;
    }

    setIsLoading(true);
    const selectedPlan = plans.find((p) => p.id === selectedPlanId);

    if (!selectedPlan) {
      setIsLoading(false);
      setErrorMessage("Selected plan not found.");
      return;
    }

    try {
      // Re-check slot availability locally before API submission (API will also check)
      const slotIsAvailable =
        timeSlots.find((s) => s.time === formData.timeSlot)?.status ===
        "available";
      if (!slotIsAvailable) {
        throw new Error(
          "The selected time slot is no longer available. Please select another slot."
        );
      }

      const response = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          planId: selectedPlan.id,
          planName: selectedPlan.name,
          date: formData.date.toISOString(),
          timeSlot: formData.timeSlot,
          numberOfPeople: formData.people,
          pricePerPerson: selectedPlan.price,
        }),
      });
      if (response.status === 401) {
        setIsAuthOpen(true);
        setIsLoading(false);
        return;
      }
      if (!response.ok) {
        const error = await response.json();
        // Server-side check for 409 Conflict (slot unavailable)
        if (response.status === 409) {
          throw new Error(
            "Sorry, this time slot was just booked. Please choose another."
          );
        }
        throw new Error(error.error || "Booking failed");
      }

      const result = await response.json();
      const params = new URLSearchParams({
        id: result?.ticket?.ticketNumber,
        name: formData.name,
        phone: formData.mobile,
        date: formData.date.toISOString(),
        time: formData.timeSlot,
        guests: formData.people?.toString() || "0",
      });

      // Redirect to Thank You page with data
      router.push(`/thank-you?${params.toString()}`);

      // Reset form
      setFormData({
        name: "",
        mobile: "",
        date: null,
        timeSlot: "",
        people: null,
      });
      setSelectedPlanId(null);
    } catch (error: any) {
      console.error("Booking error:", error.response);
      if (error?.response?.status === 401) {
        setIsAuthOpen(true);
        return; // stop further execution
      }
      setErrorMessage(error.message || "Failed to create booking."); // Set error message for toast
    } finally {
      setIsLoading(false);
    }
  };

  const togglePicker = (picker: "date" | "time" | "people") => {
    setActivePicker(activePicker === picker ? null : picker);
  };

  return (
    <div className="min-h-screen overflow-x-hidden bg-gradient-to-br from-gray-50 to-gray-100">
      <Header />

      <PageBreadcrumb
        items={[{ label: "Home", href: "/" }, { label: "Booking" }]}
      />

      {/* Toast Notification */}
      <ToastNotification message={errorMessage} onClose={clearErrorMessage} />

      {/* MAIN LAYOUT */}
      <div className="max-w-7xl mx-auto px-4 py-12 grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* ================= BOOKING FORM ================= */}
        <div className="bg-gradient-to-br from-[#055A3A] to-[#044d32] rounded-3xl p-6 sm:p-8 md:p-12 shadow-2xl relative h-fit">
          {/* Decorative Elements */}
          <div className="absolute inset-0 opacity-10 pointer-events-none rounded-3xl">
            <div className="absolute top-0 right-0 w-64 h-64 md:w-96 md:h-96 bg-white rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
            <div className="absolute bottom-0 left-0 w-64 h-64 md:w-96 md:h-96 bg-white rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />
          </div>

          <div className="relative z-10">
            <h1 className="text-3xl sm:text-4xl md:text-5xl text-white font-bold mb-3">
              Book Your Ride Here!
            </h1>
            <p className="text-white/80 mb-8 text-base sm:text-lg">
              Select your preferred date, time, and number of guests
            </p>

            <div className="grid grid-cols-1 gap-5">
              {/* NAME */}
              <input
                value={formData?.name}
                placeholder="Name"
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                className="w-full bg-white/10 border-2 border-white/30 rounded-2xl px-5 py-3 sm:py-4 text-white placeholder-white/70"
              />

              {/* MOBILE */}
              <input
                value={formData?.mobile}
                placeholder="Whatsapp Number"
                onChange={(e) =>
                  setFormData({ ...formData, mobile: e.target.value })
                }
                className="w-full bg-white/10 border-2 border-white/30 rounded-2xl px-5 py-3 sm:py-4 text-white placeholder-white/70"
              />

              {/* DATE */}
              <div className="relative">
                <button
                  onClick={() => togglePicker("date")}
                  className="w-full bg-white/10 border-2 border-white/30 rounded-2xl px-5 py-3 sm:py-4 text-white flex justify-between items-center"
                >
                  <span
                    className={formData.date ? "font-medium" : "text-white/70"}
                  >
                    {formatDate(formData.date)}
                  </span>
                  <Calendar size={20} />
                </button>

                {activePicker === "date" && (
                  <CustomDatePicker
                    selectedDate={formData.date}
                    onSelect={handleDateSelect}
                    onClose={() => setActivePicker(null)}
                  />
                )}
              </div>

              {/* TIME */}
              <div className="relative">
                <button
                  onClick={() => togglePicker("time")}
                  disabled={!formData.date || isLoadingSlots}
                  className="w-full bg-white/10 border-2 border-white/30 rounded-2xl px-5 py-3 sm:py-4 text-white flex justify-between items-center disabled:opacity-50"
                >
                  <span
                    className={
                      formData.timeSlot ? "font-medium" : "text-white/70"
                    }
                  >
                    {isLoadingSlots
                      ? "Loading slots..."
                      : formData.timeSlot || "Choose Time Slot"}
                  </span>
                  <Clock size={20} />
                </button>

                {activePicker === "time" &&
                  formData.date &&
                  !isLoadingSlots && (
                    <CustomTimePicker
                      selectedTime={formData.timeSlot}
                      onSelect={(time) => {
                        setFormData({ ...formData, timeSlot: time });
                        setActivePicker(null);
                      }}
                      onClose={() => setActivePicker(null)}
                      timeSlots={timeSlots}
                    />
                  )}
              </div>

              {/* PEOPLE */}
              <div className="relative">
                <button
                  onClick={() => togglePicker("people")}
                  className="w-full bg-white/10 border-2 border-white/30 rounded-2xl px-5 py-3 sm:py-4 text-white flex justify-between items-center"
                >
                  <span
                    className={
                      formData.people ? "font-medium" : "text-white/70"
                    }
                  >
                    {formData.people
                      ? `${formData.people} ${
                          formData.people === 1 ? "Person" : "People"
                        }`
                      : "No. of People"}
                  </span>
                  <Users size={20} />
                </button>

                {activePicker === "people" && (
                  <CustomPeoplePicker
                    selectedPeople={formData.people}
                    onSelect={(num) => {
                      setFormData({ ...formData, people: num });
                      setActivePicker(null);
                    }}
                  />
                )}
              </div>

              {/* TERMS */}
              <div className="flex gap-3 text-sm text-white/80">
                <input
                  type="checkbox"
                  checked={acceptedTerms}
                  onChange={(e) => setAcceptedTerms(e.target.checked)}
                  className="accent-green-400 mt-1"
                />
                <span>
                  I agree to the{" "}
                  <a
                    href="/terms-and-conditions"
                    className="underline text-green-400"
                  >
                    Terms
                  </a>{" "}
                  and{" "}
                  <a
                    href="/privacy-policy"
                    className="underline text-green-400"
                  >
                    Privacy Policy
                  </a>
                </span>
              </div>

              {/* SUBMIT */}
              <button
                onClick={handleBooking}
                disabled={isLoading || !acceptedTerms}
                className="bg-white text-[#055A3A] font-bold rounded-2xl py-3 sm:py-4 mt-2 md:hover:scale-105 transition disabled:opacity-50"
              >
                {isLoading ? "Processing..." : "Book Your Ride"}
              </button>
            </div>
          </div>
        </div>

        {/* ================= PLANS ================= */}
        <div>
          <div className="text-center mb-10">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-3">
              Popular Plans
            </h2>
            <p className="text-gray-600 text-base sm:text-lg">
              Choose the perfect experience for your adventure
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-rows-1 gap-8">
            {plans.map((plan) => (
              <div
                key={plan.id}
                onClick={() => setSelectedPlanId(plan.id)}
                className={`
                  bg-white rounded-3xl p-8 border-2 transition-all duration-500 cursor-pointer group
                  hover:shadow-2xl hover:-translate-y-2
                  ${
                    selectedPlanId === plan.id
                      ? "border-[#055A3A] shadow-2xl scale-105"
                      : "border-gray-200 hover:border-[#055A3A]/50"
                  }
                `}
              >
                <div className="flex items-start justify-between mb-6">
                  {plan.popular ? (
                    <span className="bg-gradient-to-r from-yellow-400 to-amber-500 text-gray-900 text-xs font-bold px-4 py-2 rounded-full shadow-md">
                      ⭐ Popular
                    </span>
                  ) : (
                    <div />
                  )}

                  <div
                    className={`
                    w-7 h-7 rounded-full border-2 flex items-center justify-center transition-all duration-300
                    ${
                      selectedPlanId === plan.id
                        ? "border-[#055A3A] bg-[#055A3A] scale-110"
                        : "border-gray-300 group-hover:border-[#055A3A]"
                    }
                  `}
                  >
                    {selectedPlanId === plan.id && (
                      <div className="w-3 h-3 rounded-full bg-white animate-in zoom-in duration-200" />
                    )}
                  </div>
                </div>

                <h3 className="text-3xl font-bold text-gray-900 mb-8 group-hover:text-[#055A3A] transition-colors">
                  {plan.name}
                </h3>

                <div className="space-y-4 mb-8">
                  <div className="flex items-center gap-4 text-gray-700 bg-gray-50 p-3 rounded-xl group-hover:bg-[#055A3A]/5 transition-colors">
                    <div className="bg-[#055A3A]/10 p-2 rounded-lg">
                      <Clock size={20} className="text-[#055A3A]" />
                    </div>
                    <span className="font-medium">{plan.duration}</span>
                  </div>
                  <div className="flex items-center gap-4 text-gray-700 bg-gray-50 p-3 rounded-xl group-hover:bg-[#055A3A]/5 transition-colors">
                    <div className="bg-[#055A3A]/10 p-2 rounded-lg">
                      <Users size={20} className="text-[#055A3A]" />
                    </div>
                    <span className="font-medium">{plan.maxPeople}</span>
                  </div>
                  <div className="flex items-center gap-4 text-gray-700 bg-gray-50 p-3 rounded-xl group-hover:bg-[#055A3A]/5 transition-colors">
                    <div className="bg-[#055A3A]/10 p-2 rounded-lg">
                      <Check size={20} className="text-[#055A3A]" />
                    </div>
                    <span className="font-medium">{plan.amenity}</span>
                  </div>
                </div>

                <div className="flex flex-col lg:flex-row lg:items-center justify-between pt-6 border-t-2 border-gray-100 gap-y-2">
                  <div>
                    <div className="flex items-baseline gap-1">
                      <span className="text:3xl lg:text-4xl font-bold text-gray-900">
                        ₹{plan.price}
                      </span>
                      <span className="text-gray-500 text-sm">/person</span>
                    </div>
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedPlanId(plan.id);
                      window.scrollTo({ top: 0, behavior: "smooth" });
                    }}
                    className="bg-[#055A3A] text-white font-bold px-8 py-2 lg:py-4 rounded-2xl hover:bg-[#044d32] transition-all duration-300 flex items-center gap-2 shadow-lg hover:shadow-xl hover:scale-105 group/btn"
                  >
                    <span>Select Plan</span>
                    <ArrowRight
                      className="group-hover/btn:translate-x-1 transition-transform"
                      size={18}
                    />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {bookingData && (
        <SuccessModal
          isOpen={showSuccessModal}
          onClose={() => setShowSuccessModal(false)}
          bookingData={bookingData}
        />
      )}
      <Modal
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
        title="Welcome Back"
      >
        <AuthForm onSuccess={() => setIsAuthOpen(false)} />
      </Modal>
      <Footer />
    </div>
  );
};

export default BookingPage;
