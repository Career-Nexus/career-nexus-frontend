import React, { createContext, useContext, useEffect, useRef, useState } from "react";
import { authService } from "../api/ApiServiceThree";
import { toast } from "react-toastify";
import axios from "axios";
import Cookies from 'js-cookie';


// const NotificationContext = createContext();
// export const useNotifications = () => useContext(NotificationContext);

// export const NotificationProvider = ({ children }) => {
//   const [notifications, setNotifications] = useState([]);
//   const [wsStatus, setWsStatus] = useState("Idle");
//   const wsRef = useRef(null);

//   useEffect(() => {
//     // ✅ Get token from cookies
//     const token = Cookies.get("temp_token");

//     if (!token) {
//       console.warn("⏳ No token yet, skipping WebSocket init");
//       return;
//     }

//     const wsUrl = `wss://bprod.career-nexus.com/ws/notification/?token=${encodeURIComponent(
//       token
//     )}`;
//     console.log("Connecting to:", wsUrl);

//     let pingInterval;

//     const connect = () => {
//       wsRef.current = new WebSocket(wsUrl);

//       wsRef.current.onopen = () => {
//         setWsStatus("Connected");
//         pingInterval = setInterval(() => {
//           if (wsRef.current?.readyState === WebSocket.OPEN) {
//             wsRef.current.send(JSON.stringify({ type: "ping" }));
//           }
//         }, 40000);
//       };

//       wsRef.current.onmessage = (event) => {
//         try {
//           const data = JSON.parse(event.data);
//           console.log("Received WebSocket message:", data);

//           if (data.type === "job") {
//             setNotifications((prev) => [
//               ...prev,
//               { ...data, id: Date.now() },
//             ]);
//           } else if (data.type === "pong") {
//             console.log("Received pong at", new Date().toISOString());
//           }
//         } catch (error) {
//           console.error("Error parsing WebSocket message:", error);
//         }
//       };

//       wsRef.current.onclose = (event) => {
//         clearInterval(pingInterval);
//         setWsStatus("Disconnected");
//         console.log("🔌 WebSocket closed:", event.reason);

//         // 🔄 try reconnect with fresh token
//         setTimeout(() => {
//           const freshToken = Cookies.get("temp_token") || authService.getAuthToken();
//           if (freshToken) connect();
//         }, 2000);
//       };

//       wsRef.current.onerror = (err) => {
//         console.error("❌ WebSocket error:", err);
//         setWsStatus("Error");
//         wsRef.current.close();
//       };
//     };

//     connect();

//     return () => {
//       clearInterval(pingInterval);
//       wsRef.current?.close();
//     };
//   }, []); // runs once

//   return (
//     <NotificationContext.Provider value={{ notifications, wsStatus }}>
//       {children}
//     </NotificationContext.Provider>
//   );
// };
const NotificationContext = createContext()
export const useNotifications = () => useContext(NotificationContext)

export const NotificationProvider = ({ children }) => {
  const [notifications, setNotifications] = useState([])
  const [wsStatus, setWsStatus] = useState("Idle")
  const wsRef = useRef(null)

  //   useEffect(() => {
  //     const token = authService.getAuthToken() || Cookies.get("auth_token")

  //     if (!token) {
  //       console.warn("⏳ No token yet, skipping WebSocket init")
  //       return
  //     }

  //     const wsUrl = `wss://bprod.career-nexus.com/ws/notification/?token=${encodeURIComponent(
  //       token
  //     )}`
  // //     const accessToken = Cookies.get("access_token") || Cookies.get("temp_token");

  // // if (accessToken) {
  // //   wsRef.current = new WebSocket(
  // //     `wss://bprod.career-nexus.com/ws/notification/?token=${accessToken}`
  // //   );
  // // }
  //     console.log("Connecting to:", wsUrl)

  //     let pingInterval

  //     const connect = () => {
  //       wsRef.current = new WebSocket(wsUrl)

  //       wsRef.current.onopen = () => {
  //         setWsStatus("Connected to ws")
  //         pingInterval = setInterval(() => {
  //           if (wsRef.current?.readyState === WebSocket.OPEN) {
  //             wsRef.current.send(JSON.stringify({ type: "ping" }))
  //           }
  //         }, 40000)
  //       }

  //       wsRef.current.onmessage = (event) => {
  //         try {
  //           const data = JSON.parse(event.data)
  //           console.log("Received WebSocket message:", data)

  //           if (data.type === "job") {
  //             setNotifications((prev) => [...prev, { ...data, id: Date.now() }])
  //           } else if (data.type === "pong") {
  //             console.log("Received pong at", new Date().toISOString())
  //           }
  //         } catch (error) {
  //           console.error("Error parsing WebSocket message:", error)
  //         }
  //       }

  //       wsRef.current.onclose = (event) => {
  //         clearInterval(pingInterval)
  //         setWsStatus("Disconnected")
  //         console.log("WebSocket closed:", event.reason)

  //         // 🔄 reconnect with fresh token
  //         setTimeout(() => {
  //           const freshToken =
  //             authService.getAuthToken() || Cookies.get("temp_token")
  //           if (freshToken) connect()
  //         }, 2000)
  //       }

  //       wsRef.current.onerror = (err) => {
  //         console.error("WebSocket error:", err)
  //         setWsStatus("Error")
  //         wsRef.current.close()
  //       }
  //     }

  //     connect()

  //     // return () => {
  //     //   clearInterval(pingInterval)
  //     //   //wsRef.current?.close()
  //     // }
  //   }, [])
  const token = authService.getAuthToken();
  console.log("Token used:", token);
  const wsUrl = `wss://bprod.career-nexus.com/ws/notification/?token=${encodeURIComponent(token)}`;

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
  return (
    <NotificationContext.Provider value={{ notifications, wsStatus }}>
      {children}
    </NotificationContext.Provider>
  )
}