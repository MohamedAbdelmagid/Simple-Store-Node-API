const express = require('express')
const router = express.Router()


router.get('/', (request, response, next) => {
  response.status(200).json({
    message: 'Handle GET requests to /products'
  })
})

router.post('/', (request, response, next) => {
  response.status(201).json({
    message: 'Handle POST requests to /products'
  })
})

router.get('/:id', (request, response, next) => {
  const id = request.params.id
  if (id === '1' || id === '2') {
    response.status(200).json({
      message: 'The id is ' + id
    })
  } else {
    response.status(200).json({
      message: 'Not found'
    })
  }
})

router.patch('/:id', (request, response, next) => {
  const id = request.params.id
  response.status(200).json({
    message: 'Updated product with id ' + id
  })
})

router.delete('/:id', (request, response, next) => {
  const id = request.params.id
  response.status(200).json({
    message: 'Deleted product with id ' + id
  })
})

module.exports = router
