
import axios from "axios"

const api = axios.create({
  //baseURL: "https://16.16.24.199",
  baseURL: "http://16.16.24.199:8000",
  headers: {
    'Content-Type': 'application/json',
    //allow cors
    'Access-Control-Allow-Origin': '*',
  },
});
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
    // Handle 401 Unauthorized errors (expired token, etc.)
    if (error.response && error.response.status === 401) {
      localStorage.removeItem("token")
      window.location.href = "/login"
    }
    return Promise.reject(error)
  },
)

// Auth service functions
export const authService = {
  // Login user
  login: async (email, password) => {
    try {
      const response = await api.post("/user/login/", { email, password })
      if (response.data.token) {
        localStorage.setItem("token", response.data.token)
        localStorage.setItem("user", JSON.stringify(response.data.user))
      }
        console.log("User logged in:", response.data.user)
      return response.data
    } catch (error) {
      throw error
    }
  },

  // Register new user
  signup: async (name, email, password) => {
    try {
      const response = await api.post("/user/signup/", { name, email, password })
      if (response.data.token) {
        localStorage.setItem("token", response.data.token)
        localStorage.setItem("user", JSON.stringify(response.data.user))
      }
      console.log("User signed up:", response.data.user)
      return response.data
    } catch (error) {
      throw error
    }
  },

  // Logout user
  logout: () => {
    localStorage.removeItem("token")
    localStorage.removeItem("user")
    window.location.href = "/login"
  },

  // Get current user
  getCurrentUser: () => {
    const user = localStorage.getItem("user")
    return user ? JSON.parse(user) : null
  },

  // Check if user is authenticated
  isAuthenticated: () => {
    return !!localStorage.getItem("token")
  },
}

// // Create an axios instance with default config
// const api = axios.create({
// //   baseURL: process.env.REACT_APP_API_URL || "https://16.16.24.199",
//   baseURL: "https://16.16.24.199",
//   headers: {
//     "Content-Type": "application/json",
//   },
//   timeout: 5000,
// //   httpsAgent: new (require('https').Agent)({
// //     rejectUnauthorized: false, // Disable SSL certificate validation
// //   }),
// })
