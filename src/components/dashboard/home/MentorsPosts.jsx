import { ChevronDown, ChevronUp, Clock } from "lucide-react";
import { useEffect, useState } from "react";
import { Box, Spinner } from "@chakra-ui/react";
import { PostService } from "../../../api/PostService";
import { formatTimeAgo } from "./TabInterface";
import SocialBar from "./SocialBar";
import { Link } from "react-router-dom";

export default function MentorPosts() {
  const [expandedItems, setExpandedItems] = useState({});
  const [mentorsPosts, setMentorsPosts] = useState([]);
  const [nextPage, setNextPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchPosts = async (page = 1) => {
    setLoading(true);
    try {
      const data = await PostService.getMentorsPosts({ page });
      const newPosts = Array.isArray(data) ? data : data?.results || [];
      setMentorsPosts(prev => page === 1 ? newPosts : [...prev, ...newPosts]);

      if (data?.next) {
        const url = new URL(data.next);
        const nextPageNumber = url.searchParams.get("page");
        setNextPage(Number(nextPageNumber));
        setHasMore(true);
      } else {
        setHasMore(false);
      }
      setError(null);
    } catch (err) {
      console.error("Error fetching posts:", err);
      setError("Failed to load posts.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts(1);
  }, []);

  const handleLoadMore = () => {
    if (hasMore) {
      fetchPosts(nextPage);
    }
  };

  const toggleExpand = (id, type = "") => {
    const key = type ? `${id}_${type}` : id;
    setExpandedItems((prev) => ({
      ...prev,
      [key]: !prev[key],
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
      console.error("Could not unfollow user", error);
      setError("Could not unfollow user");
    }
  };

  if (loading && mentorsPosts.length === 0) {
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

  if (mentorsPosts.length === 0) {
    return (
      <Box textAlign="center" py={10}>
        <p className="text-gray-500 text-lg">No posts available. Be the first to post!</p>
      </Box>
    );
  }

  return (
    <div>
      {/* {mentorsPosts.map((post) => {
        const userId = post.profile.id;
        const isSelf = post.is_self;
        const canFollow = post.can_follow;
        const isFollowing = !canFollow && !isSelf;
        const showFollowButton = !isSelf && (canFollow || isFollowing);

        return (
          <div key={post.post_id} className="border border-gray-300 rounded-lg p-4 my-5">
            <div className="flex gap-3 mb-2 items-center">
              <Link to={`/person-profile/${post.profile.id}`} className="flex gap-3 mb-2 items-center">
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
              </Link>
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

            <p className="mb-3">
              {expandedItems[post.post_id]
                ? post.body
                : post.body?.length > 200
                  ? post.body.slice(0, 200) + "..."
                  : post.body}
            </p>
            {post.body && post.body.length > 200 && (
              <button
                onClick={() => toggleExpand(post.post_id)}
                className="text-[#5DA05D] hover:text-[#5DA05D] ml-1 text-sm font-medium inline-flex items-center"
              >
                {expandedItems[post.post_id] ? (
                  <>
                    <span>Hide</span>
                    <ChevronUp className="h-3 w-3 ml-0.5" />
                  </>
                ) : (
                  <>
                    <span>More</span>
                    <ChevronDown className="h-3 w-3 ml-0.5" />
                  </>
                )}
              </button>
            )}

            {post.parent && (
              <>
                <p className="mb-3">
                  {expandedItems[`${post.post_id}_parent`]
                    ? post.parent.body
                    : post.parent.body?.length > 200
                      ? post.parent.body.slice(0, 200) + "..."
                      : post.parent.body}
                </p>
                {post.parent.body && post.parent.body.length > 200 && (
                  <button
                    onClick={() => toggleExpand(post.post_id, "parent")}
                    className="text-[#5DA05D] hover:text-[#5DA05D] ml-1 text-sm font-medium inline-flex items-center"
                  >
                    {expandedItems[`${post.post_id}_parent`] ? (
                      <>
                        <span>Hide</span>
                        <ChevronUp className="h-3 w-3 ml-0.5" />
                      </>
                    ) : (
                      <>
                        <span>More</span>
                        <ChevronDown className="h-3 w-3 ml-0.5" />
                      </>
                    )}
                  </button>
                )}
              </>
            )}


            <div className="mt-3 grid grid-cols-12 gap-1 overflow-hidden">
              <div className="col-span-6">
                {(post.pic1 && post.pic1 !== "N/A") && (
                  <img src={post.pic1} alt="Post Image 1" className="w-full max-h-[300px] object-cover rounded-md" />
                )}
                {post.parent?.pic1 && post.parent.pic1 !== "N/A" && (
                  <img src={post.parent.pic1} alt="Parent Post Image 1" className="w-full max-h-[300px] object-cover rounded-md" />
                )}
              </div>
              <div className="col-span-6 flex flex-col gap-1">
                {(post.pic2 && post.pic2 !== "N/A") && (
                  <img src={post.pic2} alt="Post Image 2" className="w-full h-[148px] object-cover rounded-md" />
                )}
                {(post.pic3 && post.pic3 !== "N/A") && (
                  <img src={post.pic3} alt="Post Image 3" className="w-full h-[148px] object-cover rounded-md" />
                )}
                {(post.parent?.pic2 && post.parent.pic2 !== "N/A") && (
                  <img src={post.parent.pic2} alt="Parent Post Image 2" className="w-full h-[148px] object-cover rounded-md" />
                )}
                {(post.parent?.pic3 && post.parent.pic3 !== "N/A") && (
                  <img src={post.parent.pic3} alt="Parent Post Image 3" className="w-full h-[148px] object-cover rounded-md" />
                )}
              </div>
            </div>

            {(post.video && post.video !== "N/A") && (
              <div className="mt-3 max-w-lg overflow-hidden rounded-lg border border-gray-200 p-1">
                <video src={post.video} controls className="w-full h-[200px] object-cover" />
              </div>
            )}
            {(post.parent?.video && post.parent.video !== "N/A") && (
              <div className="mt-3 max-w-lg overflow-hidden rounded-lg border border-gray-200 p-1">
                <video src={post.parent.video} controls className="w-full h-[200px] object-cover" />
              </div>
            )}

            <SocialBar post={post} fetchPosts={() => fetchPosts(1)} />
          </div>
        );
      })} */}
      {mentorsPosts.map((post) => {
        const userId = post.profile.id;
        const isSelf = post.is_self;
        const canFollow = post.can_follow;
        const isFollowing = !canFollow && !isSelf;
        const showFollowButton = !isSelf && (canFollow || isFollowing);

        return (
          <div key={post.post_id} className="border border-gray-300 rounded-lg p-4 my-5">
            {/* Reposting user's header */}
            <div className="flex gap-3 mb-2 items-center">
              <Link to={`/person-profile/${post.profile.id}`} className="flex gap-3 items-center">
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
                  <div className="flex items-center gap-1">
                    <p>{formatTimeAgo(post.time_stamp)}</p>
                    <Clock className="w-3 h-3" />
                  </div>
                </div>
              </Link>

              {showFollowButton && (
                <button
                  onClick={() => isFollowing ? handleUnfollow(userId) : handleFollow(userId)}
                  className={`ml-auto px-3 py-1 text-xs rounded border flex items-center gap-1
              ${isFollowing
                      ? "text-gray-500 border-gray-500 bg-gray-50"
                      : "text-[#5DA05D] border-[#5DA05D] hover:bg-[#5DA05D] hover:text-white"
                    }`}
                >
                  {isFollowing ? "Following" : "Follow"}
                </button>
              )}
            </div>

            {/* Repost body (optional message from current user) */}
            {post.body && (
              <p className="mb-3">
                {expandedItems[post.post_id]
                  ? post.body
                  : post.body?.length > 200
                    ? post.body.slice(0, 200) + "..."
                    : post.body}
              </p>
            )}
            {post.body && post.body.length > 200 && (
              <button
                onClick={() => toggleExpand(post.post_id)}
                className="text-[#5DA05D] hover:text-[#5DA05D] ml-1 text-sm font-medium inline-flex items-center"
              >
                {expandedItems[post.post_id] ? (
                  <>
                    <span>Hide</span>
                    <ChevronUp className="h-3 w-3 ml-0.5" />
                  </>
                ) : (
                  <>
                    <span>More</span>
                    <ChevronDown className="h-3 w-3 ml-0.5" />
                  </>
                )}
              </button>
            )}

            {/* Parent/original post displayed inside a quoted box */}
            {post.parent && (
              <div className="border border-gray-200 rounded-lg p-3 bg-gray-50">
                <div className="flex gap-3 mb-2 items-center">
                  <Link to={`/person-profile/${post.parent.profile.id}`} className="flex gap-3 items-center">
                    <img
                      src={post.parent.profile?.profile_photo || "/images/profile.png"}
                      alt="parent profile"
                      className="w-10 h-10 rounded-full object-cover"
                    />
                    <div className="flex flex-col">
                      <h3 className="font-semibold text-sm">
                        {post.parent.profile?.first_name || "User"} {post.parent.profile?.last_name}
                      </h3>
                      <p className="font-light text-xs">{post.parent.profile?.qualification || "User"}</p>
                    </div>
                  </Link>
                </div>

                <p className="mb-3">
                  {expandedItems[`${post.post_id}_parent`]
                    ? post.parent.body
                    : post.parent.body?.length > 200
                      ? post.parent.body.slice(0, 200) + "..."
                      : post.parent.body}
                </p>
                {post.parent.body && post.parent.body.length > 200 && (
                  <button
                    onClick={() => toggleExpand(post.post_id, "parent")}
                    className="text-[#5DA05D] hover:text-[#5DA05D] ml-1 text-sm font-medium inline-flex items-center"
                  >
                    {expandedItems[`${post.post_id}_parent`] ? (
                      <>
                        <span>Hide</span>
                        <ChevronUp className="h-3 w-3 ml-0.5" />
                      </>
                    ) : (
                      <>
                        <span>More</span>
                        <ChevronDown className="h-3 w-3 ml-0.5" />
                      </>
                    )}
                  </button>
                )}

                {/* Parent images */}
                <div className="mt-3 grid grid-cols-12 gap-1">
                  <div className="col-span-6">
                    {(post.parent?.pic1 && post.parent.pic1 !== "N/A") && (
                      <img src={post.parent.pic1} alt="Parent Post Image 1" className="w-full max-h-[300px] object-cover rounded-md" />
                    )}
                  </div>
                  <div className="col-span-6 flex flex-col gap-1">
                    {(post.parent?.pic2 && post.parent.pic2 !== "N/A") && (
                      <img src={post.parent.pic2} alt="Parent Post Image 2" className="w-full h-[148px] object-cover rounded-md" />
                    )}
                    {(post.parent?.pic3 && post.parent.pic3 !== "N/A") && (
                      <img src={post.parent.pic3} alt="Parent Post Image 3" className="w-full h-[148px] object-cover rounded-md" />
                    )}
                  </div>
                </div>

                {/* Parent video */}
                {(post.parent?.video && post.parent.video !== "N/A") && (
                  <div className="mt-3 max-w-lg overflow-hidden rounded-lg border border-gray-200 p-1">
                    <video src={post.parent.video} controls className="w-full h-[200px] object-cover" />
                  </div>
                )}
              </div>
            )}

            <SocialBar post={post} fetchPosts={() => fetchPosts(1)} />
          </div>
        );
      })}
      {hasMore && (
        <div className="text-center my-4">
          <button
            onClick={handleLoadMore}
            disabled={loading}
            className="px-4 py-2 bg-[#5DA05D] text-white rounded-lg hover:bg-[#4c8c4c]"
          >
            {loading ? "Loading..." : "Show More"}
          </button>
        </div>
      )}
    </div>
  );
}
