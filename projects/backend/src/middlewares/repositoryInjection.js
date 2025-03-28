const PrismaVehicleRepository = require('../repositories/PrismaVehicleRepository');

function injectRepositories(req, _res, next) {
  req.vehicleRepository = new PrismaVehicleRepository();
  next();
}

module.exports = injectRepositories;
