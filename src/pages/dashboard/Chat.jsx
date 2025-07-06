import React from 'react'
import Chats from '../../components/dashboard/home/Chats'
import EventsHome from '../../components/dashboard/home/EventsHome'

function ChatComponent() {
  return (
    <div className='grid grid-cols-12 md:gap-8 lg:px-20 px-5 py-8'>
      <div className='col-span-3'>
        <EventsHome/>
      </div>
      <div className='col-span-12 md:col-span-9'>
        <Chats/>
      </div>
    </div>
  )
}

export default ChatComponent