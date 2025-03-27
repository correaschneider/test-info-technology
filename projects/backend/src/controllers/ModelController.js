class ModelController {
  constructor() {
    // Empty constructor, service will be injected from request
  }

  async create(req, res, next) {
    try {
      const model = await req.service.create(req.body);
      return res.status(201).json(model);
    } catch (error) {
      next(error);
    }
  }

  async findAll(req, res, next) {
    try {
      const models = await req.service.findAll();
      return res.json(models);
    } catch (error) {
      next(error);
    }
  }

  async findById(req, res, next) {
    try {
      const model = await req.service.findById(req.params.id);
      return res.json(model);
    } catch (error) {
      next(error);
    }
  }

  async update(req, res, next) {
    try {
      const model = await req.service.update(req.params.id, req.body);
      return res.json(model);
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

module.exports = ModelController;
