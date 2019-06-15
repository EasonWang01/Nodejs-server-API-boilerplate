const { server } = require('../index');
const request = require('supertest')(server);
const mongoose = require('mongoose');

describe('Test the root path', () => {
  test('It should response the GET method', async (done) => {
    const response = await request.get('/user/test');
    expect(response.statusCode).toBe(200);
    done();
  });
  
  afterAll(async done => {
    await server.close();
    await mongoose.disconnect();
    done();
  });
});