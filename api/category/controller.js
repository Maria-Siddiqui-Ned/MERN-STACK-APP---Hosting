const Category = require('./model')
const { connect } = require('mongoose')
require('dotenv').config()


// get All Categories
const getAllCategories = async (req, res) => {

    try {
        await connect(process.env.MONGO_URL)
        const allCategories = await Category.find()
        res.json({
            category: allCategories
        })

    }

    catch (error) {
        res.status(400).json({
            message: error.message
        })
    }

}

//get Category By ID
// check using this url 
// localhost:1234/api/get-category-by-id?_id=64c972bf61d58247962d487f


const getCategoryByID = async (req, res) => {

    const { _id } = req.query

    try {
        await connect(process.env.MONGO_URL)
        const category = await Category.findOne({ _id })
        res.json({ category })
    }

    catch (error) {
        res.status(400).json({
            message: error.message
        })
    }

}

//get Category By Name
const getCategoryByName = async (req, res) => {

    const { CategoryName } = req.query

    try {
        await connect(process.env.MONGO_URL)
        const category = await Category.findOne({ CategoryName })
        res.json({ category })
    }

    catch (error) {
        res.status(400).json({
            message: error.message
        })
    }

}


//create Category
const createCategory = async (req, res) => {
    const { CategoryName, CategoryImage } = req.body

    if (!CategoryName || !CategoryImage) {
        res.status(403).json({
            message: "Missing Required Field"
        })
    }

    else {
        try {
            await connect(process.env.MONGO_URL)
            const checkExisting = await Category.exists({ CategoryName })

            if (checkExisting) {
                res.status(400).json({
                    message: "Category Already Exists"
                })
            }

            else {
                await Category.create({ CategoryName, CategoryImage })
                const allCategories = await Category.find()

                res.json({
                    message: "Category Created",
                    category: allCategories
                })

            }
        }


        catch (error) {
            res.status(400).json({
                message: error.message
            })
        }
    }
}


//update Category
const updateCategory = async (req, res) => {
    const { _id, CategoryName, CategoryImage } = req.body

    const filter = { _id };
    const update = { CategoryName, CategoryImage };

    try {
        await connect(process.env.MONGO_URL)

        await Category.findOneAndUpdate(filter, update, {
            new: true
        });

        const category = await Category.find()

        res.json({
            message: "Updated Successfully",
            category
        })

    }


    catch (error) {
        res.status(400).json({
            message: error.message
        })
    }

}


//delete Category 
const deleteCategory = async (req, res) => {

    const { _id } = req.body


    try {
        await connect(process.env.MONGO_URL)
        await Category.deleteOne({ _id })
        const category = await Category.find()
        res.status(200).json({
            message: "Deleted Successfully",
            category
        })
    }

    catch (error) {
        res.status(400).json({
            message: error.message
        })
    }

}


module.exports = { getAllCategories, getCategoryByID, getCategoryByName , createCategory, updateCategory, deleteCategory }