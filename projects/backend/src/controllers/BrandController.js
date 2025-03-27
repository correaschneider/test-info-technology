class BrandController {
  constructor() {
    // Empty constructor, service will be injected from request
  }

  async create(req, res, next) {
    try {
      const brand = await req.service.create(req.body);
      return res.status(201).json(brand);
    } catch (error) {
      next(error);
    }
  }

  async findAll(req, res, next) {
    try {
      const brands = await req.service.findAll();
      return res.json(brands);
    } catch (error) {
      next(error);
    }
  }

  async findById(req, res, next) {
    try {
      const brand = await req.service.findById(req.params.id);
      return res.json(brand);
    } catch (error) {
      next(error);
    }
  }

  async update(req, res, next) {
    try {
      const brand = await req.service.update(req.params.id, req.body);
      return res.json(brand);
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

module.exports = BrandController;
