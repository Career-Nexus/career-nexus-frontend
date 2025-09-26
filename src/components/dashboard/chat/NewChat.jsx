"use client"

import { useState } from "react"
import { useChat } from "../../../context/ChatContex"

// export default function EmptyChatRoom() {
//   const [searchQuery, setSearchQuery] = useState("")
//   const [message, setMessage] = useState("")

//   return (
//     <div className="flex flex-col h-screen bg-gray-50">
//       {/* Header */}
//       <div className="bg-white border-b border-gray-200 px-6 py-4">
//         <h1 className="text-lg font-semibold text-gray-900">New Message</h1>
//       </div>

//       {/* Search Bar */}
//       <div className="bg-white border-b border-gray-200 px-6 py-4">
//         <div className="relative">
//           <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//             <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//               <path
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 strokeWidth={2}
//                 d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
//               />
//             </svg>
//           </div>
//           <input
//             type="text"
//             placeholder="Search or type a name"
//             value={searchQuery}
//             onChange={(e) => setSearchQuery(e.target.value)}
//             className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-green-500 focus:border-green-500"
//           />
//         </div>
//       </div>

//       {/* Empty State */}
//       <div className="flex-1 bg-white">{/* Empty space - no content */}</div>

//       {/* Message Input Area */}
//       <div className="bg-white border-t border-gray-200 px-6 py-4">
//         <div className="flex items-center space-x-3">
//           {/* Attachment Button */}
//           <button className="flex-shrink-0 p-2 text-gray-400 hover:text-gray-600 transition-colors">
//             <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//               <path
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 strokeWidth={2}
//                 d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13"
//               />
//             </svg>
//           </button>

//           {/* Message Input */}
//           <div className="flex-1 relative">
//             <input
//               type="text"
//               placeholder="Write a Message..."
//               value={message}
//               onChange={(e) => setMessage(e.target.value)}
//               className="block w-full px-4 py-2 border border-gray-300 rounded-lg leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-green-500 focus:border-green-500"
//             />
//           </div>

//           {/* Emoji Button */}
//           <button className="flex-shrink-0 p-2 text-orange-400 hover:text-orange-600 transition-colors">
//             <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
//               <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
//               <circle cx="12" cy="12" r="10" fill="none" stroke="currentColor" strokeWidth="2" />
//               <circle cx="9" cy="9" r="1" fill="currentColor" />
//               <circle cx="15" cy="9" r="1" fill="currentColor" />
//               <path
//                 d="M8 14s1.5 2 4 2 4-2 4-2"
//                 stroke="currentColor"
//                 strokeWidth="1.5"
//                 fill="none"
//                 strokeLinecap="round"
//               />
//             </svg>
//           </button>

//           {/* Send Button */}
//           <button className="flex-shrink-0 p-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors">
//             <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
//             </svg>
//           </button>
//         </div>
//       </div>
//     </div>
//   )
// }
export default function EmptyChatRoom() {
  const [message, setMessage] = useState("")
  const { messages, sendMessage } = useChat()

  const handleSend = () => {
    if (!message.trim()) return
    sendMessage(message)
    setMessage("")
  }

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <h1 className="text-lg font-semibold text-gray-900">Chat Room</h1>
      </div>

      {/* Chat Messages */}
      <div className="flex-1 bg-white overflow-y-auto p-4 space-y-2">
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`p-2 rounded-lg max-w-xs ${
              msg.self ? "ml-auto bg-green-500 text-white" : "mr-auto bg-gray-200 text-gray-900"
            }`}
          >
            {msg.message}
          </div>
        ))}
      </div>

      {/* Input Area */}
      <div className="bg-white border-t border-gray-200 px-6 py-4">
        <div className="flex items-center space-x-3">
          <input
            type="text"
            placeholder="Write a message..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-1 focus:ring-green-500"
          />
          <button
            onClick={handleSend}
            className="flex-shrink-0 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  )
}
