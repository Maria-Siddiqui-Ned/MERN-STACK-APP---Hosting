import React, { useEffect, useState } from 'react'
import UserCards from '../Components/UserCards'
import axios from 'axios'
import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom'
import { AppRoute } from '../../App';




export default function Category() {
    const [category, setCategory] = useState([])
    useEffect(() => {
        axios.get(`${AppRoute}api/get-all-categories`)
            .then(json => setCategory(json.data.category))

            .catch(err => alert(err.message))

    }, [])

    return (
        <div className="container my-5">
            <div className="text-center">
            <h2 className='text-primary'>Categories</h2>
                <small className="text-secondary">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Cum delectus magnam doloribus voluptatibus possimus corrupti aliquid itaque harum debitis ipsa!</small>
            </div>

            <div className="row my-5">
            {
                   category.map((val, key) =>

                        <div className="col-md-3 my-2 align-items-center" key={key}>
            {/* <div className=" d-flex flex-column"> */}
                            {/* <Link className='text-decoration-none' to='/brands/:BrandName'>                            <Link className='text-decoration-none' to='/brands/:BrandName'> */}
                            <Link className='text-decoration-none' to={`/category/${val.CategoryName}`}>
                            <Card  border="primary" bg="warning" >
                                <Card.Img className="object-fit-" height={200} variant="top" src={val.CategoryImage} />
                                <Card.Body >
                                    {/* <Card.Title >{val.title} - {val.price}$</Card.Title> */}
                                    <Card.Title className='text-truncate' >{val.CategoryName}</Card.Title>
                                </Card.Body>
                            </Card>
                            </Link>
                        </div>
                    )
                }
                
                    
            </div>
        </div>
    )
}
