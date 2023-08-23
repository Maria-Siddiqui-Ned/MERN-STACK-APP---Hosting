const Brand = require('./model')
const { connect } = require('mongoose')
require('dotenv').config()


// get All Brands
const getAllBrands = async (req, res) => {

    try {
        await connect(process.env.MONGO_URL)
        const allBrands = await Brand.find()
        res.json({
            brand: allBrands
        })

    }

    catch (error) {
        res.status(400).json({
            message: error.message
        })
    }

}

//get Brand By ID
const getBrandByID = async (req, res) => {

    const { _id } = req.query

    try {
        await connect(process.env.MONGO_URL)
        const brand = await Brand.findOne({ _id })
        res.json({ brand })
    }

    catch (error) {
        res.status(400).json({
            message: error.message
        })
    }

}

//get Brand By Name
const getBrandByName = async (req, res) => {

    const { BrandName } = req.query

    try {
        await connect(process.env.MONGO_URL)
        const brand = await Brand.findOne({ BrandName })
        res.json({ brand })
    }

    catch (error) {
        res.status(400).json({
            message: error.message
        })
    }

}

//create Brand
const createBrand = async (req, res) => {
    const { BrandName, BrandCategory, BrandImage } = req.body

    if (!BrandName || !BrandCategory || !BrandImage) {
        res.status(403).json({
            message: "Missing Required Field"
        })
    }

    else {
        try {
            await connect(process.env.MONGO_URL)
            // const checkExisting = await Brand.exists({ BrandName })

            // if (checkExisting) {
            //     res.alert ("Brand Already Exists").status(400).json({
            //         message: "Brand Already Exists"
                    
            //     })
            // }

            // else {
                await Brand.create({ BrandName, BrandCategory, BrandImage })
                const allBrands = await Brand.find()
                res.json({
                    message: "Brand Created",
                    brand : allBrands
                }
                )

            // }
        }

        catch (error) {
            res.status(400).json({
                message: error.message
            })
        }
    }
}

//update Brand 
const updateBrand = async (req, res) => {
    const { _id, BrandName, BrandCategory, BrandImage } = req.body

    const filter = { _id };
    const update = { BrandName, BrandCategory, BrandImage };

    try {
        await connect(process.env.MONGO_URL)

        await Brand.findOneAndUpdate(filter, update, {
            new: true
        });

        const brand = await Brand.find()

        res.json({
            message: "Updated Successfully",
            brand
        })

    }


    catch (error) {
        res.status(400).json({
            message: error.message
        })
    }

}


//delete Brand
const deleteBrand = async (req, res) => {

    const { _id } = req.body


    try {
        await connect(process.env.MONGO_URL)
        await Brand.deleteOne({ _id })
        const brand = await Brand.find()
        res.status(200).json({
            message: "Deleted Successfully",
            brand
        })
    }

    catch (error) {
        res.status(400).json({
            message: error.message
        })
    }

}
module.exports = { getAllBrands, getBrandByID, getBrandByName , createBrand, updateBrand, deleteBrand }