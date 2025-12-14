// import React, { useState } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import { Check, X } from "lucide-react";
// import CNLogo from "../../assets/images/cn-1.png";
// import { CorporateServices } from "../../api/CoporateServices";
// import { toast } from "react-toastify";
// import successmotion from "../../assets/images/success.gif"

// export default function CompanyProfileModalFlow({ onClose, formData, onSuccess }) {
//   const [checked, setChecked] = useState(false);
//   const [step, setStep] = useState(1);
//   const [loading, setLoading] = useState(false);

//   const handleCreatePage = async () => {
//     if (!checked) return;
//     setLoading(true);

//     const payload = {
//       company_name: formData.companyName,
//       company_email: formData.companyEmail,
//       company_type: formData.companyType,
//       company_size: formData.companySize,
//       website: formData.companyWebsite,
//       location: formData.companyLocation,
//       industry: formData.industry,
//       tagline: formData.tagline,
//       logo: formData.logo,
//     };

//     try {
//       const res = await CorporateServices.createCorporateProfile(payload);
//       toast.success("Corporate profile created successfully!");
//       setStep(2);
//       if (onSuccess) onSuccess();
      
//       setTimeout(() => {
//         if (onSuccess) onSuccess();
//         onClose();
//       }, 3000);

//     } catch (err) {
//       toast.error(err.message || "Failed to create corporate profile");
//       console.error("Error creating corporate profile:", err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
//       <AnimatePresence mode="wait">
//         {step === 1 && (
//           <motion.div
//             key="preview"
//             initial={{ opacity: 0, scale: 0.9 }}
//             animate={{ opacity: 1, scale: 1 }}
//             exit={{ opacity: 0, scale: 0.9 }}
//             transition={{ duration: 0.3 }}
//             className="bg-white rounded-2xl shadow-xl w-[90%] max-w-md p-6 relative"
//           >
//             <button
//               onClick={onClose}
//               className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
//             >
//               <X size={20} />
//             </button>

//             <h2 className="text-lg font-bold text-gray-800 mb-5">Page preview</h2>

//             <div className="flex items-center gap-4 mb-6">
//               <img
//                 src={formData.logo ? URL.createObjectURL(formData.logo) : CNLogo}
//                 alt="Company Logo"
//                 className="h-28 w-28 rounded-lg object-contain border border-gray-200 shadow font-bold"
//               />
//               <div>
//                 <h3 className="text-lg font-semibold text-gray-800">
//                   {formData.companyName || "Untitled Company"}
//                 </h3>
//                 <p className="text-sm text-gray-500">{formData.companyLocation}</p>
//                 <p className="text-sm text-[#7F8CA0]">{formData.industry}</p>
//               </div>
//             </div>

//             <div className="flex items-start gap-2 mb-6">
//               <input
//                 id="confirm"
//                 type="checkbox"
//                 checked={checked}
//                 onChange={() => setChecked(!checked)}
//                 className="mt-1 h-4 w-4 border-gray-400 rounded text-[#5DA05D] focus:ring-[#5DA05D]"
//               />
//               <label htmlFor="confirm" className="text-sm text-gray-700 leading-tight">
//                 I confirm I am authorized to represent this company and agree to the{" "}
//                 <span className="text-[#5DA05D] font-medium">Terms & Conditions</span>
//               </label>
//             </div>

//             <button
//               onClick={handleCreatePage}
//               disabled={!checked || loading}
//               className={`w-full py-2.5 rounded-md font-semibold transition-all ${
//                 checked && !loading
//                   ? "bg-[#5DA05D] hover:bg-[#7cb334] text-white shadow"
//                   : "bg-gray-200 text-gray-400 cursor-not-allowed"
//               }`}
//             >
//               {loading ? "Creating..." : "Create Page"}
//             </button>
//           </motion.div>
//         )}

//         {step === 2 && (
//           <motion.div
//             key="success"
//             initial={{ opacity: 0, scale: 0.8 }}
//             animate={{ opacity: 1, scale: 1 }}
//             exit={{ opacity: 0, scale: 0.8 }}
//             transition={{ duration: 0.4 }}
//             className="bg-white rounded-2xl shadow-xl w-[90%] max-w-md p-10 flex flex-col items-center justify-center text-center relative"
//           >
//             <button
//               onClick={onClose}
//               className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
//             >
//               <X size={20} />
//             </button>

//             <img src={successmotion} alt="Success" className="h-32 mb-4" />

//             <h2 className="text-xl font-bold text-[#3C1053]">
//               Page created successfully!
//             </h2>
//           </motion.div>
//         )}
//       </AnimatePresence>
//     </div>
//   );
// }


import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, X } from "lucide-react";
import Confetti from "react-confetti";
import CNLogo from "../../assets/images/cn-1.png";
import { CorporateServices } from "../../api/CoporateServices";
import { toast } from "react-toastify";

export default function CompanyProfileModalFlow({ onClose, formData, onSuccess }) {
  const [checked, setChecked] = useState(false);
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);

  const handleCreatePage = async () => {
    if (!checked) return;
    setLoading(true);

    const payload = {
      company_name: formData.companyName,
      company_email: formData.companyEmail,
      company_type: formData.companyType,
      company_size: formData.companySize,
      website: formData.companyWebsite,
      location: formData.companyLocation,
      industry: formData.industry,
      tagline: formData.tagline,
      logo: formData.logo,
    };

    try {
      await CorporateServices.createCorporateProfile(payload);
      toast.success("Corporate profile created successfully!");
      setStep(2);
      if (onSuccess) onSuccess();

      setTimeout(() => {
        onClose();
      }, 4000);
    } catch (err) {
      toast.error(err.message || "Failed to create corporate profile");
      console.error("Error creating corporate profile:", err);
    } finally {
      setLoading(false);
    }
  };

  const checkmarkVariants = {
    hidden: { scale: 0 },
    visible: { scale: 1, rotate: 360, transition: { type: "spring", stiffness: 500, damping: 20 } },
  };

  return (
    <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
      <AnimatePresence mode="wait">
        {step === 1 && (
          <motion.div
            key="preview"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.3 }}
            className="bg-white rounded-2xl shadow-xl w-[90%] max-w-md p-6 relative"
          >
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
            >
              <X size={20} />
            </button>

            <h2 className="text-lg font-bold text-gray-800 mb-5">Page preview</h2>

            <div className="flex items-center gap-4 mb-6">
              <img
                src={formData.logo ? URL.createObjectURL(formData.logo) : CNLogo}
                alt="Company Logo"
                className="h-28 w-28 rounded-lg object-contain border border-gray-200 shadow font-bold"
              />
              <div>
                <h3 className="text-lg font-semibold text-gray-800">
                  {formData.companyName || "Untitled Company"}
                </h3>
                <p className="text-sm text-gray-500">{formData.companyLocation}</p>
                <p className="text-sm text-[#7F8CA0]">{formData.industry}</p>
              </div>
            </div>

            <div className="flex items-start gap-2 mb-6">
              <input
                id="confirm"
                type="checkbox"
                checked={checked}
                onChange={() => setChecked(!checked)}
                className="mt-1 h-4 w-4 border-gray-400 rounded text-[#5DA05D] focus:ring-[#5DA05D]"
              />
              <label htmlFor="confirm" className="text-sm text-gray-700 leading-tight">
                I confirm I am authorized to represent this company and agree to the{" "}
                <span className="text-[#5DA05D] font-medium">Terms & Conditions</span>
              </label>
            </div>

            <button
              onClick={handleCreatePage}
              disabled={!checked || loading}
              className={`w-full py-2.5 rounded-md font-semibold transition-all ${
                checked && !loading
                  ? "bg-[#5DA05D] hover:bg-[#7cb334] text-white shadow"
                  : "bg-gray-200 text-gray-400 cursor-not-allowed"
              }`}
            >
              {loading ? "Creating..." : "Create Page"}
            </button>
          </motion.div>
        )}

        {step === 2 && (
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.4 }}
            className="bg-white rounded-2xl shadow-xl w-[90%] max-w-md p-10 flex flex-col items-center justify-center text-center relative"
          >
            <Confetti numberOfPieces={160} recycle={false} />

            {/* SHINY ROTATING GRADIENT RING */}
            <motion.div
              className="relative w-32 h-32 flex items-center justify-center mb-6"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 200, damping: 16 }}
            >
              <motion.div
                className="absolute inset-0 rounded-full p-[3px]"
                style={{
                  background: "conic-gradient(#5DA05D, #8FFFA3, #5DA05D)",
                }}
                animate={{ rotate: 360 }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
              >
                <div className="w-full h-full bg-white rounded-full" />
              </motion.div>

              {/* GREEN CORE CIRCLE */}
              <div className="w-24 h-24 bg-[#5DA05D] rounded-full shadow-xl flex items-center justify-center relative overflow-visible">

                {/* GLOW PULSE */}
                <motion.div
                  className="absolute inset-0 rounded-full bg-[#5DA05D]/40 blur-md"
                  animate={{ opacity: [0.1, 0.6, 0.1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />

                {/* CHECKMARK DRAW ANIMATION */}
                <motion.svg
                  width="70"
                  height="70"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="white"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <motion.path
                    d="M20 6L9 17L4 12"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 0.9, ease: "easeInOut" }}
                  />
                </motion.svg>
              </div>

              {/* SUCCESS BURST PARTICLES */}
              {Array.from({ length: 12 }).map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-2 h-2 rounded-full bg-[#5DA05D]"
                  initial={{ opacity: 1, scale: 1, x: 0, y: 0 }}
                  animate={{
                    opacity: 0,
                    scale: 0,
                    x: Math.cos((i * 30) * Math.PI / 180) * 60,
                    y: Math.sin((i * 30) * Math.PI / 180) * 60,
                  }}
                  transition={{ duration: 0.9, delay: 0.2 }}
                />
              ))}
            </motion.div>

            <h2 className="text-xl font-bold text-[#3C1053]">
              Page created successfully!
            </h2>
          </motion.div>
        )}

      </AnimatePresence>
    </div>
  );
}
