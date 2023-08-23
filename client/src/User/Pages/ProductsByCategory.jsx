import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { AppRoute } from '../../App'
import { useParams } from 'react-router-dom'
import UserCards from '../Components/UserCards'



export default function ProductsByCategory() {
    const { CategoryName } = useParams()
    const [product, setProduct] = useState([])
    useEffect(() => {
        axios.get(`${AppRoute}api/get-product-by-category?ProductCategory=${encodeURIComponent(CategoryName)}`)

            .then(json => {
                setProduct(json.data.product);
                        console.log(json.data)})
            
            .catch(err => console.log(err))
    }, [])

    return (
        <div className="container my-5">
            <div className="text-center">
                <h2>Products By Category</h2>
                <p>You searched for { CategoryName } products.</p>
                <small className="text-secondary">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Cum delectus magnam doloribus voluptatibus possimus corrupti aliquid itaque harum debitis ipsa!</small>
            </div>

            <div className="row my-5">
                {
                    product.map((val, key) => 
                    <UserCards key={key} image={val.ProductThumbnail} name={val.ProductName} url={`/products/${val._id}`} />)
                }

            </div>
        </div>
    )
}
