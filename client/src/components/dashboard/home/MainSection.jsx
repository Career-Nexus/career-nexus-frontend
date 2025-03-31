import React from 'react'
import { Article, Chat, Clock, EventIcon, Like, Repost, Save, Upload, Video } from '../../../icons/icon'
import SocialMediaToolbar from './LiveStream'
import { SocialInteractionBar } from './SocialInteractionBar'
import { Plus } from 'lucide-react'
import TabInterface from './TabInterface'


const MainSection = () => {
    return (
        <div>
            <div className='border border-gray-300 rounded-lg p-4 hidden md:block'>
                <div className='flex gap-2 items-center'>
                    <img src="/images/profile.png" alt="profile" className='w-14 h-auto rounded-full' />
                    <input type='text' name="update" id="update" placeholder='Share an update' className='w-full rounded-lg border-gray-300 bg-gray-50' />
                </div>
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