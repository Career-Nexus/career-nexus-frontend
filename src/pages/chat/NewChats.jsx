
import { useParams } from "react-router-dom"
import EmptyChatRoom from "../../components/dashboard/chat/NewChat"
import Profile from "../../components/dashboard/home/Profile"
import { ChatProvider } from "../../context/ChatContex"
import { useContext, useEffect, useState } from "react"
import { UserContext } from "../../context/UserContext"
import { ChatServices } from "../../api/ChatServices"

// function NewChats() {
//   const { userwithid } = useContext(UserContext)
//   const { contributorId } = useParams()
//   //if (!peerId) return <div>Invalid chat</div>
//   const [chatSessions, setChatSessions] = useState([]);

//     const fetchChatSessions = async () => {
//       const res = await ChatServices.getChatSessions();
//       if (res.success) {
//         setChatSessions(res.data);
//       }
//     };

//     useEffect(() => {
//       fetchChatSessions();
//     }, []);
//     const chat = chatSessions.find(c => c.contributor.id.toString() === contributorId && (c.initiator.id === userwithid || c.contributor.id === userwithid));
//     if (!chat) return <div>Chat session not found.</div>;
//   return (
//     <div className='grid grid-cols-12 md:gap-8 p-4 md:px-5  lg:px-12 md:py-8'>
//       <div className='col-span-4 md:col-span-4 lg:col-span-3'>
//         <Profile />
//       </div>
//       <div className='col-span-8 md:col-span-8 lg:col-span-9'>
//         {/* <EmptyChatRoom /> */}
//         <ChatProvider contributorId={chat.contributor.id}>
//           <EmptyChatRoom />
//         </ChatProvider>
//       </div>
//     </div>
//   )
// }
function NewChats() {
  const { userwithid } = useContext(UserContext);
  const { contributorId } = useParams(); // from /chat/:contributorId

  // useEffect(() => {
  //   const fetchChatSessions = () => {
  //     const res = ChatServices.getChatSessions();
  //     if (res.success) {
  //       setChatSessions(res.data);
  //     }
  //   };
  //   fetchChatSessions();
  // }, []);
  // console.log("All chat sessions:", chatSessions);
  return (
    <div className="grid grid-cols-12 md:gap-8 p-4 md:px-5 lg:px-12 md:py-8">
      <div className="col-span-4 md:col-span-4 lg:col-span-3">
        <div className="sticky top-20">
          <Profile />
        </div>
      </div>
      <div className="col-span-8 md:col-span-8 lg:col-span-9">
        <ChatProvider contributorId={contributorId}>
          <EmptyChatRoom />
        </ChatProvider>
      </div>
    </div>
  );
}
export default NewChats;
