/**
 * Module for the product controller.
 *
 * @author Mats Loock
 * @version 1.0.0
 */

'use strict'

const productController = {}

// "Faking" persistent products.
const products = [{ id: 1, name: 'Phone' }]

/**
 * Lists all products.
 *
 * @param {object} req - Express request object.
 * @param {object} res - Express response object.
 */
productController.index = async (req, res) => {
  const viewData = { products }
  res.render('product/index', { viewData })
}

/**
 * Renders a create form.
 *
 * @param {object} req - Express request object.
 * @param {object} res - Express response object.
 */
productController.create = async (req, res) => res.render('product/create')

/**
 * Creates a new product.
 *
 * @param {object} req - Express request object.
 * @param {object} res - Express response object.
 */
productController.createPost = async (req, res) => {
  // Make the product "persistent" and...
  products.push({
    id: products.length + 1,
    name: req.body.name
  })

  // ...redirect to the list of products.
  res.redirect('.')
}

/**
 * Gets the details of a product.
 *
 * @param {object} req - Express request object.
 * @param {object} res - Express response object.
 * @param {Function} next - Express next middleware function.
 */
productController.details = async (req, res, next) => {
  // Get the first product that's id equals the parameter id's value.
  const product = products.filter(product => product.id === Number(req.params.id)).shift()

  // If no product is found send a 404 (resource not found).
  if (!product) {
    const error = new Error('Not Found')
    error.statusCode = 404
    return next(error)
  }

  // Send response with the wanted product.
  const viewData = { product }
  res.render('product/details', { viewData })
}

// Exports.
module.exports = productController
