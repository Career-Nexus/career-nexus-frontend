// import { useToast } from "@chakra-ui/react";
// import { ThumbsUp, MessageCircle, Upload, Bookmark, RefreshCw, Ellipsis, Copy, EyeOff, X, FlagTriangleRight } from "lucide-react"
// import { useEffect, useState } from "react";
// import { PostService } from "../../../api/PostService";


// export function SocialInteractionBar({
//   postId,
//   likes = 0,
//   comments = 0,
//   shares = 0,
//   showSave = true,
//   showRepost = true,
//   onLikeUpdate,
// }) {
//   const [isLiked, setIsLiked] = useState(false)
//   const [likesCount, setLikesCount] = useState(likes)
//   const [isLoading, setIsLoading] = useState(false)
//   const toast = useToast()

//   // Check if the current user has liked this post
//   useEffect(() => {
//     if (!postId) return

//     async function checkLikeStatus() {
//       try {
//         // const liked = await PostService.checkLikeStatus(postId)
//         setIsLiked()
//       } catch (error) {
//         console.error("Error checking like status:", error)
//       }
//     }

//     checkLikeStatus()
//   }, [postId])

//   const handleLikeClick = async () => {
//     if (isLoading || !postId) return

//     try {
//       setIsLoading(true)

//       // Optimistically update UI
//       const newIsLiked = !isLiked
//       setIsLiked(newIsLiked)

//       // Update likes count optimistically
//       const newLikesCount = newIsLiked ? likesCount + 1 : likesCount - 1
//       setLikesCount(newLikesCount)

//       // Call API to toggle like status
//       // await PostService.toggleLike(postId, isLiked)

//       // Notify parent component about the update if callback exists
//       if (onLikeUpdate) {
//         onLikeUpdate(newLikesCount)
//       }
//     } catch (error) {
//       // Revert optimistic updates on error
//       setIsLiked(!isLiked)
//       setLikesCount(isLiked ? likesCount + 1 : likesCount - 1)

//       toast({
//         title: "Error",
//         description: "Failed to update like status. Please try again.",
//         status: "error",
//         duration: 3000,
//         isClosable: true,
//       })

//       console.error("Error toggling like:", error)
//     } finally {
//       setIsLoading(false)
//     }
//   }

//   return (
//     <div className="flex mt-3 justify-between">
//       <div className="flex">
//         <button
//           onClick={handleLikeClick}
//           disabled={isLoading}
//           className={`flex gap-2 justify-center items-center mr-5 hover:bg-green-100 hover:p-2 rounded-lg transition-all ${
//             isLiked ? "text-green-600" : ""
//           }`}
//         >
//           <ThumbsUp size={18} className={isLiked ? "fill-current" : ""} /> {likesCount}{" "}
//           <span className="hidden lg:block"></span>
//         </button>
//         <div className="flex gap-2 justify-center items-center mr-5 hover:bg-green-100 hover:p-2 rounded-lg">
//           <MessageCircle size={18} /> {comments} <span className="hidden lg:block"></span>
//         </div>
//         <div className="flex gap-2 justify-center items-center mr-5 hover:bg-green-100 hover:p-2 rounded-lg">
//           <Upload size={18} /> {shares} <span className="hidden lg:block"></span>
//         </div>
//       </div>

//       <div className="flex gap-5">
//         {showRepost && (
//           <div className="flex gap-2 justify-center items-center hover:bg-green-100 hover:p-2 rounded-lg">
//             <RefreshCw size={18} /> <span className="hidden lg:block"></span>
//           </div>
//         )}
//         {showSave && (
//           <div className="flex gap-2 justify-center items-center mr-5">
//             <DropdownMenu />
//           </div>
//         )}
//       </div>
//     </div>
//   )
// }
// const DropdownMenu = () => {
//   const [isOpen, setIsOpen] = useState(false);
//   const icons=[
//     { name: 'Save', icon: <Bookmark size={18} />, },
//     { name: 'Copy link', icon: <Copy size={18} />, },
//     { name: 'Not Interested', icon: <EyeOff size={18} />, },
//     { name: 'Unfollow', icon: <X/> },
//     { name: 'Report Post', icon: <FlagTriangleRight/> },
//     ]
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