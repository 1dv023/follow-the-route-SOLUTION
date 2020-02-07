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
router.get('/new', controller.new)
router.post('/create', controller.create)

// Gets the details of a product.
router.get('/:id', controller.show)

// Exports.
module.exports = router
