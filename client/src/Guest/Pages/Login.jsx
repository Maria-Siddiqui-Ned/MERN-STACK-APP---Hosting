import React, { useContext, useState } from 'react'
import axios from 'axios'
import Cookies from 'js-cookie'
import { GlobalContext } from '../../Context/context'
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { AppRoute } from '../../App';

import { Link } from 'react-router-dom'


export default function LoginForm() {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const { state, dispatch } = useContext(GlobalContext)

    //form validation function
    const [validated, setValidated] = useState(false);
    const handleSubmit = (e) => {
        const form = e.currentTarget;
        if (form.checkValidity() === false) {
            e.preventDefault();
            e.stopPropagation();
        }
        setValidated(true);
        loginUser(e)
    };

    const loginUser = (e) => {
        e.preventDefault();
        const payload = { email, password }
        axios.post(`${AppRoute}api/login`, payload)
            .then((json) => {
                Cookies.set('token', json.data.token)
                dispatch({
                    type: "USER_LOGIN",
                    token: json.data.token
                })
            })
            .catch(err => console.log(err))
    }

    return (

        <div className="container my-5 d-flex justify-content-center align-item-center">

            {/* <Form  noValidate validated={validated} onSubmit={handleSubmit}> */}
            <Form noValidate validated={validated} onSubmit={handleSubmit}>
                <h3>Welcome to Let's Shop! Please login to continue.</h3>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control
                        name="email"
                        type="email"
                        placeholder="Enter email address"
                        required
                        onChange={(e) => setEmail(e.target.value)}
                    />

                    <Form.Text className="text-muted">
                        We'll never share your email with anyone else.
                    </Form.Text>

                    <Form.Control.Feedback type="invalid">
                        Please provide a valid email address.
                    </Form.Control.Feedback>

                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        name="password"
                        type="password"
                        placeholder="Enter Password"
                        required
                        onChange={(e) => setPassword(e.target.value)}

                    />

                    <Form.Control.Feedback type="invalid">
                        Please provide a valid password.
                    </Form.Control.Feedback>

                </Form.Group>

                <div className="d-grid gap-2">
                    <Button variant="primary" className="btn btn-warning" type="submit">
                        Login
                    </Button>
                </div>
                <div>
                    <p className='mt-3'>Don't have an account?
                        <Link to='/signup'> Signup</Link> here. </p>
                </div>
            </Form>

        </div>
    )
}
