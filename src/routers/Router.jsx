import React from 'react'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import Signup from '../pages/auth/Signup'
import Login from '../pages/auth/Login'
import Home from '../pages/dashboard/Home'
import ProfilePage from '../pages/dashboard/ProfilePage'
import MainNavbar from '../components/layout/MainNavbar'
import ErrorPage from '../components/ErrorPage'
import AuthNavbar from '../components/layout/AuthNavbar'
import UserTypeSelection from '../pages/auth/UserSelection'
import { authService } from '../api/ApiServiceThree'
import ViewPersonProfile from '../components/dashboard/home/profile/ViewPersonProfile'
import MentorshipHome from '../pages/mentorship/MentorshipHome'
import { UserProvider } from '../context/UserContext'
import VirtualGalleryDetail from '../components/dashboard/home/profile/VirtualGalleryDetail'
import MentorDetails from '../pages/mentorship/MentorDetails'
import OtpVerification from '../pages/auth/OtpTwo'
import SuccessPage from '../pages/auth/SuccessPage'
import ResetPasswordOtp from '../pages/auth/ResetPasswordOtp'
import ResetPasswordEmail from '../pages/auth/ResetPasswordEmail'
import ResetPassword from '../pages/auth/ResetPassword'
import { ProfileSetup } from '../pages/auth/ProfileSetup'
import PasswordResetSuccess from '../pages/auth/PasswordResetSuccess'
import Jobs from '../pages/jobs/Jobs'
import PersonalizedJob from '../pages/jobs/PersonalizeJobs'
import Notification from '../pages/notification/Notification'
import Network from '../pages/network/Network'
import ChatComponent from '../pages/dashboard/Chat'
import SavedPosts from '../pages/dashboard/SavedPosts'
import { PostsProvider } from '../context/PostsContext'
import ConnectionsInYourIndustry from '../pages/network/ConnectionsInYourIndustry'
import { MentorProfileSetup } from '../pages/auth/mentors/MentorProfileSetup'
import MentorOtpVerification from '../pages/auth/mentors/MentorOtp'
import MentorSuccessPage from '../pages/auth/mentors/MentorSuccess'
import ProfileCompleted from '../pages/auth/mentors/ProfileCompleted'
import MyJobs from '../pages/jobs/MyJobs'


const ProtectedRoute = ({ children }) => {
  const isAuthenticated = authService.isAuthenticated()

  if (!isAuthenticated) {
    return <Navigate to="/login" />
  }

  // return (
  //   <>
  //     <MainNavbar />
  //     {children}
  //   </>
  // )
  return (
    <UserProvider>
      <PostsProvider>
        <MainNavbar />
        {children}
      </PostsProvider>
    </UserProvider>
  )

}

// Auth layout component
const AuthLayout = ({ children }) => {
  return (
    <>
      {/* <AuthNavbar /> */}
      {children}
    </>
  )
}

// Redirect authenticated users away from auth pages
const RedirectIfAuthenticated = ({ children }) => {
  const isAuthenticated = authService.isAuthenticated()

  if (isAuthenticated) {
    return <Navigate to="/home" />
  }
  // return <>{children}</>
  return <AuthLayout>{children}</AuthLayout>
}
const Router = () => {
  // Redirect root to appropriate page based on auth status
  const RootRedirect = () => {
    const isAuthenticated = authService.isAuthenticated()
    return isAuthenticated ? <Navigate to="/home" /> : <Navigate to="/login" />
  }
  return (
    <BrowserRouter>
      <Routes>
        {/* Redirect root to login or home based on auth status */}
        <Route
          path="/signup"
          element={
            <RedirectIfAuthenticated>
              <Signup />
            </RedirectIfAuthenticated>
          }
        />
        <Route
          path="/otp"
          element={
            <RedirectIfAuthenticated>
              <OtpVerification />
            </RedirectIfAuthenticated>
          }
        />
        <Route
          path="/mentor-otp"
          element={
            <RedirectIfAuthenticated>
              <MentorOtpVerification />
            </RedirectIfAuthenticated>
          }
        />

        <Route
          path="/success"
          element={
            <RedirectIfAuthenticated>
              <SuccessPage />
            </RedirectIfAuthenticated>
          }
        />
        <Route
          path="/mentor-success"
          element={
            <RedirectIfAuthenticated>
              <MentorSuccessPage />
            </RedirectIfAuthenticated>
          }
        />

        <Route
          path="/login"
          element={
            <RedirectIfAuthenticated>
              <Login />
            </RedirectIfAuthenticated>
          }
        />
        <Route
          path="/send-email"
          element={
            <RedirectIfAuthenticated>
              <ResetPasswordEmail />
            </RedirectIfAuthenticated>
          }
        />
        <Route
          path="/reset-password-otp"
          element={
            <RedirectIfAuthenticated>
              <ResetPasswordOtp />
            </RedirectIfAuthenticated>
          }
        />
        <Route
          path="/reset-password"
          element={
            <RedirectIfAuthenticated>
              <ResetPassword />
            </RedirectIfAuthenticated>
          }
        />
        <Route
          path="/password-reset-success"
          element={
            <RedirectIfAuthenticated>
              <PasswordResetSuccess />
            </RedirectIfAuthenticated>
          }
        />
        <Route
          path="/profile-setup"
          element={
            <RedirectIfAuthenticated>
              <ProfileSetup />
            </RedirectIfAuthenticated>
          }
        />
        <Route
          path='/select-type'
          element={
            <RedirectIfAuthenticated>
              <UserTypeSelection />
            </RedirectIfAuthenticated>
          }
        />
        {/* Mentors */}
        <Route
          path="/mentor-profile"
          element={
            <RedirectIfAuthenticated>
              <MentorProfileSetup />
            </RedirectIfAuthenticated>
          }
        />
        <Route
          path="/complete"
          element={
            <RedirectIfAuthenticated>
              <ProfileCompleted />
            </RedirectIfAuthenticated>
          }
        />
        
        {/* Protected Routes */}
        <Route
          path="/home"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
        <Route
          path="/profilepage"
          element={
            <ProtectedRoute>
              <ProfilePage />
            </ProtectedRoute>
          }
        />
        <Route
          path='/person-profile'
          element={
            <ProtectedRoute>
              <ViewPersonProfile />
            </ProtectedRoute>
          }
        />
        <Route
          path='/person-profile/:id'
          element={
            <ProtectedRoute>
              <ViewPersonProfile />
            </ProtectedRoute>
          }
        />
        <Route
          path='/gallerydetail/:item'
          element={
            <ProtectedRoute>
              <VirtualGalleryDetail />
            </ProtectedRoute>
          }
        />
        <Route
          path='/mentorship'
          element={
            <ProtectedRoute>
              <MentorshipHome />
            </ProtectedRoute>
          }
        />
        <Route
          path='/mentordetails/:id'
          element={
            <ProtectedRoute>
              <MentorDetails />
            </ProtectedRoute>
          }
        />
        <Route
          path='/jobs'
          element={
            <ProtectedRoute>
              <Jobs />
            </ProtectedRoute>
          }
        />
        <Route
          path='/personalize'
          element={
            <ProtectedRoute>
              <PersonalizedJob />
            </ProtectedRoute>
          }
        />
        <Route
          path='/my-jobs'
          element={
            <ProtectedRoute>
              <MyJobs />
            </ProtectedRoute>
          }
        />
        <Route
          path="/network"
          element={
            <ProtectedRoute>
              <Network />
            </ProtectedRoute>
          }
        />
        <Route
          path="/industry"
          element={
            <ProtectedRoute>
              <ConnectionsInYourIndustry />
            </ProtectedRoute>
          }
        />
        <Route
          path='/notifications'
          element={
            <ProtectedRoute>
              <Notification />
            </ProtectedRoute>
          }
        />
        <Route
          path='/chat'
          element={
            <ProtectedRoute>
              <ChatComponent />
            </ProtectedRoute>
          }
        />
        <Route
          path='/saved'
          element={
            <ProtectedRoute>
              <SavedPosts />
            </ProtectedRoute>
          }
        />
        {/* Root redirect */}
        <Route path="/" element={<RootRedirect />} />

        {/* Catch all - redirect to home or login */}
        {/* <Route path="*" element={<RootRedirect />} /> */}

        {/* Error page */}
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default Router
