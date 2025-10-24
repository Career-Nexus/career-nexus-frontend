import React, { useState, useRef } from "react";
import CNLogo from "../assets/images/cn-1.png"
import { ArrowLeft } from 'lucide-react'
import CompanyProfileModalFlow from "./components/CompanyProfileModalFlow"


export default function CompanyProfileSetup() {
    const [showModal, setShowModal] = useState(false);

    const [form, setForm] = useState({
        companyName: "",
        companyEmail: "",
        companyType: "",
        companySize: "",
        companyWebsite: "",
        companyLocation: "",
        industry: "",
        tagline: "",
        logo: null,
    });

  const fileInputRef = useRef(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((s) => ({ ...s, [name]: value }));
  };

  const handleFilePick = (e) => {
    const file = e.target.files?.[0] ?? null;
    setForm((s) => ({ ...s, logo: file }));
  };

  const triggerFileDialog = () => fileInputRef.current?.click();

  const handleSubmit = (e) => {
    e.preventDefault();
    // submission logic omitted by request — currently logs the state
    setShowModal(true);
  };

  return (
    <div className="w-full min-h-screen bg-[#FFFFFF] flex">      
        
        <div className="w-[85%]">
            <div className="w-[80%] ml-[7.44rem] flex flex-col gap-2">
                <div className="mt-8 mb-[4rem]">                    
                  <img className="h-[80px] " src={CNLogo}alt="career Nexus" />
                </div>
                <a
                href="#"
                className="inline-flex items-center text-[#7cc264] text-sm font-medium mb-3 hover:underline"
                onClick={(e) => e.preventDefault()}
                aria-label="Back"
                >
                    <ArrowLeft className="mr-2" />
                    BACK
                </a>

                <h2 className="text-3xl md:text-4xl font-bold text-[#3C1053] mb-8">
                    Let’s set up your company profile
                </h2>

                <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Left column */}
                <div className="space-y-6">
                    <div>
                    <label className="block text-sm font-semibold text-gray-700">
                        Company name <span className="text-red-600">*</span>
                    </label>
                    <input
                        name="companyName"
                        value={form.companyName}
                        onChange={handleChange}
                        placeholder="E.g Micheal"
                        className="mt-2 block w-full rounded-xl bg-[#FAFAFA] border border-gray-200 px-4 py-3 placeholder-gray-300 text-gray-700 shadow-sm focus:outline-none focus:ring-2 focus:ring-pink-200"
                    />
                    <p className="text-xs text-gray-400 mt-2">Use your legal business name as registered</p>
                    </div>

                    <div>
                    <label className="block text-sm font-semibold text-gray-700">
                        Company Email <span className="text-red-600">*</span>
                    </label>
                    <input
                        name="companyEmail"
                        value={form.companyEmail}
                        onChange={handleChange}
                        placeholder="E.g http:// or www."
                        className="mt-2 block w-full rounded-xl bg-[#FAFAFA] border border-gray-200 px-4 py-3 placeholder-gray-300 text-gray-700 shadow-sm focus:outline-none focus:ring-2 focus:ring-pink-200"
                    />
                    </div>

                    <div>
                    <label className="block text-sm font-semibold text-gray-700">
                        Company type <span className="text-red-600">*</span>
                    </label>
                    <select
                        name="companyType"
                        value={form.companyType}
                        onChange={handleChange}
                        className="mt-2 block w-full rounded-xl bg-[#FAFAFA] border border-gray-200 px-4 py-3 text-gray-700 shadow-sm focus:outline-none focus:ring-2 focus:ring-pink-200"
                    >
                        <option value="">Select company type</option>
                        <option value="private">Private</option>
                        <option value="public">Public</option>
                        <option value="ngo">NGO</option>
                        <option value="startup">Startup</option>
                    </select>
                    </div>

                    <div>
                    <label className="block text-sm font-semibold text-gray-700">
                        Company size <span className="text-red-600">*</span>
                    </label>
                    <select
                        name="companySize"
                        value={form.companySize}
                        onChange={handleChange}
                        className="mt-2 block w-full rounded-xl bg-[#FAFAFA] border border-gray-200 px-4 py-3 text-gray-700 shadow-sm focus:outline-none focus:ring-2 focus:ring-pink-200"
                    >
                        <option value="">Select company size</option>
                        <option value="1-10">1 - 10</option>
                        <option value="11-50">11 - 50</option>
                        <option value="51-200">51 - 200</option>
                        <option value="200+">200+</option>
                    </select>
                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-gray-700">
                            Company Website <span className="text-red-600">*</span>
                        </label>
                        <input
                            name="companyWebsite"
                            value={form.companyWebsite}
                            onChange={handleChange}
                            placeholder="E.g https://company.com"
                            className="mt-2 block w-full rounded-xl bg-[#FAFAFA] border border-gray-200 px-4 py-3 placeholder-gray-300 text-gray-700 shadow-sm focus:outline-none focus:ring-2 focus:ring-pink-200"
                        />
                    </div>
                </div>

                {/* Right column */}
                <div className="space-y-6">
                    <div>
                    <label className="block text-sm font-semibold text-gray-700">
                        Company Location <span className="text-red-600">*</span>
                    </label>
                    <input
                        name="companyLocation"
                        value={form.companyLocation}
                        onChange={handleChange}
                        placeholder="E.g Smith"
                        className="mt-2 block w-full rounded-xl bg-[#FAFAFA] border border-gray-200 px-4 py-3 placeholder-gray-300 text-gray-700 shadow-sm focus:outline-none focus:ring-2 focus:ring-pink-200"
                    />
                    </div>

                    <div>
                    <label className="block text-sm font-semibold text-gray-700">
                        Industry/sector <span className="text-red-600">*</span>
                    </label>
                    <input
                        name="industry"
                        value={form.industry}
                        onChange={handleChange}
                        placeholder="E.g Fintech"
                        className="mt-2 block w-full rounded-xl bg-[#FAFAFA] border border-gray-200 px-4 py-3 placeholder-gray-300 text-gray-700 shadow-sm focus:outline-none focus:ring-2 focus:ring-pink-200"
                    />
                    </div>

                    <div>
                    <label className="block text-sm font-semibold text-gray-700">Company Logo</label>
                    <div className="mt-2 flex items-center space-x-4">
                        <div className="flex items-center justify-between w-full rounded-xl bg-[#FAFAFA] border border-gray-200 px-4 py-3 shadow-sm">
                        <div className="truncate">
                            {form.logo ? form.logo.name : "Select file"}
                        </div>
                        <button
                            type="button"
                            onClick={triggerFileDialog}
                            className="ml-4 inline-flex items-center rounded-md bg-white border border-gray-200 px-3 py-1 text-sm font-semibold hover:shadow"
                        >
                            Choose File
                        </button>
                        </div>
                    </div>
                    <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/png,image/jpeg"
                        className="hidden"
                        onChange={handleFilePick}
                    />
                    <p className="text-xs text-gray-400 mt-2">300×300px JPG/PNG supported.</p>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Company Tagline (100 words)</label>
                        <textarea
                            name="tagline"
                            value={form.tagline}
                            onChange={handleChange}
                            rows={5}
                            placeholder="E.g Where Talent Meets Opportunity..."
                            className="mt-2 block w-full rounded-xl bg-[#FAFAFA] border border-gray-200 px-4 py-3 placeholder-gray-300 text-gray-700 shadow-sm focus:outline-none focus:ring-2 focus:ring-pink-200"
                        />
                    </div>
                </div>

                {/* Full-width Save button row (spans both columns) */}
                <div className="md:col-span-2 pt-4">
                    <div className="flex justify-start">
                        <button
                            type="submit"
                            className="inline-flex items-center px-6 py-3 bg-[#5DA05D] hover:bg-[#7cb334] text-white rounded-md font-medium shadow transition"
                        >
                            Save/Continue
                        </button>
                    </div>
                </div>
                </form>
            </div>
        </div>
        
        <div className="w-[5%] bg-[#D9FFE1DB]"></div>
        <div className="w-[10%] bg-[rgba(93,160,93,0.38)]"></div>

        {showModal && (
            <CompanyProfileModalFlow onClose={() => setShowModal(false)} />
        )}        
    </div>
  );
}
