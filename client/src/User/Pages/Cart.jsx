import React, { useContext } from 'react'
import { CartContext } from '../CartContext/context'
import { GlobalContext } from '../../Context/context'
import { decodeToken } from 'react-jwt'
import { AiFillDelete } from 'react-icons/ai'
import Swal from 'sweetalert2'


export default function Cart() {


    const { cart_state, cart_dispatch } = useContext(CartContext)
    const { state, dispatch } = useContext(GlobalContext)
    const total = cart_state.cart.reduce((accumulator, product) => accumulator + (product.ProductPrice * product.quantity), 0)
    const user = decodeToken(state.token)
    console.log(user)
    console.log(user.email)


    const checkout = () => {
        const payload = {
            items: cart_state.cart,
            totalBill: total,
            customerAddress: "hello 123 Street ABC",
            customerContact: "0900 78601",
            customerName: user.username,
            customerEmail: user.email
        }
        console.log(cart_state.cart.length)

        Swal.fire({
            title: 'Place your order?',
            text: "You won't be able to revert this!",
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#5d6',
            cancelButtonText: 'Continue Shopping',
            confirmButtonText: 'Confirm checkout'
          }).then((result) => {
            if (result.isConfirmed) {
              Swal.fire({
                icon: 'success',
                text: 'Order Placed Successfully!',
            })
            }
          })


        console.log(payload)
    }

    const deleteitem = (_id) => {
        console.log(_id)
    }


    return (
        <div className="container">
            <div className="text-center my-5">
                <h2>Shopping Cart</h2>
                <small className="text-secondary">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Mollitia eius totam nostrum voluptatibus culpa accusamus.</small>
            </div>

            <div className="p-5 rounded bg-warning border border-dark">
                {
                    cart_state.cart.map((val, key) => <div className="card mb-3 w-100" key={key}>
                        <div className="row g-0 rounded border border-dark">
                            <div className="col-md-2 d-flex justify-content-center align-items-center">
                                <img src={val.ProductThumbnail} style={{ height: '10vh', objectFit: 'contain' }} className="img-fluid rounded-start" alt={val.productName} />
                            </div>
                            <div className="col-md-7">
                                <div className="card-body">
                                    <h5 className="card-title">{val.ProductName} - Rs. {val.ProductPrice} {val.priceUnit}</h5>
                                    <p className="card-text">{val.ProductDescription}
                                    </p>
                                    <p className="card-text">
                                        <small className="text-body-secondary">Quantity : {val.quantity}</small>
                                    </p>
                                </div>
                            </div>
                            <div className="col-md-2">
                                <h5 className="card-title text-center pt-5">Rs.{val.quantity * val.ProductPrice}/-</h5>
                            </div>
                            <div className="col-md-1">
                                <button className="btn btn-dark justify-content-center mt-5 " onClick={() => deleteitem(val._id)}><AiFillDelete /></button>
                            </div>
                        </div>
                    </div>)
                }


                <div className="border border-primary border-3 bg-light px-5 py-3 rounded d-flex justify-content-around align-items-center">
                    <h6>Total</h6>
                    <div>Rs. {total} /=</div>
                </div>

                <div className="container mt-3">
                    <button className="d-block w-100 btn btn-dark text-white" onClick={checkout}>CheckOut</button>
                </div>


            </div>
        </div >
    )
}
