/**
 * Created by shenlin on 05/01/2018.
 */
process.env.NODE_ENV = 'test';
const io = require('socket.io-client');
const { expect } = require('chai');
const clearDB = require('mocha-mongoose')(process.env.DB_URL_TEST, { noClear: true });
const utiles = require('../services/database/utiles');

let sender;
let receiver;
let user;

// add a test user
before((done) => {
  utiles.addUser({
    name: 'test',
    color: '#340000',
  }).then((newUser) => {
    user = newUser;
    done();
  });
});

describe('test socket io', () => {
  beforeEach((done) => {
    sender = io('http://localhost:8080/');
    receiver = io('http://localhost:8080/');
    done();
  });

  it('Clients should change user name', (done) => {
    sender.emit('changeUserName', { id: user.id, name: 'new name' });
    receiver.on('changeUserName', (updatedUser) => {
      expect(updatedUser).to.deep.equal({ id: user.id, name: 'new name' });
      done();
    });
  });

  it('Clients should receive a message when the `message` event is emited.', (done) => {
    sender.emit('message', { user: { id: user.id }, value: 'message content' });
    receiver.on('message', (message) => {
      expect(message.content).to.equal('message content');
      done();
      clearDB();
    });
  });
});
