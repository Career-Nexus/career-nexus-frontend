const NetworkCards = () => {
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

  const ProfileCard = ({ person, type }) => (
    <div className="bg-white rounded-xl border border-gray-200 p-6 flex flex-col items-center text-center space-y-4 hover:shadow-md transition-shadow duration-200">
      <div className="relative">
        <img
          src={person.avatar || "/placeholder.svg"}
          alt={person.name}
          className="w-20 h-20 rounded-full object-cover"
        />
      </div>

      <div className="space-y-1">
        <h3 className="font-semibold text-gray-900 text-lg">{person.name}</h3>
        <p className="text-sm text-gray-600 leading-relaxed">{type === "mentor" ? person.title : person.credentials}</p>
        <p className="text-xs text-gray-500">{type === "mentor" ? person.followers : person.match}</p>
      </div>

      <button className="w-full py-2.5 px-4 border border-green-500 text-green-600 rounded-lg hover:bg-green-50 transition-colors duration-200 font-medium text-sm">
        {person.buttonText}
      </button>
    </div>
  )

  return (
    <div className="max-w-6xl mx-auto p-6 bg-gray-50 min-h-screen">
      {/* Mentors Section */}
      <div className="mb-12">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-gray-900">Mentors in UI/UX Industry</h2>
          <button className="text-green-600 hover:text-green-700 font-medium text-sm">See all</button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {mentors.map((mentor) => (
            <ProfileCard key={mentor.id} person={mentor} type="mentor" />
          ))}
        </div>
      </div>

      {/* People You Might Know Section */}
      <div className="mb-12">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-gray-900">People you might know</h2>
          <button className="text-green-600 hover:text-green-700 font-medium text-sm">See all</button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {suggestions.map((person) => (
            <ProfileCard key={person.id} person={person} type="suggestion" />
          ))}
        </div>
      </div>

      {/* Floating Chat Button */}
      <div className="fixed bottom-6 right-6">
        <button className="bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-lg transition-colors duration-200 relative">
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
            />
          </svg>
          {/* Notification dot */}
          <div className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
            2
          </div>
        </button>
      </div>
    </div>
  )
}

export default NetworkCards
