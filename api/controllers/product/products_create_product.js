const mongoose = require('mongoose')
const Product = require('../../models/product')


module.exports = (request, response, next) => {
  if (!request.file) {
    return response.status(404).json({
      message: "Please select an image to upload"
    })
  }
  const product = new Product({
    _id: new mongoose.Types.ObjectId(),
    name: request.body.name,
    price: request.body.price,
    imageUrl: request.file.path
  })
  product.save()
    .then(result => {
      response.status(201).json({
        message: "Success",
        createdProduct: {
          id: result._id,
          name: result.name,
          price: result.price,
          imageUrl: result.imageUrl,
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
}