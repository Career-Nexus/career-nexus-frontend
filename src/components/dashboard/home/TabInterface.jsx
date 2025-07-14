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
  // Fetch posts on mount
  useEffect(() => {
    fetchPosts();
  }, []);

  // Toggle expand post
  const toggleExpand = (id) => {
    setExpandedItems((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const handleFollow = async (userId) => {
    try {
      await PostService.Follow({ user_following: userId });
      fetchPosts();
    } catch (err) {
      console.error(err);
      setError("Could not follow user");
    }
  };

  const handleUnfollow = async (userId) => {
    try {
      await PostService.Unfollow({ user_following: userId });
      fetchPosts();
    } catch (error) {
      console.error("Could not unfollow user", error)
      setError("Could not unfollow user")
    }
  };
  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="200px">
        <Spinner size="lg" color="#5DA05D" thickness="4px" />
      </Box>
    );
  }

  if (error) {
    return (
      <Alert status="error" borderRadius="md" my={4}>
        <AlertIcon />
        {error}
      </Alert>
    );
  }

  if (posts.length === 0) {
    return (
      <Box textAlign="center" py={10}>
        <p className="text-gray-500 text-lg">No posts available. Be the first to post!</p>
      </Box>
    );
  }

  return (
    <div>
      {posts.map((post) => {
        const userId = post.profile.id;
        const isSelf = post.is_self;
        const canFollow = post.can_follow;
        const isFollowing = !canFollow && !isSelf;
        const showFollowButton = !isSelf && (canFollow || isFollowing);
        return post?.parent ? (
          // Render something for parent posts here
          <div key={post.post_id}>
            <div className="border border-gray-300 rounded-lg p-4 my-5">
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
                {showFollowButton && (
                  <button
                    onClick={() => isFollowing ? handleUnfollow(userId) : handleFollow(userId)}
                    className={`ml-auto px-3 py-1 text-xs rounded border flex items-center gap-1
                    ${isFollowing
                        ? "text-gray-500 border-gray-500 bg-gray-50"
                        : "text-[#5DA05D] border-[#5DA05D] hover:bg-[#5DA05D] hover:text-white"
                      }
                  `}
                  >
                    {isFollowing ? "Following" : "Follow"}
                  </button>
                )}
              </div>
              <p className="mb-3 border-b border-gray-200">{post.body}</p>
              <p className="mb-3">{post.parent.body}</p>
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

              {expandedItems[post.post_id] && post.parent.article && post.parent.article !== "undefined" && (
                <div className="mt-2">
                  <p className="text-sm">{post.parent.article}</p>
                </div>
              )}
              <div className="mt-3 grid grid-cols-12 gap-1 overflow-hidden">
                {/* Left big image */}
                <div className="col-span-6">
                  {post.parent.pic1 && post.parent.pic1 !== "N/A" && (
                    <img
                      src={post.parent.pic1}
                      alt="Post Image 1"
                      className="w-full h-full max-h-[200px] object-cover rounded-md"
                    />
                  )}
                </div>

                {/* Right two stacked images */}
                <div className="col-span-6 flex flex-col gap-1">
                  {post.parent.pic2 && post.parent.pic2 !== "N/A" && (
                    <img
                      src={post.parent.pic2}
                      alt="Post Image 2"
                      className="w-full h-[148px] object-cover rounded-md"
                    />
                  )}
                  {post.parent.pic3 && post.parent.pic3 !== "N/A" && (
                    <img
                      src={post.parent.pic3}
                      alt="Post Image 3"
                      className="w-full h-[148px] object-cover rounded-md"
                    />
                  )}
                </div>
              </div>

              {post.parent.video && post.parent.video !== "N/A" && (
                <div className="mt-3 max-w-lg overflow-hidden rounded-lg border border-gray-200 p-1">
                  <video
                    src={post.parent.video}
                    controls
                    className="w-full h-[200px] object-cover"
                  />
                </div>
              )}
              <SocialBar post={post.post || post} fetchPosts={fetchPosts} />
            </div>
          </div>
        ) : (
          // Render something for non-parent posts here
          <div key={post.post_id}>
            <div className="border border-gray-300 rounded-lg p-4 my-5">
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
                {showFollowButton && (
                  <button
                    onClick={() => isFollowing ? handleUnfollow(userId) : handleFollow(userId)}
                    className={`ml-auto px-3 py-1 text-xs rounded border flex items-center gap-1
                    ${isFollowing
                        ? "text-gray-500 border-gray-500 bg-gray-50"
                        : "text-[#5DA05D] border-[#5DA05D] hover:bg-[#5DA05D] hover:text-white"
                      }
                  `}
                  >
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

              <div className="mt-3 grid grid-cols-12 gap-1 overflow-hidden">
                {/* Left big image */}
                <div className="col-span-6">
                  {post.pic1 && post.pic1 !== "N/A" && (
                    <img
                      src={post.pic1}
                      alt="Post Image 1"
                      className="w-full h-full max-h-[300px] object-cover rounded-md"
                    />
                  )}
                </div>

                {/* Right two stacked images */}
                <div className="col-span-6 flex flex-col gap-1">
                  {post.pic2 && post.pic2 !== "N/A" && (
                    <img
                      src={post.pic2}
                      alt="Post Image 2"
                      className="w-full h-[148px] object-cover rounded-md"
                    />
                  )}
                  {post.pic3 && post.pic3 !== "N/A" && (
                    <img
                      src={post.pic3}
                      alt="Post Image 3"
                      className="w-full h-[148px] object-cover rounded-md"
                    />
                  )}
                </div>
              </div>

              {post.video && post.video !== "N/A" && (
                <div className="mt-3 max-w-lg overflow-hidden rounded-lg border border-gray-200 p-1">
                  <video
                    src={post.video}
                    controls
                    className="w-full h-[200px] object-cover"
                  />
                </div>
              )}
              <SocialBar post={post.post || post} fetchPosts={fetchPosts} />
            </div>
          </div>
        );
      })}
    </div>
  );
}
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
  const [following, setFollowing] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchPosts = async () => {
    setLoading(true);
    try {
      const result = await PostService.getFollowingPosts();
      setFollowing(Array.isArray(result?.results) ? result.results : []);
      setError(null);
    } catch (err) {
      console.error(err);
      setError("Failed to load following posts. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const toggleExpand = (id) => {
    setExpandedItems(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const handleFollow = async (userId) => {
    try {
      await PostService.Follow({ user_following: userId });
      fetchPosts();
    } catch (err) {
      console.error(err);
      setError("Could not follow user");
    }
  };

  const handleUnfollow = async (userId) => {
    try {
      await PostService.Unfollow({ user_following: userId });
      fetchPosts();
    } catch (err) {
      console.error(err);
      setError("Could not unfollow user");
    }
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="200px">
        <Spinner size="lg" color="#5DA05D" thickness="4px" />
      </Box>
    );
  }

  if (error) {
    return (
      <Alert status="error" borderRadius="md" my={4}>
        <AlertIcon />
        {error}
      </Alert>
    );
  }

  if (following.length === 0) {
    return (
      <Box textAlign="center" py={10}>
        <p className="text-gray-500 text-lg">No following posts available. Be the first to post!</p>
      </Box>
    );
  }

  return (
    <div>
      {following.map(post => {
        const userId = post.profile.id;
        const isSelf = post.is_self;
        const canFollow = post.can_follow;
        const isFollowing = !canFollow && !isSelf;
        const showFollowButton = !isSelf && (canFollow || isFollowing);
        return post?.parent ? (
          // Render something for parent posts here i.e repost
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
              {showFollowButton && (
                <button
                  onClick={() => isFollowing ? handleUnfollow(userId) : handleFollow(userId)}
                  className={`ml-auto px-3 py-1 text-xs rounded border flex items-center gap-1
                    ${isFollowing
                      ? "text-gray-500 border-gray-500 bg-gray-50"
                      : "text-[#5DA05D] border-[#5DA05D] hover:bg-[#5DA05D] hover:text-white"
                    }
                  `}
                >
                  {isFollowing ? "Following" : "Follow"}
                </button>
              )}
            </div>
            <p className="mb-3 border-b border-gray-200">{post.body}</p>
            <p className="mb-3">{post.parent.body}</p>
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

            {expandedItems[post.post_id] && post.parent.article && post.parent.article !== "undefined" && (
              <div className="mt-2">
                <p className="text-sm">{post.parent.article}</p>
              </div>
            )}
            <div className="mt-3 grid grid-cols-12 gap-1 overflow-hidden">
              {/* Left big image */}
              <div className="col-span-6">
                {post.parent.pic1 && post.parent.pic1 !== "N/A" && (
                  <img
                    src={post.parent.pic1}
                    alt="Post Image 1"
                    className="w-full h-full max-h-[200px] object-cover rounded-md"
                  />
                )}
              </div>

              {/* Right two stacked images */}
              <div className="col-span-6 flex flex-col gap-1">
                {post.parent.pic2 && post.parent.pic2 !== "N/A" && (
                  <img
                    src={post.parent.pic2}
                    alt="Post Image 2"
                    className="w-full h-[148px] object-cover rounded-md"
                  />
                )}
                {post.parent.pic3 && post.parent.pic3 !== "N/A" && (
                  <img
                    src={post.parent.pic3}
                    alt="Post Image 3"
                    className="w-full h-[148px] object-cover rounded-md"
                  />
                )}
              </div>
            </div>

            {post.parent.video && post.parent.video !== "N/A" && (
              <div className="mt-3 max-w-lg overflow-hidden rounded-lg border border-gray-200 p-1">
                <video
                  src={post.parent.video}
                  controls
                  className="w-full h-[200px] object-cover"
                />
              </div>
            )}
            <SocialBar post={post.post || post} fetchPosts={fetchPosts} />
          </div>
        ) : (
          // Render something for non-parent posts here
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
              {showFollowButton && (
                <button
                  onClick={() => isFollowing ? handleUnfollow(userId) : handleFollow(userId)}
                  className={`ml-auto px-3 py-1 text-xs rounded border flex items-center gap-1
                    ${isFollowing
                      ? "text-gray-500 border-gray-500 bg-gray-50"
                      : "text-[#5DA05D] border-[#5DA05D] hover:bg-[#5DA05D] hover:text-white"
                    }
                  `}
                >
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

            <div className="mt-3 grid grid-cols-12 gap-1 overflow-hidden">
              {/* Left big image */}
              <div className="col-span-6">
                {post.pic1 && post.pic1 !== "N/A" && (
                  <img
                    src={post.pic1}
                    alt="Post Image 1"
                    className="w-full h-full max-h-[300px] object-cover rounded-md"
                  />
                )}
              </div>

              {/* Right two stacked images */}
              <div className="col-span-6 flex flex-col gap-1">
                {post.pic2 && post.pic2 !== "N/A" && (
                  <img
                    src={post.pic2}
                    alt="Post Image 2"
                    className="w-full h-[148px] object-cover rounded-md"
                  />
                )}
                {post.pic3 && post.pic3 !== "N/A" && (
                  <img
                    src={post.pic3}
                    alt="Post Image 3"
                    className="w-full h-[148px] object-cover rounded-md"
                  />
                )}
              </div>
            </div>

            {post.video && post.video !== "N/A" && (
              <div className="mt-3 max-w-lg overflow-hidden rounded-lg border border-gray-200 p-1">
                <video
                  src={post.video}
                  controls
                  className="w-full h-[200px] object-cover"
                />
              </div>
            )}
            <SocialBar post={post.post || post} fetchPosts={fetchPosts} />
          </div>
        );
      })}
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
