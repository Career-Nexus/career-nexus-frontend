import { useEffect, useState } from "react"
import { NetworkService } from "../../../api/NetworkService"
import FloatingMessageIcon from "../chat/FloatingMessage"
import { Alert, AlertIcon, Box, Spinner } from "@chakra-ui/react"
import RecomentToFollow from "./RecomentToFollow"
import { toast } from "react-toastify";
import ConnectionsByLocation from "./ConnectionByLocation"
import { Link } from "react-router-dom"

const ConnectionInUserIndustry = () => {
    const [byindustry, setByindustry] = useState([])
    //   const [bylocation, setBylocation] = useState([])
    const [nextPage, setNextPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const [loading, setLoading] = useState(false)
    const [connections, setConnections] = useState([]);
    const [pendingConnections, setPendingConnections] = useState([]);
    const [error, setError] = useState(null)

    const getConnectionByIndustry = async (page = 1) => {
        setLoading(true)
        try {
            const { data } = await NetworkService.recommendbyindustry({ page });
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
    const createConnection = async (userId) => {
        setPendingConnections((prev) => [...prev, userId]);
        try {
            const response = await NetworkService.createConnection({ connection: userId });
            if (response) {
                console.log("Connection created successfully:", response);
                setConnections((prev) => [...prev, response]);
                toast.success("Connection request sent successfully");
            }
        } catch (error) {
            console.error("Error creating connection:", error);
            setError("Failed to create connection");
            toast.error("Failed to create connection");
        }
    };



    if (loading && byindustry.length === 0) {
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

    return (
        <div className="max-w-6xl mx-auto min-h-screen">
            {/* people to follow */}
            <RecomentToFollow />
            {/* Mentors Section */}
            <div className="mb-6 border border-gray-200 rounded-lg md:p-6 p-2">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-semibold text-gray-900">People in your Industry</h2>
                    {/* <button className="text-[#5DA05D] hover:text-[#5DA05D] font-medium text-sm">See all</button> */}
                </div>
                {byindustry.length === 0 ? (
                    <Box textAlign="center" py={10}>
                        <p className="text-gray-500 text-lg">
                            Recommended people in your industry will be displayed here!
                        </p>
                    </Box>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {byindustry.map((suggestion) => (
                            <div key={suggestion.id} className="bg-white rounded-xl border border-gray-200 p-2 flex flex-col items-center text-center space-y-4 transition-shadow duration-200">
                                <Link to={`/person-profile/${suggestion.id}`}>
                                    <div className="relative">
                                        <img
                                            src={suggestion.profile_photo || "/placeholder.svg"}
                                            alt={suggestion.name}
                                            className="w-20 h-20 rounded-full object-cover"
                                        />
                                    </div>

                                    <div className="space-y-1 border-b border-gray-300 pb-3">
                                        <h3 className="font-semibold text-gray-900 text-lg">{suggestion.name}</h3>
                                        <p className="text-xs text-gray-600 leading-relaxed">{suggestion.qualification}</p>
                                        <p className="text-xs text-gray-500">Recommended match</p>
                                    </div>
                                </Link>
                                <button
                                    onClick={() => createConnection(suggestion.id)}
                                    disabled={pendingConnections.includes(suggestion.id)}
                                    className={`w-full py-2 px-4 border ${pendingConnections.includes(suggestion.id)
                                        ? "bg-green-50 text-gray-400 cursor-not-allowed border-gray-300"
                                        : "border-[#5DA05D] text-[#5DA05D] hover:bg-green-50"
                                        } rounded-lg transition-colors duration-200 font-medium text-sm`}
                                >
                                    {pendingConnections.includes(suggestion.id) ? "Pending..." : "Connect"}
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
            <>
                <ConnectionsByLocation />
            </>
            <div>
                <FloatingMessageIcon />
            </div>
        </div>
    )
}
export default ConnectionInUserIndustry