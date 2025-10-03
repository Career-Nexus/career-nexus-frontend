
"use client"

import { Bookmark, ChevronDown, Search, Star } from "lucide-react"
import { useContext, useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { MentorServices } from "../../../api/MentorServices"
import { UserContext } from "../../../context/UserContext"
import { Box, Spinner } from "@chakra-ui/react"
import MentorshipRequests from "./MentorshipRequests"
import { toast } from "react-toastify";
import FloatingMessageIcon from "../chat/FloatingMessage"

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
    <div className="relative md:w-70 w-50">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="flex items-center md:justify-between text-xs md:text-sm md:px-3 px-1 py-2 border border-gray-300 rounded-lg bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[#5DA05D] focus:border-transparent md:min-w-[140px] w-full"
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
  const fullName = `${mentor.first_name} ${mentor.last_name}`
  const profilePhoto = mentor.profile_photo
  const jobTitle = mentor.current_job
  const { userwithid } = useContext(UserContext)

  const [mentorSession, setMentorSession] = useState([])
  const [booking, setBooking] = useState([])
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [modalStep, setModalStep] = useState(1) // 1 = form, 2 = summary
  const [saveMentor, setSaveMentor] = useState(false)

  const [formData, setFormData] = useState({
    session_type: "individual",
    date: "",
    time: "",
    discourse: "",
  })

  const openModal = () => {
    setModalStep(1) // always reset to step 1
    setIsModalOpen(true)
  }
  const closeModal = () => setIsModalOpen(false)

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const submitBooking = async () => {
    const payload = {
      mentor: mentor.id,
      ...formData,
    }

    if (!formData.date || !formData.time || !formData.discourse) {
      toast.error("Please fill in all fields")
      return
    }

    setMentorSession((prev) => [...prev, mentor.id])
    try {
      const response = await MentorServices.bookmentorsession(payload)
      if (response) {
        setBooking((prev) => [...prev, response])
        toast.success("Mentor booking initiated successfully")
        closeModal()
      }
    } catch (error) {
      toast.error("Failed to book session")
    }
  }

  const handleSave = async () => {
    if (saveMentor) return
    try {
      await MentorServices.SaveMentor({ mentor: mentor.id })
      toast.success("Mentor saved successfully")
      setSaveMentor(true)
    } catch (error) {
      toast.error("Could not save mentor")
      console.error("Save failed:", error)
    }
  }

  const handleContinue = () => {
    if (!formData.date || !formData.time || !formData.discourse) {
      toast.error("Please fill in all fields")
      return
    }
    setModalStep(2) // move to summary
  }

  const handleConfirmBooking = () => {
    submitBooking()
  }

  return (
    <>
      {/* Mentor Card */}
      <div className="bg-white border rounded-lg shadow-sm overflow-hidden">
        <div className="flex md:justify-between p-2 md:p-3">
          <Link to={`/mentordetails/${mentor.id}`} className="flex gap-1 md:gap-2 mr-1">
            <img
              src={profilePhoto || "/placeholder.svg"}
              alt={fullName}
              className="w-14 h-14 rounded-full object-cover md:p-2"
            />
            <div>
              <h2 className="font-semibold text-lg">{fullName}</h2>
              <p className="text-sm text-gray-600">{jobTitle}</p>
              <p>{mentor.years_of_experience || 0} Years Experience</p>
            </div>
          </Link>

          {/* Rating */}
          <div className="flex md:gap-1 text-sm mt-1">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                size={14}
                className={
                  i < Math.floor(mentor.rating || 0)
                    ? "fill-yellow-300 text-yellow-300"
                    : "fill-gray-300 text-gray-300"
                }
              />
            ))}
          </div>

          <div className="text-sm text-gray-500 ml-2">
            <span>{mentor.session_rate}</span>
          </div>
        </div>

        {/* Skills */}
        <div className="flex flex-wrap items-center justify-between mt-2 p-4">
          {(Array.isArray(mentor.technical_skills) ? mentor.technical_skills.slice(0, 4) : []).map(
            (skill, idx) => (
              <span key={idx} className="bg-[#2A0D471A] px-4 rounded-lg">
                {skill}
              </span>
            )
          )}
        </div>

        {/* Actions */}
        <div className="flex items-center justify-center gap-5 my-5">
          <button
            onClick={openModal}
            //disabled
            disabled={mentorSession.includes(mentor.id)}
            className={`py-2 px-4 border ${mentorSession.includes(mentor.id)
              ? "bg-green-50 text-gray-400 cursor-not-allowed border-gray-300"
              : "bg-[#5DA05D] text-white"
              } rounded-lg transition-colors duration-200 font-medium text-sm`}
          >
            {mentorSession.includes(mentor.id) ? "Pending..." : "Book Session"}
          </button>

          <button
            onClick={handleSave}
            // disabled={saveMentor}
            disabled
            className={`rounded-lg flex gap-2 py-2 px-4 border-2 ${saveMentor
              ? "border-[#5DA05D] text-[#5DA05D] cursor-not-allowed"
              : "border-gray-400 text-gray-600 hover:border-[#5DA05D] hover:text-[#5DA05D]"
              }`}
          >
            <Bookmark />
            {saveMentor ? "Saved" : "Save"}
          </button>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
          {/* scrollable content */}
          <div className="bg-white p-6 rounded-lg w-[420px] max-h-[90vh] overflow-y-auto shadow-lg">
            <h2 className="text-xl font-bold mb-4">Book Mentorship Session</h2>

            {/* Mentor Info */}
            <div className="flex items-center gap-3 mb-6">
              <img
                src={profilePhoto || "/placeholder.svg"}
                alt={fullName}
                className="w-12 h-12 rounded-full object-cover"
              />
              <div>
                <h3 className="font-semibold text-lg">{fullName}</h3>
                <p className="text-sm text-gray-500">{jobTitle}</p>
              </div>
            </div>

            {/* Step 1: Form */}
            {modalStep === 1 && (
              <>
                {/* Session Type */}
                <div className="mb-6">
                  <h4 className="font-medium mb-3">Select Session Type</h4>
                  <div className="space-y-3">
                    {[
                      { value: "individual", label: "Individual Session", desc: "1-on-1 mentorship session" },
                      { value: "group", label: "Group Session", desc: "Multiple participants (2–6 people)" },
                    ].map((opt) => (
                      <button
                        key={opt.value}
                        type="button"
                        onClick={() => setFormData({ ...formData, session_type: opt.value })}
                        className={`w-full border rounded-xl p-4 flex justify-between items-center ${formData.session_type === opt.value
                          ? "border-[#5DA05D] bg-green-50"
                          : "border-gray-300"
                          }`}
                      >
                        <div>
                          <p className="font-medium">{opt.label}</p>
                          <p className="text-sm text-gray-500">{opt.desc}</p>
                        </div>
                        <span
                          className={`w-5 h-5 rounded-full border flex items-center justify-center ${formData.session_type === opt.value
                            ? "border-[#5DA05D]"
                            : "border-gray-400"
                            }`}
                        >
                          {formData.session_type === opt.value && (
                            <span className="w-3 h-3 bg-[#5DA05D] rounded-full"></span>
                          )}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Date & Time */}
                <div className="mb-6">
                  <h4 className="font-medium mb-3">Select Date & Time</h4>
                  <p className="mt-2 text-xs text-gray-500 bg-green-50 p-2 rounded mb-3">
                    Mentor is available Mon–Fri 9AM–6PM EST. Times shown are in your timezone (WAT).
                  </p>
                  <div className="grid grid-cols-2 gap-3">
                    <input
                      type="date"
                      name="date"
                      value={formData.date}
                      onChange={handleChange}
                      className="w-full border p-2 rounded"
                    />
                    <input
                      type="time"
                      name="time"
                      value={formData.time}
                      onChange={handleChange}
                      className="w-full border p-2 rounded"
                    />
                  </div>

                </div>

                {/* Discussion Topics */}
                <div className="mb-6">
                  <h4 className="font-medium mb-3">What would you like to discuss?</h4>
                  <div className="flex flex-wrap gap-2">
                    {[
                      "Interview Prep",
                      "Career Path",
                      "Architecture Review",
                      "Skill Building",
                      "Leadership",
                      "Portfolio",
                      "Others",
                    ].map((topic) => (
                      <button
                        type="button"
                        key={topic}
                        onClick={() => setFormData({ ...formData, discourse: topic })}
                        className={`px-3 py-1 rounded border text-sm ${formData.discourse === topic
                          ? "bg-green-50 border-[#5DA05D] text-[#5DA05D]"
                          : "border-gray-300 text-gray-600"
                          }`}
                      >
                        {topic}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Extra Notes */}
                <textarea
                  name="extra"
                  placeholder="Add any specific details (e.g. role, areas of focus)"
                  className="w-full border border-gray-300 rounded p-2 mb-6 text-sm resize-none focus:ring-0 focus:border-gray-400"
                />

                {/* Actions */}
                <div className="flex justify-end gap-3">
                  <button
                    onClick={closeModal}
                    className="px-4 py-2 bg-gray-200 rounded"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleContinue}
                    className="px-4 py-2 bg-[#5DA05D] text-white rounded disabled:opacity-50"
                    disabled={!formData.date || !formData.time || !formData.discourse}
                  >
                    Continue
                  </button>
                </div>
              </>
            )}

            {/* Step 2: Summary */}
            {modalStep === 2 && (
              <>
                <div className="mb-6">
                  <h4 className="font-medium mb-3">Confirm Your Booking</h4>
                  <ul className="text-sm text-gray-700 space-y-2">
                    <li>
                      <strong>Session Type:</strong> {formData.session_type}
                    </li>
                    <li>
                      <strong>Date:</strong> {formData.date}
                    </li>
                    <li>
                      <strong>Time:</strong> {formData.time}
                    </li>
                    <li>
                      <strong>Topic:</strong> {formData.discourse}
                    </li>
                  </ul>
                </div>

                <div className="flex justify-end gap-3">
                  <button
                    onClick={() => setModalStep(1)}
                    className="px-4 py-2 bg-gray-200 rounded"
                  >
                    Back
                  </button>
                  <button
                    onClick={handleConfirmBooking}
                    className="px-4 py-2 bg-[#5DA05D] text-white rounded"
                  >
                    Confirm Booking
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </>
  )
}


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
  const { user } = useContext(UserContext)

  // Fetch recommended mentors
  const getRecommendedMentors = async (page = 1) => {
    setLoading(true)
    try {
      const { success, data } = await MentorServices.recommendedmentors({ page })
      const isArray = Array.isArray(data?.results) ? data.results : []

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
      console.error("could not fetch recommended mentors", error)
      setError("Error occurred while fetching recommended mentors")
    } finally {
      setLoading(false)
    }
  }

  // Search mentors
  const SearchMentors = async () => {
    setLoading(true)
    setSearchTriggered(true)
    try {
      const params = {}
      if (searchQuery.trim()) params.text = searchQuery.trim()
      if (availability) params.availability = availability.toLowerCase()
      if (experienceLevel) params.experience_level = experienceLevel.toLowerCase()
      if (skills) params.skills = skills.toLowerCase()

      const { success, data } = await MentorServices.searchmentors(params)
      setSearchMentor(success ? data.results ?? [] : [])
    } catch (error) {
      console.error("Search failed", error)
      setSearchMentor([])
    } finally {
      setLoading(false)
    }
  }

  // Clear search
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

  if (loading && !searchTriggered && recommendmentor.length === 0) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="200px">
        <Spinner size="lg" color="#5DA05D" thickness="4px" />
      </Box>
    )
  }

  return (
    <div className="bg-white">
      {user?.user_type === "learner" ? (
        <div>
          {/* 🔍 Search Section */}
          <div className="mb-6 hidden md:block">
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

            <div className="flex items-center gap-3">
              <Dropdown
                label="Experience Level"
                options={["entry", "mid", "senior", "executive"]}
                value={experienceLevel}
                onChange={(value) => setExperienceLevel(value)}
              />
              <Dropdown
                label="All Skills"
                options={["tech", "finance", "health"]}
                value={skills}
                onChange={(value) => setSkills(value)}
              />
              <Dropdown
                label="Availability"
                options={["weekdays", "weekends"]}
                value={availability}
                onChange={(value) => setAvailability(value)}
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
          {/* mobile screen */}
          <div className="mb-6 block md:hidden">
            <div className="flex items-center gap-2 text-xs">
              <div className="text-xs w-full">
                <Dropdown
                  label="Experience"
                  options={["entry", "mid", "senior", "executive"]}
                  value={experienceLevel}
                  onChange={(value) => setExperienceLevel(value)}
                />
              </div>
              <div className="text-xs w-full">
                <Dropdown
                  label="Skills"
                  options={["tech", "finance", "health"]}
                  value={skills}
                  onChange={(value) => setSkills(value)}
                />
              </div>
              <div className="text-xs w-full">
                <Dropdown
                  label="Availability"
                  options={["weekdays", "weekends"]}
                  value={availability}
                  onChange={(value) => setAvailability(value)}
                />
              </div>
              <button
                onClick={SearchMentors}
                disabled={loading}
                className="p-2 bg-[#5DA05D] text-white rounded-lg hover:bg-[#4a8f4a] text-sm disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Search className="w-4 h-4" />
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
          {(recommendmentor.length === 0 && !searchTriggered) ? (
            <Box textAlign="center" py={28} className="shadow-lg">
              <p className="text-gray-500 text-lg">
                Recommended Mentors based on your interest will be displayed here!
              </p>
            </Box>
          ) : (
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
                      <button
                        onClick={clearSearch}
                        className="mt-2 text-[#5DA05D] hover:underline"
                      >
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

              {/* Load More Button */}
              {!searchTriggered && hasMore && (
                <div className="flex justify-center mt-6">
                  <button
                    onClick={() => getRecommendedMentors(nextPage)}
                    disabled={loading}
                    className="px-6 py-2 border border-[#5DA05D] text-[#5DA05D] rounded-lg hover:bg-[#5DA05D] hover:text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {loading ? "Loading..." : "Load More"}
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      ) : (
        <MentorshipRequests />
      )}
      <div>
        <FloatingMessageIcon />
      </div>
    </div>
  )
}
export default MentorMain
