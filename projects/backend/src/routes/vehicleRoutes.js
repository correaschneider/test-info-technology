const express = require('express');
const VehicleService = require('../services/VehicleService');
const VehicleController = require('../controllers/VehicleController');
const injectRepositories = require('../middlewares/repositoryInjection');
const {
  validateVehicleCreate,
  validateVehicleUpdate,
} = require('../middlewares/vehicleValidation');

const router = express.Router();

// Inject repositories middleware
router.use(injectRepositories);

// Create controller
const vehicleController = new VehicleController();

// Routes
router.post('/', validateVehicleCreate, (req, res, next) => {
  req.service = new VehicleService(req.vehicleRepository);
  vehicleController.create(req, res, next);
});

router.get('/', (req, res, next) => {
  req.service = new VehicleService(req.vehicleRepository);
  vehicleController.findAll(req, res, next);
});

router.get('/:id', (req, res, next) => {
  req.service = new VehicleService(req.vehicleRepository);
  vehicleController.findById(req, res, next);
});

router.put('/:id', validateVehicleUpdate, (req, res, next) => {
  req.service = new VehicleService(req.vehicleRepository);
  vehicleController.update(req, res, next);
});

router.delete('/:id', (req, res, next) => {
  req.service = new VehicleService(req.vehicleRepository);
  vehicleController.delete(req, res, next);
});

module.exports = router;
