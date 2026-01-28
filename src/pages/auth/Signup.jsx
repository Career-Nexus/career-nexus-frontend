"use client"

import { useState } from "react"
import CreateAccountForm from "../../components/Auth/CreateAccountForm"
import HeroSection from "../../components/Auth/HeroSection"
import MentorAccountForm from "../../components/Auth/MentorAccountForm"
import MentorHero from "../../components/Auth/MentorHero"
// import CreateAccountForm from "./CreateAccountForm"

const Signup = () => {
  const [activeTab, setActiveTab] = useState('learner')

  const MentorContent = () => (
    <div className="flex items-center justify-center bg-white aspect-[7.8/8]">
      <MentorAccountForm/>
    </div>
  )

  const LearnerContent = () => (
    // <div className="flex items-center justify-center bg-white aspect-[7.8/6]">
    <div className="flex items-center justify-center bg-white aspect-[7.8/8]">
      <CreateAccountForm />
    </div>
  )

  return (
    <div className="h-screen bg-white overflow-hidden">
      <div className="grid grid-cols-12 bg-white">
        {/* Left Column */}
        <div className="col-span-12 lg:col-span-6 hidden md:block">
          {activeTab ==='learner'? <HeroSection />:<MentorHero/>}
        </div>
        {/* Right Column */}
        <div className="col-span-12 lg:col-span-6 py-6 bg-white w-full">
          <h1 className="text-2xl font-bold text-center mb-3 text-[#3a1c64]">
            Create Account
          </h1>
          <div className="mx-5 px-6">
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

