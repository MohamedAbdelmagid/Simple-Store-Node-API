
const mongoose = require('mongoose')
const Order = require('../../models/order')
const Product = require('../../models/product')


module.exports = (request, response, next) => {
  Product.findById(request.body.productId)
    .then(product => {
      if (!product) {
        return response.status(404).json({
          message: "Product not found"
        })
      }
      const order = new Order({
        _id: new mongoose.Types.ObjectId(),
        productId: request.body.productId,
        quantity: request.body.quantity
      })

      order.save()
        .then(newOrder => {
          console.log(newOrder)
          response.status(201).json({
            message: "Success",
            createdOrder: {
              id: newOrder._id,
              productId: newOrder.product,
              quantity: newOrder.quantity,
              _links: {
                resource: process.env.API_END_POINT + '/orders/' + newOrder._id,
                product: process.env.API_END_POINT + '/products/' + newOrder.product
              }
            }
          })
        })
    })
    .catch(err => {
      console.log(err)
      response.status(500).json({
        error: err
      })
    })
}