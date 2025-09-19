"use client"

import { useContext, useState } from "react"
import { UserContext } from "../../context/UserContext"
import { Link } from "react-router-dom"
import { GraduationCap } from "lucide-react"

const settingsItems = [
    { id: "profile", label: "Profile Information" },
    { id: "accounts", label: "Connected Accounts" },
    { id: "notifications", label: "Notification Preferences" },
    { id: "privacy", label: "Privacy Settings" },
    { id: "language", label: "Language & Region" },
]

export default function SettingSidebar() {
    const [activeItem, setActiveItem] = useState("language")
    const { user, error, } = useContext(UserContext)

    const handleItemClick = (itemId) => {
        setActiveItem(itemId)
        const element = document.getElementById(itemId)
        if (element) {
            element.scrollIntoView({ behavior: "smooth" })
        }
    }

    return (
        <div>
            {user.user_type === "learner" ? (
            <div>
                <Link to={'/profilepage'} className='border border-[#5DA05D] bg-[#FBFFFB] rounded-lg flex flex-col relative'>
                    <div className='flex items-center gap-3 min-h-32 mx-2 '>
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
            </div>
            ):(
            <div>
                <Link to={'/profilepage'} className='border border-[#B573F6] bg-[#F5EAFF8F] rounded-lg flex flex-col relative'>
                        <div className='flex ml-auto mr-4 mt-2'><GraduationCap className='bg-green-100' /></div>
                        <div className='flex items-center gap-3 min-h-24 mx-2 '>
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
            </div>
            )}
            <div className="w-full mt-6 max-w-sm bg-white rounded-lg border border-gray-200 p-6 shadow-sm sticky top-4">
                <div className="space-y-1">
                    {settingsItems.map((item) => (
                        <button
                            key={item.id}
                            onClick={() => handleItemClick(item.id)}
                            className={`w-full text-left px-4 py-3 rounded-lg text-sm font-medium transition-colors ${activeItem === item.id ? "bg-green-100 text-gray-900" : "text-gray-700 hover:bg-gray-50"
                                }`}
                        >
                            {item.label}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    )
}
