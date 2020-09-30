const Order = require('../../models/order')


module.exports = (request, response, next) => {
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
}