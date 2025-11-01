'use client'
import React, { useEffect, useState } from "react"
// import emojiBriefcase from "../../assets/icons/emoji-briefcase.svg"
import emojiBriefcase from "../../../assets/icons/emoji-briefcase.svg"
import Locate from "../../../assets/icons/map-pin.svg"
import Jobs from "../../../assets/icons/briefcase.svg";
import Building from "../../../assets/icons/building.svg";
import logo3 from "../../../assets/images/job-marketing.svg";
import { Link, useNavigate } from "react-router-dom";
import { JobServices } from "../../../api/JobServices";
import FloatingMessageIcon from "../chat/FloatingMessage";
import { Box, Spinner } from "@chakra-ui/react";
import JobDetailsModal from "./JobDetailsModal";

export const JobCard = ({ hideCard }) => {
    if (hideCard) return null;
    return (
        <div className="inset-0 flex items-center z-50 mb-2 ml-4">
            <div className="relative bg-gradient-to-r from-[#5DA05D] to-[#5DA05D] text-white px-4 py-4 rounded-lg shadow-lg max-w-3xl w-full overflow-hidden">
                <div className="absolute w-72 h-14 bg-gradient-to-tl from-white/5 via-white/40 to-transparent rounded-full -rotate-45 bottom-6 top-6 right-16 pointer-events-none transform origin-bottom"></div>
                <div className="relative z-10">
                    <div className='flex items-center justify-between'>
                        <p className="text-sm">
                            <div className="flex gap-2">
                                <img src={emojiBriefcase} alt="brief case" />
                                <h2 className="text-xl font-bold">Get better results — set your preferences.</h2>
                            </div>
                            Personalize your job feed to see more relevant opportunities.
                        </p>
                        <Link to={'/personalize'} className="bg-white p-2 rounded-lg text-[#5DA05D] text-center w-40">Set now</Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

const AllJobs = () => {
    const [alljob, setAlljob] = useState([]);
    const [prefered, setPrefered] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedJob, setSelectedJob] = useState(null);
    const navigate = useNavigate();

    const fetchData = async () => {
        try {
            // Fetch user jobs
            const {data} = await JobServices.GetUsersJobs();
            const isArray = Array.isArray(data?.results) ? data.results : [];
            console.log("User jobs:", isArray);
            setAlljob(isArray);

            // Fetch preferred job to check preference_set
            const preferedResult = await JobServices.GetPreferedJob();
            console.log("Preferred job:", preferedResult);
            setPrefered(preferedResult);

            navigate('/jobs');
        } catch (error) {
            console.log("Error fetching data", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    if (loading) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" height="200px">
                <Spinner size="lg" color="#5DA05D" thickness="4px" />
            </Box>
        );
    }
console.log("All jobs:", alljob);
    return (
        <div>
            <JobCard hideCard={prefered?.preference_set} />
            {alljob.length === 0 ? (
                <div className="container mx-auto p-4">
                    <p className="text-gray-500">No job listings available</p>
                </div>
            ) : (
                <div className="container mx-auto p-4">
                    <div className="grid md:grid-cols-2 grid-cols-1 gap-4">
                        {alljob.map((job, index) => (
                            <div key={index} className="bg-white rounded-lg shadow p-4 mb-4">
                                <div className="flex items-center justify-between">
                                    <div className="flex gap-3">
                                        <p><img src={logo3} className="w-10 h-10" /></p>
                                        <div className="ml-2">
                                            <h3 className="text-lg font-semibold">{job.title}</h3>
                                            <p className="text-[#5DA05D] text-sm">{job.organization}</p>
                                        </div>
                                    </div>
                                    <span className="text-xs">{job.time}</span>
                                </div>
                                <div className="flex text-gray-500 text-xs mb-2 my-8 items-center justify-between">
                                    <span className="mr-2 flex gap-2">
                                        <img src={Locate} alt="location" className="text-gray-500 w-4 h-4" />
                                        <span>{job.country}</span>
                                    </span>
                                    <span className="mr-2 flex gap-2">
                                        <img src={Building} alt="building" className="text-gray-500 w-4 h-4" />
                                        <span>{job.work_type}</span>
                                    </span>
                                    <span className="mr-2 flex gap-2">
                                        <img src={Jobs} alt="building" className="text-gray-500 w-4 h-4" />
                                        <span>{job.employment_type}</span>
                                    </span>
                                    <div className="text-gray-700 text-xs">💰 {job.salary}</div>
                                </div>
                                <div className="flex space-x-2 justify-between mt-8">
                                    <span></span>
                                    <div className="flex gap-2">
                                        <button onClick={() => { setIsModalOpen(true); setSelectedJob(job); }} className="bg-[#5DA05D] text-white px-4 py-1 rounded-lg hover:bg-[#2b5b2b]">Apply now</button>
                                        <button className="border border-[#5DA05D] px-4 py-1 rounded-lg text-[#5DA05D]">Save Job</button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    <JobDetailsModal 
                        isOpen={isModalOpen}
                        onClose={() => setIsModalOpen(false)}
                        job={selectedJob}
                    />
                </div>
            )}
            <div>
                <FloatingMessageIcon />
            </div>
        </div>
    );
};

export default AllJobs;


// import React from 'react'

// function AllJobs() {
//     return (
//         <div className='text-center flex flex-col items-center'>
//             <img src='/images/coming-soon.png' alt='Coming Soon' className='max-h-[350px]' />
//             <div className='mt-8'>
//                 <h2 className='text-lg font-semibold'>This Feature is on the Way</h2>
//                 <p>We’re working hard to bring this to you soon. Stay tuned!</p>
//             </div>
//         </div>
//     )
// }

// export default AllJobs