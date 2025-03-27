const { expect } = require('chai');
const request = require('supertest');
const app = require('../index');

describe('Model Routes', () => {
  let createdModelId;

  describe('POST /api/models', () => {
    it('should create a new model', async () => {
      const modelData = {
        name: 'Test Model',
      };

      const response = await request(app).post('/api/models').send(modelData).expect(201);

      expect(response.body).to.have.property('id');
      expect(response.body.name).to.equal(modelData.name);
      createdModelId = response.body.id;
    });

    it('should return 400 when name is missing', async () => {
      const modelData = {};

      const response = await request(app).post('/api/models').send(modelData).expect(400);

      expect(response.body.error).to.equal('Name is required');
    });
  });

  describe('GET /api/models', () => {
    it('should get all models', async () => {
      const response = await request(app).get('/api/models').expect(200);

      expect(response.body).to.be.an('array');
      expect(response.body.length).to.be.greaterThan(0);
    });
  });

  describe('GET /api/models/:id', () => {
    it('should get a model by id', async () => {
      const response = await request(app).get(`/api/models/${createdModelId}`).expect(200);

      expect(response.body).to.have.property('id', createdModelId);
      expect(response.body).to.have.property('name', 'Test Model');
    });

    it('should return 404 for non-existent model', async () => {
      const nonExistentId = 'non-existent-id';
      const response = await request(app).get(`/api/models/${nonExistentId}`).expect(404);

      expect(response.body.error).to.equal('Model not found');
    });
  });

  describe('PUT /api/models/:id', () => {
    it('should update a model', async () => {
      const updateData = {
        name: 'Updated Model',
      };

      const response = await request(app)
        .put(`/api/models/${createdModelId}`)
        .send(updateData)
        .expect(200);

      expect(response.body.name).to.equal(updateData.name);
    });

    it('should return 400 when name is missing', async () => {
      const updateData = {};

      const response = await request(app)
        .put(`/api/models/${createdModelId}`)
        .send(updateData)
        .expect(400);

      expect(response.body.error).to.equal('Name is required');
    });

    it('should return 404 for non-existent model', async () => {
      const nonExistentId = 'non-existent-id';
      const updateData = {
        name: 'Updated Model',
      };

      const response = await request(app)
        .put(`/api/models/${nonExistentId}`)
        .send(updateData)
        .expect(404);

      expect(response.body.error).to.equal('Model not found');
    });
  });

  describe('DELETE /api/models/:id', () => {
    it('should delete a model', async () => {
      await request(app).delete(`/api/models/${createdModelId}`).expect(204);

      // Verify the model was deleted
      const response = await request(app).get(`/api/models/${createdModelId}`).expect(404);

      expect(response.body.error).to.equal('Model not found');
    });

    it('should return 404 for non-existent model', async () => {
      const nonExistentId = 'non-existent-id';
      const response = await request(app).delete(`/api/models/${nonExistentId}`).expect(404);

      expect(response.body.error).to.equal('Model not found');
    });
  });
});
