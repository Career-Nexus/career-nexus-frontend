import React, { useState } from 'react'
import SavedPost from './SavedPost'
import SavedMentors from '../mentorship/SavedMentors'
import { OtherJobs } from '../jobs/UsersJob'
import SavedJobs from '../jobs/SavedJobs'

function Saved() {
    const [activeTab, setActiveTab] = useState("posts")

    return (
        <div className="w-full max-w-4xl mx-auto">
            <h1 className='text-4xl font-bold mb-6'>Saved</h1>
            <div className="flex bg-gray-100 p-1 rounded-lg mb-4">
                <button
                    type="button"
                    className={`w-full px-6 py-2 text-sm font-medium rounded-lg ${activeTab === 'posts' ? 'bg-white shadow' : 'bg-gray-100 text-gray-500'}`}
                    onClick={() => setActiveTab('posts')}
                >
                   POSTS
                </button>
                <button
                    type="button"
                    className={`w-full px-6 py-2 text-sm font-medium rounded-lg ${activeTab === 'mentors' ? 'bg-white shadow' : 'bg-gray-100 text-gray-500'}`}
                    onClick={() => setActiveTab('mentors')}
                >
                    MENTORS
                </button>
                <button
                    type="button"
                    className={`w-full px-6 py-2 text-sm font-medium rounded-lg ${activeTab === 'jobs' ? 'bg-white shadow' : 'bg-gray-100 text-gray-500'}`}
                    onClick={() => setActiveTab('jobs')}
                >
                   JOBS
                </button>
            </div>

            <div className="mt-6">
                {activeTab === "posts" && <SavedPost />}
                {activeTab === "mentors" && <SavedMentors />}
                {activeTab === "jobs" && <SavedJobs />}
            </div>
        </div>
    )
}

export default Saved