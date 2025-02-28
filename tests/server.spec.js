const request = require('supertest');
const app = require('../index');

describe('Operaciones CRUD de cafes', () => {
  describe('GET /cafes', () => {
    test('Debe devolver status 200 y un array con por lo menos 1 objeto', async () => {
      const response = await request(app).get('/cafes');

      expect(response.status).toBe(200);
      expect(Array.isArray(response.body)).toBe(true);
      expect(response.body.length).toBeGreaterThanOrEqual(1);
    });
  });

  describe('DELETE /cafes/:id', () => {
    test('Debe devolver status 404 al eliminar un ID no existente', async () => {
      const response = await request(app)
        .delete('/cafes/999') // ID inventado
        .set('Authorization', 'dummy-token'); // Dummy token

      expect(response.status).toBe(404);
    });
  });

  describe('POST /cafes', () => {
    test('Debe crear un nuevo café y devolver status 201', async () => {
      const nuevoCafe = { id: 5, nombre: 'TestCafe' }; // Nuevo café
      const response = await request(app)
        .post('/cafes')
        .send(nuevoCafe)
        .set('Authorization', 'dummy-token'); // Dummy token

      expect(response.status).toBe(201);
      expect(response.body.length).toBe(5); // Eran 4 cafes antes
    });
  });

  describe('PUT /cafes/:id', () => {
    test('Debe devolver 400 si los IDs no coinciden', async () => {
      const cafeActualizado = { id: 2, nombre: 'Capuccino' };
      const response = await request(app)
        .put('/cafes/1') // ID en los parámetros
        .send(cafeActualizado) // con el ID diferente
        .set('Authorization', 'dummy-token');

      expect(response.status).toBe(400);
      expect(response.body.message).toBe("El id del parámetro no coincide con el id del café recibido");
    });
  });
});