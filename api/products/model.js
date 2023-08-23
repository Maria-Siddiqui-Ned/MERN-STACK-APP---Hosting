const { Schema, model } = require('mongoose')

const ProductSchema = new Schema(
    {
        ProductName: {
            type: String,
            unique: true,
            required: true
        },

        ProductPrice: {
            type: String,
            required: true
        },

        Stock: {
            type: String,
            required: true
        },
        
        ProductCategory : {
            type: String ,
            required: true
        },

        ProductBrand : {
            type: String ,
            required: true
        },

        ProductThumbnail: {
            type: String ,
            required: true
        },

        ProductImageArray: {
            type: Array ,
            required: true
        },

        ProductDescription:{
            type: String ,
            required: true
        }
    }
)

const Product = model('product', ProductSchema)
module.exports = Product