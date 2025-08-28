import React, { createContext, useContext, useEffect, useRef, useState } from "react";
import { authService } from "../api/ApiServiceThree";
import { toast } from "react-toastify";


const NotificationContext = createContext();
export const useNotifications = () => useContext(NotificationContext);

export const NotificationProvider = ({ children }) => {
  const [notifications, setNotifications] = useState([]);
  const [wsStatus, setWsStatus] = useState("Idle");
  const wsRef = useRef(null);

  useEffect(() => {
    const token = authService.getAuthToken();
    if (!token) {
      console.warn("⏳ No token yet, skipping WebSocket init");
      return;
    }

    const wsUrl = `wss://btest.career-nexus.com/ws/notification/?token=${encodeURIComponent(token)}`;
    console.log("Connecting to:", wsUrl);
    let pingInterval;

    const connect = () => {
      wsRef.current = new WebSocket(wsUrl);

      wsRef.current.onopen = () => {
        setWsStatus("Connected");
        pingInterval = setInterval(() => {
          if (wsRef.current?.readyState === WebSocket.OPEN) {
            wsRef.current.send(JSON.stringify({ type: "ping" }));
          }
        }, 40000);
      };

      // wsRef.current.onmessage = (event) => {
      //   try {
      //     const data = JSON.parse(event.data);

      //     setNotifications((prev) => [...prev, { ...data, id: Date.now() }]);

      //     toast.info(data.message || "You have a new notification!", {
      //       icon: "🔔",
      //       position: "top-right",
      //     });
      //   } catch (err) {
      //     console.error("WS parse error:", err, event.data);
      //   }
      // };
      wsRef.current.onmessage = (event) => {
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
      wsRef.current.onclose = (event) => {
        clearInterval(pingInterval);
        setWsStatus("Disconnected");
        console.log("🔌 WebSocket closed:", event.reason);

        // try reconnect with fresh token
        setTimeout(() => {
          const freshToken = authService.getAuthToken();
          if (freshToken) connect();
        }, 2000);
      };

      wsRef.current.onerror = (err) => {
        console.error("❌ WebSocket error:", err);
        setWsStatus("Error");
        wsRef.current.close();
      };
    };

    connect();

    return () => {
      clearInterval(pingInterval);
      wsRef.current?.close();
    };
  }, []); // runs once

  return (
    <NotificationContext.Provider value={{ notifications, wsStatus }}>
      {children}
    </NotificationContext.Provider>
  );
};