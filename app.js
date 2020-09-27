const express = require('express')
const productsRoutes = require('./api/routes/product')
const ordersRoutes = require('./api/routes/order')


const app = express()

app.use('/products', productsRoutes)
app.use('/orders', ordersRoutes)

app.use((request, response, next) => {
  const error = new Error('Not found')
  error.status = 404
  next(error)
})

app.use((error, request, response, next) => {
  response.status(error.status || 500).json({
    error: {
      message: error.message
    }
  })
})

module.exports = app