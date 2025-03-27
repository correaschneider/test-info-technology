const { PrismaClient } = require('@prisma/client');
const IBrandRepository = require('../interfaces/IBrandRepository');

class PrismaBrandRepository extends IBrandRepository {
  constructor() {
    super();
    this.prisma = new PrismaClient();
  }

  async create(data) {
    return await this.prisma.brand.create({
      data,
    });
  }

  async findAll() {
    return await this.prisma.brand.findMany();
  }

  async findById(id) {
    return await this.prisma.brand.findUnique({
      where: { id },
    });
  }

  async update(id, data) {
    const existingBrand = await this.findById(id);
    if (!existingBrand) {
      return null;
    }

    return await this.prisma.brand.update({
      where: { id },
      data,
    });
  }

  async delete(id) {
    const existingBrand = await this.findById(id);
    if (!existingBrand) {
      return null;
    }

    return await this.prisma.brand.delete({
      where: { id },
    });
  }
}

module.exports = PrismaBrandRepository;
