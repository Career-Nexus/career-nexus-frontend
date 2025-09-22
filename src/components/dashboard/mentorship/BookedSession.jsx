
import { CalendarIcon, ClockIcon } from "lucide-react";
import { ChevronDownIcon } from "./MentorshipRequests";
import { useEffect, useState } from "react";
import { MentorServices } from "../../../api/MentorServices";
import { Box, Spinner } from "@chakra-ui/react";
import { toast } from 'react-toastify'
import AcceptedBookings from "./AcceptedBookings";
import AllJobs from "../jobs/AllJobs";

export default function BookedSession() {
    const [requestedSession, setRequestedSession] = useState([]);
    const [loading, setLoading] = useState(false);
    const [openDropdown, setOpenDropdown] = useState(null); // Track which dropdown is open

    const requestedSessions = async () => {
        setLoading(true);
        try {
            const res = await MentorServices.requestedmentorship();
            const rawData = Array.isArray(res?.data) ? res.data : [];

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
                description: `Session between ${session.mentor?.first_name} and ${session.mentee?.first_name} about ${session.discourse}`
            }));

            setRequestedSession(mappedData);
        } catch (error) {
            console.log("failed to fetch requested mentor session", error);
        } finally {
            setLoading(false);
        }
    };
    
    useEffect(() => {
        requestedSessions();
    }, []);

    const toggleDropdown = (id) => {
        setOpenDropdown(openDropdown === id ? null : id);
    };
    return (
        <div >
            <div className="grid md:grid-cols-2 gap-6">
                {loading ? (
                    <Box display="flex" justifyContent="center" alignItems="center" height="200px">
                        <Spinner size="lg" color="#5DA05D" thickness="4px" />
                    </Box>
                ) : requestedSession.length == 0 ?
                    (
                        <p>No requested sessions found.</p>
                    ) : (
                        requestedSession.map((booking) => (
                            <div key={booking.id}>
                                <h2 className="text-xl font-bold mb-3">Booked sessions</h2>
                                <div
                                    key={booking.id}
                                    className="bg-white p-5 rounded-xl shadow flex flex-col min-h-[350px]"
                                >
                                    <div className="flex flex-row gap-8 p-0 mb-2 items-center">
                                        <div className="flex">
                                            {booking.attendees.map((img, index) => (
                                                <img
                                                    key={`${booking.id}-img-${index}`}
                                                    src={img}
                                                    alt="profile"
                                                    className={`w-8 h-8 object-cover rounded-full ${index > 0 ? "ml-[-12px]" : ""
                                                        }`}
                                                />
                                            ))}
                                        </div>
                                        <div className="flex flex-col">
                                            <h2 className="text-lg font-bold">{booking.title}</h2>
                                            <span className="text-sm text-gray-500">
                                                {booking.attendeeCount
                                                    ? `${booking.attendeeCount} attendees`
                                                    : "Recent Graduate"}
                                            </span>
                                            {booking.attendeeCount && (
                                                <span className="text-xs bg-[#D9FFDB] text-[#5DA05D] px-2 py-1 rounded-full">
                                                    {booking.type}
                                                </span>
                                            )}
                                        </div>
                                        <span
                                            className={`font-medium ml-8 mt-[-40px] ${booking.status === "PENDING"
                                                ? "text-[#E2B607]"
                                                : "text-[#5DA05D]"
                                                }`}
                                        >
                                            {booking.status}
                                        </span>
                                    </div>

                                    {/* Toggleable dropdown */}
                                    <div className="p-0">
                                        {booking.attendeeCount ? (
                                            <div className="mb-3">
                                                <button
                                                    onClick={() => toggleDropdown(booking.id)}
                                                    className="inline-flex items-center justify-between whitespace-nowrap rounded-md text-sm font-medium bg-[#F6FFF6] hover:bg-green-100 text-[#5DA05D] h-10 px-4 py-2 w-full text-left"
                                                >
                                                    Attendees ({booking.attendeeCount})
                                                    <ChevronDownIcon
                                                        className={`w-4 h-4 transform transition-transform ${openDropdown === booking.id ? "rotate-180" : ""
                                                            }`}
                                                    />
                                                </button>

                                                {openDropdown === booking.id && (
                                                    <div className="mt-2 bg-gray-50 p-3 rounded-lg border">
                                                        {/* Mentor */}
                                                        <div className="flex items-center mb-2">
                                                            <img
                                                                src={booking.mentor?.profile_photo}
                                                                alt="mentor"
                                                                className="w-8 h-8 rounded-full object-cover mr-2"
                                                            />
                                                            <span className="text-sm font-medium">
                                                                {booking.mentor?.first_name} {booking.mentor?.last_name} (Mentor)
                                                            </span>
                                                        </div>
                                                        {/* Mentee */}
                                                        <div className="flex items-center">
                                                            <img
                                                                src={booking.mentee?.profile_photo}
                                                                alt="mentee"
                                                                className="w-8 h-8 rounded-full object-cover mr-2"
                                                            />
                                                            <span className="text-sm font-medium">
                                                                {booking.mentee?.first_name} {booking.mentee?.last_name} (Mentee)
                                                            </span>
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                        ) : (
                                            <div className="mt-20"></div>
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
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
            </div>
            {/* accepted bookings */}
            <AcceptedBookings />
        </div>
    );

    // return(
    //     <div>
    //         <AllJobs />
    //     </div>
    // )
}
