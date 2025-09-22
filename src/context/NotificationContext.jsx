import React, { createContext, useContext, useEffect, useRef, useState } from "react";
import { authService } from "../api/ApiServiceThree";
import { toast } from "react-toastify";


const NotificationContext = createContext()
export const useNotifications = () => useContext(NotificationContext)

export const NotificationProvider = ({ children }) => {
  const [wsStatus, setWsStatus] = useState("Idle")
  const wsRef = useRef(null)

  const token = authService.getAuthToken();
  const wsUrl = `wss://bprod.career-nexus.com/ws/notification/?token=${encodeURIComponent(token)}`;

  useEffect(() => {
    let ws = new WebSocket(wsUrl);
    let pingInterval = null;

    const connect = () => {
      ws = new WebSocket(wsUrl);

      ws.onopen = () => {
        console.log("WebSocket opened successfully");
        setWsStatus("Connected");

        pingInterval = setInterval(() => {
          if (ws.readyState === WebSocket.OPEN) {
            ws.send(JSON.stringify({ type: "ping" }));
          }
        }, 30000);
      };

      ws.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data);
          console.log("Received WS message:", data);

          if (data.type === "pong") return;

          // 🔔 Show toast notification
          toast.info(
            <div>
              <p className="font-medium">
                {data.type === "job" ? "New Job Alert!" : "Notification"}
              </p>
              <p className="text-sm">{data.text || data.message}</p>
            </div>,
            { autoClose: 5000 }
          );
        } catch (error) {
          console.error("Error parsing WebSocket message:", error);
        }
      };

      ws.onerror = (error) => {
        console.error("WebSocket error:", error);
        setWsStatus("Error");
      };

      ws.onclose = (event) => {
        clearInterval(pingInterval);
        console.log("WebSocket closed:", event.code, event.reason);
        setWsStatus("Disconnected");
        if (event.code !== 1000) {
          setTimeout(connect, 2000); // reconnect
        }
      };
    };

    connect();

    return () => {
      clearInterval(pingInterval);
      //if (ws) ws.close();
    };
  }, [wsUrl]);

  return (
    <NotificationContext.Provider value={{ wsStatus }}>
      {children}
    </NotificationContext.Provider>
  );
};
