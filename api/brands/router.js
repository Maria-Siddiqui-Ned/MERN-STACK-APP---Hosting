const app = require('express')
const router = app.Router()
const { getAllBrands, getBrandByID, getBrandByName, createBrand, updateBrand, deleteBrand } = require('./controller')


router.get ('/get-all-brands', getAllBrands )
router.get ('/get-brand-by-id', getBrandByID )
router.get ('/get-brand-by-name', getBrandByName )
router.post ('/add-brand', createBrand )
router.put ('/update-brand', updateBrand )
router.delete ('/delete-brand', deleteBrand )

module.exports = router

