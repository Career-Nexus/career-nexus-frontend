import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Signup from '../pages/auth/Signup'
import Login from '../pages/auth/Login'
import Navigate from '../components/layout/Navbar'
const Router = () => {
  return (
    <BrowserRouter>
        <Routes>
            <Route path='/' element={<Navigate/>}>
                <Route index element={<Signup/>}/>
                <Route path='login' element={<Login/>}/>
            </Route>
        </Routes>
    </BrowserRouter>
  )
}

export default Router