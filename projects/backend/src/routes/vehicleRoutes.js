const express = require('express');
const VehicleService = require('../services/VehicleService');
const VehicleController = require('../controllers/VehicleController');
const injectRepositories = require('../middlewares/repositoryInjection');
const { validateVehicleCreate } = require('../middlewares/vehicleValidation');

const router = express.Router();

// Inject repositories middleware
router.use(injectRepositories);

// Create controller
const vehicleController = new VehicleController();

// Routes
router.post('/', validateVehicleCreate, (req, res, next) => {
  req.service = new VehicleService(req.vehicleRepository, req.modelRepository, req.brandRepository);
  vehicleController.create(req, res, next);
});

router.get('/', (req, res, next) => {
  req.service = new VehicleService(req.vehicleRepository, req.modelRepository, req.brandRepository);
  vehicleController.findAll(req, res, next);
});

router.get('/:id', (req, res, next) => {
  req.service = new VehicleService(req.vehicleRepository, req.modelRepository, req.brandRepository);
  vehicleController.findById(req, res, next);
});

router.put('/:id', (req, res, next) => {
  req.service = new VehicleService(req.vehicleRepository, req.modelRepository, req.brandRepository);
  vehicleController.update(req, res, next);
});

router.delete('/:id', (req, res, next) => {
  req.service = new VehicleService(req.vehicleRepository, req.modelRepository, req.brandRepository);
  vehicleController.delete(req, res, next);
});

module.exports = router;
