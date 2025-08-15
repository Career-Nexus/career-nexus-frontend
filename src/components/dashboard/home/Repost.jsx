import { X } from "lucide-react";
import { useContext, useState } from "react";
import { PostService } from "../../../api/PostService";
import { UserContext } from "../../../context/UserContext";

// export default function RepostModal({ isOpen, onClose, onRepost, post }) {
//   const [text, setText] = useState("");

//   const handleRepost = async () => {
//     try {
//       await PostService.repost({
//         parent: post.post_id,
//         body: text
//       })
//       onRepost(post.post_id, text);
//       setText("");
//       onClose();
//     } catch (error) {
//       console.log("could not repost this post")
//     }

//   };

//   if (!isOpen) return null;

//   return (
//     <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
//       <div className="bg-white w-full max-w-md rounded-lg p-6 relative shadow-lg">
//         <button
//           onClick={onClose}
//           className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
//         >
//           <X size={22} />
//         </button>

//         <h2 className="text-lg font-semibold mb-4">Repost</h2>
//         <div className="flex gap-3 mb-2">
//           <img
//             src={post.profile?.profile_photo || "/images/profile.png"}
//             alt="profile"
//             className="w-12 h-12 rounded-full object-cover"
//           />
//           <div className="flex flex-col">
//             <h3 className="font-semibold text-sm">
//               {post.profile?.first_name || "User"} {post.profile?.last_name}
//             </h3>
//             <p className="font-light text-sm">{post.profile?.qualification || "User"}</p>
//             {/* <div className="flex items-center gap-1">
//                   <p>{formatTimeAgo(post.time_stamp)}</p>
//                   <Clock className="w-3 h-3" />
//                 </div> */}
//           </div>
//         </div>
//         <p>{post.body}</p>
//         <textarea
//           value={text}
//           onChange={(e) => setText(e.target.value)}
//           placeholder="Add an optional message..."
//           rows={4}
//           className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-[#5DA05D]"
//         />

//         <button
//           onClick={handleRepost}
//           className="mt-4 w-full bg-[#5DA05D] text-white py-2 rounded-md hover:bg-[#5DA05D] transition-colors"
//         >
//           Repost
//         </button>
//       </div>
//     </div>
//   );
// }


export default function RepostModal({ isOpen, onClose, onRepost, post }) {
  const [text, setText] = useState("");
  const {user} = useContext(UserContext)

  const handleRepost = async () => {
    try {
      const payload = {
        parent: post.post_id,
        body: text
      };

      const res = await PostService.repost(payload);

      if (res.success) {
        onRepost(post.post_id, text);
        setText("");
        onClose();
      }
    } catch (error) {
      console.log("Could not repost this post");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white w-full max-w-md rounded-lg p-6 relative shadow-lg">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
        >
          <X size={22} />
        </button>

        <h2 className="text-lg font-semibold mb-4">Repost</h2>

        {/* Current user info */}
        <div className="flex gap-3 mb-3">
          <img
            src={user?.profile_photo || "/images/profile.png"}
            alt="Your profile"
            className="w-12 h-12 rounded-full object-cover"
          />
          <div>
            <h3 className="font-semibold text-sm">
              {user?.first_name} {user?.last_name}
            </h3>
            <p className="font-light text-sm">
              {user?.qualification || "User"}
            </p>
          </div>
        </div>

        {/* Optional message input */}
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Add an optional message..."
          rows={3}
          className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-[#5DA05D]"
        />

        {/* Original post display */}
        <div className="mt-4 border rounded-md p-3 bg-gray-50">
          <div className="flex gap-3 mb-2">
            <img
              src={post.profile?.profile_photo || "/images/profile.png"}
              alt="Original profile"
              className="w-10 h-10 rounded-full object-cover"
            />
            <div>
              <h3 className="font-semibold text-sm">
                {post.profile?.first_name} {post.profile?.last_name}
              </h3>
              <p className="font-light text-sm">
                {post.profile?.qualification || "User"}
              </p>
            </div>
          </div>
          <p className="text-sm">{post.body}</p>
        </div>

        {/* Submit button */}
        <button
          onClick={handleRepost}
          className="mt-4 w-full bg-[#5DA05D] text-white py-2 rounded-md hover:bg-[#4b874b] transition-colors"
        >
          Repost
        </button>
      </div>
    </div>
  );
}
