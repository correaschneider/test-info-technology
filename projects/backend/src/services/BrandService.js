const AppError = require('../utils/AppError');

class BrandService {
  constructor(brandRepository) {
    this.brandRepository = brandRepository;
  }

  async create(brandData) {
    return this.brandRepository.create(brandData);
  }

  async findAll() {
    return this.brandRepository.findAll();
  }

  async findById(id) {
    const brand = await this.brandRepository.findById(id);
    if (!brand) {
      throw new AppError('Brand not found', 404);
    }

    return brand;
  }

  async update(id, brandData) {
    await this.findById(id);

    return this.brandRepository.update(id, brandData);
  }

  async delete(id) {
    await this.findById(id);

    return this.brandRepository.delete(id);
  }
}

module.exports = BrandService;
