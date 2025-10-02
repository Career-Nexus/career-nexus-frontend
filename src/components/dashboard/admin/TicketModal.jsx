import React from "react";
import { X } from "lucide-react";

export default function TicketModal({ ticket, onClose }) {
  if (!ticket) return null; // Don’t render if no ticket selected

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-2xl p-6 relative">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-800"
        >
          <X className="w-6 h-6" />
        </button>

        <h2 className="text-xl font-bold mb-6">Ticket {ticket.id}</h2>

        <div className="space-y-4 text-sm">
          <p>
            <span className="font-semibold">User:</span> {ticket.user}
          </p>
          <p>
            <span className="font-semibold">Category:</span> {ticket.category}
          </p>
          <p>
            <span className="font-semibold">Subject:</span> {ticket.subject}
          </p>
          <p>
            <span className="font-semibold">Description:</span>{" "}
            {ticket.description}
          </p>
          
          <p>
            <span className="font-semibold">Priority:</span>{" "}
            <span
              className={`${
                ticket.priority === "urgent"
                  ? "text-red-600 font-semibold"
                  : ticket.priority === "high"
                  ? "text-orange-600 font-semibold"
                  : ticket.priority === "medium"
                  ? "text-yellow-600 font-semibold"
                  : "text-green-600 font-semibold"
              }`}
            >
              {ticket.priority}
            </span>
          </p>
          {/* Status Select */}
          <div>
            <label className="block text-gray-700 font-semibold mb-1">
              Status:
            </label>
            <select
            className="w-full border rounded px-3 py-2 text-gray-700"
            defaultValue={ticket.status}
            >
              <option value="new">New</option>
              <option value="in_progress">In Progress</option>
              <option value="resolved">Resolved</option>
            </select>
          </div>

          {/* Admin Response */}
          <div>
            <label className="block text-gray-700 font-semibold mb-1">
              Admin Response:
            </label>
            <textarea
              rows={3}
              defaultValue={ticket.admin_response || ""}
              placeholder="Enter your response to the user..."
              className="w-full border rounded px-3 py-2 text-gray-700"
            />
          </div>

          {/* Timestamp */}
          <p className="text-gray-500 text-xs">
            Created: {new Date(ticket.timestamp).toLocaleString()}
          </p>
        </div>

        {/* Actions */}
        <div className="flex justify-end mt-6 space-x-3">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg border text-gray-600 bg-gray-100 hover:bg-gray-200"
          >
            Cancel
          </button>
          <button className="px-4 py-2 rounded-lg bg-[#5DA05D] text-white hover:bg-green-700">
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
}


// import React from "react";
// import { X } from "lucide-react";

// export default function TicketModal({ ticket, onClose }) {
//   if (!ticket) return null; // Don’t render if no ticket selected

//   return (
//     <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
//       <div className="bg-white rounded-lg shadow-lg w-full max-w-2xl p-6 relative">
//         {/* Close Button */}
//         <button
//           onClick={onClose}
//           className="absolute top-3 right-3 text-gray-500 hover:text-gray-800"
//         >
//           <X className="w-6 h-6" />
//         </button>

//         <h2 className="text-xl font-bold mb-6">
//           Ticket #{ticket.id} - {ticket.category}
//         </h2>

//         <div className="space-y-4 text-sm">
//           {/* Message */}
//           <p>
//             <span className="font-semibold">Message:</span>{" "}
//             {ticket.message}
//           </p>

//           {/* Priority */}
//           <p>
//             <span className="font-semibold">Priority:</span>{" "}
//             <span
//               className={`${
//                 ticket.priority === "urgent"
//                   ? "text-red-600 font-semibold"
//                   : ticket.priority === "high"
//                   ? "text-orange-600 font-semibold"
//                   : ticket.priority === "medium"
//                   ? "text-yellow-600 font-semibold"
//                   : "text-green-600 font-semibold"
//               }`}
//             >
//               {ticket.priority}
//             </span>
//           </p>

//           {/* Status Select */}
//           <div>
//             <label className="block text-gray-700 font-semibold mb-1">
//               Status:
//             </label>
//             <select
//               className="w-full border rounded px-3 py-2 text-gray-700"
//               defaultValue={ticket.status}
//             >
//               <option value="new">New</option>
//               <option value="in_progress">In Progress</option>
//               <option value="resolved">Resolved</option>
//             </select>
//           </div>

//           {/* Admin Response */}
//           <div>
//             <label className="block text-gray-700 font-semibold mb-1">
//               Admin Response:
//             </label>
//             <textarea
//               rows={3}
//               defaultValue={ticket.admin_response || ""}
//               placeholder="Enter your response to the user..."
//               className="w-full border rounded px-3 py-2 text-gray-700"
//             />
//           </div>

//           {/* Timestamp */}
//           <p className="text-gray-500 text-xs">
//             Created: {new Date(ticket.timestamp).toLocaleString()}
//           </p>
//         </div>

//         {/* Actions */}
//         <div className="flex justify-end mt-6 space-x-3">
//           <button
//             onClick={onClose}
//             className="px-4 py-2 rounded-lg border text-gray-600 bg-gray-100 hover:bg-gray-200"
//           >
//             Cancel
//           </button>
//           <button className="px-4 py-2 rounded-lg bg-[#5DA05D] text-white hover:bg-green-700">
//             Save Changes
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }
