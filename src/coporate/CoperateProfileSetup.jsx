import React, { useState, useRef, useEffect } from "react";
import CNLogo from "../assets/images/cn-1.png";
import { ArrowLeft } from "lucide-react";
import CompanyProfileModalFlow from "./components/CompanyProfileModalFlow";
import { toast } from "react-toastify";
import { CorporateServices } from "../api/CoporateServices";
import { Link } from "react-router-dom";

export default function CompanyProfileSetup() {
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [industryOptions, setIndustryOptions] = useState([]);
  const [companyTypeOptions, setCompanyTypeOptions] = useState([]);
  const [companySizeOptions, setCompanySizeOptions] = useState([]);  

    useEffect(() => {
        const fetchChoiceData = async () => {
        try {
            const [industryRes, typeRes, sizeRes] = await Promise.all([
            CorporateServices.getChoiceFieldData("industry"),
            CorporateServices.getChoiceFieldData("company_type"),
            CorporateServices.getChoiceFieldData("company_size"),
            ]);

            setIndustryOptions(industryRes["Valid options"] || industryRes.valid_options || []);
            setCompanyTypeOptions(typeRes["Valid options"] || typeRes.valid_options || []);
            setCompanySizeOptions(sizeRes["Valid options"] || sizeRes.valid_options || []);
        } catch (err) {
            console.error(err);
            toast.error("Failed to load choice fields");
        }
        };

        fetchChoiceData();
    }, []);

  const [form, setForm] = useState({
    companyName: "",
    companyEmail: "",
    companyType: "",
    companySize: "",
    companyWebsite: "",
    companyLocation: "",
    industry: "",
    tagline: "",
    logo: "",
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

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(form.companyEmail)) {
        toast.error("Please enter a valid company email address");
        return;
    }

    // Just show the modal now
    setShowModal(true);
  };


return (
  <div className="w-full min-h-screen bg-[#FFFFFF] flex">      
      
    <div className="md:w-[85%] mx-auto">
      <div className="md:w-[80%] md:ml-[7.44rem] flex flex-col gap-1 md:gap-2">
        <div className="hidden md:block mt-8 mb-[4rem]">                    
          <img className="h-[80px] " src={CNLogo}alt="career Nexus" />
        </div>
        <Link
        to={'/home'}
        className="inline-flex items-center text-[#5DA05D] text-sm md:font-medium mt-2 md:mb-3 hover:underline"
        //onClick={(e) => e.preventDefault()}
        aria-label="Back"
        >
          <ArrowLeft className="mr-2" />
          BACK
        </Link>

        <h2 className="text-xl md:text-4xl font-bold text-[#3C1053] mb-4 md:mb-8">
          Let’s set up your company profile
        </h2>

        {/* ✅ Form Submit Connected */}
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
                className="mt-2 block w-full rounded-xl bg-[#FAFAFA] border border-gray-200 px-4 py-3 placeholder-gray-300 text-gray-700 shadow-sm focus:outline-none"
              />
              <p className="text-xs text-gray-400 mt-2">
                Use your legal business name as registered
              </p>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700">
                Company Email <span className="text-red-600">*</span>
              </label>
              <input
                type="email"
                name="companyEmail"
                value={form.companyEmail}
                onChange={handleChange}
                placeholder="E.g company@email.com"
                className="mt-2 block w-full rounded-xl bg-[#FAFAFA] border border-gray-200 px-4 py-3 placeholder-gray-300 text-gray-700 shadow-sm focus:outline-none"
              />
              {form.companyEmail && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.companyEmail) && (
                  <p className="text-xs text-red-500 mt-1">Invalid email format</p>
              )}

            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700">
                Company type <span className="text-red-600">*</span>
              </label>
              <select
                name="companyType"
                value={form.companyType}
                onChange={handleChange}
                className="mt-2 block w-full rounded-xl bg-[#FAFAFA] border border-gray-200 px-4 py-3 text-gray-700 shadow-sm focus:outline-none"
              >
                  <option value="">Select company type</option>
                  {companyTypeOptions.map((option) => (
                      <option key={option} value={option}>
                          {option.charAt(0).toUpperCase() + option.slice(1)}
                      </option>
                  ))}
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
                className="mt-2 block w-full rounded-xl bg-[#FAFAFA] border border-gray-200 px-4 py-3 text-gray-700 shadow-sm outline-none focus:outline-none focus-visible:outline-transparent"
              >
                <option value="">Select company size</option>
                  {companySizeOptions.map((option) => (
                      <option key={option} value={option}>
                          {option.charAt(0).toUpperCase() + option.slice(1)}
                      </option>
                  ))}
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
                className="mt-2 block w-full rounded-xl bg-[#FAFAFA] border border-gray-200 px-4 py-3 placeholder-gray-300 text-gray-700 shadow-sm focus:outline-none"
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
                placeholder="E.g Lagos, Nigeria"
                className="mt-2 block w-full rounded-xl bg-[#FAFAFA] border border-gray-200 px-4 py-3 placeholder-gray-300 text-gray-700 shadow-sm focus:outline-none"
              />
            </div>

              <div>
                  <label className="block text-sm font-semibold text-gray-700">
                  Industry/sector <span className="text-red-600">*</span>
                  </label>
                  <select
                  name="industry"
                  value={form.industry}
                  onChange={handleChange}
                  className="mt-2 block w-full rounded-xl bg-[#FAFAFA] border border-gray-200 px-4 py-3 text-gray-700 shadow-sm focus:outline-none"
                  >
                  <option value="">Select industry</option>
                  {industryOptions.map((option) => (
                      <option key={option} value={option}>
                      {option.charAt(0).toUpperCase() + option.slice(1)}
                      </option>
                  ))}
                  </select>
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
                    className="ml-4 inline-flex items-center rounded-md border border-[#5DA05D] px-3 py-1 text-sm text-[#5DA05D] font-semibold hover:shadow focus:outline-none"
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
              <p className="text-xs text-gray-400 mt-2">
                300×300px JPG/PNG supported.
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Company Tagline (100 words)
              </label>
              <textarea
                name="tagline"
                value={form.tagline}
                onChange={handleChange}
                rows={5}
                placeholder="E.g Where Talent Meets Opportunity..."
                className="mt-2 block w-full rounded-xl bg-[#FAFAFA] border border-gray-200 px-4 py-3 placeholder-gray-300 text-gray-700 shadow-sm outline-none focus:outline-none"
                  />
            </div>
          </div>

          {/* Full-width Save button */}
          <div className="md:col-span-2 pt-4">
            <div className="flex justify-start mb-8">
              <button
                type="submit"
                disabled={loading}
                className={`inline-flex items-center px-6 py-3 rounded-xl font-medium shadow transition ${
                  loading
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-[#5DA05D] hover:bg-[#7cb334] text-white"
                }`}
              >
                {loading ? "Submitting..." : "Save / Continue"}
              </button>
            </div>
          </div>
        </form>
     </div>
    </div>

    <div className="md:w-[5%] bg-[#D9FFE1DB]"></div>
    <div className="md:w-[10%] bg-[rgba(93,160,93,0.38)]"></div>
      {showModal && (
        <CompanyProfileModalFlow
          onClose={() => setShowModal(false)}
          formData={form}
          onSuccess={() => {
          // 🧹 Clear form after successful API submission
          setForm({
            companyName: "",
            companyEmail: "",
            companyType: "",
            companySize: "",
            companyWebsite: "",
            companyLocation: "",
            industry: "",
            tagline: "",
            logo: "",
        });
        }}
      />
    )}
  </div>
  );
}
