/**
 * productController.
 *
 * @author Mats Loock
 * @version 1.1.0
 */

'use strict'

const productController = {}

// "Faking" persistent products.
const products = [{ id: 1, name: 'Phone' }]

/**
 * Lists all products.
 */
productController.index = async (req, res) => {
  const locals = { products }
  res.render('product/index', { locals })
}

/**
 * Renders a create form.
 */
productController.create = async (req, res) => res.render('product/create')

/**
 * Creates a new product.
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
 */
productController.details = async (req, res, next) => {
  // Get the first product that's id equals the parameter id's value.
  let product = products.filter(product => product.id === Number(req.params.id)).shift()

  // If no product is found send a 404 (resource not found).
  if (!product) {
    return next()
  }

  // Send response with the wanted product.
  const locals = { product }
  res.render('product/details', { locals })
}

// Exports.
module.exports = productController
