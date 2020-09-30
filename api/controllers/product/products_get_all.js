const Product = require('../../models/product')


module.exports = (request, response, next) => {
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
}