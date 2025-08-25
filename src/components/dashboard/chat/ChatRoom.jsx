"use client"

import { Plus } from "lucide-react"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { useParams } from "react-router-dom";
import { ChatServices } from "../../../api/ChatServices";


export default function ChatRoom() {
  const [activeFilter, setActiveFilter] = useState("All")
  const [chatData, setChatData] = useState([])
  const { chatId } = useParams();

  const fetchChatData = async () => {
    const res = await ChatServices.getChatList(chatId);
     console.log("fetchChatData result:", res);
    if (res.success) {
      setChatData(res.data);
    }
  };

  useEffect(() => {
    if (chatId) fetchChatData();
  }, [chatId]);
  console.log(chatData);
  // const filteredChats = chatData; 

  // const filteredChats = activeFilter === "Unread" ? chatData.filter((chat) => chat.unread) : chatData;

  return (
    <div className="max-w-7xl mx-auto bg-white">
      {/* Header with filters */}
      <div className="flex items-center justify-between p-4 border-b border-gray-100">
        <div className="flex gap-2">
          <button
            onClick={() => setActiveFilter("All")}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${activeFilter === "All" ? "bg-[#5DA05D] text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
          >
            All
          </button>
          <button
            onClick={() => setActiveFilter("Unread")}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${activeFilter === "Unread" ? "bg-[#5DA05D] text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
          >
            Unread
          </button>
        </div>

        <Link to="/newchat" className="w-10 h-10 bg-[#5DA05D] text-white rounded-lg flex items-center justify-center hover:bg-[#5DA05D] transition-colors">
          <Plus />
        </Link>
      </div>


      <div className="divide-y divide-gray-100">
        {chatData.map((chat, index) => (
          <div key={index} className="p-4 hover:bg-gray-50 cursor-pointer transition-colors">
            <div className="flex items-start gap-3">
              {/* Avatar */}
              <div className="w-12 h-12 rounded-full overflow-hidden flex-shrink-0">
                <img
                  src={chat.person.profile_photo || "/placeholder.svg"}
                  alt={`${chat.person.first_name} avatar`}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Chat content */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-1">
                  <h3 className="font-semibold text-gray-900 truncate">
                    {chat.person.first_name} {chat.person.last_name}
                  </h3>
                  <span className="text-sm text-gray-500">
                    {new Date(chat.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>
                <p className="text-gray-600 text-sm truncate">{chat.message}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
{/* Chat list */ }
{/* <div className="divide-y divide-gray-100">
        {filteredChats.map((chat) => (
          <div key={chat.id} className="p-4 hover:bg-gray-50 cursor-pointer transition-colors">
            <Link to={`/chat/${chat.id}`} className="flex items-start gap-3">
              
              <div className="w-12 h-12 rounded-full overflow-hidden flex-shrink-0">
                <img
                  src={chat.avatar || "/placeholder.svg"}
                  alt={`${chat.name} avatar`}
                  className="w-full h-full object-cover"
                />
              </div>

            
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-1">
                  <h3 className="font-semibold text-gray-900 truncate">{chat.name}</h3>
                  <div className="flex items-center gap-2 flex-shrink-0">
                    <span className="text-sm text-gray-500">{chat.time}</span>
                    {chat.unread && <div className="w-2 h-2 bg-red-500 rounded-full"></div>}
                  </div>
                </div>
                <p className="text-gray-600 text-sm truncate">{chat.message}</p>
              </div>
            </Link>
          </div>
        ))}
      </div> */}
// const chatData = [
//   {
//     id: 1,
//     name: "Dianne Russell",
//     message: "Hey, I would love to be your mentor and show you how to work through",
//     time: "Now",
//     unread: true,
//     avatar: "/professional-woman-avatar.png",
//   },
//   {
//     id: 2,
//     name: "Alex Johnson",
//     message: "Thanks for the feedback on my project! I'll implement those changes today.",
//     time: "2h",
//     unread: false,
//     avatar: "/professional-man-avatar.png",
//   },
//   {
//     id: 3,
//     name: "Sarah Chen",
//     message: "Can we schedule a call tomorrow to discuss the new design system?",
//     time: "5h",
//     unread: true,
//     avatar: "/asian-woman-professional-avatar.png",
//   },
//   {
//     id: 4,
//     name: "Mike Torres",
//     message: "The deployment went smoothly. Everything is working as expected.",
//     time: "1d",
//     unread: false,
//     avatar: "/hispanic-man-professional-avatar.png",
//   },
//   {
//     id: 5,
//     name: "Emma Wilson",
//     message: "I've reviewed the code and left some comments. Great work overall!",
//     time: "2d",
//     unread: true,
//     avatar: "/blonde-woman-professional-avatar.png",
//   },
// ]
// Fetch chat data from the ChatService
