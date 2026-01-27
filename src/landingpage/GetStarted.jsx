import React from "react";
import { Link } from "react-router-dom";
import ConsultantDropdown from "./ConsultantDropdown";

export const consultants = [
    { id: 1, name: "Anne", title: "HR Consultation  - Learning and Development", link:"https://calendar.app.google/uraaKNjeXuXuN6vr5" },
    { id: 2, name: "Lara", title: "Lead Consultant - L&D Specialist", link:"https://calendar.app.google/4edsKcba4dqp2ibBA" },
    { id: 3, name: "Samuel", title: "Career-Nexus Consultation Team", link:"https://calendar.app.google/qUW1SHgwsPL9ryiJ7" },
    { id: 4, name: "Oyindamola", title: "HR Consultation -Learning and Development", link:"https://calendar.google.com/calendar/u/0/appointments/schedules/AcZssZ0Lm6SYbu3xyaB9OmwT9bO2ECy5RlmrRIjcS46mKinuDz9_hMW3PsCarJKcBt2MMivcGqFtJ-4n" },
  ];
export default function GetStarted() {
  return (
    <div className="w-full flex justify-center mb-10">
      {/* Image wrapper */}
      <div className="relative w-full max-w-7xl mx-2 md:mx-20">
        <img
          src="/images/landing/landing8.png"
          alt="landing"
          className="w-full h-72 object-cover rounded-xl"
        />

        {/* Centered overlay */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-center px-4">
          <h1 className=" text-xl md:text-3xl font-bold mb-4">
            Join our early access community
          </h1>

          <p className="mb-6 max-w-xl">
            Be part of a growing ecosystem shaping the future of career development.
          </p>

          <div className="flex flex-col md:flex-row gap-4">
            <Link to="/signup">
              <button
                className="text-[#5DA05D] bg-white py-2 px-10 rounded-lg"
              >
                Join Early Access
              </button>
            </Link>
            
            {/* Consultant Dropdown Component */}
            <ConsultantDropdown 
              buttonLabel="Partner With Career-Nexus"
              consultants={consultants}
              buttonClassName="text-white bg-[#5DA05D] border-2 py-2 px-10 rounded-lg"
              dropdownWidth="md:w-96"
            />
          </div>

          <p className="text-xs mt-4">
            No spam. No pressure. Just meaningful progress.
          </p>
        </div>
      </div>
    </div>
  );
}
