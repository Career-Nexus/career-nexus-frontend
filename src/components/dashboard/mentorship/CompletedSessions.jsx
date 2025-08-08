import { CalendarIcon, ClockIcon, Ellipsis, MessageSquareTextIcon, Star } from "lucide-react"
import { CheckCircleIcon } from "./MentorshipRequests"

export function CompletedSessions() {
    const completedSessions = [
        {
            id: 1,
            name: "DevCorp",
            role: "Senior Engineer",
            date: "2025-06-20",
            attendance: "2 attendees",
            time: "9:00 AM (1 hour)",
            topic: "System Design Interview Prep",
            status: "Completed",
            review: "Incredibly helpful group session! The mock interviews were exactly what our team needed.",
            avatar: "/placeholder.svg?height=40&width=40",
        },
        {
            id: 2,
            name: "Lisa Wang",
            role: "Group Session",
            date: "2025-06-15",
            time: "1:00 PM (1.5 hours)",
            topic: "Career Strategy",
            status: "Completed",
            review: "Incredibly helpful group session! The mock interviews were exactly what our team needed.",
            avatar: "/placeholder.svg?height=40&width=40",
        },
        {
            id: 3,
            name: "Emily White",
            role: "Product Manager",
            date: "2025-06-10",
            time: "4:00 PM (45 minutes)",
            topic: "Agile Methodologies",
            status: "Completed",
            review: "Great insights on career progression in tech. Thank you!",
            avatar: "/placeholder.svg?height=40&width=40",
        },
    ]

    return (
        <div className="grid grid-cols-1">
            {completedSessions.map((session) => (
                <div key={session.id} className="bg-white p-5 rounded-xl shadow mb-5">
                    <div className="flex flex-row justify-between items-center p-0 mb-2">
                        <div className="flex items-center gap-3">
                            <div className="relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full">
                                <img className="aspect-square h-full w-full" alt={session.name} src={session.avatar || "/placeholder.svg"} />
                                <span className="flex h-full w-full items-center justify-center rounded-full bg-muted">{session.name.split(' ').map(n => n[0]).join('')}</span>
                            </div>
                            <div>
                                <h2 className="text-lg font-bold">{session.name}</h2>
                                <p className="text-sm text-gray-500">{session.attendance}</p>
                                <p className="text-sm text-gray-500">{session.date}</p>

                            </div>
                        </div>
                        <span className="text-gray-500 font-medium flex items-center gap-1">
                            <Ellipsis className="w-4 h-4" />
                        </span>
                    </div>
                    <div className=" my-4 ">
                        <div className="flex justify-between items-center">
                            <div className="text-xs text-[#2A0D47] bg-[#2A0D471A] px-2 py-1 w-max rounded mb-2">
                                {session.topic}
                            </div>
                            <p className="text-sm text-yellow-200 mb-4 flex">
                                <Star className="fill-yellow-200 size-4"/><Star className="fill-yellow-200 size-4"/>
                                <Star className="fill-yellow-200 size-4"/><Star className="fill-yellow-200 size-4"/>
                                <Star className="fill-yellow-200 size-4"/>
                            </p>
                        </div>
                        <div className="flex space-x-3">
                            {session.review}
                        </div>
                    </div>
                </div>
            ))}
        </div>
    )
}