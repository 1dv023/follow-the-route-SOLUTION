/**
 * Module for the product routes.
 *
 * @author Mats Loock
 * @version 1.0.0
 */

'use strict'

const router = require('express').Router()

// "Faking" persistent products.
const products = [{id: 1, name: 'Phone'}]

// /
router.get('/', (req, res) => res.render('product/index', {products}))

// /create
router.route('/create')
  .get((req, res) => res.render('product/create'))
  .post((req, res) => {
    // Make the product "persistent" and...
    products.push({
      id: products.length + 1,
      name: req.body.name
    })

    // ...redirect to the list of products (product/).
    res.redirect('.')
  })

// /product/:id
router.get('/:id', (req, res, next) => {
  // Get the first product that's id equals the parameter id's value.
  let product = products.filter(product => product.id === Number(req.params.id)).shift()

  // If no product is found send a 404 (resource not found).
  if (!product) {
    return next()
  }

  // Send response with the wanted product.
  res.render('product/details', {product})
})

// Exports.
module.exports = router
