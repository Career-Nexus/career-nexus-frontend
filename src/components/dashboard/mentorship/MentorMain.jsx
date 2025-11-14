
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
import { useDebounce } from "use-debounce"

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

// const MentorCard = ({ mentor }) => {
//   const fullName = `${mentor.first_name} ${mentor.last_name}`
//   const profilePhoto = mentor.profile_photo
//   const jobTitle = mentor.current_job

//   const [mentorSession, setMentorSession] = useState([])
//   const [booking, setBooking] = useState([])
//   const [isModalOpen, setIsModalOpen] = useState(false)
//   const [modalStep, setModalStep] = useState(1) // 1 = form, 2 = summary
//   const [saveMentor, setSaveMentor] = useState(false)

//   const [searchUser, setSearchUser] = useState([])
//   const [searchLoading, setSearchLoading] = useState(false)
//   const [debouncedSearch] = useDebounce(formData.search || "", 500) 

//   const [formData, setFormData] = useState({
//     session_type: "individual",
//     date: "",
//     time: "",
//     discourse: "",
//     invitees:""
//   })

//   //search for users
//   useEffect(() => {
//     const fetchUsers = async () => {
//       if (!debouncedSearch || debouncedSearch.length < 2) {
//         setSearchUser([])
//         return
//       }
//       setSearchLoading(true)
//       try {
//         const response = await MentorServices.searchuser({
//           keyword: debouncedSearch,
//         })
//         if (response.success) {
//           setSearchUser(response.data)
//         }
//       } catch (error) {
//         console.error("User search failed", error)
//       } finally {
//         setSearchLoading(false)
//       }
//     }
//     fetchUsers()
//   }, [debouncedSearch])

//   const openModal = () => {
//     setModalStep(1) // always reset to step 1
//     setIsModalOpen(true)
//   }
//   const closeModal = () => setIsModalOpen(false)

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value })
//   }

//   // const submitBooking = async () => {
//   //   const payload = {
//   //     mentor: mentor.id,
//   //     ...formData,
//   //   }

//   //   if (!formData.date || !formData.time || !formData.discourse) {
//   //     toast.error("Please fill in all fields")
//   //     return
//   //   }

//   //   setMentorSession((prev) => [...prev, mentor.id])
//   //   try {
//   //     const response = await MentorServices.bookmentorsession(payload)
//   //     if (response) {
//   //       setBooking((prev) => [...prev, response])
//   //       toast.success("Mentor booking initiated successfully")
//   //       closeModal()
//   //     }
//   //   } catch (error) {
//   //     toast.error("Failed to book session")
//   //   }
//   // }

//   const submitBooking = async () => {
//     if (!formData.date || !formData.time || !formData.discourse) {
//       toast.error("Please fill in all fields")
//       return
//     }

//     const inviteeIds =
//       formData.session_type === "group"
//         ? (formData.selectedEmployees || []).slice(0, 10).map((e) => e.id)
//         : []

//     const payload = {
//       mentor: mentor.id,
//       session_type: formData.session_type,
//       date: formData.date,
//       time: formData.time,
//       discourse: formData.discourse,
//       invitees: inviteeIds,
//     }

//     try {
//       const response = await MentorServices.bookmentorsession(payload)
//       if (response?.success) {
//         toast.success("Mentor booking initiated successfully")
//         closeModal()
//       } else {
//         toast.error("Booking failed")
//       }
//     } catch (error) {
//       toast.error("Failed to book session")
//       console.error(error)
//     }
//   }

//   const handleSave = async () => {
//     if (saveMentor) return
//     try {
//       await MentorServices.SaveMentor({ mentor: mentor.id })
//       toast.success("Mentor saved successfully")
//       setSaveMentor(true)
//     } catch (error) {
//       toast.error("Could not save mentor")
//       console.error("Save failed:", error)
//     }
//   }

//   const handleContinue = () => {
//     if (!formData.date || !formData.time || !formData.discourse) {
//       toast.error("Please fill in all fields")
//       return
//     }
//     setModalStep(2) // move to summary
//   }

//   const handleConfirmBooking = () => {
//     submitBooking()
//   }
//   const handeleClickOutside = (e) => {
//     if (e.target.id === "modalBackdrop") {
//       closeModal()
//     }
//   }

//   // const SearchUsers = async () => {
//   //   try {
//   //     const user = await MentorServices.searchuser()
//   //     setSearchUser(user)
//   //   } catch (error) {
//   //     console.log("user not fetched")
//   //   }
//   // }
//   // 🔍 Fetch users dynamically

//   return (
//     <div>
//       {/* Mentor Card */}
//       <div className="bg-white border rounded-lg shadow-sm overflow-hidden">
//         <div className="flex md:justify-between p-2 md:p-3">
//           <Link to={`/mentordetails/${mentor.id}`} className="flex gap-1 md:gap-2 mr-1">
//             <img
//               src={profilePhoto || "/placeholder.svg"}
//               alt={fullName}
//               className="w-14 h-14 rounded-full object-cover md:p-2"
//             />
//             <div>
//               <h2 className="font-semibold text-lg">{fullName}</h2>
//               <p className="text-sm text-gray-600">{jobTitle}</p>
//               <p>{mentor.years_of_experience || 0} Years Experience</p>
//             </div>
//           </Link>

//           {/* Rating */}
//           <div className="flex md:gap-1 text-sm mt-1">
//             {Array.from({ length: 5 }).map((_, i) => (
//               <Star
//                 key={i}
//                 size={14}
//                 className={
//                   i < Math.floor(mentor.rating || 0)
//                     ? "fill-yellow-300 text-yellow-300"
//                     : "fill-gray-300 text-gray-300"
//                 }
//               />
//             ))}
//           </div>

//           <div className="text-sm text-gray-500 ml-2">
//             <span>{mentor.session_rate}</span>
//           </div>
//         </div>

//         {/* Skills */}
//         <div className="flex flex-wrap items-center justify-between mt-2 p-4">
//           {(Array.isArray(mentor.technical_skills) ? mentor.technical_skills.slice(0, 4) : []).map(
//             (skill, idx) => (
//               <span key={idx} className="bg-[#2A0D471A] px-4 rounded-lg">
//                 {skill}
//               </span>
//             )
//           )}
//         </div>

//         {/* Actions */}
//         <div className="flex items-center justify-center gap-5 my-5">
//           <button
//             onClick={openModal}
//             //disabled
//             disabled={mentorSession.includes(mentor.id)}
//             className={`py-2 px-4 border ${mentorSession.includes(mentor.id)
//               ? "bg-green-50 text-gray-400 cursor-not-allowed border-gray-300"
//               : "bg-[#5DA05D] text-white"
//               } rounded-lg transition-colors duration-200 font-medium text-sm`}
//           >
//             {mentorSession.includes(mentor.id) ? "Pending..." : "Book Session"}
//           </button>

//           <button
//             onClick={handleSave}
//             // disabled={saveMentor}
//             disabled
//             className={`rounded-lg flex gap-2 py-2 px-4 border-2 ${saveMentor
//               ? "border-[#5DA05D] text-[#5DA05D] cursor-not-allowed"
//               : "border-gray-400 text-gray-600 hover:border-[#5DA05D] hover:text-[#5DA05D]"
//               }`}
//           >
//             <Bookmark />
//             {saveMentor ? "Saved" : "Save"}
//           </button>
//         </div>
//       </div>

//       {/* Modal */}
//       {isModalOpen && (
//         <div onClick={handeleClickOutside} id="modalBackdrop" className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
//           {/* scrollable content */}
//           <div className="bg-white p-6 rounded-lg w-full max-w-md max-h-[90vh] overflow-y-auto shadow-lg no-scrollbar">
//             <h2 className="text-xl font-bold mb-4">Book Mentorship Session</h2>

//             {/* Mentor Info */}
//             <div className="flex items-center gap-3 mb-6">
//               <img
//                 src={profilePhoto || "/placeholder.svg"}
//                 alt={fullName}
//                 className="w-12 h-12 rounded-full object-cover"
//               />
//               <div>
//                 <h3 className="font-semibold text-lg">{fullName}</h3>
//                 <p className="text-sm text-gray-500">{jobTitle}</p>
//               </div>
//               <div className="ml-auto font-semibold">{mentor.session_rate}</div>
//             </div>

//             {/* Step 1: Form */}
//             {modalStep === 1 && (
//               <>
//                 {/* Session Type */}
//                 <div className="mb-6">
//                   <h4 className="font-medium mb-3">Select Session Type</h4>
//                   <div className="space-y-3">
//                     {[
//                       { value: "individual", label: "Individual Session", desc: "1-on-1 mentorship session" },
//                       { value: "group", label: "Group Session", desc: "Multiple participants (2–6 people)" },
//                     ].map((opt) => (
//                       <button
//                         key={opt.value}
//                         type="button"
//                         onClick={() => setFormData({ ...formData, session_type: opt.value })}
//                         className={`w-full border rounded-xl p-4 flex justify-between items-center ${formData.session_type === opt.value
//                           ? "border-[#5DA05D] bg-green-50"
//                           : "border-gray-300"
//                           }`}
//                       >
//                         <div>
//                           <p className="font-medium">{opt.label}</p>
//                           <p className="text-sm text-gray-500">{opt.desc}</p>
//                         </div>
//                         <span
//                           className={`w-5 h-5 rounded-full border flex items-center justify-center ${formData.session_type === opt.value
//                             ? "border-[#5DA05D]"
//                             : "border-gray-400"
//                             }`}
//                         >
//                           {formData.session_type === opt.value && (
//                             <span className="w-3 h-3 bg-[#5DA05D] rounded-full"></span>
//                           )}
//                         </span>
//                       </button>
//                     ))}
//                   </div>
//                 </div>
//                 {/* Show search and employee list only for group sessions */}
//                 {formData.session_type === "group" && (
//                   <div className="mb-6">
//                     <h4 className="font-medium mb-3">Select Employees</h4>

//                     {/* Selected Employee Chips */}
//                     {formData.selectedEmployees && formData.selectedEmployees.length > 0 && (
//                       <div className="flex flex-wrap gap-2 mb-3">
//                         {formData.selectedEmployees.slice(0, 3).map((emp) => (
//                           <div
//                             key={emp.id}
//                             className="flex items-center gap-2 bg-green-50 border border-[#5DA05D] text-[#5DA05D] px-2 py-1 rounded-full text-sm"
//                           >
//                             <img
//                               src={emp.photo || "/placeholder.svg"}
//                               alt={emp.name}
//                               className="w-6 h-6 rounded-full object-cover"
//                             />
//                             <span>{emp.name}</span>
//                             <button
//                               onClick={() =>
//                                 setFormData((prev) => ({
//                                   ...prev,
//                                   selectedEmployees: prev.selectedEmployees.filter(
//                                     (e) => e.id !== emp.id
//                                   ),
//                                 }))
//                               }
//                               className="text-gray-500 hover:text-red-500 text-xs font-bold"
//                             >
//                               ✕
//                             </button>
//                           </div>
//                         ))}

//                         {formData.selectedEmployees.length > 3 && (
//                           <div className="flex items-center justify-center bg-green-50 border border-[#5DA05D] text-[#5DA05D] px-3 py-1 rounded-full text-sm">
//                             +{formData.selectedEmployees.length - 3}
//                           </div>
//                         )}
//                       </div>
//                     )}

//                     {/* Search box */}
//                     <input
//                       type="text"
//                       placeholder="Search employees by name..."
//                       className="w-full border p-2 rounded mb-4"
//                       value={formData.search || ""}
//                       onChange={(e) => setFormData({ ...formData, search: e.target.value })}
//                     />

//                     {/* Employee list */}
//                     <div className="space-y-2 max-h-48 overflow-y-auto">
//                       {[
//                         { id: 1, name: "Adebayo Samuel", photo: "/avatars/samuel.png" },
//                         { id: 2, name: "Funmi Kayode", photo: "/avatars/funmi.png" },
//                         { id: 3, name: "David Chen", photo: "/avatars/david.png" },
//                         { id: 4, name: "Sarah Adebayo", photo: "/avatars/sarah.png" },
//                         { id: 5, name: "John Okafor", photo: "/avatars/john.png" },
//                       ]
//                         .filter((emp) =>
//                           emp.name.toLowerCase().includes((formData.search || "").toLowerCase())
//                         )
//                         .map((emp) => {
//                           const isSelected = (formData.selectedEmployees || []).some(
//                             (e) => e.id === emp.id
//                           )
//                           return (
//                             <div
//                               key={emp.id}
//                               onClick={() =>
//                                 setFormData((prev) => {
//                                   const selected = prev.selectedEmployees || []
//                                   if (isSelected) {
//                                     return {
//                                       ...prev,
//                                       selectedEmployees: selected.filter(
//                                         (e) => e.id !== emp.id
//                                       ),
//                                     }
//                                   } else {
//                                     return {
//                                       ...prev,
//                                       selectedEmployees: [...selected, emp],
//                                     }
//                                   }
//                                 })
//                               }
//                               className={`flex items-center gap-3 p-2 border rounded cursor-pointer ${isSelected
//                                   ? "bg-green-50 border-[#5DA05D]"
//                                   : "border-gray-200 hover:border-[#5DA05D]"
//                                 }`}
//                             >
//                               <img
//                                 src={emp.photo || "/placeholder.svg"}
//                                 alt={emp.name}
//                                 className="w-8 h-8 rounded-full object-cover"
//                               />
//                               <span className="font-medium">{emp.name}</span>
//                             </div>
//                           )
//                         })}
//                     </div>
//                   </div>
//                 )}

//                 {/* Date & Time */}
//                 <div className="mb-6">
//                   <h4 className="font-medium mb-3">Select Date & Time</h4>
//                   <p className="mt-2 text-xs text-gray-500 bg-green-50 p-2 rounded mb-3">
//                     Mentor is available Mon–Fri 9AM–6PM EST. Times shown are in your timezone (WAT).
//                   </p>
//                   <div className="grid grid-cols-2 gap-3">
//                     <input
//                       type="date"
//                       name="date"
//                       value={formData.date}
//                       onChange={handleChange}
//                       className="w-full border p-2 rounded"
//                     />
//                     <input
//                       type="time"
//                       name="time"
//                       value={formData.time}
//                       onChange={handleChange}
//                       className="w-full border p-2 rounded"
//                     />
//                   </div>

//                 </div>

//                 {/* Discussion Topics */}
//                 <div className="mb-6">
//                   <h4 className="font-medium mb-3">What would you like to discuss?</h4>
//                   <div className="flex flex-wrap gap-2">
//                     {[
//                       "Interview Prep",
//                       "Career Path",
//                       "Architecture Review",
//                       "Skill Building",
//                       "Leadership",
//                       "Portfolio",
//                       "Others",
//                     ].map((topic) => (
//                       <button
//                         type="button"
//                         key={topic}
//                         onClick={() => setFormData({ ...formData, discourse: topic })}
//                         className={`px-3 py-1 rounded border text-sm ${formData.discourse === topic
//                           ? "bg-green-50 border-[#5DA05D] text-[#5DA05D]"
//                           : "border-gray-300 text-gray-600"
//                           }`}
//                       >
//                         {topic}
//                       </button>
//                     ))}
//                   </div>
//                 </div>

//                 {/* Extra Notes */}
//                 <textarea
//                   name="extra"
//                   placeholder="Add any specific details (e.g. role, areas of focus)"
//                   className="w-full border border-gray-300 rounded p-2 mb-6 text-sm resize-none focus:ring-0 focus:border-gray-400"
//                 />

//                 {/* Actions */}
//                 <div className="flex justify-end gap-3">
//                   <button
//                     onClick={closeModal}
//                     className="px-4 py-2 bg-gray-200 rounded"
//                   >
//                     Cancel
//                   </button>
//                   <button
//                     onClick={handleContinue}
//                     className="px-4 py-2 bg-[#5DA05D] text-white rounded disabled:opacity-50"
//                     disabled={!formData.date || !formData.time || !formData.discourse}
//                   >
//                     Continue
//                   </button>
//                 </div>
//               </>
//             )}

//             {/* Step 2: Summary */}
//             {modalStep === 2 && (
//               <>
//                 <div className="mb-6">
//                   <h4 className="font-medium mb-3">Confirm Your Booking</h4>
//                   <ul className="text-sm text-gray-700 space-y-2">
//                     <li>
//                       <strong>Session Type:</strong> {formData.session_type}
//                     </li>
//                     <li>
//                       <strong>Date:</strong> {formData.date}
//                     </li>
//                     <li>
//                       <strong>Time:</strong> {formData.time}
//                     </li>
//                     <li>
//                       <strong>Topic:</strong> {formData.discourse}
//                     </li>
//                   </ul>
//                 </div>

//                 <div className="flex justify-end gap-3">
//                   <button
//                     onClick={() => setModalStep(1)}
//                     className="px-4 py-2 bg-gray-200 rounded"
//                   >
//                     Back
//                   </button>
//                   <button
//                     onClick={handleConfirmBooking}
//                     className="px-4 py-2 bg-[#5DA05D] text-white rounded"
//                   >
//                     Confirm Booking
//                   </button>
//                 </div>
//               </>
//             )}
//           </div>
//         </div>
//       )}
//     </div>
//   )
// }

const MentorCard = ({ mentor }) => {
  const fullName = `${mentor.first_name} ${mentor.last_name}`
  const profilePhoto = mentor.profile_photo
  const jobTitle = mentor.current_job

  const [mentorSession, setMentorSession] = useState([])
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [modalStep, setModalStep] = useState(1)
  const [saveMentor, setSaveMentor] = useState(false)

  const [searchUser, setSearchUser] = useState([])
  const [searchLoading, setSearchLoading] = useState(false)
  const {user} = useContext(UserContext)

  const [formData, setFormData] = useState({
    session_type: "individual",
    date: "",
    time: "",
    discourse: "",
    search: "",
    selectedEmployees: [],
  })

  const [debouncedSearch] = useDebounce(formData.search || "", 400)

  // 🔍 Search for employees when typing
  useEffect(() => {
    const fetchUsers = async () => {
      if (!debouncedSearch || debouncedSearch.length < 2) {
        setSearchUser([])
        return
      }
      setSearchLoading(true)
      try {
        const response = await MentorServices.searchuser({
          keyword: debouncedSearch,
        })
        if (response?.success) {
          setSearchUser(response.data)
        }
      } catch (error) {
        console.error("User search failed", error)
      } finally {
        setSearchLoading(false)
      }
    }
    fetchUsers()
  }, [debouncedSearch])

  const openModal = () => {
    setModalStep(1)
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
    setFormData({
      session_type: "individual",
      date: "",
      time: "",
      discourse: "",
      search: "",
      selectedEmployees: [],
    })
  }

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  // ✅ Submit booking
  const submitBooking = async () => {
    if (!formData.date || !formData.time || !formData.discourse) {
      toast.error("Please fill in all required fields")
      return
    }

    const inviteeIds =
      formData.session_type === "group"
        ? (formData.selectedEmployees || []).slice(0, 10).map((e) => e.id)
        : []

    const payload = {
      mentor: mentor.id,
      session_type: formData.session_type,
      date: formData.date,
      time: formData.time,
      discourse: formData.discourse,
      invitees: inviteeIds,
    }

    try {
      const response = await MentorServices.bookmentorsession(payload)
      if (response?.success) {
        toast.success("Mentor booking initiated successfully")
        closeModal()
      } else {
        toast.error("Booking failed-(can't invite self)")
      }
    } catch (error) {
      toast.error("Failed to book session")
      console.error(error)
    }
  }

  const handleContinue = () => {
    if (!formData.date || !formData.time || !formData.discourse) {
      toast.error("Please fill in all fields")
      return
    }
    setModalStep(2)
  }

  const handleConfirmBooking = () => {
    submitBooking()
  }

  const handleSelectEmployee = (emp) => {
    const selected = formData.selectedEmployees || []
    const isSelected = selected.some((e) => e.id === emp.id)
    if (emp.id === user) {
      toast.error("You cannot invite yourself")
      return prev
    }
    const updated = isSelected
      ? selected.filter((e) => e.id !== emp.id)
      : [...selected, emp]

    setFormData({ ...formData, selectedEmployees: updated })
  }

  const handleClickOutside = (e) => {
    if (e.target.id === "modalBackdrop") {
      closeModal()
    }
  }

  const handleSaveMentor = async () => {
    if (saveMentor) return
    try {
      await MentorServices.SaveMentor({ mentor: mentor.id })
      toast.success("Mentor saved successfully")
      setSaveMentor(true)
    } catch {
      toast.error("Could not save mentor")
    }
  }

  return (
    <div>
      {/* Mentor Card */}
      <div className="bg-white border rounded-lg shadow-sm overflow-hidden">
        <div className="flex justify-between p-4">
          <Link to={`/mentordetails/${mentor.id}`} className="flex gap-3">
            <img
              src={profilePhoto || "/placeholder.svg"}
              alt={fullName}
              className="w-14 h-14 rounded-full object-cover"
            />
            <div>
              <h2 className="font-semibold text-lg">{fullName}</h2>
              <p className="text-sm text-gray-600">{jobTitle}</p>
              <p>{mentor.years_of_experience || 0} Years Experience</p>
            </div>
          </Link>

          {/* Rating */}
          <div className="flex flex-col items-end">
            <div className="flex gap-1">
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
            <span className="text-sm text-gray-500 mt-1">
              {mentor.session_rate}
            </span>
          </div>
        </div>

        {/* Skills */}
        <div className="flex flex-wrap gap-2 px-4 pb-3">
          {(Array.isArray(mentor.technical_skills)
            ? mentor.technical_skills.slice(0, 4)
            : []
          ).map((skill, idx) => (
            <span
              key={idx}
              className="bg-[#2A0D471A] text-sm px-3 py-1 rounded-lg"
            >
              {skill}
            </span>
          ))}
        </div>

        {/* Actions */}
        <div className="flex items-center justify-center gap-4 pb-4">
          <button
            onClick={openModal}
            disabled={mentorSession.includes(mentor.id)}
            className={`py-2 px-4 border rounded-lg font-medium text-sm ${mentorSession.includes(mentor.id)
              ? "bg-green-50 text-gray-400 border-gray-300 cursor-not-allowed"
              : "bg-[#5DA05D] text-white"
              }`}
          >
            {mentorSession.includes(mentor.id)
              ? "Pending..."
              : "Book Session"}
          </button>

          <button
            onClick={handleSaveMentor}
            disabled={saveMentor}
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
        <div
          onClick={handleClickOutside}
          id="modalBackdrop"
          className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50"
        >
          <div className="bg-white p-6 rounded-lg w-full max-w-md max-h-[90vh] overflow-y-auto shadow-lg">
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
              <div className="ml-auto font-semibold">{mentor.session_rate}</div>
            </div>

            {/* Step 1 - Form */}
            {modalStep === 1 && (
              <>
                {/* Session Type */}
                <div className="mb-6">
                  <h4 className="font-medium mb-3">Select Session Type</h4>
                  <div className="space-y-3">
                    {[
                      {
                        value: "individual",
                        label: "Individual Session",
                        desc: "1-on-1 mentorship session",
                      },
                      {
                        value: "group",
                        label: "Group Session",
                        desc: "Multiple participants (2–6 people)",
                      },
                    ].map((opt) => (
                      <button
                        key={opt.value}
                        type="button"
                        onClick={() =>
                          setFormData({ ...formData, session_type: opt.value })
                        }
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

                {/* Group session employee selection */}
                {formData.session_type === "group" && (
                  <div className="mb-6">
                    <h4 className="font-medium mb-3">Select Employees</h4>

                    {/* Selected employee chips */}
                    {formData.selectedEmployees.length > 0 && (
                      <div className="flex flex-wrap gap-2 mb-3">
                        {formData.selectedEmployees.slice(0, 3).map((emp) => (
                          <div
                            key={emp.id}
                            className="flex items-center gap-2 bg-green-50 border border-[#5DA05D] text-[#5DA05D] px-2 py-1 rounded-full text-sm"
                          >
                            <img
                              src={emp.profile_photo || "/placeholder.svg"}
                              alt={emp.name}
                              className="w-6 h-6 rounded-full object-cover"
                            />
                            <span>{emp.name}</span>
                            <button
                              onClick={() => handleSelectEmployee(emp)}
                              className="text-gray-500 hover:text-red-500 text-xs font-bold"
                            >
                              ✕
                            </button>
                          </div>
                        ))}
                        {formData.selectedEmployees.length > 3 && (
                          <div className="flex items-center justify-center bg-green-50 border border-[#5DA05D] text-[#5DA05D] px-3 py-1 rounded-full text-sm">
                            +{formData.selectedEmployees.length - 3}
                          </div>
                        )}
                      </div>
                    )}

                    {/* Search input */}
                    <input
                      type="text"
                      placeholder="Search employees by name..."
                      className="w-full border p-2 rounded-lg mb-3"
                      value={formData.search || ""}
                      onChange={(e) =>
                        setFormData({ ...formData, search: e.target.value })
                      }
                    />

                    {/* Search results */}
                    <div className="space-y-2 max-h-48 overflow-y-auto">
                      {searchLoading ? (
                        <p className="text-sm text-gray-500 text-center">
                          Searching...
                        </p>
                      ) : (
                        searchUser.map((emp) => {
                          const isSelected = formData.selectedEmployees.some(
                            (e) => e.id === emp.id
                          )
                          return (
                            <div
                              key={emp.id}
                              onClick={() => handleSelectEmployee(emp)}
                              className={`flex items-center gap-3 p-2 border rounded cursor-pointer ${isSelected
                                ? "bg-green-50 border-[#5DA05D]"
                                : "border-gray-200 hover:border-[#5DA05D]"
                                }`}
                            >
                              <img
                                src={emp.profile_photo || "/placeholder.svg"}
                                alt={emp.name}
                                className="w-8 h-8 rounded-full object-cover"
                              />
                              <div>
                                <span className="font-medium">{emp.name}</span>
                                <div className="text-xs">{emp.qualification}</div>
                              </div>
                            </div>
                          )
                        })
                      )}
                    </div>
                  </div>
                )}

                {/* Date & Time */}
                <div className="mb-6">
                  <h4 className="font-medium mb-3">Select Date & Time</h4>
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
                  <h4 className="font-medium mb-3">
                    What would you like to discuss?
                  </h4>
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
                        key={topic}
                        onClick={() =>
                          setFormData({ ...formData, discourse: topic })
                        }
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

                <div className="flex justify-end gap-3">
                  <button
                    onClick={closeModal}
                    className="px-4 py-2 bg-gray-200 rounded"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleContinue}
                    className="px-4 py-2 bg-[#5DA05D] text-white rounded"
                    disabled={!formData.date || !formData.time}
                  >
                    Continue
                  </button>
                </div>
              </>
            )}

            {/* Step 2 - Summary */}
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

                    {/* ✅ Show Invitees only if session_type is group */}
                    {formData.session_type === "group" &&
                      formData.selectedEmployees?.length > 0 && (
                        <li>
                          <strong>Invitees:</strong>
                          <div className="mt-2 flex flex-wrap gap-3">
                            {formData.selectedEmployees.map((emp) => (
                              <div
                                key={emp.id}
                                className="flex items-center gap-2 border border-[#5DA05D] bg-green-50 rounded-full px-3 py-1"
                              >
                                <img
                                  src={emp.profile_photo || "/placeholder.svg"}
                                  alt={emp.name}
                                  className="w-6 h-6 rounded-full object-cover"
                                />
                                <span className="text-sm text-[#5DA05D] font-medium">
                                  {emp.name}
                                </span>
                              </div>
                            ))}
                          </div>
                        </li>
                      )}
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
    </div>
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
      const res = await MentorServices.recommendedmentors();
      console.log(res);
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
      console.log(data.results)
      setSearchMentor(success ? (data.results ?? data ?? []) : [])
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
      {user?.user_type !== "mentor" ? (
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
