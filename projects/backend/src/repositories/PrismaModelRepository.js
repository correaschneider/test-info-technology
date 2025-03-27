const { PrismaClient } = require('@prisma/client');
const IModelRepository = require('../interfaces/IModelRepository');

class PrismaModelRepository extends IModelRepository {
  constructor() {
    super();
    this.prisma = new PrismaClient();
  }

  async create(data) {
    return await this.prisma.model.create({
      data,
    });
  }

  async findAll() {
    return await this.prisma.model.findMany();
  }

  async findById(id) {
    return await this.prisma.model.findUnique({
      where: { id },
    });
  }

  async update(id, data) {
    const existingModel = await this.findById(id);
    if (!existingModel) {
      return null;
    }

    return await this.prisma.model.update({
      where: { id },
      data,
    });
  }

  async delete(id) {
    const existingModel = await this.findById(id);
    if (!existingModel) {
      return null;
    }

    return await this.prisma.model.delete({
      where: { id },
    });
  }
}

module.exports = PrismaModelRepository;
