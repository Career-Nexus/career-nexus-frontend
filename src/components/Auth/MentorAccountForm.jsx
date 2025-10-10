"use client"

import { useState, useEffect } from "react"
import { Building, Google, Linkedin, LoadingIcon } from "../../icons/icon"
import { Link, useNavigate } from "react-router-dom"
import { Mail, Lock, AlertCircle, ChevronDown, ChevronUp } from "lucide-react"
import { Alert, AlertDescription } from "@chakra-ui/react"
import { EyeClose, EyeOpen } from "../../icons"
import { authService } from "../../api/ApiServiceThree"
import TermsAndPrivacyModal from "../../pages/auth/TermsAndPrivacyModal"
import { industries } from "../../pages/auth/Industries"
import { toast } from "react-toastify"

const MentorAccountForm = () => {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    email: "",
    password1: "",
    password2: "",
    industry: "",
  })
  const [errors, setErrors] = useState({})
  const [apiError, setApiError] = useState("")
  const [loading, setLoading] = useState(false)
  const [showPassword1, setShowPassword1] = useState(false)
  const [showPassword2, setShowPassword2] = useState(false)
  const [isPassword1Focused, setIsPassword1Focused] = useState(false)
  const [passwordRequirements, setPasswordRequirements] = useState({
    length: false,
    lowercase: false,
    uppercase: false,
    number: false,
    special: false,
  })
  const [isPrivacyChecked, setIsPrivacyChecked] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [googleLoading, setGoogleLoading] = useState(false)

  useEffect(() => {
    console.log("Form State:", {
      isPrivacyChecked,
      loading,
      errors,
      formData,
    })
  }, [isPrivacyChecked, loading, errors, formData])

  const handleCheckboxChange = (e) => {
    console.log("Checkbox changed:", e.target.checked)
    setIsPrivacyChecked(e.target.checked)
    setErrors((prev) => ({ ...prev, privacy: "" }))
    setApiError("")
    // if (e.target.checked && !isModalOpen) {
    //   setIsModalOpen(true)
    // }
  }

  const validateEmail = (email) => {
    if (!email.trim()) {
      return "Email is required"
    } else if (!/^[^@]+@[^@]+\.[^@]+$/.test(email)) {
      return "Email is invalid"
    }
    return ""
  }

  const validatePassword1 = (password) => {
    const requirements = {
      length: password.length >= 8,
      lowercase: /[a-z]/.test(password),
      uppercase: /[A-Z]/.test(password),
      number: /[0-9]/.test(password),
      special: /[^a-zA-Z0-9]/.test(password),
    }
    setPasswordRequirements(requirements)
    if (!password) {
      return "Password is required"
    } else if (!Object.values(requirements).every((met) => met)) {
      return "Please meet all password requirements"
    }
    return ""
  }

  const validatePassword2 = (password1, password2) => {
    if (!password2) {
      return "Confirm Password is required"
    } else if (password1 !== password2) {
      return "Passwords do not match"
    }
    return ""
  }
  const validateIndustry = (industry) => {
    if (!industry) {
      return "Please select your preferred industry"
    }
    return ""
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))

    if (name === "email") {
      setErrors((prev) => ({ ...prev, email: validateEmail(value) }))
    } else if (name === "password1") {
      setErrors((prev) => ({
        ...prev,
        password1: validatePassword1(value),
        password2: formData.password2 ? validatePassword2(value, formData.password2) : prev.password2,
      }))
    } else if (name === "password2") {
      setErrors((prev) => ({
        ...prev,
        password2: validatePassword2(formData.password1, value),
      }))
    } else if (name === "industry") {
      setErrors((prev) => ({ ...prev, industry: validateIndustry(value) }))
    }

    setApiError("")
  }

  const validateForm = () => {
    const newErrors = {
      email: validateEmail(formData.email),
      password1: validatePassword1(formData.password1),
      password2: validatePassword2(formData.password1, formData.password2),
      industry: validateIndustry(formData.industry),
    }

    if (!isPrivacyChecked) {
      newErrors.privacy = "You must agree to the Terms and Privacy"
    }

    setErrors(newErrors)
    return Object.values(newErrors).every((error) => error === "")
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setApiError("")

    if (!validateForm()) return

    const userDataToSend = {
      email: formData.email,
      password1: formData.password1,
      password2: formData.password2,
      industry: formData.industry.toLowerCase(),
    }
    setLoading(true)
    try {
      const response = await authService.signup(userDataToSend)
      console.log("API Response:", response)
      if (response.status === "Otp sent") {
        console.log("Signup successful, OTP sent to:", formData.email)
        navigate("/mentor-otp", { state: { email: formData.email, userData: userDataToSend } })
      }
      else {
        setApiError(response.message || "Signup failed. Please try again.")
      }
    } catch (error) {
      console.log("API Error:", error)
      let errorMessage = "An error occurred during signup. Please try again."
      if (error.email?.includes("Existing Email!")) {
        errorMessage = "This email is already registered. Please use a different email or log in.";
      } else if (error.message?.includes("Network Error")) {
        errorMessage = "Network error. Please check your connection and try again.";
      }
      else if (error.message) {
        errorMessage = error.message
      }
      setApiError(errorMessage)
    } finally {
      console.log("Resetting loading state")
      setLoading(false)
    }
  }

  const handleMentorGoogleSignup = () => {
    const googleClientId = "186321207697-u97pq79ijbig0b4095eabijjjej9hm22.apps.googleusercontent.com"
    // const redirectUri = "http://127.0.0.1:5173/signup/"
    // const redirectUri = "https://master.dnoqikexgmm2j.amplifyapp.com/signup/"
    const redirectUri = "https://www.career-nexus.com/signup/"
    const scope = "openid email profile"
    const responseType = "code"
    const accessType = "offline"
    const prompt = "consent"
    const googleAuthUrl = `https://accounts.google.com/o/oauth2/auth?client_id=${googleClientId}&redirect_uri=${encodeURIComponent(
      redirectUri
    )}&response_type=${responseType}&scope=${encodeURIComponent(
      scope
    )}&access_type=${accessType}&prompt=${prompt}`

    window.location.href = googleAuthUrl
  }
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search)
    const code = urlParams.get("code")

    if (code) {
      setGoogleLoading(true)
      const handleGoogleAuth = async () => {
        try {
          const response = await authService.googleMentorSignup(
            {
              code,
              user_type: "mentor"
            }
          )
          console.log("Google signup frontend response:", response)

          if (response && response.access) {
            authService.isAuthenticated(true)
            navigate("/mentor-success", { replace: true })
            toast.success("Google sign-up is successful")
          } else {
            setErrors({ general: "Google sign-up failed. No token received." })
          }
        } catch (err) {
          console.error("Google Signin Error:", err)
          setErrors({ general: "Google sign-in failed. Please try again." })
        } finally {
          setGoogleLoading(false)
        }
      }
      handleGoogleAuth()
    }
  }, [navigate])
  // Render
  if (googleLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p>Signing you up with Google...</p>
      </div>
    )
  }

  const handleLinkedInLogin = () => {
    console.log("LinkedIn login clicked")
  }

  const showPasswordRequirements = isPassword1Focused && formData.password1.length > 0

  return (
    <div className="max-w-2xl w-full mx-auto bg-white aspect-[7.8/6]">
      <form className="space-y-6" onSubmit={handleSubmit}>
        {apiError && (
          <Alert status="error" variant="subtle" className="rounded-md">
            <AlertCircle className="h-4 w-4 mr-2" />
            <AlertDescription className="text-red-500">
              {apiError}
              {apiError.includes("email is already registered") && (
                <span>
                  {" "}
                  <Link to="/" className="text-[#5b9a68] hover:underline">
                    Click here to log in
                  </Link>
                </span>
              )}
            </AlertDescription>
          </Alert>
        )}

        {/* Email Input */}
        <div className="relative">
          <div className="absolute inset-y-3 left-0 pl-3 pointer-events-none">
            <Mail className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email Address"
            className={`w-full pl-10 pr-10 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#5b9a68] focus:border-[#5b9a68] ${errors.email ? "border-red-500" : "border-gray-200"
              }`}
            // className="w-full pl-10 pr-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 border-gray-300"
            aria-invalid={errors.email ? "true" : "false"}
            aria-describedby={errors.email ? "email-error" : undefined}
          />
          {errors.email && (
            <p id="email-error" className="text-xs text-red-500 mt-2">{errors.email}</p>
          )}
        </div>

        {/* Password Input */}
        <div className="relative" style={{ marginTop: "1rem" }}>
          <div className="absolute inset-y-3 left-0 pl-3 pointer-events-none">
            <Lock className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type={showPassword1 ? "text" : "password"}
            id="password1"
            name="password1"
            value={formData.password1}
            onChange={handleChange}
            onFocus={() => setIsPassword1Focused(true)}
            onBlur={() => setIsPassword1Focused(false)}
            placeholder="Password"
            className={`w-full pl-10 pr-10 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#5b9a68] focus:border-[#5b9a68] ${errors.password1 ? "border-red-500" : "border-gray-200"
              }`}
            // className="w-full pl-10 pr-10 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 border-gray-300"
            aria-invalid={errors.password1 ? "true" : "false"}
            aria-describedby={errors.password1 ? "password1-error" : undefined}
          />
          <button
            type="button"
            className="inset-y-0 right-0 pr-3 flex items-center ml-auto mt-[-2rem]"
            // className="relative inset-y-[-1.8rem] right-0 pr-3 flex items-center ml-auto"
            onClick={() => setShowPassword1(!showPassword1)}
            aria-label={showPassword1 ? "Hide password" : "Show password"}
          >
            {showPassword1 ? (
              <img src={EyeOpen} alt="Show password" className="h-5 w-5 text-gray-400" />
            ) : (
              <img src={EyeClose} alt="Hide password" className="h-5 w-5 text-gray-400" />
            )}
          </button>
          {showPasswordRequirements && (
            <div className="mt-1 bg-white p-3 rounded-md border border-gray-200 shadow-md">
              <p className="text-xs font-medium mb-2">Password requirements:</p>
              <ul className="text-xs list-none space-y-1">
                <li className={`flex items-center ${passwordRequirements.length ? "text-green-500" : "text-red-500"}`}>
                  <span className="mr-1">{passwordRequirements.length ? "✓" : "✗"}</span>
                  At least 8 characters long
                </li>
                <li className={`flex items-center ${passwordRequirements.lowercase ? "text-green-500" : "text-red-500"}`}>
                  <span className="mr-1">{passwordRequirements.lowercase ? "✓" : "✗"}</span>
                  At least one lowercase letter
                </li>
                <li className={`flex items-center ${passwordRequirements.uppercase ? "text-green-500" : "text-red-500"}`}>
                  <span className="mr-1">{passwordRequirements.uppercase ? "✓" : "✗"}</span>
                  At least one uppercase letter
                </li>
                <li className={`flex items-center ${passwordRequirements.number ? "text-green-500" : "text-red-500"}`}>
                  <span className="mr-1">{passwordRequirements.number ? "✓" : "✗"}</span>
                  At least one number
                </li>
                <li className={`flex items-center ${passwordRequirements.special ? "text-green-500" : "text-red-500"}`}>
                  <span className="mr-1">{passwordRequirements.special ? "✓" : "✗"}</span>
                  At least one special character
                </li>
              </ul>
            </div>
          )}
          {errors.password1 && (
            <p id="password1-error" className="text-xs text-red-500 mt-3">{errors.password1}</p>
          )}
        </div>
        <div className="relative" style={{ marginTop: "1.7rem" }}>
          <div className="absolute inset-y-3 left-0 pl-3 pointer-events-none">
            <Lock className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type={showPassword2 ? "text" : "password"}
            id="password2"
            name="password2"
            value={formData.password2}
            onChange={handleChange}
            placeholder="Confirm Password"
            className={`w-full pl-10 pr-10 py-2 border rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-[#5b9a68] focus:border-[#5b9a68] ${errors.password2 ? "border-red-500" : "border-gray-200"
              }`}
            // className="w-full pl-10 mt-[-5rem] pr-10 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 border-gray-300"
            aria-invalid={errors.password2 ? "true" : "false"}
            aria-describedby={errors.password2 ? "password2-error" : undefined}
          />
          <button
            type="button"
            // className="relative inset-y-[-1.8rem] right-0 pr-3 flex items-center ml-auto"
            className="inset-y-0 right-0 pr-3 flex items-center ml-auto mt-[-2rem]"
            onClick={() => setShowPassword2(!showPassword2)}
            aria-label={showPassword2 ? "Hide password" : "Show password"}
          >
            {showPassword2 ? (
              <img src={EyeOpen} className="h-5 w-5 text-gray-400" />
            ) : (
              <img src={EyeClose} className="h-5 w-5 text-gray-400" />
            )}
          </button>
          {errors.password2 && (
            <p id="password2-error" className="text-xs text-red-500 mt-3">{errors.password2}</p>
          )}
        </div>

        <div className="relative" style={{ marginTop: "1.7rem" }}>
          {/* <div className="relative mt-6"> */}
          <div className="absolute inset-y-3 left-0 pl-3 pointer-events-none">
            <Building className="h-5 w-4 text-gray-400" />
          </div>
          <select
            id="industry"
            name="industry"
            value={formData.industry}
            onChange={handleChange}
            className={`w-full pl-10 pr-4 py-2 border rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-[#5b9a68] focus:border-[#5b9a68] ${errors.industry ? "border-red-500" : "border-gray-200"
              }`}
          >
            <option value="">Select Preferred Industry</option>
            {industries.map((industry) => (
              <option key={industry} value={industry}>
                {industry.toLowerCase()}
              </option>
            ))}
          </select>
          {errors.industry && (
            <p className="text-xs text-red-500 mt-2">{errors.industry}</p>
          )}
        </div>

        {/* Terms and Conditions Checkbox */}
        <div className="flex items-center gap-2 mt-[-5rem]">
          <input
            id="privacy"
            name="privacy"
            type="checkbox"
            checked={isPrivacyChecked}
            onChange={handleCheckboxChange}
            className="rounded border text-[#5DA05D] border-[#5b9a68] mt-[-1rem] focus:ring-[#5b9a68] h-4 w-4 accent-[#5b9a68]"
            style={{ accentColor: "#15803d" }}
            aria-describedby={errors.privacy ? "privacy-error" : undefined}
          />
          <label htmlFor="privacy" className="text-sm text-gray-600 mt-[-1rem]">
            I agree to all
            <Link
              to="/terms-and-privacy"
              onClick={(e) => {
                e.preventDefault()
                setIsModalOpen(true)
              }}
              className="text-[#5b9a68] hover:underline ml-1"
            >
              Terms and Privacy
            </Link>
          </label>
        </div>
        {errors.privacy && (
          <p id="privacy-error" className="text-xs text-red-500 mt-1">{errors.privacy}</p>
        )}
        <div>
          <button
            style={{ marginTop: "-0.5rem" }}
            type="submit"
            disabled={loading || !isPrivacyChecked || Object.values(errors).some((error) => error !== "")}
            className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium
              ${loading
                ? "bg-[#5b9a68] text-white"
                : !isPrivacyChecked || Object.values(errors).some((error) => error !== "")
                  ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                  : "bg-[#5b9a68] hover:bg-[#4e8559] text-white"
              }
              focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500`}
          >
            {loading ? (
              <span className="flex items-center">
                <LoadingIcon />
                Processing...
              </span>
            ) : (
              "Sign up"
            )}
          </button>
        </div>
      </form>
      {/* Social Login Options */}
      <div className="flex items-center justify-center" style={{ marginTop: "0.7rem" }}>
        <span className="text-sm text-gray-500">Or signup with</span>
      </div>
      <button
        style={{ marginTop: "0.7rem" }}
        type="button"
        onClick={handleMentorGoogleSignup}
        className="w-full flex items-center justify-center border border-gray-200 rounded-md py-2 px-4 hover:bg-gray-50 transition-colors"
      >
        <Google className="h-6 w-6 mr-2" />
        <span>Google</span>
      </button>
      {/* <button
        style={{ marginTop: "0.9rem" }}
        type="button"
        onClick={handleLinkedInLogin}
        className="w-full flex items-center justify-center border border-gray-200 rounded-md py-2 px-4 hover:bg-gray-50 transition-colors"
      >
        <Linkedin className="h-6 w-6 mr-2" />
        <span>LinkedIn</span>
      </button> */}

      {/* Login Link */}
      <div className="text-center" style={{ marginTop: "0.7rem" }}>
        <p className="text-sm text-gray-600">
          Already have an account?
          <Link to="/" className="text-[#5b9a68] hover:underline ml-1">
            Log in
          </Link>
        </p>
      </div>
      <TermsAndPrivacyModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Terms and Conditions" />

    </div>
  )
}

export default MentorAccountForm


