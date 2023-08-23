import React, { useEffect, useState } from 'react'
import BrandModal from '../components/BrandModal'
import axios from 'axios'
// import { BsFillPencilFill } from 'react-icons/bs'
import { AiFillDelete } from 'react-icons/ai'
import { AppRoute } from '../../App';

export default function Brand() {

    const [brand, setBrand] = useState([])

    useEffect(() => {
        axios.get(`${AppRoute}api/get-all-brands`)
            .then((json) => setBrand(json.data.brand))
            .catch((err) => console.log(err))

    }, [])

    const deleteProduct = (_id) => {
        console.log(_id)
        const payload = { _id }


        let config = {
            method: 'delete',
            url: `${AppRoute}api/delete-brand`,
            data: payload
        };


        axios(config).then(json => console.log(json.data)).catch(err => console.log(err))

    }



    return (
        <div className="container">
            <div className="d-flex justify-content-between align-items-center bg-warning p-2 my-3 rounded">
                <span className='fs-4 fw-bold'>Brand Section</span>
                <BrandModal recallData={setBrand} />
            </div>

            <div className="container">
                <table className="table">
                    <thead>
                        <tr>
                            <th scope="col">ID</th>
                            <th scope="col">Brand Name</th>
                            <th scope="col">Brand Logo</th>
                            <th scope="col">Brand Category</th>
                          {/* <th scope="col">Actions</th> */}
                          <th scope="col"><small className="small">(Refresh after delete.)</small></th>


                        </tr>
                    </thead>
                    <tbody>
                        {
                            brand?.map((val, key) =>
                                <tr key={key}>
                                    <th scope="row">{val._id}</th>
                                    <td>{val.BrandName}</td>
                                    <td><img src={val.BrandImage} className='img-fluid' style={{ height: '5vh', objectFit: 'contain' }} alt="" srcSet="" /></td>
                                    <td>{val.BrandCategory}</td>
                                    <td>
                                        {/* <button className="btn btn-dark mx-1"><BsFillPencilFill /></button> */}
                                        <button className="btn btn-dark mx-1" onClick={() => deleteProduct(val._id)}><AiFillDelete /></button>
                                    </td>
                                </tr>)
                        }

                                    


                    </tbody>
                </table>

            </div>
        </div>
    )
}
