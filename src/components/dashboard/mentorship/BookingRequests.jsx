
import { CalendarIcon, ClockIcon, Star } from "lucide-react";
import { ChevronDownIcon } from "./MentorshipRequests";
import { useEffect, useState } from "react";
import { MentorServices } from "../../../api/MentorServices";
import { Box, Spinner } from "@chakra-ui/react";
import { toast } from 'react-toastify'
import JitsiMeeting from "./JoinSession";

export function BookingRequests({ requested, refresh, loading }) {
    const [openDropdown, setOpenDropdown] = useState(null)
    const [activeSessionId, setActiveSessionId] = useState(null)

    const toggleDropdown = (id) => {
        setOpenDropdown(openDropdown === id ? null : id)
    }

    // const handleAccept = async (sessionId) => {
    //     const result = await MentorServices.acceptOrRejectRequest(sessionId, "Accept");
    //     if (result.success) {
    //         toast.success("Request accepted succesfully")
    //         // Optionally refresh the list after accept
    //         requestedSessions();
    //     } else {
    //         toast.error("Error occured")
    //     }
    // };

    const handleAccept = async (sessionId) => {
        const result = await MentorServices.acceptOrRejectRequest(
            sessionId,
            "Accept"
        );
        if (result.success) {
            toast.success("Request accepted successfully");
            refresh(); // reload data
        } else {
            toast.error("Error occurred");
        }
    };

    const handleReject = async (sessionId) => {
        const result = await MentorServices.acceptOrRejectRequest(
            sessionId,
            "Reject"
        );
        if (result.success) {
            toast.success("Request rejected successfully");
            refresh(); // reload data
        } else {
            toast.error("Error occurred");
        }
    };
    if (requested.length === 0 && !loading) {
        return (
            <div className="flex flex-col items-center justify-center h-full text-center">
                <p className="text-gray-500">No pending requests</p>
            </div>
        )
    }
    return (
        <div className="grid md:grid-cols-2 gap-6">
            {loading ? (
                <Box display="flex" justifyContent="center" alignItems="center" height="200px">
                    <Spinner size="lg" color="#5DA05D" thickness="4px" />
                </Box>
            ) : (
                requested.map((booking) => (
                    <div
                        key={booking.id}
                        className="bg-white p-5 rounded-xl shadow flex flex-col min-h-[300px] mb-20"
                    >
                        <div className="flex p-0 mb-2 justify-between gap-3">
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
                            {booking.status === "COMPLETED" ? (
                                <div className="flex items-center space-x-2">
                                    <div className="flex">
                                        {[1, 2, 3, 4, 5].map((star) => (
                                            <Star
                                                key={star}
                                                className={`w-5 h-5 ${star <= booking.rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300 fill-gray-300"
                                                    }`}
                                                fill={star <= booking.rating ? "currentColor" : "currentColor"}
                                            />
                                        ))}
                                    </div>
                                </div>
                            ) : (
                                <div className="flex gap-1 items-center">
                                    <span
                                        className={`font-medium ${booking.status === "PENDING"
                                            ? "text-[#E2B607]"
                                            : "text-[#5DA05D]"
                                            }`}
                                    >
                                        {booking.status}
                                    </span>
                                    <div className="font-bold text-lg text-[#5DA05D]">
                                        {booking.amount}
                                    </div>
                                </div>
                            )}

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
                                {
                                    booking.status !== "COMPLETED" ? (
                                        <div className="flex gap-1">
                                            <ClockIcon className="w-5 h-5 ml-4" />
                                            <span className="ml-2">{booking.time}</span>
                                        </div>
                                    ) : ""
                                }
                            </div>

                            <div className="text-xs text-[#2A0D47] bg-[#2A0D471A] px-2 py-1 w-max rounded mb-2">
                                {booking.category}
                            </div>
                            <p className="text-sm text-gray-700 mb-4">
                                {booking.description.length > 60
                                    ? booking.description.slice(0, 60) + "..."
                                    : booking.description}
                            </p>
                            <div className="flex space-x-3 mt-auto">
                                {booking.status === "PENDING" ? (
                                    <>
                                        <button
                                            onClick={() => handleAccept(booking.id)}
                                            className="inline-flex items-center justify-center rounded-lg text-sm font-medium bg-[#5DA05D] text-white h-10 px-4 py-2 flex-1"
                                        >
                                            Accept
                                        </button>
                                        <button
                                            onClick={() => handleReject(booking.id)}
                                            className="inline-flex items-center justify-center rounded-lg text-sm font-medium border border-red-500 text-red-500 h-10 px-4 py-2 flex-1"
                                        >
                                            Cancel
                                        </button>
                                    </>
                                ) : booking.status === "ACCEPTED" && booking.is_paid === false ? (
                                    <>
                                        <span className="inline-flex items-center justify-center rounded-lg text-sm font-medium bg-yellow-500 text-white h-10 px-4 py-2 flex-1">
                                            Pending Payment
                                        </span>
                                        {/* <button
                                            onClick={() => handleReject(booking.id)}
                                            className="inline-flex items-center justify-center rounded-lg text-sm font-medium border border-red-500 text-red-500 h-10 px-4 py-2 flex-1"
                                        >
                                            Cancel
                                        </button> */}
                                    </>
                                ) : booking.status === "COMPLETED" ? (
                                    null
                                ) : booking.is_paid === true && booking.join === true ? (
                                    <button
                                        onClick={() => setActiveSessionId(booking.id)}
                                        className="inline-flex items-center justify-center rounded-lg text-sm font-medium bg-[#5DA05D] text-white h-10 px-4 py-2 flex-1"
                                    >
                                        Join Session
                                    </button>
                                ) : booking.is_paid === true && booking.join === false ? (
                                    <span className="inline-flex items-center justify-center rounded-lg text-sm font-medium bg-gray-400 text-white h-10 px-4 py-2 flex-1">
                                        Not Yet Time
                                    </span>
                                ) : null}
                            </div>

                        </div>
                        {/* Show Jitsi meeting below the card if active */}
                        {activeSessionId === booking.id && (
                            <JitsiMeeting
                                sessionId={booking.id}
                                isOpen={!!activeSessionId}
                                onClose={() => setActiveSessionId(null)}
                            />
                        )}
                    </div>
                ))
            )}
        </div>
    );
}
