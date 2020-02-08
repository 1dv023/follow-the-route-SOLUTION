/**
 * Module for the products controller.
 *
 * @author Mats Loock
 * @version 1.0.0
 */

'use strict'

const productsController = {}

// "Faking" persistent products.
const products = [{ id: 1, name: 'Phone' }]

/**
 * Displays a list of products.
 *
 * @param {object} req - Express request object.
 * @param {object} res - Express response object.
 */
productsController.index = async (req, res) => {
  const viewData = { products }
  res.render('products/index', { viewData })
}

/**
 * Returns a HTML form for creating a new product.
 *
 * @param {object} req - Express request object.
 * @param {object} res - Express response object.
 */
productsController.new = async (req, res) => {
  res.render('products/new')
}

/**
 * Creates a new product.
 *
 * @param {object} req - Express request object.
 * @param {object} res - Express response object.
 */
productsController.create = async (req, res) => {
  // Make the product "persistent" and...
  products.push({
    id: products.length + 1,
    name: req.body.name
  })

  // ...redirect to the list of products.
  res.redirect('.')
}

/**
 * Displays a product.
 *
 * @param {object} req - Express request object.
 * @param {object} res - Express response object.
 * @param {Function} next - Express next middleware function.
 */
productsController.show = async (req, res, next) => {
  // Get the first product that's id equals the parameter id's value.
  const product = products
    .filter(product => product.id === Number(req.params.id))
    .shift()

  // If no product is found send a 404 (resource not found).
  if (!product) {
    const error = new Error('Not Found')
    error.statusCode = 404

    // IMPORTANT! Never throw an exception in an async action handler,
    // always call next!
    return next(error)
  }

  // Send response with the wanted product.
  const viewData = { product }
  res.render('products/show', { viewData })
}

// Exports.
module.exports = productsController
