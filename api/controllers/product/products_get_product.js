const Product = require('../../models/product')


module.exports = (request, response, next) => {
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
}