const request = require('supertest');
const mongoose = require('mongoose');
const { server } = require('../index');

describe('Test the root path', () => {
  test('It should response the GET method', async (done) => {
    const response = await request(server).get('/user/test');
    expect(response.statusCode).toBe(200);
    done();
  });
  
  afterAll(async done => {
    await mongoose.disconnect();
    await server.close();
    done();
  });
});