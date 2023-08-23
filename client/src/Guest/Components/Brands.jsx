import React, { useEffect, useState } from 'react'
import Card from 'react-bootstrap/Card';
import axios from 'axios'
import { AppRoute } from '../../App';


export default function Brand() {
    const [brands, setbrands] = useState([])

    useEffect(() => {
        axios.get(`${AppRoute}api/get-all-brands`)
            .then(json => setbrands(json.data.brand))
            .catch(err => alert(err.message))
    }, [])

    return (
        <div className="container my-5">
            <div className="text-center">
                <h2>Brands</h2>
                <small className="text-secondary">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Cum delectus magnam doloribus voluptatibus possimus corrupti aliquid itaque harum debitis ipsa!</small>
            </div>

            <div className="row my-5">
                {/* {
                    brands.map((val, key) => <GuestCards key={key} image={val.BrandImage} name={val.BrandName} />)
                } */}
                {/* <td><img src={val.ProductThumbnail} className='img-fluid rounded-circle border border-secondary' style={{ height: '10vh', aspectRatio: 1 / 1, objectFit: 'contain' }} alt="" srcSet="" /></td> */}

                {
                    brands.map((val, key) =>

                        <div className="col-md-2 my-3" key={key}>
                            <Card  border="primary" bg="warning" >
                                <Card.Img className="object-fit-" height={150} variant="top" src={val.BrandImage} />
                                <Card.Body >
                                    {/* <Card.Title >{val.title} - {val.price}$</Card.Title> */}
                                    <Card.Title className='text-truncate' >{val.BrandName}</Card.Title>
                                    <Card.Text  className='text-truncate'>{val.BrandCategory}
                                    </Card.Text>
                                </Card.Body>
                            </Card>
                        </div>
                    )
                }
            </div>
        </div>
    )
}
