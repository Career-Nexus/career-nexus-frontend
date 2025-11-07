import React, { useState, useEffect } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { AiOutlineLike } from "react-icons/ai";
import { FaRegComment } from "react-icons/fa6";
import { GoShare } from "react-icons/go";
import { motion, AnimatePresence } from "framer-motion";
import { PostService } from "../../api/PostService";
import SocialBar from "../../components/dashboard/home/SocialBar";

export default function PostSection() {
  const [posts, setPosts] = useState([]);
  const [expandedItems, setExpandedItems] = useState({});

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const res = await PostService.getOwnPosts();
      setPosts(res.data.results || []);
    } catch (err) {
      console.error("Error fetching posts:", err);
    }
  };

  const toggleExpand = (postId) => {
    setExpandedItems((prev) => ({
      ...prev,
      [postId]: !prev[postId],
    }));
  };

  return (
    <div className="space-y-6">
      {posts.length === 0 ? (
        <p className="text-gray-500 text-center py-10">No posts available</p>
      ) : (
        posts.map((post) => (
          <motion.div
            key={post.post_id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2 }}
            className="bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition "
          >
            {/* === POST HEADER === */}
            <div className="flex items-start gap-3 p-4">
              <img
                src={post.profile.profile_photo}
                alt={post.profile.first_name}
                className="w-10 h-10 rounded-full object-cover"
              />
              <div>
                <h4 className="font-semibold text-gray-800">
                  {post.profile.first_name} {post.profile.last_name}
                </h4>
                <p className="text-xs text-gray-500">
                  {post.profile.qualification}
                </p>
                <p className="text-xs text-gray-400 mt-1">
                  {new Date(post.time_stamp).toLocaleString()}
                </p>
              </div>
            </div>

            {/* === POST BODY === */}
            <div className="px-4 pb-3 text-gray-700 text-sm">
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
            </div>

            {/* === PARENT (if shared) === */}
            {post.parent && (
              <div className="mx-4 mb-3 border border-gray-200 rounded-md bg-gray-50 p-3">
                <div className="flex items-start gap-2">
                  <img
                    src={post.parent.profile.profile_photo}
                    alt={post.parent.profile.first_name}
                    className="w-8 h-8 rounded-full object-cover"
                  />
                  <div>
                    <p className="text-sm font-semibold text-gray-700">
                      {post.parent.profile.first_name}{" "}
                      {post.parent.profile.last_name}
                    </p>
                    <p className="text-xs text-gray-400">
                      {new Date(post.parent.time_stamp).toLocaleDateString()}
                    </p>
                    <p className="text-gray-600 text-sm mt-1">
                      {post.parent.body}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* === MEDIA === */}
            {post.pic1 !== "N/A" && (
              <div className="w-full h-72 overflow-hidden">
                <img
                  src={post.pic1}
                  alt="post"
                  className="w-full h-full object-cover"
                />
              </div>
            )}
            <div>
            <SocialBar post={post} fetchPosts={fetchPosts} postId={post.post_id} />
            </div>
          </motion.div>
        ))
      )}
    </div>
  );
}
