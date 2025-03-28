const { expect } = require('chai');
const request = require('supertest');
const app = require('../index');

describe('Vehicle Routes', () => {
  let createdVehicleId;

  describe('POST /api/vehicles', () => {
    it('should create a new vehicle', async () => {
      const vehicleData = {
        plate: 'ABC1234',
        chassi: '12345678901234567',
        renavam: '12345678901',
        model: 'Model 1',
        brand: 'Brand 1',
        year: 2023,
      };

      const response = await request(app).post('/api/vehicles').send(vehicleData).expect(201);

      expect(response.body).to.have.property('id');
      expect(response.body.plate).to.equal(vehicleData.plate);
      expect(response.body.chassi).to.equal(vehicleData.chassi);
      expect(response.body.renavam).to.equal(vehicleData.renavam);
      expect(response.body.year).to.equal(vehicleData.year);
      expect(response.body.model).to.equal(vehicleData.model);
      expect(response.body.brand).to.equal(vehicleData.brand);

      createdVehicleId = response.body.id;
    });

    it('should return 400 when required fields are missing', async () => {
      const vehicleData = {
        // Missing required fields
      };

      const response = await request(app).post('/api/vehicles').send(vehicleData).expect(400);

      expect(response.body.error).to.equal('Plate is required');
    });
  });

  describe('GET /api/vehicles', () => {
    it('should get all vehicles', async () => {
      const response = await request(app).get('/api/vehicles').expect(200);

      expect(response.body).to.be.an('array');
      expect(response.body.length).to.be.greaterThan(0);
    });
  });

  describe('GET /api/vehicles/:id', () => {
    it('should get a vehicle by id', async () => {
      const response = await request(app).get(`/api/vehicles/${createdVehicleId}`).expect(200);

      expect(response.body).to.have.property('id', createdVehicleId);
      expect(response.body).to.have.property('plate', 'ABC1234');
      expect(response.body).to.have.property('chassi', '12345678901234567');
      expect(response.body).to.have.property('renavam', '12345678901');
      expect(response.body).to.have.property('year', 2023);
      expect(response.body).to.have.property('model', 'Model 1');
      expect(response.body).to.have.property('brand', 'Brand 1');
    });

    it('should return 404 for non-existent vehicle', async () => {
      const nonExistentId = 'non-existent-id';
      const response = await request(app).get(`/api/vehicles/${nonExistentId}`).expect(404);

      expect(response.body.error).to.equal('Vehicle not found');
    });
  });

  describe('PUT /api/vehicles/:id', () => {
    it('should update a vehicle', async () => {
      const updateData = {
        plate: 'XYZ9876',
        year: 2022,
        model: 'Model 2',
        brand: 'Brand 2',
      };

      const response = await request(app)
        .put(`/api/vehicles/${createdVehicleId}`)
        .send(updateData)
        .expect(200);

      expect(response.body.plate).to.equal(updateData.plate);
      expect(response.body.year).to.equal(updateData.year);
      expect(response.body.model).to.equal(updateData.model);
      expect(response.body.brand).to.equal(updateData.brand);
    });

    it('should return 404 for non-existent vehicle', async () => {
      const nonExistentId = 'non-existent-id';
      const updateData = {
        plate: 'XYZ9876',
      };

      const response = await request(app)
        .put(`/api/vehicles/${nonExistentId}`)
        .send(updateData)
        .expect(404);

      expect(response.body.error).to.equal('Vehicle not found');
    });
  });

  describe('DELETE /api/vehicles/:id', () => {
    it('should delete a vehicle', async () => {
      await request(app).delete(`/api/vehicles/${createdVehicleId}`).expect(204);

      const response = await request(app).get(`/api/vehicles/${createdVehicleId}`).expect(404);

      expect(response.body.error).to.equal('Vehicle not found');
    });

    it('should return 404 for non-existent vehicle', async () => {
      const nonExistentId = 'non-existent-id';
      const response = await request(app).delete(`/api/vehicles/${nonExistentId}`).expect(404);

      expect(response.body.error).to.equal('Vehicle not found');
    });
  });
});
