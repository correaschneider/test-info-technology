const AppError = require('../utils/AppError');

class ModelValidator {
  static async validateModelExists(model) {
    if (!model) {
      throw new AppError('Model not found', 404);
    }
    return model;
  }
}

module.exports = ModelValidator;
