import React, { useEffect, useState } from "react";
import { JobServices } from "../../api/JobServices";
import { X } from "lucide-react";

const ApplicantsListModal = ({ jobId, onClose }) => {
  const [applicantList, setApplicantList] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (jobId) fetchApplicants(jobId);
  }, [jobId]);

  const fetchApplicants = async (id) => {
    setLoading(true);
    try {
      const response = await JobServices.GetRecentApplicants(id);
      const applicants = response.data.results?.map(item => item.applicant) || [];
      setApplicantList(applicants);
    } catch (error) {
      console.error("Error fetching applicants:", error);
    } finally {
      setLoading(false);
    }
  };
  const handeleClickOutside = (e) => {
    if (e.target.id === "modalBackdrop") {
      onClose()
    }
  }
  return (
    <div onClick={handeleClickOutside} id="modalBackdrop" className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
      <div className="bg-white w-full max-w-md md:max-w-2xl rounded-lg shadow-lg overflow-hidden flex flex-col">
        {/* Header */}
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-lg font-semibold text-gray-800">Applicants</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-4 max-h-[70vh]">
          {loading ? (
            <p className="text-center text-gray-500 py-6">Loading applicants...</p>
          ) : applicantList.length === 0 ? (
            <p className="text-center text-gray-500 py-6">No applicants yet.</p>
          ) : (
            <div className="space-y-3">
              {applicantList.map((app) => (
                <ApplicantCard key={app.id} applicantData={app} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};


// Inline ApplicantCard component
const ApplicantCard = ({ applicantData }) => {
  // const applicant = applicantData?.applicant || {};
  const applicant = applicantData || {};

  return (
    <div className="flex justify-between items-center border p-3 rounded-md hover:shadow-md transition bg-white">
      <div className="flex items-center gap-3">
        {/* Profile Photo */}
        {applicant?.profile_photo ? (
          <img
            src={applicant?.profile_photo}
            alt={`${applicant?.first_name} ${applicant?.last_name}`}
            className="w-10 h-10 rounded-full object-cover"
          />
        ) : (
          <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-600 font-semibold">
            {applicant?.first_name ? applicant?.first_name.charAt(0).toUpperCase() : "?"}
          </div>
        )}

        {/* Info */}
        <div>
          <p className="font-medium text-gray-800">
            {applicant?.first_name} {applicant?.last_name} {applicant?.middle_name || ""}
          </p>
          <p className="text-sm text-gray-500">
            {applicant?.qualification || "Qualification not available"}
          </p>
        </div>
      </div>

      {/* Resume Link */}
      <a
        href={applicant?.resume}
        target="_blank"
        rel="noopener noreferrer"
        className="bg-[#5DA05D] text-white px-3 py-1 rounded-md hover:bg-[#4c8c4c] text-sm"
      >
        View Resume
      </a>
    </div>
  );
};

export default ApplicantsListModal;