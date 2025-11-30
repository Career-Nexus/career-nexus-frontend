import React, { useContext, useEffect, useRef, useState } from 'react'
import { Company1, Company2, Like, VideoIcon } from '../../../../../icons/icon'
import { BriefcaseBusiness, GraduationCap, MapPin, UserPlus, ChevronDown, Building, Calendar, ChevronUp, Ellipsis, Info, X } from 'lucide-react'
import { EditComponent } from '../AllModal'
import EventsHome from '../../EventsHome'
import { UserContext } from '../../../../../context/UserContext'
import { useNavigate, useParams } from 'react-router-dom';
import PersonsPosts from './PersonsPosts'
import ProfessionalSummary from './ProfessionalSummary'
import ProjectCatalog from './ProjectCatalog'
import AnalyticsDashboard from './AnalyticsDashboard'
import Videos from './Videos'
import VideoTabs from './Videos'
import { ChatServices } from '../../../../../api/ChatServices'
import { PostService } from '../../../../../api/PostService';
import { MentorServices } from '../../../../../api/MentorServices';
import { toast } from 'react-toastify'
import { CoverPhotoPreviewModal, ProfilePhotoPreviewModal } from '../ImagePreviewModal'
import { useDebounce } from 'use-debounce'

const ViewPersonProfile = () => {
    const { user, userwithid } = useContext(UserContext)
    // console.log("userwithid", userwithid);    
    const [isFollowing, setIsFollowing] = useState(false);
    const [followersCount, setFollowersCount] = useState(0);
    const [mentorSession, setMentorSession] = useState([])

    const [coverPreviewImage, setCoverPreviewImage] = useState(null);
    const [profilePreviewImage, setProfilePreviewImage] = useState(null);

    const navigate = useNavigate()
    // console.log(userwithid)

    const { id } = useParams();
    const { getUserById } = useContext(UserContext); // make sure getUserById is exposed in the context
    // console.log(id)

    useEffect(() => {
        if (id) {
            getUserById(id); // fetch and store in context
        }
    }, [id]);

    useEffect(() => {
        if (userwithid) {
            setIsFollowing(!userwithid.can_follow);
            // if can_follow is false => user already followed
            setFollowersCount(userwithid.followers);
        }
    }, [userwithid]);

    const InitiateChatSession = async () => {
        if (!id) {
            toast.error("Mentor ID not found");
            return;
        }
        const result = await ChatServices.initiateChatSession(id);

        if (result.success) {
            toast.success("Chat session initiated successfully");
            console.log(result.data);
            navigate(`/chat/${result.data.chat_id}`, {
                state: { contributor: result.data.contributor },
            });
        } else {
            toast.error("Failed to initiate chat session");
        }
    };

    const handleFollow = async () => {
        try {
            const newFollowState = !isFollowing;

            // Optimistic update
            setIsFollowing(newFollowState);
            setFollowersCount(prev => newFollowState ? prev + 1 : prev - 1);

            if (newFollowState) {
                await PostService.Follow({ user_following: id });
                toast.success("You are now following this user");
            } else {
                await PostService.Unfollow({ user_following: id });
                toast.success("You unfollowed this user");
            }
        } catch (err) {
            console.error(err);
            // revert on error
            setIsFollowing(!isFollowing);
            setFollowersCount(prev => isFollowing ? prev + 1 : prev - 1);
            toast.error("Failed to update follow state");
        }
    };
    // const fullName = `${mentor.first_name} ${mentor.last_name}`
    // const profilePhoto = mentor.profile_photo
    // const jobTitle = mentor.current_job
    const [searchUser, setSearchUser] = useState([])
    const [searchLoading, setSearchLoading] = useState(false)
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalStep, setModalStep] = useState(1);
    // const [formData, setFormData] = useState({
    //     session_type: "individual",
    //     date: "",
    //     time: "",
    //     discourse: "",
    // });
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
        setModalStep(1);
        setIsModalOpen(true);
    };
    const closeModal = () => setIsModalOpen(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };
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
            mentor: id,
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
            toast.error("Please fill in all fields");
            return;
        }
        setModalStep(2);
    };

    const handleClickOutside = (e) => {
        if (e.target === e.currentTarget) {
            closeModal();
        }
    };

    // const submitBooking = async () => {
    //     const payload = {
    //         mentor: id,
    //         ...formData,
    //     };
    //     setMentorSession((prev) => [...prev, id])
    //     try {
    //         const response = await MentorServices.bookmentorsession(payload);
    //         if (response) {
    //             toast.success("Mentor booking initiated successfully");
    //             closeModal();
    //         }
    //     } catch (err) {
    //         toast.error("Failed to book session");
    //     }
    // };

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

    function ProfilePicture() {
        return (
            <div className=''>
                <div className="flex items-center justify-center w-full h-auto">
                    <div
                        className="relative w-full h-48"
                    >
                        <div className='flex items-center justify-center'>
                            <div className='relative w-full h-48 overflow-hidden rounded-tl-lg rounded-tr-lg'>
                                <img src={userwithid?.cover_photo || "/images/bg-profile.png"}
                                    alt="cover photo"
                                    className="w-full h-full object-cover object-center"
                                    onClick={() =>
                                        setCoverPreviewImage(userwithid.cover_photo || "/images/bg-profile.png")
                                    }
                                    onError={(e) => (e.target.src = "/images/bg-profile.png")}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className='grid grid-cols-12 md:gap-8 lg:px-20 px-5 py-8'>
            <div className='col-span-12 md:col-span-9'>
                <div className='bg-white  p-1 border border-gray-300 rounded-lg'>
                    <div className='relative'>
                        <ProfilePicture />
                    </div>
                    <div className='flex justify-between'>
                        <div className='relative w-32 h-auto'
                        >
                            <div className='flex items-center justify-center'>
                                <div className='absolute inset-0 rounded-full w-32 h-auto mt-[-3rem] ml-2 flex flex-col items-center justify-center transition-opacity duration-200'>
                                    <img src={userwithid?.profile_photo}
                                        alt="profile picture"
                                        className="w-28 h-28 rounded-full object-cover"
                                        onClick={() =>
                                            setProfilePreviewImage(userwithid.profile_photo || "/images/profile.png")
                                        }
                                        onError={(e) => (e.target.src = "/placeholder.svg")}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                    <hr className='my-3' />
                    {/* <div className="mt-6 flex flex-col md:flex-row md:items-center md:justify-between px-3 gap-6"> */}
                    <div className="mt-6 grid grid-cols-12 md:justify-between gap-2 w-full">
                        <div className="col-span-12 md:col-span-8 w-full">
                            <h1 className='text-3xl font-bold'>
                                {userwithid.first_name} {userwithid.last_name}
                            </h1>
                            {userwithid?.bio && (
                                <p className="text-sm md:text-lg my-3">{userwithid.bio}</p>
                            )}
                            <p className="text-slate-500 font-thin flex items-center gap-2">
                                <MapPin className="w-4 h-4" />
                                {userwithid?.location}
                                <BriefcaseBusiness className="w-4 h-4 ml-4" />
                                {userwithid?.position}
                            </p>
                            <p className="text-slate-500 font-thin flex items-center gap-2">
                                <GraduationCap className="w-4 h-4" />
                                {userwithid?.qualification}
                            </p>
                            <p className="my-3">
                                <span className="text-[#5DA05D] mr-2">{userwithid?.followings}</span> Following
                                <span className="text-[#5DA05D] mx-2">{followersCount}</span> Followers
                            </p>
                            <div className='mb-2'>
                                {userwithid.user_type === "learner" || userwithid.user_type === "employer" ? (
                                    <div className='flex items-center justify-between'>
                                        <button
                                            onClick={handleFollow}
                                            className={`flex items-center justify-center gap-1 rounded-lg px-3 py-2 text-sm 
                                            ${isFollowing ? "bg-gray-300 text-black" : "bg-[#5DA05D] text-white"}`}
                                        >
                                            <UserPlus className="w-4 h-4" />
                                            {isFollowing ? "Following" : "Follow"}
                                        </button>

                                        <div className=''>
                                            {userwithid.can_message === true ? (
                                                <button onClick={InitiateChatSession} className='text-white bg-[#5DA05D] py-2 px-3 rounded-lg'>Message</button>
                                            ) : ("")}
                                        </div>
                                    </div>
                                ) : userwithid.user_type === "mentor" ? (
                                    <div className='flex items-center justify-between'>
                                        <button
                                            onClick={openModal}
                                            //disabled
                                            disabled={mentorSession.includes(id)}
                                            className={`py-2 px-4 border ${mentorSession.includes(id)
                                                ? "bg-green-50 text-gray-400 cursor-not-allowed border-gray-300"
                                                : "bg-[#5DA05D] text-white"
                                                } rounded-lg transition-colors duration-200 font-medium text-sm`}
                                        >
                                            {mentorSession.includes(id) ? "Pending..." : "Book Session"}
                                        </button>
                                        <div className=''>
                                            {userwithid.can_message === true ? (
                                                <button onClick={InitiateChatSession} className='text-white bg-[#5DA05D] py-2 px-3 rounded-lg'>Message</button>
                                            ) : ("")}
                                            {/* <button
                                            className="bg-[#5DA05D] text-white rounded-lg py-2 text-sm px-4"
                                            >
                                                Book Session
                                            </button> */}
                                        </div>
                                    </div>
                                ) : null}
                            </div>

                        </div>
                        <div className='flex flex-col col-span-12 md:col-span-4 w-full'>

                            <div className='md:flex justify-end mb-2 ml-auto'>
                                {userwithid?.intro_video ? (
                                    <video
                                        src={userwithid.intro_video}
                                        controls
                                        className="rounded-lg max-w-xs w-[90%]"
                                    />
                                ) : (
                                    <div>
                                        <img
                                            src="/images/video1.png"
                                            alt="video stream"
                                            className="rounded-lg max-w-xs w-[90%]"
                                        />
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
                <CoverPhotoPreviewModal
                    open={!!coverPreviewImage}
                    onClose={() => setCoverPreviewImage(null)}
                    image={coverPreviewImage}
                />
                <ProfilePhotoPreviewModal
                    open={!!profilePreviewImage}
                    onClose={() => setProfilePreviewImage(null)}
                    image={profilePreviewImage}
                />
                <ProfileTabs />

            </div>
            <div className='col-span-3'>
                <EventsHome />
            </div>
            {/* {isModalOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">

                    <div className="bg-white p-6 rounded-lg w-[420px] max-h-[90vh] overflow-y-auto shadow-lg">
                        <h2 className="text-xl font-bold mb-4">Book Mentorship Session</h2>


                        <div className="flex items-center gap-3 mb-6">
                            <img
                                src={userwithid?.profile_photo || "/placeholder.svg"}
                                alt={`${userwithid?.first_name} ${userwithid?.last_name}`}
                                className="w-12 h-12 rounded-full object-cover"
                            />
                            <div>
                                <h3 className="font-semibold text-lg">{userwithid?.first_name} {userwithid?.last_name}</h3>
                                <p className="text-sm text-gray-500">{userwithid?.current_job}</p>
                            </div>
                        </div>


                        {modalStep === 1 && (
                            <>

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

                                <textarea
                                    name="extra"
                                    placeholder="Add any specific details (e.g. role, areas of focus)"
                                    className="w-full border border-gray-300 rounded p-2 mb-6 text-sm resize-none focus:ring-0 focus:border-gray-400"
                                />


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
            )} */}
            {isModalOpen && (
                <div
                    onClick={handleClickOutside}
                    className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50"
                >
                    <div className="bg-white p-6 rounded-lg w-full max-w-md max-h-[90vh] overflow-y-auto no-scrollbar shadow-lg">
                        <h2 className="text-xl font-bold mb-4">Book Mentorship Session</h2>

                        {/* Mentor Info */}
                        <div className="flex items-center gap-3 mb-6">
                            <img
                                src={userwithid.profile_photo || "/placeholder.svg"}
                                alt={userwithid.first_name + " " + userwithid.last_name}
                                className="w-12 h-12 rounded-full object-cover"
                            />
                            <div>
                                <h3 className="font-semibold text-lg">{userwithid.first_name + " " + userwithid.last_name}</h3>
                                <p className="text-sm text-gray-500">{userwithid.job_title}</p>
                            </div>
                            <div className="ml-auto font-semibold">{userwithid.session_rate}</div>
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
                                                desc: "Multiple participants (2-10 people)",
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
                                        <h4 className="font-medium mb-3">Select Invitees</h4>

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
                                                            <X />
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
                                            placeholder="Search invitees by name..."
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

function ProfileTabs() {
    const [activeTab, setActiveTab] = useState("professional")
    const tabsRef = useRef(null)
    const { userwithid } = useContext(UserContext)

    // Scroll tabs horizontally on smaller screens
    const scrollTabs = (direction) => {
        if (tabsRef.current) {
            const scrollAmount = 200
            if (direction === "left") {
                tabsRef.current.scrollLeft -= scrollAmount
            } else {
                tabsRef.current.scrollLeft += scrollAmount
            }
        }
    }

    return (
        <div className="w-full max-w-6xl mx-auto py-4">
            {/* Tabs navigation with scroll buttons for mobile */}
            <div className="relative">
                <button
                    onClick={() => scrollTabs("left")}
                    className="absolute left-0 top-1/2 -translate-y-1/2 bg-white rounded-full p-1 shadow-md border md:hidden z-10"
                >
                    {/* <ChevronLeft className="h-4 w-4" /> */}
                </button>

                <div ref={tabsRef} className="my-3 gap-3 flex overflow-x-auto scrollbar-hide px-6 md:px-0 md:overflow-visible">

                    <button
                        className={`px-4 py-2 rounded-lg text-xs whitespace-nowrap transition-colors flex items-center gap-1.5 ${activeTab === "professional" ? "border border-[#5DA05D] text-[#5DA05D]" : "border border-gray-300 hover:bg-gray-100"
                            }`}
                        onClick={() => setActiveTab("professional")}
                    >
                        {/* <User className="h-3.5 w-3.5" /> */}
                        Professional Portfolio
                    </button>
                    {userwithid.user_type === "learner" ? (

                        <button
                            className={`px-4 py-2 rounded-lg text-xs whitespace-nowrap transition-colors flex items-center gap-1.5 ${activeTab === "analytics" ? "border border-[#5DA05D] text-[#5DA05D]" : "border border-gray-300 hover:bg-gray-100"
                                }`}
                            onClick={() => setActiveTab("analytics")}
                        >
                            {/* <PieChart className="h-3.5 w-3.5" /> */}
                            Analytics Dashboard
                        </button>

                    ) : (
                        <button
                            className={`px-4 py-2 rounded-lg text-xs whitespace-nowrap transition-colors flex items-center gap-1.5 ${activeTab === "video" ? "border border-[#5DA05D] text-[#5DA05D]" : "border border-gray-300 hover:bg-gray-100"
                                }`}
                            onClick={() => setActiveTab("video")}
                        >
                            Video
                        </button>
                    )}
                    <button
                        className={`px-4 py-2 rounded-lg text-xs whitespace-nowrap transition-colors flex items-center gap-1.5 ${activeTab === "projects" ? "border border-[#5DA05D] text-[#5DA05D]" : "border border-gray-300 hover:bg-gray-100"
                            }`}
                        onClick={() => setActiveTab("projects")}
                    >
                        {/* <Briefcase className="h-3.5 w-3.5" /> */}
                        Project Catalog
                    </button>

                    <button
                        className={`px-4 py-2 rounded-lg text-xs whitespace-nowrap transition-colors flex items-center gap-1.5 ${activeTab === "posts" ? "border border-[#5DA05D] text-[#5DA05D]" : "border border-gray-300 hover:bg-gray-100"
                            }`}
                        onClick={() => setActiveTab("posts")}
                    >
                        {/* <FileText className="h-3.5 w-3.5" /> */}
                        Posts
                    </button>

                </div>

                <button
                    onClick={() => scrollTabs("right")}
                    className="absolute right-0 top-1/2 -translate-y-1/2 bg-white rounded-full p-1 shadow-md border md:hidden z-10"
                >
                    {/* <ChevronRight className="h-4 w-4" /> */}
                </button>
            </div>

            {/* Tab content */}
            <div className="mt-6">
                {activeTab === "posts" && <PersonsPosts />}
                {activeTab === "professional" && <ProfessionalSummary />}
                {/* {activeTab === "gallery" && <PortfolioGalleryTemplate />} */}
                {activeTab === "projects" && <ProjectCatalog />}
                {activeTab === "analytics" && <AnalyticsDashboard />}
                {activeTab === "video" && <VideoTabs />}
            </div>
        </div>
    )
}

export default ViewPersonProfile