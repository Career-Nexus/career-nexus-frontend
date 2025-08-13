import { useState } from "react"
import { BookingRequests } from "./BookingRequests"
import { UpcomingSessions } from "./UpcomingSessions"
import { CompletedSessions } from "./CompletedSessions"

export default function MentorshipRequests() {
  const [searchTerm, setSearchTerm] = useState("")
  const [activeTab, setActiveTab] = useState("booking-requests")

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Search */}
      <div className="flex items-center mb-6 max-w-7xl">
        <input
          type="text"
          placeholder="Search mentorship requests"
          className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 max-w-md shadow-sm focus:ring-[#5DA05D]"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-[#5DA05D] text-white hover:bg-[#5DA05D] h-10 px-4 py-2 ml-4">
          <SearchIcon className="w-4 h-4 mr-2" /> Search
        </button>
      </div>

      {/* Tabs */}
      <div className="w-full max-w-4xl mx-auto pt-4">
      <div className="flex bg-gray-100 p-1 rounded-lg mb-4">
          <button
            onClick={() => setActiveTab("booking-requests")}
            type="button"
            className={`w-full px-6 py-2 text-sm font-medium rounded-lg ${activeTab === 'booking-requests' ? 'bg-white shadow' : 'bg-gray-100 text-gray-500'}`}
          >
            BOOKING REQUESTS (4)
          </button>
          
          <button
            onClick={() => setActiveTab("upcoming-sessions")}
            type="button"
          className={`w-full px-6 py-2 text-sm font-medium rounded-lg ${activeTab === 'upcoming-sessions' ? 'bg-white shadow' : 'bg-gray-100 text-gray-500'}`}
          >
            UPCOMING SESSION (2)
          </button>
          <button
            onClick={() => setActiveTab("completed-sessions")}
            type="button"
          className={`w-full px-6 py-2 text-sm font-medium rounded-lg ${activeTab === 'completed-sessions' ? 'bg-white shadow' : 'bg-gray-100 text-gray-500'}`}
          >
            COMPLETED SESSION (3)
          </button>
        </div>

        <div>
          {activeTab === "booking-requests" && <BookingRequests />}
          {activeTab === "upcoming-sessions" && <UpcomingSessions />}
          {activeTab === "completed-sessions" && <CompletedSessions />}
        </div>
      </div>
    </div>
  )
}
// SVG Icons
const SearchIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="11" cy="11" r="8" />
    <path d="m21 21-4.3-4.3" />
  </svg>
)

export const ChevronDownIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="m6 9 6 6 6-6" />
  </svg>
)
export const CheckCircleIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
    <path d="m9 11 3 3L22 4" />
  </svg>
)