import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ChevronDown } from "lucide-react";

export default function ConsultantDropdown({
  buttonLabel = "Partner With Career-Nexus",
  consultants = [],
  onSelect = null,
  buttonClassName = "text-white bg-[#5DA05D] border-2 py-2 px-10 rounded-lg",
  dropdownWidth = "md:w-64",
}) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedConsultant, setSelectedConsultant] = useState(null);

  const handleConsultantSelect = (consultant) => {
    setSelectedConsultant(consultant);
    setIsDropdownOpen(false);
    // Call the callback function if provided
    if (onSelect) {
      onSelect(consultant);
    }
  };
//   const Clickoutside = (e) => {
//         if (e.target === e.currentTarget) isClose();
//     }
  return (
    <div className="relative">
      <button
        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
        className={`flex items-center gap-2 transition-colors w-full md:w-auto justify-center ${buttonClassName}`}
      >
        {buttonLabel}
        <ChevronDown
          size={18}
          className={`transition-transform ${isDropdownOpen ? "rotate-180" : ""}`}
        />
      </button>

      {/* Dropdown Menu */}
      {isDropdownOpen && (
        <div className={`absolute top-full mt-2 w-full ${dropdownWidth} bg-white border border-gray-200 rounded-lg shadow-lg z-10`}>
          <div className="p-2">
            <p className="text-lg text-gray-500 px-3 py-2 font-semibold">
              Select a Consultant
            </p>
            {consultants.length > 0 ? (
              consultants.map((consultant) => (
                <div key={consultant.id}>
                  {consultant.link ? (
                    <Link to={consultant.link} target="_blank" rel="noopener noreferrer">
                      <button
                        className="w-full text-left px-3 py-3 hover:bg-[#f0f5f0] rounded-md transition-colors border-b border-gray-100 last:border-b-0"
                      >
                        <p className="font-semibold text-gray-900">{consultant.name}</p>
                        <p className="text-xs text-gray-500">{consultant.title}</p>
                      </button>
                    </Link>
                  ) : (
                    <button
                      onClick={() => handleConsultantSelect(consultant)}
                      className="w-full text-left px-3 py-3 hover:bg-[#f0f5f0] rounded-md transition-colors border-b border-gray-100 last:border-b-0"
                    >
                      <p className="font-semibold text-gray-900">{consultant.name}</p>
                      <p className="text-xs text-gray-500">{consultant.title}</p>
                    </button>
                  )}
                </div>
              ))
            ) : (
              <p className="text-sm text-gray-500 px-3 py-3">No consultants available</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
