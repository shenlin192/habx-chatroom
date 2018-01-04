/**
 * Created by shenlin on 04/01/2018.
 */
process.env.NODE_ENV = 'test';
const request = require('supertest');
const mongoose = require('mongoose');
const mochaMongoose = require('mocha-mongoose');
const { app } = require('../bin/www');

// must be after require app
const dbURI = process.env.DB_URL_TEST;

mochaMongoose(dbURI);

describe('test chat-room router', () => {
  beforeEach((done) => {
    if (mongoose.connection.db) return done();
    mongoose.connect(dbURI, done);
  });
  it('should return an react app', (done) => {
    request(app).get('/chat-room')
      .expect(200)
      .expect(/Chat Room/, done);
  });
  it('should get room info', (done) => {
    request(app).get('/chat-room/room-info')
      .expect(200)
      .expect(/roomName/, done);
  });
  it('should add new user', (done) => {
    request(app)
      .post('/chat-room/add-user')
      .send({ username: 'hello', color: '#000000' })
      .set('Accept', /application\/json/)
      .expect(200)
      .expect(/hello/, done);
  });
});

