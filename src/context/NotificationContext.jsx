// NotificationProvider.jsx
import React, { createContext, useContext, useEffect, useState } from "react";
import { authService } from "../api/ApiServiceThree";


const NotificationContext = createContext();

export const useNotifications = () => useContext(NotificationContext);

export const NotificationProvider = ({ children }) => {
  const [notifications, setNotifications] = useState([]);
  const [wsStatus, setWsStatus] = useState("Connecting...");

  useEffect(() => {
    const token = authService.getAuthToken();
    const wsUrl = `wss://btest.career-nexus.com/ws/notification/?token=${encodeURIComponent(token)}`;
    let ws;
    let pingInterval;

    const connect = () => {
      ws = new WebSocket(wsUrl);

      ws.onopen = () => {
        setWsStatus("Connected");
        pingInterval = setInterval(() => {
          if (ws.readyState === WebSocket.OPEN) {
            ws.send(JSON.stringify({ type: "ping" }));
          }
        }, 30000);
      };

      ws.onmessage = (event) => {
        const data = JSON.parse(event.data);
        setNotifications((prev) => [...prev, { ...data, id: Date.now() }]);
      };

      ws.onclose = () => {
        clearInterval(pingInterval);
        setWsStatus("Disconnected");
        setTimeout(connect, 2000); // reconnect
      };
    };

    connect();

    return () => {
      clearInterval(pingInterval);
      if (ws) ws.close();
    };
  }, []);

  return (
    <NotificationContext.Provider value={{ notifications, setNotifications, wsStatus }}>
      {children}
    </NotificationContext.Provider>
  );
};
