const express = require('express')
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const User = require('../models/user')


const router = express.Router()

router.post('/signup', (request, response, next) => {
  User.findOne({ email: request.body.email }).exec()
    .then(user => {
      if (user) {
        return response.status(409).json({
          message: 'This mail is used by another account!!'
        })
      }
      bcrypt.hash(request.body.password, 10, (err, hash) => {
        if (err) {
          return response.status(500).json({
            error: err
          })
        }
    
        const user = new User({
          _id: new mongoose.Types.ObjectId(),
          username: request.body.username,
          email: request.body.email,
          password: hash
        })
        user.save()
          .then(result => {
            console.log(result)
            response.status(201).json({
              message: "Success"
            })
          })
          .catch(err => {
            console.log(err)
            response.status(500).json({
              error: err
            })
          })
        })
      
    })
})

router.delete('/:id', (request, response, next) => {
  User.findOne({ _id: request.params.id }).exec()
    .then(user => {
      if (!user) {
        return response.status(409).json({
          message: 'This user is not exist!!'
        })
      } else {
        user.remove().then(result => {
          response.status(200).json({
            message: "Success"
          })
        })

      }
    })
    .catch(err => {
      console.log(err)
      response.status(500).json({
        error: err
      })
    })
})

module.exports = router