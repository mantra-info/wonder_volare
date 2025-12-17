// components/booking/CustomTimePicker.tsx
import React, { useState } from "react";
import { ArrowUpRight } from "lucide-react";

interface TimeSlot {
  time: string;
  status: "available" | "unavailable";
}

interface TimePickerProps {
  selectedTime: string;
  onSelect: (time: string) => void;
  onClose: () => void;
  timeSlots: TimeSlot[]; // Time slots are now passed as a prop
}

export const CustomTimePicker: React.FC<TimePickerProps> = ({
  selectedTime,
  onSelect,
  onClose,
  timeSlots, // Destructure the prop
}) => {
  // Local state to handle selection before clicking "Save"
  const [tempSelected, setTempSelected] = useState<string>(selectedTime);

  const handleSave = () => {
    onSelect(tempSelected);
    onClose();
  };

  return (
    <div className="absolute top-full left-0 mt-2 bg-white rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] p-6 z-[100] w-[340px] md:w-[400px] border border-gray-100 animate-in fade-in zoom-in duration-200">
      
      {/* Time Slots Grid */}
      <div className="flex flex-wrap gap-3 mb-8">
        {timeSlots.map((slot) => { // Use timeSlots prop
          const isSelected = tempSelected === slot.time;
          const isUnavailable = slot.status === "unavailable";

          return (
            <button
              key={slot.time}
              disabled={isUnavailable}
              onClick={() => setTempSelected(slot.time)}
              className={`
                px-4 py-2.5 rounded-full text-sm font-medium transition-all duration-200 border
                ${
                  isUnavailable
                    ? "bg-gray-200 text-gray-400 border-transparent cursor-not-allowed"
                    : isSelected
                    ? "bg-[#F4C448] text-black border-[#F4C448] shadow-sm scale-105"
                    : "bg-white text-[#055A3A] border-[#055A3A] hover:bg-[#055A3A]/5"
                }
              `}
            >
              {slot.time}
            </button>
          );
        })}
      </div>

      {/* Legend */}
      <div className="flex items-center justify-between px-2 mb-6 text-sm text-gray-700">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-sm border border-[#055A3A] bg-white"></div>
          <span>Available</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-sm bg-[#F4C448]"></div>
          <span>Selected</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-sm bg-gray-200"></div>
          <span>Unavailable</span>
        </div>
      </div>

      {/* Footer Actions */}
      <div className="flex items-center justify-between pt-4 border-t border-gray-100">
        <button
          onClick={onClose}
          className="text-orange-500 hover:text-orange-600 font-medium px-2 py-2 underline-offset-4 hover:underline transition-all"
        >
          Close
        </button>

        <button
          onClick={handleSave}
          disabled={!tempSelected}
          className="bg-[#2E8B57] hover:bg-[#257245] text-white px-6 py-2.5 rounded-xl font-medium flex items-center gap-2 transition-colors shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Save
          <ArrowUpRight size={18} />
        </button>
      </div>
    </div>
  );
};