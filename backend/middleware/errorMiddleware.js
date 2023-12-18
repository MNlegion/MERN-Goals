const errorHandler = (err, req, res, next) => {
  // Purpose: To handle errors
  // Notes: This middleware will handle errors from the routes
  // Notes: This middleware will be used in the server.js file
  // Notes: This middleware will be used after the routes
  const statusCode = res.statusCode ? res.statusCode : 500;

  res.status(statusCode)

  res.json({
    message: err.message,
    stack: process.env.NODE_ENV === 'production' ? null : err.stack
  })
}

module.exports = {
    errorHandler
}