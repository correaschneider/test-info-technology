const AppError = require('../utils/AppError');

class BrandValidator {
  static async validateBrandExists(brand) {
    if (!brand) {
      throw new AppError('Brand not found', 404);
    }
    return brand;
  }
}

module.exports = BrandValidator;
