const AppError = require('../utils/AppError');

class ModelService {
  constructor(modelRepository) {
    this.modelRepository = modelRepository;
  }

  async create(modelData) {
    return this.modelRepository.create(modelData);
  }

  async findAll() {
    return this.modelRepository.findAll();
  }

  async findById(id) {
    const data = await this.modelRepository.findById(id);
    if (!data) {
      throw new AppError('Model not found', 404);
    }

    return data;
  }

  async update(id, modelData) {
    await this.findById(id);

    return this.modelRepository.update(id, modelData);
  }

  async delete(id) {
    await this.findById(id);

    return this.modelRepository.delete(id);
  }
}

module.exports = ModelService;
