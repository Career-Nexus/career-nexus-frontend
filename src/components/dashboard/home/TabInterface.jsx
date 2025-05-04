import { useState } from "react"
import { SocialInteractionBar } from "./SocialInteractionBar"
import { ChevronDown, ChevronUp, Plus } from "lucide-react"
import { Clock } from "../../../icons/icon"

export default function TabInterface() {
    const [activeTab, setActiveTab] = useState("all")

    return (
        <div className="w-full max-w-4xl mx-auto pt-4">
            <div className="my-3 gap-3 flex">
                <button
                    className={`px-4 py-2 rounded-lg text-xs transition-colors ${activeTab === "all" ? "bg-[#5DA05D] text-white" : "border border-gray-300 hover:bg-gray-100"
                        }`}
                    onClick={() => setActiveTab("all")}
                >
                    All
                </button>
                <button
                    className={`px-4 py-2 rounded-lg text-xs transition-colors ${activeTab === "following" ? "bg-[#5DA05D] text-white" : "border border-gray-300 hover:bg-gray-100"
                        }`}
                    onClick={() => setActiveTab("following")}
                >
                    Following
                </button>
                <button
                    className={`px-4 py-2 rounded-lg text-xs transition-colors ${activeTab === "mentors" ? "bg-[#5DA05D] text-white" : "border border-gray-300 hover:bg-gray-100"
                        }`}
                    onClick={() => setActiveTab("mentors")}
                >
                    Mentors
                </button>
            </div>

            <div className="mt-6">
                {activeTab === "all" && <AllTemplate />}
                {activeTab === "following" && <FollowingTemplate />}
                {activeTab === "mentors" && <MentorsTemplate />}
            </div>
        </div>
    )
}
function AllTemplate() {
    const [expandedItems, setExpandedItems] = useState({});

    const toggleExpand = (id) => {
        setExpandedItems(prev => ({
            ...prev,
            [id]: !prev[id] // Toggle only the clicked item's state
        }));
    };

    const profile = [
        {
            id: 1, image: "/images/profile.png", name: "John Smith",
            description: "Ux Mentor, Google certified Ux designer", days: "8d", timeIcon: <Clock />,
            disc2: "🔍If you always stay in your comfort zone, how will you know what you're capable of?...",
            image2: "/images/profile-img1.png"
        },
        {
            id: 2, image: "/images/profile.png", name: "John Smith",
            description: "Ceo texile rebound, Strategic Business man", days: "12hrs", timeIcon: <Clock />,
            disc2: "🔍 Why Do So Many Finance Apps Look the Same? Ever noticed how most fintech apps follow the same blue-and-white theme...",
            image2: "/images/profile-img2.png"
        }
    ];

    return (
        <div>
            {profile.map(p => (
                <div key={p.id} className='border border-gray-300 rounded-lg p-4 my-5'>
                    <div className='flex gap-3 mb-2 items-center'>
                        <img src={p.image} alt="profile" className='w-12 h-12 rounded-full' />
                        <div className='flex flex-col justify-center'>
                            <h3 className='font-semibold text-sm'>{p.name}</h3>
                            <p className='font-light text-sm'>{p.description}</p>
                            <div className='flex items-center gap-1'>
                                <p>{p.days}</p>
                                <p>{p.timeIcon}</p>
                            </div>
                        </div>
                        <button className='text-[#5DA05D] flex justify-center border border-[#5DA05D] ml-auto px-3 py-1 rounded-lg text-xs'>
                            <Plus className='w-4 h-4' /> Follow
                        </button>
                    </div>

                    <p className='mb-3'>{p.disc2}</p>
                    <button
                        onClick={() => toggleExpand(p.id)}
                        className="text-[#5DA05D] hover:text-blue-700 ml-1 text-sm font-medium inline-flex items-center"
                    >
                        {expandedItems[p.id] ? (
                            <>
                                <span className='text-[#5DA05D]'>Hide</span>
                                <ChevronUp className="h-3 w-3 ml-0.5" />
                            </>
                        ) : (
                            <>
                                <span className='text-[#5DA05D]'>More</span>
                                <ChevronDown className="h-3 w-3 ml-0.5" />
                            </>
                        )}
                    </button>

                    {expandedItems[p.id] && (
                        <div className="mt-2">
                            <ul className="list-disc ml-5 text-sm">
                                <li>Collaborated with cross-functional teams to deliver high-quality software solutions.</li>
                                <li>Implemented responsive design principles to ensure optimal user experience.</li>
                                <li>Participated in code reviews and provided constructive feedback.</li>
                                <li>Utilized agile methodologies to manage workflows efficiently.</li>
                            </ul>
                        </div>
                    )}

                    <div>
                        <img src={p.image2} alt="profile" className='w-full h-[348px]' />
                    </div>

                    <SocialInteractionBar likes={125} comments={25} shares={2} views={true} events={true} />
                </div>
            ))}
        </div>
    );
}

function FollowingTemplate() {
    const [expandedItems, setExpandedItems] = useState({});

    const toggleExpand = (id) => {
        setExpandedItems(prev => ({
            ...prev,
            [id]: !prev[id] // Toggle only the clicked item's state
        }));
    };

    const profile = [
        {
            id: 1, image: "/images/profile.png", name: "John Smith",
            description: "Ux Mentor, Google certified Ux designer", days: "8d", timeIcon: <Clock />,
            disc2: "🔍If you always stay in your comfort zone, how will you know what you're capable of?...",
            image2: "/images/profile-img3.png"
        },
        {
            id: 2, image: "/images/profile.png", name: "John Smith",
            description: "Ceo texile rebound, Strategic Business man", days: "12hrs", timeIcon: <Clock />,
            disc2: "🔍 Why Do So Many Finance Apps Look the Same? Ever noticed how most fintech apps follow the same blue-and-white theme...",
            image2: "/images/profile-img4.png"
        }
    ];

    return (
        <div>
            {profile.map(p => (
                <div key={p.id} className='border border-gray-300 rounded-lg p-4 my-5'>
                    <div className='flex gap-3 mb-2 items-center'>
                        <img src={p.image} alt="profile" className='w-12 h-12 rounded-full' />
                        <div className='flex flex-col justify-center'>
                            <h3 className='font-semibold text-sm'>{p.name}</h3>
                            <p className='font-light text-sm'>{p.description}</p>
                            <div className='flex items-center gap-1'>
                                <p>{p.days}</p>
                                <p>{p.timeIcon}</p>
                            </div>
                        </div>
                        <button className='text-[#5DA05D] flex justify-center border border-[#5DA05D] ml-auto px-3 py-1 rounded-lg text-xs'>
                            <Plus className='w-4 h-4' /> Follow
                        </button>
                    </div>

                    <p className='mb-3'>{p.disc2}</p>
                    <button
                        onClick={() => toggleExpand(p.id)}
                        className="text-[#5DA05D] hover:text-blue-700 ml-1 text-sm font-medium inline-flex items-center"
                    >
                        {expandedItems[p.id] ? (
                            <>
                                <span className='text-[#5DA05D]'>Hide</span>
                                <ChevronUp className="h-3 w-3 ml-0.5" />
                            </>
                        ) : (
                            <>
                                <span className='text-[#5DA05D]'>More</span>
                                <ChevronDown className="h-3 w-3 ml-0.5" />
                            </>
                        )}
                    </button>

                    {expandedItems[p.id] && (
                        <div className="mt-2">
                            <ul className="list-disc ml-5 text-sm">
                                <li>Collaborated with cross-functional teams to deliver high-quality software solutions.</li>
                                <li>Implemented responsive design principles to ensure optimal user experience.</li>
                                <li>Participated in code reviews and provided constructive feedback.</li>
                                <li>Utilized agile methodologies to manage workflows efficiently.</li>
                            </ul>
                        </div>
                    )}

                    <div>
                        <img src={p.image2} alt="profile" className='w-full h-[348px]' />
                    </div>

                    <SocialInteractionBar likes={125} comments={25} shares={2} views={true} events={true} />
                </div>
            ))}
        </div>
    );
    // return (
    //     <div className="space-y-4">
    //         <h2 className="text-xl font-semibold">Following</h2>
    //         <div className="space-y-4">
    //             {[1, 2, 3].map((item) => (
    //                 <div key={item} className="border rounded-lg p-4 shadow-sm flex gap-4">
    //                     <div className="w-12 h-12 rounded-full bg-gray-200 flex-shrink-0"></div>
    //                     <div>
    //                         <div className="flex items-center gap-2">
    //                             <p className="font-medium">Following User</p>
    //                             <span className="text-xs bg-blue-100 text-blue-800 px-2 py-0.5 rounded-full">Following</span>
    //                         </div>
    //                         <p className="text-sm text-gray-700 mt-2">
    //                             This is a different template for posts from people you follow. It has a different layout compared to the
    //                             All tab.
    //                         </p>
    //                         <div className="flex gap-3 mt-3">
    //                             <button className="text-xs text-gray-500 flex items-center gap-1">
    //                                 <span>❤️</span> Like
    //                             </button>
    //                             <button className="text-xs text-gray-500 flex items-center gap-1">
    //                                 <span>💬</span> Comment
    //                             </button>
    //                         </div>
    //                     </div>
    //                 </div>
    //             ))}
    //         </div>
    //     </div>
    // )
}

function MentorsTemplate() {
    const [expandedItems, setExpandedItems] = useState({});

    const toggleExpand = (id) => {
        setExpandedItems(prev => ({
            ...prev,
            [id]: !prev[id] // Toggle only the clicked item's state
        }));
    };

    const profile = [
        {
            id: 1, image: "/images/profile.png", name: "John Smith",
            description: "Ux Mentor, Google certified Ux designer", days: "8d", timeIcon: <Clock />,
            disc2: "🔍If you always stay in your comfort zone, how will you know what you're capable of?...",
            image2: "/images/profile-img5.png"
        },
        {
            id: 2, image: "/images/profile.png", name: "John Smith",
            description: "Ceo texile rebound, Strategic Business man", days: "12hrs", timeIcon: <Clock />,
            disc2: "🔍 Why Do So Many Finance Apps Look the Same? Ever noticed how most fintech apps follow the same blue-and-white theme...",
            image2: "/images/profile-img1.png"
        }
    ];

    return (
        <div>
            {profile.map(p => (
                <div key={p.id} className='border border-gray-300 rounded-lg p-4 my-5'>
                    <div className='flex gap-3 mb-2 items-center'>
                        <img src={p.image} alt="profile" className='w-12 h-12 rounded-full' />
                        <div className='flex flex-col justify-center'>
                            <h3 className='font-semibold text-sm'>{p.name}</h3>
                            <p className='font-light text-sm'>{p.description}</p>
                            <div className='flex items-center gap-1'>
                                <p>{p.days}</p>
                                <p>{p.timeIcon}</p>
                            </div>
                        </div>
                        <button className='text-[#5DA05D] flex justify-center border border-[#5DA05D] ml-auto px-3 py-1 rounded-lg text-xs'>
                            <Plus className='w-4 h-4' /> Follow
                        </button>
                    </div>

                    <p className='mb-3'>{p.disc2}</p>
                    <button
                        onClick={() => toggleExpand(p.id)}
                        className="text-[#5DA05D] hover:text-blue-700 ml-1 text-sm font-medium inline-flex items-center"
                    >
                        {expandedItems[p.id] ? (
                            <>
                                <span className='text-[#5DA05D]'>Hide</span>
                                <ChevronUp className="h-3 w-3 ml-0.5" />
                            </>
                        ) : (
                            <>
                                <span className='text-[#5DA05D]'>More</span>
                                <ChevronDown className="h-3 w-3 ml-0.5" />
                            </>
                        )}
                    </button>

                    {expandedItems[p.id] && (
                        <div className="mt-2">
                            <ul className="list-disc ml-5 text-sm">
                                <li>Collaborated with cross-functional teams to deliver high-quality software solutions.</li>
                                <li>Implemented responsive design principles to ensure optimal user experience.</li>
                                <li>Participated in code reviews and provided constructive feedback.</li>
                                <li>Utilized agile methodologies to manage workflows efficiently.</li>
                            </ul>
                        </div>
                    )}

                    <div>
                        <img src={p.image2} alt="profile" className='w-full h-[348px]' />
                    </div>

                    <SocialInteractionBar likes={125} comments={25} shares={2} views={true} events={true} />
                </div>
            ))}
        </div>
    );
    // return (
    //     <div className="space-y-4">
    //         <h2 className="text-xl font-semibold">Mentors</h2>
    //         <div className="grid gap-6 md:grid-cols-2">
    //             {[1, 2, 3, 4].map((item) => (
    //                 <div key={item} className="border rounded-lg p-5 shadow-sm bg-gray-50">
    //                     <div className="flex justify-between items-start">
    //                         <div className="flex gap-3">
    //                             <div className="w-16 h-16 rounded-full bg-gray-200"></div>
    //                             <div>
    //                                 <p className="font-semibold">Mentor Name</p>
    //                                 <p className="text-xs text-gray-500">Expert in React & Next.js</p>
    //                                 <div className="flex items-center gap-1 mt-1">
    //                                     <span className="text-yellow-500">★★★★★</span>
    //                                     <span className="text-xs text-gray-500">5.0</span>
    //                                 </div>
    //                             </div>
    //                         </div>
    //                         <button className="bg-[#5DA05D] text-white px-3 py-1 rounded-md text-xs">Connect</button>
    //                     </div>
    //                     <p className="text-sm mt-3">
    //                         Specialized mentor profile with different layout and information compared to other tabs.
    //                     </p>
    //                     <div className="mt-3 flex flex-wrap gap-2">
    //                         <span className="text-xs bg-gray-200 px-2 py-1 rounded-full">React</span>
    //                         <span className="text-xs bg-gray-200 px-2 py-1 rounded-full">Next.js</span>
    //                         <span className="text-xs bg-gray-200 px-2 py-1 rounded-full">TypeScript</span>
    //                     </div>
    //                 </div>
    //             ))}
    //         </div>
    //     </div>
    // )
}
