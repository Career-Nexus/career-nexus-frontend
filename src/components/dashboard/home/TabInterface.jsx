import { useState } from "react"
import { SocialInteractionBar } from "./SocialInteractionBar"
import { ChevronDown, ChevronUp, Plus } from "lucide-react"
import { Clock } from "../../../icons/icon"

import FollowingTemplate from "./FollowingPosts"
import AllTemplate from "./AllPosts"
// import { toast } from 'react-toastify'; // Optional: for user feedback
// import 'react-toastify/dist/ReactToastify.css';

export default function TabInterface() {
  const [activeTab, setActiveTab] = useState("all")

  return (
    <div className="w-full max-w-4xl mx-auto pt-4">
      <div className="flex bg-gray-100 p-1 rounded-lg mb-4">
        <button
          type="button"
          className={`w-full px-6 py-2 text-sm font-medium rounded-lg ${activeTab === 'all' ? 'bg-white shadow' : 'bg-gray-100 text-gray-500'}`}
          onClick={() => setActiveTab('all')}
        >
          ALL
        </button>
        <button
          type="button"
          className={`w-full px-6 py-2 text-sm font-medium rounded-lg ${activeTab === 'following' ? 'bg-white shadow' : 'bg-gray-100 text-gray-500'}`}
          onClick={() => setActiveTab('following')}
        >
          FOLLOWING
        </button>
        <button
          type="button"
          className={`w-full px-6 py-2 text-sm font-medium rounded-lg ${activeTab === 'mentors' ? 'bg-white shadow' : 'bg-gray-100 text-gray-500'}`}
          onClick={() => setActiveTab('mentors')}
        >
          MENTORS
        </button>
      </div>

      <div className="mt-6">
        {activeTab === "all" && <AllTemplate />}
        {activeTab === "following" && <FollowingTemplate />}
        {activeTab === "mentors" && <MentorsTemplate />}
      </div>
    </div>
  )
}

export const formatTimeAgo = (dateString) => {
  const now = new Date()
  const postDate = new Date(dateString)
  const diffInSeconds = Math.floor((now - postDate) / 1000)

  if (diffInSeconds < 60) {
    return `${diffInSeconds}s`
  } else if (diffInSeconds < 3600) {
    return `${Math.floor(diffInSeconds / 60)}m`
  } else if (diffInSeconds < 86400) {
    return `${Math.floor(diffInSeconds / 3600)}h`
  } else {
    return `${Math.floor(diffInSeconds / 86400)}d`
  }
}

function MentorsTemplate() {
  const [expandedItems, setExpandedItems] = useState({});

  const toggleExpand = (id) => {
    setExpandedItems(prev => ({
      ...prev,
      [id]: !prev[id] // Toggle only the clicked item's state
    }));
  };

  const profile = [
    {
      id: 1, image: "/images/profile.png", name: "John Smith",
      description: "Ux Mentor, Google certified Ux designer", days: "8d", timeIcon: <Clock />,
      disc2: "🔍If you always stay in your comfort zone, how will you know what you're capable of?...",
      image2: "/images/profile-img5.png"
    },
    {
      id: 2, image: "/images/profile.png", name: "John Smith",
      description: "Ceo texile rebound, Strategic Business man", days: "12hrs", timeIcon: <Clock />,
      disc2: "🔍 Why Do So Many Finance Apps Look the Same? Ever noticed how most fintech apps follow the same blue-and-white theme...",
      image2: "/images/profile-img1.png"
    }
  ];

  return (
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
            <button className='text-[#5DA05D] flex justify-center border border-[#5DA05D] ml-auto px-3 py-1 rounded-lg text-xs'>
              <Plus className='w-4 h-4' /> Follow
            </button>
          </div>

          <p className='mb-3'>{p.disc2}</p>
          <button
            onClick={() => toggleExpand(p.id)}
            className="text-[#5DA05D] hover:text-blue-700 ml-1 text-sm font-medium inline-flex items-center"
          >
            {expandedItems[p.id] ? (
              <>
                <span className='text-[#5DA05D]'>Hide</span>
                <ChevronUp className="h-3 w-3 ml-0.5" />
              </>
            ) : (
              <>
                <span className='text-[#5DA05D]'>More</span>
                <ChevronDown className="h-3 w-3 ml-0.5" />
              </>
            )}
          </button>

          {expandedItems[p.id] && (
            <div className="mt-2">
              <ul className="list-disc ml-5 text-sm">
                <li>Collaborated with cross-functional teams to deliver high-quality software solutions.</li>
                <li>Implemented responsive design principles to ensure optimal user experience.</li>
                <li>Participated in code reviews and provided constructive feedback.</li>
                <li>Utilized agile methodologies to manage workflows efficiently.</li>
              </ul>
            </div>
          )}

          <div>
            <img src={p.image2} alt="profile" className='w-full h-[348px]' />
          </div>

          <SocialInteractionBar likes={125} comments={25} shares={2} views={true} events={true} />
        </div>
      ))}
    </div>
  );
}
