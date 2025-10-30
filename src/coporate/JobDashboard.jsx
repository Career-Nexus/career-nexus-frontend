import React, { useState } from "react";
import { MapPin, Clock, Calendar, DollarSign, Briefcase } from "lucide-react";

// === SAMPLE JOB DATA ===
const jobs = [
  {
    id: 1,
    title: "Senior UI/UX Designer",
    location: "Lagos, Nigeria",
    type: "Full-time",
    salary: "$60k-80k",
    views: 124,
    applicants: 31,
    posted: "1 week ago",
    status: "active",
  },
  {
    id: 2,
    title: "Project Manager",
    location: "Lagos, Nigeria",
    type: "Full-time",
    salary: "$60k-80k",
    views: 124,
    applicants: 31,
    posted: "3 mins ago",
    status: "active",
  },
  {
    id: 3,
    title: "Frontend Developer",
    location: "Lagos, Nigeria",
    type: "Full-time",
    salary: "$60k-80k",
    views: 124,
    applicants: 31,
    posted: "3 mins ago",
    status: "draft",
  },
  {
    id: 4,
    title: "Marketing Manager",
    location: "Lagos, Nigeria",
    type: "Full-time",
    salary: "$60k-80k",
    views: 124,
    applicants: 31,
    posted: "3 mins ago",
    status: "closed",
  },
];

// === SAMPLE APPLICANTS ===
const applicants = [
  { id: 1, name: "Adebayo Samuel", job: "Senior UI/UX Designer", match: 95 },
  { id: 2, name: "Funmi Kayode", job: "Frontend Developer", match: 89 },
  { id: 3, name: "Olu Johnson", job: "Project Manager", match: 92 },
];

// === JOB CARD ===
const JobCard = ({ job, activeTab }) => {
  // Determine button text and styles based on the tab
  let btnText = "Edit Job";
  let btnStyle =
    "border border-[#5DA05D] text-[#5DA05D] hover:bg-[#5DA05D] hover:text-white";

  if (activeTab === "draft") {
    btnText = "Review and Post";
  } else if (activeTab === "closed") {
    btnText = "Reopen and Post";
    
  }

  return (
    <div className="bg-white border rounded-lg p-5 flex flex-col justify-between shadow-sm hover:shadow-md transition">
      <div>
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-semibold text-gray-800 text-lg">{job.title}</h3>
          <p className="text-sm text-gray-400">Posted {job.posted}</p>
        </div>

        <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
          <div className="flex items-center gap-1">
            <MapPin className="w-4 h-4 text-purple-600" />
            {job.location}
          </div>
          <div className="flex items-center gap-1">
            <Clock className="w-4 h-4 text-purple-600" />
            {job.type}
          </div>
          <div className="text-gray-700 font-medium">{job.salary}</div>
        </div>
      </div>

      <div className="flex justify-between items-center mt-4">
        <div className="flex gap-6 text-center text-sm">
          <div>
            <p className="text-[#5DA05D] font-semibold">{job.views}</p>
            <p className="text-gray-500 text-xs">Views</p>
          </div>
          <div>
            <p className="text-[#5DA05D] font-semibold">{job.applicants}</p>
            <p className="text-gray-500 text-xs">Applicants</p>
          </div>
        </div>
        <button
          className={`${btnStyle} px-4 py-1 rounded-md transition text-sm`}
        >
          {btnText}
        </button>
      </div>
    </div>
  );
};


// === JOB FORM ===
const PostJobForm = () => (
  <div className="bg-white p-8 rounded-lg shadow">
    <h2 className="text-lg font-semibold mb-2">Post A New Job</h2>
    <p className="text-gray-500 mb-6">
      Fill out the details below to attract the best candidates for your position.
    </p>

    <form className="space-y-4">
      <div>
        <label className="block text-sm font-medium mb-1">Job Title*</label>
        <input
          type="text"
          placeholder="e.g. Senior UI/UX Designer"
          className="w-full border border-gray-200 bg-[#FAFAFA] rounded-md p-2 focus:outline-[#5DA05D]"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Experience Level*</label>
        <select className="w-full border border-gray-200 bg-[#FAFAFA] rounded-md p-2 focus:outline-[#5DA05D]">
          <option>Select Level</option>
          <option>Junior</option>
          <option>Mid-level</option>
          <option>Senior</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Job Description*</label>
        <textarea
          rows="4"
          placeholder="Provide a detailed description..."
          className="w-full border border-gray-200 bg-[#FAFAFA] rounded-md p-2 focus:outline-[#5DA05D]"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Requirements</label>
        <textarea
          rows="3"
          placeholder="List key qualifications and skills..."
          className="w-full border border-gray-200 bg-[#FAFAFA] rounded-md p-2 focus:outline-[#5DA05D]"
        />
      </div>

      {/* Location + Work Type + Employment Type */}
      <div className="grid grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1">Location*</label>
          <input
            type="text"
            placeholder="e.g. New York, NY"
            className="w-full border border-gray-200 bg-[#FAFAFA] rounded-md p-2 focus:outline-[#5DA05D]"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Work Type</label>
          <select className="w-full border border-gray-200 bg-[#FAFAFA] rounded-md p-2 focus:outline-[#5DA05D]">
            <option>Remote</option>
            <option>On-site</option>
            <option>Hybrid</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Employment Type</label>
          <select className="w-full border border-gray-200 bg-[#FAFAFA] rounded-md p-2 focus:outline-[#5DA05D]">
            <option>Full-time</option>
            <option>Part-time</option>
            <option>Contract</option>
          </select>
        </div>
      </div>

      {/* Salary Range */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1">Minimum Salary</label>
          <input
            type="number"
            placeholder="8000"
            className="w-full border border-gray-200 bg-[#FAFAFA] rounded-md p-2 focus:outline-[#5DA05D]"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Maximum Salary</label>
          <input
            type="number"
            placeholder="120000"
            className="w-full border border-gray-200 bg-[#FAFAFA] rounded-md p-2 focus:outline-[#5DA05D]"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Application Deadline</label>
        <input type="date" className="w-full border border-gray-200 bg-[#FAFAFA] rounded-md p-2 focus:outline-[#5DA05D]" />
      </div>

      <div className="flex gap-3 justify-end pt-4">
        <button
          type="button"
          className="border border-[#5DA05D] text-[#5DA05D] px-4 py-1 rounded-md hover:bg-green-50"
        >
          Save Draft
        </button>
        <button
          type="submit"
          className="bg-[#5DA05D] text-white px-4 py-1 rounded-md hover:bg-[#5DA05D]"
        >
          Post Job
        </button>
      </div>
    </form>
  </div>
);

// === APPLICANTS LIST ===
const ApplicantsList = () => (
  <div className="bg-white p-6 rounded-lg shadow">
    <h2 className="text-lg font-semibold mb-4">Recent Applications</h2>
    <div className="space-y-3">
      {applicants.map((app) => (
        <div
          key={app.id}
          className="flex justify-between items-center border p-3 rounded-md hover:shadow-sm transition"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-600 font-semibold">
              {app.name.charAt(0)}
            </div>
            <div>
              <p className="font-medium">{app.name}</p>
              <p className="text-sm text-gray-500">Applied for {app.job}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-[#5DA05D] font-semibold">{app.match}% match</span>
            <button className="bg-[#5DA05D] text-white px-3 py-1 rounded-md hover:bg-[#5DA05D] text-sm">
              Review
            </button>
          </div>
        </div>
      ))}
    </div>
  </div>
);

// === MAIN DASHBOARD ===
export default function JobDashboard() {
  const [activeView, setActiveView] = useState("manage"); // manage | post | applicants
  const [activeTab, setActiveTab] = useState("active");

  const filteredJobs = jobs.filter((job) => job.status === activeTab);
  const tabClasses = (tab) =>
    `flex-1 py-2 text-center rounded-md font-medium text-sm transition ${
      activeTab === tab
        ? "bg-white text-[#5DA05D] shadow-sm"
        : "text-gray-500 hover:text-[#5DA05D]"
    }`;

  return (
    <div className="min-h-screen bg-gray-50 p-6 w-[80%] mx-auto">
      <div className="flex gap-8">
        {/* === SIDEBAR === */}
        <aside className="w-56">
          <button
            onClick={() => setActiveView("post")}
            className="w-full bg-[#5DA05D] text-white py-2 rounded-md mb-4 hover:bg-[#5DA05D] transition"
          >
            Post New Job
          </button>

          <div className="border rounded-md bg-white">
            <ul>
              <li
                onClick={() => setActiveView("applicants")}
                className={`px-4 py-2 text-gray-700 hover:bg-gray-50 cursor-pointer ${
                  activeView === "applicants" ? "bg-green-50" : ""
                }`}
              >
                Job analytics
              </li>
              <li
                onClick={() => setActiveView("manage")}
                className={`px-4 py-2 text-gray-700 hover:bg-gray-50 cursor-pointer ${
                  activeView === "manage" ? "bg-green-50" : ""
                }`}
              >
                Manage Jobs
              </li>
            </ul>
          </div>
        </aside>

        {/* === MAIN CONTENT === */}
        <main className="flex-1">
          {activeView === "post" && <PostJobForm />}
          {activeView === "manage" && (
            <>
              <div className="flex bg-gray-100 rounded-md mb-6">
                <button onClick={() => setActiveTab("active")} className={tabClasses("active")}>
                  ACTIVE JOBS
                </button>
                <button onClick={() => setActiveTab("draft")} className={tabClasses("draft")}>
                  DRAFT JOBS
                </button>
                <button onClick={() => setActiveTab("closed")} className={tabClasses("closed")}>
                  CLOSED
                </button>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6">
                {filteredJobs.map((job) => (
                  <JobCard key={job.id} job={job} activeTab={activeTab} />
                ))}
              </div>
            </>
          )}
          {activeView === "applicants" && <ApplicantsList />}
        </main>
      </div>
    </div>
  );
}
