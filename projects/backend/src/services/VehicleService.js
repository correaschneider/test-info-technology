const AppError = require('../utils/AppError');

class VehicleService {
  constructor(vehicleRepository, modelRepository, brandRepository) {
    this.vehicleRepository = vehicleRepository;
    this.modelRepository = modelRepository;
    this.brandRepository = brandRepository;
  }

  async create(vehicleData) {
    const { modelId, brandId } = vehicleData;

    const model = await this.modelRepository.findById(modelId);
    if (!model) {
      throw new AppError('Model not found', 404);
    }

    const brand = await this.brandRepository.findById(brandId);
    if (!brand) {
      throw new AppError('Brand not found', 404);
    }

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

    const { modelId, brandId } = vehicleData;

    if (modelId) {
      const model = await this.modelRepository.findById(modelId);
      if (!model) {
        throw new AppError('Model not found', 404);
      }
    }

    if (brandId) {
      const brand = await this.brandRepository.findById(brandId);
      if (!brand) {
        throw new AppError('Brand not found', 404);
      }
    }

    return this.vehicleRepository.update(id, vehicleData);
  }

  async delete(id) {
    await this.findById(id);

    return this.vehicleRepository.delete(id);
  }
}

module.exports = VehicleService;
