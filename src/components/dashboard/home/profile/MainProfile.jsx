import React, { useContext, useState } from 'react'
import {Edit} from '../../../../icons/icon'
//import SocialMediaToolbar from '../LiveStream'
import ProfileTabs from './ProfileTab'
import { Button } from '@chakra-ui/react'
import ReusableModal from './ModalDesign'
import { BriefcaseBusiness, GraduationCap, MapPin, Camera, Video } from 'lucide-react'
import { EditComponent } from './AllModal'
import { Link } from 'react-router-dom'
import { UserContext } from '../../../../context/UserContext'

const MainProfile = () => {
    const [openModal, setOpenModal] = useState(false);
    const [isHovered, setIsHovered] = useState(false)
    const [hovered, setHovered] = useState(false)
    // get the user data from the context
    const {user, loading, error} = useContext(UserContext);
    if(loading){
        return <div className='flex items-center justify-center h-screen'>Loading...</div>
    }
    if(error){
        return <div className='flex items-center justify-center h-screen'>Error: {error}</div>
    }
    if(!user.name){
        return <div className='flex items-center justify-center h-screen'>No user found</div>
    }

    function ProfilePicture() {
        return (
            <div className="flex items-center justify-center">
                <div
                    className="relative w-full h-48"
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                >
                    <img src="/images/bg-profile.png" alt="cover photo" className='w-full md:h-48 ' />
                    {/* Edit overlay - only visible on hover */}
                    {isHovered && (
                        <div onClick={() => setOpenModal(true)}  className="absolute inset-0 bg-black/70 flex flex-col items-center justify-center transition-opacity duration-200 rounded-tl-lg rounded-tr-lg">
                            <Camera className="text-white w-10 h-10" />
                            <span className="text-white text-xl mt-2">Edit</span>
                        </div>
                    )}
                </div>
            </div>
        )
    }

    return (
        <div>
           
            <div className='bg-white  p-1 border border-gray-300 rounded-lg'>
                
                <div className='relative'>
                    <ProfilePicture />
                </div>
                
                <div className='flex justify-between'>
                    <div className='relative w-32 h-auto'
                        onMouseEnter={() => setHovered(true)}
                        onMouseLeave={() => setHovered(false)}
                    >
                        {/* <img src={profile.profile_photo} alt="profile picture" */}
                        <img src="/images/profile.png" alt="profile picture"
                            className='rounded-full w-32 h-auto mt-[-3.7rem] ml-3' />
                        {hovered && (
                            <div className="absolute inset-0 rounded-full w-32 h-auto mt-[-3.7rem] ml-3 bg-black/70 flex flex-col items-center justify-center transition-opacity duration-200">
                                <Camera className="text-white w-8 h-8" />
                                <span className="text-white text-xl mt-1">Edit</span>
                            </div>
                        )}
                    </div>
                    {/* modal here */}
                    <EditComponent ModalComponent={ReusableModal} isOpen={openModal} onClose={() => setOpenModal(false)} />
                    <Button onClick={() => setOpenModal(true)} className='rounded-lg border border-[#5DA05D] md:px-4 px-2 mt-2 flex items-center gap-1 md:h-10 h-7'>
                        <Edit className='text-[#5DA05D] h-4 w-4' /> <p className='text-[#5DA05D] md:text-sm text-xs'>Edit Profile</p>
                    </Button>
                </div>
                <hr className='my-3' />
                <div className='mt-6 flex items-center gap-32'>
                    <div>
                        <h1 className='text-xl font-bold'>
                            {user.name}
                        </h1>
                        <p className='text-xs md:text-sm my-3'>
                            {user.bio}
                        </p>
                        <p className='text-slate-500 font-thin flex items-center gap-2'>
                            <MapPin className='w-4 h-4' />{user.location} <BriefcaseBusiness className='w-4 h-4' /> Software Engineer at TechCorp
                        </p>
                        <p className='text-slate-500 font-thin flex items-center gap-2'>
                            <GraduationCap className='w-4 h-4' /> B.Sc in Computer Science
                        </p>
                        <p className='my-3'>
                            <span className='text-[#5DA05D] mr-2'>500</span> Following
                            <span className='text-[#5DA05D] mx-2'>6,476</span> Followers
                        </p>
                    </div>
                    <div>
                        <img src="/images/video1.png" alt="video stream" />
                    </div>
                </div>
            </div>
            <Link to={'/person-profile'}>Person Profile</Link>
            <ProfileTabs />
        </div>
    )
}
export default MainProfile