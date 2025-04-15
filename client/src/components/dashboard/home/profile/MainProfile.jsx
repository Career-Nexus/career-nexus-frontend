import React, { useState } from 'react'
import { Camera, Clock, Edit, Info, Video, VideoIcon, Videow } from '../../../../icons/icon'
//import SocialMediaToolbar from '../LiveStream'
import ProfileTabs from './ProfileTab'
import { Button } from '@chakra-ui/react'
import ReusableModal from './ModalDesign'
import { BriefcaseBusiness, GraduationCap, MapPin } from 'lucide-react'
import { EditComponent } from './AllModal'

const MainProfile = () => {
    const [openModal, setOpenModal] = useState(false);
    return (
        <div>
            <div className='bg-white  p-1 border border-gray-300 rounded-lg'>
                <div className='relative'>
                    <div className='absolute top-2 right-2'>
                        <Camera />
                    </div>
                    <img src="/images/bg-profile.png" alt="cover photo" className='w-full md:h-[220px]' />
                </div>
                <div className='flex justify-between'>
                    <div className='z-10'>
                        <img src="/images/profile.png" alt="profile picture"
                            className='rounded-full w-32 h-auto mt-[-3.7rem] ml-3' />
                        <img src="/images/active-icon.png" alt="Active" className='ml-28 -mt-8' />
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
                            John Smith
                        </h1>
                        <p className='text-xs md:text-sm my-3'>
                            Skilled in Full Stack Development, Agile Project Management, and Data Analysis.
                        </p>
                        <p className='text-slate-500 font-thin flex items-center gap-2'>
                            <MapPin className='w-4 h-4'/> USA <BriefcaseBusiness className='w-4 h-4'/> Software Engineer at TechCorp
                        </p>
                        <p className='text-slate-500 font-thin flex items-center gap-2'>
                            <GraduationCap className='w-4 h-4'/> B.Sc in Computer Science
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
            <ProfileTabs />
        </div>
    )
}
export default MainProfile