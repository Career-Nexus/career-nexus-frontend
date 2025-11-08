import React, { useEffect, useState } from 'react'
import { Premium } from '../home/EventsHome'
import { JobServices } from '../../../api/JobServices';

function JobAnalysis({savedJobsCount}) {
    const [appliedJobs, setAppliedJobs] = useState([]);
      const [savedJobs, setSavedJobs] = useState([]);
    
      const getAppliedJobs = async () => {
        const { data } = await JobServices.GetAppliedJobs();
        if (data) {
          // Extract inner job objects
          const formatted = data.map(item => item.job);
          setAppliedJobs(formatted);
        }
      };
      useEffect(() => {
        getAppliedJobs();
      }, []);

      
      
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
        <div>
            <div className=''>
                <div className='border border-gray rounded-lg'>
                    <h1 className='p-3 font-semibold'>My Jobs</h1>
                    <div className='flex flex-col gap-4 p-3'>
                        <div className='flex items-center justify-between'>
                            <p>Applications Sent</p>
                            <p>{appliedJobs.length}</p>
                        </div>
                        <div className='flex items-center justify-between'>
                            <p>Saved Jobs</p>
                            <p>{savedJobs.length}</p>
                        </div>
                        <div className='flex items-center justify-between'>
                            <p>Interviews Scheduled</p>
                            <p>0</p>
                        </div>
                    </div>
                </div>
                {/* <div className='mt-5'>
                    <Premium />
                </div> */}
            </div>
        </div>
    )
}

export default JobAnalysis