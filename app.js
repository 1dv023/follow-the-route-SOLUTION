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

const app = express()
const port = process.env.PORT || 8000

// Setup view engine.
app.engine('handlebars', exphbs({defaultLayout: 'main'}))
app.set('view engine', 'handlebars')

// Serve static files.
app.use(express.static(path.join(__dirname, 'public')))

// Parse only urlencoded bodies.
app.use(bodyParser.urlencoded({ extended: true }))

// Define routes.
app.use('/product', require('./routes/productRoutes'))
app.use((req, res, next) => { // catch 404 (ALWAYS keep this as the last route)
  const error = new Error('Not Found')
  error.status = 404
  next(error)
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
  console.log(`Server started on http://localhost:${port}`)
  console.log('Press Ctrl-C to terminate...')
})
