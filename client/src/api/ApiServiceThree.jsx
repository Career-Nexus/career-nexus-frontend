
import axios from "axios"
import Cookies from "js-cookie"

const baseUrl= 'https://16.16.24.199'
const api = axios.create({
  // baseURL: process.env.REACT_APP_API_URL || "http://localhost:5000/api",
  baseURL: baseUrl,
  headers: {
    "Content-Type": "application/json",
  },
})
// Cookie configuration
const COOKIE_OPTIONS = {
  expires: 7, // 7 days
  path: "/",
  secure: process.env.NODE_ENV === "production",
  sameSite: "strict",
}
// Cookie names
const TOKEN_COOKIE_NAME = "auth_token"
const USER_COOKIE_NAME = "user_data"


axios.defaults.withCredentials = true;
// Add a request interceptor to include auth token in requests
api.interceptors.request.use(
  (config) => {
    const token = Cookies.get(TOKEN_COOKIE_NAME)
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => Promise.reject(error),
)

// Add a response interceptor to handle common errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Handle unauthorized errors (401)
    if (error.response && error.response.status === 401) {
      Cookies.remove(TOKEN_COOKIE_NAME)
      Cookies.remove(USER_COOKIE_NAME)
      window.location.href = "/login" // Redirect to login page
    }
    return Promise.reject(error)
  },
)

// Update the auth service to send both user data and OTP to the backend
export const authService = {
  // Register a new user and send OTP
  signup: async (userData) => {
    try {
      const response = await api.post("/user/signup/", userData)
      return response.data
    } catch (error) {
      throw error.response ? error.response.data : error.message
    }
  },

  // Verify OTP and complete registration with full user data
  verifyOtp: async (userData, otp) => {
    try {
      // Send both the user data and OTP to the backend
      const response = await api.post("/user/signup/", {
        ...userData,
        otp,
      })

      if (response.data.token) {
        Cookies.set(TOKEN_COOKIE_NAME, response.data.token, COOKIE_OPTIONS)
        Cookies.set(USER_COOKIE_NAME, JSON.stringify(response.data.user), COOKIE_OPTIONS)
        // Debug log
        console.log("Token set in cookie after verification:", Cookies.get(TOKEN_COOKIE_NAME))
      }
      return response.data
    } catch (error) {
      throw error.response ? error.response.data : error.message
    }
  },

  // Login user
  login: async (credentials) => {
    try {
      const response = await api.post("/user/signin/", credentials)
      console.log("Login response:", response.data)
      if (response.data.access) {
        // Try multiple approaches to set the cookie
        try {
          // 1. Use js-cookie library
          Cookies.set(TOKEN_COOKIE_NAME, response.data.access, COOKIE_OPTIONS)

          // 2. Fallback to document.cookie if js-cookie fails
          if (!Cookies.get(TOKEN_COOKIE_NAME)) {
            const cookieValue = `${TOKEN_COOKIE_NAME}=${response.data.access}; path=/; max-age=${60 * 60 * 24 * 7}`
            document.cookie = cookieValue
            console.log("Set cookie using document.cookie fallback")
          }

          // Store user data
          if (response.data.user) {
            Cookies.set(USER_COOKIE_NAME, JSON.stringify(response.data.user), COOKIE_OPTIONS)
          }

          // Debug log
          console.log("Token set in cookie after login:", Cookies.get(TOKEN_COOKIE_NAME))

          // For development environments, also store in sessionStorage as fallback
          if (window.location.hostname === "localhost") {
            sessionStorage.setItem(TOKEN_COOKIE_NAME, response.data.token)
            if (response.data.user) {
              sessionStorage.setItem(USER_COOKIE_NAME, JSON.stringify(response.data.user))
            }
            console.log("Token also stored in sessionStorage for development")
          }
        } catch (cookieError) {
          console.error("Error setting cookies:", cookieError)

          // Last resort fallback for development
          sessionStorage.setItem(TOKEN_COOKIE_NAME, response.data.access)
          if (response.data.user) {
            sessionStorage.setItem(USER_COOKIE_NAME, JSON.stringify(response.data.user))
          }
        }
      } else {
        console.error("No token received from server")
      }
      return response.data
    } catch (error) {
      throw error.response ? error.response.data : error.message
    }
  },

    // Logout user
    logout: () => {
      Cookies.remove(TOKEN_COOKIE_NAME)
      Cookies.remove(USER_COOKIE_NAME)
  
      // Also clear sessionStorage fallback if it exists
      sessionStorage.removeItem(TOKEN_COOKIE_NAME)
      sessionStorage.removeItem(USER_COOKIE_NAME)
    },
  
    // Get auth token
    getAuthToken: () => {
      // Try to get from cookie first
      const cookieToken = Cookies.get(TOKEN_COOKIE_NAME)
      if (cookieToken) return cookieToken
  
      // Fallback to sessionStorage for development environments
      return sessionStorage.getItem(TOKEN_COOKIE_NAME)
    },
  
    // Get current authenticated user
    getCurrentUser: () => {
      // Try to get from cookie first
      const cookieUserData = Cookies.get(USER_COOKIE_NAME)
      if (cookieUserData) return JSON.parse(cookieUserData)
  
      // Fallback to sessionStorage for development environments
      const sessionUserData = sessionStorage.getItem(USER_COOKIE_NAME)
      return sessionUserData ? JSON.parse(sessionUserData) : null
    },
  
    // Check if user is authenticated
    isAuthenticated: () => {
      // Check cookie first
      if (Cookies.get(TOKEN_COOKIE_NAME)) return true
  
      // Fallback to sessionStorage for development environments
      return !!sessionStorage.getItem(TOKEN_COOKIE_NAME)
    },
  // Resend OTP
  resendOtp: async (email) => {
    try {
      const response = await api.post("/auth/signup/resend-otp", { email })
      return response.data
    } catch (error) {
      throw error.response ? error.response.data : error.message
    }
  },
}

export default api


// import axios from "axios"
// const baseUrl= 'https://16.16.24.199'
// // Create an axios instance with default config
// const api = axios.create({
//     // baseURL: process.env.NODE_ENV === 'development' ? '/api' : 'https://16.16.24.199', // Use proxy in development
//     baseURL: baseUrl,
//     headers: {
//       'Content-Type': 'application/json',
//       //allow cors
//     }
//   })
//   axios.defaults.withCredentials = true;
//   // Add a request interceptor to include auth token in requests
//   api.interceptors.request.use(
//     (config) => {
//       const token = localStorage.getItem("token")
//       if (token) {
//         config.headers.Authorization = `Bearer ${token}`
//       }
//       return config
//     },
//     (error) => Promise.reject(error),
//   )
  
//   // Add a response interceptor to handle common errors
//   api.interceptors.response.use(
//     (response) => response,
//     (error) => {
//       // Handle unauthorized errors (401)
//       if (error.response && error.response.status === 401) {
//         localStorage.removeItem("token")
//         localStorage.removeItem("user")
//         window.location.href = "/login"
//       }
//       return Promise.reject(error)
//     },
//   )
  
//   // Update the auth service to use a single endpoint for signup and verification
//   export const authService = {
//     // Register a new user and send OTP
//     signup: async (userData) => {
//       try {
//         const response = await api.post("/user/signup/", userData)
//         return response.data
//       } catch (error) {
//         throw error.response ? error.response.data : error.message
//       }
//     },
  
//     // Verify OTP and complete registration
//     verifyOtp: async (email, otp) => {
//       try {
//         const response = await api.post("user/signup/", { email, otp })
//         if (response.data.token) {
//           localStorage.setItem("token", response.data.token)
//           localStorage.setItem("user", JSON.stringify(response.data.user))
//         }
//         return response.data
//       } catch (error) {
//         throw error.response ? error.response.data : error.message
//       }
//     },
  
//     // Login user
//     login: async (credentials) => {
//       try {
//         const response = await api.post("/auth/login", credentials)
//         if (response.data.token) {
//           localStorage.setItem("token", response.data.token)
//           localStorage.setItem("user", JSON.stringify(response.data.user))
//         }
//         return response.data
//       } catch (error) {
//         throw error.response ? error.response.data : error.message
//       }
//     },
  
//     // Logout user
//     logout: () => {
//       localStorage.removeItem("token")
//       localStorage.removeItem("user")
//     },
  
//     // Get current authenticated user
//     getCurrentUser: () => {
//       const user = localStorage.getItem("user")
//       return user ? JSON.parse(user) : null
//     },
  
//     // Check if user is authenticated
//     isAuthenticated: () => {
//       return !!localStorage.getItem("token")
//     },
  
//     // Resend OTP
//     resendOtp: async (email) => {
//       try {
//         const response = await api.post("/auth/signup/resend-otp", { email })
//         return response.data
//       } catch (error) {
//         throw error.response ? error.response.data : error.message
//       }
//     },
//   }
  
//   export default api