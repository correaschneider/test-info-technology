const AppError = require('../utils/AppError');

class VehicleService {
  constructor(vehicleRepository) {
    this.vehicleRepository = vehicleRepository;
  }

  async create(vehicleData) {
    return this.vehicleRepository.create(vehicleData);
  }

  async findAll() {
    return this.vehicleRepository.findAll();
  }

  async findById(id) {
    const data = await this.vehicleRepository.findById(id);
    if (!data) {
      throw new AppError('Vehicle not found', 404);
    }

    return data;
  }

  async update(id, vehicleData) {
    await this.findById(id);

    return this.vehicleRepository.update(id, vehicleData);
  }

  async delete(id) {
    await this.findById(id);

    return this.vehicleRepository.delete(id);
  }
}

module.exports = VehicleService;
