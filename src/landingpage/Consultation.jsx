import React, { useState } from 'react'
import { ActivityService } from '../api/ActivityServices'
import { toast } from 'react-toastify'

export default function Consultation() {
  return (
    <div className='py-4 bg-gray-50'>
      <div className='mx-4 md:mx-20 md:flex gap-10 justify-between'>
        <div className='w-full object-cover'>
          <h1 className='text-3xl font-bold mb-10 md:mb-20 md:mt-6'>Our Expertise, Your Growth</h1>
          <div>
            <div className='md:flex gap-5'>
              <div className='border-2 border-[#C4DAC4] p-3 h-56 w-72 rounded-tl-2xl mb-5'>
                <h1 className='font-bold text-xl'>Human Resource Solutions:</h1>
                <p>Recruitment support, onboarding frameworks, and employee engagement strategies.</p>
              </div>
              <div className='border-2 border-[#C4DAC4] p-3 h-56 w-72 rounded-bl-2xl mb-5'>
                <h1 className='font-bold text-xl'>Corporate Training Programs:</h1>
                <p>Tailored workshops in leadership, communication, technology, and compliance.</p>
              </div>
            </div>
            <div className='md:flex gap-5 mt-5'>
              <div className='border-2 border-[#C4DAC4] p-3 h-56 w-72 rounded-br-2xl mb-5'>
                <h1 className='font-bold text-xl'>Learning & Development (L&D):</h1>
                <p>Skills-gap assessments, career development pathways, and performance improvement strategies.</p>
              </div>
              <div className='border-2 border-[#C4DAC4] p-3 h-56 w-72 rounded-tr-2xl mb-5'>
                <h1 className='font-bold text-xl'>Organizational Development:</h1>
                <p>Change management, culture transformation, and succession planning.</p>
              </div>
            </div>
          </div>
        </div>
        <div className='w-full object-cover'>
          <ConsultationForm />
        </div>
      </div>
    </div>
  )
}

//const interested_services = ["HR Solutions", "Corporate Training", "Learning & Development", "Organizational Development"]

// function ConsultationForm() {
//   const [formData, setFormData] = useState({
//     full_name: "",
//     email_address: "",
//     interested_services: [],
//     phone_number: "",
//     agreeToContact: false,
//   })

//   const handleInputChange = (e) => {
//     const { name, value } = e.target
//     setFormData((prev) => ({
//       ...prev,
//       [name]: value,
//     }))
//   }

//   const handleServiceChange = (service) => {
//     setFormData((prev) => ({
//       ...prev,
//       services: prev.services.includes(service)
//         ? prev.services.filter((s) => s !== service)
//         : [...prev.services, service],
//     }))
//   }

//   const handleCheckboxChange = (e) => {
//     const { checked } = e.target
//     setFormData((prev) => ({
//       ...prev,
//       agreeToContact: checked,
//     }))
//   }

//   const handleSubmit = async (e) => {
//     e.preventDefault()
//     console.log("Form submitted:", formData)
//     try {
//       const registerLead = await ActivityService.LeadRegister(formData)
//       if (registerLead.success) {
//         toast.success("Successful")
//       }else{
//         toast.error("Try again")
//       }
//     } catch (error) {
//       console.log("Couldn't register lead", error)
//     }
//   }

//   return (
//     <div className="flex items-center justify-end min-h-screen bg-gray-50">
//       <form
//         onSubmit={handleSubmit}
//         className="w-full max-w-md bg-white rounded-2xl border border-gray-200 p-8 shadow-sm"
//       >
//         <h1 className="text-2xl font-bold text-gray-900 mb-6">Request a Consultation</h1>

//         {/* Full Name */}
//         <div className="mb-3">
//           <label htmlFor="full_name" className="block text-sm font-medium text-gray-700 mb-2">
//             Full Name
//           </label>
//           <input
//             type="text"
//             id="full_name"
//             name="full_name"
//             value={formData.full_name}
//             onChange={handleInputChange}
//             placeholder="Full Name"
//             className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5DA05D] focus:ring-offset-0 focus:bg-green-50"
//           />
//         </div>

//         {/* Email */}
//         <div className="mb-3">
//           <label htmlFor="email_address" className="block text-sm font-medium text-gray-700 mb-2">
//             Email
//           </label>
//           <input
//             type="email"
//             id="email_address"
//             name="email_address"
//             value={formData.email_address}
//             onChange={handleInputChange}
//             placeholder="Email"
//             className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5DA05D] focus:ring-offset-0 focus:bg-green-50"
//           />
//         </div>

//         {/* Interested Services */}
//         <div className="mb-3">
//           <label className="block text-sm font-medium text-gray-700 mb-2">Interested Services</label>
//           <div className="space-y-2">
//             {services.map((service) => (
//               <label key={service} className="flex items-center cursor-pointer">
//                 <input
//                   type="checkbox"
//                   checked={formData.services.includes(service)}
//                   onChange={() => handleServiceChange(service)}
//                   className="w-4 h-4 rounded border-2 border-[#5DA05D] text-[#5DA05D] focus:ring-[#5DA05D] cursor-pointer"
//                 />
//                 <span className="ml-3 text-sm text-gray-700">{service}</span>
//               </label>
//             ))}
//           </div>
//         </div>

//         {/* Phone Number */}
//         <div className="mb-3">
//           <label htmlFor="phone_number" className="block text-sm font-medium text-gray-700 mb-2">
//             Phone Number
//           </label>
//           <input
//             type="tel"
//             id="phone_number"
//             name="phone_number"
//             value={formData.phone_number}
//             onChange={handleInputChange}
//             placeholder="Phone"
//             className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-0 focus:bg-green-50"
//           />
//         </div>

//         {/* Agreement Checkbox */}
//         <div className="mb-4">
//           <label className="flex items-center cursor-pointer">
//             <input
//               type="checkbox"
//               checked={formData.agreeToContact}
//               onChange={handleCheckboxChange}
//               className="w-4 h-4 rounded border-2 border-[#5DA05D] text-[#5DA05D] focus:ring-[#5DA05D] cursor-pointer"
//             />
//             <span className="ml-3 text-sm text-gray-700">I agree to be contacted for follow-up.</span>
//           </label>
//         </div>

//         {/* Submit Button */}
//         <button
//           type="submit"
//           className="w-full bg-[#5DA05D] hover:bg-[#5DA05D] text-white font-semibold py-2 rounded-lg transition-colors"
//         >
//           Submit
//         </button>
//       </form>
//     </div>
//   )
// }

function ConsultationForm() {
  const [formData, setFormData] = useState({
    full_name: "",
    email_address: "",
    interested_services: "",
    phone_number: ""
  });

  const services = [
    { label: "HR Solutions", value: "hr_solutions" },
    { label: "Corporate Training", value: "corporate_training" },
    { label: "Learning & Development (L&D)", value: "L&D" },
    { label: "Organizational Development", value: "organizational_development" },
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (e) => {
    setFormData((prev) => ({ ...prev, agreeToContact: e.target.checked }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // ✅ Validate required fields
    if (
      !formData.full_name ||
      !formData.email_address ||
      !formData.phone_number ||
      !formData.interested_services
    ) {
      toast.error("Please fill in all required fields.");
      return;
    }

    // ✅ Remove extra fields before sending
    const payload = {
      full_name: formData.full_name,
      email_address: formData.email_address,
      phone_number: formData.phone_number,
      interested_services: formData.interested_services,
    };
    try {
      await ActivityService.LeadRegister(payload);
      toast.success("Lead registered successfully!");
    } catch (error) {
      console.error("Error occurred while registering lead:", error);
    }
  };

  return (
    <div className="flex items-center justify-end min-h-screen bg-gray-50" id='get-started'>
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-white rounded-2xl border border-gray-200 p-8 shadow-sm"
      >
        <h1 className="text-2xl font-bold text-gray-900 mb-6">
          Request a Consultation
        </h1>

        {/* Full Name */}
        <div className="mb-3">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Full Name
          </label>
          <input
            type="text"
            name="full_name"
            value={formData.full_name}
            onChange={handleInputChange}
            placeholder="Full Name"
            className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5DA05D]"
          />
        </div>

        {/* Email */}
        <div className="mb-3">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Email
          </label>
          <input
            type="email"
            name="email_address"
            value={formData.email_address}
            onChange={handleInputChange}
            placeholder="Email"
            className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5DA05D]"
          />
        </div>

        {/* Interested Service */}
        <div className="mb-3">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Interested Service
          </label>
          <div className="space-y-2">
            {services.map(({ label, value }) => (
              <label key={value} className="flex items-center cursor-pointer">
                <input
                  type="radio"
                  name="interested_services"
                  checked={formData.interested_services === value}
                  onChange={() =>
                    setFormData((prev) => ({
                      ...prev,
                      interested_services: value,
                    }))
                  }
                  className="w-4 h-4 rounded border-2 border-[#5DA05D] text-[#5DA05D] focus:ring-[#5DA05D]"
                />
                <span className="ml-3 text-sm text-gray-700">{label}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Phone Number */}
        <div className="mb-3">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Phone Number
          </label>
          <input
            type="tel"
            name="phone_number"
            value={formData.phone_number}
            onChange={handleInputChange}
            placeholder="Phone"
            className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5DA05D]"
          />
        </div>

        {/* Checkbox */}
        <div className="mb-4">
          <label className="flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={formData.agreeToContact}
              onChange={handleCheckboxChange}
              className="w-4 h-4 rounded border-2 border-[#5DA05D] text-[#5DA05D] focus:ring-[#5DA05D]"
            />
            <span className="ml-3 text-sm text-gray-700">
              I agree to be contacted for follow-up.
            </span>
          </label>
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


