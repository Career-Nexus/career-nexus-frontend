import React, { useState } from "react";
import { MoveRight, MoveLeft } from "lucide-react";
import { ImQuotesLeft } from "react-icons/im";

const reviews = [
  {
    id: 1,
    text: (
      <>
        I've had the pleasure of advising Career Nexus—an innovative workforce development organization dedicated to strengthening the UK economy by preparing young adults for meaningful and long-term career success. Their unique ecosystem connects employers, Mentors, Graduates and Job seekers to build a more inclusive and prepared workforce, and their impact on community development is clear. I've also known founder <strong>Samuel</strong> personally and can attest to his passion, vision, and commitment to driving positive outcomes for both employers and interns alike.
      </>
    ),
    name: "Khalid Hussain",
    role: "CEO, Swift BPO and Co-Founder, Business Owners Network – Birmingham",
    avatar: "/images/landing/khalid.png",
  },
  {
    id: 2,
    text: `As a founder running a fashion business in the UK, I’ve seen first-hand how difficult it is for young professionals to access real guidance beyond theory. Career-Nexus is tackling a genuine gap; not by selling dreams, but by creating space for practical conversations, mentorship, and clarity.
    What stood out to me is the intentional way the platform is being built. It’s clear this isn’t rushed or superficial. The focus on people, experience, and long-term value aligns with how serious businesses are grown.`,
    name: "Felix Inala",
    role: "Founder & Creative Director, ANKO",
    avatar: "/images/landing/felix.png",
  },
  // {
  //   id: 3,
  //   text: `Career-Nexus is responding to one of the defining challenges of the modern workforce:
  //   the widening gap between formal education, practical skills, and real economic opportunity. 
  //    Their platform equips individuals to navigate complexity and remain competitive in a rapidly changing global economy. 
  //    In this sense, Career-Nexus is not merely supporting career growth but helping to redefine how careers are built in the 21st century.`,
  //   name: "Simas Vysniauskas",
  //   role: "Sales Executive - Spendbase",
  //   avatar: "/images/landing/silmas.png",
  // },
];

export default function Reviews() {
  const [index, setIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  React.useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Calculate max index based on screen size
  const itemsPerSlide = isMobile ? 1 : 2;
  const totalSlides = Math.ceil(reviews.length / itemsPerSlide);
  const maxIndex = totalSlides - 1;
  const transformPercent = isMobile ? 100 : 50;

  const next = () =>
    setIndex((prev) => (prev < maxIndex ? prev + 1 : prev));

  const prev = () =>
    setIndex((prev) => (prev > 0 ? prev - 1 : prev));

  return (
    <section className="w-full bg-white py-16">
      <div className="mx-auto max-w-6xl px-6">
        
        {/* Header */}
        <div className="mb-10 flex items-center justify-between">
          <h2 className="text-2xl font-semibold text-gray-900">
            Reviews
          </h2>

          <div className="flex items-center gap-2">
            <button
              onClick={prev}
              disabled={index === 0}
              className="rounded-md border-2 border-gray-200 p-2 text-gray-500 hover:bg-gray-100 disabled:opacity-40"
            >
              <MoveLeft size={18} />
            </button>

            <button
              onClick={next}
              disabled={index === maxIndex}
              className="rounded-md border-2 border-[#5DA05D] p-2 text-[#5DA05D] hover:bg-green-50 disabled:opacity-40"
            >
              <MoveRight size={18} />
            </button>
          </div>
        </div>

        {/* Slider */}
        <div className="overflow-hidden">
          <div
            className="flex transition-transform duration-500 ease-in-out"
            style={{
              transform: `translateX(-${index * transformPercent}%)`,
            }}
          >
            {reviews.map((review) => (
              <div
                key={review.id}
                className="w-full md:w-1/2 flex-shrink-0 px-3"
              >
                <div className="rounded-xl bg-green-50 p-8 shadow-sm h-full">
                  
                  {/* Quote */}
                  <div className="mb-4 text-4xl text-[#5DA05D]">
                    <ImQuotesLeft />
                  </div>

                  {/* Text (NO TRIMMING) */}
                  <p className="mb-6 text-gray-700 leading-relaxed whitespace-pre-line">
                    {review.text}
                  </p>

                  {/* Author */}
                  <div className="flex items-center gap-4">
                    <img
                      src={review.avatar}
                      alt={review.name}
                      className="h-12 w-12 rounded-full object-cover"
                    />
                    <div>
                      <p className="font-semibold text-gray-900">
                        {review.name}
                      </p>
                      <p className="text-sm text-gray-500">
                        {review.role}
                      </p>
                    </div>
                  </div>

                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
