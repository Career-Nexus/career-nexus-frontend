import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Star, Bookmark } from "lucide-react";
// import dummyMentors from "./dummyMentors.json"; // import the JSON file

const dummyMentors = [
  {
    "id": 1,
    "fullName": "Jane Doe",
    "profilePhoto": "https://randomuser.me/api/portraits/women/45.jpg",
    "jobTitle": "Software Engineer",
    "years_of_experience": 5,
    "rating": 4.5,
    "technical_skills": ["JavaScript", "React", "Node.js", "Tailwind CSS"]
  },
  {
    "id": 2,
    "fullName": "John Smith",
    "profilePhoto": "https://randomuser.me/api/portraits/men/34.jpg",
    "jobTitle": "Data Scientist",
    "years_of_experience": 7,
    "rating": 4.8,
    "technical_skills": ["Python", "Pandas", "Machine Learning", "SQL"]
  },
  {
    "id": 3,
    "fullName": "Emily Johnson",
    "profilePhoto": "https://randomuser.me/api/portraits/women/68.jpg",
    "jobTitle": "UI/UX Designer",
    "years_of_experience": 4,
    "rating": 4.2,
    "technical_skills": ["Figma", "Adobe XD", "CSS", "JavaScript"]
  },
  {
    "id": 4,
    "fullName": "Michael Brown",
    "profilePhoto": "https://randomuser.me/api/portraits/men/72.jpg",
    "jobTitle": "DevOps Engineer",
    "years_of_experience": 6,
    "rating": 4.6,
    "technical_skills": ["AWS", "Docker", "Kubernetes", "Linux"]
  }
]
function SavedMentors() {
  const [mentorSession, setMentorSession] = useState([2]); // Example: id 2 is booked

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {dummyMentors.map((mentor) => {
        const { profilePhoto, fullName, jobTitle, rating } = mentor;

        return (
          <div
            key={mentor.id}
            className="bg-white border rounded-lg shadow-sm overflow-hidden"
          >
            <div className="flex justify-between p-3">
              <Link to={`/mentordetails/${mentor.id}`} className="flex gap-2">
                <img
                  src={profilePhoto || "/placeholder.svg"}
                  alt={fullName}
                  className="w-14 h-14 rounded-full object-cover p-2"
                />
                <div>
                  <h2 className="font-semibold text-lg">{fullName}</h2>
                  <p className="text-sm text-gray-600">{jobTitle}</p>
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
              {mentor.technical_skills?.slice(0, 4).map((skill, idx) => (
                <span
                  key={idx}
                  className="bg-[#2A0D471A] px-4 rounded-lg text-sm py-1"
                >
                  {skill}
                </span>
              ))}
            </div>

            <div className="flex items-center justify-center gap-5 my-5">
              <button
                disabled={mentorSession.includes(mentor.id)}
                className={`py-2 px-4 border ${
                  mentorSession.includes(mentor.id)
                    ? "bg-green-50 text-gray-400 cursor-not-allowed border-gray-300"
                    : "bg-[#5DA05D] text-white"
                } rounded-lg transition-colors duration-200 font-medium text-sm`}
              >
                {mentorSession.includes(mentor.id) ? "Pending..." : "Book Session"}
              </button>
              <button className="py-2 px-4 border-2 border-[#5DA05D] text-[#5DA05D] rounded-lg flex gap-2">
                <Bookmark />
                Save
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
}
export default SavedMentors;
