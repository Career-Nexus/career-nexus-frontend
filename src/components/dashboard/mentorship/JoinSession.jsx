
import React, { useEffect, useState } from "react";
import { MentorServices } from "../../../api/MentorServices";
import { Box, Spinner } from "@chakra-ui/react";

const JitsiMeeting = ({ sessionId, isOpen, onClose }) => {
  const [roomName, setRoomName] = useState(null);
  const [jwt, setJwt] = useState(null);

  useEffect(() => {
    if (!isOpen) return;

    const fetchRoom = async () => {
      try {
        const response = await MentorServices.joinmentorshipsession(sessionId);

        if (response.success) {
          const { token, room_name } = response.data;
          setJwt(token);

          // ✅ Hardcode room name to match HTML working example
          // setRoomName("testRoom");
          setRoomName(room_name);
        }
      } catch (error) {
        console.error("Error fetching Jitsi room:", error);
      }
    };

    fetchRoom();
  }, [sessionId, isOpen]);

  useEffect(() => {
    if (roomName && jwt && isOpen) {
      const domain = "8x8.vc";
      const options = {
        roomName: `vpaas-magic-cookie-56406f481d8546b69158e5242fa3e972/${roomName}`,
        width: "100%",
        height: "100%",
        parentNode: document.getElementById("jitsi-container"),
        jwt, // authentication token
        configOverwrite: {
          startWithAudioMuted: true,
          startWithVideoMuted: true,
        },
        interfaceConfigOverwrite: {
          TOOLBAR_BUTTONS: ["microphone", "camera", "chat", "desktop", "hangup"],
        },
        userInfo: { displayName: "React User" },
      };

      const api = new window.JitsiMeetExternalAPI(domain, options);

      return () => api.dispose();
    }
  }, [roomName, jwt, isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-white">
      <button
        onClick={onClose}
        className="absolute top-4 right-4 mt-52 bg-red-600 text-white px-4 py-2 rounded-lg z-50"
      >
        Close
      </button>

      {!roomName || !jwt ? (
        <p className="text-black text-center mt-20 flex justify-center items-center">
          <Box display="flex" justifyContent="center" alignItems="center" height="300px">
            <Spinner size="lg" color="#5DA05D" thickness="4px" />
          </Box>
        </p>
      ) : (
        <div id="jitsi-container" className="w-full h-full" />
      )}
    </div>
  );
};


export default JitsiMeeting;