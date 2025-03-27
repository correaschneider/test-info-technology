const PrismaModelRepository = require('../repositories/PrismaModelRepository');
const PrismaBrandRepository = require('../repositories/PrismaBrandRepository');
const PrismaVehicleRepository = require('../repositories/PrismaVehicleRepository');

function injectRepositories(req, _res, next) {
  req.modelRepository = new PrismaModelRepository();
  req.brandRepository = new PrismaBrandRepository();
  req.vehicleRepository = new PrismaVehicleRepository();
  next();
}

module.exports = injectRepositories;
