import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { storage } from '../utils/FirebaseConfig'
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import axios from 'axios';
import Form from 'react-bootstrap/Form';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import toast, { Toaster } from 'react-hot-toast';
const notify = () => toast('Here is your toast.');
import { AppRoute } from '../../App';



function ProductModal() {
    const [show, setShow] = useState(false);
    const [ProductBrand, setProductBrand] = useState('')
    const [ProductCategory, setProductCategory] = useState('')
    const [ProductName, setProductName] = useState("")
    const [ProductThumbnail, setProductThumbnail] = useState(null)
    const [ProductDescription, setProductDescription] = useState("")
    const [ProductPrice, setProductPrice] = useState(0)
    const [Stock, setStock] = useState(0)
    const [ProductImageArray, setProductImageArray] = useState([])

   
     
     

    //API VALUES 
    const [brandVal, setBrandVal] = useState([])
    const [CategoryVal, setCategoryVal] = useState([])

    const handleClose = () => setShow(false);
    const handleShow = () => {
        axios.get(`${AppRoute}api/get-all-brands`).then(json => {
            setBrandVal(json.data.brand)
            axios.get(`${AppRoute}api/get-all-categories`).then(json => {
                setCategoryVal(json.data.category)
                setShow(true);
            })
        }).catch(err => console.log(err))

    }

    const urls = []
    const MultipleImageUpload = () => ProductImageArray?.map((val) => {
        const MultipleImageRef = ref(storage, `/images/products/${ProductName}/${val.name}`);
        return uploadBytes(MultipleImageRef, val).then((snapshot) => {
            return getDownloadURL(snapshot.ref).then((url) => { urls.push(url) }).catch((error) => alert(error));
        });
    })



    const AddProduct = (e) => {
        e.preventDefault();
        toast.success('Product added Successfully')
        const uploadImages = MultipleImageUpload()
        Promise.all(uploadImages)
            .then(() => {
                const storageRef = ref(storage, `/images/products/${ProductName}/${ProductThumbnail.name}`);
                uploadBytes(storageRef, thumbnail).then((snapshot) => {
                    getDownloadURL(snapshot.ref)
                        .then((url) => {
                            const payload = {
                                ProductName, 
                                ProductPrice, 
                                Stock,
                                ProductCategory,  
                                ProductBrand ,
                                ProductThumbnail : url,
                                ProductImageArray : urls,
                                ProductDescription 
                             }
                            // console.log("Ready to hit the API", payload)

                            axios.post(`${AppRoute}api/add-products`, payload).then((json) => {
                                console.log(json.data)

                                setShow(false)
                            })
                                .catch(err => console.log(err))

                        })
                        .catch((error) => { console.log(error) });
                });
            })
            .catch(err => console.log(err))
   }

    return (
        <>
            <Button variant="dark text-warning"  onClick={handleShow}>
                Add Product
            </Button>

            <Modal show={show} onHide={handleClose} centered backdrop="static" size="lg">
                <Modal.Header closeButton>
                    <Modal.Title>Add Product</Modal.Title>
                </Modal.Header>
                <Modal.Body>

                    <form onSubmit={AddProduct}>


                        <div className="mb-3">
                            <div className="col">
                                <FloatingLabel controlId="productname" label="Product Name" className="mb-3 text-secondary"                                >
                                    <Form.Control type="text" placeholder="Product Name" value={ProductName} onChange={(e) => setProductName(e.target.value)} />
                                </FloatingLabel>
                            </div>
                        </div>

                        <div className="row">
                        <div className="col">
                                <FloatingLabel controlId="price" label="Product Price ($)" className="mb-3 text-secondary"                                >
                                    <Form.Control type="number" placeholder="Product Price" value={ProductPrice} onChange={(e) => setProductPrice(e.target.value)} />
                                </FloatingLabel>
                            </div>
                            <div className="col">
                                <FloatingLabel controlId="stock" label="Product Stock" className="mb-3 text-secondary"                                >
                                    <Form.Control type="number" placeholder="Stock" value={Stock} onChange={(e) => setStock(e.target.value)} />
                                </FloatingLabel>
                            </div>
                        </div>


                        <div className="mb-3">
                            <label htmlFor="thumbnail" className="form-label">
                                Product Thumbnail
                            </label>
                            <input className="form-control" onChange={(e) => setProductThumbnail(e.target.files[0])} type="file" id="thumbnail" />
                        </div>

                        <div className="mb-3">

                            <p className='mb-0 fw-semibold'>Choose Images</p>
                            <small className="text-secondary">Double Click to Delete Images</small>
                            <div className="mt-2 d-flex gap-2 align-items-center">
                                {
                                    ProductImageArray.map((val, key) =>
                                        <div key={key} className="bg-light border rounded col-md-1"
                                            onDoubleClick={() => setImages(images.filter((img) => img != val))}>
                                            <img style={{ height: '10vh', cursor: 'pointer', objectFit: 'contain' }}
                                                className='img-fluid' src={URL.createObjectURL(val)} alt="" />
                                        </div>)
                                }
                                <label htmlFor="formFile" style={{ height: '10vh', cursor: 'pointer' }} className="col-md-1 d-flex border border-dark border-2 justify-content-center align-items-center rounded  fs-3 fw-bold form-label">
                                    +
                                </label>
                            </div>


                            <input className="form-control d-none" onChange={(e) => setProductImageArray([...ProductImageArray, e.target.files[0]])} type="file" id="formFile" />
                        </div>


                        <div className="row">
                            <div className="col">
                                <Form.Group className="mb-3" >

                                    <FloatingLabel controlId="floatingSelectBrand" label="Select Brand">
                                        <Form.Select aria-label="Please Select a Brand" onChange={(e) => setProductBrand(e.target.value)}>
                                            <option>Please Select a Brand</option>
                                            {
                                                brandVal.map((val, key) => <option key={key} value={val.BrandName}>{val.BrandName}</option>)
                                            }
                                        </Form.Select>
                                    </FloatingLabel>
                                </Form.Group>
                            </div>
                            <div className="col">
                                <Form.Group className="mb-3" >
                                    <FloatingLabel controlId="selectCategory" label="Select Category">
                                        <Form.Select aria-label="Please Select a Category" onChange={(e) => setProductCategory(e.target.value)}>
                                            <option>Please Select a Category</option>
                                            {
                                                CategoryVal.map((val, key) => <option key={key} value={val.CategoryName}>{val.CategoryName}</option>)
                                            }
                                        </Form.Select>
                                    </FloatingLabel>
                                </Form.Group>
                            </div>
                        </div>


                        <FloatingLabel controlId="floatingTextarea2" label="Description" className='mb-3'>
                            <Form.Control
                                value={ProductDescription}
                                onChange={(e) => setProductDescription(e.target.value)}
                                as="textarea"
                                placeholder="Leave a comment here"
                                style={{ height: '100px' }}
                            />
                        </FloatingLabel>



                        <button type="submit" className="btn btn-warning">
                            Submit<Toaster />
                        </button>
                    </form>
                </Modal.Body>

            </Modal>
        </>
    );
}

export default ProductModal;