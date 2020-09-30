const Product = require('../../models/product')


module.exports = (request, response, next) => {
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
}