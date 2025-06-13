import React, { useEffect, useState } from 'react'
import { Bulb, Library } from '../../icons/icon'
import Jobs from "../../assets/icons/briefcase.svg";
import { JobServices } from '../../api/JobServices';
import {useNavigate } from 'react-router-dom';

function Sidebar() {
    const [prefered, setPrefered] = useState([]);
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const getPrefered = async () => {
            try {
                const result = await JobServices.GetPreferedJob();
                console.log(result.results)
                setPrefered(result.results);
                
            } catch (error) {
                console.log("Error fetching prefered jobs", error)
            }finally{
                setLoading(false)
            }
        }
        getPrefered();
    }, [])

    if (loading) return <p>Loading...</p>;
    const data = [
        { id: 2, icon: <a href='#'><Bulb /></a>, name: 'My Preference' },
        { id: 4, icon: <a href='#'><img src={Jobs} alt="" /></a>, name: 'My Jobs' },
    ]
    const items = [
        {
            title: 'Job Preference', Jobtitle: 'Ui/Ux designer', Jobtype: 'Entry-Level', Location: 'On-site',
        }
    ]
    return (
        <div>
            <div className='border border-gray-300 rounded-lg p-2 flex flex-col'>
                {prefered.map(item => (
                    <div key={item.title} className='p-2'>
                        <h3 className='text-xs font-semibold mb-2'>JOB PREFERENCE</h3>
                        <p className='text-xs font-semibold mb-1'>Job title: {item.title}</p>
                        <p className='text-xs'>Job type: {item.employment_type}</p>
                        <p className='text-xs mb-1'>Location: {item.country}</p>
                    </div>
                ))}
                <a href='#' className='text-[#5DA05D] text-center p-1 border border-[#5DA05D] w-full rounded-lg'>See more...</a>
            </div>
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

            {/* <FloatingMessageIcon /> */}
        </div>
    )
}

export default Sidebar