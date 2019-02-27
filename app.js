/**
 * The starting point of the application.
 *
 * @author Mats Loock
 * @version 1.1.0
 */

'use strict'

const createError = require('http-errors')
const express = require('express')
const hbs = require('express-hbs')
const path = require('path')

const app = express()

// Setup view engine.
app.engine('hbs', hbs.express4({
  defaultLayout: path.join(__dirname, 'views', 'layouts', 'default'),
  partialsDir: path.join(__dirname, 'views', 'partials')
}))
app.set('view engine', 'hbs')
app.set('views', path.join(__dirname, 'views'))

// Serve static files.
app.use(express.static(path.join(__dirname, 'public')))

// Parse only urlencoded bodies.
app.use(express.urlencoded({ extended: true }))

// Define routes.
app.use('/product', require('./routes/productRouter'))
app.use('*', (req, res, next) => next(createError(404))) // catch 404 (ALWAYS keep this as the last route)

// Error handler.
app.use((err, req, res, next) => {
  // 403 Forbidden.
  if (err.statusCode === 403) {
    return res.status(403).sendFile(path.join(__dirname, 'views', 'error', '403.html'))
  }

  // 404 Not Found.
  if (err.statusCode === 404) {
    return res.status(404).sendFile(path.join(__dirname, 'views', 'error', '404.html'))
  }

  // 500 Internal Server Error (in production, all other errors send this response).
  if (req.app.get('env') !== 'development') {
    return res.status(500).sendFile(path.join(__dirname, 'views', 'error', '500.html'))
  }

  // Development only!
  // Set locals, only providing error in development.
  res.locals.error = err

  // Render the error page.
  res.status(err.status || 500).render('error/error')
})

// Start listening.
app.listen(3000, () => {
  console.log('Server started on http://localhost:3000')
  console.log('Press Ctrl-C to terminate...')
})
