const { expect } = require('chai');
const request = require('supertest');
const app = require('../index');

describe('Brand Routes', () => {
  let createdBrandId;

  describe('POST /api/brands', () => {
    it('should create a new brand', async () => {
      const brandData = {
        name: 'Test Brand',
      };

      const response = await request(app).post('/api/brands').send(brandData).expect(201);

      expect(response.body).to.have.property('id');
      expect(response.body.name).to.equal(brandData.name);
      createdBrandId = response.body.id;
    });

    it('should return 400 when name is missing', async () => {
      const brandData = {};

      const response = await request(app).post('/api/brands').send(brandData).expect(400);

      expect(response.body.error).to.equal('Name is required');
    });
  });

  describe('GET /api/brands', () => {
    it('should get all brands', async () => {
      const response = await request(app).get('/api/brands').expect(200);

      expect(response.body).to.be.an('array');
      expect(response.body.length).to.be.greaterThan(0);
    });
  });

  describe('GET /api/brands/:id', () => {
    it('should get a brand by id', async () => {
      const response = await request(app).get(`/api/brands/${createdBrandId}`).expect(200);

      expect(response.body).to.have.property('id', createdBrandId);
      expect(response.body).to.have.property('name', 'Test Brand');
    });

    it('should return 404 for non-existent brand', async () => {
      const nonExistentId = 'non-existent-id';
      const response = await request(app).get(`/api/brands/${nonExistentId}`).expect(404);

      expect(response.body.error).to.equal('Brand not found');
    });
  });

  describe('PUT /api/brands/:id', () => {
    it('should update a brand', async () => {
      const updateData = {
        name: 'Updated Brand',
      };

      const response = await request(app)
        .put(`/api/brands/${createdBrandId}`)
        .send(updateData)
        .expect(200);

      expect(response.body.name).to.equal(updateData.name);
    });

    it('should return 400 when name is missing', async () => {
      const updateData = {};

      const response = await request(app)
        .put(`/api/brands/${createdBrandId}`)
        .send(updateData)
        .expect(400);

      expect(response.body.error).to.equal('Name is required');
    });

    it('should return 404 for non-existent brand', async () => {
      const nonExistentId = 'non-existent-id';
      const updateData = {
        name: 'Updated Brand',
      };

      const response = await request(app)
        .put(`/api/brands/${nonExistentId}`)
        .send(updateData)
        .expect(404);

      expect(response.body.error).to.equal('Brand not found');
    });
  });

  describe('DELETE /api/brands/:id', () => {
    it('should delete a brand', async () => {
      await request(app).delete(`/api/brands/${createdBrandId}`).expect(204);

      // Verify the brand was deleted
      const response = await request(app).get(`/api/brands/${createdBrandId}`).expect(404);

      expect(response.body.error).to.equal('Brand not found');
    });

    it('should return 404 for non-existent brand', async () => {
      const nonExistentId = 'non-existent-id';
      const response = await request(app).delete(`/api/brands/${nonExistentId}`).expect(404);

      expect(response.body.error).to.equal('Brand not found');
    });
  });
});
