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

{/* <BrowserRouter>
      <Routes>
        <Route path="/" element={<AuthNavbar />}>
          <Route index element={<Login />} />
          <Route path="signup" element={<Signup />} />
          <Route path="select" element={<UserTypeSelection />} />
        </Route>

        <Route element={
            <MainNavbar />
          }>
            <Route path="home" element={<Home />} />
            <Route path="profilepage" element={<ProfilePage />} />
        </Route>

        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </BrowserRouter> */}
// import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom"
// import Signup from "./components/Signup"
// import Login from "./components/Login"
// import { authService } from "./services/apiServices"

// Protected route component
// const ProtectedRoute = ({ children }) => {
//   const isAuthenticated = authService.isAuthenticated()

//   if (!isAuthenticated) {
//     return <Navigate to="/login" />
//   }

//   return children
// }

// function App() {
//   return (
//     <Router>
//       <Routes>
//         <Route path="/signup" element={<Signup />} />
//         <Route path="/login" element={<Login />} />
//         <Route
//           path="/dashboard"
//           element={
//             <ProtectedRoute>
//               <div className="p-8">
//                 <h1 className="text-2xl font-bold">Dashboard</h1>
//                 <p>Welcome to your dashboard!</p>
//               </div>
//             </ProtectedRoute>
//           }
//         />
//         <Route path="/" element={<Navigate to="/login" />} />
//       </Routes>
//     </Router>
//   )
// }

