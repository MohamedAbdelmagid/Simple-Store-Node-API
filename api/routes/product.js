const express = require('express')
const mongoose = require('mongoose')
const Product = require('../models/product')
const auth = require('../middlewares/auth')


const router = express.Router()

router.get('/', (request, response, next) => {
  Product.find().select("_id name price").exec()
    .then(docs => {
      const data = {
        count: docs.length,
        products: docs.map(doc => {
          return {
            _id: doc._id,
            name: doc.name,
            price: doc.price,
            resource: process.env.API_END_POINT + '/products/' + doc._id 
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
  const product = new Product({
    _id: new mongoose.Types.ObjectId(),
    name: request.body.name,
    price: request.body.price
  })
  product.save()
    .then(result => {
      console.log(result)
      response.status(201).json({
        message: "Success",
        createdProduct: {
          id: result._id,
          name: result.name,
          price: result.price,
          resource: process.env.API_END_POINT + '/products/' + result._id
        }
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
  Product.findById(id).select('_id name price').exec()
    .then(doc => {
      if (doc) {
        response.status(200).json({
          _id: doc._id,
          name: doc.name,
          price: doc.price,
          resource: process.env.API_END_POINT + '/products/' + doc._id
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

router.patch('/:id', auth, (request, response, next) => {
  const id = request.params.id

  // Extract the properties from request 
  const propsToUpdate = {}
  for (let prop of request.body) {
    propsToUpdate[prop.propName] = prop.value
  }

  Product.updateOne({ _id: id }, { $set: propsToUpdate }).exec()
    .then(result => {
      response.status(200).json({
        message: 'Success',
        updated: Object.keys(propsToUpdate),
        resource: process.env.API_END_POINT + '/products/' + id
      })
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
