/**
 * Module for the product model.
 *
 * @author Mats Loock
 * @version 1.0.0
 */

'use strict'

/**
 * Represents a product.
 *
 * @class Product
 */
class Product {
  /**
   * Creates an instance of Product.
   *
   * @param {string} name
   */
  constructor (name) {
    Product._numInstances = (Product._numInstances || 0) + 1

    this.id = Product._numInstances
    this.name = name
  }
}

// Exports.
module.exports = Product
