import { useContext, useEffect, useState } from "react"
import { SocialInteractionBar } from "./SocialInteractionBar"
import { ChevronDown, ChevronUp, Plus } from "lucide-react"
import { Clock } from "../../../icons/icon"
import { Spinner, Alert, AlertIcon, Box } from "@chakra-ui/react"
import { PostService } from "../../../api/PostService"
import { UserContext } from "../../../context/UserContext"
import SocialBar from "./SocialBar"
// import { toast } from 'react-toastify'; // Optional: for user feedback
// import 'react-toastify/dist/ReactToastify.css';

export default function TabInterface() {
  const [activeTab, setActiveTab] = useState("all")

  return (
    <div className="w-full max-w-4xl mx-auto pt-4">
      <div className="flex bg-gray-100 p-1 rounded-lg mb-4">
        <button
          type="button"
          className={`w-full px-6 py-2 text-sm font-medium rounded-lg ${activeTab === 'all' ? 'bg-white shadow' : 'bg-gray-100 text-gray-500'}`}
          onClick={() => setActiveTab('all')}
        >
          ALL
        </button>
        <button
          type="button"
          className={`w-full px-6 py-2 text-sm font-medium rounded-lg ${activeTab === 'following' ? 'bg-white shadow' : 'bg-gray-100 text-gray-500'}`}
          onClick={() => setActiveTab('following')}
        >
          FOLLOWING
        </button>
        <button
          type="button"
          className={`w-full px-6 py-2 text-sm font-medium rounded-lg ${activeTab === 'mentors' ? 'bg-white shadow' : 'bg-gray-100 text-gray-500'}`}
          onClick={() => setActiveTab('mentors')}
        >
          MENTORS
        </button>
      </div>

      <div className="mt-6">
        {activeTab === "all" && <AllTemplate />}
        {activeTab === "following" && <FollowingTemplate />}
        {activeTab === "mentors" && <MentorsTemplate />}
      </div>
    </div>
  )
}

function AllTemplate() {
  const [expandedItems, setExpandedItems] = useState({});
const [posts, setPosts] = useState([]);
const [loading, setLoading] = useState(true);
const [error, setError] = useState(null);
const [followingUsers, setFollowingUsers] = useState(new Set());
const [followLoading, setFollowLoading] = useState(new Set());

const { user } = useContext(UserContext);

// Fetch posts on mount
useEffect(() => {
  const fetchPosts = async () => {
    setLoading(true);
    try {
      const data = await PostService.getPosts();
      const fetchedPosts = Array.isArray(data) ? data : data?.results || [];
      setPosts(fetchedPosts);
      setError(null);
    } catch (err) {
      console.error("Error fetching posts:", err);
      setError("Failed to load posts. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  fetchPosts();
}, []);

// Toggle expand post
const toggleExpand = (id) => {
  setExpandedItems((prev) => ({
    ...prev,
    [id]: !prev[id],
  }));
};

// Handle follow logic
const handleFollow = async (userId) => {
  if (!userId || user?.id === userId) {
    setError("Cannot follow yourself");
    setTimeout(() => setError(null), 3000);
    return;
  }

  if (followingUsers.has(userId)) {
    setError("You are already following this user");
    setTimeout(() => setError(null), 3000);
    return;
  }

  try {
    setFollowLoading((prev) => new Set([...prev, userId]));
    const response = await PostService.Follow({ user_following: userId });

    console.log("Follow response:", response);
    setFollowingUsers((prev) => new Set([...prev, userId]));
    setError(null);
  } catch (error) {
    const message = error.response?.data?.error?.[0] || "Failed to follow user. Please try again.";
    setError(message);
    console.error("Follow error:", message);
    setTimeout(() => setError(null), 3000);
  } finally {
    setFollowLoading((prev) => {
      const updatedSet = new Set(prev);
      updatedSet.delete(userId);
      return updatedSet;
    });
  }
};
  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="200px">
        <Spinner size="lg" color="#5DA05D" thickness="4px" />
      </Box>
    )
  }

  if (error) {
    return (
      <Alert status="error" borderRadius="md" my={4}>
        <AlertIcon />
        {error}
      </Alert>
    )
  }

  if (posts.length === 0) {
    return (
      <Box textAlign="center" py={10}>
        <p className="text-gray-500 text-lg">No posts available. Be the first to post!</p>
      </Box>
    )
  }

  return (
    <div>
      {posts.map((post) => {
        const userId = post.profile?.user_id || post.user_id || post.profile?.id
        const isFollowing = followingUsers.has(userId)
        const isFollowLoading = followLoading.has(userId)

        return (
          <div key={post.post_id} className="border border-gray-300 rounded-lg p-4 my-5">
            <div className="flex gap-3 mb-2 items-center">
              <img
                src={post.profile?.profile_photo || "/images/profile.png"}
                alt="profile"
                className="w-12 h-12 rounded-full object-cover"
              />

              <div className="flex flex-col justify-center">
                <h3 className="font-semibold text-sm">
                  {post.profile?.first_name || "User"} {post.profile?.last_name}
                </h3>
                <p className="font-light text-sm">{post.profile?.qualification || "User"}</p>
                <div className="flex items-center gap-1">
                  <p>{formatTimeAgo(post.time_stamp)}</p>
                  <Clock className="w-3 h-3" />
                </div>
              </div>
              {userId !== user?.id && (
                <button
                  className={`flex justify-center items-center gap-1 border ml-auto px-3 py-1 rounded-lg text-xs transition-colors ${isFollowing
                    ? "text-gray-500 border-gray-500 bg-gray-50"
                    : "text-[#5DA05D] border-[#5DA05D] hover:bg-[#5DA05D] hover:text-white"
                    }`}
                  onClick={() => handleFollow(userId)}
                  disabled={isFollowing || isFollowLoading}
                >
                  {isFollowLoading ? <Spinner size="xs" /> : <Plus className="w-4 h-4" />}
                  {isFollowing ? "Following" : "Follow"}
                </button>
              )}
            </div>

            <p className="mb-3">{post.body}</p>

            {post.body && post.body.length > 20 && (
              <button
                onClick={() => toggleExpand(post.post_id)}
                className="text-[#5DA05D] hover:text-blue-700 ml-1 text-sm font-medium inline-flex items-center"
              >
                {expandedItems[post.post_id] ? (
                  <>
                    <span className="text-[#5DA05D]">Hide</span>
                    <ChevronUp className="h-3 w-3 ml-0.5" />
                  </>
                ) : (
                  <>
                    <span className="text-[#5DA05D]">More</span>
                    <ChevronDown className="h-3 w-3 ml-0.5" />
                  </>
                )}
              </button>
            )}

            {expandedItems[post.post_id] && post.article && post.article !== "undefined" && (
              <div className="mt-2">
                <p className="text-sm">{post.article}</p>
              </div>
            )}

            <div className="mt-3 gap-1 grid grid-cols-12 border border-gray-200 p-2 rounded-lg">
              <div className="col-span-6 max-h-[300px]">
                {post.pic1 && post?.pic1 !== "N/A" && (
                  <img
                    src={post.pic1 || "/images/mentor-img2.png"}
                    alt="post media"
                    className="w-full h-full max-h-[348px] object-cover rounded-md"
                  />
                )}
              </div>
              <div className="col-span-6 max-h-[300px] flex flex-col gap-1">
                {post.pic2 && post.pic2 !== "N/A" && (
                  <img
                    src={post.pic2 || "/images/mentor-img2.png"}
                    alt="post media"
                    className="w-full h-full max-h-[150px] object-cover rounded-md"
                  />
                )}
                {post.pic3 && post.pic3 !== "N/A" && (
                  <img
                    src={post.pic3 || "/images/mentor-img2.png"}
                    alt="post media"
                    className="w-full h-full max-h-[150px] object-cover rounded-md"
                  />
                )}
              </div>
            </div>

            <div className="mt-3 grid grid-cols-12">
              <div className="col-span-12 max-h-[300px]">
                {post.video && post.video !== "N/A" && (
                  <div className="w-full h-full max-h-[348px] object-cover rounded-md">
                    <video src={post.video} controls />
                  </div>
                )}
              </div>
            </div>
            <SocialBar/>
          </div>
        )
      })}
    </div>
  )
}
// function AllTemplate() {
//   const [expandedItems, setExpandedItems] = useState({})
//   const [posts, setPosts] = useState([])
//   const [loading, setLoading] = useState(true)
//   const [error, setError] = useState(null)

//   // New state for follow functionality
//   const [followingUsers, setFollowingUsers] = useState(new Set())
//   const [followLoading, setFollowLoading] = useState(new Set())
//   const [likedPosts, setLikedPosts] = useState(new Set())
//   const { user } = useContext(UserContext);

//   useEffect(() => {
//     async function fetchPosts() {
//       try {
//         setLoading(true)
//         const data = await PostService.getPosts()
//         const fetchedPosts = Array.isArray(data) ? data : data.results || []
//         setPosts(fetchedPosts)
//         setError(null)
//       } catch (err) {
//         console.error("Error fetching posts:", err)
//         setError("Failed to load posts. Please try again later.")
//       } finally {
//         setLoading(false)
//       }
//     }

//     fetchPosts()
//   }, [])

//   const toggleExpand = (id) => {
//     setExpandedItems((prev) => ({
//       ...prev,
//       [id]: !prev[id],
//     }))
//   }
//   useEffect(() => {

//   }, [user])

//   // Handle follow/unfollow functionality
//   const handleFollow = async (userId) => {
//     if (userId === user?.id) {
//       setError("You cannot follow yourself.")
//       setTimeout(() => setError(null), 3000)
//       return
//     }
//     if (followingUsers.has(userId)) {
//       // Already following, you might want to implement unfollow logic here
//       return
//     }
//     try {
//       setFollowLoading((prev) => new Set([...prev, userId]))
//       const followPayload = {
//         user_following: userId,
//       }
//       const response = await PostService.Follow(followPayload)
//       console.log("Follow response:", response)
//       // Update following state
//       setFollowingUsers((prev) => new Set([...prev, userId]))
//       setError(null)
//     } catch (error) {
//       console.error("Follow error:", error)
//       // You might want to show an error message here
//       setError("Failed to follow user. Please try again.")
//       setTimeout(() => setError(null), 3000)
//       return
//     } finally {
//       setFollowLoading((prev) => {
//         const newSet = new Set(prev)
//         newSet.delete(userId)
//         return newSet
//       })
//     }
//   }
//   // Handle like toggle (assuming this exists for SocialInteractionBar)
//   const handleLikeToggle = (postId) => {
//     setLikedPosts((prev) => {
//       const newSet = new Set(prev)
//       if (newSet.has(postId)) {
//         newSet.delete(postId)
//       } else {
//         newSet.add(postId)
//       }
//       return newSet
//     })
//   }

//   const formatTimeAgo = (dateString) => {
//     const now = new Date()
//     const postDate = new Date(dateString)
//     const diffInSeconds = Math.floor((now - postDate) / 1000)

//     if (diffInSeconds < 60) {
//       return `${diffInSeconds}s`
//     } else if (diffInSeconds < 3600) {
//       return `${Math.floor(diffInSeconds / 60)}m`
//     } else if (diffInSeconds < 86400) {
//       return `${Math.floor(diffInSeconds / 3600)}h`
//     } else {
//       return `${Math.floor(diffInSeconds / 86400)}d`
//     }
//   }

//   if (loading) {
//     return (
//       <Box display="flex" justifyContent="center" alignItems="center" height="200px">
//         <Spinner size="lg" color="#5DA05D" thickness="4px" />
//       </Box>
//     )
//   }

//   if (error) {
//     return (
//       <Alert status="error" borderRadius="md" my={4}>
//         <AlertIcon />
//         {error}
//       </Alert>
//     )
//   }

//   if (posts.length === 0) {
//     return (
//       <Box textAlign="center" py={10}>
//         <p className="text-gray-500 text-lg">No posts available. Be the first to post!</p>
//       </Box>
//     )
//   }

//   return (
//     <div>
//       {posts.map((post) => {
//         // Get the user ID for this post
//         const userId = post.profile?.user_id || post.user_id || post.profile?.id
//         const isFollowing = followingUsers.has(userId)
//         const isFollowLoading = followLoading.has(userId)

//         return (
//           <div key={post.post_id} className="border border-gray-300 rounded-lg p-4 my-5">
//             <div className="flex gap-3 mb-2 items-center">
//               <img
//                 src={post.profile?.profile_photo || "/images/profile.png"}
//                 alt="profile"
//                 className="w-12 h-12 rounded-full object-cover"
//               />

//               <div className="flex flex-col justify-center">
//                 <h3 className="font-semibold text-sm">
//                   {post.profile?.first_name || "User"} {post.profile?.last_name}
//                 </h3>
//                 <p className="font-light text-sm">{post.profile?.qualification || "User"}</p>
//                 <div className="flex items-center gap-1">
//                   <p>{formatTimeAgo(post.time_stamp)}</p>
//                   <Clock className="w-3 h-3" />
//                 </div>
//               </div>
//               {userId !== user?.id && (
//                 <button
//                   className={`flex justify-center items-center gap-1 border ml-auto px-3 py-1 rounded-lg text-xs transition-colors ${
//                     isFollowing
//                       ? "text-gray-500 border-gray-500 bg-gray-50"
//                       : "text-[#5DA05D] border-[#5DA05D] hover:bg-[#5DA05D] hover:text-white"
//                   }`}
//                   onClick={() => handleFollow(userId)}
//                   disabled={isFollowing || isFollowLoading}
//                 >
//                   {isFollowLoading ? <Spinner size="xs" /> : <Plus className="w-4 h-4" />}
//                   {isFollowing ? "Following" : "Follow"}
//                 </button>
//               )}
//               {/* <button
//                 className={`flex justify-center items-center gap-1 border ml-auto px-3 py-1 rounded-lg text-xs transition-colors ${isFollowing
//                     ? "text-gray-500 border-gray-500 bg-gray-50"
//                     : "text-[#5DA05D] border-[#5DA05D] hover:bg-[#5DA05D] hover:text-white"
//                   }`}
//                 onClick={() => handleFollow(userId)}
//                 disabled={isFollowing || isFollowLoading}
//               >
//                 {isFollowLoading ? <Spinner size="xs" /> : <Plus className="w-4 h-4" />}
//                 {isFollowing ? "Following" : "Follow"}
//               </button> */}
//             </div>

//             <p className="mb-3">{post.body}</p>

//             {post.body && post.body.length > 20 && (
//               <button
//                 onClick={() => toggleExpand(post.post_id)}
//                 className="text-[#5DA05D] hover:text-blue-700 ml-1 text-sm font-medium inline-flex items-center"
//               >
//                 {expandedItems[post.post_id] ? (
//                   <>
//                     <span className="text-[#5DA05D]">Hide</span>
//                     <ChevronUp className="h-3 w-3 ml-0.5" />
//                   </>
//                 ) : (
//                   <>
//                     <span className="text-[#5DA05D]">More</span>
//                     <ChevronDown className="h-3 w-3 ml-0.5" />
//                   </>
//                 )}
//               </button>
//             )}

//             {expandedItems[post.post_id] && post.article && post.article !== "undefined" && (
//               <div className="mt-2">
//                 <p className="text-sm">{post.article}</p>
//               </div>
//             )}

//             <div className="mt-3 flex gap-3">
//               {post.pic1 && post?.pic1 !== "N/A" && (
//                 <img
//                   src={post.pic1 || "/images/mentor-img2.png"}
//                   alt="post media"
//                   className="w-full h-auto max-h-[348px] object-cover rounded-md"
//                 />
//               )}
//               {post.pic2 && post.pic2 !== "N/A" && (
//                 <img
//                   src={post.pic2 || "/images/mentor-img2.png"}
//                   alt="post media"
//                   className="w-full h-auto max-h-[348px] object-cover rounded-md"
//                 />
//               )}
//               {post.pic3 && post.pic3 !== "N/A" && (
//                 <img
//                   src={post.pic3 || "/images/mentor-img2.png"}
//                   alt="post media"
//                   className="w-full h-auto max-h-[348px] object-cover rounded-md"
//                 />
//               )}
//             </div>

//             {post.video && post.video !== "N/A" && (
//               <div className="mt-3 w-full h-auto">
//                 <video src={post.video} controls />
//               </div>
//             )}

//             <SocialInteractionBar
//               postId={post.post_id}
//               likes={post.like_count || 0}
//               comments={post.comment_count || 0}
//               shares={post.share_count || 0}
//               isLiked={likedPosts.has(post.post_id)}
//               onLikeToggle={handleLikeToggle}
//             />
//           </div>
//         )
//       })}
//     </div>
//   )
// }
// function AllTemplate() {
//   const [expandedItems, setExpandedItems] = useState({})
//   const [posts, setPosts] = useState([])
//   const [loading, setLoading] = useState(true)
//   const [error, setError] = useState(null)
//   const [followError, setFollowError] = useState(null)

//   // New state for follow functionality
//   const [followingUsers, setFollowingUsers] = useState(new Set())
//   const [followLoading, setFollowLoading] = useState(new Set())
//   const [likedPosts, setLikedPosts] = useState(new Set())

//   const { user } = useContext(UserContext)

//   useEffect(() => {
//     async function fetchPosts() {
//       try {
//         setLoading(true)
//         const data = await PostService.getPosts()
//         const fetchedPosts = Array.isArray(data) ? data : data.results || []
//         setPosts(fetchedPosts)
//         setError(null)
//       } catch (err) {
//         console.error("Error fetching posts:", err)
//         setError("Failed to load posts. Please try again later.")
//       } finally {
//         setLoading(false)
//       }
//     }

//     fetchPosts()
//   }, [])
//   useEffect(() => {
//     const fetchFollowingStatus = async () => {
//       if (!user?.id) return
//       try {
//         const followingData = await PostService.getFollowingLists()
//         setFollowingUsers(new Set(followingData.map(f => f.following_id || f.user_id || f.id)))
//         console.log(followingData)
//       } catch (error) {
//         console.error("Error fetching following status:", error)
//       }
//     }

//     fetchFollowingStatus()
//   }, [user])

//   const toggleExpand = (id) => {
//     setExpandedItems((prev) => ({
//       ...prev,
//       [id]: !prev[id],
//     }))
//   }

//   const handleFollow = async (userId) => {
//     // Clear any previous errors
//     setFollowError(null)
//     setError(null)

//     // Check if user is trying to follow themselves
//     if (userId === user?.id) {
//       setFollowError("You cannot follow yourself.")
//       setTimeout(() => setFollowError(null), 3000)
//       return
//     }

//     if (followingUsers.has(userId)) {
//       setFollowError("You are already following this user.")
//       setTimeout(() => setFollowError(null), 3000)
//       return
//     }
//     if (followingUsers === true) {
//       setFollowError("You are already following this user.")
//       setTimeout(() => setFollowError(null), 3000)
//       return
//     }else{
//       setError("following")
//       setTimeout(() => setFollowError(null), 3000)
//     }

//     try {
//       setFollowLoading((prev) => new Set([...prev, userId]))

//       const followPayload = {
//         user_following: userId,
//       }

//       const response = await PostService.Follow(followPayload)
//       console.log("Follow response:", response)

//       // Update following state
//       const newFollowingUsers = new Set([...followingUsers, userId])
//       setFollowingUsers(newFollowingUsers)
//     } catch (error) {
//       console.error("Follow error:", error)

//       // Handle different error types
//       const errorMessage = error.response?.data?.message || error.message

//       if (errorMessage?.toLowerCase().includes("yourself") || errorMessage?.toLowerCase().includes("self")) {
//         setFollowError("You cannot follow yourself.")
//       } else if (error.response?.status === 409 || errorMessage?.toLowerCase().includes("already")) {
//         setFollowError("You are already following this user.")
//       } else if (error.response?.status === 404) {
//         setFollowError("User not found.")
//       } else {
//         setFollowError("Failed to follow user. Please try again.")
//       }

//       setTimeout(() => setFollowError(null), 3000)
//     } finally {
//       setFollowLoading((prev) => {
//         const newSet = new Set(prev)
//         newSet.delete(userId)
//         return newSet
//       })
//     }
//   }

//   const handleLikeToggle = (postId) => {
//     setLikedPosts((prev) => {
//       const newSet = new Set(prev)
//       if (newSet.has(postId)) {
//         newSet.delete(postId)
//       } else {
//         newSet.add(postId)
//       }
//       return newSet
//     })
//   }

//   const formatTimeAgo = (dateString) => {
//     const now = new Date()
//     const postDate = new Date(dateString)
//     const diffInSeconds = Math.floor((now - postDate) / 1000)

//     if (diffInSeconds < 60) {
//       return `${diffInSeconds}s`
//     } else if (diffInSeconds < 3600) {
//       return `${Math.floor(diffInSeconds / 60)}m`
//     } else if (diffInSeconds < 86400) {
//       return `${Math.floor(diffInSeconds / 3600)}h`
//     } else {
//       return `${Math.floor(diffInSeconds / 86400)}d`
//     }
//   }

//   if (loading) {
//     return (
//       <Box display="flex" justifyContent="center" alignItems="center" height="200px">
//         <Spinner size="lg" color="#5DA05D" thickness="4px" />
//       </Box>
//     )
//   }

//   if (error || followError) {
//     return (
//       <Alert status="error" borderRadius="md" my={4}>
//         <AlertIcon />
//         {followError || error}
//       </Alert>
//     )
//   }

//   if (posts.length === 0) {
//     return (
//       <Box textAlign="center" py={10}>
//         <p className="text-gray-500 text-lg">No posts available. Be the first to post!</p>
//       </Box>
//     )
//   }

//   // console.log(followingUsers);
//   return (
//     <div>
//       {posts.map((post) => {
//         const userId = post.profile?.id || post.user_id || post.profile?.id
//         const isFollowing = followingUsers.has(userId)
//         const isFollowLoading = followLoading.has(userId)

//         return (
//           <div key={post.post_id} className="border border-gray-300 rounded-lg p-4 my-5">
//             <div className="flex gap-3 mb-2 items-center">
//               <img
//                 src={post.profile?.profile_photo || "/images/profile.png"}
//                 alt="profile"
//                 className="w-12 h-12 rounded-full object-cover"
//               />

//               <div className="flex flex-col justify-center">
//                 <h3 className="font-semibold text-sm">
//                   {post.profile?.first_name || "User"} {post.profile?.last_name}
//                 </h3>
//                 <p className="font-light text-sm">{post.profile?.qualification || "User"}</p>
//                 <div className="flex items-center gap-1">
//                   <p>{formatTimeAgo(post.time_stamp)}</p>
//                   <Clock className="w-3 h-3" />
//                 </div>
//               </div>

//               {userId !== user?.id && (
//                 <button
//                   className={`flex justify-center items-center gap-1 border ml-auto px-3 py-1 rounded-lg text-xs transition-colors ${
//                     isFollowing==true
//                       ? "text-gray-500 border-gray-500 bg-gray-50"
//                       : "text-[#5DA05D] border-[#5DA05D] hover:bg-[#5DA05D] hover:text-white"
//                   }`}
//                   onClick={() => handleFollow(userId)}
//                   disabled={isFollowing == true || isFollowLoading}
//                 >
//                   {isFollowLoading ? <Spinner size="xs" /> : <Plus className="w-4 h-4" />}
//                   {isFollowing === true ? "Following" : "Follow"}
//                 </button>
//               )}
//             </div>

//             <p className="mb-3">{post.body}</p>

//             {post.body && post.body.length > 20 && (
//               <button
//                 onClick={() => toggleExpand(post.post_id)}
//                 className="text-[#5DA05D] hover:text-blue-700 ml-1 text-sm font-medium inline-flex items-center"
//               >
//                 {expandedItems[post.post_id] ? (
//                   <>
//                     <span className="text-[#5DA05D]">Hide</span>
//                     <ChevronUp className="h-3 w-3 ml-0.5" />
//                   </>
//                 ) : (
//                   <>
//                     <span className="text-[#5DA05D]">More</span>
//                     <ChevronDown className="h-3 w-3 ml-0.5" />
//                   </>
//                 )}
//               </button>
//             )}

//             {expandedItems[post.post_id] && post.article && post.article !== "undefined" && (
//               <div className="mt-2">
//                 <p className="text-sm">{post.article}</p>
//               </div>
//             )}

//             <div className="mt-3 flex gap-3">
//               {post.pic1 && post?.pic1 !== "N/A" && (
//                 <img
//                   src={post.pic1 || "/images/mentor-img2.png"}
//                   alt="post media"
//                   className="w-full h-auto max-h-[348px] object-cover rounded-md"
//                 />
//               )}
//               {post.pic2 && post.pic2 !== "N/A" && (
//                 <img
//                   src={post.pic2 || "/images/mentor-img2.png"}
//                   alt="post media"
//                   className="w-full h-auto max-h-[348px] object-cover rounded-md"
//                 />
//               )}
//               {post.pic3 && post.pic3 !== "N/A" && (
//                 <img
//                   src={post.pic3 || "/images/mentor-img2.png"}
//                   alt="post media"
//                   className="w-full h-auto max-h-[348px] object-cover rounded-md"
//                 />
//               )}
//             </div>

//             {post.video && post.video !== "N/A" && (
//               <div className="mt-3 w-full h-auto">
//                 <video src={post.video} controls />
//               </div>
//             )}

//             <SocialInteractionBar
//               postId={post.post_id}
//               likes={post.like_count || 0}
//               comments={post.comment_count || 0}
//               shares={post.share_count || 0}
//               isLiked={likedPosts.has(post.post_id)}
//               onLikeToggle={handleLikeToggle}
//             />
//           </div>
//         )
//       })}
//     </div>
//   )
// }
export const formatTimeAgo = (dateString) => {
  const now = new Date()
  const postDate = new Date(dateString)
  const diffInSeconds = Math.floor((now - postDate) / 1000)

  if (diffInSeconds < 60) {
    return `${diffInSeconds}s`
  } else if (diffInSeconds < 3600) {
    return `${Math.floor(diffInSeconds / 60)}m`
  } else if (diffInSeconds < 86400) {
    return `${Math.floor(diffInSeconds / 3600)}h`
  } else {
    return `${Math.floor(diffInSeconds / 86400)}d`
  }
}
function FollowingTemplate() {
  const [expandedItems, setExpandedItems] = useState({});
  const [likedPosts, setLikedPosts] = useState(new Set()) // Track multiple liked posts
  const [following, setFollowing] = useState([]);
  const [isFollowing, setIsFollowing] = useState(false);
  const [followData, setFollowData] = useState(null);

  useEffect(() => {
    const getFollowingPost = async () => {
      try {
        const result = await PostService.getFollowingPosts();
        if (result && Array.isArray(result.results)) {
          setFollowing(result.results);
        } else {
          console.error('Unexpected result format:', result);
          setFollowing([]);
        }
      } catch (error) {
        console.error('Error fetching posts:', error);
        setFollowing([]);
      }
    };
    getFollowingPost();
  }, []);

  const handleLikeToggle = async (postId) => {
    try {
      const wasLiked = likedPosts.has(postId)

      // Update liked posts set
      setLikedPosts((prev) => {
        const newSet = new Set(prev)
        if (wasLiked) {
          newSet.delete(postId)
        } else {
          newSet.add(postId)
        }
        return newSet
      })

      // Update the like count in posts
      setPosts((currentPosts) =>
        currentPosts.map((post) => {
          if (post.post_id === postId) {
            return {
              ...post,
              like_count: wasLiked ? post.like_count - 1 : post.like_count + 1,
            }
          }
          return post
        }),
      )

      // Make API call
      const result = await PostService.likePost(postId)
      console.log("Post like result:", result)
      if (result.newLikeCount !== undefined) {
        setPosts((currentPosts) =>
          currentPosts.map((post) => {
            if (post.post_id === postId) {
              return {
                ...post,
                like_count: result.newLikeCount,
              }
            }
            return post
          }),
        )
      }
    } catch (error) {
      console.error("Error liking post:", error)
    }
  }
  const handleFollow = async () => {
    if (!user_following || user_following === '') {
      console.error('Invalid user_following:', user_following);
      return;
    }

    setLoading(true);
    try {
      const payload = { user_following };
      console.log('Sending payload:', payload);
      const response = await PostService.Follow(payload);
      console.log(response)
      setIsFollowing(true);
      setFollowData(response); // Store response (e.g., { follower: 1, following: 12 })
    } catch (error) {
      const errorMessage =
        error.response?.data?.user_following?.[0] ||
        error.message ||
        'Failed to follow';
      console.error('Follow error:', error.response || error.message);
    } finally {
      setLoading(false);
    }
  };
  // Handle empty state
  if (following.length === 0) {
    return (
      <Box textAlign="center" py={10}>
        <p className="text-gray-500 text-lg">No following posts available. Be the first to post!</p>
      </Box>
    );
  }

  const profile = [
    {
      id: 1, image: "/images/profile.png", name: "John Smith",
      description: "Ux Mentor, Google certified Ux designer", days: "8d", timeIcon: <Clock />,
      disc2: "🔍If you always stay in your comfort zone, how will you know what you're capable of?...",
      image2: "/images/profile-img3.png"
    },
    {
      id: 2, image: "/images/profile.png", name: "John Smith",
      description: "Ceo texile rebound, Strategic Business man", days: "12hrs", timeIcon: <Clock />,
      disc2: "🔍 Why Do So Many Finance Apps Look the Same? Ever noticed how most fintech apps follow the same blue-and-white theme...",
      image2: "/images/profile-img4.png"
    }
  ];

  return (
    <div>
      {following && following.map((post) => (
        <div key={post.post_id} className="border border-gray-300 rounded-lg p-4 my-5">
          <div className="flex gap-3 mb-2 items-center">
            <img
              src={post.profile?.profile_photo || "/images/profile.png"}
              alt="profile"
              className="w-12 h-12 rounded-full object-cover"
            />
            <div className="flex flex-col justify-center">
              <h3 className="font-semibold text-sm">{post.profile?.first_name || "User"} {post.profile?.last_name}</h3>
              <p className="font-light text-sm">{post.profile?.qualification || "User"}</p>
              <div className="flex items-center gap-1">
                <p>{formatTimeAgo(post.time_stamp)}</p>
                <Clock className="w-3 h-3" />
              </div>
            </div>
            <button onClick={handleFollow} className="text-[#5DA05D] flex justify-center border border-[#5DA05D] ml-auto px-3 py-1 rounded-lg text-xs">
              <Plus className="w-4 h-4" /> Follow
            </button>
          </div>

          <p className="mb-3">{post.body}</p>

          {/* Show "More" button only if content is likely to be long */}
          {post.body && post.body.length > 20 && (
            <button
              onClick={() => toggleExpand(post.id)}
              className="text-[#5DA05D] hover:text-blue-700 ml-1 text-sm font-medium inline-flex items-center"
            >
              {expandedItems[post.id] ? (
                <>
                  <span className="text-[#5DA05D]">Hide</span>
                  <ChevronUp className="h-3 w-3 ml-0.5" />
                </>
              ) : (
                <>
                  <span className="text-[#5DA05D]">More</span>
                  <ChevronDown className="h-3 w-3 ml-0.5" />
                </>
              )}
            </button>
          )}

          {/* Show article content when expanded */}
          {expandedItems[post.id] && post.article && post.article !== "undefined" && (
            <div className="mt-2">
              <p className="text-sm">{post.article}</p>
            </div>
          )}
          <div className="mt-3 gap-1 grid grid-cols-12 border border-gray-200 p-2 rounded-lg">
              <div className="col-span-6 max-h-[300px]">
                {post.pic1 && post?.pic1 !== "N/A" && (
                  <img
                    src={post.pic1 || "/images/mentor-img2.png"}
                    alt="post media"
                    className="w-full h-full max-h-[348px] object-cover rounded-md"
                  />
                )}
              </div>
              <div className="col-span-6 max-h-[300px] flex flex-col gap-1">
                {post.pic2 && post.pic2 !== "N/A" && (
                  <img
                    src={post.pic2 || "/images/mentor-img2.png"}
                    alt="post media"
                    className="w-full h-full max-h-[150px] object-cover rounded-md"
                  />
                )}
                {post.pic3 && post.pic3 !== "N/A" && (
                  <img
                    src={post.pic3 || "/images/mentor-img2.png"}
                    alt="post media"
                    className="w-full h-full max-h-[150px] object-cover rounded-md"
                  />
                )}
              </div>
            </div>

            <div className="mt-3 grid grid-cols-12">
              <div className="col-span-12 max-h-[300px]">
                {post.video && post.video !== "N/A" && (
                  <div className="w-full h-full max-h-[348px] object-cover rounded-md">
                    <video src={post.video} controls />
                  </div>
                )}
              </div>
            </div>
          <SocialInteractionBar
            postId={post.post_id}
            likes={post.like_count || 0}
            comments={post.comment_count || 0}
            shares={post.share_count || 0}
            isLiked={likedPosts.has(post.post_id)}
            onLikeToggle={handleLikeToggle}
          />
        </div>
      ))}
    </div>
  );
}

function MentorsTemplate() {
  const [expandedItems, setExpandedItems] = useState({});

  const toggleExpand = (id) => {
    setExpandedItems(prev => ({
      ...prev,
      [id]: !prev[id] // Toggle only the clicked item's state
    }));
  };

  const profile = [
    {
      id: 1, image: "/images/profile.png", name: "John Smith",
      description: "Ux Mentor, Google certified Ux designer", days: "8d", timeIcon: <Clock />,
      disc2: "🔍If you always stay in your comfort zone, how will you know what you're capable of?...",
      image2: "/images/profile-img5.png"
    },
    {
      id: 2, image: "/images/profile.png", name: "John Smith",
      description: "Ceo texile rebound, Strategic Business man", days: "12hrs", timeIcon: <Clock />,
      disc2: "🔍 Why Do So Many Finance Apps Look the Same? Ever noticed how most fintech apps follow the same blue-and-white theme...",
      image2: "/images/profile-img1.png"
    }
  ];

  return (
    <div>
      {profile.map(p => (
        <div key={p.id} className='border border-gray-300 rounded-lg p-4 my-5'>
          <div className='flex gap-3 mb-2 items-center'>
            <img src={p.image} alt="profile" className='w-12 h-12 rounded-full' />
            <div className='flex flex-col justify-center'>
              <h3 className='font-semibold text-sm'>{p.name}</h3>
              <p className='font-light text-sm'>{p.description}</p>
              <div className='flex items-center gap-1'>
                <p>{p.days}</p>
                <p>{p.timeIcon}</p>
              </div>
            </div>
            <button className='text-[#5DA05D] flex justify-center border border-[#5DA05D] ml-auto px-3 py-1 rounded-lg text-xs'>
              <Plus className='w-4 h-4' /> Follow
            </button>
          </div>

          <p className='mb-3'>{p.disc2}</p>
          <button
            onClick={() => toggleExpand(p.id)}
            className="text-[#5DA05D] hover:text-blue-700 ml-1 text-sm font-medium inline-flex items-center"
          >
            {expandedItems[p.id] ? (
              <>
                <span className='text-[#5DA05D]'>Hide</span>
                <ChevronUp className="h-3 w-3 ml-0.5" />
              </>
            ) : (
              <>
                <span className='text-[#5DA05D]'>More</span>
                <ChevronDown className="h-3 w-3 ml-0.5" />
              </>
            )}
          </button>

          {expandedItems[p.id] && (
            <div className="mt-2">
              <ul className="list-disc ml-5 text-sm">
                <li>Collaborated with cross-functional teams to deliver high-quality software solutions.</li>
                <li>Implemented responsive design principles to ensure optimal user experience.</li>
                <li>Participated in code reviews and provided constructive feedback.</li>
                <li>Utilized agile methodologies to manage workflows efficiently.</li>
              </ul>
            </div>
          )}

          <div>
            <img src={p.image2} alt="profile" className='w-full h-[348px]' />
          </div>

          <SocialInteractionBar likes={125} comments={25} shares={2} views={true} events={true} />
        </div>
      ))}
    </div>
  );
}
