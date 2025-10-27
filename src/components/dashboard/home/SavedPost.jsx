import React, { useEffect, useState } from 'react'
import { PostService } from '../../../api/PostService';
import SocialBar from './SocialBar';
import { Alert, AlertIcon, Box, Spinner } from '@chakra-ui/react';
import { formatTimeAgo } from './TabInterface';
import { ChevronDown, ChevronUp, Clock } from 'lucide-react';


function SavedPost() {
    const [savedPost, setSavedPost] = useState([])
    const [expandedItems, setExpandedItems] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchPosts = async () => {
        setLoading(true);
        try {
            const data = await PostService.getSavedPost();
            const fetchedPosts = Array.isArray(data?.data) ? data.data : [];
            setSavedPost(fetchedPosts);
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
    const toggleExpand = (id, type = "") => {
        const key = type ? `${id}_${type}` : id;
        setExpandedItems((prev) => ({
            ...prev,
            [key]: !prev[key],
        }));
    };

    if (loading && savedPost.length === 0) {
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

  if (savedPost.length === 0) {
    return (
      <Box textAlign="center" py={10}>
        <p className="text-gray-500 text-lg">No post have been saved. Be the first to save a post!</p>
      </Box>
    );
  }
    return (
        <div>
            {savedPost.map(({ post }) => (
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

                    {/* {expandedItems[post.post_id] && post.article && post.article !== "undefined" && (
                        <div className="mt-2">
                            <p className="text-sm">{post.article}</p>
                        </div>
                    )} */}
                    <div className="mt-3 grid grid-cols-12 gap-1 overflow-hidden">
                        {/* Left big image */}
                        <div className="col-span-6">
                            {post.pic1 && post.pic1 !== "N/A" && (
                                <img
                                    src={post.pic1}
                                    alt="Post Image 1"
                                    className="w-full h-full max-h-[200px] object-cover rounded-md"
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
            ))}
        </div>
    )
}

export default SavedPost