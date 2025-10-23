"use client";

import { useState, useRef, useContext, useEffect, useMemo } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { UserContext } from "../../../context/UserContext";
import { authService, wsProdUrl, wsTestUrl } from "../../../api/ApiServiceThree";
import { ChatServices } from "../../../api/ChatServices";
import { emojis } from "../home/Emoji";

// ---------------- Emoji Picker ----------------
function EmojiPicker({ isOpen, onClose, onEmojiSelect }) {
  if (!isOpen) return null;
  return (
    <>
      <div
        className="fixed inset-0 bg-black bg-opacity-25 z-40"
        onClick={onClose}
      />
      <div className="absolute bottom-16 right-4 bg-white rounded-2xl shadow-xl border border-gray-200 p-4 z-50 w-80 max-h-64 overflow-y-auto">
        <div className="grid grid-cols-8 gap-2">
          {emojis.map((emoji, index) => (
            <button
              key={index}
              onClick={() => {
                onEmojiSelect(emoji);
                onClose();
              }}
              className="text-2xl hover:bg-gray-100 rounded-lg p-2 transition-colors"
            >
              {emoji}
            </button>
          ))}
        </div>
      </div>
    </>
  );
}

// ---------------- Chat Input ----------------
function ChatInput({ onSend }) {
  const [message, setMessage] = useState("");
  const [isEmojiOpen, setIsEmojiOpen] = useState(false);

  const handleSend = () => {
    if (message.trim() === "") return;
    onSend(message);
    setMessage("");
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault(); // prevent newline
      handleSend();
    }
  };

  return (
    <div className="relative flex items-center gap-2 border-t border-gray-200 p-3 bg-white">
      {/* Emoji Toggle */}
      <button
        className="text-xl"
        onClick={() => setIsEmojiOpen((prev) => !prev)}
      >
        😀
      </button>

      {/* Textarea for messages */}
      <textarea
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Type a message..."
        rows={1}
        className="flex-1 px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#5DA05D] resize-none"
      />

      {/* Send Button */}
      <button
        onClick={handleSend}
        className="bg-[#5DA05D] text-white px-4 py-2 rounded-lg hover:bg-green-700"
      >
        Send
      </button>

      {/* Emoji Picker */}
      <EmojiPicker
        isOpen={isEmojiOpen}
        onClose={() => setIsEmojiOpen(false)}
        onEmojiSelect={(emoji) => setMessage((prev) => prev + emoji)}
      />
    </div>
  );
}

// ---------------- Main Chats ----------------
export default function Chats() {
  const location = useLocation();
  const contributor = location.state?.contributor; // contributor payload
  const contributorId = contributor?.id;
  const { chat_id } = useParams();

  const [messages, setMessages] = useState([]);
  const { user } = useContext(UserContext);

  const wsRef = useRef(null);
  const [wsStatus, setWsStatus] = useState("Idle");

  // const wsBase = wsTestUrl;
  const wsBase = wsProdUrl;

  // Build WebSocket URL once
  const wsUrl = useMemo(() => {
    const token = authService.getAuthToken();
    return contributorId
      ? `${wsBase}/chat/${contributorId}/?token=${encodeURIComponent(
        token
      )}`
      : null;
  }, [contributorId]);

  // ---------------- WebSocket setup ----------------
  useEffect(() => {
    if (!wsUrl) return;

    let ws;
    const connect = () => {
      ws = new WebSocket(wsUrl);
      wsRef.current = ws;

      ws.onopen = () => {
        console.log("✅ Chat WebSocket opened");
        setWsStatus("Connected");
      };

      ws.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data);
          console.log("💬 WS message:", data);

          // Ignore pings
          if (data.type === "pong") return;

          // ✅ If user is outside this chat, show toast only (don't append to chat state)
          if (window.location.pathname !== `/chat/${chat_id}`) {
            toast.info(
              <div>
                <p className="font-medium">Message from {contributor?.first_name}</p>
                <p className="text-sm">{data.message}</p>
              </div>,
              {
                autoClose: 8000,
                toastId: `chat-${chat_id}`, // 👈 ensures only one toast per chat
              }
            );
            return; // stop here → no double notifications
          }

          // ✅ Inside chat: update messages normally
          setMessages((prev) => {
            const senderId = data.user_id ?? data.person?.id;
            const uniqueKey = `${senderId}-${data.message}-${data.timestamp}`;

            const exists = prev.some(
              (msg) =>
                (msg.user_id ?? msg.person?.id) === senderId &&
                msg.message === data.message &&
                msg.timestamp === data.timestamp
            );

            return exists ? prev : [...prev, { ...data, uniqueKey }];
          });
        } catch (err) {
          console.error("Error parsing WS message", err);
        }
      };

      ws.onerror = (error) => {
        console.error("WebSocket error:", error);
        setWsStatus("Error");
      };

      ws.onclose = (event) => {
        console.log("WebSocket closed:", event.code, event.reason);
        setWsStatus("Disconnected");
        if (event.code !== 1000) {
          setTimeout(connect, 10000); // auto reconnect
        }
      };
    };

    connect();

    return () => {
      ws?.close();
    };
  // }, [wsUrl, chat_id, location.pathname, contributor]);
  }, [wsUrl, chat_id]);

  // ---------------- Send Message ----------------
  const handleSendMessage = (text) => {
    if (wsRef.current && wsRef.current.readyState === WebSocket.OPEN) {
      const payload = { type: "chat_message", message: text };
      wsRef.current.send(JSON.stringify(payload));
    }
  };

  // ---------------- Fetch history ----------------
  const fetchChatHistory = async () => {
    try {
      const res = await ChatServices.getChatHistory(chat_id);
      if (res.success) {
        setMessages(res.data);
      }
    } catch (error) {
      console.error("Failed to fetch chat history", error);
    }
  };

  useEffect(() => {
    if (chat_id) {
      fetchChatHistory();
    }
  }, [chat_id]);

  // ---------------- Render ----------------
  return (
    <div className="flex flex-col h-full">
      {/* Header with contributor info */}
      {contributor && (
        <div className="flex items-center gap-3 p-4 border-b border-gray-200 bg-white sticky top-10 md:top-20">
          <img
            src={contributor.profile_photo || "/placeholder.svg"}
            alt={contributor.first_name}
            className="w-10 h-10 rounded-full"
          />
          <div>
            <p className="font-semibold text-gray-900">
              {contributor.first_name} {contributor.last_name}
            </p>
            <p className="text-sm text-gray-500">
              {contributor.qualification || ""}
            </p>
          </div>
          <Link
            to={"/chatsection"}
            className="ml-auto bg-[#5DA05D] text-white rounded-lg py-1 px-3"
          >
            back
          </Link>
        </div>
      )}

      {/* Messages */}
      <div className="flex-1 p-4 space-y-4 overflow-y-auto">
        {messages.length === 0 ? (
          <p className="text-gray-500">No messages yet</p>
        ) : (
          messages.map((msg, index) => {
            const senderId = msg.user_id ?? msg.person?.id;
            const isMe = String(senderId) !== String(contributorId);

            return (
              <div
                key={index}
                className={`flex ${isMe ? "justify-end" : "justify-start"} mb-2`}
              >
                {!isMe && (
                  <div className="flex items-center mr-2">
                    <img
                      src={contributor?.profile_photo || "/placeholder.svg"}
                      alt={contributor?.first_name}
                      className="w-8 h-8 rounded-full"
                    />
                  </div>
                )}

                <div
                  className={`max-w-xs p-3 rounded-lg ${isMe
                    ? "bg-[#5DA05D] text-white"
                    : "bg-gray-100 text-gray-900"
                    }`}
                >
                  <p className="text-sm">{msg.message}</p>
                  <p className="text-[10px] mt-1 opacity-70">
                    {new Date(msg.timestamp || Date.now()).toLocaleTimeString(
                      [],
                      {
                        hour: "2-digit",
                        minute: "2-digit",
                      }
                    )}
                  </p>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Chat Input */}
      <div className="sticky bottom-0">
        <ChatInput onSend={handleSendMessage} />
      </div>
    </div>
  );
}
