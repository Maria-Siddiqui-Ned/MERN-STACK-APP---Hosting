const app = require('express')
const router = app.Router()

const { signup , login , getAllUsers , getUsersByID , getUsersByEmail, updateUser, deleteUsers} = require ('./controller')


router.post('/signup', signup )
router.post('/login', login)
router.get('/get-all-users', getAllUsers)
router.get('/get-users-by-id', getUsersByID)
router.get('/get-users-by-email', getUsersByEmail)
router.put('/update-user', updateUser)
router.delete('/delete-users', deleteUsers)

module.exports = router