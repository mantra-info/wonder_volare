// components/booking/CustomPeoplePicker.tsx
import React from "react";
import { Check } from "lucide-react";

interface PeoplePickerProps {
  selectedPeople: number | null;
  onSelect: (num: number) => void;
  onClose?: () => void;
}

export const CustomPeoplePicker: React.FC<PeoplePickerProps> = ({ selectedPeople, onSelect }) => {
  const people = [1, 2, 3, 4];

  return (
    <div className="absolute top-full left-0 mt-2 bg-white rounded-2xl shadow-2xl p-4 z-[100] w-56 border border-gray-100 animate-in fade-in zoom-in duration-200">
      <div className="space-y-2">
        {people.map((num) => (
          <button
            key={num}
            onClick={() => onSelect(num)}
            className={`
              w-full p-3 text-left rounded-xl transition-all flex items-center justify-between
              ${selectedPeople === num ? "bg-[#055A3A] text-white font-semibold" : "hover:bg-gray-100 text-gray-700"}
            `}
          >
            <span>{num} {num === 1 ? "Person" : "People"}</span>
            {selectedPeople === num && <Check size={18} />}
          </button>
        ))}
      </div>
    </div>
  );
};