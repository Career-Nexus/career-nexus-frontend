
import axios from "axios"
import Cookies from "js-cookie"

// const baseUrl= 'https://16.16.24.199'
const baseUrl = 'https://btest.career-nexus.com/'
const api = axios.create({
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


export const authService = {
  signup: async (userData) => {
    try {
      const response = await api.post('/user/signup/', userData);
      console.log('Signup response:', response.data);
      if (response.data.tempToken || response.data.access) {
        Cookies.set('temp_token', response.data.tempToken || response.data.access, COOKIE_OPTIONS);
      }
      if (response.data.user?.id) {
        Cookies.set('user_id', response.data.user.id, COOKIE_OPTIONS);
      }
      if (response.data.user?.email == "Existing Email!") {
        console.log("Email already exist, try another email")
      }
      return response.data;
    } catch (error) {
      console.error('Signup error:', error.response?.data || error.message);
      throw error.response ? error.response.data : error.message;
    }
  },

  getTermsAndConditions: async (tos = "tos") => {
    try {
      const response = await api.get(`/info/?title=${encodeURIComponent(tos)}`);
      console.log("Fetched privacy policy", response.data);
      return response.data;
    } catch (error) {
      console.error("Error fetching terms and conditions:", error.response?.data || error.message);
      throw error;
    }
  },

  verifyOtp: async (data) => {
    try {
      console.log('Calling verifyOtp with:', data);
      const response = await api.post('/user/signup/', data);
      console.log('Verify OTP Response:', response.data);
      if (response.data.tempToken || response.data.access) {
        Cookies.set('temp_token', response.data.tempToken || response.data.access, COOKIE_OPTIONS);
      }
      if (response.data.user?.id) {
        Cookies.set('user_id', response.data.user.id, COOKIE_OPTIONS);
      }
      return response.data;
    } catch (error) {
      console.error('Verify OTP Error:', error.response?.data || error.message);
      throw error.response ? error.response.data : error.message;
    }
  },
  // Login user
  login: async (credentials) => {
    try {
      const response = await api.post("/user/signin/", credentials)
      console.log("Login response:", response.data)
      if (response.data.access) {
        try {
          // Use js-cookie library
          Cookies.set(TOKEN_COOKIE_NAME, response.data.access, COOKIE_OPTIONS)

          // Store user data
          if (response.data.user) {
            Cookies.set(USER_COOKIE_NAME, JSON.stringify(response.data.user), COOKIE_OPTIONS)
          }
        } catch (cookieError) {
          console.error("Error setting cookies:", cookieError)
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
    const cookieToken = Cookies.get(TOKEN_COOKIE_NAME)
    if (cookieToken) return cookieToken
  },


  getCurrentUser: () => {
    const cookieUserData = Cookies.get(USER_COOKIE_NAME)
    if (cookieUserData) return JSON.parse(cookieUserData)
  },

  isAuthenticated: () => {
    if (Cookies.get(TOKEN_COOKIE_NAME)) return true
  },

  resendOtp: async (data) => {
    try {
      console.log("Calling resendOtp with:", data)
      const response = await api.post("/user/signup/", {
        email: data.email,
        password1: data.password1,
        password2: data.password2,
        resend: true,
      })
      console.log("Resend OTP Response:", response.data)
      return response.data
    } catch (error) {
      console.log("Resend OTP Error:", error)
      throw error.response ? error.response.data : error.message
    }
  },
  setAuthCookies: (access, user) => {
    Cookies.set(TOKEN_COOKIE_NAME, access, COOKIE_OPTIONS)
    Cookies.set(USER_COOKIE_NAME, JSON.stringify(user), COOKIE_OPTIONS)
    console.log("Token set in cookie:", Cookies.get(TOKEN_COOKIE_NAME))
  },

  // Password Reset: Request OTP
  requestResetOtp: async (data) => {
    try {
      if (!data.email) {
        throw new Error('Email is required for OTP request');
      }
      console.log("Calling requestResetOtp with:", data)
      const response = await api.post("/user/forget-password/", data)
      console.log("Request Reset OTP Response:", response.data)
      return response.data
    } catch (error) {
      console.log("Request Reset OTP Error:", error)
      throw error.response ? error.response.data : error.message
    }
  },
  verifyResetOtp: async (data) => {
    try {
      console.log('Calling verifyResetOtp with:', data);
      const tempToken = Cookies.get('temp_token');
      const headers = tempToken ? { Authorization: `Bearer ${tempToken}` } : {};
      const response = await api.post('/user/forget-password/', data, { headers });
      console.log('Verify Reset OTP Response:', response.data);
      return response.data;
    } catch (error) {
      console.error('Verify Reset OTP Error:', error.response?.data || error.message);
      throw error.response ? error.response.data : error;
    }
  },
  resetPassword: async (data) => {
    try {
      if (!data.email || !data.password1 || !data.password2) {
        throw new Error('Email, password1, and password2 are required');
      }
      console.log('Calling resetPassword with:', data);
      const tempToken = Cookies.get('temp_token');
      const headers = tempToken ? { Authorization: `Bearer ${tempToken}` } : {};
      const response = await api.post('/user/forget-password/', data, { headers });
      console.log('Reset Password Response:', response.data);
      return response.data;
    } catch (error) {
      console.error('Reset Password Error:', error.response?.data || error.message);
      throw error.response ? error.response.data : error;
    }
  },
}

export default api