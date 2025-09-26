import React, { createContext, useContext, useEffect, useRef, useState } from "react";
import { authService } from "../api/ApiServiceThree";
import { toast } from "react-toastify";
// import { UserContext } from "./UserContext";
import { useParams } from "react-router-dom";

const ChatContext = createContext(null)
export const useChat = () => useContext(ChatContext)


export const ChatProvider = ({ children, contributorId }) => {
    const [messages, setMessages] = useState([])
    const [wsStatus, setWsStatus] = useState("Idle")
    const wsRef = useRef(null)

    const token = authService.getAuthToken()
    const wsUrl = `wss://btest.career-nexus.com/ws/chat/18/?token=${encodeURIComponent(token)}`

    useEffect(() => {
        let ws;
        let pingInterval;

        const connect = () => {
            ws = new WebSocket(wsUrl)
            wsRef.current = ws

            ws.onopen = () => {
                console.log("✅ Chat WebSocket opened")
                setWsStatus("Connected")

                // keep alive
                pingInterval = setInterval(() => {
                    if (ws.readyState === WebSocket.OPEN) {
                        ws.send(JSON.stringify({ type: "ping" }))
                    }
                }, 30000)
            }

            // inside ws.onmessage
            ws.onmessage = (event) => {
                try {
                    const data = JSON.parse(event.data)
                    console.log("💬 Chat message:", data)

                    if (data.type === "pong") return

                    setMessages((prev) => [...prev, data])

                    // 🔔 Show toast only if user is NOT on chat page
                    if (window.location.pathname !== `/chat/${contributorId}`) {
                        toast.info(
                            <div>
                                <p className="font-medium">New Message</p>
                                <p className="text-sm">{data.message}</p>
                            </div>,
                            { autoClose: 4000 }
                        )
                    }
                } catch (err) {
                    console.error("Error parsing message", err)
                }
            }


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
        }

        connect()

        return () => {
            clearInterval(pingInterval);
            //if (ws) ws.close();
        };
    }, [wsUrl, contributorId])

    const sendMessage = (text) => {
        if (wsRef.current && wsRef.current.readyState === WebSocket.OPEN) {
            const payload = { type: "chat_message", message: text }
            wsRef.current.send(JSON.stringify(payload))
            setMessages((prev) => [...prev, { self: true, message: text }]) // optimistically add
        }
    }

    return (
        <ChatContext.Provider value={{ wsStatus, messages, sendMessage }}>
            {children}
        </ChatContext.Provider>
    )
}
