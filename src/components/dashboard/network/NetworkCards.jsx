import { useEffect, useState } from "react"
import FloatingMessageIcon from "../home/FloatingMessage"
import { NetworkService } from "../../../api/NetworkService"
import { Box, Spinner } from "@chakra-ui/react"
import { X } from "lucide-react";
import { Link} from "react-router-dom";

// const NetworkCards = () => {
//   const [byindustry, setByindustry] = useState([])
//   const [bylocation, setBylocation] = useState([])
//   const [loading, setLoading] = useState(false)
//   const [error, setError] = useState(null)

//   const getConnectionByIndustry = () => {
//     setLoading(true)
//     try {
//       const data = NetworkService.recommendbyindustry();
//       const isArray = Array.isArray(data) ? data : data?.results || [];
//       setByindustry(isArray);
//       setError(null)
//     } catch (error) {
//       console.log("failed to fetch", error)
//       setError("error occured while fetching")
//     } finally {
//       setLoading(false)
//     }
//   }

//   const getConnectionByLocation = async () => {
//     setLoading(true)
//     try {
//       const data = await NetworkService.recomendbylocation();
//       const isArray = Array.isArray(data) ? data : data?.results || [];
//       setBylocation(isArray);
//       setError(null);
//     } catch (error) {
//       console.log("could not fetch connection by location", error);
//       setError("could not fetch connection by location");
//     } finally {
//       setLoading(false)
//     }
//   }
//   useEffect(() => {
//     getConnectionByIndustry();
//     getConnectionByLocation();
//   }, [])

//   const mentors = [
//     {
//       id: 1,
//       name: "Jacob Jones",
//       title: "UI/UX Mentor at ijan",
//       followers: "1,800 Followers",
//       avatar: "/images/mentor-img1.png?height=80&width=80",
//       buttonText: "Follow",
//     },
//     {
//       id: 2,
//       name: "Esther Howard",
//       title: "Senior UX Designer at A...",
//       followers: "2,877 Followers",
//       avatar: "/images/mentor-img2.png?height=80&width=80",
//       buttonText: "Follow",
//     },
//     {
//       id: 3,
//       name: "Robert Fox",
//       title: "UX Researcher at Instagram",
//       followers: "2,877 Followers",
//       avatar: "/images/mentor-img3.png?height=80&width=80",
//       buttonText: "Follow",
//     },
//     {
//       id: 4,
//       name: "Jacob Jones",
//       title: "Top Rated UX Mentor",
//       followers: "2,877 Followers",
//       avatar: "/images/mentor-img4.png?height=80&width=80",
//       buttonText: "Follow",
//     },
//   ]

//   const suggestions = [
//     {
//       id: 1,
//       name: "Jacob Jones",
//       credentials: "BSc, MSc(UX), MSc(USA), PSM...",
//       match: "Recommended match",
//       avatar: "/images/mentor-img5.png?height=80&width=80",
//       buttonText: "Connect",
//     },
//     {
//       id: 2,
//       name: "Floyd Miles",
//       credentials: "BSc, MSc(UX), MSc(USA), PSM...",
//       match: "Recommended match",
//       avatar: "/images/mentor-img1.png?height=80&width=80",
//       buttonText: "Connect",
//     },
//     {
//       id: 3,
//       name: "Arlene McCoy",
//       credentials: "BSc, MSc(UX), MSc(USA), PSM...",
//       match: "Recommended match",
//       avatar: "/images/mentor-img2.png?height=80&width=80",
//       buttonText: "Connect",
//     },
//     {
//       id: 4,
//       name: "Eleanor Pena",
//       credentials: "BSc, MSc(UX), MSc(USA), PSM...",
//       match: "Recommended match",
//       avatar: "/images/mentor-img3.png?height=80&width=80",
//       buttonText: "Connect",
//     },
//   ]
//     if (loading && byindustry.length === 0) {
//       return <p>Loading...</p>;
//     }
//     if (loading && bylocation.length === 0) {
//       return <p>Loading...</p>;
//     }

//     if (error) {
//       return <p className="text-red-500">{error}</p>;
//     }

//     if (byindustry.length === 0) {
//       return (
//         <Box textAlign="center" py={10}>
//           <p className="text-gray-500 text-lg">
//             Recommended posts by industry will be displayed here!
//           </p>
//         </Box>
//       );
//     }
//     if (bylocation.length === 0) {
//       return (
//         <Box textAlign="center" py={10}>
//           <p className="text-gray-500 text-lg">
//             Recommended posts by location will be displayed here!
//           </p>
//         </Box>
//       );
//     }

//   const ProfileCard = ({ person, type }) => (
//     <div className="bg-white rounded-xl border border-gray-200 p-2 flex flex-col items-center text-center space-y-4 transition-shadow duration-200">
//       <div className="relative">
//         <img
//           src={person.avatar || "/placeholder.svg"}
//           alt={person.name}
//           className="w-20 h-20 rounded-full object-cover"
//         />
//       </div>

//       <div className="space-y-1 border-b border-gray-300 pb-3">
//         <h3 className="font-semibold text-gray-900 text-lg">{person.results.name}</h3>
//         <p className="text-xs text-gray-600 leading-relaxed">{type === "mentor" ? person.title : person.credentials}</p>
//         <p className="text-xs text-gray-500">{type === "mentor" ? person.followers : person.match}</p>
//       </div>

//       <button className="w-full py-2 px-4 border border-[#5DA05D] text-[#5DA05D] rounded-lg hover:bg-green-50 transition-colors duration-200 font-medium text-sm">
//         {person.buttonText}
//       </button>
//     </div>
//   )

//   return (
//     <div className="max-w-6xl mx-auto min-h-screen">
//       {/* Mentors Section */}
//       <div className="mb-6 border border-gray-200 rounded-lg p-6">
//         <div className="flex justify-between items-center mb-6">
//           <h2 className="text-xl font-semibold text-gray-900">People in your Industry</h2>
//           <button className="text-[#5DA05D] hover:text-[#5DA05D] font-medium text-sm">See all</button>
//         </div>

//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
//           {byindustry.map((mentor) => (
//             <ProfileCard key={mentor.id} person={mentor} type="mentor" />
//           ))}
//         </div>
//       </div>

//       {/* People You Might Know Section */}
//       <div className="mb-12 border border-gray-200 rounded-lg p-6">
//         <div className="flex justify-between items-center mb-6">
//           <h2 className="text-xl font-semibold text-gray-900">People you might know</h2>
//           <button className="text-[#5DA05D] hover:text-[#5DA05D] font-medium text-sm">See all</button>
//         </div>

//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
//           {bylocation.map((person) => (
//             <ProfileCard key={person.id} person={person} type="suggestion" />
//           ))}
//         </div>
//       </div>

//       <div>
//         <FloatingMessageIcon />
//       </div>
//     </div>
//   )
// }
const NetworkCards = () => {
  const [byindustry, setByindustry] = useState([]);
  const [bylocation, setBylocation] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isVisible, setIsVisible] = useState(true);


  const getConnectionByIndustry = async () => {
    setLoading(true);
    try {
      const { success, data } = await NetworkService.recommendbyindustry();
      const isArray = Array.isArray(data?.results) ? data.results : [];
      setByindustry(isArray);
      setError(null);
    } catch (error) {
      console.log("failed to fetch", error);
      setError("Error occurred while fetching industry connections");
    } finally {
      setLoading(false);
    }
  };

  const getConnectionByLocation = async () => {
    setLoading(true);
    try {
      const { success, data } = await NetworkService.recommendbylocation();
      const isArray = Array.isArray(data?.results) ? data.results : [];
      setBylocation(isArray);
      setError(null);
    } catch (error) {
      console.log("could not fetch connection by location", error);
      setError("Error occurred while fetching location connections");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getConnectionByIndustry();
    getConnectionByLocation();
  }, []);

  if (loading && byindustry.length === 0 && bylocation.length === 0) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="200px">
        <Spinner size="lg" color="#5DA05D" thickness="4px" />
      </Box>
    );
  }


  if (error) {
    return <p className="text-red-500">{error}</p>;
  }

  const ProfileCard = ({ person, type }) => (

    <div className="bg-white rounded-xl border border-gray-200 p-2 flex flex-col items-center text-center space-y-4 transition-shadow duration-200">
      <div className="relative">
        <img
          src={person.avatar || "/placeholder.svg"}
          alt={person.name}
          className="w-20 h-20 rounded-full object-cover"
        />
      </div>

      <div className="space-y-1 border-b border-gray-300 pb-3">
        <h3 className="font-semibold text-gray-900 text-lg">{person.name}</h3>
        <p className="text-xs text-gray-600 leading-relaxed">
          {type === "mentor" ? person.title : person.credentials}
        </p>
        <p className="text-xs text-gray-500">
          {type === "mentor" ? person.followers : person.match}
        </p>
      </div>

      <button className="w-full py-2 px-4 border border-[#5DA05D] text-[#5DA05D] rounded-lg hover:bg-green-50 transition-colors duration-200 font-medium text-sm">
        {person.buttonText}
      </button>
    </div>
  );
  if (!isVisible) return null;
  return (
    <div className="max-w-6xl mx-auto min-h-screen">
      <div className="relative inline-block">
        <img src="/images/welcomePop.png" alt="Welcome" className="w-full rounded-lg" />
        <button
          onClick={() => setIsVisible(false)}
          className="absolute top-2 right-3 text-white"
        >
          <X size={16} />
        </button>
      </div>
      {/* Mentors Section */}
      <div className="my-4 border border-gray-200 rounded-lg p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-gray-900">People in your Industry</h2>
          <Link to="/industry" className="text-[#5DA05D] hover:text-[#5DA05D] font-medium text-sm">See all</Link>
        </div>

        {byindustry.length === 0 ? (
          <Box textAlign="center" py={10}>
            <p className="text-gray-500 text-lg">
              Recommended people by industry will be displayed here!
            </p>
          </Box>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {byindustry.map((mentor) => (
              <ProfileCard key={mentor.id} person={mentor} type="mentor" />
            ))}
          </div>
        )}
      </div>

      {/* People You Might Know Section */}
      <div className="mb-12 border border-gray-200 rounded-lg p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-gray-900">People you might know</h2>
          <button className="text-[#5DA05D] hover:text-[#5DA05D] font-medium text-sm">See all</button>
        </div>

        {bylocation.length === 0 ? (
          <Box textAlign="center" py={10}>
            <p className="text-gray-500 text-lg">
              Recommended people by location will be displayed here!
            </p>
          </Box>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {bylocation.map((person) => (
              <ProfileCard key={person.id} person={person} type="suggestion" />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default NetworkCards
