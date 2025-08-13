import React, { useState } from 'react'

import logo from "../../../assets/images/job-uiux.svg";
import logo1 from "../../../assets/images/job-projectmgr.svg";
import logo2 from "../../../assets/images/job-frontend.svg";
import logo3 from "../../../assets/images/job-marketing.svg";
import logo4 from "../../../assets/images/job-data-science.svg";
import logo5 from "../../../assets/images/job-senior-uiux.svg";
import Locate from "../../../assets/icons/map-pin.svg"
import Jobs from "../../../assets/icons/briefcase.svg";
import Building from "../../../assets/icons/building.svg";


function UserJobs() {

  const [activeTab, setActiveTab] = useState('applied')

  // const MentorContent = () => (
  //   <div className="flex items-center justify-center bg-white aspect-[7.8/8]">
  //     <MentorAccountForm/>
  //   </div>
  // )

  // const LearnerContent = () => (
  //   // <div className="flex items-center justify-center bg-white aspect-[7.8/6]">
  //   <div className="flex items-center justify-center bg-white aspect-[7.8/8]">
  //     <CreateAccountForm />
  //   </div>
  // )

  return (
    <div className="min-h-screen bg-white">
      <div className="grid grid-cols-12 bg-white">
        {/* Right Column */}
        <div className="col-span-12 bg-white">
          <h1 className="text-2xl font-bold mb-3 text-[#3a1c64]">
            My Jobs
          </h1>
          <div className="flex bg-gray-100 p-1 rounded-lg mb-4 w-2/5">
            <button
              type="button"
              className={`w-full px-6 py-2 text-sm font-medium rounded-lg ${activeTab === 'applied' ? 'bg-white shadow' : 'bg-gray-100 text-gray-500'}`}
              onClick={() => setActiveTab('applied')}
            >
              APPLIED JOBS
            </button>
            <button
              type="button"
              className={`w-full px-6 py-2 text-sm font-medium rounded-lg ${activeTab === 'saved' ? 'bg-white shadow' : 'bg-gray-100 text-gray-500'}`}
              onClick={() => setActiveTab('saved')}
            >
              SAVED JOBS
            </button>
          </div>
          {activeTab === 'applied' ? <OtherJobs /> : <OtherJobs />}
        </div>
      </div>
    </div>
  )
}



export default UserJobs

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
export let OtherJobs = () => {
  return (
    <div>
      <div className="container mx-auto">
        <div className="grid md:grid-cols-2 grid-cols-1 gap-4">
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
  )
}