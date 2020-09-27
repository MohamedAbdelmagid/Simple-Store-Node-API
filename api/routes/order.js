const express = require('express')
const { response } = require("../../app")


const router = express.Router()

router.get('/', (request, response, next) => {
  response.status(200).json({
    message: "Orders were fetched!!"
  })
})

router.post('/', () => {
  response.status(201).json({
    message: "Order was created!!"
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

router.delete('/:id', (request, response, next) => {
  const id = request.params.id
  response.status(200).json({
    message: 'Deleted order with id ' + id
  })
})

module.exports = router

