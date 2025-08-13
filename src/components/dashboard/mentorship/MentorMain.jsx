
"use client"

import { Bookmark, ChevronDown, Search, Star } from "lucide-react"
import { useContext, useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { MentorServices } from "../../../api/MentorServices"
import { UserContext } from "../../../context/UserContext"
import { Box, Spinner } from "@chakra-ui/react"
import MentorshipRequests from "./MentorshipRequests"
import { toast } from "react-toastify";

const Dropdown = ({ label, options, value, onChange }) => {
  const [open, setOpen] = useState(false)
  const [selectedValue, setSelectedValue] = useState(value || "")

  const handleSelect = (option) => {
    setSelectedValue(option)
    onChange(option)
    setOpen(false)
  }

  const handleClear = () => {
    setSelectedValue("")
    onChange("")
    setOpen(false)
  }

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="flex items-center justify-between px-3 py-2 border border-gray-300 rounded-lg bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[#5DA05D] focus:border-transparent min-w-[140px]"
      >
        <span className="text-sm text-gray-700">{selectedValue || label}</span>
        <ChevronDown className={`w-4 h-4 transition-transform ${open ? "rotate-180" : ""}`} />
      </button>

      {open && (
        <div className="absolute top-full left-0 mt-1 w-full bg-white border border-gray-300 rounded-lg shadow-lg z-10">
          {selectedValue && (
            <button
              onClick={handleClear}
              className="w-full px-3 py-2 text-left text-sm text-gray-500 hover:bg-gray-50 border-b border-gray-100"
            >
              Clear selection
            </button>
          )}
          {options.map((option) => (
            <button
              key={option}
              onClick={() => handleSelect(option)}
              className={`w-full px-3 py-2 text-left text-sm hover:bg-gray-50 capitalize ${selectedValue === option ? "bg-[#5DA05D] text-white" : "text-gray-700"
                }`}
            >
              {option}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

const MentorCard = ({ mentor }) => {
  const fullName = `${mentor.first_name} ${mentor.last_name}`;
  const profilePhoto = mentor.profile_photo;
  const jobTitle = mentor.current_job;
  const rating = mentor.rating || "4.0";
  const { userwithid } = useContext(UserContext);

  const [mentorSession, setMentorSession] = useState([]);
  const [booking, setBooking] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    session_type: "individual",
    date: "",
    time: "",
    discourse: ""
  });

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const submitBooking = async () => {
    const payload = {
      mentor: mentor.id,
      ...formData
    };

    if (!formData.date || !formData.time || !formData.discourse) {
      toast.error("Please fill in all fields");
      return;
    }

    setMentorSession((prev) => [...prev, mentor.id]);
    try {
      const response = await MentorServices.bookmentorsession(payload);
      if (response) {
        setBooking((prev) => [...prev, response]);
        toast.success("Mentor booking initiated successfully");
        closeModal();
      }
    } catch (error) {
      toast.error("Failed to book session");
    }
  };

  return (
    <>
      {/* Mentor Card */}
      <div className="bg-white border rounded-lg shadow-sm overflow-hidden">
        <div className="flex justify-between p-3">
          <Link to={`/mentordetails/${mentor.id}`} className="flex gap-2">
            <img
              src={profilePhoto || "/placeholder.svg"}
              alt={fullName}
              className="w-14 h-14 rounded-full object-cover p-2"
            />
            <div>
              <h2 className="font-semibold text-lg">{fullName}</h2>
              <p className="text-sm text-gray-600">{jobTitle}</p>
              <p>{mentor.years_of_experience || 0} Years Experience</p>
            </div>
          </Link>
          <div className="flex gap-1 text-sm text-yellow-300">
            {Array.from({ length: Math.floor(rating) }).map((_, i) => (
              <Star className="fill-yellow-300" size={12} key={i} />
            ))}
            <span className="text-black mt-[-6px]">{rating}</span>
          </div>
        </div>
        <div className="flex flex-wrap items-center justify-between mt-2 p-4">
          {mentor.technical_skills?.slice(0, 4).map((skill, idx) => (
            <span key={idx} className="bg-[#2A0D471A] px-4 rounded-lg">
              {skill}
            </span>
          ))}
        </div>
        <div className="flex items-center justify-center gap-5 my-5">
          <button
            onClick={openModal}
            disabled={mentorSession.includes(mentor.id)}
            className={`py-2 px-4 border ${mentorSession.includes(mentor.id)
              ? "bg-green-50 text-gray-400 cursor-not-allowed border-gray-300"
              : "bg-[#5DA05D] text-white"
              } rounded-lg transition-colors duration-200 font-medium text-sm`}
          >
            {mentorSession.includes(mentor.id) ? "Pending..." : "Book Session"}
          </button>
          <button className="py-2 px-4 border-2 border-[#5DA05D] text-[#5DA05D] rounded-lg flex gap-2">
            <Bookmark />
            Save
          </button>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
          <div className="bg-white p-6 rounded-lg w-96 shadow-lg">
            <h2 className="text-xl font-semibold mb-4">Book Session</h2>

            <label className="block mb-2 text-sm font-medium">Session Type</label>
            <select
              name="session_type"
              value={formData.session_type}
              onChange={handleChange}
              className="w-full border p-2 rounded mb-4"
            >
              <div className="w-40">
                <option value="individual">Individual</option>
                <option value="group">Group</option>
              </div>
            </select>

            <label className="block mb-2 text-sm font-medium">Date</label>
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              className="w-full border p-2 rounded mb-4"
            />

            <label className="block mb-2 text-sm font-medium">Time</label>
            <input
              type="time"
              name="time"
              value={formData.time}
              onChange={handleChange}
              className="w-full border p-2 rounded mb-4"
            />

            <label className="block mb-2 text-sm font-medium">Discourse</label>
            <input
              type="text"
              name="discourse"
              placeholder="Enter discussion topic"
              value={formData.discourse}
              onChange={handleChange}
              className="w-full border p-2 rounded mb-4"
            />

            <div className="flex justify-end gap-3">
              <button
                onClick={closeModal}
                className="px-4 py-2 bg-gray-200 rounded"
              >
                Cancel
              </button>
              <button
                onClick={submitBooking}
                className="px-4 py-2 bg-[#5DA05D] text-white rounded"
              >
                Book
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

const MentorMain = () => {
  // State management
  const [loading, setLoading] = useState(false)
  const [recommendmentor, setRecommendmentor] = useState([])
  const [searchMentor, setSearchMentor] = useState([])
  const [searchTriggered, setSearchTriggered] = useState(false)
  const [hasMore, setHasMore] = useState(false)
  const [nextPage, setNextPage] = useState(1)
  const [error, setError] = useState(null)

  // Search parameters
  const [searchQuery, setSearchQuery] = useState("")
  const [availability, setAvailability] = useState("")
  const [experienceLevel, setExperienceLevel] = useState("")
  const [skills, setSkills] = useState("")

  // Get user from context
  const { userwithid, user } = useContext(UserContext)
  // const user = userwithid || { user_type: "mentor" } // fallback

  const getRecommendedMentors = async (page = 1) => {
    setLoading(true)
    try {
      const { success, data } = await MentorServices.recommendedmentors({ page })
      const isArray = Array.isArray(data) ? data : []
      setRecommendmentor((prev) => (page === 1 ? isArray : [...prev, ...isArray]))

      if (data?.next) {
        const url = new URL(data.next)
        const nextPageNumber = url.searchParams.get("page")
        setNextPage(Number(nextPageNumber))
        setHasMore(true)
      } else {
        setHasMore(false)
      }

      setError(null)
    } catch (error) {
      console.log("could not fetch recommended mentors", error)
      setError("Error occurred while fetching recommended mentors")
    } finally {
      setLoading(false)
    }
  }

  const SearchMentors = async () => {
    setLoading(true)
    setSearchTriggered(true)

    try {
      const params = {}

      // Build search parameters
      if (searchQuery.trim()) {
        params.text = searchQuery.trim()
      }
      if (availability) {
        params.availability = availability.toLowerCase()
      }
      if (experienceLevel) {
        params.experience_level = experienceLevel.toLowerCase()
      }
      if (skills) {
        params.skills = skills.toLowerCase()
      }

      console.log("Search params:", params)

      const { success, data } = await MentorServices.searchmentors(params)
      setSearchMentor(success ? data : [])
    } catch (error) {
      console.error("Search failed", error)
      setSearchMentor([])
    } finally {
      setLoading(false)
    }
  }

  // Clear search and return to recommended mentors
  const clearSearch = () => {
    setSearchQuery("")
    setAvailability("")
    setExperienceLevel("")
    setSkills("")
    setSearchTriggered(false)
    setSearchMentor([])
  }

  useEffect(() => {
    getRecommendedMentors()
  }, [])

  if (loading && recommendmentor.length === 0) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="200px">
        <Spinner size="lg" color="#5DA05D" thickness="4px" />
      </Box>
    )
  }

  return (
    <div className="bg-white p-4">
      {user.user_type === "learner" ? (
        <div>
          {recommendmentor.length === 0 ? (
            <Box textAlign="center" py={28} className="shadow-lg">
              <p className="text-gray-500 text-lg">
                Recommended Mentors based on your interest will be displayed here!
              </p>
            </Box>
          ) : (
            <div>
              {/* Search Section */}
              <div className="mb-6">
                <div className="flex items-center w-full max-w-2xl border border-gray-300 rounded-lg overflow-hidden mb-4">
                  <div className="flex items-center pl-3">
                    <Search className="w-4 h-4 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    placeholder="Search mentors by name or expertise"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="flex-grow py-2 px-3 border-0 focus:outline-none focus:ring-0 w-full"
                  />
                </div>

                <div className="flex items-center gap-3 flex-wrap">
                  <Dropdown
                    label="Experience Level"
                    options={["entry", "mid", "senior", "executive"]}
                    value={experienceLevel}
                    onChange={(value) => {
                      console.log("Experience selected:", value)
                      setExperienceLevel(value)
                    }}
                  />

                  <Dropdown
                    label="All Skills"
                    options={["tech", "finance", "health"]}
                    value={skills}
                    onChange={(value) => {
                      console.log("Skills selected:", value)
                      setSkills(value)
                    }}
                  />

                  <Dropdown
                    label="Availability"
                    options={["weekdays", "weekends"]}
                    value={availability}
                    onChange={(value) => {
                      console.log("Availability selected:", value)
                      setAvailability(value)
                    }}
                  />

                  <button
                    onClick={SearchMentors}
                    disabled={loading}
                    className="px-5 py-2 bg-[#5DA05D] text-white rounded-lg hover:bg-[#4a8f4a] text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {loading ? "Searching..." : "Search"}
                  </button>

                  {searchTriggered && (
                    <button
                      onClick={clearSearch}
                      className="px-5 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 text-sm"
                    >
                      Clear
                    </button>
                  )}
                </div>
              </div>

              {/* Results Section */}
              <div>
                <div className="mt-4 w-full grid grid-cols-1 md:grid-cols-2 gap-4">
                  {searchTriggered ? (
                    searchMentor.length > 0 ? (
                      searchMentor.map((mentor) => (
                        <div key={mentor.id} className="col-span-1">
                          <MentorCard mentor={mentor} />
                        </div>
                      ))
                    ) : (
                      <div className="col-span-2 text-center py-8">
                        <p className="text-gray-500 text-lg">No mentors found matching your criteria</p>
                        <button onClick={clearSearch} className="mt-2 text-[#5DA05D] hover:underline">
                          View all recommended mentors
                        </button>
                      </div>
                    )
                  ) : (
                    recommendmentor.map((mentor) => (
                      <div key={mentor.id} className="col-span-1">
                        <MentorCard mentor={mentor} />
                      </div>
                    ))
                  )}
                </div>

                {/* Load More Button - only show for recommended mentors */}
                {!searchTriggered && (
                  <div className="flex justify-center mt-6">
                    {hasMore && (
                      <button
                        onClick={() => getRecommendedMentors(nextPage)}
                        disabled={loading}
                        className="px-6 py-2 border border-[#5DA05D] text-[#5DA05D] rounded-lg hover:bg-[#5DA05D] hover:text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {loading ? "Loading..." : "Load More"}
                      </button>
                    )}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      ) : (
        <MentorshipRequests />
      )}
    </div>
  )
}


export default MentorMain
