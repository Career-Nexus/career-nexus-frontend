import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ChatServices } from "../../../api/ChatServices";
import { Bell } from "lucide-react";
import { PostService } from "../../../api/PostService";

export function Notify() {
    const [open, setOpen] = useState(false);
    const [isMobile, setIsMobile] = useState(false);
    const dropdownRef = useRef(null);
    const [allNotifications, setAllNotifications] = useState([]);

    const navigate = useNavigate();

    // Detect screen size
    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 640);
        };
        handleResize();
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    // Close dropdown when clicking outside
    useEffect(() => {
        function handleClickOutside(event) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const getNotifications = async () => {
        try {
            const { success, data } = await ChatServices.getNotifications();
            if (success) {
                setAllNotifications(data.results || []);
            } else {
                setAllNotifications([]);
            }
        } catch (error) {
            console.error("Error fetching notifications:", error);
            setAllNotifications([]);
        }
    };

    useEffect(() => {
        getNotifications();
    }, []);

    const ClearNotification = async () => {
        const { success } = await ChatServices.clearNotifications();
        if (success) {
            toast.success("Notifications cleared successfully");
            setAllNotifications([]); // update UI instantly
        }
    };
    console.log("All Notifications:", allNotifications);
    // 👉 CLICK HANDLER FOR NOTIFICATION
    const handleNotificationClick = async (notif) => {
        if (!notif.route || !notif.page) {
            console.log("No actionable route for this notification:", notif);
            setOpen(false);
            return;
        }
        // --- POST NOTIFICATIONS ---
        if (notif.page === "Post") {
            const url = new URL(`http://dummy.com/${notif.route}`);
            const postId = url.searchParams.get("post_id");

            if (postId) {
                try {
                    const postData = await PostService.getPostById(postId);

                    // Navigate and pass the FULL post as a query param or state
                    navigate("/home", {
                        state: { highlightedPost: postData },  // This is all we need
                        replace: true,
                    });
                    console.log("Navigating to post with data:", postData);
                } catch (error) {
                    console.error("Failed to fetch post:", error);
                    toast.error("Could not load the post");
                    navigate("/home");
                }
            }
            setOpen(false);
            return;
        }
        console.log("help me check postData", postData);

        // --- PROFILE (FOLLOW) NOTIFICATIONS ---
        if (notif.page === "Profile") {
            const url = new URL(`http://dummy.com/${notif.route}`);
            const userId = url.searchParams.get("user_id");

            if (userId) {
                navigate(`/person-profile/${userId}`);
            }

            setOpen(false);
            return;
        }
        //Mentorship Notifications
        if (notif.page === "Mentorship") {
            const url = new URL(`http://dummy.com/${notif.route}`);
            const mentorshipId = url.searchParams.get("mentorship_id");
            if (mentorshipId) {
                navigate(`/mentorship/${mentorshipId}`);
            }
        }
        //Network Notifications
        if (notif.page === "Network") {
            const url = new URL(`http://dummy.com/${notif.route}`);
            const networkId = url.searchParams.get("network_id");
            if (networkId) {
                navigate(`/network/${networkId}`);
            }
        }
        //Job Notifications
        if (notif.page === "Job") {
            const url = new URL(`http://dummy.com/${notif.route}`);
            const jobId = url.searchParams.get("job_id");
            if (jobId) {
                navigate(`/job/${jobId}`);
            }
        }
        // --- OTHER PAGES CAN BE ADDED HERE ---
        console.log("Unhandled notification page type:", notif.page);
        setOpen(false);
    };


    return (
        <nav>
            <div className="relative" ref={dropdownRef}>
                <button
                    onClick={() => setOpen(!open)}
                    className="relative p-2 rounded-full hover:md:bg-gray-100"
                >
                    <Bell className="w-6 h-6 text-gray-700" />
                    {allNotifications.length > 0 && (
                        <span className="absolute top-1 right-1 bg-red-500 text-white text-xs rounded-full w-3 h-3 flex items-center justify-center">
                            {allNotifications.length}
                        </span>
                    )}
                </button>

                {open && (
                    <div
                        className={`absolute w-80 bg-white shadow-lg rounded-lg overflow-hidden z-50 
                        ${isMobile ? "bottom-full mb-2 right-0" : "top-full mt-2 right-0"}`}
                    >
                        <div className="max-h-80 overflow-y-auto">
                            <p className="text-sm font-medium text-gray-800 p-3 border-b text-center bg-gray-50">
                                Notifications
                            </p>

                            {allNotifications.length === 0 ? (
                                <p className="p-4 text-gray-600 text-sm">No notifications</p>
                            ) : (
                                allNotifications.map((n) => (
                                    <div
                                        key={n.id}
                                        onClick={() => handleNotificationClick(n)}
                                        className="p-3 border-b hover:bg-gray-50 cursor-pointer"
                                    >
                                        <p className="text-xs text-gray-700">{n.text}</p>
                                        <p className="text-[10px] text-gray-400">
                                            {new Date(n.timestamp).toLocaleString()}
                                        </p>
                                    </div>
                                ))
                            )}
                        </div>

                        <div
                            onClick={ClearNotification}
                            className="p-2 text-center bg-gray-50 text-sm text-blue-600 cursor-pointer hover:underline"
                        >
                            Clear All Notifications
                        </div>
                    </div>
                )}
            </div>
        </nav>
    );
}