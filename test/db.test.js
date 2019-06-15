const mongoose = require('mongoose');

const connection = require('../database/connect.js');

describe('mongoose test', () => {
  test('connection',() => {
    expect(connection).toBeDefined();
  })
});

afterAll(async done => {
  await mongoose.disconnect();
  done();
});