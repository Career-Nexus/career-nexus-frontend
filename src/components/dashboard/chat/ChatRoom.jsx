"use client"

import { Plus } from "lucide-react"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { useParams } from "react-router-dom";
import { ChatServices } from "../../../api/ChatServices";

// export default function ChatSessions() {
//   const [activeFilter, setActiveFilter] = useState("All");
//   const [chatSessions, setChatSessions] = useState([]);

//   const fetchChatSessions = async () => {
//     const res = await ChatServices.getChatSessions();
//     if (res.success) {
//       setChatSessions(res.data);
//     }
//   };

//   useEffect(() => {
//     fetchChatSessions();
//   }, []);

//   // If backend later provides `unread`, you can filter here
//   const filteredChats = activeFilter === "Unread"
//     ? chatSessions.filter((chat) => chat.unread)
//     : chatSessions;

//   return (
//     <div className="max-w-7xl mx-auto bg-white">
//       {/* Header with filters */}
//       <div className="flex items-center justify-between p-4 border-b border-gray-100">
//         <div className="flex gap-2">
//           {["All", "Unread"].map((f) => (
//             <button
//               key={f}
//               onClick={() => setActiveFilter(f)}
//               className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
//                 activeFilter === f
//                   ? "bg-[#5DA05D] text-white"
//                   : "bg-gray-100 text-gray-600 hover:bg-gray-200"
//               }`}
//             >
//               {f}
//             </button>
//           ))}
//         </div>

//         <Link
//           to="/newchat"
//           className="w-10 h-10 bg-[#5DA05D] text-white rounded-lg flex items-center justify-center hover:bg-[#4A8B4A] transition-colors"
//         >
//           <Plus />
//         </Link>
//       </div>

//       {/* Sessions list */}
//       <div className="divide-y divide-gray-100">
//         {filteredChats.map((chat) => (
//           <Link
//             key={chat.chat_id}
//             to={`/chat/${chat.chat_id}`}
//             // to={`/chat/${chat.contributor.id}`}
//             className="p-4 hover:bg-gray-50 cursor-pointer transition-colors block"
//           >
//             <div className="flex items-start gap-3">
//               <div className="w-12 h-12 rounded-full overflow-hidden flex-shrink-0">
//                 <img
//                   src={chat.contributor.profile_photo || "/placeholder.svg"}
//                   alt={`${chat.contributor.first_name || "User"} avatar`}
//                   className="w-full h-full object-cover"
//                 />
//               </div>

//               <div className="flex-1 min-w-0">
//                 <h3 className="font-semibold text-gray-900 truncate">
//                   {chat.contributor.first_name || "Unknown"}{" "}
//                   {chat.contributor.last_name || ""}
//                 </h3>
//                 <p className="text-gray-600 text-sm truncate">
//                   {chat.contributor.qualification || "No qualification"}
//                 </p>
//               </div>
//             </div>
//           </Link>
//         ))}
//       </div>
//     </div>
//   );
// }
export default function ChatSessions() {
  const [activeFilter, setActiveFilter] = useState("All");
  const [chatSessions, setChatSessions] = useState([]);

  const fetchChatSessions = async () => {
    const res = await ChatServices.getChatSessions();
    if (res.success) {
      setChatSessions(res.data);
    }
  };

  useEffect(() => {
    fetchChatSessions();
  }, []);

  const filteredChats =
    activeFilter === "Unread"
      ? chatSessions.filter((chat) => chat.unread)
      : chatSessions;

  return (
    <div className="max-w-7xl mx-auto bg-white">
      {/* Header with filters */}
      <div className="flex items-center justify-between p-4 border-b border-gray-100">
        <div className="flex gap-2">
          {["All", "Unread"].map((f) => (
            <button
              key={f}
              onClick={() => setActiveFilter(f)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                activeFilter === f
                  ? "bg-[#5DA05D] text-white"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              {f}
            </button>
          ))}
        </div>

        <Link
          to="/newchat"
          className="w-10 h-10 bg-[#5DA05D] text-white rounded-lg flex items-center justify-center hover:bg-[#4A8B4A] transition-colors"
        >
          <Plus />
        </Link>
      </div>

      {/* Sessions list */}
      <div className="divide-y divide-gray-100">
        {filteredChats.map((chat) => (
          <Link
            key={chat.chat_id}
            to={`/chat/${chat.chat_id}`} // still navigate to a unique URL
            state={{ contributor: chat.contributor }} // ✅ pass contributor as payload
            className="p-4 hover:bg-gray-50 cursor-pointer transition-colors block"
          >
            <div className="flex items-start gap-3">
              <div className="w-12 h-12 rounded-full overflow-hidden flex-shrink-0">
                <img
                  src={chat.contributor.profile_photo || "/placeholder.svg"}
                  alt={`${chat.contributor.first_name || "User"} avatar`}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-gray-900 truncate">
                  {chat.contributor.first_name || "Unknown"}{" "}
                  {chat.contributor.last_name || ""}
                </h3>
                <p className="text-gray-600 text-sm truncate">
                  {chat.contributor.qualification || "No qualification"}
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
