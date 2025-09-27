// "use client";

// import { useState, useRef, useContext, useEffect } from "react";
// import { emojis } from "../home/Emoji";
// import { Link, useLocation, useParams } from "react-router-dom";
// import { UserContext } from "../../../context/UserContext";
// import { authService } from "../../../api/ApiServiceThree"; // adjust if needed
// import { ChatServices } from "../../../api/ChatServices";

// export function ChatMentorModal({ userwithid }) {
//   const [isOpen, setIsOpen] = useState(false)

//   return (
//     <>
//       {userwithid?.can_message === true?(
//         <button
//           onClick={() => setIsOpen(true)}
//           className="text-white bg-[#5DA05D] py-1 px-3 rounded-lg hover:bg-[#4a834a] transition"
//         >
//           Chat Mentor
//         </button>
//       ):("")}

//       {/* Modal Overlay */}
//       {isOpen && (
//         <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
//           {/* Modal Box */}
//           <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6">
//             {/* Header */}
//             <div className="flex justify-between items-center border-b pb-2">
//               <h2 className="text-lg font-semibold">Chat with Mentor</h2>
//               <button
//                 onClick={() => setIsOpen(false)}
//                 className="text-gray-500 hover:text-gray-700"
//               >
//                 ✕
//               </button>
//             </div>

//             <Chats/>

//           </div>
//         </div>
//       )}
//     </>
//   )
// }

// // ---------------- Emoji Picker ----------------
// function EmojiPicker({ isOpen, onClose, onEmojiSelect }) {
//   if (!isOpen) return null
//   return (
//     <>
//       <div className="fixed inset-0 bg-black bg-opacity-25 z-40" onClick={onClose} />
//       <div className="absolute bottom-16 right-4 bg-white rounded-2xl shadow-xl border border-gray-200 p-4 z-50 w-80 max-h-64 overflow-y-auto">
//         <div className="grid grid-cols-8 gap-2">
//           {emojis.map((emoji, index) => (
//             <button
//               key={index}
//               onClick={() => {
//                 onEmojiSelect(emoji)
//                 onClose()
//               }}
//               className="text-2xl hover:bg-gray-100 rounded-lg p-2 transition-colors"
//             >
//               {emoji}
//             </button>
//           ))}
//         </div>
//       </div>
//     </>
//   )
// }

// // ---------------- Chat Input ----------------
// function ChatInput({ onSend }) {
//   const [message, setMessage] = useState("")
//   const [isEmojiOpen, setIsEmojiOpen] = useState(false)

//   const handleSend = () => {
//     if (message.trim() === "") return
//     onSend(message)
//     setMessage("")
//   }

//   return (
//     <div className="relative flex items-center gap-2 border-t border-gray-200 p-3 bg-white">
//       <button className="text-xl" onClick={() => setIsEmojiOpen((prev) => !prev)}>
//         😀
//       </button>
//       <input
//         type="text"
//         value={message}
//         onChange={(e) => setMessage(e.target.value)}
//         placeholder="Type a message..."
//         className="flex-1 px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500"
//       />
//       <button
//         onClick={handleSend}
//         className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
//       >
//         Send
//       </button>

//       <EmojiPicker
//         isOpen={isEmojiOpen}
//         onClose={() => setIsEmojiOpen(false)}
//         onEmojiSelect={(emoji) => setMessage((prev) => prev + emoji)}
//       />
//     </div>
//   )
// }

// // ---------------- Main Chats ----------------
// export default function Chats() {
//   const { userwithid, user } = useContext(UserContext)
//   const location = useLocation()
//   const contributor = location.state?.contributor
//   const contributorId = contributor?.id
//   const { chat_id } = useParams()

//   const [messages, setMessages] = useState([])
//   const wsRef = useRef(null)
//   const [wsStatus, setWsStatus] = useState("Idle")

//   const token = authService.getAuthToken()

//   // Build WebSocket URL safely
//   const wsUrl =
//     userwithid?.id && token
//       ? `wss://btest.career-nexus.com/ws/chat/${userwithid.id}/?token=${encodeURIComponent(token)}`
//       : null

//   // ---------------- WebSocket setup ----------------
//   useEffect(() => {
//     if (!wsUrl || !userwithid?.id || !token) {
//       console.warn("⏳ Waiting for userwithid and token before opening WS")
//       return
//     }

//     let ws
//     let pingInterval

//     const connect = () => {
//       console.log("🔗 Connecting to:", wsUrl)
//       ws = new WebSocket(wsUrl)
//       wsRef.current = ws

//       ws.onopen = () => {
//         console.log("✅ Chat WebSocket opened")
//         setWsStatus("Connected")

//         pingInterval = setInterval(() => {
//           if (ws.readyState === WebSocket.OPEN) {
//             ws.send(JSON.stringify({ type: "ping" }))
//           }
//         }, 30000)
//       }

//       ws.onmessage = (event) => {
//         try {
//           const data = JSON.parse(event.data)
//           if (data.type === "pong") return

//           setMessages((prev) => {
//             const senderId = data.user_id ?? data.person?.id
//             const uniqueKey = `${senderId}-${data.message}-${data.timestamp}`

//             const exists = prev.some(
//               (msg) =>
//                 (msg.user_id ?? msg.person?.id) === senderId &&
//                 msg.message === data.message &&
//                 msg.timestamp === data.timestamp
//             )

//             return exists ? prev : [...prev, { ...data, uniqueKey }]
//           })
//         } catch (err) {
//           console.error("❌ Error parsing WS message", err)
//         }
//       }

//       ws.onerror = (error) => {
//         console.error("WebSocket error:", error)
//         setWsStatus("Error")
//       }

//       ws.onclose = (event) => {
//         clearInterval(pingInterval)
//         console.log("WebSocket closed:", event.code, event.reason)
//         setWsStatus("Disconnected")

//         if (event.code !== 1000) {
//           setTimeout(connect, 10000)
//         }
//       }
//     }

//     connect()

//     return () => {
//       clearInterval(pingInterval)
//       ws?.close()
//     }
//   }, [wsUrl, userwithid?.id, token])

//   // ---------------- Send Message ----------------
//   const handleSendMessage = (text) => {
//     if (wsRef.current && wsRef.current.readyState === WebSocket.OPEN) {
//       const payload = { type: "chat_message", message: text }
//       wsRef.current.send(JSON.stringify(payload))
//     }
//   }

//   // ---------------- Fetch Chat History ----------------
//   const fetchChatHistory = async () => {
//     if (!chat_id) return
//     try {
//       const res = await ChatServices.getChatHistory(chat_id)
//       if (res.success) {
//         setMessages(res.data)
//       }
//     } catch (error) {
//       console.error("❌ Failed to fetch chat history:", error)
//     }
//   }

//   useEffect(() => {
//     fetchChatHistory()
//   }, [chat_id])

//   // ---------------- Render ----------------
//   return (
//     <div className="flex flex-col h-full">
//       {/* Header with contributor info */}
//       {contributor && (
//         <div className="flex items-center gap-3 p-4 border-b border-gray-200 bg-white sticky top-10 md:top-20">
//           <img
//             src={contributor.profile_photo || "/placeholder.svg"}
//             alt={contributor.first_name}
//             className="w-10 h-10 rounded-full"
//           />
//           <div>
//             <p className="font-semibold text-gray-900">
//               {contributor.first_name} {contributor.last_name}
//             </p>
//             <p className="text-sm text-gray-500">{contributor.qualification || ""}</p>
//           </div>
//           <Link
//             to={"/chatsection"}
//             className="ml-auto bg-[#5DA05D] text-white rounded-lg py-1 px-3"
//           >
//             back
//           </Link>
//         </div>
//       )}

//       {/* Messages */}
//       <div className="flex-1 p-4 space-y-4 overflow-y-auto">
//         {messages.length === 0 ? (
//           <p className="text-gray-500">No messages yet</p>
//         ) : (
//           messages.map((msg, index) => {
//             const senderId = msg.user_id ?? msg.person?.id
//             const isMe = String(senderId) !== String(contributorId)

//             return (
//               <div
//                 key={msg.uniqueKey || index}
//                 className={`flex ${isMe ? "justify-end" : "justify-start"} mb-2`}
//               >
//                 {!isMe && (
//                   <div className="flex items-center mr-2">
//                     <img
//                       src={contributor?.profile_photo || "/placeholder.svg"}
//                       alt={contributor?.first_name}
//                       className="w-8 h-8 rounded-full"
//                     />
//                   </div>
//                 )}
//                 <div
//                   className={`max-w-xs p-3 rounded-lg ${
//                     isMe ? "bg-[#5DA05D] text-white" : "bg-gray-100 text-gray-900"
//                   }`}
//                 >
//                   <p className="text-sm">{msg.message}</p>
//                   <p className="text-[10px] mt-1 opacity-70">
//                     {new Date(msg.timestamp || Date.now()).toLocaleTimeString([], {
//                       hour: "2-digit",
//                       minute: "2-digit",
//                     })}
//                   </p>
//                 </div>
//               </div>
//             )
//           })
//         )}
//       </div>

//       {/* Chat Input */}
//       <ChatInput onSend={handleSendMessage} />
//     </div>
//   )
// }


// // function EmojiPicker({ isOpen, onClose, onEmojiSelect }) {
// //   if (!isOpen) return null;
// //   return (
// //     <>
// //       <div
// //         className="fixed inset-0 bg-black bg-opacity-25 z-40"
// //         onClick={onClose}
// //       />
// //       <div className="absolute bottom-16 right-4 bg-white rounded-2xl shadow-xl border border-gray-200 p-4 z-50 w-80 max-h-64 overflow-y-auto">
// //         <div className="grid grid-cols-8 gap-2">
// //           {emojis.map((emoji, index) => (
// //             <button
// //               key={index}
// //               onClick={() => {
// //                 onEmojiSelect(emoji);
// //                 onClose();
// //               }}
// //               className="text-2xl hover:bg-gray-100 rounded-lg p-2 transition-colors"
// //             >
// //               {emoji}
// //             </button>
// //           ))}
// //         </div>
// //       </div>
// //     </>
// //   );
// // }

// // // ---------------- Chat Input ----------------
// // function ChatInput({ onSend }) {
// //   const [message, setMessage] = useState("");
// //   const [isEmojiOpen, setIsEmojiOpen] = useState(false);

// //   const handleSend = () => {
// //     if (message.trim() === "") return;
// //     onSend(message);
// //     setMessage("");
// //   };

// //   return (
// //     <div className="relative flex items-center gap-2 border-t border-gray-200 p-3 bg-white">
// //       <button
// //         className="text-xl"
// //         onClick={() => setIsEmojiOpen((prev) => !prev)}
// //       >
// //         😀
// //       </button>
// //       <input
// //         type="text"
// //         value={message}
// //         onChange={(e) => setMessage(e.target.value)}
// //         placeholder="Type a message..."
// //         className="flex-1 px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500"
// //       />
// //       <button
// //         onClick={handleSend}
// //         className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
// //       >
// //         Send
// //       </button>

// //       <EmojiPicker
// //         isOpen={isEmojiOpen}
// //         onClose={() => setIsEmojiOpen(false)}
// //         onEmojiSelect={(emoji) => setMessage((prev) => prev + emoji)}
// //       />
// //     </div>
// //   );
// // }

// // // ---------------- Main Chats ----------------
// // export default function Chats() {
// //  const {userwithid} = useContext(UserContext)
// //   const location = useLocation();
// //   const contributor = location.state?.contributor; // ✅ contributor payload
// //   const contributorId = contributor?.id;

// //   const { chat_id } = useParams(); // from /chat/:chat_id

// //   const [messages, setMessages] = useState([]);
// //   const { user } = useContext(UserContext);

// //   const wsRef = useRef(null);
// //   const [wsStatus, setWsStatus] = useState("Idle");

// //   // Build WebSocket URL
// //   const token = authService.getAuthToken();
// //   const wsUrl = userwithid?.id
// //   ? `wss://btest.career-nexus.com/ws/chat/${userwithid.id}/?token=${encodeURIComponent(token)}`
// //   : null;

// //   // ---------------- WebSocket setup ----------------
// //   useEffect(() => {
// //      if (!wsUrl || !userwithid?.id || !token) {
// //     console.warn("⏳ Waiting for userwithid or token before opening WS");
// //     return;
// //   }

// //     let ws;
// //     let pingInterval;

// //     const connect = () => {
// //       ws = new WebSocket(wsUrl);
// //       wsRef.current = ws;

// //       ws.onopen = () => {
// //         console.log("✅ Chat WebSocket opened");
// //         setWsStatus("Connected");

// //         pingInterval = setInterval(() => {
// //           if (ws.readyState === WebSocket.OPEN) {
// //             ws.send(JSON.stringify({ type: "ping" }));
// //           }
// //         }, 30000);
// //       };
// //       ws.onmessage = (event) => {
// //         try {
// //           const data = JSON.parse(event.data);
// //           console.log("💬 WS message:", data);
// //           if (data.type === "pong") return;

// //           setMessages((prev) => {
// //             const senderId = data.user_id ?? data.person?.id;
// //             const uniqueKey = `${senderId}-${data.message}-${data.timestamp}`;

// //             const exists = prev.some(
// //               (msg) =>
// //                 (msg.user_id ?? msg.person?.id) === senderId &&
// //                 msg.message === data.message &&
// //                 msg.timestamp === data.timestamp
// //             );

// //             return exists ? prev : [...prev, { ...data, uniqueKey }];
// //           });
// //         } catch (err) {
// //           console.error("Error parsing WS message", err);
// //         }
// //       };

// //       ws.onerror = (error) => {
// //         console.error("WebSocket error:", error);
// //         setWsStatus("Error");
// //       };

// //       ws.onclose = (event) => {
// //         clearInterval(pingInterval);
// //         console.log("WebSocket closed:", event.code, event.reason);
// //         setWsStatus("Disconnected");
// //         if (event.code !== 1000) {
// //           setTimeout(connect, 10000);
// //         }
// //       };
// //     };

// //     connect();

// //     return () => {
// //       clearInterval(pingInterval);
// //       ws?.close();
// //     };
// //   }, [wsUrl, userwithid?.id, token]);
// //   // ---------------- Send Message ----------------
// //   const handleSendMessage = (text) => {
// //     if (wsRef.current && wsRef.current.readyState === WebSocket.OPEN) {
// //       const payload = { type: "chat_message", message: text };
// //       wsRef.current.send(JSON.stringify(payload));
// //     }
// //   };
// //   const fetchChatHistory = async () => {
// //     try {
// //       const res = await ChatServices.getChatHistory(chat_id);
// //       if (res.success) {
// //         setMessages(res.data);
// //       }

// //     } catch (error) {

// //     }
// //   }
// //   useEffect(() => {
// //     if (chat_id) {
// //       fetchChatHistory();
// //     }
// //   }, [chat_id]);
// //   // ---------------- Render ----------------
// //   return (
// //     <div className="flex flex-col h-full">
// //       {/* Header with contributor info */}
// //       {contributor && (
// //         <div className="flex items-center gap-3 p-4 border-b border-gray-200 bg-white sticky top-10 md:top-20">
// //           <img
// //             src={contributor.profile_photo || "/placeholder.svg"}
// //             alt={contributor.first_name}
// //             className="w-10 h-10 rounded-full"
// //           />
// //           <div>
// //             <p className="font-semibold text-gray-900">
// //               {contributor.first_name} {contributor.last_name}
// //             </p>
// //             <p className="text-sm text-gray-500">
// //               {contributor.qualification || ""}
// //             </p>
// //           </div>
// //           <Link to={"/chatsection"} className="ml-auto bg-[#5DA05D] text-white rounded-lg py-1 px-3">back</Link>
// //         </div>
// //       )}

// //       {/* Messages */}
// //       <div className="flex-1 p-4 space-y-4 overflow-y-auto">
// //         {messages.length === 0 ? (
// //           <p className="text-gray-500">No messages yet</p>
// //         ) : (
// //           messages.map((msg, index) => {
// //             const senderId = msg.user_id ?? msg.person?.id;

// //             // if sender is the contributor => it's them, else it's me
// //             const isMe = String(senderId) !== String(contributorId);

// //             return (
// //               <div
// //                 key={index}
// //                 className={`flex ${isMe ? "justify-end" : "justify-start"} mb-2`}
// //               >
// //                 {/* Show avatar + name only if it's the contributor */}
// //                 {!isMe && (
// //                   <div className="flex items-center mr-2">
// //                     <img
// //                       src={contributor?.profile_photo || "/placeholder.svg"}
// //                       alt={contributor?.first_name}
// //                       className="w-8 h-8 rounded-full"
// //                     />
// //                   </div>
// //                 )}

// //                 {/* Message bubble */}
// //                 <div
// //                   className={`max-w-xs p-3 rounded-lg ${isMe ? "bg-[#5DA05D] text-white" : "bg-gray-100 text-gray-900"
// //                     }`}
// //                 >
// //                   <p className="text-sm">{msg.message}</p>
// //                   <p className="text-[10px] mt-1 opacity-70">
// //                     {new Date(msg.timestamp || Date.now()).toLocaleTimeString([], {
// //                       hour: "2-digit",
// //                       minute: "2-digit",
// //                     })}
// //                   </p>
// //                 </div>
// //               </div>
// //             );
// //           })
// //         )}
// //       </div>

// //       {/* Chat Input */}
// //       <ChatInput onSend={handleSendMessage} />
// //     </div>
// //   );
// // }
"use client";

import { useState, useRef, useContext, useEffect } from "react";
import { emojis } from "../home/Emoji";
import { Link, useLocation, useParams } from "react-router-dom";
import { UserContext } from "../../../context/UserContext";
import api, { authService } from "../../../api/ApiServiceThree";
import { ChatServices } from "../../../api/ChatServices";

// ---------------- Chat Mentor Modal ----------------
export function ChatMentorModal({ mentorId }) {
  const [isOpen, setIsOpen] = useState(false);
  const [userwithid, setUserwithid] = useState(null);
//   const [loading, setLoading] = useState(true);

  // fetch mentor profile directly
  const getUserById = async (user_id) => {
    try {
      const response = await api.get(`/user/retrieve-profile/?user_id=${user_id}`);
      setUserwithid(response.data);
    } catch (error) {
      console.log("❌ failed to fetch user by id details", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (mentorId) {
      getUserById(mentorId);
    }
  }, [mentorId]);

//   if (loading) {
//     return <div className="text-gray-500">Loading...</div>;
//   }

  return (
    <>
      {userwithid && userwithid.can_message == true ? (
        <button
          onClick={() => setIsOpen(true)}
          className="text-white bg-[#5DA05D] py-1 px-3 rounded-lg hover:bg-[#4a834a] transition"
        >
          Chat Mentor
        </button>
      ) : (
        <p className="text-sm text-gray-500">You cannot message this mentor</p>
      )}

      {/* Modal */}
      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-md h-[80vh] flex flex-col">
            {/* Header */}
            <div className="flex justify-between items-center border-b p-4">
              <h2 className="text-lg font-semibold">Chat with Mentor</h2>
              <button
                onClick={() => setIsOpen(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                ✕
              </button>
            </div>

            {/* Chats */}
            <div className="flex-1 overflow-hidden">
              <Chats userwithid={userwithid} />
            </div>
          </div>
        </div>
      )}
    </>
  );
}


// ---------------- Emoji Picker ----------------
function EmojiPicker({ isOpen, onClose, onEmojiSelect }) {
  if (!isOpen) return null;
  return (
    <>
      <div className="fixed inset-0 bg-black bg-opacity-25 z-40" onClick={onClose} />
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

  return (
    <div className="relative flex items-center gap-2 border-t border-gray-200 p-3 bg-white">
      <button className="text-xl" onClick={() => setIsEmojiOpen((prev) => !prev)}>
        😀
      </button>
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Type a message..."
        className="flex-1 px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500"
      />
      <button
        onClick={handleSend}
        className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
      >
        Send
      </button>

      <EmojiPicker
        isOpen={isEmojiOpen}
        onClose={() => setIsEmojiOpen(false)}
        onEmojiSelect={(emoji) => setMessage((prev) => prev + emoji)}
      />
    </div>
  );
}

// ---------------- Chats ----------------
function Chats({ userwithid }) {
  const { user } = useContext(UserContext);
  const location = useLocation();
  const contributor = location.state?.contributor;
  const contributorId = contributor?.id;
  const { chat_id } = useParams();

  const [messages, setMessages] = useState([]);
  const wsRef = useRef(null);
  const [wsStatus, setWsStatus] = useState("Idle");

  const token = authService.getAuthToken();

  // Build WebSocket URL from fetched userwithid
  const wsUrl =
    userwithid?.id && token
      ? `wss://btest.career-nexus.com/ws/chat/${userwithid.id}/?token=${encodeURIComponent(token)}`
      : null;

  // WebSocket setup
  useEffect(() => {
    if (!wsUrl) return;

    let ws;
    let pingInterval;

    const connect = () => {
      ws = new WebSocket(wsUrl);
      wsRef.current = ws;

      ws.onopen = () => {
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
          if (data.type === "pong") return;

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
          console.error("❌ Error parsing WS message", err);
        }
      };

      ws.onerror = () => setWsStatus("Error");
      ws.onclose = (event) => {
        clearInterval(pingInterval);
        setWsStatus("Disconnected");
        if (event.code !== 1000) {
          setTimeout(connect, 10000);
        }
      };
    };

    connect();

    return () => {
      clearInterval(pingInterval);
      ws?.close();
    };
  }, [wsUrl]);

  // Send Message
  const handleSendMessage = (text) => {
    if (wsRef.current && wsRef.current.readyState === WebSocket.OPEN) {
      const payload = { type: "chat_message", message: text };
      wsRef.current.send(JSON.stringify(payload));
    }
  };

  // Fetch Chat History
  useEffect(() => {
    if (!chat_id) return;
    (async () => {
      try {
        const res = await ChatServices.getChatHistory(chat_id);
        if (res.success) setMessages(res.data);
      } catch (error) {
        console.error("❌ Failed to fetch chat history:", error);
      }
    })();
  }, [chat_id]);

  return (
    <div className="flex flex-col h-full">
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
                key={msg.uniqueKey || index}
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
                  className={`max-w-xs p-3 rounded-lg ${
                    isMe ? "bg-[#5DA05D] text-white" : "bg-gray-100 text-gray-900"
                  }`}
                >
                  <p className="text-sm">{msg.message}</p>
                  <p className="text-[10px] mt-1 opacity-70">
                    {new Date(msg.timestamp || Date.now()).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Input */}
      <ChatInput onSend={handleSendMessage} />
    </div>
  );
}
