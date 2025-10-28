import React, { useContext, useEffect, useState } from 'react'
import { Bookmark, Bulb, Library, Newsletter, Setting, Video } from '../../../icons/icon'
import { Link } from 'react-router-dom'
import { UserContext } from '../../../context/UserContext'
import { ArrowRight, Dot, GraduationCap, TrendingUp, Vault } from 'lucide-react'
import CNLogo from "../../../assets/images/CN_LOGO_2.png"
import { CorporateServices } from '../../../api/CoporateServices'

const Profile = () => {
    const [activeId, setActiveId] = useState(null);
    const [linkedAccounts, setLinkedAccounts] = useState([]);
    const { user, error, } = useContext(UserContext)
    if (error) {
        return <div className='flex items-center justify-center h-screen'>Error: {error}</div>
    }

    const fetchLinkedAccounts = async () => {
        try {
            const response = await CorporateServices.getLinkedAccounts();
            if (response.success) {
                setLinkedAccounts(response.data);
                console.log("Linked accounts in Profile:", response.data);
            }
        } catch (error) {
            console.error("Error fetching linked accounts:", error);
        }
    };
    useEffect(() => {
        fetchLinkedAccounts();
    }, []);
    console.log(linkedAccounts);

    const handleSwitchAccount = async (accountId) => {
        try {
            const response = await CorporateServices.switchAccount(accountId);

            if (response.success) {
                console.log("Switched to account:", response.data);

                // Update user context (reload or refetch user profile)
                window.location.reload(); // simple approach

                // Alternatively, if you have a context update method:
                // updateUser(response.data);  // replace with your context update logic
            } else {
                console.error("Error switching account:", response.error);
            }
        } catch (error) {
            console.error("Error switching account:", error);
        }
    };

    const data = [
        // { id: 1, icon: <Link to='#'><Video /></Link>, name: <Link to='#'>Learning</Link> },
        // { id: 2, icon: <Link to='#'><Bulb /></Link>, name: <Link to='#'>Insights</Link> },
        { id: 3, icon: <Link to='/saved'><Bookmark /></Link>, name: <Link to='/saved'>Saved</Link> },
        { id: 4, icon: <Link to='/library'><Library /></Link>, name: <Link to='/library'>Library</Link> },
        { id: 5, icon: <Link to='/newsletter'><Newsletter /></Link>, name: <Link to='/newsletter'>Newsletter</Link> },
        // { id: 6, icon: <Link to='/settings'><Setting /></Link>, name: <Link to='/settings'>Settings</Link> },
    ]
    const mentorData = [
        // { id: 1, icon: <Link to='#'><Bulb /></Link>, name: <Link to='#'>Insights</Link> },
        { id: 2, icon: <Link to='/saved'><Bookmark /></Link>, name: <Link to='/saved'>Saved</Link> },
        { id: 3, icon: <Link to='/library'><Library /></Link>, name: <Link to='/library'>Library</Link> },
        { id: 4, icon: <Link to='/nexus-vault'><Vault /></Link>, name: <Link to='/nexus-vault'>Nexus Vault</Link> },
        { id: 5, icon: <Link to='/newsletter'><Newsletter /></Link>, name: <Link to='/newsletter'>Newsletter</Link> },
        // { id: 6, icon: <Link to='/settings'><Setting /></Link>, name: <Link to='/settings'>Settings</Link> },
    ]
    const trend = [
        { id: 1, type: 'RemoteWork', post: '15.2' },
        { id: 2, type: 'TechCareers', post: '8.7' },
        { id: 3, type: 'AISkills', post: '6.3' },
    ]
    return (
        <div>
            {user.user_type === "learner" ? (
                <div className=''>
                    <Link to={'/profilepage'} className='border border-[#5DA05D] bg-[#FBFFFB] rounded-lg flex flex-col relative mb-5'>
                        <div className='flex items-center min-h-32 mx-2 '>
                            <div className='mr-2 md:h-12 md:w-12 w-14 h-10'>
                                <img src={user.profile_photo} alt="profile picture"
                                    className='h-10 w-10 md:h-12 md:w-12 rounded-full bg-cover' />
                            </div>
                            <div className='flex flex-col'>
                                <h1 className='font-bold text-sm md:text-xl'>{user.first_name} {user.last_name}</h1>
                                <p className='text-sm text-gray-400'>{user?.position}</p>
                            </div>
                            {/* <Link to={'/profilepage'} className='text-[#5DA05D] w-[90%] border border-[#5DA05D] font-semibold rounded-lg py-2 px-2  text-center'>View full profile</Link> */}
                        </div>
                    </Link>

                    <div>
                        {linkedAccounts.length === 0 ? (
                            <Link to={'/coporate-com'} className='flex mt-3 text-center text-sm bg-[#FBFFFB] font-semibold border text-gray-600 rounded-lg py-3 px-2  w-full'>
                                Create a company page
                                <ArrowRight className='inline-block ml-auto' />
                            </Link>
                        ) : (
                            <div className='bg-gray-50 p-3 rounded-lg border border-gray-200 mt-3'>
                                <h1 className='font-semibold'>MY PAGE</h1>
                                {linkedAccounts.map(account => (
                                    <button
                                        key={account.id}
                                        onClick={() => handleSwitchAccount(account.id)}
                                        className="flex justify-center items-center mt-3 text-center bg-[#FBFFFB] font-semibold border text-gray-600 rounded-lg py-3 px-2 w-full"
                                    >
                                        <img src={account.profile_photo} alt="corp icon" className="w-16 h-12 mr-2 rounded-lg" />
                                        <div className="flex flex-col text-left">
                                            <span className="font-semibold">{account.name}</span>
                                            <span className="text-gray-500 text-sm">{account.extras}</span>
                                        </div>
                                        <Dot className="inline-block ml-auto h-10 w-10 text-red-700" />
                                    </button>
                                ))}

                            </div>
                        )}
                    </div>

                    <div className='border border-gray rounded-lg my-5'>
                        <h1 className='p-3 font-semibold'>Activity</h1>
                        <div className='flex flex-col gap-4 p-3'>
                            {data.map(item => {
                                const isActive = activeId === item.id;
                                return (
                                    <div key={item.id}>
                                        <a
                                            href={item.href}
                                            onClick={() => setActiveId(item.id)}
                                            className={`flex items-center gap-2 px-3 py-1 rounded-md transition-colors
                                            ${isActive ? "bg-[#D9FFDB]" : "hover:bg-[#D9FFDB]"}`}
                                        >
                                            {item.icon}
                                            <span className="text-sm font-medium">{item.name}</span>
                                        </a>
                                    </div>
                                )
                            })}

                        </div>
                    </div>
                </div>
            ) : (
                <div className=''>
                    <Link to={'/profilepage'} className='border border-[#B573F6] bg-[#F5EAFF8F] rounded-lg flex flex-col relative'>
                        <div className='flex ml-auto mr-4 mt-2'><GraduationCap className='bg-green-100' /></div>
                        <div className='flex items-center min-h-32 mx-2 '>
                            <div className='mr-2 md:h-12 md:w-12 w-14 h-10'>
                                <img src={user.profile_photo} alt="profile picture"
                                    className='h-10 w-10 md:h-12 md:w-12 rounded-full bg-cover' />
                            </div>
                            <div className='flex flex-col'>
                                <h1 className='font-bold text-sm md:text-xl'>{user.first_name} {user.last_name}</h1>
                                <p className='text-sm text-gray-400'>{user?.position}</p>
                            </div>
                            {/* <Link to={'/profilepage'} className='text-[#5DA05D] w-[90%] border border-[#5DA05D] font-semibold rounded-lg py-2 px-2  text-center'>View full profile</Link> */}
                        </div>
                    </Link>
                    <div className='border border-gray rounded-lg my-5'>
                        {/* <h1 className='p-3 font-semibold'>Activity</h1> */}
                        <div className='flex flex-col gap-4 p-3'>
                            {mentorData.map(item => {
                                const isActive = activeId === item.id;
                                return (
                                    <div key={item.id}>
                                        <a
                                            href={item.href}
                                            onClick={() => setActiveId(item.id)}
                                            className={`flex items-center gap-2 px-3 py-1 rounded-md transition-colors
                                            ${isActive ? "bg-[#D9FFDB]" : "hover:bg-[#D9FFDB]"}`}
                                        >
                                            {item.icon}
                                            <span className="text-sm font-medium">{item.name}</span>
                                        </a>
                                    </div>
                                )
                            })}

                        </div>
                    </div>
                    {/* <div className='border border-gray rounded-lg my-5'>
                        <h1 className='p-3 font-bold text-2xl'>Trending Topics</h1>
                        <div className='flex flex-col gap-4 p-3'>
                            {trend.map(item => (
                                <div key={item.id} className='flex items-center justify-between'>
                                    <div className='font-bold text-lg'>
                                        <div>#{item.type}</div>
                                        <h3 className='text-gray-500'>{item.post}K Posts</h3>
                                    </div>
                                    <div>
                                        <TrendingUp className='text-[#5DA05D]' />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div> */}

                </div>
            )}
        </div>
    )
}

export default Profile
