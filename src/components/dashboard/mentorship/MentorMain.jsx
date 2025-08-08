
import { Bookmark, Funnel, GraduationCap, LaughIcon, Search, Star } from 'lucide-react';
import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { MentorServices } from '../../../api/MentorServices';
import MentorDetail from './MentorDetail';
import { UserContext } from '../../../context/UserContext';
import { Box, Spinner } from '@chakra-ui/react';
import MentorshipRequests from './MentorshipRequests';

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
    tags: ["React", "Full stack", "Node", "Leadership"],
    image: "/images/mentor-img1.png",
    cover: "/images/mentor-cover1.png",
    location: "USA",
    job: "Software Engineer at Career Nexus",
    degree: "BSc in Computer Engineering",
    stats: {
      following: "500+",
      followers: "6,176",
    },
    time: "2d",
    shortdisc: "Looking for mentee interested in Learning advanced Ui/Ux techniques. 5 spots available.",
    postimg: "/images/videoFrame.png",
    profsummary: "With a strong background in software development, Sarah Johnson is a Senior Software Engineer at SEECS - National University of Minneapolis with years of experience building scalable and efficient tech solutions. She specializes in backend development, system architecture, and cloud computing, working across various industries to develop high-performance applications.As an experienced mentor, Sarah has helped aspiring engineers land roles in top tech companies, guiding them through coding interviews, system design, and career transitions. She is passionate about helping developers grow, whether through technical coaching, portfolio reviews, or mock interview prep.If you and your friends are looking for group sessions on coding interviews, system design, or career guidance, create a group of 5 and reach out via direct message. Discounted sessions are available! 🚀",
  },
  {
    id: 2,
    name: "Cameroon Williams",
    title: "Senior Software Engineer at SEECS-National University",
    rating: 4.3,
    sessions: 12,
    description: "This project involved the end-to-end UI/UX design of a responsive e-commerce website tailored for a smooth and engaging online shopping experience. The aim was to combine aesthetics with functionality—making it easy for users to discover products, learn more about them, and complete purchases effortlessly.",
    tags: ["React", "Full stack", "Node", "Leadership"],
    image: "/images/mentor-img2.png",
    cover: "/images/mentor-cover1.png",
    location: "Uk",
    job: "Software Engineer at Google",
    degree: "BSc in Computer Science",
    stats: {
      following: "400+",
      followers: "6,470",
    },
    time: "12h",
    shortdisc: "Looking for mentee interested in Learning advanced Ui/Ux techniques. 5 spots available.",
    postimg: "/images/videoFrame.png",
    profsummary: "With a strong background in software development, Sarah Johnson is a Senior Software Engineer at SEECS - National University of Minneapolis with years of experience building scalable and efficient tech solutions. She specializes in backend development, system architecture, and cloud computing, working across various industries to develop high-performance applications.As an experienced mentor, Sarah has helped aspiring engineers land roles in top tech companies, guiding them through coding interviews, system design, and career transitions. She is passionate about helping developers grow, whether through technical coaching, portfolio reviews, or mock interview prep.If you and your friends are looking for group sessions on coding interviews, system design, or career guidance, create a group of 5 and reach out via direct message. Discounted sessions are available! 🚀",
  },
  {
    id: 3,
    name: "Esther Howard",
    title: "Senior Software Engineer at SEECS-National University",
    rating: 4.9,
    sessions: 12,
    description: "This project involved the end-to-end UI/UX design of a responsive e-commerce website tailored for a smooth and engaging online shopping experience. The aim was to combine aesthetics with functionality—making it easy for users to discover products, learn more about them, and complete purchases effortlessly.",
    tags: ["React", "Full stack", "Node", "Leadership"],
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
    shortdisc: "Looking for mentee interested in Learning advanced Ui/Ux techniques. 5 spots available.",
    postimg: "/images/videoFrame.png",
    profsummary: "With a strong background in software development, Sarah Johnson is a Senior Software Engineer at SEECS - National University of Minneapolis with years of experience building scalable and efficient tech solutions. She specializes in backend development, system architecture, and cloud computing, working across various industries to develop high-performance applications.As an experienced mentor, Sarah has helped aspiring engineers land roles in top tech companies, guiding them through coding interviews, system design, and career transitions. She is passionate about helping developers grow, whether through technical coaching, portfolio reviews, or mock interview prep.If you and your friends are looking for group sessions on coding interviews, system design, or career guidance, create a group of 5 and reach out via direct message. Discounted sessions are available! 🚀",
  },
  {
    id: 4,
    name: "Robert Fox",
    title: "Senior Software Engineer at SEECS-National University",
    rating: "5",
    sessions: 0,
    description: "This project involved the end-to-end UI/UX design of a responsive e-commerce website tailored for a smooth and engaging online shopping experience. The aim was to combine aesthetics with functionality—making it easy for users to discover products, learn more about them, and complete purchases effortlessly.",
    tags: ["React", "Full stack", "Node", "Leadership"],
    image: "/images/mentor-img4.png",
    cover: "/images/mentor-cover1.png", location: "USA",
    job: "Software Engineer at TechCorp",
    degree: "BSc in Computer Science",
    stats: {
      following: "500+",
      followers: "6,476",
    },
    time: "2d",
    shortdisc: "Looking for mentee interested in Learning advanced Ui/Ux techniques. 5 spots available.",
    postimg: "/images/videoFrame.png",
    profsummary: "With a strong background in software development, Sarah Johnson is a Senior Software Engineer at SEECS - National University of Minneapolis with years of experience building scalable and efficient tech solutions. She specializes in backend development, system architecture, and cloud computing, working across various industries to develop high-performance applications.As an experienced mentor, Sarah has helped aspiring engineers land roles in top tech companies, guiding them through coding interviews, system design, and career transitions. She is passionate about helping developers grow, whether through technical coaching, portfolio reviews, or mock interview prep.If you and your friends are looking for group sessions on coding interviews, system design, or career guidance, create a group of 5 and reach out via direct message. Discounted sessions are available! 🚀",
  },
  {
    id: 5,
    name: "Rachel Piper",
    title: "Senior Software Engineer at SEECS-National University",
    rating: 4.9,
    sessions: 12,
    description: "This project involved the end-to-end UI/UX design of a responsive e-commerce website tailored for a smooth and engaging online shopping experience. The aim was to combine aesthetics with functionality—making it easy for users to discover products, learn more about them, and complete purchases effortlessly.",
    tags: ["React", "Full stack", "Node", "Leadership"],
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
    shortdisc: "Looking for mentee interested in Learning advanced Ui/Ux techniques. 5 spots available.",
    postimg: "/images/videoFrame.png",
    profsummary: "With a strong background in software development, Sarah Johnson is a Senior Software Engineer at SEECS - National University of Minneapolis with years of experience building scalable and efficient tech solutions. She specializes in backend development, system architecture, and cloud computing, working across various industries to develop high-performance applications.As an experienced mentor, Sarah has helped aspiring engineers land roles in top tech companies, guiding them through coding interviews, system design, and career transitions. She is passionate about helping developers grow, whether through technical coaching, portfolio reviews, or mock interview prep.If you and your friends are looking for group sessions on coding interviews, system design, or career guidance, create a group of 5 and reach out via direct message. Discounted sessions are available! 🚀",
  },
  {
    id: 6,
    name: "Robert Fox",
    title: "Senior Software Engineer at SEECS-National University",
    rating: "4",
    sessions: 0,
    description: "This project involved the end-to-end UI/UX design of a responsive e-commerce website tailored for a smooth and engaging online shopping experience. The aim was to combine aesthetics with functionality—making it easy for users to discover products, learn more about them, and complete purchases effortlessly.",
    tags: ["React", "Full stack", "Node", "Leadership"],
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
    shortdisc: "Looking for mentee interested in Learning advanced Ui/Ux techniques. 5 spots available.",
    postimg: "/images/videoFrame.png",
    profsummary: "With a strong background in software development, Sarah Johnson is a Senior Software Engineer at SEECS - National University of Minneapolis with years of experience building scalable and efficient tech solutions. She specializes in backend development, system architecture, and cloud computing, working across various industries to develop high-performance applications.As an experienced mentor, Sarah has helped aspiring engineers land roles in top tech companies, guiding them through coding interviews, system design, and career transitions. She is passionate about helping developers grow, whether through technical coaching, portfolio reviews, or mock interview prep.If you and your friends are looking for group sessions on coding interviews, system design, or career guidance, create a group of 5 and reach out via direct message. Discounted sessions are available! 🚀",
  },
];


const MentorCard = ({ mentor }) => {
  const fullName = `${mentor.first_name} ${mentor.last_name}`;
  const profilePhoto = mentor.profile_photo;
  const jobTitle = mentor.current_job;
  const rating = mentor.rating || "4.0"; // fallback default rating
  const { userwithid } = useContext(UserContext)
  return (
    <div className="bg-white border rounded-lg shadow-sm overflow-hidden">
      <div className="flex justify-between p-3">
        <Link to={`/mentordetails/${mentor.id}`} className='flex gap-2'>
          <img src={profilePhoto} alt={fullName} className="w-14 h-14 rounded-full object-cover p-2" />
          <div>
            <h2 className="font-semibold text-lg">{fullName}</h2>
            <p className="text-sm text-gray-600 text-wrap">{jobTitle}</p>
            <p>{mentor.years_of_experience || 0} Years Experience</p>
          </div>
        </Link>
        <div className="flex gap-1 text-sm text-yellow-300">
          {Array.from({ length: Math.floor(rating) }).map((_, i) => (
            <Star className="fill-yellow-300" size={12} key={i} />
          ))}
          <span className="text-black mt-[-6px]">{rating}</span>
        </div>
      </div>
      <div className="flex flex-wrap items-center justify-between mt-2 p-4">
        <span className='bg-[#2A0D471A] px-4 rounded-lg'>{mentor.technical_skills[0] || "Tech"}</span>
        <span className='bg-[#2A0D471A] px-4 rounded-lg'>{mentor.technical_skills[1]}</span>
        <span className='bg-[#2A0D471A] px-4 rounded-lg'>{mentor.technical_skills[2]}</span>
        <span className='bg-[#2A0D471A] px-4 rounded-lg'>{mentor.technical_skills[3]}</span>
      </div>
      <div className='flex items-center justify-center gap-5 my-5'>
        <button className='py-2 px-4 bg-[#5DA05D] text-white rounded-lg'>
          <Link to={`/mentordetails/${mentor.id}`}>Book Session</Link>
        </button>
        <button className='py-2 px-4 border-2 border-[#5DA05D] text-[#5DA05D] rounded-lg flex gap-2'>
          <Bookmark />
          Save
        </button>
      </div>
    </div>
  );
};

const MentorMain = () => {
  const [recommendmentor, setRecommendmentor] = useState([])
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [nextPage, setNextPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [searchMentor, setSearchMentor] = useState([]);
  const [searchQuery, setSearchQuery] = useState(""); // For text search
  const [availability, setAvailability] = useState("");
  const [searchTriggered, setSearchTriggered] = useState(false);
  const [experienceLevel, setExperienceLevel] = useState("");
  const [skills, setSkills] = useState("");
  const {user} = useContext(UserContext);


  const getRecommendedMentors = async (page = 1) => {
    setLoading(true);
    try {
      const { success, data } = await MentorServices.recommendedmentors({ page });
      const isArray = Array.isArray(data) ? data : [];
      setRecommendmentor((prev) => (page === 1 ? isArray : [...prev, ...isArray]));
      if (data?.next) {
        const url = new URL(data.next);
        const nextPageNumber = url.searchParams.get("page");
        setNextPage(Number(nextPageNumber));
        setHasMore(true);
      } else {
        setHasMore(false);
      }
      setError(null);
    } catch (error) {
      console.log("could not fetch connection by location", error);
      setError("Error occurred while fetching location connections");
    } finally {
      setLoading(false);
    }
  }
  const SearchMentors = async () => {
    setLoading(true);
    setSearchTriggered(true);

    try {
      const params = {};

      if (searchQuery.trim()) params.text = searchQuery.trim();
      if (availability) params.availability = availability;
      if (experienceLevel) params.experience_level = experienceLevel;
      if (skills) params.skills = skills;

      const { success, data } = await MentorServices.searchmentors(params);

      if (success) {
        setSearchMentor(data);
      } else {
        setSearchMentor([]);
      }
    } catch (error) {
      console.error("Search failed", error);
      setSearchMentor([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getRecommendedMentors();
  }, [])

  if (loading && recommendmentor.length === 0) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="200px">
        <Spinner size="lg" color="#5DA05D" thickness="4px" />
      </Box>
    );
  }
  // if (recommendmentor.length === 0) {
  //   return (
  //     <Box textAlign="center" py={28} className='shadow-lg'>
  //       <p className="text-gray-500 text-lg">
  //         Recommended Mentors based on your interest will be displayed here!
  //       </p>
  //     </Box>
  //   )
  // }

  return (
    <div className="bg-white p-4">
      {user.user_type=="learner"?(
        <div>
        {recommendmentor.length === 0 ? (
          <Box textAlign="center" py={28} className='shadow-lg'>
            <p className="text-gray-500 text-lg">
              Recommended Mentors based on your interest will be displayed here!
            </p>
          </Box>
        ) : (
          <div>

            <div className="flex items-center w-[71%] border border-gray-300 rounded-lg overflow-hidden flex-grow">
              <div className="flex items-center pl-3">
                <Search className="w-4 h-4" />
              </div>
              <input
                type="text"
                placeholder="Search mentors by name or expertise"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex-grow py-2 px-1 border-0 focus:outline-none focus:ring-0 w-full"
              />
            </div>

            <div className="flex items-center gap-3 mt-2 flex-wrap">
              <Dropdown
                label="Experience Level"
                options={["entry", "mid", "senior", "executive"]}
                onChange={(value) => setExperienceLevel(value.toLowerCase())}
              />

              <Dropdown
                label="All Skills"
                options={["Tech", "Finance", "Health"]}
                onChange={(value) => setSkills(value)}
              />

              <Dropdown
                label="Availability"
                options={["Weekdays", "Weekends"]}
                onChange={(value) => setAvailability(value.toLowerCase())}
              />

              <button
                onClick={SearchMentors}
                className="px-5 py-1 bg-[#5DA05D] text-white rounded-lg hover:bg-[#5DA05D] text-sm">
                Search
              </button>
            </div>
            <div>
              <div className="mt-4 w-full grid grid-cols-1 md:grid-cols-12 gap-4">
                {searchTriggered ? (
                  searchMentor.length > 0 ? (
                    searchMentor.map((mentor) => (
                      <div key={mentor.id} className="col-span-1 md:col-span-6">
                        <MentorCard mentor={mentor} />
                      </div>
                    ))
                  ) : (
                    <p className="col-span-12 text-center text-gray-500">No mentor found</p>
                  )
                ) : (
                  recommendmentor.map((mentor) => (
                    <div key={mentor.id} className="col-span-1 md:col-span-6">
                      <MentorCard mentor={mentor} />
                    </div>
                  ))
                )}
              </div>
              <div className="flex justify-center mt-4">
                {hasMore && (
                  <button
                    onClick={() => getRecommendedMentors(nextPage)}
                    className="px-4 py-2 border border-[#5DA05D] text-[#5DA05D] rounded-lg hover:bg-gray-300"
                  >
                    Load More
                  </button>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
      ):(
        <MentorshipRequests />
      )}
      

    </div>
  );
};

export const mentorExperience = [
  {
    id: 1,
    logo: "",
    role: "Software Engineer",
    company: "Nexmatics Africa",
    date: "Aug 2018 - Present",
    address: "Dallas, Texas, United States - On-site",
    details: "Designed and implemented user-friendly interfaces for e-commerce websites using HTML, CSS, and JavaScript.Enhanced project comprehension with use case scenarios and diagrams..."
  },
  {
    id: 2,
    logo: "",
    role: "Software Engineer 2",
    company: "Nexmatics Africa",
    date: "Aug 2018 - Present",
    address: "Dallas, Texas, United States - On-site",
    details: "Designed and implemented user-friendly interfaces for e-commerce websites using HTML, CSS, and JavaScript.Enhanced project comprehension with use case scenarios and diagrams..."
  },
  {
    id: 3,
    logo: "",
    role: "Software Engineer 3",
    company: "Nexmatics Africa",
    date: "Aug 2018 - Present",
    address: "Dallas, Texas, United States - On-site",
    details: "Designed and implemented user-friendly interfaces for e-commerce websites using HTML, CSS, and JavaScript.Enhanced project comprehension with use case scenarios and diagrams..."
  },
  {
    id: 4,
    logo: "",
    role: "Software Engineer 4",
    company: "Nexmatics Africa",
    date: "Aug 2018 - Present",
    address: "Dallas, Texas, United States - On-site",
    details: "Designed and implemented user-friendly interfaces for e-commerce websites using HTML, CSS, and JavaScript.Enhanced project comprehension with use case scenarios and diagrams..."
  },
  {
    id: 5,
    logo: "",
    role: "Software Engineer 5",
    company: "Nexmatics Africa",
    date: "Aug 2018 - Present",
    address: "Dallas, Texas, United States - On-site",
    details: "Designed and implemented user-friendly interfaces for e-commerce websites using HTML, CSS, and JavaScript.Enhanced project comprehension with use case scenarios and diagrams..."
  },
  {
    id: 6,
    logo: "",
    role: "Software Engineer 6",
    company: "Nexmatics Africa",
    date: "Aug 2018 - Present",
    address: "Dallas, Texas, United States - On-site",
    details: "Designed and implemented user-friendly interfaces for e-commerce websites using HTML, CSS, and JavaScript.Enhanced project comprehension with use case scenarios and diagrams..."
  }
]
export default MentorMain;