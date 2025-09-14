import { useEffect, useState } from "react"
import { BookingRequests } from "./BookingRequests"
import { UpcomingSessions } from "./UpcomingSessions"
import { CompletedSessions } from "./CompletedSessions"
import { Search } from "lucide-react"
import { MentorServices } from "../../../api/MentorServices"
import AllJobs from "../jobs/AllJobs"

export default function MentorshipRequests() {
  const [searchTerm, setSearchTerm] = useState("")
  const [activeTab, setActiveTab] = useState("booking-requests")
  const [requested, setRequested] = useState([])   // store booking requests
  const [loading, setLoading] = useState(false)


  const fetchRequests = async () => {
      setLoading(true)
      try {
        const res = await MentorServices.scheduledmentorship()
        const rawData = Array.isArray(res?.data) ? res.data : []

        const mappedData = rawData.map((session) => ({
          id: session.id,
          attendees: [
            session.mentor?.profile_photo,
            session.mentee?.profile_photo
          ].filter(Boolean),
          mentor: session.mentor,
          mentee: session.mentee,
          title: `${session.mentor?.first_name || ""} ${session.mentor?.last_name || ""}`,
          attendeeCount: 2,
          type: session.session_type,
          status: session.status,
          date: session.session_at?.date,
          time: session.session_at?.time,
          category: session.discourse,
          description: `Session between ${session.mentor?.first_name} and ${session.mentee?.first_name} about ${session.discourse}`,
          amount: session.amount,
          is_paid: session.is_paid,
          join: session.join,
        }))

        setRequested(mappedData)
      } catch (error) {
        console.error("Failed to fetch mentor sessions", error)
      } finally {
        setLoading(false)
      }
    }
  useEffect(() => {
    fetchRequests()
  }, [])

  const filteredRequested = requested.filter(
    (session) =>
      session.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      session.mentee?.first_name
        ?.toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      session.category?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      session.description?.toLowerCase().includes(searchTerm.toLowerCase())
  );
  return (
    // <div className="max-w-7xl mx-auto">
    //   {/* Search */}
    //   <div className="mb-6 flex gap-5">
    //     <div className="flex items-center w-full max-w-2xl border border-gray-300 rounded-lg overflow-hidden mb-4">
    //       <div className="flex items-center pl-3">
    //         <Search className="w-4 h-4 text-gray-400" />
    //       </div>
    //       <input
    //         type="text"
    //         placeholder="Search mentors by name or expertise"
    //         value={searchTerm}
    //         onChange={(e) => setSearchTerm(e.target.value)}
    //         className="flex-grow py-2 px-3 border-0 focus:outline-none focus:ring-0 w-full"
    //       />
    //     </div>
    //     <button className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium bg-[#5DA05D] text-white hover:bg-[#5DA05D] h-10 px-4 py-2">
    //       Search
    //     </button>
    //   </div>

    //   {/* Tabs */}
    //   <div className="w-full max-w-7xl mx-auto pt-4">
    //     <div className="flex bg-gray-100 p-1 rounded-lg mb-4">
    //       <button
    //         onClick={() => setActiveTab("booking-requests")}
    //         type="button"
    //         className={`w-full px-6 py-2 text-sm font-medium rounded-lg ${
    //           activeTab === 'booking-requests' ? 'bg-white shadow' : 'bg-gray-100 text-gray-500'
    //         }`}
    //       >
    //         {/* BOOKING REQUESTS ({requested.length}) */}
    //         BOOKING REQUESTS ({filteredRequested.length})
    //       </button>

    //       <button
    //         onClick={() => setActiveTab("upcoming-sessions")}
    //         type="button"
    //         className={`w-full px-6 py-2 text-sm font-medium rounded-lg ${
    //           activeTab === 'upcoming-sessions' ? 'bg-white shadow' : 'bg-gray-100 text-gray-500'
    //         }`}
    //       >
    //         UPCOMING SESSION (2)
    //       </button>

    //       <button
    //         onClick={() => setActiveTab("completed-sessions")}
    //         type="button"
    //         className={`w-full px-6 py-2 text-sm font-medium rounded-lg ${
    //           activeTab === 'completed-sessions' ? 'bg-white shadow' : 'bg-gray-100 text-gray-500'
    //         }`}
    //       >
    //         COMPLETED SESSION (3)
    //       </button>
    //     </div>

    //     <div>
    //       {activeTab === "booking-requests" && (
    //         // <BookingRequests requested={requested} loading={loading} />
    //         <BookingRequests
    //           requested={filteredRequested}
    //           refresh={fetchRequests} // pass refresh to child
    //           loading={loading}
    //         />
    //       )}
    //       {activeTab === "upcoming-sessions" && <UpcomingSessions />}
    //       {activeTab === "completed-sessions" && <CompletedSessions />}
    //     </div>
    //   </div>
    // </div>
    <AllJobs />
  )
}
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