
import { Funnel, GraduationCap, LaughIcon, Search } from 'lucide-react';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

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
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
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

export const mentors = [
  {
    id: 1,
    name: "Sarah Johnson",
    title: "Senior Software Engineer at SEECS-National University",
    rating: 4.9,
    sessions: 3,
    description: "This project involved the end-to-end UI/UX design of a responsive e-commerce website tailored for a smooth and engaging online shopping experience. The aim was to combine aesthetics with functionality—making it easy for users to discover products, learn more about them, and complete purchases effortlessly.",
    tags: ["Tech", "America", "Available Now", "Senior"],
    image: "/images/mentor-img1.png",
    cover: "/images/mentor-cover1.png",
    location: "USA",
    job: "Software Engineer at Career Nexus",
    degree: "BSc in Computer Engineering",
    stats: {
      following: "500+",
      followers: "6,176",
    },
    time:"2d",
    shortdisc:"Looking for mentee interested in Learning advanced Ui/Ux techniques. 5 spots available.",
    postimg:"/images/videoFrame.png",
    profsummary:"With a strong background in software development, Sarah Johnson is a Senior Software Engineer at SEECS - National University of Minneapolis with years of experience building scalable and efficient tech solutions. She specializes in backend development, system architecture, and cloud computing, working across various industries to develop high-performance applications.As an experienced mentor, Sarah has helped aspiring engineers land roles in top tech companies, guiding them through coding interviews, system design, and career transitions. She is passionate about helping developers grow, whether through technical coaching, portfolio reviews, or mock interview prep.If you and your friends are looking for group sessions on coding interviews, system design, or career guidance, create a group of 5 and reach out via direct message. Discounted sessions are available! 🚀",
  },
  {
    id: 2,
    name: "Cameroon Williams",
    title: "Senior Software Engineer at SEECS-National University",
    rating: 4.3,
    sessions: 12,
    description: "This project involved the end-to-end UI/UX design of a responsive e-commerce website tailored for a smooth and engaging online shopping experience. The aim was to combine aesthetics with functionality—making it easy for users to discover products, learn more about them, and complete purchases effortlessly.",
    tags: ["Tech", "America", "Available Now", "Senior"],
    image: "/images/mentor-img2.png",
    cover: "/images/mentor-cover1.png",
    location: "Uk",
    job: "Software Engineer at Google",
    degree: "BSc in Computer Science",
    stats: {
      following: "400+",
      followers: "6,470",
    },
    time:"12h",
    shortdisc:"Looking for mentee interested in Learning advanced Ui/Ux techniques. 5 spots available.",
    postimg:"/images/videoFrame.png",
    profsummary:"With a strong background in software development, Sarah Johnson is a Senior Software Engineer at SEECS - National University of Minneapolis with years of experience building scalable and efficient tech solutions. She specializes in backend development, system architecture, and cloud computing, working across various industries to develop high-performance applications.As an experienced mentor, Sarah has helped aspiring engineers land roles in top tech companies, guiding them through coding interviews, system design, and career transitions. She is passionate about helping developers grow, whether through technical coaching, portfolio reviews, or mock interview prep.If you and your friends are looking for group sessions on coding interviews, system design, or career guidance, create a group of 5 and reach out via direct message. Discounted sessions are available! 🚀",
  },
  {
    id: 3,
    name: "Esther Howard",
    title: "Senior Software Engineer at SEECS-National University",
    rating: 4.9,
    sessions: 12,
    description: "This project involved the end-to-end UI/UX design of a responsive e-commerce website tailored for a smooth and engaging online shopping experience. The aim was to combine aesthetics with functionality—making it easy for users to discover products, learn more about them, and complete purchases effortlessly.",
    tags: ["Tech", "America", "Available Now", "Senior"],
    image: "/images/mentor-img3.png",
    cover: "/images/mentor-cover1.png",
    location: "USA",
    job: "Software Engineer at Microsoft",
    degree: "BSc in Computer Science",
    stats: {
      following: "500+",
      followers: "6,471",
    },
    time: "1h",
    shortdisc:"Looking for mentee interested in Learning advanced Ui/Ux techniques. 5 spots available.",
    postimg:"/images/videoFrame.png",
    profsummary:"With a strong background in software development, Sarah Johnson is a Senior Software Engineer at SEECS - National University of Minneapolis with years of experience building scalable and efficient tech solutions. She specializes in backend development, system architecture, and cloud computing, working across various industries to develop high-performance applications.As an experienced mentor, Sarah has helped aspiring engineers land roles in top tech companies, guiding them through coding interviews, system design, and career transitions. She is passionate about helping developers grow, whether through technical coaching, portfolio reviews, or mock interview prep.If you and your friends are looking for group sessions on coding interviews, system design, or career guidance, create a group of 5 and reach out via direct message. Discounted sessions are available! 🚀",
  },
  {
    id: 4,
    name: "Robert Fox",
    title: "Senior Software Engineer at SEECS-National University",
    rating: "New Tutor",
    sessions: 0,
    description: "This project involved the end-to-end UI/UX design of a responsive e-commerce website tailored for a smooth and engaging online shopping experience. The aim was to combine aesthetics with functionality—making it easy for users to discover products, learn more about them, and complete purchases effortlessly.",
    tags: ["Tech", "America", "Available Now", "Senior"],
    image: "/images/mentor-img4.png",
    cover: "/images/mentor-cover1.png", location: "USA",
    job: "Software Engineer at TechCorp",
    degree: "BSc in Computer Science",
    stats: {
      following: "500+",
      followers: "6,476",
    },
    time: "2d",
    shortdisc:"Looking for mentee interested in Learning advanced Ui/Ux techniques. 5 spots available.",
    postimg:"/images/videoFrame.png",
    profsummary:"With a strong background in software development, Sarah Johnson is a Senior Software Engineer at SEECS - National University of Minneapolis with years of experience building scalable and efficient tech solutions. She specializes in backend development, system architecture, and cloud computing, working across various industries to develop high-performance applications.As an experienced mentor, Sarah has helped aspiring engineers land roles in top tech companies, guiding them through coding interviews, system design, and career transitions. She is passionate about helping developers grow, whether through technical coaching, portfolio reviews, or mock interview prep.If you and your friends are looking for group sessions on coding interviews, system design, or career guidance, create a group of 5 and reach out via direct message. Discounted sessions are available! 🚀",
  },
  {
    id: 5,
    name: "Rachel Piper",
    title: "Senior Software Engineer at SEECS-National University",
    rating: 4.9,
    sessions: 12,
    description: "This project involved the end-to-end UI/UX design of a responsive e-commerce website tailored for a smooth and engaging online shopping experience. The aim was to combine aesthetics with functionality—making it easy for users to discover products, learn more about them, and complete purchases effortlessly.",
    tags: ["Tech", "America", "Available Now", "Senior"],
    image: "/images/mentor-img5.png",
    cover: "/images/mentor-cover1.png",
    location: "Nigeria",
    job: "Software Engineer at First Bank",
    degree: "BSc in Computer Science",
    stats: {
      following: "500+",
      followers: "6,446",
    },
    time: "2d",
    shortdisc:"Looking for mentee interested in Learning advanced Ui/Ux techniques. 5 spots available.",
    postimg:"/images/videoFrame.png",
    profsummary:"With a strong background in software development, Sarah Johnson is a Senior Software Engineer at SEECS - National University of Minneapolis with years of experience building scalable and efficient tech solutions. She specializes in backend development, system architecture, and cloud computing, working across various industries to develop high-performance applications.As an experienced mentor, Sarah has helped aspiring engineers land roles in top tech companies, guiding them through coding interviews, system design, and career transitions. She is passionate about helping developers grow, whether through technical coaching, portfolio reviews, or mock interview prep.If you and your friends are looking for group sessions on coding interviews, system design, or career guidance, create a group of 5 and reach out via direct message. Discounted sessions are available! 🚀",
  },
  {
    id: 6,
    name: "Robert Fox",
    title: "Senior Software Engineer at SEECS-National University",
    rating: "New Tutor",
    sessions: 0,
    description: "This project involved the end-to-end UI/UX design of a responsive e-commerce website tailored for a smooth and engaging online shopping experience. The aim was to combine aesthetics with functionality—making it easy for users to discover products, learn more about them, and complete purchases effortlessly.",
    tags: ["Tech", "America", "Available Now", "Senior"],
    image: "/images/mentor-img4.png",
    cover: "/images/mentor-cover1.png",
    location: "USA",
    job: "Software Engineer at TechCorp",
    degree: "BSc in Computer Science",
    stats: {
      following: "300+",
      followers: "6,476",
    },
    time: "now",
    shortdisc:"Looking for mentee interested in Learning advanced Ui/Ux techniques. 5 spots available.",
    postimg:"/images/videoFrame.png",
    profsummary:"With a strong background in software development, Sarah Johnson is a Senior Software Engineer at SEECS - National University of Minneapolis with years of experience building scalable and efficient tech solutions. She specializes in backend development, system architecture, and cloud computing, working across various industries to develop high-performance applications.As an experienced mentor, Sarah has helped aspiring engineers land roles in top tech companies, guiding them through coding interviews, system design, and career transitions. She is passionate about helping developers grow, whether through technical coaching, portfolio reviews, or mock interview prep.If you and your friends are looking for group sessions on coding interviews, system design, or career guidance, create a group of 5 and reach out via direct message. Discounted sessions are available! 🚀",
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
  'Available Now': (
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

const MentorCard = ({ mentor }) => {
  const [available, setAvailable] = useState(mentor.tags.includes('Available Now'));

  return (
    <div className="bg-white border rounded-lg shadow-sm overflow-hidden">
      <Link to={`/mentordetails/${mentor.id}`}>
        <img src={mentor.image} alt={mentor.name} className="w-full h-48 object-cover p-2" />
      </Link>
      <div className="p-4 space-y-2">
        <Link to={`/mentordetails/${mentor.id}`}>
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
        </Link>
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
              className={`flex items-center text-xs px-2 py-1 rounded-full border ${tag === 'Available Now' && available
                ? 'bg-green-100 text-green-800 border-green-300'
                : 'bg-gray-100 text-gray-700 border-gray-300'
                } cursor-default`}
              onClick={
                tag === 'Available Now'
                  ? (e) => {
                    e.stopPropagation();
                    setAvailable(!available);
                  }
                  : undefined
              }
            >
              {tagIcons[tag]}
              {tag === 'Available Now' ? (available ? 'Available Now' : 'Not Available') : tag}
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
          <Search className="w-4 h-4" />
        </div>
        <input
          type="text"
          placeholder="Search mentors by name or expertise"
          className="flex-grow py-2 px-1 border-0 focus:outline-none focus:ring-0 w-full"
        />
      </div>

      <div className="flex items-center gap-3 mt-2 flex-wrap">
        <Dropdown label="Industry" options={["Tech", "Finance", "Health"]} />
        <Dropdown label="Location" options={["Remote", "On-site", "Hybrid"]} />
        <Dropdown label="Availability" options={["Weekdays", "Weekends"]} />
        <Dropdown label="Experience" options={["Junior", "Mid", "Senior"]} />
        <button className="px-5 py-1 bg-green-600 text-white rounded-lg hover:bg-green-700 text-sm">
          Search
        </button>
      </div>
      <div>
        <div className="mt-4 w-full grid grid-cols-1 md:grid-cols-12 gap-4">
          {mentors.map((mentor) => (
            <div
              key={mentor.id}
              // to={`/mentordetails/${mentor.id}`}
              className="col-span-1 md:col-span-6"
            >
              <MentorCard mentor={mentor} />
            </div>
          ))}
        </div>
        <div className="flex justify-center mt-4">
          <button className="px-4 py-2 border border-green-400 text-green-400 rounded-lg hover:bg-gray-300">
            Load More
          </button>
        </div>
      </div>
    </div>
  );
};

export const mentorExperience=[
  {
    id:1,
    logo:"",
    role:"Software Engineer",
    company:"Nexmatics Africa",
    date:"Aug 2018 - Present",
    address:"Dallas, Texas, United States - On-site",
    details:"Designed and implemented user-friendly interfaces for e-commerce websites using HTML, CSS, and JavaScript.Enhanced project comprehension with use case scenarios and diagrams..."
  },
  {
    id:2,
    logo:"",
    role:"Software Engineer 2",
    company:"Nexmatics Africa",
    date:"Aug 2018 - Present",
    address:"Dallas, Texas, United States - On-site",
    details:"Designed and implemented user-friendly interfaces for e-commerce websites using HTML, CSS, and JavaScript.Enhanced project comprehension with use case scenarios and diagrams..."
  },
  {
    id:3,
    logo:"",
    role:"Software Engineer 3",
    company:"Nexmatics Africa",
    date:"Aug 2018 - Present",
    address:"Dallas, Texas, United States - On-site",
    details:"Designed and implemented user-friendly interfaces for e-commerce websites using HTML, CSS, and JavaScript.Enhanced project comprehension with use case scenarios and diagrams..."
  },
  {
    id:4,
    logo:"",
    role:"Software Engineer 4",
    company:"Nexmatics Africa",
    date:"Aug 2018 - Present",
    address:"Dallas, Texas, United States - On-site",
    details:"Designed and implemented user-friendly interfaces for e-commerce websites using HTML, CSS, and JavaScript.Enhanced project comprehension with use case scenarios and diagrams..."
  },
  {
    id:5,
    logo:"",
    role:"Software Engineer 5",
    company:"Nexmatics Africa",
    date:"Aug 2018 - Present",
    address:"Dallas, Texas, United States - On-site",
    details:"Designed and implemented user-friendly interfaces for e-commerce websites using HTML, CSS, and JavaScript.Enhanced project comprehension with use case scenarios and diagrams..."
  },
  {
    id:6,
    logo:"",
    role:"Software Engineer 6",
    company:"Nexmatics Africa",
    date:"Aug 2018 - Present",
    address:"Dallas, Texas, United States - On-site",
    details:"Designed and implemented user-friendly interfaces for e-commerce websites using HTML, CSS, and JavaScript.Enhanced project comprehension with use case scenarios and diagrams..."
  }
]
export default MentorMain;