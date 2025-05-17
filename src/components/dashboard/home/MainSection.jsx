import React, { useContext } from 'react'
import SocialMediaToolbar from './LiveStream'
import TabInterface from './TabInterface'
import { UserContext } from '../../../context/UserContext'


const MainSection = () => {
    const {user} = useContext(UserContext);
    return (
        <div>
            <div className='border border-gray-300 rounded-lg p-4 hidden md:block'>
                <div className='gap-2 mt-3 w-full'>
                    <SocialMediaToolbar />
                </div>
            </div>
            <div className=''>
                <input type='text' name="update" id="update" placeholder='Share an update' className='block md:hidden w-full rounded-lg border-gray-300 bg-gray-50' />
            </div>
            <TabInterface />
        </div>
    )
}

export default MainSection