import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Cookies from 'js-cookie';
import { CnLogo, Cuate } from '../../../assets/images';
import { LoadingIcon } from '../../../icons/icon';
import { toast } from 'react-toastify';
import Select from "react-select";
import { CountryCodes } from '../CountryCodes';
import api, { authService } from '../../../api/ApiServiceThree';


const apiNoAuth = axios.create({
    baseURL: 'https://bprod.career-nexus.com/',
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
    // Step 3 - Additional Data
    const [linkedinProfileUrl, setLinkedinProfileUrl] = useState("")
    const [resumeCvUpload, setResumeCvUpload] = useState(null)
    //const [selectedResumeFile, setSelectedResumeFile] = useState(null)

    const handleResumeChange = (e) => {
        const file = e.target.files[0]
        setResumeCvUpload(file)
    }

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

        const phoneRegex = /^\d{10,15}$/;
        if (!phoneRegex.test(phoneNumber)) {
            setError("Phone number must be between 10 and 15 digits")
            toast.error("Phone number must be between 10 and 15 digits")
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
    const validateStep3 = () => {
        if (!linkedinProfileUrl) {
            setError("Please enter your LinkedIn profile URL")
            toast.error("Please enter your LinkedIn profile URL")
            return false
        }
        if (!resumeCvUpload) {
            setError("Please upload your Resume/CV")
            toast.error("Please upload your Resume/CV")
            return false
        }
        return true
    }
    const handleNextStep = () => {
        setError(null);

        if (currentStep === 1) {
            if (validateStep1()) {
                setCurrentStep(2);
            }
        } else if (currentStep === 2) {
            if (validateStep2()) {
                setCurrentStep(3);
            }
        }
    };

    const handlePrevStep = () => {
        setError(null)
        if (currentStep === 2) {
            setCurrentStep(1)
        }
        if (currentStep === 3) {
            setCurrentStep(2)
        }
    }
    const handleSubmit = async () => {
        setError(null);
        setLoading(true);

        if (!validateStep3()) {
            setLoading(false);
            return;
        }

        const technicalSkillsArray = technicalSkills
            ? technicalSkills.split(",").map((s) => s.trim()).filter(Boolean)
            : [];

        const formData = new FormData();
        formData.append("first_name", firstName);
        formData.append("last_name", lastName);
        formData.append("phone_number", `${countryCode.dial_code}${phoneNumber}`);
        formData.append("current_job", currentJobTitle);
        formData.append("years_of_experience", Number.parseInt(experienceLevel));
        formData.append("areas_of_expertise", JSON.stringify(selectedExpertise));
        formData.append("technical_skills", JSON.stringify(technicalSkillsArray));
        formData.append("mentorship_styles", JSON.stringify(selectedMentoringStyle));
        formData.append("timezone", selectedTimezone);
        formData.append("linkedin_url", linkedinProfileUrl);
        if (resumeCvUpload) {
            formData.append("resume", resumeCvUpload);
        }

        try {
            const accessToken = Cookies.get("access_token");
            const headers = {};
            if (accessToken) headers["Authorization"] = `Bearer ${accessToken}`;

            const response = await api.put("/user/profile-update/", formData, {
                headers: {
                    ...headers,
                    "Content-Type": "multipart/form-data",
                },
            });

            if ([200, 201, 204].includes(response.status)) {
                toast.success("Profile updated successfully");
                navigate("/complete");
            } else {
                throw new Error(`Unexpected response status: ${response.status}`);
            }
        } catch (err) {
            const errorMessage = err.response
                ? err.response.status === 401
                    ? "Authentication failed: Invalid or missing token. Please complete signup and OTP verification."
                    : err.response.data.message || JSON.stringify(err.response.data)
                : err.message || "Failed to update profile. Please try again.";
            setError(errorMessage);
            console.error("Error updating profile:", errorMessage);
        } finally {
            setLoading(false);
        }
    };

    const fetchTimezones = async () => {
        setTimezonesLoading(true)
        try {
            const accessToken = Cookies.get("access_token")
            const headers = {}
            if (accessToken) headers["Authorization"] = `Bearer ${accessToken}`

            const response = await api.get("/info/choice-data/?field_name=timezones", { headers })
            setTimezones(response.data["Valid options"] || [])
        } catch (error) {
            console.error("Error fetching timezones:", error)
            toast.error("Failed to load timezones")
        } finally {
            setTimezonesLoading(false)
        }
    }

    const renderStep1 = () => (
        <div className="bg-white rounded-lg w-full max-w-3xl ml-28">
            <img src={CnLogo} alt="Logo" className="w-24" />
            <div className="text-sm text-[#6DA05D] mb-2 font-semibold">STEP 1/3</div>
            <h2 className="text-2xl font-bold text-[#2A0D47] mb-6">Let's Complete your mentor profile</h2>

            {error && <div className="text-red-600 mb-4">{error}</div>}

            <div className="flex gap-8 mb-6 w-full">
                <div className="w-full">
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
                <div className="w-full">
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

            <div className="flex gap-8 mb-6 w-full">
                <div className="w-full">
                    <label className="block text-gray-700 text-sm font-medium mb-1">
                        Phone Number <span className="text-red-600">*</span>
                    </label>
                    <div className="flex gap-2">
                        <div className="w-48 bg-gray-100 border border-gray-300 rounded-lg focus:outline-none focus:ring-0 focus:ring-[#6DA05D]">
                            <Select
                                options={countryOptions}
                                defaultValue={countryOptions[0]}
                                onChange={(selected) => setCountryCode(selected.value)}
                                className="react-select-container bg-gray-100 border border-gray-300 rounded-lg focus:outline-none focus:ring-0 focus:ring-[#6DA05D]"
                                classNamePrefix="react-select"
                            />
                        </div>
                        <input
                            type="text"
                            placeholder="2015555555"
                            value={phoneNumber}
                            onChange={(e) => setPhoneNumber(e.target.value)}
                            className="w-full p-2 bg-gray-100 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6DA05D]"
                        />
                    </div>
                </div>
                <div className="w-full">
                    <label className="block text-gray-700 text-sm font-medium mb-1">
                        Current Job Title <span className="text-red-600">*</span>
                    </label>
                    <input
                        type="text"
                        placeholder="E.g. Software Engineer"
                        value={currentJobTitle}
                        onChange={(e) => setCurrentJobTitle(e.target.value)}
                        className="w-full p-2 bg-gray-100 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6DA05D]"
                    />
                </div>
            </div>

            <div className="mb-12 w-full gap-8">
                <label className="block text-gray-700 text-sm font-medium mb-1">
                    Years of Experience<span className="text-red-600">*</span>
                </label>
                <select
                    value={experienceLevel}
                    onChange={(e) => setExperienceLevel(e.target.value)}
                    className="w-[48%] p-2 bg-gray-100 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6DA05D]"
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
                Save/Continue
            </button>
        </div>
    )

    const renderStep2 = () => (
        <div className="bg-white rounded-lg w-full max-w-4xl ml-28 mb-10">
            <img src={CnLogo} alt="Logo" className="w-24" />
            <div className="text-sm text-[#6DA05D] mb-2 font-semibold">STEP 2/3</div>
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
                                    ? "bg-green-100 border-[#5B8F4E] text-[#5B8F4E]"
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
                            className="w-[calc(100%-7rem)] px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5B8F4E] focus:border-[#5B8F4E] outline-none transition-colors"
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
                                        ? "bg-green-100 border-[#5B8F4E] text-[#5B8F4E]"
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
                    className="w-1/2 px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5B8F4E] focus:border-[#5B8F4E] outline-none transition-colors appearance-none disabled:opacity-50"
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
                    onClick={handleNextStep}
                    className="w-[27%] py-2 px-4 rounded-lg bg-[#5B8F4E] hover:bg-[#5B8F4E] text-white"
                >
                    Save/Continue
                </button>
            </div>
        </div>
    )
    const renderStep3 = () => (
        <div className="bg-white rounded-lg w-full max-w-4xl ml-28 mb-10">
            <img src={CnLogo} alt="Logo" className="w-24" />
            <div className="text-sm text-[#6DA05D] mb-2 font-semibold">STEP 3/3</div>
            <h2 className="text-2xl font-bold text-[#2A0D47] mb-6">Let's verify your experience</h2>

            {error && <div className="text-red-600 mb-4">{error}</div>}

            <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    LinkedIn Profile URL
                    <span className="text-red-500">*</span>
                </h3>
                <input
                    type="url"
                    value={linkedinProfileUrl}
                    onChange={(e) => setLinkedinProfileUrl(e.target.value)}
                    className="w-1/2 px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5B8F4E] focus:border-[#5B8F4E] outline-none transition-colors"
                    placeholder="https://www.linkedin.com/in/your-profile"
                />
            </div>
            <div className="my-5 w-full">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    Resume/CV Upload <span className="text-red-500">*</span>
                </h3>

                <label
                    className="w-[500px] h-[160px] flex items-center justify-center px-4 py-4 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5B8F4E] focus:border-[#5B8F4E] outline-none transition-colors cursor-pointer text-center"
                >
                    <input
                        type="file"
                        accept=".pdf,.doc,.docx"
                        className="hidden"
                        onChange={handleResumeChange}
                    />
                    <div className="flex flex-col items-center justify-center gap-2">
                        {!resumeCvUpload && (
                            <div>
                                <h1 className="text-lg font-semibold">Upload Your Resume/CV</h1>
                                <p className="text-sm text-gray-600">PDF, DOC, DOCX (Max 5MB)</p>
                            </div>
                        )}

                        {!resumeCvUpload ? (
                            <span className="text-[#5B8F4E] border-2 border-[#5B8F4E] px-3 py-1 rounded-lg">
                                Click to Upload
                            </span>
                        ) : (
                            <span className="text-gray-700 flex flex-col items-center gap-2">
                                <span>Resume Uploaded Successfully</span>
                                <span className="text-sm text-gray-500 bg-[#D9FFDB] px-2 py-1 rounded-lg">
                                    {resumeCvUpload.name}
                                </span>
                                <span className="text-[#5B8F4E] border-2 border-[#5B8F4E] px-3 py-1 rounded-lg">
                                    Click to Replace
                                </span>
                            </span>
                        )}
                    </div>
                </label>
            </div>
            <div className="flex gap-5 items-center pt-6">
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
                            Verifying...
                        </span>
                    ) : (
                        "Verify"
                    )}
                </button>
            </div>
        </div>
    )
    return (
        <div className="grid grid-cols-12 relative">
            <div className="col-span-12 md:col-span-9">
                {currentStep === 1 ? renderStep1() : currentStep === 2 ? renderStep2() : renderStep3()}
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