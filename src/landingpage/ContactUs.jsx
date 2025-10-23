import { X } from 'lucide-react'
import React from 'react'

export default function ContactUs({ onOpen, onClose }) {
    const handleBackdropClick = (e) => {
        if (e.target === e.currentTarget) onClose();
    };
    if (!onOpen) return null;
    return (
        <div
            onClick={handleBackdropClick}
            className="fixed inset-0 bg-black/40 bg-opacity-60 flex items-center justify-center z-50 px-3 sm:px-5 py-8"
        >
            <div className="bg-white text-black rounded-lg shadow-lg max-w-lg w-full relative">
                {/* Scrollable content area */}
                <div className="max-h-[90vh] overflow-y-auto p-6 no-scrollbar">
                    {/* Header */}
                    <div className="flex justify-between items-center border-b pb-3 mb-4">
                        <h2 className="font-semibold text-lg">Contact us here for help</h2>
                        <button onClick={onClose} className="bg-gray-100 p-2 rounded-lg hover:bg-gray-200">
                            <X />
                        </button>
                    </div>
                    <div className='font-semibold'>Address:  Paul Street, London, England, EC2A 4NE </div>
                    <div className='font-semibold my-2'>WhatsApp: +1 (312) 539-4512</div>
                    <div className='font-semibold'>Email: info@career-nexus.com</div>
                    <div className='font-semibold mt-2'>Help: support@career-nexus.com </div>
                </div>
            </div>
        </div>
    )
}
