import ChatSessions from "../../components/dashboard/chat/ChatRoom"
import Profile from "../../components/dashboard/home/Profile"

function ChatSection() {
  return (
    <div className='grid grid-cols-12 md:gap-8 p-4 md:px-5  lg:px-12 md:py-8'>
      <div className='md:col-span-4 lg:col-span-3 hidden md:block'>
        <div className="sticky top-20">
          <Profile />
        </div>
      </div>
      <div className='col-span-12 md:col-span-8 lg:col-span-9'>
        <ChatSessions />
      </div>
    </div>
  )
}

export default ChatSection