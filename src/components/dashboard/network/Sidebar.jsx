import React from 'react'
import { Premium } from '../home/EventsHome'

const SideBar = () => {
    const category = [
        { id: 1, cat: 'Invite Sent', num: 0 },
        { id: 2, cat: 'Connections', num: 0 },
        { id: 3, cat: 'Followings', num: 1 },
    ]
    return (
        <div className=''>
            <div className='border border-gray rounded-lg'>
                <h1 className='p-3 font-semibold'>My Network</h1>
                <div className='flex flex-col gap-4 p-3'>
                    {category.map(item => (
                        <div key={item.id} className='flex items-center gap-4'>
                            <div className='flex justify-between w-full flex-wrap'>
                                <h3 className='text-sm md:text-lg'>{item.cat}</h3>
                                <p className='text-xs md:text-sm mr-4'>{item.num}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <div className='mt-5'>
                <Premium/>
            </div>
        </div>
    )
}

export default SideBar