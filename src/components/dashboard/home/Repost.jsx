import { X } from "lucide-react";
import { useState } from "react";
import { PostService } from "../../../api/PostService";

export default function RepostModal({ isOpen, onClose, onRepost, post }) {
  const [text, setText] = useState("");

  const handleRepost = async () => {
    try {
      await PostService.repost({
        parent: post.post_id,
        body: text
      })
      onRepost(post.post_id, text);
      setText("");
      onClose();
    } catch (error) {
      console.log("could not repost this post")
    }

  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white w-full max-w-md rounded-lg p-6 relative shadow-lg">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
        >
          <X size={22} />
        </button>

        <h2 className="text-lg font-semibold mb-4">Repost</h2>
        <div className="flex gap-3 mb-2">
          <img
            src={post.profile?.profile_photo || "/images/profile.png"}
            alt="profile"
            className="w-12 h-12 rounded-full object-cover"
          />
          <div className="flex flex-col">
            <h3 className="font-semibold text-sm">
              {post.profile?.first_name || "User"} {post.profile?.last_name}
            </h3>
            <p className="font-light text-sm">{post.profile?.qualification || "User"}</p>
            {/* <div className="flex items-center gap-1">
                  <p>{formatTimeAgo(post.time_stamp)}</p>
                  <Clock className="w-3 h-3" />
                </div> */}
          </div>
        </div>
        <p>{post.body}</p>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Add an optional message..."
          rows={4}
          className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-[#5DA05D]"
        />

        <button
          onClick={handleRepost}
          className="mt-4 w-full bg-[#5DA05D] text-white py-2 rounded-md hover:bg-[#5DA05D] transition-colors"
        >
          Repost
        </button>
      </div>
    </div>
  );
}