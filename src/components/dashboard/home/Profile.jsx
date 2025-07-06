import React, { useContext } from 'react'
import { Bookmark, Bulb, Library, Newsletter, Setting, Video } from '../../../icons/icon'
import { Link } from 'react-router-dom'
import { UserContext } from '../../../context/UserContext'

const Profile = () => {
    const { user, loading, error, logout } = useContext(UserContext)
    if (loading) {
        return <div className='flex items-center justify-center h-screen'>Loading...</div>
    }
    if (error) {
        return <div className='flex items-center justify-center h-screen'>Error: {error}</div>
    }
    if (!user.first_name) {
        return <div className='flex items-center justify-center h-screen'>No user found</div>
    }

    const data = [
        { id: 1, icon: <a href='#'><Video /></a>, name: 'Learning' },
        { id: 2, icon: <a href='#'><Bulb /></a>, name: 'Insights' },
        { id: 3, icon: <a href='/saved'><Bookmark /></a>, name: <a href='/saved'>Saved</a> },
        { id: 4, icon: <a href='#'><Library /></a>, name: 'Library' },
        { id: 5, icon: <a href='#'><Newsletter /></a>, name: 'Newsletter' },
        { id: 6, icon: <a href='#'><Setting /></a>, name: 'Settings' },
    ]
    return (
        <div className='hidden md:block'>
            <Link to={'/profilepage'} className='border border-[#5DA05D] bg-[#FBFFFB] rounded-lg flex flex-col relative'>
                <div className='flex items-center justify-between min-h-32 mx-2 '>
                    {/* <img src={user.cover_photo} alt="background profile" className='w-full h-[90px] mx-auto' /> */}
                    <div className='mr-2'>
                        <img src={user.profile_photo} alt="profile picture"
                            className='h-12 w-12 rounded-full' />
                    </div>
                    <div className='flex flex-col'>
                        <h1 className='font-bold text-xl '>{user.first_name} {user.last_name}</h1>
                        {/* <p className='text-sm'>{user?.bio?.slice(0, 60)}</p> */}
                        <p className='text-sm text-gray-400'>{user?.qualification}</p>
                    </div>
                    {/* <Link to={'/profilepage'} className='text-[#5DA05D] w-[90%] border border-[#5DA05D] font-semibold rounded-lg py-2 px-2  text-center'>View full profile</Link> */}
                </div>
            </Link>
            <div className='border border-gray rounded-lg my-5'>
                <h1 className='p-3 font-semibold'>Activity</h1>
                <div className='flex flex-col gap-4 p-3'>
                    {data.map(item => (
                        <div key={item.id} className='flex items-center gap-4'>
                            <div>{item.icon}</div>
                            <div>
                                <h3 className='text-lg'>{item.name}</h3>
                            </div>
                        </div>
                    ))}
                </div>
                {/* <a href='#' className='text-[#5DA05D] p-3'>See more...</a> */}
            </div>
        </div>
    )
}

export default Profile