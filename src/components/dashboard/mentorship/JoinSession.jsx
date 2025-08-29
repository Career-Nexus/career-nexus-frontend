
import React, { useEffect, useState } from "react";
import { MentorServices } from "../../../api/MentorServices";

const JitsiMeeting = ({ sessionId, isOpen, onClose }) => {
  const [roomName, setRoomName] = useState(null);

  useEffect(() => {
    if (!isOpen) return; // only fetch when modal is open
    const fetchRoom = async () => {
      try {
        const response = await MentorServices.joinmentorshipsession(sessionId);
        setRoomName(response.data.room_name);
      } catch (error) {
        console.error("Error fetching Jitsi room:", error);
      }
    };
    fetchRoom();
  }, [sessionId, isOpen]);

  useEffect(() => {
    if (roomName && isOpen) {
      const domain = "meet.jit.si";
      const options = {
        roomName,
        width: "100%",
        height: "100%",
        parentNode: document.getElementById("jitsi-container"),
        configOverwrite: {
          startWithAudioMuted: true,
        },
        userInfo: {
          displayName: "React User", // replace with logged-in user
        },
      };

      const api = new window.JitsiMeetExternalAPI(domain, options);

      return () => api.dispose(); // cleanup on close
    }
  }, [roomName, isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-white">
      {/* Close Button */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 bg-red-600 text-white px-4 py-2 rounded-lg z-50"
      >
        Close
      </button>

      {/* Jitsi Container */}
      {!roomName ? (
        <p className="text-black text-center mt-20">Loading meeting...</p>
      ) : (
        <div id="jitsi-container" className="w-full h-full" />
      )}
    </div>
  );
};

export default JitsiMeeting;