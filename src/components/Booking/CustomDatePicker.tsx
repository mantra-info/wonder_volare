import React, { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface DatePickerProps {
  selectedDate: Date | null;
  onSelect: (date: Date) => void;
  onClose: () => void;
}

export const CustomDatePicker: React.FC<DatePickerProps> = ({ selectedDate, onSelect }) => {
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    return {
      daysInMonth: lastDay.getDate(),
      startingDayOfWeek: firstDay.getDay(),
    };
  };

  const { daysInMonth, startingDayOfWeek } = getDaysInMonth(currentMonth);
  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December",
  ];

  const handleMonthChange = (offset: number) => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + offset));
  };

  return (
    <div className="absolute top-full left-0 mt-2 bg-white rounded-2xl shadow-2xl p-6 z-[100] w-80 border border-gray-100 animate-in fade-in zoom-in duration-200">
      <div className="flex items-center justify-between mb-4">
        <button onClick={() => handleMonthChange(-1)} className="p-2 hover:bg-gray-100 rounded-lg">
          <ChevronLeft size={20} className="text-gray-700" />
        </button>
        <h3 className="font-semibold text-gray-900">
          {monthNames[currentMonth.getMonth()]} {currentMonth.getFullYear()}
        </h3>
        <button onClick={() => handleMonthChange(1)} className="p-2 hover:bg-gray-100 rounded-lg">
          <ChevronRight size={20} className="text-gray-700" />
        </button>
      </div>

      <div className="grid grid-cols-7 gap-2 mb-2">
        {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map((day) => (
          <div key={day} className="text-center text-xs font-semibold text-gray-500 py-2">
            {day}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-2">
        {Array.from({ length: startingDayOfWeek }).map((_, i) => (
          <div key={`empty-${i}`} />
        ))}
        {Array.from({ length: daysInMonth }).map((_, i) => {
          const day = i + 1;
          const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
          const isSelected = selectedDate && date.toDateString() === selectedDate.toDateString();
          const isPast = date < new Date(new Date().setHours(0, 0, 0, 0));

          return (
            <button
              key={day}
              onClick={() => !isPast && onSelect(date)}
              disabled={isPast}
              className={`
                p-2 text-sm rounded-lg transition-all
                ${isSelected ? "bg-[#055A3A] text-white font-semibold scale-105" : ""}
                ${!isSelected && !isPast ? "hover:bg-gray-100" : ""}
                ${isPast ? "text-gray-300 cursor-not-allowed" : "cursor-pointer text-black"}
              `}
            >
              {day}
            </button>
          );
        })}
      </div>
    </div>
  );
};