import { useEffect, useRef, useState } from "react";
import { authService } from "../../../api/ApiServiceThree";
import axios from "axios";
// import api, { authService } from "../../../api/ApiServiceThree";

const notificationsData = [
  {
    id: 1,
    type: "mention",
    user: "Robert Fox",
    message: "Love this approach — trying it out today!",
    time: "2h ago",
    avatar: "/images/mentor-img4.png",
  },
  {
    id: 2,
    type: "job",
    message: "A new job matching your skills—Junior Product Designer at ABC Tech—is available. Apply now!",
    time: "2h ago",
    icon: "job",
    avatar: "/images/mentor-img2.png",
  },
  {
    id: 3,
    type: "mention",
    user: "Jane Doe",
    message: "Great post! Looking forward to more.",
    time: "1h ago",
    avatar: "/images/mentor-img3.png",
  },
];

const Notification = ({ type, user, message, time, avatar, icon }) => {
  return (
    <div className="border-b border-gray-200 p-4 hover:bg-gray-50">
      {type === "mention" && (
        <div className="flex items-center">
          <img src={avatar} alt={`${user}'s avatar`} className="w-10 h-10 rounded-full mr-3" />
          <div>
            <p className="text-sm font-medium text-gray-900">{user} just commented on your post</p>
            <p className="text-sm text-gray-600">{message}</p>
            <p className="text-xs text-gray-400">{time}</p>
          </div>
        </div>
      )}
      {type === "job" && (
        <div className="flex items-center">
          <img src={avatar} alt={`${user}'s avatar`} className="w-10 h-10 rounded-full mr-3" />
          <div>
            <p className="text-sm font-medium text-gray-900">Job Recommendation!</p>
            <p className="text-sm text-gray-600">{message}</p>
            <p className="text-xs text-gray-400">{time}</p>
          </div>
        </div>
      )}
    </div>
  );
};


// export default function JobNotifications() {
//   useEffect(() => {
//     const token = authService.getAuthToken();
//     //const token2 = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzU1OTg1NzQ2LCJpYXQiOjE3NTU5NjQxNDYsImp0aSI6ImI5MGRkYTZiYTIyYjRkODVhY2U5OTBiNGRlNGJmYTcwIiwidXNlcl9pZCI6NDd9.eXzBnerMQCE4aEI0K_hiMH-YeFhr_nnv3mGytr4djkM';
//     const socketUrl = `wss://btest.career-nexus.com/ws/notification/jobs/?token=${token}`;
//     const headers = {
//       Authorization: `Bearer ${token}`,
//       // Add other headers if needed
//         "Content-Type": "application/json",
//     };
//     const socket = new WebSocket(socketUrl); // ✅ query param only


//     socket.onopen = () => {
//       console.log("✅ Connected to job notification WebSocket");
//     };

//     socket.onmessage = (event) => {
//       try {
//         const data = JSON.parse(event.data);
//         console.log("📩 New Job Notification:", data);
//       } catch (err) {
//         console.error("Invalid JSON:", event.data);
//       }
//     };

//     socket.onerror = (error) => {
//       console.error("❌ WebSocket Error:", error);
//     };

//     socket.onclose = () => {
//       console.log("🔌 WebSocket connection closed");
//     };

//     return () => socket.close();
//   }, []);

//   return <div>Listening for Job Notifications...</div>;
// }
// export default function JobNotifications() {
//   const socket = useRef(null);
//   const [messages, setMessages] = useState([]);
//   const [input, setInput] = useState("");

//   useEffect(() => {
//     const token = authService.getAuthToken();
//     const socketUrl = `wss://btest.career-nexus.com/ws/notification/?token=${token}`;

//     socket.current = new WebSocket(socketUrl);

//     socket.current.onopen = () => {
//       console.log("Connected to job notification WebSocket");
//     };

//     socket.current.onmessage = (event) => {
//       try {
//         const data = JSON.parse(event.data);
//         setMessages((prev) => [...prev, data]);
//       } catch {
//         setMessages((prev) => [...prev, event.data]);
//       }
//     };

//     // socket.current.onerror = (err) => {
//     //   console.error("WebSocket error:", err);
//     // };

//     // socket.current.onclose = () => {
//     //   console.log("WebSocket closed");
//     // };

//     return () => {
//       socket.current?.close();
//     };
//   }, [authService]);

//   const sendMessage = () => {
//     if (socket.current?.readyState === WebSocket.OPEN && input.trim()) {
//       socket.current.send(input);
//       setInput("");
//     } else {
//       console.warn("⚠️ Socket not ready or message empty");
//     }
//   };

//   return (
//     <div>
//       <h2>WebSocket Example</h2>
//       <div>
//         <input
//           type="text"
//           value={input}
//           onChange={(e) => setInput(e.target.value)}
//           placeholder="Type a message"
//         />
//         <button onClick={sendMessage}>Send</button>
//       </div>
//       <ul>
//         {messages.map((msg, index) => (
//           <li key={index}>{JSON.stringify(msg)}</li>
//         ))}
//       </ul>
//       <GetJobNotifications />
//     </div>
//   );
// }

function GetJobNotifications() {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const token = authService.getAuthToken(); // 🔑 get JWT
        const response = await axios.get(
          "https://btest.career-nexus.com/notification-chat/notifications/",
          {
            headers: {
              Authorization: `Bearer ${token}`, // include auth
            },
          }
        );
        setNotifications(response.data.results || []);
      } catch (error) {
        console.error("❌ Failed to fetch notifications:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchNotifications();
  }, []);
console.log("Notifications:", notifications);
  return (
    <div className="p-4">
      <h2 className="text-lg font-semibold mb-2">🔔 Notifications</h2>
      {loading ? (
        <p>Loading...</p>
      ) : notifications.length === 0 ? (
        <p>No notifications yet.</p>
      ) : (
        <ul className="space-y-2">
          {notifications.map((n) => (
            <li
              key={n.id}
              className="border rounded-lg p-2 shadow-sm bg-gray-50"
            >
              <p className="text-sm">{n.text}</p>
              <span className="text-xs text-gray-500">
                {new Date(n.timestamp).toLocaleString()}
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
const JobNotification = () => {
  const [activeTab, setActiveTab] = useState("all");
  const [notifications, setNotifications] = useState(notificationsData);
  const [wsStatus, setWsStatus] = useState("Connecting...");

  const token = authService.getAuthToken();
  console.log("Token used:", token);
  const wsUrl = `wss://btest.career-nexus.com/ws/notification/jobs/?token=${encodeURIComponent(token)}`;

  useEffect(() => {
    let ws = new WebSocket(wsUrl);
    let pingInterval = null;

    const connect = () => {
      ws = new WebSocket(wsUrl);

      ws.onopen = () => {
        console.log("WebSocket opened successfully at", new Date().toISOString());
        setWsStatus("Connected");
        // Start sending ping to keep connection alive
        pingInterval = setInterval(() => {
          if (ws.readyState === WebSocket.OPEN) {
            ws.send(JSON.stringify({ type: "ping" }));
            console.log("Sent ping at", new Date().toISOString());
          }
        }, 30000); // Ping every 30 seconds
      };

      ws.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data);
          console.log("Received WebSocket message:", data);
          if (data.type === "job") {
            setNotifications((prev) => [...prev, { ...data, id: Date.now() }]);
          } else if (data.type === "pong") {
            console.log("Received pong at", new Date().toISOString());
          }
        } catch (error) {
          console.error("Error parsing WebSocket message:", error);
        }
      };

      ws.onerror = (error) => {
        console.error("WebSocket error details:", error, "at", new Date().toISOString());
        setWsStatus("Error");
      };

      ws.onclose = (event) => {
        clearInterval(pingInterval);
        console.log("WebSocket closed. Code:", event.code, "Reason:", event.reason, "at", new Date().toISOString());
        setWsStatus("Disconnected");
        if (event.code !== 1000) { // 1000 is normal closure
          console.log("Attempting to reconnect in 2 seconds...");
          setTimeout(connect, 2000);
        }
      };
    };

    connect();

    return () => {
      clearInterval(pingInterval);
      if (ws) ws.close();
    };
  }, [wsUrl]);

  const filteredNotifications = activeTab === "mention"
    ? notifications.filter(n => n.type === "mention")
    : notifications;

  return (
    <div className="max-w-6xl w-full mx-auto">
      <div className="flex border-b">
        <button
          className={`flex-1 py-2 px-4 text-gray-600 font-medium border-b-2 ${activeTab === "all" ? "border-blue-500" : "border-transparent"} hover:border-gray-300 focus:outline-none`}
          onClick={() => setActiveTab("all")}
        >
          All <span className="inline-flex items-center px-1.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">{notifications.length}</span>
        </button>
        <button
          className={`flex-1 py-2 px-4 text-gray-600 font-medium border-b-2 ${activeTab === "mention" ? "border-blue-500" : "border-transparent"} hover:border-gray-300 focus:outline-none`}
          onClick={() => setActiveTab("mention")}
        >
          Mention
        </button>
      </div>
      {filteredNotifications.length === 0 ? (
        <p className="text-gray-600 p-4">No new notifications</p>
      ) : (
        filteredNotifications.map((notification) => (
          <Notification
            key={notification.id}
            type={notification.type}
            user={notification.user}
            message={notification.message}
            time={notification.time || new Date().toLocaleTimeString()}
            avatar={notification.avatar}
            icon={notification.icon}
          />
        ))
      )}
      <GetJobNotifications />
    </div>
  );
};
export default JobNotification;