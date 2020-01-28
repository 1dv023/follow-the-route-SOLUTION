/**
 * The starting point of the application.
 *
 * @author Mats Loock
 * @version 1.0.0
 */

'use strict'

const createError = require('http-errors')
const express = require('express')
const hbs = require('express-hbs')
const { resolve } = require('path')

const app = express()

// Setup view engine.
app.engine('hbs', hbs.express4({
  defaultLayout: resolve('views', 'layouts', 'default'),
  partialsDir: resolve('views', 'partials')
}))
app.set('view engine', 'hbs')
app.set('views', resolve('views'))

// Serve static files.
app.use(express.static(resolve('public')))

// Parse only urlencoded bodies.
app.use(express.urlencoded({ extended: true }))

// Define routes.
// catch 404 (ALWAYS keep this as the last route)
app.use('/product', require('./routes/productRouter'))
app.use('*', (req, res, next) => next(createError(404)))

// Error handler.
app.use((err, req, res, next) => {
  // 404 Not Found.
  if (err.statusCode === 404) {
    return res.status(404).sendFile(resolve('views', 'error', '404.html'))
  }

  // 500 Internal Server Error (in production, all other errors send this response).
  if (req.app.get('env') !== 'development') {
    return res.status(500).sendFile(resolve('views', 'error', '500.html'))
  }

  // Development only!
  // Set locals, only providing error in development.
  res.locals.error = err

  // Render the error page.
  res.status(err.status || 500).render('error/error')
})

// Start listening.
app.listen(8000, () => {
  console.log('Server started on http://localhost:8000')
  console.log('Press Ctrl-C to terminate...')
})
