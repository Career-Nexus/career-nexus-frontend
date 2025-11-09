import { useState } from "react";
import { JobServices } from "../../../api/JobServices";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { SetupSpin } from "../../../assets/icons";
import FloatingMessageIcon from "../chat/FloatingMessage";


const PersonalizeJob = () => {
  const [selectedTitles, setSelectedTitles] = useState([]);
  const [selectedJobType, setSelectedJobType] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("");
  const [locationInput, setLocationInput] = useState("");
  const [selectedIndustries, setSelectedIndustries] = useState([]);
  const [selectedExperience, setSelectedExperience] = useState("");
  const [minSalary, setMinSalary] = useState("");
  const [maxSalary, setMaxSalary] = useState("");
  const [loading, setLoading] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  const jobTitles = [
    "UI/UX Designer",
    "Frontend Developer",
    "Data Scientist",
    "Project Manager",
    "Marketing Manager",
    "Software Engineer",
    "Graphic Designer",
  ];

  const jobTypes = ["Full time", "Part time", "Internship", "Freelance", "Contract"];
  const locations = ["Remote", "Onsite", "Hybrid"];
  const industries = [
    "Technology",
    "Health Care",
    "Software Development",
    "UI/UX & Product Design",
    "Business",
    "Management & Strategy",
    "Retail & E-commerce",
    "Manufacturing",
    "Media & Entertainment",
    "Government & Public Sector",
    "Nonprofit & NGO",
    "Energy & Utilities",
    "Legal Services",
    "Construction & Real Estate",
    "Transportation & Logistics",
    "Agriculture",
    "Finance & Banking",
    "Education",
    "Others",
  ];
  const experienceLevels = ["Entry level", "Mid level", "Senior level", "Executive"];

  const [filteredTitles, setFilteredTitles] = useState(jobTitles);

  const handleSelectTitle = (title) => {
    setSelectedTitles((prev) => {
      const newTitles = prev.includes(title)
        ? prev.filter((t) => t !== title)
        : [...prev, title];
      console.log("Updated selectedTitles:", newTitles);
      return newTitles;
    });
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    setInputValue(value);
    setFilteredTitles(
      jobTitles.filter((title) => title.toLowerCase().includes(value.toLowerCase()))
    );
  };

  const handleInputKeyPress = (e) => {
    if (e.key === "Enter" && inputValue.trim()) {
      setSelectedTitles((prev) =>
        prev.includes(inputValue.trim())
          ? prev
          : [...prev, inputValue.trim()]
      );
      setInputValue("");
      setFilteredTitles(jobTitles);
    }
  };

  const handleSelectLocation = (location) => {
    setSelectedLocation(location);
    if (location === "Remote") {
      setLocationInput("");
    }
  };

  const handleSelectIndustry = (industry) => {
    setSelectedIndustries((prev) =>
      prev.includes(industry) ? prev.filter((i) => i !== industry) : [...prev, industry]
    );
  };

  const handleSave = async () => {
    if (selectedTitles.length === 0) {
      prompt("Please select at least one job title.");
      return;
    }
    setLoading(true);
    setShowModal(true);
    const employmentTypeMap = {
      "Full time": "full_time",
      "Part time": "part_time",
      Internship: "internship",
      Freelance: "freelance",
      Contract: "contract",
    };
    const workTypeMap = {
      Remote: "remote",
      Onsite: "onsite",
      Hybrid: "hybrid",
    };
    const industryMap = {
      Technology: "technology",
      "Health Care": "health",
      Media: "media",
      Sport: "sport",
      Business: "business",
      "Retail & E-commerce": "commerce",
      Manufacturing: "manufacturing",
      Entertainment: "entertainment",
      "Government & Public Sector": "government",
      "Construction & Real Estate": "construction",
      "Transportation & Logistics": "transportation",
      Agriculture: "agriculture",
      "Finance & Banking": "banking",
      Education: "education",
      Others: "others",
    };
    const experienceLevelMap = {
      "Entry level": "entry",
      "Mid level": "mid",
      "Senior level": "senior",
      Executive: "executive",
    };

    const preference = {
      title: selectedTitles.join(", "),
      employment_type: employmentTypeMap[selectedJobType] || "",
      work_type: workTypeMap[selectedLocation] || "",
      location: locationInput || "",
      industry: selectedIndustries.map((ind) => industryMap[ind] || ind).join(", "),
      experience_level: experienceLevelMap[selectedExperience] || "",
      min_salary: minSalary || null,
      max_salary: maxSalary || null,
    };

    console.log("Sending preference payload:", preference);
    setTimeout(async () => {
      try {
        const result = await JobServices.UpdateJobPreferences(preference);
        console.log("API response:", result);
        toast.success("Preferences saved successfully!");
        setShowModal(false);
        navigate("/jobs");
      } catch (error) {
        console.error("Error updating preferences:", error);
        toast.error("Failed to save preferences. Please try again.");
      } finally {
        setLoading(false);
        setShowModal(false);
      }
    }, 3000);
  };
  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow mb-20">
      <h2 className="text-2xl font-bold mb-6">Personalize Your Job Feed</h2>

      {/* Job Titles Section */}
      <div className="mb-8">
        <p className="text-gray-600 mb-3">What job titles are you looking for?</p>
        <input
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          onKeyPress={handleInputKeyPress}
          placeholder="Enter job title..."
          className="w-full p-3 mb-4 border rounded-lg bg-gray-50 focus:ring-2 focus:ring-green-200 focus:border-green-300 outline-none"
        />
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {filteredTitles.map((title) => (
            <button
              key={title}
              onClick={() => handleSelectTitle(title)}
              className={`p-3 border rounded-lg text-sm transition-colors ${
                selectedTitles.includes(title)
                  ? "bg-green-100 border-green-200 text-green-800"
                  : "bg-white border-gray-200 hover:bg-gray-50"
              }`}
            >
              {title}
            </button>
          ))}
        </div>
      </div>

      {/* Job Type Section */}
      <div className="mb-8">
        <p className="text-gray-600 mb-3">Preferred job type:</p>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
          {jobTypes.map((type) => (
            <button
              key={type}
              onClick={() => setSelectedJobType(type)}
              className={`p-3 border rounded-lg text-sm transition-colors ${
                selectedJobType === type
                  ? "bg-green-100 border-green-200 text-green-800"
                  : "bg-white border-gray-200 hover:bg-gray-50"
              }`}
            >
              {type}
            </button>
          ))}
        </div>
      </div>

      {/* Work Location Section */}
      <div className="mb-8">
        <p className="text-gray-600 mb-3">Work location preference:</p>
        <div className="grid grid-cols-3 gap-3 mb-4">
          {locations.map((location) => (
            <button
              key={location}
              onClick={() => handleSelectLocation(location)}
              className={`p-3 border rounded-lg text-sm transition-colors ${
                selectedLocation === location
                  ? "bg-green-100 border-green-200 text-green-800"
                  : "bg-white border-gray-200 hover:bg-gray-50"
              }`}
            >
              {location}
            </button>
          ))}
        </div>

        {(selectedLocation === "Onsite" || selectedLocation === "Hybrid") && (
          <div className="mt-4">
            <input
              type="text"
              value={locationInput}
              onChange={(e) => setLocationInput(e.target.value)}
              placeholder="Enter city or country"
              className="w-full p-3 border rounded-lg bg-gray-50 focus:ring-2 focus:ring-green-200 focus:border-green-300 outline-none text-gray-600"
            />
          </div>
        )}
      </div>

      {/* Industries Section */}
      <div className="mb-8">
        <p className="text-gray-600 mb-3">Industries of interest:</p>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {industries.map((industry) => (
            <button
              key={industry}
              onClick={() => handleSelectIndustry(industry)}
              className={`p-3 border rounded-lg text-sm transition-colors ${
                selectedIndustries.includes(industry)
                  ? "bg-green-100 border-green-200 text-green-800"
                  : "bg-white border-gray-200 hover:bg-gray-50"
              }`}
            >
              {industry}
            </button>
          ))}
        </div>
      </div>

      {/* Experience Level Section */}
      <div className="mb-8">
        <p className="text-gray-600 mb-3">Experience level:</p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {experienceLevels.map((level) => (
            <button
              key={level}
              onClick={() => setSelectedExperience(level)}
              className={`p-3 border rounded-lg text-sm transition-colors ${
                selectedExperience === level
                  ? "bg-green-100 border-green-200 text-green-800"
                  : "bg-white border-gray-200 hover:bg-gray-50"
              }`}
            >
              {level}
            </button>
          ))}
        </div>
      </div>

      {/* Salary Section */}
      <div className="mb-8">
        <p className="text-gray-600 mb-3">Salary expectations (optional):</p>
        <div className="md:flex items-center md:space-x-4">
          <input
            type="text"
            value={minSalary}
            onChange={(e) => setMinSalary(e.target.value)}
            placeholder="Min Salary"
            className="flex-1 md:p-3 w-full border rounded-lg focus:ring-2 focus:ring-green-200 focus:border-green-300 outline-none"
          />
          <span className="text-gray-500">to</span>
          <input
            type="text"
            value={maxSalary}
            onChange={(e) => setMaxSalary(e.target.value)}
            placeholder="Max Salary"
            className="flex-1 md:p-3 w-full border rounded-lg focus:ring-2 focus:ring-green-200 focus:border-green-300 outline-none"
          />
        </div>
        
      </div>

      {/* Save Button */}
      <div className="flex justify-end">
        <button
          onClick={handleSave}
          disabled={loading}
          className={`px-8 py-3 bg-[#5DA05D] text-white rounded-lg font-medium transition-colors ${
            loading ? "opacity-50 cursor-not-allowed" : "hover:bg-[#4a8a4a] active:bg-[#3d7a3d]"
          }`}
        >
          {loading ? "Saving..." : "Save preference"}
        </button>
      </div>

      {/* Modal Overlay */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg flex flex-col items-center justify-center w-64 h-48 border border-gray-300">
            <>
              <img
                src={SetupSpin}
                alt="setup-spin"
                className="animate-spin h-20 w-20 text-[#5B8F4E]"
              />
              <p className="mt-4 text-lg font-semibold text-purple-700">
                Setting up Profile...
              </p>
            </>
          </div>
        </div>
      )}
      <FloatingMessageIcon />
    </div>
  );
};

export default PersonalizeJob;
