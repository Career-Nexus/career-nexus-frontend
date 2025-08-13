import React from "react";
import { Search, Eye, Download } from "lucide-react"; // You can replace with custom SVGs

const resources = [
  {
    id: 1,
    title: "PROFESSIONAL RESUME TEMPLATE",
    description:
      "Modern, ATS-friendly resume template with multiple layout options and industry-specific examples.",
    tags: ["Templates", "Resume", "interview"],
  },
  {
    id: 2,
    title: "LINKED IN OPTIMIZATION WORKBOOK",
    description:
      "Complete collection of cover letter templates for different industries and career levels.",
    tags: ["Templates", "Resume", "interview"],
  },
  {
    id: 3,
    title: "THE COMPLETE JOB SEARCH EBOOK",
    description:
      "Modern, ATS-friendly resume template with multiple layout options and industry-specific examples.",
    tags: ["Templates", "Resume", "interview"],
  },
  {
    id: 4,
    title: "PROFESSIONAL RESUME TEMPLATE",
    description:
      "Modern, ATS-friendly resume template with multiple layout options and industry-specific examples.",
    tags: ["Templates", "Resume", "interview"],
  },
  {
    id: 5,
    title: "PROFESSIONAL RESUME TEMPLATE",
    description:
      "Modern, ATS-friendly resume template with multiple layout options and industry-specific examples.",
    tags: ["Templates", "Resume", "interview"],
  },
  {
    id: 6,
    title: "INTERVIEW PREPARATION CHECKLIST",
    description:
      "Modern, ATS-friendly resume template with multiple layout options and industry-specific examples.",
    tags: ["Templates", "Resume", "interview"],
  },
];

export default function Librarys() {
  return (
    <div className="p-6">
      {/* Header */}
      <h1 className="text-2xl font-bold mb-6">Library</h1>

      {/* Search and filter */}
      <div className="flex flex-col md:flex-row items-center gap-4 mb-6">
        <div className="flex items-center border rounded-lg px-3 py-1 w-full md:w-1/2">
          <Search size={18} className="text-gray-500 mr-2" />
          <input
            type="text"
            placeholder="Search resources..."
            className="flex-1 text-sm border-none bg-transparent outline-none focus:outline-none focus:ring-0"
          />
        </div>
        <div className="flex gap-2 w-full md:w-auto">
          <select className="border rounded-lg px-3 py-2 text-sm w-full md:w-auto">
            <option>All Resources</option>
            <option>Templates</option>
            <option>Resume</option>
            <option>Interview</option>
          </select>
          <button className="bg-[#5DA05D] text-white px-4 py-2 rounded-lg text-sm">
            Search
          </button>
        </div>
      </div>

      {/* Cards grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {resources.map((res) => (
          <div
            key={res.id}
            className="border rounded-lg p-5 bg-white shadow-sm hover:shadow-md transition"
          >
            {/* Icon */}
            <div className="flex items-start gap-3">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-8 h-8 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <rect
                  x="3"
                  y="4"
                  width="18"
                  height="16"
                  rx="2"
                  ry="2"
                  strokeWidth="2"
                />
                <line
                  x1="3"
                  y1="10"
                  x2="21"
                  y2="10"
                  strokeWidth="2"
                />
              </svg>
              <div>
                <h2 className="font-bold text-sm">{res.title}</h2>
                <p className="text-gray-600 text-xs mt-1">{res.description}</p>
              </div>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mt-3">
              {res.tags.map((tag, i) => (
                <span
                  key={i}
                  className="bg-[#2A0D471A] text-gray-600 text-xs px-3 py-1 rounded-lg"
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* Buttons */}
            <div className="flex gap-3 mt-4">
              <button className="flex items-center gap-2 border border-[#5DA05D] rounded-lg px-4 py-2 text-sm text-gray-700 ">
                <Eye size={14} />
                Preview
              </button>
              <button className="flex items-center gap-2 bg-[#5DA05D] text-white rounded-lg px-4 py-2 text-sm">
                <Download size={14} />
                Download
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
