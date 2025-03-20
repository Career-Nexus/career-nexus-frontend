import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Signup from '../pages/auth/Signup'
import Login from '../pages/auth/Login'
import Navigate from '../components/layout/Navbar'
import Home from '../pages/dashboard/Home'
import NoPage from '../components/Nopage'
import ProfilePage from '../pages/dashboard/ProfilePage'
import MainNavbar from '../components/layout/MainNavbar'
const Router = () => {
  return (
    <BrowserRouter>
        <Routes>
            <Route path='/' element={<Navigate/>}>
                <Route index element={<Signup/>}/>
                <Route path='login' element={<Login/>}/>
            </Route>
            <Route path='/dashboard' element={<MainNavbar/>}>
                <Route index element={<Home/>}/>
                <Route path='profilepage' element={<ProfilePage/>}/>
            </Route>
            <Route path='*' element={<NoPage/>}/>
        </Routes>
    </BrowserRouter>
  )
}

export default Router