import React, { useEffect, useState } from 'react'
import ProductModal from '../components/ProductModal'
import axios from 'axios'
import { AiFillDelete } from 'react-icons/ai'
// import { BsFillPencilFill } from 'react-icons/bs'
import { AppRoute } from '../../App'

export default function Products() {

    const [Product, setProduct] = useState([])
    useEffect(() => {
        axios.get(`${AppRoute}api/get-all-products`)
            .then(json => setProduct(json.data.products))
            .catch(err => console.log(err.message))
    })


    const deleteproduct = (_id) => {
        console.log(_id)
        const payload = { _id }


        let config = {
            method: 'delete',
            url: `${AppRoute}api/delete-product`,
            data: payload
        };


        axios(config).then(json => console.log(json.data)).catch(err => console.log(err))

    }

    return (
        <div className="container">
            <div className="d-flex justify-content-between align-items-center bg-warning p-2 my-3 rounded">
                <span className='fs-4 fw-bold '>Products Section</span>
                <ProductModal recallData={setProduct}/>
            </div>

            <div className="container">
                <table className="table align-middle">
                    <thead>
                        <tr>
                            <th scope="col">Thumbnail</th>
                            <th width={"10%"} scope="col">Name</th>
                            <th width={"10%"} scope="col">Category</th>
                            <th scope="col">Brand</th>
                            <th scope="col">Price</th>
                            <th scope="col">Stock</th>
                            <th  width={"30%"} scope="col">Description</th>
                            <th  width={"30%"} scope="col">Images</th>
                          {/* <th scope="col">Actions</th> */}
                          <th scope="col">Delete</th>


                        </tr>
                    </thead>
                    <tbody>
                        {
                            Product.map((val, key) =>
                                <tr key={key}>
                                    <td><img src={val.ProductThumbnail} className='img-fluid rounded-circle border border-secondary' style={{ height: '10vh', aspectRatio: 1 / 1, objectFit: 'contain' }} alt="" srcSet="" /></td>
                                    <td>{val.ProductName}</td>
                                    <td>{val.ProductCategory}</td>
                                    <td>{val.ProductBrand}</td>
                                    <td>Rs. {val.ProductPrice}</td>
                                    <td>{val.Stock}</td>
                                    <td>{val.ProductDescription}</td>
                                    <td>
                                        <img src={val.ProductImageArray[0]} className='img-fluid rounded-circle border border-secondary m-2' style={{ height: '10vh', aspectRatio: 1 / 1, objectFit: 'contain' }} alt="" srcSet=""/>
                                        <img src={val.ProductImageArray[1]} className='img-fluid rounded-circle border border-secondary m-2' style={{ height: '10vh', aspectRatio: 1 / 1, objectFit: 'contain' }} alt="" srcSet=""/>
                                        <img src={val.ProductImageArray[2]} className='img-fluid rounded-circle border border-secondary m-2' style={{ height: '10vh', aspectRatio: 1 / 1, objectFit: 'contain' }} alt="" srcSet=""/>
                                        <img src={val.ProductImageArray[3]} className='img-fluid rounded-circle border border-secondary m-2' style={{ height: '10vh', aspectRatio: 1 / 1, objectFit: 'contain' }} alt="" srcSet=""/>
                                        </td>
                                    {/* <td>{val.ProductDescription.length < 20 ? val.description : val.description.substring(0, 20) + "..."}</td> */}
                                    <td className='d-flex justify-content-between'>
                                    {/* <button className="btn btn-dark mx-1"><BsFillPencilFill /></button> */}
                                        <button className="btn btn-dark mx-1" onClick={() => deleteproduct(val._id)}><AiFillDelete /></button>
                                    </td>

                                </tr>)
                        }



                    </tbody>
                </table>

            </div>
        </div>
    )
}
