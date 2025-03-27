const AppError = require('../utils/AppError');

function validateBrandCreate(req, _res, next) {
  const { name } = req.body;

  if (!name) {
    throw new AppError('Name is required', 400);
  }

  next();
}

function validateBrandUpdate(req, _res, next) {
  const { name } = req.body;

  if (!name) {
    throw new AppError('Name is required', 400);
  }

  next();
}

module.exports = {
  validateBrandCreate,
  validateBrandUpdate,
};
