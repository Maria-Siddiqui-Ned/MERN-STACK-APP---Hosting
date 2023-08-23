const Product = require('./model')
const { connect } = require('mongoose')
require('dotenv').config()


// getAllProducts
const getAllProducts = async (req, res) => {

    try {
        await connect(process.env.MONGO_URL)
        const allProducts = await Product.find()
        res.json({
            products: allProducts
        })

    }

    catch (error) {
        res.status(400).json({
            message: error.message
        })
    }

}

//getProductByID
const getProductByID = async (req, res) => {

    const { _id } = req.query

    try {
        await connect(process.env.MONGO_URL)
        const product = await Product.findOne({ _id })
        res.json({ product })
    }

    catch (error) {
        res.status(400).json({
            message: error.message
        })
    }

}

// from sir repo
// const getProductByID= async (req, res) => {
//     const { _id } = req.params
//     if (!_id) {
//         res.status(403).json({ message: "Please Give Product id" })
//     }
//     else {
//         await connect(process.env.MONGO_URI)
//         const products = await Products.findOne({ _id })
//         res.json({ products })
//     }
// }
//getProductByCategory
const getProductByCategory = async (req, res) => {

    const { ProductCategory } = req.query

    try {
        await connect(process.env.MONGO_URL)
        const product = await Product.find({ ProductCategory })
        res.json({ product })
    }

    catch (error) {
        res.status(400).json({
            message: error.message
        })
    }

}

//getProductByBrand
const getProductByBrand = async (req, res) => {

    const { ProductBrand } = req.query

    try {
        await connect(process.env.MONGO_URL)
        console.log(connect)
        const products = await Product.find({ ProductBrand})
        if(products === null){
            console.log("Not exist")
        }
        else{
        res.json({ products })
        }
    }

    catch (error) {
        res.status(400).json({
            message: console.log(error.message)
            

        })
    }

}


//createProduct
const createProduct = async (req, res) => {
    const { ProductName, ProductPrice, Stock, ProductCategory,  ProductBrand ,ProductThumbnail,ProductImageArray, ProductDescription } = req.body

    // if (!ProductName || !ProductPrice || Stock || !ProductCategory ||  !ProductBrand || !ProductThumbnail || !ProductImageArray || !ProductDescription) {
    //     res.status(403).json({
    //         message: "Missing Required Field"
    //     })
    // }

    // else {
        try {
            await connect(process.env.MONGO_URL)
            const checkExisting = await Product.exists({ ProductName })

            // if (checkExisting) {
            //     res.status(400).json({
            //         message: "Product Already Exists"
            //     })
            // }

            // else {
                await Product.create({ ProductName, ProductPrice, Stock, ProductCategory,  ProductBrand ,ProductThumbnail,ProductImageArray, ProductDescription })
                const allProducts = await Product.find()

                res.json({
                    message: "Product Created",
                    products: allProducts
                })

            // }
        }
        catch (error) {
            res.status(400).json({
                message: error.message
            })
        // }
    }
}


//updateProduct
const updateProduct = async (req, res) => {
    const { _id, ProductName, ProductPrice, ProductCategory,  ProductBrand ,ProductThumbnail,ProductImageArray, ProductDescription } = req.body

    const filter = { _id };
    const update = {  ProductName, ProductPrice, Stock, ProductCategory,  ProductBrand ,ProductThumbnail,ProductImageArray, ProductDescription };

    try {
        await connect(process.env.MONGO_URL)

        await Product.findOneAndUpdate(filter, update, {
            new: true
        });

        const product = await Product.find()

        res.json({
            message: "Updated Successfully",
            product
        })

    }

    catch (error) {
        res.status(400).json({
            message: error.message
        })
    }

}


//deleteProduct 
const deleteProduct = async (req, res) => {

    const { _id } = req.body


    try {
        await connect(process.env.MONGO_URL)
        await Product.deleteOne({ _id })
        const product = await Product.find()
        res.status(200).json({
            message: "Deleted Successfully",
            product
        })
    }

    catch (error) {
        res.status(400).json({
            message: error.message
        })
    }

}


module.exports = { getAllProducts, getProductByID, getProductByCategory , getProductByBrand, createProduct, updateProduct, deleteProduct }