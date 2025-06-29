import { useEffect, useState } from "react"
import { SocialInteractionBar } from "./SocialInteractionBar"
import { ChevronDown, ChevronUp, Plus } from "lucide-react"
import { Clock } from "../../../icons/icon"
import { Spinner, Alert, AlertIcon, Box } from "@chakra-ui/react"
import { PostService } from "../../../api/PostService"

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
  const [expandedItems, setExpandedItems] = useState({})
  const [posts, setPosts] = useState([])
  const [likedPosts, setLikedPosts] = useState(new Set()) // Track multiple liked posts
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  // Fetch posts when component mounts
  useEffect(() => {
    async function fetchPosts() {
      try {
        setLoading(true)
        const data = await PostService.getPosts()
        // Handle different API response formats
        const fetchedPosts = Array.isArray(data) ? data : data.results || []
        setPosts(fetchedPosts)
        setError(null)
      } catch (err) {
        console.error("Error fetching posts:", err)
        setError("Failed to load posts. Please try again later.")
      } finally {
        setLoading(false)
      }
    }

    fetchPosts()
  }, [])

  const toggleExpand = (id) => {
    setExpandedItems((prev) => ({
      ...prev,
      [id]: !prev[id], // Toggle only the clicked item's state
    }))
  }

  // Format date to a readable format
  const formatTimeAgo = (dateString) => {
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

  // Handle like count updates
  // const handleLikeUpdate = (postId, newCount) => {
  //   setPosts((currentPosts) =>
  //     currentPosts.map((post) => (post.post_id === postId ? { ...post, like_count: newCount } : post)),
  //   )
  // }
  // const handleLikedPost = async(postId) => {
  //   let result = await PostService.likePost(postId)
  //   console.log("Post liked:", result)
  //   setLikePost(result)
  // }
  // setLikePost((prev) => (prev === postId ? null : postId)) // Toggle liked post
  const handleLikeToggle = async (postId) => {
    try {
      // Optimistically update the UI
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

      // If API returns a specific like count, update it
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

      // Revert optimistic update on error
      setLikedPosts((prev) => {
        const newSet = new Set(prev)
        if (likedPosts.has(postId)) {
          newSet.delete(postId)
        } else {
          newSet.add(postId)
        }
        return newSet
      })

      setPosts((currentPosts) =>
        currentPosts.map((post) => {
          if (post.post_id === postId) {
            return {
              ...post,
              like_count: likedPosts.has(postId) ? post.like_count + 1 : post.like_count - 1,
            }
          }
          return post
        }),
      )
    }
  }
  // Show loading spinner while fetching posts
  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="200px">
        <Spinner size="lg" color="#5DA05D" thickness="4px" />
      </Box>
    )
  }

  // Show error message if fetch failed
  if (error) {
    return (
      <Alert status="error" borderRadius="md" my={4}>
        <AlertIcon />
        {error}
      </Alert>
    )
  }

  // If no posts are available
  if (posts.length === 0) {
    return (
      <Box textAlign="center" py={10}>
        <p className="text-gray-500 text-lg">No posts available. Be the first to post!</p>
      </Box>
    )
  }

  return (
    <div>
      {posts.map((post) => (
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
            <button className="text-[#5DA05D] flex justify-center border border-[#5DA05D] ml-auto px-3 py-1 rounded-lg text-xs">
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
          <div className="mt-3 flex gap-3">
            {/* Show media if available */}
            <div>
              {post.pic1 && post?.pic1 !== "N/A" && (
                <img
                  src={post.pic1 || "/images/mentor-img2.png"}
                  alt="post media"
                  className="w-full h-auto max-h-[348px] object-cover rounded-md"
                />
            )}
            </div>
            <div>
              {post.pic2 && post.pic2 !== "N/A" && (
              <img
                src={post.pic2 || "/images/mentor-img2.png"}
                alt="post media"
                className="w-full h-auto max-h-[348px] object-cover rounded-md"
              />
            )}
            </div>
            <div>
              {post.pic3 && post.pic3 !== "N/A" && (
                <img
                  src={post.pic3 || "/images/mentor-img2.png"}
                  alt="post media"
                  className="w-full h-auto max-h-[348px] object-cover rounded-md"
                />
            )}
            </div>
          </div>
          {post.video && post.video !== "N/A" && (
            <div className="mt-3 w-full h-auto">
              <video
                src={post.video}
                controls
              />
            </div>
          )}
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
  )
}

function FollowingTemplate() {
  const [expandedItems, setExpandedItems] = useState({});
  const [likedPosts, setLikedPosts] = useState(new Set()) // Track multiple liked posts

  const toggleExpand = (id) => {
    setExpandedItems(prev => ({
      ...prev,
      [id]: !prev[id] // Toggle only the clicked item's state
    }));
  };
  const handleLikedPost = (postId) => {
    setLikePost((prev) => (prev === postId ? null : postId)) // Toggle liked post
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
          {/* <SocialInteractionBar
            postId={post.post_id}
            likes={post.like_count || 0}
            comments={post.comment_count || 0}
            shares={post.share_count || 0}
            likePost={(newCount) => handleLikedPost(post.post_id, newCount)}
          /> */}
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
