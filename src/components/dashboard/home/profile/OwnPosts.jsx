import { ChevronDown, ChevronUp, Clock } from "lucide-react";
import SocialBar from "../SocialBar";
import { formatTimeAgo } from "../TabInterface";
import { PostService } from "../../../../api/PostService";
import { useEffect, useState } from "react";
import { Box, Spinner } from "@chakra-ui/react";
import { Delete } from "../../../../icons/icon";
import { toast } from "react-toastify";

export default function PostsTemplate() {
  const [expandedItems, setExpandedItems] = useState({});
  const [userPosts, setUserPosts] = useState([]);
  const [nextPage, setNextPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchPosts = async (page = 1) => {
    setLoading(true);
    try {
      const data = await PostService.getUserPosts({ page });
      const newPosts = Array.isArray(data) ? data : data?.results || [];
      setUserPosts(prev => page === 1 ? newPosts : [...prev, ...newPosts]);

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

  const handleDeletePost = async (postId) => {
    try {
      await PostService.deleteOwnPost(postId);
      toast.success("Post deleted successfully");
      setUserPosts((prev) => prev.filter((post) => post.post_id !== postId));
    } catch (err) {
      console.error("Error deleting post:", err);
      setError("Failed to delete post.");
    }
  };

  const handleLoadMore = () => {
    if (hasMore && !loading) {
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

  if (loading && userPosts.length === 0) {
        return (
          <Box display="flex" justifyContent="center" alignItems="center" height="200px">
            <Spinner size="lg" color="#5DA05D" thickness="4px" />
          </Box>
        );
      }

  if (error) {
    return <p className="text-red-500">{error}</p>;
  }

  if (userPosts.length === 0) {
    return (
      <Box textAlign="center" py={10}>
        <p className="text-gray-500 text-lg">
          All posts created by user will be displayed here!
        </p>
      </Box>
    );
  }

  return (
    <div>
      {userPosts.map((post) => (
        <div key={post.post_id} className="border border-gray-300 rounded-lg p-4 my-5">
          <div className="flex justify-between">
            <div className="flex gap-3 mb-2 items-center">
            <img
              src={post.profile?.profile_photo || "/images/profile.png"}
              alt="profile"
              className="w-12 h-12 rounded-full object-cover"
            />
            <div className="flex flex-col justify-center">
              <h3 className="font-semibold text-sm">
                {post.profile?.first_name} {post.profile?.last_name}
              </h3>
              <p className="font-light text-sm">{post.profile?.qualification}</p>
              <div className="flex items-center gap-1">
                <p>{formatTimeAgo(post.time_stamp)}</p>
                <Clock className="w-3 h-3" />
              </div>
            </div>
          </div>
          <button onClick={() => handleDeletePost(post.post_id)} className="mr-2 cursor-pointer">
            <Delete />
          </button>
          </div>

          <p className="mb-3 whitespace-pre-line">
              {expandedItems[post.post_id]
                ? post.body
                : post.body?.length > 200
                  ? post.body.slice(0, 200) + "..."
                  : post.body}
            </p>
            {post.body && post.body.length > 200 && (
            <button
              onClick={() => toggleExpand(post.post_id)}
              className="text-[#5DA05D] hover:text-blue-700 ml-1 text-sm font-medium inline-flex items-center"
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

          {/* {expandedItems[post.post_id] && post.article && post.article !== "undefined" && (
            <div className="mt-2">
              <p className="text-sm">{post.article}</p>
            </div>
          )} */}

          <div className="mt-3 grid grid-cols-12 gap-1 overflow-hidden">
            <div className="col-span-6">
              {post.pic1 && post.pic1 !== "N/A" && (
                <img
                  src={post.pic1}
                  alt="Post Image 1"
                  className="w-full h-full max-h-[200px] object-cover rounded-md"
                />
              )}
            </div>

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
          <SocialBar post={post} fetchPosts={()=>fetchPosts(1)} />
        </div>
      ))}

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