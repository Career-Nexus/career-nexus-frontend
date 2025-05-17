import React from 'react'
import { mentors } from './MentorMain';
import { Link, useParams } from 'react-router-dom';
import { Playbutton } from '../../../icons';
import { Bookmark, MessageCircle, RefreshCw, ThumbsUp, Upload } from 'lucide-react';

function MentorDetailPost() {
      const { id } = useParams();

    const mentor = mentors.find((m) => m.id === parseInt(id));
    return (
        <div>
            <div className='border border-gray-200 p-2 rounded-lg'>
                <div className='flex gap-4'>
                    <div>
                        <img src={mentor.image} alt={mentor.name} className="rounded-full w-16 h-16 ml-3 object-cover" />
                    </div>
                    <div className='flex flex-col'>
                        <span>{mentor.name}</span>
                        <span>{mentor.title}</span>
                        <span>{mentor.time}</span>
                    </div>
                </div>
                <div className='my-3'>
                    {mentor.shortdisc}<Link to={"/session"} className='text-green-500'>Click here to book now!</Link>
                </div>
                <div className='relative flex'>
                    <img src={mentor.postimg} alt="videoFrame" className='w-[80%] h-52' />
                    <img src={Playbutton} alt="play" className='relative ml-[-25rem]  items-center' />
                </div>
                <div>
                    <SocialInteractionBar likes={125} comments={25} shares={2} views={true} events={true} />
                </div>
            </div>
            <br />
            <div className='border border-gray-200 p-2 rounded-lg'>
                <div className='flex gap-4'>
                    <div>
                        <img src={mentor.image} alt={mentor.name} className="rounded-full w-16 h-16 ml-3 object-cover" />
                    </div>
                    <div className='flex flex-col'>
                        <span>{mentor.name}</span>
                        <span>{mentor.title}</span>
                        <span>{mentor.time}</span>
                    </div>
                </div>
                <div className='my-3'>
                    {mentor.shortdisc}<Link to={"/session"} className='text-green-500'>Click here to book now!</Link>
                </div>
                <div className='relative flex'>
                    <img src="/images/videoFrame2.png" alt="videoFrame" className='w-[80%] h-52' />
                    <img src={Playbutton} alt="play" className='relative ml-[-25rem]  items-center' />
                </div>
                <div>
                    <SocialInteractionBar likes={125} comments={25} shares={2} views={true} events={true} />
                </div>
            </div>
        </div>
    )
}
function SocialInteractionBar({
    likes = 0,
    comments = 0,
    shares = 0,
    showSave = true,
    showRepost = true,
}) {
    return (
        <div className="flex  mt-3 gap-5">
            <div className="flex gap-2 justify-center items-center mr-5 hover:bg-green-100 hover:p-2 rounded-lg">
                <ThumbsUp size={18} /> {likes} <span className="hidden lg:block"></span>
            </div>
            <div className="flex gap-2 justify-center items-center mr-5 hover:bg-green-100 hover:p-2 rounded-lg">
                <MessageCircle size={18} /> {comments} <span className="hidden lg:block"></span>
            </div>
            <div className="flex gap-2 justify-center items-center mr-5 hover:bg-green-100 hover:p-2 rounded-lg">
                <Upload size={18} /> {shares} <span className="hidden lg:block"></span>
            </div>

            {showSave && (
                <div className="flex gap-2 justify-center items-center hover:bg-green-100 hover:p-2 rounded-lg">
                    <Bookmark size={18} /> <span className="hidden lg:block"></span>
                </div>
            )}
            {showRepost && (
                <div className="flex gap-2 justify-center items-center hover:bg-green-100 hover:p-2 rounded-lg">
                    <RefreshCw size={18} /> <span className="hidden lg:block"></span>
                </div>
            )}
        </div>
    )
}

export default MentorDetailPost