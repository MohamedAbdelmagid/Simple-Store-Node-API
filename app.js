const express = require('express')
const productsRoutes = require('./api/routes/product')
const ordersRoutes = require('./api/routes/order')


const app = express()

app.use('/products', productsRoutes)
app.use('/orders', ordersRoutes)

module.exports = app