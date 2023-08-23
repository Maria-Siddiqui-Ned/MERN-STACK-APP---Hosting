import React from 'react'
import Brand from '../../Guest/Components/Brands'
import Category from '../../Guest/Components/Category'
import AboutUs from '../../Guest/Components/AboutUs'
import ImageSlider from '../../Guest/Components/ImageSlider'


export default function Home() {
    return (
        <>
            <ImageSlider />
            <AboutUs />
            <Category />
            <Brand />

        </>
    )
}
