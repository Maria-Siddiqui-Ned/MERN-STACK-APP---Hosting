const app = require('express')
const router = app.Router()
const { getAllCategories, getCategoryByID, getCategoryByName, createCategory, updateCategory, deleteCategory } = require('./controller')

router.get('/get-all-categories', getAllCategories)
router.get('/get-category-by-id', getCategoryByID)
router.get('/get-category-by-name', getCategoryByName)
router.post('/add-category', createCategory)
router.put('/update-category', updateCategory)
router.delete('/delete-category', deleteCategory)



module.exports = router