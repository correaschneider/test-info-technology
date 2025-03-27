const { PrismaClient } = require('@prisma/client');
const IVehicleRepository = require('../interfaces/IVehicleRepository');

class PrismaVehicleRepository extends IVehicleRepository {
  constructor() {
    super();
    this.prisma = new PrismaClient();
  }

  async create(data) {
    return await this.prisma.vehicle.create({
      data,
    });
  }

  async findAll() {
    return await this.prisma.vehicle.findMany();
  }

  async findById(id) {
    return await this.prisma.vehicle.findUnique({
      where: { id },
    });
  }

  async update(id, data) {
    const existingVehicle = await this.findById(id);
    if (!existingVehicle) {
      return null;
    }

    return await this.prisma.vehicle.update({
      where: { id },
      data,
    });
  }

  async delete(id) {
    const existingVehicle = await this.findById(id);
    if (!existingVehicle) {
      return null;
    }

    return await this.prisma.vehicle.delete({
      where: { id },
    });
  }
}

module.exports = PrismaVehicleRepository;
