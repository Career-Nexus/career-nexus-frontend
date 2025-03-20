import React from 'react'
import { Article, Clock, Event, Upload, Video } from '../../../icons/icon'
// import { Upload, Video, Calendar, FileText } from "lucide-react"
// import { Button } from "@/components/ui/button"

const MainSection = () => {

 const SocialMediaToolbar=()=> {
  return (
    <div className="flex items-center gap-2 w-full max-w-3xl">
      <button
        variant="ghost"
        className="flex items-center gap-2 bg-gray-100 hover:bg-gray-200 rounded-lg px-4 h-auto"
      >
        <Upload className="h-4 w-4" />
        <span className="text-xs font-thin">Upload Media</span>
      </button>

      <button
        variant="ghost"
        className="flex items-center gap-2 bg-gray-100 hover:bg-gray-200 rounded-lg px-4 h-auto"
      >
        <Video className="h-4 w-4" />
        <span className="text-xs font-thin">Start Live Video</span>
      </button>

      <button
        variant="ghost"
        className="flex items-center gap-2 bg-gray-100 hover:bg-gray-200 rounded-lg px-4 h-auto"
      >
        <Event className="h-4 w-4" />
        <span className="text-xs font-thin">Add Event</span>
      </button>

      <button
        variant="ghost"
        className="flex items-center gap-2 bg-gray-100 hover:bg-gray-200 rounded-lg px-4 h-auto"
      >
        <Article className="h-4 w-4" />
        <span className="text-xs font-thin">Add Article</span>
      </button>

      <div className="ml-auto">
        <button className="bg-green-500 hover:bg-green-600 text-white rounded-md px-6">Post</button>
      </div>
    </div>
  )

    // const FileUpload = () => {
    //     const file = [
    //         { id: 1, icon: <Upload/>, desc: "Upload Media" },
    //         { id: 2, icon: <Video/>, desc: "Live Video" },
    //         { id: 3, icon: <Event/>, desc: "Schedule Event" },
    //         { id: 4, icon: <Article/>, desc: "Write Article" },
    //     ]
        return (
            <label className="file-upload relative flex gap-2 cursor-pointer">
                {
                    file.map(item => (
                        <div key={item.id} className='flex items-center px-12 border-2 border-gray-300 rounded-lg bg-gray-100'>
                            <div className='ml-[-40px]'>{item.icon}</div>
                            <div className='text-xs font-thin'>{item.desc}</div>
                        </div>
                    ))
                }
                {/* <div className="flex items-center px-4 py-2 border-2 border-gray-300 rounded-lg bg-gray-100 transition">
                    <Upload/>
                    <span className="text-xs">Upload Media</span>
                </div>*/}
                <input type="file" className="hidden" /> 
            </label>
        );
    };
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
                    {/* <div className='col-span-10'>
                        <FileUpload />
                    </div>
                    <button className='text-white col-span-2 ml-auto bg-[#5DA05D] px-5 rounded-lg'>Post</button> */}
                </div>
            </div>
            <input type='text' name="update" id="update" placeholder='Share an update' className='block md:hidden w-full rounded-lg border-gray-300 bg-gray-50' />
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
                    </div>
                ))}
            </div>
        </div>
    )
}

export default MainSection