/* eslint-disable no-undef */

const request = require('supertest');

describe('api/v1/user ', () => {
  it('not found page', (done) => {
    request('https://github.com/firmanJS/express-monggo-graphqs')
      .get('/users')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(404, done);
  })
})
