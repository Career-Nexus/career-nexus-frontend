import React, { useContext, useEffect, useState } from 'react'
import { Message } from '../../../icons/icon';
import FloatingMessageIcon from './FloatingMessage';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { NetworkService } from '../../../api/NetworkService';
import { PostService } from '../../../api/PostService';
import { toast } from 'react-toastify';
import { JobServices } from '../../../api/JobServices';
import { UserContext } from '../../../context/UserContext';

const EventsHome = () => {
    const [whoToFollow, setWhoToFollow] = useState([]);
    const [recommended, setRecommended] = useState([]);
    const { user } = useContext(UserContext)

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

    useEffect(() => {
        getWhoToFollow();
        recommendedJobs();
    }, []);

    const handleFollow = async (userId) => {
        try {
            // Optimistically mark as following in local state
            setWhoToFollow((prev) =>
                prev.map((mentor) =>
                    mentor.id === userId ? { ...mentor, following: true } : mentor
                )
            );
            await PostService.Follow({ user_following: userId });
            toast.success("You are now following this user");
        } catch (err) {
            console.error(err);
            // Roll back if failed:
            setWhoToFollow((prev) =>
                prev.map((mentor) =>
                    mentor.id === userId ? { ...mentor, following: false } : mentor
                )
            );
        }
    }
    const otherMentors = [
        {
            id: 1, image: "/images/mentor-cover1.png", name: 'Emily Rodriguez', work: 'Product Designer...', followers: '121,344'
        },
        {
            id: 2, image: "/images/mentor-cover1.png", name: 'David Park', work: 'Marketing Lead ...', followers: '121,344'
        },
        {
            id: 3, image: "/images/mentor-cover1.png", name: 'Eric Moore', work: 'Ux Mentor, Google ...', followers: '121,344'
        }
    ]
    return (
        <div>
            {user.user_type === "learner" ? (
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
                                    <div key={item.id} className='grid grid-cols-12 items-center'>
                                        <div className='col-span-3'>
                                            <img src={item.profile_photo} alt={item.name} className='w-10 h-10 rounded-full mb-2' />
                                        </div>
                                        <div className='col-span-6 mb-2'>
                                            <h3 className='font-bold'>{item.name}</h3>
                                            <p className='text-xs font-thin'>{item.qualification}</p>
                                            <p className='text-xs font-thin'>{item.followers} Followers</p>
                                        </div>
                                        <div className='col-span-3'>
                                            <button
                                                onClick={() => handleFollow(item.id)}
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
                    <div className='border border-gray-300 rounded-lg p-2 my-2 flex flex-col'>
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
                                        {/* <p className='text-xs font-semibold mb-1'>{item.header2}</p>
                        <p className='text-xs'>{item.comp2}</p>
                        <p className='text-xs mb-1'>{item.skip2}</p> */}
                                    </div>
                                ))}

                            </div>
                        )}
                        <Link to='/jobs' className='text-[#5DA05D] justify-center text-center px-5 py-1 border border-[#5DA05D] w-full rounded-lg'>See more...</Link>
                    </div>

                </div>
            ) : (
                <>
                    <div className='border border-gray-300 rounded-lg p-2 my-2 flex flex-col'>
                        <h1 className='mb-2 text-lg font-semibold'>Other Mentors</h1>
                        {otherMentors.map(item => (
                            <div key={item.id} className='grid grid-cols-12 items-center'>
                                <div className='col-span-3'>
                                    <img src={item.image} alt={item.name} className='w-10 h-10 rounded-full mb-2' />
                                </div>
                                <div className='col-span-6 mb-2'>
                                    <h3 className='font-bold'>{item.name}</h3>
                                    <p className='text-xs font-thin'>{item.work}</p>
                                    <p className='text-xs font-thin'>{item.followers} Followers</p>
                                </div>
                                <div className='col-span-3'>
                                    <button

                                        className={`w-full border py-1
                                    "border-[#5DA05D] text-[#5DA05D] hover:bg-green-50"
                                    rounded-lg transition-colors duration-200 font-medium text-xs`}
                                    >
                                        Follow
                                    </button>
                                </div>
                            </div>
                        ))}
                        <Link to={'/industry'} className='text-[#5DA05D] text-center p-1 border border-[#5DA05D] w-full rounded-lg'>See more</Link>
                    </div>
                </>
            )}

            {/* mentor */}

            <div>
                <div>
                    <FloatingMessageIcon />
                </div>
                <div>
                    <Premium />
                </div>
            </div>
        </div>
    )
}

export default EventsHome

export const Premium = () => {
    return (
        <div className="inset-0 flex items-center justify-center z-50 mb-2">
            <div className="relative bg-gradient-to-r from-[#5DA05D] to-[#5DA05D] text-white px-4 py-2 rounded-lg shadow-lg max-w-3xl w-full overflow-hidden">
                {/* <div className='bg-[#5DA05D] rounded-lg px-4 py-2 flex flex-col gap-2' > */}
                <div className="absolute w-72 h-14 bg-gradient-to-tl from-white/5 via-white/40 to-transparent rounded-full -rotate-45 bottom-6 top-6 right-0 pointer-events-none transform origin-bottom"></div>

                <div className='relative z-10'>
                    <div className='text-white flex items-center justify-between '>
                        <h2>PREMIUM</h2>
                        <Link><ArrowUpRight /></Link>
                    </div>
                    <p className='text-white text-sm'>
                        Unlock Exclusive Access - Subscribe to Premium Now!
                    </p>
                </div>
            </div>
        </div>
    )
}