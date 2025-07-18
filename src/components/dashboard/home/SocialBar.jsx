import { Bookmark, Copy, Ellipsis, EyeOff, FlagTriangleRight, Image, MessageCircle, MessageCircleIcon, RefreshCw, Smile, ThumbsUp, Upload, X } from "lucide-react";
import { useContext, useEffect, useState } from "react";
import { PostService } from "../../../api/PostService";
import { emojis } from "./Emoji";
import { UserContext } from "../../../context/UserContext";
import RepostModal from "./Repost";
import { toast } from "react-toastify";

export default function SocialBar({ post, fetchPosts, }) {
  const [isCommentsOpen, setIsCommentsOpen] = useState(false)

  const LikePost = async () => {
    try {
      await PostService.likePost({ post: post.post_id });
      fetchPosts();
    } catch (error) {
      console.log("could not like post");
    }
  }
  const UnlikePost = async () => {
    try {
      await PostService.unlikePost({ post: post.post_id });
      fetchPosts();
    } catch (error) {
      console.log("could not like post");
    }
  }
  const toggleComments = () => {
    setIsCommentsOpen(!isCommentsOpen)
  }

  const isPostLiked = post.can_like === false;

  return (
    <div>
      <div className="flex justify-between items-center w-full">
        <div className="flex items-center space-x-6">
          <button
            onClick={() => (isPostLiked ? UnlikePost() : LikePost())}
            className={`flex items-center space-x-2 transition-colors ${isPostLiked ? "text-[#5DA05D]" : "text-gray-500"
              }`}
          >
            <ThumbsUp scale={18} />
            <span className="text-sm font-medium">{post.like_count}</span>
          </button>

          <button
            onClick={toggleComments}
            className={`flex items-center space-x-2 transition-colors ${isCommentsOpen
              ? "text-[#5DA05D]"
              : "text-gray-600 hover:text-[#5DA05D]"
              }`}
          >
            <MessageCircle size={18} />
            <span className="text-sm font-medium">{post.comment_count}</span>
          </button>

          <button className="flex items-center space-x-2 text-gray-600 hover:text-[#5DA05D] transition-colors">
            <Upload />
            <span className="text-sm font-medium">2</span>
          </button>
        </div>

        <div className="flex items-center space-x-6 ml-auto">
          <button className="text-gray-600 hover:text-gray-800 transition-colors">
            <RepostCard post={post.post || post} />
          </button>

          <button className="text-gray-600 hover:text-gray-800 transition-colors">
            <DropdownMenu post={post.post || post} />
          </button>
        </div>
      </div>
      <CommentSection
        postId={(post.post || post).post_id}
        isOpen={isCommentsOpen}
        post={post}
      />
    </div>
  );
}
function RepostCard({ post }) {
  const [isRepostOpen, setIsRepostOpen] = useState(false);

  const handleRepost = (postId, message) => {
    console.log("Reposting post:", postId, "with message:", message);
  };

  return (
    <div>
      <button
        onClick={() => setIsRepostOpen(true)}
      >
        <RefreshCw />
      </button>

      <RepostModal
        isOpen={isRepostOpen}
        onClose={() => setIsRepostOpen(false)}
        onRepost={handleRepost}
        post={post}
      />
    </div>
  );
}
// const DropdownMenu = ({ post }) => {
//   const [isOpen, setIsOpen] = useState(false);

//   const handleSave = async () => {
//     try {
//       const isSaved = await PostService.savePost({ post: post.post_id })
//       //const isSaved = await PostService.savePost({ post: postId })
//       if (isSaved) {
//         toast.success("Post saved");
//         setIsOpen(false);
//       }
//     } catch (error) {
//       toast.error("Could not toggle save");
//       console.log("could not save this post", error);
//     }
//   }
//   const savedpost = post.is_saved === true
//   const icons = [
//     { name: 'Save', icon: <Bookmark size={18} onClick={() => { handleSave() }} />, },
//     { name: 'Copy link', icon: <Copy size={18} />, },
//     { name: 'Not Interested', icon: <EyeOff size={18} />, },
//     { name: 'Unfollow', icon: <X /> },
//     { name: 'Report Post', icon: <FlagTriangleRight /> },
//   ]
//   return (
//     <div className="relative inline-block text-left">
//       {/* Ellipsis Button */}
//       <button
//         onClick={() => setIsOpen(!isOpen)}
//         className="p-2 rounded-full hover:bg-green-100"
//       >
//         <Ellipsis size={26} />
//       </button>

//       {/* Dropdown Content */}
//       {isOpen && (
//         <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-300 rounded-md shadow-lg">
//           <ul className="py-1">
//             {icons.map((item) => (
//               <li key={item.name}>
//                 <a
//                   href="#"
//                   className="flex items-center gap-3 px-4 py-2 text-gray-700 hover:bg-green-100"
//                 >
//                   {item.icon}
//                   {item.name}
//                 </a>
//               </li>
//             ))}
//           </ul>
//         </div>
//       )}
//     </div>
//   );
// };

const DropdownMenu = ({ post }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isSaved, setIsSaved] = useState(post.is_saved); // ✅ from backend

  const handleSave = async () => {
    if (isSaved) {
      // Already saved, do nothing
      return;
    }
    try {
      await PostService.savePost({ post: post.post_id });
      toast.success("Post saved successfully");
      setIsSaved(true); // update local state
      setIsOpen(false);
    } catch (error) {
      toast.error("Could not save post");
      console.error("Save failed:", error);
    }
  };

  const icons = [
    {
      name: isSaved ? "Saved" : "Save",
      icon: (
        <Bookmark
          size={18}
          onClick={handleSave}
          className={isSaved ? "text-green-600 cursor-not-allowed" : "text-gray-600 cursor-pointer"}
        />
      ),
    },
    { name: "Copy link", icon: <Copy size={18} /> },
    { name: "Not Interested", icon: <EyeOff size={18} /> },
    { name: "Unfollow", icon: <X /> },
    { name: "Report Post", icon: <FlagTriangleRight /> },
  ];

  return (
    <div className="relative inline-block text-left">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 rounded-full hover:bg-green-100"
      >
        <Ellipsis size={26} />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-300 rounded-md shadow-lg">
          <ul className="py-1">
            {icons.map((item) => (
              <li key={item.name}>
                <a
                  href="#"
                  className={`flex items-center gap-3 px-4 py-2 ${isSaved && item.name === "Saved"
                      ? "text-[#5DA05D] cursor-not-allowed"
                      : "text-gray-700 hover:bg-green-100"
                    }`}
                  onClick={item.name === "Saved" ? (e) => e.preventDefault() : undefined}
                >
                  {item.icon}
                  {item.name}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};


function CommentSection({ isOpen, postId }) {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [openReplies, setOpenReplies] = useState({});
  const [replyTexts, setReplyTexts] = useState({});
  const [isEmojiModalOpen, setIsEmojiModalOpen] = useState(false);
  const { user } = useContext(UserContext);
  const [media, setMedia] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);

  useEffect(() => {
    if (isOpen && postId) loadComments();
  }, [isOpen, postId]);

  const loadComments = async () => {
    try {
      const res = await PostService.getComment(postId);
      if (res?.success) {
        setComments(res.data);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handlePostComment = async () => {
    if (!newComment.trim()) return;
    try {
      await PostService.comment({ post: postId, body: newComment, media: media });
      setNewComment("");
      setMedia(null);
      setPreviewUrl(null);
      await loadComments();
    } catch (err) {
      console.error(err);
    }
  };
  const handleMediaUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setMedia(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };
  const likeComment = async (commentId) => {
    try {
      await PostService.likeCommentOrReply({ comment: commentId });
      await loadComments();
    } catch (err) {
      console.error("Could not like comment", err);
    }
  };

  const unlikeComment = async (commentId) => {
    try {
      await PostService.unlikeCommentOrReply({ comment: commentId });
      await loadComments();
    } catch (err) {
      console.error("Could not unlike comment", err);
    }
  };
  const toggleReply = (commentId) => {
    setOpenReplies((prev) => ({
      ...prev,
      [commentId]: !prev[commentId],
    }));
  };

  const handleReplyTextChange = (commentId, text) => {
    setReplyTexts((prev) => ({
      ...prev,
      [commentId]: text,
    }));
  };

  const handleEmojiSelect = (emoji) => {
    setNewComment((prev) => prev + emoji);
    setIsEmojiModalOpen(false);
  };

  const submitReply = async (parentCommentId) => {
    const replyText = replyTexts[parentCommentId];
    if (!replyText?.trim()) return;

    try {
      await PostService.reply({
        post: postId,
        body: replyText,
        parent: parentCommentId,
      });

      setReplyTexts((prev) => ({ ...prev, [parentCommentId]: "" }));
      setOpenReplies((prev) => ({ ...prev, [parentCommentId]: false }));

      await loadComments();
    } catch (err) {
      console.error("Failed to post reply", err);
    }
  };

  return (
    <div
      className={`overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? "max-h-[600px] opacity-100" : "max-h-0 opacity-0"
        }`}
    >
      <div className="bg-white border border-gray-200 rounded-lg mt-2 p-4 max-h-[600px] overflow-y-auto">
        {/* Add Comment Input */}
        <div className="flex items-start space-x-3 mb-4">
          <img src={user.profile_photo} alt="Your avatar" className="w-10 h-10 rounded-full" />
          <div className="flex-1">
            <div className="flex items-center space-x-2 bg-gray-50 rounded-lg px-3 py-2">
              <input
                type="text"
                placeholder="Add a comment..."
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handlePostComment()}
                className="flex-1 bg-transparent text-sm rounded-lg border border-gray-200 focus:outline-none focus:ring-0 focus:border-[#5DA05D]"
              />
              <button
                className="text-gray-500 hover:text-gray-700"
                onClick={() => setIsEmojiModalOpen(true)}
              >
                <Smile size={16} />
              </button>
              <label className="text-gray-400 hover:text-gray-600">
                <input type="file" className="hidden" multiple={false} onChange={handleMediaUpload} />
                <Image size={18} />
              </label>
              {previewUrl && (
                <div className="mt-2 relative">
                  <img src={previewUrl} alt="Selected media" className="w-24 h-14 object-cover rounded-md border" />
                  <button
                    onClick={() => {
                      setMedia(null);
                      setPreviewUrl(null);
                    }}
                    className="absolute top-0 right-0 bg-red-500 text-white px-1 rounded-full text-xs"
                  >
                    ✕
                  </button>
                </div>
              )}
            </div>
            <div className="flex justify-end mt-2">
              <button
                onClick={handlePostComment}
                className="bg-[#5DA05D] text-white px-4 py-1 rounded-full text-sm font-medium"
              >
                Comment
              </button>
            </div>
          </div>
        </div>

        {/* Emoji Modal */}
        {isEmojiModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg w-80 p-6 relative">
              <button
                onClick={() => setIsEmojiModalOpen(false)}
                className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
              >
                <X />
              </button>
              <h3 className="text-lg font-semibold mb-4">Select an Emoji</h3>
              <div className="grid grid-cols-5 gap-2">
                {emojis.map((emoji, index) => (
                  <button
                    key={index}
                    onClick={() => handleEmojiSelect(emoji)}
                    className="text-2xl hover:bg-gray-200 rounded-full w-10 h-10 flex items-center justify-center"
                  >
                    {emoji}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Comments */}
        <div className="space-y-4">
          {comments.map((comment) => (
            <div key={comment.comment_id} className="space-y-3">
              <div className="flex items-start space-x-3">
                <img
                  src={comment.commenter?.profile_picture || "/images/profile-img2.png"}
                  alt={comment.commenter?.first_name}
                  className="w-10 h-10 rounded-full"
                />
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-1">
                    <h4 className="font-semibold text-sm">
                      {comment.commenter?.first_name} {comment.commenter?.last_name}
                    </h4>
                    <span className="text-xs text-gray-500">{new Date(comment.time_stamp).toLocaleString()}</span>
                  </div>
                  <p className="text-sm text-gray-800 mb-2">{comment.body}</p>
                  {comment.media !== "N/A" && (
                    <img
                      src={comment.media}
                      alt="Comment Media"
                      className="mt-2 mb-1 rounded-md w-24 h-14"
                    />
                  )}
                  <div className="flex items-center space-x-4">
                    <button
                      type="button"
                      onClick={() =>
                        comment.can_like === false
                          ? unlikeComment(comment.comment_id)
                          : likeComment(comment.comment_id)
                      }
                      className={`flex items-center space-x-1 text-xs ${comment.can_like === false
                        ? "text-green-600"
                        : "text-gray-500"
                        }`}
                    >
                      <ThumbsUp size={16} />
                      <span>{comment.likes || 0}</span>
                    </button>
                    <button
                      onClick={() => toggleReply(comment.comment_id)}
                      className="text-gray-500 hover:text-[#5DA05D] text-xs flex gap-1"
                    >
                      <MessageCircleIcon size={16} /> Reply
                    </button>
                  </div>
                </div>
              </div>

              {openReplies[comment.comment_id] && (
                <div className="ml-12 flex items-start space-x-3">
                  <img src={user.profile_photo} alt="Your avatar" className="w-8 h-8 rounded-full" />
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 bg-gray-50 rounded-lg px-3 py-2">
                      <input
                        type="text"
                        placeholder="Write a reply..."
                        value={replyTexts[comment.comment_id] || ""}
                        onChange={(e) => handleReplyTextChange(comment.comment_id, e.target.value)}
                        onKeyPress={(e) => e.key === "Enter" && submitReply(comment.comment_id)}
                        className="flex-1 bg-transparent text-sm rounded-lg border border-gray-200 focus:outline-none focus:ring-0 focus:border-[#5DA05D]"
                      />
                    </div>
                    <div className="flex justify-end mt-2 space-x-2">
                      <button
                        onClick={() => toggleReply(comment.comment_id)}
                        className="text-gray-500 hover:text-gray-700 px-3 py-1 rounded-full text-xs"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={() => submitReply(comment.comment_id)}
                        className="bg-[#5DA05D] text-white px-3 py-1 rounded-full text-xs font-medium"
                      >
                        Reply
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* Replies */}
              {comment.replies?.length > 0 && (
                <div className="ml-24 space-y-3">
                  {comment.replies.map((reply) => (
                    <div key={reply.comment_id} className="flex items-start space-x-3">
                      <img
                        src={reply.commenter?.profile_picture || "/images/profile-img5.png"}
                        alt={reply.commenter?.first_name}
                        className="w-8 h-8 rounded-full"
                      />
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-1">
                          <h4 className="font-semibold text-sm">
                            {reply.commenter?.first_name} {reply.commenter?.last_name}
                          </h4>
                          <span className="text-xs text-gray-500">
                            {new Date(reply.time_stamp).toLocaleString()}
                          </span>
                        </div>
                        <p className="text-sm text-gray-800 mb-2">{reply.body}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

