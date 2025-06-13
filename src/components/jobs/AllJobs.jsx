'use client'
import React, { useEffect, useState } from "react"
import emojiBriefcase from "../../assets/icons/emoji-briefcase.svg"
import Locate from "../../assets/icons/map-pin.svg"
import Jobs from "../../assets/icons/briefcase.svg";
import Building from "../../assets/icons/building.svg";
import logo from "../../assets/images/job-uiux.svg";
import logo1 from "../../assets/images/job-projectmgr.svg";
import logo2 from "../../assets/images/job-frontend.svg";
import logo3 from "../../assets/images/job-marketing.svg";
import logo4 from "../../assets/images/job-data-science.svg";
import logo5 from "../../assets/images/job-senior-uiux.svg";
import { Link, useNavigate } from "react-router-dom";
import { JobServices } from "../../api/JobServices";
const AllJobs = () => {
    const [alljob, setAlljob]=useState([]);
    const [loading, setLoading]=useState(true);
    const navigate = useNavigate();
    
    useEffect(()=>{
        const userJobs=async () => {
            const result = await JobServices.GetUsersJobs();
            console.log(result.results);
            setAlljob(result.results);
            navigate('/jobs')
        }
        userJobs();
    },[])
    const jobs = [
        {
            companyLogo: <img src={logo} alt="ui/ux" className="w-10 h-10 " />,
            companyName: "Instagram",
            jobTitle: "Senior UI/UX Designer",
            time: "Posted 3mins ago",
            location: "America",
            workType: "Hybrid",
            schedule: "Part-time",
            salaryRange: "$80k-$120k"
        },
        {
            companyLogo: <img src={logo1} className="w-10 h-10 " />,
            companyName: "StartupXYZ",
            jobTitle: "Project Manager",
            time: "Posted 2mins ago",
            location: "America",
            workType: "Hybrid",
            schedule: "Part-time",
            salaryRange: "$80k-$120k"
        },
        {
            companyLogo: <img src={logo2} className="w-10 h-10 " />,
            companyName: "WebAgency",
            jobTitle: "Frontend Developer",
            time: "Posted 4mins ago",
            location: "America",
            workType: "Hybrid",
            schedule: "Part-time",
            salaryRange: "$80k-$120k"
        },
        {
            companyLogo: <img src={logo3} className="w-10 h-10 " />,
            companyName: "Instagram",
            jobTitle: "Marketing Manager",
            time: "Posted 3mins ago",
            location: "America",
            workType: "Hybrid",
            schedule: "Part-time",
            salaryRange: "$80k-$120k"
        },
        {
            companyLogo: <img src={logo4} className="w-10 h-10 " />,
            companyName: "Instagram",
            jobTitle: "Data Scientist",
            time: "Posted 5mins ago",
            location: "America",
            workType: "Hybrid",
            schedule: "Part-time",
            salaryRange: "$80k-$120k"
        },
        {
            companyLogo: <img src={logo5} className="w-10 h-10 " />,
            companyName: "Instagram",
            jobTitle: "Senior UI/UX Designer",
            time: "Posted 3mins ago",
            location: "America",
            workType: "Hybrid",
            schedule: "Part-time",
            salaryRange: "$80k-$120k"
        }
    ];
// if (loading) return <p>Loading...</p>;
    return (
        <div>
            <div className="inset-0 flex items-center justify-center z-50 mb-2">
                {/* <div className="bg-gradient-to-r from-[#131927E5] to-[#5DA05D] text-white p-6 rounded-lg shadow-lg max-w-3xl w-full"> */}
                <div className="bg-gradient-to-r from-[#5DA05D] to-[#5DA05D] text-white p-4 mx-4 rounded-lg max-w-6xl w-full">
                    <div className='flex items-center justify-between'>
                        <p className="text-sm">
                            <div className="flex gap-2">
                                <img src={emojiBriefcase} alt="brief case" />
                                <h2 className="text-xl font-bold">Get better results — set your preferences.</h2>
                            </div>
                            Personalize your job feed to see more relevant opportunities.
                        </p>
                        <Link to={'/personalize'} className='bg-white p-2 rounded-lg text-[#5DA05D] text-center w-40 hover:bg-[#2b5b2b] hover:text-white'>Set now</Link>
                    </div>
                </div>
            </div>
            {alljob.length > 0 &&(
            <div className="container mx-auto p-4">
                <div className="grid grid-cols-2 gap-4">
                    {alljob.map((job, index) => (
                        // <JobCard key={index} {...job} />
                        <div key={index} className="bg-white rounded-lg shadow p-4 mb-4">
                            <div className="flex items-center justify-between">
                                <div className="flex gap-3">
                                    <p>{job.companyLogo}</p>
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
                                    <span>{job.employment_type}</span>
                                </span>
                                <span className="mr-2 flex gap-2">
                                    <img src={Jobs} alt="building" className="text-gray-500 w-4 h-4" />
                                    <span>{job.schedule}</span>
                                </span>
                                <div className="text-gray-700 text-xs">💰 {job.salary}</div>
                            </div>
                            <div className="flex space-x-2 justify-between mt-8">
                                <span></span>
                                <div className="flex gap-2">
                                    <button className="bg-[#5DA05D] text-white px-4 py-1 rounded-lg hover:bg-[#5DA05D]">Apply now</button>
                                    <button className="border border-[#5DA05D] px-4 py-1 rounded-lg text-[#5DA05D]">Save Job</button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            )}
            <hr />
            <div className="flex">
                <h2 className="mx-auto p-2">Other Jobs</h2>
            </div>
            <div className="container mx-auto p-4">
                <div className="grid grid-cols-2 gap-4">
                    {jobs.map((job, index) => (
                        // <JobCard key={index} {...job} />
                        <div key={index} className="bg-white rounded-lg shadow p-4 mb-4">
                            <div className="flex items-center justify-between">
                                <div className="flex gap-3">
                                    <p>{job.companyLogo}</p>
                                    <div className="ml-2">
                                        <h3 className="text-lg font-semibold">{job.jobTitle}</h3>
                                        <p className="text-[#5DA05D] text-sm">{job.companyName}</p>
                                    </div>
                                </div>
                                <span className="text-xs">{job.time}</span>
                            </div>
                            <div className="flex text-gray-500 text-xs mb-2 my-8 items-center justify-between">
                                <span className="mr-2 flex gap-2">
                                    <img src={Locate} alt="location" className="text-gray-500 w-4 h-4" />
                                    <span>{job.location}</span>
                                </span>
                                <span className="mr-2 flex gap-2">
                                    <img src={Building} alt="building" className="text-gray-500 w-4 h-4" />
                                    <span>{job.workType}</span>
                                </span>
                                <span className="mr-2 flex gap-2">
                                    <img src={Jobs} alt="building" className="text-gray-500 w-4 h-4" />
                                    <span>{job.schedule}</span>
                                </span>
                                <div className="text-gray-700 text-xs">💰 {job.salaryRange}</div>
                            </div>
                            <div className="flex space-x-2 justify-between mt-8">
                                <span></span>
                                <div className="flex gap-2">
                                    <button className="bg-[#5DA05D] text-white px-4 py-1 rounded-lg hover:bg-[#5DA05D]">Apply now</button>
                                    <button className="border border-[#5DA05D] px-4 py-1 rounded-lg text-[#5DA05D]">Save Job</button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};
export default AllJobs