import { X } from 'lucide-react'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'

export default function PartnerWIthUsModal({ isOpen, onClose }) {
    
    const Clickoutside = (e) => {
        if (e.target === e.currentTarget) onClose();
    }

    if (!isOpen) return null;
    return (
        <div onClick={Clickoutside} className='fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4 '>
            {/* Modal Content */}
            <div className='bg-white rounded-2xl shadow-xl max-w-3xl w-full max-h-[90vh] overflow-y-auto no-scrollbar'>
                {/* Header */}
                <div className='flex justify-between items-center p-6 md:p-8 border-b border-gray-200'>
                    <h2 className='text-2xl md:text-3xl font-bold text-gray-900'>
                        Talk to any of our consultants
                    </h2>
                    <button 
                        onClick={onClose}
                        className='text-gray-500 hover:text-gray-700 transition'
                        aria-label="Close modal"
                    >
                        <X size={24} />
                    </button>
                </div>

                {/* Content */}
                <div className='p-6 md:p-8'>
                    <p className='text-gray-600 text-center mb-8 text-lg'>
                        Whether you're an individual seeking career guidance or an organization aiming to enhance your team's capabilities, our experts are here to help.
                    </p>

                    {/* Options Grid */}
                    <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                        {/* For Individuals */}
                        <div className='border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-shadow'>
                            <h3 className='text-xl font-bold text-gray-900 mb-3'>Anne</h3>
                            <p className='text-gray-600 mb-6'>
                                Looking to advance your career? Connect with our experts for personalized guidance and mentorship.
                            </p>
                            <Link to="https://calendar.app.google/uraaKNjeXuXuN6vr5" target='_blank'>
                                <button className='w-full bg-[#5DA05D] text-white font-semibold py-2 px-4 rounded-lg hover:bg-[#4d8a4d] transition'>
                                    Get Started with Anne
                                </button>
                            </Link>
                        </div>

                        {/* For Organizations */}
                        <div className='border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-shadow'>
                            <h3 className='text-xl font-bold text-gray-900 mb-3'>Lara</h3>
                            <p className='text-gray-600 mb-6'>
                                Is your organization looking to build capability? Schedule a consultation with Lara to explore tailored solutions.
                            </p>
                            <Link to="https://calendar.app.google/4edsKcba4dqp2ibBA" target='_blank'>
                                <button className='w-full bg-[#5DA05D] text-white font-semibold py-2 px-4 rounded-lg hover:bg-[#4d8a4d] transition'>
                                    Get Started with Lara
                                </button>
                            </Link>
                        </div>
                        <div className='border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-shadow'>
                            <h3 className='text-xl font-bold text-gray-900 mb-3'>Career-Nexus Ltd</h3>
                            <p className='text-gray-600 mb-6'>
                                We are here to guide individuals on their career paths and help organizations build capability.
                            </p>
                            <Link to="https://calendar.app.google/qUW1SHgwsPL9ryiJ7" target='_blank'>
                                <button className='w-full bg-[#5DA05D] text-white font-semibold py-2 px-4 rounded-lg hover:bg-[#4d8a4d] transition'>
                                    Get Started with Career-Nexus Ltd
                                </button>
                            </Link>
                        </div>
                        <div className='border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-shadow'>
                            <h3 className='text-xl font-bold text-gray-900 mb-3'>Oyindamola</h3>
                            <p className='text-gray-600 mb-6'>
                                Seeking expert career advice? Schedule a session with Oyindamola for tailored mentorship and support.
                            </p>
                            <Link to="https://calendar.google.com/calendar/u/0/appointments/schedules/AcZssZ0Lm6SYbu3xyaB9OmwT9bO2ECy5RlmrRIjcS46mKinuDz9_hMW3PsCarJKcBt2MMivcGqFtJ-4n" target='_blank'>
                                <button className='w-full bg-[#5DA05D] text-white font-semibold py-2 px-4 rounded-lg hover:bg-[#4d8a4d] transition'>
                                    Get Started with Oyindamola
                                </button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
