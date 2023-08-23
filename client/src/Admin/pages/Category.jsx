import React, { useEffect, useState } from 'react'
import CategoryModal from '../components/CategoryModal'
import axios from 'axios'
// import { BsFillPencilFill } from 'react-icons/bs'
import { AiFillDelete } from 'react-icons/ai'
import { AppRoute } from '../../App';


export default function Category() {

    const [category, setCategory] = useState([])

    useEffect(() => {
        axios.get(`${AppRoute}api/get-all-categories`)
            .then((json) => setCategory(json.data.category))
            .catch((err) => console.log(err))

    }, [])

    const deleteProduct = (_id) => {
        console.log(_id)
        const payload = { _id }
        
        const config = {
            method: 'delete',
            url: `${AppRoute}api/delete-category`,
            data: payload
        };

        axios(config)
            .then(json => console.log(json.data.category) )
            .catch(err => console.log(err.message))
    }

    return (
        <div className="container">
            <div className="d-flex justify-content-between align-items-center bg-warning p-2 my-3 rounded">
                <span className='fs-4 fw-bold'>Categories Section</span>
                <CategoryModal recallData={setCategory} />
            </div>

            <div className="container">
                <table className="table">
                    <thead>
                        <tr>
                            <th scope="col">ID</th>
                            <th scope="col">Category Name</th>
                            <th scope="col">Category Image</th>
                            {/* <th scope="col">Actions</th> */}
                            <th scope="col"><small className="small">(Refresh after delete.)</small></th>

                        </tr>
                    </thead>
                    <tbody>
                        {
                            category?.map((val, key) =>
                                <tr key={key}>
                                    <th scope="row">{val._id}</th>
                                    <td>{val.CategoryName}</td>
                                    <td><img src={val.CategoryImage} className='img-fluid' style={{ height: '5vh', objectFit: 'contain' }} alt="" srcSet="" /></td>
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
