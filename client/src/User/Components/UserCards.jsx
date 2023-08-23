import React from 'react'
import { Link } from 'react-router-dom'
import Card from 'react-bootstrap/Card';


export default function UserCards({ name, image, url, description, price }) {
    return (
        <div className="col-md-3 my-2 align-items-center">
        <div className=" d-flex flex-column">
            {/* <Link className='text-decoration-none' to={`/products/${val._id}`}> */}
            <Link className='text-decoration-none' to={url}>
            <Card  border="primary"  bg="dark" text='light'>
                <Card.Img className="object-fit-fill" height={220} variant="top" src={image} />
                <Card.Body >
                <Card.Title  className='text-truncate' >{name} - Rs. {price}</Card.Title>
                <Card.Text text='primary' className='text-truncate'>{description}                                       </Card.Text>
                </Card.Body>
            </Card>
            </Link>
        </div>
    </div>

    )
}
