import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Signup from '../pages/auth/Signup'
import Login from '../pages/auth/Login'
import Home from '../pages/dashboard/Home'
import ProfilePage from '../pages/dashboard/ProfilePage'
import MainNavbar from '../components/layout/MainNavbar'
import ErrorPage from '../components/ErrorPage'
import AuthNavbar from '../components/layout/AuthNavbar'
import SignupTwo from '../pages/auth/SignupTwo'
import UserTypeSelection from '../pages/auth/UserSelection'
const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Auth routes with AuthNavbar */}
        <Route path="/" element={<AuthNavbar />}>
          <Route index element={<Signup />} />
          {/* <Route index element={<SignupTwo />} />  */}
          <Route path="login" element={<Login />} />
          <Route path="select" element={<UserTypeSelection />} />
        </Route>

        {/* Main routes with MainNavbar */}
        <Route element={<MainNavbar />}>
          <Route path="home" element={<Home />} />
          <Route path="profilepage" element={<ProfilePage />} />
        </Route>

        {/* Error page */}
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default Router