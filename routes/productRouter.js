/**
 * Module for the product routes.
 *
 * @author Mats Loock
 * @version 1.1.0
 */

'use strict'

const router = require('express').Router()

const controller = require('../controllers/productController')

// Lists all products.
router.get('/', controller.index)

// Gets the details of a product.
router.get('/:id', controller.details)

// Creates a new product.
router.route('/create')
  .get(controller.create)
  .post(controller.createPost)

// Exports.
module.exports = router
