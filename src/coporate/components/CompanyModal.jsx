import React, { useState, useEffect } from "react";
import { CorporateServices } from "../../api/CoporateServices";

const inputStyle ="w-full bg-gray-50 text-gray-900 rounded-lg p-2 border border-transparent focus:border-green-500 focus:ring-0 outline-none";

const SelectField = ({
  label,
  name,
  value,
  options,
  onChange,
  loading = false,
  placeholder = "Select an option",
}) => {
  return (
    <div>
      <label
        htmlFor={name}
        className="block text-sm font-medium text-gray-700 mb-1"
      >
        {label}
      </label>
      <select
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        className="w-full bg-white text-gray-800 rounded-lg p-2 border border-gray-300 focus:border-green-500 focus:ring-0 outline-none"
      >
        <option value="">{placeholder}</option>
        {loading ? (
          <option disabled>Loading...</option>
        ) : (
          options.map((option) => (
            <option key={option} value={option} className="text-gray-800">
              {option.charAt(0).toUpperCase() + option.slice(1)}
            </option>
          ))
        )}
      </select>
    </div>
  );
};

const CompanyModal = ({ isOpen, onClose, onSubmit, loading }) => {
  const [formData, setFormData] = useState({
    company_name: "",
    company_email: "",
    company_type: "",
    company_size: "",
    industry: "",
    website: "",
    location: "",
    tagline: "",
    logo: null,
  });

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
            // console.log(industryRes, typeRes, sizeRes);
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

    useEffect(() => {
      if (!isOpen) {
        setFormData({
        company_name: "",
        company_email: "",
        company_type: "",
        company_size: "",
        industry: "",
        website: "",
        location: "",
        tagline: "",
        });
      }
    }, [isOpen]);


  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const payload = { ...formData };
    console.log(payload.logo)

    // If logo is a string (URL), remove it — since updateUser
    // expects a File object to trigger multipart/form-data
    if (typeof payload.logo === "string") {
      delete payload.logo;
    }

    onSubmit(payload); // Pass cleaned payload to parent
  };

  if (!isOpen) return null; // Hide modal if not open

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
        <div className="bg-white rounded-xl shadow-lg w-full max-w-lg max-h-[90vh] overflow-y-auto p-6">
            <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-gray-800">Edit Company Profile</h2>
            <button
                onClick={onClose}
                className="text-gray-400 hover:text-gray-600 transition"
            >
                ✕
            </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
            {/* Company Name */}
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Company Name</label>
                <input
                type="text"
                name="company_name"
                value={formData.company_name}
                onChange={handleChange}
                className={inputStyle}
                required
                />
            </div>

            {/* Email */}
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Company Email</label>
                <input
                type="email"
                name="company_email"
                value={formData.company_email}
                onChange={handleChange}
                className={inputStyle}
                required
                />
            </div>
            {formData.company_email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.company_email) && (
                  <p className="text-xs text-red-500 mt-1">Invalid email format</p>
              )}

            <SelectField
            label="Industry"
            name="industry"
            value={formData.industry}
            onChange={handleChange}
            options={industryOptions}
            loading={industryOptions.length === 0}
            />

            <SelectField
            label="Company Type"
            name="company_type"
            value={formData.company_type}
            onChange={handleChange}
            options={companyTypeOptions}
            loading={companyTypeOptions.length === 0}
            />

            <SelectField
            label="Company Size"
            name="company_size"
            value={formData.company_size}
            onChange={handleChange}
            options={companySizeOptions}
            loading={companySizeOptions.length === 0}
            />

            {/* Website */}
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Website</label>
                <input
                type="url"
                name="website"
                value={formData.website}
                onChange={handleChange}
                className={inputStyle}
                />
            </div>

            {/* Location */}
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                className={inputStyle}
                />
            </div>

            {/* Tagline */}
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Tagline</label>
                <input
                type="text"
                name="tagline"
                value={formData.tagline}
                onChange={handleChange}
                className={inputStyle}
                />
            </div>
            {/* Buttons */}
            <div className="flex justify-between gap-3 mt-6">
              <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-[#5DA05D] border border-[#5DA05D] rounded-lg hover:bg-[#5DA05D] hover:text-white transition"
              >
              Cancel
              </button>
              <button
              type="submit"
              className="px-4 py-2 bg-[#5DA05D] text-white rounded-lg hover:bg-[#4d854d]"
              >
              {loading ? "Saving..." : "Save"}
              </button>
            </div>
            </form>
      </div>
    </div>
  );
};

export default CompanyModal;
