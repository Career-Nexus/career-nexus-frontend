import React from "react";
import { MoveRight, MoveLeft } from 'lucide-react';
import { ImQuotesLeft } from "react-icons/im";

const reviews = [
  {
    id: 1,
    text:`I’ve had the pleasure of advising Career Nexus—an innovative workforce development organization dedicated to strengthening the Central Valley’s economy by preparing young adults for meaningful, paid internships and long-term career success. Their unique ecosystem connects employers, educators, and job seekers to build a more inclusive and prepared workforce, and their impact on community development is clear. I’ve also known founder Samuel personally and can attest to his passion, vision, and commitment to driving positive outcomes for both employers and interns alike.`,
    name: "Khalid Hussain",
    role: "CEO, Swift BPO and Co-Founder, Business Owners Network – Birmingham",
    avatar: "/images/landing/khalid.png",
  },
  {
    id: 2,
    text: `As a founder running a fashion business in the UK, I’ve seen first-hand how difficult it is for young professionals to access real guidance beyond theory. Career-Nexus is tackling a genuine gap; not by selling dreams, but by creating space for practical conversations, mentorship, and clarity.
    What stood out to me is the intentional way the platform is being built. It’s clear this isn’t rushed or superficial. The focus on people, experience, and long-term value aligns with how serious businesses are grown.
    Career-Nexus has strong potential, and I believe it will become a valuable ecosystem for emerging talent and professionals navigating their careers.`,
    name: "Felix Inala",
    role: "Founder & Creative Director, UK Fashion Company – ANKO",
    avatar: "/images/landing/felix.png",
  },
];

export default function Reviews() {
  return (
    <section className="w-full bg-white py-16">
      <div className="mx-auto max-w-6xl px-6">
        {/* Header */}
        <div className="mb-10 flex items-center justify-between">
          <h2 className="text-2xl font-semibold text-gray-900">
            Reviews
          </h2>

          <div className="flex items-center gap-2">
            <button className="rounded-md border-2 border-gray-200 p-2 text-gray-500 hover:bg-gray-100">
              <MoveLeft size={18} />
            </button>
            <button className="rounded-md border-2 border-[#5DA05D] p-2 text-[#5DA05D] hover:bg-green-50">
              <MoveRight size={18} />
            </button>
          </div>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {reviews.map((review) => (
            <div
              key={review.id}
              className="rounded-xl bg-green-50 p-8 shadow-sm"
            >
              {/* Quote icon */}
              <div className="mb-4 text-4xl font-bold text-[#5DA05D] leading-none">
                <ImQuotesLeft />
              </div>

              {/* Review text */}
              <p className="mb-6 text-gray-700 leading-relaxed">
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
          ))}
        </div>
      </div>
    </section>
  );
}
