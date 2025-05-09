import React from 'react'
import { mentors } from '../../components/dashboard/mentorship/MentorMain';
import ProfileDetail from '../../components/dashboard/mentorship/ProfileDetail'
import { Link, useParams } from 'react-router-dom';
import { BriefcaseBusiness, Ellipsis, GraduationCap, MapPin, UserPlus } from 'lucide-react';

function MentorDetails() {
    const { id } = useParams();
    // const decodedItem = decodeURIComponent(id);

    const mentor = mentors.find((m) => m.id === parseInt(id));

    if (!mentor) {
        return (
            <div className="p-6">
                <h1 className="text-2xl font-bold">Project not found</h1>
                <Link to="/mentorship" className="text-blue-500 underline">Go back to mentors page</Link>
            </div>
        );
    }
    return (
        <div className='grid grid-cols-12 md:gap-8 p-4 md:px-5  lg:px-12 md:py-8'>
            <div className='col-span-4 md:col-span-4 lg:col-span-3'>
                <ProfileDetail />
            </div>
            <div className='col-span-8 md:col-span-8 lg:col-span-9'>
                <div className="col-span-8 rounded-lg shadow-sm">
                    <div className="relative w-full h-48">
                        {/* <img src={mentor.image} alt={mentor.name} className="rounded-lg mb-6 w-full h-96 object-cover" /> */}
                        <img src={mentor.cover} alt={mentor.name} className="w-full h-48 object-cover rounded-tl-lg rounded-tr-lg" />
                    </div>
                    <div className="relative w-32 h-32">
                        <img src={mentor.image} alt={mentor.name} className="rounded-full w-32 h-32 mt-[-3.7rem] ml-3 object-cover" />
                    </div>
                    <h1 className="text-3xl font-bold mb-2">{mentor.name}</h1>
                    <div className='flex items-center justify-between'>
                        <div>
                            <p className="text-gray-600 italic mb-4">{mentor.title}</p>
                            <div className='flex gap-4'>
                                <p className='flex gap-2'>
                                    <MapPin />{mentor.location}
                                </p>
                                <p className='flex gap-2'>
                                    <BriefcaseBusiness />{mentor.job}
                                </p>
                            </div>
                            <div className='flex gap-2 my-2'>
                                <GraduationCap />{mentor.degree}
                            </div>
                            <div className='flex gap-4 my-2'>
                                <div className='flex gap-2'>
                                    <span className='text-[#5DA05D]'>{mentor.stats.following}</span> following
                                </div>
                                <div className='flex gap-2'>
                                    <span className='text-[#5DA05D]'>{mentor.stats.followers}</span> followers
                                </div>
                                <div className='flex gap-2'>
                                    <span className='text-[#5DA05D]'>{mentor.stats.sessions}</span> followers
                                </div>
                            </div>
                            <div className="flex mt-6 space-x-3">
                                <button className="bg-[#2A0D47] text-white px-4 py-2 rounded-lg">
                                    Book a Session
                                </button>
                                <button className="bg-[#5DA05D] text-white px-4 py-2 rounded-lg flex gap-2 items-center ">
                                    <UserPlus className='w-5 h-5' />
                                    Follow
                                </button>
                                <button className="border border-[#5DA05D] text-gray-600 px-2 py-2 rounded-lg ">
                                    <Ellipsis />
                                </button>
                            </div>
                        </div>
                        <div>
                            <img src="/images/video1.png" alt="video" />
                        </div>
                    </div>
                    <Link to="/mentorship" className="mt-6 inline-block text-green-600 underline">← Back to mentorship</Link>
                </div>
            </div>
        </div>
    )
}

export default MentorDetails
