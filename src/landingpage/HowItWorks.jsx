import React from 'react'

export default function HowItWorks() {
    return (
        <div>
            <section className="mt-20 mb-20 relative" id="howitworks">
                <div className="w-full h-[900px] md:h-[700px] lg:h-[500px] overflow-hidden">
                    <img
                        src="/images/landing/rectangle.png"
                        alt="bg-image"
                        className="w-full h-full object-cover"
                    />
                </div>
                <div className='absolute top-0 items-center w-full h-full flex flex-col justify-center px-6 md:px-20'>
                    <h2 className='text-center font-bold text-white text-2xl font-roboto'>How It Works</h2>
                    <p className='text-center text-white/70'>Simple. Practical. Human-centered.</p>
                    <div className='mt-10'>
                        <Card/>
                    </div>
                </div>
            </section>
        </div>
    )
}

const steps = [
  {
    id: "1",
    title: "Join the platform",
    description:
      "Create a profile and tell us where you are in your career journey.",
  },
  {
    id: "2",
    title: "Connect with mentors & peers",
    description:
      "Engage with professionals and a growing global community.",
  },
  {
    id: "3",
    title: "Gain clarity & direction",
    description:
      "Learn, ask questions, and make informed career decisions.",
  },
  {
    id: "4",
    title: "Grow with the ecosystem",
    description:
      "As we expand, access opportunities, partnerships, and learning paths.",
  },
];

const Card=() => {
  return (
    <section className="">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {steps.map((step) => (
          <div
            key={step.id}
            className="relative bg-[#EAFFEA] rounded-2xl p-6 md:p-8 overflow-hidden"
          >
            {/* Large background number */}
            <span className="absolute top-4 left-4 text-[80px] font-bold bg-gradient-to-t from-[#EAFFEA] to-[#5DA05D] text-[#EAFFEA] leading-none">
              {step.id}
            </span>

            {/* Content */}
            <div className="relative z-10 ml-10">
              <h3 className="text-lg md:text-xl font-semibold text-gray-900">
                {step.title}
              </h3>
              <p className="mt-2 text-sm md:text-base text-gray-700 max-w-md">
                {step.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
