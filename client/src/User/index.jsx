import React from 'react'
import UserNavigationBar from './Components/UserNavigationBar'
import BrandsPage from './Pages/BrandsPage'
import Category from './Pages/Category'
import Home from './Pages/Home'
import Products from './Pages/Products'
import ProductsByBrand from './Pages/ProductsByBrand'
import Profile from './Pages/Profile'
import ProductsByCategory from './Pages/ProductsByCategory'
import ProductPage from './Pages/ProductPage'
import Cart from './Pages/Cart'
import FooterSection from './Components/FooterSection'
import { Navigate, Route, Routes } from "react-router-dom";


export default function User() {

    return (

        <>
            <UserNavigationBar />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/brands" element={<BrandsPage />} />
                <Route path="/brands/:BrandName" element={<ProductsByBrand />} />
                <Route path="/products" element={<Products />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/products/:_id" element={<ProductPage />} />
                <Route path="/category" element={<Category />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/category/:CategoryName" element={<ProductsByCategory />} />
                <Route path="*" element={<Navigate to='/' replace={true} />} />
            </Routes>
            <FooterSection/>


        </>
    )
}
