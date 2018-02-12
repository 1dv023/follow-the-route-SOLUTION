/**
 * Module for the product repository.
 *
 * @author Mats Loock
 * @version 1.0.0
 */

'use strict'

const Product = require('../models/product')

/**
 * "Fake" persistent storage of products.
 */
const products = [
  new Product('Phone')
]

/**
 * Represents a product repository.
 *
 * @class ProductRepositry
 */
class ProductRepositry {
  /**
   * Adds a product to the persistent storage.
   *
   * @param {Product} product
   */
  add (product) {
    products.push(product)
  }

  /**
   * Gets a product by the specified id.
   *
   * @param {number} id
   * @returns {Product}
   */
  getById (id) {
    // Get the first product that's id equals the parameter id's value.
    return products.filter(product => product.id === id).shift()
  }

  /**
   * Gets all products.
   *
   * @returns {Product[]}
   */
  getAll () {
    // Returns a shallow copy.
    return products.slice(0)
  }
}

module.exports = ProductRepositry
