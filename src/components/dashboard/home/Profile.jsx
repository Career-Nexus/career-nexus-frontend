import React, { useContext, useState } from 'react'
import { Bookmark, Bulb, Library, Newsletter, Setting, Video } from '../../../icons/icon'
import { Link } from 'react-router-dom'
import { UserContext } from '../../../context/UserContext'
import { GraduationCap, TrendingUp } from 'lucide-react'

const Profile = () => {
    const [activeId, setActiveId] = useState(null);
    const { user, error, } = useContext(UserContext)
    if (error) {
        return <div className='flex items-center justify-center h-screen'>Error: {error}</div>
    }


    const data = [
        { id: 1, icon: <Link to='#'><Video /></Link>, name: <Link to='#'>Learning</Link> },
        { id: 2, icon: <Link to='#'><Bulb /></Link>, name: <Link to='#'>Insights</Link> },
        { id: 3, icon: <Link to='/saved'><Bookmark /></Link>, name: <Link to='/saved'>Saved</Link> },
        { id: 4, icon: <Link to='/library'><Library /></Link>, name: <Link to='/library'>Library</Link> },
        { id: 5, icon: <Link to='/newsletter'><Newsletter /></Link>, name: <Link to='/newsletter'>Newsletter</Link> },
        // { id: 6, icon: <Link to='/settings'><Setting /></Link>, name: <Link to='/settings'>Settings</Link> },
    ]
    const trend = [
        { id: 1, type: 'RemoteWork', post: '15.2' },
        { id: 2, type: 'TechCareers', post: '8.7' },
        { id: 3, type: 'AISkills', post: '6.3' },
    ]
    return (
        <div>
            {user.user_type === "learner" ? (
                <div className='hidden md:block'>
                    <Link to={'/profilepage'} className='border border-[#5DA05D] bg-[#FBFFFB] rounded-lg flex flex-col relative'>
                        <div className='flex items-center justify-between min-h-32 mx-2 '>
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
                    <div className='border border-gray rounded-lg my-5'>
                        <h1 className='p-3 font-semibold'>Activity</h1>
                        <div className='flex flex-col gap-4 p-3'>
                            {data.map(item => {
                                const isActive = activeId === item.id;
                                return (
                                    <div key={item.id}>
                                        <a
                                            href={item.href}
                                            onClick={() => setActiveId(item.id)}
                                            className={`flex items-center gap-2 px-3 py-2 rounded-md transition-colors
                                            ${isActive ? "bg-[#D9FFDB]" : "hover:bg-[#D9FFDB]"}`}
                                        >
                                            {item.icon}
                                            <span className="text-sm font-medium">{item.name}</span>
                                        </a>
                                    </div>
                                )
                            })}
                            
                        </div>
                    </div>
                </div>
            ) : (
                <div className='hidden md:block'>
                    <Link to={'/profilepage'} className='border border-[#B573F6] bg-[#F5EAFF8F] rounded-lg flex flex-col relative'>
                        <div className='flex ml-auto mr-4 mt-2'><GraduationCap className='bg-green-100' /></div>
                        <div className='flex items-center justify-between min-h-24 mx-2 '>
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
                    <div className='border border-gray rounded-lg my-5'>
                        <h1 className='p-3 font-bold text-2xl'>Trending Topics</h1>
                        <div className='flex flex-col gap-4 p-3'>
                            {trend.map(item => (
                                <div key={item.id} className='flex items-center justify-between'>
                                    <div className='font-bold text-lg'>
                                        <div>#{item.type}</div>
                                        <h3 className='text-gray-500'>{item.post}K Posts</h3>
                                    </div>
                                    <div>
                                        <TrendingUp className='text-[#5DA05D]' />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default Profile
