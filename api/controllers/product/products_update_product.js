const Product = require('../../models/product')


module.exports = (request, response, next) => {
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
  
}