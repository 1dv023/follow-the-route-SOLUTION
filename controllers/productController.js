/**
 * Module for the product controller.
 *
 * @author Mats Loock
 * @version 1.0.0
 */

'use strict'

const Product = require('../models/product')
const ProductRepository = require('../repositories/productRepository')

const productRepository = new ProductRepository()

/**
 * Sends a response containing products.
 *
 * @param {Object} req
 * @param {Object} res
 */
module.exports.index = (req, res) => {
  res.render('product/index', {products: productRepository.getAll()})
}

/**
 * Sends a response containing a form.
 *
 * @param {Object} req
 * @param {Object} res
 */
module.exports.create = (req, res) => {
  res.render('product/create')
}

/**
 * Creats a new product, stores it and redirects to
 * the index page of the products.
 *
 * @param {Object} req
 * @param {Object} res
 */
module.exports.createPost = (req, res) => {
  // Make the product "persistent" and...
  productRepository.add(new Product(req.body.name))

  // ...redirect to the list of products (product/).
  res.redirect('.')
}

/**
 * Sends a response containing a product.
 *
 * @param {Object} req
 * @param {Object} res
 * @param {Object} next
 */
module.exports.details = (req, res, next) => {
  // Get the product that's id equals the parameter id's value.
  const product = productRepository.getById(Number(req.params.id))

  // If no product is found send a 404 (resource not found).
  if (!product) {
    return next()
  }

  // Send response with the wanted product.
  res.render('product/details', {product})
}
