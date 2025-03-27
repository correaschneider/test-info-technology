const AppError = require('../utils/AppError');

function validateModelCreate(req, _res, next) {
  const { name } = req.body;

  if (!name) {
    throw new AppError('Name is required', 400);
  }

  next();
}

function validateModelUpdate(req, _res, next) {
  const { name } = req.body;

  if (!name) {
    throw new AppError('Name is required', 400);
  }

  next();
}

module.exports = {
  validateModelCreate,
  validateModelUpdate,
};
