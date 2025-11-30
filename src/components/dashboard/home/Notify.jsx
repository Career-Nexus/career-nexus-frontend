
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ChatServices } from "../../../api/ChatServices";
import { Bell } from "lucide-react";
import { PostService } from "../../../api/PostService";
import { toast } from "react-toastify"; // assuming you're using react-hot-toast

import { createPortal } from "react-dom";

export function Notify() {
    const [open, setOpen] = useState(false);
    const [notifications, setNotifications] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const getNotifications = async () => {
            try {
                const { success, data } = await ChatServices.getNotifications();
                if (success) setNotifications(data.results || []);
            } catch (err) {
                console.error(err);
            }
        };
        getNotifications();
    }, []);

    const clearAll = async () => {
        await ChatServices.clearNotifications();
        toast.success("Cleared!");
        setNotifications([]);
        setOpen(false);
    };

    const handleClick = async (notif) => {
        setOpen(false); // close immediately

        if (!notif.route || !notif.page) return;

        try {
            const url = new URL("http://dummy.com/" + notif.route);
            const p = url.searchParams;

            if (notif.page === "Post" && p.get("post_id")) {
                const post = await PostService.getPostById(p.get("post_id"));
                navigate("/home", { state: { highlightedPost: post }, replace: true });
                return;
            }
            if (notif.page === "Profile" && p.get("user_id")) {
                navigate(`/person-profile/${p.get("user_id")}`);
                return;
            }
            if (notif.page === "Mentorship" && p.get("mentorship_id")) {
                navigate(`/mentorship/${p.get("mentorship_id")}`);
                return;
            }
            if (notif.page === "Network" && p.get("network_id")) {
                navigate(`/network/${p.get("network_id")}`);
                return;
            }
            if (notif.page === "Job" && p.get("job_id")) {
                navigate(`/job/${p.get("job_id")}`);
                return;
            }
        } catch (err) {
            toast.error("Failed to open");
        }
    };

    return (
        <>
            {/* Bell Button */}
            <div className="relative">
                <button
                    onClick={() => setOpen(!open)}
                    className="relative p-2 rounded-full hover:bg-gray-100 transition"
                >
                    <Bell className="w-6 h-6 text-gray-700" />
                    {notifications.length > 0 && (
                        <span className="absolute top-1 right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                            {notifications.length}
                        </span>
                    )}
                </button>
            </div>

            {/* Dropdown Modal - using Portal */}
            {open &&
                createPortal(
                    <div className="fixed inset-0 z-50" onClick={() => setOpen(false)}>
                        <div
                            onClick={(e) => e.stopPropagation()}
                            className="absolute px-2 mx-4 top-16 md:right-6 md:w-80 bg-white rounded-lg shadow-2xl border border-gray-200 overflow-hidden animate-in fade-in slide-in-from-top-2"
                        >
                            <div className="p-3 bg-gray-50 border-b font-medium text-center">
                                Notifications
                            </div>

                            <div className="max-h-96 overflow-y-auto">
                                {notifications.length === 0 ? (
                                    <p className="p-8 text-center text-gray-500 text-sm">
                                        No notifications
                                    </p>
                                ) : (
                                    notifications.map((n) => (
                                        <div
                                            key={n.id}
                                            onClick={() => handleClick(n)}
                                            className="p-4 border-b hover:bg-gray-50 cursor-pointer transition"
                                        >
                                            <p className="text-sm text-gray-800">{n.text}</p>
                                            <p className="text-xs text-gray-400 mt-1">
                                                {new Date(n.timestamp).toLocaleString()}
                                            </p>
                                        </div>
                                    ))
                                )}
                            </div>

                            {notifications.length > 0 && (
                                <div
                                    onClick={clearAll}
                                    className="p-3 text-center text-sm text-blue-600 hover:bg-gray-50 cursor-pointer"
                                >
                                    Clear All Notifications
                                </div>
                            )}
                        </div>
                    </div>,
                    document.body
                )}
        </>
    );
}