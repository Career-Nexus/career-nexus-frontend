import React, { useContext, useEffect, useRef, useState } from 'react'
import { Company1, Company2, Like, VideoIcon } from '../../../../../icons/icon'
import { BriefcaseBusiness, GraduationCap, MapPin, UserPlus, ChevronDown, Building, Calendar, ChevronUp, Ellipsis, Info } from 'lucide-react'
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
import { toast } from 'react-toastify'

const ViewPersonProfile = () => {
    const { user, userwithid } = useContext(UserContext)
    const navigate = useNavigate()

    const { id } = useParams();
    const { getUserById } = useContext(UserContext); // make sure getUserById is exposed in the context

    useEffect(() => {
        if (id) {
            getUserById(id); // fetch and store in context
        }
    }, [id]);

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
                                    <img src={userwithid?.profile_photo} alt="profile picture"
                                        className="w-28 h-28 rounded-full object-cover" />
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
                                <span className="text-[#5DA05D] mx-2">{userwithid?.followers}</span> Followers
                            </p>
                            <div className='mb-2'>
                                {userwithid.user_type === "learner" ? (
                                    <div className='flex items-center justify-between'>
                                        <button className='flex items-center justify-center gap-1 rounded-lg bg-[#5DA05D] text-white px-2 text-sm'>
                                            <UserPlus className='w-4 h-4' />
                                            <span className='px-2 py-2'>Follow</span>
                                        </button>
                                        <div className=''>
                                            {userwithid.can_message === true ? (
                                                <button onClick={InitiateChatSession} className='text-white bg-[#5DA05D] py-2 px-3 rounded-lg'>Chat User</button>
                                            ) : ("")}
                                        </div>
                                    </div>
                                ) : (
                                    <div className='flex items-center justify-between'>
                                        <button className='bg-[#5DA05D] text-white rounded-lg py-2 text-sm px-4'>Book Session</button>
                                        <div className=''>
                                            {userwithid.can_message === true ? (
                                                <button onClick={InitiateChatSession} className='text-white bg-[#5DA05D] py-2 px-3 rounded-lg'>Chat Mentor</button>
                                            ) : ("")}
                                        </div>
                                    </div>
                                )}
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
                <ProfileTabs />

            </div>
            <div className='col-span-3'>
                <EventsHome />
            </div>
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