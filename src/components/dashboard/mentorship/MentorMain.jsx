import { Funnel, GraduationCap, LaughIcon, Search } from 'lucide-react';
import React, { useState } from 'react'
import { Booked } from '../../../icons/icon';


const Dropdown = ({ label, options }) => {
    const [selected, setSelected] = useState(label);
    const [open, setOpen] = useState(false);

    return (
        <div className="relative">
            <button
                onClick={() => setOpen(!open)}
                className="flex items-center gap-2 px-4 py-1 bg-gray-50 border border-gray-300 rounded-lg text-sm text-gray-700 hover:shadow-sm"
            >
                {selected}
                <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                    />
                </svg>
            </button>
            {open && (
                <div className="absolute z-10 mt-1 w-full bg-white border border-gray-200 rounded-md shadow-md">
                    {options.map((option) => (
                        <div
                            key={option}
                            onClick={() => {
                                setSelected(option);
                                setOpen(false);
                            }}
                            className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
                        >
                            {option}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};
//   mentors
const mentors = [
    {
        id: 1,
        name: "Sarah Johnson",
        title: "Senior Software Engineer at SEECS-National University",
        rating: 4.9,
        sessions: 3,
        tags: ["Tech", "America", "Available Now", "Senior"],
        image: "/images/mentor-img1.png",
    },
    {
        id: 2,
        name: "Cameroon Williams",
        title: "Senior Software Engineer at SEECS-National University",
        rating: 4.3,
        sessions: 12,
        tags: ["Tech", "America", "Available Now", "Senior"],
        image: "/images/mentor-img2.png",
    },
    {
        id: 3,
        name: "Esther Howard",
        title: "Senior Software Engineer at SEECS-National University",
        rating: 4.9,
        sessions: 12,
        tags: ["Tech", "America", "Available Now", "Senior"],
        image: "/images/mentor-img3.png",
    },
    {
        id: 4,
        name: "Robert Fox",
        title: "Senior Software Engineer at SEECS-National University",
        rating: "New Tutor",
        sessions: 0,
        tags: ["Tech", "America", "Available Now", "Senior"],
        image: "/images/mentor-img4.png",
    },
    {
        id: 5,
        name: "Rachel Piper",
        title: "Senior Software Engineer at SEECS-National University",
        rating: 4.9,
        sessions: 12,
        tags: ["Tech", "America", "Available Now", "Senior"],
        image: "/images/mentor-img5.png",
    },
    {
        id: 6,
        name: "Robert Fox",
        title: "Senior Software Engineer at SEECS-National University",
        rating: "New Tutor",
        sessions: 0,
        tags: ["Tech", "America", "Available Now", "Senior"],
        image: "/images/mentor-img4.png",
    },
];
const tagIcons = {
    Tech: (
      <svg className="w-4 h-4 mr-1 text-purple-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeWidth="2" d="M9.75 17l-3.5-5 3.5-5M14.25 7l3.5 5-3.5 5" />
      </svg>
    ),
    America: (
      <svg className="w-4 h-4 mr-1 text-purple-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeWidth="2" d="M17.657 16.657L13.414 12l4.243-4.243M6.343 7.343L10.586 12l-4.243 4.243" />
      </svg>
    ),
    "Available Now": (
      <svg className="w-4 h-4 mr-1 text-green-600" fill="currentColor" viewBox="0 0 20 20">
        <circle cx="10" cy="10" r="5" />
      </svg>
    ),
    Senior: (
      <svg className="w-4 h-4 mr-1 text-purple-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeWidth="2" d="M12 14l9-5-9-5-9 5 9 5zm0 0v6m0 0H9m3 0h3" />
      </svg>
    ),
  };
  
// const MentorCard = ({ mentor }) => {
//     const [available, setAvailable] = useState(
//         mentor.tags.includes("Available Now")
//     );

//     return (
//         <div className="w-full md:w-[48%] bg-white border rounded-lg shadow-sm overflow-hidden">
//             <img
//                 src={mentor.image}
//                 alt={mentor.name}
//                 className="w-full h-48 object-cover"
//             />
//             <div className="p-4 space-y-2">
//                 <div className="flex justify-between items-center">
//                     <h2 className="font-semibold text-lg">{mentor.name}</h2>
//                     <div className="flex items-center gap-1 text-sm text-yellow-500">
//                         <span>{mentor.rating}</span>
//                         <svg
//                             className="w-4 h-4"
//                             fill="currentColor"
//                             viewBox="0 0 20 20"
//                         >
//                             <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.036 3.187a1 1 0 00.95.69h3.356c.969 0 1.371 1.24.588 1.81l-2.715 1.97a1 1 0 00-.364 1.118l1.036 3.187c.3.921-.755 1.688-1.538 1.118l-2.715-1.97a1 1 0 00-1.175 0l-2.715 1.97c-.783.57-1.838-.197-1.538-1.118l1.036-3.187a1 1 0 00-.364-1.118l-2.715-1.97c-.783-.57-.38-1.81.588-1.81h3.356a1 1 0 00.95-.69l1.036-3.187z" />
//                         </svg>
//                     </div>
//                 </div>
//                 <p className="text-sm text-gray-600 truncate">{mentor.title}</p>
//                 <div className="flex items-center text-gray-500 text-sm">
//                     {/* <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                         <path strokeWidth="2" d="M17 20h5v-2a2 2 0 00-2-2h-3M7 20H2v-2a2 2 0 012-2h3m10-6v-2a4 4 0 10-8 0v2m-4 0h16"></path>
//                     </svg> */}
//                     <Booked className="w-3 h-3"/>
//                     {mentor.sessions} Sessions
//                 </div>
//                 <div className="flex flex-wrap gap-2 mt-2">
//                     {mentor.tags.map((tag) =>
//                         tag === "Available Now" ? (
//                             <button
//                                 key={tag}
//                                 onClick={() => setAvailable(!available)}
//                                 className={`text-xs px-3 py-1 rounded-full border ${available
//                                     ? "bg-green-100 text-green-800 border-green-300"
//                                     : "bg-gray-100 text-gray-600 border-gray-300"
//                                     }`}
//                             >
//                                 <span className='flex gap-1 items-center'><Funnel className='w-3 h-3'/>{available ? "Available Now" : "Not Available"}</span>
//                             </button>
//                         ) : (
//                             <span
//                                 key={tag}
//                                 className="text-xs px-3 py-1 rounded-full bg-gray-100 text-gray-700"
//                             >
//                                 <span><GraduationCap/></span>{tag}
//                             </span>
//                         )
//                     )}
//                 </div>
//             </div>
//         </div>
//     );
// };
const MentorCard = ({ mentor }) => {
    const [available, setAvailable] = useState(mentor.tags.includes("Available Now"));
  
    return (
      <div className="w-full md:w-[48%] bg-white border rounded-lg shadow-sm overflow-hidden">
        <img src={mentor.image} alt={mentor.name} className="w-full h-48 object-cover p-2" />
        <div className="p-4 space-y-2">
          <div className="flex justify-between items-center">
            <h2 className="font-semibold text-lg">{mentor.name}</h2>
            <div className="flex items-center gap-1 text-sm text-yellow-500">
              <span>{mentor.rating}</span>
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.036 3.187a1 1 0 00.95.69h3.356c.969 0 1.371 1.24.588 1.81l-2.715 1.97a1 1 0 00-.364 1.118l1.036 3.187c.3.921-.755 1.688-1.538 1.118l-2.715-1.97a1 1 0 00-1.175 0l-2.715 1.97c-.783.57-1.838-.197-1.538-1.118l1.036-3.187a1 1 0 00-.364-1.118l-2.715-1.97c-.783-.57-.38-1.81.588-1.81h3.356a1 1 0 00.95-.69l1.036-3.187z" />
              </svg>
            </div>
          </div>
          <p className="text-sm text-gray-600 truncate">{mentor.title}</p>
          <div className="flex items-center text-gray-500 text-sm">
            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeWidth="2" d="M17 20h5v-2a2 2 0 00-2-2h-3M7 20H2v-2a2 2 0 012-2h3m10-6v-2a4 4 0 10-8 0v2m-4 0h16"></path>
            </svg>
            {mentor.sessions} Sessions
          </div>
          <div className="flex flex-wrap gap-1 mt-2">
            {mentor.tags.map((tag) => (
              <span
                key={tag}
                className={`flex items-center text-xs px-2 py-1 rounded-full border ${
                  tag === "Available Now" && available
                    ? "bg-green-100 text-green-800 border-green-300"
                    : "bg-gray-100 text-gray-700 border-gray-300"
                } cursor-default`}
                onClick={tag === "Available Now" ? () => setAvailable(!available) : undefined}
              >
                {tagIcons[tag]}
                {tag === "Available Now" ? (available ? "Available Now" : "Not Available") : tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    );
  };
const MentorMain = () => {

    return (
        <div className="bg-white p-4">
            <div className="flex items-center w-[71%] border border-gray-300 rounded-lg overflow-hidden flex-grow">
                <div className="flex items-center pl-3">
                    <Search className='w-4 h-4'/>
                </div>
                <input
                    type="text"
                    placeholder="Search mentors by name or expertise"
                    className="flex-grow py-2 px-1 border-0 focus:outline-none focus:ring-0 w-full"
                />
            </div>

            <div className='flex items-center gap-3 mt-2 flex-wrap'>
                <Dropdown label="Industry" options={["Tech", "Finance", "Health"]} />
                <Dropdown label="Location" options={["Remote", "On-site", "Hybrid"]} />
                <Dropdown label="Availability" options={["Weekdays", "Weekends"]} />
                <Dropdown label="Experience" options={["Junior", "Mid", "Senior"]} />

                <button className="px-5 py-1 bg-green-600 text-white rounded-lg hover:bg-green-700 text-sm">
                    Search
                </button>
            </div>
            <div>
                <div className="mt-4 flex flex-wrap justify-between gap-4">
                    {mentors.map((mentor) => (
                        <MentorCard key={mentor.id} mentor={mentor} />
                    ))}
                </div>
                <div className="flex justify-center mt-4">
                    <button className="px-4 py-2 border border-green-400 text-green-400 rounded-lg hover:bg-gray-300">
                        Load More
                    </button>
                </div>
            </div>
        </div>
    )
}

export default MentorMain