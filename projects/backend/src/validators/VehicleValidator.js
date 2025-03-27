const AppError = require('../utils/AppError');

class VehicleValidator {
  static async validateVehicleExists(vehicle) {
    if (!vehicle) {
      throw new AppError('Vehicle not found', 404);
    }
    return vehicle;
  }
}

module.exports = VehicleValidator;
