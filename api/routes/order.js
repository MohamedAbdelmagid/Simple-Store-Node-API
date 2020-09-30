const express = require('express')
const mongoose = require('mongoose')
const Order = require('../models/order')
const Product = require('../models/product')
const auth = require('../middlewares/auth')


const router = express.Router()

router.get('/', auth, (request, response, next) => {
  Order.find().select("_id product quantity").populate('product', 'name price').exec()
    .then(docs => {
      const data = {
        count: docs.length,
        orders: docs.map(doc => {
          return {
            _id: doc._id,
            product: doc.product,
            quantity: doc.quantity,
            _links: {
              resource: process.env.API_END_POINT + '/orders/' + doc._id,
              product: process.env.API_END_POINT + '/products/' + doc.product
            }
          }
        })
      }
      response.status(200).json(data)
    })
    .catch(err => {
      console.log(err)
      response.status(500).json({
        error: err
      })
    })
})

router.post('/', auth, (request, response, next) => {
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
})

router.get('/:id', auth, (request, response, next) => {
  const id = request.params.id
  Order.findById(id).select('_id product quantity').populate('product').exec()
    .then(doc => {
      if (doc) {
        response.status(200).json({
          _id: doc._id,
          product: doc.product,
          quantity: doc.quantity,
          _links: {
            resource: process.env.API_END_POINT + '/orders/' + doc._id,
            product: process.env.API_END_POINT + '/products/' + doc.product
          }
        })
      } else {
        response.status(404).json({ message: "Not found"})
      }
    })
    .catch(err => {
      console.log(err)
      response.status(500).json({
        error: err
      })
    })
})

router.delete('/:id', auth, (request, response, next) => {
  const id = request.params.id
  Order.remove({ _id: id}).exec()
    .then(result => {
      response.status(200).json({
        message: 'Deleted order with id ' + id
      })
    })
})

module.exports = router

