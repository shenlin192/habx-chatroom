/**
 * Created by shenlin on 03/11/2017.
 */
const db = require('./db');

const ChatRoom = db.model('ChatRoom', {
  roomName: { type: String, required: true },
  users: [{
    name: { type: String, required: true },
    color: { type: String, required: true },
    messages: [{
      content: { type: String, required: true },
      date: { type: Date, required: true, default: Date.now },
    }],
  }],
});

module.exports = ChatRoom;
