import React from 'react'
import { useState } from "react";

function VideoTutorial() {
  return (
    <div>
      <Video />
    </div>
  )
}

export default VideoTutorial

// Play Icon (SVG)
const PlayIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="w-10 h-10 text-black"
    fill="currentColor"
    viewBox="0 0 24 24"
  >
    <path d="M8 5v14l11-7z" />
  </svg>
);

// Notification Icon (SVG)
const NotificationIcon = () => (
  <div className="absolute top-2 right-2 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
    2
  </div>
);

// Video Card Component
function VideoCard({ title, description, duration, hasNotification }) {
  return (
    <div className="relative bg-green-100 rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition">
      {/* Video Preview Section */}
      <div className="flex flex-col items-center justify-center h-36">
        <span className="text-3xl font-bold text-green-800">CN</span>
        <span className="text-gray-600">Career- Nexus.Com</span>
        <div className="absolute inset-0 flex items-center justify-center">
          <PlayIcon />
        </div>
        {hasNotification && <NotificationIcon />}
      </div>

      {/* Duration Label */}
      <div className="absolute top-2 left-2 bg-black text-white text-xs rounded px-2 py-1">
        {duration}
      </div>

      {/* Info Section */}
      <div className="bg-white px-4 py-3">
        <h3 className="text-sm font-bold text-gray-900">{title}</h3>
        <p className="text-xs text-gray-500">{description}</p>
      </div>
    </div>
  );
}

// Main Component
function Video() {
  const tutorials = [
    {
      title: "Platform Overview",
      description: "5 min tour of Career-Nexus",
      duration: "5:00",
    },
    {
      title: "Profile Optimization",
      description: "Create a standout profile",
      duration: "5:00",
    },
    {
      title: "Advanced Search",
      description: "Find your dream job faster",
      duration: "5:00",
    },
    {
      title: "Networking Tools",
      description: "Build professional connections",
      duration: "5:00",
      hasNotification: true,
    },
    {
      title: "Application Tracking",
      description: "Manage your job applications",
      duration: "5:00",
    },
    {
      title: "Interview Preparation",
      description: "Ace your next interview",
      duration: "5:00",
    },
  ];

  return (
    <div className="">
      <h2 className="text-xl font-bold mb-4">Video Tutorials</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {tutorials.map((tut, index) => (
          <VideoCard key={index} {...tut} />
        ))}
      </div>
    </div>
  );
}