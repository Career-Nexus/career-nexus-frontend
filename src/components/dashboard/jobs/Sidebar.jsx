import React, { useEffect, useState } from 'react'
import { Bulb, Library } from '../../../icons/icon'
import Jobs from "../../../assets/icons/briefcase.svg";
import { JobServices } from '../../../api/JobServices';
import { useNavigate } from 'react-router-dom';
import { Premium } from '../home/EventsHome';
import { JobCard } from './AllJobs';

function Sidebar() {
    const [prefered, setPrefered] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const getPrefered = async () => {
            try {
                const result = await JobServices.GetPreferedJob();
                console.log(result);
                setPrefered(result);
            } catch (error) {
                console.log("Error fetching preferred jobs", error);
            } finally {
                setLoading(false);
            }
        };
        getPrefered();
    }, []);

    // if (loading) return <p>Loading...</p>;

    const data = [
        { id: 2, icon: <a href='#'><Bulb /></a>, name: 'My Preference' },
        { id: 4, icon: <a href='#'><img src={Jobs} alt="" /></a>, name: 'My Jobs' },
    ];

    const PreferenceCard = ({ prefered }) => {
        if (!prefered?.preference_set) return null;// Hide PreferenceCard if no preference is set
        return (
            <div>
                <div className='border border-gray-300 rounded-lg p-2 flex flex-col'>
                    <div className='p-2'>
                        <h3 className='text-xs font-semibold mb-2'>JOB PREFERENCE</h3>
                        <p className='text-xs font-semibold mb-1'>Job title: {prefered.title}</p>
                        <p className='text-xs'>Job type: {prefered.employment_type}</p>
                        <p className='text-xs mb-1'>Location: {prefered.work_type}</p>
                    </div>
                    <a href='#' className='text-[#5DA05D] flex items-center justify-center text-center p-1 border border-[#5DA05D] w-full rounded-lg'><span className='mr-2'>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-bell-icon lucide-bell">                             <path d="M10.268 21a2 2 0 0 0 3.464 0" /><path d="M3.262 15.326A1 1 0 0 0 4 17h16a1 1 0 0 0 .74-1.673C19.41 13.956 18 12.499 18 8A6 6 0 0 0 6 8c0 4.499-1.411 5.956-2.738 7.326" /></svg>
                        </span>Set job alert
                    </a>
                </div>
            </div>
        );
    };

    return (
        <div>
            <PreferenceCard prefered={prefered} />
            <div className='border border-gray rounded-lg my-5'>
                <h1 className='p-3 font-semibold'>Activity</h1>
                <div className='flex flex-col gap-4 p-3'>
                    {data.map(item => (
                        <div key={item.id} className='flex items-center gap-4'>
                            <div>{item.icon}</div>
                            <div>
                                <h3 className='text-lg'>{item.name}</h3>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <div>
                <Premium />
            </div>
        </div>
    );
}
export default Sidebar