import React from 'react'
import { useParams } from 'react-router-dom';
import { mentorExperience, mentors } from './MentorMain';
import { Calendar, Location, MdiCompany } from '../../../icons';

function MentorProfSummary() {
  const { id } = useParams();

  const mentor = mentors.find((m) => m.id === parseInt(id));
  const experience = mentorExperience.find((e) => e.id == parseInt(id));
  return (
    <div>
      <div>
        <h1 className='font-bold'>Prophesional Summary</h1>
        <div className='text-sm my-3'>{mentor.profsummary}</div>

        <div>
          <h1 className='font-bold mb-3'>Experience</h1>
          <div className='flex gap-3 border border-gray-200 p-2 rounded-lg'>
            <div>
              <img src="/images/exp-img1.png" alt="dd" />
            </div>
            <div>
              <h2 className='font-bold'>{experience.role}</h2>
              <div className='flex gap-2'>
                <img src={MdiCompany} alt="Logo" />
                <div>{experience.company}</div>
              </div>
              <div className='flex gap-2'>
                <img src={Calendar} alt="Date" />
                <div>{experience.date}</div>
              </div>
              <div className='flex gap-2'>
                <img src={Location} alt="Location" />
                <div>{experience.address}</div>
              </div>
              <p>Designed and implemented user-friendly interfaces for e-commerce websites using HTML, CSS, and JavaScript.
                Enhanced project comprehension with use case scenarios and diagrams...
                <span className='text-green-500'>show more</span>
              </p>
            </div>
          </div>
        </div>

        <div>
          <h1 className='font-bold my-3'>Education</h1>
          <div className='flex gap-3 border border-gray-200 p-2 rounded-lg'>
            <div>
              <img src="/images/exp-img1.png" alt="dd" />
            </div>
            <div>
              <h2 className='font-bold'>{experience.role}</h2>
              <div className='flex gap-2'>
                <img src={MdiCompany} alt="Logo" />
                <div>{experience.company}</div>
              </div>
              <div className='flex gap-2'>
                <img src={Calendar} alt="Date" />
                <div>{experience.date}</div>
              </div>
              <div className='flex gap-2'>
                <img src={Location} alt="Location" />
                <div>{experience.address}</div>
              </div>
              <p>Designed and implemented user-friendly interfaces for e-commerce websites using HTML, CSS, and JavaScript.
                Enhanced project comprehension with use case scenarios and diagrams...
                <span className='text-green-500'>show more</span>
              </p>
            </div>
          </div>
        </div>

        <div>
          <h1 className='font-bold my-3'>Licenses & Certifications</h1>
          <div className='flex gap-3 border border-gray-200 p-2 rounded-lg'>
            <div>
              <img src="/images/exp-img1.png" alt="dd" />
            </div>
            <div>
              <h2 className='font-bold'>{experience.role}</h2>
              <div className='flex gap-2'>
                <img src={MdiCompany} alt="Logo" />
                <div>{experience.company}</div>
              </div>
              <div className='flex gap-2'>
                <img src={Calendar} alt="Date" />
                <div>{experience.date}</div>
              </div>
              <div className='flex gap-2'>
                <img src={Location} alt="Location" />
                <div>{experience.address}</div>
              </div>
              <p>Designed and implemented user-friendly interfaces for e-commerce websites using HTML, CSS, and JavaScript.
                Enhanced project comprehension with use case scenarios and diagrams...
                <span className='text-green-500'>show more</span>
              </p>
            </div>
          </div>
        </div>
        <ReviewsSection />
      </div>
    </div>
  )
}

const reviewsData = {
  reviews: [
    {
      date: "March 28, 2025",
      text: "I had an amazing session with Sarah. He was very insightful and knowledgeable. She identified a major blocker of mine and helped me identify and work through it. Can't thank her enough!",
      author: {
        name: "Alicia Mohammed",
        title: "Freelance Product Designer, Freelance"
      }
    },
    {
      date: "March 28, 2025",
      text: "Sarah was invaluable and kind. She helped me understand so many things and cleared so many doubts. The entire session was insightful and eye-opening. She was so patient and understanding, I am grateful to be her mentee.",
      author: {
        name: "Paramjot Kaur",
        title: "UI/UX Designer at Independent"
      }
    }
  ],
  totalReviews: 10,
  seeAllLink: "See all"
};

const StarIcon = () => (
  <svg className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
  </svg>
);

const ReviewCard = ({ review }) => (
  <div className="mb-6 p-4 border rounded-lg shadow-sm">
    <div className="flex items-center mb-2">
      {[...Array(5)].map((_, i) => <StarIcon key={i} />)}
    </div>
    <p className="text-gray-600 mb-2">{review.text}</p>
    <p className="text-sm text-gray-500">{review.date}</p>
    <div className="flex items-center mt-2">
      <div className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center mr-3">
        <svg className="w-6 h-6 text-gray-600" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
        </svg>
      </div>
      <div>
        <p className="font-medium">{review.author.name}</p>
        <p className="text-sm text-gray-500">{review.author.title}</p>
      </div>
    </div>
  </div>
);

const ReviewsSection = () => {
  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Reviews ({reviewsData.totalReviews})</h2>
        <a href="#" className="text-green-600 hover:text-green-800">{reviewsData.seeAllLink}</a>
      </div>
      {reviewsData.reviews.map((review, index) => (
        <ReviewCard key={index} review={review} />
      ))}
    </div>
  );
};

export default MentorProfSummary