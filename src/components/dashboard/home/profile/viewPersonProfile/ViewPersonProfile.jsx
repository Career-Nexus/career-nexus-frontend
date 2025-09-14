import React, { useContext, useEffect, useRef, useState } from 'react'
import { Company1, Company2, Like, VideoIcon } from '../../../../../icons/icon'
import { BriefcaseBusiness, GraduationCap, MapPin, UserPlus, ChevronDown, Building, Calendar, ChevronUp, Ellipsis, Info } from 'lucide-react'
import { EditComponent } from '../AllModal'
import EventsHome from '../../EventsHome'
import { UserContext } from '../../../../../context/UserContext'
import { useParams } from 'react-router-dom';
import PersonsPosts from './PersonsPosts'
import ProfessionalSummary from './ProfessionalSummary'
import ProjectCatalog from './ProjectCatalog'
import AnalyticsDashboard from './AnalyticsDashboard'
import Videos from './Videos'
import VideoTabs from './Videos'

const ViewPersonProfile = () => {
    const { user, userwithid } = useContext(UserContext)


    const { id } = useParams();
    const { getUserById } = useContext(UserContext); // make sure getUserById is exposed in the context

    useEffect(() => {
        if (id) {
            getUserById(id); // fetch and store in context
        }
    }, [id]);

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
                    <div className="mt-6 grid grid-cols-12 md:justify-between gap-2">
                        <div className="col-span-12 md:col-span-8">
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
                            {/* <div className='flex gap-2 mb-2'>
                                {userwithid.user_type === "learner" ? (
                                    <button className='flex items-center justify-center gap-1 rounded-lg bg-[#5DA05D] text-white px-2 text-sm'>
                                        <UserPlus className='w-4 h-4' />
                                        <span className='px-2 py-1'>Follow</span>
                                    </button>
                                ) : (
                                    <div className='flex items-center'>
                                        <button className='bg-[#5DA05D] text-white rounded-lg py-2 text-sm px-4'>Book Session</button>
                                        <div className='border border-[#5DA05D] rounded-lg px-4 py-2 text-sm ml-3'>
                                            <Ellipsis size={20} />
                                        </div>
                                    </div>
                                )}
                            </div> */}
                        </div>
                        <div className='flex flex-col col-span-12 md:col-span-4'>

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

// function PostsTemplate() {
//     const [expandedItems, setExpandedItems] = useState({
//         walmart: false,
//         apple: false
//     });

//     const toggleExpand = (key) => {
//         setExpandedItems(prev => ({
//             ...prev,
//             [key]: !prev[key]
//         }));
//     };
//     const profile = [
//         {
//             id: 1, image: "/images/profile3.png", name: "Matthew Kunle",
//             description: "Ux Mentor, Google certified Ux designer", days: "8d", timeIcon: <Clock className='w-3 h-3' />,
//             disc2: "If you always stay in your comfort zone, how will you know what you're capable of?Most people don't fail because they lack talent or intelligence............................. ",
//             image2: "/images/image1.png"
//         },
//         {
//             id: 2, image: "/images/profile4.png", name: "Cole Kingsman",
//             description: "Ceo texile rebound, Strategic Business man", days: "12hrs", timeIcon: <Clock className='w-3 h-3' />,
//             disc2: "🔍 Why Do So Many Finance Apps Look the Same? Ever noticed how most fintech apps follow the same blue-and-white theme.... ",
//             image2: "/images/image2.png"
//         }
//     ]
//     return (
//         <div className='grid grid-cols-12'>
//             <div className='col-span-9'>
//                 {profile.map(p => (
//                     <div key={p.id} className='border border-gray-300 rounded-lg p-4 my-5'>
//                         <div className='flex gap-3 mb-2 items-center'>
//                             <img src={p.image} alt="profile" className='w-12 h-12 rounded-full' />
//                             <div className='flex flex-col justify-center'>
//                                 <h3 className='font-semibold text-sm'>{p.name}</h3>
//                                 <p className='font-light text-sm'>{p.description}</p>
//                                 <div className='flex items-center gap-1'>
//                                     <p>{p.days}</p>
//                                     <p>{p.timeIcon}</p>
//                                 </div>
//                             </div>
//                             <button className='ml-auto px-4 pb-1 rounded-lg font-bold text-2xl'>...</button>
//                         </div>
//                         <ul className="list-disc ml-5 mt-3 text-sm">

//                             <span className=" ">

//                                 <span className='mb-3'>{p.disc2}</span>
//                                 {!expandedItems.walmart && "..."}
//                                 <button
//                                     onClick={() => toggleExpand("walmart")}
//                                     className="text-[#5DA05D] hover:text-blue-700 ml-1 text-sm font-medium inline-flex items-center"
//                                 >
//                                     {expandedItems.walmart ? (
//                                         <>
//                                             <span className='text-[#5DA05D]'>Hide</span>
//                                             <ChevronUp className="h-3 w-3 ml-0.5" />
//                                         </>
//                                     ) : (
//                                         <>
//                                             <span className='text-[#5DA05D]'>More</span>
//                                             <ChevronDown className="h-3 w-3 ml-0.5" />
//                                         </>
//                                     )}
//                                 </button>
//                             </span>
//                             {expandedItems.walmart && (
//                                 <>
//                                     <li className="mt-2">
//                                         Collaborated with cross-functional teams to deliver high-quality software solutions on time and
//                                         within budget.
//                                     </li>
//                                     <li className="mt-2">
//                                         Implemented responsive design principles to ensure optimal user experience across various devices
//                                         and screen sizes.
//                                     </li>
//                                     <li className="mt-2">
//                                         Participated in code reviews and provided constructive feedback to improve code quality and
//                                         maintainability.
//                                     </li>
//                                     <li className="mt-2">
//                                         Utilized agile methodologies to manage project workflows and ensure continuous delivery of features.
//                                     </li>
//                                 </>
//                             )}
//                         </ul>
//                         <div>
//                             <img src={p.image2} alt="profile" className='w-full h-[348px]' />
//                         </div>
//                         <SocialInteractionBar
//                             likes={125}
//                             comments={25}
//                             shares={2}
//                             views={true}
//                             events={true}
//                         />
//                     </div>

//                 ))}

//             </div>
//         </div>
//     )
// }

// function ProfessionalSummaryTemplate() {
//     return (
//         <div>
//             <div>
//                 <h2 className='font-bold text-xl mb-3'>Professional Summary</h2>
//                 <p className='text-sm'>
//                     With a strong background in software development, Sarah Johnson is a Senior Software Engineer at SEECS - National University of Minneapolis with years of experience building scalable and efficient tech solutions. She specializes in backend development, system architecture, and cloud computing, working across various industries to develop high-performance applications. <br />
//                     As an experienced mentor, Sarah has helped aspiring engineers land roles in top tech companies, guiding them through coding interviews, system design, and career transitions. She is passionate about helping developers grow, whether through technical coaching, portfolio reviews, or mock interview prep. <br />
//                     If you and your friends are looking for group sessions on coding interviews, system design, or career guidance, create a group of 5 and reach out via direct message. Discounted sessions are available! 🚀
//                 </p>
//             </div>

//             {/* have it */}
//             <ExperienceSection />
//         </div>
//     )
// }

// function ExperienceSection({ }) {
//     const [expandedItems, setExpandedItems] = useState({
//         walmart: false,
//         apple: false
//     });

//     const toggleExpand = (key) => {
//         setExpandedItems(prev => ({
//             ...prev,
//             [key]: !prev[key]
//         }));
//     };
//     const Experience = ({ logo, title, company, duration, address, desc }) => {
//         return (
//             <div className="border rounded-lg mb-4 p-4 relative">
//                 <div className="flex gap-4">
//                     <div className="flex-shrink-0">
//                         <div className="w-8 h-8 bg-blue-600 rounded-md flex items-center justify-center">
//                             {logo}
//                         </div>
//                     </div>

//                     <div className="flex-grow">
//                         <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2">
//                             <h3 className="font-semibold text-base">{title}</h3>
//                         </div>

//                         <div className="flex items-center text-sm text-gray-600 mt-1">
//                             <Building className="h-4 w-4 mr-1 text-[#5DA05D]" />
//                             <span>{company}</span>
//                         </div>

//                         <div className="flex items-center text-sm text-gray-600 mt-1">
//                             <Calendar className="h-4 w-4 mr-1 text-[#5DA05D]" />
//                             <span>{duration}</span>
//                         </div>

//                         <div className="flex items-center text-sm text-gray-600 mt-1">
//                             <MapPin className="h-4 w-4 mr-1 text-[#5DA05D]" />
//                             <span>{address}</span>
//                         </div>

//                         <ul className="list-disc ml-5 mt-3 text-sm">
//                             <li>
//                                 {desc}
//                             </li>
//                             <li>
//                                 Enhanced project comprehension with use case scenarios and diagrams
//                                 {!expandedItems.walmart && "..."}
//                                 <button
//                                     onClick={() => toggleExpand("walmart")}
//                                     className="text-[#5DA05D] hover:text-blue-700 ml-1 text-sm font-medium inline-flex items-center"
//                                 >
//                                     {expandedItems.walmart ? (
//                                         <>
//                                             Hide <ChevronUp className="h-3 w-3 ml-0.5" />
//                                         </>
//                                     ) : (
//                                         <>
//                                             Show More <ChevronDown className="h-3 w-3 ml-0.5" />
//                                         </>
//                                     )}
//                                 </button>
//                             </li>
//                             {expandedItems.walmart && (
//                                 <>
//                                     <li className="mt-2">
//                                         Collaborated with cross-functional teams to deliver high-quality software solutions on time and
//                                         within budget.
//                                     </li>
//                                     <li className="mt-2">
//                                         Implemented responsive design principles to ensure optimal user experience across various devices
//                                         and screen sizes.
//                                     </li>
//                                     <li className="mt-2">
//                                         Participated in code reviews and provided constructive feedback to improve code quality and
//                                         maintainability.
//                                     </li>
//                                     <li className="mt-2">
//                                         Utilized agile methodologies to manage project workflows and ensure continuous delivery of features.
//                                     </li>
//                                 </>
//                             )}
//                         </ul>
//                     </div>
//                 </div>
//             </div>
//         )
//     }
//     return (
//         <div className="w-full max-w-3xl mt-5">
//             <div className="flex items-center justify-between mb-4">
//                 <h2 className="text-xl font-bold">Experience</h2>
//             </div>

//             {/* Walmart Experience */}
//             <Experience
//                 logo={<Company1 />}
//                 title={"Software Engineer"}
//                 // status1={status2}
//                 // status={"RECOMMENDED"}
//                 company={"Walmart"}
//                 duration={"Aug 2018 - Dec 2019"}
//                 address={"Dallas, Texas, United States - On-site"}
//                 desc={"Designed and implemented user-friendly interfaces for e-commerce websites using HTML, CSS, and JavaScript."}
//             />
//             {/* Apple Experience */}
//             <Experience
//                 logo={<Company2 />}
//                 title={"Software Engineer"}
//                 // status1={status3}
//                 company={"Apple"}
//                 duration={"Aug 2018 - Dec 2019"}
//                 address={"Dallas, Texas, United States - On-site"}
//                 desc={"Designed and implemented user-friendly interfaces for e-commerce websites using HTML, CSS, and JavaScript."}
//             />

//             <div className="border rounded-lg mb-4 p-4 relative">
//                 <div className="flex gap-4">
//                     <div className="flex-shrink-0">
//                         <div className="w-8 h-8 bg-black rounded-md flex items-center justify-center">
//                             <Company2 />
//                         </div>
//                     </div>

//                     <div className="flex-grow">
//                         <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2">
//                             <h3 className="font-semibold text-base">Software Engineer</h3>
//                         </div>

//                         <div className="flex items-center text-sm text-gray-600 mt-1">
//                             <Building className="h-4 w-4 mr-1 text-[#5DA05D]" />
//                             <span>Apple</span>
//                         </div>

//                         <div className="flex items-center text-sm text-gray-600 mt-1">
//                             <Calendar className="h-4 w-4 mr-1 text-[#5DA05D]" />
//                             <span>Aug 2018 - Dec 2019</span>
//                         </div>

//                         <div className="flex items-center text-sm text-gray-600 mt-1">
//                             <MapPin className="h-4 w-4 mr-1 text-[#5DA05D]" />
//                             <span>Dallas, Texas, United States - On-site</span>
//                         </div>

//                         <ul className="list-disc ml-5 mt-3 text-sm">
//                             <li>
//                                 Designed and implemented user-friendly interfaces for e-commerce websites using HTML, CSS, and
//                                 JavaScript.
//                             </li>
//                             <li>
//                                 Enhanced project comprehension with use case scenarios and diagrams
//                                 {!expandedItems.apple && "..."}
//                                 <button
//                                     onClick={() => toggleExpand("apple")}
//                                     className="text-[#5DA05D] hover:text-blue-700 ml-1 text-sm font-medium inline-flex items-center"
//                                 >
//                                     {expandedItems.apple ? (
//                                         <>
//                                             Hide <ChevronUp className="h-3 w-3 ml-0.5" />
//                                         </>
//                                     ) : (
//                                         <>
//                                             Show More <ChevronDown className="h-3 w-3 ml-0.5" />
//                                         </>
//                                     )}
//                                 </button>
//                             </li>
//                             {expandedItems.apple && (
//                                 <>
//                                     <li className="mt-2">
//                                         Developed and maintained iOS applications using Swift and Objective-C, ensuring compatibility with
//                                         the latest iOS versions.
//                                     </li>
//                                     <li className="mt-2">
//                                         Optimized application performance by implementing efficient algorithms and data structures.
//                                     </li>
//                                     <li className="mt-2">
//                                         Integrated third-party APIs and services to enhance application functionality and user experience.
//                                     </li>
//                                     <li className="mt-2">
//                                         Conducted thorough testing and debugging to identify and resolve software defects before release.
//                                     </li>
//                                 </>
//                             )}
//                         </ul>
//                     </div>
//                 </div>
//             </div>
//             {/* education modal */}
//             <div>
//                 <div className="flex items-center justify-between mb-4">
//                     <h2 className="text-xl font-bold">Education</h2>
//                 </div>
//                 <Experience
//                     edit={true}
//                     logo={<Company2 />}
//                     title={"Computer Science"}
//                     // status1={status3}
//                     company={"Apple"}
//                     duration={"Aug 2018 - Dec 2019"}
//                     address={"Dallas, Texas, United States - On-site"}
//                     desc={"Designed and implemented user-friendly interfaces for e-commerce websites using HTML, CSS, and JavaScript."}
//                 />
//             </div>
//             <div>
//                 <div className="flex items-center justify-between mb-4">
//                     <h2 className="text-xl font-bold">Licenses & Certifications</h2>
//                 </div>
//                 <Experience
//                     edit={true}
//                     logo={<Company2 />}
//                     title={"Beginner Python"}
//                     // status1={status2}
//                     company={"Apple"}
//                     duration={"Aug 2018 - Dec 2019"}
//                     address={"Dallas, Texas, United States - On-site"}
//                     desc={"Designed and implemented user-friendly interfaces for e-commerce websites using HTML, CSS, and JavaScript."}
//                 />
//                 <Experience
//                     edit={true}
//                     logo={<Company2 />}
//                     title={"Python Intermediate"}
//                     // status1={status3}
//                     company={"Apple"}
//                     duration={"Aug 2018 - Dec 2019"}
//                     address={"Dallas, Texas, United States - On-site"}
//                     desc={"Designed and implemented user-friendly interfaces for e-commerce websites using HTML, CSS, and JavaScript."}
//                 />
//             </div>
//         </div>
//     )
// }


export default ViewPersonProfile