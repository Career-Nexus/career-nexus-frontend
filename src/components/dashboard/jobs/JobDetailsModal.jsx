import React from "react";
import { X, MapPin, Briefcase, Clock } from "lucide-react";
import { JobServices } from "../../../api/JobServices";
import { toast } from "react-toastify";
import logo3 from "../../../assets/images/job-marketing.svg"; 

export default function JobDetailsModal({ isOpen, onClose, job }) {
  const JobApplication = async () => {
    if (!job?.id) {
      toast.error("Invalid job information.");
      return;
    }

    const applicationData = {
      job: job.id,
    };

    try {
      const result = await JobServices.ApplyForJob(applicationData);

      if (result.success && result.data.application_status === "Success") {
        console.log("Application successful:", result.data);
        toast.success("Application submitted successfully!");
        onClose();
      } else {
        console.error("Application failed:", result.error);
        toast.error("Failed to submit application. Please try again.");
      }
    } catch (error) {
      console.error("Error applying for job:", error);
      toast.error("An unexpected error occurred. Please try again later.");
    }
  };

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) onClose();
  };

  if (!isOpen || !job) return null;

  // const requirements = [
  //   "5+ years of experience in UI/UX design",
  //   "Proficiency in Figma, Adobe Creative Suite",
  //   "Strong understanding of design systems",
  //   "Experience with user research methodologies",
  //   "Bachelor’s degree in Design or related field",
  // ];

  return (
    <div
      onClick={handleBackdropClick}
      className="fixed inset-0 bg-black/40 z-50 flex justify-center items-start md:items-center overflow-y-auto px-4 py-8 sm:py-12"
    >
      <div className="relative bg-white rounded-lg shadow-lg max-w-xl w-full p-6 animate-fadeIn max-h-[90vh] overflow-y-auto no-scrollbar">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
        >
          <X size={22} />
        </button>

        {/* Header */}
        <div className="flex items-start gap-4">
          <img
            // src={job.companyLogo}
            src={logo3}
            alt="Company Logo"
            className="w-12 h-12 rounded-lg object-cover"
          />
          <div>
            <h2 className="text-xl font-semibold text-gray-900">{job.title}</h2>
            <p className="text-sm text-gray-500">{job.organization}</p>
            <p className="text-[#5DA05D] text-xs mt-1">
              Posted {job.time_stamp}
            </p>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex gap-3 mt-4">
          <button
            onClick={JobApplication}
            className="bg-[#5DA05D] hover:bg-[#4c8f4c] text-white text-sm font-medium px-4 py-2 rounded-md"
          >
            Apply now
          </button>
          {/* <button className="border border-gray-300 text-gray-700 text-sm font-medium px-4 py-2 rounded-md hover:bg-gray-100">
            Save Job
          </button> */}
        </div>

        {/* Job Info Row */}
        <div className="flex flex-wrap gap-4 text-sm text-gray-600 mt-5 border-y border-gray-100 py-3">
          <div className="flex items-center gap-2">
            <MapPin size={16} /> {job.country}
          </div>
          <div className="flex items-center gap-2">
            <Briefcase size={16} /> {job.work_type}
          </div>
          <div className="flex items-center gap-2">
            <Clock size={16} /> {job.salary}
          </div>
        </div>

        {/* Job Description */}
        <section className="mt-5">
          <h3 className="font-semibold text-gray-800 mb-1">Job Description</h3>
          <p className="text-sm text-gray-700 leading-relaxed">
            {job.description}
          </p>
        </section>

        {/* Requirements */}
        {/* <section className="mt-5">
          <h3 className="font-semibold text-gray-800 mb-1">Requirements</h3>
          <ul className="text-sm text-gray-700 list-disc list-inside space-y-1">
            {requirements.map((req, i) => (
              <li key={i}>{req}</li>
            ))}
          </ul>
        </section>*/}

        {/* Job Overview */}
        <section className="mt-5">
          <h3 className="font-semibold text-gray-800 mb-1">Job Overview</h3>
          <p className="text-sm text-gray-700 leading-relaxed">
            {job.overview}
          </p>
        </section>

        {/* Application Deadline */}
        <section className="mt-5">
          <h3 className="font-semibold text-gray-800 mb-1">
            Application Deadline
          </h3>
          <p className="text-red-600 text-sm">{job.deadline}</p>
        </section>

        {/* Bottom Buttons */}
        <div className="flex flex-col gap-3 mt-6">
          <button
            onClick={JobApplication}
            className="bg-[#5DA05D] hover:bg-[#4c8f4c] text-white text-sm font-medium py-2 rounded-md"
          >
            Apply for this Position
          </button>
          {/* <button className="border border-gray-300 text-gray-700 text-sm font-medium py-2 rounded-md hover:bg-gray-100">
            View Similar Jobs
          </button> */}
        </div>
      </div>
    </div>
  );
}

