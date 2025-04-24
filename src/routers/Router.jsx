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

const ProtectedRoute = ({ children }) => {
  const isAuthenticated = authService.isAuthenticated()

  if (!isAuthenticated) {
    return <Navigate to="/login" />
  }

  return (
    <>
      <MainNavbar />
      {children}
    </>
  )
}

// Auth layout component
const AuthLayout = ({ children }) => {
  return (
    <>
      <AuthNavbar />
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
          path="/login"
          element={
            <RedirectIfAuthenticated>
              <Login />
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
              <ViewPersonProfile/>
            </ProtectedRoute>
          }
        />
        <Route
          path='/mentorship'
          element={
            <ProtectedRoute>
              <MentorshipHome/>
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
