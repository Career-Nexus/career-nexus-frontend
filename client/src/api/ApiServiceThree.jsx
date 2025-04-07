
import axios from "axios"

const baseUrl= 'https://16.16.24.199'
// Create an axios instance with default config
const api = axios.create({
  // baseURL: process.env.REACT_APP_API_URL || "http://localhost:5000/api",
  baseURL: baseUrl,
  headers: {
    "Content-Type": "application/json",
  },
})

axios.defaults.withCredentials = true;
// Add a request interceptor to include auth token in requests
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token")
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
      localStorage.removeItem("token")
      localStorage.removeItem("user")
      window.location.href = "/login"
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
        localStorage.setItem("token", response.data.token)
        localStorage.setItem("user", JSON.stringify(response.data.user))
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
      if (response.data.token) {
        localStorage.setItem("token", response.data.token)
        localStorage.setItem("user", JSON.stringify(response.data.user))
      }
      return response.data
    } catch (error) {
      throw error.response ? error.response.data : error.message
    }
  },

  // Logout user
  logout: () => {
    localStorage.removeItem("token")
    localStorage.removeItem("user")
  },

  // Get current authenticated user
  getCurrentUser: () => {
    const user = localStorage.getItem("user")
    return user ? JSON.parse(user) : null
  },

  // Check if user is authenticated
  isAuthenticated: () => {
    return !!localStorage.getItem("token")
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