import { useState } from "react";
import AllJobs from "../../../jobs/AllJobs";

// Play SVG Icon
const PlayIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="w-12 h-12 text-white"
    fill="currentColor"
    viewBox="0 0 24 24"
  >
    <path d="M8 5v14l11-7z" />
  </svg>
);

// Video Card Component
function VideoCard({ thumbnail, views }) {
  return (
    <div className="relative rounded-lg overflow-hidden shadow-md hover:scale-105 transition transform cursor-pointer">
      {/* Thumbnail */}
      <img
        src={thumbnail}
        alt="video thumbnail"
        className="w-full h-60 object-cover"
      />

      {/* Overlay Play Button */}
      <div className="absolute inset-0 flex items-center justify-center bg-black/30">
        <PlayIcon />
      </div>

      {/* Views Count */}
      <div className="absolute bottom-2 right-2 bg-purple-900 text-white text-xs px-2 py-1 rounded">
        {views} Views
      </div>
    </div>
  );
}

export default function VideoTabs() {
  const [activeTab, setActiveTab] = useState("short");

  const shortVideos = [
    { thumbnail: "https://placehold.co/300x400", views: "20,865" },
    { thumbnail: "https://placehold.co/300x400", views: "20,865" },
    { thumbnail: "https://placehold.co/300x400", views: "20,865" },
  ];

  const longVideos = [
    { thumbnail: "https://placehold.co/300x400", views: "12,543" },
    { thumbnail: "https://placehold.co/300x400", views: "8,921" },
    { thumbnail: "https://placehold.co/300x400", views: "15,347" },
  ];

  const videos = activeTab === "short" ? shortVideos : longVideos;

  return (
    // <div className="p-6">
    //   {/* Heading */}
    //   <h2 className="text-lg font-bold mb-4">Videos</h2>

    //   {/* Tabs */}
    //   <div className="flex gap-6 border-b border-gray-200 mb-6">
    //     <button
    //       onClick={() => setActiveTab("short")}
    //       className={`pb-2 text-sm font-medium ${
    //         activeTab === "short"
    //           ? "text-black border-b-2 border-green-600"
    //           : "text-gray-500"
    //       }`}
    //     >
    //       Short videos
    //     </button>
    //     <button
    //       onClick={() => setActiveTab("long")}
    //       className={`pb-2 text-sm font-medium ${
    //         activeTab === "long"
    //           ? "text-black border-b-2 border-green-600"
    //           : "text-gray-500"
    //       }`}
    //     >
    //       Long videos
    //     </button>
    //   </div>

    //   {/* Video Grid */}
    //   <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
    //     {videos.map((video, i) => (
    //       <VideoCard key={i} {...video} />
    //     ))}
    //   </div>
    // </div>
    <AllJobs/>
  );
}