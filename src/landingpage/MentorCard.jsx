import React from "react";
import { Link } from "react-router-dom";

export default function GetStarted() {
  return (
    <div className="w-full flex justify-center mb-10">
      {/* Image wrapper */}
      <div className="relative w-full max-w-7xl mx-2 md:mx-20">
        <img
          src="/images/landing/Background.png"
          alt="landing"
          className="w-full h-72 object-cover rounded-xl"
        />

        {/* Centered overlay */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-center px-4">
          <h1 className="text-3xl font-bold mb-4">
            Join as a Mentor
          </h1>

          <p className="mb-6 max-w-xl">
            Career-Nexus mentors don't sell dreams. They share reality.
          </p>

          <div className="flex flex-col md:flex-row gap-4">

            <Link to="/signup">
              <button
                className="text-[#2A0D47] bg-white py-2 px-10 rounded-lg"
              >
                Join as a Mentor
              </button>
            </Link>

          </div>

          <p className="text-xs mt-4">
            Mentor onboarding is selective to ensure quality, relevance, and integrity.
          </p>
        </div>
      </div>
    </div>
  );
}
