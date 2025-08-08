
import { CalendarIcon, ClockIcon } from "lucide-react";
import { ChevronDownIcon } from "./MentorshipRequests";

const bookingData = [
    {
        id: "1",
        title: "TechCorp Solutions",
        attendees: ["/images/profile.png", "/images/profile2.png", "/images/profile4.png"],
        attendeeCount: 3,
        type: "Group Session",
        status: "Pending",
        date: "2025-07-15",
        time: "2:00 PM (1.5 hours)",
        category: "Team Development Workshop",
        description:
            "Hi! We're looking for a group mentoring session for our development team. We want to discuss best practices for transitioning from frontend to full-stack development and...",
    },
    {
        id: "2",
        title: "Michael Chen",
        attendees: ["/images/profile.png"],
        type: "Individual",
        status: "Pending",
        date: "2025-07-18",
        time: "10:00 AM (45 minutes)",
        category: "Resume Review",
        description:
            "I'm a recent CS graduate looking for feedback on my resume and interview preparation tips. Your background in tech leadership would be incredibly valuable.",
    },
    {
        id: "3",
        title: "Innovation Labs",
        attendees: ["/images/profile2.png", "/images/profile4.png"],
        attendeeCount: 2,
        type: "Group Session",
        status: "Accepted",
        date: "2025-07-12",
        time: "3:30 PM (1 hours)",
        category: "Resume Review",
        description:
            "Hi! We're looking for a group mentoring session for our development team. We want to discuss best practices for transitioning from frontend to full-stack development and...",
    },
    {
        id: "4",
        title: "Innovation Labs",
        attendees: ["/images/profile.png", "/images/profile2.png"],
        attendeeCount: 2,
        type: "Group Session",
        status: "Pending",
        date: "2025-07-12",
        time: "3:30 PM (1 hours)",
        category: "Resume Review",
        description:
            "Hi! We're looking for a group mentoring session for our development team. We want to discuss best practices for transitioning from frontend to full-stack development and...",
    },
];

export function BookingRequests() {
    return (
        <div className="grid md:grid-cols-2 gap-6">
            {bookingData.map((booking) => (
                <div key={booking.id} className="bg-white p-5 rounded-xl shadow flex flex-col min-h-[350px]">
                    <div className="flex flex-row gap-8 p-0 mb-2 items-center">
                        <div className="flex">
                            {booking.attendees.map((img, index) => (
                                <img
                                    key={`${booking.id}-img-${index}`}
                                    src={img}
                                    alt="profile"
                                    className={`w-8 rounded-full ${index > 0 ? "ml-[-12px]" : ""}`}
                                />
                            ))}
                        </div>
                        <div className="flex flex-col">
                            <h2 className="text-lg font-bold">{booking.title}</h2>
                            <span className="text-sm text-gray-500">
                                {booking.attendeeCount ? `${booking.attendeeCount} attendees` : "Recent Graduate"}
                            </span>
                            {booking.attendeeCount && (
                                <span className="text-xs bg-[#D9FFDB] text-[#5DA05D] px-2 py-1 rounded-full">
                                    {booking.type}
                                </span>
                            )}
                        </div>
                        <span className={`font-medium ml-8 mt-[-40px] ${booking.status === 'Pending' ? 'text-[#E2B607]' : 'text-[#5DA05D]'}`}>{booking.status}</span>
                    </div>
                    <div className="p-0">
                        {booking.attendeeCount ?(
                            <div className="mb-3">
                                <button
                                    className="inline-flex items-center justify-between whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-[#F6FFF6] hover:bg-green-100 text-[#5DA05D] h-10 px-4 py-2 w-full text-left"
                                >
                                    Attendees ({booking.attendeeCount})
                                    <ChevronDownIcon className="w-4 h-4" />
                                </button>
                            </div>
                        ):(
                            <div className="mt-20">
                            </div>
                        )}
                        <div className="flex items-center text-sm text-gray-600 mb-2">
                            <CalendarIcon className="w-5 h-5" />
                            <span className="ml-2">{booking.date}</span>
                            <ClockIcon className="w-5 h-5 ml-4" />
                            <span className="ml-2">{booking.time}</span>
                        </div>
                        <div className="text-xs text-[#2A0D47] bg-[#2A0D471A] px-2 py-1 w-max rounded mb-2">
                            {booking.category}
                        </div>
                        <p className="text-sm text-gray-700 mb-4">{booking.description}</p>
                        <div className="flex space-x-3 mt-auto">
                            <button
                                className=" inline-flex items-center justify-center rounded-lg text-sm font-medium bg-[#5DA05D] text-white h-10 px-4 py-2 flex-1"
                            >
                                Accept
                            </button>
                            <button
                                className="inline-flex items-center justify-center rounded-lg text-sm font-medium border border-input h-10 px-4 py-2 flex-1 border-red-500 text-red-500"
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}