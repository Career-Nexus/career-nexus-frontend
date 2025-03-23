import React from 'react'
import { Camera, Clock, Edit, Info, Video, VideoIcon, Videow } from '../../../../icons/icon'
import SocialMediaToolbar from '../LiveStream'
import TabInterface from './TabInterface'

const MainProfile = () => {
    const profile = [
            {
                id: 1, image: "/images/profile3.png", name: "Matthew Kunle",
                description: "Ux Mentor, Google certified Ux designer", days: "8d", timeIcon: <Clock />,
                disc2: "If you always stay in your comfort zone, how will you know what you're capable of?Most people don't fail because they lack talent or intelligence............................. ",
                image2: "/images/image1.png"
            },
            {
                id: 2, image: "/images/profile4.png", name: "Cole Kingsman",
                description: "Ceo texile rebound, Strategic Business man", days: "12hrs", timeIcon: <Clock />,
                disc2: "🔍 Why Do So Many Finance Apps Look the Same? Ever noticed how most fintech apps follow the same blue-and-white theme.... ",
                image2: "/images/image2.png"
            }
        ]
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
            {/* <div className='flex gap-4 my-4'>
                <button className='border border-[#5DA05D] px-2 py-1 rounded-lg text-[#5DA05D] text-sm'>Posts</button>
                <button className='border border-gray-300 px-2 py-1 rounded-lg text-sm'>Professional Summary</button>
                <button className='border border-gray-300 px-2 py-1 rounded-lg text-sm'>Portfolio Virtual Gallery</button>
                <button className='border border-gray-300 px-2 py-1 rounded-lg text-sm'>Project Catalog</button>
                <button className='border border-gray-300 px-2 py-1 rounded-lg text-sm'>Analytics Dashboard</button>
            </div> */}
            <SocialMediaToolbar />
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
                            <button className='text-[#5DA05D] border border-[#5DA05D] ml-auto px-4 pb-1 rounded-lg text-xs'><span className='font-bold text-lg'>+</span> Follow</button>
                        </div>
                        <p className='mb-3'>{p.disc2} <a href="#" className='text-[#5DA05D]'>More</a></p>
                        <div>
                            <img src={p.image2} alt="profile" className='w-full h-[348px]' />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}
export default MainProfile