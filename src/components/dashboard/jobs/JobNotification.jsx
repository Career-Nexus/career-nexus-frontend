import { useEffect, useState } from "react";
import api, { authService } from "../../../api/ApiServiceThree";

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

   export const JobNotification = () => {
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
  //     const [activeTab, setActiveTab] = useState("all");
  // const [notifications, setNotifications] = useState(notificationsData);
  // const [wsStatus, setWsStatus] = useState("Connecting...");

  // const token = authService.getAuthToken();
  // console.log("Token used:", token);
  // const wsUrl = `wss://btest.career-nexus.com/ws/notification/jobs/?token=${encodeURIComponent(token)}`;

  // useEffect(() => {
  //   let ws = new WebSocket(wsUrl);

  //   const connect = () => {
  //     ws = new WebSocket(wsUrl);

  //     ws.onopen = () => {
  //       console.log("WebSocket opened successfully");
  //       setWsStatus("Connected");
  //     };

  //     ws.onmessage = (event) => {
  //       try {
  //         const data = JSON.parse(event.data);
  //         console.log("Received WebSocket message:", data);
  //         if (data.type === "job") {
  //           setNotifications((prev) => [...prev, { ...data, id: Date.now() }]);
  //         }
  //       } catch (error) {
  //         console.error("Error parsing WebSocket message:", error);
  //       }
  //     };

  //     ws.onerror = (error) => {
  //       console.error("WebSocket error details:", error);
  //       setWsStatus("Error");
  //     };

  //     ws.onclose = (event) => {
  //       console.log("WebSocket closed. Code:", event.code, "Reason:", event.reason);
  //       setWsStatus("Disconnected");
  //       if (event.code !== 1000) { // 1000 is normal closure
  //         console.log("Attempting to reconnect in 2 seconds...");
  //         setTimeout(connect, 10000);
  //       }
  //     };
  //   };

  //   connect();

  //   return () => {
  //     if (ws) ws.close();
  //   };
  // }, [wsUrl]);

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
        </div>
      );
    };