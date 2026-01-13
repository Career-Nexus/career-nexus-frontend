import React from "react";

export default function GetStarted() {
  return (
    <div className="w-full flex justify-center mb-10">
      {/* Image wrapper */}
      <div className="relative w-full max-w-5xl mx-2 md:mx-20">
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
            <button
              className="text-[#5DA05D] bg-white py-2 px-10 rounded-lg"
              onClick={() => (window.location.href = "#get-started")}
            >
              Join Early Access
            </button>

            <button
              className="text-white bg-[#5DA05D] border-2 py-2 px-10 rounded-lg"
              onClick={() => (window.location.href = "#get-started")}
            >
              Partner With Career-Nexus
            </button>
          </div>

          <p className="text-xs mt-4">
            No spam. No pressure. Just meaningful progress.
          </p>
        </div>
      </div>
    </div>
  );
}
