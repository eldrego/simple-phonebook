const request = require('supertest');
// const { expect } = require('chai');
const server = require('../../src/index.js');

describe('Server', () => {
  it('should return 200 if the server is running', (done) => {
    request(server)
      .get('/')
      .expect(200, done);
  });
});
