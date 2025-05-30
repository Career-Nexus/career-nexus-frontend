"use client"

import { useEffect, useState } from "react"
import { Google, Linkedin, LoadingIcon } from "../../icons/icon"
import { Link, useLocation, useNavigate } from "react-router-dom"
import { Mail, Lock } from "lucide-react"
import { authService } from "../../api/ApiServiceThree"
import { checkCookiePermissions, debugCookies } from "../../utils/CookieUtils"
import HeroSection from "../../components/Auth/HeroSection"
import { EyeClose, EyeOpen } from "../../icons"
export default function ResetPassword({ email: propEmail }) {
const [formData, setFormData] = useState({
    password1: "",
    password2: "",
  });
  const [errors, setErrors] = useState({});
  const [isConnected] = useState(true);
  const [loading, setLoading] = useState(false);
  const [cookiesEnabled, setCookiesEnabled] = useState(true);
  const [showPassword1, setShowPassword1] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);
  const navigate = useNavigate();
  const { state } = useLocation();
  const email = propEmail || state?.email || "";

  useEffect(() => {
    const permissions = checkCookiePermissions();
    setCookiesEnabled(permissions);
    if (!permissions) {
      setErrors({
        general: "Cookies are disabled in your browser. Please enable cookies to use this application.",
      });
    }
    console.log('ResetPassword state:', { email,propEmail, state });
  }, []);
 const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (errors[name]) {
      setErrors({ ...errors, [name]: "" });
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.password1.trim()) {
      newErrors.password1 = "Password is required";
    } else if (formData.password1.length < 8) {
      newErrors.password1 = "Password must be at least 8 characters";
    } else if (!/[A-Z]/.test(formData.password1) || !/[0-9]/.test(formData.password1)) {
      newErrors.password1 = "Password must include at least one uppercase letter and one number";
    }

    if (!formData.password2.trim()) {
      newErrors.password2 = "Please confirm your password";
    } else if (formData.password1 !== formData.password2) {
      newErrors.password2 = "Passwords do not match";
    }

    if (!email) {
      newErrors.general = "Email is missing. Please start the password reset process again.";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    if (!cookiesEnabled) {
      setErrors({
        general: "Cookies are disabled. Please enable cookies to continue.",
      });
      return;
    }

    setLoading(true);
    try {
      const payload = {
        email,
        password1: formData.password1,
        password2: formData.password2,
      };
      console.log("Sending Reset Password Payload:", payload);
      const response = await authService.resetPassword(payload);
      console.log("Reset Password Response:", response);

      if (response.status === "Password Changed" || response.success) {
        navigate("/password-reset-success");
      } else {
        setErrors({ general: response.message || "Failed to reset password." });
      }
    } catch (error) {
      console.error("Reset Password Error:", error);
      setErrors({ general: errorMessage });
      if (
        error.non_field_errors?.includes("Invalid OTP") ||
        error.non_field_errors?.includes("Cannot change password. Request new otp.")
      ) {
        navigate('/send-email', { state: { email } });
      }
    } finally {
      setLoading(false);
    }
  };


  return (
    <div className="grid grid-cols-12 min-h-screen">
      <div className="col-span-12 lg:col-span-7 hidden md:block ml-5">
        <HeroSection />
      </div>
      <div className="col-span-12 lg:col-span-5 flex items-center justify-center py-8">
        <div className="bg-white rounded-lg p-8 max-w-md w-full">
          <div className="text-center mb-4">
            <h3 className="text-xl font-bold text-gray-900">Reset Password</h3>
            <p className="text-gray-600 mt-2">
              Enter new password for: <br />
              <span className="font-medium text-[#6DA05D]">{email}</span>
            </p>
          </div>
          {errors.general && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded relative mb-4">
              <span className="block sm:inline">{errors.general}</span>
            </div>
          )}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="relative mb-10">
                <div className="absolute inset-y-3 left-0 pl-3 pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="password1"
                  name="password1"
                  type={showPassword1 ? "text" : "password"}
                  autoComplete="new-password"
                  placeholder="New Password"
                  value={formData.password1}
                  onChange={handleChange}
                  className={`w-full pl-10 pr-10 py-2 border rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-[#5b9a68] focus:border-[#5b9a68] ${
                    errors.password1 ? "border-red-500" : "border-gray-200"
                  }`}
                />
                <button
                  type="button"
                  className="inset-y-0 right-0 pr-3 flex items-center ml-auto mt-[-2rem]"
                  onClick={() => setShowPassword1(!showPassword1)}
                >
                  {showPassword1 ? (
                    <img src={EyeOpen} className="h-5 w-5 text-gray-400" alt="Show password" />
                  ) : (
                    <img src={EyeClose} className="h-5 w-5 text-gray-400" alt="Hide password" />
                  )}
                </button>
                {errors.password1 && <p className="text-red-500 text-xs mt-4">{errors.password1}</p>}
              </div>
            <div className="relative">
              <div className="absolute inset-y-3 left-0 pl-3 pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
              <input
                id="password2"
                name="password2"
                type={showPassword2 ? "text" : "password"}
                autoComplete="new-password"
                placeholder="Confirm Password"
                value={formData.password2}
                onChange={handleChange}
                className="w-full pl-10 pr-10 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 border-gray-300"
                // className="w-full pl-10 pr-10 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6DA05D]"
              />
              <button
                type="button"
                className="relative inset-y-[-1.8rem] right-0 pr-3 flex items-center ml-auto"
                // className="absolute inset-y-0 right-0 pr-3 flex items-center"
                onClick={() => setShowPassword2(!showPassword2)}
              >
                {showPassword2 ? (
                  <img src={EyeOpen} className="h-5 w-5 text-gray-400" alt="Show password" />
                ) : (
                  <img src={EyeClose} className="h-5 w-5 text-gray-400" alt="Hide password" />
                )}
              </button>
              {errors.password2 && <p className="text-red-500 text-xs mt-1">{errors.password2}</p>}
            </div>
            <button
              type="submit"
              disabled={loading || !formData.password1.trim() || !formData.password2.trim()}
              className={`w-full py-3 px-4 rounded-lg text-sm font-semibold flex items-center justify-center ${
                loading || !formData.password1.trim() || !formData.password2.trim()
                  ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                  : "bg-[#6DA05D] hover:bg-[#5B8F4E] text-white"
              } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#6DA05D]`}
            >
              {loading ? (
                <span className="flex items-center">
                  <LoadingIcon/>
                  Saving...
                </span>
              ) : (
                "Save Password"
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
// "use client"

// import { useEffect, useState } from "react"
// import { Link, useLocation, useNavigate } from "react-router-dom"
// import { Mail, Lock } from "lucide-react"
// import { authService } from "../../api/ApiServiceThree"
// import { checkCookiePermissions, debugCookies } from "../../utils/CookieUtils"
// import HeroSection from "../../components/Auth/HeroSection"
// import { EyeClose, EyeOpen } from "../../icons"
// import { LoadingIcon } from "../../icons/icon"

// export default function ResetPassword({ email: propEmail }) {
//   const [formData, setFormData] = useState({
//     password1: "",
//     password2: "",
//   });
//   const [errors, setErrors] = useState({});
//   const [isConnected] = useState(true);
//   const [loading, setLoading] = useState(false);
//   const [cookiesEnabled, setCookiesEnabled] = useState(true);
//   const [showPassword1, setShowPassword1] = useState(false);
//   const [showPassword2, setShowPassword2] = useState(false);
//   const navigate = useNavigate();
//   const { state } = useLocation();
//   const email = propEmail || state?.email || "";
//   // const otp = state?.otp || ""; // Reintroduce OTP for error handling

//   useEffect(() => {
//     const permissions = checkCookiePermissions();
//     setCookiesEnabled(permissions);
//     if (!permissions) {
//       setErrors({
//         general: "Cookies are disabled in your browser. Please enable cookies to use this application.",
//       });
//     }
//     console.log('ResetPassword state:', { email, propEmail, state });
//   }, []);

//   // Password validation function
//   const validatePassword1 = (password) => {
//     if (!password.trim()) {
//       return "Password is required";
//     } else if (password.length < 8) {
//       return "Password must be at least 8 characters";
//     } else if (!/[A-Z]/.test(password) || !/[0-9]/.test(password)) {
//       return "Password must include at least one uppercase letter and one number";
//     }
//     return "";
//   };

//   // Confirm password validation function
//   const validatePassword2 = (password1, password2) => {
//     if (!password2.trim()) {
//       return "Please confirm your password";
//     } else if (password1 !== password2) {
//       return "Passwords do not match";
//     }
//     return "";
//   };

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });

//     // Real-time validation
//     if (name === "password1") {
//       setErrors((prev) => ({
//         ...prev,
//         password1: validatePassword1(value),
//         // Revalidate password2 if password1 changes
//         password2: formData.password2 ? validatePassword2(value, formData.password2) : prev.password2,
//       }));
//     } else if (name === "password2") {
//       setErrors((prev) => ({
//         ...prev,
//         password2: validatePassword2(formData.password1, value),
//       }));
//     }

//     // Clear general error when user types
//     if (errors.general) {
//       setErrors((prev) => ({ ...prev, general: "" }));
//     }
//   };

//   const validateForm = () => {
//     const newErrors = {
//       password1: validatePassword1(formData.password1),
//       password2: validatePassword2(formData.password1, formData.password2),
//     };

//     if (!email) {
//       newErrors.general = "Email is missing. Please start the password reset process again.";
//     }

//     // if (!otp) {
//     //   newErrors.general = "OTP is missing. Please request a new OTP.";
//     // }

//     setErrors((prev) => ({ ...prev, ...newErrors }));
//     return Object.keys(newErrors).length === 0;
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!validateForm()) return;

//     if (!cookiesEnabled) {
//       setErrors({
//         general: "Cookies are disabled. Please enable cookies to continue.",
//       });
//       return;
//     }

//     setLoading(true);
//     try {
//       const payload = {
//         email,
//         password1: formData.password1,
//         password2: formData.password2,
//         // otp, // Include OTP in payload
//       };
//       console.log("Sending Reset Password Payload:", payload);
//       const response = await authService.resetPassword(payload);
//       console.log("Reset Password Response:", response);

//       if (response.status === "Password Changed" || response.success) {
//         navigate("/password-reset-success");
//       } else {
//         setErrors({ general: response.message || "Failed to reset password." });
//       }
//     } catch (error) {
//       console.error("Reset Password Error:", error);
//       const errorMessage =
//         error.non_field_errors?.[0] ||
//         error.email?.[0] ||
//         error.password1?.[0] ||
//         error.password2?.[0] ||
//         error.message ||
//         (error.status === 401
//           ? "Authentication failed: Invalid or missing token."
//           : error.message === "Network Error"
//             ? "Network error: Unable to reach the server."
//             : error.message.includes("CORS")
//               ? "CORS error: Please contact support."
//               : "Failed to reset password. Please try again.");
//       setErrors({ general: errorMessage });
//       if (
//         error.non_field_errors?.includes("Invalid OTP") ||
//         error.non_field_errors?.includes("Cannot change password. Request new otp.")
//       ) {
//         navigate('/send-email', { state: { email } });
//       }
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="grid grid-cols-12 min-h-screen">
//       <div className="col-span-12 lg:col-span-7 hidden md:block ml-5">
//         <HeroSection />
//       </div>
//       <div className="col-span-12 lg:col-span-5 flex items-center justify-center py-8">
//         <div className="bg-white rounded-lg p-8 max-w-md w-full">
//           <div className="text-center mb-4">
//             <h3 className="text-xl font-bold text-gray-900">Reset Password</h3>
//             <p className="text-gray-600 mt-2">
//               Enter new password for: <br />
//               <span className="font-medium text-[#6DA05D]">{email}</span>
//             </p>
//           </div>
//           {errors.general && (
//             <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded relative mb-4">
//               <span className="block sm:inline">{errors.general}</span>
//             </div>
//           )}
//           <form onSubmit={handleSubmit} className="space-y-8 flex flex-col">
//             <div className="relative">
//               <div className="absolute inset-y-3 left-0 pl-3 pointer-events-none">
//                 <Lock className="h-5 w-5 text-gray-400" />
//               </div>
//               <input
//                 id="password1"
//                 name="password1"
//                 type={showPassword1 ? "text" : "password"}
//                 autoComplete="new-password"
//                 placeholder="New Password"
//                 value={formData.password1}
//                 onChange={handleChange}
//                 className={`w-full pl-10 pr-10 py-2 border rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-[#5b9a68] focus:border-[#5b9a68] ${errors.password1 ? "border-red-500" : "border-gray-200"
//                   }`}
//               />
//               <button
//                 type="button"
//                 className="inset-y-0 right-0 pr-3 flex items-center ml-auto mt-[-2rem]"
//                 onClick={() => setShowPassword1(!showPassword1)}
//               >
//                 {showPassword1 ? (
//                   <img src={EyeOpen} className="h-5 w-5 text-gray-400" alt="Show password" />
//                 ) : (
//                   <img src={EyeClose} className="h-5 w-5 text-gray-400" alt="Hide password" />
//                 )}
//               </button>
//               {errors.password1 && <p className="text-red-500 text-xs mt-4">{errors.password1}</p>}
//             </div>
//             <div className="relative">
//               <div className="absolute inset-y-3 left-0 pl-3 pointer-events-none">
//                 <Lock className="h-5 w-5 text-gray-400" />
//               </div>
//               <input
//                 id="password2"
//                 name="password2"
//                 type={showPassword2 ? "text" : "password"}
//                 autoComplete="new-password"
//                 placeholder="Confirm Password"
//                 value={formData.password2}
//                 onChange={handleChange}
//                 className={`w-full pl-10 pr-10 py-2 border rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-[#5b9a68] focus:border-[#5b9a68] ${errors.password2 ? "border-red-500" : "border-gray-200"
//                   }`}
//               />
//               <button
//                 type="button"
//                 className="inset-y-0 right-0 pr-3 flex items-center ml-auto mt-[-2rem]"
//                 onClick={() => setShowPassword2(!showPassword2)}
//               >
//                 {showPassword2 ? (
//                   <img src={EyeOpen} className="h-5 w-5 text-gray-400" alt="Show password" />
//                 ) : (
//                   <img src={EyeClose} className="h-5 w-5 text-gray-400" alt="Hide password" />
//                 )}
//               </button>
//               {errors.password2 && <p className="text-red-500 text-xs mt-4">{errors.password2}</p>}
//             </div>
//             <button
//               type="submit"
//               disabled={loading || errors.password1 || errors.password2 || !formData.password1.trim() || !formData.password2.trim()}
//               className={`w-full py-3 px-4 rounded-lg text-sm font-semibold flex items-center justify-center ${loading || errors.password1 || errors.password2 || !formData.password1.trim() || !formData.password2.trim()
//                   ? "bg-gray-200 text-gray-400 cursor-not-allowed"
//                   : "bg-[#6DA05D] hover:bg-[#5B8F4E] text-white"
//                 } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#5b9a68]`}
//             >
//               {loading ? (
//                 <span className="flex items-center">
//                   <LoadingIcon />
//                   Saving...
//                 </span>
//               ) : (
//                 "Save Password"
//               )}
//             </button>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// }