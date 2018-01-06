/**
 * Created by shenlin on 04/01/2018.
 */
const request = require('supertest');
const { app } = require('./helper');

describe('test chat-room router', () => {
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
  }).timeout(5000);
});
