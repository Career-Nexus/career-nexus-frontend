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
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const { state } = useLocation();
  const email = propEmail || state?.email || "";
  const otp = state?.otp || "";

  useEffect(() => {
    const permissions = checkCookiePermissions();
    setCookiesEnabled(permissions);
    if (!permissions) {
      setErrors({
        general: "Cookies are disabled in your browser. Please enable cookies to use this application.",
      });
      // toast.error("Please enable cookies.");
    }
    console.log('ResetPassword state:', { email, otp, propEmail, state });
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

    if (!otp) {
      newErrors.general = "OTP is missing. Please verify OTP first.";
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
    //   toast.error("Please enable cookies.");
      return;
    }

    setLoading(true);
    try {
      const payload = {
        email,
        password1: formData.password1,
        password2: formData.password2,
        otp,
      };
      console.log("Sending Reset Password Payload:", payload);
      const response = await authService.resetPassword(payload);
      console.log("Reset Password Response:", response);

      if (response.status === "Reset Password OTP sent." || response.success) {
        // toast.success("Password reset successfully! Please log in.");
        // debugCookies();
        navigate("/password-reset-success");
      } else {
        setErrors({ general: response.message || "Failed to reset password." });
        // toast.error(response.message || "Failed to reset password.");
      }
    } catch (error) {
      console.error("Reset Password Error:", error);
      const errorMessage =
        error.non_field_errors?.[0] ||
        error.email?.[0] ||
        error.otp?.[0] ||
        error.password1?.[0] ||
        error.password2?.[0] ||
        error.message ||
        (error.status === 401
          ? "Authentication failed: Invalid or missing token."
          : error.message === "Network Error"
            ? "Network error: Unable to reach the server."
            : error.message.includes("CORS")
              ? "CORS error: Please contact support."
              : "Failed to reset password. Please try again.");
      setErrors({ general: errorMessage });
      if (error.non_field_errors?.includes("Invalid OTP")) {
        // toast.error("Invalid OTP. Please try again with a new OTP.");
        navigate('/send-email', { state: { email } });
      } else {
        // toast.error(errorMessage);
      }
    } finally {
      setLoading(false);
    }
  };



  return (
    <div className="grid grid-cols-12 min-h-screen">
      <div className="col-span-12 lg:col-span-7 hidden md:block">
        <div className="relative h-full w-full overflow-hidden">
          <div
            className="absolute inset-0 bg-cover bg-center z-0 aspect-[7.8/6] -mt-16 ml-[-16%]"
            style={{ backgroundImage: "url('/images/auth-img.png')" }}
          />
          <div
            className="absolute inset-0 z-10"
            style={{
              background:
                "linear-gradient(to bottom, rgba(102, 102, 102, 0) 0%, rgba(102, 102, 102, 0) 45%, rgba(72, 58, 86, 0.6) 60%, #280B45 85%)",
            }}
          />
          <div className="relative z-20 h-full flex flex-col justify-end pb-8 px-16">
            <div className="mb-1">
              <div className="inline-flex items-center bg-opacity-20 bg-gray-800 rounded-lg px-3 py-2 border border-white">
                <div className={`w-3 h-3 rounded-full ${isConnected ? "bg-green-500" : "bg-red-500"} mr-2`}></div>
                <span className="text-white text-sm">Your connection</span>
              </div>
            </div>
            <h1 className="text-white text-lg font-bold mb-2 leading-tight">
              Welcome to your Professional Career Community!
            </h1>
            <p className="text-white text-sm opacity-90">
              Your gateway to skill enhancement and global opportunities...
            </p>
          </div>
        </div>
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
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Lock className="h-5 w-5 text-gray-400" />
              </div>
              <input
                id="password1"
                name="password1"
                type={showPassword ? "text" : "password"}
                autoComplete="new-password"
                placeholder="New Password"
                value={formData.password1}
                onChange={handleChange}
                className="w-full pl-10 pr-10 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6DA05D]"
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <img src={EyeOpen} className="h-5 w-5 text-gray-400" alt="Show password" />
                ) : (
                  <img src={EyeClose} className="h-5 w-5 text-gray-400" alt="Hide password" />
                )}
              </button>
              {errors.password1 && <p className="text-red-500 text-xs mt-1">{errors.password1}</p>}
            </div>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Lock className="h-5 w-5 text-gray-400" />
              </div>
              <input
                id="password2"
                name="password2"
                type={showPassword ? "text" : "password"}
                autoComplete="new-password"
                placeholder="Confirm Password"
                value={formData.password2}
                onChange={handleChange}
                className="w-full pl-10 pr-10 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6DA05D]"
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
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
                  <svg className="animate-spin h-5 w-5 mr-3 text-white" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                  </svg>
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
//   const otp = state?.otp || "";

//   // Check cookies on mount
//   useEffect(() => {
//     const permissions = checkCookiePermissions();
//     setCookiesEnabled(permissions);
//     if (!permissions) {
//       setErrors({
//         general: "Cookies are disabled in your browser. Please enable cookies to use this application.",
//       });
//       toast.error("Please enable cookies.");
//     }
//   }, []);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//     if (errors[name]) {
//       setErrors({ ...errors, [name]: "" });
//     }
//   };

//   const validateForm = () => {
//     const newErrors = {};

//     if (!formData.password1.trim()) {
//       newErrors.password1 = "Password is required";
//     } else if (formData.password1.length < 8) {
//       newErrors.password1 = "Password must be at least 8 characters";
//     } else if (!/[A-Z]/.test(formData.password1) || !/[0-9]/.test(formData.password1)) {
//       newErrors.password1 = "Password must include at least one uppercase letter and one number";
//     }

//     if (!formData.password2.trim()) {
//       newErrors.password2 = "Please confirm your password";
//     } else if (formData.password1 !== formData.password2) {
//       newErrors.password2 = "Passwords do not match";
//     }

//     if (!email) {
//       newErrors.general = "Email is missing. Please start the password reset process again.";
//     }

//     if (!otp) {
//       newErrors.general = "OTP is missing. Please verify OTP first.";
//     }

//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!validateForm()) return;

//     if (!cookiesEnabled) {
//       setErrors({
//         general: "Cookies are disabled. Please enable cookies to continue.",
//       });
//     //   toast.error("Please enable cookies.");
//       return;
//     }

//     setLoading(true);
//     try {
//       const payload = {
//         email,
//         password1: formData.password1,
//         password2: formData.password2,
//         otp,
//       };
//       console.log("Sending Reset Password Payload:", payload);
//       const response = await authService.resetPassword(payload);
//       console.log("Reset Password Response:", response);

//       if (response.status === "Reset Password OTP sent." || response.success) {
//         // toast.success("Password reset successfully! Please log in.");
//         debugCookies(); // Debug cookies
//         navigate("/password-reset-success");
//       } else {
//         setErrors({ general: response.message || "Failed to reset password." });
//         // toast.error(response.message || "Failed to reset password.");
//       }
//     } catch (error) {
//       console.error("Reset Password Error:", error);
//       const errorMessage =
//         error.email?.[0] ||
//         error.otp?.[0] ||
//         error.password1?.[0] ||
//         error.password2?.[0] ||
//         error.non_field_errors?.[0] ||
//         error.message ||
//         (error.status === 401
//           ? "Authentication failed: Invalid or missing token."
//           : error.message === "Network Error"
//             ? "Network error: Unable to reach the server."
//             : error.message.includes("CORS")
//               ? "CORS error: Please contact support."
//               : "Failed to reset password. Please try again.");
//       setErrors({ general: errorMessage });
//     //   toast.error(errorMessage);
//     } finally {
//       setLoading(false);
//     }
//   };


//   return (
//     <div className="grid grid-cols-12 min-h-screen">
//       <div className="col-span-12 lg:col-span-7 hidden md:block">
//         <div className="relative h-full w-full overflow-hidden">
//           <div
//             className="absolute inset-0 bg-cover bg-center z-0 aspect-[7.8/6] -mt-16 ml-[-16%]"
//             style={{ backgroundImage: "url('/images/auth-img.png')" }}
//           />
//           <div
//             className="absolute inset-0 z-10"
//             style={{
//               background:
//                 "linear-gradient(to bottom, rgba(102, 102, 102, 0) 0%, rgba(102, 102, 102, 0) 45%, rgba(72, 58, 86, 0.6) 60%, #280B45 85%)",
//             }}
//           />
//           <div className="relative z-20 h-full flex flex-col justify-end pb-8 px-16">
//             <div className="mb-1">
//               <div className="inline-flex items-center bg-opacity-20 bg-gray-800 rounded-lg px-3 py-2 border border-white">
//                 <div className={`w-3 h-3 rounded-full ${isConnected ? "bg-green-500" : "bg-red-500"} mr-2`}></div>
//                 <span className="text-white text-sm">Your connection</span>
//               </div>
//             </div>
//             <h1 className="text-white text-lg font-bold mb-2 leading-tight">
//               Welcome to your Professional Career Community!
//             </h1>
//             <p className="text-white text-sm opacity-90">
//               Your gateway to skill enhancement and global opportunities...
//             </p>
//           </div>
//         </div>
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
//           <form onSubmit={handleSubmit} className="space-y-4">
//             <div className="relative">
//               <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
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
//                 className="w-full pl-10 pr-10 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6DA05D]"
//               />
//               <button
//                 type="button"
//                 className="absolute inset-y-0 right-0 pr-3 flex items-center"
//                 onClick={() => setShowPassword1(!showPassword1)}
//               >
//                 {showPassword1 ? (
//                   <img src={EyeOpen} className="h-5 w-5 text-gray-400" alt="Show password" />
//                 ) : (
//                   <img src={EyeClose} className="h-5 w-5 text-gray-400" alt="Hide password" />
//                 )}
//               </button>
//               {errors.password1 && <p className="text-red-500 text-xs mt-1">{errors.password1}</p>}
//             </div>
//             <div className="relative">
//               <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
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
//                 className="w-full pl-10 pr-10 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6DA05D]"
//               />
//               <button
//                 type="button"
//                 className="absolute inset-y-0 right-0 pr-3 flex items-center"
//                 onClick={() => setShowPassword2(!showPassword2)}
//               >
//                 {showPassword2 ? (
//                   <img src={EyeOpen} className="h-5 w-5 text-gray-400" alt="Show password" />
//                 ) : (
//                   <img src={EyeClose} className="h-5 w-5 text-gray-400" alt="Hide password" />
//                 )}
//               </button>
//               {errors.password2 && <p className="text-red-500 text-xs mt-1">{errors.password2}</p>}
//             </div>
//             <button
//               type="submit"
//               disabled={loading || !formData.password1.trim() || !formData.password2.trim()}
//               className={`w-full py-3 px-4 rounded-lg text-sm font-semibold flex items-center justify-center ${
//                 loading || !formData.password1.trim() || !formData.password2.trim()
//                   ? "bg-gray-200 text-gray-400 cursor-not-allowed"
//                   : "bg-[#6DA05D] hover:bg-[#5B8F4E] text-white"
//               } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#6DA05D]`}
//             >
//               {loading ? (
//                 <span className="flex items-center">
//                   <svg className="animate-spin h-5 w-5 mr-3 text-white" viewBox="0 0 24 24">
//                     <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
//                     <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
//                   </svg>
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



// export default function ResetPassword({ email: propEmail }) {
//   const [formData, setFormData] = useState({
//     password1: "",
//     password2: "",
//   });
//   const [errors, setErrors] = useState({});
//   const [isConnected] = useState(true);
//   const [loading, setLoading] = useState(false);
//   const [cookiesEnabled, setCookiesEnabled] = useState(true);
//   const [showPassword, setShowPassword] = useState(false);
//   const navigate = useNavigate();
//   const { state } = useLocation();
//   const email = propEmail || state?.email || "";
//   const otp = state?.otp || "";

//   // Check cookies once on mount
//   if (!cookiesEnabled) {
//     setErrors({
//       general: "Cookies are disabled in your browser. Please enable cookies to use this application.",
//     });
//     setCookiesEnabled(checkCookiePermissions());
//   }

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//     if (errors[name]) {
//       setErrors({ ...errors, [name]: "" });
//     }
//   };

//   const validateForm = () => {
//     const newErrors = {};

//     if (!formData.password1.trim()) {
//       newErrors.password1 = "Password is required";
//     } else if (formData.password1.length < 8) {
//       newErrors.password1 = "Password must be at least 8 characters";
//     } else if (!/[A-Z]/.test(formData.password1) || !/[0-9]/.test(formData.password1)) {
//       newErrors.password1 = "Password must include at least one uppercase letter and one number";
//     }

//     if (!formData.password2.trim()) {
//       newErrors.password2 = "Please confirm your password";
//     } else if (formData.password1 !== formData.password2) {
//       newErrors.password2 = "Passwords do not match";
//     }

//     if (!email) {
//       newErrors.general = "Email is missing. Please start the password reset process again.";
//     }

//     if (!otp) {
//       newErrors.general = "OTP is missing. Please verify OTP first.";
//     }

//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!validateForm()) return;

//     if (!cookiesEnabled) {
//       setErrors({
//         general: "Cookies are disabled. Please enable cookies to continue.",
//       });
//     //   toast.error("Please enable cookies.");
//       return;
//     }

//     setLoading(true);
//     try {
//       const payload = {
//         email,
//         otp,
//         new_password: formData.password1,
//       };
//       console.log("Sending Reset Password Payload:", payload);
//       const response = await authService.resetPassword(payload);
//       console.log("Reset Password Response:", response);

//       if (response.status === "Reset Password OTP sent." || response.success) {
//         // toast.success("Password reset successfully! Please log in.");
//         debugCookies(); // Debug cookies
//         navigate("/password-reset-success");
//       } else {
//         setErrors({ general: response.message || "Failed to reset password." });
//         // toast.error(response.message || "Failed to reset password.");
//       }
//     } catch (error) {
//       console.error("Reset Password Error:", error);
//       const errorMessage =
//         error.email?.[0] ||
//         error.otp?.[0] ||
//         error.new_password?.[0] ||
//         error.non_field_errors?.[0] ||
//         error.message ||
//         (error.status === 401
//           ? "Authentication failed: Invalid or missing token."
//           : error.message === "Network Error"
//             ? "Network error: Unable to reach the server."
//             : error.message.includes("CORS")
//               ? "CORS error: Please contact support."
//               : "Failed to reset password. Please try again.");
//       setErrors({ general: errorMessage });
//     //   toast.error(errorMessage);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="grid grid-cols-12 min-h-screen">
//       <div className="col-span-12 lg:col-span-7 hidden md:block">
//         <div className="relative h-full w-full overflow-hidden">
//           <div
//             className="absolute inset-0 bg-cover bg-center z-0 aspect-[7.8/6] -mt-16 ml-[-16%]"
//             style={{ backgroundImage: "url('/images/auth-img.png')" }}
//           />
//           <div
//             className="absolute inset-0 z-10"
//             style={{
//               background:
//                 "linear-gradient(to bottom, rgba(102, 102, 102, 0) 0%, rgba(102, 102, 102, 0) 45%, rgba(72, 58, 86, 0.6) 60%, #280B45 85%)",
//             }}
//           />
//           <div className="relative z-20 h-full flex flex-col justify-end pb-8 px-16">
//             <div className="mb-1">
//               <div className="inline-flex items-center bg-opacity-20 bg-gray-800 rounded-lg px-3 py-2 border border-white">
//                 <div className={`w-3 h-3 rounded-full ${isConnected ? "bg-green-500" : "bg-red-500"} mr-2`}></div>
//                 <span className="text-white text-sm">Your connection</span>
//               </div>
//             </div>
//             <h1 className="text-white text-lg font-bold mb-2 leading-tight">
//               Welcome to your Professional Career Community!
//             </h1>
//             <p className="text-white text-sm opacity-90">
//               Your gateway to skill enhancement and global opportunities...
//             </p>
//           </div>
//         </div>
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
//           <form onSubmit={handleSubmit} className="space-y-4">
//             <div className="relative">
//               <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                 <Lock className="h-5 w-5 text-gray-400" />
//               </div>
//               <input
//                 id="password1"
//                 name="password1"
//                 type={showPassword ? "text" : "password"}
//                 autoComplete="new-password"
//                 placeholder="New Password"
//                 value={formData.password1}
//                 onChange={handleChange}
//                 className="w-full pl-10 pr-10 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6DA05D]"
//               />
//               <button
//                 type="button"
//                 className="absolute inset-y-0 right-0 pr-3 flex items-center"
//                 onClick={() => setShowPassword(!showPassword)}
//               >
//                 {showPassword ? (
//                   <img src={EyeOpen} className="h-5 w-5 text-gray-400" alt="Show password" />
//                 ) : (
//                   <img src={EyeClose} className="h-5 w-5 text-gray-400" alt="Hide password" />
//                 )}
//               </button>
//               {errors.password1 && <p className="text-red-500 text-xs mt-1">{errors.password1}</p>}
//             </div>
//             <div className="relative">
//               <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                 <Lock className="h-5 w-5 text-gray-400" />
//               </div>
//               <input
//                 id="password2"
//                 name="password2"
//                 type={showPassword ? "text" : "password"}
//                 autoComplete="new-password"
//                 placeholder="Confirm Password"
//                 value={formData.password2}
//                 onChange={handleChange}
//                 className="w-full pl-10 pr-10 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6DA05D]"
//               />
//               <button
//                 type="button"
//                 className="absolute inset-y-0 right-0 pr-3 flex items-center"
//                 onClick={() => setShowPassword(!showPassword)}
//               >
//                 {showPassword ? (
//                   <img src={EyeOpen} className="h-5 w-5 text-gray-400" alt="Show password" />
//                 ) : (
//                   <img src={EyeClose} className="h-5 w-5 text-gray-400" alt="Hide password" />
//                 )}
//               </button>
//               {errors.password2 && <p className="text-red-500 text-xs mt-1">{errors.password2}</p>}
//             </div>
//             <button
//               type="submit"
//               disabled={loading}
//               className={`w-full py-3 px-4 rounded-lg text-sm font-semibold flex items-center justify-center ${
//                 loading ? "bg-gray-200 text-gray-400 cursor-not-allowed" : "bg-[#6DA05D] hover:bg-[#5B8F4E] text-white"
//               } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#6DA05D]`}
//             >
//               {loading ? (
//                 <span className="flex items-center">
//                   <svg className="animate-spin h-5 w-5 mr-3 text-white" viewBox="0 0 24 24">
//                     <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
//                     <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
//                   </svg>
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