const AppError = require('../utils/AppError');

function validateVehicleCreate(req, _res, next) {
  const { plate, chassi, renavam, model, brand, year } = req.body;

  if (!plate) {
    throw new AppError('Plate is required', 400);
  }
  if (!chassi) {
    throw new AppError('Chassi is required', 400);
  }
  if (!renavam) {
    throw new AppError('Renavam is required', 400);
  }
  if (!model) {
    throw new AppError('Model is required', 400);
  }
  if (!brand) {
    throw new AppError('Brand is required', 400);
  }
  if (!year) {
    throw new AppError('Year is required', 400);
  }

  next();
}

module.exports = {
  validateVehicleCreate,
};
