import { X } from 'lucide-react';
import React, { useEffect, useState } from 'react'
import { ActivityService } from '../api/ActivityServices'
import { toast } from 'react-toastify'
import AOS from 'aos';

export default function ConsultingPackage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isInternational, setIsInternational] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState(""); // 👈 store which package user clicked

  const poundsItems = [
    {
      id: 1,
      title: "Premium Package (£3000 GBP)",
      text1: "3 Services",
      text2: "For organizations with 11-20 employees",
      text3: "2-3 workshops per year",
      package: "premium"
    },
    {
      id: 2,
      title: "All-Inclusive Package (£5000 GBP)",
      text1: "All Services",
      text2: "For organizations with 21-40 employees",
      text3: "2-3 workshops per year",
      package: "inclusive"
    },
    {
      id: 3,
      title: "Basic Package (£1500 GBP)",
      text1: "2 Services",
      text2: "For organizations with 1-10 employees",
      text3: "1-2 workshops per year",
      package: "basic"
    },
  ];

  const dollarItems = [
    {
      id: 1,
      title: "Premium Package ($5000 USD)",
      text1: "3 Services",
      text2: "For organizations with 11-20 employees",
      text3: "2-3 workshops per year",
      package: "premium"
    },
    {
      id: 2,
      title: "All-Inclusive Package ($10000 USD)",
      text1: "All Services",
      text2: "For organizations with 21-40 employees",
      text3: "2-3 workshops per year",
      package: "inclusive"
    },
    {
      id: 3,
      title: "Basic Package ($2000 USD)",
      text1: "2 Services",
      text2: "For organizations with 1-10 employees",
      text3: "1-2 workshops per year",
      package: "basic"
    },
  ];

  const items = isInternational ? dollarItems : poundsItems;
  useEffect(() => {
    AOS.init();
  }, []);
  return (
    <div className={`py-16 text-black`} id='pricing'>
      <div className='flex justify-center items-center mb-10'>
        <span className={`${!isInternational ? 'text-[#5DA05D] font-semibold' : 'text-gray-400'}`}>United Kingdom (UK)</span>
        <label className="mx-3 relative inline-flex items-center cursor-pointer">
          <input
            type="checkbox"
            value=""
            className="sr-only peer"
            checked={isInternational}
            onChange={() => setIsInternational(!isInternational)}
          />
          <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white 
            after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border 
            after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#5DA05D]"
          ></div>
        </label>
        <span className={`${isInternational ? 'text-[#5DA05D] font-semibold' : 'text-gray-400'}`}>International</span>
      </div>

      <h1 className='text-3xl font-bold mb-8 text-center'>
        Flexible and Cost-Effective <br />Consulting Packages "For Corporations"
      </h1>

      <div className='md:flex gap-5' id='get-started'>
        {items.map((item) => (
          <div
            key={item.id}
            onClick={() => {
              setSelectedPackage(item.package);
              setIsModalOpen(true);
            }}
            className={`cursor-pointer shadow rounded-lg w-full mb-5 object-cover px-5 py-10 border-2 
              ${item.id === 2 ? 'bg-[#5DA05D] text-white border-[#5DA05D]' : 'bg-white border-[#5DA05D] hover:border-green-600'}
              `}
              // data-aos={item.id === 1 ? "zoom-in" : item.id === 2 ? "flip-up" : "zoom-out"}
              data-aos="zoom-out"
          >
            <h1 className='mb-6 font-bold text-lg'>{item.title}</h1>
            <ul className='list-disc ml-5'>
              <li>{item.text1}</li>
              <li>{item.text2}</li>
              <li>{item.text3}</li>
            </ul>
            <button
              className={`mt-5 w-full text-center py-2 px-6 rounded-lg border-2 border-gray-300 
                ${item.id === 2 ? 'bg-white text-black' : 'bg-transparent'}
              `}
            >
              GET STARTED
            </button>
          </div>
        ))}
      </div>

      <ConsultationForm
        isOpen={isModalOpen}
        isClose={() => setIsModalOpen(false)}
        selectedPackage={selectedPackage}
      />
    </div>
  );
}

// ===================================
// ✅ Consultation Modal
// ===================================
function ConsultationForm({ isOpen, isClose, selectedPackage }) {
  const [formData, setFormData] = useState({
    full_name: "",
    email_address: "",
    interested_services: [],
    phone_number: "",
    package: selectedPackage || "",
  });

  const services = [
    { label: "HR Solutions", value: "hr_solutions" },
    { label: "Corporate Training", value: "corporate_training" },
    { label: "Learning & Development (L&D)", value: "L&D" },
    { label: "Organizational Development", value: "organizational_development" },
  ];

  // Update formData when selectedPackage changes
  useEffect(() => {
    setFormData((prev) => ({ ...prev, package: selectedPackage }));
  }, [selectedPackage]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleServiceToggle = (value) => {
    setFormData((prev) => {
      const isSelected = prev.interested_services.includes(value);
      return {
        ...prev,
        interested_services: isSelected
          ? prev.interested_services.filter((item) => item !== value)
          : [...prev.interested_services, value],
      };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !formData.full_name ||
      !formData.email_address ||
      !formData.phone_number ||
      formData.interested_services.length === 0
    ) {
      toast.error("Please fill in all required fields.");
      return;
    }

    const payload = {
      full_name: formData.full_name,
      email_address: formData.email_address,
      phone_number: formData.phone_number,
      interested_services: formData.interested_services,
      package: formData.package,
    };

    console.log("API Payload", payload);

    try {
      const result = await ActivityService.LeadRegister(payload);
      if (result.success && result.status === 201) {
        toast.success("Lead registered successfully!");
        isClose();
      } else {
        toast.error("This email is already registered or request failed.");
      }
    } catch (error) {
      console.error("Error occurred while registering lead:", error);
      toast.error("An error occurred while registering your details.");
    }
  };

  if (!isOpen) return null;

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) isClose();
  };

  return (
    
    <div
      onClick={handleBackdropClick}
      className="fixed inset-0 bg-black/45 flex justify-center items-center z-50 overflow-y-auto px-3 sm:px-5 py-8"
    >
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm sm:max-w-md bg-white rounded-2xl border border-gray-200 p-4 sm:p-6 shadow-md mx-auto my-auto"
      >
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-xl sm:text-2xl font-bold text-gray-900">
            Request a Consultation
          </h1>
          <button
            onClick={isClose}
            type="button"
            className="text-gray-700 hover:text-gray-600 transition-colors bg-gray-100 p-2 rounded-lg"
          >
            <X />
          </button>
        </div>

        {/* Full Name */}
        <InputField
          label="Full Name"
          name="full_name"
          value={formData.full_name}
          onChange={handleInputChange}
        />

        {/* Email */}
        <InputField
          label="Email"
          name="email_address"
          type="email"
          value={formData.email_address}
          onChange={handleInputChange}
        />

        {/* Phone Number */}
        <InputField
          label="Phone Number"
          name="phone_number"
          type="tel"
          value={formData.phone_number}
          onChange={handleInputChange}
        />

        {/* Interested Services */}
        <div className="mb-3">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Interested Services
          </label>
          <div className="space-y-2">
            {services.map(({ label, value }) => (
              <label key={value} className="flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.interested_services.includes(value)}
                  onChange={() => handleServiceToggle(value)}
                  className="w-4 h-4 rounded border-2 border-[#5DA05D] text-[#5DA05D] focus:ring-[#5DA05D]"
                />
                <span className="ml-3 text-sm text-gray-700">{label}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Selected Package */}
        <div className="mt-3 mb-6 text-sm text-gray-700">
          <strong>Selected Package:</strong> {formData.package || "None"}
        </div>

        <button
          type="submit"
          className="w-full bg-[#5DA05D] text-white font-semibold py-2 rounded-lg hover:bg-green-500 transition"
        >
          Submit
        </button>
      </form>
    </div>

  );
}

// Reusable input field
function InputField({ label, name, type = "text", value, onChange }) {
  return (
    <div className="mb-3">
      <label className="block text-sm font-medium text-gray-700 mb-2">
        {label}
      </label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={label}
        className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5DA05D]"
      />
    </div>
  );
}
