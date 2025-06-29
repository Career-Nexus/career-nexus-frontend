import React, { useContext } from 'react'
import { Bookmark, Bulb, Library, Newsletter, Setting, Video } from '../../../icons/icon'
import { Link } from 'react-router-dom'
import { UserContext } from '../../../context/UserContext'

const Profile = () => {
    const { user, loading, error, logout } = useContext(UserContext)
    // console.log(user)

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
        { id: 3, icon: <a href='#'><Bookmark /></a>, name: 'Bookmarks' },
        { id: 4, icon: <a href='#'><Library /></a>, name: 'Library' },
        { id: 5, icon: <a href='#'><Newsletter /></a>, name: 'Newsletter' },
        { id: 6, icon: <a href='#'><Setting /></a>, name: 'Settings' },
    ]
    return (
        <div className='hidden md:block'>
            <div className='border border-gray rounded-lg flex flex-col relative'>
                <div className='flex items-center flex-col pb-5'>
                    <img src={user.cover_photo} alt="background profile" className='w-full h-[90px] mx-auto' />
                    <Link to={'/profilepage'}>
                        <img src={user.profile_photo} alt="profile picture"
                            className='rounded-full w-16 h-auto md:mt-[-2.4rem]' />
                    </Link>
                    <div className='py-1 flex flex-col gap-3'>
                        <h1 className='font-bold text-2xl '>{user.first_name} {user.last_name}</h1>
                        <p className='text-sm'>{user?.bio?.slice(0, 60)}</p>
                        <p>{user?.industry}</p>
                    </div>
                    <Link to={'/profilepage'} className='text-[#5DA05D] w-[90%] border border-[#5DA05D] font-semibold rounded-lg py-2 px-2  text-center'>View full profile</Link>
                </div>
            </div>
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