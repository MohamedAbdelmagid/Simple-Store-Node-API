const express = require('express')
const auth = require('../middlewares/auth')
const ProductControllers = require('../controllers/product/product_controllers')


const router = express.Router()

router.get('/', ProductControllers.get_all)
router.post('/', auth, ProductControllers.create_product)
router.get('/:id', ProductControllers.get_product)
router.patch('/:id', auth, ProductControllers.update_product)
router.delete('/:id', auth, ProductControllers.delete_product)

module.exports = router
