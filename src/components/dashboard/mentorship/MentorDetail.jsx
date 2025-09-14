import React, { useContext, useEffect, useRef, useState } from 'react'
import { Link, useParams } from 'react-router-dom';
import { Bookmark, BriefcaseBusiness, ChevronLeft, ChevronRight, Ellipsis, GraduationCap, MapPin, MessageCircle, RefreshCw, ThumbsUp, Upload, UserPlus } from 'lucide-react';
// import { mentors } from './MentorMain';
import ProfileDetail from './ProfileDetail';
import { Playbutton } from '../../../icons';
import MentorDetailPost from './MentorDetailPost';
// import MentorProfSummary from './MentorProfSummary';
import api from '../../../api/ApiServiceThree';
import { UserContext } from '../../../context/UserContext';
import ProfessionalSummary from '../home/profile/viewPersonProfile/ProfessionalSummary';
import PersonsPosts from '../home/profile/viewPersonProfile/PersonsPosts';
import AllJobs from '../jobs/AllJobs';
import ProjectCatalog from '../home/profile/viewPersonProfile/ProjectCatalog';
import AnalyticsDashboard from '../home/profile/viewPersonProfile/AnalyticsDashboard';

function MentorDetail() {
    const [mentorDetails, setMentorDetails] = useState(null);
    const [loading, setLoading] = useState(true);
    const { user, userwithid, getUserById } = useContext(UserContext)
    const { id } = useParams();

    useEffect(() => {
        if (id) {
            getUserById(id); // fetch and store in context
        }
    }, [id]);

    useEffect(() => {
        if (userwithid) {
            setMentorDetails(userwithid);
            setLoading(false);
        }
    }, [userwithid]);

    if (loading) {
        return <div className="p-6 text-center text-gray-600">Loading mentor profile...</div>;
    }

    if (!mentorDetails) {
        return (
            <div className="p-6">
                <h1 className="text-2xl font-bold">Mentor not found</h1>
                <Link to="/mentorship" className="text-blue-500 underline">Go back to mentors page</Link>
            </div>
        );
    }

    const mentor = mentorDetails;

    return (
        <div className='grid grid-cols-12 md:gap-8 p-4 md:px-5 lg:px-12 md:py-8'>
            <div className='md:col-span-4 lg:col-span-3 hidden md:block'>
                <ProfileDetail />
            </div>
            <div className='col-span-12 md:col-span-8 lg:col-span-9 border border-gray-200 p-4 rounded-lg'>
                <div className="col-span-8 rounded-lg shadow-sm">
                    <div className="relative w-full h-48">
                        <img src={userwithid.cover_photo} alt={userwithid.first_name} className="w-full h-52 object-cover rounded-tl-lg rounded-tr-lg" />
                    </div>
                    <div className="relative w-32 h-32">
                        <img src={userwithid.profile_photo} alt={userwithid.first_name} className="rounded-full w-32 h-32 mt-[-3.7rem] ml-3 object-cover" />
                    </div>
                         
                    <hr className='my-3' />
                    <div className="mt-6 grid grid-cols-12 md:justify-between gap-2">
                        <div className="col-span-12 md:col-span-8">
                            <h1 className="text-2xl md:text-3xl font-bold mb-2">{userwithid.first_name} {userwithid.last_name}</h1>
                            {userwithid?.bio && (
                                <p className="text-sm md:text-lg my-3">{userwithid.bio}</p>
                            )}
                            <div className='text-slate-500 font-thin flex items-center gap-2 mb-2'>
                                <p className='flex gap-2'><MapPin />{userwithid.location}</p>
                                <p className='flex gap-2'><BriefcaseBusiness />{userwithid.position}</p>
                            </div>
                            <div className='text-slate-500 font-thin flex items-center gap-2'><GraduationCap />{userwithid.qualification}</div>
                            <div className='flex gap-4 my-2'>
                                <div className='flex gap-2'>
                                    <span className='text-[#5DA05D]'>{userwithid.followings || 0}</span> following
                                </div>
                                <div className='flex gap-2'>
                                    <span className='text-[#5DA05D]'>{userwithid.followers || 0}</span> followers
                                </div>
                                <div className='flex gap-2'>
                                    <span className='text-[#5DA05D]'>{userwithid.session || 0}</span> sessions
                                </div>
                            </div>
                            {/* <div className="flex mt-6 space-x-3">
                                <button className="bg-[#2A0D47] text-white px-4 py-2 rounded-lg">Book a Session</button>
                                <button className="border border-[#5DA05D] text-gray-600 px-4 py-2 rounded-lg ">
                                    <Ellipsis />
                                </button>
                            </div> */}
                        </div>
                        {/* <div className='flex justify-between float-end'>
                            {userwithid?.intro_video ? (
                                <video
                                    src={userwithid.intro_video}
                                    controls
                                    className="rounded-lg max-w-xs"
                                />
                            ) : (
                                <img
                                    src="/images/video1.png"
                                    alt="video stream"
                                    className="rounded-lg max-w-xs"
                                />
                            )}
                        </div> */}
                        <div className='flex flex-col col-span-12 md:col-span-4'>
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

                    {/* <div className='border-t border-gray-200 my-4'>
                        <div className='flex items-center justify-between'>
                            <span>Reviews (10)</span>
                            <Link to={'#'} className='text-[#5DA05D]'>See All</Link>
                        </div>
                        <div className='border border-gray-200 rounded-lg p-5 mt-2'>
                            <h1>ggg</h1>
                        </div>
                    </div> */}
                    <Link to="/mentorship" className="mt-6 inline-block text-green-600 underline">← Back to mentorship</Link>
                </div>
                <MentorDetailsTabs />
            </div>
        </div>
    );
}
export default MentorDetail


function MentorDetailsTabs() {
    const [activeTab, setActiveTab] = useState("professional")
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
                    {/* <button
                        className={`px-4 py-2 rounded-lg text-xs whitespace-nowrap transition-colors flex items-center gap-1.5 ${activeTab === "gallery" ? "border border-[#5DA05D] text-[#5DA05D]" : "border border-gray-300 hover:bg-gray-100"
                            }`}
                        onClick={() => setActiveTab("gallery")}
                    >
                        Virtual Gallery
                    </button> */}
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
                <span>{activeTab === "professional" && <ProfSummary />}</span>
                <span>{activeTab === "gallery" && <PortfolioGallery />}</span>
                <span>{activeTab === "projects" && <ProjectCatalogs />}</span>
                <span>{activeTab === "analytics" && <AnalyticDashboard />}</span>
                <span>{activeTab === "posts" && <Posts />}</span>
            </div>
        </div>
    )
}

function Posts() {
    return (
        <div>
            {/* <MentorDetailPost/> */}
            <PersonsPosts />
        </div>
    )
}
function ProfSummary() {
    return (
        <div>
            <ProfessionalSummary />
            {/* <MentorProfSummary /> */}
            {/* professional summary */}
        </div>
    )
}
function ProjectCatalogs() {
    return (
        <div>
            <ProjectCatalog />
        </div>
    )
}

function PortfolioGallery() {
    return (
        <div>
            <AllJobs />
        </div>
    )
}
function AnalyticDashboard() {
    return (
        <div>
            <AnalyticsDashboard />
        </div>
    )
}