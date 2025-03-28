const { convertBigIntToString } = require('../utils/vehicleTransform');
class VehicleController {
  constructor() {
    // Empty constructor, service will be injected from request
  }

  async create(req, res, next) {
    try {
      const vehicle = await req.service.create(req.body);
      return res.status(201).json(convertBigIntToString(vehicle));
    } catch (error) {
      next(error);
    }
  }

  async findAll(req, res, next) {
    try {
      const vehicles = await req.service.findAll();
      return res.json(convertBigIntToString(vehicles));
    } catch (error) {
      next(error);
    }
  }

  async findById(req, res, next) {
    try {
      const vehicle = await req.service.findById(req.params.id);
      return res.json(convertBigIntToString(vehicle));
    } catch (error) {
      next(error);
    }
  }

  async update(req, res, next) {
    try {
      const vehicle = await req.service.update(req.params.id, req.body);
      return res.json(convertBigIntToString(vehicle));
    } catch (error) {
      next(error);
    }
  }

  async delete(req, res, next) {
    try {
      await req.service.delete(req.params.id);
      return res.status(204).send();
    } catch (error) {
      next(error);
    }
  }
}

module.exports = VehicleController;
