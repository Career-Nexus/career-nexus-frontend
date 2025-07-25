import { useEffect, useState } from "react"
import { NetworkService } from "../../../api/NetworkService"
import FloatingMessageIcon from "../home/FloatingMessage"
import { Box } from "@chakra-ui/react"

const ConnectionInUserIndustry = () => {
    const [byindustry, setByindustry] = useState([])
    //   const [bylocation, setBylocation] = useState([])
    const [nextPage, setNextPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    const getConnectionByIndustry = async(page = 1) => {
        setLoading(true)
        try {
            const data = await NetworkService.recommendbyindustry({ page });
            const isArray = Array.isArray(data) ? data : data?.results || [];
            setByindustry((prev) => (page === 1 ? isArray : [...prev, ...isArray]));

            if (data?.next) {
                const url = new URL(data.next);
                const nextPageNumber = url.searchParams.get("page");
                setNextPage(Number(nextPageNumber));
                setHasMore(true);
            } else {
                setHasMore(false);
            }
            setError(null)
        } catch (error) {
            console.log("failed to fetch", error)
            setError("error occured while fetching")
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        getConnectionByIndustry(1);
    }, [])

    const handleLoadMore = () => {
        if (hasMore) {
            getConnectionByIndustry(nextPage);
        }
    };
    const handleFollow = async (userId) => {
        try {
            await PostService.Follow({ user_following: userId });
            getConnectionByIndustry();
        } catch (err) {
            console.error(err);
            setError("Could not follow user");
        }
    };

    const mentors = [
        {
            id: 1,
            name: "Jacob Jones",
            title: "UI/UX Mentor at ijan",
            followers: "1,800 Followers",
            avatar: "/images/mentor-img1.png?height=80&width=80",
            buttonText: "Follow",
        },
        {
            id: 2,
            name: "Esther Howard",
            title: "Senior UX Designer at A...",
            followers: "2,877 Followers",
            avatar: "/images/mentor-img2.png?height=80&width=80",
            buttonText: "Follow",
        },
        {
            id: 3,
            name: "Robert Fox",
            title: "UX Researcher at Instagram",
            followers: "2,877 Followers",
            avatar: "/images/mentor-img3.png?height=80&width=80",
            buttonText: "Follow",
        },
        {
            id: 4,
            name: "Jacob Jones",
            title: "Top Rated UX Mentor",
            followers: "2,877 Followers",
            avatar: "/images/mentor-img4.png?height=80&width=80",
            buttonText: "Follow",
        },
        {
            id: 5,
            name: "Jacob Jones",
            title: "UI/UX Mentor at ijan",
            followers: "1,800 Followers",
            avatar: "/images/mentor-img1.png?height=80&width=80",
            buttonText: "Follow",
        },
        {
            id: 6,
            name: "Esther Howard",
            title: "Senior UX Designer at A...",
            followers: "2,877 Followers",
            avatar: "/images/mentor-img2.png?height=80&width=80",
            buttonText: "Follow",
        },
        {
            id: 7,
            name: "Robert Fox",
            title: "UX Researcher at Instagram",
            followers: "2,877 Followers",
            avatar: "/images/mentor-img3.png?height=80&width=80",
            buttonText: "Follow",
        },
        {
            id: 8,
            name: "Jacob Jones",
            title: "Top Rated UX Mentor",
            followers: "2,877 Followers",
            avatar: "/images/mentor-img4.png?height=80&width=80",
            buttonText: "Follow",
        },
    ]
    const suggestions = [
        {
            id: 1,
            name: "Jacob Jones",
            credentials: "BSc, MSc(UX), MSc(USA), PSM...",
            match: "Recommended match",
            avatar: "/images/mentor-img5.png?height=80&width=80",
            buttonText: "Connect",
        },
        {
            id: 2,
            name: "Floyd Miles",
            credentials: "BSc, MSc(UX), MSc(USA), PSM...",
            match: "Recommended match",
            avatar: "/images/mentor-img1.png?height=80&width=80",
            buttonText: "Connect",
        },
        {
            id: 3,
            name: "Arlene McCoy",
            credentials: "BSc, MSc(UX), MSc(USA), PSM...",
            match: "Recommended match",
            avatar: "/images/mentor-img2.png?height=80&width=80",
            buttonText: "Connect",
        },
        {
            id: 4,
            name: "Eleanor Pena",
            credentials: "BSc, MSc(UX), MSc(USA), PSM...",
            match: "Recommended match",
            avatar: "/images/mentor-img3.png?height=80&width=80",
            buttonText: "Connect",
        },
    ]

    if (loading && mentors.length === 0) {
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
    if (mentors.length === 0) {
        return (
            <Box textAlign="center" py={10}>
                <p className="text-gray-500 text-lg">
                    Recommended posts by industry will be displayed here!
                </p>
            </Box>
        );
    }
    return (
        <div className="max-w-6xl mx-auto min-h-screen">
            {/* Mentors Section */}
            <div className="mb-6 border border-gray-200 rounded-lg p-6">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-semibold text-gray-900">People in your Industry</h2>
                    <button className="text-[#5DA05D] hover:text-[#5DA05D] font-medium text-sm">See all</button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {mentors.map((mentor) => (
                        // <ProfileCard key={mentor.id} person={mentor} type="mentor" />
                        <div className="bg-white rounded-xl border border-gray-200 p-2 flex flex-col items-center text-center space-y-4 transition-shadow duration-200">

                            <div className="relative">
                                <img
                                    src={mentor.avatar || "/placeholder.svg"}
                                    alt={mentor.name}
                                    className="w-20 h-20 rounded-full object-cover"
                                />
                            </div>

                            <div className="space-y-1 border-b border-gray-300 pb-3">
                                <h3 className="font-semibold text-gray-900 text-lg">{mentor.name}</h3>
                                <p className="text-xs text-gray-600 leading-relaxed">{mentor.title}</p>
                                <p className="text-xs text-gray-500">{mentor.followers}</p>
                            </div>
                            <button className="w-full py-2 px-4 border border-[#5DA05D] text-[#5DA05D] rounded-lg hover:bg-green-50 transition-colors duration-200 font-medium text-sm">
                                {mentor.buttonText}
                            </button>
                        </div>
                    ))}
                </div>
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

            <div>
                <FloatingMessageIcon />
            </div>
        </div>
    )
}
export default ConnectionInUserIndustry