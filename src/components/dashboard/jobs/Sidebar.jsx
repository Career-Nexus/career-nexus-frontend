import React, { useEffect, useState } from 'react'
import { Bulb, Library } from '../../../icons/icon'
import Jobs from "../../../assets/icons/briefcase.svg";
import { JobServices } from '../../../api/JobServices';
import { Link, useNavigate } from 'react-router-dom';
import { Premium } from '../home/EventsHome';
import { JobCard } from './AllJobs';
import { Bell } from 'lucide-react';

function Sidebar() {
    const [prefered, setPrefered] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const getPrefered = async () => {
            try {
                const result = await JobServices.GetPreferedJob();
                console.log("Preferred job result:", result);
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
                    <a href='/personalize' className='text-[#5DA05D] flex items-center justify-center text-center p-1 border border-[#5DA05D] w-full rounded-lg'>
                        <span className='mr-2'>
                            Add Preference
                        </span>
                    </a>
                </div>
            </div>
        );
    };

    return (
        <div>
            <PreferenceCard prefered={prefered} />
            <div className='border border-gray rounded-lg mb-5'>
                <h1 className='p-3 font-semibold'>Activity</h1>
                <div className='flex flex-col gap-4 p-3'>
                    {data.map(item => (
                        <div key={item.id} className='flex items-center gap-4'>
                            <div>{item.icon}</div>
                            <Link to={item.name === 'My Preference' ? '/personalize' : '/my-jobs'} className='text-sm text-gray-700 hover:text-[#5DA05D]'>
                                <h3 className='text-lg'>{item.name}</h3>
                            </Link>

                        </div>
                    ))}
                    <Link to={'#'} className='text-[#5DA05D] hover:text-[#5DA05D] flex gap-2 items-center justify-center border border-[#5DA05D] rounded-lg p-2 font-medium text-sm'>
                        <Bell />
                        <span>Set job alert</span>
                    </Link>
                </div>
            </div>
            <div>
                <Premium />
            </div>
        </div>
    );
}
export default Sidebar