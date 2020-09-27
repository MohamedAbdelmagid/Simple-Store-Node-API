const express = require('express')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const productsRoutes = require('./api/routes/product')
const ordersRoutes = require('./api/routes/order')


const app = express()

app.use(morgan('dev'))
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

// Routes for handling requests
app.use('/products', productsRoutes)
app.use('/orders', ordersRoutes)

// Response for handling not found routes
app.use((request, response, next) => {
  const error = new Error('Not found')
  error.status = 404
  next(error)
})
// Response for handling other errors
app.use((error, request, response, next) => {
  response.status(error.status || 500).json({
    error: {
      message: error.message
    }
  })
})

module.exports = app