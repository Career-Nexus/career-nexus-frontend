"use client"

import { useState } from "react"
import CreateAccountForm from "../../components/Auth/CreateAccountForm"
import HeroSection from "../../components/Auth/HeroSection"
// import CreateAccountForm from "./CreateAccountForm"

const Signup = () => {
  const [activeTab, setActiveTab] = useState('learner')

  const MentorContent = () => (
    <div className="p-4 text-gray-700">
      <h3 className="text-lg font-semibold mb-2">Welcome Mentor!</h3>
      <p>Share your expertise, guide learners, and build your mentoring profile.</p>
      <ul className="list-disc pl-5 mt-2">
        <li>Create and manage courses</li>
        <li>Host live mentoring sessions</li>
        <li>Track learner progress</li>
      </ul>
    </div>
  )

  const LearnerContent = () => (
    // <div className="flex items-center justify-center bg-white aspect-[7.8/6]">
    <div className="flex items-center justify-center bg-white aspect-[7.8/8]">
      <CreateAccountForm />
    </div>
  )

  return (
    <div className="min-h-screen bg-white">
      <div className="grid grid-cols-12 bg-white">
        {/* Left Column */}
        <div className="col-span-12 lg:col-span-7 hidden md:block rounded-lg ml-5">
          <HeroSection />
        </div>
        {/* Right Column */}
        <div className="col-span-12 lg:col-span-5 px-8 py-8 bg-white">
          <h1 className="text-2xl font-bold text-center mb-8 text-[#3a1c64]">
            Create Account
          </h1>
          <div className="mx-5 px-12">
            <div className="flex bg-gray-100 p-1 rounded-lg mb-4">
              <button
                type="button"
                className={`w-full px-6 py-2 text-sm font-medium rounded-lg ${activeTab === 'learner' ? 'bg-white shadow' : 'bg-gray-100 text-gray-500'}`}
                onClick={() => setActiveTab('learner')}
              >
                AS LEARNER
              </button>
              <button
                type="button"
                className={`w-full px-6 py-2 text-sm font-medium rounded-lg ${activeTab === 'mentor' ? 'bg-white shadow' : 'bg-gray-100 text-gray-500'}`}
                onClick={() => setActiveTab('mentor')}
              >
                AS MENTOR
              </button>
            </div>
            {activeTab === 'learner' ? <LearnerContent /> : <MentorContent />}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Signup

