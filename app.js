const express = require('express')
const productsRoutes = require('./api/routes/product')


const app = express()

app.use('/products', productsRoutes)

module.exports = app