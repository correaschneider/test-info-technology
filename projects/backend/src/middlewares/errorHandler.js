const AppError = require('../utils/AppError');

async function errorHandler(err, req, res, _next) {
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      error: err.message,
    });
  }

  console.error(err);
  return res.status(500).json({
    error: 'Internal server error',
  });
}

module.exports = errorHandler;
