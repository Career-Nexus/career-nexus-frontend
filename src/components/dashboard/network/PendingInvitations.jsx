import { useEffect, useState } from "react";
import { NetworkService } from "../../../api/NetworkService";
import { toast } from "react-toastify";

export default function PendingInvitations() {
    const [pendingInvites, setPendingInvites] = useState([]);
    const [loading, setLoading] = useState(false);

    const fetchPendingInvites = async () => {
        setLoading(true);
        try {
            const response = await NetworkService.getPendingConnections();
            const isArray = Array.isArray(response?.pending_requests)
                ? response.pending_requests
                : [];
            setPendingInvites(isArray);
        } catch (error) {
            console.error("Error fetching pending invitations:", error);
        } finally {
            setLoading(false);
        }
    };
    useEffect(() => {
        fetchPendingInvites();
    }, []);
    const handleAccept = async (connectionId) => {
        try {
            await NetworkService.updateConnectionStatus(connectionId, "Accept");
            toast.success("Connection accepted");
            // Optionally refetch invitations:
            fetchPendingInvites();
        } catch (err) {
            console.error(err);
            toast.error("Failed to accept invitation");
        }
    };

    const handleReject = async (connectionId) => {
        try {
            await NetworkService.updateConnectionStatus(connectionId, "Reject");
            toast.success("Connection rejected");
            fetchPendingInvites();
        } catch (err) {
            console.error(err);
            toast.error("Failed to reject invitation");
        }
    };

    if (pendingInvites.length > 0) {
        return (
            <div className="max-w-6xl w-full border rounded-lg p-5">
                <h2 className="text-lg font-semibold mb-5">Pending invitations</h2>

                {pendingInvites.map((invite) => (
                    <div
                        key={invite.id}
                        className="flex items-center justify-between py-3 border-b last:border-b-0"
                    >
                        {/* Profile image */}
                        <div className="flex items-center gap-3">
                            <img
                                src={invite.connection.profile_photo || "/placeholder.svg"}
                                alt={invite.name}
                                className="w-10 h-10 rounded-full"
                            />

                            <div className="flex flex-col">
                                <span className="font-semibold">{invite.connection.first_name} {invite.connection.last_name}</span>
                                {invite.connection.status && (
                                    <span className="text-sm text-gray-500">{invite.connection.status}</span>
                                )}
                                {invite.connection.qualification && (
                                    <span className="text-sm text-gray-500">
                                        {invite.connection.qualification}
                                    </span>
                                )}
                                {/* {invite.mutual && (
                <span className="text-sm text-[#5B8F4E]">{invite.mutual}</span>
              )} */}
                            </div>
                        </div>

                        {/* Actions */}
                        <div className="flex items-center gap-2">
                            {invite.connection.status === "CONFIRMED" && (
                                <>
                                    <button className="p-1">
                                        <svg
                                            className="w-4 h-4 text-red-500"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth="2"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                d="M6 18L18 6M6 6l12 12"
                                            />
                                        </svg>
                                    </button>
                                    <button className="border border-[#5B8F4E] text-[#5B8F4E] px-4 py-1 rounded">
                                        Undo
                                    </button>
                                </>
                            )}
                            {invite.connection.status === "PENDING" && (
                                <>
                                    <button onClick={() => handleAccept(invite.id)} className="bg-[#5B8F4E] text-white px-4 py-1 rounded">
                                        Accept
                                    </button>
                                    <button onClick={() => handleReject(invite.id)} className="border border-[#5B8F4E] text-[#5B8F4E] px-4 py-1 rounded">
                                        Ignore
                                    </button>
                                </>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        );
    }
}