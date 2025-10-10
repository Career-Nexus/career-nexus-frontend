

"use client";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Share2, Twitter, Facebook, Mail, Heart, MessageCircle, Repeat2 } from "lucide-react";
import { PostService } from "../../../api/PostService";
import { appUrl } from "../../../api/ApiServiceThree";
import AuthNavbar from "../../layout/AuthNavbar";


export default function SharePage() {
  const navigate = useNavigate();
  const { hash } = useParams();
  const [copied, setCopied] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [postData, setPostData] = useState(null);
  const [loading, setLoading] = useState(true);

  //const shareLink = `${window.location.origin}/share/${hash}`;
  const baseUrls = appUrl || window.location.origin;

  const shareLink = `${baseUrls}/share/${hash}`;

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const result = await PostService.retrieveSharedPost(hash);
        if (result.success) {
          setPostData(result.data);
        } else {
          console.error("Failed to retrieve post:", result.error);
        }
      } catch (err) {
        console.error("Error fetching shared post:", err);
      }
      setLoading(false);
    };
    fetchPost();
  }, [hash]);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(shareLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleLoginRedirect = () => {
    navigate("/login", { state: { from: `/share/${hash}` } });
  };

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-gray-500">Loading shared post...</p>
      </div>
    );

  if (!postData)
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-gray-500">No post found or invalid link.</p>
      </div>
    );

  // Check if post has a parent
  const displayPost = postData.post.parent ? postData.post.parent : postData.post;
  const isRepost = !!postData.post.parent;

  return (
    <div>
      <div>
        <AuthNavbar />
      </div>
      <div>
        <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-6">
          <div className="w-full max-w-3xl bg-white shadow-md rounded-2xl p-8">
            <div className="flex items-center mb-6">
              <Share2 className="w-6 h-6 text-[#5DA05D] mr-2" />
              <h1 className="text-xl font-semibold text-gray-800">Shared Post</h1>
            </div>

            {/* 🔁 Shared By Section */}
            {postData.shared_by && (
              <div className="flex items-center mb-4">
                <img
                  src={postData.shared_by.profile_photo}
                  alt="Shared by"
                  className="w-10 h-10 rounded-full object-cover mr-3"
                />
                <div>
                  <p className="text-sm font-medium text-gray-800">
                    Shared by {postData.shared_by.first_name} {postData.shared_by.last_name}
                  </p>
                  <p className="text-xs text-gray-500">{postData.shared_by.qualification}</p>
                </div>
              </div>
            )}

            {/* 🧩 If it’s a repost, show “shared post” info */}
            {isRepost && (
              <div className="border-l-4 border-[#5DA05D] pl-3 mb-4 text-sm text-gray-600">
                <div className="flex items-center mb-3">
                  <img
                    src={postData.post.profile?.profile_photo}
                    alt="reposter"
                    className="w-10 h-10 rounded-full mr-3 object-cover"
                  />
                  <div>
                    <h2 className="text-sm font-medium text-gray-800">
                      {postData.post.profile.first_name} {postData.post.profile.last_name}
                    </h2>
                    <p className="text-xs text-gray-500">{postData.post.profile?.qualification}</p>
                  </div>
                </div>

                <p>{postData.post.body}</p>
                {postData.post.pic1 && postData.post.pic1 !== "N/A" && (
                  <img
                    src={postData.post.pic1}
                    alt="post content"
                    className="rounded-lg w-full object-cover mb-2"
                  />
                )}

                {postData.post.video && postData.post.video !== "N/A" && (
                  <video
                    src={postData.post.video}
                    controls
                    className="rounded-lg w-full object-cover mt-2"
                  />
                )}
              </div>
            )}

            {/* 📝 Display Post Content */}
            <div className="border border-gray-200 rounded-xl p-4 mb-6">
              <div className="flex items-center mb-3">
                <img
                  src={displayPost.profile?.profile_photo}
                  alt="poster"
                  className="w-10 h-10 rounded-full mr-3 object-cover"
                />
                <div>
                  <h2 className="text-sm font-medium text-gray-800">
                    {displayPost.profile?.first_name} {displayPost.profile?.last_name}
                  </h2>
                  <p className="text-xs text-gray-500">{displayPost.profile?.qualification}</p>
                </div>
              </div>

              <p className="text-gray-700 text-sm whitespace-pre-line mb-3">
                {displayPost.body}
              </p>

              {displayPost.pic1 && displayPost.pic1 !== "N/A" && (
                <img
                  src={displayPost.pic1}
                  alt="post content"
                  className="rounded-lg w-full object-cover mb-2"
                />
              )}

              {displayPost.video && displayPost.video !== "N/A" && (
                <video
                  src={displayPost.video}
                  controls
                  className="rounded-lg w-full object-cover mt-2"
                />
              )}
            </div>

            {/* 📊 Post Stats */}
            <div className="flex justify-around text-gray-500 text-sm mb-6">
              <div className="flex items-center space-x-1">
                <Heart className="w-4 h-4" /> <span>{postData.post.like_count}</span>
              </div>
              <div className="flex items-center space-x-1">
                <MessageCircle className="w-4 h-4" /> <span>{postData.post.comment_count}</span>
              </div>
              <div className="flex items-center space-x-1">
                <Repeat2 className="w-4 h-4" /> <span>{postData.post.share_count}</span>
              </div>
            </div>

            {/* 🔗 Share Link Section */}
            <div className="flex items-center border rounded-lg overflow-hidden mb-6">
              <input
                type="text"
                readOnly
                value={shareLink}
                className="flex-grow px-3 py-2 text-sm text-gray-600 bg-gray-50 border-0 outline-none"
              />
              <button
                onClick={copyToClipboard}
                className="bg-[#5DA05D] text-white px-3 py-2 text-sm hover:bg-[#4a8a4a] transition"
              >
                {copied ? "Copied!" : "Copy"}
              </button>
            </div>

            {/* 🌍 Social Buttons */}
            <div className="flex justify-center space-x-6 mb-8">
              <a
                href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(
                  "Check out this post!"
                )}&url=${encodeURIComponent(shareLink)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col items-center text-gray-500 hover:text-[#5DA05D]"
              >
                <Twitter className="w-6 h-6 mb-1" />
                <span className="text-xs">Twitter</span>
              </a>

              <a
                href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
                  shareLink
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col items-center text-gray-500 hover:text-[#5DA05D]"
              >
                <Facebook className="w-6 h-6 mb-1" />
                <span className="text-xs">Facebook</span>
              </a>

              <a
                href={`https://api.whatsapp.com/send?text=${encodeURIComponent(
                  `Check out this post: ${shareLink}`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col items-center text-gray-500 hover:text-[#5DA05D]"
              >
                <img src="/images/whatsapp.png" alt="WhatsApp" className="w-6 h-6 mb-1" />
                <span className="text-xs">WhatsApp</span>

              </a>

              <a
                href={`mailto:?subject=Check this out!&body=${encodeURIComponent(
                  `Here's something interesting: ${shareLink}`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col items-center text-gray-500 hover:text-[#5DA05D]"
              >
                <Mail className="w-6 h-6 mb-1" />
                <span className="text-xs">Email</span>
              </a>
            </div>

            {/* 🔒 Auth message */}
            {!isAuthenticated ? (
              <div className="text-center">
                <p className="text-sm text-gray-600 mb-3">
                  You need to log in or sign up to view this post in full.
                </p>
                <button
                  onClick={handleLoginRedirect}
                  className="bg-[#5DA05D] text-white px-6 py-2 rounded-full text-sm font-medium hover:bg-[#4a8a4a] transition"
                >
                  Log In / Sign Up
                </button>
              </div>
            ) : (
              <div className="text-center text-[#5DA05D] font-medium">
                You’re logged in — viewing full content.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

