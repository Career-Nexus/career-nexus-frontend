import React from 'react'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import Signup from '../pages/auth/Signup'
import Login from '../pages/auth/Login'
import Home from '../pages/dashboard/Home'
import ProfilePage from '../pages/dashboard/ProfilePage'
import MainNavbar from '../components/layout/MainNavbar'
import ErrorPage from '../components/ErrorPage'
// import AuthNavbar from '../components/layout/AuthNavbar'
import UserTypeSelection from '../pages/auth/UserSelection'
import { authService } from '../api/ApiServiceThree'
// import ViewPersonProfile from '../components/dashboard/home/profile/ViewPersonProfile'
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
import ConnectionsInYourIndustry from '../pages/network/ConnectionsInYourIndustry'
import { MentorProfileSetup } from '../pages/auth/mentors/MentorProfileSetup'
import MentorOtpVerification from '../pages/auth/mentors/MentorOtp'
import MentorSuccessPage from '../pages/auth/mentors/MentorSuccess'
import ProfileCompleted from '../pages/auth/mentors/ProfileCompleted'
import MyJobs from '../pages/jobs/MyJobs'
import ViewPersonProfile from '../components/dashboard/home/profile/viewPersonProfile/ViewPersonProfile'
import AllSaved from '../pages/dashboard/SavedPosts'
import Library from '../pages/dashboard/Library'
import NewsletterPage from "../pages/activities/NewsLetter"
import Setting from "../pages/activities/Setting"
import ChatSection from '../pages/chat/ChatSection'
import Chat from '../pages/chat/Chat'
import NewChats from '../pages/chat/NewChats'
import HelpCenter from '../pages/activities/HelpCenter'
import TroubleShoot from '../pages/activities/TroubleShoot'
import VideoTutorials from '../pages/activities/VideoTutorials'
import Glossarys from '../pages/activities/Glossarys'
import GetStarted from '../pages/activities/GetStarted'
import Booked from '../pages/mentorship/Booked'
import PaymentSuccess from '../components/dashboard/mentorship/PaymentSuccess'
import PaymentFailure from '../components/dashboard/mentorship/PaymentFailure'
import { NotificationProvider } from '../context/NotificationContext'



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
      <NotificationProvider>
        <MainNavbar />
        {children}
      </NotificationProvider>
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
          path='/booked'
          element={
            <ProtectedRoute>
              <Booked />
            </ProtectedRoute>
          }
        />
        <Route
          path='/payment-success'
          element={
            <ProtectedRoute>
              <PaymentSuccess />
            </ProtectedRoute>
          }
        />
        <Route
          path='/payment-failed'
          element={
            <ProtectedRoute>
              <PaymentFailure />
            </ProtectedRoute>
          }
        />
        {/* <Route
          path='/mentordetails/:id'
          element={
            <ProtectedRoute>
              <MentorDetails />
            </ProtectedRoute>
          }
        /> */}
        <Route
          path="/mentordetails/:id"
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
          path='/chat/:id'
          element={
            <ProtectedRoute>
              <Chat />
            </ProtectedRoute>
          }
        />
        <Route
          path='/chatsection'
          element={
            <ProtectedRoute>
              <ChatSection />
            </ProtectedRoute>
          }
        />
        <Route
          path='/newchat'
          element={
            <ProtectedRoute>
              <NewChats />
            </ProtectedRoute>
          }
        />
        <Route
          path='/saved'
          element={
            <ProtectedRoute>
              <AllSaved />
            </ProtectedRoute>
          }
        />
        <Route
          path='/library'
          element={
            <ProtectedRoute>
              <Library />
            </ProtectedRoute>
          }
        />
        <Route
          path='/newsletter'
          element={
            <ProtectedRoute>
              <NewsletterPage />
            </ProtectedRoute>
          }
        />
        <Route
          path='/settings'
          element={
            <ProtectedRoute>
              <Setting />
            </ProtectedRoute>
          }
        />
        <Route
          path='/help'
          element={
            <ProtectedRoute>
              <HelpCenter />
            </ProtectedRoute>
          }
        />
        <Route path='/help/started' element={<ProtectedRoute><GetStarted /></ProtectedRoute>} />
        <Route path='/help/shooting' element={<ProtectedRoute><TroubleShoot /></ProtectedRoute>} />
        <Route path='/help/tutorial' element={<ProtectedRoute><VideoTutorials /></ProtectedRoute>} />
        <Route path='/help/glossary' element={<ProtectedRoute><Glossarys /></ProtectedRoute>} />
        {/* <Route
          path="/help"
          element={
            <ProtectedRoute>
              <HelpCenter />
            </ProtectedRoute>
          }
        >
          <Route path='help' element={<SubmitTicket />} />
          <Route path='started' element={<GettingStarted />} />
          <Route path="shooting" element={<TroubleShooting />} />
          <Route path="tutorial" element={<VideoTutorial />} />
          <Route path="glossary" element={<Glossary />} />
        </Route> */}
        {/* Root redirect */}
        <Route path="/" element={<RootRedirect />} />

        {/* Catch all - redirect to home or login */}
        {/* <Route path="*" element={<RootRedirect />} /> */}

        {/* Error page */}
        {/* <Route path="*" element={<ErrorPage />} /> */}
        <Route
          path="*"
          element={
            <ProtectedRoute>
              <ErrorPage />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  )
}

export default Router
