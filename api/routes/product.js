const express = require('express')
const mongoose = require('mongoose')
const Product = require('../models/product')


const router = express.Router()

router.get('/', (request, response, next) => {
  Product.find().exec()
    .then(docs => {
      console.log(docs)
      response.status(200).json(docs)
    })
    .catch(err => {
      console.log(err)
      response.status(500).json({
        error: err
      })
    })
})

router.post('/', (request, response, next) => {
  const product = new Product({
    _id: new mongoose.Types.ObjectId(),
    name: request.body.name,
    price: request.body.price
  })
  product.save()
    .then(result => {
      console.log(result)
      response.status(201).json({
        createdProduct: product
      })
    })
    .catch(err => {
      console.log(err)
      response.status(500).json({
        error: err
      })
    })
})

router.get('/:id', (request, response, next) => {
  const id = request.params.id
  Product.findById(id).exec()
    .then(doc => {
      console.log(doc)
      response.status(200).json(doc)
    })
    .catch(err => {
      console.log(err)
      response.status(500).json({
        error: err
      })
    })
})

router.patch('/:id', (request, response, next) => {
  const id = request.params.id

  // Extract the properties from request 
  const propsToUpdate = {}
  for (let prop of request.body) {
    propsToUpdate[prop.propName] = prop.value
  }

  Product.update({ _id: id }, { $set: propsToUpdate }).exec()
    .then(result => {
      response.status(200).json({result})
    })
    .catch(err => {
      console.log(err)
      response.status(500).json({
        error: err
      })
    })
  
})

router.delete('/:id', (request, response, next) => {
  const id = request.params.id
  Product.remove({ _id: id }).exec()
    .then(result => {
      response.status(201).json({result})
    })
    .catch(err => {
      console.log(err)
      response.status(500).json({
        error: err
      })
    })
})

module.exports = router
