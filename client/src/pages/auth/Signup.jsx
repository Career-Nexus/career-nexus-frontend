import React from 'react'
import { Select, TextInput } from "flowbite-react";
import { Email, Google, Linkedin, Password, User } from '../../icons/icon';
import { Link } from 'react-router-dom';

export default function Signup() {
    return (
        <div className=''>
            <div className='grid grid-cols-12'>
                <div className='col-span-12 lg:col-span-7'>
                    <div className=''>
                        <img src="/images/auth-img.png" alt="Auth image" />
                    </div>
                    <div className='mt-[-16rem] h-96 w-full'>
                        <img src="/images/gradient.png" alt="gradient" className='h-3/4 w-full' />
                    </div>
                    <div className='text-white mt-[-20rem]'>
                        <div class="w-80 grid items-center justify-center mx-auto">
                            <div class="relative text-white">
                                <span class="absolute inset-y-0 left-0 flex items-center pl-3">
                                    <span className='bg-[#5DA05D] p-2 rounded-full'></span>
                                </span>
                                <input type="submit" value={"One connection at a time"} disabled
                                    class="pl-10 pr-4 py-2 w-full border border-white rounded-lg bg-inherit" />
                            </div>
                        </div>
                        <div className='grid grid-flow-row items-center justify-center text-white p-4 pl-28'>
                            <h1 className='text-wrap text-xl font-semibold'>Welcome to your Professional Practical</h1>
                            <h1 className='text-wrap text-xl font-semibold'>Training Workshop, Career Contents</h1>
                            <h1 className='text-wrap text-xl font-semibold'>and Global Networking Community!</h1>
                            <p className='font-thin text-xs'>Your gateway to skill enhancement and collaborative <br />solutions to workforce applications...</p>
                        </div>
                    </div>
                </div>
                <div className='col-span-12 lg:col-span-5 md:px-4 p-0'>
                    <form className="bg-white px-16 space-y-4">
                        <h1 className='font-bold text-center mt-5'>Create Account</h1>
                        <div className="max-w-md">
                            <Select id="countries" required className='border border-green-300 rounded-lg'>
                                <option>Select your type</option>
                                <option>Learner</option>
                                <option>Employer</option>
                                <option>Mentor</option>
                            </Select>
                        </div>
                        <div className="max-w-md">
                            <TextInput id="email4" type="text" icon={User} placeholder=" Full Name" required />
                        </div>
                        <div className="max-w-md">
                            <TextInput id="email4" type="email" icon={Email} placeholder=" Email Address" required />
                        </div>
                        <div className='flex gap-3'>
                            <div className="max-w-md">
                                <TextInput id="email4" type="password" icon={Password} placeholder=" Password" required />
                            </div>
                            <div className="max-w-md">
                                <TextInput id="email4" type="password" icon={Password} placeholder=" Confirm Password" required />
                            </div>
                        </div>

                        <button type="submit" color="gray" className='bg-[#5DA05D] w-full py-2 rounded-lg text-white'>Sign up</button>
                        <p className='text-gray-500 font-thin text-center'>Or continue with</p>

                        <button type="submit"
                            class="w-full flex items-center border justify-center py-2 gap-1 rounded-lg transition">
                            <Google />
                            Google
                        </button>
                        <button type="submit"
                            class="w-full flex items-center border justify-center py-2 gap-1 rounded-lg transition">
                            <Linkedin />
                            Linkedin
                        </button>
                        <p>Aleady have an account? <Link to={'/login'} className='text-[#5DA05D]'>Login</Link></p>
                        {/* <button className='w-full bg-gray-50 dark:bg-gray-700 py-2 rounded-lg border'>hi</button> */}
                    </form>
                </div>
            </div>
        </div>
    )
}
