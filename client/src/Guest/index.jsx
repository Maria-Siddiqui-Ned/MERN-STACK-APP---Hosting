import React from 'react'
import GuestNav from './Components/GuestNavigationBar'
import {
    Navigate,
    Route,
    Routes,
} from "react-router-dom";
import Home from './Pages/Home';
import Login from './Pages/Login'
import SignUp from './Pages/Signup';
import CategoryPage from './Pages/CategoryPage'
import FooterSection from './Components/FooterSection'

export default function Guest() {
    return (
        <>
            <GuestNav />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<SignUp />} />
                <Route path="/category" element={<CategoryPage />} />
                <Route path="*" element={<Navigate to='/login' replace={true} />} />
            </Routes>
            <FooterSection/>
        </>
    )
}
