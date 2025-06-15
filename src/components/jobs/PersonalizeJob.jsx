import { useState } from "react";
import { JobServices } from "../../api/JobServices";
import { useLocation, useNavigate } from "react-router-dom";

    const PersonalizeJob = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedTitles, setSelectedTitles] = useState([]);
  const [selectedJobType, setSelectedJobType] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("");
  const [selectedIndustries, setSelectedIndustries] = useState([]);
  const [selectedExperience, setSelectedExperience] = useState("");
  const [minSalary, setMinSalary] = useState("");
  const [maxSalary, setMaxSalary] = useState("");
  const [loading, setLoading] = useState(false); // Added loading state
  const navigate = useNavigate();
  const location = useLocation(); // To access state from AllJobs
  const onPreferenceUpdate = location.state?.onPreferenceUpdate; // Retrieve the update function

  const nextStep = () => setCurrentStep((prev) => prev + 1);
  const prevStep = () => setCurrentStep((prev) => prev - 1);

  // API call to update job preferences
  const handleSave = async () => {
    setLoading(true); // Start loading

    const employmentTypeMap = {
      "Full time": "full_time",
      "Part-time": "part_time",
      "Internship": "internship",
      "Freelance": "freelance",
      "Contract": "contract",
    };
    const workTypeMap = {
      "Remote": "remote",
      "Onsite": "onsite",
      "Hybrid": "hybrid",
    };
    const industryMap = {
      "Technology": "technology",
      "Health Care": "health",
      "Media":"media",
      "Sport":"sport",
      "Business": "business",
      "Retail & E-commerce": "commerce",
      "Manufacturing": "manufacturing",
      "Entertainment": "entertainment",
      "Government & Public Sector": "government",
      "Construction & Real Estate": "construction",
      "Transportation & Logistics": "transportation",
      "Agriculture": "agriculture",
      "Finance & Banking": "banking",
      "Education": "education",
      "Others": "others",
    };
    const experienceLevelMap = {
      "Entry level": "entry",
      "Mid level": "mid",
      "Senior level": "senior",
      "Executive": "executive",
    };

    const preference = {
      title: selectedTitles.join(", "), // Join multiple titles with comma
      employment_type: employmentTypeMap[selectedJobType] || "",
      work_type: workTypeMap[selectedLocation] || "",
      industry: selectedIndustries.map((ind) => industryMap[ind] || ind).join(", "), // Map each industry
      experience_level: experienceLevelMap[selectedExperience] || "",
      min_salary: minSalary || null, // Include optional salary fields
      max_salary: maxSalary || null,
    };
    console.log("Sending preference payload:", preference);

    try {
      const result = await JobServices.UpdateJobPreferences(preference);
      console.log("API response:", result);

      // Check if the API call was successful (adjust based on actual response structure)
      if (result?.success || result?.status === 200) {
        if (onPreferenceUpdate) {
          await onPreferenceUpdate(preference); // Trigger the update function from AllJobs
        }
        alert("Preferences saved successfully!");
        navigate("/jobs"); // Navigate to jobs page
      } else {
        console.log("API returned unexpected response:", result);
        alert("Failed to save preferences. Unexpected response from server.");
      }
    } catch (error) {
      console.error("Error updating preferences:", error);
      const errorMessage = error.response?.data?.message || "Failed to save preferences. Please try again.";
      alert(errorMessage);
    } finally {
      setLoading(false); // Stop loading
    }
  };

  return (
    <div>
      {currentStep === 1 && (
        <Step1
          onNext={nextStep}
          selectedTitles={selectedTitles}
          setSelectedTitles={setSelectedTitles}
        />
      )}
      {currentStep === 2 && (
        <Step2
          onNext={nextStep}
          onBack={prevStep}
          selectedJobType={selectedJobType}
          setSelectedJobType={setSelectedJobType}
          selectedLocation={selectedLocation}
          setSelectedLocation={setSelectedLocation}
        />
      )}
      {currentStep === 3 && (
        <Step3
          onBack={prevStep}
          selectedIndustries={selectedIndustries}
          setSelectedIndustries={setSelectedIndustries}
          selectedExperience={selectedExperience}
          setSelectedExperience={setSelectedExperience}
          minSalary={minSalary}
          setMinSalary={setMinSalary}
          maxSalary={maxSalary}
          setMaxSalary={setMaxSalary}
          onSave={handleSave}
          loading={loading} // Pass loading state to Step3
        />
      )}
    </div>
  );
};

// Step 1 Component for Job Titles
const Step1 = ({ onNext, selectedTitles, setSelectedTitles }) => {
  const jobTitles = [
    "UI/UX Designer",
    "Frontend Developer",
    "Data Scientist",
    "Project Manager",
    "Marketing Manager",
    "Software Engineer",
    "Graphic Designer",
  ];
  const [inputValue, setInputValue] = useState("");
  const [filteredTitles, setFilteredTitles] = useState(jobTitles);

  const handleSelect = (title) => {
    setSelectedTitles((prev) =>
      prev.includes(title)
        ? prev.filter((t) => t !== title)
        : [...prev, title]
    );
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    setInputValue(value);
    setFilteredTitles(
      jobTitles.filter((title) =>
        title.toLowerCase().includes(value.toLowerCase())
      )
    );
  };

  return (
    <div className="max-w-6xl mx-auto p-6 bg-white rounded-lg shadow">
      <h2 className="text-2xl font-bold mb-4">Personalize Your Job Feed</h2>
      <div className="flex space-x-4 mb-6">
        <button className="bg-green-100 text-gray-600 px-4 py-2 rounded-lg">
          Job Titles
        </button>
        <button className="bg-gray-50 text-gray-600 px-4 py-2 rounded-lg">
          Job Type & Location
        </button>
        <button className="bg-gray-50 text-gray-600 px-4 py-2 rounded-lg">
          Industries & Experience
        </button>
      </div>
      <p className="text-gray-600 mb-2">What job titles are you looking for?</p>
      <input
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        placeholder="Enter job title..."
        className="w-full p-2 mb-4 border rounded-lg bg-gray-50 focus:ring-2 focus:ring-gray-50 focus:border-gray-100"
      />
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
        {filteredTitles.map((title) => (
          <button
            key={title}
            onClick={() => handleSelect(title)}
            className={`p-2 border rounded-lg ${
              selectedTitles.includes(title) ? "bg-green-100" : "bg-white"
            }`}
          >
            {title}
          </button>
        ))}
      </div>

      <div className="flex">
        <button
          onClick={onNext}
          className="ml-auto w-48 bg-[#5DA05D] text-white py-2 px-5 rounded-lg"
        >
          Next
        </button>
      </div>
    </div>
  );
};

// Step 2 Component for Job Type & Location
const Step2 = ({
  onNext,
  onBack,
  selectedJobType,
  setSelectedJobType,
  selectedLocation,
  setSelectedLocation,
}) => {
  const jobTypes = ["Full time", "Part-time", "Internship", "Freelance", "Contract"];
  const locations = ["Remote", "Onsite", "Hybrid"];

  return (
    <div className="max-w-6xl mx-auto p-6 bg-white rounded-lg shadow w-full">
      <h2 className="text-2xl font-bold mb-4">Personalize Your Job Feed</h2>
      <div className="flex space-x-4 mb-6">
        <button className="bg-green-100 text-gray-600 px-4 py-2 rounded-lg">
          Job Titles
        </button>
        <button className="bg-green-100 text-gray-600 px-4 py-2 rounded-lg">
          Job Type & Location
        </button>
        <button className="bg-gray-50 text-gray-600 px-4 py-2 rounded-lg">
          Industries & Experience
        </button>
      </div>
      <div className="mb-4">
        <p className="text-gray-600 mb-2">Preferred job type:</p>
        <div className="grid grid-cols-3 md:grid-cols-5 gap-2">
          {jobTypes.map((type) => (
            <button
              key={type}
              onClick={() => setSelectedJobType(type)}
              className={`p-2 border rounded-lg ${
                selectedJobType === type ? "bg-green-100" : "bg-white"
              }`}
            >
              {type}
            </button>
          ))}
        </div>
      </div>
      <div className="mb-4">
        <p className="text-gray-600 mb-2">Work location preference:</p>
        <div className="grid grid-cols-3 md:grid-cols-5 gap-2">
          {locations.map((location) => (
            <button
              key={location}
              onClick={() => setSelectedLocation(location)}
              className={`p-2 border rounded-lg ${
                selectedLocation === location ? "bg-green-100" : "bg-white"
              }`}
            >
              {location}
            </button>
          ))}
        </div>
      </div>
      <div className="flex justify-between">
        <button onClick={onBack} className="p-2 bg-gray-200 rounded-full">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="text-gray-600"
          >
            <path
              d="M15 19l-7-7 7-7"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
        <button
          onClick={onNext}
          className="w-1/4 bg-[#5DA05D] text-white py-2 rounded-lg"
        >
          Next
        </button>
      </div>
    </div>
  );
};

// Step 3 Component for Industries & Experience
const Step3 = ({
  onBack,
  selectedIndustries,
  setSelectedIndustries,
  selectedExperience,
  setSelectedExperience,
  minSalary,
  setMinSalary,
  maxSalary,
  setMaxSalary,
  onSave,
  loading, // Receive loading state
}) => {
  const industries = [
    "Technology",
    "Health Care",
    "Media",
    "Sport",
    "Business",
    "Retail & E-commerce",
    "Manufacturing",
    "Entertainment",
    "Government & Public Sector",
    "Construction & Real Estate",
    "Transportation & Logistics",
    "Agriculture",
    "Finance & Banking",
    "Education",
    "Others",
  ];
  const experienceLevels = ["Entry level", "Mid level", "Senior level", "Executive"];

  const handleSelectIndustry = (industry) => {
    setSelectedIndustries((prev) =>
      prev.includes(industry)
        ? prev.filter((i) => i !== industry)
        : [...prev, industry]
    );
  };

  return (
    <div className="max-w-6xl mx-auto p-6 bg-white rounded-lg shadow w-full">
      <h2 className="text-2xl font-bold mb-4">Personalize Your Job Feed</h2>
      <div className="flex space-x-4 mb-6">
        <button className="bg-green-100 text-gray-600 px-4 py-2 rounded-lg">
          Job Titles
        </button>
        <button className="bg-green-100 text-gray-600 px-4 py-2 rounded-lg">
          Job Type & Location
        </button>
        <button className="bg-green-100 text-gray-600 px-4 py-2 rounded-lg">
          Industries & Experience
        </button>
      </div>
      <div className="mb-4">
        <p className="text-gray-600 mb-2">Industries of interest:</p>
        <div className="grid grid-cols-3 gap-2">
          {industries.map((industry) => (
            <button
              key={industry}
              onClick={() => handleSelectIndustry(industry)}
              className={`p-2 border rounded-lg ${
                selectedIndustries.includes(industry) ? "bg-green-100" : "bg-white"
              }`}
            >
              {industry}
            </button>
          ))}
        </div>
      </div>
      <div className="mb-4">
        <p className="text-gray-600 mb-2">Experience level:</p>
        <div className="grid grid-cols-4 gap-2">
          {experienceLevels.map((level) => (
            <button
              key={level}
              onClick={() => setSelectedExperience(level)}
              className={`p-2 border rounded-lg ${
                selectedExperience === level ? "bg-green-100" : "bg-white"
              }`}
            >
              {level}
            </button>
          ))}
        </div>
      </div>
      <div className="mb-4">
        <p className="text-gray-600 mb-2">Salary expectations (optional):</p>
        <div className="flex space-x-2">
          <input
            type="text"
            value={minSalary}
            onChange={(e) => setMinSalary(e.target.value)}
            placeholder="Min Salary"
            className="w-1/2 p-2 border rounded-lg"
          />
          <span className="flex items-center">to</span>
          <input
            type="text"
            value={maxSalary}
            onChange={(e) => setMaxSalary(e.target.value)}
            placeholder="Max Salary"
            className="w-1/2 p-2 border rounded-lg"
          />
        </div>
      </div>
      <div className="flex justify-between">
        <button onClick={onBack} className="p-2 bg-gray-200 rounded-full">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="text-gray-600"
          >
            <path
              d="M15 19l-7-7 7-7"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
        <button
          onClick={onSave}
          className={`w-1/4 bg-[#5DA05D] text-white py-2 rounded-lg ${
            loading ? "opacity-50 cursor-not-allowed" : ""
          }`}
          disabled={loading} // Disable button while loading
        >
          {loading ? "Saving..." : "Save preference"}
        </button>
      </div>
    </div>
  );
};
    // const PersonalizeJob = () => {
    //   const [currentStep, setCurrentStep] = useState(1);
    //   const [selectedTitles, setSelectedTitles] = useState([]);
    //   const [selectedJobType, setSelectedJobType] = useState("");
    //   const [selectedLocation, setSelectedLocation] = useState("");
    //   const [selectedIndustries, setSelectedIndustries] = useState([]);
    //   const [selectedExperience, setSelectedExperience] = useState("");
    //   const [minSalary, setMinSalary] = useState("");
    //   const [maxSalary, setMaxSalary] = useState("");
    //   const navigate = useNavigate()


    //   const nextStep = () => setCurrentStep(prev => prev + 1);
    //   const prevStep = () => setCurrentStep(prev => prev - 1);
     
    //   //api call
    //   const handleSave = async () =>{
    //     const employmentTypeMap = {
    //       "Full time": "full_time",
    //       "Part-time": "part_time",
    //       "Internship": "internship",
    //       "Freelance": "freelance",
    //       "Contract": "contract"
    //     };
    //     const workTypeMap = {
    //       "Remote": "remote",
    //       "Onsite": "onsite",
    //       "Hybrid": "hybrid"
    //     };
    //     const industryMap = {
    //       "Technology": "technology",
    //       "Health Care": "health care",
    //       "Software Development": "software development",
    //       "UI/UX & Product Design": "uiuxproductdesign",
    //       "Business": "business",
    //       "Management & Strategy": "managementstrategy",
    //       "Retail & E-commerce": "retailecommerce",
    //       "Manufacturing": "manufacturing",
    //       "Media & Entertainment": "mediaentertainment",
    //       "Government & Public Sector": "governmentpublicsector",
    //       "Nonprofit & NGO": "nonprofitngo",
    //       "Energy & Utilities": "energyutilities",
    //       "Legal Services": "legalservices",
    //       "Construction & Real Estate": "constructionrealestate",
    //       "Transportation & Logistics": "transportationlogistics",
    //       "Agriculture": "agriculture",
    //       "Finance & Banking": "financebanking",
    //       "Education": "education",
    //       "Others": "others"
    //     };
    //     const experienceLevelMap = {
    //       "Entry level": "entry",
    //       "Mid level": "mid",
    //       "Senior level": "senior",
    //       "Executive": "executive"
    //     };
    //     const preference = {
    //       title: selectedTitles.join(", "), // Join multiple titles with comma
    //       employment_type: employmentTypeMap[selectedJobType] || "",
    //       work_type: workTypeMap[selectedLocation] || "",
    //       industry: selectedIndustries.map(ind => industryMap[ind] || ind).join(", "), // Map each industry
    //       experience_level: experienceLevelMap[selectedExperience] || ""
    //     };
    //     console.log('Sending preference payload:', preference); 
    //     try {
    //       const result = await JobServices.UpdateJobPreferences(preference);
    //       console.log(result.results)
    //       alert("Preferences saved successfully!");
    //       if(result.results){
    //         navigate('/jobs');
    //       }else{
    //         console.log('something went wrong');
    //       }
    //     } catch (error) {
    //       alert("Failed to save preferences. Please check the console for details.");
    //     }
    //   }
    //   // Render the appropriate step based on currentStep
    //   return (
    //     <div>
    //       {currentStep === 1 && <Step1 onNext={nextStep} selectedTitles={selectedTitles} setSelectedTitles={setSelectedTitles} />}
    //       {currentStep === 2 && <Step2 onNext={nextStep} onBack={prevStep} selectedJobType={selectedJobType} setSelectedJobType={setSelectedJobType} selectedLocation={selectedLocation} setSelectedLocation={setSelectedLocation} />}
    //       {currentStep === 3 && <Step3 onBack={prevStep} selectedIndustries={selectedIndustries} setSelectedIndustries={setSelectedIndustries} selectedExperience={selectedExperience} setSelectedExperience={setSelectedExperience} 
    //       minSalary={minSalary} setMinSalary={setMinSalary} maxSalary={maxSalary} setMaxSalary={setMaxSalary} 
    //         onSave={handleSave}
    //       />}
    //     </div>
    //   );
    // };

    // // Step 1 Component for Job Titles
    // const Step1 = ({ onNext, selectedTitles, setSelectedTitles }) => {
    //   const jobTitles = ["UI/UX Designer", "Frontend Developer", "Data Scientist", "Project Manager", "Marketing Manager", "Software Engineer", "Graphic Designer"];
    //   const [inputValue, setInputValue] = useState("");
    //   const [filteredTitles, setFilteredTitles] = useState(jobTitles);


    //   const handleSelect = (title) => {
    //     setSelectedTitles(prev =>
    //       prev.includes(title)
    //         ? prev.filter(t => t !== title)
    //         : [...prev, title]
    //     );
    //   };

    //   // Handle real-time filtering of job titles based on input
    //   const handleInputChange = (e) => {
    //     const value = e.target.value;
    //     setInputValue(value);
    //     setFilteredTitles(
    //       jobTitles.filter(title =>
    //         title.toLowerCase().includes(value.toLowerCase())
    //       )
    //     );
    //   };

    //   return (
    //     <div className="max-w-6xl mx-auto p-6 bg-white rounded-lg shadow">
    //       <h2 className="text-2xl font-bold mb-4">Personalize Your Job Feed</h2>
    //       <div className="flex space-x-4 mb-6">
    //         <button className="bg-green-100 text-gray-600 px-4 py-2 rounded-lg">Job Titles</button>
    //         <button className="bg-gray-50 text-gray-600 px-4 py-2 rounded-lg">Job Type & Location</button>
    //         <button className="bg-gray-50 text-gray-600 px-4 py-2 rounded-lg">Industries & Experience</button>
    //       </div>
    //       <p className="text-gray-600 mb-2">What job titles are you looking for?</p>
    //       <input
    //         type="text"
    //         value={inputValue}
    //         onChange={handleInputChange}
    //         placeholder="Enter job title..."
    //         className="w-full p-2 mb-4 border rounded-lg bg-gray-50 focus:ring-2 focus:ring-gray-50 focus:border-gray-100"
    //       />
    //       <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
    //         {filteredTitles.map((title) => (
    //           <button
    //             key={title}
    //             onClick={() => handleSelect(title)}
    //             className={`p-2 border rounded-lg ${selectedTitles.includes(title) ? 'bg-green-100' : 'bg-white'}`}
    //           >
    //             {title}
    //           </button>
    //         ))}
    //       </div>
          
    //       <div className="flex">
    //         <button onClick={onNext} className="ml-auto w-48 bg-[#5DA05D] text-white py-2 px-5 rounded-lg">Next</button>
    //       </div>
    //     </div>
    //   );
    // };

    // // Step 2 Component for Job Type & Location
    // const Step2 = ({ onNext, onBack, selectedJobType, setSelectedJobType, selectedLocation, setSelectedLocation }) => {
    //   const jobTypes = ["Full time", "Part-time", "Internship", "Freelance", "Contract"];
    //   const locations = ["Remote", "Onsite", "Hybrid"];

    //   return (
    //     <div className="max-w-6xl mx-auto p-6 bg-white rounded-lg shadow w-full">
    //       <h2 className="text-2xl font-bold mb-4">Personalize Your Job Feed</h2>
    //       <div className="flex space-x-4 mb-6">
    //         <button className="bg-green-100 text-gray-600 px-4 py-2 rounded-lg">Job Titles</button>
    //         <button className="bg-green-100 text-gray-600 px-4 py-2 rounded-lg">Job Type & Location</button>
    //         <button className="bg-gray-50 text-gray-600 px-4 py-2 rounded-lg">Industries & Experience</button>
    //       </div>
    //       <div className="mb-4">
    //         <p className="text-gray-600 mb-2">Preferred job type:</p>
    //         <div className="grid grid-cols-3 md:grid-cols-5 gap-2">
    //           {jobTypes.map((type) => (
    //             <button
    //               key={type}
    //               onClick={() => setSelectedJobType(type)}
    //               className={`p-2 border rounded-lg ${selectedJobType === type ? 'bg-green-100' : 'bg-white'}`}
    //             >
    //               {type}
    //             </button>
    //           ))}
    //         </div>
    //       </div>
    //       <div className="mb-4">
    //         <p className="text-gray-600 mb-2">Work location preference:</p>
    //         <div className="grid grid-cols-3 md:grid-cols-5 gap-2">
    //           {locations.map((location) => (
    //             <button
    //               key={location}
    //               onClick={() => setSelectedLocation(location)}
    //               className={`p-2 border rounded-lg ${selectedLocation === location ? 'bg-green-100' : 'bg-white'}`}
    //             >
    //               {location}
    //             </button>
    //           ))}
    //         </div>
    //       </div>
    //       <div className="flex justify-between">
    //         <button onClick={onBack} className="p-2 bg-gray-200 rounded-full">
    //           <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-gray-600">
    //             <path d="M15 19l-7-7 7-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    //           </svg>
    //         </button>
    //         <button onClick={onNext} className="w-1/4 bg-[#5DA05D] text-white py-2 rounded-lg">Next</button>
    //       </div>
    //     </div>
    //   );
    // };

    // // Step 3 Component for Industries & Experience
    // const Step3 = ({ onBack, selectedIndustries, setSelectedIndustries, selectedExperience, setSelectedExperience, minSalary, setMinSalary, maxSalary, setMaxSalary, onSave }) => {
    //   const industries = ["Technology", "Health Care", "Software Development", "UI/UX & Product Design", "Business", "Management & Strategy", "Retail & E-commerce", "Manufacturing", "Media & Entertainment", "Government & Public Sector", "Nonprofit & NGO", "Energy & Utilities", "Legal Services", "Construction & Real Estate", "Transportation & Logistics", "Agriculture", "Finance & Banking", "Education", "Others"];
    //   const experienceLevels = ["Entry level", "Mid level", "Senior level", "Executive"];

    //   // Handle selection of industries
    //   const handleSelectIndustry = (industry) => {
    //     setSelectedIndustries(prev =>
    //       prev.includes(industry)
    //         ? prev.filter(i => i !== industry)
    //         : [...prev, industry]
    //     );
    //   };

    //   return (
    //     <div className="max-w-6xl mx-auto p-6 bg-white rounded-lg shadow w-full">
    //       <h2 className="text-2xl font-bold mb-4">Personalize Your Job Feed</h2>
    //       <div className="flex space-x-4 mb-6">
    //         <button className="bg-green-100 text-gray-600 px-4 py-2 rounded-lg">Job Titles</button>
    //         <button className="bg-green-100 text-gray-600 px-4 py-2 rounded-lg">Job Type & Location</button>
    //         <button className="bg-green-100 text-gray-600 px-4 py-2 rounded-lg">Industries & Experience</button>
    //       </div>
    //       <div className="mb-4">
    //         <p className="text-gray-600 mb-2">Industries of interest:</p>
    //         <div className="grid grid-cols-3 gap-2">
    //           {industries.map((industry) => (
    //             <button
    //               key={industry}
    //               onClick={() => handleSelectIndustry(industry)}
    //               className={`p-2 border rounded-lg ${selectedIndustries.includes(industry) ? 'bg-green-100' : 'bg-white'}`}
    //             >
    //               {industry}
    //             </button>
    //           ))}
    //         </div>
    //       </div>
    //       <div className="mb-4">
    //         <p className="text-gray-600 mb-2">Experience level:</p>
    //         <div className="grid grid-cols-4 gap-2">
    //           {experienceLevels.map((level) => (
    //             <button
    //               key={level}
    //               onClick={() => setSelectedExperience(level)}
    //               className={`p-2 border rounded-lg ${selectedExperience === level ? 'bg-green-100' : 'bg-white'}`}
    //             >
    //               {level}
    //             </button>
    //           ))}
    //         </div>
    //       </div>
    //       <div className="mb-4">
    //         <p className="text-gray-600 mb-2">Salary expectations (optional):</p>
    //         <div className="flex space-x-2">
    //           <input
    //             type="text"
    //             value={minSalary}
    //             onChange={(e) => setMinSalary(e.target.value)}
    //             placeholder="Min Salary"
    //             className="w-1/2 p-2 border rounded-lg"
    //           />
    //           <span className="flex items-center">to</span>
    //           <input
    //             type="text"
    //             value={maxSalary}
    //             onChange={(e) => setMaxSalary(e.target.value)}
    //             placeholder="Max Salary"
    //             className="w-1/2 p-2 border rounded-lg"
    //           />
    //         </div>
    //       </div>
    //       <div className="flex justify-between">
    //         <button onClick={onBack} className="p-2 bg-gray-200 rounded-full">
    //           <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-gray-600">
    //             <path d="M15 19l-7-7 7-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    //           </svg>
    //         </button>
    //         <button onClick={onSave} className="w-1/4 bg-[#5DA05D] text-white py-2 rounded-lg">Save preference</button>
    //       </div>
    //     </div>
    //   );
    // };
    export default PersonalizeJob;