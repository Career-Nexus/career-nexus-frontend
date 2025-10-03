// import React, { useState, useEffect } from "react";
// import CnLogo from "../../assets/images/CN_LOGO_2.png";
// import { useNavigate } from "react-router-dom";
// import api, { authService } from "../../api/ApiServiceThree"
// import { useAuth } from "../../contexts/AuthContext";
// import { Mail, Lock, Eye, EyeClosed  } from "lucide-react";

// export default function AdminLogin() {
//   const [showPassword, setShowPassword] = useState(false);
//   const [cookiesEnabled, setCookiesEnabled] = useState(true);
//   const [formData, setFormData] = useState({
//     email: localStorage.getItem("rememberedEmail") || "",
//     password: "",
//   });
//   const [errors, setErrors] = useState({});
//   const [loading, setLoading] = useState(false);
//   const { setIsConnected } = useAuth()
//   const navigate = useNavigate()

//   useEffect(() => {
//       const cookiePermissions = checkCookiePermissions()
//       setCookiesEnabled(cookiePermissions)
  
//       if (!cookiePermissions) {
//         setErrors({
//           general: "Cookies are disabled in your browser. Please enable cookies to use this application.",
//         })
//       }
  
//       // Debug existing cookies
//       debugCookies()
//     }, [])

//   const handleSubmit = async (e) => {
//     e.preventDefault()
//     if (!validateForm()) return
//     if (!cookiesEnabled) {
//       setErrors({
//         general: "Cookies are disabled in your browser. Please enable cookies to use this application.",
//       })
//       return
//     }

//     setLoading(true)
//     try {
//       const response = await authService.login({
//         email: formData.email,
//         password: formData.password,
//         rememberMe: formData.rememberMe,
//       })

//       if (formData.rememberMe) {
//         localStorage.setItem("rememberedEmail", formData.email)
//       } else {
//         localStorage.removeItem("rememberedEmail")
//       }

//       setIsConnected(true)
//       console.log("Login successful:", response)
//       debugCookies()

//       if (response.access) {
//         navigate("/home")
//       }
//     } catch (error) {
//       setErrors({ general: error.message || "Invalid email or password" })
//     } finally {
//       setLoading(false)
//     }
//   }

//   return (
//     <div className="min-h-screen flex flex-col md:flex-row">
//       {/* Left Section */}
//       <div className="flex-1 bg-[#D9FFDB]/50 flex items-center justify-center p-8">
//         <div className="text-center">
//           <div className="text-5xl font-light text-gray-900">
//             <img
//               src={CnLogo}
//               alt="CareerNexus Logo"
//               className="mx-auto h-20 w-auto"
//             />
//           </div>
//           <p className="mt-2 text-lg font-medium text-gray-700">
//             <span className="text-gray-800">Career-</span>
//             <span className="text-purple-900">Nexus</span>
//             <span className="text-green-600">.Com</span>
//           </p>
//         </div>
//       </div>

//       {/* Right Section */}
//       <div className="flex-1 flex items-center justify-center p-8">
//         <div className="w-full max-w-md">
//           <h2 className="text-4xl font-bold text-center text-gray-900">
//             Sign in as an{" "}
//             <span className="text-black px-2 py-1 rounded">ADMIN</span>
//           </h2>

//           <form className="mt-8 space-y-5">
//             {/* Email */}
//             <div className="flex items-center border rounded px-3 py-2 bg-white shadow-sm">
//               <Mail className="w-5 h-5 text-gray-500 mr-2" />
//               <input
//                 type="email"
//                 placeholder="johnsmith@gmail.com"
//                 className="flex-1 outline-none border-none bg-transparent text-gray-700 focus:ring-0 focus-within:bg-transparent"
//               />
//             </div>

//             {/* Password */}
//             <div className="flex items-center border rounded px-3 py-2 bg-white shadow-sm">
//               <Lock className="w-5 h-5 text-gray-500 mr-2" />
//               <input
//                 type={showPassword ? "text" : "password"}
//                 placeholder="12345678"
//                 className="flex-1 outline-none border-none bg-transparent focus:outline-none focus:ring-0 focus-within:bg-transparent text-gray-700"
//               />
//               <button
//                 type="button"
//                 onClick={() => setShowPassword((prev) => !prev)}
//                 className="ml-2 text-gray-500 hover:text-gray-700"
//               >
//                 {showPassword ? (
//                   <Eye className="w-5 h-5" />
//                 ) : (
//                   <EyeClosed className="w-5 h-5" />
//                 )}
//               </button>
//             </div>

//             {/* Remember + Forgot */}
//             <div className="flex items-center justify-between text-sm">
//               <label className="flex items-center space-x-2">
//                 <input
//                   type="checkbox"
//                   className="w-4 h-4 border-green-400 rounded-md text-green-600 focus:outline-none focus:ring-0"
//                 />
//                 <span className="text-gray-600">Remember me</span>
//               </label>
//               <button
//                 type="button"
//                 className="text-gray-500 hover:text-gray-800"
//               >
//                 Forgot Password?
//               </button>
//             </div>

//             {/* Submit */}
//             <button
//               type="submit"
//               className="w-[70%] bg-[#5DA05D] hover:bg-green-700 text-white py-2 rounded shadow"
//               onClick={handleSubmit}
//             >
//               Log in
//             </button>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// }

import React, { useState, useEffect } from "react";
import CnLogo from "../../assets/images/CN_LOGO_2.png";
import { useNavigate } from "react-router-dom";
import api, { authService } from "../../api/ApiServiceThree";
import { Mail, Lock, Eye, EyeClosed } from "lucide-react";

export default function AdminLogin() {
  const [showPassword, setShowPassword] = useState(false);
  const [cookiesEnabled, setCookiesEnabled] = useState(true);
  const [formData, setFormData] = useState({
    email: localStorage.getItem("rememberedEmail") || "",
    password: "",
    rememberMe: false,
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const navigate = useNavigate();

  // --- dummy cookie helpers until you replace with real logic
  const checkCookiePermissions = () => {
    try {
      document.cookie = "testcookie=1";
      return document.cookie.indexOf("testcookie") !== -1;
    } catch {
      return false;
    }
  };

  const debugCookies = () => {
    console.log("Current cookies:", document.cookie);
  };

  const validateForm = () => {
    let newErrors = {};
    if (!formData.email) newErrors.email = "Email is required";
    if (!formData.password) newErrors.password = "Password is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  useEffect(() => {
    const cookiePermissions = checkCookiePermissions();
    setCookiesEnabled(cookiePermissions);

    if (!cookiePermissions) {
      setErrors({
        general:
          "Cookies are disabled in your browser. Please enable cookies to use this application.",
      });
    }

    debugCookies();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    if (!cookiesEnabled) {
      setErrors({
        general:
          "Cookies are disabled in your browser. Please enable cookies to use this application.",
      });
      return;
    }

    setLoading(true);
    try {
      const response = await authService.login({
        email: formData.email,
        password: formData.password,
        rememberMe: formData.rememberMe,
      });

      if (formData.rememberMe) {
        localStorage.setItem("rememberedEmail", formData.email);
      } else {
        localStorage.removeItem("rememberedEmail");
      }

      setIsConnected(true);
      console.log("Login successful:", response);
      debugCookies();

      if (response.access) {
        navigate("/dashboard");
      }
    } catch (error) {
      setErrors({ general: error.message || "Invalid email or password" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Left Section */}
      <div className="flex-1 bg-[#D9FFDB]/50 flex items-center justify-center p-8">
        <div className="text-center">
          <div className="text-5xl font-light text-gray-900">
            <img
              src={CnLogo}
              alt="CareerNexus Logo"
              className="mx-auto h-20 w-auto"
            />
          </div>
          <p className="mt-2 text-lg font-medium text-gray-700">
            <span className="text-gray-800">Career-</span>
            <span className="text-purple-900">Nexus</span>
            <span className="text-green-600">.Com</span>
          </p>
        </div>
      </div>

      {/* Right Section */}
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          <h2 className="text-4xl font-bold text-center text-gray-900">
            Sign in as an{" "}
            <span className="text-black px-2 py-1 rounded">ADMIN</span>
          </h2>

          <form className="mt-8 space-y-5" onSubmit={handleSubmit}>
            {/* Email */}
            <div className="flex items-center border rounded px-3 py-2 bg-white shadow-sm">
              <Mail className="w-5 h-5 text-gray-500 mr-2" />
              <input
                type="email"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                placeholder="johnsmith@gmail.com"
                className="flex-1 outline-none border-none bg-transparent text-gray-700 focus:ring-0 focus-within:bg-transparent"
              />
            </div>
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email}</p>
            )}

            {/* Password */}
            <div className="flex items-center border rounded px-3 py-2 bg-white shadow-sm">
              <Lock className="w-5 h-5 text-gray-500 mr-2" />
              <input
                type={showPassword ? "text" : "password"}
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
                placeholder="12345678"
                className="flex-1 outline-none border-none bg-transparent focus:outline-none focus:ring-0 focus-within:bg-transparent text-gray-700"
              />
              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="ml-2 text-gray-500 hover:text-gray-700"
              >
                {showPassword ? (
                  <Eye className="w-5 h-5" />
                ) : (
                  <EyeClosed className="w-5 h-5" />
                )}
              </button>
            </div>
            {errors.password && (
              <p className="text-red-500 text-sm">{errors.password}</p>
            )}

            {/* Remember + Forgot */}
            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={formData.rememberMe}
                  onChange={(e) =>
                    setFormData({ ...formData, rememberMe: e.target.checked })
                  }
                  className="w-4 h-4 border-green-400 rounded-md text-green-600 focus:outline-none focus:ring-0"
                />
                <span className="text-gray-600">Remember me</span>
              </label>
              <button
                type="button"
                className="text-gray-500 hover:text-gray-800"
              >
                Forgot Password?
              </button>
            </div>

            {/* Error Message */}
            {errors.general && (
              <p className="text-red-500 text-sm text-center">
                {errors.general}
              </p>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-[70%] bg-[#5DA05D] hover:bg-green-700 text-white py-2 rounded shadow disabled:opacity-50"
            >
              {loading ? "Logging in..." : "Log in"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
