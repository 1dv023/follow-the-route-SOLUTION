/**
 * The starting point of the application.
 *
 * @author Mats Loock
 * @version 1.0.0
 */

'use strict'

const bodyParser = require('body-parser')
const express = require('express')
const exphbs = require('express-handlebars')
const path = require('path')
const favicon = require('serve-favicon')
const {NotFoundError} = require('./helpers/custom-error')

const app = express()
const port = process.env.PORT || 8000

// Configure rendering engine, with change extension to .hbs.
app.engine('hbs', exphbs({
  extname: '.hbs',
  defaultLayout: 'main'
}))

// Setup view engine.
app.set('view engine', 'hbs')

// Serve static files.
app.use(express.static(path.join(__dirname, 'public')))

// Serve a favicon from the given path.
app.use(favicon(path.join(__dirname, 'public', 'img', 'favicon.ico')))

// Parse only urlencoded bodies.
app.use(bodyParser.urlencoded({ extended: true }))

// Define routes.
app.use('/product', require('./routes/productRoutes'))
app.use((req, res, next) => { // catch 404 (ALWAYS keep this as the last route)
  next(new NotFoundError())
})

// Error handler.
app.use((err, req, res, next) => {
  // 404 Not Found.
  if (err.status === 404) {
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
app.listen(port, () => {
  console.log(`\nServer started on http://localhost:${port}`)
  console.log('Press Ctrl-C to terminate...\n')
})
