import React, { useContext, useEffect, useState } from 'react'
import { Message } from '../../../icons/icon';
import FloatingMessageIcon from '../chat/FloatingMessage';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { NetworkService } from '../../../api/NetworkService';
import { PostService } from '../../../api/PostService';
import { toast } from 'react-toastify';
import { JobServices } from '../../../api/JobServices';
import { UserContext } from '../../../context/UserContext';
import { MentorServices } from "../../../api/MentorServices"

const EventsHome = () => {
    const [whoToFollow, setWhoToFollow] = useState([]);
    const [recommended, setRecommended] = useState([]);
    const [otherMentors, setOtherMentors] = useState([]);
    const { user, userwithid } = useContext(UserContext)

    const getWhoToFollow = async () => {
        try {
            const { data } = await NetworkService.recommendtofollow();
            const isArray = Array.isArray(data?.results) ? data.results : [];
            const withFollowState = isArray.map((mentor) => ({
                ...mentor,
                following: false, // Add `following: false` to each mentor
            }));
            setWhoToFollow(withFollowState);
        } catch (error) {
            console.error("Error fetching who to follow:", error);
        }
    }

    const recommendedJobs = async () => {
        try {
            const { data } = await JobServices.GetUsersJobs();
            const isArray = Array.isArray(data?.results) ? data.results : [];
            setRecommended(isArray);
        } catch (error) {
            console.error("Error fetching recommended jobs:", error);
        }
    }

    const getOtherMentors = async () => {
        try {
            const { data } = await MentorServices.recommendedmentors();
            const isArray = Array.isArray(data?.results) ? data.results : [];
            const withFollowState = isArray.map((mentor) => ({
                ...mentor,
                following: false, // Add `following: false` to each mentor
            }));
            setOtherMentors(withFollowState);
        } catch (error) {
            console.error("Error fetching other mentors:", error);
        }
    }

    useEffect(() => {
        getWhoToFollow();
        recommendedJobs();
        getOtherMentors();
    }, []);

    const handleFollow = async (userId, type = "whoToFollow") => {
        try {
            if (type === "whoToFollow") {
                setWhoToFollow((prev) =>
                    prev.map((mentor) =>
                        mentor.id === userId ? { ...mentor, following: true } : mentor
                    )
                );
            } else if (type === "otherMentors") {
                setOtherMentors((prev) =>
                    prev.map((mentor) =>
                        mentor.id === userId ? { ...mentor, following: true } : mentor
                    )
                );
            }

            await PostService.Follow({ user_following: userId });
            toast.success("You are now following this user");
        } catch (err) {
            console.error(err);
            if (type === "whoToFollow") {
                setWhoToFollow((prev) =>
                    prev.map((mentor) =>
                        mentor.id === userId ? { ...mentor, following: false } : mentor
                    )
                );
            } else if (type === "otherMentors") {
                setOtherMentors((prev) =>
                    prev.map((mentor) =>
                        mentor.id === userId ? { ...mentor, following: false } : mentor
                    )
                );
            }
        }
    };
//const profileLinkPrefix = user.user_type === "learner" ? "person-profile" : "coporate";
    return (
        <div>
            <div className='hidden md:block'>
                    <div className='border border-gray rounded-lg mb-5 pb-2 flex flex-col px-3'>
                        <h1 className='py-3 font-semibold'>WHO TO FOLLOW</h1>
                        {whoToFollow.length === 0 ? (
                            <div className='flex justify-center items-center h-20'>
                                <p className='text-gray-500'>No recommendations available</p>
                            </div>
                        ) : (
                            <>
                                {whoToFollow.slice(0, 3).map(item => (
                                    <div key={item.id} className='grid grid-cols-12 mb-4'>
                                        <Link to={
                                            user.user_type === 'learner'?`/person-profile/${item.id}`:
                                            user.user_type==='mentor'?`/mentordetails/${item.id}`:
                                            `/coporate/${item.id}`} className='lg:col-span-3 md:col-span-12'>
                                            <img src={item.profile_photo} alt={item.name} className='w-10 h-10 rounded-full mb-2' />
                                        </Link>
                                        <div className='lg:col-span-6 md:col-span-12 mb-2'>
                                            <h3 className='font-bold'>{item.name}</h3>
                                            <p className='text-xs font-thin'>{item.qualification}</p>
                                            <p className='text-xs font-thin'>{item.followers} Followers</p>
                                        </div>
                                        <div className='lg:col-span-3 md:col-span-12'>
                                            <button
                                                onClick={() => handleFollow(item.id, "whoToFollow")}
                                                disabled={item.following}
                                                className={`w-full border py-1 ${item.following
                                                    ? "bg-green-50 text-gray-400 cursor-not-allowed border-gray-300"
                                                    : "border-[#5DA05D] text-[#5DA05D] hover:bg-green-50"
                                                    } rounded-lg transition-colors duration-200 font-medium text-xs`}
                                            >
                                                {item.following ? "Following" : "Follow"}
                                            </button>
                                        </div>
                                    </div>
                                ))}
                                <Link to={'/industry'} className='text-[#5DA05D] text-center p-1 border border-[#5DA05D] w-full rounded-lg'>See more...</Link>
                            </>
                        )}
                    </div>
                    {/* <div className='border border-gray-300 rounded-lg p-2 my-2 flex flex-col'>
                        <h1 className='py-3 font-semibold'>Recommended Jobs</h1>
                        {recommended.length === 0 ? (
                            <div className='flex justify-center items-center h-20'>
                                <p className='text-gray-500'>No recommended jobs available</p>
                            </div>
                        ) : (
                            <div >
                                {recommended.slice(0, 2).map(item => (
                                    <div key={item.id} className='p-2'>
                                        <h3 className='text-xs font-semibold mb-2'>{item.title.toUpperCase()}</h3>
                                        <p className='text-xs font-semibold mb-1'>{item.organization}</p>
                                        <p className='text-xs'>{item.experience_level}</p>
                                        <p className='text-xs mb-1'>Matching Skills:3/4</p>
                                    </div>
                                ))}

                            </div>
                        )}
                        <Link to='/jobs' className='text-[#5DA05D] justify-center text-center px-5 py-1 border border-[#5DA05D] w-full rounded-lg'>See more...</Link>
                    </div> */}

                </div>

            {/* mentor */}

            <div>
                <div>
                    <FloatingMessageIcon />
                </div>
                {/* <div>
                    <PremiumWrapper />
                </div> */}
            </div>
        </div>
    )
}

export default EventsHome

export const Premium = ({ onOpen }) => {
    return (
        <div className="inset-0 flex items-center justify-center z-50 mb-2">
            <div className="relative bg-gradient-to-r from-[#5DA05D] to-[#5DA05D] text-white px-4 py-2 rounded-lg shadow-lg max-w-3xl w-full overflow-hidden">
                {/* <div className='bg-[#5DA05D] rounded-lg px-4 py-2 flex flex-col gap-2' > */}
                <div className="absolute w-72 h-14 bg-gradient-to-tl from-white/5 via-white/40 to-transparent rounded-full -rotate-45 bottom-6 top-6 right-0 pointer-events-none transform origin-bottom"></div>

                <div className='relative z-10'>
                    <div className='text-white flex items-center justify-between '>
                        <h2>PREMIUM</h2>
                        <button
                            onClick={onOpen}
                            className="ml-auto text-white hover:text-gray-300"
                        >
                            <ArrowUpRight />
                        </button>
                    </div>
                    <p className='text-white text-sm'>
                        Unlock Exclusive Access - Subscribe to Premium Now!
                    </p>
                </div>
            </div>
        </div>
    )
}

const Premium2 = ({ onOpen }) => {
    return (
        <div className="inset-0 flex items-center justify-center z-50 mb-2">
            <div className="relative">
                <img
                    src="/images/premiumImg.png"
                    alt="Premium"
                    className="w-full h-auto"
                />
                <div className="absolute inset-0 flex flex-col p-3">
                    <div className="text-white flex items-center justify-between">
                        <h2>PREMIUM</h2>
                        {/* Trigger modal here */}
                        <button
                            onClick={onOpen}
                            className="ml-auto text-white hover:text-gray-300"
                        >
                            <ArrowUpRight />
                        </button>
                    </div>
                    <p className="text-white text-sm">
                        Unlock Exclusive Access - Subscribe to Premium Now!
                    </p>
                </div>
            </div>
        </div>
    );
};

function PremiumModal({ open, onClose }) {
    if (!open) return null;

    return (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl shadow-lg w-[90%] max-w-md p-6 relative">
                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-6 h-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>

                {/* Title */}
                <h2 className="text-xl font-semibold mb-2">Premium Benefits</h2>

                {/* Price */}
                <p className="text-3xl font-bold text-[#5DA05D]">
                    $300<span className="text-gray-500 text-lg font-normal">/year</span>
                </p>

                {/* Benefits List */}
                <ul className="mt-6 space-y-3">
                    {[
                        "Access to exclusive content and training",
                        "Enhanced profile visibility",
                        "Priority support",
                        "Unlimited networking opportunities",
                    ].map((benefit, idx) => (
                        <li key={idx} className="flex items-center text-gray-700">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="w-5 h-5 text-[#5DA05D] mr-2"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                            </svg>
                            {benefit}
                        </li>
                    ))}
                </ul>

                {/* Button */}
                <button
                    className="w-full mt-6 bg-[#5DA05D] hover:bg-[#4CAF50] text-white py-3 rounded-lg font-medium"
                    onClick={() => alert("Get Started clicked!")}
                >
                    Get Started
                </button>
            </div>
        </div>
    );
}

function PremiumWrapper() {
    const [open, setOpen] = useState(false);

    return (
        <>
            <Premium onOpen={() => setOpen(true)} />
            <PremiumModal open={open} onClose={() => setOpen(false)} />
        </>
    );
}

// {user.user_type === "learner" ? (
//                 <div className='hidden md:block'>
//                     <div className='border border-gray rounded-lg mb-5 pb-2 flex flex-col px-3'>
//                         <h1 className='py-3 font-semibold'>WHO TO FOLLOW</h1>
//                         {whoToFollow.length === 0 ? (
//                             <div className='flex justify-center items-center h-20'>
//                                 <p className='text-gray-500'>No recommendations available</p>
//                             </div>
//                         ) : (
//                             <>
//                                 {whoToFollow.slice(0, 3).map(item => (
//                                     <div key={item.id} className='grid grid-cols-12 mb-4'>
//                                         <Link to={`/person-profile/${item.id}`} className='lg:col-span-3 md:col-span-12'>
//                                             <img src={item.profile_photo} alt={item.name} className='w-10 h-10 rounded-full mb-2' />
//                                         </Link>
//                                         <div className='lg:col-span-6 md:col-span-12 mb-2'>
//                                             <h3 className='font-bold'>{item.name}</h3>
//                                             <p className='text-xs font-thin'>{item.qualification}</p>
//                                             <p className='text-xs font-thin'>{item.followers} Followers</p>
//                                         </div>
//                                         <div className='lg:col-span-3 md:col-span-12'>
//                                             <button
//                                                 onClick={() => handleFollow(item.id, "whoToFollow")}
//                                                 disabled={item.following}
//                                                 className={`w-full border py-1 ${item.following
//                                                     ? "bg-green-50 text-gray-400 cursor-not-allowed border-gray-300"
//                                                     : "border-[#5DA05D] text-[#5DA05D] hover:bg-green-50"
//                                                     } rounded-lg transition-colors duration-200 font-medium text-xs`}
//                                             >
//                                                 {item.following ? "Following" : "Follow"}
//                                             </button>
//                                         </div>
//                                     </div>
//                                 ))}
//                                 <Link to={'/industry'} className='text-[#5DA05D] text-center p-1 border border-[#5DA05D] w-full rounded-lg'>See more...</Link>
//                             </>
//                         )}
//                     </div>
//                     {/* <div className='border border-gray-300 rounded-lg p-2 my-2 flex flex-col'>
//                         <h1 className='py-3 font-semibold'>Recommended Jobs</h1>
//                         {recommended.length === 0 ? (
//                             <div className='flex justify-center items-center h-20'>
//                                 <p className='text-gray-500'>No recommended jobs available</p>
//                             </div>
//                         ) : (
//                             <div >
//                                 {recommended.slice(0, 2).map(item => (
//                                     <div key={item.id} className='p-2'>
//                                         <h3 className='text-xs font-semibold mb-2'>{item.title.toUpperCase()}</h3>
//                                         <p className='text-xs font-semibold mb-1'>{item.organization}</p>
//                                         <p className='text-xs'>{item.experience_level}</p>
//                                         <p className='text-xs mb-1'>Matching Skills:3/4</p>
//                                     </div>
//                                 ))}

//                             </div>
//                         )}
//                         <Link to='/jobs' className='text-[#5DA05D] justify-center text-center px-5 py-1 border border-[#5DA05D] w-full rounded-lg'>See more...</Link>
//                     </div> */}

//                 </div>
//             ) :user.user_type === "mentor" ? (
//                 // <>
//                 //     <div className=' hidden md:block border border-gray-300 rounded-lg p-2 mb-5 flex-col'>
//                 //         <h1 className='mb-2 text-lg font-bold text-center'>Other Mentors</h1>
//                 //         {otherMentors.length === 0 ? (
//                 //             <div className='flex justify-center items-center h-20'>
//                 //                 <p className='text-gray-500'>No mentor recommendations available</p>
//                 //             </div>
//                 //         ) : (
//                 //             <div>
//                 //                 {otherMentors.slice(0, 3).map(item => (
//                 //                     <div className='grid grid-cols-12 mb-4' key={item.id}>
//                 //                         <Link to={`/mentordetails/${item.id}`} className='md:col-span-12 lg:col-span-3'>
//                 //                             <img src={item.profile_photo} alt={item.first_name} className='w-10 h-10 rounded-full mb-2' />
//                 //                         </Link>
//                 //                         <div className='md:col-span-12 lg:col-span-6 mb-2'>
//                 //                             <h3 className='font-semibold'>{item.first_name} {item.last_name}</h3>
//                 //                             <p className='text-xs font-thin'>{item.current_job}</p>
//                 //                             {/* <p className='text-xs font-thin'>{item.followers} Followers</p> */}
//                 //                         </div>
//                 //                 {/* <button
//                 //                                 onClick={() => handleFollow(item.id)}
//                 //                                 disabled={item.following}
//                 //                                 className={`w-full border py-1 ${item.following
//                 //                                     ? "bg-green-50 text-gray-400 cursor-not-allowed border-gray-300"
//                 //                                     : "border-[#5DA05D] text-[#5DA05D] hover:bg-green-50"
//                 //                                     } rounded-lg transition-colors duration-200 font-medium text-xs`}
//                 //                             >
//                 //                                 {item.following ? "Following" : "Follow"}
//                 //                             </button> */}
//                 //                         {/* <div className='md:col-span-12 lg:col-span-3'>
                                            
//                 //                             <button
//                 //                                 onClick={() => handleFollow(item.id, "otherMentors")}
//                 //                                 disabled={item.following}
//                 //                                 className={`w-full border py-1 ${item.following
//                 //                                     ? "bg-green-50 text-gray-400 cursor-not-allowed border-gray-300"
//                 //                                     : "border-[#5DA05D] text-[#5DA05D] hover:bg-green-50"
//                 //                                     } rounded-lg transition-colors duration-200 font-medium text-xs`}
//                 //                             >
//                 //                                 {item.following ? "Following" : "Follow"}
//                 //                             </button>
//                 //                         </div> */}
//                 //                     </div>
//                 //                 ))}
//                 //                 {/* <div className="flex">
//                 //                     <Link to={'/mentorship'} className='text-[#5DA05D] text-center p-1 border border-[#5DA05D] w-full rounded-lg'>See more</Link>
//                 //                 </div> */}
//                 //             </div>
//                 //         )}
//                 //     </div>
//                 // </>
//             )}