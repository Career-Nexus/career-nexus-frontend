import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Cookies from 'js-cookie';
import { CnLogo, Cuate } from '../../../assets/images';
import { LoadingIcon } from '../../../icons/icon';
import { toast } from 'react-toastify';
import Select from "react-select";

const CountryCodes = [
    {
        name: "United States",
        code: "US",
        continent: "North America",
        flag: "https://flagcdn.com/us.svg",
        dial_code: "+1",
    },
    {
        name: "Canada",
        code: "CA",
        continent: "North America",
        flag: "https://flagcdn.com/ca.svg",
        dial_code: "+1",
    },
    {
        name: "Mexico",
        code: "MX",
        continent: "North America",
        flag: "https://flagcdn.com/mx.svg",
        dial_code: "+52",
    },
    {
        name: "Brazil",
        code: "BR",
        continent: "South America",
        flag: "https://flagcdn.com/br.svg",
        dial_code: "+55",
    },
    {
        name: "Argentina",
        code: "AR",
        continent: "South America",
        flag: "https://flagcdn.com/ar.svg",
        dial_code: "+54",
    },
    {
        name: "United Kingdom",
        code: "GB",
        continent: "Europe",
        flag: "https://flagcdn.com/gb.svg",
        dial_code: "+44",
    },
    {
        name: "Germany",
        code: "DE",
        continent: "Europe",
        flag: "https://flagcdn.com/de.svg",
        dial_code: "+49",
    },
    {
        name: "France",
        code: "FR",
        continent: "Europe",
        flag: "https://flagcdn.com/fr.svg",
        dial_code: "+33",
    },
    {
        name: "Italy",
        code: "IT",
        continent: "Europe",
        flag: "https://flagcdn.com/it.svg",
        dial_code: "+39",
    },
    {
        name: "Spain",
        code: "ES",
        continent: "Europe",
        flag: "https://flagcdn.com/es.svg",
        dial_code: "+34",
    },
    {
        name: "China",
        code: "CN",
        continent: "Asia",
        flag: "https://flagcdn.com/cn.svg",
        dial_code: "+86",
    },
    {
        name: "India",
        code: "IN",
        continent: "Asia",
        flag: "https://flagcdn.com/in.svg",
        dial_code: "+91",
    },
    {
        name: "Japan",
        code: "JP",
        continent: "Asia",
        flag: "https://flagcdn.com/jp.svg",
        dial_code: "+81",
    },
    {
        name: "South Korea",
        code: "KR",
        continent: "Asia",
        flag: "https://flagcdn.com/kr.svg",
        dial_code: "+82",
    },
    {
        name: "Indonesia",
        code: "ID",
        continent: "Asia",
        flag: "https://flagcdn.com/id.svg",
        dial_code: "+62",
    },
    {
        name: "Nigeria",
        code: "NG",
        continent: "Africa",
        flag: "https://flagcdn.com/ng.svg",
        dial_code: "+234",
    },
    {
        name: "South Africa",
        code: "ZA",
        continent: "Africa",
        flag: "https://flagcdn.com/za.svg",
        dial_code: "+27",
    },
    {
        name: "Egypt",
        code: "EG",
        continent: "Africa",
        flag: "https://flagcdn.com/eg.svg",
        dial_code: "+20",
    },
    {
        name: "Australia",
        code: "AU",
        continent: "Oceania",
        flag: "https://flagcdn.com/au.svg",
        dial_code: "+61",
    },
    {
        name: "New Zealand",
        code: "NZ",
        continent: "Oceania",
        flag: "https://flagcdn.com/nz.svg",
        dial_code: "+64",
    },
];

const apiNoAuth = axios.create({
    baseURL: 'https://btest.career-nexus.com/',
    headers: {
        'Content-Type': 'application/json',
    },
    withCredentials: true,
    //    timeout: 10000,
});

export const MentorProfileSetup = () => {
    const [currentStep, setCurrentStep] = useState(1)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
    const navigate = useNavigate()

    // Step 1 - Basic Profile Data
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [phoneNumber, setPhoneNumber] = useState("")
    const [countryCode, setCountryCode] = useState(CountryCodes[0])
    const [currentJobTitle, setCurrentJobTitle] = useState("")
    const [experienceLevel, setExperienceLevel] = useState("")

    // Step 2 - Skills and Style Data
    const [selectedExpertise, setSelectedExpertise] = useState([])
    const [selectedMentoringStyle, setSelectedMentoringStyle] = useState([])
    const [technicalSkills, setTechnicalSkills] = useState("")
    const [selectedTimezone, setSelectedTimezone] = useState("")

    const [timezones, setTimezones] = useState([])
    const [timezonesLoading, setTimezonesLoading] = useState(false)

    useEffect(() => {
        if (currentStep === 2 && timezones.length === 0) {
            fetchTimezones()
        }
    }, [currentStep])

    const expertiseOptions = [
        "Leadership & Management",
        "Career Development",
        "Technical Skills",
        "Team Development Workshop",
        "Communication",
        "Resume reviewing",
        "Project Management",
        "Sales & Marketing",
    ]

    const mentoringStyleOptions = ["1-on-1 Sessions", "Group Mentoring", "Project Reviews", "A sync Messaging"]

    const countryOptions = CountryCodes.map((country) => ({
        value: country,
        label: (
            <div className="flex items-center gap-1">
                <img src={country.flag || "/placeholder.svg"} alt={`${country.name} Flag`} className="w-5 h-5" />
                <span>{country.dial_code}</span>
            </div>
        ),
    }))

    const toggleExpertise = (option) => {
        setSelectedExpertise((prev) => (prev.includes(option) ? prev.filter((item) => item !== option) : [...prev, option]))
    }

    const toggleMentoringStyle = (option) => {
        setSelectedMentoringStyle((prev) =>
            prev.includes(option) ? prev.filter((item) => item !== option) : [...prev, option],
        )
    }

    const validateStep1 = () => {
        if (!firstName || !lastName || !phoneNumber || !countryCode || !currentJobTitle || !experienceLevel) {
            setError("All fields are required")
            toast.error("All fields are required")
            return false
        }

        const phoneRegex = /^\d{10}$/
        if (!phoneRegex.test(phoneNumber)) {
            setError("Phone number must be 10 digits only")
            toast.error("Phone number must be 10 digits only")
            return false
        }

        return true
    }

    const validateStep2 = () => {
        if (selectedExpertise.length === 0) {
            setError("Please select at least one area of expertise")
            toast.error("Please select at least one area of expertise")
            return false
        }

        if (selectedMentoringStyle.length === 0) {
            setError("Please select at least one mentoring style")
            toast.error("Please select at least one mentoring style")
            return false
        }

        if (!selectedTimezone) {
            setError("Please select your preferred timezone")
            toast.error("Please select your preferred timezone")
            return false
        }

        return true
    }

    const handleNextStep = () => {
        setError(null)

        if (currentStep === 1) {
            if (validateStep1()) {
                setCurrentStep(2)
            }
        }
    }

    const handlePrevStep = () => {
        setError(null)
        setCurrentStep(1)
    }

    const handleSubmit = async () => {
        setError(null)
        setLoading(true)

        if (!validateStep2()) {
            setLoading(false)
            return
        }

        // Convert technical skills string to array
        const technicalSkillsArray = technicalSkills
            ? technicalSkills
                .split(",")
                .map((skill) => skill.trim())
                .filter((skill) => skill)
            : []

        const updatedData = {
            first_name: firstName,
            last_name: lastName,
            phone_number: `${countryCode.dial_code}${phoneNumber}`,
            current_job: currentJobTitle,
            years_of_experience: Number.parseInt(experienceLevel),
            areas_of_expertise: selectedExpertise,
            technical_skills: technicalSkillsArray,
            mentorship_styles: selectedMentoringStyle,
            timezone: selectedTimezone,
        }

        try {
            const tempToken = Cookies.get("temp_token")
            const headers = {}
            if (tempToken) headers["Authorization"] = `Bearer ${tempToken}`

            const response = await apiNoAuth.put("/user/profile-update/", updatedData, { headers })

            if ([200, 201, 204].includes(response.status)) {
                toast.success("Profile updated successfully")
                navigate("/home")
            } else {
                throw new Error(`Unexpected response status: ${response.status}`)
            }
        } catch (err) {
            const errorMessage = err.response
                ? err.response.status === 401
                    ? "Authentication failed: Invalid or missing token. Please complete signup and OTP verification."
                    : err.response.data.message || JSON.stringify(err.response.data)
                : err.message || "Failed to update profile. Please try again."
            setError(errorMessage)
            console.error("Error updating profile:", errorMessage)
        } finally {
            setLoading(false)
        }
    }

    const fetchTimezones = async () => {
        setTimezonesLoading(true)
        try {
            const tempToken = Cookies.get("temp_token")
            const headers = {}
            if (tempToken) headers["Authorization"] = `Bearer ${tempToken}`

            const response = await apiNoAuth.get("/info/choice-data/?field_name=timezones", { headers })
            setTimezones(response.data["Valid options"] || [])
        } catch (error) {
            console.error("Error fetching timezones:", error)
            toast.error("Failed to load timezones")
        } finally {
            setTimezonesLoading(false)
        }
    }

    const renderStep1 = () => (
        <div className="bg-white rounded-lg w-full max-w-2xl ml-28">
            <img src={CnLogo} alt="Logo" className="w-24" />
            <div className="text-sm text-[#6DA05D] mb-2 font-semibold">STEP 1/2</div>
            <h2 className="text-2xl font-bold text-[#2A0D47] mb-6">Let's Complete your mentor profile</h2>

            {error && <div className="text-red-600 mb-4">{error}</div>}

            <div className="flex gap-4 mb-6 w-full">
                <div className="">
                    <label className="block text-gray-700 text-sm font-medium mb-1">
                        First Name <span className="text-red-600">*</span>
                    </label>
                    <input
                        type="text"
                        placeholder="E.g. Michael"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        className="w-full p-2 bg-gray-100 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6DA05D]"
                    />
                    <p className="text-xs text-gray-500 mt-1">Your name should match your government-issued ID</p>
                </div>
                <div className="">
                    <label className="block text-gray-700 text-sm font-medium mb-1">
                        Last Name <span className="text-red-600">*</span>
                    </label>
                    <input
                        type="text"
                        placeholder="E.g. Smith"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        className="w-full p-2 bg-gray-100 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6DA05D]"
                    />
                    <p className="text-xs text-gray-500 mt-1">Your name should match your government-issued ID</p>
                </div>
            </div>

            <div className="flex gap-4 mb-6 w-full">
                <div className="">
                    <label className="block text-gray-700 text-sm font-medium mb-1">
                        Phone Number <span className="text-red-600">*</span>
                    </label>
                    <div className="flex gap-2">
                        <div className="w-24">
                            <Select
                                options={countryOptions}
                                defaultValue={countryOptions[0]}
                                onChange={(selected) => setCountryCode(selected.value)}
                                className="react-select-container"
                                classNamePrefix="react-select"
                            />
                        </div>
                        <input
                            type="text"
                            placeholder="2015555555"
                            value={phoneNumber}
                            onChange={(e) => setPhoneNumber(e.target.value)}
                            className="w-44 p-2 bg-gray-100 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6DA05D]"
                        />
                    </div>
                </div>
                <div className="">
                    <label className="block text-gray-700 text-sm font-medium mb-1">
                        Current Job Title <span className="text-red-600">*</span>
                    </label>
                    <input
                        type="text"
                        placeholder="E.g. Software Engineer"
                        value={currentJobTitle}
                        onChange={(e) => setCurrentJobTitle(e.target.value)}
                        className="w-72 p-2 bg-gray-100 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6DA05D]"
                    />
                </div>
            </div>

            <div className="mb-12 w-[60%]">
                <label className="block text-gray-700 text-sm font-medium mb-1">
                    Years of Experience<span className="text-red-600">*</span>
                </label>
                <select
                    value={experienceLevel}
                    onChange={(e) => setExperienceLevel(e.target.value)}
                    className="w-[69%] p-2 bg-gray-100 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6DA05D]"
                >
                    <option value="" disabled>
                        Select your experience level
                    </option>
                    {Array.from({ length: 10 }, (_, i) => (
                        <option key={i + 1} value={i + 1}>
                            {i + 1}
                        </option>
                    ))}
                </select>
            </div>

            <button
                onClick={handleNextStep}
                className="w-[27%] py-2 px-4 rounded-lg bg-[#5B8F4E] hover:bg-[#5B8F4E] text-white"
            >
                Next Step
            </button>
        </div>
    )

    const renderStep2 = () => (
        <div className="bg-white rounded-lg w-full max-w-4xl ml-28 mb-10">
            <img src={CnLogo} alt="Logo" className="w-24" />
            <div className="text-sm text-[#6DA05D] mb-2 font-semibold">STEP 2/2</div>
            <h2 className="text-2xl font-bold text-[#2A0D47] mb-6">Share Your Skills & Style</h2>

            {error && <div className="text-red-600 mb-4">{error}</div>}

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                {/* Left Column - Areas of Expertise */}
                <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">
                        Areas of Expertise (Select all that apply)
                        <span className="text-red-500">*</span>
                    </h3>

                    <div className="flex flex-wrap gap-3">
                        {expertiseOptions.map((option) => (
                            <button
                                key={option}
                                onClick={() => toggleExpertise(option)}
                                className={`px-4 py-2 rounded-lg border-2 transition-all duration-200 ${selectedExpertise.includes(option)
                                        ? "bg-green-100 border-green-500 text-green-700"
                                        : "bg-white border-gray-300 text-gray-600 hover:border-gray-400"
                                    }`}
                            >
                                {option}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Right Column */}
                <div className="space-y-8">
                    {/* Technical Skills */}
                    <div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">Technical Skills (if applicable)</h3>
                        <input
                            type="text"
                            value={technicalSkills}
                            onChange={(e) => setTechnicalSkills(e.target.value)}
                            placeholder="e.g., Python, React, etc.. (comma-separated)"
                            className="w-[calc(100%-7rem)] px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition-colors"
                        />
                    </div>

                    {/* Preferred Mentoring Style */}
                    <div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">
                            Mentoring Style (Select all that apply)
                            <span className="text-red-500">*</span>
                        </h3>

                        <div className="flex flex-wrap gap-3">
                            {mentoringStyleOptions.map((option) => (
                                <button
                                    key={option}
                                    onClick={() => toggleMentoringStyle(option)}
                                    className={`px-4 py-2 rounded-lg border-2 transition-all duration-200 ${selectedMentoringStyle.includes(option)
                                            ? "bg-green-100 border-green-500 text-green-700"
                                            : "bg-white border-gray-300 text-gray-600 hover:border-gray-400"
                                        }`}
                                >
                                    {option}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Timezone Selection */}
            <div className="mt-8">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    Preferred Time Zone
                    <span className="text-red-500">*</span>
                </h3>
                <select
                    value={selectedTimezone}
                    onChange={(e) => setSelectedTimezone(e.target.value)}
                    disabled={timezonesLoading}
                    className="w-1/2 px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition-colors appearance-none disabled:opacity-50"
                    style={{
                        backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' strokeLinecap='round' strokeLinejoin='round' strokeWidth='1.5' d='m6 8 4 4 4-4'/%3e%3c/svg%3e")`,
                        backgroundPosition: "right 0.5rem center",
                        backgroundRepeat: "no-repeat",
                        backgroundSize: "1.5em 1.5em",
                        paddingRight: "2.5rem",
                    }}
                >
                    <option value="" disabled>
                        {timezonesLoading ? "Loading timezones..." : "Select your preferred time zone"}
                    </option>
                    {timezones.map((timezone) => (
                        <option key={timezone} value={timezone}>
                            {timezone.replace(/_/g, " ")}
                        </option>
                    ))}
                </select>
            </div>

            {/* Navigation Buttons */}
            <div className="flex gap-5 items-center mt-8 pt-6">
                <button
                    onClick={handlePrevStep}
                    className="flex items-center justify-center w-12 h-12 border-2 border-gray-300 rounded-lg text-gray-600 hover:text-gray-800 hover:border-gray-400 transition-colors"
                >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="m15 18-6-6 6-6" />
                    </svg>
                </button>

                <button
                    onClick={handleSubmit}
                    disabled={loading}
                    className={`px-8 py-3 rounded-lg font-medium transition-colors ${loading ? "bg-[#5B8F4E] text-white cursor-not-allowed" : "bg-[#5B8F4E] hover:bg-[#4A7A3E] text-white"
                        }`}
                >
                    {loading ? (
                        <span className="flex items-center gap-2">
                            <LoadingIcon />
                            Saving...
                        </span>
                    ) : (
                        "Save/Continue"
                    )}
                </button>
            </div>
        </div>
    )

    return (
        <div className="grid grid-cols-12 relative">
            <div className="col-span-12 md:col-span-9">
                {currentStep === 1 ? renderStep1() : renderStep2()}
            </div>

            <div className="col-span-12 md:col-span-3 hidden md:block">
                <div className="sticky top-0 h-screen flex justify-center items-center bg-[#E6FFEB33]">
                    <div className="bg-[#E6FFEB33] rounded-lg w-full max-w-2xl">
                        <img
                            src="/images/mentor-profile-img.png"
                            alt="Profile setup"
                            className="w-full h-[600px] object-cover"
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}