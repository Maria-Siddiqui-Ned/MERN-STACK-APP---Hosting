import React from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Link } from 'react-router-dom';
import { BsCart4 } from 'react-icons/bs'
import { useEffect, useState } from 'react'
import axios from 'axios';


export default function GuestNavigationBar() {

     return (
        <Navbar bg="warning" expand="lg">
            <Container>
                <Link className='navbar-brand' to="/"><BsCart4 />Let's ShopPk</Link>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ms-auto">
                        <Link className='nav-link' to="/">Home</Link>
                        <Link className='nav-link' to="/AllProducts">Products</Link>
                        <Link className='nav-link' to="/category">Categories</Link>

                        {/* <NavDropdown title="Items" id="basic-nav-dropdown">
                            {categories.map((val, key) => (
                                <Link to={`/products/category/${val}`}>
                                    <NavDropdown.Item key={key}>{val.CategoryName}</NavDropdown.Item>
                                </Link>
                            ))}
                        </NavDropdown> */}

                        <Link className='ms-4 btn btn-dark' to="/login">Login</Link>
                        <Link className='ms-4 btn btn-dark' to="/signup">SignUp</Link>


                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}
