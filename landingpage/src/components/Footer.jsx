import React, { useState } from 'react'
import { Facebook, Instagram, Linkedin, X } from '../icon/icon'
import { Subscribe } from '../api/apiService';

const Footer = () => {
    const [email, setEmail] = useState('');
    const [error, setError] = useState(null);

    const handleSubmit = async (e) => {
            e.preventDefault();
            //const form = e.target.value;
            try {
                const data = await Subscribe(email);
                // Handle success (e.g., save token, redirect)
                if (data) {
                    alert('You have successfully Subscribed to our Newsletter');
                    console.log('Subscription successful', data);
                    //form.reset();
                }
                else {
                    alert(`User with this ${email} have already subscribed to our news latter`);
                    console.log('User with this email already exist');
                }
            } catch (err) {
                setError(err.message,"Subscription failed");
            }
        }
    return (
        <div className='bg-black text-white p-10'>
            <footer className="footer text-base-content p-10 ">
                <div className="grid grid-cols-12 gap-4 mb-5">
                    <div className='lg:col-span-3 md:col-span-6 sm:col-span-12 col-span-12'>
                        <h6 className="footer-title font-bold mb-5">Services</h6>
                        <a className="link link-hover">Learning & Skill Development</a><br />
                        <a className="link link-hover">Career Growth & Professional Networking</a><br />
                        <a className="link link-hover">Employment & Gig Economy Support</a><br />
                        <a className="link link-hover">Business & Consulting Services</a>
                    </div>
                    <div className='lg:col-span-3 md:col-span-6 sm:col-span-12 col-span-12'>
                        <h6 className="footer-title font-bold mb-5">Company</h6>
                        <a className="link link-hover">About us</a><br />
                        <a className="link link-hover">Contact</a><br />
                        <a className="link link-hover">Jobs</a><br />
                        {/* <a className="link link-hover">Press kit</a> */}
                    </div>
                    <div className='lg:col-span-3 md:col-span-6 sm:col-span-12 col-span-12'>
                        <h6 className="footer-title font-bold mb-5">Social</h6>
                        <div className="flex gap-4">
                            <a href='https://x.com/CareerNexusLtd'>
                                <X />
                            </a>
                            <a href='https://www.linkedin.com/company/career-nexus-ltd/'>
                                <Linkedin />
                            </a>
                            <a href='https://www.instagram.com/careernexus.ltd/'>
                               <Instagram />
                            </a>
                            <a href='https://web.facebook.com/profile.php?id=61573074954161'>
                               <Facebook/>
                            </a>
                        </div>
                    </div>
                    <form onSubmit={handleSubmit} className='lg:col-span-3 md:col-span-6 sm:col-span-12 col-span-12'>
                        {error && <p style={{ color: 'red' }}>{error}</p>}
                        <h6 className="footer-title font-bold mb-5">Newsletter</h6>
                        <div className="form-control">
                            <label className="label my-5">
                                <span className="label-text">Enter your email address</span>
                            </label>
                            <div className="mt-4 flex w-2/5 -ml-10">
                                <input
                                    type="email"
                                    value={email} onChange={(e) => setEmail(e.target.value)}
                                    placeholder="username@site.com"
                                    className="input input-bordered py-3 rounded-tl rounded-bl w-36 text-black" />
                                <button type='submit' className="bg-green-800 text-white p-3 rounded-tr rounded-br">Subscribe</button>
                            </div>
                        </div>
                    </form>
                </div>
                <hr />
                <div>
                    <p className="text-center text-sm mt-4">
                        Copyright &copy; {new Date().getFullYear()} Career-Nexus Ltd. All rights reserved.
                    </p>
                    <div className='flex justify-center my-5'>
                        <div className=" flex gap-4">
                            <a href='#' className="link link-hover">Terms & Conditions</a><br />
                            <a href='#' className="link link-hover">Privacy Policy</a><br />
                            <a href='#' className="link link-hover">Need Help?</a><br />
                            {/* <a href='#' className="link link-hover">Contact Us</a> */}
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    )
}

export default Footer