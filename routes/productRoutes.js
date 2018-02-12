/**
 * Module for the product routes.
 *
 * @author Mats Loock
 * @version 1.0.0
 */

'use strict'

const router = require('express').Router()
const productController = require('../controllers/productController')

// /product
router.get('/', productController.index)

// /product/create
router.route('/create')
  .get(productController.create)
  .post(productController.createPost)

// /product/:id
router.get('/:id', productController.details)

// Exports.
module.exports = router
