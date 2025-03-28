const { expect } = require('chai');
const request = require('supertest');
const app = require('../index');

describe('Vehicle Routes', () => {
  let createdVehicleId;

  const validVehicleData = {
    plate: 'ABC1234',
    chassi: '9BWHE21JX24060831',
    renavam: '76981392504',
    model: 'Model 1',
    brand: 'Brand 1',
    year: 2023,
  };

  describe('POST /api/vehicles', () => {
    describe('Validation Rules', () => {
      it('should create a vehicle when all fields are valid', async () => {
        const response = await request(app)
          .post('/api/vehicles')
          .send(validVehicleData)
          .expect(201);

        expect(response.body).to.have.property('id');
        expect(response.body).to.deep.include(validVehicleData);
        createdVehicleId = response.body.id;
      });

      it('should return 400 when required fields are missing', async () => {
        const response = await request(app).post('/api/vehicles').send({}).expect(400);
        expect(response.body.error).to.equal('Placa é obrigatória');
      });

      it('should return 400 when plate is invalid', async () => {
        const response = await request(app)
          .post('/api/vehicles')
          .send({ ...validVehicleData, plate: 'invalid-plate' })
          .expect(400);

        expect(response.body.error).to.equal(
          'Formato de placa inválido. Deve seguir o padrão AAA9999 ou AAA9A99'
        );
      });

      it('should return 400 when chassi is invalid', async () => {
        const response = await request(app)
          .post('/api/vehicles')
          .send({ ...validVehicleData, chassi: 'invalid-chassi' })
          .expect(400);

        expect(response.body.error).to.equal(
          'Formato de chassi inválido. Deve seguir o padrão 9AAAA99AA99999999'
        );
      });

      it('should return 400 when renavam is invalid', async () => {
        const response = await request(app)
          .post('/api/vehicles')
          .send({ ...validVehicleData, renavam: 'inv-renavam' })
          .expect(400);

        expect(response.body.error).to.equal('Renavam inválido');
      });
    });
  });

  describe('GET /api/vehicles', () => {
    it('should return all vehicles', async () => {
      const response = await request(app).get('/api/vehicles').expect(200);

      expect(response.body).to.be.an('array');
      expect(response.body.length).to.be.greaterThan(0);
    });
  });

  describe('GET /api/vehicles/:id', () => {
    it('should return vehicle by id when it exists', async () => {
      const response = await request(app).get(`/api/vehicles/${createdVehicleId}`).expect(200);

      expect(response.body).to.deep.include(validVehicleData);
    });

    it('should return 404 when vehicle does not exist', async () => {
      const response = await request(app).get('/api/vehicles/non-existent-id').expect(404);

      expect(response.body.error).to.equal('Veículo não encontrado');
    });
  });

  describe('PUT /api/vehicles/:id', () => {
    it('should update vehicle when all fields are valid', async () => {
      const updateData = {
        ...validVehicleData,
        plate: 'XYZ9876',
        renavam: '96088664079',
      };

      const response = await request(app)
        .put(`/api/vehicles/${createdVehicleId}`)
        .send(updateData)
        .expect(200);

      expect(response.body).to.deep.include(updateData);
    });

    it('should return 404 when updating non-existent vehicle', async () => {
      const response = await request(app)
        .put('/api/vehicles/non-existent-id')
        .send({ plate: 'XYZ9876' })
        .expect(404);

      expect(response.body.error).to.equal('Veículo não encontrado');
    });

    // chassi
    it('should reject invalid chassi update with non-numeric characters', async () => {
      const response = await request(app)
        .put(`/api/vehicles/${createdVehicleId}`)
        .send({ chassi: '1234567890A' })
        .expect(400);

      expect(response.body.error).to.equal(
        'Formato de chassi inválido. Deve seguir o padrão 9AAAA99AA99999999'
      );
    });

    it('should reject invalid RENAVAM update with non-numeric characters', async () => {
      const response = await request(app)
        .put(`/api/vehicles/${createdVehicleId}`)
        .send({ renavam: '1234567890A' })
        .expect(400);

      expect(response.body.error).to.equal('Renavam inválido');
    });

    it('should reject invalid RENAVAM update with wrong length', async () => {
      const response = await request(app)
        .put(`/api/vehicles/${createdVehicleId}`)
        .send({ renavam: '1234567890' })
        .expect(400);

      expect(response.body.error).to.equal('Renavam deve conter 11 dígitos');
    });
  });

  describe('DELETE /api/vehicles/:id', () => {
    it('should delete existing vehicle', async () => {
      await request(app).delete(`/api/vehicles/${createdVehicleId}`).expect(204);
      const response = await request(app).get(`/api/vehicles/${createdVehicleId}`).expect(404);
      expect(response.body.error).to.equal('Veículo não encontrado');
    });

    it('should return 404 when deleting non-existent vehicle', async () => {
      const response = await request(app).delete('/api/vehicles/non-existent-id').expect(404);
      expect(response.body.error).to.equal('Veículo não encontrado');
    });
  });
});
