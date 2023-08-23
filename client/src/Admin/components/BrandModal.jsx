import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { storage } from '../utils/FirebaseConfig'
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import axios from 'axios';
import { AppRoute } from '../../App';
import Form from 'react-bootstrap/Form';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import toast, { Toaster } from 'react-hot-toast';
const notify = () => toast('Here is your toast.');

function BrandModal({recallData}) {
    const [show, setShow] = useState(false);
    const [BrandName, setBrandName] = useState("")
    const [BrandCategory, setBrandCategory] = useState("")
    const [BrandImage, setBrandImage] = useState(null)

 //API VALUES 
 const [brandVal, setBrandVal] = useState([])
 const [CategoryVal, setCategoryVal] = useState([])

 const handleClose = () => setShow(false);
 const handleShow = () => {
    
         axios.get(`${AppRoute}api/get-all-categories`).then(json => {
             setCategoryVal(json.data.category)
             setShow(true);
        
     }).catch(err => console.log(err))
 }

    const AddBrand = (e) => {
        e.preventDefault();
        toast.success('Brand added Successfully');
        const storageRef = ref(storage, `images/brand/${BrandImage.name}`);
        uploadBytes(storageRef, BrandImage).then((snapshot) => {
            getDownloadURL(snapshot.ref)
                .then((url) => {
                    const payload = { BrandName, BrandCategory, BrandImage: url }
                    axios.post(`${AppRoute}api/add-brand`, payload)
                        .then((json) => {
                            setShow(false);
                            recallData(json.data.brand)

                        })
                        .catch(err => alert(err.message))

                })
                .catch((error) => alert(error.message));
        });

    }

    return (
        <>
            <Button variant="dark text-warning" onClick={handleShow}>
                Add Brand
            </Button>

            <Modal show={show} onHide={handleClose} centered backdrop="static">
                <Modal.Header closeButton>
                    <Modal.Title>Add Brand</Modal.Title>
                </Modal.Header>
                <Modal.Body>

                    <form onSubmit={AddBrand}>
                        <div className="mb-3">
                            <label htmlFor="BrandName" className="form-label">
                            Brand Name
                            </label>
                            <input
                                value={BrandName}
                                onChange={(e) => setBrandName(e.target.value)}
                                type="text"
                                className="form-control"
                                id="BrandName"
                                aria-describedby="emailHelp"
                            />

                        </div>

                        <div className="col">
                                <Form.Group className="mb-3" >
                                    <FloatingLabel controlId="selectCategory" label="Select Category">
                                        <Form.Select aria-label="Please Select a Category" onChange={(e) => setBrandCategory(e.target.value)}>
                                            <option>Please Select a Category</option>
                                            {
                                                CategoryVal.map((val, key) => <option key={key} value={val.CategoryName}>{val.CategoryName}</option>)
                                            }
                                        </Form.Select>
                                    </FloatingLabel>
                                </Form.Group>
                            </div>
                            
                        <div className="mb-3">
                            <label htmlFor="formFile" className="form-label">
                            Brand Image
                            </label>
                            <input className="form-control" onChange={(e) => setBrandImage(e.target.files[0])} type="file" id="formFile" />
                        </div>



                        <button type="submit" className="btn btn-warning">
                            Submit<Toaster />
                        </button>
                    </form>


                </Modal.Body>

            </Modal>
        </>
    );
}

export default BrandModal;