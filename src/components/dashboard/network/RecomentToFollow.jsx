import React, { useEffect, useState } from 'react'
import { NetworkService } from '../../../api/NetworkService';
import { PostService } from '../../../api/PostService';
import { Link } from 'react-router-dom';
import { Box } from '@chakra-ui/react';
import { toast } from "react-toastify";

function RecomentToFollow() {
    const [recommendtofollow, setRecommendToFollow] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [nextPage, setNextPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);


    const getRecommendToFollow = async (page = 1) => {
        setLoading(true);
        try {
            const { success, data } = await NetworkService.recommendtofollow({ page });
            const isArray = Array.isArray(data?.results) ? data.results : [];
            const withFollowState = isArray.map((mentor) => ({
                ...mentor,
                following: false, // Add `following: false` to each mentor
            }));
            setRecommendToFollow((prev) => (page === 1 ? withFollowState : [...prev, ...withFollowState]));

            if (data?.next) {
                const url = new URL(data.next);
                const nextPageNumber = url.searchParams.get("page");
                setNextPage(Number(nextPageNumber));
                setHasMore(true);
            } else {
                setHasMore(false);
            }
            setError(null);
        } catch (error) {
            console.log("failed to fetch", error);
            setError("Error occurred while fetching follow recommendations");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getRecommendToFollow(1);
    }, []);

    const handleLoadMore = () => {
        if (hasMore) {
            getRecommendToFollow(nextPage);
        }
    };
    const handleFollow = async (userId) => {
        try {
            // Optimistically mark as following in local state
            setRecommendToFollow((prev) =>
                prev.map((mentor) =>
                    mentor.id === userId ? { ...mentor, following: true } : mentor
                )
            );
            await PostService.Follow({ user_following: userId });
            toast.success("You are now following this user");
        } catch (err) {
            console.error(err);
            setError("Could not follow user");
            // Roll back if failed:
            setRecommendToFollow((prev) =>
                prev.map((mentor) =>
                    mentor.id === userId ? { ...mentor, following: false } : mentor
                )
            );
        }
    };
    return (
        <div>
            <div className="mb-6 border border-gray-200 rounded-lg md:p-6 p-2">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-semibold text-gray-900">People you can follow</h2>
                </div>

                {recommendtofollow.length === 0 ? (
                    <Box textAlign="center" py={10}>
                        <p className="text-gray-500 text-lg">
                            Recommended people you can follow will be displayed here!
                        </p>
                    </Box>
                ) : (
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 md:gap-4 lg:gap-6">
                        {recommendtofollow.map((follow) => (
                            <div key={follow.id} className="bg-white rounded-xl border border-gray-200 p-2 flex flex-col items-center text-center space-y-4 transition-shadow duration-200">

                                <Link to={`/person-profile/${follow.id}`}>
                                    <div className="relative">
                                        <img
                                            src={follow.profile_photo || "/placeholder.svg"}
                                            alt={follow.name}
                                            className="w-20 h-20 rounded-full object-cover"
                                        />
                                    </div>

                                    <div className="space-y-1 border-b border-gray-300 pb-3">
                                        <h3 className="font-semibold text-gray-900 text-lg">{follow.name}</h3>
                                        <p className="text-xs text-gray-600 leading-relaxed">{follow.qualification}</p>
                                        <p className="text-xs text-gray-500">{follow.followers} followers</p>
                                    </div>
                                </Link>

                                <button
                                    onClick={() => handleFollow(follow.id)}
                                    disabled={follow.following}
                                    className={`w-full py-2 px-4 border ${follow.following
                                        ? "bg-green-50 text-gray-400 cursor-not-allowed border-gray-300"
                                        : "border-[#5DA05D] text-[#5DA05D] hover:bg-green-50"
                                        } rounded-lg transition-colors duration-200 font-medium text-sm`}
                                >
                                    {follow.following ? "Following" : "Follow"}
                                </button>
                            </div>
                        ))}
                    </div>
                )}
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

        </div>
    )
}

export default RecomentToFollow