import { ThumbsUp, MessageCircle, Upload, Bookmark, RefreshCw, Ellipsis, Copy, EyeOff, X, FlagTriangleRight } from "lucide-react"
import { useState } from "react";


export function SocialInteractionBar({
  likes = 0,
  comments = 0,
  shares = 0,
  showSave = true,
  showRepost = true,
}) {
  return (
    <div className="flex  mt-3 justify-between">
      <div className="flex">
        <div className="flex gap-2 justify-center items-center mr-5 hover:bg-green-100 hover:p-2 rounded-lg">
          <ThumbsUp size={18} /> {likes} <span className="hidden lg:block"></span>
        </div>
        <div className="flex gap-2 justify-center items-center mr-5 hover:bg-green-100 hover:p-2 rounded-lg">
          <MessageCircle size={18} /> {comments} <span className="hidden lg:block"></span>
        </div>
        <div className="flex gap-2 justify-center items-center mr-5 hover:bg-green-100 hover:p-2 rounded-lg">
          <Upload size={18} /> {shares} <span className="hidden lg:block"></span>
        </div>
      </div>

      <div className="flex gap-5">
        {showRepost && (
          <div className="flex gap-2 justify-center items-center hover:bg-green-100 hover:p-2 rounded-lg">
            <RefreshCw size={18} /> <span className="hidden lg:block"></span>
          </div>
        )}
        {showSave && (
          <div className="flex gap-2 justify-center items-center mr-5">
            <DropdownMenu />
          </div>
        )}
      </div>
    </div>
  )
}
const DropdownMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const icons=[
    { name: 'Save', icon: <Bookmark size={18} />, },
    { name: 'Copy link', icon: <Copy size={18} />, },
    { name: 'Not Interested', icon: <EyeOff size={18} />, },
    { name: 'Unfollow', icon: <X/> },
    { name: 'Report Post', icon: <FlagTriangleRight/> },
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