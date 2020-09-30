const Order = require('../../models/order')


module.exports = (request, response, next) => {
  const id = request.params.id
  Order.remove({ _id: id}).exec()
    .then(result => {
      response.status(200).json({
        message: 'Deleted order with id ' + id
      })
    })
}