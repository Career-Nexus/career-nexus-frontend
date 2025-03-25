import React from 'react'
import { Article, Chat, Clock, EventIcon, Like, Repost, Save, Upload, Video } from '../../../icons/icon'
import SocialMediaToolbar from './LiveStream'


const MainSection = () => {
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
            <div className='border border-gray-300 rounded-lg p-4 hidden md:block'>
                <div className='flex gap-2 items-center'>
                    <img src="/images/profile.png" alt="profile" className='w-14 h-auto rounded-full' />
                    <input type='text' name="update" id="update" placeholder='Share an update' className='w-full rounded-lg border-gray-300 bg-gray-50' />
                </div>
                <div className='gap-2 mt-3 w-full'>
                    <SocialMediaToolbar />
                </div>
            </div>
            <div className=''>
                <input type='text' name="update" id="update" placeholder='Share an update' className='block md:hidden w-full rounded-lg border-gray-300 bg-gray-50' />
            </div>
            <div className='my-3 gap-3 flex'>
                <button className='bg-[#5DA05D] text-white px-4 py-2 rounded-lg text-xs'>All</button>
                <button className='border border-gray-300 px-4 py-2 rounded-lg text-xs'>Following</button>
                <button className='border border-gray-300 px-4 py-2 rounded-lg text-xs'>Mentors</button>
            </div>
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
                        <div className='flex justify-center mt-3'>
                            <div className='flex gap-2 justify-around items-center mr-10'>
                                <Like /> 125 likes
                            </div>
                            <div className='flex gap-2 justify-around items-center mr-10'>
                                <Chat /> 25 comments
                            </div>
                            <div className='flex gap-2 justify-around items-center mr-10'>
                                <Upload /> 2 shares
                            </div>
                            <div className='flex gap-2 justify-around items-center mr-10'>
                                <Save /> Save
                            </div>
                            <div className='flex gap-2 justify-around items-center'>
                                <Repost /> Repost
                            </div>
                        </div>
                    </div>

                ))}

            </div>
        </div>
    )
}

export default MainSection