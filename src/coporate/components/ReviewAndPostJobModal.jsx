import React from 'react'

export default function ReviewAndPostJobModal({onClose, isOpen}) {
    return (
        <div
            className="fixed inset-0 bg-black/50 flex justify-center items-center z-50"
            onClick={(e) => e.target === e.currentTarget && onClose()} // close on backdrop click
        >
            <div className="bg-white w-full max-w-md md:max-w-2xl rounded-lg shadow-lg overflow-y-auto no-scrollbar flex flex-col">
                {/* Header */}
                <div className="flex justify-between items-center p-4 border-b">
                    <h2 className="text-lg font-semibold text-gray-800">Applicants</h2>
                    <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
                        <X className="w-5 h-5" />
                    </button>
                </div>
                <div className="bg-white p-8 rounded-lg shadow">
                    <h2 className="text-lg font-semibold mb-2">Post A New Job</h2>
                    <p className="text-gray-500 mb-6">
                        Fill out the details below to attract the best candidates for your position.
                    </p>

                    <form
                        className="space-y-4"
                        onSubmit={(e) => {
                            e.preventDefault();
                            createAJob();
                        }}
                    >
                        <div>
                            <label className="block text-sm font-medium mb-1">Job Title*</label>
                            <input
                                value={formData.title}
                                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                type="text"
                                placeholder="e.g. Senior UI/UX Designer"
                                className="w-full border border-gray-200 bg-[#FAFAFA] rounded-md p-2 focus:outline-[#5DA05D]"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1">Organization*</label>
                            <input
                                value={formData.organization}
                                onChange={(e) => setFormData({ ...formData, organization: e.target.value })}
                                type="text"
                                placeholder="e.g. Acme Corp"
                                className="w-full border border-gray-200 bg-[#FAFAFA] rounded-md p-2 focus:outline-[#5DA05D]"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-1">Experience Level*</label>
                            <select
                                value={formData.experience_level}
                                onChange={(e) => setFormData({ ...formData, experience_level: e.target.value })}
                                className="w-full border border-gray-200 bg-[#FAFAFA] rounded-md p-2 focus:outline-[#5DA05D]"
                            >
                                <option>Select Level</option>
                                <option value="entry">Entry</option>
                                <option value="mid">Mid-level</option>
                                <option value="senior">Senior</option>
                                <option value="executive">Executive</option>
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-1">Job Description*</label>
                            <textarea
                                value={formData.description}
                                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                rows="4"
                                placeholder="Provide a detailed description..."
                                className="w-full border border-gray-200 bg-[#FAFAFA] rounded-md p-2 focus:outline-[#5DA05D]"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-1">Requirements</label>
                            <textarea
                                value={formData.overview}
                                onChange={(e) => setFormData({ ...formData, overview: e.target.value })}
                                rows="3"
                                placeholder="List key qualifications and skills..."
                                className="w-full border border-gray-200 bg-[#FAFAFA] rounded-md p-2 focus:outline-[#5DA05D]"
                            />
                        </div>

                        {/* Location + Work Type + Employment Type */}
                        <div className="grid grid-cols-3 gap-4">
                            <div>
                                <label className="block text-sm font-medium mb-1">Location*</label>
                                <input
                                    value={formData.country}
                                    onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                                    type="text"
                                    placeholder="e.g. New York, NY"
                                    className="w-full border border-gray-200 bg-[#FAFAFA] rounded-md p-2 focus:outline-[#5DA05D]"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">Work Type</label>
                                <select
                                    value={formData.work_type}
                                    onChange={(e) => setFormData({ ...formData, work_type: e.target.value })}
                                    className="w-full border border-gray-200 bg-[#FAFAFA] rounded-md p-2 focus:outline-[#5DA05D]"
                                >
                                    <option>Select Work Type</option>
                                    <option value="remote">Remote</option>
                                    <option value="onsite">On-site</option>
                                    <option value="hybrid">Hybrid</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">Employment Type</label>
                                <select
                                    value={formData.employment_type}
                                    onChange={(e) => setFormData({ ...formData, employment_type: e.target.value })}
                                    className="w-full border border-gray-200 bg-[#FAFAFA] rounded-md p-2 focus:outline-[#5DA05D]"
                                >
                                    <option>Select Employment Type</option>
                                    <option value="full_time">Full-time</option>
                                    <option value="part_time">Part-time</option>
                                    <option value="internship">Internship</option>
                                    <option value="freelance">Freelance</option>
                                    <option value="contract">Contract</option>
                                </select>
                            </div>
                        </div>

                        {/* Salary Range */}
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium mb-1">Minimum Salary</label>
                                <input
                                    type="number"
                                    placeholder="8000"
                                    className="w-full border border-gray-200 bg-[#FAFAFA] rounded-md p-2 focus:outline-[#5DA05D]"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">Maximum Salary</label>
                                <input
                                    value={formData.salary}
                                    onChange={(e) => setFormData({ ...formData, salary: e.target.value })}
                                    type="number"
                                    placeholder="120000"
                                    className="w-full border border-gray-200 bg-[#FAFAFA] rounded-md p-2 focus:outline-[#5DA05D]"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-1">Application Deadline</label>
                            <input type="date" className="w-full border border-gray-200 bg-[#FAFAFA] rounded-md p-2 focus:outline-[#5DA05D]" />
                        </div>

                        <div className="flex gap-3 justify-end pt-4">
                            <button
                                onClick={() => { setFormData({ ...formData, status: "draft" }); }}
                                type="submit"
                                className="border border-[#5DA05D] text-[#5DA05D] px-4 py-1 rounded-md hover:bg-green-50"
                            >
                                Save Draft
                            </button>
                            <button
                                onClick={() => { setFormData({ ...formData, status: "active" }); }}
                                type="submit"
                                className="bg-[#5DA05D] text-white px-4 py-1 rounded-md hover:bg-[#5DA05D]"
                            >
                                Post Job
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}
