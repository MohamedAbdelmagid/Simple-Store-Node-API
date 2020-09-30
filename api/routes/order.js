const express = require('express')
const auth = require('../middlewares/auth')
const OrderControllers = require('../controllers/order/order_controllers')


const router = express.Router()

router.get('/', auth, OrderControllers.get_all)
router.post('/', auth, OrderControllers.create_order)
router.get('/:id', auth, OrderControllers.get_order)
router.delete('/:id', auth, OrderControllers.delete_order)

module.exports = router

