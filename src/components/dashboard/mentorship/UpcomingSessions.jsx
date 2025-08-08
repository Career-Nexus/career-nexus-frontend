import { CalendarIcon, ClockIcon, UserIcon, VideoIcon } from "lucide-react"

export function UpcomingSessions() {
  const upcomingSessions = [
    {
      id: 1,
      name: "Sarah Johnson",
      role: "Junior Developer",
      date: "2025-08-01",
      time: "11:00 AM (1 hour)",
      topic: "Career Path Guidance",
      status: "Confirmed",
      description: "Looking for advice on navigating the first few years of a software development career and potential specializations.",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      id: 2,
      name: "DevOps Team A",
      role: "Group Session",
      date: "2025-08-05",
      time: "3:00 PM (2 hours)",
      topic: "Cloud Migration Strategy",
      status: "Confirmed",
      description: "Our team is planning a migration to a new cloud provider and needs guidance on best practices and potential pitfalls.",
      avatar: "/placeholder.svg?height=40&width=40",
    },
  ]

  return (
    <div className="grid md:grid-cols-2 gap-6">
      {upcomingSessions.map((session) => (
        <div key={session.id} className="bg-white p-5 rounded-xl shadow">
          <div className="flex flex-row justify-between items-center p-0 mb-2">
            <div className="flex items-center gap-3">
              <div className="relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full">
                <img className="aspect-square h-full w-full" alt={session.name} src={session.avatar || "/placeholder.svg"} />
                <span className="flex h-full w-full items-center justify-center rounded-full bg-muted">{session.name.split(' ').map(n => n[0]).join('')}</span>
              </div>
              <div>
                <h2 className="text-lg font-bold">{session.name}</h2>
                <p className="text-sm text-gray-500">{session.role}</p>
              </div>
            </div>
            {/* <span className="text-green-600 font-medium">{session.status}</span> */}
          </div>
          <div className="p-0">
            <div className="flex items-center text-sm text-gray-600 mb-2">
              <CalendarIcon className="w-5 h-5" />
              <span className="ml-2">{session.date}</span>
              <ClockIcon className="w-5 h-5 ml-4" />
              <span className="ml-2">{session.time}</span>
            </div>
            <div className="text-xs text-[#2A0D47] bg-[#2A0D471A] px-2 py-1 w-max rounded mb-2">
              {session.topic}
            </div>
            {/* <p className="text-sm text-gray-700 mb-4">
              {session.description}
            </p> */}
            <div className="flex space-x-3">
              <button className="items-center justify-center rounded-lg text-sm bg-[#5DA05D] text-white h-10 px-4 py-2 flex-1">
                Join Session
              </button>
              <button className="items-center justify-center rounded-lg text-s border h-10 px-4 py-2 flex-1 border-[#5DA05D] text-[#5DA05D]">
                Reschedule
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}