const app = require('express')
const router = app.Router()
const { getAllProducts, getProductByID, getProductByCategory, getProductByBrand, createProduct, updateProduct, deleteProduct } = require('./controller')


router.get ('/get-all-products', getAllProducts )
router.get ('/get-product-by-id', getProductByID )
router.get ('/get-product-by-category', getProductByCategory )
router.get ('/get-product-by-brand', getProductByBrand )
router.post ('/add-products',  createProduct )
router.put ('/update-product', updateProduct )
router.delete ('/delete-product', deleteProduct )

module.exports = router