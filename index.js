const express = require('express')
const app = express()
require('dotenv').config()
const port = process.env.SERVER_PORT
// const mongoose = require('mongoose')
const BrandRouter = require('./api/brands/router')
const CategoryRouter = require('./api/category/router')
const ProductRouter = require ('./api/products/router')
const cors = require('cors')

app.use(express.json())
app.use(
  cors({
    // origin : 'http://localhost:5176/',
    credentials : true
  })
)
app.use ('/api' , require('./api/users/router'))
app.use('/api', BrandRouter)
app.use('/api', CategoryRouter)
app.use('/api', ProductRouter)
app.use('/api', require('./api/mailer/router'))
app.use('/api', require('./api/orders/router'))
const path = require('path')

const clientpath = path.join(__dirname, './client/dist')
app.use('/', express.static(clientpath))


// app.get('/', (req, res) => {
//   res.send('Hello World!')
// })
app.get('*', (req,res) => {
    res.sendFile(path.join(__dirname, './client/dist/index.html'))

})

app.listen(port, () => {
  // console.log(`Example app listening on port http://localhost:${port} , ${clientpath}`)
  console.log(`Example app listening on port http://localhost:${port}`)
})

//  mongoose.connect(process.env.MONGO_URL)
//   .then(() => console.log("DB Connected Successfully"))
//   .catch((err) => console.log(err.message))
