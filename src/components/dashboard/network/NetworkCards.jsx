import { useEffect, useState } from "react"
import FloatingMessageIcon from "../home/FloatingMessage"
import { NetworkService } from "../../../api/NetworkService"
import { Box, Spinner } from "@chakra-ui/react"
import { Link } from "react-router-dom";
import { PostService } from "../../../api/PostService";
import PendingInvitations from "./PendingInvitations";
import PeopleInYourIndustry from "./PeopleInYourIndustry";
import PeopleInYourLocation from "./PeopleInYourLocation";
import { toast } from "react-toastify";

const NetworkCards = () => {
  const [recommendtofollow, setRecommendToFollow] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const getRecommendToFollow = async () => {
    setLoading(true);
    try {
      const { success, data } = await NetworkService.recommendtofollow();
      const isArray = Array.isArray(data?.results) ? data.results : [];
      const withFollowState = isArray.map((mentor) => ({
        ...mentor,
        following: false, // Add `following: false` to each mentor
      }));
      setRecommendToFollow(withFollowState);
      setError(null);
    } catch (error) {
      console.log("failed to fetch", error);
      setError("Error occurred while fetching follow recommendations");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getRecommendToFollow();
  }, []);

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

  if (loading && recommendtofollow.length === 0) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="200px">
        <Spinner size="lg" color="#5DA05D" thickness="4px" />
      </Box>
    );
  }


  if (error) {
    return <p className="text-red-500">{error}</p>;
  }

  return (
    <div className="max-w-6xl mx-auto min-h-screen">
      <div className="mb-6">
        <PendingInvitations />
      </div>
      {/* people you can follow */}
      <div className="mb-6 border border-gray-200 rounded-lg p-6">

        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-gray-900">People you can follow</h2>
          <Link to="/industry" className="text-[#5DA05D] hover:text-[#5DA05D] font-medium text-sm">See all</Link>
        </div>

        {recommendtofollow.length === 0 ? (
          <Box textAlign="center" py={10}>
            <p className="text-gray-500 text-lg">
              Recommended people you can follow will be displayed here!
            </p>
          </Box>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {recommendtofollow.slice(0, 4).map((follow) => (
              // <ProfileCard key={mentor.id} person={mentor} type="mentor" />
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
                {/* <button onClick={() => handleFollow(mentor.id)} className="w-full py-2 px-4 border border-[#5DA05D] text-[#5DA05D] rounded-lg hover:bg-green-50 transition-colors duration-200 font-medium text-sm">
                  Follow
                </button> */}
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
      </div>
      <div>
        <PeopleInYourIndustry />
      </div>
      <div>
        <PeopleInYourLocation />
      </div>
      <div>
        <FloatingMessageIcon />
      </div>
    </div>
  );
};

export default NetworkCards

