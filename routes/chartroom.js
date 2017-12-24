const express = require('express');
const ChartRoomModel = require('../services/database/chartroom.model');

const router = express.Router();

/* GET users listing. */
router.get('/', (req, res, next) => {
  // get history data
  res.send('respond with a resource');
});

function saveToDataBase(body, user) {
  // save to database
  const room = new ChartRoomModel({
    roomName: 'test',
    message: [
      {
        userName: user,
        message: body,
      },
    ],
  });
  room.save();
}

function chartRoom(io) {
  io.on('connection', (socket) => {
    console.log(socket.id);
    socket.on('message', (body) => {
      console.log(body);
      saveToDataBase(body, socket.id.slice(8));
      // broadcast
      socket.broadcast.emit('message', {
        body,
        from: socket.id.slice(8),
      });
    });
  });

  return router;
}

module.exports = chartRoom;
