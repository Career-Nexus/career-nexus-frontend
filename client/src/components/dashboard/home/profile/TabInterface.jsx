import { Card, CardBody } from "@chakra-ui/react"
import { useState } from "react"
import { Chat, Clock, Like, Repost, Save, Upload } from "../../../../icons/icon"
// import { Card, CardContent } from "@/components/ui/card"

export default function TabInterface() {
    const [activeTab, setActiveTab] = useState(0)

    const tabs = [
        // {
        //   title: "Posts",
        //   content: "This is the Posts section content. Here you can find all your posts and updates.",
        // },
        {
            title: "Posts", image: "/images/profile.png", name: "John Smith",
            description: "Ux Mentor, Google certified Ux designer", days: "8d", timeIcon: <Clock />,
            disc2: "If you always stay in your comfort zone, how will you know what you're capable of?Most people don't fail because they lack talent or intelligence............................. ",
            image2: "/images/image1.png"
        },
        {
            title: "Professional Summary",
            image: "/images/profile4.png", name: "Cole Kingsman",
            description: "Ceo texile rebound, Strategic Business man", days: "12hrs", timeIcon: <Clock />,
            disc2: "🔍 Why Do So Many Finance Apps Look the Same? Ever noticed how most fintech apps follow the same blue-and-white theme.... ",
            image2: "/images/image2.png"
        },
        {
            title: "Portfolio Virtual Gallery",
            image: "/images/profile.png", name: "John Smith",
            description: "Ux Mentor, Google certified Ux designer", days: "8d", timeIcon: <Clock />,
            disc2: "If you always stay in your comfort zone, how will you know what you're capable of?Most people don't fail because they lack talent or intelligence............................. ",
            image2: "/images/image1.png"
        },
        {
            title: "Project Catalog",
            image: "/images/profile4.png", name: "Cole Kingsman",
            description: "Ceo texile rebound, Strategic Business man", days: "12hrs", timeIcon: <Clock />,
            disc2: "🔍 Why Do So Many Finance Apps Look the Same? Ever noticed how most fintech apps follow the same blue-and-white theme.... ",
            image2: "/images/image2.png"
        },
        {
            title: "Analytics Dashboard",
            image: "/images/profile.png", name: "John Smith",
            description: "Ux Mentor, Google certified Ux designer", days: "8d", timeIcon: <Clock />,
            disc2: "If you always stay in your comfort zone, how will you know what you're capable of?Most people don't fail because they lack talent or intelligence............................. ",
            image2: "/images/image1.png"
        },
    ]

    return (
        <div className="w-full max-w-5xl mx-auto">
            <div className="flex flex-wrap gap-4 my-4">
                {tabs.map((tab, index) => (
                    <button
                        key={index}
                        className={`border px-2 py-1 rounded-lg text-sm ${activeTab === index ? "border-[#5DA05D] text-[#5DA05D]" : "border-gray-300 text-gray-700"
                            }`}
                        onClick={() => setActiveTab(index)}
                    >
                        {tab.title}
                    </button>
                ))}
            </div>

            <Card className="mt-6">
                <CardBody className="pt-6">
                    <div>
                        <div className='flex gap-3 mb-2 items-center'>
                            <img src={tabs[activeTab].image} alt="profile" className='w-12 h-12 rounded-full' />
                            <div className='flex flex-col justify-center'>
                                <h3 className='font-semibold text-sm'>{tabs[activeTab].name}</h3>
                                <p className='font-light text-sm'>{tabs[activeTab].description}</p>
                                <div className='flex items-center gap-1'>
                                    <p>{tabs[activeTab].days}</p>
                                    <p>{tabs[activeTab].timeIcon}</p>
                                </div>
                            </div>
                            <button className='ml-auto px-4 pb-1 rounded-lg font-bold text-2xl'>...</button>
                        </div>
                        <p className='mb-3'>{tabs[activeTab].disc2} <a href="#" className='text-[#5DA05D]'>More</a></p>
                        <div>
                            <img src={tabs[activeTab].image2} alt="profile" className='w-full h-[348px]' />
                        </div>
                        <div className='flex justify-center mt-3 space-x-4'>
                            <div className='flex gap-2 justify-around items-center md:mr-20'>
                                <Like /> 125 <span className="hidden md:block">likes</span>
                            </div>
                            <div className='flex gap-2 justify-around items-center md:mr-20'>
                                <Chat /> 25 <span className="hidden md:block">comments</span>
                            </div>
                            <div className='flex gap-2 justify-around items-center md:mr-20'>
                                <Upload /> 2 <span className="hidden md:block">shares</span>
                            </div>
                            <div className='flex gap-2 justify-around items-center md:mr-20'>
                                <Save /> <span className="hidden md:block">Save</span>
                            </div>
                            <div className='flex gap-2 justify-around items-center'>
                                <Repost /> <span className="hidden md:block">Repost</span>
                            </div>
                        </div>
                    </div>
                </CardBody>
            </Card>
            <Card className="mt-6">
                <CardBody className="pt-6">
                    <div>
                        <div className='flex gap-3 mb-2 items-center'>
                            <img src={tabs[activeTab].image} alt="profile" className='w-12 h-12 rounded-full' />
                            <div className='flex flex-col justify-center'>
                                <h3 className='font-semibold text-sm'>{tabs[activeTab].name}</h3>
                                <p className='font-light text-sm'>{tabs[activeTab].description}</p>
                                <div className='flex items-center gap-1'>
                                    <p>{tabs[activeTab].days}</p>
                                    <p>{tabs[activeTab].timeIcon}</p>
                                </div>
                            </div>
                            <button className='ml-auto px-4 pb-1 rounded-lg font-bold text-2xl'>...</button>
                        </div>
                        <p className='mb-3'>{tabs[activeTab].disc2} <a href="#" className='text-[#5DA05D]'>More</a></p>
                        <div>
                            <img src={tabs[activeTab].image2} alt="profile" className='w-full h-[348px]' />
                        </div>
                        <div className='flex justify-center mt-3'>
                            <div className='flex gap-2 justify-around items-center mr-20'>
                                <Like /> 125 likes
                            </div>
                            <div className='flex gap-2 justify-around items-center mr-20'>
                                <Chat /> 25 comments
                            </div>
                            <div className='flex gap-2 justify-around items-center mr-20'>
                                <Upload /> 2 shares
                            </div>
                            <div className='flex gap-2 justify-around items-center mr-20'>
                                <Save /> Save
                            </div>
                            <div className='flex gap-2 justify-around items-center'>
                                <Repost /> Repost
                            </div>
                        </div>
                    </div>
                </CardBody>
            </Card>
        </div>
    )
}