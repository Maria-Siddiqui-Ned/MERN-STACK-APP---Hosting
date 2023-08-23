import React from 'react'
import { Link } from 'react-router-dom'
import Card from 'react-bootstrap/Card';


export default function GuestCards({ name, image }) {
    return (

        <div className="col-md-3 my-2 align-items-center">
            <div className=" d-flex flex-column">
                {/* <Link className='text-decoration-none' to='/login'> */}
                <Card  border="primary"  bg="dark" text='light'>
                    <Card.Img className="object-fit-fill" height={220} variant="top" src={image} />
                    <Card.Body >
                        <Card.Title >{name}</Card.Title>
                    </Card.Body>
                </Card>
                {/* </Link> */}
            </div>
        </div>

    )
}
