import React, { useContext } from 'react'
import { Booked, Bookmark, Bulb, Library, Mentorship, Newsletter, Recomended, Setting, Video } from '../../../icons/icon'
import { Link } from 'react-router-dom'
import { UserContext } from '../../../context/UserContext'
import { ArrowRight, GraduationCap, TrendingUp } from 'lucide-react'

const Profile = () => {
    const { user, loading, error, } = useContext(UserContext)
    if (error) {
        return <div className='flex items-center justify-center h-screen'>Error: {error}</div>
    }
    const mentors = [
        { id: 1, image: '/images/profile2.png', name: 'Jerome Bell' },
        { id: 2, image: '/images/profile2.png', name: 'Kristin Watson', dot: <div className='w-2 h-2 bg-red-500 rounded-full'></div> },
        { id: 3, image: '/images/profile2.png', name: 'Robert Fox' },
        { id: 4, image: '/images/profile2.png', name: 'Darlene Robertson' },
        { id: 5, image: '/images/profile2.png', name: 'Eleanor Pena', dot: <div className='w-2 h-2 bg-red-500 rounded-full'></div> },
        { id: 6, image: '/images/profile2.png', name: 'Devon Lane' },
    ]
    const data = [
        { id: 3, icon: <Link to={'/booked'}><Booked /></Link>, name: <Link to={'/booked'} >Booked Sessions</Link> },
    ]
    const category = [
        { id: 1, cat: 'Technology', num: 48 },
        { id: 2, cat: 'Marketing', num: 11 },
        { id: 3, cat: 'Design', num: 1 },
        { id: 4, cat: 'Leadership', num: 43 },
        { id: 6, cat: 'Entrepreneurship', num: 12 },
    ]
    const trend = [
        { id: 1, type: 'RemoteWork', post: '15.2' },
        { id: 2, type: 'TechCareers', post: '8.7' },
        { id: 3, type: 'AISkills', post: '6.3' },
    ]
    return (
        <div>
            {
                user.user_type === "learner" ? (
                    <div className=''>
                        <div className='md:border border-gray rounded-lg hidden md:block'>
                            <Link to={'/profilepage'} className='md:border border-[#5DA05D] bg-[#FBFFFB] rounded-lg flex flex-col relative'>
                                <div className='flex items-center gap-3 min-h-32 mx-2 '>
                                    <div className='mr-2'>
                                        <img src={user.profile_photo} alt="profile picture"
                                            className='h-12 w-12 rounded-full' />
                                    </div>
                                    <div className='flex flex-col'>
                                        <h1 className='font-bold text-xl '>{user.first_name} {user.last_name}</h1>
                                        <p className='text-sm text-gray-400'>{user?.qualification}</p>
                                    </div>
                                    {/* <Link to={'/profilepage'} className='text-[#5DA05D] w-[90%] border border-[#5DA05D] font-semibold rounded-lg py-2 px-2  text-center'>View full profile</Link> */}
                                </div>
                            </Link>
                        </div>
                        <div className='border border-gray rounded-lg my-5'>
                            <div className='flex flex-col gap-4 p-3'>
                                {data.map(item => (
                                    <div key={item.id} className='flex items-center justify-between gap-4'>
                                        <div className='flex items-center gap-5'>
                                            <div className='w-3 h-3 mt-[-10px]'>{item.icon}</div>
                                            <div>
                                                <h3 className='text-sm md:text-lg'>{item.name}</h3>
                                            </div>
                                        </div>
                                        <Link to={'/booked'}><ArrowRight className='text-[#5DA05D]' /></Link>
                                    </div>
                                ))}
                            </div>
                        </div>
                        {/* <div className='border border-gray rounded-lg my-5'>
                            <h1 className='p-3 font-bold'>Top Categories</h1>
                            <div className='flex flex-col gap-4 p-3'>
                                {category.map(item => (
                                    <div key={item.id} className='flex items-center gap-4'>
                                        <div className='flex justify-between w-full flex-wrap'>
                                            <h3 className='text-sm md:text-lg'>{item.cat}</h3>
                                            <p className='text-xs md:text-sm'>({item.num})</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className='border border-gray rounded-lg my-5 p-4'>
                            <h1 className='p-3 font-semibold'>Mentors to follow</h1>
                            <div className='flex flex-col gap-4'>
                                {mentors.map(item => (
                                    <div key={item.id} className='flex items-center gap-4 flex-wrap'>
                                        <img src={item.image} alt={item.name} className='w-5 md:w-8 h-5 md:h-8 rounded-full' />
                                        <div>
                                            <h3 className='text-sm md:text-lg'>{item.name}</h3>
                                        </div>
                                        <div className='ml-auto'>{item.dot}</div>
                                    </div>
                                ))}
                            </div>
                            <div className='border border-[#5DA05D] w-full items-center rounded-lg p-2 mt-3'>
                                <Link to={'/mentorship'} className='text-[#5DA05D] hover:text-[#5DA05D] flex gap-2 items-center justify-center font-medium text-sm'>
                                    <span>See more...</span>
                                </Link>
                            </div>

                        </div> */}

                    </div>
                ) : (
                    <div className='hidden md:block'>
                        <Link to={'/profilepage'} className='md:border border-[#B573F6] bg-[#F5EAFF8F] rounded-lg flex flex-col relative'>
                            <div className='flex ml-auto mr-4 mt-2'><GraduationCap className='bg-green-100' /></div>
                            <div className='flex items-center gap-3 min-h-24 mx-2 '>
                                <div className='mr-2'>
                                    <img src={user.profile_photo} alt="profile picture"
                                        className='h-12 w-12 rounded-full' />
                                </div>
                                <div className='flex flex-col'>
                                    <h1 className='font-bold text-xl '>{user.first_name} {user.last_name}</h1>
                                    <p className='text-sm text-gray-400'>{user?.qualification}</p>
                                </div>
                                {/* <Link to={'/profilepage'} className='text-[#5DA05D] w-[90%] border border-[#5DA05D] font-semibold rounded-lg py-2 px-2  text-center'>View full profile</Link> */}
                            </div>
                        </Link>
                        {/* <div className='border border-gray rounded-lg my-5 p-5'>
                            <h1 className='p-3 font-semibold text-2xl'>My Mentees</h1>
                            <div className='flex flex-col gap-4 mb-5'>
                                {mentors.map(item => (
                                    <div key={item.id} className='flex items-center gap-4 flex-wrap'>
                                        <img src={item.image} alt={item.name} className='w-5 md:w-8 h-5 md:h-8 rounded-full' />
                                        <div>
                                            <h3 className='text-sm md:text-lg'>{item.name}</h3>
                                        </div>
                                        <div className='ml-auto'>{item.dot}</div>
                                    </div>
                                ))}
                            </div>

                            <Link to={'#'} className='text-[#5DA05D] hover:text-[#5DA05D] flex gap-2 items-center justify-center border border-[#5DA05D] rounded-lg p-2 font-medium text-sm'>
                                <span>See more...</span>
                            </Link>
                        </div> */}
                    </div>
                )
            }
        </div>
    )
}

export default Profile