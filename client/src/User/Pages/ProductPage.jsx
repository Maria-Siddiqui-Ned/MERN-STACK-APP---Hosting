import axios from 'axios'
import { Link } from 'react-router-dom'
import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { CartContext } from '../CartContext/context'
import ReactStars from 'react-stars'
import Swal from 'sweetalert2'
import toast, { Toaster } from 'react-hot-toast';
const notify = () => toast('Here is your toast.');
import { AppRoute } from '../../App';




export default function ProductPage() {

    const { _id } = useParams()
    const [Product, setProduct] = useState({})
    const [quantity, setQuantity] = useState(1)
    const [review, setReview] = useState("")
    const [ratingstar, setratingStar] = useState(0)

    const { cart_state, cart_dispatch } = useContext(CartContext)

    useEffect(() => {
        axios.get(`${AppRoute}api/get-product-by-id?_id=${_id}`)
            .then(json => setProduct(json.data.product))
            .catch(err => console.log(err))
    }, [])

    const addtocart = () => {
        const payload = { ...Product, quantity }
        toast.success('Item added to cart')

        cart_dispatch({
            type: "ADD_TO_CART",
            payload
        })
       
    }


    const ratingChanged = (newRating) => {
        setratingStar(newRating)
    }

    const submitReview = () => {
        const payload = {
            productID: _id,
            review: review,
            rating: ratingstar
        }

        Swal.fire({
            title: 'Successfully Submitted!',
            text: 'Thanks for reviewing our product',
            icon: 'success',
            confirmButtonText: 'Continue Shopping'
        })

        setReview('')
        setratingStar(0)

    }


    return (
        <div className="container">
            <div className="row">
                <div className="col-md-8">
                    <h2 className='mt-5'>{Product.ProductName} - Rs. {Product.ProductPrice}/-</h2>
                    <p className="text-secondary">{Product.ProductDescription}</p>
                    <p className="text-secondary"><b>Brand</b> : {Product.ProductBrand}</p>
                    <p className="text-secondary"><b>Stock</b> : {Product.Stock}</p>

                    

    <div className="row my-5 ">
                        <div className="col-md-4">
                            <img src={Product.ProductThumbnail} alt="" srcSet="" className='img-fluid' />
                        </div>
    
                        <div className="col-md-4 align-items-center ">
                            <div className="row my-5 ">
                                {
                                    Product?.ProductImageArray?.map((val, key) => <div key={key} className='col-md-4 m-2 border  border-dark rounded'><img src={val} className='img-fluid' /></div>)
                                }
                            </div>
                        </div>
                        </div>
    
                    
                </div>


                    <div className="col-md-4">
                        <div className="container">

                            <h3 className="text-center text-success mt-5" >Reviews Us</h3>
                            <small className="text-center text-secondary">Lorem ipsum dolor sit amet consectetur adipisicing elit. Ad, sed.</small>


                            <div className="form-floating">
                                <textarea
                                    className="form-control"
                                    placeholder="Leave a comment here"
                                    id="floatingTextarea2"
                                    style={{ height: 100 }}
                                    defaultValue={review}
                                    onChange={(e) => setReview(e.target.value)}
                                />
                                <label htmlFor="floatingTextarea2">Comments</label>
                            </div>
                        </div>


                        <div className='mt-3'>

                            Rate Us :
                            <div className="d-flex align-items-center">
                                <ReactStars
                                    count={5}
                                    size={24}
                                    value={ratingstar}
                                    onChange={ratingChanged}
                                    color2={'#ffd700'}
                                />
                                <span className='ms-3'>({ratingstar})</span>
                            </div>
                        </div>
                        <button className='my-3 btn btn-primary w-100' onClick={submitReview}>Submit Review</button>

                        <div className='d-flex justify-content-around align-items-center bg-light py-4 rounded border border-secondary'>
                            <button className="btn btn-dark" disabled={quantity <= 1 ? true : false} onClick={() => setQuantity(quantity - 1)}>-</button>
                            {quantity}
                            <button className="btn btn-dark" onClick={() => setQuantity(quantity + 1)}>+</button>
                        </div>

                        <div className='d-block mt-3'><button className="w-100 btn btn-warning" onClick={addtocart}>Add to Cart<Toaster /></button></div>
                    </div>
                </div>
            </div >


            )
}