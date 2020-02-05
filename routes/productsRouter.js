/**
 * Module for the products routes.
 *
 * @author Mats Loock
 * @version 1.0.0
 */

'use strict'

const router = require('express').Router()

const controller = require('../controllers/productsController')

// Lists all products.
router.get('/', controller.index)

// Creates a new product.
router.route('/create')
  .get(controller.create)
  .post(controller.createPost)

// Gets the details of a product.
router.get('/:id', controller.details)

// Exports.
module.exports = router
