const express = require('express');
const BrandService = require('../services/BrandService');
const BrandController = require('../controllers/BrandController');
const injectRepositories = require('../middlewares/repositoryInjection');
const { validateBrandCreate, validateBrandUpdate } = require('../middlewares/brandValidation');

const router = express.Router();

// Inject repositories middleware
router.use(injectRepositories);

// Create controller
const brandController = new BrandController();

// Routes
router.post('/', validateBrandCreate, (req, res, next) => {
  req.service = new BrandService(req.brandRepository);
  brandController.create(req, res, next);
});

router.get('/', (req, res, next) => {
  req.service = new BrandService(req.brandRepository);
  brandController.findAll(req, res, next);
});

router.get('/:id', (req, res, next) => {
  req.service = new BrandService(req.brandRepository);
  brandController.findById(req, res, next);
});

router.put('/:id', validateBrandUpdate, (req, res, next) => {
  req.service = new BrandService(req.brandRepository);
  brandController.update(req, res, next);
});

router.delete('/:id', (req, res, next) => {
  req.service = new BrandService(req.brandRepository);
  brandController.delete(req, res, next);
});

module.exports = router;
