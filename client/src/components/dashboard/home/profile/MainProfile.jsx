import React from 'react'
import { Camera, Clock, Edit, Info, Video, VideoIcon, Videow } from '../../../../icons/icon'
//import SocialMediaToolbar from '../LiveStream'
import TabInterface from './TabInterface'

const MainProfile = () => {
    return (
        <div>
            <div className='bg-white  p-1 border border-gray-300 rounded-lg'>
                <div className='relative'>
                    <div className='absolute top-2 right-2'>
                        <Camera />
                    </div>
                    <img src="/images/bg-profile.png" alt="cover photo" className='w-full h-[220px]' />
                </div>
                <div className='flex justify-between'>
                    <div className='z-10'>
                        <img src="/images/profile.png" alt="profile picture"
                            className='rounded-full w-32 h-auto mt-[-3.7rem] ml-3' />
                        <img src="/images/active-icon.png" alt="Active" className='ml-28 -mt-8' />
                    </div>
                    <div className='rounded-lg border border-[#5DA05D] px-4 mt-2 flex items-center gap-1'>
                        <Edit /> <p className='text-[#5DA05D] text-sm'>Edit Profile</p>
                    </div>
                </div>
                <div className='mt-6'>
                    <h1 className='text-xl font-bold'>
                        John Smith
                    </h1>
                    <p>
                        BSc, MSc(UK), MSc(USA), PSM I (in view) | Full Stack Development | Scrum Master | Product Management | Agile Methodology Implementation | Process Improvement | Business Analysis | Project Management | Database Administration | Data Analysis
                    </p>
                    <p className='text-slate-500 font-thin'>
                        New York, USA
                    </p>
                </div>
                <hr className='my-3' />
                <div>
                    <div className='flex justify-between'>
                        <p className='text-lg font-semibold'>
                            Video Intro
                        </p>
                        <div className='flex items-center gap-2'>
                            <Info /><span className='text-[#5DA05D]'>See Guide</span>
                        </div>
                    </div>
                    <img src="/images/video1.png" alt="video stream" />
                    {/* <VideoIcon /> */}
                    <button className='flex items-center gap-2 text-white bg-[#5DA05D] p-2 rounded-lg mt-2'>
                       <div className='text-white bg-[#5DA05D]'> <Videow /></div>
                        <p>Start Recording</p>
                    </button>
                </div>
            </div>
            <TabInterface/>
        </div>
    )
}
export default MainProfile