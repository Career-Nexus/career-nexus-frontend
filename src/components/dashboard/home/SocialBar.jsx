import { Bookmark, Copy, Ellipsis, EyeOff, FlagTriangleRight, Image, MessageCircle, RefreshCw, ThumbsUp, Upload, X } from "lucide-react";
import { useState } from "react";
// import { useState } from "react";

// const SocialBar = () => {
//     const socialData = [
//         { icon: <ThumbsUp size={18}/>, count: 125, color: "text-blue-600 hover:text-blue-800" },
//         { icon: <CommentSection/>, count: 25, color: "text-gray-600 hover:text-gray-800" },
//         { icon: <Upload size={18}/>, count: 2, color: "text-gray-600 hover:text-gray-800" },

//     ];
//     const social = [
//         { icon: <RefreshCw size={18}/>, count: null, color: "text-gray-600 hover:text-gray-800" },
//         { icon: <DropdownMenu />, count: null, color: "text-gray-600 hover:text-gray-800" },
//     ]
//     return (
//         <div className="flex items-center justify-between space-x-4 p-2">
//             <div className="flex items-center space-x-4 p-2">
//                 {socialData.map((item, index) => (
//                     <button key={index} className={item.color}>
//                         <button>{item.icon}</button>
//                         {item.count && <span className="ml-1">{item.count}</span>}
//                     </button>
//                 ))}
//             </div>
//             <div className="flex items-center space-x-4 p-2">
//                 {social.map((item, index) => (
//                     <button key={index} className={item.color}>
//                         <button>{item.icon}</button>
//                         {item.count && <span className="ml-1">{item.count}</span>}
//                     </button>
//                 ))}
//             </div>
//         </div>
//     );
// };

// export default SocialBar;

const DropdownMenu = () => {
    const [isOpen, setIsOpen] = useState(false);
    const icons = [
        { name: 'Save', icon: <Bookmark size={18} />, },
        { name: 'Copy link', icon: <Copy size={18} />, },
        { name: 'Not Interested', icon: <EyeOff size={18} />, },
        { name: 'Unfollow', icon: <X /> },
        { name: 'Report Post', icon: <FlagTriangleRight /> },
    ]
    return (
        <div className="relative inline-block text-left">
            {/* Ellipsis Button */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="p-2 rounded-full hover:bg-green-100"
            >
                <Ellipsis size={26} />
            </button>

            {/* Dropdown Content */}
            {isOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-300 rounded-md shadow-lg">
                    <ul className="py-1">
                        {icons.map((item) => (
                            <li key={item.name}>
                                <a
                                    href="#"
                                    className="flex items-center gap-3 px-4 py-2 text-gray-700 hover:bg-green-100"
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



export default function SocialBar() {
  const [isCommentsOpen, setIsCommentsOpen] = useState(false)

  const toggleComments = () => {
    setIsCommentsOpen(!isCommentsOpen)
  }

  return (
    <div>
      <div className="flex items-center justify-between p-2">
        <div className="flex items-center space-x-6">
          <button className="flex items-center space-x-2 text-gray-600 hover:text-blue-600 transition-colors">
            <ThumbsUp scale={18}/>
            <span className="text-sm font-medium">125</span>
          </button>
          <button
            onClick={toggleComments}
            className={`flex items-center space-x-2 transition-colors ${
              isCommentsOpen ? "text-green-600" : "text-gray-600 hover:text-green-600"
            }`}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
            </svg>
            <span className="text-sm font-medium">25</span>
          </button>
          <button className="flex items-center space-x-2 text-gray-600 hover:text-purple-600 transition-colors">
            <Upload/>
            <span className="text-sm font-medium">2</span>
          </button>
        </div>

        <div className="flex items-center space-x-6">
          <button className="text-gray-600 hover:text-gray-800 transition-colors">
            <RefreshCw/>
          </button>

          <button className="text-gray-600 hover:text-gray-800 transition-colors">
            <DropdownMenu/>
          </button>
        </div>
      </div>

      <CommentSection isOpen={isCommentsOpen} />
    </div>
  )
}

function CommentSection({ isOpen, commentCount }) {
  const [openReplies, setOpenReplies] = useState({})
  const [replyTexts, setReplyTexts] = useState({})
  const [comments, setComments] = useState([
    {
      id: 1,
      author: "Mirabel Huston",
      title: "Ux Mentor, Google certified Ux designer",
      content:
        "This is a really insightful post! It's vital to recognize the dual impact of technology—how it both enhances efficiency and poses challenges to the environment and workforce.",
      timestamp: "2d",
      likes: 126,
      replies: [],
    },
    {
      id: 2,
      author: "Eric Moore",
      title: "Ux Mentor, Google certified Ux designer",
      content: "Matthew Kunle Complacency kills growth stepping beyond comfort is where real progress begins!",
      timestamp: "1hr",
      likes: 126,
      replies: [
        {
          id: 21,
          author: "Matthew Kunle",
          title: "Product Designer",
          content: "Thanks for the mention! Absolutely agree - growth happens outside our comfort zones.",
          timestamp: "45m",
          likes: 12,
        },
      ],
    },
  ])
  const [newComment, setNewComment] = useState("")

  const toggleReply = (commentId) => {
    setOpenReplies((prev) => ({
      ...prev,
      [commentId]: !prev[commentId],
    }))
  }

  const handleReplyTextChange = (commentId, text) => {
    setReplyTexts((prev) => ({
      ...prev,
      [commentId]: text,
    }))
  }

  const submitReply = (commentId) => {
    const replyText = replyTexts[commentId]
    if (!replyText?.trim()) return

    const newReply = {
      id: Date.now(),
      author: "You",
      title: "User",
      content: replyText,
      timestamp: "now",
      likes: 0,
    }

    setComments((prev) =>
      prev.map((comment) =>
        comment.id === commentId ? { ...comment, replies: [...comment.replies, newReply] } : comment,
      ),
    )

    setReplyTexts((prev) => ({ ...prev, [commentId]: "" }))
    setOpenReplies((prev) => ({ ...prev, [commentId]: false }))
  }

  const submitComment = () => {
    if (!newComment.trim()) return

    const comment = {
      id: Date.now(),
      author: "You",
      title: "User",
      content: newComment,
      timestamp: "now",
      likes: 0,
      replies: [],
    }

    setComments((prev) => [comment, ...prev])
    setNewComment("")
  }

  const likeComment = (commentId, isReply = false, parentId = null) => {
    if (isReply) {
      setComments((prev) =>
        prev.map((comment) =>
          comment.id === parentId
            ? {
                ...comment,
                replies: comment.replies.map((reply) =>
                  reply.id === commentId ? { ...reply, likes: reply.likes + 1 } : reply,
                ),
              }
            : comment,
        ),
      )
    } else {
      setComments((prev) =>
        prev.map((comment) => (comment.id === commentId ? { ...comment, likes: comment.likes + 1 } : comment)),
      )
    }
  }

  // Calculate total comments including replies
  const totalComments = comments.length + comments.reduce((acc, c) => acc + c.replies.length, 0)

  return (
    <div
      className={`overflow-hidden transition-all duration-300 ease-in-out ${
        isOpen ? "max-h-[600px] opacity-100" : "max-h-0 opacity-0"
      }`}
    >
      <div className="bg-white border border-gray-200 rounded-lg mt-2 p-4 max-h-[600px] overflow-y-auto">
        {/* Add Comment Input */}
        <div className="flex items-start space-x-3 mb-4">
          <img src="/images/profile-img4.png" alt="Your avatar" className="w-10 h-10 rounded-full" />
          <div className="flex-1">
            <div className="flex items-center space-x-2 bg-gray-50 rounded-lg px-3 py-2">
              <input
                type="text"
                placeholder="Add a comment...."
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && submitComment()}
                className="flex-1 bg-transparent outline-none text-sm rounded-lg"
              />
              <button className="text-gray-400 hover:text-gray-600">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <circle cx="12" cy="12" r="10" />
                  <path d="M8 14s1.5 2 4 2 4-2 4-2" />
                  <line x1="9" y1="9" x2="9.01" y2="9" />
                  <line x1="15" y1="9" x2="15.01" y2="9" />
                </svg>
              </button>
              <button className="text-gray-400 hover:text-gray-600">
                <Image/>
              </button>
            </div>
            <div className="flex justify-end mt-2">
              <button
                onClick={submitComment}
                className="bg-[#5DA05D] hover:bg-[#5DA05D] text-white px-4 py-1 rounded-full text-sm font-medium transition-colors"
              >
                Comment
              </button>
            </div>
          </div>
        </div>

        {/* Existing Comments */}
        <div className="space-y-4">
          {comments.map((comment) => (
            <div key={comment.id} className="space-y-3">
              {/* Main Comment */}
              <div className="flex items-start space-x-3">
                <img
                  src="/images/profile-img2.png"
                  alt={comment.author}
                  className="w-10 h-10 rounded-full"
                />
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-1">
                    <h4 className="font-semibold text-sm">{comment.author}</h4>
                    <span className="text-xs text-gray-500">{comment.timestamp}</span>
                  </div>
                  <p className="text-xs text-gray-600 mb-1">{comment.title}</p>
                  <p className="text-sm text-gray-800 mb-2">{comment.content}</p>
                  <div className="flex items-center space-x-4">
                    <button
                      onClick={() => likeComment(comment.id)}
                      className="flex items-center space-x-1 text-gray-500 hover:text-blue-600 text-xs"
                    >
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.5"
                      >
                        <path d="M7 10v12l4-2 4 2V10M7 10l4-7 4 7M7 10h8" />
                      </svg>
                      <span>{comment.likes}</span>
                    </button>
                    <button
                      onClick={() => toggleReply(comment.id)}
                      className="text-gray-500 hover:text-green-600 text-xs"
                    >
                      Reply
                    </button>
                  </div>
                </div>
              </div>

              {/* Reply Input */}
              {openReplies[comment.id] && (
                <div className="ml-12 flex items-start space-x-3">
                  <img src="/images/profile-img5.png" alt="Your avatar" className="w-8 h-8 rounded-full" />
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 bg-gray-50 rounded-lg px-3 py-2">
                      <input
                        type="text"
                        placeholder="Write a reply..."
                        value={replyTexts[comment.id] || ""}
                        onChange={(e) => handleReplyTextChange(comment.id, e.target.value)}
                        onKeyPress={(e) => e.key === "Enter" && submitReply(comment.id)}
                        className="flex-1 bg-transparent outline-none text-sm rounded-lg"
                      />
                      <button className="text-gray-400 hover:text-gray-600">
                        <svg
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1.5"
                        >
                          <circle cx="12" cy="12" r="10" />
                          <path d="M8 14s1.5 2 4 2 4-2 4-2" />
                          <line x1="9" y1="9" x2="9.01" y2="9" />
                          <line x1="15" y1="9" x2="15.01" y2="9" />
                        </svg>
                      </button>
                    </div>
                    <div className="flex justify-end mt-2 space-x-2">
                      <button
                        onClick={() => toggleReply(comment.id)}
                        className="text-gray-500 hover:text-gray-700 px-3 py-1 rounded-full text-xs"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={() => submitReply(comment.id)}
                        className="bg-[#5DA05D] hover:bg-[#5DA05D] text-white px-3 py-1 rounded-full text-xs font-medium transition-colors"
                      >
                        Reply
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* Nested Replies */}
              {comment.replies.length > 0 && (
                <div className="ml-12 space-y-3">
                  {comment.replies.map((reply) => (
                    <div key={reply.id} className="flex items-start space-x-3">
                      <img
                        src="/images/profile-img5.png"
                        alt={reply.author}
                        className="w-8 h-8 rounded-full"
                      />
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-1">
                          <h4 className="font-semibold text-sm">{reply.author}</h4>
                          <span className="text-xs text-gray-500">{reply.timestamp}</span>
                        </div>
                        <p className="text-xs text-gray-600 mb-1">{reply.title}</p>
                        <p className="text-sm text-gray-800 mb-2">{reply.content}</p>
                        <div className="flex items-center space-x-4">
                          <button
                            onClick={() => likeComment(reply.id, true, comment.id)}
                            className="flex items-center space-x-1 text-gray-500 hover:text-blue-600 text-xs"
                          >
                            <svg
                              width="14"
                              height="14"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="1.5"
                            >
                              <path d="M7 10v12l4-2 4 2V10M7 10l4-7 4 7M7 10h8" />
                            </svg>
                            <span>{reply.likes}</span>
                          </button>
                          <button className="text-gray-500 hover:text-[#5DA05D] text-xs">Reply</button>
                        </div>
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
  )
}
