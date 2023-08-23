import React, { useContext, useState,  useEffect } from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';
import { GlobalContext } from '../../Context/context'
import Cookies from 'js-cookie';
import { BsCart4 } from 'react-icons/bs'
import { decodeToken } from 'react-jwt'



export default function UserNavigationBar() {

    const { state, dispatch } = useContext(GlobalContext)

    const user = decodeToken(state.token)
    console.log(user)
    const ProfileEmail = user.email
    // const [User, setUser] = useState()

    //  useEffect(() => {
    //      axios.get(`localhost:1234/api/get-users-by-email?email={uuser.email}`)
    //          .then(json => setUser(json.data.user))
    //         .catch(err => console.log(err))
    //  }, [])

    return (
        <Navbar expand="lg" bg="warning">
            <Container>
            <Link className='navbar-brand' to="/"><BsCart4 />Let's ShopPk</Link>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ms-auto">
                        <Link to='/' className='nav-link'>Home</Link>
                        <Link to='/brands' className='nav-link'>Brands</Link>
                        <Link to='/products' className='nav-link'>All Products</Link>
                        <Link to='/category' className='nav-link'>Category</Link>
                    </Nav>

                    <div className="d-flex gap-3">
                        <Link to='#' className="btn btn-outline-dark d-flex align-items-center gap-3">
                            <img src="https://cdn-icons-png.flaticon.com/512/3177/3177440.png" style={{ height: '4vh', objectFit: 'contain' }} alt="" />
                            Hi {ProfileEmail}
                        </Link>

                        <Link to='/cart'><img height={40} width={40} src='https://cdn-icons-png.flaticon.com/512/487/487932.png'/></Link>
                        <button className="btn btn-dark"
                            onClick={() => {
                                Cookies.remove('token')
                                dispatch({ type: "USER_LOGOUT" })
                            }}
                        >Sign Out</button>
                    </div>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}


