class NotFoundError extends Error {
  constructor (message = 'Not Found') {
    super(message)

    this.statusCode = 404
  }
}

class InternalServerError extends Error {
  constructor (message = 'Internal Server Error') {
    super(message)

    this.statusCode = 500
  }
}

// Exports
module.exports = {
  NotFoundError,
  InternalServerError
}
