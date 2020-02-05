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
 * Lists all products.
 *
 * @param {object} req - Express request object.
 * @param {object} res - Express response object.
 * @param next
 */
productsController.index = async (req, res, next) => {
  const viewData = { products }
  return next(new Error('Hej hopp!'))
  res.render('products/index', { viewData })
}

/**
 * Renders a create form.
 *
 * @param {object} req - Express request object.
 * @param {object} res - Express response object.
 */
productsController.create = async (req, res) => {
  res.render('products/create')
}

/**
 * Creates a new product.
 *
 * @param {object} req - Express request object.
 * @param {object} res - Express response object.
 */
productsController.createPost = async (req, res) => {
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
productsController.details = async (req, res, next) => {
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
  res.render('products/details', { viewData })
}

// Exports.
module.exports = productsController
