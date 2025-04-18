import { ThumbsUp, MessageCircle, Upload, Bookmark, RefreshCw } from "lucide-react"


export function SocialInteractionBar({
  likes = 0,
  comments = 0,
  shares = 0,
  showSave = true,
  showRepost = true,
}) {
  return (
    <div className="flex  mt-3">
      <div className="flex gap-2 justify-center items-center mr-5">
        <ThumbsUp size={18} /> {likes} <span className="hidden lg:block">likes</span>
      </div>
      <div className="flex gap-2 justify-center items-center mr-5">
        <MessageCircle size={18} /> {comments} <span className="hidden lg:block">comments</span>
      </div>
      <div className="flex gap-2 justify-center items-center mr-5 ">
        <Upload size={18} /> {shares} <span className="hidden lg:block">shares</span>
      </div>
      {showSave && (
        <div className="flex gap-2 justify-center items-center mr-5">
          <Bookmark size={18} /> <span className="hidden lg:block">Save</span>
        </div>
      )}
      {showRepost && (
        <div className="flex gap-2 justify-center items-center">
          <RefreshCw size={18} /> <span className="hidden lg:block">Repost</span>
        </div>
      )}
    </div>
  )
}
