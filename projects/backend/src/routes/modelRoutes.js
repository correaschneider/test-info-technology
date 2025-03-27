const express = require('express');
const ModelService = require('../services/ModelService');
const ModelController = require('../controllers/ModelController');
const injectRepositories = require('../middlewares/repositoryInjection');
const { validateModelCreate, validateModelUpdate } = require('../middlewares/modelValidation');

const router = express.Router();

// Inject repositories middleware
router.use(injectRepositories);

// Create controller
const modelController = new ModelController();

// Routes
router.post('/', validateModelCreate, (req, res, next) => {
  req.service = new ModelService(req.modelRepository);
  modelController.create(req, res, next);
});

router.get('/', (req, res, next) => {
  req.service = new ModelService(req.modelRepository);
  modelController.findAll(req, res, next);
});

router.get('/:id', (req, res, next) => {
  req.service = new ModelService(req.modelRepository);
  modelController.findById(req, res, next);
});

router.put('/:id', validateModelUpdate, (req, res, next) => {
  req.service = new ModelService(req.modelRepository);
  modelController.update(req, res, next);
});

router.delete('/:id', (req, res, next) => {
  req.service = new ModelService(req.modelRepository);
  modelController.delete(req, res, next);
});

module.exports = router;
