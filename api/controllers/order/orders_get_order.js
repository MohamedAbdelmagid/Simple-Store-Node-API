
const Order = require('../../models/order')


module.exports = (request, response, next) => {
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
}