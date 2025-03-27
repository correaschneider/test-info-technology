const AppError = require('../utils/AppError');

function validateVehicleCreate(req, _res, next) {
  const { plate, chassi, renavam, modelId, brandId, year } = req.body;

  if (!plate) {
    throw new AppError('Plate is required', 400);
  }
  if (!chassi) {
    throw new AppError('Chassi is required', 400);
  }
  if (!renavam) {
    throw new AppError('Renavam is required', 400);
  }
  if (!modelId) {
    throw new AppError('Model ID is required', 400);
  }
  if (!brandId) {
    throw new AppError('Brand ID is required', 400);
  }
  if (!year) {
    throw new AppError('Year is required', 400);
  }

  next();
}

async function validateModelExists(req, _res, next) {
  const { modelRepository } = req;
  const modelId = req.body.modelId || req.params.modelId;

  if (modelId) {
    const modelExists = await modelRepository.findById(modelId);
    if (!modelExists) {
      throw new AppError('Model not found', 404);
    }
  }

  next();
}

async function validateBrandExists(req, _res, next) {
  const { brandRepository } = req;
  const brandId = req.body.brandId || req.params.brandId;

  if (brandId) {
    const brandExists = await brandRepository.findById(brandId);
    if (!brandExists) {
      throw new AppError('Brand not found', 404);
    }
  }

  next();
}

module.exports = {
  validateVehicleCreate,
  validateModelExists,
  validateBrandExists,
};
