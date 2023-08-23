import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { AppRoute } from '../../App'
import { useParams } from 'react-router-dom'
import UserCards from '../Components/UserCards'



export default function ProductsByBrand() {
    const { BrandName } = useParams()
    const [products, setProducts] = useState([])
    useEffect(() => {
        axios.get(`${AppRoute}api/get-product-by-brand?ProductBrand=${encodeURIComponent(BrandName)}`)

            .then(json => {
                setProducts(json.data.products);
                        console.log(json.data.products)})
            
            .catch(err => console.log(err))
    }, [])

    return (
        <div className="container my-5">
            <div className="text-center">
                <h2>Products By Brand</h2>
                <p>You searched for { BrandName } products.</p>
                <small className="text-secondary">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Cum delectus magnam doloribus voluptatibus possimus corrupti aliquid itaque harum debitis ipsa!</small>
            </div>

            <div className="row my-5">
                {
                    products.map((val, key) => <UserCards key={key} image={val.ProductThumbnail} name={val.ProductName} url={`/products/${val._id}`} />)
                }

            </div>
        </div>
    )
}
