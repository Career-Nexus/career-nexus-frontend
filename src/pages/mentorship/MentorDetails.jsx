import React, { useRef, useState } from 'react'
import { mentors } from '../../components/dashboard/mentorship/MentorMain';
import ProfileDetail from '../../components/dashboard/mentorship/ProfileDetail'
import { Link, useParams } from 'react-router-dom';
import { Bookmark, BriefcaseBusiness, ChevronLeft, ChevronRight, Ellipsis, GraduationCap, MapPin, MessageCircle, RefreshCw, ThumbsUp, Upload, UserPlus } from 'lucide-react';
import { Playbutton } from '../../icons';
// import { PlayButton } from '../icon/index';


function MentorDetails() {
    const { id } = useParams();

    const mentor = mentors.find((m) => m.id === parseInt(id));

    if (!mentor) {
        return (
            <div className="p-6">
                <h1 className="text-2xl font-bold">Project not found</h1>
                <Link to="/mentorship" className="text-blue-500 underline">Go back to mentors page</Link>
            </div>
        );
    }
    return (
        <div className='grid grid-cols-12 md:gap-8 p-4 md:px-5  lg:px-12 md:py-8 '>
            <div className='col-span-4 md:col-span-4 lg:col-span-3'>
                <ProfileDetail />
            </div>
            <div className='col-span-8 md:col-span-8 lg:col-span-9 border border-gray-200 p-4 rounded-lg'>
                <div className="col-span-8 rounded-lg shadow-sm">
                    <div className="relative w-full h-48">
                        {/* <img src={mentor.image} alt={mentor.name} className="rounded-lg mb-6 w-full h-96 object-cover" /> */}
                        <img src={mentor.cover} alt={mentor.name} className="w-full h-48 object-cover rounded-tl-lg rounded-tr-lg" />
                    </div>
                    <div className="relative w-32 h-32">
                        <img src={mentor.image} alt={mentor.name} className="rounded-full w-32 h-32 mt-[-3.7rem] ml-3 object-cover" />
                    </div>
                    <h1 className="text-3xl font-bold mb-2">{mentor.name}</h1>
                    <div className='flex items-center justify-between'>
                        <div>
                            <p className="text-gray-600 italic mb-4">{mentor.title}</p>
                            <div className='flex gap-4'>
                                <p className='flex gap-2'>
                                    <MapPin />{mentor.location}
                                </p>
                                <p className='flex gap-2'>
                                    <BriefcaseBusiness />{mentor.job}
                                </p>
                            </div>
                            <div className='flex gap-2 my-2'>
                                <GraduationCap />{mentor.degree}
                            </div>
                            <div className='flex gap-4 my-2'>
                                <div className='flex gap-2'>
                                    <span className='text-[#5DA05D]'>{mentor.stats.following}</span> following
                                </div>
                                <div className='flex gap-2'>
                                    <span className='text-[#5DA05D]'>{mentor.stats.followers}</span> followers
                                </div>
                                <div className='flex gap-2'>
                                    <span className='text-[#5DA05D]'>{mentor.sessions}</span> sessions
                                </div>
                            </div>
                            <div className="flex mt-6 space-x-3">
                                <button className="bg-[#2A0D47] text-white px-4 py-2 rounded-lg">
                                    Book a Session
                                </button>
                                <button className="bg-[#5DA05D] text-white px-4 py-2 rounded-lg flex gap-2 items-center ">
                                    <UserPlus className='w-5 h-5' />
                                    Follow
                                </button>
                                <button className="border border-[#5DA05D] text-gray-600 px-2 py-2 rounded-lg ">
                                    <Ellipsis />
                                </button>
                            </div>
                        </div>
                        <div>
                            <img src="/images/video1.png" alt="video" />
                        </div>
                    </div>
                    <Link to="/mentorship" className="mt-6 inline-block text-green-600 underline">← Back to mentorship</Link>
                </div>
                {/* tabs here */}
                <MentorDetailsTabs />
            </div>

        </div>
    )
}

export default MentorDetails


function MentorDetailsTabs() {
    const [activeTab, setActiveTab] = useState("posts")
    const tabsRef = useRef(null)

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
        <div className="w-full max-w-6xl mx-auto pt-4">
            {/* Tabs navigation with scroll buttons for mobile */}
            <div className="relative">
                <button
                    onClick={() => scrollTabs("left")}
                    className="absolute left-0 top-1/2 -translate-y-1/2 bg-white rounded-full p-1 shadow-md border md:hidden z-10"
                >
                    <ChevronLeft className="h-4 w-4" />
                </button>

                <div ref={tabsRef} className="my-3 gap-3 flex overflow-x-auto scrollbar-hide px-6 md:px-0 md:overflow-visible">

                    <button
                        className={`px-4 py-2 rounded-lg text-xs whitespace-nowrap transition-colors flex items-center gap-1.5 ${activeTab === "professional" ? "border border-[#5DA05D] text-[#5DA05D]" : "border border-gray-300 hover:bg-gray-100"
                            }`}
                        onClick={() => setActiveTab("professional")}
                    >
                        Professional Portfolio
                    </button>
                    <button
                        className={`px-4 py-2 rounded-lg text-xs whitespace-nowrap transition-colors flex items-center gap-1.5 ${activeTab === "gallery" ? "border border-[#5DA05D] text-[#5DA05D]" : "border border-gray-300 hover:bg-gray-100"
                            }`}
                        onClick={() => setActiveTab("gallery")}
                    >
                        Virtual Gallery
                    </button>
                    <button
                        className={`px-4 py-2 rounded-lg text-xs whitespace-nowrap transition-colors flex items-center gap-1.5 ${activeTab === "projects" ? "border border-[#5DA05D] text-[#5DA05D]" : "border border-gray-300 hover:bg-gray-100"
                            }`}
                        onClick={() => setActiveTab("projects")}
                    >
                        Project Catalog
                    </button>
                    <button
                        className={`px-4 py-2 rounded-lg text-xs whitespace-nowrap transition-colors flex items-center gap-1.5 ${activeTab === "analytics" ? "border border-[#5DA05D] text-[#5DA05D]" : "border border-gray-300 hover:bg-gray-100"
                            }`}
                        onClick={() => setActiveTab("analytics")}
                    >
                        Analytics Dashboard
                    </button>
                    <button
                        className={`px-4 py-2 rounded-lg text-xs whitespace-nowrap transition-colors flex items-center gap-1.5 ${activeTab === "posts" ? "border border-[#5DA05D] text-[#5DA05D]" : "border border-gray-300 hover:bg-gray-100"
                            }`}
                        onClick={() => setActiveTab("posts")}
                    >
                        Posts
                    </button>
                </div>

                <button
                    onClick={() => scrollTabs("right")}
                    className="absolute right-0 top-1/2 -translate-y-1/2 bg-white rounded-full p-1 shadow-md border md:hidden z-10"
                >
                    <ChevronRight className="h-4 w-4" />
                </button>
            </div>

            {/* Tab content */}
            <div className="my-6">
                <span>{activeTab === "professional" && <ProfessionalSummary />}</span>
                <span>{activeTab === "gallery" && <PortfolioGallery />}</span>
                <span>{activeTab === "projects" && <ProjectCatalog />}</span>
                <span>{activeTab === "analytics" && <AnalyticsDashboard />}</span>
                <span>{activeTab === "posts" && <Posts />}</span>
            </div>
        </div>
    )
}

function Posts() {
    const { id } = useParams();

    const mentor = mentors.find((m) => m.id === parseInt(id));
    return (
        <div>
            <div className='border border-gray-200 p-2 rounded-lg'>
                <div className='flex gap-4'>
                    <div>
                        <img src={mentor.image} alt={mentor.name} className="rounded-full w-16 h-16 ml-3 object-cover" />
                    </div>
                    <div className='flex flex-col'>
                        <span>{mentor.name}</span>
                        <span>{mentor.title}</span>
                        <span>{mentor.time}</span>
                    </div>
                </div>
                <div className='my-3'>
                    {mentor.shortdisc}<Link to={"/session"} className='text-green-500'>Click here to book now!</Link>
                </div>
                <div className='relative flex'>
                    <img src="/images/videoFrame.png" alt="videoFrame" className='w-[80%] h-52' />
                    <img src={Playbutton} alt="play" className='relative ml-[-25rem]  items-center' />
                </div>
                <div>
                    <SocialInteractionBar likes={125} comments={25} shares={2} views={true} events={true} />
                </div>
            </div>
            <br />
            <div className='border border-gray-200 p-2 rounded-lg'>
                <div className='flex gap-4'>
                    <div>
                        <img src={mentor.image} alt={mentor.name} className="rounded-full w-16 h-16 ml-3 object-cover" />
                    </div>
                    <div className='flex flex-col'>
                        <span>{mentor.name}</span>
                        <span>{mentor.title}</span>
                        <span>{mentor.time}</span>
                    </div>
                </div>
                <div className='my-3'>
                    {mentor.shortdisc}<Link to={"/session"} className='text-green-500'>Click here to book now!</Link>
                </div>
                <div className='relative flex'>
                    <img src="/images/videoFrame2.png" alt="videoFrame" className='w-[80%] h-52' />
                    <img src={Playbutton} alt="play" className='relative ml-[-25rem]  items-center' />
                </div>
                <div>
                    <SocialInteractionBar likes={125} comments={25} shares={2} views={true} events={true} />
                </div>
            </div>
        </div>
    )
}
function SocialInteractionBar({
    likes = 0,
    comments = 0,
    shares = 0,
    showSave = true,
    showRepost = true,
}) {
    return (
        <div className="flex  mt-3 gap-5">
            <div className="flex gap-2 justify-center items-center mr-5 hover:bg-green-100 hover:p-2 rounded-lg">
                <ThumbsUp size={18} /> {likes} <span className="hidden lg:block"></span>
            </div>
            <div className="flex gap-2 justify-center items-center mr-5 hover:bg-green-100 hover:p-2 rounded-lg">
                <MessageCircle size={18} /> {comments} <span className="hidden lg:block"></span>
            </div>
            <div className="flex gap-2 justify-center items-center mr-5 hover:bg-green-100 hover:p-2 rounded-lg">
                <Upload size={18} /> {shares} <span className="hidden lg:block"></span>
            </div>

            {showSave && (
                <div className="flex gap-2 justify-center items-center hover:bg-green-100 hover:p-2 rounded-lg">
                    <Bookmark size={18} /> <span className="hidden lg:block"></span>
                </div>
            )}
            {showRepost && (
                <div className="flex gap-2 justify-center items-center hover:bg-green-100 hover:p-2 rounded-lg">
                    <RefreshCw size={18} /> <span className="hidden lg:block"></span>
                </div>
            )}
        </div>
    )
}
function ProfessionalSummary() {
    return (
        <div>ProfessionalSummary</div>
    )
}
function ProjectCatalog() {
    return (
        <div>ProjectCatalog</div>
    )
}

function PortfolioGallery() {
    return (
        <div>PortfolioGallery</div>
    )
}
function AnalyticsDashboard() {
    return (
        <div> AnalyticsDashboard</div>
    )
}