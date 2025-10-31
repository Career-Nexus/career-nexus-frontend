import React, { useEffect, useState } from "react";
import { MapPin, Clock, Calendar, DollarSign, Briefcase } from "lucide-react";
import { JobServices } from "../api/JobServices";
import { toast } from "react-toastify";

// === SAMPLE JOB DATA ===
// const jobs = [
//   {
//     id: 1,
//     title: "Senior UI/UX Designer",
//     location: "Lagos, Nigeria",
//     type: "Full-time",
//     salary: "$60k-80k",
//     views: 124,
//     applicants: 31,
//     posted: "1 week ago",
//     status: "active",
//   },
//   {
//     id: 2,
//     title: "Project Manager",
//     location: "Lagos, Nigeria",
//     type: "Full-time",
//     salary: "$60k-80k",
//     views: 124,
//     applicants: 31,
//     posted: "3 mins ago",
//     status: "active",
//   },
//   {
//     id: 3,
//     title: "Frontend Developer",
//     location: "Lagos, Nigeria",
//     type: "Full-time",
//     salary: "$60k-80k",
//     views: 124,
//     applicants: 31,
//     posted: "3 mins ago",
//     status: "draft",
//   },
//   {
//     id: 4,
//     title: "Marketing Manager",
//     location: "Lagos, Nigeria",
//     type: "Full-time",
//     salary: "$60k-80k",
//     views: 124,
//     applicants: 31,
//     posted: "3 mins ago",
//     status: "closed",
//   },
// ];

// === SAMPLE APPLICANTS ===
const applicants = [
  { id: 1, name: "Adebayo Samuel", job: "Senior UI/UX Designer", match: 95 },
  { id: 2, name: "Funmi Kayode", job: "Frontend Developer", match: 89 },
  { id: 3, name: "Olu Johnson", job: "Project Manager", match: 92 },
];

// === JOB CARD ===
const JobCard = ({ job, activeTab }) => {
  const updateJobStatus = async (jobId, status) => {
    try {
      const response = await JobServices.UpdateJobStatus(jobId, status);
      if (response.success) {
        if (status === 'closed') {
          toast.success("Job closed successfully!");
        } else {
          toast.success("Job reopened successfully!");
        }
        //refresh the page or update state to reflect changes
        window.location.reload();
      } else {
        toast.error("Failed to close job.");
      }
    } catch (error) {
      toast.error("An error occurred while closing job.");
    }
  };

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
          <p className="text-sm text-gray-400">Posted {job.time_stamp}</p>
        </div>

        <div className="flex items-center gap-6 text-sm text-gray-600 mb-3">
          <div className="flex items-center gap-1">
            <MapPin className="w-4 h-4 text-purple-600" />
            {job.country}
          </div>
          <div className="flex items-center gap-1">
            <Clock className="w-4 h-4 text-purple-600" />
            {job.employment_type}
          </div>
          <div className="text-gray-700 font-medium ml-auto">₦{job.salary}</div>
        </div>
      </div>
      <div>{job.overview}</div>
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

        <div className="flex gap-3">
          {activeTab !== 'closed' && <button onClick={() => updateJobStatus(job.id, 'closed')} className="px-4 py-1 rounded-md transition text-sm text-red-600 border border-red-600">
            close
          </button>}
          <button
            onClick={btnText === 'Reopen and Post' ? () => updateJobStatus(job.id, 'active') : null}
            className={`${btnStyle} px-4 py-1 rounded-md transition text-sm`}
          >
            {btnText}
          </button>
        </div>
      </div>
    </div>
  );
};


// === JOB FORM ===
const PostJobForm = () => {
  const [formData, setFormData] = useState({
    title: "",
    organization: "",
    experience_level: "",
    description: "",
    overview: "",
    country: "",
    salary: "",
    work_type: "",
    employment_type: "",
    status: "active || draft",
  });

  const createAJob = async () => {
    try {
      const response = await JobServices.CreateJob(formData);
      if (response.data) {
        console.log("Job created successfully:", response.data);
        toast.success("Job created successfully!");
      }
      // Reset form after submission
      setFormData({
        title: "",
        organization: "",
        experience_level: "",
        description: "",
        overview: "",
        country: "",
        city: "",
        salary: "",
        work_type: "",
        employment_type: "",
        status: "active || draft",
      });
    } catch (error) {
      console.error("Error creating job:", error);
    }
  };
  return (
    <div>
      <div className="bg-white p-8 rounded-lg shadow">
        <h2 className="text-lg font-semibold mb-2">Post A New Job</h2>
        <p className="text-gray-500 mb-6">
          Fill out the details below to attract the best candidates for your position.
        </p>

        <form
          className="space-y-4"
          onSubmit={(e) => {
            e.preventDefault();
            createAJob();
          }}
        >
          <div>
            <label className="block text-sm font-medium mb-1">Job Title*</label>
            <input
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              type="text"
              placeholder="e.g. Senior UI/UX Designer"
              className="w-full border border-gray-200 bg-[#FAFAFA] rounded-md p-2 focus:outline-[#5DA05D]"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Organization*</label>
            <input
              value={formData.organization}
              onChange={(e) => setFormData({ ...formData, organization: e.target.value })}
              type="text"
              placeholder="e.g. Acme Corp"
              className="w-full border border-gray-200 bg-[#FAFAFA] rounded-md p-2 focus:outline-[#5DA05D]"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Experience Level*</label>
            <select
              value={formData.experience_level}
              onChange={(e) => setFormData({ ...formData, experience_level: e.target.value })}
              className="w-full border border-gray-200 bg-[#FAFAFA] rounded-md p-2 focus:outline-[#5DA05D]"
            >
              <option>Select Level</option>
              <option value="entry">Entry</option>
              <option value="mid">Mid-level</option>
              <option value="senior">Senior</option>
              <option value="executive">Executive</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Job Description*</label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              rows="4"
              placeholder="Provide a detailed description..."
              className="w-full border border-gray-200 bg-[#FAFAFA] rounded-md p-2 focus:outline-[#5DA05D]"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Requirements</label>
            <textarea
              value={formData.overview}
              onChange={(e) => setFormData({ ...formData, overview: e.target.value })}
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
                value={formData.country}
                onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                type="text"
                placeholder="e.g. New York, NY"
                className="w-full border border-gray-200 bg-[#FAFAFA] rounded-md p-2 focus:outline-[#5DA05D]"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Work Type</label>
              <select
                value={formData.work_type}
                onChange={(e) => setFormData({ ...formData, work_type: e.target.value })}
                className="w-full border border-gray-200 bg-[#FAFAFA] rounded-md p-2 focus:outline-[#5DA05D]"
              >
                <option>Select Work Type</option>
                <option value="remote">Remote</option>
                <option value="onsite">On-site</option>
                <option value="hybrid">Hybrid</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Employment Type</label>
              <select
                value={formData.employment_type}
                onChange={(e) => setFormData({ ...formData, employment_type: e.target.value })}
                className="w-full border border-gray-200 bg-[#FAFAFA] rounded-md p-2 focus:outline-[#5DA05D]"
              >
                <option>Select Employment Type</option>
                <option value="full_time">Full-time</option>
                <option value="part_time">Part-time</option>
                <option value="internship">Internship</option>
                <option value="freelance">Freelance</option>
                <option value="contract">Contract</option>
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
                value={formData.salary}
                onChange={(e) => setFormData({ ...formData, salary: e.target.value })}
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
              onClick={() => { setFormData({ ...formData, status: "draft" }); }}
              type="submit"
              className="border border-[#5DA05D] text-[#5DA05D] px-4 py-1 rounded-md hover:bg-green-50"
            >
              Save Draft
            </button>
            <button
              onClick={() => { setFormData({ ...formData, status: "active" }); }}
              type="submit"
              className="bg-[#5DA05D] text-white px-4 py-1 rounded-md hover:bg-[#5DA05D]"
            >
              Post Job
            </button>
          </div>
        </form>
      </div>
    </div>
  )
};

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
  const [jobs, setJobs] = useState([]);

  const FetchJobs = async (status = "active") => {
    try {
      const response = await JobServices.GetJobs({ status });
      const array = Array.isArray(response.data) ? response.data : [];
      setJobs(array);
    } catch (error) {
      console.error("Error fetching jobs:", error);
    }
  };
  useEffect(() => {
    FetchJobs();
  }, []);

  // const filteredJobs = jobs.filter((job) => job.status === activeTab);
  const filteredJobs = jobs;
  const tabClasses = (tab) =>
    `flex-1 py-2 text-center rounded-md font-medium text-sm transition ${activeTab === tab
      ? "bg-white text-green-700 shadow-sm"
      : "text-gray-500 hover:text-green-600"
    }`;

  return (
    <div className="min-h-screen p-6 w-[80%] mx-auto">
      <div className="flex md:flex-row flex-col gap-8">
        {/* === SIDEBAR === */}
        <aside className="md:w-56 w-full">
          <button
            onClick={() => setActiveView("post")}
            className="w-full bg-[#5DA05D] text-white py-2 rounded-md mb-4 hover:bg-[#5DA05D] transition"
          >
            Post New Job
          </button>

          <div className="border rounded-md bg-white">
            <ul className="flex flex-row md:flex-col w-full justify-evenly">
              <li
                onClick={() => setActiveView("applicants")}
                className={`px-4 py-2 text-gray-700 hover:bg-gray-50 cursor-pointer ${activeView === "applicants" ? "bg-green-50" : ""
                  }`}
              >
                Job analytics
              </li>
              <li
                onClick={() => setActiveView("manage")}
                className={`px-4 py-2 text-gray-700 hover:bg-gray-50 cursor-pointer ${activeView === "manage" ? "bg-green-50" : ""
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
                {/* <button onClick={() => setActiveTab("active")} className={tabClasses("active")}>
                  ACTIVE JOBS
                </button>
                <button onClick={() => setActiveTab("draft")} className={tabClasses("draft")}>
                  DRAFT JOBS
                </button>
                <button onClick={() => setActiveTab("closed")} className={tabClasses("closed")}>
                  CLOSED
                </button> */}
                <button onClick={() => { setActiveTab("active"); FetchJobs("active"); }} className={tabClasses("active")}>
                  ACTIVE JOBS
                </button>
                <button onClick={() => { setActiveTab("draft"); FetchJobs("draft"); }} className={tabClasses("draft")}>
                  DRAFT JOBS
                </button>
                <button onClick={() => { setActiveTab("closed"); FetchJobs("closed"); }} className={tabClasses("closed")}>
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
