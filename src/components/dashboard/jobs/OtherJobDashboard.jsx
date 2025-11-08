import React, { useState, useEffect } from "react";
import { JobServices } from "../../../api/JobServices";
import { OtherJobs } from "./UsersJob";
import JobAnalysis from "./JobAnalysis";


export default function JobsDashboard() {
  const [savedJobs, setSavedJobs] = useState([]);

  const getSavedJobs = async () => {
    const { data } = await JobServices.GetSavedJobs();
    if (data) {
      const formatted = data.map(item => item.job);
      setSavedJobs(formatted);
    }
  };

  useEffect(() => {
    getSavedJobs();
  }, []);

  return (
    <div className="container mx-auto">
      {/* Job analytics on top */}
      <JobAnalysis savedJobsCount={savedJobs.length} />

      {/* Saved jobs list below */}
      <OtherJobs
        savedJobs={savedJobs}
        setSavedJobs={setSavedJobs}
      />
    </div>
  );
}
