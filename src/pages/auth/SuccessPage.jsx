import React from 'react'
import HeroSection from '../../components/Auth/HeroSection'
import { useNavigate } from 'react-router-dom'
import { authService } from '../../api/ApiServiceThree';
import Cookies from 'js-cookie';
import { motion } from "framer-motion";
import Confetti from "react-confetti";

function SuccessPage() {
    const navigate = useNavigate();
    
    const handleSuccess = () => {
        authService.isAuthenticated(true);
        authService.setAuthCookies(Cookies.get('access_token'));
        navigate('/profile-setup');
    };

    return (
        <div className="grid grid-cols-12 min-h-screen">
            <Confetti numberOfPieces={150} recycle={false} />

            <div className='md:col-span-7 hidden md:block ml-5'>
                <HeroSection />
            </div>

            <div className='col-span-12 md:col-span-5 px-4 bg-white'>
                <div className='mx-5 px-12'>
                    <div className='flex flex-col items-center justify-center bg-white min-h-[calc(100vh-200px)]'>

                        {/* SHINY ROTATING GRADIENT RING */}
                        <motion.div
                            className="relative w-32 h-32 flex items-center justify-center"
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ type: "spring", stiffness: 200, damping: 15 }}
                        >
                            {/* Gradient Ring */}
                            <motion.div
                                className="absolute inset-0 rounded-full p-[3px]"
                                style={{
                                    background: "conic-gradient(#5DA05D, #7EE887, #5DA05D)"
                                }}
                                animate={{ rotate: 360 }}
                                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                            >
                                <div className="w-full h-full bg-white rounded-full" />
                            </motion.div>

                            {/* Green Success Circle */}
                            <div className="w-24 h-24 rounded-full bg-[#5DA05D] flex items-center justify-center shadow-xl relative">
                                
                                {/* GLOW PULSE */}
                                <motion.div
                                    className="absolute inset-0 rounded-full bg-[#5DA05D]/40 blur-md"
                                    animate={{ opacity: [0.2, 0.6, 0.2] }}
                                    transition={{ duration: 2, repeat: Infinity }}
                                />

                                {/* DRAWN CHECKMARK */}
                                <motion.svg
                                    width="70"
                                    height="70"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="white"
                                    strokeWidth="3"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                >
                                    <motion.path
                                        d="M20 6L9 17L4 12"
                                        initial={{ pathLength: 0 }}
                                        animate={{ pathLength: 1 }}
                                        transition={{ duration: 0.8, ease: "easeInOut" }}
                                    />
                                </motion.svg>
                            </div>

                            {/* SUCCESS BURST PARTICLES */}
                            {Array.from({ length: 12 }).map((_, i) => (
                                <motion.div
                                    key={i}
                                    className="absolute w-2 h-2 rounded-full bg-[#5DA05D]"
                                    initial={{ opacity: 1, scale: 1, x: 0, y: 0 }}
                                    animate={{
                                        opacity: 0,
                                        scale: 0,
                                        x: Math.cos((i * 30) * Math.PI / 180) * 60,
                                        y: Math.sin((i * 30) * Math.PI / 180) * 60
                                    }}
                                    transition={{ duration: 0.9, delay: 0.2 }}
                                />
                            ))}

                        </motion.div>

                        {/* TEXT */}
                        <div className='mt-10 text-center'>
                            <h1 className='text-2xl font-bold text-[#3a1c64]'>Verified</h1>
                            <p className='text-gray-700 mt-1'>
                                You are all set! Your email has been verified
                            </p>
                        </div>
                    </div>
                </div>

                <button onClick={handleSuccess} className='flex items-center justify-center mt-10 w-full'>
                    <div className='w-[50%] px-4 py-2 bg-[#5DA05D] text-white text-center rounded-md mx-auto'>
                        Setup Your Profile
                    </div>
                </button>
            </div>
        </div>
    )
}

export default SuccessPage
